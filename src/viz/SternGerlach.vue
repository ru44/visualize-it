<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Silver atoms fly from an oven through an inhomogeneous magnet. Classically their spin could point any
// way, so the screen should show a continuous smear; really every atom lands in one of exactly two spots.
// s (mm) = 21300*G/v^2 — same formula the 2D and 3D pictures both use. params G (T/cm), v (m/s).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const G = computed(() => props.params.G ?? 6)
const v = computed(() => props.params.v ?? 650)
const sep = computed(() => (21300 * G.value) / v.value ** 2) // mm
const PX_PER_MM = 150
const halfPx = computed(() => Math.min(190, (sep.value * PX_PER_MM) / 2))

const CY = 240
const OVEN_X = 70
const MAGNET_X0 = 230
const MAGNET_X1 = 380
const SCREEN_X = 600

const hits = ref<{ y: number; up: boolean }[]>([])
let raf = 0
let last = 0
let acc = 0
function spawn() {
  const up = Math.random() < 0.5
  const jitter = (Math.random() - 0.5) * 10
  hits.value.push({ y: CY + (up ? -halfPx.value : halfPx.value) + jitter, up })
  if (hits.value.length > 500) hits.value.splice(0, hits.value.length - 500)
}
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  acc += dt
  while (acc > 0.09) { acc -= 0.09; spawn() }
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { last = performance.now(); raf = requestAnimationFrame(tick) }
  else for (let i = 0; i < 120; i++) spawn()
})
onUnmounted(() => cancelAnimationFrame(raf))

const upCount = computed(() => hits.value.filter((p) => p.up).length)
const downCount = computed(() => hits.value.length - upCount.value)
const readouts = computed(() => [
  { label: t('sg.separation'), value: fmt(sep.value, 3) + ' mm', color: 'var(--accent)' },
  { label: t('sg.count'), value: String(hits.value.length) },
  { label: t('sg.up'), value: String(upCount.value), color: 'var(--accent)' },
  { label: t('sg.down'), value: String(downCount.value), color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sg.hint') }}</text>

      <!-- oven / source -->
      <rect :x="OVEN_X - 22" :y="CY - 20" width="44" height="40" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <text class="num" :x="OVEN_X" :y="CY + 46" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sg.oven') }}</text>
      <line :x1="OVEN_X + 22" :y1="CY" :x2="MAGNET_X0" :y2="CY" stroke="var(--line)" stroke-width="2" stroke-dasharray="3 3" />

      <!-- magnet: asymmetric pole pieces (pointed top, flat bottom) -->
      <path :d="`M ${MAGNET_X0} ${CY - 90} L ${MAGNET_X1} ${CY - 60} L ${MAGNET_X1} ${CY - 20} L ${MAGNET_X0} ${CY - 20} Z`" fill="var(--neg)" fill-opacity="0.35" stroke="var(--neg)" />
      <rect :x="MAGNET_X0" :y="CY + 20" :width="MAGNET_X1 - MAGNET_X0" height="70" fill="var(--pos)" fill-opacity="0.3" stroke="var(--pos)" />
      <text class="num" :x="(MAGNET_X0 + MAGNET_X1) / 2" :y="CY - 100" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sg.magnet') }} · G = {{ fmt(G, 1) }} T/cm</text>

      <!-- two trajectories -->
      <line :x1="MAGNET_X1" :y1="CY" :x2="SCREEN_X" :y2="CY - halfPx" stroke="var(--accent)" stroke-width="1.5" stroke-opacity="0.55" />
      <line :x1="MAGNET_X1" :y1="CY" :x2="SCREEN_X" :y2="CY + halfPx" stroke="var(--accent-2)" stroke-width="1.5" stroke-opacity="0.55" />

      <!-- classical expectation: a faint continuous smear -->
      <rect :x="SCREEN_X" :y="CY - halfPx - 46" width="70" :height="2 * (halfPx + 46)" fill="var(--muted)" fill-opacity="0.12" />
      <text class="num" :x="SCREEN_X + 76" :y="CY - halfPx - 50" font-size="10" fill="var(--muted)">{{ t('sg.classical') }}</text>

      <!-- screen with the two real spots -->
      <rect :x="SCREEN_X" y="40" width="70" height="400" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(p, i) in hits" :key="i" :cx="SCREEN_X + 10 + ((i * 37) % 50)" :cy="p.y" r="1.8" :fill="p.up ? 'var(--accent)' : 'var(--accent-2)'" fill-opacity="0.85" />
      <text class="num" :x="SCREEN_X + 35" y="460" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sg.screen') }}</text>
      <text class="num" :x="SCREEN_X + 76" :y="CY - halfPx + 14" font-size="10" fill="var(--fg)">{{ t('sg.actual') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
