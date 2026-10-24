<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// chemistry/ph-scale. param x = [H⁺] in mol/L (10⁻⁴ … 10⁻¹, i.e. the acid end of the scale).
// The full 0–14 rainbow strip with everyday substances pinned on it, a marker at pH = −log10[H⁺],
// and a beaker whose ion count is drawn to scale — one pH step changes the crowd tenfold.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const conc = computed(() => Math.min(Math.max(props.params.x ?? 0.001, 0.0001), 0.1))
const ph = computed(() => -Math.log10(conc.value))
const poh = computed(() => 14 - ph.value)
const vsWater = computed(() => conc.value / 1e-7)

const SX = 60
const SW = 680
const SY = 150
const SH = 44
const phX = (v: number) => SX + (v / 14) * SW
const hue = (v: number) => (v <= 7 ? (v / 7) * 120 : 120 + ((v - 7) / 7) * 150)
const SUBSTANCES = computed(() => [
  { ph: 1.5, label: t('phx.stomach'), up: true },
  { ph: 2.4, label: t('phx.lemon'), up: false },
  { ph: 2.9, label: t('phx.vinegar'), up: true },
  { ph: 4.5, label: t('phx.tomato'), up: false },
  { ph: 6.6, label: t('phx.milk'), up: true },
  { ph: 7, label: t('phx.water'), up: false },
  { ph: 10, label: t('phx.soap'), up: true },
  { ph: 13, label: t('phx.bleach'), up: false },
])

// beaker: each dot is 10⁻³ mol/L, so the crowd shrinks tenfold per pH step
const dotCount = computed(() => Math.max(Math.round(conc.value * 1000), 1))
const rnd = (i: number) => {
  const v = Math.sin(i * 12.9898) * 43758.5453
  return v - Math.floor(v)
}
const dots = computed(() =>
  Array.from({ length: Math.min(dotCount.value, 120) }, (_, i) => ({
    x: 140 + rnd(i * 2) * 170,
    y: 318 + rnd(i * 2 + 1) * 120,
  })),
)

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  const targetPh = Math.min(4, Math.max(1, ((px - SX) / SW) * 14))
  emit('set', 'x', Math.round(10 ** -targetPh * 10000) / 10000)
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  const py = ((ev.clientY - box.top) / box.height) * H
  if (py > SY + SH + 60) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: '[H⁺]', value: `${fmt(conc.value, 4)} mol/L`, color: 'var(--accent-2)' },
  { label: 'pH = −log₁₀[H⁺]', value: fmt(ph.value, 2), color: 'var(--accent)' },
  { label: 'pOH = 14 − pH', value: fmt(poh.value, 2) },
  { label: t('phx.vsWater'), value: `×${vsWater.value >= 10000 ? vsWater.value.toExponential(1) : fmt(vsWater.value, 0)}` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('phx.hint') }}</text>
      <!-- the 0–14 strip -->
      <rect v-for="i in 14" :key="i" :x="phX(i - 1)" :y="SY" :width="SW / 14 + 0.5" :height="SH" :fill="`hsl(${hue(i - 0.5)} 65% 50%)`" />
      <rect :x="SX" :y="SY" :width="SW" :height="SH" fill="none" stroke="var(--line)" rx="4" />
      <text v-for="i in 15" :key="'n' + i" :x="phX(i - 1)" :y="SY + SH + 16" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ i - 1 }}</text>
      <!-- everyday pins -->
      <g v-for="s in SUBSTANCES" :key="s.ph">
        <line :x1="phX(s.ph)" :y1="s.up ? SY - 22 : SY + SH + 22" :x2="phX(s.ph)" :y2="s.up ? SY : SY + SH" stroke="var(--line)" />
        <text :x="phX(s.ph)" :y="s.up ? SY - 28 : SY + SH + 36" text-anchor="middle" font-size="10" fill="var(--fg)">{{ s.label }}</text>
      </g>
      <!-- your solution's marker -->
      <path :d="`M${phX(ph) - 8},${SY - 14} h16 l-8,14 z`" fill="var(--fg)" />
      <text :x="phX(ph)" :y="SY - 46" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" class="num">pH {{ fmt(ph, 2) }}</text>
      <text :x="phX(2.5)" :y="SY + SH + 56" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('phx.acidZone') }}</text>
      <!-- the beaker: the same number, drawn as a crowd -->
      <rect x="120" y="300" width="210" height="150" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" r="4" fill="var(--accent-2)" opacity="0.8" />
      <text x="225" y="470" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('phx.beaker', { n: dotCount }) }}</text>
      <!-- the tenfold ladder -->
      <text x="420" y="330" font-size="12" fill="var(--fg)">{{ t('phx.ladder') }}</text>
      <text x="420" y="356" font-size="12" fill="var(--accent)" class="num">pH {{ fmt(ph, 2) }} → [H⁺] = 10^−{{ fmt(ph, 2) }}</text>
      <text x="420" y="382" font-size="11" fill="var(--muted)">{{ t('phx.ladderNote') }}</text>
      <text x="420" y="414" font-size="11" fill="var(--accent-2)">{{ t('phx.waterNote', { n: vsWater >= 10000 ? vsWater.toExponential(1) : fmt(vsWater, 0) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
