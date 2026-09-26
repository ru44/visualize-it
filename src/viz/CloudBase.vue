<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Height (vertical) vs temperature (horizontal). Two lines fall as height increases: the rising air's
// own temperature (steep, 9.8°C/km) and its dew point (shallow, 1.8°C/km). Where they meet is the
// cloud base, h = (T − Td) / 8 km = 125(T − Td) m. Drag the two ground dots to set T and Td.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const X0 = 90
const X1 = 760
const Y_GROUND = 430
const Y_TOP = 50
const TEMP_MIN = -5
const TEMP_MAX = 45
const H_MAX = 4500 // m
const GAMMA = 9.8 / 1000 // °C per m, dry air
const GAMMA_D = 1.8 / 1000 // °C per m, dew point

const T = computed(() => props.params.T ?? 25)
const Td = computed(() => props.params.Td ?? 15)
const hRaw = computed(() => 125 * (T.value - Td.value)) // m
const h = computed(() => Math.max(0, Math.min(H_MAX, hRaw.value)))
const fog = computed(() => hRaw.value <= 0)
const clear = computed(() => hRaw.value > H_MAX)

const tx = (temp: number) => X0 + ((temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X1 - X0)
const hy = (m: number) => Y_GROUND - (m / H_MAX) * (Y_GROUND - Y_TOP)

const tLine = computed(() => `M${tx(T.value)},${Y_GROUND} L${tx(T.value - GAMMA * H_MAX)},${Y_TOP}`)
const tdLine = computed(() => `M${tx(Td.value)},${Y_GROUND} L${tx(Td.value - GAMMA_D * H_MAX)},${Y_TOP}`)
const cloud = computed(() => ({ x: tx(T.value - GAMMA * h.value), y: hy(h.value) }))

const readouts = computed(() => [
  { label: 'T', value: fmt(T.value, 1) + ' °C' },
  { label: 'Td', value: fmt(Td.value, 1) + ' °C' },
  { label: t('cloud.base'), value: fog.value ? t('cloud.fog') : clear.value ? t('cloud.clear') : fmt(hRaw.value, 0) + ' m', color: fog.value ? 'var(--muted)' : 'var(--accent)' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref<'T' | 'Td' | null>(null)
function pick(e: PointerEvent) {
  if (!svg.value || !dragging.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  const temp = TEMP_MIN + ((x - X0) / (X1 - X0)) * (TEMP_MAX - TEMP_MIN)
  emit('set', dragging.value, Math.max(TEMP_MIN, Math.min(TEMP_MAX, temp)))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="pick($event)" @pointerup="dragging = null" @pointercancel="dragging = null">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('cloud.hint') }}</text>
      <text :x="(X0 + X1) / 2" y="465" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('cloud.temp') }}</text>
      <text :x="24" :y="(Y_GROUND + Y_TOP) / 2" text-anchor="middle" font-size="12" fill="var(--muted)" :transform="`rotate(-90 24 ${(Y_GROUND + Y_TOP) / 2})`">{{ t('cloud.height') }}</text>
      <line :x1="X0" :x2="X1" :y1="Y_GROUND" :y2="Y_GROUND" stroke="var(--fg)" stroke-width="2" />
      <line :x1="X0" :x2="X0" :y1="Y_GROUND" :y2="Y_TOP" stroke="var(--line)" />
      <path :d="tLine" stroke="var(--accent)" stroke-width="2.5" fill="none" />
      <path :d="tdLine" stroke="var(--accent-2)" stroke-width="2.5" fill="none" stroke-dasharray="6 4" />
      <text :x="tx(T - GAMMA * 900) + 6" :y="hy(900)" font-size="11" fill="var(--accent)">{{ t('cloud.tLine') }}</text>
      <text :x="tx(Td - GAMMA_D * 900) + 6" :y="hy(900) + 16" font-size="11" fill="var(--accent-2)">{{ t('cloud.tdLine') }}</text>
      <!-- cloud or fog -->
      <g v-if="fog">
        <rect :x="X0" :y="Y_GROUND - 14" :width="X1 - X0" height="14" fill="var(--muted)" fill-opacity="0.35" />
        <text :x="(X0 + X1) / 2" :y="Y_GROUND - 20" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('cloud.fog') }}</text>
      </g>
      <g v-else-if="!clear">
        <line :x1="X0" :x2="X1" :y1="cloud.y" :y2="cloud.y" stroke="var(--accent)" stroke-dasharray="3 3" stroke-opacity="0.5" />
        <ellipse :cx="cloud.x - 14" :cy="cloud.y" rx="16" ry="11" fill="var(--fg)" fill-opacity="0.85" />
        <ellipse :cx="cloud.x + 10" :cy="cloud.y - 4" rx="20" ry="13" fill="var(--fg)" fill-opacity="0.85" />
        <ellipse :cx="cloud.x + 30" :cy="cloud.y + 2" rx="14" ry="9" fill="var(--fg)" fill-opacity="0.85" />
      </g>
      <text v-else :x="(X0 + X1) / 2" y="66" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('cloud.clear') }}</text>
      <!-- draggable ground handles -->
      <circle :cx="tx(T)" :cy="Y_GROUND" r="9" fill="var(--accent)" stroke="var(--panel)" stroke-width="2" class="cursor-ew-resize" @pointerdown="dragging = 'T'; svg?.setPointerCapture($event.pointerId)" />
      <circle :cx="tx(Td)" :cy="Y_GROUND" r="9" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" class="cursor-ew-resize" @pointerdown="dragging = 'Td'; svg?.setPointerCapture($event.pointerId)" />
      <text :x="X0 - 6" :y="Y_GROUND + 4" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('cloud.ground') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
