<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params Tc, Th (K). A compressor moves Qc from the cold tank plus work W into the hot tank as
// Qh = Qc + W, with COP_cool = Tc/(Th-Tc) and COP_heat = Th/(Th-Tc), the same formulas the
// "Formal" section derives. A fixed bar compares COP_heat to a plain resistive heater's COP = 1.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W_ = 800
const H = 480

const Tc = computed(() => Math.max(1, props.params.Tc ?? 277))
const Th = computed(() => Math.max(Tc.value + 1, props.params.Th ?? 295))
const gap = computed(() => Th.value - Tc.value)
const copCool = computed(() => Tc.value / gap.value)
const copHeat = computed(() => Th.value / gap.value)

const cold = { cx: 190, cy: 210 }
const hot = { cx: 610, cy: 210 }

const readouts = computed(() => [
  { label: t('hp.copCool'), value: fmt(copCool.value, 2), color: 'var(--accent)' },
  { label: t('hp.copHeat'), value: fmt(copHeat.value, 2), color: 'var(--pos)' },
  { label: 'T_c', value: `${fmt(Tc.value, 0)} K` },
  { label: 'T_h', value: `${fmt(Th.value, 0)} K` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W_} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('hp.hint') }}</text>

      <!-- cold tank -->
      <rect :x="cold.cx - 70" :y="cold.cy - 60" width="140" height="120" rx="8" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="1.5" />
      <text class="num" :x="cold.cx" :y="cold.cy - 74" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('hp.cold') }} T_c = {{ fmt(Tc, 0) }} K</text>

      <!-- hot tank -->
      <rect :x="hot.cx - 70" :y="hot.cy - 60" width="140" height="120" rx="8" fill="var(--pos)" fill-opacity="0.18" stroke="var(--pos)" stroke-width="1.5" />
      <text class="num" :x="hot.cx" :y="hot.cy - 74" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('hp.hot') }} T_h = {{ fmt(Th, 0) }} K</text>

      <!-- compressor -->
      <circle :cx="400" :cy="cold.cy" r="34" fill="var(--fg)" fill-opacity="0.85" />
      <text class="num" x="400" :y="cold.cy - 46" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('hp.compressor') }}</text>

      <!-- Qc arrow: cold tank -> compressor -->
      <line :x1="cold.cx + 70" :y1="cold.cy" :x2="366" :y2="cold.cy" stroke="var(--accent)" stroke-width="4" marker-end="url(#hpArrow)" />
      <text class="num" x="290" :y="cold.cy - 12" text-anchor="middle" font-size="12" fill="var(--accent)">Q_c</text>

      <!-- W arrow: work in, from below -->
      <line :x1="400" :y1="cold.cy + 70" :x2="400" :y2="cold.cy + 36" stroke="var(--accent-2)" stroke-width="4" marker-end="url(#hpArrowY)" />
      <text class="num" x="400" :y="cold.cy + 90" text-anchor="middle" font-size="12" fill="var(--accent-2)">W</text>

      <!-- Qh arrow: compressor -> hot tank -->
      <line x1="434" :y1="cold.cy" :x2="hot.cx - 70" :y2="cold.cy" stroke="var(--pos)" stroke-width="4" marker-end="url(#hpArrowPos)" />
      <text class="num" x="520" :y="cold.cy - 12" text-anchor="middle" font-size="12" fill="var(--pos)">Q_h</text>

      <!-- COP_heat vs plain heater (COP = 1) -->
      <text class="num" x="120" y="360" font-size="12" fill="var(--muted)">{{ t('hp.compareTitle') }}</text>
      <rect x="120" y="372" width="240" height="18" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <rect x="121" y="373" :width="Math.min(238, 238 / copHeat)" height="16" fill="var(--muted)" />
      <text class="num" x="365" y="385" font-size="11" fill="var(--muted)">{{ t('hp.plainHeater') }} (COP = 1)</text>
      <rect x="120" y="404" width="240" height="18" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <rect x="121" y="405" width="238" height="16" fill="var(--pos)" />
      <text class="num" x="365" y="417" font-size="11" fill="var(--pos)">{{ t('hp.thisHeatPump') }} (COP = {{ fmt(copHeat, 1) }})</text>

      <defs>
        <marker id="hpArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" /></marker>
        <marker id="hpArrowPos" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--pos)" /></marker>
        <marker id="hpArrowY" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--accent-2)" /></marker>
      </defs>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
