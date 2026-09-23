<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Abelian sandpile (Bak–Tang–Wiesenfeld). Grains pile up one at a time; any cell with 4 or
// more grains topples, giving one grain to each neighbour, which can trigger a chain reaction.
// params: site (0 drop at the centre, 1 drop at a random cell), drops (how many grains so far).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 26
const ROWS = 26
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const MAX_DROPS = 200

const site = computed(() => Math.round(props.params.site ?? 0))
const drops = computed(() => Math.max(0, Math.min(MAX_DROPS, Math.round(props.params.drops ?? 0))))

function rng() {
  let s = 20260923
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Replays every drop from scratch, so any `drops` value gives the same picture every time.
const world = computed(() => {
  const g = new Array(COLS * ROWS).fill(0)
  const rnd = rng()
  let lastAvalanche = 0
  let maxAvalanche = 0
  let grains = 0
  for (let d = 0; d < drops.value; d++) {
    const cx = site.value ? Math.floor(rnd() * COLS) : COLS >> 1
    const cy = site.value ? Math.floor(rnd() * ROWS) : ROWS >> 1
    const start = cy * COLS + cx
    g[start]++
    grains++
    // Unstable cells are queued (not re-scanned), so one avalanche costs one step per topple.
    let topples = 0
    const queue = [start]
    while (queue.length && topples < 20000) {
      const idx = queue.pop()!
      if (g[idx] < 4) continue
      const x = idx % COLS
      const y = (idx / COLS) | 0
      g[idx] -= 4
      topples++
      if (x > 0) queue.push(idx - 1), g[idx - 1]++
      if (x < COLS - 1) queue.push(idx + 1), g[idx + 1]++
      if (y > 0) queue.push(idx - COLS), g[idx - COLS]++
      if (y < ROWS - 1) queue.push(idx + COLS), g[idx + COLS]++
    }
    lastAvalanche = topples
    if (topples > maxAvalanche) maxAvalanche = topples
  }
  return { g, lastAvalanche, maxAvalanche, grains }
})

const colors = ['var(--sunken)', 'var(--line)', 'var(--accent-2)', 'var(--accent)']

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 45) {
    last = now
    if (drops.value >= MAX_DROPS) playing.value = false
    else emit('set', 'drops', drops.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('sandpile.drops'), value: String(drops.value) },
  { label: t('sandpile.grains'), value: String(world.value.grains), color: 'var(--accent)' },
  { label: t('sandpile.avalanche'), value: String(world.value.lastAvalanche), color: 'var(--accent-2)' },
  { label: t('sandpile.maxAvalanche'), value: String(world.value.maxAvalanche) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'drops', 0)">{{ t('sandpile.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sandpile.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(z, i) in world.g"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          rx="1"
          :fill="colors[Math.min(3, z)]"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
