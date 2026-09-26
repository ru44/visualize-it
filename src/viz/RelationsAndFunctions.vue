<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two sets of 3: three kids on the left, three after-school clubs on the right. params.code packs
// all 9 possible arrows as bits (bit i*3+j = an arrow from kid i to club j); tap an arrow to toggle
// it. The relation is a function exactly when every kid has exactly one arrow out; then it can also
// be one-to-one (injective, no club shared) and onto (surjective, every club chosen).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const A = ['relf.amir', 'relf.bella', 'relf.chen']
const B = ['relf.football', 'relf.chess', 'relf.art']
const LX = 90
const RX = 540
const BW = 170
const BH = 60
const ROWS = [90, 225, 360]

const code = computed(() => Math.min(511, Math.max(0, Math.round(props.params.code ?? 0))))
const bit = (i: number, j: number) => (code.value >> (i * 3 + j)) & 1
const toggle = (i: number, j: number) => emit('set', 'code', code.value ^ (1 << (i * 3 + j)))

const rowDeg = computed(() => [0, 1, 2].map((i) => [0, 1, 2].reduce((s, j) => s + bit(i, j), 0)))
const colDeg = computed(() => [0, 1, 2].map((j) => [0, 1, 2].reduce((s, i) => s + bit(i, j), 0)))
const isFunction = computed(() => rowDeg.value.every((d) => d === 1))
const isInjective = computed(() => isFunction.value && colDeg.value.every((d) => d <= 1))
const isSurjective = computed(() => isFunction.value && colDeg.value.every((d) => d >= 1))
const arrows = computed(() => [0, 1, 2].reduce((s, i) => s + rowDeg.value[i], 0))

const yn = (b: boolean) => (b ? t('relf.yes') : t('relf.no'))
const readouts = computed(() => [
  { label: t('relf.arrows'), value: String(arrows.value) },
  { label: t('relf.function'), value: yn(isFunction.value), color: isFunction.value ? 'var(--pos)' : 'var(--neg)' },
  { label: t('relf.injective'), value: isFunction.value ? yn(isInjective.value) : '—', color: isFunction.value ? (isInjective.value ? 'var(--pos)' : 'var(--neg)') : undefined },
  { label: t('relf.surjective'), value: isFunction.value ? yn(isSurjective.value) : '—', color: isFunction.value ? (isSurjective.value ? 'var(--pos)' : 'var(--neg)') : undefined },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <defs>
        <marker id="relf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
        </marker>
      </defs>
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('relf.hint') }}</text>
      <g v-for="i in [0, 1, 2]" :key="'r' + i">
        <g v-for="j in [0, 1, 2]" :key="'l' + i + '-' + j" class="cursor-pointer" @click="toggle(i, j)">
          <line :x1="LX + BW" :y1="ROWS[i] + BH / 2" :x2="RX" :y2="ROWS[j] + BH / 2" stroke="transparent" stroke-width="18" />
          <line :x1="LX + BW" :y1="ROWS[i] + BH / 2" :x2="RX - 10" :y2="ROWS[j] + BH / 2" :stroke="bit(i, j) ? 'var(--accent)' : 'var(--line)'" :stroke-width="bit(i, j) ? 2.5 : 1" :stroke-opacity="bit(i, j) ? 0.9 : 0.25" :marker-end="bit(i, j) ? 'url(#relf-arrow)' : undefined" />
        </g>
      </g>
      <g v-for="(name, i) in A" :key="'A' + i">
        <rect :x="LX" :y="ROWS[i]" :width="BW" :height="BH" rx="10" fill="var(--panel)" :stroke="rowDeg[i] === 1 ? 'var(--line)' : 'var(--neg)'" :stroke-width="rowDeg[i] === 1 ? 1.5 : 3" />
        <text class="num" :x="LX + BW / 2" :y="ROWS[i] + BH / 2 + 5" text-anchor="middle" font-size="14" fill="var(--fg)">{{ t(name as any) }}</text>
      </g>
      <g v-for="(name, j) in B" :key="'B' + j">
        <rect :x="RX" :y="ROWS[j]" :width="BW" :height="BH" rx="10" fill="var(--panel)" :stroke="colDeg[j] > 1 ? 'var(--accent-2)' : 'var(--line)'" :stroke-width="colDeg[j] > 1 ? 3 : 1.5" />
        <text class="num" :x="RX + BW / 2" :y="ROWS[j] + BH / 2 + 5" text-anchor="middle" font-size="14" fill="var(--fg)">{{ t(name as any) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
