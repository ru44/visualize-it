<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// ai/ai-agents. params t (run the episode, %), steps (loop budget), tools (can it actually act?).
// The task needs exactly 4 trips around the harness loop: look up the forecast, read it, draft the
// message, send it. Each trip appends the tool's result to the context, which is the only memory
// the model has. No tools → it can only produce a confident guess; too small a budget → it dies
// mid-errand with the checklist half done.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const NEED = 4
const tt = computed(() => Math.min(Math.max(props.params.t ?? 0, 0), 100))
const budget = computed(() => Math.min(Math.max(Math.round(props.params.steps ?? 6), 1), 8))
const tools = computed(() => Math.round(props.params.tools ?? 1) >= 1)

const planned = computed(() => (tools.value ? Math.min(budget.value, NEED) : 0))
const loopsDone = computed(() => Math.floor((tt.value / 100) * planned.value + 1e-9))
const running = computed(() => tools.value && loopsDone.value < planned.value && tt.value > 0)
const outOfBudget = computed(() => tools.value && budget.value < NEED && tt.value >= 95)
const done = computed(() => tools.value && loopsDone.value >= NEED)
const guessed = computed(() => !tools.value && tt.value >= 50)

const STEPS = ['agent.s1', 'agent.s2', 'agent.s3', 'agent.s4'] as const
const CTX = ['agent.c1', 'agent.c2', 'agent.c3', 'agent.c4'] as const

// loop geometry
const LC = { x: 230, y: 210 }
const R = 95
const angle = computed(() => (tt.value / 100) * planned.value * 2 * Math.PI - Math.PI / 2)
const dotX = computed(() => LC.x + R * Math.cos(angle.value))
const dotY = computed(() => LC.y + R * Math.sin(angle.value))

const readouts = computed(() => [
  { label: t('agent.loops'), value: `${fmt(loopsDone.value, 0)} / ${NEED}`, color: done.value ? 'var(--pos)' : undefined },
  { label: t('agent.budget'), value: fmt(budget.value, 0), color: budget.value < NEED ? 'var(--neg)' : undefined },
  { label: t('agent.toolbox'), value: tools.value ? t('agent.toolsOn') : t('agent.toolsOff'), color: tools.value ? 'var(--pos)' : 'var(--neg)' },
  {
    label: t('agent.state'),
    value: done.value ? t('agent.done') : outOfBudget.value ? t('agent.died') : guessed.value ? t('agent.guess') : running.value ? t('agent.running') : t('agent.idle'),
    color: done.value ? 'var(--pos)' : outOfBudget.value || guessed.value ? 'var(--neg)' : undefined,
  },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('agent.hint') }}</text>
      <text x="400" y="48" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('agent.task') }}</text>

      <!-- the harness loop -->
      <circle :cx="LC.x" :cy="LC.y" :r="R" fill="none" stroke="var(--line)" stroke-width="2" />
      <template v-if="tools">
        <path v-if="tt > 0" :d="`M ${LC.x} ${LC.y - R} A ${R} ${R} 0 ${(angle + Math.PI / 2) % (2 * Math.PI) > Math.PI ? 1 : 0} 1 ${dotX} ${dotY}`" fill="none" stroke="var(--accent)" stroke-width="3.5" />
        <circle v-if="running" :cx="dotX" :cy="dotY" r="7" fill="var(--accent)" />
      </template>
      <!-- stations on the loop -->
      <g font-size="10" text-anchor="middle">
        <circle :cx="LC.x" :cy="LC.y - R" r="22" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
        <text :x="LC.x" :y="LC.y - R + 4" font-size="13">🧠</text>
        <text :x="LC.x" :y="LC.y - R - 30" fill="var(--fg)">{{ t('agent.model') }}</text>
        <circle :cx="LC.x + R" :cy="LC.y" r="22" fill="var(--panel)" :stroke="tools ? 'var(--pos)' : 'var(--neg)'" stroke-width="2" />
        <text :x="LC.x + R" :y="LC.y + 4" font-size="13">{{ tools ? '🔧' : '🚫' }}</text>
        <text :x="LC.x + R + 36" :y="LC.y + 4" fill="var(--fg)">{{ t('agent.tool') }}</text>
        <circle :cx="LC.x" :cy="LC.y + R" r="22" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" />
        <text :x="LC.x" :y="LC.y + R + 4" font-size="13">📄</text>
        <text :x="LC.x" :y="LC.y + R + 38" fill="var(--fg)">{{ t('agent.result') }}</text>
        <circle :cx="LC.x - R" :cy="LC.y" r="22" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
        <text :x="LC.x - R" :y="LC.y + 4" font-size="13">🗒</text>
        <text :x="LC.x - R - 42" :y="LC.y + 4" fill="var(--fg)">{{ t('agent.ctx') }}</text>
      </g>
      <text :x="LC.x" :y="LC.y + 4" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ t('agent.lap') }} {{ fmt(Math.min(loopsDone + (running ? 1 : 0), planned), 0) }}</text>

      <!-- the checklist -->
      <g font-size="11">
        <text x="490" y="100" fill="var(--fg)">{{ t('agent.checklist') }}</text>
        <g v-for="(s, i) in STEPS" :key="i">
          <circle :cx="498" :cy="120 + i * 30" r="8" :fill="loopsDone > i ? 'var(--pos)' : 'var(--sunken)'" :stroke="loopsDone > i ? 'none' : 'var(--line)'" />
          <text v-if="loopsDone > i" :x="498" :y="124 + i * 30" text-anchor="middle" font-size="9" fill="#fff">✓</text>
          <text :x="516" :y="124 + i * 30" :fill="loopsDone > i ? 'var(--fg)' : 'var(--muted)'">{{ t(s) }}</text>
        </g>
      </g>

      <!-- the context window filling up: the agent's only memory -->
      <text x="490" y="268" font-size="11" fill="var(--fg)">{{ t('agent.ctxBar') }}</text>
      <rect x="490" y="278" width="240" height="18" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="i in loopsDone" :key="'cx' + i">
        <rect :x="490 + (i - 1) * 60" y="278" width="59" height="18" :fill="i % 2 ? 'var(--accent)' : 'var(--accent-2)'" opacity="0.8" />
      </g>
      <text v-for="i in loopsDone" :key="'ct' + i" :x="490 + (i - 1) * 60 + 29" y="291" text-anchor="middle" font-size="7" fill="#fff">{{ t(CTX[i - 1]) }}</text>

      <!-- the verdict -->
      <rect x="490" y="320" width="250" height="84" rx="10" fill="var(--panel)" :stroke="done ? 'var(--pos)' : outOfBudget || guessed ? 'var(--neg)' : 'var(--line)'" stroke-width="2" />
      <text x="615" y="348" text-anchor="middle" font-size="11" :fill="done ? 'var(--pos)' : outOfBudget || guessed ? 'var(--neg)' : 'var(--muted)'">
        {{ done ? t('agent.doneMsg') : outOfBudget ? t('agent.diedMsg') : guessed ? t('agent.guessMsg') : t('agent.waiting') }}
      </text>
      <text x="615" y="372" text-anchor="middle" font-size="9" fill="var(--muted)">{{ done ? t('agent.doneSub') : outOfBudget ? t('agent.diedSub') : guessed ? t('agent.guessSub') : '' }}</text>

      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('agent.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
