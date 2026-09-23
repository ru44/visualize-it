<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Pedestrian flow. Walkers cross a corridor in both directions, steering away from anyone close
// by (more strongly from oncoming walkers, so lanes form) and drifting toward a doorway gap in a
// wall partway along. A narrow gap makes the crowd queue up and clog.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const Y0 = 90
const CH = 320
const WALLX = W * 0.55
const RADIUS = 32

const gap = computed(() => Math.max(0.15, Math.min(1, props.params.gap ?? 0.35)))
const walkerCount = computed(() => Math.max(10, Math.min(50, Math.round(props.params.n ?? 30))))
const frame = computed(() => Math.max(0, Math.min(150, Math.round(props.params.t ?? 0))))

function rng(s: number) {
  let x = s
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Recomputes the whole history from a fixed seed up to `frame`, so the same sliders always give
// the same picture.
const world = computed(() => {
  const rnd = rng(walkerCount.value * 131 + 7)
  const N = walkerCount.value
  let x = new Array<number>(N)
  let y = new Array<number>(N)
  const dir = new Array<number>(N)
  const spd = new Array<number>(N)
  for (let i = 0; i < N; i++) {
    x[i] = rnd() * W
    y[i] = Y0 + rnd() * CH
    dir[i] = rnd() < 0.5 ? 1 : -1
    spd[i] = 1.6 * (0.8 + 0.4 * rnd())
  }
  const gapCY = Y0 + CH / 2
  const gapHalf = (gap.value * CH) / 2
  const gapY0 = gapCY - gapHalf
  const gapY1 = gapCY + gapHalf

  for (let step = 0; step < frame.value; step++) {
    const nx = x.slice()
    const ny = y.slice()
    for (let i = 0; i < N; i++) {
      let rx = 0
      let ry = 0
      for (let j = 0; j < N; j++) {
        if (i === j) continue
        const dx = x[i] - x[j]
        const dy = y[i] - y[j]
        const d2 = dx * dx + dy * dy
        if (d2 < RADIUS * RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const w = dir[i] !== dir[j] ? 2.2 : 1
          rx += (dx / d) * (w / d) * 140
          ry += (dy / d) * (w / d) * 140
        }
      }
      const pullY = Math.sign(gapCY - y[i]) * 0.25 * spd[i]
      let vx = dir[i] * spd[i] + rx * 0.06
      let vy = pullY + ry * 0.06
      const mag = Math.hypot(vx, vy)
      const maxS = spd[i] * 1.6
      if (mag > maxS) { vx = (vx / mag) * maxS; vy = (vy / mag) * maxS }
      let px = x[i] + vx
      const py0 = y[i] + vy
      if ((x[i] - WALLX) * (px - WALLX) < 0 && !(y[i] >= gapY0 && y[i] <= gapY1)) px = WALLX - dir[i] * 4
      if (px < 0) px += W
      if (px > W) px -= W
      nx[i] = px
      ny[i] = Math.max(Y0 + 4, Math.min(Y0 + CH - 4, py0))
    }
    x = nx
    y = ny
  }
  let queued = 0
  for (let i = 0; i < N; i++) if (Math.abs(x[i] - WALLX) < 20 && !(y[i] >= gapY0 && y[i] <= gapY1)) queued++
  return { x, y, dir, gapY0, gapY1, queued }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 45) {
    last = now
    if (frame.value >= 150) emit('set', 't', 0)
    else emit('set', 't', frame.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('crowd.gap'), value: `${fmt(100 * gap.value, 0)}%` },
  { label: t('crowd.walkers'), value: String(walkerCount.value) },
  { label: t('crowd.queued'), value: String(world.value.queued), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0)">{{ t('crowd.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('crowd.hint') }}</text>
      <rect :x="8" :y="Y0" :width="W - 16" :height="CH" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="WALLX - 3" :y="Y0" :width="6" :height="world.gapY0 - Y0" fill="var(--muted)" />
      <rect :x="WALLX - 3" :y="world.gapY1" :width="6" :height="Y0 + CH - world.gapY1" fill="var(--muted)" />
      <g v-for="(px, i) in world.x" :key="i">
        <circle :cx="px" :cy="world.y[i]" r="5.5" :fill="world.dir[i] > 0 ? 'var(--accent)' : 'var(--accent-2)'" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
