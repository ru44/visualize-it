<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Pulse-coupled oscillators (fireflies): each one ticks at its own slightly different natural
// rate, but every flash it sees nudges its own phase forward a little. With enough coupling the
// whole field locks into one shared rhythm (Mirollo–Strogatz / Buck's synchronous fireflies).
// params: n (fireflies), k (coupling strength), step (generation shown; scrubs the simulation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 46
const MAX_STEP = 150
const BASE_OMEGA = (2 * Math.PI) / 42

const n = computed(() => Math.max(6, Math.min(40, Math.round(props.params.n ?? 24))))
const k = computed(() => Math.max(0, Math.min(1, props.params.k ?? 0.4)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

interface Fly { x: number; y: number; omega: number; phase0: number }
const flies = computed<Fly[]>(() => {
  const rnd = seeded(1000 + n.value)
  return Array.from({ length: n.value }, () => ({
    x: PAD + rnd() * (W - 2 * PAD),
    y: PAD + 30 + rnd() * (H - PAD - 60),
    omega: BASE_OMEGA * (0.75 + 0.5 * rnd()),
    phase0: rnd() * 2 * Math.PI,
  }))
})

const sim = computed(() => {
  const N = n.value
  const K = k.value
  let phases = flies.value.map((f) => f.phase0)
  for (let tt = 0; tt < step.value; tt++) {
    const prev = phases
    const next = new Array<number>(N)
    for (let i = 0; i < N; i++) {
      let nudge = 0
      for (let j = 0; j < N; j++) if (j !== i) nudge += Math.sin(prev[j] - prev[i])
      nudge *= K / N
      let p = (prev[i] + flies.value[i].omega + nudge) % (2 * Math.PI)
      if (p < 0) p += 2 * Math.PI
      next[i] = p
    }
    phases = next
  }
  let cx = 0
  let cy = 0
  for (const p of phases) { cx += Math.cos(p); cy += Math.sin(p) }
  return { phases, r: Math.sqrt(cx * cx + cy * cy) / N }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 80) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('fly.step'), value: String(step.value) },
  { label: t('fly.sync'), value: fmt(sim.value.r, 2), color: 'var(--accent)' },
  { label: 'n', value: String(n.value) },
  { label: 'K', value: fmt(k.value, 2) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('fly.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fly.hint') }}</text>
      <g v-for="(f, i) in flies" :key="i">
        <circle :cx="f.x" :cy="f.y" r="15" fill="var(--accent-2)" :fill-opacity="0.55 * Math.pow(Math.max(0, (1 + Math.cos(sim.phases[i])) / 2), 4)" />
        <circle :cx="f.x" :cy="f.y" r="5" fill="var(--fg)" :fill-opacity="0.3 + 0.7 * ((1 + Math.cos(sim.phases[i])) / 2)" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
