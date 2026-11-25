<script setup lang="ts">
import { computed } from 'vue'
import type { ParamSpec } from '../lessons/types'
import { fmt } from '../engine/math'

const props = defineProps<{ name: string; spec: ParamSpec; value: number }>()
defineEmits<{ set: [name: string, value: number] }>()
// a 'log' slider moves along log10 of the value, so every ×10 takes the same distance
const log = computed(() => props.spec.scale === 'log')
const pos = (v: number) => (log.value ? Math.log10(v) : v)
const pct = computed(() => `${((pos(props.value) - pos(props.spec.min)) / (pos(props.spec.max) - pos(props.spec.min))) * 100}%`)
</script>

<template>
  <label class="block">
    <span class="flex items-baseline justify-between text-sm">
      <span>{{ spec.label }}</span>
      <span dir="ltr" class="num rounded px-1.5 py-0.5 text-[13px]" style="background: var(--sunken)">
        {{ fmt(value) }}<span v-if="spec.unit" style="color: var(--muted)"> {{ spec.unit }}</span>
      </span>
    </span>
    <input
      type="range"
      class="mt-1 w-full"
      :style="{ '--p': pct }"
      :min="pos(spec.min)"
      :max="pos(spec.max)"
      :step="log ? 0.005 : spec.step"
      :value="pos(value)"
      :aria-label="spec.label"
      @input="$emit('set', name, log ? 10 ** +($event.target as HTMLInputElement).value : +($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
