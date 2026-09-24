<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Real free-particle masses (u) and the exact MeV-per-u conversion.
const M_P = 1.007276, M_N = 1.008665, U_MEV = 931.5
// Semi-empirical mass formula (+pairing) for the total binding energy, MeV — same formula used by
// MassDefect3D.vue. Hydrogen and helium isotopes use their real measured values instead: the smooth
// liquid-drop model badly under-predicts very light, shell-closed nuclei such as helium-4 (see the
// lesson's "Advanced" note on binding-energy).
const A_V = 15.75, A_S = 17.8, A_C = 0.711, A_A = 23.7, A_P = 12.0
const LIGHT: Record<string, number> = { '1,0': 0, '1,1': 2.224, '1,2': 8.482, '2,1': 7.718, '2,2': 28.296 }
function bindingMeV(Z: number, N: number): number {
  const key = `${Z},${N}`
  if (key in LIGHT) return LIGHT[key]
  const A = Z + N
  if (A < 1) return 0
  const pair = Z % 2 === 0 && N % 2 === 0 ? A_P / Math.sqrt(A) : Z % 2 === 1 && N % 2 === 1 ? -A_P / Math.sqrt(A) : 0
  const val = A_V * A - A_S * Math.pow(A, 2 / 3) - (A_C * Z * (Z - 1)) / Math.pow(A, 1 / 3) - (A_A * (A - 2 * Z) ** 2) / A + pair
  return Math.max(0, val)
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const Z = computed(() => Math.max(1, Math.min(12, Math.round(props.params.Z ?? 2))))
const N = computed(() => Math.max(0, Math.min(14, Math.round(props.params.N ?? 2))))
const A = computed(() => Z.value + N.value)
const eb = computed(() => bindingMeV(Z.value, N.value))
const dm = computed(() => eb.value / U_MEV)
const partsMass = computed(() => Z.value * M_P + N.value * M_N)
const nucleusMass = computed(() => partsMass.value - dm.value)

const PIVOT = { x: 400, y: 130 }
const BEAM = 250
const STRING = 92
const angle = computed(() => Math.min(0.2, Math.max(0, (dm.value / Math.max(0.01, partsMass.value)) * 24)))
const leftEnd = computed(() => ({ x: PIVOT.x - BEAM * Math.cos(angle.value), y: PIVOT.y + BEAM * Math.sin(angle.value) }))
const rightEnd = computed(() => ({ x: PIVOT.x + BEAM * Math.cos(angle.value), y: PIVOT.y - BEAM * Math.sin(angle.value) }))
const leftPan = computed(() => ({ x: leftEnd.value.x, y: leftEnd.value.y + STRING }))
const rightPan = computed(() => ({ x: rightEnd.value.x, y: rightEnd.value.y + STRING }))

const partDots = computed(() => {
  const cols = 6
  const dots: { x: number; y: number; kind: 'p' | 'n' }[] = []
  const total = Z.value + N.value
  for (let i = 0; i < total; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    dots.push({ x: leftPan.value.x - 62 + col * 22, y: leftPan.value.y - 8 - row * 20, kind: i < Z.value ? 'p' : 'n' })
  }
  return dots
})
const nucleusR = computed(() => 14 + 4.2 * Math.cbrt(A.value))
const flashR = computed(() => Math.min(70, 12 + eb.value * 1.15))

const readouts = computed(() => [
  { label: t('mass.A'), value: String(A.value) },
  { label: t('mass.dm'), value: `${fmt(dm.value, 4)} u`, color: 'var(--pos)' },
  { label: t('mass.eb'), value: `${fmt(eb.value, 1)} MeV`, color: 'var(--accent)' },
  { label: t('mass.parts'), value: `${fmt(partsMass.value, 4)} u` },
  { label: t('mass.nucleus'), value: `${fmt(nucleusMass.value, 4)} u` },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('mass.hint') }}</text>
      <text class="num" x="16" :y="H - 12" font-size="11" fill="var(--muted)">{{ t('mass.note') }}</text>

      <!-- stand -->
      <line :x1="PIVOT.x" :y1="PIVOT.y" :x2="PIVOT.x" :y2="410" stroke="var(--line)" stroke-width="6" />
      <polygon :points="`${PIVOT.x - 46},410 ${PIVOT.x + 46},410 ${PIVOT.x},438`" fill="var(--sunken)" stroke="var(--line)" />
      <circle :cx="PIVOT.x" :cy="PIVOT.y" r="6" fill="var(--muted)" />

      <!-- beam + strings -->
      <line :x1="leftEnd.x" :y1="leftEnd.y" :x2="rightEnd.x" :y2="rightEnd.y" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" />
      <line :x1="leftEnd.x" :y1="leftEnd.y" :x2="leftPan.x" :y2="leftPan.y" stroke="var(--muted)" />
      <line :x1="rightEnd.x" :y1="rightEnd.y" :x2="rightPan.x" :y2="rightPan.y" stroke="var(--muted)" />

      <!-- left pan: separate protons + neutrons -->
      <line :x1="leftPan.x - 78" :y1="leftPan.y" :x2="leftPan.x + 78" :y2="leftPan.y" stroke="var(--line)" stroke-width="3" />
      <text class="num" :x="leftPan.x" :y="leftPan.y + 26" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('mass.left') }}</text>
      <circle v-for="(d, i) in partDots" :key="i" :cx="d.x" :cy="d.y" r="8" :fill="d.kind === 'p' ? 'var(--accent-2)' : 'var(--accent)'" stroke="var(--panel)" />

      <!-- right pan: the bound nucleus -->
      <line :x1="rightPan.x - 78" :y1="rightPan.y" :x2="rightPan.x + 78" :y2="rightPan.y" stroke="var(--line)" stroke-width="3" />
      <circle :cx="rightPan.x" :cy="rightPan.y - nucleusR - 6" :r="nucleusR" fill="var(--fg)" />
      <text class="num" :x="rightPan.x" :y="rightPan.y + 26" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('mass.right') }}</text>

      <!-- released-energy flash, drawn above the beam so it never collides with either pan -->
      <g transform="translate(400, 66)">
        <path
          v-for="k in 8"
          :key="k"
          :d="`M0,0 L${(flashR * Math.cos((k * Math.PI) / 4)).toFixed(1)},${(flashR * Math.sin((k * Math.PI) / 4)).toFixed(1)}`"
          stroke="var(--pos)"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <text class="num" x="0" :y="-(flashR + 14)" text-anchor="middle" font-size="12" fill="var(--pos)" font-weight="600">{{ fmt(eb, 1) }} MeV</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
