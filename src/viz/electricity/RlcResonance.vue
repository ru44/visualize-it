<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRafLoop } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// electricity/rlc-resonance. params V (V), R (Ω), L (mH), C (µF), x = drive frequency (Hz).
// A series RLC circuit being shaken by an AC source: the current dots slosh back and forth with
// an amplitude read off I(f) = V/|Z|. Tune x onto f0 = 1/(2π√(LC)) and the sloshing peaks.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const V = computed(() => Math.max(props.params.V ?? 10, 0.1))
const R = computed(() => Math.max(props.params.R ?? 10, 0.1))
const L = computed(() => Math.max(props.params.L ?? 50, 0.1))
const C = computed(() => Math.max(props.params.C ?? 20, 0.1))
const f = computed(() => Math.max(props.params.x ?? 159, 1))
const amp = (freq: number) => {
  const xl = 2 * Math.PI * freq * (L.value / 1000)
  const xc = 1 / (2 * Math.PI * freq * (C.value * 1e-6))
  return V.value / Math.sqrt(R.value * R.value + (xl - xc) * (xl - xc))
}
const f0 = computed(() => 1 / (2 * Math.PI * Math.sqrt((L.value / 1000) * (C.value * 1e-6))))
const I = computed(() => amp(f.value))
const Imax = computed(() => V.value / R.value)
const qFactor = computed(() => (1 / R.value) * Math.sqrt((L.value / 1000) / (C.value * 1e-6)))

// --- dots sloshing along the loop: amplitude ∝ I(f), tempo ∝ f (stylised) ---
const phase = ref(0)
useRafLoop((dt) => {
  phase.value += dt * Math.min(f.value / 30, 8) * 2 * Math.PI
})
// loop corners: (140,350)→(140,150)→(520,150)→(520,350)→back, perimeter 2*(200+380)
const SEG = [200, 380, 200, 380]
const PER = 1160
const slosh = computed(() => Math.sin(phase.value) * (I.value / Imax.value) * 48)
const dotXY = (dist: number) => {
  let s = ((dist % PER) + PER) % PER
  if (s < SEG[0]) return { x: 140, y: 350 - s }
  s -= SEG[0]
  if (s < SEG[1]) return { x: 140 + s, y: 150 }
  s -= SEG[1]
  if (s < SEG[2]) return { x: 520, y: 150 + s }
  s -= SEG[2]
  return { x: 520 - s, y: 350 }
}
const dots = computed(() => Array.from({ length: 14 }, (_, i) => dotXY(i * (PER / 14) + slosh.value)))

// --- resonance curve panel with the dial marked ---
const CH = { x: 565, y: 130, w: 215, h: 210 }
const FMIN = 10
const FMAX = 400
const pts = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 80; i++) {
    const ff = FMIN + ((FMAX - FMIN) * i) / 80
    out.push(`${CH.x + ((ff - FMIN) / (FMAX - FMIN)) * CH.w},${CH.y + CH.h - (amp(ff) / Imax.value) * (CH.h - 14)}`)
  }
  return out.join(' ')
})
const markX = computed(() => CH.x + ((Math.min(f.value, FMAX) - FMIN) / (FMAX - FMIN)) * CH.w)
const markY = computed(() => CH.y + CH.h - (I.value / Imax.value) * (CH.h - 14))
const f0X = computed(() => CH.x + ((Math.min(Math.max(f0.value, FMIN), FMAX) - FMIN) / (FMAX - FMIN)) * CH.w)

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.round(Math.min(FMAX, Math.max(FMIN, FMIN + ((px - CH.x) / CH.w) * (FMAX - FMIN)))))
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  if (((ev.clientX - box.left) / box.width) * W < CH.x - 20) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'f', value: `${fmt(f.value, 0)} Hz` },
  { label: 'f₀ = 1/(2π√(LC))', value: `${fmt(f0.value, 1)} Hz`, color: 'var(--accent)' },
  { label: 'I(f) = V/|Z|', value: `${fmt(I.value, 3)} A`, color: 'var(--accent-2)' },
  { label: 'I at f₀ = V/R', value: `${fmt(Imax.value, 2)} A` },
  { label: 'Q = (1/R)√(L/C)', value: fmt(qFactor.value, 1) },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('rlc.hint') }}</text>
      <!-- the series loop -->
      <path d="M140,350 V150 H520 V350 H140" fill="none" stroke="var(--line)" stroke-width="3" />
      <circle v-for="(dt2, i) in dots" :key="i" :cx="dt2.x" :cy="dt2.y" r="4" fill="var(--accent-2)" />
      <!-- AC source -->
      <circle cx="140" cy="250" r="26" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <path d="M126,250 q7,-12 14,0 q7,12 14,0" fill="none" stroke="var(--accent)" stroke-width="2" />
      <text x="100" y="236" text-anchor="end" font-size="12" fill="var(--fg)" class="num">V = {{ fmt(V, 0) }} V</text>
      <text x="100" y="256" text-anchor="end" font-size="12" fill="var(--accent)" class="num">f = {{ fmt(f, 0) }} Hz</text>
      <!-- R, L, C in series on top -->
      <path d="M190,150 l8,-10 l13,20 l13,-20 l13,20 l13,-20 l8,10" fill="none" stroke="var(--accent-2)" stroke-width="3" />
      <text x="224" y="124" text-anchor="middle" font-size="11" fill="var(--fg)" class="num">R = {{ fmt(R, 0) }} Ω</text>
      <path d="M300,150 a11,13 0 0 1 22,0 a11,13 0 0 1 22,0 a11,13 0 0 1 22,0 a11,13 0 0 1 22,0" fill="none" stroke="var(--accent)" stroke-width="3" />
      <text x="344" y="124" text-anchor="middle" font-size="11" fill="var(--fg)" class="num">L = {{ fmt(L, 0) }} mH</text>
      <line x1="440" y1="150" x2="452" y2="150" stroke="var(--line)" stroke-width="3" />
      <line x1="452" y1="130" x2="452" y2="170" stroke="var(--accent)" stroke-width="4" />
      <line x1="466" y1="130" x2="466" y2="170" stroke="var(--accent)" stroke-width="4" />
      <line x1="466" y1="150" x2="478" y2="150" stroke="var(--line)" stroke-width="3" />
      <text x="459" y="124" text-anchor="middle" font-size="11" fill="var(--fg)" class="num">C = {{ fmt(C, 0) }} µF</text>
      <!-- sloshing amplitude meter under the loop -->
      <rect x="200" y="392" width="260" height="14" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="200" y="392" :width="(I / Imax) * 260" height="14" rx="4" :fill="I / Imax > 0.95 ? 'var(--pos)' : 'var(--accent-2)'" />
      <text x="330" y="426" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rlc.meter') }}</text>
      <!-- resonance curve with dial -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <line :x1="f0X" :y1="CH.y" :x2="f0X" :y2="CH.y + CH.h" stroke="var(--pos)" stroke-dasharray="3 3" />
      <text :x="f0X" :y="CH.y - 6" text-anchor="middle" font-size="10" fill="var(--pos)" class="num">f₀ = {{ fmt(f0, 0) }}</text>
      <polyline :points="pts" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="markX" :y1="CH.y" :x2="markX" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <circle :cx="markX" :cy="markY" r="5" fill="var(--accent-2)" />
      <text :x="CH.x + CH.w / 2" :y="CH.y + CH.h + 16" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('rlc.dial') }}</text>
      <text :x="W / 2" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rlc.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
