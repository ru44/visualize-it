<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// options.mode 'place': a number 0..9999 as thousand-blocks, hundred-squares, ten-rods and ones (param N).
// options.mode 'scale': how big 10^e really is (param e): a 10,000-dot picture, time to count, a stack of paper.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const mode = computed(() => props.options.mode ?? 'place')
const sep = (n: number) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')

// ---- place value
const N = computed(() => Math.max(0, Math.min(9999, Math.round(props.params.N ?? 347))))
const d = computed(() => ({ th: Math.floor(N.value / 1000), h: Math.floor(N.value / 100) % 10, te: Math.floor(N.value / 10) % 10, o: N.value % 10 }))
const colors = { th: 'var(--neg)', h: 'var(--accent-2)', te: 'var(--accent)', o: 'var(--pos)' }

// ---- scale
const e = computed(() => Math.max(0, Math.min(12, Math.round(props.params.e ?? 6))))
const big = computed(() => 10 ** e.value)
const filled = computed(() => Math.min(10000, big.value))
function duration(s: number) {
  if (s < 60) return t('dots.sec', { n: sep(s) })
  if (s < 3600) return t('dots.min', { n: sep(s / 60) })
  if (s < 86400) return t('dots.hour', { n: sep(s / 3600) })
  if (s < 31557600) return t('dots.day', { n: sep(s / 86400) })
  return t('dots.year', { n: sep(s / 31557600) })
}
function height(m: number) {
  if (m < 0.01) return `${sep(m * 1000)} mm`
  if (m < 1) return `${sep(m * 100)} cm`
  if (m < 1000) return `${sep(m)} m`
  return `${sep(m / 1000)} km`
}
const landmark = computed(() => {
  const m = big.value * 1e-4
  return m >= 384400e3 ? t('dots.moon') : m >= 400e3 ? t('dots.iss') : m >= 8849 ? t('dots.everest') : m >= 100 ? t('dots.building') : m >= 1.5 ? t('dots.person') : ''
})
const names = ['one', 'ten', 'hundred', 'thousand', 'tenThousand', 'hundredThousand', 'million', 'tenMillion', 'hundredMillion', 'billion', 'tenBillion', 'hundredBillion', 'trillion']
const readouts = computed(() =>
  mode.value === 'place'
    ? [
        { label: t('dots.number'), value: sep(N.value), color: 'var(--fg)' },
        { label: t('dots.expanded'), value: `${d.value.th}×1000 + ${d.value.h}×100 + ${d.value.te}×10 + ${d.value.o}` },
      ]
    : [
        { label: '10^' + e.value, value: sep(big.value), color: 'var(--accent-2)' },
        { label: t('dots.name'), value: t(`dots.n.${names[e.value]}` as any) },
        { label: t('dots.counting'), value: duration(big.value) },
        { label: t('dots.stack'), value: height(big.value * 1e-4) + (landmark.value ? ` · ${landmark.value}` : ''), color: 'var(--accent)' },
      ],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <template v-if="mode === 'place'">
        <text class="num" x="400" y="52" text-anchor="middle" font-size="44" font-weight="600">
          <tspan :fill="colors.th">{{ N >= 1000 ? d.th : '' }}</tspan><tspan :fill="colors.h">{{ N >= 100 ? d.h : '' }}</tspan><tspan :fill="colors.te">{{ N >= 10 ? d.te : '' }}</tspan><tspan :fill="colors.o">{{ d.o }}</tspan>
        </text>
        <g v-for="(col, ci) in (['th', 'h', 'te', 'o'] as const)" :key="col" :transform="`translate(${20 + ci * 195}, 80)`">
          <text x="85" y="0" text-anchor="middle" font-size="13" :fill="colors[col]">{{ t(`dots.col.${col}` as any) }} · {{ d[col] }}</text>
          <template v-if="col === 'th'"><g v-for="k in d.th" :key="k" :transform="`translate(${((k - 1) % 3) * 58}, ${20 + Math.floor((k - 1) / 3) * 58})`"><rect x="6" y="-6" width="48" height="48" :fill="colors.th" fill-opacity="0.35" /><rect x="0" y="0" width="48" height="48" :fill="colors.th" fill-opacity="0.8" stroke="var(--panel)" /><path d="M0,16H48M0,32H48M16,0V48M32,0V48" stroke="var(--panel)" stroke-opacity="0.6" /></g></template>
          <template v-else-if="col === 'h'"><g v-for="k in d.h" :key="k" :transform="`translate(${((k - 1) % 3) * 56}, ${20 + Math.floor((k - 1) / 3) * 56})`"><rect width="50" height="50" :fill="colors.h" fill-opacity="0.85" /><path v-for="i in 9" :key="i" :d="`M0,${i * 5}H50M${i * 5},0V50`" stroke="var(--panel)" stroke-width="0.6" /></g></template>
          <template v-else-if="col === 'te'"><g v-for="k in d.te" :key="k" :transform="`translate(${(k - 1) * 17}, 20)`"><rect width="12" height="120" :fill="colors.te" fill-opacity="0.85" /><path v-for="i in 9" :key="i" :d="`M0,${i * 12}H12`" stroke="var(--panel)" /></g></template>
          <template v-else><rect v-for="k in d.o" :key="k" :x="((k - 1) % 3) * 22" :y="20 + Math.floor((k - 1) / 3) * 22" width="16" height="16" :fill="colors.o" /></template>
        </g>
      </template>
      <template v-else>
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('dots.hint') }}</text>
        <g transform="translate(40, 40)">
          <rect width="400" height="400" fill="var(--sunken)" />
          <rect v-for="k in Math.min(100, Math.ceil(filled / 100))" :key="k" :x="((k - 1) % 10) * 40" :y="Math.floor((k - 1) / 10) * 40" :width="k * 100 <= filled ? 40 : 40 * ((filled % 100) / 100) || 40" height="40" fill="var(--accent)" :fill-opacity="0.2 + 0.7 * Math.min(1, filled / 10000)" stroke="var(--panel)" stroke-width="1" />
          <path v-for="i in 9" :key="i" :d="`M0,${i * 40}H400M${i * 40},0V400`" stroke="var(--panel)" stroke-width="2" />
        </g>
        <g class="num">
          <text x="470" y="90" font-size="14" fill="var(--muted)">{{ t('dots.picture') }}</text>
          <text x="470" y="140" font-size="30" fill="var(--accent-2)">{{ sep(big) }}</text>
          <text v-if="big > 10000" x="470" y="185" font-size="16" fill="var(--fg)">= {{ t('dots.pictures', { n: sep(big / 10000) }) }}</text>
          <text x="470" y="250" font-size="14" fill="var(--muted)">{{ t('dots.counting') }}</text>
          <text x="470" y="276" font-size="18" fill="var(--fg)">{{ duration(big) }}</text>
          <text x="470" y="330" font-size="14" fill="var(--muted)">{{ t('dots.stack') }}</text>
          <text x="470" y="356" font-size="18" fill="var(--accent)">{{ height(big * 1e-4) }}</text>
          <text x="470" y="380" font-size="13" fill="var(--muted)">{{ landmark }}</text>
        </g>
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
