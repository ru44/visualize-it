<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two sets of small integers with a chosen operation highlighted. options.op: 'union' | 'intersection' | 'difference' | 'complement'.
// params op (0..3 selects the operation), maxA, maxB choose the sets: A = multiples of 2 up to N, B = multiples of 3 up to N.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const N = computed(() => Math.max(6, Math.round(props.params.N ?? 20)))
const p = computed(() => Math.max(2, Math.round(props.params.p ?? 2)))
const q = computed(() => Math.max(2, Math.round(props.params.q ?? 3)))
const opIdx = computed(() => Math.min(3, Math.max(0, Math.round(props.params.op ?? 0))))
const ops = ['union', 'intersection', 'difference', 'complement'] as const
const op = computed(() => ops[opIdx.value])
const U = computed(() => Array.from({ length: N.value }, (_, i) => i + 1))
const A = computed(() => U.value.filter((x) => x % p.value === 0))
const B = computed(() => U.value.filter((x) => x % q.value === 0))
const inA = (x: number) => x % p.value === 0
const inB = (x: number) => x % q.value === 0
const selected = (x: number) => (op.value === 'union' ? inA(x) || inB(x) : op.value === 'intersection' ? inA(x) && inB(x) : op.value === 'difference' ? inA(x) && !inB(x) : !inA(x))
const result = computed(() => U.value.filter(selected))
const symbol = computed(() => ({ union: 'A ∪ B', intersection: 'A ∩ B', difference: 'A \\ B', complement: 'Aᶜ' })[op.value])
// element positions: region-based
const place = (x: number) => {
  const a = inA(x)
  const b = inB(x)
  const list = U.value.filter((y) => inA(y) === a && inB(y) === b)
  const i = list.indexOf(x)
  const cols = a && b ? 2 : 3
  const col = i % cols
  const row = Math.floor(i / cols)
  const base = a && b ? { x: 300, y: 190 } : a ? { x: 150, y: 190 } : b ? { x: 430, y: 190 } : { x: 600, y: 100 }
  return { x: base.x + col * 34, y: base.y + row * 34 }
}
const readouts = computed(() => [
  { label: 'A', value: `{${A.value.join(', ')}}`, color: 'var(--accent)' },
  { label: 'B', value: `{${B.value.join(', ')}}`, color: 'var(--pos)' },
  { label: symbol.value, value: `{${result.value.join(', ')}}`, color: 'var(--accent-2)' },
  { label: `|${symbol.value}|`, value: String(result.value.length) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('venn.hint') }}</text>
      <rect x="40" y="50" width="720" height="380" rx="12" fill="var(--sunken)" stroke="var(--line)" />
      <text class="num" x="56" y="74" font-size="12" fill="var(--muted)">U = {1 … {{ N }}}</text>
      <circle cx="255" cy="240" r="150" :fill="op === 'complement' ? 'var(--panel)' : 'var(--accent)'" :fill-opacity="op === 'complement' ? 1 : 0.18" stroke="var(--accent)" stroke-width="2" />
      <circle cx="425" cy="240" r="150" fill="var(--pos)" fill-opacity="0.18" stroke="var(--pos)" stroke-width="2" />
      <text class="num" x="130" y="110" font-size="14" fill="var(--accent)">A: {{ t('venn.multiples', { k: p }) }}</text>
      <text class="num" x="470" y="110" font-size="14" fill="var(--pos)">B: {{ t('venn.multiples', { k: q }) }}</text>
      <g v-for="x in U" :key="x">
        <circle :cx="place(x).x" :cy="place(x).y" r="13" :fill="selected(x) ? 'var(--accent-2)' : 'var(--panel)'" :stroke="selected(x) ? 'var(--accent-2)' : 'var(--line)'" />
        <text class="num" :x="place(x).x" :y="place(x).y + 4" text-anchor="middle" font-size="11" :fill="selected(x) ? '#fff' : 'var(--fg)'">{{ x }}</text>
      </g>
      <g class="num" font-size="12">
        <rect v-for="(o, i) in ops" :key="o" :x="56 + i * 130" y="392" width="122" height="26" rx="6" :fill="i === opIdx ? 'var(--fg)' : 'var(--panel)'" stroke="var(--line)" class="cursor-pointer" @click="emit('set', 'op', i)" />
        <text v-for="(o, i) in ops" :key="'t' + o" :x="117 + i * 130" y="409" text-anchor="middle" :fill="i === opIdx ? 'var(--bg)' : 'var(--fg)'" class="pointer-events-none">{{ t(`venn.${o}` as any) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
