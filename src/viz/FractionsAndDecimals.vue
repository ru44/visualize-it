<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The same amount, three ways: a pizza cut into d slices with n shaded, the value n/d placed on a
// ruler-like number line, and the plain decimal. params n (top number), d (bottom number).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const n = computed(() => Math.max(0, Math.round(props.params.n ?? 3)))
const d = computed(() => Math.max(1, Math.round(props.params.d ?? 4)))
const value = computed(() => n.value / d.value)
const wholes = computed(() => Math.floor(n.value / d.value))
const remainder = computed(() => n.value - wholes.value * d.value)

// ---- pizza (main circle shows the remainder slice-by-slice out of d equal slices)
const cx = 170
const cy = 230
const r = 140
function sliceArc(i: number, dd: number) {
  const a0 = (i / dd) * 2 * Math.PI - Math.PI / 2
  const a1 = ((i + 1) / dd) * 2 * Math.PI - Math.PI / 2
  const large = a1 - a0 > Math.PI ? 1 : 0
  const x0 = cx + r * Math.cos(a0)
  const y0 = cy + r * Math.sin(a0)
  const x1 = cx + r * Math.cos(a1)
  const y1 = cy + r * Math.sin(a1)
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`
}
const slices = computed(() => Array.from({ length: d.value }, (_, i) => ({ path: sliceArc(i, d.value), filled: i < remainder.value })))
const miniWholes = computed(() => Math.min(4, wholes.value))

// ---- ruler / number line
const x0 = 400
const rulerW = 340
const domainMax = computed(() => {
  const c = Math.max(1, Math.ceil(value.value))
  return value.value >= c - 1e-9 ? c + 1 : c
})
const scale = computed(() => rulerW / domainMax.value)
const tickX = (k: number) => x0 + (k / d.value) * scale.value
const ticks = computed(() => Array.from({ length: domainMax.value * d.value + 1 }, (_, k) => ({ k, x: tickX(k), major: k % d.value === 0 })))
const markerX = computed(() => x0 + value.value * scale.value)

const readouts = computed(() => [
  { label: t('fracdec.fraction'), value: `${n.value}/${d.value}`, color: 'var(--accent)' },
  { label: t('fracdec.decimal'), value: fmt(value.value, 3), color: 'var(--accent-2)' },
  { label: t('fracdec.slices'), value: `${remainder.value} ${t('fracdec.of')} ${d.value}${wholes.value ? ' + ' + wholes.value + ' ' + t('fracdec.whole') : ''}` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fracdec.hint') }}</text>

      <text x="170" y="60" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('fracdec.pizza') }}</text>
      <g v-for="(s, i) in slices" :key="i">
        <path :d="s.path" :fill="s.filled ? 'var(--accent)' : 'var(--sunken)'" stroke="var(--panel)" stroke-width="2" />
      </g>
      <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="var(--line)" stroke-width="2" />
      <g v-if="miniWholes > 0">
        <g v-for="w in miniWholes" :key="w" :transform="`translate(${20 + (w - 1) * 40}, 380)`">
          <circle r="16" fill="var(--accent)" stroke="var(--panel)" stroke-width="1.5" />
        </g>
        <text x="20" y="425" font-size="12" fill="var(--muted)">{{ wholes }} {{ t('fracdec.whole') }}</text>
      </g>

      <text :x="x0 + rulerW / 2" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('fracdec.ruler') }}</text>
      <line :x1="x0" :x2="x0 + rulerW" y1="380" y2="380" stroke="var(--line)" stroke-width="2" />
      <g v-for="tk in ticks" :key="tk.k">
        <line :x1="tk.x" :x2="tk.x" :y1="tk.major ? 368 : 374" y2="380" :stroke="tk.major ? 'var(--fg)' : 'var(--muted)'" :stroke-width="tk.major ? 2 : 1" />
        <text v-if="tk.major" :x="tk.x" y="400" text-anchor="middle" font-size="12" fill="var(--muted)">{{ tk.k / d }}</text>
      </g>
      <g :transform="`translate(${markerX}, 380)`">
        <circle r="8" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" />
        <text y="-16" text-anchor="middle" font-size="14" fill="var(--accent-2)">{{ fmt(value, 3) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
