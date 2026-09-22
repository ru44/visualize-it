<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import { wavelengthColor, bandOf } from './color'
import Readouts from '../components/Readouts.vue'

// Light as a stream of photons, each carrying E = h·f. Electrons leave the metal only if one photon has enough
// energy (more than the work function φ); brighter light means more photons, not stronger ones.
// params f (×10¹⁴ Hz), phi (eV), I (brightness 1..10).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const H_EV = 4.135667e-15 // Planck's constant in eV·s
const f = computed(() => props.params.f ?? 6)
const phi = computed(() => props.params.phi ?? 2.3)
const I = computed(() => Math.round(props.params.I ?? 5))
const E = computed(() => H_EV * f.value * 1e14)
const KE = computed(() => E.value - phi.value)
const nm = computed(() => 299.792458 / f.value * 10) // c / f in nm (f in 1e14 Hz)
const col = computed(() => wavelengthColor(nm.value))
const photons = ref<{ x: number; y: number }[]>([])
const electrons = ref<{ x: number; y: number; vx: number; vy: number }[]>([])
let raf = 0
let last = 0
let acc = 0
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  acc += dt * I.value * 3
  while (acc > 1) { acc -= 1; photons.value.push({ x: 60, y: 120 + Math.random() * 240 }) }
  const next: { x: number; y: number }[] = []
  for (const p of photons.value) {
    p.x += 420 * dt
    p.y += 60 * dt
    if (p.x >= 470) { if (KE.value > 0) electrons.value.push({ x: 470, y: p.y, vx: -(60 + 180 * Math.sqrt(KE.value)) * (0.6 + Math.random() * 0.4), vy: (Math.random() - 0.5) * 120 }) }
    else next.push(p)
  }
  photons.value = next
  electrons.value = electrons.value.map((e) => ({ ...e, x: e.x + e.vx * dt, y: e.y + e.vy * dt })).filter((e) => e.x > 200 && e.y > 40 && e.y < 460)
  raf = requestAnimationFrame(tick)
}
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const readouts = computed(() => [
  { label: t('photo.wavelength'), value: `${fmt(nm.value, 0)} nm · ${t(`photo.${bandOf(nm.value)}` as any)}` },
  { label: t('photo.energy'), value: `${fmt(E.value, 2)} eV`, color: 'var(--accent-2)' },
  { label: t('photo.work'), value: `${fmt(phi.value, 2)} eV` },
  { label: t('photo.ke'), value: KE.value > 0 ? `${fmt(KE.value, 2)} eV` : t('photo.none'), color: KE.value > 0 ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('photo.hint') }}</text>
      <rect x="20" y="200" width="40" height="80" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <circle cx="40" cy="240" r="14" :fill="col" />
      <text class="num" x="40" y="300" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('photo.lamp') }}</text>
      <path v-for="(p, i) in photons" :key="'p' + i" :d="`M${p.x - 14},${p.y} q3.5,-6 7,0 t7,0`" fill="none" :stroke="col" stroke-width="2.5" />
      <rect x="470" y="80" width="46" height="320" fill="var(--muted)" fill-opacity="0.55" />
      <text class="num" x="493" y="420" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('photo.metal') }} · φ = {{ fmt(phi, 1) }} eV</text>
      <circle v-for="(e, i) in electrons" :key="'e' + i" :cx="e.x" :cy="e.y" r="5" fill="var(--accent)" />
      <text v-if="KE <= 0" class="num" x="330" y="440" text-anchor="middle" font-size="14" fill="var(--neg)">{{ t('photo.nothing') }}</text>
      <!-- energy bar -->
      <g transform="translate(580, 90)" class="num" font-size="12">
        <text fill="var(--muted)">{{ t('photo.onePhoton') }}</text>
        <rect y="16" :width="Math.min(180, E * 36)" height="26" rx="4" fill="var(--accent-2)" />
        <line :x1="phi * 36" :x2="phi * 36" y1="10" y2="50" stroke="var(--neg)" stroke-width="2" stroke-dasharray="4 3" />
        <text :x="phi * 36 + 4" y="64" fill="var(--neg)">φ</text>
        <text y="100" fill="var(--muted)">E = h·f</text>
        <text y="124" fill="var(--fg)">= 4.14×10⁻¹⁵ × {{ fmt(f, 1) }}×10¹⁴</text>
        <text y="148" fill="var(--accent-2)">= {{ fmt(E, 2) }} eV</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
