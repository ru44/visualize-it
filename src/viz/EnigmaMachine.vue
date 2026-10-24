<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A real Enigma signal path: keyboard → three rotors → reflector → back through the rotors → lamp.
// Historic wirings (rotors I, II, III and reflector B). params r1, r2, r3 are the rotor windows
// (0..25) and `letter` is the key being pressed. Click a letter on the keyboard column to press it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ROTORS = ['EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 'BDFHJLCPRTXVZNYEIWGAKMUSQO']
const REFL = 'YRUHQSLDPXNGOKMIEBFZCWVJAT'
const inv = (w: string) => A.split('').map((c) => A[w.indexOf(c)]).join('')
const INV = ROTORS.map(inv)
const r = computed(() => [props.params.r1 ?? 0, props.params.r2 ?? 0, props.params.r3 ?? 0].map((v) => ((Math.round(v) % 26) + 26) % 26))
const letter = computed(() => Math.max(0, Math.min(25, Math.round(props.params.letter ?? 0))))
const fwd = (c: number, w: string, p: number) => (A.indexOf(w[(c + p) % 26]) - p + 26) % 26
// the full trip: right rotor (3) first, reflector, then back left to right
const trip = computed(() => {
  const steps = [letter.value]
  let c = letter.value
  for (let i = 2; i >= 0; i--) steps.push((c = fwd(c, ROTORS[i], r.value[i])))
  steps.push((c = A.indexOf(REFL[c])))
  for (let i = 0; i < 3; i++) steps.push((c = fwd(c, INV[i], r.value[i])))
  return steps // [in, after R3, after R2, after R1, after reflector, back R1, back R2, back R3=out]
})
const out = computed(() => trip.value[7])
// column x for each stage; y encodes the letter at that stage
const COLS = [700, 545, 420, 295, 170, 295, 420, 545, 700]
const Y = (c: number) => 64 + c * (360 / 25)
const pts = computed(() => trip.value.map((c, i) => `${COLS[i]},${Y(c)}`))
const readouts = computed(() => [
  { label: t('enigma.rotors'), value: r.value.map((p) => A[p]).join(' '), color: 'var(--accent-2)' },
  { label: t('enigma.in'), value: A[letter.value], color: 'var(--accent)' },
  { label: t('enigma.out'), value: A[out.value], color: 'var(--accent-2)' },
  { label: t('enigma.mirror'), value: `${A[out.value]} → ${A[letter.value]}` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('enigma.hint') }}</text>
      <!-- rotor boxes with their window letter -->
      <g v-for="(x, i) in [295, 420, 545]" :key="i">
        <rect :x="x - 38" y="40" width="76" height="400" rx="10" fill="var(--sunken)" stroke="var(--line)" />
        <rect :x="x - 16" y="24" width="32" height="26" rx="5" fill="var(--panel)" stroke="var(--accent-2)" />
        <text :x="x" y="42" text-anchor="middle" font-size="14" fill="var(--accent-2)" class="num">{{ A[r[i]] }}</text>
        <text :x="x" y="460" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('enigma.rotor', { n: ['I', 'II', 'III'][i] }) }}</text>
      </g>
      <rect x="140" y="40" width="60" height="400" rx="10" fill="var(--panel)" stroke="var(--line)" />
      <text x="170" y="460" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('enigma.reflector') }}</text>
      <!-- keyboard / lamp column -->
      <g v-for="i in 26" :key="'k' + i" class="num cursor-pointer" @pointerdown="emit('set', 'letter', i - 1)">
        <circle cx="700" :cy="Y(i - 1)" r="7" :fill="i - 1 === letter ? 'var(--accent)' : i - 1 === out ? 'var(--accent-2)' : 'var(--panel)'" stroke="var(--line)" />
        <text x="700" :y="Y(i - 1) + 3.5" text-anchor="middle" font-size="9" :fill="i - 1 === letter || i - 1 === out ? '#fff' : 'var(--fg)'">{{ A[i - 1] }}</text>
      </g>
      <text x="700" y="460" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('enigma.keyboard') }}</text>
      <!-- the signal: in (solid) and back out (dashed) -->
      <polyline :points="pts.slice(0, 5).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <polyline :points="pts.slice(4).join(' ')" fill="none" stroke="var(--accent-2)" stroke-width="2.5" stroke-dasharray="7 4" />
      <text x="740" :y="Y(letter) + 4" font-size="12" fill="var(--accent)" class="num">{{ A[letter] }} ⌨</text>
      <text x="740" :y="Y(out) + 4" font-size="12" fill="var(--accent-2)" class="num">{{ A[out] }} 💡</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
