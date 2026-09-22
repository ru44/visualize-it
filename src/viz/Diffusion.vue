<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two compartments separated by a membrane with pores. Particles random-walk; each time one hits a
// pore it crosses. Concentrations equalise on their own — diffusion needs no pump.
// params: nLeft, nRight (initial counts), perm (pore fraction 0..1), temp (speed). Drag sets the divider.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 420
const box = { x: 40, y: 40, w: 720, h: 320 }
const divider = computed(() => box.x + box.w * Math.min(0.9, Math.max(0.1, (props.params.split ?? 50) / 100)))
interface P { x: number; y: number; vx: number; vy: number }
const parts = ref<P[]>([])
const history = ref<[number, number][]>([])

function reset() {
  const mk = (n: number, x0: number, x1: number) => Array.from({ length: n }, () => ({ x: x0 + Math.random() * (x1 - x0), y: box.y + 6 + Math.random() * (box.h - 12), vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 }))
  parts.value = [...mk(Math.round(props.params.nLeft ?? 120), box.x + 6, divider.value - 6), ...mk(Math.round(props.params.nRight ?? 20), divider.value + 6, box.x + box.w - 6)]
  history.value = []
}
watch(() => [props.params.nLeft, props.params.nRight], reset)
const speed = computed(() => 0.6 + (props.params.temp ?? 300) / 150)
const perm = computed(() => Math.min(1, Math.max(0, (props.params.perm ?? 30) / 100)))
// pores: evenly spaced gaps along the membrane covering `perm` of its height
const pores = computed(() => Array.from({ length: 8 }, (_, i) => { const cell = box.h / 8; const gap = cell * perm.value; return [box.y + i * cell + (cell - gap) / 2, box.y + i * cell + (cell + gap) / 2] as [number, number] }))
const inPore = (y: number) => pores.value.some(([a, b]) => y > a && y < b)

let raf = 0
let frames = 0
function step() {
  const s = speed.value
  const d = divider.value
  for (const p of parts.value) {
    p.vx += (Math.random() - 0.5) * 0.4; p.vy += (Math.random() - 0.5) * 0.4
    const m = Math.hypot(p.vx, p.vy) || 1
    p.vx = (p.vx / m) * s; p.vy = (p.vy / m) * s
    const nx = p.x + p.vx
    if ((p.x < d && nx >= d) || (p.x > d && nx <= d)) { if (!inPore(p.y)) p.vx *= -1; else p.x = nx } else p.x = nx
    p.y += p.vy
    if (p.x < box.x + 4 || p.x > box.x + box.w - 4) (p.vx *= -1), (p.x = Math.min(box.x + box.w - 4, Math.max(box.x + 4, p.x)))
    if (p.y < box.y + 4 || p.y > box.y + box.h - 4) (p.vy *= -1), (p.y = Math.min(box.y + box.h - 4, Math.max(box.y + 4, p.y)))
  }
  if (++frames % 10 === 0) history.value = [...history.value.slice(-119), [left.value, right.value]]
  parts.value = [...parts.value]
  raf = requestAnimationFrame(step)
}
onMounted(() => { reset(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(step) })
onUnmounted(() => cancelAnimationFrame(raf))

const left = computed(() => parts.value.filter((p) => p.x < divider.value).length)
const right = computed(() => parts.value.length - left.value)
const volL = computed(() => (divider.value - box.x) / box.w)
const concL = computed(() => left.value / Math.max(0.01, volL.value))
const concR = computed(() => right.value / Math.max(0.01, 1 - volL.value))
const readouts = computed(() => [
  { label: t('diff.left'), value: `${left.value} · ${fmt(concL.value, 0)}/unit`, color: 'var(--accent)' },
  { label: t('diff.right'), value: `${right.value} · ${fmt(concR.value, 0)}/unit`, color: 'var(--accent-2)' },
  { label: t('diff.gradient'), value: fmt(concL.value - concR.value, 0) },
])
const dragging = ref(false)
function pick(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const b = svg.getBoundingClientRect()
  emit('set', 'split', ((((e.clientX - b.left) / b.width) * W - box.x) / box.w) * 100)
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-ew-resize touch-none select-none" @pointerdown="dragging = true; ($event.currentTarget as Element).setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="40" y="24" font-size="12" fill="var(--muted)">{{ t('diff.hint') }}</text>
      <rect :x="box.x" :y="box.y" :width="box.w" :height="box.h" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <line :x1="divider" :x2="divider" :y1="box.y" :y2="box.y + box.h" stroke="var(--fg)" stroke-width="4" />
      <line v-for="([a, b], i) in pores" :key="i" :x1="divider" :x2="divider" :y1="a" :y2="b" stroke="var(--sunken)" stroke-width="6" />
      <circle v-for="(p, i) in parts" :key="i" :cx="p.x" :cy="p.y" r="3.2" :fill="p.x < divider ? 'var(--accent)' : 'var(--accent-2)'" />
      <!-- concentration history -->
      <g v-if="history.length > 1">
        <polyline :points="history.map(([l], i) => `${box.x + (i / 119) * 200},${H - 12 - (l / parts.length) * 40}`).join(' ')" fill="none" stroke="var(--accent)" stroke-width="1.5" />
        <polyline :points="history.map(([, r], i) => `${box.x + (i / 119) * 200},${H - 12 - (r / parts.length) * 40}`).join(' ')" fill="none" stroke="var(--accent-2)" stroke-width="1.5" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
