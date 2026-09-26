<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A spherical cell of radius r (µm). Surface area grows as r², volume as r³, so the surface
// available to feed each unit of volume — SA/V = 3/r — shrinks as the cell grows. Oxygen can only
// diffuse in to a depth d = d0/√activity before a hungrier cytoplasm has used it all up; once
// r > d, an inner core is starved. d0 = 200 µm mirrors the textbook figure for how far oxygen
// reaches by diffusion alone (why capillaries sit within ~100–200 µm of any living cell).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()

const W = 800
const H = 480
const D0 = 200

const r = computed(() => Math.max(1, props.params.r ?? 50))
const activity = computed(() => Math.max(0.1, props.params.activity ?? 1))
const SA = computed(() => 4 * Math.PI * r.value ** 2)
const V = computed(() => (4 / 3) * Math.PI * r.value ** 3)
const ratio = computed(() => 3 / r.value)
const d = computed(() => D0 / Math.sqrt(activity.value))
const core = computed(() => Math.max(0, r.value - d.value))
const starvedFrac = computed(() => (core.value / r.value) ** 3)

// Drawn radius uses a square-root scale so a 1 µm bacterium and a 1000 µm egg cell are both
// visible on the same picture; only the numbers in the readouts are the real physics.
const cx = 220
const cy = 260
const drawnR = computed(() => 14 + 150 * Math.sqrt(r.value / 1000))
const coreDrawnR = computed(() => (core.value > 0 ? drawnR.value * (core.value / r.value) : 0))

const gaugeX = 640
const gaugeTop = 70
const gaugeH = 320
const gaugeFill = computed(() => gaugeH * Math.min(1, ratio.value / 3))

const readouts = computed(() => [
  { label: t('cs.sa'), value: `${fmt(SA.value, 0)} μm²`, color: 'var(--accent)' },
  { label: t('cs.v'), value: `${fmt(V.value, 0)} μm³`, color: 'var(--accent-2)' },
  { label: t('cs.ratio'), value: `${fmt(ratio.value, 3)} μm⁻¹` },
  { label: t('cs.depth'), value: `${fmt(d.value, 0)} μm` },
  { label: t('cs.starved'), value: `${fmt(starvedFrac.value * 100, 1)}%`, color: starvedFrac.value > 0 ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="24" y="28" font-size="13" fill="var(--muted)">{{ t('cs.hint') }}</text>

      <!-- the cell -->
      <circle :cx="cx" :cy="cy" :r="drawnR" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2" />
      <circle v-if="core > 0" :cx="cx" :cy="cy" :r="coreDrawnR" fill="var(--neg)" opacity="0.55" />
      <circle v-else :cx="cx" :cy="cy" r="5" fill="var(--pos)" />
      <line :x1="cx" :y1="cy" :x2="cx + drawnR" :y2="cy" stroke="var(--fg)" stroke-width="1.5" stroke-dasharray="4 3" />
      <text :x="cx + drawnR / 2" :y="cy - 8" font-size="12" text-anchor="middle" fill="var(--fg)">r = {{ fmt(r, 0) }} μm</text>
      <text :x="cx" :y="cy + drawnR + 26" font-size="12" text-anchor="middle" fill="var(--muted)">{{ core > 0 ? t('cs.core') : t('cs.safe') }}</text>
      <text x="24" :y="H - 16" font-size="11" fill="var(--muted)">{{ t('cs.caption') }}</text>

      <!-- SA:V gauge -->
      <text :x="gaugeX" :y="gaugeTop - 16" font-size="12" text-anchor="middle" fill="var(--muted)">{{ t('cs.gauge') }}</text>
      <rect :x="gaugeX - 26" :y="gaugeTop" width="52" :height="gaugeH" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <rect :x="gaugeX - 26" :y="gaugeTop + gaugeH - gaugeFill" width="52" :height="gaugeFill" fill="var(--accent)" rx="6" />
      <text :x="gaugeX" :y="gaugeTop - 2" font-size="11" text-anchor="middle" fill="var(--muted)">3</text>
      <text :x="gaugeX" :y="gaugeTop + gaugeH + 16" font-size="11" text-anchor="middle" fill="var(--muted)">0</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
