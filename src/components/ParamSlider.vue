<script setup lang="ts">
import { computed } from 'vue'
import type { ParamSpec } from '../lessons/types'
import { fmt } from '../engine/math'

const props = defineProps<{ name: string; spec: ParamSpec; value: number }>()
defineEmits<{ set: [name: string, value: number] }>()
const pct = computed(() => `${((props.value - props.spec.min) / (props.spec.max - props.spec.min)) * 100}%`)
</script>

<template>
  <label class="block">
    <span class="flex items-baseline justify-between text-sm">
      <span>{{ spec.label }}</span>
      <span class="num rounded px-1.5 py-0.5 text-[13px]" style="background: var(--sunken)">
        {{ fmt(value) }}<span v-if="spec.unit" style="color: var(--muted)"> {{ spec.unit }}</span>
      </span>
    </span>
    <input
      type="range"
      class="mt-1 w-full"
      :style="{ '--p': pct }"
      :min="spec.min"
      :max="spec.max"
      :step="spec.step"
      :value="value"
      :aria-label="spec.label"
      @input="$emit('set', name, +($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
