<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/sound-intensity-and-decibels. beta(r) = dB0 - 20*log10(r/r0), r0 = 1 m.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PX0 = 90
const PX1 = 760
const PY0 = 60 // top (140 dB)
const PY1 = 380 // bottom (-10 dB)
const DB_TOP = 140
const DB_BOT = -10

const dB0 = computed(() => props.params.dB0 ?? 100)
const r = computed(() => props.params.r ?? 5)
const level = computed(() => dB0.value - 20 * Math.log10(r.value))
const danger = computed(() => (level.value >= 120 ? 'var(--neg)' : level.value >= 85 ? 'var(--accent-2)' : 'var(--pos)'))

const pxX = (rr: number) => PX0 + (Math.log10(Math.max(1, rr)) / 2) * (PX1 - PX0)
const pxY = (db: number) => PY1 - ((db - DB_BOT) / (DB_TOP - DB_BOT)) * (PY1 - PY0)

const curve = computed(() => {
  let d = ''
  for (let i = 0; i <= 60; i++) {
    const rr = Math.pow(10, (i / 60) * 2)
    const db = dB0.value - 20 * Math.log10(rr)
    const px = pxX(rr)
    const py = Math.max(PY0, Math.min(PY1, pxY(db)))
    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1)
  }
  return d
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  const x = ((e.clientX - bx.left) / bx.width) * W
  const frac = Math.max(0, Math.min(1, (x - PX0) / (PX1 - PX0)))
  emit('set', 'r', Math.pow(10, frac * 2))
}

const readouts = computed(() => [
  { label: t('decibel.r'), value: fmt(r.value, 1) + ' m', color: 'var(--accent)' },
  { label: t('decibel.level'), value: fmt(level.value, 1) + ' dB', color: danger.value },
  { label: t('decibel.status'), value: level.value >= 120 ? t('decibel.danger') : level.value >= 85 ? t('decibel.caution') : t('decibel.safe'), color: danger.value },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('decibel.hint') }}</text>
      <line :x1="PX0" :x2="PX1" :y1="PY1" :y2="PY1" stroke="var(--line)" />
      <line :x1="PX0" :x2="PX0" :y1="PY0" :y2="PY1" stroke="var(--line)" />
      <g v-for="mark in [30, 60, 85, 120]" :key="mark">
        <line :x1="PX0" :x2="PX1" :y1="pxY(mark)" :y2="pxY(mark)" stroke="var(--grid)" stroke-dasharray="4 4" />
        <text class="num" :x="PX1 + 4" :y="pxY(mark) + 4" font-size="11" fill="var(--muted)">{{ mark }}</text>
      </g>
      <text class="num" :x="PX1 - 40" :y="pxY(30) - 6" font-size="10" fill="var(--muted)">{{ t('decibel.whisper') }}</text>
      <text class="num" :x="PX1 - 40" :y="pxY(85) - 6" font-size="10" fill="var(--muted)">{{ t('decibel.damage') }}</text>
      <text class="num" :x="PX1 - 40" :y="pxY(120) - 6" font-size="10" fill="var(--muted)">{{ t('decibel.jet') }}</text>
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="pxX(r)" :x2="pxX(r)" :y1="PY0" :y2="PY1" stroke="var(--muted)" stroke-dasharray="3 3" />
      <circle :cx="pxX(r)" :cy="pxY(Math.max(DB_BOT, Math.min(DB_TOP, level)))" r="7" :fill="danger" />
      <text class="num" x="16" :y="PY1 + 30" font-size="11" fill="var(--muted)">{{ t('decibel.xlabel') }}</text>
      <text class="num" x="20" :y="PY0 - 20" font-size="11" fill="var(--muted)">{{ t('decibel.ylabel') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
