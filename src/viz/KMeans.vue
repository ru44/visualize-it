<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// k-means clustering: pick k centres, assign every point to the nearest one, move each centre to
// the average of its points, repeat until nothing moves. params: k (guessed cluster count),
// iter (which round is shown). Points come from 3 fixed blobs so a wrong k visibly mis-groups them.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 40, r: 40, t: 40, b: 50 }
const MAX_ITER = 14
const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)', 'var(--fg)', 'var(--muted)']

const k = computed(() => Math.max(1, Math.min(6, Math.round(props.params.k ?? 3))))
const iterParam = computed(() => Math.max(0, Math.min(MAX_ITER, Math.round(props.params.iter ?? 0))))
const seed = ref(7)

function rng(s: number) {
  let x = s
  return () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648
}

interface Pt { x: number; y: number; group: number }
const points = computed<Pt[]>(() => {
  const r = rng(seed.value * 97 + 13)
  const blobs = [
    { x: 22, y: 70 },
    { x: 72, y: 74 },
    { x: 48, y: 20 },
  ]
  return Array.from({ length: 90 }, (_, i) => {
    const b = blobs[i % 3]
    const jx = (r() + r() + r() - 1.5) * 9
    const jy = (r() + r() + r() - 1.5) * 9
    return { x: Math.max(2, Math.min(98, b.x + jx)), y: Math.max(2, Math.min(98, b.y + jy)), group: -1 }
  })
})

function dist2(a: { x: number; y: number }, b: { x: number; y: number }) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}

interface Frame { centroids: { x: number; y: number }[]; groups: number[]; cost: number }
const frames = computed<Frame[]>(() => {
  const pts = points.value
  const r = rng(seed.value * 1000 + k.value)
  // k-means++ init: first centre random, the rest weighted towards points far from existing centres.
  const centroids: { x: number; y: number }[] = [pts[Math.floor(r() * pts.length)]]
  while (centroids.length < k.value) {
    const weights = pts.map((p) => Math.min(...centroids.map((c) => dist2(p, c))))
    const total = weights.reduce((a, b) => a + b, 0) || 1
    let pick = r() * total
    let idx = 0
    for (; idx < pts.length - 1 && pick > weights[idx]; idx++) pick -= weights[idx]
    centroids.push({ x: pts[idx].x, y: pts[idx].y })
  }
  const assign = (cs: { x: number; y: number }[]) =>
    pts.map((p) => cs.reduce((best, c, i) => (dist2(p, c) < dist2(p, cs[best]) ? i : best), 0))
  const cost = (cs: { x: number; y: number }[], groups: number[]) => pts.reduce((s, p, i) => s + Math.sqrt(dist2(p, cs[groups[i]])), 0)

  const out: Frame[] = []
  let cs = centroids
  let groups = assign(cs)
  out.push({ centroids: cs, groups, cost: cost(cs, groups) })
  for (let step = 1; step <= MAX_ITER; step++) {
    const next = cs.map((c, i) => {
      const own = pts.filter((_, pi) => groups[pi] === i)
      return own.length ? { x: own.reduce((s, p) => s + p.x, 0) / own.length, y: own.reduce((s, p) => s + p.y, 0) / own.length } : c
    })
    const nextGroups = assign(next)
    out.push({ centroids: next, groups: nextGroups, cost: cost(next, nextGroups) })
    if (nextGroups.every((g, i) => g === groups[i])) break
    cs = next
    groups = nextGroups
  }
  return out
})

const fi = computed(() => Math.min(iterParam.value, frames.value.length - 1))
const frame = computed(() => frames.value[fi.value])
const converged = computed(() => fi.value === frames.value.length - 1 && frames.value.length > 1)

const sx = (x: number) => PAD.l + (x / 100) * (W - PAD.l - PAD.r)
const sy = (y: number) => H - PAD.b - (y / 100) * (H - PAD.t - PAD.b)

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 450) {
    last = now
    if (fi.value >= frames.value.length - 1) playing.value = false
    else emit('set', 'iter', iterParam.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
function shuffle() {
  seed.value++
  emit('set', 'iter', 0)
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
}

const readouts = computed(() => [
  { label: t('kmeans.k'), value: String(k.value) },
  { label: t('kmeans.iter'), value: `${fi.value} / ${frames.value.length - 1}` },
  { label: t('kmeans.cost'), value: frame.value.cost.toFixed(1), color: 'var(--accent)' },
  { label: t('kmeans.converged'), value: converged.value ? t('kmeans.yes') : t('kmeans.no'), color: converged.value ? 'var(--pos)' : 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="shuffle">{{ t('kmeans.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('kmeans.hint') }}</text>
      <rect :x="PAD.l" :y="PAD.t" :width="W - PAD.l - PAD.r" :height="H - PAD.t - PAD.b" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(p, i) in points" :key="i" :cx="sx(p.x)" :cy="sy(p.y)" r="4.5" :fill="COLORS[frame.groups[i] % COLORS.length]" fill-opacity="0.75" />
      <g v-for="(c, i) in frame.centroids" :key="'c' + i">
        <rect :x="sx(c.x) - 7" :y="sy(c.y) - 7" width="14" height="14" :fill="COLORS[i % COLORS.length]" stroke="var(--fg)" stroke-width="1.5" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
