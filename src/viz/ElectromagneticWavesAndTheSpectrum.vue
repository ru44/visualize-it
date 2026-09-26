<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t, type Key } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/electromagnetic-waves-and-the-spectrum. param: e, wavelength = 10^e metres.
// f = c / lambda = 3e8 / 10^e = 3*10^(8-e). A labelled band bar runs from long-wavelength radio
// (left) to short-wavelength gamma rays (right); a marker and a small illustrative wave (its drawn
// cycle count only, not to scale) track the current e.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const X0 = 40
const X1 = 760
const E_MIN = -12
const E_MAX = 3
const BAR_Y = 200
const BAR_H = 44

const e = computed(() => props.params.e ?? -2)
const lambda = computed(() => Math.pow(10, e.value))
const freq = computed(() => 3e8 / lambda.value)

function eToX(ee: number) {
  return X0 + ((E_MAX - ee) / (E_MAX - E_MIN)) * (X1 - X0)
}
function xToE(x: number) {
  return E_MAX - ((x - X0) / (X1 - X0)) * (E_MAX - E_MIN)
}

const bands = computed((): { key: Key; e0: number; e1: number; color: string }[] => [
  { key: 'wsp.radio', e0: E_MAX, e1: 0, color: 'var(--accent)' },
  { key: 'wsp.microwave', e0: 0, e1: -3, color: 'var(--pos)' },
  { key: 'wsp.infrared', e0: -3, e1: -6.15, color: 'var(--neg)' },
  { key: 'wsp.visible', e0: -6.15, e1: -6.4, color: 'url(#wspRainbow)' },
  { key: 'wsp.uv', e0: -6.4, e1: -8, color: 'var(--accent-2)' },
  { key: 'wsp.xray', e0: -8, e1: -11, color: 'var(--muted)' },
  { key: 'wsp.gamma', e0: -11, e1: E_MIN, color: 'var(--fg)' },
])

function bandName(ee: number) {
  const b = bands.value.find((band) => ee <= band.e0 && ee >= band.e1) ?? bands.value[bands.value.length - 1]!
  return b.key
}

const markerX = computed(() => eToX(e.value))
const cycles = computed(() => Math.round(Math.min(14, Math.max(2, 3 - e.value * 0.7))))
const wavePath = computed(() => {
  const w = 220
  const amp = 26
  let d = ''
  const n = 140
  for (let i = 0; i <= n; i++) {
    const x = -w / 2 + (i / n) * w
    const y = amp * Math.sin((i / n) * cycles.value * 2 * Math.PI)
    d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1)
  }
  return d
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'e', Math.min(E_MAX, Math.max(E_MIN, xToE(px))))
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'e', value: fmt(e.value, 4) },
  { label: 'λ = 10^e', value: `${lambda.value < 1e-3 || lambda.value > 1e4 ? lambda.value.toExponential(2) : fmt(lambda.value, 4)} m`, color: 'var(--accent)' },
  { label: 'f = 3×10^(8-e)', value: `${freq.value < 1e-3 || freq.value > 1e6 ? freq.value.toExponential(3) : fmt(freq.value, 4)} Hz`, color: 'var(--accent-2)' },
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
      <defs>
        <linearGradient id="wspRainbow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8b2fd6" />
          <stop offset="20%" stop-color="#3355e6" />
          <stop offset="40%" stop-color="#12a5a0" />
          <stop offset="60%" stop-color="#3fbf3f" />
          <stop offset="80%" stop-color="#e0b820" />
          <stop offset="100%" stop-color="#d6392f" />
        </linearGradient>
      </defs>

      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('wsp.hint') }}</text>

      <!-- spectrum bar -->
      <g>
        <rect v-for="b in bands" :key="b.key" :x="Math.min(eToX(b.e0), eToX(b.e1))" :y="BAR_Y" :width="Math.max(1, Math.abs(eToX(b.e1) - eToX(b.e0)))" :height="BAR_H" :fill="b.color" :fill-opacity="b.key === 'wsp.visible' ? 1 : 0.75" />
        <rect :x="X0" :y="BAR_Y" :width="X1 - X0" :height="BAR_H" fill="none" stroke="var(--line)" />
        <text v-for="b in bands" :key="'l' + b.key" :x="(eToX(b.e0) + eToX(b.e1)) / 2" :y="BAR_Y + BAR_H + 18" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t(b.key) }}</text>
      </g>

      <!-- marker -->
      <line :x1="markerX" :y1="BAR_Y - 14" :x2="markerX" :y2="BAR_Y + BAR_H + 14" stroke="var(--fg)" stroke-width="2.5" style="cursor: ew-resize" />
      <circle :cx="markerX" :cy="BAR_Y - 14" r="7" fill="var(--fg)" />

      <!-- illustrative wave (cycle count only, not to scale) -->
      <g :transform="`translate(${W / 2}, 110)`">
        <path :d="wavePath" fill="none" stroke="var(--fg)" stroke-width="2.4" />
      </g>
      <text :x="W / 2" y="60" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t(bandName(e)) }}</text>

      <text :x="W / 2" :y="H - 20" text-anchor="middle" font-size="11" fill="var(--muted)">wave drawn for illustration — its cycle count, not its real size, changes with e</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
