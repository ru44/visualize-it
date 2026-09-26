<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One shared pair, two far-apart boxes. Alice's own results are always a 50/50 coin (no signal ever
// reaches her from Bob's dial); only comparing the two lists afterward shows the cos²((a-b)/2) match
// rate. params a, b (detector angles, degrees), shots (pairs per "run many" click).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const a = computed(() => props.params.a ?? 0)
const b = computed(() => props.params.b ?? 90)
const shots = computed(() => Math.max(1, Math.round(props.params.shots ?? 100)))
const pMatch = computed(() => Math.cos(((a.value - b.value) * Math.PI) / 360) ** 2)

const pairs = ref<{ ra: number; rb: number }[]>([])
watch([a, b], () => (pairs.value = []))
function drawOne(): { ra: number; rb: number } {
  const ra = Math.random() < 0.5 ? 0 : 1
  const rb = Math.random() < pMatch.value ? ra : 1 - ra
  return { ra, rb }
}
function measure(n: number) {
  const list = pairs.value.slice()
  for (let i = 0; i < n; i++) list.push(drawOne())
  pairs.value = list.slice(-2000)
}

const total = computed(() => pairs.value.length)
const matches = computed(() => pairs.value.filter((p) => p.ra === p.rb).length)
const aliceOnes = computed(() => pairs.value.filter((p) => p.ra === 1).length)
const last = computed(() => pairs.value.at(-1))

const AX = 160
const BX = 640
const CY = 160
const R = 90
const CHART_W = 260
const CHART_H = 100
const rad = (deg: number) => (deg * Math.PI) / 180
const classicalP = (deg: number) => 1 - deg / 180
const quantumPoints = computed(() => Array.from({ length: 37 }, (_, i) => { const d = i * 5; return `${(d / 180) * CHART_W},${CHART_H - Math.cos(rad(d / 2)) ** 2 * CHART_H}` }).join(' '))
const classicalPoints = computed(() => Array.from({ length: 37 }, (_, i) => { const d = i * 5; return `${(d / 180) * CHART_W},${CHART_H - classicalP(d) * CHART_H}` }).join(' '))
const markerPos = computed(() => ({ x: (Math.abs(a.value - b.value) / 180) * CHART_W, y: CHART_H - pMatch.value * CHART_H }))

const readouts = computed(() => [
  { label: t('ent.predicted'), value: fmt(pMatch.value * 100, 1) + ' %', color: 'var(--accent)' },
  { label: t('ent.observed'), value: total.value ? fmt((matches.value / total.value) * 100, 1) + ' %' : '—' },
  { label: t('ent.pairs'), value: String(total.value) },
  { label: t('ent.aliceAlone'), value: total.value ? fmt((aliceOnes.value / total.value) * 100, 1) + ' % : ' + fmt(100 - (aliceOnes.value / total.value) * 100, 1) + ' %' : '—' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ent.hint') }}</text>

      <!-- source, emitting one shared pair -->
      <line :x1="AX + 30" :y1="CY" :x2="400 - 14" :y2="CY" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 4" />
      <line :x1="400 + 14" :y1="CY" :x2="BX - 30" :y2="CY" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 4" />
      <circle cx="400" :cy="CY" r="14" fill="var(--fg)" />
      <text class="num" x="400" :y="CY - 24" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('ent.source') }}</text>

      <!-- Alice's box -->
      <circle :cx="AX" :cy="CY" :r="R" fill="none" stroke="var(--line)" stroke-width="2" />
      <line :x1="AX" :y1="CY" :x2="AX + R * Math.sin(rad(a))" :y2="CY - R * Math.cos(rad(a))" stroke="var(--accent)" stroke-width="3" />
      <text class="num" :x="AX" :y="CY - R - 14" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('ent.alice') }} · a = {{ fmt(a, 0) }}°</text>
      <circle :cx="AX" :cy="CY + R + 30" r="22" :fill="last ? (last.ra === 0 ? 'var(--accent)' : 'var(--accent-2)') : 'var(--sunken)'" :stroke="last ? 'none' : 'var(--line)'" />
      <text class="num" :x="AX" :y="CY + R + 38" text-anchor="middle" font-size="20" :fill="last ? 'var(--bg)' : 'var(--muted)'">{{ last ? (last.ra === 0 ? 'H' : 'T') : '?' }}</text>

      <!-- Bob's box -->
      <circle :cx="BX" :cy="CY" :r="R" fill="none" stroke="var(--line)" stroke-width="2" />
      <line :x1="BX" :y1="CY" :x2="BX + R * Math.sin(rad(b))" :y2="CY - R * Math.cos(rad(b))" stroke="var(--accent-2)" stroke-width="3" />
      <text class="num" :x="BX" :y="CY - R - 14" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('ent.bob') }} · b = {{ fmt(b, 0) }}°</text>
      <circle :cx="BX" :cy="CY + R + 30" r="22" :fill="last ? (last.rb === 0 ? 'var(--accent)' : 'var(--accent-2)') : 'var(--sunken)'" :stroke="last ? 'none' : 'var(--line)'" />
      <text class="num" :x="BX" :y="CY + R + 38" text-anchor="middle" font-size="20" :fill="last ? 'var(--bg)' : 'var(--muted)'">{{ last ? (last.rb === 0 ? 'H' : 'T') : '?' }}</text>

      <!-- buttons -->
      <g class="cursor-pointer" transform="translate(300, 300)" @click="measure(1)"><rect width="200" height="34" rx="8" fill="var(--fg)" /><text class="num" x="100" y="22" text-anchor="middle" font-size="13" fill="var(--bg)">{{ t('ent.measureOne') }}</text></g>
      <g class="cursor-pointer" transform="translate(300, 342)" @click="measure(shots)"><rect width="200" height="34" rx="8" fill="var(--panel)" stroke="var(--line)" /><text class="num" x="100" y="22" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('ent.measureMany', { n: shots }) }}</text></g>

      <!-- match / mismatch histogram -->
      <g transform="translate(60, 390)" class="num" font-size="11">
        <text fill="var(--muted)">{{ t('ent.match') }} / {{ t('ent.mismatch') }}</text>
        <rect x="0" :y="80 - (total ? (matches / total) * 70 : 0)" width="50" :height="total ? (matches / total) * 70 : 0" fill="var(--accent)" />
        <rect x="70" :y="80 - (total ? ((total - matches) / total) * 70 : 0)" width="50" :height="total ? ((total - matches) / total) * 70 : 0" fill="var(--accent-2)" />
        <line x1="0" x2="50" :y1="80 - pMatch * 70" :y2="80 - pMatch * 70" stroke="var(--fg)" stroke-dasharray="3 2" />
        <line x1="70" x2="120" :y1="80 - (1 - pMatch) * 70" :y2="80 - (1 - pMatch) * 70" stroke="var(--fg)" stroke-dasharray="3 2" />
      </g>

      <!-- Bell curve: quantum cos² vs a classical straight-line guess -->
      <g transform="translate(480, 340)">
        <text class="num" x="0" y="-10" font-size="11" fill="var(--muted)">p(match) vs |a − b|</text>
        <line x1="0" y1="100" x2="260" y2="100" stroke="var(--line)" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="var(--line)" />
        <polyline :points="quantumPoints" fill="none" stroke="var(--accent)" stroke-width="2" />
        <polyline :points="classicalPoints" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3" />
        <circle :cx="markerPos.x" :cy="markerPos.y" r="4" fill="var(--accent)" />
        <text class="num" x="0" y="118" font-size="10" fill="var(--accent)">{{ t('ent.quantum') }}</text>
        <text class="num" x="0" y="132" font-size="10" fill="var(--muted)">{{ t('ent.classicalGuess') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
