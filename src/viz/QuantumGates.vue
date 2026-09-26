<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three tiny circuits, picked by «circuit stage»: 0 = X alone (a certain flip), 1 = H alone (a genuine
// 50/50 mix), 2 = H on qubit A then CNOT onto qubit B (an entangling circuit whose two qubits always
// measure the same). params gate (0/1/2), shots.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const gate = computed(() => Math.round(props.params.gate ?? 0))
const shots = computed(() => Math.max(1, Math.round(props.params.shots ?? 100)))
const two = computed(() => gate.value === 2)
const labels = computed(() => (two.value ? ['00', '01', '10', '11'] : ['0', '1']))
const expected = computed<Record<string, number>>(() => {
  const e: Record<string, number> = {}
  if (gate.value === 0) { e['0'] = 0; e['1'] = 1 }
  else if (gate.value === 1) { e['0'] = 0.5; e['1'] = 0.5 }
  else { e['00'] = 0.5; e['01'] = 0; e['10'] = 0; e['11'] = 0.5 }
  return e
})

const outcomes = ref<string[]>([])
watch(gate, () => (outcomes.value = []))
function sample(): string {
  if (gate.value === 0) return '1'
  if (gate.value === 1) return Math.random() < 0.5 ? '0' : '1'
  const r = Math.random() < 0.5 ? '0' : '1'
  return r + r
}
function measure(n: number) {
  const list = outcomes.value.slice()
  for (let i = 0; i < n; i++) list.push(sample())
  outcomes.value = list.slice(-2000)
}
const total = computed(() => outcomes.value.length)
const last = computed(() => outcomes.value.at(-1))
const counts = computed(() => { const c: Record<string, number> = {}; for (const l of labels.value) c[l] = 0; for (const o of outcomes.value) c[o] = (c[o] ?? 0) + 1; return c })

const readouts = computed(() => [
  { label: t('qg.results'), value: total.value ? labels.value.map((l) => `${l}: ${counts.value[l]}`).join('  ') : '—' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('qg.hint') }}</text>

      <!-- wire A -->
      <line x1="100" y1="150" x2="650" y2="150" stroke="var(--line)" stroke-width="2" />
      <text class="num" x="80" y="155" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('qg.wireA') }}</text>

      <!-- gate 0: X -->
      <g v-if="gate === 0">
        <rect x="260" y="120" width="80" height="60" rx="8" fill="var(--accent)" fill-opacity="0.85" />
        <text x="300" y="160" text-anchor="middle" font-size="28" fill="var(--bg)">X</text>
      </g>
      <!-- gate 1: H -->
      <g v-else-if="gate === 1">
        <rect x="260" y="120" width="80" height="60" rx="8" fill="var(--accent)" fill-opacity="0.85" />
        <text x="300" y="160" text-anchor="middle" font-size="28" fill="var(--bg)">H</text>
      </g>
      <!-- gate 2: H then CNOT, two wires -->
      <g v-else>
        <line x1="100" y1="280" x2="650" y2="280" stroke="var(--line)" stroke-width="2" />
        <text class="num" x="80" y="285" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('qg.wireB') }}</text>
        <rect x="200" y="120" width="70" height="60" rx="8" fill="var(--accent)" fill-opacity="0.85" />
        <text x="235" y="160" text-anchor="middle" font-size="26" fill="var(--bg)">H</text>
        <line x1="420" y1="150" x2="420" y2="280" stroke="var(--fg)" stroke-width="2.5" />
        <circle cx="420" cy="150" r="9" fill="var(--fg)" />
        <circle cx="420" cy="280" r="18" fill="none" stroke="var(--fg)" stroke-width="2.5" />
        <line x1="402" y1="280" x2="438" y2="280" stroke="var(--fg)" stroke-width="2.5" />
        <line x1="420" y1="262" x2="420" y2="298" stroke="var(--fg)" stroke-width="2.5" />
      </g>

      <!-- measurement readout -->
      <g transform="translate(560, 100)">
        <rect width="140" height="100" rx="10" fill="var(--sunken)" stroke="var(--line)" />
        <text x="70" y="60" text-anchor="middle" font-size="34" fill="var(--fg)" class="num">{{ last ?? '—' }}</text>
      </g>

      <!-- buttons -->
      <g class="cursor-pointer" transform="translate(120, 340)" @click="measure(1)"><rect width="200" height="34" rx="8" fill="var(--fg)" /><text class="num" x="100" y="22" text-anchor="middle" font-size="13" fill="var(--bg)">{{ t('qg.measureOne') }}</text></g>
      <g class="cursor-pointer" transform="translate(340, 340)" @click="measure(shots)"><rect width="220" height="34" rx="8" fill="var(--panel)" stroke="var(--line)" /><text class="num" x="110" y="22" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('qg.measureMany', { n: shots }) }}</text></g>

      <!-- histogram -->
      <g transform="translate(120, 400)" class="num" font-size="11">
        <text fill="var(--muted)">{{ t('qg.results') }}</text>
        <g v-for="(l, i) in labels" :key="l" :transform="`translate(${i * 110}, 0)`">
          <rect x="0" :y="60 - (total ? (counts[l] / total) * 55 : 0)" width="70" :height="total ? (counts[l] / total) * 55 : 0" fill="var(--accent)" fill-opacity="0.8" />
          <line x1="0" x2="70" :y1="60 - expected[l] * 55" :y2="60 - expected[l] * 55" stroke="var(--fg)" stroke-dasharray="3 2" />
          <text x="35" y="76" text-anchor="middle" fill="var(--muted)">{{ l }}</text>
        </g>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
