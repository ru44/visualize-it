<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Creatures with energy wander a grid, eat food that appears, lose energy every step, split in
// two once they have enough energy, and starve once they run out.
// params: initial (starting population), food (food grains appearing per step), step (time).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 36
const ROWS = 22
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const MAX_STEP = 150
const MAX_POP = 60
const EAT_GAIN = 6
const REPRO_AT = 12

interface Creature { x: number; y: number; e: number }

const initial = computed(() => Math.max(2, Math.min(30, Math.round(props.params.initial ?? 10))))
const food = computed(() => Math.max(1, Math.min(20, Math.round(props.params.food ?? 6))))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function rng() {
  let s = 7654321
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Replays from scratch every time, so a given (initial, food, step) always draws the same picture.
const world = computed(() => {
  const rnd = rng()
  const foodGrid = new Uint8Array(COLS * ROWS)
  let creatures: Creature[] = []
  for (let i = 0; i < initial.value; i++) creatures.push({ x: Math.floor(rnd() * COLS), y: Math.floor(rnd() * ROWS), e: 8 })

  let births = 0
  let deaths = 0
  for (let s = 0; s < step.value; s++) {
    births = 0
    deaths = 0
    for (let f = 0; f < food.value; f++) {
      const idx = Math.floor(rnd() * foodGrid.length)
      foodGrid[idx] = 1
    }
    const next: Creature[] = []
    for (const c of creatures) {
      const dir = Math.floor(rnd() * 5) // 0 stay, 1 up, 2 down, 3 left, 4 right
      if (dir === 1) c.y = (c.y - 1 + ROWS) % ROWS
      else if (dir === 2) c.y = (c.y + 1) % ROWS
      else if (dir === 3) c.x = (c.x - 1 + COLS) % COLS
      else if (dir === 4) c.x = (c.x + 1) % COLS
      c.e -= 1
      const idx = c.y * COLS + c.x
      if (foodGrid[idx]) { c.e += EAT_GAIN; foodGrid[idx] = 0 }
      if (c.e <= 0) { deaths++; continue }
      if (c.e >= REPRO_AT && next.length < MAX_POP) {
        c.e = Math.floor(c.e / 2)
        births++
        next.push({ x: c.x, y: c.y, e: c.e }, { x: c.x, y: c.y, e: c.e })
      } else {
        next.push(c)
      }
    }
    creatures = next.slice(0, MAX_POP)
  }
  return { foodGrid, creatures, births, deaths }
})

const foodDots = computed(() => {
  const out: { x: number; y: number }[] = []
  world.value.foodGrid.forEach((v, i) => { if (v) out.push({ x: i % COLS, y: (i / COLS) | 0 }) })
  return out
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('alife.step'), value: String(step.value) },
  { label: t('alife.population'), value: String(world.value.creatures.length), color: 'var(--accent)' },
  { label: t('alife.births'), value: String(world.value.births), color: 'var(--pos)' },
  { label: t('alife.deaths'), value: String(world.value.deaths), color: 'var(--neg)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('alife.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('alife.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <circle v-for="(f, i) in foodDots" :key="'f' + i" :cx="X0 + f.x * CELL + CELL / 2" :cy="Y0 + f.y * CELL + CELL / 2" :r="CELL * 0.14" fill="var(--pos)" />
      </g>
      <g>
        <circle
          v-for="(c, i) in world.creatures"
          :key="i"
          :cx="X0 + c.x * CELL + CELL / 2"
          :cy="Y0 + c.y * CELL + CELL / 2"
          :r="Math.max(2, Math.min(CELL * 0.42, 2 + c.e * 0.35))"
          fill="var(--accent)"
          stroke="var(--panel)"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
