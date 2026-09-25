<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/kirchhoffs-laws. params: V, R1, R2, R3. A single battery + R1 lead to a junction that
// splits into two parallel branches, R2 and R3, which rejoin before returning to the battery — a
// small two-loop circuit. Dot density and speed on each branch reflect its share of the current, so
// the junction rule (I1 = I2 + I3) and the loop rule are both visible, not just computed.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const TOP = 110
const BOT = 370
const BX = 90
const JX = 340
const RX = 700

const V = computed(() => props.params.V ?? 12)
const R1 = computed(() => Math.max(props.params.R1 ?? 10, 0.01))
const R2 = computed(() => Math.max(props.params.R2 ?? 30, 0.01))
const R3 = computed(() => Math.max(props.params.R3 ?? 60, 0.01))

const R23 = computed(() => (R2.value * R3.value) / (R2.value + R3.value))
const I1 = computed(() => V.value / (R1.value + R23.value))
const V2 = computed(() => I1.value * R23.value)
const I2 = computed(() => V2.value / R2.value)
const I3 = computed(() => V2.value / R3.value)

function zigzag(x1: number, y1: number, x2: number, y2: number, n = 6, amp = 9): [number, number][] {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1e-6
  const ux = dx / len, uy = dy / len
  const px = -uy, py = ux
  const pts: [number, number][] = [[x1, y1]]
  for (let i = 1; i < n; i++) {
    const f = i / n
    const s = i % 2 === 0 ? -1 : 1
    pts.push([x1 + dx * f + px * amp * s, y1 + dy * f + py * amp * s])
  }
  pts.push([x2, y2])
  return pts
}
const toPath = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')

const battY = (TOP + BOT) / 2
const r1Zig = zigzag(BX + 60, TOP, JX - 20, TOP)
const r2Zig = zigzag(JX, TOP + 40, JX, TOP + 140)
const r3Zig = zigzag(JX, BOT - 140, JX, BOT - 40)

const mainPath = computed(() => toPath([[BX, TOP], [BX + 60, TOP]]) + ' ' + toPath(r1Zig) + ' ' + toPath([[JX - 20, TOP], [JX, TOP], [JX, TOP + 40]]))
const r2Path = computed(() => toPath(r2Zig))
const r3Path = computed(() => toPath(r3Zig))
const rejoinPath = computed(() => toPath([[JX, TOP + 140], [JX, 240], [RX, 240], [RX, BOT - 140]]) + ' ' + toPath([[JX, BOT - 40], [JX, 240]]))
const returnPath = computed(() => toPath([[RX, BOT - 40], [RX, BOT], [BX, BOT], [BX, battY + 16]]))

// --- Animated dots on the main branch and each parallel branch, speed reflecting current ---
const phase = reactive({ m: [0, 0.5], a: [0, 0.33, 0.66], b: [0, 0.5] })
function speedFor(i: number) {
  return Math.max(0.001, Math.min(0.04, Math.abs(i) * 0.03))
}
let raf = 0
function tick() {
  phase.m = phase.m.map((p) => p + speedFor(I1.value))
  phase.a = phase.a.map((p) => p + speedFor(I2.value))
  phase.b = phase.b.map((p) => p + speedFor(I3.value))
  raf = requestAnimationFrame(tick)
}
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

function pathLen(pts: [number, number][]) {
  let total = 0
  const segs: number[] = []
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); total += d }
  return { segs, total }
}
function pointAt(pts: [number, number][], t: number): [number, number] {
  const { segs, total } = pathLen(pts)
  let target = (((t % 1) + 1) % 1) * total
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i] || i === segs.length - 1) {
      const f = segs[i] > 0 ? target / segs[i] : 0
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]
    }
    target -= segs[i]
  }
  return pts[0]
}
const mainPts: [number, number][] = [[BX, TOP], ...r1Zig, [JX, TOP], [JX, TOP + 40]]
const dotsMain = computed(() => phase.m.map((p) => pointAt(mainPts, p)))
const dotsA = computed(() => phase.a.map((p) => pointAt(r2Zig, p)))
const dotsB = computed(() => phase.b.map((p) => pointAt(r3Zig, p)))

const readouts = computed(() => [
  { label: 'I1', value: `${fmt(I1.value)} A` },
  { label: 'I2', value: `${fmt(I2.value)} A`, color: 'var(--accent-2)' },
  { label: 'I3', value: `${fmt(I3.value)} A`, color: 'var(--accent-2)' },
  { label: 'I2 + I3', value: `${fmt(I2.value + I3.value)} A`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('kl.hint') }}</text>

      <!-- battery -->
      <line :x1="BX" :y1="TOP" :x2="BX" :y2="battY - 14" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="BX" :y1="battY + 14" :x2="BX" :y2="BOT" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="BX - 16" :y1="battY - 14" :x2="BX + 16" :y2="battY - 14" stroke="var(--fg)" stroke-width="2.5" />
      <line :x1="BX - 9" :y1="battY + 14" :x2="BX + 9" :y2="battY + 14" stroke="var(--fg)" stroke-width="1.5" />
      <text class="num" :x="BX - 30" :y="battY + 4" text-anchor="end" font-size="12" fill="var(--muted)">V = {{ fmt(V) }} V</text>

      <path :d="mainPath" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="r2Path" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="r3Path" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="rejoinPath" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="returnPath" fill="none" stroke="var(--fg)" stroke-width="1.5" />

      <circle :cx="JX" :cy="TOP + 20" r="4" fill="var(--fg)" />

      <text class="num" :x="(BX + 60 + JX) / 2" :y="TOP - 14" text-anchor="middle" font-size="12" fill="var(--muted)">R1 = {{ fmt(R1) }} Ω</text>
      <text class="num" :x="JX + 26" :y="(TOP + 40 + TOP + 140) / 2" font-size="12" fill="var(--muted)">R2 = {{ fmt(R2) }} Ω</text>
      <text class="num" :x="JX + 26" :y="(BOT - 140 + BOT - 40) / 2" font-size="12" fill="var(--muted)">R3 = {{ fmt(R3) }} Ω</text>

      <circle v-for="(p, i) in dotsMain" :key="'m' + i" :cx="p[0]" :cy="p[1]" r="4.5" fill="var(--fg)" />
      <circle v-for="(p, i) in dotsA" :key="'a' + i" :cx="p[0]" :cy="p[1]" r="4.5" fill="var(--accent-2)" />
      <circle v-for="(p, i) in dotsB" :key="'b' + i" :cx="p[0]" :cy="p[1]" r="4.5" fill="var(--accent-2)" />

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('kl.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
