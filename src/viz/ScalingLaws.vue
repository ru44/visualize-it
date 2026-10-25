<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// ai/scaling-laws. params n = log10(parameters), d = log10(training tokens). Loss follows the
// Chinchilla fit L = 1.69 + 406.4/N^0.34 + 410.7/D^0.28: an irreducible floor plus one term each
// for brain size and reading diet — and whichever term is bigger is the one worth spending on.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const E0 = 1.69
const n = computed(() => Math.min(Math.max(props.params.n ?? 9, 6), 12))
const d = computed(() => Math.min(Math.max(props.params.d ?? 10, 8), 13))
const termN = (nn: number) => 406.4 / Math.pow(10, nn * 0.34)
const termD = (dd: number) => 410.7 / Math.pow(10, dd * 0.28)
const L = computed(() => E0 + termN(n.value) + termD(d.value))
const flops = computed(() => Math.log10(6) + n.value + d.value)

function human(exp: number, unit: string) {
  const names: [number, string][] = [
    [12, 'T'],
    [9, 'B'],
    [6, 'M'],
  ]
  for (const [e, s] of names) if (exp >= e) return `${fmt(Math.pow(10, exp - e), exp - e >= 2 ? 0 : 1)}${s} ${unit}`
  return `10^${fmt(exp, 1)} ${unit}`
}
const balanced = computed(() => Math.abs(d.value - n.value - 1.3) <= 0.25)

// the inset: loss vs model size at the current data budget
const curve = computed(() => {
  const pts: string[] = []
  for (let nn = 6; nn <= 12; nn += 0.2) {
    const loss = E0 + termN(nn) + termD(d.value)
    pts.push(`${520 + ((nn - 6) / 6) * 220},${392 - ((Math.min(loss, 4.2) - 1.6) / 2.6) * 130}`)
  }
  return pts.join(' ')
})
const px = computed(() => 520 + ((n.value - 6) / 6) * 220)
const py = computed(() => 392 - ((Math.min(L.value, 4.2) - 1.6) / 2.6) * 130)

const brainR = computed(() => 24 + (n.value - 6) * 9)
const books = computed(() => Math.round(1 + (d.value - 8) * 1.6))

const readouts = computed(() => [
  { label: t('law.params'), value: human(n.value, t('law.paramsUnit')), color: 'var(--accent)' },
  { label: t('law.tokens'), value: human(d.value, t('law.tokensUnit')), color: 'var(--accent-2)' },
  { label: t('law.loss'), value: fmt(L.value, 3), color: L.value <= 2 ? 'var(--pos)' : undefined },
  { label: t('law.compute'), value: `10^${fmt(flops.value, 1)} FLOPs` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('law.hint') }}</text>

      <!-- the brain: model size -->
      <circle cx="150" cy="150" :r="brainR" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" stroke-width="2" />
      <text x="150" y="156" text-anchor="middle" font-size="16">🧠</text>
      <text x="150" :y="150 + brainR + 20" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('law.brain') }}</text>
      <text x="150" :y="150 + brainR + 36" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ human(n, t('law.paramsUnit')) }}</text>

      <!-- the diet: training tokens as a book stack -->
      <g v-for="b in books" :key="'b' + b">
        <rect x="255" :y="258 - b * 14" width="70" height="12" rx="2" fill="var(--accent-2)" :opacity="0.5 + 0.5 * (b / books)" />
      </g>
      <text x="290" y="282" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('law.diet') }}</text>
      <text x="290" y="298" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ human(d, t('law.tokensUnit')) }}</text>

      <!-- the loss thermometer: lower is smarter -->
      <rect x="392" y="80" width="26" height="240" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="392" :y="80 + 240 * (1 - Math.min((L - 1.69) / 2.3, 1))" width="26" :height="240 * Math.min((L - 1.69) / 2.3, 1)" rx="8" :fill="L <= 2 ? 'var(--pos)' : L <= 2.6 ? 'var(--accent-2)' : 'var(--neg)'" />
      <line x1="386" y1="320" x2="424" y2="320" stroke="var(--fg)" stroke-width="1.5" />
      <text x="405" y="338" text-anchor="middle" font-size="9" fill="var(--muted)">{{ t('law.floor') }}</text>
      <text x="405" y="66" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('law.lossLabel', { l: fmt(L, 2) }) }}</text>

      <!-- which term dominates -->
      <g font-size="10" class="num">
        <rect x="90" y="330" width="220" height="14" rx="4" fill="var(--sunken)" />
        <rect x="90" y="330" :width="Math.min(220, (termN(n) / 1.2) * 220)" height="14" rx="4" fill="var(--accent)" />
        <text x="90" y="358" fill="var(--muted)">{{ t('law.termN', { v: fmt(termN(n), 3) }) }}</text>
        <rect x="90" y="372" width="220" height="14" rx="4" fill="var(--sunken)" />
        <rect x="90" y="372" :width="Math.min(220, (termD(d) / 1.2) * 220)" height="14" rx="4" fill="var(--accent-2)" />
        <text x="90" y="400" fill="var(--muted)">{{ t('law.termD', { v: fmt(termD(d), 3) }) }}</text>
      </g>
      <text v-if="balanced" x="200" y="428" text-anchor="middle" font-size="10" fill="var(--pos)">{{ t('law.balanced') }}</text>

      <!-- inset: loss vs size at this diet -->
      <rect x="505" y="240" width="250" height="170" rx="8" fill="var(--panel)" stroke="var(--line)" />
      <text x="630" y="258" text-anchor="middle" font-size="9" fill="var(--muted)">{{ t('law.inset') }}</text>
      <polyline :points="curve" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle :cx="px" :cy="py" r="5" fill="var(--pos)" />
      <text x="630" y="404" text-anchor="middle" font-size="8" fill="var(--muted)">{{ t('law.insetX') }}</text>

      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('law.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
