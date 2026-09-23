<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// 1D directed bond percolation: a space-time diagram. Row 0 has one active site; each active
// site at time t can activate its own column and the next column at time t+1, each independently
// with probability p. Below the critical p ≈ 0.6447 a single seed always dies out eventually;
// above it, it has a positive chance of activity that never stops.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 70
const MAX_GEN = 120
const CELL = Math.min((W - 40) / COLS, (H - 60) / MAX_GEN)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40

const p = computed(() => Math.max(0, Math.min(1, props.params.p ?? 0.65)))
const gen = computed(() => Math.max(0, Math.min(MAX_GEN, Math.round(props.params.gen ?? 0))))

function rng() {
  let s = 31415926
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Replays the whole space-time diagram up to `gen`, so a given (p, gen) always draws the same picture.
const world = computed(() => {
  const rnd = rng()
  const rows: Uint8Array[] = []
  let row = new Uint8Array(COLS)
  row[COLS >> 1] = 1
  rows.push(row)
  let activeNow = 1
  let everActive = 1
  for (let g = 0; g < gen.value; g++) {
    const next = new Uint8Array(COLS)
    for (let x = 0; x < COLS; x++) {
      let on = false
      if (row[x] && rnd() < p.value) on = true
      if (x + 1 < COLS && row[x + 1] && rnd() < p.value) on = true
      if (on) next[x] = 1
    }
    row = next
    rows.push(row)
    activeNow = row.reduce((a, b) => a + b, 0)
    everActive += activeNow
  }
  return { rows, activeNow, everActive }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 60) {
    last = now
    if (gen.value >= MAX_GEN) playing.value = false
    else emit('set', 'gen', gen.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('dp.gen'), value: String(gen.value) },
  { label: t('dp.active'), value: String(world.value.activeNow), color: 'var(--accent)' },
  { label: t('dp.ever'), value: String(world.value.everActive) },
  { label: t('dp.status'), value: world.value.activeNow > 0 ? t('dp.alive') : t('dp.dead'), color: world.value.activeNow > 0 ? 'var(--accent)' : 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'gen', 0)">{{ t('dp.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('dp.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="MAX_GEN * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="(row, y) in world.rows" :key="y">
        <rect
          v-for="(c, x) in row"
          v-show="c"
          :key="x"
          :x="X0 + x * CELL + 0.5"
          :y="Y0 + y * CELL + 0.5"
          :width="CELL - 0.5"
          :height="CELL - 0.5"
          fill="var(--accent)"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
