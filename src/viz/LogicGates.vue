<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One gate (options.gate: AND OR NOT NAND NOR XOR) or a half adder (options.gate: 'HALF_ADDER').
// params a, b are the inputs (0/1); tapping an input flips it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const gate = computed<string>(() => props.options.gate ?? 'AND')
const a = computed(() => (props.params.a ?? 0) >= 0.5 ? 1 : 0)
const b = computed(() => (props.params.b ?? 0) >= 0.5 ? 1 : 0)
const unary = computed(() => gate.value === 'NOT')

const table: Record<string, (x: number, y: number) => number> = {
  AND: (x, y) => x & y, OR: (x, y) => x | y, NOT: (x) => 1 - x, NAND: (x, y) => 1 - (x & y), NOR: (x, y) => 1 - (x | y), XOR: (x, y) => x ^ y,
}
const out = computed(() => (gate.value === 'HALF_ADDER' ? { sum: a.value ^ b.value, carry: a.value & b.value } : { sum: table[gate.value](a.value, b.value), carry: 0 }))
const rows = computed(() => (unary.value ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]).map((r) => ({ in: r, out: gate.value === 'HALF_ADDER' ? [r[0] ^ r[1], r[0] & r[1]] : [table[gate.value](r[0], r[1] ?? 0)] })))

const ON = 'var(--accent-2)'
const OFF = 'var(--line)'
const wire = (v: number) => ({ stroke: v ? ON : OFF, 'stroke-width': v ? 3 : 2 })
const symbol = computed(() => {
  // Standard distinctive shapes, drawn at (300, 170..310)
  const x = 300
  const y = 240
  switch (gate.value) {
    case 'AND': case 'NAND': return `M${x},${y - 60} h50 a60 60 0 0 1 0 120 h-50 z`
    case 'OR': case 'NOR': case 'XOR': return `M${x},${y - 60} q40 0 110 60 q-70 60 -110 60 q30 -60 0 -120 z`
    case 'NOT': return `M${x},${y - 55} L${x + 105},${y} L${x},${y + 55} z`
    default: return `M${x},${y - 70} h110 v140 h-110 z`
  }
})
const bubble = computed(() => ['NAND', 'NOR', 'NOT'].includes(gate.value))
const readouts = computed(() =>
  gate.value === 'HALF_ADDER'
    ? [{ label: 'A', value: String(a.value) }, { label: 'B', value: String(b.value) }, { label: 'sum (A XOR B)', value: String(out.value.sum), color: ON }, { label: 'carry (A AND B)', value: String(out.value.carry), color: ON }, { label: 'A + B', value: `${a.value} + ${b.value} = ${a.value + b.value} = ${out.value.carry}${out.value.sum}₂` }]
    : [{ label: 'A', value: String(a.value) }, ...(unary.value ? [] : [{ label: 'B', value: String(b.value) }]), { label: `${gate.value}`, value: String(out.value.sum), color: ON }],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('gates.hint') }}</text>
      <!-- inputs -->
      <g class="cursor-pointer" @click="emit('set', 'a', 1 - a)">
        <rect x="60" :y="unary ? 210 : 170" width="60" height="60" rx="12" :fill="a ? ON : 'var(--sunken)'" stroke="var(--line)" />
        <text class="num" x="90" :y="unary ? 248 : 208" text-anchor="middle" font-size="26" :fill="a ? '#fff' : 'var(--fg)'">{{ a }}</text>
        <text class="num" x="90" :y="unary ? 200 : 160" text-anchor="middle" font-size="12" fill="var(--muted)">A</text>
      </g>
      <g v-if="!unary" class="cursor-pointer" @click="emit('set', 'b', 1 - b)">
        <rect x="60" y="250" width="60" height="60" rx="12" :fill="b ? ON : 'var(--sunken)'" stroke="var(--line)" />
        <text class="num" x="90" y="288" text-anchor="middle" font-size="26" :fill="b ? '#fff' : 'var(--fg)'">{{ b }}</text>
        <text class="num" x="90" y="330" text-anchor="middle" font-size="12" fill="var(--muted)">B</text>
      </g>
      <!-- wires in -->
      <line x1="120" :y1="unary ? 240 : 200" x2="300" :y2="unary ? 240 : 205" v-bind="wire(a)" />
      <line v-if="!unary" x1="120" y1="280" x2="300" y2="275" v-bind="wire(b)" />
      <!-- gate -->
      <path :d="symbol" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
      <path v-if="gate === 'XOR'" d="M285,180 q30 60 0 120" fill="none" stroke="var(--fg)" stroke-width="2.5" />
      <circle v-if="bubble" :cx="gate === 'NOT' ? 413 : 418" cy="240" r="8" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
      <text class="num" x="345" y="245" text-anchor="middle" font-size="16" fill="var(--fg)">{{ gate === 'HALF_ADDER' ? '+' : gate }}</text>
      <!-- wires out -->
      <template v-if="gate === 'HALF_ADDER'">
        <line x1="410" y1="210" x2="560" y2="210" v-bind="wire(out.sum)" />
        <line x1="410" y1="270" x2="560" y2="270" v-bind="wire(out.carry)" />
        <rect x="560" y="180" width="60" height="60" rx="12" :fill="out.sum ? ON : 'var(--sunken)'" stroke="var(--line)" /><text class="num" x="590" y="218" text-anchor="middle" font-size="26" :fill="out.sum ? '#fff' : 'var(--fg)'">{{ out.sum }}</text>
        <text class="num" x="630" y="216" font-size="12" fill="var(--muted)">sum</text>
        <rect x="560" y="245" width="60" height="60" rx="12" :fill="out.carry ? ON : 'var(--sunken)'" stroke="var(--line)" /><text class="num" x="590" y="283" text-anchor="middle" font-size="26" :fill="out.carry ? '#fff' : 'var(--fg)'">{{ out.carry }}</text>
        <text class="num" x="630" y="281" font-size="12" fill="var(--muted)">carry</text>
      </template>
      <template v-else>
        <line :x1="bubble ? 426 : 410" y1="240" x2="560" y2="240" v-bind="wire(out.sum)" />
        <rect x="560" y="210" width="60" height="60" rx="12" :fill="out.sum ? ON : 'var(--sunken)'" stroke="var(--line)" />
        <text class="num" x="590" y="248" text-anchor="middle" font-size="26" :fill="out.sum ? '#fff' : 'var(--fg)'">{{ out.sum }}</text>
        <text class="num" x="590" y="200" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('gates.out') }}</text>
      </template>
      <!-- truth table -->
      <g class="num" font-size="13">
        <text x="680" y="150" fill="var(--muted)" font-size="11">{{ t('gates.table') }}</text>
        <g v-for="(r, i) in rows" :key="i">
          <rect x="672" :y="160 + i * 28" width="118" height="26" rx="5" :fill="r.in[0] === a && (unary || r.in[1] === b) ? 'var(--accent-soft)' : 'transparent'" />
          <text v-for="(v, j) in r.in" :key="'i' + j" :x="690 + j * 26" :y="178 + i * 28" fill="var(--fg)">{{ v }}</text>
          <text :x="690 + r.in.length * 26" :y="178 + i * 28" fill="var(--muted)">→</text>
          <text v-for="(v, j) in r.out" :key="'o' + j" :x="716 + r.in.length * 26 + j * 22" :y="178 + i * 28" :fill="ON" font-weight="600">{{ v }}</text>
        </g>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
