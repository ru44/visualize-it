<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// biology/enzyme-kinetics. params Vmax, Km, x = [S]. Ten enzyme machines on a bench: the share of
// them busy at any moment is [S]/(Km+[S]), so the production meter traces Michaelis–Menten live —
// flooding the bench with substrate saturates the machines, not the rate formula.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const vmax = computed(() => Math.max(props.params.Vmax ?? 5, 0.1))
const km = computed(() => Math.max(props.params.Km ?? 2, 0.1))
const s = computed(() => Math.max(props.params.x ?? 3, 0))
const frac = computed(() => s.value / (km.value + s.value))
const v = computed(() => vmax.value * frac.value)
const busy = computed(() => Math.round(10 * frac.value))

const rnd = (i: number) => {
  const z = Math.sin(i * 12.9898) * 43758.5453
  return z - Math.floor(z)
}
const time = useAnimationClock()
const subs = computed(() => {
  const n = Math.min(Math.round(s.value * 2), 60)
  return Array.from({ length: n }, (_, i) => ({
    x: 70 + rnd(i) * 560,
    y: 70 + ((rnd(i + 0.5) * 190 + time.value * 10 + i) % 190),
  }))
})
const EX = (i: number) => 86 + i * 58

// the curve kept as a small inset, with today's point marked
const CH = { x: 540, y: 56, w: 230, h: 130 }
const pts = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 60; i++) {
    const ss = (i / 60) * 30
    out.push(`${CH.x + (ss / 30) * CH.w},${CH.y + CH.h - ((vmax.value * ss) / (km.value + ss) / 10) * CH.h}`)
  }
  return out.join(' ')
})

const readouts = computed(() => [
  { label: '[S]', value: fmt(s.value, 1), color: 'var(--accent-2)' },
  { label: t('enz.busy'), value: `${busy.value}/10 · ${fmt(frac.value * 100, 0)}%`, color: 'var(--accent)' },
  { label: 'v = Vmax·[S]/(Km+[S])', value: fmt(v.value, 2), color: 'var(--pos)' },
  { label: 'Vmax', value: fmt(vmax.value, 1) },
  { label: 'Km', value: fmt(km.value, 1) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('enz.hint') }}</text>
      <!-- substrate cloud -->
      <circle v-for="(d, i) in subs" :key="i" :cx="d.x" :cy="d.y" r="4" fill="var(--accent-2)" opacity="0.7" />
      <text x="70" y="52" font-size="11" fill="var(--muted)">{{ t('enz.cloud') }}</text>
      <!-- the bench of ten enzymes -->
      <line x1="60" y1="372" x2="680" y2="372" stroke="var(--line)" stroke-width="2" />
      <g v-for="i in 10" :key="'e' + i">
        <path :d="`M${EX(i - 1) - 20},372 a20,20 0 0 1 40,0`" :fill="i <= busy ? 'var(--accent)' : 'var(--sunken)'" :stroke="i <= busy ? 'none' : 'var(--line)'" />
        <circle v-if="i <= busy" :cx="EX(i - 1)" :cy="346" r="6" fill="var(--accent-2)" />
        <text v-if="i <= busy" :x="EX(i - 1) + 12" :y="334 - ((time * 30 + i * 13) % 26)" font-size="11" fill="var(--pos)" class="num">+</text>
      </g>
      <text x="370" y="400" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('enz.bench', { n: busy }) }}</text>
      <!-- production meter -->
      <rect x="712" y="212" width="26" height="180" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="712" :y="212 + 180 - (v / 10) * 180" width="26" :height="(v / 10) * 180" rx="6" fill="var(--pos)" />
      <text x="725" y="410" text-anchor="middle" font-size="10" fill="var(--muted)">v</text>
      <text x="725" y="206" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ fmt(v, 1) }}</text>
      <!-- the Michaelis–Menten curve, kept as an inset -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <polyline :points="pts" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="CH.x + (Math.min(s, 30) / 30) * CH.w" :y1="CH.y" :x2="CH.x + (Math.min(s, 30) / 30) * CH.w" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <circle :cx="CH.x + (Math.min(s, 30) / 30) * CH.w" :cy="CH.y + CH.h - (v / 10) * CH.h" r="4" fill="var(--accent-2)" />
      <text :x="CH.x + 6" :y="CH.y + 14" font-size="10" fill="var(--muted)" class="num">v([S])</text>
      <text v-if="Math.abs(s - km) < 0.26" x="370" y="436" text-anchor="middle" font-size="12" fill="var(--pos)" font-weight="600">{{ t('enz.half') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('enz.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
