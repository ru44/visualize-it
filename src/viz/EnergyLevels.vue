<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import { wavelengthColor, bandOf } from './color'
import Readouts from '../components/Readouts.vue'

// Hydrogen: the electron may only have energies Eₙ = −13.6 eV / n². Dropping from level ni to nf releases one
// photon of exactly the difference, so hydrogen glows in a few precise colours. params ni, nf.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const ni = computed(() => Math.max(2, Math.min(7, Math.round(props.params.ni ?? 3))))
const nf = computed(() => Math.max(1, Math.min(6, Math.round(props.params.nf ?? 2))))
const En = (n: number) => -13.6 / n ** 2
const valid = computed(() => ni.value > nf.value)
const dE = computed(() => En(ni.value) - En(nf.value))
const nm = computed(() => 1239.84 / dE.value)
const col = computed(() => wavelengthColor(nm.value))
const sy = (e: number) => 440 - ((e + 13.6) / 13.6) * 380
const series = computed(() => ['', 'lyman', 'balmer', 'paschen', 'brackett', 'pfund', 'humphreys'][nf.value])
const balmer = [3, 4, 5, 6].map((n) => 1239.84 / (En(n) - En(2)))
const readouts = computed(() =>
  valid.value
    ? [
        { label: t('levels.jump'), value: `n = ${ni.value} → ${nf.value}` },
        { label: t('levels.energy'), value: `${fmt(dE.value, 2)} eV`, color: 'var(--accent-2)' },
        { label: t('levels.wavelength'), value: `${fmt(nm.value, 0)} nm · ${t(`photo.${bandOf(nm.value)}` as any)}` },
        { label: t('levels.series'), value: t(`levels.${series.value}` as any) },
      ]
    : [{ label: t('levels.jump'), value: t('levels.pickLower'), color: 'var(--neg)' }],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('levels.hint') }}</text>
      <g v-for="n in 7" :key="n">
        <line x1="60" x2="420" :y1="sy(En(n))" :y2="sy(En(n))" :stroke="n === ni || n === nf ? 'var(--fg)' : 'var(--line)'" :stroke-width="n === ni || n === nf ? 2.5 : 1.5" />
        <text class="num" x="430" :y="sy(En(n)) + 4" font-size="11" fill="var(--muted)">n={{ n }} · {{ fmt(En(n), 2) }} eV</text>
      </g>
      <g v-if="valid">
        <line x1="200" x2="200" :y1="sy(En(ni))" :y2="sy(En(nf)) - 8" stroke="var(--accent)" stroke-width="3" />
        <path :d="`M192,${sy(En(nf)) - 14} L200,${sy(En(nf)) - 2} L208,${sy(En(nf)) - 14}`" fill="var(--accent)" />
        <circle cx="200" :cy="sy(En(ni))" r="7" fill="var(--accent)" />
        <path :d="`M215,${(sy(En(ni)) + sy(En(nf))) / 2} q8,-10 16,0 t16,0 t16,0 t16,0 t16,0 t16,0`" fill="none" :stroke="col" stroke-width="3" />
      </g>
      <!-- spectrum -->
      <g transform="translate(560, 120)" class="num" font-size="11">
        <text fill="var(--muted)">{{ t('levels.spectrum') }}</text>
        <rect v-for="k in 37" :key="k" :x="(k - 1) * 5" y="14" width="5" height="40" :fill="wavelengthColor(380 + (k - 1) * 10)" fill-opacity="0.25" />
        <rect v-for="(b, i) in balmer" :key="'b' + i" :x="((b - 380) / 370) * 185" y="14" width="3" height="40" :fill="wavelengthColor(b)" />
        <rect v-if="valid && nm >= 380 && nm <= 750" :x="((nm - 380) / 370) * 185 - 1" y="8" width="5" height="52" fill="none" stroke="var(--fg)" stroke-width="2" />
        <text y="74" fill="var(--muted)">380 nm</text><text x="185" y="74" text-anchor="end" fill="var(--muted)">750 nm</text>
        <text y="110" fill="var(--fg)">ΔE = 13.6 (1/{{ nf }}² − 1/{{ ni }}²)</text>
        <text y="132" fill="var(--fg)">λ = 1240 / ΔE</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
