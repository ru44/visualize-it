<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params k (W/(m·K)), A (m²), d (m), dT (°C). A wall cross-section whose drawn thickness tracks d and
// whose colour tracks k; arrow lines crossing it, spaced by the heat-loss rate, show Q/t = kAΔT/d and
// U = k/d directly — the same numbers the "Formal" section derives.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const k = computed(() => Math.max(0.001, props.params.k ?? 0.04))
const A = computed(() => Math.max(0.1, props.params.A ?? 15))
const d = computed(() => Math.max(0.005, props.params.d ?? 0.15))
const dT = computed(() => Math.max(0.1, props.params.dT ?? 20))
const Q = computed(() => (k.value * A.value * dT.value) / d.value)
const U = computed(() => k.value / d.value)

const WALL = { x: 320, y: 60, h: 340 }
const wallW = computed(() => 30 + Math.min(260, d.value * 420))
const leakiness = computed(() => Math.min(1, k.value / 2))
const arrowCount = computed(() => Math.max(3, Math.min(14, Math.round(3 + Q.value / 80))))

const readouts = computed(() => [
  { label: 'Q/t', value: `${fmt(Q.value, 0)} W`, color: 'var(--accent-2)' },
  { label: 'U', value: `${fmt(U.value, 3)} W/(m²·K)`, color: 'var(--accent)' },
  { label: 'k', value: `${fmt(k.value, 2)} W/(m·K)` },
  { label: 'd', value: `${fmt(d.value, 2)} m` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('ins.hint') }}</text>

      <text class="num" :x="WALL.x - 60" :y="WALL.y - 14" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('ins.inside') }}</text>
      <text class="num" :x="WALL.x + wallW + 60" :y="WALL.y - 14" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('ins.outside') }}</text>

      <rect :x="WALL.x" :y="WALL.y" :width="wallW" :height="WALL.h" fill="var(--accent-2)" :fill-opacity="0.15 + leakiness * 0.55" stroke="var(--fg)" stroke-width="1.5" />

      <g v-for="i in arrowCount" :key="i">
        <line
          :x1="WALL.x - 40"
          :y1="WALL.y + (i / (arrowCount + 1)) * WALL.h"
          :x2="WALL.x + wallW + 40"
          :y2="WALL.y + (i / (arrowCount + 1)) * WALL.h"
          stroke="var(--accent-2)"
          stroke-width="2"
          marker-end="url(#insArrow)"
        />
      </g>

      <text class="num" :x="WALL.x + wallW / 2" :y="WALL.y + WALL.h + 30" text-anchor="middle" font-size="12" fill="var(--muted)">d = {{ fmt(d, 2) }} m, k = {{ fmt(k, 2) }} W/(m·K)</text>
      <text class="num" :x="WALL.x + wallW / 2" :y="WALL.y + WALL.h + 50" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">Q/t = {{ fmt(Q, 0) }} W</text>

      <defs>
        <marker id="insArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent-2)" />
        </marker>
      </defs>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
