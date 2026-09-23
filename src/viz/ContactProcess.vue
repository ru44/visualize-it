<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// SIS contact process: an infected cell recovers each step with a fixed probability, and each
// healthy cell catches the infection from every infected neighbour independently with prob `rate`.
// Mean-field estimate: with 4 neighbours and recovery probability 0.5, the critical rate is
// about 0.5 / 4 = 0.125 — below it the infection always dies out on a large enough grid.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 34
const ROWS = 34
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const MAX_STEP = 150
const RECOVER = 0.5

const rate = computed(() => Math.max(0, Math.min(0.5, props.params.rate ?? 0.15)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function rng() {
  let s = 99019901
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Replays every step from a single infected seed in the centre, so `step` always gives the same grid.
const world = computed(() => {
  const rnd = rng()
  let g = new Uint8Array(COLS * ROWS)
  g[(ROWS >> 1) * COLS + (COLS >> 1)] = 1
  let everInfected = 1
  let infectedNow = 1
  for (let s = 0; s < step.value && infectedNow > 0; s++) {
    const next = new Uint8Array(g.length)
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++) {
        const idx = y * COLS + x
        if (g[idx]) {
          next[idx] = rnd() < RECOVER ? 0 : 1
        } else {
          let n = 0
          if (x > 0 && g[idx - 1]) n++
          if (x < COLS - 1 && g[idx + 1]) n++
          if (y > 0 && g[idx - COLS]) n++
          if (y < ROWS - 1 && g[idx + COLS]) n++
          const pInfect = 1 - (1 - rate.value) ** n
          next[idx] = rnd() < pInfect ? 1 : 0
        }
        if (next[idx]) everInfected++
      }
    g = next
    infectedNow = g.reduce((a, b) => a + b, 0)
  }
  return { g, infectedNow, everInfected }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 60) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('contact.step'), value: String(step.value) },
  { label: t('contact.infected'), value: String(world.value.infectedNow), color: 'var(--neg)' },
  { label: t('contact.ever'), value: String(world.value.everInfected) },
  { label: t('contact.status'), value: world.value.infectedNow > 0 ? t('contact.spreading') : t('contact.extinct'), color: world.value.infectedNow > 0 ? 'var(--accent)' : 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('contact.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('contact.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(c, i) in world.g"
          v-show="c"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          rx="1"
          fill="var(--neg)"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
