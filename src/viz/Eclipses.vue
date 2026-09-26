<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Side view of a new moon: Sun far left, Moon between Sun and Earth, Earth fixed on the right.
// params omega (0..180°, how far the Moon is from a node), dist (356.5..406.7 thousand km).
// The Moon's height above the Sun–Earth line is exaggerated on screen for legibility (not to scale);
// the eclipse type shown (total / annular / partial / none) is computed from the real geometry.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const W = 800
const H = 480
const I_DEG = 5.14 // Moon's orbital inclination
const R_EARTH = 6371 // km
const R_LIMIT = 9900 // km: Earth's radius + a typical penumbra width, beyond which even the penumbra misses
const LU = 374.4 // thousand km: length of the Moon's umbra (Sun's much greater size makes it converge)

const omega = computed(() => props.params.omega ?? 90)
const dist = computed(() => props.params.dist ?? 384.4) // thousand km

const beta = computed(() => I_DEG * Math.sin((omega.value * Math.PI) / 180)) // degrees
const h = computed(() => dist.value * 1000 * Math.sin((beta.value * Math.PI) / 180)) // km, sideways offset

const status = computed<'total' | 'annular' | 'partial' | 'none'>(() => {
  if (Math.abs(h.value) < R_EARTH) return dist.value < LU ? 'total' : 'annular'
  if (Math.abs(h.value) < R_LIMIT) return 'partial'
  return 'none'
})

const ecliptic = { y: 260 }
const sun = { x: 70, r: 34 }
const moonX = 380
const earth = { x: 700, r: 32 }
const AMP = 110 // px, exaggerated vertical offset amplitude for legibility
const moonY = computed(() => ecliptic.y - AMP * Math.sin((omega.value * Math.PI) / 180))
const moonR = 10
const scalePxPerKm = computed(() => (earth.x - moonX) / (dist.value * 1000))
const tipX = computed(() => moonX + LU * 1000 * scalePxPerKm.value)
const penW = 55 // penumbra half-width at Earth's x, illustrative

const umbraPath = computed(() => {
  const my = moonY.value
  return `M${moonX},${my - moonR} L${tipX.value},${my} L${moonX},${my + moonR} Z`
})
const penumbraPath = computed(() => {
  const my = moonY.value
  const x1 = earth.x + 40
  return `M${moonX},${my - moonR} L${x1},${my - penW} L${x1},${my + penW} L${moonX},${my + moonR} Z`
})
const patch = computed(() => {
  if (status.value === 'none') return null
  const y = Math.max(ecliptic.y - earth.r + 6, Math.min(ecliptic.y + earth.r - 6, moonY.value))
  const r = status.value === 'partial' ? 22 : 12
  return { x: earth.x - 18, y, r }
})

const readouts = computed(() => [
  { label: 'β', value: fmt(beta.value, 2) + '°' },
  { label: t('eclipses.offset'), value: fmt(Math.abs(h.value), 0) + ' km' },
  { label: t('eclipses.type'), value: t(`eclipses.${status.value}` as any), color: status.value === 'none' ? 'var(--muted)' : status.value === 'partial' ? 'var(--accent-2)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('eclipses.hint') }}</text>
      <line :x1="sun.x" :x2="earth.x" :y1="ecliptic.y" :y2="ecliptic.y" stroke="var(--line)" stroke-dasharray="4 4" />
      <!-- Sun -->
      <circle :cx="sun.x" :cy="ecliptic.y" :r="sun.r" fill="var(--accent-2)" />
      <text class="num" :x="sun.x" :y="ecliptic.y + sun.r + 16" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('eclipses.sun') }}</text>
      <!-- shadow cones -->
      <path :d="penumbraPath" fill="var(--muted)" fill-opacity="0.18" />
      <path :d="umbraPath" fill="var(--neg)" fill-opacity="0.5" />
      <!-- Earth -->
      <circle :cx="earth.x" :cy="ecliptic.y" :r="earth.r" fill="var(--accent)" />
      <circle v-if="patch" :cx="patch.x" :cy="patch.y" :r="patch.r" :fill="status === 'partial' ? 'var(--muted)' : 'var(--neg)'" fill-opacity="0.85" />
      <text class="num" :x="earth.x" :y="ecliptic.y + earth.r + 16" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('eclipses.earth') }}</text>
      <!-- Moon -->
      <circle :cx="moonX" :cy="moonY" :r="moonR" fill="var(--fg)" />
      <text class="num" :x="moonX" :y="moonY - moonR - 8" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('eclipses.moon') }}</text>
      <line :x1="moonX" :x2="moonX" :y1="ecliptic.y" :y2="moonY" stroke="var(--line)" stroke-dasharray="2 3" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
