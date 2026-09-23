<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A chain of circles, each spinning inside the last, whose tip traces one Fourier partial sum of
// a square wave. n harmonics gives a closer approximation; t is the phase, one full turn per period.
// params: n (harmonics), t (phase, 0..1, animated).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const cx = 150
const cy = 240
const U = 85
const PX0 = 300
const PX1 = 780

const n = computed(() => Math.max(1, Math.min(12, Math.round(props.params.n ?? 5))))
const t01 = computed(() => ((props.params.t ?? 0) % 1 + 1) % 1)
const theta = computed(() => 2 * Math.PI * t01.value)

function ampOf(k: number) {
  return 4 / (Math.PI * (2 * k - 1))
}
function squareY(th: number, harmonics: number) {
  let y = 0
  for (let k = 1; k <= harmonics; k++) y += ampOf(k) * Math.sin((2 * k - 1) * th)
  return y
}

const chain = computed(() => {
  const pts = [{ x: cx, y: cy }]
  for (let k = 1; k <= n.value; k++) {
    const a = ampOf(k) * U
    const phi = (2 * k - 1) * theta.value
    const prev = pts[pts.length - 1]
    pts.push({ x: prev.x + a * Math.cos(phi), y: prev.y - a * Math.sin(phi) })
  }
  return pts
})
const tip = computed(() => chain.value[chain.value.length - 1])
const mapX = (th: number) => PX0 + (th / (2 * Math.PI)) * (PX1 - PX0)

const fullCurve = computed(() => {
  let d = ''
  for (let i = 0; i <= 240; i++) {
    const th = (i / 240) * 2 * Math.PI
    const y = cy - U * squareY(th, n.value)
    d += (i ? 'L' : 'M') + mapX(th).toFixed(1) + ',' + y.toFixed(1)
  }
  return d
})
const drawnCurve = computed(() => {
  const steps = Math.max(1, Math.round(240 * t01.value))
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const th = (i / 240) * 2 * Math.PI
    const y = cy - U * squareY(th, n.value)
    d += (i ? 'L' : 'M') + mapX(th).toFixed(1) + ',' + y.toFixed(1)
  }
  return d
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    if (!last) last = now
    const dt = Math.min(now - last, 50) / 1000
    last = now
    emit('set', 't', (t01.value + dt * 0.15) % 1)
  } else last = 0
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('epi.harmonics'), value: String(n.value), color: 'var(--accent)' },
  { label: t('epi.value'), value: fmt(squareY(theta.value, n.value), 3), color: 'var(--accent-2)' },
  { label: 'θ', value: `${fmt(t01.value * 2, 2)}π` },
])
</script>

<template>
  <div class="relative">
    <button class="absolute end-3 top-3 num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('epi.hint') }}</text>

      <g v-for="(p, i) in chain.slice(0, -1)" :key="'c' + i">
        <circle :cx="p.x" :cy="p.y" :r="ampOf(i + 1) * U" fill="none" stroke="var(--line)" />
        <line :x1="p.x" :y1="p.y" :x2="chain[i + 1].x" :y2="chain[i + 1].y" :stroke="i % 2 ? 'var(--accent-2)' : 'var(--accent)'" stroke-width="2" />
        <circle :cx="chain[i + 1].x" :cy="chain[i + 1].y" r="3" fill="var(--muted)" />
      </g>
      <circle :cx="tip.x" :cy="tip.y" r="6" fill="var(--fg)" />

      <line :x1="PX0" :y1="cy" :x2="PX1" :y2="cy" stroke="var(--line)" />
      <path :d="fullCurve" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <path :d="drawnCurve" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <line :x1="tip.x" :y1="tip.y" :x2="mapX(theta)" :y2="tip.y" stroke="var(--muted)" stroke-dasharray="4 4" />
      <circle :cx="mapX(theta)" :cy="tip.y" r="6" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
