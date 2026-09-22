<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Particles fired one at a time through two slits. Each lands at one spot, yet the spots build stripes:
// the pattern of a wave. Switch on a detector that checks which slit each particle used and the stripes vanish.
// params d (slit separation), lam (wavelength), detector (0/1), rate.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const d = computed(() => props.params.d ?? 3)
const lam = computed(() => props.params.lam ?? 2)
const det = computed(() => (props.params.detector ?? 0) >= 0.5)
const rate = computed(() => props.params.rate ?? 40)
// y in [-1, 1] across the screen
const sinc2 = (u: number) => (Math.abs(u) < 1e-6 ? 1 : (Math.sin(u) / u) ** 2)
const intensity = (y: number) => {
  if (det.value) {
    const g = (c: number) => Math.exp(-((y - c) ** 2) / 0.02)
    return 0.5 * (g(-0.12 * d.value) + g(0.12 * d.value))
  }
  return Math.cos((Math.PI * y * d.value * 2.5) / lam.value) ** 2 * sinc2((Math.PI * y * 0.6 * 2.5) / lam.value)
}
const hits = ref<{ x: number; y: number }[]>([])
const BINS = 80
const hist = computed(() => { const h = Array(BINS).fill(0); for (const p of hits.value) h[Math.min(BINS - 1, Math.floor(((p.y + 1) / 2) * BINS))]++; return h })
const maxH = computed(() => Math.max(1, ...hist.value))
watch([d, lam, det], () => (hits.value = []))
let raf = 0
let last = 0
let acc = 0
function sample() {
  for (let k = 0; k < 200; k++) { const y = Math.random() * 2 - 1; if (Math.random() < intensity(y)) return y }
  return 0
}
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  acc += dt * rate.value
  while (acc > 1 && hits.value.length < 4000) { acc -= 1; hits.value.push({ x: Math.random(), y: sample() }) }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick); else for (let i = 0; i < 1500; i++) hits.value.push({ x: Math.random(), y: sample() }) })
onUnmounted(() => cancelAnimationFrame(raf))
const sy = (y: number) => 240 + y * 200
const readouts = computed(() => [
  { label: t('slit.count'), value: String(hits.value.length) },
  { label: t('slit.spacing'), value: det.value ? '—' : fmt(lam.value / (d.value * 2.5), 3), color: 'var(--accent-2)' },
  { label: t('slit.detector'), value: det.value ? t('slit.on') : t('slit.off'), color: det.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('slit.hint') }}</text>
      <circle cx="60" cy="240" r="16" fill="var(--accent)" /><text class="num" x="60" y="280" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('slit.source') }}</text>
      <rect x="240" y="40" width="14" :height="200 - 12 * d - 10" fill="var(--fg)" />
      <rect x="240" :y="240 - 12 * d + 10" width="14" :height="24 * d - 20" fill="var(--fg)" />
      <rect x="240" :y="240 + 12 * d + 10" width="14" :height="200 - 12 * d - 10" fill="var(--fg)" />
      <g v-if="det"><circle cx="275" :cy="240 - 12 * d" r="7" fill="var(--neg)" /><circle cx="275" :cy="240 + 12 * d" r="7" fill="var(--neg)" /><text class="num" x="290" y="60" font-size="11" fill="var(--neg)">{{ t('slit.watching') }}</text></g>
      <rect x="520" y="40" width="120" height="400" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(p, i) in hits" :key="i" :cx="522 + p.x * 116" :cy="sy(p.y)" r="1.6" fill="var(--accent-2)" fill-opacity="0.8" />
      <g transform="translate(660, 0)"><rect v-for="(n, i) in hist" :key="i" x="0" :y="40 + i * 5" :width="(n / maxH) * 120" height="4.5" fill="var(--accent)" fill-opacity="0.7" /></g>
      <text class="num" x="580" y="460" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('slit.screen') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
