<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A log-scale ruler of everyday radiation doses, in millisieverts, from a banana (0.1 µSv) up past a
// chest CT (7 mSv) to the 100 mSv level where epidemiological studies can first detect extra cancer
// risk above the statistical noise. params: source (0 banana, 1 dental X-ray, 2 flight, 3 chest CT,
// 4 a year of background), time (how many times you repeat that one exposure).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const SOURCE_KEYS = ['dose.banana', 'dose.dental', 'dose.flight', 'dose.ct', 'dose.background'] as const
const DOSE_MSV = [0.0001, 0.005, 0.04, 7, 2.4] // banana, dental X-ray, flight, chest CT, one year background
const THRESHOLD = 100 // mSv — where excess cancer risk first becomes statistically measurable
const BG_YEAR = 2.4 // mSv, average global background dose per year

const source = computed(() => Math.max(0, Math.min(4, Math.round(props.params.source ?? 0))))
const repeats = computed(() => Math.max(1, Math.min(100, Math.round(props.params.time ?? 1))))
const perEvent = computed(() => DOSE_MSV[source.value])
const total = computed(() => perEvent.value * repeats.value)

const PAD = { l: 168, r: 40 }
const W = 800
const LOG_MIN = -4
const LOG_MAX = 3
const x = (mSv: number) => PAD.l + ((Math.log10(Math.max(mSv, 10 ** LOG_MIN)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (W - PAD.l - PAD.r)

const ROW_Y = [92, 168, 244, 320, 396]
const BAR_H = 26

function fmtDose(mSv: number) {
  if (mSv < 0.001) return `${(mSv * 1000).toFixed(2)} µSv`
  if (mSv < 1) return `${(mSv * 1000).toFixed(0)} µSv`
  return `${mSv < 10 ? mSv.toFixed(2) : mSv.toFixed(1)} mSv`
}

const readouts = computed(() => [
  { label: t('dose.source'), value: t(SOURCE_KEYS[source.value]) },
  { label: t('dose.perEvent'), value: fmtDose(perEvent.value) },
  { label: t('dose.repeatsLabel'), value: String(repeats.value) },
  { label: t('dose.total'), value: fmtDose(total.value), color: total.value >= THRESHOLD ? 'var(--neg)' : 'var(--accent)' },
  { label: t('dose.years'), value: (total.value / BG_YEAR).toFixed(2) },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} 480`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('dose.hint') }}</text>
      <line :x1="x(THRESHOLD)" :x2="x(THRESHOLD)" y1="50" y2="430" stroke="var(--neg)" stroke-dasharray="5 4" />
      <text :x="x(THRESHOLD)" y="444" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('dose.threshold') }}</text>
      <g v-for="(key, i) in SOURCE_KEYS" :key="key">
        <text :x="PAD.l - 12" :y="ROW_Y[i] + BAR_H / 2 + 4" text-anchor="end" font-size="12" fill="var(--fg)">{{ t(key) }}</text>
        <rect :x="PAD.l" :y="ROW_Y[i]" :width="Math.max(2, x(DOSE_MSV[i]) - PAD.l)" :height="BAR_H" fill="var(--muted)" fill-opacity="0.5" />
        <template v-if="i === source">
          <rect :x="PAD.l" :y="ROW_Y[i]" :width="Math.max(2, x(total) - PAD.l)" :height="BAR_H" fill="var(--accent)" fill-opacity="0.65" />
          <text :x="x(total) + 6" :y="ROW_Y[i] + BAR_H / 2 + 4" font-size="11" fill="var(--accent)">{{ fmtDose(total) }}</text>
        </template>
        <text v-else :x="x(DOSE_MSV[i]) + 6" :y="ROW_Y[i] + BAR_H / 2 + 4" font-size="10" fill="var(--muted)">{{ fmtDose(DOSE_MSV[i]) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
