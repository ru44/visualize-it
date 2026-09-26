<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Distance by triangulation: as Earth swings across its orbit, a nearby star shifts against the far more
// distant background stars. params: p (parallax angle, arcsec), baseline (AU, normally Earth's 1 AU orbit).
// d(pc) = baseline / p.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const p = computed(() => Math.max(0.001, props.params.p ?? 0.3))
const baseline = computed(() => Math.max(0.1, props.params.baseline ?? 1))
const dPc = computed(() => baseline.value / p.value)
const dLy = computed(() => dPc.value * 3.26156)

const LANDMARKS = [
  { key: 'parallax.proxima', pc: 1.3 },
  { key: 'parallax.cygni', pc: 3.5 },
  { key: 'parallax.betelgeuse', pc: 168 },
  { key: 'parallax.galcenter', pc: 8000 },
  { key: 'parallax.andromeda', pc: 766000 },
] as const

const PAD_L = 232
const LOG_MIN = -0.5
const LOG_MAX = 6.6
const rx = (pc: number) => PAD_L + ((Math.log10(Math.max(pc, 0.3)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (760 - PAD_L)
const ROW_Y = [224, 268, 312, 356, 400]

// top diagram: Sun, orbiting Earth, and the near star's apparent wobble against a fixed background
const SUN = { x: 170, y: 110 }
const orbitR = computed(() => 24 + 20 * Math.log10(baseline.value + 1))
const amp = computed(() => 4 + 26 * Math.sqrt(p.value))
const STAR_BASE = { x: 360, y: 46 }
const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) { const dt = Math.min(now - last, 50) / 1000; last = now; clock.value += dt; raf = requestAnimationFrame(tick) }
onMounted(() => { last = performance.now(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const theta = computed(() => clock.value * 0.9)
const earth = computed(() => ({ x: SUN.x + orbitR.value * Math.cos(theta.value), y: SUN.y + orbitR.value * Math.sin(theta.value) * 0.42 }))
const star = computed(() => ({ x: STAR_BASE.x + amp.value * Math.cos(theta.value), y: STAR_BASE.y + amp.value * Math.sin(theta.value) * 0.35 }))
const bg = Array.from({ length: 24 }, (_, i) => ({ x: 250 + ((i * 53) % 190), y: 12 + ((i * 37) % 110) }))

const readouts = computed(() => [
  { label: t('parallax.distancePc'), value: `${fmt(dPc.value, dPc.value < 10 ? 2 : 0)} pc`, color: 'var(--accent-2)' },
  { label: t('parallax.distanceLy'), value: `${fmt(dLy.value, dLy.value < 10 ? 2 : 0)} ly` },
  { label: t('parallax.angle'), value: `${fmt(p.value, 3)}″` },
  { label: t('parallax.baselineLabel'), value: `${fmt(baseline.value, 1)} AU` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 800 480`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('parallax.hint') }}</text>
      <circle v-for="(b, i) in bg" :key="i" :cx="b.x" :cy="b.y" r="1.3" fill="var(--muted)" fill-opacity="0.6" />
      <circle :cx="SUN.x" :cy="SUN.y" r="8" fill="var(--accent-2)" />
      <ellipse :cx="SUN.x" :cy="SUN.y" :rx="orbitR" :ry="orbitR * 0.42" fill="none" stroke="var(--muted)" stroke-dasharray="3 3" />
      <circle :cx="earth.x" :cy="earth.y" r="4.5" fill="var(--accent)" />
      <line :x1="earth.x" :y1="earth.y" :x2="star.x" :y2="star.y" stroke="var(--fg)" stroke-opacity="0.35" stroke-dasharray="4 3" />
      <circle :cx="star.x" :cy="star.y" r="4" fill="#ffe08a" />
      <text :x="star.x + 10" :y="star.y - 8" font-size="10" fill="var(--muted)">{{ t('parallax.nearStar') }}</text>

      <g v-for="(l, i) in LANDMARKS" :key="l.key">
        <text :x="PAD_L - 12" :y="ROW_Y[i] + 16" text-anchor="end" font-size="12" fill="var(--fg)">{{ t(l.key) }}</text>
        <rect :x="PAD_L" :y="ROW_Y[i]" :width="Math.max(2, rx(l.pc) - PAD_L)" height="22" fill="var(--muted)" fill-opacity="0.4" />
        <circle :cx="rx(l.pc)" :cy="ROW_Y[i] + 11" r="3.5" fill="var(--fg)" />
      </g>
      <line :x1="rx(dPc)" :x2="rx(dPc)" y1="240" y2="472" stroke="var(--accent)" stroke-width="2" />
      <text :x="rx(dPc)" y="232" text-anchor="middle" font-size="11" fill="var(--accent)">{{ fmt(dPc, dPc < 10 ? 2 : 0) }} pc</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
