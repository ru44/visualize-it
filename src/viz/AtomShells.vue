<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const ELEMENTS: { symbol: string; name: string }[] = [
  { symbol: '', name: '' },
  { symbol: 'H', name: 'Hydrogen' },
  { symbol: 'He', name: 'Helium' },
  { symbol: 'Li', name: 'Lithium' },
  { symbol: 'Be', name: 'Beryllium' },
  { symbol: 'B', name: 'Boron' },
  { symbol: 'C', name: 'Carbon' },
  { symbol: 'N', name: 'Nitrogen' },
  { symbol: 'O', name: 'Oxygen' },
  { symbol: 'F', name: 'Fluorine' },
  { symbol: 'Ne', name: 'Neon' },
  { symbol: 'Na', name: 'Sodium' },
  { symbol: 'Mg', name: 'Magnesium' },
  { symbol: 'Al', name: 'Aluminium' },
  { symbol: 'Si', name: 'Silicon' },
  { symbol: 'P', name: 'Phosphorus' },
  { symbol: 'S', name: 'Sulfur' },
  { symbol: 'Cl', name: 'Chlorine' },
  { symbol: 'Ar', name: 'Argon' },
  { symbol: 'K', name: 'Potassium' },
  { symbol: 'Ca', name: 'Calcium' },
]

const Z = computed(() => Math.round(Math.min(20, Math.max(1, props.params.Z ?? 11))))
const N = computed(() => Math.round(Math.min(24, Math.max(0, props.params.N ?? 12))))

function shellConfig(z: number): number[] {
  const caps = [2, 8, 8, 2]
  let remaining = z
  const config: number[] = []
  for (const cap of caps) {
    if (remaining <= 0) break
    const fill = Math.min(cap, remaining)
    config.push(fill)
    remaining -= fill
  }
  return config
}

const config = computed(() => shellConfig(Z.value))
const valence = computed(() => config.value[config.value.length - 1] ?? 0)
const element = computed(() => ELEMENTS[Z.value] ?? { symbol: '?', name: '?' })
const A = computed(() => Z.value + N.value)

const CX = 400
const CY = 240
const RADII = [60, 95, 130, 165]
const SPEED = [0.4, -0.28, 0.2, -0.15]

const t = ref(0)
let rafId: number | null = null
let lastTime = 0
function loop(now: number) {
  if (lastTime) t.value += (now - lastTime) / 1000
  lastTime = now
  rafId = requestAnimationFrame(loop)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) rafId = requestAnimationFrame(loop)
})
onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  rafId = null
})

const shells = computed(() =>
  config.value.map((count, s) => ({
    r: RADII[s]!,
    electrons: Array.from({ length: count }, (_, i) => {
      const angle = (2 * Math.PI * i) / count + t.value * SPEED[s]!
      return { x: CX + RADII[s]! * Math.cos(angle), y: CY + RADII[s]! * Math.sin(angle) }
    }),
    valence: s === config.value.length - 1,
  })),
)

const readouts = computed(() => [
  { label: 'element', value: `${element.value.name} (${element.value.symbol})` },
  { label: 'Z (protons)', value: fmt(Z.value) },
  { label: 'N (neutrons)', value: fmt(N.value) },
  { label: 'A (mass number)', value: fmt(A.value) },
  { label: 'electron config', value: config.value.join('·') },
  { label: 'valence electrons', value: fmt(valence.value), color: 'var(--accent-2)' },
])

let dragging = false
function clientToX(e: PointerEvent): number {
  const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
  return ((e.clientX - rect.left) / rect.width) * 800
}
function updateFromEvent(e: PointerEvent) {
  const x = clientToX(e)
  const p = Math.min(1, Math.max(0, (x - 40) / 720))
  emit('set', 'Z', Math.round(1 + p * 19))
}
function onDown(e: PointerEvent) {
  dragging = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  updateFromEvent(e)
}
function onMove(e: PointerEvent) {
  if (!dragging) return
  updateFromEvent(e)
}
function onUp() {
  dragging = false
}
</script>

<template>
  <div>
    <svg viewBox="0 0 800 480" class="block w-full touch-none select-none" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp">
      <rect x="0" y="0" width="800" height="480" fill="var(--bg)" />
      <circle v-for="(s, i) in shells" :key="'shell' + i" :cx="CX" :cy="CY" :r="s.r" fill="none" stroke="var(--line)" stroke-width="1" />

      <circle :cx="CX" :cy="CY" r="30" fill="var(--sunken)" stroke="var(--line)" />
      <text class="num" :x="CX" :y="CY - 4" font-size="12" fill="var(--fg)" text-anchor="middle">p⁺ {{ Z }}</text>
      <text class="num" :x="CX" :y="CY + 12" font-size="12" fill="var(--muted)" text-anchor="middle">n⁰ {{ N }}</text>

      <g v-for="(s, i) in shells" :key="'e' + i">
        <circle v-for="(e, j) in s.electrons" :key="j" :cx="e.x" :cy="e.y" r="5.5" :fill="s.valence ? 'var(--accent-2)' : 'var(--accent)'" />
      </g>

      <text class="num" x="640" y="90" font-size="34" fill="var(--fg)" text-anchor="middle">
        {{ element.symbol }}
        <tspan :x="640" dy="-14" font-size="14">{{ A }}</tspan>
      </text>
      <text class="num" x="640" y="110" font-size="12" fill="var(--muted)" text-anchor="middle">{{ element.name }} — isotope {{ A }}{{ element.symbol }}</text>

      <text class="num" x="16" y="466" font-size="12" fill="var(--muted)">drag horizontally to set Z · outer (valence) electrons highlighted</text>
    </svg>
    <p class="mt-2 text-xs" style="color: var(--muted)">Shell model — real electrons occupy orbitals (probability clouds), not circular tracks.</p>
    <Readouts :items="readouts" />
  </div>
</template>
