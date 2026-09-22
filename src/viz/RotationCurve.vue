<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// How dark matter was found: stars far from a galaxy's centre orbit as fast as those near it. The visible stars and
// gas cannot pull that hard, so there must be extra, invisible mass. Adjust the dark halo until the model meets the
// measured points. params halo (dark mass, arbitrary units 0..10), r (the star you follow, kpc).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const G = 4.3e-6 // kpc·(km/s)²/M☉
const M_VIS = 6e10
const RD = 3
const mVis = (r: number) => M_VIS * (1 - Math.exp(-r / RD) * (1 + r / RD))
const vVis = (r: number) => Math.sqrt((G * mVis(r)) / Math.max(r, 0.01))
const vTot = (r: number, halo: number) => Math.sqrt(vVis(r) ** 2 + G * halo * 1e9)
const halo = computed(() => props.params.halo ?? 0)
const rStar = computed(() => props.params.r ?? 15)
const TRUE_HALO = 5
const measured = Array.from({ length: 10 }, (_, i) => { const r = 2 + i * 3; return { r, v: vTot(r, TRUE_HALO) * (1 + Math.sin(i * 7.3) * 0.03) } })
const miss = computed(() => Math.sqrt(measured.reduce((s, p) => s + (vTot(p.r, halo.value) - p.v) ** 2, 0) / measured.length))
const darkShare = computed(() => { const r = 30; const dm = halo.value * 1e9 * r; return dm / (dm + mVis(r)) })
const px = (r: number) => 420 + (r / 30) * 340
const py = (v: number) => 420 - (v / 260) * 340
const curve = (f: (r: number) => number) => Array.from({ length: 121 }, (_, i) => { const r = 0.25 + (i / 120) * 29.75; return `${i ? 'L' : 'M'}${px(r).toFixed(1)},${py(f(r)).toFixed(1)}` }).join('')
const angle = ref(0)
let raf = 0
let last = 0
function tick(now: number) { angle.value += (Math.min(now - last, 50) / 1000) * 0.6; last = now; raf = requestAnimationFrame(tick) }
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const stars = Array.from({ length: 260 }, (_, i) => { const r = 30 * Math.pow(((i * 0.618) % 1) * 0.95 + 0.02, 1.4); return { r, a: i * 2.39996 } })
const gx = (r: number, a: number) => 200 + (r / 30) * 170 * Math.cos(a)
const gy = (r: number, a: number) => 240 + (r / 30) * 170 * Math.sin(a) * 0.45
const readouts = computed(() => [
  { label: t('rot.speedVisible', { r: fmt(rStar.value, 0) }), value: `${fmt(vVis(rStar.value), 0)} km/s`, color: 'var(--accent)' },
  { label: t('rot.speedModel'), value: `${fmt(vTot(rStar.value, halo.value), 0)} km/s`, color: 'var(--accent-2)' },
  { label: t('rot.miss'), value: `${fmt(miss.value, 1)} km/s`, color: miss.value < 8 ? 'var(--pos)' : 'var(--neg)' },
  { label: t('rot.darkShare'), value: `${fmt(darkShare.value * 100, 0)} %` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('rot.hint') }}</text>
      <ellipse cx="200" cy="240" :rx="175 + halo * 4" :ry="(175 + halo * 4) * 0.55" fill="var(--accent-2)" :fill-opacity="0.03 * halo" stroke="var(--accent-2)" :stroke-opacity="0.15 * Math.min(1, halo)" stroke-dasharray="5 5" />
      <circle v-for="(s, i) in stars" :key="i" :cx="gx(s.r, s.a + (angle * vTot(Math.max(s.r, 0.5), halo)) / Math.max(s.r, 0.5) / 60)" :cy="gy(s.r, s.a + (angle * vTot(Math.max(s.r, 0.5), halo)) / Math.max(s.r, 0.5) / 60)" :r="s.r < 3 ? 2 : 1.3" fill="var(--fg)" :fill-opacity="0.35 + 0.6 * Math.exp(-s.r / 8)" />
      <circle :cx="gx(rStar, angle * vTot(rStar, halo) / rStar / 60)" :cy="gy(rStar, angle * vTot(rStar, halo) / rStar / 60)" r="6" fill="var(--accent-2)" />
      <line x1="420" x2="760" y1="420" y2="420" stroke="var(--muted)" /><line x1="420" x2="420" y1="80" y2="420" stroke="var(--muted)" />
      <text class="num" x="760" y="440" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('rot.distance') }}</text>
      <text class="num" x="426" y="90" font-size="11" fill="var(--muted)">{{ t('rot.speed') }}</text>
      <path :d="curve(vVis)" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 4" />
      <path :d="curve((r) => vTot(r, halo))" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <g v-for="(p, i) in measured" :key="i"><circle :cx="px(p.r)" :cy="py(p.v)" r="5" fill="var(--fg)" /><line :x1="px(p.r)" :x2="px(p.r)" :y1="py(p.v * 1.04)" :y2="py(p.v * 0.96)" stroke="var(--fg)" /></g>
      <line :x1="px(rStar)" :x2="px(rStar)" y1="80" y2="420" stroke="var(--accent-2)" stroke-opacity="0.35" />
      <g class="num" font-size="11" text-anchor="end"><text x="755" y="98" fill="var(--fg)">● {{ t('rot.measured') }}</text><text x="755" y="114" fill="var(--accent)">- - {{ t('rot.visibleOnly') }}</text><text x="755" y="130" fill="var(--accent-2)">— {{ t('rot.withDark') }}</text></g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
