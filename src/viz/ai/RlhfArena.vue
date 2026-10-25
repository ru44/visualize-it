<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// ai/rlhf. params wh (reward weight on helpfulness), ws (on harmlessness/care), beta (the KL leash
// to the base model). Three canned answers to "my code crashes — what do I do?" carry fixed
// (helpful, careful, drift) profiles; the crowned one maximises wh·H + ws·S − β·K. The fabricated
// answer C *sounds* most helpful, so with the leash slack and care low, the reward points at it —
// reward hacking, live.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const wh = computed(() => Math.min(Math.max(props.params.wh ?? 5, 0), 10))
const ws = computed(() => Math.min(Math.max(props.params.ws ?? 5, 0), 10))
const beta = computed(() => Math.min(Math.max(props.params.beta ?? 2, 0), 10))

const CANDS = [
  { key: 'rlhf.candA', note: 'rlhf.noteA', h: 9, s: 4, k: 2 },
  { key: 'rlhf.candB', note: 'rlhf.noteB', h: 3, s: 9, k: 1 },
  { key: 'rlhf.candC', note: 'rlhf.noteC', h: 10, s: 2, k: 8 },
] as const
const scores = computed(() => CANDS.map((c) => wh.value * c.h + ws.value * c.s - beta.value * c.k))
const winner = computed(() => {
  let best = 0
  for (let i = 1; i < 3; i++) if (scores.value[i] > scores.value[best] + 1e-9) best = i
  return best
})
const maxScore = computed(() => Math.max(1, ...scores.value.map(Math.abs)))

const CX = [150, 400, 650]
const readouts = computed(() => [
  { label: t('rlhf.winner'), value: t(CANDS[winner.value].key), color: winner.value === 2 ? 'var(--neg)' : winner.value === 0 ? 'var(--pos)' : 'var(--accent-2)' },
  { label: 'R(A)', value: fmt(scores.value[0], 0), color: winner.value === 0 ? 'var(--pos)' : undefined },
  { label: 'R(B)', value: fmt(scores.value[1], 0), color: winner.value === 1 ? 'var(--pos)' : undefined },
  { label: 'R(C)', value: fmt(scores.value[2], 0), color: winner.value === 2 ? 'var(--neg)' : undefined },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('rlhf.hint') }}</text>
      <text x="400" y="52" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('rlhf.prompt') }}</text>

      <!-- the base model, holding the leashes -->
      <rect x="360" y="380" width="80" height="44" rx="8" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <text x="400" y="400" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('rlhf.base') }}</text>
      <text x="400" y="415" text-anchor="middle" font-size="11">⚓</text>

      <!-- three candidate answers -->
      <g v-for="(c, i) in CANDS" :key="i">
        <!-- the leash: longer = drifted further from the base model -->
        <path :d="`M ${CX[i]} 330 Q ${(CX[i] + 400) / 2} ${330 + 20 + c.k * 6} 400 384`" fill="none" :stroke="beta * c.k > 24 ? 'var(--neg)' : 'var(--line)'" :stroke-width="1 + beta * 0.25" stroke-dasharray="5 4" opacity="0.8" />

        <rect :x="CX[i] - 105" y="80" width="210" height="250" rx="12" :fill="winner === i ? 'var(--panel)' : 'var(--sunken)'" :stroke="winner === i ? (i === 2 ? 'var(--neg)' : 'var(--pos)') : 'var(--line)'" :stroke-width="winner === i ? 2.5 : 1" />
        <text v-if="winner === i" :x="CX[i]" y="72" text-anchor="middle" font-size="16">👑</text>
        <text :x="CX[i]" y="104" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t(c.key) }}</text>
        <text :x="CX[i]" y="124" text-anchor="middle" font-size="9" fill="var(--muted)">{{ t(c.note) }}</text>

        <!-- score anatomy: help + care − leash -->
        <g font-size="9" class="num">
          <text :x="CX[i] - 92" y="156" fill="var(--muted)">{{ t('rlhf.help') }} {{ c.h }}</text>
          <rect :x="CX[i] - 92" y="162" :width="wh * c.h * 1.7" height="10" rx="3" fill="var(--accent)" />
          <text :x="CX[i] - 92" y="194" fill="var(--muted)">{{ t('rlhf.care') }} {{ c.s }}</text>
          <rect :x="CX[i] - 92" y="200" :width="ws * c.s * 1.7" height="10" rx="3" fill="var(--accent-2)" />
          <text :x="CX[i] - 92" y="232" fill="var(--muted)">{{ t('rlhf.drift') }} {{ c.k }}</text>
          <rect :x="CX[i] - 92" y="238" :width="beta * c.k * 1.7" height="10" rx="3" fill="var(--neg)" />
        </g>
        <!-- net score -->
        <rect :x="CX[i] - 92" y="272" width="184" height="18" rx="5" fill="var(--sunken)" stroke="var(--line)" />
        <rect v-if="scores[i] > 0" :x="CX[i] - 92" y="272" :width="184 * (scores[i] / maxScore)" height="18" rx="5" :fill="i === 2 ? 'var(--neg)' : 'var(--pos)'" opacity="0.85" />
        <text :x="CX[i]" y="285" text-anchor="middle" font-size="10" fill="var(--fg)" class="num">R = {{ fmt(scores[i], 0) }}</text>
        <text :x="CX[i]" y="316" text-anchor="middle" font-size="9" fill="var(--muted)" class="num">{{ wh }}·{{ c.h }} + {{ ws }}·{{ c.s }} − {{ beta }}·{{ c.k }}</text>
      </g>

      <text x="400" y="452" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rlhf.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
