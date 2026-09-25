<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/doppler-effect. f1 = f*v/(v-vs) ahead, f2 = f*v/(v+vs) behind, v = 343 m/s.
// The source's on-screen speed and the wavefronts' expansion speed are both scaled down by the same
// factor from the real vs/343 ratio, so the bunching you see is the true Mach-style ratio even
// though the real speeds (up to hundreds of Hz, tens of m/s) are far too fast to watch directly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const SOUND_V = 343
const PX0 = 60
const PX1 = 740
const CY = 240
const VSCENE = 130 // px/s, visual expansion speed of a wavefront
const EMIT_EVERY = 0.45 // s, visual emission interval (not the real f)

const f = computed(() => props.params.f ?? 500)
const vs = computed(() => props.params.vs ?? 20)
const mach = computed(() => vs.value / SOUND_V)
const f1 = computed(() => (f.value * SOUND_V) / (SOUND_V - vs.value))
const f2 = computed(() => (f.value * SOUND_V) / (SOUND_V + vs.value))

interface Front { x: number; born: number }
const fronts = ref<Front[]>([])
const sourceX = ref(PX0)
const clock = ref(0)
let raf = 0
let last = 0
let sinceEmit = 0
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  clock.value += dt
  const srcV = mach.value * VSCENE
  sourceX.value += srcV * dt
  if (sourceX.value > PX1) sourceX.value = PX0
  sinceEmit += dt
  if (sinceEmit >= EMIT_EVERY) {
    sinceEmit = 0
    fronts.value.push({ x: sourceX.value, born: clock.value })
  }
  fronts.value = fronts.value.filter((fr) => clock.value - fr.born < 3.2)
  raf = requestAnimationFrame(tick)
}
// Pre-roll: seed a few seconds of history so the scene reads as "already running" the instant it
// mounts, instead of an empty canvas that only fills in after the first EMIT_EVERY has elapsed.
function preroll(seconds: number) {
  const srcV = mach.value * VSCENE
  clock.value = seconds
  sourceX.value = PX0 + srcV * seconds
  const seeded: Front[] = []
  for (let born = EMIT_EVERY; born <= seconds; born += EMIT_EVERY) seeded.push({ x: PX0 + srcV * born, born })
  fronts.value = seeded.filter((fr) => seconds - fr.born < 3.2)
}
onMounted(() => {
  preroll(2.6)
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

function radius(fr: Front): number {
  return Math.max(1, (clock.value - fr.born) * VSCENE)
}

const readouts = computed(() => [
  { label: t('doppler.f1'), value: fmt(f1.value, 0) + ' Hz', color: 'var(--accent)' },
  { label: t('doppler.f'), value: fmt(f.value, 0) + ' Hz' },
  { label: t('doppler.f2'), value: fmt(f2.value, 0) + ' Hz', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('doppler.hint') }}</text>
      <line :x1="PX0" :x2="PX1" :y1="CY" :y2="CY" stroke="var(--grid)" stroke-dasharray="4 4" />
      <clipPath id="dopplerClip"><rect x="0" y="0" :width="W" :height="H" /></clipPath>
      <g clip-path="url(#dopplerClip)">
        <circle v-for="(fr, i) in fronts" :key="i" :cx="fr.x" :cy="CY" :r="radius(fr)" fill="none" stroke="var(--accent-2)" stroke-opacity="0.55" />
      </g>
      <circle :cx="sourceX" :cy="CY" r="9" fill="var(--fg)" />
      <text class="num" :x="sourceX" :y="CY - 18" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('doppler.source') }}</text>
      <text class="num" :x="PX1 - 10" y="60" text-anchor="end" font-size="13" fill="var(--accent)">{{ t('doppler.ahead') }}</text>
      <text class="num" :x="PX0 + 10" y="420" font-size="13" fill="var(--accent-2)">{{ t('doppler.behind') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
