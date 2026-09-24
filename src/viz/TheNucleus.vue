<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'
import { isStable, symbolFor, nameFor, nuclearRadiusFm } from './nuclideData'

// Build a nucleus from Z protons and N neutrons. Shows the element, the nuclide symbol, whether the
// combination is a known stable isotope, and the radius R = 1.2·A^(1/3) fm (nucleons pack together
// like marbles, so volume — and hence R³ — grows in direct proportion to how many there are).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const Z = computed(() => Math.round(Math.min(20, Math.max(1, props.params.Z ?? 6))))
const N = computed(() => Math.round(Math.min(24, Math.max(0, props.params.N ?? 6))))
const A = computed(() => Z.value + N.value)
const R = computed(() => nuclearRadiusFm(A.value))
const stable = computed(() => isStable(Z.value, N.value))
const symbol = computed(() => symbolFor(Z.value))
const name = computed(() => nameFor(Z.value))

const CX = 220
const CY = 250
const R_PX = computed(() => 26 + 20 * Math.cbrt(A.value))
const DOT_R = computed(() => Math.min(16, Math.max(4, (1.05 * R_PX.value) / Math.sqrt(A.value))))

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

// Phyllotaxis (sunflower-seed) layout: fills a disk of radius R_PX evenly for any nucleon count, then
// a seeded shuffle decides which spots are protons vs neutrons, so the mix looks realistically jumbled.
const nucleons = computed(() => {
  const a = A.value
  const rnd = makeRng(Z.value * 1000 + N.value)
  const kinds: ('p' | 'n')[] = Array.from({ length: a }, (_, i) => (i < Z.value ? 'p' : 'n'))
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[kinds[i], kinds[j]] = [kinds[j]!, kinds[i]!]
  }
  const golden = 2.399963229728653
  return kinds.map((kind, i) => {
    const frac = (i + 0.5) / a
    const r = R_PX.value * Math.sqrt(frac)
    const theta = i * golden
    return { x: CX + r * Math.cos(theta), y: CY + r * Math.sin(theta), kind }
  })
})

const readouts = computed(() => [
  { label: t('nucleus.element'), value: `${name.value} (${symbol.value})` },
  { label: t('nucleus.protons'), value: fmt(Z.value) },
  { label: t('nucleus.neutrons'), value: fmt(N.value) },
  { label: t('nucleus.massNumber'), value: fmt(A.value) },
  { label: t('nucleus.radius'), value: `${fmt(R.value, 2)} fm` },
  { label: t('nucleus.status'), value: stable.value ? t('nucleus.stable') : t('nucleus.unstable'), color: stable.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div class="relative">
    <svg viewBox="0 0 800 480" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('nucleus.hint') }}</text>

      <circle :cx="CX" :cy="CY" :r="R_PX + DOT_R" fill="var(--sunken)" stroke="var(--line)" stroke-dasharray="3 3" />
      <circle v-for="(nu, i) in nucleons" :key="i" :cx="nu.x" :cy="nu.y" :r="DOT_R" :fill="nu.kind === 'p' ? 'var(--accent)' : 'var(--accent-2)'" />

      <g class="num" font-size="12" fill="var(--muted)">
        <circle cx="470" cy="58" r="6" fill="var(--accent)" />
        <text x="484" y="62">{{ t('nucleus.legendP') }}</text>
        <circle cx="470" cy="78" r="6" fill="var(--accent-2)" />
        <text x="484" y="82">{{ t('nucleus.legendN') }}</text>
      </g>

      <text class="num" x="470" y="180" font-size="56" fill="var(--fg)">
        {{ symbol }}
        <tspan x="470" dy="-18" font-size="20">{{ A }}</tspan>
      </text>
      <text class="num" x="536" y="200" font-size="20" fill="var(--muted)">{{ Z }}</text>
      <text class="num" x="470" y="222" font-size="14" fill="var(--muted)">{{ name }} — {{ t('nucleus.isotopeOf', { a: String(A), sym: symbol }) }}</text>

      <text class="num" x="470" y="270" font-size="16" :fill="stable ? 'var(--pos)' : 'var(--neg)'">
        {{ stable ? t('nucleus.stable') : t('nucleus.unstable') }}
      </text>

      <text class="num" x="470" y="310" font-size="14" fill="var(--fg)">R = 1.2·A^(1/3) = {{ fmt(R, 2) }} fm</text>
      <text x="470" y="330" font-size="12" fill="var(--muted)">{{ t('nucleus.radiusHint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
