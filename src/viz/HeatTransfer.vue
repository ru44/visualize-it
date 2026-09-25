<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three panels, one heat-transfer mechanism each, sharing dT but each also reading its own driver:
// conduction (spoon in a cup, driven by k), convection (radiator, driven by dT alone), radiation
// (glowing surface, driven by Tsurf). Same formulas as the "Formal" section.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const SIGMA = 5.67e-8

const dT = computed(() => Math.max(0.1, props.params.dT ?? 40))
const k = computed(() => Math.max(0.01, props.params.k ?? 15))
const Tsurf = computed(() => Math.max(1, props.params.Tsurf ?? 350))
const qCond = computed(() => (k.value * 0.000025 * dT.value) / 0.15)
const qConv = computed(() => 5 * 1.2 * dT.value)
const qRad = computed(() => 0.9 * SIGMA * 0.05 * Tsurf.value ** 4)

const heatFrac = computed(() => Math.min(1, (k.value * dT.value) / (400 * 80)))
const spoonSegs = 10
const spoonColor = (i: number) => {
  const f = Math.max(0, Math.min(1, heatFrac.value * 1.6 - i / spoonSegs))
  return f > 0.66 ? 'var(--accent-2)' : f > 0.33 ? 'var(--accent)' : 'var(--muted)'
}
const riseLen = computed(() => 20 + Math.min(90, dT.value * 1.3))
const radR = computed(() => 24 + Math.min(90, 6 + (qRad.value / 1045) * 90))

const readouts = computed(() => [
  { label: t('heat.cond'), value: `${fmt(qCond.value, 2)} W`, color: 'var(--accent-2)' },
  { label: t('heat.conv'), value: `${fmt(qConv.value, 0)} W`, color: 'var(--accent)' },
  { label: t('heat.rad'), value: `${fmt(qRad.value, 0)} W`, color: 'var(--pos)' },
  { label: 'ΔT', value: `${fmt(dT.value, 0)} °C` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('heat.hint') }}</text>

      <!-- Conduction: cup + spoon -->
      <g transform="translate(30, 60)">
        <text class="num" x="80" y="0" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ t('heat.condTitle') }}</text>
        <path d="M20,120 L20,190 Q20,220 60,220 L100,220 Q140,220 140,190 L140,120 Z" fill="none" stroke="var(--fg)" stroke-width="2" />
        <rect x="20" y="120" width="120" height="60" fill="var(--accent-2)" fill-opacity="0.35" />
        <g v-for="i in spoonSegs" :key="i" :transform="`rotate(-35, 80, 150)`">
          <rect :x="80 + (i - 1) * 10" y="145" width="11" height="10" :fill="spoonColor(spoonSegs - i)" />
        </g>
        <text class="num" x="80" y="250" text-anchor="middle" font-size="12" fill="var(--muted)">k = {{ fmt(k, 0) }} W/(m·K)</text>
      </g>

      <!-- Convection: radiator + rising air -->
      <g transform="translate(300, 60)">
        <text class="num" x="80" y="0" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ t('heat.convTitle') }}</text>
        <rect x="20" y="200" width="120" height="30" rx="4" fill="var(--accent-2)" />
        <path
          v-for="i in 3"
          :key="i"
          :d="`M${40 + i * 30},200 q-10,-${riseLen / 2} 0,-${riseLen} q10,-${riseLen / 2} 0,-${riseLen * 1.4}`"
          fill="none"
          stroke="var(--accent)"
          stroke-width="2.5"
          stroke-linecap="round"
          marker-end="url(#riseArrow)"
        />
        <text class="num" x="80" y="250" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('heat.rising') }}</text>
      </g>

      <!-- Radiation: glowing surface -->
      <g transform="translate(580, 130)">
        <text class="num" x="80" y="-70" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ t('heat.radTitle') }}</text>
        <circle cx="80" cy="0" :r="radR" fill="var(--pos)" fill-opacity="0.85" />
        <path
          v-for="k2 in 10"
          :key="k2"
          :d="`M${80 + (radR + 6) * Math.cos((k2 * Math.PI) / 5)},${(radR + 6) * Math.sin((k2 * Math.PI) / 5)} L${80 + (radR + 28) * Math.cos((k2 * Math.PI) / 5)},${(radR + 28) * Math.sin((k2 * Math.PI) / 5)}`"
          stroke="var(--pos)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <text class="num" x="80" y="130" text-anchor="middle" font-size="12" fill="var(--muted)">T = {{ fmt(Tsurf, 0) }} K</text>
      </g>

      <defs>
        <marker id="riseArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
