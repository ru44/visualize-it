<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A population of flight paths (DNA = a starting heading plus a turn at every step) tries to reach
// the target through a gap in the wall. Each generation: the fittest paths breed (crossover) with a
// chance of mutation, and nobody ever programmed "turn left here" — selection finds it on its own.
// params: mutationRate (chance a gene is replaced), gen (which generation is shown).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const T = 24
const POP = 20
const GENS = 14
const HALF_ANGLE = Math.PI / 5
const SPEED = 15
const START = { x: 400, y: 440 }
const TARGET = { x: 400, y: 52, r: 16 }
const WALL_Y = 260
const GAP = [340, 460]

const mutationRate = computed(() => Math.max(0.01, Math.min(0.4, props.params.mutationRate ?? 0.06)))
const gen = computed(() => Math.max(0, Math.min(GENS - 1, Math.round(props.params.gen ?? 0))))

function rng(s: number) {
  let x = s
  return () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648
}
type Dna = number[]
function randomDna(r: () => number): Dna {
  return [r() * 2 * Math.PI, ...Array.from({ length: T - 1 }, () => (r() * 2 - 1) * HALF_ANGLE)]
}

interface Agent { path: { x: number; y: number }[]; reached: boolean; fitness: number }
function fly(dna: Dna): Agent {
  let heading = dna[0]
  let x = START.x
  let y = START.y
  const path = [{ x, y }]
  let reached = false
  let crashed = false
  let steps = T
  for (let i = 1; i < T; i++) {
    heading += dna[i]
    x = Math.max(0, Math.min(W, x + SPEED * Math.cos(heading)))
    y = Math.max(0, Math.min(H, y + SPEED * Math.sin(heading)))
    path.push({ x, y })
    if (y > WALL_Y - 4 && y < WALL_Y + 4 && (x < GAP[0] || x > GAP[1])) { crashed = true; steps = i; break }
    if (Math.hypot(x - TARGET.x, y - TARGET.y) < TARGET.r) { reached = true; steps = i; break }
  }
  const dEnd = Math.hypot(x - TARGET.x, y - TARGET.y)
  const fitness = reached ? 2 + (T - steps) / T : 1 / (1 + dEnd / 50) + (crashed ? 0 : 0.05)
  return { path, reached, fitness }
}

const trace = computed(() => {
  const r = rng(4242)
  let dnas = Array.from({ length: POP }, () => randomDna(r))
  const frames: { agents: Agent[]; avg: number; best: number; bestIdx: number; reachedCount: number }[] = []
  for (let g = 0; g < GENS; g++) {
    const agents = dnas.map(fly)
    const avg = agents.reduce((s, a) => s + a.fitness, 0) / agents.length
    let bestIdx = 0
    agents.forEach((a, i) => { if (a.fitness > agents[bestIdx].fitness) bestIdx = i })
    const reachedCount = agents.filter((a) => a.reached).length
    frames.push({ agents, avg, best: agents[bestIdx].fitness, bestIdx, reachedCount })

    const total = agents.reduce((s, a) => s + a.fitness, 0) || 1
    const pick = () => {
      let v = r() * total
      for (let i = 0; i < dnas.length; i++) { v -= agents[i].fitness; if (v <= 0) return dnas[i] }
      return dnas[dnas.length - 1]
    }
    const next: Dna[] = [dnas[bestIdx].slice()]
    while (next.length < POP) {
      const a = pick()
      const b = pick()
      const cut = Math.floor(T / 2)
      const child = [...a.slice(0, cut), ...b.slice(cut)]
      for (let i = 0; i < child.length; i++) if (r() < mutationRate.value) child[i] = i === 0 ? r() * 2 * Math.PI : (r() * 2 - 1) * HALF_ANGLE
      next.push(child)
    }
    dnas = next
  }
  return frames
})

const frame = computed(() => trace.value[gen.value])
const pts = (path: { x: number; y: number }[]) => path.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 550) {
    last = now
    if (gen.value >= GENS - 1) playing.value = false
    else emit('set', 'gen', gen.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
function restart() {
  emit('set', 'gen', 0)
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
}

const readouts = computed(() => [
  { label: t('ga.gen'), value: `${gen.value} / ${GENS - 1}` },
  { label: t('ga.reached'), value: `${frame.value.reachedCount} / ${POP}`, color: 'var(--pos)' },
  { label: t('ga.avgFitness'), value: frame.value.avg.toFixed(2) },
  { label: t('ga.bestFitness'), value: frame.value.best.toFixed(2), color: 'var(--accent)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('ga.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ga.hint') }}</text>
      <rect x="0" :y="WALL_Y - 3" :width="GAP[0]" height="6" fill="var(--muted)" />
      <rect :x="GAP[1]" :y="WALL_Y - 3" :width="W - GAP[1]" height="6" fill="var(--muted)" />
      <circle :cx="TARGET.x" :cy="TARGET.y" :r="TARGET.r" fill="none" stroke="var(--pos)" stroke-width="2" />
      <circle :cx="START.x" :cy="START.y" r="5" fill="var(--muted)" />
      <polyline v-for="(a, i) in frame.agents" :key="i" :points="pts(a.path)" fill="none" :stroke="a.reached ? 'var(--pos)' : 'var(--muted)'" :stroke-opacity="a.reached ? 0.7 : 0.35" stroke-width="1.5" />
      <polyline :points="pts(frame.agents[frame.bestIdx].path)" fill="none" stroke="var(--accent)" stroke-width="2.5" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
