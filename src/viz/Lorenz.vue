<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Lorenz system: dx/dt = sigma(y-x), dy/dt = x(rho-z)-y, dz/dt = xy-beta*z.
// Two trajectories start `sep` apart on x and are drawn together (x-z plane) to show how
// fast a tiny difference at the start grows into a completely different path.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 24

const sigma = computed(() => props.params.sigma ?? 10)
const rho = computed(() => props.params.rho ?? 28)
const beta = computed(() => props.params.beta ?? 8 / 3)
const sep = computed(() => Math.max(0, props.params.sep ?? 1))
const t01 = computed(() => Math.min(1, Math.max(0, props.params.t ?? 1)))

const STEPS = 2200
const DT = 0.008

function deriv(x: number, y: number, z: number): [number, number, number] {
  return [sigma.value * (y - x), x * (rho.value - z) - y, x * y - beta.value * z]
}
function integrate(x0: number, y0: number, z0: number) {
  let x = x0
  let y = y0
  let z = z0
  const pts: [number, number, number][] = [[x, y, z]]
  for (let i = 0; i < STEPS; i++) {
    const [k1x, k1y, k1z] = deriv(x, y, z)
    const [k2x, k2y, k2z] = deriv(x + (DT / 2) * k1x, y + (DT / 2) * k1y, z + (DT / 2) * k1z)
    const [k3x, k3y, k3z] = deriv(x + (DT / 2) * k2x, y + (DT / 2) * k2y, z + (DT / 2) * k2z)
    const [k4x, k4y, k4z] = deriv(x + DT * k3x, y + DT * k3y, z + DT * k3z)
    x += (DT / 6) * (k1x + 2 * k2x + 2 * k3x + k4x)
    y += (DT / 6) * (k1y + 2 * k2y + 2 * k3y + k4y)
    z += (DT / 6) * (k1z + 2 * k2z + 2 * k3z + k4z)
    pts.push([x, y, z])
  }
  return pts
}

const trajA = computed(() => integrate(0.1, 0, 0))
const trajB = computed(() => integrate(0.1 + sep.value, 0, 0))

// x-z projection, auto-fit into the viewBox.
const bounds = computed(() => {
  let xMin = Infinity
  let xMax = -Infinity
  let zMin = Infinity
  let zMax = -Infinity
  for (const p of [...trajA.value, ...trajB.value]) {
    if (!Number.isFinite(p[0]) || !Number.isFinite(p[2])) continue
    xMin = Math.min(xMin, p[0])
    xMax = Math.max(xMax, p[0])
    zMin = Math.min(zMin, p[2])
    zMax = Math.max(zMax, p[2])
  }
  if (!Number.isFinite(xMin)) return { xMin: -20, xMax: 20, zMin: 0, zMax: 50 }
  return { xMin, xMax, zMin, zMax }
})
const scale = computed(() => {
  const b = bounds.value
  const sx = (W - 2 * PAD) / Math.max(1e-6, b.xMax - b.xMin)
  const sy = (H - 2 * PAD) / Math.max(1e-6, b.zMax - b.zMin)
  return Math.min(sx, sy)
})
const px = (x: number) => PAD + (x - bounds.value.xMin) * scale.value
const pz = (z: number) => H - PAD - (z - bounds.value.zMin) * scale.value

const idx = computed(() => Math.max(1, Math.round(t01.value * STEPS)))
function pathFor(traj: [number, number, number][]) {
  let d = ''
  for (let i = 0; i <= idx.value; i++) d += `${i ? 'L' : 'M'}${px(traj[i][0]).toFixed(1)},${pz(traj[i][2]).toFixed(1)}`
  return d
}
const pathA = computed(() => pathFor(trajA.value))
const pathB = computed(() => pathFor(trajB.value))
const headA = computed(() => trajA.value[idx.value])
const headB = computed(() => trajB.value[idx.value])
const drift = computed(() => Math.hypot(headA.value[0] - headB.value[0], headA.value[1] - headB.value[1], headA.value[2] - headB.value[2]))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = t01.value + dt / 14
    if (v >= 1) (v = 1), (playing.value = false)
    emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = t01.value < 1
    raf = requestAnimationFrame(tick)
  }
})
onUnmounted(() => cancelAnimationFrame(raf))
function restart() {
  playing.value = true
  emit('set', 't', 0)
}

const readouts = computed(() => [
  { label: t('lorenz.t'), value: fmt(idx.value * DT, 1) },
  { label: 'x, y, z', value: `${fmt(headA.value[0], 1)}, ${fmt(headA.value[1], 1)}, ${fmt(headA.value[2], 1)}`, color: 'var(--accent)' },
  { label: t('lorenz.drift'), value: fmt(drift.value, 2), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('lorenz.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('lorenz.hint') }}</text>
      <path :d="pathA" fill="none" stroke="var(--accent)" stroke-width="1.4" />
      <path v-if="sep > 0" :d="pathB" fill="none" stroke="var(--accent-2)" stroke-width="1.4" />
      <circle :cx="px(headA[0])" :cy="pz(headA[2])" r="4.5" fill="var(--accent)" />
      <circle v-if="sep > 0" :cx="px(headB[0])" :cy="pz(headB[2])" r="4.5" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
