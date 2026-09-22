<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One grain of rice on the first square, two on the second, four on the third… param k (1..64). Tap a square.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const k = computed(() => Math.max(1, Math.min(64, Math.round(props.params.k ?? 10))))
const onSquare = computed(() => 2n ** BigInt(k.value - 1))
const total = computed(() => 2n ** BigInt(k.value) - 1n)
const sep = (b: bigint) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const GRAIN_KG = 25e-6 // about 25 mg per grain
const tonnes = computed(() => Number(total.value) * GRAIN_KG / 1000)
const mass = computed(() => { const kg = Number(total.value) * GRAIN_KG; return kg < 1 ? `${(kg * 1000).toPrecision(3)} g` : kg < 1000 ? `${kg.toPrecision(3)} kg` : `${Number(tonnes.value.toPrecision(3)).toLocaleString('en-US')} t` })
const HARVEST_T = 5e8 // world rice harvest, roughly 500 million tonnes a year
const S = 50
const O = { x: 40, y: 40 }
const cell = (i: number) => ({ x: O.x + (i % 8) * S, y: O.y + Math.floor(i / 8) * S })
const readouts = computed(() => [
  { label: t('chess.square'), value: String(k.value) },
  { label: t('chess.onSquare'), value: sep(onSquare.value), color: 'var(--accent-2)' },
  { label: t('chess.total'), value: sep(total.value), color: 'var(--accent)' },
  { label: t('chess.weight'), value: mass.value },
  { label: t('chess.harvests'), value: tonnes.value >= HARVEST_T / 100 ? (tonnes.value / HARVEST_T).toPrecision(2) : '< 0.01' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('chess.hint') }}</text>
      <g v-for="i in 64" :key="i" class="cursor-pointer" @click="emit('set', 'k', i)">
        <rect :x="cell(i - 1).x" :y="cell(i - 1).y" :width="S" :height="S" :fill="(Math.floor((i - 1) / 8) + (i - 1)) % 2 ? 'var(--sunken)' : 'var(--panel)'" stroke="var(--line)" />
        <rect v-if="i <= k" :x="cell(i - 1).x + 2" :y="cell(i - 1).y + 2" :width="S - 4" :height="S - 4" fill="var(--accent-2)" :fill-opacity="0.08 + 0.9 * ((i - 1) / 63)" :stroke="i === k ? 'var(--fg)' : 'none'" stroke-width="2" />
        <text class="num" :x="cell(i - 1).x + S / 2" :y="cell(i - 1).y + S / 2 + 4" text-anchor="middle" font-size="10" :fill="i <= k && i > 40 ? '#fff' : 'var(--muted)'">{{ i <= 13 ? 2 ** (i - 1) : i }}</text>
      </g>
      <g class="num" transform="translate(470, 80)">
        <text font-size="13" fill="var(--muted)">{{ t('chess.onSquare') }} {{ k }}</text>
        <text y="34" font-size="22" fill="var(--accent-2)">2^{{ k - 1 }}</text>
        <text y="100" font-size="13" fill="var(--muted)">{{ t('chess.total') }}</text>
        <text y="134" font-size="22" fill="var(--accent)">2^{{ k }} − 1</text>
        <text y="200" font-size="13" fill="var(--muted)">{{ t('chess.weight') }}</text>
        <text y="230" font-size="20" fill="var(--fg)">{{ mass }}</text>
        <text y="300" font-size="12" fill="var(--muted)">{{ t('chess.note') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
