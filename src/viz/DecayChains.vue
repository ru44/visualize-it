<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One of the three natural radioactive series, plotted as a staircase on the neutron (N) vs proton
// (Z) chart: an alpha decay (losing a helium nucleus) always steps 2 down and 2 left; a beta decay
// (a neutron turning into a proton) steps 1 down and 1 right. "time" is measured in half-lives of the
// chain's own parent, so the same slider works whether the parent's half-life is seconds or billions
// of years. Every member's current share of the original atoms is drawn as that dot's brightness:
// once established, a short-lived member decays about as fast as it is fed, so its share stays near
// (its own half-life / the parent's half-life) of the parent's share — "secular equilibrium" — while
// the parent slowly empties into the final, stable isotope.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const Y = 3.1557e7, D = 86400, HR = 3600, MIN = 60
type M = [string, number, number, number, 'a' | 'b' | null] // symbol, mass number A, protons Z, half-life (s), decay that produced it
const CHAINS: { key: string; members: M[] }[] = [
  { key: 'decay.uranium', members: [
    ['U-238', 238, 92, 4.468e9 * Y, null], ['Th-234', 234, 90, 24.10 * D, 'a'], ['Pa-234m', 234, 91, 1.17 * MIN, 'b'], ['U-234', 234, 92, 245500 * Y, 'b'],
    ['Th-230', 230, 90, 75380 * Y, 'a'], ['Ra-226', 226, 88, 1600 * Y, 'a'], ['Rn-222', 222, 86, 3.8235 * D, 'a'], ['Po-218', 218, 84, 3.10 * MIN, 'a'],
    ['Pb-214', 214, 82, 26.8 * MIN, 'a'], ['Bi-214', 214, 83, 19.9 * MIN, 'b'], ['Po-214', 214, 84, 164.3e-6, 'b'], ['Pb-210', 210, 82, 22.3 * Y, 'a'],
    ['Bi-210', 210, 83, 5.013 * D, 'b'], ['Po-210', 210, 84, 138.376 * D, 'b'], ['Pb-206', 206, 82, Infinity, 'a'],
  ] },
  { key: 'decay.actinium', members: [
    ['U-235', 235, 92, 7.04e8 * Y, null], ['Th-231', 231, 90, 25.52 * HR, 'a'], ['Pa-231', 231, 91, 32760 * Y, 'b'], ['Ac-227', 227, 89, 21.772 * Y, 'a'],
    ['Th-227', 227, 90, 18.68 * D, 'b'], ['Ra-223', 223, 88, 11.43 * D, 'a'], ['Rn-219', 219, 86, 3.96, 'a'], ['Po-215', 215, 84, 1.781e-3, 'a'],
    ['Pb-211', 211, 82, 36.1 * MIN, 'a'], ['Bi-211', 211, 83, 2.14 * MIN, 'b'], ['Tl-207', 207, 81, 4.77 * MIN, 'a'], ['Pb-207', 207, 82, Infinity, 'b'],
  ] },
  { key: 'decay.thorium', members: [
    ['Th-232', 232, 90, 1.405e10 * Y, null], ['Ra-228', 228, 88, 5.75 * Y, 'a'], ['Ac-228', 228, 89, 6.15 * HR, 'b'], ['Th-228', 228, 90, 1.9116 * Y, 'b'],
    ['Ra-224', 224, 88, 3.6319 * D, 'a'], ['Rn-220', 220, 86, 55.6, 'a'], ['Po-216', 216, 84, 0.145, 'a'], ['Pb-212', 212, 82, 10.64 * HR, 'a'],
    ['Bi-212', 212, 83, 60.55 * MIN, 'b'], ['Po-212', 212, 84, 299e-9, 'b'], ['Pb-208', 208, 82, Infinity, 'a'],
  ] },
]

const chain = computed(() => Math.max(0, Math.min(2, Math.round(props.params.chain ?? 0))))
const time = computed(() => Math.max(0, Math.min(10, props.params.time ?? 1)))
const members = computed(() => CHAINS[chain.value].members)
const radonIdx = computed(() => members.value.findIndex((m) => m[0].startsWith('Rn-')))

const fractions = computed(() => {
  const ms = members.value
  const T0 = ms[0][3]
  const f0 = Math.pow(0.5, time.value)
  const f = ms.map((m, i) => (i === 0 ? f0 : i === ms.length - 1 ? 0 : (m[3] / T0) * f0))
  f[ms.length - 1] = Math.max(0, 1 - f.slice(0, -1).reduce((a, b) => a + b, 0))
  return f
})

function sci(v: number) {
  if (!isFinite(v) || v <= 0) return '0'
  const e = Math.floor(Math.log10(v))
  const m = v / 10 ** e
  return `${m.toFixed(2)}×10^${e}`
}

const PLOT = { x0: 110, x1: 470, y0: 430, y1: 66 }
const bounds = computed(() => {
  const ms = members.value
  const zs = ms.map((m) => m[2])
  const ns = ms.map((m) => m[1] - m[2])
  return { minZ: Math.min(...zs) - 1, maxZ: Math.max(...zs) + 1, minN: Math.min(...ns) - 1, maxN: Math.max(...ns) + 1 }
})
const sx = (z: number) => PLOT.x0 + ((z - bounds.value.minZ) / (bounds.value.maxZ - bounds.value.minZ)) * (PLOT.x1 - PLOT.x0)
const sy = (n: number) => PLOT.y0 - ((n - bounds.value.minN) / (bounds.value.maxN - bounds.value.minN)) * (PLOT.y0 - PLOT.y1)

const nodes = computed(() =>
  members.value.map((m, i) => ({
    x: sx(m[2]), y: sy(m[1] - m[2]), sym: m[0], decay: m[4],
    r: i === 0 || i === members.value.length - 1 ? 9 : i === radonIdx.value ? 8 : 5,
    op: Math.max(0.14, Math.min(1, Math.pow(Math.max(fractions.value[i], 1e-13), 0.12))),
    fill: i === 0 ? 'var(--accent)' : i === members.value.length - 1 ? 'var(--pos)' : i === radonIdx.value ? 'var(--accent-2)' : 'var(--fg)',
  })),
)

const readouts = computed(() => {
  const ms = members.value
  const f = fractions.value
  return [
    { label: t('decay.halfLives'), value: time.value.toFixed(1) },
    { label: t('decay.years'), value: sci((time.value * ms[0][3]) / Y) },
    { label: t('decay.remaining'), value: `${(f[0] * 100).toFixed(1)}% ${ms[0][0]}`, color: 'var(--accent)' },
    { label: t('decay.produced'), value: `${(f[ms.length - 1] * 100).toFixed(1)}% ${ms[ms.length - 1][0]}`, color: 'var(--pos)' },
    { label: t('decay.radon'), value: `${ms[radonIdx.value][0]} · ${sci(f[radonIdx.value] * 100)}%`, color: 'var(--accent-2)' },
  ]
})
</script>

<template>
  <div class="relative">
    <svg viewBox="0 0 800 480" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('decay.hint') }}</text>
      <text x="16" y="40" font-size="11" fill="var(--accent)">— {{ t('decay.alpha') }}</text>
      <text x="16" y="54" font-size="11" fill="var(--accent-2)">- - {{ t('decay.beta') }}</text>
      <text :x="(PLOT.x0 + PLOT.x1) / 2" y="458" text-anchor="middle" font-size="11" fill="var(--muted)">Z ({{ t('decay.z') }})</text>
      <text :x="PLOT.x0 - 70" :y="(PLOT.y0 + PLOT.y1) / 2" text-anchor="middle" font-size="11" fill="var(--muted)" :transform="`rotate(-90 ${PLOT.x0 - 70} ${(PLOT.y0 + PLOT.y1) / 2})`">N ({{ t('decay.n') }})</text>
      <line v-for="(n, i) in nodes.slice(1)" :key="'seg' + i" :x1="nodes[i].x" :y1="nodes[i].y" :x2="n.x" :y2="n.y" :stroke="n.decay === 'a' ? 'var(--accent)' : 'var(--accent-2)'" :stroke-dasharray="n.decay === 'b' ? '5 4' : 'none'" stroke-width="2" />
      <g v-for="(n, i) in nodes" :key="'n' + i">
        <circle :cx="n.x" :cy="n.y" :r="n.r" :fill="n.fill" :fill-opacity="n.op" :stroke="i === radonIdx ? 'var(--accent-2)' : 'none'" stroke-width="2" />
        <text v-if="i === 0 || i === nodes.length - 1 || i === radonIdx" :x="n.x" :y="n.y - n.r - 5" text-anchor="middle" font-size="10" fill="var(--fg)">{{ n.sym }}</text>
      </g>
      <text :x="nodes[radonIdx]?.x" :y="(nodes[radonIdx]?.y ?? 0) + 22" text-anchor="middle" font-size="10" fill="var(--accent-2)">{{ t('decay.gas') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
