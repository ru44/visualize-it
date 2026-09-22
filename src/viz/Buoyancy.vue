<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A block in a fluid. params rhoObj (kg/m³), rhoFluid (kg/m³), V (litres). Floats with the submerged fraction
// ρ_obj/ρ_fluid, or sinks. Drag vertically changes the object's density.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const g = 9.81
const ro = computed(() => props.params.rhoObj ?? 600)
const rf = computed(() => props.params.rhoFluid ?? 1000)
const V = computed(() => (props.params.V ?? 10) / 1000) // m³
const frac = computed(() => Math.min(1, ro.value / rf.value))
const sinks = computed(() => ro.value > rf.value)
const weight = computed(() => ro.value * V.value * g)
const buoy = computed(() => rf.value * V.value * frac.value * g)
const tank = { x: 200, y: 80, w: 400, h: 340 }
const water = computed(() => tank.y + 60)
const side = computed(() => 60 + Math.cbrt(V.value) * 300)
const top = computed(() => (sinks.value ? tank.y + tank.h - side.value : water.value - side.value * (1 - frac.value)))
const readouts = computed(() => [
  { label: t('buoy.weight'), value: fmt(weight.value, 1) + ' N', color: 'var(--neg)' },
  { label: t('buoy.buoyancy'), value: fmt(buoy.value, 1) + ' N', color: 'var(--accent)' },
  { label: t('buoy.submerged'), value: fmt(frac.value * 100, 0) + ' %' },
  { label: t('buoy.state'), value: sinks.value ? t('buoy.sinks') : t('buoy.floats'), color: sinks.value ? 'var(--neg)' : 'var(--pos)' },
  { label: 'ρ_obj / ρ_fluid', value: fmt(ro.value / rf.value, 3), color: 'var(--accent-2)' },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  const y = ((e.clientY - bx.top) / bx.height) * H
  emit('set', 'rhoObj', Math.max(50, Math.min(3000, ((y - tank.y) / tank.h) * 2500)))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-ns-resize touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('buoy.hint') }}</text>
      <rect :x="tank.x" :y="tank.y" :width="tank.w" :height="tank.h" fill="none" stroke="var(--fg)" stroke-width="2" />
      <rect :x="tank.x" :y="water" :width="tank.w" :height="tank.y + tank.h - water" fill="var(--accent)" :fill-opacity="0.12 + 0.2 * Math.min(1, rf / 2000)" />
      <line :x1="tank.x" :x2="tank.x + tank.w" :y1="water" :y2="water" stroke="var(--accent)" />
      <text class="num" :x="tank.x + tank.w + 10" :y="water + 4" font-size="12" fill="var(--accent)">ρ_fluid = {{ fmt(rf, 0) }} kg/m³</text>
      <rect :x="W / 2 - side / 2" :y="top" :width="side" :height="side" rx="6" fill="var(--accent-2)" stroke="var(--fg)" />
      <text class="num" :x="W / 2" :y="top + side / 2 + 4" text-anchor="middle" font-size="12" fill="#fff">ρ = {{ fmt(ro, 0) }}</text>
      <!-- forces -->
      <line :x1="W / 2 - 14" :y1="top + side / 2" :x2="W / 2 - 14" :y2="top + side / 2 + Math.min(150, weight / 3)" stroke="var(--neg)" stroke-width="3" marker-end="url(#arrowN)" />
      <line :x1="W / 2 + 14" :y1="top + side / 2" :x2="W / 2 + 14" :y2="top + side / 2 - Math.min(150, buoy / 3)" stroke="var(--accent)" stroke-width="3" />
      <text class="num" :x="W / 2 - 22" :y="top + side / 2 + Math.min(150, weight / 3) + 16" text-anchor="end" font-size="12" fill="var(--neg)">W = mg</text>
      <text class="num" :x="W / 2 + 22" :y="top + side / 2 - Math.min(150, buoy / 3) - 6" font-size="12" fill="var(--accent)">F_b = ρ_fluid V_sub g</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
