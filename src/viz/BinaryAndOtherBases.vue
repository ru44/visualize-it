<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// N written in base b: one digit box per place, each labelled with its place value b^k. Base 60
// (b = 60) reads the same boxes as minutes and seconds, exactly like a clock.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const N = computed(() => Math.max(0, Math.round(props.params.N ?? 130)))
const b = computed(() => Math.min(60, Math.max(2, Math.round(props.params.b ?? 2))))

function digitChar(v: number): string {
  if (v < 10) return String(v)
  if (v < 36) return String.fromCharCode(55 + v) // 10 -> A, 11 -> B, ...
  return String(v)
}
const digits = computed(() => {
  let n = N.value
  const out: number[] = []
  if (n === 0) return [0]
  while (n > 0) {
    out.unshift(n % b.value)
    n = Math.floor(n / b.value)
  }
  return out
})
const wide = computed(() => digits.value.some((d) => d >= 36))
const boxW = computed(() => Math.min(wide.value ? 90 : 68, 720 / digits.value.length))
const rowW = computed(() => boxW.value * digits.value.length)
const startX = computed(() => (W - rowW.value) / 2)

const baseStr = computed(() => digits.value.map(digitChar).join(wide.value ? ' ' : ''))
const isClock = computed(() => b.value === 60 && digits.value.length <= 3)
const clockStr = computed(() => digits.value.map((d) => String(d).padStart(2, '0')).join(':'))

const readouts = computed(() => [
  { label: t('bases.decimal'), value: String(N.value), color: 'var(--muted)' },
  { label: t('bases.inbase', { b: String(b.value) }), value: baseStr.value, color: 'var(--accent)' },
  { label: t('bases.digitcount'), value: String(digits.value.length) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('bases.hint') }}</text>
      <text :x="W / 2" y="70" text-anchor="middle" font-size="16" fill="var(--fg)">{{ N }} {{ t('bases.inwords') }} {{ b }}</text>

      <g v-for="(d, i) in digits" :key="i" :transform="`translate(${startX + i * boxW}, 110)`">
        <text :x="boxW / 2" y="-10" text-anchor="middle" font-size="11" fill="var(--muted)">b^{{ digits.length - 1 - i }}</text>
        <rect x="4" :width="boxW - 8" height="70" rx="10" fill="var(--sunken)" stroke="var(--accent)" stroke-width="2" />
        <text class="num" :x="boxW / 2" y="46" text-anchor="middle" font-size="26" fill="var(--accent)">{{ digitChar(d) }}</text>
      </g>

      <text :x="W / 2" y="230" text-anchor="middle" font-size="14" fill="var(--fg)">
        {{ t('bases.reads') }}: {{ baseStr }}<tspan fill="var(--muted)"> ({{ t('bases.base') }} {{ b }})</tspan>
      </text>

      <template v-if="isClock">
        <text :x="W / 2" y="300" text-anchor="middle" font-size="15" fill="var(--accent-2)">{{ t('bases.clock') }}: {{ clockStr }}</text>
      </template>

      <text :x="W / 2" y="380" text-anchor="middle" font-size="13" fill="var(--muted)">
        {{ digits.map((d, i) => `${d}×${b}^${digits.length - 1 - i}`).join(' + ') }} = {{ N }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
