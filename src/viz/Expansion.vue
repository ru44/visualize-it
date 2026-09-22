<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The expanding universe. Galaxies do not fly through space; space between them grows by the scale factor a(t).
// The Friedmann equation gives a(t) from how much matter (Ωm) and dark energy (ΩΛ) there is.
// params om, ol, tView (0..1 of the time shown). Dashed curve: the same universe without dark energy.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const om = computed(() => props.params.om ?? 0.3)
const ol = computed(() => props.params.ol ?? 0.7)
const tv = computed(() => Math.max(0, Math.min(1, props.params.tView ?? 0.6)))
// integrate da/dt = sqrt(Ωm/a + ΩΛ a² + Ωk), time in units of 1/H0, from a tiny a
function history(m: number, l: number) {
  const k = 1 - m - l
  const out: { t: number; a: number }[] = []
  let a = 0.02, tt = 0
  const dt = 0.004
  while (tt < 2.2 && a < 6) {
    const rate = m / a + l * a * a + k
    if (rate <= 0) break
    a += Math.sqrt(rate) * dt
    tt += dt
    out.push({ t: tt, a })
  }
  return out
}
const main = computed(() => history(om.value, ol.value))
const noDE = computed(() => history(om.value, 0))
const tMax = 2.2
const now = computed(() => main.value[Math.min(main.value.length - 1, Math.round(tv.value * (main.value.length - 1)))])
const accel = computed(() => { const i = Math.round(tv.value * (main.value.length - 1)); const p = main.value; if (i < 2 || i > p.length - 2) return 0; return p[i + 1].a - 2 * p[i].a + p[i - 1].a })
const galaxies = Array.from({ length: 26 }, (_, i) => ({ x: ((i * 0.6180339) % 1) * 2 - 1, y: ((i * 0.41421356) % 1) * 2 - 1 }))
const gx = (x: number) => 200 + x * 160 * Math.min(1.25, now.value.a / 1.2)
const gy = (y: number) => 240 + y * 160 * Math.min(1.25, now.value.a / 1.2)
const px = (tt: number) => 440 + (tt / tMax) * 320
const py = (a: number) => 420 - (Math.min(a, 4) / 4) * 330
const curve = (h: { t: number; a: number }[]) => h.filter((_, i) => i % 3 === 0).map((p, i) => `${i ? 'L' : 'M'}${px(p.t).toFixed(1)},${py(p.a).toFixed(1)}`).join('')
const readouts = computed(() => [
  { label: t('exp.scale'), value: fmt(now.value.a, 2), color: 'var(--accent-2)' },
  { label: t('exp.time'), value: `${fmt((now.value.t * 14.4), 1)} ${t('exp.billionYears')}` },
  { label: t('exp.state'), value: accel.value > 1e-7 ? t('exp.speedingUp') : t('exp.slowingDown'), color: accel.value > 1e-7 ? 'var(--neg)' : 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('exp.hint') }}</text>
      <rect x="30" y="70" width="340" height="340" rx="12" fill="#0b0f1a" />
      <g v-for="(g, i) in galaxies" :key="i"><ellipse :cx="gx(g.x)" :cy="gy(g.y)" rx="7" ry="3" :transform="`rotate(${i * 37} ${gx(g.x)} ${gy(g.y)})`" fill="#ffd9a0" :fill-opacity="gx(g.x) > 30 && gx(g.x) < 370 && gy(g.y) > 70 && gy(g.y) < 410 ? 0.9 : 0" /></g>
      <circle cx="200" cy="240" r="4" fill="#7fd1ff" /><text class="num" x="208" y="236" font-size="10" fill="#7fd1ff">{{ t('exp.us') }}</text>
      <line x1="440" x2="760" y1="420" y2="420" stroke="var(--muted)" /><line x1="440" x2="440" y1="80" y2="420" stroke="var(--muted)" />
      <text class="num" x="760" y="440" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('exp.timeAxis') }}</text>
      <text class="num" x="446" y="92" font-size="11" fill="var(--muted)">{{ t('exp.sizeAxis') }}</text>
      <path :d="curve(noDE)" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 4" />
      <path :d="curve(main)" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <circle :cx="px(now.t)" :cy="py(now.a)" r="6" fill="var(--accent-2)" />
      <g class="num" font-size="11"><text x="460" y="112" fill="var(--accent-2)">— Ωm = {{ fmt(om, 2) }}, ΩΛ = {{ fmt(ol, 2) }}</text><text x="460" y="130" fill="var(--accent)">- - {{ t('exp.withoutDE') }}</text></g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
