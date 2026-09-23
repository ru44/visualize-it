<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two 2x2 matrices, a rotation R(angle) and a stretch S(k), composed in both orders on the same
// unit square and the same test vector, to show that R*S and S*R generally land in different
// places. params: angle (degrees), k (stretch factor along x).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const U = 46
const O = { x: W / 2, y: H / 2 + 10 }
const sx = (x: number) => O.x + x * U
const sy = (y: number) => O.y - y * U

const angle = computed(() => props.params.angle ?? 40)
const k = computed(() => props.params.k ?? 2)
const rad = computed(() => (angle.value * Math.PI) / 180)

type M2 = [number, number, number, number] // a b c d
const R = computed<M2>(() => [Math.cos(rad.value), -Math.sin(rad.value), Math.sin(rad.value), Math.cos(rad.value)])
const S = computed<M2>(() => [k.value, 0, 0, 1])
const mul = (m1: M2, m2: M2): M2 => [
  m1[0] * m2[0] + m1[1] * m2[2],
  m1[0] * m2[1] + m1[1] * m2[3],
  m1[2] * m2[0] + m1[3] * m2[2],
  m1[2] * m2[1] + m1[3] * m2[3],
]
const apply = (m: M2, x: number, y: number): [number, number] => [m[0] * x + m[1] * y, m[2] * x + m[3] * y]

// "rotate then stretch": stretch is applied to the already-rotated shape, so S*R.
const M1 = computed(() => mul(S.value, R.value))
// "stretch then rotate": rotation is applied to the already-stretched shape, so R*S.
const M2m = computed(() => mul(R.value, S.value))

const SQUARE = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
] as const
const poly = (m: M2) => SQUARE.map(([x, y]) => apply(m, x, y)).map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')

const v = { x: 1, y: 1 }
const v1 = computed(() => apply(M1.value, v.x, v.y))
const v2 = computed(() => apply(M2m.value, v.x, v.y))
const gap = computed(() => Math.hypot(v1.value[0] - v2.value[0], v1.value[1] - v2.value[1]))

const readouts = computed(() => [
  { label: t('compose.gap'), value: fmt(gap.value, 3), color: gap.value < 0.02 ? 'var(--pos)' : 'var(--neg)' },
  { label: 'SR·v', value: `(${fmt(v1.value[0], 2)}, ${fmt(v1.value[1], 2)})`, color: 'var(--accent-2)' },
  { label: 'RS·v', value: `(${fmt(v2.value[0], 2)}, ${fmt(v2.value[1], 2)})`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('compose.hint') }}</text>
      <g stroke="var(--grid)"><line v-for="i in 15" :key="'g' + i" :x1="sx(i - 8)" :x2="sx(i - 8)" y1="0" :y2="H" /><line v-for="i in 9" :key="'h' + i" x1="0" :x2="W" :y1="sy(i - 5)" :y2="sy(i - 5)" /></g>
      <line :x1="sx(-8)" :x2="sx(8)" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" /><line :x1="sx(0)" :x2="sx(0)" :y1="sy(-5)" :y2="sy(5)" stroke="var(--muted)" />

      <polygon :points="poly([1, 0, 0, 1])" fill="none" stroke="var(--line)" stroke-dasharray="4 4" />
      <polygon :points="poly(M1)" fill="var(--accent-2)" fill-opacity="0.22" stroke="var(--accent-2)" stroke-width="2" />
      <polygon :points="poly(M2m)" fill="var(--pos)" fill-opacity="0.22" stroke="var(--pos)" stroke-width="2" />

      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(v1[0])" :y2="sy(v1[1])" stroke="var(--accent-2)" stroke-width="3" />
      <circle :cx="sx(v1[0])" :cy="sy(v1[1])" r="6" fill="var(--accent-2)" />
      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(v2[0])" :y2="sy(v2[1])" stroke="var(--pos)" stroke-width="3" />
      <circle :cx="sx(v2[0])" :cy="sy(v2[1])" r="6" fill="var(--pos)" />
      <line :x1="sx(v1[0])" :y1="sy(v1[1])" :x2="sx(v2[0])" :y2="sy(v2[1])" stroke="var(--fg)" stroke-width="1.5" stroke-dasharray="3 4" />

      <g class="num" font-size="12" text-anchor="end">
        <text :x="W - 12" y="28" fill="var(--accent-2)">■ {{ t('compose.rotateThenStretch') }}</text>
        <text :x="W - 12" y="46" fill="var(--pos)">■ {{ t('compose.stretchThenRotate') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
