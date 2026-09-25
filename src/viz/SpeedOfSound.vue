<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/speed-of-sound. v depends on medium (bar chart, left) and on air
// temperature (v = 331 + 0.6T); the right side times how far a storm is, d = v*t.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const T = computed(() => props.params.T ?? 20)
const medium = computed(() => Math.round(props.params.medium ?? 0))
const tCount = computed(() => props.params.t ?? 3)

const airV = computed(() => 331 + 0.6 * T.value)
const BARS = computed(() => [
  { key: 0, label: t('speedsound.air'), v: airV.value },
  { key: 1, label: t('speedsound.water'), v: 1480 },
  { key: 2, label: t('speedsound.steel'), v: 5000 },
])
const v = computed(() => BARS.value[medium.value]!.v)
const MAXV = 5000
const BAR_X = [100, 280, 460]
const BAR_BASE = 260
const BAR_MAXH = 190

const d = computed(() => v.value * tCount.value)

function pickMedium(k: number) {
  emit('set', 'medium', k)
}

const readouts = computed(() => [
  { label: t('speedsound.speed'), value: fmt(v.value, 0) + ' m/s', color: 'var(--accent)' },
  { label: t('speedsound.distance'), value: fmt(d.value / 1000, 2) + ' km', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('speedsound.hint') }}</text>
      <line x1="60" :x2="560" :y1="BAR_BASE" :y2="BAR_BASE" stroke="var(--line)" />
      <g v-for="(b, i) in BARS" :key="b.key" style="cursor: pointer" @click="pickMedium(b.key)">
        <rect :x="BAR_X[i] - 40" :y="BAR_BASE - (b.v / MAXV) * BAR_MAXH" width="80" :height="(b.v / MAXV) * BAR_MAXH" :fill="medium === b.key ? 'var(--accent)' : 'var(--sunken)'" :stroke="medium === b.key ? 'var(--accent)' : 'var(--line)'" />
        <text class="num" :x="BAR_X[i]" :y="BAR_BASE + 22" text-anchor="middle" font-size="13" :fill="medium === b.key ? 'var(--accent)' : 'var(--muted)'">{{ b.label }}</text>
        <text class="num" :x="BAR_X[i]" :y="BAR_BASE - (b.v / MAXV) * BAR_MAXH - 10" text-anchor="middle" font-size="12" fill="var(--fg)">{{ fmt(b.v, 0) }}</text>
      </g>
      <text class="num" x="60" y="40" font-size="12" fill="var(--muted)">{{ t('speedsound.clickHint') }}</text>

      <line x1="600" x2="600" y1="40" y2="440" stroke="var(--line)" />
      <text class="num" x="620" y="60" font-size="24" fill="var(--neg)">⚡</text>
      <text class="num" x="620" y="90" font-size="12" fill="var(--muted)">{{ t('speedsound.flash') }}</text>
      <circle cx="630" cy="70" :r="Math.min(150, (d / 5000) * 150)" fill="none" stroke="var(--accent-2)" stroke-width="2" opacity="0.7" />
      <text class="num" x="615" y="240" font-size="12" fill="var(--fg)">{{ t('speedsound.count', { t: fmt(tCount, 1) }) }}</text>
      <text class="num" x="615" y="266" font-size="13" fill="var(--accent-2)">{{ t('speedsound.away', { d: fmt(d / 1000, 2) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
