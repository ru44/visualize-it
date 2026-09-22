<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A tiny "orders" table and one SQL query over it. options.mode:
//  'filter'  WHERE amount >= min (param min)
//  'group'   GROUP BY city or product with SUM(amount) (param by: 0 city, 1 product)
//  'columns' how many columns are read: row storage reads all, column storage (BigQuery) only the chosen ones (param cols)
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const cities = ['riyadh', 'cairo', 'dubai', 'amman']
const products = ['tea', 'coffee', 'juice']
const rows: [number, number, number][] = [[0, 0, 12], [1, 1, 30], [2, 2, 8], [0, 1, 25], [3, 0, 15], [1, 0, 9], [2, 1, 40], [0, 2, 6], [3, 1, 22], [1, 2, 11], [2, 0, 18], [3, 2, 14]]
const mode = computed(() => props.options.mode ?? 'filter')
const min = computed(() => Math.round(props.params.min ?? 15))
const by = computed(() => (Math.round(props.params.by ?? 0) ? 1 : 0))
const cols = computed(() => Math.max(1, Math.min(3, Math.round(props.params.cols ?? 1))))
const colNames = ['amount', 'city', 'product']
const cell = (r: [number, number, number], c: number) => (c === 0 ? String(r[2]) : c === 1 ? t(`qt.${cities[r[0]]}` as any) : t(`qt.${products[r[1]]}` as any))
const match = (r: [number, number, number]) => r[2] >= min.value
const groups = computed(() => {
  const keys = by.value ? products : cities
  return keys.map((k, i) => ({ k, sum: rows.filter((r) => r[by.value ? 1 : 0] === i).reduce((s, r) => s + r[2], 0) }))
})
const palette = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)']
const sql = computed(() =>
  mode.value === 'filter' ? `SELECT * FROM orders WHERE amount >= ${min.value}` : mode.value === 'group' ? `SELECT ${by.value ? 'product' : 'city'}, SUM(amount) FROM orders GROUP BY ${by.value ? 'product' : 'city'}` : `SELECT ${colNames.slice(0, cols.value).join(', ')} FROM orders`,
)
const BILLION = 1e9
const readouts = computed(() =>
  mode.value === 'filter'
    ? [{ label: t('qt.scanned'), value: String(rows.length) }, { label: t('qt.returned'), value: String(rows.filter(match).length), color: 'var(--accent-2)' }]
    : mode.value === 'group'
      ? groups.value.map((g, i) => ({ label: t(`qt.${g.k}` as any), value: String(g.sum), color: palette[i] }))
      : [
          { label: t('qt.rowStore'), value: `${((3 * 8 * BILLION) / 1e9).toFixed(0)} GB`, color: 'var(--neg)' },
          { label: t('qt.colStore'), value: `${((cols.value * 8 * BILLION) / 1e9).toFixed(0)} GB`, color: 'var(--pos)' },
          { label: t('qt.saved'), value: `${Math.round((1 - cols.value / 3) * 100)} %` },
        ],
)
const colX = [300, 400, 520]
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <rect x="16" y="14" :width="W - 32" height="34" rx="8" fill="var(--sunken)" />
      <text class="num" x="30" y="36" font-size="14" fill="var(--accent)" direction="ltr">{{ sql }}</text>
      <g class="num" font-size="13">
        <text v-for="(c, ci) in colNames" :key="c" :x="colX[ci]" y="76" :fill="mode === 'columns' && ci < cols ? 'var(--pos)' : 'var(--muted)'" font-weight="600">{{ t(`qt.${c}` as any) }}</text>
        <template v-if="mode === 'columns'">
          <rect v-for="ci in cols" :key="'cc' + ci" :x="colX[ci - 1] - 10" y="60" width="100" :height="rows.length * 28 + 26" rx="8" fill="var(--pos)" fill-opacity="0.08" stroke="var(--pos)" stroke-opacity="0.5" />
        </template>
        <g v-for="(r, i) in rows" :key="i">
          <rect x="280" :y="86 + i * 28" width="330" height="24" rx="5" :fill="mode === 'filter' ? (match(r) ? 'var(--accent-2)' : 'var(--sunken)') : mode === 'group' ? palette[r[by ? 1 : 0]] : 'var(--sunken)'" :fill-opacity="mode === 'filter' ? (match(r) ? 0.25 : 0.6) : mode === 'group' ? 0.18 : 0.4" />
          <text v-for="ci in 3" :key="ci" :x="colX[ci - 1]" :y="103 + i * 28" :fill="mode === 'filter' && !match(r) ? 'var(--muted)' : 'var(--fg)'">{{ cell(r, ci - 1) }}</text>
        </g>
      </g>
      <g v-if="mode === 'group'" transform="translate(640, 90)" class="num">
        <g v-for="(g, i) in groups" :key="g.k"><rect x="0" :y="i * 70" :width="g.sum * 1.6" height="40" rx="6" :fill="palette[i]" fill-opacity="0.8" /><text x="0" :y="i * 70 - 6" font-size="12" fill="var(--fg)">{{ t(`qt.${g.k}` as any) }}</text><text :x="g.sum * 1.6 + 6" :y="i * 70 + 25" font-size="14" fill="var(--fg)">{{ g.sum }}</text></g>
      </g>
      <g v-if="mode === 'columns'" transform="translate(640, 110)" class="num" font-size="12">
        <text fill="var(--muted)">{{ t('qt.atBillion') }}</text>
        <rect y="16" width="130" height="30" fill="var(--neg)" fill-opacity="0.7" /><text y="64" fill="var(--fg)">{{ t('qt.rowStore') }}</text>
        <rect y="86" :width="130 * cols / 3" height="30" fill="var(--pos)" fill-opacity="0.8" /><text y="134" fill="var(--fg)">{{ t('qt.colStore') }}</text>
      </g>
      <g v-if="mode === 'filter'" transform="translate(40, 90)" class="num" font-size="13" fill="var(--muted)"><text>{{ t('qt.filterHint') }}</text></g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
