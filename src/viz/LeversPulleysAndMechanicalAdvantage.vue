<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A class-1 lever: fulcrum between the load and the effort. Torque balance Feff*deff = Fload*dload
// gives the mechanical advantage M = deff/dload = Fload/Feff. Lifting the load a height h means the
// effort end must travel M*h — the lever trades force for distance, never eliminates the work.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const BEAM_Y = 250
const PAD = 60

const Fload = computed(() => Math.max(1, props.params.Fload ?? 800))
const dload = computed(() => Math.max(0.01, props.params.dload ?? 0.3))
const deff = computed(() => Math.max(0.01, props.params.deff ?? 1.5))
const h = computed(() => props.params.h ?? 10)
const M = computed(() => deff.value / dload.value)
const Feff = computed(() => Fload.value / M.value)
const travelCm = computed(() => M.value * h.value)

const scale = computed(() => Math.min(300, (W - 2 * PAD) / (dload.value + deff.value)))
const fulcrumX = computed(() => PAD + dload.value * scale.value)
const loadX = computed(() => fulcrumX.value - dload.value * scale.value)
const effortX = computed(() => fulcrumX.value + deff.value * scale.value)

const loadSize = computed(() => Math.min(44, 16 + Math.sqrt(Fload.value)))
const loadArrowLen = computed(() => Math.min(120, 24 + Fload.value / 30))
const effortArrowLen = computed(() => Math.min(120, 24 + Feff.value / 30))

// A downward-pointing arrow: a shaft ending in a small triangular head, tip at (x, yTip).
function downArrow(x: number, yTip: number, len: number) {
  const headH = 14
  const headW = 10
  const yStart = yTip - len
  return {
    shaft: `M${x},${yStart} L${x},${yTip - headH}`,
    head: `M${x - headW / 2},${yTip - headH} L${x + headW / 2},${yTip - headH} L${x},${yTip} Z`,
  }
}
const loadArrow = computed(() => downArrow(loadX.value, BEAM_Y - loadSize.value - 8, loadArrowLen.value))
const effortArrow = computed(() => downArrow(effortX.value, BEAM_Y - 8, effortArrowLen.value))

const readouts = computed(() => [
  { label: t('levers.M'), value: `${fmt(M.value, 2)}×`, color: 'var(--accent)' },
  { label: t('levers.Feff'), value: fmt(Feff.value, 0) + ' N', color: 'var(--pos)' },
  { label: t('levers.travel'), value: fmt(travelCm.value, 0) + ' cm' },
  { label: t('levers.Fload'), value: fmt(Fload.value, 0) + ' N' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('levers.hint') }}</text>
      <line :x1="loadX" :x2="effortX" :y1="BEAM_Y" :y2="BEAM_Y" stroke="var(--fg)" stroke-width="10" stroke-linecap="round" />
      <path :d="`M${fulcrumX - 22},${BEAM_Y + 40} L${fulcrumX},${BEAM_Y + 6} L${fulcrumX + 22},${BEAM_Y + 40} Z`" fill="var(--muted)" />
      <line :x1="fulcrumX - 30" :x2="fulcrumX + 30" :y1="BEAM_Y + 40" :y2="BEAM_Y + 40" stroke="var(--line)" stroke-width="4" />

      <rect :x="loadX - loadSize / 2" :y="BEAM_Y - loadSize" :width="loadSize" :height="loadSize" fill="var(--neg)" fill-opacity="0.8" rx="4" />
      <path :d="loadArrow.shaft" stroke="var(--neg)" stroke-width="4" fill="none" />
      <path :d="loadArrow.head" fill="var(--neg)" />
      <text class="num" :x="loadX" :y="BEAM_Y - loadSize - loadArrowLen - 14" text-anchor="middle" font-size="12" fill="var(--neg)">{{ t('levers.load') }}</text>
      <text class="num" :x="loadX" :y="BEAM_Y + 60" text-anchor="middle" font-size="11" fill="var(--muted)">d_load {{ fmt(dload, 2) }} m</text>

      <path :d="effortArrow.shaft" stroke="var(--pos)" stroke-width="4" fill="none" />
      <path :d="effortArrow.head" fill="var(--pos)" />
      <text class="num" :x="effortX" :y="BEAM_Y - effortArrowLen - 22" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('levers.effort') }}</text>
      <text class="num" :x="effortX" :y="BEAM_Y + 60" text-anchor="middle" font-size="11" fill="var(--muted)">d_eff {{ fmt(deff, 2) }} m</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
