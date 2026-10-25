<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// engineering/low-pass-filter. params fc (cutoff), x = input frequency. A signal enters the RC box
// at full swing and leaves squashed to |H| = 1/√(1+(f/fc)²) and shifted by φ = −atan(f/fc) — both
// waves are drawn live, with the Bode curve as an inset.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const fc = computed(() => Math.max(props.params.fc ?? 100, 1))
const f = computed(() => Math.max(props.params.x ?? 100, 1))
const mag = computed(() => 1 / Math.sqrt(1 + (f.value / fc.value) ** 2))
const dB = computed(() => 20 * Math.log10(mag.value))
const phi = computed(() => -Math.atan(f.value / fc.value))

const time = useAnimationClock()

const WAVE_Y = 250
const AMP = 54
const cycles = computed(() => 1.5 + (Math.log10(f.value) / 3) * 6) // 1.5 … 7.5 visible cycles
const wave = (x0: number, w: number, amp: number, shift: number) => {
  const out: string[] = []
  for (let i = 0; i <= 80; i++) {
    const u = i / 80
    out.push(`${x0 + u * w},${WAVE_Y - amp * Math.sin(2 * Math.PI * (cycles.value * u) - time.value * 3 + shift)}`)
  }
  return out.join(' ')
}
const inWave = computed(() => wave(40, 280, AMP, 0))
const outWave = computed(() => wave(480, 280, AMP * mag.value, phi.value))

// Bode magnitude inset (log-f axis), with fc flagged
const CH = { x: 490, y: 338, w: 280, h: 118 }
const bode = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 60; i++) {
    const ff = 10 ** ((i / 60) * 3) // 1 … 1000 Hz
    const d = 20 * Math.log10(1 / Math.sqrt(1 + (ff / fc.value) ** 2))
    out.push(`${CH.x + (i / 60) * CH.w},${CH.y + ((-d / 45) * CH.h || 0)}`)
  }
  return out.join(' ')
})
const fx = (ff: number) => CH.x + (Math.log10(Math.min(Math.max(ff, 1), 1000)) / 3) * CH.w

const readouts = computed(() => [
  { label: 'f', value: `${fmt(f.value, 0)} Hz`, color: 'var(--accent-2)' },
  { label: 'f_c', value: `${fmt(fc.value, 0)} Hz`, color: 'var(--accent)' },
  { label: '|H|', value: `${fmt(mag.value * 100, 1)}%` },
  { label: '20·log₁₀|H|', value: `${fmt(dB.value, 1)} dB`, color: dB.value <= -20 ? 'var(--neg)' : undefined },
  { label: 'φ', value: `${fmt((phi.value * 180) / Math.PI, 0)}°` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lpf.hint') }}</text>
      <!-- input wave → filter box → output wave -->
      <text x="180" y="130" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('lpf.in', { f: fmt(f, 0) }) }}</text>
      <polyline :points="inWave" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <rect x="350" :y="WAVE_Y - 48" width="100" height="96" rx="10" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
      <text x="400" :y="WAVE_Y - 14" text-anchor="middle" font-size="11" fill="var(--fg)">RC</text>
      <text x="400" :y="WAVE_Y + 6" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('lpf.box') }}</text>
      <text x="400" :y="WAVE_Y + 28" text-anchor="middle" font-size="10" fill="var(--accent)" class="num">f_c = {{ fmt(fc, 0) }} Hz</text>
      <text x="620" y="130" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('lpf.out', { h: fmt(mag * 100, 0) }) }}</text>
      <polyline :points="outWave" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <text v-if="Math.abs(f - fc) < fc * 0.06" x="400" :y="WAVE_Y + 78" text-anchor="middle" font-size="12" fill="var(--pos)" font-weight="600">{{ t('lpf.corner') }}</text>
      <!-- Bode inset -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <polyline :points="bode" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="fx(fc)" :y1="CH.y" :x2="fx(fc)" :y2="CH.y + CH.h" stroke="var(--pos)" stroke-dasharray="3 3" />
      <line :x1="fx(f)" :y1="CH.y" :x2="fx(f)" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <text :x="CH.x + 6" :y="CH.y + 14" font-size="10" fill="var(--muted)" class="num">|H| dB · 1–1000 Hz</text>
      <text x="170" y="400" font-size="11" fill="var(--muted)">{{ t('lpf.note') }}</text>
      <text x="400" :y="H - 6" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('lpf.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
