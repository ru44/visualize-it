<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two plates on either side of a boundary. params v (cm/yr, + converging / − diverging), t (Myr).
// D = 10 v t (km) is the total relative motion; positive piles up a ridge, negative opens a rift.
// The visual height/width saturates past 3000 km so the picture stays on screen; the readout does not.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const W = 800
const H = 480
const v = computed(() => props.params.v ?? 5)
const time = computed(() => props.params.t ?? 50)
const D = computed(() => 10 * v.value * time.value)
const converging = computed(() => v.value > 0.05)
const diverging = computed(() => v.value < -0.05)
const groundY = 380
const boundaryX = 400
const clip = (x: number) => Math.min(1, Math.abs(x) / 3000)
const ridgeH = computed(() => (converging.value ? 20 + 140 * clip(D.value) : 0))
const riftW = computed(() => (diverging.value ? 10 + 90 * clip(D.value) : 0))
const arrowLen = computed(() => 10 + Math.min(70, Math.abs(v.value) * 5))
const status = computed(() => (converging.value ? t('plate.converge') : diverging.value ? t('plate.diverge') : t('plate.transform')))
const quakes = [
  { x: boundaryX - 10, y: 260 },
  { x: boundaryX + 26, y: 200 },
  { x: boundaryX - 34, y: 320 },
]
const readouts = computed(() => [
  { label: 'v', value: fmt(v.value, 1) + ' cm/yr' },
  { label: 't', value: fmt(time.value, 0) + ' Myr' },
  { label: t('plate.displacement'), value: fmt(D.value, 0) + ' km', color: converging.value ? 'var(--neg)' : diverging.value ? 'var(--accent)' : 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('plate.hint') }}</text>
      <!-- ground/crust blocks -->
      <rect :x="60" :y="140" :width="boundaryX - 60 - riftW / 2" :height="groundY - 140" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="boundaryX + riftW / 2" :y="140" :width="740 - boundaryX - riftW / 2" :height="groundY - 140" fill="var(--sunken)" stroke="var(--line)" />
      <line x1="60" :x2="740" :y1="groundY" :y2="groundY" stroke="var(--fg)" stroke-width="2" />
      <!-- rift: fresh crust bands -->
      <rect v-if="diverging" :x="boundaryX - riftW / 2" :y="groundY - 10" :width="riftW" height="10" fill="var(--accent)" fill-opacity="0.6" />
      <!-- ridge: piled-up mountains -->
      <path v-if="converging" :d="`M${boundaryX - 60},${groundY} L${boundaryX},${groundY - ridgeH} L${boundaryX + 60},${groundY} Z`" fill="var(--neg)" fill-opacity="0.55" />
      <!-- boundary + quake markers -->
      <line :x1="boundaryX" :x2="boundaryX" y1="140" :y2="groundY" stroke="var(--muted)" stroke-dasharray="3 4" />
      <text v-for="(q, i) in quakes" :key="i" :x="q.x" :y="q.y" text-anchor="middle" font-size="16" fill="var(--accent-2)">✷</text>
      <!-- direction arrows -->
      <g v-if="!diverging">
        <line :x1="boundaryX - 140" :x2="boundaryX - 140 + arrowLen" y1="170" y2="170" stroke="var(--fg)" stroke-width="3" marker-end="url(#pt-arrow)" />
        <line :x1="boundaryX + 140" :x2="boundaryX + 140 - arrowLen" y1="170" y2="170" stroke="var(--fg)" stroke-width="3" marker-end="url(#pt-arrow)" />
      </g>
      <g v-else>
        <line :x1="boundaryX - 60" :x2="boundaryX - 60 - arrowLen" y1="170" y2="170" stroke="var(--fg)" stroke-width="3" marker-end="url(#pt-arrow)" />
        <line :x1="boundaryX + 60" :x2="boundaryX + 60 + arrowLen" y1="170" y2="170" stroke="var(--fg)" stroke-width="3" marker-end="url(#pt-arrow)" />
      </g>
      <defs>
        <marker id="pt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--fg)" /></marker>
      </defs>
      <text :x="boundaryX - 170" y="150" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('plate.left') }}</text>
      <text :x="boundaryX + 170" y="150" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('plate.right') }}</text>
      <text :x="boundaryX" y="440" text-anchor="middle" font-size="13" fill="var(--fg)">{{ status }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
