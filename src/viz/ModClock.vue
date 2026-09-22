<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Arithmetic on a clock with n hours. options.mode: 'add' (a + b mod n) or 'pow' (a^k mod n, showing every power).
// params n, a, b (or k). Tap the clock to set a.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const n = computed(() => Math.max(2, Math.round(props.params.n ?? 12)))
const a = computed(() => ((Math.round(props.params.a ?? 7) % n.value) + n.value) % n.value)
const b = computed(() => Math.round(props.params.b ?? 8))
const k = computed(() => Math.max(1, Math.round(props.params.k ?? 5)))
const pow = computed(() => props.options.mode === 'pow')
const C = { x: 240, y: 250 }
const R = 180
const pos = (i: number, r = R) => ({ x: C.x + r * Math.sin((i / n.value) * 2 * Math.PI), y: C.y - r * Math.cos((i / n.value) * 2 * Math.PI) })
const modpow = (base: number, e: number, m: number) => { let r = 1; const x = base % m; for (let i = 0; i < e; i++) r = (r * x) % m; return r }
const powers = computed(() => Array.from({ length: k.value }, (_, i) => modpow(a.value, i + 1, n.value)))
const sum = computed(() => (a.value + b.value) % n.value)
const path = computed(() => (pow.value ? powers.value : [a.value, sum.value]))
const readouts = computed(() =>
  pow.value
    ? [{ label: 'a', value: String(a.value) }, { label: 'n', value: String(n.value) }, { label: `a^k mod n`, value: powers.value.join(' → '), color: 'var(--accent)' }, { label: `a^${k.value} mod ${n.value}`, value: String(powers.value[k.value - 1]), color: 'var(--accent-2)' }]
    : [{ label: 'a', value: String(a.value) }, { label: 'b', value: String(b.value) }, { label: 'a + b', value: String(a.value + b.value) }, { label: `(a + b) mod ${n.value}`, value: String(sum.value), color: 'var(--accent-2)' }, { label: t('mod.turns'), value: String(Math.floor((a.value + b.value) / n.value)) }],
)
const svg = ref<SVGSVGElement>()
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  const x = ((e.clientX - bx.left) / bx.width) * W - C.x
  const y = ((e.clientY - bx.top) / bx.height) * H - C.y
  emit('set', 'a', Math.round((((Math.atan2(x, -y) / (2 * Math.PI)) * n.value) % n.value + n.value) % n.value))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-pointer touch-none select-none" @pointerdown="pick">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('mod.hint') }}</text>
      <circle :cx="C.x" :cy="C.y" :r="R + 22" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="i in n" :key="i" class="num">
        <circle :cx="pos(i - 1).x" :cy="pos(i - 1).y" r="14" :fill="path.includes(i - 1) ? (i - 1 === path[path.length - 1] ? 'var(--accent-2)' : 'var(--accent)') : 'var(--panel)'" stroke="var(--line)" />
        <text :x="pos(i - 1).x" :y="pos(i - 1).y + 4" text-anchor="middle" font-size="11" :fill="path.includes(i - 1) ? '#fff' : 'var(--fg)'">{{ i - 1 }}</text>
      </g>
      <!-- hops -->
      <template v-if="!pow">
        <path v-for="s in b" :key="s" :d="`M${pos(a + s - 1, R - 24).x},${pos(a + s - 1, R - 24).y} A${R - 24},${R - 24} 0 0 1 ${pos(a + s, R - 24).x},${pos(a + s, R - 24).y}`" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-opacity="0.8" />
      </template>
      <template v-else>
        <line v-for="(p, i) in powers.slice(1)" :key="i" :x1="pos(powers[i], R - 24).x" :y1="pos(powers[i], R - 24).y" :x2="pos(p, R - 24).x" :y2="pos(p, R - 24).y" stroke="var(--accent-2)" stroke-opacity="0.6" />
      </template>
      <g class="num" font-size="16">
        <text x="500" y="120" fill="var(--muted)" font-size="12">{{ pow ? t('mod.powers') : t('mod.walk') }}</text>
        <template v-if="pow"><text v-for="(p, i) in powers" :key="i" x="500" :y="150 + i * 24" :fill="i === powers.length - 1 ? 'var(--accent-2)' : 'var(--fg)'">{{ a }}^{{ i + 1 }} mod {{ n }} = {{ p }}</text></template>
        <template v-else><text x="500" y="150" fill="var(--fg)">{{ a }} + {{ b }} = {{ a + b }}</text><text x="500" y="180" fill="var(--fg)">{{ a + b }} = {{ Math.floor((a + b) / n) }} × {{ n }} + {{ sum }}</text><text x="500" y="216" fill="var(--accent-2)" font-size="20">({{ a }} + {{ b }}) mod {{ n }} = {{ sum }}</text></template>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
