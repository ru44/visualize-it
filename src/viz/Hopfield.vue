<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A Hopfield network memorises a few patterns by wiring every cell to every other cell (Hebbian
// learning). Given a damaged copy of one, it flips cells one sweep at a time until the whole
// picture is restored — the network never stores pixels directly, only how cells agree with each
// other. params: pattern (which memory to test), noise (% of it corrupted), step (recall sweep).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 10
const NODES = N * N
const STEPS = 16
const NAMES = ['x', 'plus', 'square'] as const

function patternValue(idx: number, i: number, j: number): number {
  if (idx === 0) return i === j || i === N - 1 - j ? 1 : -1
  if (idx === 1) return i === 4 || i === 5 || j === 4 || j === 5 ? 1 : -1
  return i === 1 || i === N - 2 || j === 1 || j === N - 2 ? 1 : -1
}
function patternVec(idx: number): number[] {
  return Array.from({ length: NODES }, (_, k) => patternValue(idx, Math.floor(k / N), k % N))
}
const PATTERNS = [0, 1, 2].map(patternVec)

// Train once on all three memories (Hebbian rule), so the network really has three stored patterns.
const WEIGHTS: number[][] = Array.from({ length: NODES }, () => new Array(NODES).fill(0))
for (const v of PATTERNS)
  for (let i = 0; i < NODES; i++) for (let j = i + 1; j < NODES; j++) { const w = v[i] * v[j]; WEIGHTS[i][j] += w; WEIGHTS[j][i] += w }
let maxW = 0
for (const row of WEIGHTS) for (const w of row) maxW = Math.max(maxW, Math.abs(w))
if (maxW > 0) for (const row of WEIGHTS) for (let j = 0; j < row.length; j++) row[j] /= maxW

function rng(s: number) {
  let x = s
  return () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648
}
function shuffledIndices(seed: number): number[] {
  const r = rng(seed)
  const arr = Array.from({ length: NODES }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); ;[arr[i], arr[j]] = [arr[j], arr[i]] }
  return arr
}

const pattern = computed(() => Math.max(0, Math.min(2, Math.round(props.params.pattern ?? 0))))
const noise = computed(() => Math.max(0, Math.min(50, props.params.noise ?? 20)))
const step = computed(() => Math.max(0, Math.min(STEPS, Math.round(props.params.step ?? 0))))

function energy(v: number[]) {
  let e = 0
  for (let i = 0; i < NODES; i++) for (let j = i + 1; j < NODES; j++) e -= WEIGHTS[i][j] * v[i] * v[j]
  return e
}

const trace = computed(() => {
  const target = PATTERNS[pattern.value]
  const order = shuffledIndices(1000 + pattern.value)
  const flipCount = Math.round((noise.value / 100) * NODES)
  const vector = target.slice()
  for (let k = 0; k < flipCount; k++) vector[order[k]] *= -1
  const frames = [{ vector: vector.slice(), energy: energy(vector) }]
  for (let s = 0; s < STEPS; s++) {
    for (let node = 0; node < NODES; node++) {
      let sum = 0
      for (let other = 0; other < NODES; other++) if (other !== node) sum += WEIGHTS[node][other] * vector[other]
      vector[node] = sum >= 0 ? 1 : -1
    }
    frames.push({ vector: vector.slice(), energy: energy(vector) })
  }
  return frames
})

const frame = computed(() => trace.value[Math.min(step.value, trace.value.length - 1)])
const matchPct = computed(() => {
  const target = PATTERNS[pattern.value]
  const overlap = frame.value.vector.reduce((s, v, i) => s + v * target[i], 0) / NODES
  return ((overlap + 1) / 2) * 100
})

const CELL = 28
const X0 = 60
const Y0 = 70
const tCELL = 7
const TX = 660
const TY = 40

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 220) {
    last = now
    if (step.value >= STEPS) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
function restart() {
  emit('set', 'step', 0)
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
}

const readouts = computed(() => [
  { label: t('hop.pattern'), value: t(`hop.p.${NAMES[pattern.value]}` as any), color: 'var(--accent)' },
  { label: t('hop.noise'), value: `${noise.value.toFixed(0)}%` },
  { label: t('hop.step'), value: `${Math.min(step.value, STEPS)} / ${STEPS}` },
  { label: t('hop.match'), value: `${matchPct.value.toFixed(0)}%`, color: matchPct.value > 95 ? 'var(--pos)' : 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('hop.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('hop.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="N * CELL + 4" :height="N * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <rect v-for="(v, i) in frame.vector" :key="i" v-show="v > 0" :x="X0 + (i % N) * CELL + 1" :y="Y0 + Math.floor(i / N) * CELL + 1" :width="CELL - 2" :height="CELL - 2" rx="2" fill="var(--accent)" />
      <text :x="TX" :y="TY - 6" font-size="11" fill="var(--muted)">{{ t('hop.target') }}</text>
      <rect :x="TX - 1" :y="TY - 1" :width="N * tCELL + 2" :height="N * tCELL + 2" fill="none" stroke="var(--line)" />
      <rect v-for="(v, i) in PATTERNS[pattern]" :key="'t' + i" v-show="v > 0" :x="TX + (i % N) * tCELL" :y="TY + Math.floor(i / N) * tCELL" :width="tCELL" :height="tCELL" fill="var(--pos)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
