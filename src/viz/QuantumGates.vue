<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two qubits start at |00⟩. X flips a qubit, H spreads one qubit into an equal mix of 0 and 1, and CNOT flips
// qubit B only when qubit A is 1 — the gate that links two qubits together (entanglement). Every amplitude
// here stays a real number, so the picture only ever needs plus/minus bars, not a full complex phase.
// params: g0, g1 (0 = I, 1 = X, 2 = H, applied to qubit A and B), cnot (0 or 1, control = A, target = B).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const GATE_NAMES = ['I', 'X', 'H']
const gA = computed(() => Math.max(0, Math.min(2, Math.round(props.params.g0 ?? 0))))
const gB = computed(() => Math.max(0, Math.min(2, Math.round(props.params.g1 ?? 0))))
const cnotOn = computed(() => (props.params.cnot ?? 0) >= 0.5)

function applyGate(state: number[], qubit: 0 | 1, gate: number): number[] {
  if (gate === 0) return state.slice()
  const pairs: [number, number][] = qubit === 0 ? [[0, 2], [1, 3]] : [[0, 1], [2, 3]]
  const s = state.slice()
  for (const [i, j] of pairs) {
    if (gate === 1) { s[i] = state[j]; s[j] = state[i] }
    else { s[i] = (state[i] + state[j]) / Math.SQRT2; s[j] = (state[i] - state[j]) / Math.SQRT2 }
  }
  return s
}
function applyCNOT(state: number[]): number[] { const s = state.slice(); [s[2], s[3]] = [s[3], s[2]]; return s }

const amps = computed(() => {
  let s = [1, 0, 0, 0]
  s = applyGate(s, 0, gA.value)
  s = applyGate(s, 1, gB.value)
  if (cnotOn.value) s = applyCNOT(s)
  return s
})
const probs = computed(() => amps.value.map((a) => a * a))
const LABELS = ['00', '01', '10', '11']

const counts = ref([0, 0, 0, 0])
watch([gA, gB, cnotOn], () => (counts.value = [0, 0, 0, 0]))
function measure() {
  const r = Math.random()
  let acc = 0
  let out = 3
  for (let i = 0; i < 4; i++) { acc += probs.value[i]; if (r < acc) { out = i; break } }
  const c = counts.value.slice()
  c[out]++
  counts.value = c
}
const totalShots = computed(() => counts.value.reduce((a, b) => a + b, 0))

const WY = { a: 170, b: 320 }
const readouts = computed(() => [
  { label: t('qgate.gateA'), value: t(`qgate.name.${GATE_NAMES[gA.value]}` as any), color: 'var(--accent)' },
  { label: t('qgate.gateB'), value: t(`qgate.name.${GATE_NAMES[gB.value]}` as any), color: 'var(--accent-2)' },
  { label: t('qgate.cnot'), value: cnotOn.value ? t('qgate.on') : t('qgate.off') },
  { label: t('qgate.shots'), value: totalShots.value ? counts.value.join(' / ') : '—' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="emit('set', 'g0', (gA + 1) % 3)">A: {{ GATE_NAMES[gA] }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="emit('set', 'g1', (gB + 1) % 3)">B: {{ GATE_NAMES[gB] }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="emit('set', 'cnot', cnotOn ? 0 : 1)">CNOT {{ cnotOn ? t('qgate.on') : t('qgate.off') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('qgate.hint') }}</text>
      <text class="num" x="60" :y="WY.a + 5" font-size="14" fill="var(--muted)">|0⟩ᴬ</text>
      <text class="num" x="60" :y="WY.b + 5" font-size="14" fill="var(--muted)">|0⟩ᴮ</text>
      <line x1="100" :y1="WY.a" x2="500" :y2="WY.a" stroke="var(--line)" stroke-width="2" />
      <line x1="100" :y1="WY.b" x2="500" :y2="WY.b" stroke="var(--line)" stroke-width="2" />
      <!-- single-qubit gates -->
      <rect x="180" :y="WY.a - 26" width="52" height="52" rx="8" fill="var(--panel)" stroke="var(--accent)" stroke-width="2.5" />
      <text class="num" x="206" :y="WY.a + 7" text-anchor="middle" font-size="20" fill="var(--accent)">{{ GATE_NAMES[gA] }}</text>
      <rect x="180" :y="WY.b - 26" width="52" height="52" rx="8" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2.5" />
      <text class="num" x="206" :y="WY.b + 7" text-anchor="middle" font-size="20" fill="var(--accent-2)">{{ GATE_NAMES[gB] }}</text>
      <!-- CNOT -->
      <g v-if="cnotOn">
        <line x1="360" :y1="WY.a" x2="360" :y2="WY.b" stroke="var(--fg)" stroke-width="2.5" />
        <circle cx="360" :cy="WY.a" r="9" fill="var(--fg)" />
        <circle cx="360" :cy="WY.b" r="16" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
        <line x1="344" :y1="WY.b" x2="376" :y2="WY.b" stroke="var(--fg)" stroke-width="2.5" />
        <line x1="360" :y1="WY.b - 16" x2="360" :y2="WY.b + 16" stroke="var(--fg)" stroke-width="2.5" />
      </g>
      <text v-else class="num" x="360" :y="(WY.a + WY.b) / 2" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('qgate.noCnot') }}</text>
      <!-- probability bars -->
      <g transform="translate(560, 60)">
        <text class="num" x="0" y="-10" font-size="11" fill="var(--muted)">{{ t('qgate.probs') }}</text>
        <g v-for="(p, i) in probs" :key="i" :transform="`translate(${i * 50}, 0)`">
          <rect x="0" :y="220 - p * 220" width="34" :height="p * 220" rx="3" :fill="i === 0 ? 'var(--fg)' : i === 3 ? 'var(--accent)' : 'var(--accent-2)'" />
          <text class="num" x="17" y="238" text-anchor="middle" font-size="11" fill="var(--muted)">{{ LABELS[i] }}</text>
          <text class="num" x="17" :y="212 - p * 220" text-anchor="middle" font-size="10" fill="var(--fg)">{{ fmt(p * 100, 0) }}%</text>
        </g>
      </g>
      <g class="cursor-pointer" @click="measure">
        <rect x="560" y="300" width="180" height="40" rx="10" fill="var(--fg)" />
        <text class="num" x="650" y="325" text-anchor="middle" font-size="13" fill="var(--bg)">{{ t('qgate.measure') }}</text>
      </g>
      <text v-if="totalShots" class="num" x="560" y="365" font-size="11" fill="var(--muted)">{{ t('qgate.tally', { n: totalShots }) }}: {{ counts[0] }}·{{ counts[1] }}·{{ counts[2] }}·{{ counts[3] }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
