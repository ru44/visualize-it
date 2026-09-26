<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The same two numbers, v1 = 80 and v2 = 80 + gap, drawn as two bar charts side by side: an
// honest one whose axis always starts at 0, and one whose axis starts at truncStart. The real
// percentage difference never changes; only how big the gap LOOKS changes with truncStart.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const V1 = 80
const gap = computed(() => Math.max(2, Math.min(20, Math.round(props.params.gap ?? 8))))
const v2 = computed(() => V1 + gap.value)
const truncStart = computed(() => Math.max(0, Math.min(78, Math.round(props.params.truncStart ?? 0))))
const pctDiff = computed(() => (gap.value / V1) * 100)

const TOP = 70
const BASE = 400
const PH = BASE - TOP
const honestMax = 110
const honestBarH = (v: number) => (v / honestMax) * PH
const truncMax = computed(() => v2.value + 8)
const truncBarH = (v: number) => ((v - truncStart.value) / (truncMax.value - truncStart.value)) * PH
const honestRatio = computed(() => v2.value / V1)
const truncRatio = computed(() => (v2.value - truncStart.value) / Math.max(0.1, V1 - truncStart.value))

const readouts = computed(() => [
  { label: t('hn.pctDiff'), value: `${pctDiff.value.toFixed(1)}%`, color: 'var(--accent)' },
  { label: t('hn.honestRatio'), value: `×${honestRatio.value.toFixed(2)}`, color: 'var(--pos)' },
  { label: t('hn.truncRatio'), value: `×${truncRatio.value.toFixed(2)}`, color: truncStart.value > 0 ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="130" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hn.honest') }}</text>
      <line x1="60" :y1="BASE" x2="280" :y2="BASE" stroke="var(--line)" />
      <line x1="60" :y1="TOP" x2="60" :y2="BASE" stroke="var(--line)" />
      <text class="num" x="54" :y="TOP + 4" text-anchor="end" font-size="11" fill="var(--muted)">{{ honestMax }}</text>
      <text class="num" x="54" :y="BASE + 4" text-anchor="end" font-size="11" fill="var(--muted)">0</text>
      <rect x="90" :y="BASE - honestBarH(V1)" width="60" :height="honestBarH(V1)" fill="var(--accent)" fill-opacity="0.75" />
      <text class="num" x="120" :y="BASE - honestBarH(V1) - 8" text-anchor="middle" font-size="12" fill="var(--fg)">{{ V1 }}</text>
      <rect x="190" :y="BASE - honestBarH(v2)" width="60" :height="honestBarH(v2)" fill="var(--accent-2)" fill-opacity="0.85" />
      <text class="num" x="220" :y="BASE - honestBarH(v2) - 8" text-anchor="middle" font-size="12" fill="var(--fg)">{{ v2 }}</text>
      <text class="num" x="120" :y="BASE + 22" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hn.lastYear') }}</text>
      <text class="num" x="220" :y="BASE + 22" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hn.thisYear') }}</text>

      <text class="num" x="580" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hn.truncated') }}</text>
      <line x1="510" :y1="BASE" x2="730" :y2="BASE" stroke="var(--line)" />
      <line x1="510" :y1="TOP" x2="510" :y2="BASE" stroke="var(--line)" />
      <text class="num" x="504" :y="TOP + 4" text-anchor="end" font-size="11" fill="var(--muted)">{{ truncMax }}</text>
      <text class="num" x="504" :y="BASE + 4" text-anchor="end" font-size="11" fill="var(--muted)">{{ truncStart }}</text>
      <rect x="540" :y="BASE - truncBarH(V1)" width="60" :height="truncBarH(V1)" fill="var(--accent)" fill-opacity="0.75" />
      <text class="num" x="570" :y="BASE - truncBarH(V1) - 8" text-anchor="middle" font-size="12" fill="var(--fg)">{{ V1 }}</text>
      <rect x="640" :y="BASE - truncBarH(v2)" width="60" :height="truncBarH(v2)" fill="var(--accent-2)" fill-opacity="0.85" />
      <text class="num" x="670" :y="BASE - truncBarH(v2) - 8" text-anchor="middle" font-size="12" fill="var(--fg)">{{ v2 }}</text>
      <text class="num" x="570" :y="BASE + 22" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hn.lastYear') }}</text>
      <text class="num" x="670" :y="BASE + 22" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hn.thisYear') }}</text>
      <text v-if="truncStart > 0" class="num" x="580" y="448" text-anchor="middle" font-size="11" fill="var(--neg)">{{ t('hn.axisWarning', { n: String(truncStart) }) }}</text>

      <text class="num" x="400" y="470" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('hn.sameNumbers') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
