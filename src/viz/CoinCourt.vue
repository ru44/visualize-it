<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// statistics/hypothesis-testing. params obs (observed share of heads, %), n (flips). The courtroom
// question: could this share be pure luck from a fair coin? The bell is the luck zone, 0.5 ± spread
// 0.5/√n, and the verdict follows z = (h − 0.5)/(0.5/√n) against the 1.96 line.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const obs = computed(() => Math.min(Math.max(props.params.obs ?? 55, 50), 70))
const n = computed(() => Math.max(Math.round(props.params.n ?? 100), 2))
const se = computed(() => 0.5 / Math.sqrt(n.value)) // spread of a fair coin's share
const zVal = computed(() => (obs.value / 100 - 0.5) / se.value)
const guilty = computed(() => zVal.value >= 1.96)

const CH = { x: 90, y: 90, w: 620, h: 220 }
const vx = (share: number) => CH.x + ((Math.min(Math.max(share, 0.3), 0.7) - 0.3) / 0.4) * CH.w
const bell = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 120; i++) {
    const s = 0.3 + (i / 120) * 0.4
    const y = Math.exp(-0.5 * ((s - 0.5) / se.value) ** 2)
    out.push(`${vx(s)},${CH.y + CH.h - y * (CH.h - 16)}`)
  }
  return out.join(' ')
})
const luckEdge = computed(() => 0.5 + 1.96 * se.value)

const readouts = computed(() => [
  { label: t('hyp.obs'), value: `${fmt(obs.value, 1)}%`, color: 'var(--accent-2)' },
  { label: 'n', value: String(n.value) },
  { label: '0.5/√n', value: `${fmt(se.value * 100, 2)}%` },
  { label: 'z = (h−0.5)/(0.5/√n)', value: fmt(zVal.value, 2), color: guilty.value ? 'var(--neg)' : 'var(--accent)' },
  { label: t('hyp.verdictL'), value: guilty.value ? t('hyp.rigged') : t('hyp.luck'), color: guilty.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('hyp.hint') }}</text>
      <!-- the luck zone of a fair coin -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="vx(0.5 - 1.96 * se)" :y="CH.y" :width="vx(luckEdge) - vx(0.5 - 1.96 * se)" :height="CH.h" fill="var(--accent)" opacity="0.12" />
      <polyline :points="bell" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="vx(0.5)" :y1="CH.y" :x2="vx(0.5)" :y2="CH.y + CH.h" stroke="var(--line)" stroke-dasharray="3 3" />
      <line :x1="vx(luckEdge)" :y1="CH.y" :x2="vx(luckEdge)" :y2="CH.y + CH.h + 18" stroke="var(--neg)" stroke-dasharray="5 3" stroke-width="2" />
      <text :x="vx(luckEdge)" :y="CH.y + CH.h + 34" text-anchor="middle" font-size="10" fill="var(--neg)" class="num">{{ t('hyp.edge') }}</text>
      <text :x="vx(0.5)" :y="CH.y - 8" text-anchor="middle" font-size="11" fill="var(--muted)" class="num">{{ t('hyp.fair') }}</text>
      <!-- the observation on trial -->
      <line :x1="vx(obs / 100)" :y1="CH.y - 20" :x2="vx(obs / 100)" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-width="3" />
      <text :x="vx(obs / 100)" :y="CH.y - 28" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent-2)" class="num">{{ fmt(obs, 1) }}% · {{ n }} {{ t('hyp.flips') }}</text>
      <!-- the verdict -->
      <text x="400" y="368" text-anchor="middle" font-size="16" font-weight="700" :fill="guilty ? 'var(--neg)' : 'var(--pos)'">{{ guilty ? t('hyp.verdictBad') : t('hyp.verdictOk') }}</text>
      <text x="400" y="394" text-anchor="middle" font-size="11" fill="var(--muted)">{{ guilty ? t('hyp.badNote') : t('hyp.okNote') }}</text>
      <text x="400" y="424" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">z = {{ fmt(zVal, 2) }} {{ guilty ? '≥' : '<' }} 1.96</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hyp.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
