<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import { elements } from './elements'
import Readouts from '../components/Readouts.vue'

// Semi-empirical (liquid-drop) mass formula, MeV, no pairing term so the curve stays a single
// smooth hump — real nuclei wobble a little above and below it (see the "Advanced" section).
// Z(A) follows the standard beta-stability approximation Z = A / (2 + 0.015 A^(2/3)).
const A_V = 15.75, A_S = 17.8, A_C = 0.711, A_A = 23.7
const A_MIN = 2, A_MAX = 240
function stableZ(A: number): number {
  return Math.max(1, Math.min(A - 1, Math.round(A / (2 + 0.015 * Math.pow(A, 2 / 3)))))
}
function beOverA(A: number): number {
  const Z = stableZ(A)
  const term = A_V * A - A_S * Math.pow(A, 2 / 3) - (A_C * Z * (Z - 1)) / Math.pow(A, 1 / 3) - (A_A * (A - 2 * Z) ** 2) / A
  return Math.max(0, term) / A
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 54, r: 20, t: 46, b: 46 }
const Y_MAX = 9.5

const A = computed(() => Math.max(A_MIN, Math.min(A_MAX, Math.round(props.params.A ?? 12))))
const Z = computed(() => stableZ(A.value))
const N = computed(() => A.value - Z.value)
const ebA = computed(() => beOverA(A.value))
const ebTotal = computed(() => ebA.value * A.value)

const curve = computed(() => Array.from({ length: A_MAX - A_MIN + 1 }, (_, i) => ({ A: A_MIN + i, v: beOverA(A_MIN + i) })))
const peak = computed(() => curve.value.reduce((best, p) => (p.v > best.v ? p : best), curve.value[0]))

const sx = (a: number) => PAD.l + ((a - A_MIN) / (A_MAX - A_MIN)) * (W - PAD.l - PAD.r)
const sy = (v: number) => H - PAD.b - (v / Y_MAX) * (H - PAD.t - PAD.b)

const curvePath = computed(() => curve.value.map((p, i) => `${i ? 'L' : 'M'}${sx(p.A).toFixed(1)},${sy(p.v).toFixed(1)}`).join(''))
const symbol = computed(() => elements[Z.value - 1]?.s ?? `Z${Z.value}`)

function onDrag(ev: PointerEvent) {
  const rect = (ev.currentTarget as SVGElement).ownerSVGElement!.getBoundingClientRect()
  const px = ((ev.clientX - rect.left) / rect.width) * W
  const a = Math.round(A_MIN + ((px - PAD.l) / (W - PAD.l - PAD.r)) * (A_MAX - A_MIN))
  emit('set', 'A', Math.max(A_MIN, Math.min(A_MAX, a)))
}
function onMove(ev: PointerEvent) {
  if (ev.buttons & 1) onDrag(ev)
}

const readouts = computed(() => [
  { label: t('binding.A'), value: String(A.value) },
  { label: t('binding.Z'), value: String(Z.value) },
  { label: t('binding.N'), value: String(N.value) },
  { label: t('binding.eb'), value: `${fmt(ebTotal.value, 1)} MeV`, color: 'var(--accent)' },
  { label: t('binding.ebA'), value: `${fmt(ebA.value, 2)} MeV`, color: 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('binding.hint') }}</text>

      <!-- fusion (left of peak) / fission (right of peak) regions -->
      <rect :x="PAD.l" :y="PAD.t" :width="sx(peak.A) - PAD.l" :height="H - PAD.t - PAD.b" fill="var(--accent)" fill-opacity="0.06" />
      <rect :x="sx(peak.A)" :y="PAD.t" :width="W - PAD.r - sx(peak.A)" :height="H - PAD.t - PAD.b" fill="var(--accent-2)" fill-opacity="0.06" />
      <text class="num" :x="sx(peak.A / 2)" y="66" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('binding.fusionPays') }}</text>
      <text class="num" :x="(sx(peak.A) + W - PAD.r) / 2" y="66" text-anchor="middle" font-size="12" fill="var(--accent-2)">{{ t('binding.fissionPays') }}</text>

      <!-- axes -->
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="v in [0, 2, 4, 6, 8]" :key="'y' + v">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(v)" :y2="sy(v)" stroke="var(--grid)" />
          <text :x="PAD.l - 8" :y="sy(v) + 4" text-anchor="end">{{ v }}</text>
        </template>
        <template v-for="v in [2, 50, 100, 150, 200, 240]" :key="'x' + v">
          <text :x="sx(v)" :y="H - PAD.b + 18" text-anchor="middle">{{ v }}</text>
        </template>
      </g>
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('binding.axisA') }}</text>
      <text class="num" :x="PAD.l" :y="42" text-anchor="start" font-size="11" fill="var(--muted)">{{ t('binding.axisEbA') }}</text>

      <!-- peak marker -->
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(peak.v)" :y2="sy(peak.v)" stroke="var(--muted)" stroke-dasharray="4 4" />
      <text class="num" :x="W - PAD.r" :y="sy(peak.v) - 6" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('binding.peak', { v: fmt(peak.v, 1) }) }}</text>

      <!-- curve -->
      <path :d="curvePath" fill="none" stroke="var(--fg)" stroke-width="2.5" />

      <!-- draggable overlay -->
      <rect :x="PAD.l" :y="PAD.t" :width="W - PAD.l - PAD.r" :height="H - PAD.t - PAD.b" fill="transparent" style="cursor: ew-resize" @pointerdown="onDrag" @pointermove="onMove" />

      <!-- marked nucleus -->
      <line :x1="sx(A)" :x2="sx(A)" :y1="sy(ebA)" :y2="H - PAD.b" stroke="var(--pos)" stroke-opacity="0.5" stroke-dasharray="3 3" />
      <circle :cx="sx(A)" :cy="sy(ebA)" r="7" fill="var(--pos)" stroke="var(--panel)" stroke-width="2" />
      <text class="num" :x="sx(A)" :y="sy(ebA) - 14" text-anchor="middle" font-size="13" fill="var(--pos)" font-weight="600">{{ symbol }}-{{ A }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
