<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Nuclei repel each other electrically (the Coulomb barrier) and only fuse if they crash close enough together.
// Raising the temperature gives them more speed to punch through that repulsion; confining them into a smaller
// volume raises the density, so collisions happen more often — the two knobs every fusion reactor plays with.
// params: temperature (T, sets nucleus speed), confinement (higher = smaller volume), step (time).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N_NUCLEI = 24
const BOX0 = { x: 70, y: 80, w: 660, h: 360 }
const CHARGE_K = 6000
const SPEED_K = 26
const FUSE_R = 7
const DT = 0.05
const SUB_STEPS = 4
const R = 5.5

const temperature = computed(() => Math.max(0.2, Math.min(5, props.params.temperature ?? 1.5)))
const confinement = computed(() => Math.max(0.3, Math.min(1, props.params.confinement ?? 0.6)))
const step = computed(() => Math.max(0, Math.min(150, Math.round(props.params.step ?? 0))))

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

interface Nucleus { x: number; y: number; vx: number; vy: number; alive: boolean }
interface FusionEvent { x: number; y: number; atStep: number }

const world = computed(() => {
  const scale = 1.3 - confinement.value
  const box = { x: BOX0.x + (BOX0.w * (1 - scale)) / 2, y: BOX0.y + (BOX0.h * (1 - scale)) / 2, w: BOX0.w * scale, h: BOX0.h * scale }
  const rnd = makeRng(19551129)
  const nuclei: Nucleus[] = Array.from({ length: N_NUCLEI }, () => {
    const angle = rnd() * Math.PI * 2
    return { x: box.x + (0.08 + rnd() * 0.84) * box.w, y: box.y + (0.08 + rnd() * 0.84) * box.h, vx: Math.cos(angle), vy: Math.sin(angle), alive: true }
  })
  const events: FusionEvent[] = []
  const targetSpeed = SPEED_K * Math.sqrt(temperature.value)
  const totalSubSteps = step.value * SUB_STEPS
  for (let s = 0; s < totalSubSteps; s++) {
    const ax = new Float64Array(N_NUCLEI)
    const ay = new Float64Array(N_NUCLEI)
    for (let i = 0; i < N_NUCLEI; i++) {
      if (!nuclei[i].alive) continue
      for (let j = i + 1; j < N_NUCLEI; j++) {
        if (!nuclei[j].alive) continue
        const dx = nuclei[i].x - nuclei[j].x
        const dy = nuclei[i].y - nuclei[j].y
        const r = Math.hypot(dx, dy) || 0.001
        if (r < FUSE_R) {
          nuclei[i].alive = false
          nuclei[j].alive = false
          events.push({ x: (nuclei[i].x + nuclei[j].x) / 2, y: (nuclei[i].y + nuclei[j].y) / 2, atStep: Math.floor(s / SUB_STEPS) })
          continue
        }
        const f = CHARGE_K / (r * r)
        ax[i] += (f * dx) / r
        ay[i] += (f * dy) / r
        ax[j] -= (f * dx) / r
        ay[j] -= (f * dy) / r
      }
    }
    for (let i = 0; i < N_NUCLEI; i++) {
      const nu = nuclei[i]
      if (!nu.alive) continue
      nu.vx += ax[i] * DT
      nu.vy += ay[i] * DT
      const mag = Math.hypot(nu.vx, nu.vy) || 1
      nu.vx = (nu.vx / mag) * targetSpeed
      nu.vy = (nu.vy / mag) * targetSpeed
      nu.x += nu.vx * DT
      nu.y += nu.vy * DT
      if (nu.x < box.x + R) { nu.x = box.x + R; nu.vx = Math.abs(nu.vx) }
      else if (nu.x > box.x + box.w - R) { nu.x = box.x + box.w - R; nu.vx = -Math.abs(nu.vx) }
      if (nu.y < box.y + R) { nu.y = box.y + R; nu.vy = Math.abs(nu.vy) }
      else if (nu.y > box.y + box.h - R) { nu.y = box.y + box.h - R; nu.vy = -Math.abs(nu.vy) }
    }
  }
  return { box, nuclei, events, remaining: nuclei.filter((n) => n.alive).length }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= 150) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('fusion.temperature'), value: fmt(temperature.value, 2) },
  { label: t('fusion.confinement'), value: fmt(confinement.value, 2) },
  { label: t('fusion.step'), value: String(step.value) },
  { label: t('fusion.events'), value: String(world.value.events.length), color: 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('fusion.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fusion.hint') }}</text>
      <rect :x="world.box.x" :y="world.box.y" :width="world.box.w" :height="world.box.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <circle
        v-for="(ev, i) in world.events"
        :key="'e' + i"
        :cx="ev.x"
        :cy="ev.y"
        :r="8 + (step - ev.atStep) * 0.3"
        fill="none"
        stroke="var(--pos)"
        :stroke-opacity="Math.max(0, 1 - (step - ev.atStep) / 40)"
        stroke-width="2"
      />
      <circle v-for="(nu, i) in world.nuclei" v-show="nu.alive" :key="i" :cx="nu.x" :cy="nu.y" :r="R" fill="var(--accent)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
