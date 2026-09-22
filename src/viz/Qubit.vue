<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A qubit (or Schrödinger's cat) in a superposition cos(θ/2)|0⟩ + sin(θ/2)|1⟩. Looking forces one answer, at random,
// with probabilities cos²(θ/2) and sin²(θ/2). params theta (0..180°), shots (measurements per press).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const th = computed(() => ((props.params.theta ?? 90) * Math.PI) / 180)
const p0 = computed(() => Math.cos(th.value / 2) ** 2)
const shots = computed(() => Math.max(1, Math.round(props.params.shots ?? 100)))
const counts = ref<[number, number]>([0, 0])
const lastResult = ref<number | null>(null)
watch(th, () => ((counts.value = [0, 0]), (lastResult.value = null)))
function measure(nShots: number) {
  const c: [number, number] = [...counts.value]
  let r = 0
  for (let i = 0; i < nShots; i++) { r = Math.random() < p0.value ? 0 : 1; c[r]++ }
  counts.value = c
  lastResult.value = r
}
const total = computed(() => counts.value[0] + counts.value[1])
const C = { x: 200, y: 250 }
const R = 150
const readouts = computed(() => [
  { label: 'P(|0⟩) = cos²(θ/2)', value: fmt(p0.value * 100, 1) + ' %', color: 'var(--accent)' },
  { label: 'P(|1⟩) = sin²(θ/2)', value: fmt((1 - p0.value) * 100, 1) + ' %', color: 'var(--accent-2)' },
  { label: t('qubit.measured'), value: total.value ? `${counts.value[0]} : ${counts.value[1]}` : '—' },
  { label: t('qubit.observed'), value: total.value ? fmt((counts.value[0] / total.value) * 100, 1) + ' %' : '—' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('qubit.hint') }}</text>
      <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="var(--line)" stroke-width="2" />
      <text :x="C.x" :y="C.y - R - 14" text-anchor="middle" font-size="30">😺</text><text class="num" :x="C.x + 26" :y="C.y - R - 20" font-size="14" fill="var(--accent)">|0⟩</text>
      <text :x="C.x" :y="C.y + R + 38" text-anchor="middle" font-size="30">😴</text><text class="num" :x="C.x + 26" :y="C.y + R + 30" font-size="14" fill="var(--accent-2)">|1⟩</text>
      <line :x1="C.x" :y1="C.y" :x2="C.x + R * Math.sin(th)" :y2="C.y - R * Math.cos(th)" stroke="var(--fg)" stroke-width="3" />
      <circle :cx="C.x + R * Math.sin(th)" :cy="C.y - R * Math.cos(th)" r="8" fill="var(--fg)" />
      <text class="num" :x="C.x + 20" :y="C.y + 6" font-size="12" fill="var(--muted)">θ = {{ fmt((th * 180) / Math.PI, 0) }}°</text>
      <!-- the box: last measurement -->
      <g transform="translate(430, 60)">
        <rect width="150" height="120" rx="12" fill="var(--sunken)" stroke="var(--line)" />
        <text x="75" y="80" text-anchor="middle" font-size="56">{{ lastResult === null ? '📦' : lastResult === 0 ? '😺' : '😴' }}</text>
        <g class="cursor-pointer" @click="measure(1)"><rect y="136" width="150" height="34" rx="8" fill="var(--fg)" /><text class="num" x="75" y="158" text-anchor="middle" font-size="13" fill="var(--bg)">{{ t('qubit.look') }}</text></g>
        <g class="cursor-pointer" @click="measure(shots)"><rect y="178" width="150" height="34" rx="8" fill="var(--panel)" stroke="var(--line)" /><text class="num" x="75" y="200" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('qubit.many', { n: shots }) }}</text></g>
      </g>
      <!-- histogram -->
      <g transform="translate(620, 60)" class="num" font-size="12">
        <text fill="var(--muted)">{{ t('qubit.results') }}</text>
        <rect x="0" :y="330 - (total ? (counts[0] / total) * 280 : 0)" width="60" :height="total ? (counts[0] / total) * 280 : 0" fill="var(--accent)" />
        <rect x="80" :y="330 - (total ? (counts[1] / total) * 280 : 0)" width="60" :height="total ? (counts[1] / total) * 280 : 0" fill="var(--accent-2)" />
        <line x1="0" x2="60" :y1="330 - p0 * 280" :y2="330 - p0 * 280" stroke="var(--fg)" stroke-dasharray="4 3" />
        <line x1="80" x2="140" :y1="330 - (1 - p0) * 280" :y2="330 - (1 - p0) * 280" stroke="var(--fg)" stroke-dasharray="4 3" />
        <text x="30" y="350" text-anchor="middle">|0⟩</text><text x="110" y="350" text-anchor="middle">|1⟩</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
