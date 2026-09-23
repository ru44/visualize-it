<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'
import { boidPoints, seededRng, torusDelta } from './boidsCore'

// Why groups decide better than individuals: N followers each get a noisy private reading of a
// true target direction, then simply average the heading of nearby neighbours (their own noisy
// opinion counts too). No one follower is reliable, but the group's mean heading converges on the
// true direction as N grows, because independent errors cancel — the "wisdom of crowds".
// params: n (group size), individualNoise (degrees, how bad each private reading is), t (step).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const R = 70 // who counts as a "nearby" neighbour, px
const T_MAX = 200
const TARGET = -0.5 // the true direction, radians; arbitrary but fixed
const n = computed(() => Math.max(4, Math.min(200, Math.round(props.params.n ?? 40))))
const indivNoise = computed(() => Math.max(0, Math.min(180, props.params.individualNoise ?? 60)) * (Math.PI / 180))
const step = computed(() => Math.max(0, Math.min(T_MAX, Math.round(props.params.t ?? 0))))

interface Agent { x: number; y: number; h: number }

function seed(count: number, amp: number): Agent[] {
  const rnd = seededRng(11)
  const cols = Math.ceil(Math.sqrt((count * W) / H))
  return Array.from({ length: count }, (_, i) => ({
    x: 60 + (i % cols) * ((W - 120) / Math.max(1, cols - 1 || 1)),
    y: 60 + Math.floor(i / cols) * 46,
    h: TARGET + (rnd() - 0.5) * 2 * amp, // each agent's own noisy private opinion
  }))
}

function relax(agents: Agent[], amp: number, seedStep: number): Agent[] {
  let s = (seedStep * 2654435761 + 7) >>> 0
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
  return agents.map((ai, i) => {
    let sx = Math.cos(ai.h)
    let sy = Math.sin(ai.h)
    let c = 1
    for (let j = 0; j < agents.length; j++) {
      if (j === i) continue
      const aj = agents[j]
      if (Math.hypot(torusDelta(aj.x, ai.x, W), torusDelta(aj.y, ai.y, H)) < R) { sx += Math.cos(aj.h); sy += Math.sin(aj.h); c++ }
    }
    // Blend the neighbourhood average back with this agent's own fixed private noisy reading,
    // rather than letting it drift arbitrarily — everyone keeps re-consulting their own evidence.
    const own = TARGET + (rnd() - 0.5) * 2 * amp
    const h = Math.atan2(sy / c + Math.sin(own) * 0.5, sx / c + Math.cos(own) * 0.5)
    return { ...ai, h }
  })
}

const world = computed(() => {
  let a = seed(n.value, indivNoise.value)
  for (let i = 0; i < step.value; i++) a = relax(a, indivNoise.value, i)
  return a
})
const groupHeading = computed(() => {
  const a = world.value
  const sx = a.reduce((s, b) => s + Math.cos(b.h), 0) / a.length
  const sy = a.reduce((s, b) => s + Math.sin(b.h), 0) / a.length
  return Math.atan2(sy, sx)
})
const groupError = computed(() => Math.abs(((groupHeading.value - TARGET + Math.PI) % (2 * Math.PI)) - Math.PI) * (180 / Math.PI))
const meanIndivError = computed(() => {
  const a = world.value
  return a.reduce((s, b) => s + Math.abs(((b.h - TARGET + Math.PI) % (2 * Math.PI)) - Math.PI), 0) / a.length * (180 / Math.PI)
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 70) {
    last = now
    if (step.value >= T_MAX) playing.value = false
    else emit('set', 't', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('boids.t'), value: String(step.value) },
  { label: t('choice.groupError'), value: fmt(groupError.value, 1) + '°', color: 'var(--accent)' },
  { label: t('choice.indivError'), value: fmt(meanIndivError.value, 1) + '°', color: 'var(--neg)' },
  { label: t('choice.n'), value: String(n.value) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0)">{{ t('boids.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('choice.hint') }}</text>
      <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <line :x1="W - 90" :y1="60" :x2="W - 90 + Math.cos(TARGET) * 40" :y2="60 + Math.sin(TARGET) * 40" stroke="var(--pos)" stroke-width="3" />
      <text class="num" :x="W - 90" y="48" font-size="11" fill="var(--pos)" text-anchor="middle">{{ t('choice.target') }}</text>
      <polygon v-for="(a, i) in world" :key="i" :points="boidPoints(a.x, a.y, a.h, 12, 7)" fill="var(--accent-2)" opacity="0.9" />
      <line :x1="80" :y1="H - 40" :x2="80 + Math.cos(groupHeading) * 50" :y2="H - 40 + Math.sin(groupHeading) * 50" stroke="var(--accent)" stroke-width="4" />
      <text class="num" x="80" :y="H - 52" font-size="11" fill="var(--accent)" text-anchor="middle">{{ t('choice.group') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
