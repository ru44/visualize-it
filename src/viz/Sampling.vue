<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A signal sin(2π f t) sampled at fs; the reconstruction from the samples shows aliasing below the Nyquist rate.
// params f (Hz), fs (Hz).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD = { l: 40, r: 20, t: 30, b: 40 }
const T = 2 // seconds shown
const f = computed(() => props.params.f ?? 3)
const fs = computed(() => props.params.fs ?? 20)
const sx = (tt: number) => PAD.l + (tt / T) * (W - PAD.l - PAD.r)
const sy = (v: number) => H / 2 - v * (H - PAD.t - PAD.b) * 0.42
const signal = computed(() => Array.from({ length: 801 }, (_, i) => { const tt = (T * i) / 800; return `${i ? 'L' : 'M'}${sx(tt).toFixed(1)},${sy(Math.sin(2 * Math.PI * f.value * tt)).toFixed(1)}` }).join(''))
const samples = computed(() => Array.from({ length: Math.floor(T * fs.value) + 1 }, (_, n) => { const tt = n / fs.value; return { x: sx(tt), y: sy(Math.sin(2 * Math.PI * f.value * tt)), tt } }))
// The frequency the samples appear to have: folded into [0, fs/2]
const alias = computed(() => {
  const r = ((f.value % fs.value) + fs.value) % fs.value
  return Math.min(r, fs.value - r)
})
const recon = computed(() => {
  // sinc (Whittaker–Shannon) reconstruction from the visible samples
  const s = samples.value
  const pts: string[] = []
  for (let i = 0; i <= 400; i++) {
    const tt = (T * i) / 400
    let v = 0
    for (const smp of s) { const u = Math.PI * fs.value * (tt - smp.tt); v += Math.sin(2 * Math.PI * f.value * smp.tt) * (Math.abs(u) < 1e-9 ? 1 : Math.sin(u) / u) }
    pts.push(`${i ? 'L' : 'M'}${sx(tt).toFixed(1)},${sy(v).toFixed(1)}`)
  }
  return pts.join('')
})
const ok = computed(() => fs.value > 2 * f.value)
const readouts = computed(() => [
  { label: t('sampling.f'), value: fmt(f.value, 2) + ' Hz', color: 'var(--accent)' },
  { label: t('sampling.fs'), value: fmt(fs.value, 1) + ' Hz' },
  { label: t('sampling.nyquist'), value: fmt(fs.value / 2, 1) + ' Hz' },
  { label: t('sampling.seen'), value: fmt(alias.value, 2) + ' Hz', color: ok.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('sampling.hint') }}</text>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <path :d="signal" fill="none" stroke="var(--accent)" stroke-width="2" stroke-opacity="0.45" />
      <path :d="recon" fill="none" :stroke="ok ? 'var(--pos)' : 'var(--neg)'" stroke-width="2.5" />
      <g v-for="(s, i) in samples" :key="i">
        <line :x1="s.x" :x2="s.x" :y1="sy(0)" :y2="s.y" stroke="var(--fg)" stroke-opacity="0.5" />
        <circle :cx="s.x" :cy="s.y" r="4" fill="var(--fg)" />
      </g>
      <g class="num" font-size="12">
        <text :x="W - PAD.r" :y="PAD.t + 4" text-anchor="end" fill="var(--accent)">{{ t('sampling.original') }}</text>
        <text :x="W - PAD.r" :y="PAD.t + 22" text-anchor="end" :fill="ok ? 'var(--pos)' : 'var(--neg)'">{{ ok ? t('sampling.recovered') : t('sampling.aliased') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
