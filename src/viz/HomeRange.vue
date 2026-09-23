<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// An animal wanders with a random heading, but a spring-like pull toward its den keeps dragging
// it back. It never runs away for good, and the patch of ground it visits stops growing once the
// wander and the pull balance out: that settled patch is its "home range".
// params: home (pull-back strength), explore (wander speed), step (ticks shown; scrubs the walk).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const ARENA = { x0: 40, y0: 60, x1: 760, y1: 460 }
const DEN = { x: (ARENA.x0 + ARENA.x1) / 2, y: (ARENA.y0 + ARENA.y1) / 2 }
const COLS = 36
const ROWS = 20
const CELL_W = (ARENA.x1 - ARENA.x0) / COLS
const CELL_H = (ARENA.y1 - ARENA.y0) / ROWS
const MAX_STEP = 300

const home = computed(() => Math.max(0, Math.min(1, props.params.home ?? 0.25)))
const explore = computed(() => Math.max(0.2, Math.min(3, props.params.explore ?? 1.2)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

const sim = computed(() => {
  const rnd = seeded(4242)
  let x = DEN.x
  let y = DEN.y
  let heading = rnd() * 2 * Math.PI
  const trail = [{ x, y }]
  const cells = new Map<string, { row: number; col: number }>()
  const mark = (px: number, py: number) => {
    const col = Math.max(0, Math.min(COLS - 1, Math.floor((px - ARENA.x0) / CELL_W)))
    const row = Math.max(0, Math.min(ROWS - 1, Math.floor((py - ARENA.y0) / CELL_H)))
    cells.set(`${row}:${col}`, { row, col })
  }
  mark(x, y)
  for (let tt = 0; tt < step.value; tt++) {
    heading += (rnd() - 0.5) * 1.1
    const wander = explore.value
    const pullX = -home.value * (x - DEN.x) * 0.05
    const pullY = -home.value * (y - DEN.y) * 0.05
    x += Math.cos(heading) * wander + pullX
    y += Math.sin(heading) * wander + pullY
    x = Math.max(ARENA.x0, Math.min(ARENA.x1, x))
    y = Math.max(ARENA.y0, Math.min(ARENA.y1, y))
    trail.push({ x, y })
    mark(x, y)
  }
  const dist = Math.hypot(x - DEN.x, y - DEN.y)
  return { trail, cells: [...cells.values()], pos: { x, y }, dist, area: cells.size }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 35) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 2)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const trailPts = computed(() => sim.value.trail.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '))
const readouts = computed(() => [
  { label: t('range.step'), value: String(step.value) },
  { label: t('range.area'), value: String(sim.value.area), color: 'var(--accent)' },
  { label: t('range.dist'), value: fmt(sim.value.dist, 0) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('range.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('range.hint') }}</text>
      <rect :x="ARENA.x0" :y="ARENA.y0" :width="ARENA.x1 - ARENA.x0" :height="ARENA.y1 - ARENA.y0" fill="var(--sunken)" stroke="var(--line)" rx="8" />
      <rect
        v-for="c in sim.cells"
        :key="`${c.row}:${c.col}`"
        :x="ARENA.x0 + c.col * CELL_W"
        :y="ARENA.y0 + c.row * CELL_H"
        :width="CELL_W"
        :height="CELL_H"
        fill="var(--accent)"
        fill-opacity="0.1"
      />
      <polyline :points="trailPts" fill="none" stroke="var(--muted)" stroke-width="1.2" stroke-opacity="0.6" />
      <rect :x="DEN.x - 7" :y="DEN.y - 7" width="14" height="14" fill="var(--pos)" rx="2" />
      <circle :cx="sim.pos.x" :cy="sim.pos.y" r="7" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
