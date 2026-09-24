<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Both isotopes decay by the same halving rule, but technetium-99m's 6-hour half-life clears the
// body within a couple of days (good for a scan, which wants activity gone once the picture is
// taken), while iodine-131's 8.02-day half-life keeps delivering a dose for weeks (good for
// treating an overactive or cancerous thyroid). Both curves are always drawn so the two half-lives
// can be compared directly; the "isotope" slider only picks which one the marker and readouts track.
// params: hours (0..48, since the tracer was made/injected), isotope (0 = Tc-99m, 1 = I-131).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800, H = 480
const ISOTOPES = [
  { nameKey: 'iso.name.tc', halfLife: 6, roleKey: 'iso.imaging', color: 'var(--accent)' },
  { nameKey: 'iso.name.i', halfLife: 192.48, roleKey: 'iso.treatment', color: 'var(--accent-2)' },
]

const hours = computed(() => Math.max(0, Math.min(48, props.params.hours ?? 6)))
const isotopeIdx = computed(() => (Math.round(props.params.isotope ?? 0) === 1 ? 1 : 0))
const active = computed(() => ISOTOPES[isotopeIdx.value])
const frac = (h: number, halfLife: number) => Math.pow(0.5, h / halfLife)
const activeFrac = computed(() => frac(hours.value, active.value.halfLife))

const CX0 = 70, CX1 = 760, CY0 = 60, CY1 = 420
const xh = (h: number) => CX0 + (h / 48) * (CX1 - CX0)
const yf = (f: number) => CY1 - f * (CY1 - CY0)
const N = 49
const curve = (halfLife: number) => Array.from({ length: N }, (_, i) => `${i ? 'L' : 'M'}${xh(i).toFixed(1)},${yf(frac(i, halfLife)).toFixed(1)}`).join(' ')

const readouts = computed(() => [
  { label: t('iso.isotopeLabel'), value: t(active.value.nameKey as any), color: active.value.color },
  { label: t('iso.halfLife'), value: active.value.halfLife < 24 ? `${fmt(active.value.halfLife, 1)} h` : `${fmt(active.value.halfLife / 24, 2)} d` },
  { label: t('iso.remaining'), value: `${fmt(activeFrac.value * 100, 1)}%`, color: 'var(--pos)' },
  { label: t('iso.doseDrop'), value: `${fmt((1 - activeFrac.value) * 100, 1)}%` },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('iso.hint') }}</text>

      <rect :x="CX0" :y="CY0" :width="xh(24) - CX0" :height="CY1 - CY0" fill="var(--sunken)" opacity="0.5" />
      <text :x="CX0 + 4" :y="CY0 + 14" font-size="10" fill="var(--muted)">{{ t('iso.scanWindow') }}</text>

      <line :x1="CX0" :x2="CX1" :y1="CY1" :y2="CY1" stroke="var(--muted)" />
      <line :x1="CX0" :x2="CX0" :y1="CY0" :y2="CY1" stroke="var(--muted)" />
      <text :x="CX1" :y="CY1 + 20" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('iso.chartX') }}</text>
      <text :x="CX0 + 4" :y="CY0 - 8" font-size="11" fill="var(--muted)">{{ t('iso.chartY') }}</text>

      <path :d="curve(ISOTOPES[0].halfLife)" fill="none" :stroke="ISOTOPES[0].color" :stroke-width="isotopeIdx === 0 ? 2.5 : 1.5" :stroke-opacity="isotopeIdx === 0 ? 1 : 0.35" />
      <path :d="curve(ISOTOPES[1].halfLife)" fill="none" :stroke="ISOTOPES[1].color" :stroke-width="isotopeIdx === 1 ? 2.5 : 1.5" :stroke-opacity="isotopeIdx === 1 ? 1 : 0.35" stroke-dasharray="6 4" />
      <text :x="CX1 - 4" :y="yf(frac(48, ISOTOPES[0].halfLife)) - 8" text-anchor="end" font-size="11" :fill="ISOTOPES[0].color">{{ t(ISOTOPES[0].roleKey as any) }}</text>
      <text :x="CX1 - 4" :y="yf(frac(48, ISOTOPES[1].halfLife)) - 8" text-anchor="end" font-size="11" :fill="ISOTOPES[1].color">{{ t(ISOTOPES[1].roleKey as any) }}</text>

      <line :x1="xh(hours)" :x2="xh(hours)" :y1="CY0" :y2="CY1" stroke="var(--fg)" stroke-opacity="0.25" stroke-dasharray="3 3" />
      <circle :cx="xh(hours)" :cy="yf(activeFrac)" r="7" :fill="active.color" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
