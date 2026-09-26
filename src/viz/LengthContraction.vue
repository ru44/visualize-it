<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A rod of rest length L0 (pale, dashed outline, fixed) compared against the same rod's length L as a
// platform observer actually measures it while it flies past at speed v (solid bar, sliding along a
// metre ruler). Same v as the light-clock lesson; L = L0/γ, always the shorter of the two bars.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PXPM = 26 // px per metre
const RULER_X0 = 60
const DRIFT_PX_S = 130 // constant visual crossing speed, independent of v (this picture is about length, not speed)

const v = computed(() => Math.min(0.999, Math.max(0, props.params.v ?? 0.6)))
const L0 = computed(() => Math.max(0.5, props.params.L0 ?? 10))
const gamma = computed(() => 1 / Math.sqrt(1 - v.value * v.value))
const L = computed(() => L0.value / gamma.value)

const ghostW = computed(() => L0.value * PXPM)
const rodW = computed(() => L.value * PXPM)

const state = reactive({ simT: 0 })
let raf = 0
let last = 0
function frame(now: number) {
  const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
  last = now
  state.simT += dt
  raf = requestAnimationFrame(frame)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(frame)
})
onUnmounted(() => cancelAnimationFrame(raf))

const rodX = computed(() => {
  const loop = W + rodW.value + 60
  return RULER_X0 - rodW.value - 30 + ((DRIFT_PX_S * state.simT) % loop)
})

const ticks = computed(() => {
  const out: { x: number; m: number }[] = []
  for (let m = 0; m <= 22; m += 2) out.push({ x: RULER_X0 + m * PXPM, m })
  return out
})

const readouts = computed(() => [
  { label: 'v', value: `${fmt(v.value, 3)} c`, color: 'var(--accent)' },
  { label: 'γ', value: fmt(gamma.value, 3), color: 'var(--accent-2)' },
  { label: 'L₀', value: `${fmt(L0.value, 2)} m` },
  { label: 'L', value: `${fmt(L.value, 2)} m`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lenc.hint') }}</text>

      <!-- ruler -->
      <line :x1="RULER_X0" :x2="RULER_X0 + 22 * PXPM" y1="400" y2="400" stroke="var(--line)" stroke-width="2" />
      <g v-for="tk in ticks" :key="tk.m">
        <line :x1="tk.x" :x2="tk.x" y1="394" y2="406" stroke="var(--muted)" />
        <text class="num" :x="tk.x" y="420" text-anchor="middle" font-size="10" fill="var(--muted)">{{ tk.m }}m</text>
      </g>

      <!-- rest-length ghost, fixed at the ruler's zero -->
      <rect :x="RULER_X0" y="150" :width="ghostW" height="46" rx="6" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5" />
      <text class="num" :x="RULER_X0 + ghostW / 2" y="140" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('lenc.rest') }} — L₀ = {{ fmt(L0, 1) }} m</text>

      <!-- moving, contracted rod, clipped to the ruler's span -->
      <clipPath id="track"><rect :x="RULER_X0" y="250" :width="22 * PXPM" height="80" /></clipPath>
      <g clip-path="url(#track)">
        <rect :x="rodX" y="260" :width="rodW" height="46" rx="6" fill="var(--accent)" fill-opacity="0.85" />
      </g>
      <text class="num" :x="RULER_X0 + ghostW / 2" y="358" text-anchor="middle" font-size="11" fill="var(--fg)" font-weight="600">{{ t('lenc.measured') }} — L = {{ fmt(L, 2) }} m</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
