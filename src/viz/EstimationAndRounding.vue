<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A Fermi estimate: scalp area x hair density = N, shown as a schematic dotted patch on the left,
// then rounded to s significant figures on the right, with the digits beyond s fading to grey.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const sep = (n: number) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')

const A = computed(() => Math.max(1, props.params.A ?? 500))
const rho = computed(() => Math.max(1, props.params.rho ?? 200))
const s = computed(() => Math.min(6, Math.max(1, Math.round(props.params.s ?? 1))))
const N = computed(() => A.value * rho.value)
const digits = computed(() => Math.floor(Math.log10(N.value)) + 1)
const rounded = computed(() => {
  const drop = Math.max(0, digits.value - s.value)
  const p = 10 ** drop
  return Math.round(N.value / p) * p
})
const magnitude = computed(() => Math.floor(Math.log10(N.value)))

// ---- schematic patch: rectangle sized by A, tiled with dots whose spacing reflects rho
const patchW = computed(() => 90 + ((A.value - 300) / 400) * 160)
const patchH = 150
const cols = computed(() => Math.min(12, Math.max(4, Math.round(rho.value / 25))))
const rows = 6
const dots = computed(() => {
  const out: { x: number; y: number }[] = []
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols.value; c++)
      out.push({ x: (patchW.value / cols.value) * (c + 0.5), y: (patchH / rows) * (r + 0.5) })
  return out
})

// ---- digit rendering: which digits of N stay sharp (first s significant digits)
const digitInfo = computed(() => {
  const str = sep(rounded.value)
  let seen = 0
  return [...str].map((ch) => {
    if (!/\d/.test(ch)) return { ch, kept: true }
    seen++
    return { ch, kept: seen <= s.value }
  })
})

const readouts = computed(() => [
  { label: t('fermi.estimate'), value: sep(N.value), color: 'var(--muted)' },
  { label: t('fermi.rounded'), value: sep(rounded.value), color: 'var(--accent)' },
  { label: t('fermi.magnitude'), value: `~10^${magnitude.value}`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fermi.hint') }}</text>

      <text x="40" y="60" font-size="13" fill="var(--muted)">{{ t('fermi.area') }}: {{ A }} cm² × {{ t('fermi.density') }}: {{ rho }} /cm²</text>
      <rect x="40" y="75" :width="patchW" :height="patchH" fill="var(--sunken)" stroke="var(--line)" stroke-width="1.5" rx="8" />
      <g transform="translate(40, 75)">
        <circle v-for="(p, i) in dots" :key="i" :cx="p.x" :cy="p.y" r="4" fill="var(--accent)" fill-opacity="0.75" />
      </g>
      <text x="40" y="260" font-size="14" fill="var(--fg)">{{ A }} × {{ rho }} = {{ sep(N) }}</text>

      <text x="440" y="60" font-size="13" fill="var(--muted)">{{ t('fermi.headline') }}</text>
      <text class="num" x="440" y="140" font-size="46" font-weight="600">
        <tspan v-for="(d, i) in digitInfo" :key="i" :fill="d.kept ? 'var(--fg)' : 'var(--line)'">{{ d.ch }}</tspan>
      </text>
      <text x="440" y="175" font-size="13" fill="var(--muted)">{{ t('fermi.sigfig', { s: String(s) }) }}</text>

      <text x="440" y="230" font-size="13" fill="var(--muted)">{{ t('fermi.scale') }}</text>
      <line x1="440" x2="760" y1="260" y2="260" stroke="var(--line)" stroke-width="2" />
      <g v-for="k in 7" :key="k">
        <line :x1="440 + ((k - 1) / 6) * 320" :x2="440 + ((k - 1) / 6) * 320" y1="254" y2="266" stroke="var(--muted)" stroke-width="1.5" />
        <text :x="440 + ((k - 1) / 6) * 320" y="284" text-anchor="middle" font-size="11" fill="var(--muted)">10^{{ k }}</text>
      </g>
      <circle :cx="440 + ((Math.min(6, Math.max(1, magnitude)) - 1) / 6) * 320" cy="260" r="8" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
