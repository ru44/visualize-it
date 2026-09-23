<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A slower prey escapes a faster predator. The prey only reacts to where the predator WAS
// `delay` ticks ago (a nervous system takes time), and it can add a side-to-side zigzag on top
// of running straight away. The predator is faster but can only turn a limited amount per tick,
// so a hard zigzag makes it overshoot every time it corrects course.
// params: delay (reaction delay, ticks), zigzag (side-to-side amplitude, degrees), step (ticks).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const ARENA = { x0: 40, y0: 60, x1: 760, y1: 460 }
const MAX_STEP = 200
const PRED_SPEED = 3.5
const PREY_SPEED = 2.1
const PRED_TURN = 0.16
const CATCH_R = 16
const ZIGZAG_PERIOD = 26

const delay = computed(() => Math.max(0, Math.min(20, Math.round(props.params.delay ?? 6))))
const zigzag = computed(() => Math.max(0, Math.min(60, props.params.zigzag ?? 30)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function reflect(v: number, lo: number, hi: number, h: number) {
  if (v < lo) return { v: lo, h: Math.PI - h }
  if (v > hi) return { v: hi, h: Math.PI - h }
  return { v, h }
}
function reflectY(v: number, lo: number, hi: number, h: number) {
  if (v < lo) return { v: lo, h: -h }
  if (v > hi) return { v: hi, h: -h }
  return { v, h }
}

const sim = computed(() => {
  const zz = (zigzag.value * Math.PI) / 180
  let pred = { x: 100, y: 260 }
  let prey = { x: 420, y: 260 }
  let predHeading = 0
  const predTrail = [{ ...pred }]
  const preyTrail = [{ ...prey }]
  let minDist = Math.hypot(pred.x - prey.x, pred.y - prey.y)
  for (let tstep = 1; tstep <= step.value; tstep++) {
    const idx = Math.max(0, tstep - 1 - delay.value)
    const stalePred = predTrail[idx]
    let awayAngle = Math.atan2(prey.y - stalePred.y, prey.x - stalePred.x)
    awayAngle += zz * Math.sin((2 * Math.PI * tstep) / ZIGZAG_PERIOD)
    let px = prey.x + Math.cos(awayAngle) * PREY_SPEED
    let py = prey.y + Math.sin(awayAngle) * PREY_SPEED
    const rx = reflect(px, ARENA.x0, ARENA.x1, awayAngle)
    px = rx.v
    const ry = reflectY(py, ARENA.y0, ARENA.y1, rx.h)
    py = ry.v
    prey = { x: px, y: py }

    const desired = Math.atan2(prey.y - pred.y, prey.x - pred.x)
    let diff = desired - predHeading
    while (diff > Math.PI) diff -= 2 * Math.PI
    while (diff < -Math.PI) diff += 2 * Math.PI
    diff = Math.max(-PRED_TURN, Math.min(PRED_TURN, diff))
    predHeading += diff
    let qx = pred.x + Math.cos(predHeading) * PRED_SPEED
    let qy = pred.y + Math.sin(predHeading) * PRED_SPEED
    const qrx = reflect(qx, ARENA.x0, ARENA.x1, predHeading)
    qx = qrx.v
    predHeading = qrx.h
    const qry = reflectY(qy, ARENA.y0, ARENA.y1, predHeading)
    qy = qry.v
    predHeading = qry.h
    pred = { x: qx, y: qy }

    predTrail.push({ ...pred })
    preyTrail.push({ ...prey })
    minDist = Math.min(minDist, Math.hypot(pred.x - prey.x, pred.y - prey.y))
  }
  const dist = Math.hypot(pred.x - prey.x, pred.y - prey.y)
  return { pred, prey, predTrail, preyTrail, dist, minDist, caught: minDist < CATCH_R }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 55) {
    last = now
    if (step.value >= MAX_STEP || sim.value.caught) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const trailPts = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

const readouts = computed(() => [
  { label: t('esc.step'), value: String(step.value) },
  { label: t('esc.dist'), value: fmt(sim.value.dist, 0), color: 'var(--accent)' },
  { label: t('esc.minDist'), value: fmt(sim.value.minDist, 0) },
  { label: t('esc.caught'), value: sim.value.caught ? t('esc.yes') : t('esc.no'), color: sim.value.caught ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('esc.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('esc.hint') }}</text>
      <rect :x="ARENA.x0" :y="ARENA.y0" :width="ARENA.x1 - ARENA.x0" :height="ARENA.y1 - ARENA.y0" fill="var(--sunken)" stroke="var(--line)" rx="8" />
      <polyline :points="trailPts(sim.preyTrail)" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-opacity="0.5" />
      <polyline :points="trailPts(sim.predTrail)" fill="none" stroke="var(--neg)" stroke-width="1.5" stroke-opacity="0.5" />
      <circle :cx="sim.prey.x" :cy="sim.prey.y" r="8" fill="var(--accent)" />
      <circle :cx="sim.pred.x" :cy="sim.pred.y" r="9" :fill="sim.caught ? 'var(--neg)' : 'var(--accent-2)'" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
