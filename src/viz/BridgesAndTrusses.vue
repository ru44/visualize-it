<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A shelf-bracket truss: a horizontal arm (tension) and a diagonal brace (compression) meeting a
// wall, carrying a load W at the tip. theta = atan(h/L); Fbrace = W/sin(theta) = W*sqrt(L^2+h^2)/h;
// Farm = W/tan(theta) = W*L/h (equivalent closed forms of the same right-triangle equilibrium).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W_ = 800
const H = 480
const SCALE = 180
const WALL_X = 110
const ARM_Y = 140

const W = computed(() => Math.max(1, props.params.W ?? 300))
const L = computed(() => Math.max(0.05, props.params.L ?? 0.6))
const h = computed(() => Math.max(0.02, props.params.h ?? 0.4))
const hyp = computed(() => Math.sqrt(L.value * L.value + h.value * h.value))
const Fbrace = computed(() => (W.value * hyp.value) / h.value)
const Farm = computed(() => (W.value * L.value) / h.value)
const theta = computed(() => (Math.atan2(h.value, L.value) * 180) / Math.PI)

const tipX = computed(() => WALL_X + L.value * SCALE)
const braceY = computed(() => ARM_Y + h.value * SCALE)
const armWidth = computed(() => Math.min(16, 3 + Farm.value / 250))
const braceWidth = computed(() => Math.min(16, 3 + Fbrace.value / 250))
const loadLen = computed(() => Math.min(110, 26 + W.value / 12))

const readouts = computed(() => [
  { label: t('trusses.theta'), value: fmt(theta.value, 0) + '°', color: 'var(--accent)' },
  { label: t('trusses.Fbrace'), value: fmt(Fbrace.value, 0) + ' N', color: 'var(--neg)' },
  { label: t('trusses.Farm'), value: fmt(Farm.value, 0) + ' N', color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W_} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('trusses.hint') }}</text>

      <!-- wall -->
      <rect :x="WALL_X - 14" :y="ARM_Y - 30" width="14" :height="braceY - ARM_Y + 60" fill="var(--line)" />

      <!-- brace (compression) -->
      <line :x1="WALL_X" :y1="braceY" :x2="tipX" :y2="ARM_Y" stroke="var(--neg)" :stroke-width="braceWidth" stroke-linecap="round" />
      <!-- arm (tension) -->
      <line :x1="WALL_X" :y1="ARM_Y" :x2="tipX" :y2="ARM_Y" stroke="var(--pos)" :stroke-width="armWidth" stroke-linecap="round" />

      <circle :cx="tipX" :cy="ARM_Y" r="7" fill="var(--fg)" />
      <circle :cx="WALL_X" :cy="braceY" r="6" fill="var(--muted)" />

      <!-- load arrow -->
      <line :x1="tipX" :y1="ARM_Y - loadLen - 10" :x2="tipX" :y2="ARM_Y - 12" stroke="var(--fg)" stroke-width="4" />
      <path :d="`M${tipX - 8},${ARM_Y - 12} L${tipX + 8},${ARM_Y - 12} L${tipX},${ARM_Y} Z`" fill="var(--fg)" />
      <text class="num" :x="tipX" :y="ARM_Y - loadLen - 18" text-anchor="middle" font-size="12" fill="var(--fg)">W {{ fmt(W, 0) }} N</text>

      <text class="num" :x="(WALL_X + tipX) / 2" :y="ARM_Y - 12" text-anchor="middle" font-size="11" fill="var(--pos)">{{ t('trusses.arm') }}</text>
      <text class="num" :x="(WALL_X + tipX) / 2 - 10" :y="(ARM_Y + braceY) / 2 - 8" text-anchor="middle" font-size="11" fill="var(--neg)">{{ t('trusses.brace') }}</text>

      <!-- why triangles are stiff: a small static inset -->
      <g transform="translate(600,300)">
        <text class="num" x="0" y="-14" font-size="11" fill="var(--muted)">{{ t('trusses.whyTitle') }}</text>
        <rect x="0" y="0" width="56" height="56" fill="none" stroke="var(--muted)" stroke-width="2" />
        <path d="M14,0 L70,0 L56,56 L0,56 Z" fill="none" stroke="var(--neg)" stroke-width="2" stroke-dasharray="4 3" />
        <text class="num" x="28" y="72" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('trusses.racks') }}</text>

        <path d="M100,56 L128,0 L156,56 Z" fill="none" stroke="var(--pos)" stroke-width="2" />
        <text class="num" x="128" y="72" text-anchor="middle" font-size="10" fill="var(--pos)">{{ t('trusses.rigid') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
