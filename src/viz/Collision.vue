<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two carts on a track collide head-on. e = 1 is a perfectly elastic bounce, e = 0 is a perfectly inelastic
// crash where they move off stuck together; between the two, momentum is always conserved but kinetic energy
// leaks away as heat and sound as e falls. params: m1, m2 (kg), e (restitution, 0..1), t (0..1, time scrub).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const V1I = 4
const V2I = -1
const TRACK_Y = 300
const PXM = 30 // pixels per metre
const CX = 400

const m1 = computed(() => Math.max(0.5, props.params.m1 ?? 6))
const m2 = computed(() => Math.max(0.5, props.params.m2 ?? 6))
const e = computed(() => Math.max(0, Math.min(1, props.params.e ?? 1)))
const tProg = computed(() => Math.max(0, Math.min(1, props.params.t ?? 0)))

const halfW = (m: number) => 0.5 + 0.15 * m
const x1_0 = -6
const x2_0 = 6

const tCollide = computed(() => (x2_0 - x1_0 - halfW(m1.value) - halfW(m2.value)) / (V1I - V2I))
const v1f = computed(() => ((m1.value - e.value * m2.value) * V1I + (1 + e.value) * m2.value * V2I) / (m1.value + m2.value))
const v2f = computed(() => ((m2.value - e.value * m1.value) * V2I + (1 + e.value) * m1.value * V1I) / (m1.value + m2.value))
const tEnd = computed(() => tCollide.value + 1.3)
const time = computed(() => tProg.value * tEnd.value)
const hit = computed(() => time.value >= tCollide.value)

const x1c = computed(() => x1_0 + V1I * tCollide.value)
const x2c = computed(() => x2_0 + V2I * tCollide.value)
const x1 = computed(() => (hit.value ? x1c.value + v1f.value * (time.value - tCollide.value) : x1_0 + V1I * time.value))
const x2 = computed(() => (hit.value ? x2c.value + v2f.value * (time.value - tCollide.value) : x2_0 + V2I * time.value))
const cv1 = computed(() => (hit.value ? v1f.value : V1I))
const cv2 = computed(() => (hit.value ? v2f.value : V2I))

const px = (x: number) => CX + x * PXM
const cartH = (m: number) => Math.min(120, 28 + m * 4)

const p0 = computed(() => m1.value * V1I + m2.value * V2I)
const keBefore = computed(() => 0.5 * m1.value * V1I ** 2 + 0.5 * m2.value * V2I ** 2)
const keAfter = computed(() => 0.5 * m1.value * v1f.value ** 2 + 0.5 * m2.value * v2f.value ** 2)
const keLostPct = computed(() => (keBefore.value > 0 ? (1 - keAfter.value / keBefore.value) * 100 : 0))
const barMax = computed(() => Math.max(keBefore.value, 1))

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    const v = tProg.value + dt / 3.5
    if (v >= 1) (emit('set', 't', 1), (playing.value = false))
    else emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([m1, m2, e], () => (emit('set', 't', 0), (playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches)))

const readouts = computed(() => [
  { label: t('coll.momentum'), value: fmt(p0.value, 1) + ' kg·m/s', color: 'var(--fg)' },
  { label: t('coll.keBefore'), value: fmt(keBefore.value, 1) + ' J' },
  { label: t('coll.keAfter'), value: fmt(keAfter.value, 1) + ' J', color: 'var(--accent-2)' },
  { label: t('coll.keLost'), value: fmt(Math.max(0, keLostPct.value), 0) + ' %', color: keLostPct.value > 1 ? 'var(--neg)' : 'var(--pos)' },
  { label: 'v1, v2', value: `${fmt(cv1.value, 2)}, ${fmt(cv2.value, 2)} m/s` },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && tProg >= 1) $emit('set', 't', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0); playing = true">{{ t('coll.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('coll.hint') }}</text>
      <line x1="30" :y1="TRACK_Y + cartH(20) / 2 + 2" x2="770" :y2="TRACK_Y + cartH(20) / 2 + 2" stroke="var(--line)" stroke-width="2" />
      <!-- cart 1 -->
      <rect :x="px(x1) - halfW(m1) * PXM" :y="TRACK_Y - cartH(m1) / 2" :width="halfW(m1) * 2 * PXM" :height="cartH(m1)" rx="8" fill="var(--accent)" />
      <text class="num" :x="px(x1)" :y="TRACK_Y + 5" text-anchor="middle" font-size="13" fill="#fff">m₁</text>
      <line :x1="px(x1)" :x2="px(x1) + cv1 * 14" :y1="TRACK_Y - cartH(m1) / 2 - 14" :y2="TRACK_Y - cartH(m1) / 2 - 14" stroke="var(--fg)" stroke-width="2" marker-end="url(#arr1)" />
      <!-- cart 2 -->
      <rect :x="px(x2) - halfW(m2) * PXM" :y="TRACK_Y - cartH(m2) / 2" :width="halfW(m2) * 2 * PXM" :height="cartH(m2)" rx="8" fill="var(--accent-2)" />
      <text class="num" :x="px(x2)" :y="TRACK_Y + 5" text-anchor="middle" font-size="13" fill="#fff">m₂</text>
      <line :x1="px(x2)" :x2="px(x2) + cv2 * 14" :y1="TRACK_Y - cartH(m2) / 2 - 14" :y2="TRACK_Y - cartH(m2) / 2 - 14" stroke="var(--fg)" stroke-width="2" marker-end="url(#arr2)" />
      <defs>
        <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--fg)" /></marker>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--fg)" /></marker>
      </defs>
      <!-- kinetic energy bars -->
      <g transform="translate(660, 60)">
        <text class="num" x="0" y="-8" font-size="11" fill="var(--muted)">{{ t('coll.ke') }}</text>
        <rect x="0" :y="150 - (keBefore / barMax) * 150" width="30" :height="(keBefore / barMax) * 150" fill="var(--muted)" />
        <rect x="45" :y="150 - (keAfter / barMax) * 150" width="30" :height="(keAfter / barMax) * 150" fill="var(--accent-2)" />
        <text class="num" x="15" y="166" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('coll.before') }}</text>
        <text class="num" x="60" y="166" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('coll.after') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
