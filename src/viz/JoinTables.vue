<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two small tables sharing a key (customer id). mode: 0 inner join, 1 left join.
// orphan: 0 removes the unmatched customer entirely, 1 keeps them with no orders,
// so the learner can see inner and left join agree when everyone matches and
// disagree the moment one row has no partner.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const NAMES = ['sara', 'omar', 'lina', 'yousef'] as const
const ALL_CUSTOMERS = [1, 2, 3, 4].map((id) => ({ id, name: NAMES[id - 1] }))
const ORDERS = [
  { oid: 101, cust: 1, amount: 40 },
  { oid: 102, cust: 2, amount: 15 },
  { oid: 103, cust: 1, amount: 22 },
  { oid: 104, cust: 3, amount: 8 },
]
const mode = computed(() => (Math.round(props.params.mode ?? 0) ? 'left' : 'inner'))
const orphan = computed(() => Math.round(props.params.orphan ?? 1) === 1)
const customers = computed(() => (orphan.value ? ALL_CUSTOMERS : ALL_CUSTOMERS.slice(0, 3)))
const unmatched = computed(() => customers.value.filter((c) => !ORDERS.some((o) => o.cust === c.id)))
const matchedRows = computed(() => ORDERS.filter((o) => customers.value.some((c) => c.id === o.cust)).map((o) => ({ ...o, name: customers.value.find((c) => c.id === o.cust)!.name })))
const resultRows = computed(() => (mode.value === 'inner' ? matchedRows.value : [...matchedRows.value, ...unmatched.value.map((c) => ({ oid: null as number | null, cust: c.id, amount: null as number | null, name: c.name }))]))
const sql = computed(() => `SELECT * FROM customers ${mode.value.toUpperCase()} JOIN orders ON customers.id = orders.customer_id`)
const custY = (i: number) => 90 + i * 46
const ordY = (i: number) => 90 + i * 46
const resY = (i: number) => 322 + i * 30
const lineFor = (c: { id: number }) => ORDERS.map((o, oi) => ({ o, oi })).filter(({ o }) => o.cust === c.id)
const readouts = computed(() => [
  { label: t('jt.rowsReturned'), value: String(resultRows.value.length), color: 'var(--accent-2)' },
  { label: t('jt.noOrders'), value: String(unmatched.value.length) },
  { label: t('jt.orphanState'), value: unmatched.value.length === 0 ? t('jt.none') : mode.value === 'left' ? t('jt.kept') : t('jt.dropped'), color: unmatched.value.length === 0 ? undefined : mode.value === 'left' ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <rect x="16" y="14" :width="W - 32" height="30" rx="8" fill="var(--sunken)" />
      <text class="num" x="30" y="34" font-size="13" fill="var(--accent)" direction="ltr">{{ sql }}</text>

      <text class="num" x="60" y="70" font-size="13" font-weight="600" fill="var(--fg)">{{ t('jt.customers') }}</text>
      <g v-for="(c, i) in customers" :key="'c' + c.id">
        <rect x="40" :y="custY(i)" width="160" height="34" rx="7" :fill="unmatched.some((u) => u.id === c.id) ? 'var(--sunken)' : 'var(--accent)'" :fill-opacity="unmatched.some((u) => u.id === c.id) ? 0.6 : 0.18" stroke="var(--line)" />
        <text class="num" x="52" :y="custY(i) + 22" font-size="13" fill="var(--fg)">#{{ c.id }} · {{ t(`jt.${c.name}` as any) }}</text>
      </g>

      <text class="num" x="460" y="70" font-size="13" font-weight="600" fill="var(--fg)">{{ t('jt.orders') }}</text>
      <g v-for="(o, i) in ORDERS" :key="'o' + o.oid">
        <rect x="440" :y="ordY(i)" width="200" height="34" rx="7" fill="var(--sunken)" stroke="var(--line)" />
        <text class="num" x="452" :y="ordY(i) + 22" font-size="13" fill="var(--fg)">#{{ o.oid }} · cust {{ o.cust }} · ${{ o.amount }}</text>
      </g>

      <g v-for="c in customers" :key="'lines' + c.id">
        <line v-for="({ o, oi }) in lineFor(c)" :key="'l' + c.id + o.oid" :x1="200" :y1="custY(customers.findIndex((x) => x.id === c.id)) + 17" :x2="440" :y2="ordY(oi) + 17" stroke="var(--accent-2)" stroke-width="2" opacity="0.7" />
      </g>
      <g v-for="u in unmatched" :key="'nomatch' + u.id">
        <line :x1="200" :y1="custY(customers.findIndex((x) => x.id === u.id)) + 17" :x2="260" :y2="custY(customers.findIndex((x) => x.id === u.id)) + 17" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 4" />
        <text class="num" x="266" :y="custY(customers.findIndex((x) => x.id === u.id)) + 22" font-size="11" fill="var(--muted)">{{ t('jt.noMatch') }}</text>
      </g>

      <text class="num" x="40" y="272" font-size="13" font-weight="600" fill="var(--fg)">{{ t('jt.result') }} ({{ mode === 'inner' ? t('jt.innerJoin') : t('jt.leftJoin') }})</text>
      <g font-size="12" class="num">
        <text x="40" y="292" fill="var(--muted)">{{ t('jt.id') }}</text>
        <text x="120" y="292" fill="var(--muted)">{{ t('jt.name') }}</text>
        <text x="260" y="292" fill="var(--muted)">{{ t('jt.orderId') }}</text>
        <text x="400" y="292" fill="var(--muted)">{{ t('jt.amount') }}</text>
        <g v-for="(r, i) in resultRows" :key="'r' + i">
          <rect x="36" :y="resY(i) - 18" :width="600" height="26" rx="5" :fill="r.oid === null ? 'var(--neg)' : 'var(--pos)'" :fill-opacity="r.oid === null ? 0.12 : 0.08" />
          <text x="40" :y="resY(i)" fill="var(--fg)">{{ r.cust }}</text>
          <text x="120" :y="resY(i)" fill="var(--fg)">{{ t(`jt.${r.name}` as any) }}</text>
          <text x="260" :y="resY(i)" :fill="r.oid === null ? 'var(--neg)' : 'var(--fg)'">{{ r.oid ?? 'NULL' }}</text>
          <text x="400" :y="resY(i)" :fill="r.amount === null ? 'var(--neg)' : 'var(--fg)'">{{ r.amount === null ? 'NULL' : '$' + r.amount }}</text>
        </g>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
