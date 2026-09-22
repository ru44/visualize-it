<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A heavy ball and a feather dropped together. With air, the feather is held back; without air (like on the Moon,
// or in a vacuum chamber) they land together, because gravity gives every mass the same acceleration.
// params h (drop height, m), air (0 = vacuum, 1 = air).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const g = 9.81
const h = computed(() => props.params.h ?? 20)
const air = computed(() => (props.params.air ?? 1) >= 0.5)
const VT = { ball: 50, feather: 0.6 } // terminal speeds in air, m/s
function landing(vt: number) {
  if (!air.value) return Math.sqrt((2 * h.value) / g)
  let y = 0, v = 0, t = 0
  const dt = 1e-3
  while (y < h.value && t < 600) { v += g * (1 - (v * v) / (vt * vt)) * dt; y += v * dt; t += dt }
  return t
}
const tBall = computed(() => landing(VT.ball))
const tFeather = computed(() => landing(VT.feather))
const time = ref(0)
const pos = ref({ ball: 0, feather: 0 })
const vel = { ball: 0, feather: 0 }
let raf = 0
let last = 0
let pause = 0
function reset() { time.value = 0; pos.value = { ball: 0, feather: 0 }; vel.ball = vel.feather = 0; pause = 0 }
watch([h, air], reset)
function step(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  const done = pos.value.ball >= h.value && pos.value.feather >= h.value
  if (done) { pause += dt; if (pause > 1.5) reset() }
  else {
    time.value += dt
    const p = { ...pos.value }
    for (const k of ['ball', 'feather'] as const) {
      if (p[k] >= h.value) continue
      const a = air.value ? g * (1 - (vel[k] * vel[k]) / (VT[k] * VT[k])) : g
      vel[k] += a * dt
      p[k] = Math.min(h.value, p[k] + vel[k] * dt)
    }
    pos.value = p
  }
  raf = requestAnimationFrame(step)
}
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(step) })
onUnmounted(() => cancelAnimationFrame(raf))
const sy = (y: number) => 60 + (y / h.value) * 360
const readouts = computed(() => [
  { label: t('fall.ball'), value: `${fmt(tBall.value, 2)} s`, color: 'var(--accent)' },
  { label: t('fall.feather'), value: `${fmt(tFeather.value, 2)} s`, color: 'var(--accent-2)' },
  { label: t('fall.difference'), value: `${fmt(tFeather.value - tBall.value, 2)} s` },
  { label: t('fall.air'), value: air.value ? t('fall.withAir') : t('fall.vacuum'), color: air.value ? 'var(--muted)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fall.hint') }}</text>
      <rect v-if="air" x="160" y="50" width="480" height="380" fill="var(--accent)" fill-opacity="0.05" />
      <line x1="160" x2="640" y1="430" y2="430" stroke="var(--fg)" stroke-width="2" />
      <line x1="140" x2="140" y1="60" y2="420" stroke="var(--line)" />
      <text class="num" x="132" y="64" text-anchor="end" font-size="11" fill="var(--muted)">{{ fmt(h, 0) }} m</text>
      <text class="num" x="132" y="424" text-anchor="end" font-size="11" fill="var(--muted)">0</text>
      <circle cx="300" :cy="sy(pos.ball) - 16" r="16" fill="var(--accent)" />
      <text x="500" :y="sy(pos.feather) - 4" text-anchor="middle" font-size="34">🪶</text>
      <text class="num" x="300" y="455" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('fall.ball') }}</text>
      <text class="num" x="500" y="455" text-anchor="middle" font-size="12" fill="var(--accent-2)">{{ t('fall.feather') }}</text>
      <text class="num" x="700" y="90" text-anchor="middle" font-size="22" fill="var(--fg)">{{ fmt(time, 2) }} s</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
