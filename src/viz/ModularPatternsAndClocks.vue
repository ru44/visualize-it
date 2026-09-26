<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The numbers 0-47 laid out in rows of `cols` cells, like a hundred-square or a printed calendar.
// Every number in the same column leaves the same remainder when divided by cols, so the columns
// are the remainder classes mod `cols`. Tap a number to inspect it: its remainder, its digit-sum
// tests for 3 and 9, and whether it is a multiple of 11.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const TOTAL = 48

const cols = computed(() => Math.min(12, Math.max(3, Math.round(props.params.cols ?? 7))))
const highlight = computed(() => Math.min(TOTAL - 1, Math.max(0, Math.round(props.params.highlight ?? 23))))
const rows = computed(() => Math.ceil(TOTAL / cols.value))
const cell = computed(() => Math.min(760 / cols.value, 410 / rows.value))
const gx = computed(() => (W - cols.value * cell.value) / 2)
const gy = computed(() => 55 + (415 - rows.value * cell.value) / 2)

const cells = computed(() => Array.from({ length: TOTAL }, (_, n) => {
  const col = n % cols.value
  const row = Math.floor(n / cols.value)
  return { n, col, row, x: gx.value + col * cell.value, y: gy.value + row * cell.value }
}))
const hCol = computed(() => highlight.value % cols.value)
const remainder = computed(() => highlight.value % cols.value)
const quotient = computed(() => Math.floor(highlight.value / cols.value))
const digitSum = computed(() => Math.floor(highlight.value / 10) + (highlight.value % 10))
const div3 = computed(() => digitSum.value % 3 === 0)
const div9 = computed(() => digitSum.value % 9 === 0)
const div11 = computed(() => highlight.value % 11 === 0)

const yn = (b: boolean) => (b ? t('modg.yes') : t('modg.no'))
const readouts = computed(() => [
  { label: t('modg.remainder'), value: String(remainder.value), color: 'var(--accent)' },
  { label: t('modg.quotient'), value: String(quotient.value) },
  { label: t('modg.digitsum'), value: String(digitSum.value) },
  { label: t('modg.div3'), value: yn(div3.value), color: div3.value ? 'var(--pos)' : 'var(--neg)' },
  { label: t('modg.div9'), value: yn(div9.value), color: div9.value ? 'var(--pos)' : 'var(--neg)' },
  { label: t('modg.div11'), value: yn(div11.value), color: div11.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('modg.hint') }}</text>
      <rect :x="gx + hCol * cell" :y="gy" :width="cell" :height="rows * cell" fill="var(--accent-soft)" />
      <g v-for="c in cells" :key="c.n" class="cursor-pointer" @click="emit('set', 'highlight', c.n)">
        <rect :x="c.x + 1" :y="c.y + 1" :width="cell - 2" :height="cell - 2" rx="3"
          :fill="c.n === highlight ? 'var(--accent-2)' : c.col % 2 === 0 ? 'var(--panel)' : 'var(--sunken)'"
          :stroke="c.n === highlight ? 'var(--accent-2)' : 'var(--line)'" :stroke-width="c.n === highlight ? 2.5 : 1" />
        <text class="num" :x="c.x + cell / 2" :y="c.y + cell / 2 + 4" text-anchor="middle" :font-size="Math.min(13, cell * 0.4)"
          :fill="c.n === highlight ? '#fff' : c.n % cols === 0 ? 'var(--pos)' : 'var(--fg)'" :font-weight="c.n % cols === 0 ? 700 : 400">{{ c.n }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
