<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/cdn. params do (km to the origin server), de (km to the nearest edge), H (cache hit %).
// Light in fibre covers ~100 km per millisecond of round trip, so a request's time is simply its
// distance: t ≈ d/100 ms. A CDN wins by making most requests travel de instead of do.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const dOrigin = computed(() => Math.min(Math.max(props.params.do ?? 9000, 100), 12000))
const dEdge = computed(() => Math.min(Math.max(props.params.de ?? 50, 10), 500))
const hit = computed(() => Math.min(Math.max(props.params.H ?? 90, 0), 100))
const tOrigin = computed(() => dOrigin.value / 100)
const tEdge = computed(() => dEdge.value / 100)
const tAvg = computed(() => (hit.value * tEdge.value + (100 - hit.value) * tOrigin.value) / 100)

const YOU = { x: 110, y: 290 }
const EDGE = computed(() => ({ x: YOU.x + 60 + 120 * (dEdge.value / 500), y: 290 }))
const ORIGIN = computed(() => ({ x: 330 + 390 * (dOrigin.value / 12000), y: 250 }))

const time = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  time.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

// 10 requests looping: the first H% go to the edge, the rest arc to the origin
const requests = computed(() =>
  Array.from({ length: 10 }, (_, i) => {
    const toEdge = (i + 0.5) * 10 < hit.value
    const u = (time.value * (toEdge ? 0.7 : 0.25) + i * 0.37) % 1
    if (toEdge) {
      return { toEdge, x: YOU.x + (EDGE.value.x - YOU.x) * u, y: YOU.y - 20 * Math.sin(Math.PI * u) }
    }
    const arc = 140 + (ORIGIN.value.x - YOU.x) * 0.1
    const x = YOU.x + (ORIGIN.value.x - YOU.x) * u
    const y = YOU.y + (ORIGIN.value.y - YOU.y) * u - arc * Math.sin(Math.PI * u)
    return { toEdge, x, y }
  }),
)

const readouts = computed(() => [
  { label: t('cdn.edgeTrip'), value: `${fmt(tEdge.value, 1)} ms`, color: 'var(--pos)' },
  { label: t('cdn.originTrip'), value: `${fmt(tOrigin.value, 0)} ms`, color: 'var(--accent-2)' },
  { label: t('cdn.hitRate'), value: `${fmt(hit.value, 0)}%` },
  { label: 't̄ = H·tₑ + (1−H)·tₒ', value: `${fmt(tAvg.value, 1)} ms`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('cdn.hint') }}</text>

      <!-- the ocean between you and the origin -->
      <ellipse cx="440" cy="330" rx="180" ry="40" fill="var(--sunken)" opacity="0.7" />
      <text x="440" y="336" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('cdn.ocean') }}</text>

      <!-- requests in flight -->
      <circle v-for="(r, i) in requests" :key="i" :cx="r.x" :cy="r.y" r="4" :fill="r.toEdge ? 'var(--pos)' : 'var(--accent-2)'" />

      <!-- you -->
      <rect :x="YOU.x - 22" :y="YOU.y" width="44" height="30" rx="5" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <text :x="YOU.x" :y="YOU.y + 50" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('cdn.you') }}</text>

      <!-- the edge: a small fridge of copies nearby -->
      <rect :x="EDGE.x - 20" :y="EDGE.y - 2" width="40" height="34" rx="5" fill="var(--panel)" stroke="var(--pos)" stroke-width="2" />
      <text :x="EDGE.x" :y="EDGE.y + 20" text-anchor="middle" font-size="12">🗄</text>
      <text :x="EDGE.x" :y="EDGE.y + 52" text-anchor="middle" font-size="11" fill="var(--pos)">{{ t('cdn.edge') }}</text>
      <text :x="EDGE.x" :y="EDGE.y + 68" text-anchor="middle" font-size="9" fill="var(--muted)" class="num">{{ fmt(dEdge, 0) }} km</text>

      <!-- the origin: one big building far away -->
      <rect :x="ORIGIN.x - 26" :y="ORIGIN.y - 30" width="52" height="64" rx="5" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="ORIGIN.x" :y="ORIGIN.y + 8" text-anchor="middle" font-size="14">🏢</text>
      <text :x="ORIGIN.x" :y="ORIGIN.y + 54" text-anchor="middle" font-size="11" fill="var(--accent-2)">{{ t('cdn.origin') }}</text>
      <text :x="ORIGIN.x" :y="ORIGIN.y + 70" text-anchor="middle" font-size="9" fill="var(--muted)" class="num">{{ fmt(dOrigin, 0) }} km</text>

      <!-- average latency bar -->
      <rect x="120" y="400" width="560" height="16" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="120" y="400" :width="Math.min(560, (tAvg / 120) * 560)" height="16" rx="5" :fill="tAvg <= 10 ? 'var(--pos)' : tAvg <= 40 ? 'var(--accent-2)' : 'var(--neg)'" />
      <text x="120" y="436" font-size="10" fill="var(--muted)" class="num">{{ t('cdn.avg', { ms: fmt(tAvg, 1) }) }}</text>
      <text x="680" y="436" text-anchor="end" font-size="10" fill="var(--muted)" class="num">{{ t('cdn.noCdn', { ms: fmt(tOrigin, 0) }) }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('cdn.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
