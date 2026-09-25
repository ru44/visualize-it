<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/batteries-and-internal-resistance. params: emf (ε, V), r (internal resistance, Ω),
// R (load, Ω). The battery box contains a small internal zig-zag resistor (r) in series with the
// ideal EMF source, then an external zig-zag load resistor (R). A vertical bar compares the full
// EMF against the sagged terminal voltage directly, making the "lost" voltage visible as a gap.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const TOP = 120
const BOT = 360
const BX = 140
const RX = 620

const emf = computed(() => Math.max(props.params.emf ?? 12.6, 0.01))
const rInt = computed(() => Math.max(props.params.r ?? 0.02, 0.001))
const rLoad = computed(() => Math.max(props.params.R ?? 5, 0.01))
const current = computed(() => emf.value / (rInt.value + rLoad.value))
const terminal = computed(() => emf.value - current.value * rInt.value)
const sag = computed(() => emf.value - terminal.value)

function zigzag(x1: number, y1: number, x2: number, y2: number, n = 5, amp = 8): [number, number][] {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1e-6
  const px = -dy / len, py = dx / len
  const pts: [number, number][] = [[x1, y1]]
  for (let i = 1; i < n; i++) { const f = i / n; const s = i % 2 === 0 ? -1 : 1; pts.push([x1 + dx * f + px * amp * s, y1 + dy * f + py * amp * s]) }
  pts.push([x2, y2])
  return pts
}
const toPath = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')

const battY = (TOP + BOT) / 2
const internalZig = zigzag(BX + 10, battY, BX + 90, battY)
const loadZig = zigzag(360, TOP, 560, TOP)

// --- Animated current dots ---
const loopPts: [number, number][] = [[BX, TOP], [BX, battY - 30], [BX + 10, battY], ...internalZig, [BX + 90, battY], [BX, battY + 30], [BX, BOT], [360, BOT], [360, TOP], ...loadZig, [560, TOP], [RX, TOP], [RX, BOT], [BX, BOT]]
function pathLen(pts: [number, number][]) {
  let total = 0
  const segs: number[] = []
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); total += d }
  return { segs, total }
}
function pointAt(pts: [number, number][], s: number) {
  const { segs, total } = pathLen(pts)
  let target = ((s % total) + total) % total
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i] || i === segs.length - 1) { const f = segs[i] > 0 ? target / segs[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f] as [number, number] }
    target -= segs[i]
  }
  return pts[0]
}
const DOTS = 10
const dist = ref(0)
let raf = 0, last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  dist.value += Math.min(current.value * 40, 250) * dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => { last = performance.now(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const totalLen = pathLen(loopPts).total
const dots = computed(() => Array.from({ length: DOTS }, (_, i) => pointAt(loopPts, dist.value + (i * totalLen) / DOTS)))

function drag(e: PointerEvent, el: SVGSVGElement) {
  const box = el.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height))
  emit('set', 'r', 1 * frac)
}
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function down(e: PointerEvent) { dragging.value = true; svg.value?.setPointerCapture(e.pointerId); if (svg.value) drag(e, svg.value) }
function move(e: PointerEvent) { if (dragging.value && svg.value) drag(e, svg.value) }

const barH = 180
const barY0 = 60
const emfBarH = computed(() => (emf.value / 24) * barH)
const termBarH = computed(() => (terminal.value / 24) * barH)

const readouts = computed(() => [
  { label: 'ε', value: `${fmt(emf.value)} V` },
  { label: 'r', value: `${fmt(rInt.value, 3)} Ω` },
  { label: 'R', value: `${fmt(rLoad.value)} Ω` },
  { label: 'I', value: `${fmt(current.value)} A` },
  { label: 'V = ε-Ir', value: `${fmt(terminal.value)} V`, color: 'var(--accent)' },
  { label: 'sag', value: `${fmt(sag.value)} V`, color: 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="move" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('bir.hint') }}</text>

      <!-- battery box with internal resistor -->
      <rect :x="BX - 30" :y="battY - 60" width="150" height="120" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <text :x="BX + 45" :y="battY - 70" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('bir.batteryLabel') }}</text>
      <line :x1="BX" :y1="TOP" :x2="BX" :y2="battY - 30" stroke="var(--fg)" stroke-width="2" />
      <line :x1="BX" :y1="battY + 30" :x2="BX" :y2="BOT" stroke="var(--fg)" stroke-width="2" />
      <path :d="toPath([[BX, battY - 30], [BX + 10, battY], ...internalZig, [BX + 90, battY], [BX, battY + 30]])" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="BX + 45" :y="battY + 46" text-anchor="middle" font-size="11" fill="var(--accent-2)">r</text>

      <!-- external load -->
      <line :x1="BX" :y1="TOP" :x2="360" :y2="TOP" stroke="var(--fg)" stroke-width="2" />
      <path :d="toPath(loadZig)" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="560" :y1="TOP" :x2="RX" :y2="TOP" stroke="var(--fg)" stroke-width="2" />
      <line :x1="RX" :y1="TOP" :x2="RX" :y2="BOT" stroke="var(--fg)" stroke-width="2" />
      <line :x1="RX" :y1="BOT" :x2="BX" :y2="BOT" stroke="var(--fg)" stroke-width="2" />
      <text x="460" :y="TOP - 14" text-anchor="middle" font-size="11" fill="var(--accent)">R</text>

      <circle v-for="(d, i) in dots" :key="i" :cx="d[0]" :cy="d[1]" r="4" fill="var(--fg)" />

      <!-- EMF vs terminal-voltage bars -->
      <g transform="translate(660, 0)">
        <text x="0" :y="barY0 - 10" font-size="10" fill="var(--muted)">{{ t('bir.emf') }}</text>
        <rect x="0" :y="barY0 + barH - emfBarH" width="26" :height="emfBarH" fill="var(--muted)" />
        <text x="50" :y="barY0 - 10" font-size="10" fill="var(--muted)">{{ t('bir.terminal') }}</text>
        <rect x="40" :y="barY0 + barH - termBarH" width="26" :height="termBarH" fill="var(--accent)" />
        <line x1="0" :y1="barY0 + barH" x2="80" :y2="barY0 + barH" stroke="var(--line)" />
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('bir.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
