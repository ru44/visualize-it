<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A wheel spins continuously at `rpm`. A camera only samples it `fps` times a second, so what
// the camera shows jumps between samples. When the wheel turns more than half a revolution per
// sample, the eye reads the jump as the wrong amount of turning, sometimes backwards.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const R = 130
const CY = 270
const CX1 = 220
const CX2 = 580
const T_MAX = 6

const rpm = computed(() => Math.max(1, props.params.rpm ?? 80))
const fps = computed(() => Math.max(1, props.params.fps ?? 24))
const tNow = computed(() => Math.max(0, Math.min(T_MAX, props.params.t ?? 0)))

const revPerSec = computed(() => rpm.value / 60)
const wheelDeg = computed(() => (revPerSec.value * 360 * tNow.value) % 360)
// The angle the camera is still showing: the most recent sample, held until the next one.
const cameraDeg = computed(() => {
  const sampleT = Math.floor(tNow.value * fps.value) / fps.value
  return (revPerSec.value * 360 * sampleT) % 360
})
// Fold the true rpm into [-fps*30, fps*30]: what speed and direction the eye perceives.
const foldedRpm = computed(() => {
  const band = fps.value * 60
  return rpm.value - band * Math.round(rpm.value / band)
})
const direction = computed(() => (Math.abs(foldedRpm.value) < 0.5 ? t('strobe.frozen') : foldedRpm.value > 0 ? t('strobe.forward') : t('strobe.backward')))

function spokes(deg: number, n = 6) {
  return Array.from({ length: n }, (_, i) => deg + (i * 360) / n)
}

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tNow.value + dt
    if (v >= T_MAX) v -= T_MAX
    emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = true
    raf = requestAnimationFrame(tick)
  }
})
onUnmounted(() => cancelAnimationFrame(raf))

function wheelLine(cx: number, deg: number, len: number) {
  const r = (deg * Math.PI) / 180
  return { x1: cx - len * Math.cos(r), y1: CY + len * Math.sin(r), x2: cx + len * Math.cos(r), y2: CY - len * Math.sin(r) }
}

const readouts = computed(() => [
  { label: t('strobe.rpm'), value: fmt(rpm.value, 0) },
  { label: t('strobe.fps'), value: fmt(fps.value, 0) },
  { label: t('strobe.apparent'), value: `${fmt(foldedRpm.value, 1)} rpm`, color: 'var(--accent-2)' },
  { label: t('strobe.direction'), value: direction.value, color: 'var(--accent)' },
])
</script>

<template>
  <div class="relative">
    <button class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('strobe.hint') }}</text>

      <g>
        <circle :cx="CX1" :cy="CY" :r="R" fill="none" stroke="var(--line)" stroke-width="3" />
        <line v-for="(d, i) in spokes(wheelDeg)" :key="'a' + i" :x1="wheelLine(CX1, d, R).x1" :y1="wheelLine(CX1, d, R).y1" :x2="wheelLine(CX1, d, R).x2" :y2="wheelLine(CX1, d, R).y2" stroke="var(--accent)" stroke-width="3" />
        <circle :cx="CX1" :cy="CY" r="5" fill="var(--accent)" />
        <text class="num" :x="CX1" :y="CY + R + 32" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('strobe.wheel') }}</text>
      </g>

      <g>
        <circle :cx="CX2" :cy="CY" :r="R" fill="none" stroke="var(--line)" stroke-width="3" />
        <line v-for="(d, i) in spokes(cameraDeg)" :key="'b' + i" :x1="wheelLine(CX2, d, R).x1" :y1="wheelLine(CX2, d, R).y1" :x2="wheelLine(CX2, d, R).x2" :y2="wheelLine(CX2, d, R).y2" stroke="var(--accent-2)" stroke-width="3" />
        <circle :cx="CX2" :cy="CY" r="5" fill="var(--accent-2)" />
        <text class="num" :x="CX2" :y="CY + R + 32" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('strobe.camera') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
