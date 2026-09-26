<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A light clock (two mirrors, a photon bouncing between them) riding inside a train. The photon's
// ground-frame path is a zigzag: it drifts sideways with the train while it bounces vertically, but its
// speed along that diagonal path is always exactly c — never faster for a faster train. That single fact
// (light's constant speed) is what forces the ground-frame tick time Δt to exceed the train's own Δt0.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const C = 299792458 // m/s, the real speed of light
const PIXEL_C = 230 // px/s — the animation's own "light speed", calibrating visible bounce speed
const L_PX = 210 // px, the mirrors' fixed pixel separation (schematic; real L only drives the readouts)
const TOP_Y = 120
const LOOP_W = W + 220
const TRAIL_N = 140

const v = computed(() => Math.min(0.999, Math.max(0, props.params.v ?? 0.3)))
const L = computed(() => Math.max(0.1, props.params.L ?? 1.5))
const gamma = computed(() => 1 / Math.sqrt(1 - v.value * v.value))
const dt0 = computed(() => (2 * L.value) / C) // s, the train's own round-trip tick
const dt = computed(() => gamma.value * dt0.value) // s, the platform's round-trip tick

const state = reactive({ simT: 0, mirrorX: -80, trail: [] as [number, number][] })

function reset() {
  state.simT = 0
  state.mirrorX = 260 // start well inside the frame, so the very first paint is never half off-screen
  state.trail = []
}
watch(() => [v.value, L.value], reset)

let raf = 0
let last = 0
function frame(now: number) {
  const dtSec = last ? Math.min((now - last) / 1000, 0.05) : 0
  last = now
  state.simT += dtSec
  const vxPx = v.value * PIXEL_C
  const prevX = state.mirrorX
  state.mirrorX = -80 + ((340 + vxPx * state.simT) % LOOP_W)
  if (state.mirrorX < prevX - 50) state.trail = [] // wrapped around: start the zigzag fresh
  const tLeg = (L_PX / PIXEL_C) * gamma.value
  const cycle = state.simT % (2 * tLeg)
  const localY = cycle < tLeg ? L_PX * (1 - cycle / tLeg) : L_PX * ((cycle - tLeg) / tLeg)
  state.trail.push([state.mirrorX, TOP_Y + localY])
  if (state.trail.length > TRAIL_N) state.trail.shift()
  raf = requestAnimationFrame(frame)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(frame)
  else state.trail = [[W / 2, TOP_Y], [W / 2, TOP_Y + L_PX]]
})
onUnmounted(() => cancelAnimationFrame(raf))

const trailPath = computed(() => state.trail.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(''))
const photon = computed(() => state.trail[state.trail.length - 1] ?? [W / 2, TOP_Y])
const labelX = computed(() => Math.min(W - 60, Math.max(60, photon.value[0])))
const groundY = TOP_Y + L_PX + 60

const readouts = computed(() => [
  { label: 'v', value: `${fmt(v.value, 5)} c`, color: 'var(--accent)' },
  { label: 'γ', value: fmt(gamma.value, 3), color: 'var(--accent-2)' },
  { label: 'Δt₀', value: `${fmt(dt0.value * 1e9, 2)} ns` },
  { label: 'Δt', value: `${fmt(dt.value * 1e9, 2)} ns`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lct.hint') }}</text>
      <line x1="0" :x2="W" :y1="groundY" :y2="groundY" stroke="var(--line)" stroke-width="2" />
      <text class="num" x="16" :y="groundY + 20" font-size="11" fill="var(--muted)">{{ t('lct.platform') }}</text>

      <path :d="trailPath" fill="none" stroke="var(--muted)" stroke-width="2" stroke-opacity="0.55" />

      <g :transform="`translate(${photon[0] - 85}, 0)`">
        <rect x="0" :y="TOP_Y - 14" width="170" :height="L_PX + 28" rx="6" fill="var(--accent)" fill-opacity="0.08" stroke="var(--line)" />
        <line x1="85" :y1="TOP_Y" x2="85" :y2="TOP_Y + L_PX" stroke="var(--fg)" stroke-width="1" stroke-dasharray="3 4" opacity="0.4" />
        <rect x="60" :y="TOP_Y - 6" width="50" height="6" fill="var(--fg)" />
        <rect x="60" :y="TOP_Y + L_PX" width="50" height="6" fill="var(--fg)" />
      </g>

      <circle :cx="photon[0]" :cy="photon[1]" r="6" fill="var(--pos)" />
      <text class="num" :x="labelX" :y="TOP_Y - 22" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('lct.train') }}</text>

      <text class="num" x="784" y="36" text-anchor="end" font-size="12" fill="var(--fg)" font-weight="600">c = 299,792,458 m/s</text>
      <text class="num" x="784" y="52" text-anchor="end" font-size="10.5" fill="var(--muted)">{{ t('lct.always') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
