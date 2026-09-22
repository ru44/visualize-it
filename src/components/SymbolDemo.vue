<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { kinds } from './symbolDemos'

// Small self-running pictures that show what a symbol does. Keyed by the notation token.
const props = defineProps<{ token: string }>()
const t = ref(0)
let raf = 0
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return (t.value = 1.2)
  let last = performance.now()
  const loop = (now: number) => {
    t.value += Math.min(now - last, 50) / 1000
    last = now
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})
onUnmounted(() => cancelAnimationFrame(raf))

const kind = computed(() => kinds[props.token])

const W = 220
const H = 120
const th = computed(() => (t.value * 0.7) % (2 * Math.PI))
const fmt = (v: number, d = 2) => v.toFixed(d)
// machine: cycles through example inputs
const idx = computed(() => Math.floor(t.value / 1.6) % 3)
const machine = computed(() => {
  const ex: Record<string, [string, string][]> = {
    '\\log': [['10', '1'], ['100', '2'], ['1000', '3']],
    '\\ln': [['1', '0'], ['e ≈ 2.72', '1'], ['e² ≈ 7.39', '2']],
    '\\exp': [['0', '1'], ['1', '2.72'], ['2', '7.39']],
  }
  return (ex[props.token] ?? ex['\\log'])[idx.value]
})
const approach = computed(() => 1 / (1 + ((t.value * 1.2) % 3)))
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="block h-[120px] w-[220px] shrink-0 rounded-lg" style="background: var(--sunken)">
    <!-- unit circle -->
    <template v-if="kind === 'trig'">
      <circle cx="60" cy="60" r="42" fill="none" stroke="var(--line)" />
      <line x1="60" y1="60" :x2="60 + 42 * Math.cos(th)" :y2="60 - 42 * Math.sin(th)" stroke="var(--fg)" />
      <line :x1="60 + 42 * Math.cos(th)" y1="60" :x2="60 + 42 * Math.cos(th)" :y2="60 - 42 * Math.sin(th)" stroke="var(--pos)" stroke-width="3" />
      <line x1="60" y1="60" :x2="60 + 42 * Math.cos(th)" y2="60" stroke="var(--accent)" stroke-width="3" />
      <circle :cx="60 + 42 * Math.cos(th)" :cy="60 - 42 * Math.sin(th)" r="4" fill="var(--fg)" />
      <g class="num" font-size="11">
        <text x="120" y="40" fill="var(--muted)">θ = {{ fmt((th * 180) / Math.PI, 0) }}°</text>
        <text x="120" y="62" fill="var(--accent)">cos θ = {{ fmt(Math.cos(th)) }}</text>
        <text x="120" y="84" fill="var(--pos)">sin θ = {{ fmt(Math.sin(th)) }}</text>
        <text v-if="token === '\\tan'" x="120" y="106" fill="var(--accent-2)">tan θ = {{ Math.abs(Math.cos(th)) < 0.08 ? '→ ∞' : fmt(Math.tan(th)) }}</text>
      </g>
    </template>
    <!-- input → output machine -->
    <template v-else-if="kind === 'machine'">
      <rect x="10" y="40" width="60" height="40" rx="8" fill="var(--panel)" stroke="var(--line)" />
      <text class="num" x="40" y="65" text-anchor="middle" font-size="12" fill="var(--fg)">{{ machine[0] }}</text>
      <path d="M74,60 h26" stroke="var(--muted)" marker-end="none" /><path d="M96,55 l6,5 -6,5" fill="none" stroke="var(--muted)" />
      <rect x="104" y="34" width="52" height="52" rx="10" fill="var(--accent)" />
      <text class="num" x="130" y="65" text-anchor="middle" font-size="13" fill="#fff">{{ token === '\\log' ? 'log' : token === '\\ln' ? 'ln' : 'exp' }}</text>
      <path d="M160,60 h26" stroke="var(--muted)" /><path d="M182,55 l6,5 -6,5" fill="none" stroke="var(--muted)" />
      <text class="num" x="205" y="65" text-anchor="middle" font-size="13" fill="var(--accent-2)">{{ machine[1] }}</text>
      <text class="num" x="110" y="108" text-anchor="middle" font-size="10" fill="var(--muted)">{{ token === '\\exp' ? 'e × e × … (input times)' : token === '\\log' ? 'how many 10s multiply to it?' : 'how many e’s multiply to it?' }}</text>
    </template>
    <template v-else-if="kind === 'e'">
      <text class="num" x="110" y="45" text-anchor="middle" font-size="12" fill="var(--fg)">(1 + 1/n)ⁿ → e</text>
      <g class="num" font-size="10" fill="var(--muted)"><text x="20" y="75">n = 1: 2</text><text x="90" y="75">n = 10: 2.59</text><text x="20" y="95">n = 1000: 2.717</text><text x="120" y="95" fill="var(--accent-2)">→ 2.71828…</text></g>
    </template>
    <template v-else-if="kind === 'sqrt'">
      <rect x="20" y="30" width="60" height="60" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" />
      <text class="num" x="50" y="64" text-anchor="middle" font-size="12" fill="var(--fg)">area 9</text>
      <text class="num" x="50" y="106" text-anchor="middle" font-size="11" fill="var(--accent-2)">side √9 = 3</text>
      <text class="num" x="150" y="55" text-anchor="middle" font-size="12" fill="var(--fg)">3 × 3 = 9</text>
      <text class="num" x="150" y="78" text-anchor="middle" font-size="12" fill="var(--muted)">so √9 = 3</text>
    </template>
    <!-- sum: bars stacking -->
    <template v-else-if="kind === 'sum'">
      <g v-for="i in 4" :key="i"><rect :x="20 + (i - 1) * 32" :y="100 - i * 14" width="24" :height="i * 14" fill="var(--accent)" fill-opacity="0.6" /><text class="num" :x="32 + (i - 1) * 32" y="112" text-anchor="middle" font-size="10" fill="var(--muted)">{{ i }}</text></g>
      <text class="num" x="160" y="50" text-anchor="middle" font-size="12" fill="var(--fg)">Σ = 1+2+3+4</text>
      <rect x="150" y="60" width="24" :height="Math.min(56, 10 * 4 * Math.min(1, (t % 3) / 1.5))" fill="var(--accent-2)" />
      <text class="num" x="190" y="100" text-anchor="middle" font-size="13" fill="var(--accent-2)">= 10</text>
    </template>
    <!-- integral: area filling -->
    <template v-else-if="kind === 'int'">
      <path d="M20,90 Q80,20 200,60" fill="none" stroke="var(--accent)" stroke-width="2" />
      <clipPath id="sd-int"><rect x="20" y="0" :width="Math.min(180, 60 * (t % 3))" height="120" /></clipPath>
      <path d="M20,90 Q80,20 200,60 L200,100 L20,100 Z" fill="var(--accent-2)" fill-opacity="0.35" clip-path="url(#sd-int)" />
      <line x1="20" y1="100" x2="205" y2="100" stroke="var(--muted)" />
      <text class="num" x="110" y="115" text-anchor="middle" font-size="10" fill="var(--muted)">∫ = the area filling under the curve</text>
    </template>
    <!-- limit: dots approaching -->
    <template v-else-if="kind === 'lim'">
      <line x1="20" y1="70" x2="200" y2="70" stroke="var(--muted)" />
      <line x1="110" y1="50" x2="110" y2="90" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <circle :cx="110 - 80 * approach" cy="70" r="5" fill="var(--accent)" /><circle :cx="110 + 80 * approach" cy="70" r="5" fill="var(--accent)" />
      <circle cx="110" cy="70" r="5" fill="var(--sunken)" stroke="var(--accent-2)" stroke-width="2" />
      <text class="num" x="110" y="35" text-anchor="middle" font-size="11" fill="var(--fg)">closer and closer, never has to arrive</text>
      <text class="num" x="110" y="108" text-anchor="middle" font-size="11" fill="var(--accent-2)">x → a</text>
    </template>
    <template v-else-if="kind === 'delta'">
      <line x1="20" y1="90" x2="200" y2="90" stroke="var(--muted)" /><line x1="40" y1="20" x2="40" y2="90" stroke="var(--muted)" />
      <circle cx="70" cy="70" r="4" fill="var(--accent)" /><circle cx="160" cy="35" r="4" fill="var(--accent)" />
      <line x1="70" y1="70" x2="160" y2="70" stroke="var(--accent-2)" stroke-width="2" /><line x1="160" y1="70" x2="160" y2="35" stroke="var(--pos)" stroke-width="2" />
      <text class="num" x="115" y="84" text-anchor="middle" font-size="11" fill="var(--accent-2)">Δx = 9 − 3 = 6</text>
      <text class="num" x="172" y="55" font-size="11" fill="var(--pos)">Δy</text>
    </template>
    <template v-else-if="kind === 'dot' || kind === 'prime'">
      <path d="M20,95 Q110,-20 200,95" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle :cx="20 + 180 * ((t * 0.3) % 1)" :cy="95 - 4 * 57.5 * ((t * 0.3) % 1) * (1 - (t * 0.3) % 1)" r="5" fill="var(--fg)" />
      <text class="num" x="110" y="112" text-anchor="middle" font-size="10" fill="var(--muted)">{{ kind === 'dot' ? 'ẋ = how fast the dot moves right now' : "f′ = the slope where the dot is" }}</text>
    </template>
    <template v-else-if="kind === 'pi'">
      <circle :cx="50 + 44 * 3.14159 * ((t * 0.25) % 1)" cy="50" r="22" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle :cx="50 + 44 * 3.14159 * ((t * 0.25) % 1) + 22 * Math.sin(-2 * 3.14159 * ((t * 0.25) % 1) * 3.14159)" :cy="50 - 22 * Math.cos(2 * 3.14159 * ((t * 0.25) % 1) * 3.14159)" r="3" fill="var(--accent-2)" />
      <line x1="50" y1="80" :x2="50 + 44 * 3.14159" y2="80" stroke="var(--line)" /><g v-for="i in 3" :key="i"><line :x1="50 + 44 * (i - 1)" y1="76" :x2="50 + 44 * (i - 1)" y2="84" stroke="var(--muted)" /></g><line :x1="50 + 44 * 3" y1="76" :x2="50 + 44 * 3" y2="84" stroke="var(--muted)" />
      <text class="num" x="110" y="108" text-anchor="middle" font-size="10" fill="var(--muted)">one turn rolls 3.14 diameters: that is π</text>
    </template>
    <template v-else-if="kind === 'fact'">
      <g v-for="(p, i) in ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']" :key="p"><text class="num" :x="30 + (i % 3) * 60" :y="45 + Math.floor(i / 3) * 30" font-size="13" fill="var(--fg)">{{ p }}</text></g>
      <text class="num" x="110" y="105" text-anchor="middle" font-size="11" fill="var(--accent-2)">3! = 3 × 2 × 1 = 6 orders</text>
    </template>
    <template v-else-if="kind === 'binom'">
      <g v-for="(p, i) in ['AB', 'AC', 'BC']" :key="p"><text class="num" :x="50 + i * 60" y="55" font-size="14" fill="var(--fg)">{{ p }}</text></g>
      <text class="num" x="110" y="95" text-anchor="middle" font-size="11" fill="var(--accent-2)">C(3,2) = 3 ways to pick 2 of A B C</text>
    </template>
    <template v-else-if="kind === 'propto'">
      <rect x="30" y="80" :width="40" :height="20 + 40 * ((t * 0.4) % 1)" fill="var(--accent)" transform="translate(0,0) scale(1,-1) translate(0,-160)" />
      <rect x="120" y="80" :width="40" :height="40 + 80 * ((t * 0.4) % 1)" fill="var(--accent-2)" transform="scale(1,-1) translate(0,-160)" />
      <text class="num" x="110" y="110" text-anchor="middle" font-size="11" fill="var(--muted)">y ∝ x: double x and y doubles too</text>
    </template>
    <template v-else-if="kind === 'pm'">
      <text class="num" x="110" y="45" text-anchor="middle" font-size="13" fill="var(--fg)">x = 3 ± 2</text>
      <text class="num" x="60" y="85" text-anchor="middle" font-size="13" fill="var(--accent)">x = 5</text><text class="num" x="160" y="85" text-anchor="middle" font-size="13" fill="var(--accent-2)">x = 1</text>
      <text class="num" x="110" y="108" text-anchor="middle" font-size="10" fill="var(--muted)">two answers written as one</text>
    </template>
    <template v-else-if="kind === 'partial' || kind === 'nabla'">
      <path d="M30,90 Q70,40 110,60 T190,30" fill="none" stroke="var(--accent)" stroke-width="2" />
      <path d="M30,100 Q70,80 110,95 T190,70" fill="none" stroke="var(--pos)" stroke-width="2" />
      <text class="num" x="110" y="115" text-anchor="middle" font-size="10" fill="var(--muted)">{{ kind === 'partial' ? 'change along x only, y held still' : '∇f points the steepest way uphill' }}</text>
    </template>
    <template v-else-if="kind === 'infty'">
      <g class="num" font-size="12" fill="var(--fg)"><text x="20" y="60">1, 2, 3, 4, 5, …</text><text x="150" y="60" fill="var(--accent-2)">→ ∞</text></g>
      <text class="num" x="110" y="95" text-anchor="middle" font-size="10" fill="var(--muted)">no end; not a number you can reach</text>
    </template>
    <template v-else-if="kind === 'mid'">
      <rect x="20" y="30" width="180" height="60" fill="var(--line)" /><rect x="20" y="30" width="72" height="60" fill="var(--accent)" fill-opacity="0.5" /><rect x="20" y="30" width="72" height="24" fill="var(--accent-2)" />
      <text class="num" x="110" y="110" text-anchor="middle" font-size="10" fill="var(--muted)">P(A | B): look only inside B (blue), then how much is A</text>
    </template>
    <template v-else-if="kind === 'hat' || kind === 'bar' || kind === 'mu' || kind === 'sigma'">
      <g v-for="(v, i) in [3, 5, 4, 6, 2, 5, 4]" :key="i"><circle :cx="30 + i * 26" :cy="90 - v * 9" r="4" fill="var(--accent)" /></g>
      <line x1="20" :y1="90 - 4.14 * 9" x2="200" :y2="90 - 4.14 * 9" stroke="var(--accent-2)" stroke-dasharray="4 3" />
      <text class="num" x="110" y="112" text-anchor="middle" font-size="10" fill="var(--muted)">{{ kind === 'sigma' ? 'σ: how far the dots typically stray from the line' : 'the dashed line is the average of the dots' }}</text>
    </template>
    <template v-else-if="kind === 'frac'">
      <rect x="30" y="40" width="160" height="30" fill="var(--line)" /><rect x="30" y="40" width="120" height="30" fill="var(--accent)" fill-opacity="0.6" />
      <text class="num" x="110" y="100" text-anchor="middle" font-size="11" fill="var(--muted)">3/4: cut into 4, take 3</text>
    </template>
  </svg>
</template>
