<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// biology/bacterial-growth. params N0, T (doubling time), x = minutes elapsed. A petri dish fills
// with colonies while a timeline ticks off one doubling every T minutes — the dish looks calm for
// most of the run and then explodes, which is the whole lesson about exponentials.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const n0 = computed(() => Math.max(Math.round(props.params.N0 ?? 10), 1))
const T = computed(() => Math.max(props.params.T ?? 30, 1))
const mins = computed(() => Math.max(props.params.x ?? 120, 0))
const N = computed(() => n0.value * 2 ** (mins.value / T.value))
const doublings = computed(() => mins.value / T.value)
const shown = computed(() => Math.min(Math.round(N.value), 360))
const big = (n: number) => (n >= 1e9 ? `${fmt(n / 1e9, 2)} B` : n >= 1e6 ? `${fmt(n / 1e6, 2)} M` : n >= 1e4 ? `${fmt(n / 1e3, 1)} k` : fmt(n, 0))

const CX = 240
const CY = 258
const R = 168
const dots = computed(() =>
  Array.from({ length: shown.value }, (_, i) => {
    const r = R * 0.94 * Math.sqrt((i + 0.5) / Math.max(shown.value, 40))
    const a = i * 2.39996
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
  }),
)
const ticks = computed(() => {
  const out: number[] = []
  for (let m = T.value; m <= 600; m += T.value) out.push(m)
  return out.slice(0, 60)
})
const TL = { x: 460, y: 150, w: 300 }

const readouts = computed(() => [
  { label: 'N₀', value: String(n0.value) },
  { label: 'T', value: `${fmt(T.value, 0)} min`, color: 'var(--accent-2)' },
  { label: 't', value: `${fmt(mins.value, 0)} min` },
  { label: t('dish.doublings'), value: fmt(doublings.value, 2), color: 'var(--accent)' },
  { label: 'N = N₀·2^(t/T)', value: big(N.value), color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('dish.hint') }}</text>
      <!-- the dish -->
      <circle :cx="CX" :cy="CY" :r="R" fill="var(--sunken)" stroke="var(--line)" stroke-width="3" />
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" r="4" fill="var(--accent)" opacity="0.8" />
      <text :x="CX" :y="CY + R + 26" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dish.dish') }}</text>
      <text v-if="N > 360" :x="CX" :y="CY + R + 44" text-anchor="middle" font-size="10" fill="var(--accent-2)">{{ t('dish.overflow', { n: big(N) }) }}</text>
      <!-- the doubling timeline -->
      <text :x="TL.x" :y="TL.y - 26" font-size="12" font-weight="600" fill="var(--fg)">{{ t('dish.timeline', { T: fmt(T, 0) }) }}</text>
      <line :x1="TL.x" :y1="TL.y" :x2="TL.x + TL.w" :y2="TL.y" stroke="var(--line)" stroke-width="2" />
      <line v-for="m in ticks" :key="m" :x1="TL.x + (m / 600) * TL.w" :y1="TL.y - 7" :x2="TL.x + (m / 600) * TL.w" :y2="TL.y + 7" stroke="var(--accent-2)" />
      <path :d="`M${TL.x + (Math.min(mins, 600) / 600) * TL.w - 7},${TL.y - 18} h14 l-7,11 z`" fill="var(--fg)" />
      <text :x="TL.x" :y="TL.y + 24" font-size="10" fill="var(--muted)" class="num">0</text>
      <text :x="TL.x + TL.w" :y="TL.y + 24" text-anchor="end" font-size="10" fill="var(--muted)" class="num">600 min</text>
      <!-- the count, written out -->
      <text :x="TL.x" :y="TL.y + 92" font-size="13" fill="var(--muted)">{{ t('dish.startedWith', { n: n0 }) }}</text>
      <text :x="TL.x" :y="TL.y + 132" font-size="30" font-weight="700" fill="var(--pos)" class="num">{{ big(N) }}</text>
      <text :x="TL.x" :y="TL.y + 158" font-size="12" fill="var(--accent)" class="num">= {{ n0 }} × 2^{{ fmt(doublings, 2) }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dish.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
