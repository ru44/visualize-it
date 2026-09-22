<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// options.mode: 'refraction' (a ray hits a flat boundary between two media; params theta1, n1, n2)
// or 'lens' (thin converging lens; params f, doo = object distance, ho = object height).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const mode = computed<'refraction' | 'lens'>(() => props.options.mode ?? 'refraction')

// ---- refraction ---------------------------------------------------------------------------------
const th1 = computed(() => ((props.params.theta1 ?? 40) * Math.PI) / 180)
const n1 = computed(() => props.params.n1 ?? 1)
const n2 = computed(() => props.params.n2 ?? 1.5)
const sinT2 = computed(() => (n1.value / n2.value) * Math.sin(th1.value))
const tir = computed(() => Math.abs(sinT2.value) > 1)
const th2 = computed(() => (tir.value ? NaN : Math.asin(sinT2.value)))
const crit = computed(() => (n1.value > n2.value ? Math.asin(n2.value / n1.value) : NaN))
const P = { x: 400, y: 260 }
const L = 230
// incident comes from upper-left: start = P - L*(sin θ1, -cos θ1)... incident direction (sin θ1, cos θ1) downward-right
const incStart = computed(() => ({ x: P.x - Math.sin(th1.value) * L, y: P.y - Math.cos(th1.value) * L }))
const reflEnd = computed(() => ({ x: P.x + Math.sin(th1.value) * L, y: P.y - Math.cos(th1.value) * L }))
const refrEnd = computed(() => (tir.value ? null : { x: P.x + Math.sin(th2.value) * L, y: P.y + Math.cos(th2.value) * L }))
// Fresnel (unpolarised, approximate) reflectance for the readout
const refl = computed(() => {
  if (tir.value) return 1
  const c1 = Math.cos(th1.value)
  const c2 = Math.cos(th2.value)
  const rs = ((n1.value * c1 - n2.value * c2) / (n1.value * c1 + n2.value * c2)) ** 2
  const rp = ((n1.value * c2 - n2.value * c1) / (n1.value * c2 + n2.value * c1)) ** 2
  return (rs + rp) / 2
})

// ---- thin lens ----------------------------------------------------------------------------------
const f = computed(() => props.params.f ?? 6)
const doo = computed(() => props.params.doo ?? 15)
const ho = computed(() => props.params.ho ?? 3)
const di = computed(() => (doo.value === f.value ? Infinity : (f.value * doo.value) / (doo.value - f.value)))
const hi = computed(() => (Number.isFinite(di.value) ? -(di.value / doo.value) * ho.value : NaN))
const S = 14 // px per unit
const AX = { x: 400, y: 260 }
const lx = (x: number) => AX.x + x * S // x measured from the lens, object at −doo
const ly = (y: number) => AX.y - y * S
const virtual = computed(() => Number.isFinite(di.value) && di.value < 0)

const readouts = computed(() =>
  mode.value === 'refraction'
    ? [
        { label: 'θ₁', value: fmt((th1.value * 180) / Math.PI, 1) + '°' },
        { label: 'θ₂', value: tir.value ? t('optics.tir') : fmt((th2.value * 180) / Math.PI, 1) + '°', color: 'var(--accent-2)' },
        { label: 'n₁ sin θ₁ = n₂ sin θ₂', value: `${fmt(n1.value * Math.sin(th1.value), 3)}` },
        { label: t('optics.reflected'), value: fmt(refl.value * 100, 1) + ' %' },
        ...(Number.isFinite(crit.value) ? [{ label: t('optics.critical'), value: fmt((crit.value * 180) / Math.PI, 1) + '°', color: 'var(--neg)' }] : []),
      ]
    : [
        { label: 'd₀', value: fmt(doo.value, 2) },
        { label: 'dᵢ', value: Number.isFinite(di.value) ? fmt(di.value, 2) : '∞', color: 'var(--accent-2)' },
        { label: t('optics.magnification'), value: Number.isFinite(di.value) ? fmt(-di.value / doo.value, 2) : '—' },
        { label: t('optics.image'), value: !Number.isFinite(di.value) ? t('optics.none') : virtual.value ? t('optics.virtual') : t('optics.real') },
      ],
)
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  const x = ((e.clientX - bx.left) / bx.width) * W
  const y = ((e.clientY - bx.top) / bx.height) * H
  if (mode.value === 'refraction') emit('set', 'theta1', (Math.atan2(P.x - x, P.y - y) * 180) / Math.PI)
  else emit('set', 'doo', Math.max(0.5, (AX.x - x) / S))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <template v-if="mode === 'refraction'">
        <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('optics.hintRefr') }}</text>
        <rect x="0" :y="P.y" :width="W" :height="H - P.y" fill="var(--accent)" :fill-opacity="0.06 + 0.12 * Math.min(1, (n2 - 1) / 1.5)" />
        <rect x="0" y="0" :width="W" :height="P.y" fill="var(--accent)" :fill-opacity="0.06 + 0.12 * Math.min(1, (n1 - 1) / 1.5)" />
        <line x1="0" :x2="W" :y1="P.y" :y2="P.y" stroke="var(--fg)" />
        <line :x1="P.x" :x2="P.x" y1="30" :y2="H - 30" stroke="var(--muted)" stroke-dasharray="6 5" />
        <text class="num" x="16" :y="P.y - 12" font-size="13" fill="var(--fg)">n₁ = {{ fmt(n1, 2) }}</text>
        <text class="num" x="16" :y="P.y + 22" font-size="13" fill="var(--fg)">n₂ = {{ fmt(n2, 2) }}</text>
        <line :x1="incStart.x" :y1="incStart.y" :x2="P.x" :y2="P.y" stroke="var(--accent-2)" stroke-width="3" />
        <line :x1="P.x" :y1="P.y" :x2="reflEnd.x" :y2="reflEnd.y" stroke="var(--accent-2)" stroke-width="1.5" :stroke-opacity="tir ? 1 : 0.35 + refl" />
        <line v-if="refrEnd" :x1="P.x" :y1="P.y" :x2="refrEnd.x" :y2="refrEnd.y" stroke="var(--accent-2)" stroke-width="3" :stroke-opacity="1 - refl * 0.7" />
        <path :d="`M${P.x},${P.y - 60} A60,60 0 0 0 ${P.x - 60 * Math.sin(th1)},${P.y - 60 * Math.cos(th1)}`" fill="none" stroke="var(--fg)" />
        <text class="num" :x="P.x - 40" :y="P.y - 70" font-size="12" fill="var(--fg)">θ₁</text>
        <template v-if="refrEnd">
          <path :d="`M${P.x},${P.y + 60} A60,60 0 0 0 ${P.x + 60 * Math.sin(th2)},${P.y + 60 * Math.cos(th2)}`" fill="none" stroke="var(--accent-2)" />
          <text class="num" :x="P.x + 30" :y="P.y + 80" font-size="12" fill="var(--accent-2)">θ₂</text>
        </template>
        <text v-else class="num" :x="P.x + 30" :y="P.y + 40" font-size="13" fill="var(--neg)">{{ t('optics.tir') }}</text>
      </template>
      <template v-else>
        <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('optics.hintLens') }}</text>
        <line x1="0" :x2="W" :y1="AX.y" :y2="AX.y" stroke="var(--muted)" />
        <path :d="`M${AX.x},${AX.y - 150} Q${AX.x + 26},${AX.y} ${AX.x},${AX.y + 150} Q${AX.x - 26},${AX.y} ${AX.x},${AX.y - 150}`" fill="var(--accent)" fill-opacity="0.15" stroke="var(--accent)" />
        <g v-for="s in [-1, 1]" :key="s"><circle :cx="lx(s * f)" :cy="AX.y" r="4" fill="var(--fg)" /><text class="num" :x="lx(s * f)" :y="AX.y + 18" text-anchor="middle" font-size="11" fill="var(--muted)">F</text><circle :cx="lx(2 * s * f)" :cy="AX.y" r="3" fill="var(--muted)" /></g>
        <!-- object -->
        <line :x1="lx(-doo)" :y1="AX.y" :x2="lx(-doo)" :y2="ly(ho)" stroke="var(--accent-2)" stroke-width="4" stroke-linecap="round" />
        <circle :cx="lx(-doo)" :cy="ly(ho)" r="5" fill="var(--accent-2)" />
        <!-- rays: parallel → F ; through centre ; through F → parallel -->
        <template v-if="Number.isFinite(di)">
          <line :x1="lx(-doo)" :y1="ly(ho)" :x2="lx(0)" :y2="ly(ho)" stroke="var(--fg)" stroke-width="1.5" />
          <line :x1="lx(0)" :y1="ly(ho)" :x2="lx(di > 0 ? 28 : -28)" :y2="ly(ho - (ho / f) * (di > 0 ? 28 : -28))" stroke="var(--fg)" stroke-width="1.5" :stroke-dasharray="di > 0 ? '' : '5 4'" />
          <line :x1="lx(-doo)" :y1="ly(ho)" :x2="lx(di > 0 ? 28 : -28)" :y2="ly(-(ho / doo) * (di > 0 ? 28 : -28))" stroke="var(--fg)" stroke-width="1.5" :stroke-dasharray="di > 0 ? '' : '5 4'" />
          <line v-if="di < 0" :x1="lx(0)" :y1="ly(ho)" :x2="lx(28)" :y2="ly(ho - (ho / f) * 28)" stroke="var(--fg)" stroke-width="1.5" />
          <line v-if="di < 0" :x1="lx(-doo)" :y1="ly(ho)" :x2="lx(28)" :y2="ly(-(ho / doo) * 28)" stroke="var(--fg)" stroke-width="1.5" />
          <!-- image -->
          <line :x1="lx(di)" :y1="AX.y" :x2="lx(di)" :y2="ly(hi)" :stroke="virtual ? 'var(--pos)' : 'var(--neg)'" stroke-width="4" stroke-linecap="round" :stroke-dasharray="virtual ? '6 4' : ''" />
          <circle :cx="lx(di)" :cy="ly(hi)" r="5" :fill="virtual ? 'var(--pos)' : 'var(--neg)'" />
        </template>
        <text v-else class="num" :x="AX.x + 40" y="60" font-size="13" fill="var(--muted)">{{ t('optics.none') }}</text>
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
