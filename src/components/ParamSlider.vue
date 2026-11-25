<script setup lang="ts">
import { computed } from 'vue'
import type { ParamSpec } from '../lessons/types'
import { fmt } from '../engine/math'
import { t, type Key } from '../i18n'

const props = defineProps<{ name: string; spec: ParamSpec; value: number }>()
defineEmits<{ set: [name: string, value: number] }>()
// a 'log' slider moves along log10 of the value, so every ×10 takes the same distance
const log = computed(() => props.spec.scale === 'log')
const pos = (v: number) => (log.value ? Math.log10(v) : v)
// word units (yr, mo, $, EGP…) have a translation under unit.<unit>; symbols such as m/s or Hz have none and stay as written
const unit = computed(() => {
  const k = `unit.${props.spec.unit}` as Key
  const s = t(k)
  return s === k ? props.spec.unit : s
})
const pct = computed(() => `${((pos(props.value) - pos(props.spec.min)) / (pos(props.spec.max) - pos(props.spec.min))) * 100}%`)
</script>

<template>
  <label class="block">
    <span class="flex items-baseline justify-between text-sm">
      <span>{{ spec.label }}</span>
      <!-- a translated word unit (سنة، دولار…) is laid out right to left after the number, with a gap -->
      <span :dir="unit !== spec.unit ? 'rtl' : 'ltr'" class="num rounded px-1.5 py-0.5 text-[13px]" style="background: var(--sunken)">
        <bdi>{{ fmt(value) }}</bdi><span v-if="spec.unit" :class="unit !== spec.unit ? 'ms-1' : ''" style="color: var(--muted)"> {{ unit }}</span>
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
