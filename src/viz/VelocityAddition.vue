<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three markers race along the same track: light itself (always reaches the far wall), the naive sum
// u + v (which can "reach" past the wall, marked impossible), and the true relativistic sum
// w = (u+v)/(1+uv/c^2), which never does. params u, v (both fractions of c).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const X0 = 70
const LEN = 660
const DURATION = 3 // s, one lap of the race

const u = computed(() => Math.min(0.999, Math.max(0, props.params.u ?? 0.8)))
const v = computed(() => Math.min(0.999, Math.max(0, props.params.v ?? 0.8)))
const naive = computed(() => u.value + v.value)
const w = computed(() => (u.value + v.value) / (1 + u.value * v.value))

const state = reactive({ t: 0 })
let raf = 0
let last = 0
function frame(now: number) {
  const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
  last = now
  state.t = (state.t + dt) % DURATION
  raf = requestAnimationFrame(frame)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(frame)
  else state.t = DURATION
})
onUnmounted(() => cancelAnimationFrame(raf))

const frac = (target: number) => Math.min(1, target * (state.t / DURATION))
const xOf = (target: number) => X0 + frac(target) * LEN

const lightX = computed(() => xOf(1))
const naiveX = computed(() => xOf(naive.value))
const naiveStuck = computed(() => naive.value >= 1 && frac(naive.value) >= 0.999)
const wX = computed(() => xOf(w.value))

const readouts = computed(() => [
  { label: 'u', value: `${fmt(u.value, 3)} c`, color: 'var(--accent)' },
  { label: 'v', value: `${fmt(v.value, 3)} c`, color: 'var(--accent-2)' },
  { label: t('vadd.naive'), value: `${fmt(naive.value, 4)} c`, color: naive.value > 1 ? 'var(--neg)' : 'var(--fg)' },
  { label: 'w', value: `${fmt(w.value, 5)} c`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('vadd.hint') }}</text>

      <line :x1="X0 + LEN" :x2="X0 + LEN" y1="60" y2="400" stroke="var(--neg)" stroke-width="2" stroke-dasharray="5 5" />
      <text class="num" :x="X0 + LEN" y="50" text-anchor="middle" font-size="11" fill="var(--neg)">c</text>

      <!-- light -->
      <line :x1="X0" :x2="X0 + LEN" y1="110" y2="110" stroke="var(--line)" />
      <text class="num" :x="X0" y="96" font-size="12" fill="var(--fg)">{{ t('vadd.light') }}</text>
      <circle :cx="lightX" cy="110" r="7" fill="#e0b400" />

      <!-- naive sum -->
      <line :x1="X0" :x2="X0 + LEN" y1="230" y2="230" stroke="var(--line)" />
      <text class="num" :x="X0" y="216" font-size="12" fill="var(--fg)">{{ t('vadd.naive') }} = u + v</text>
      <circle :cx="naiveX" cy="230" r="7" fill="none" stroke="var(--neg)" stroke-width="3" stroke-dasharray="2 3" />
      <text v-if="naiveStuck" class="num" :x="X0 + LEN - 4" y="252" text-anchor="end" font-size="11" fill="var(--neg)" font-weight="600">{{ t('vadd.impossible') }}</text>

      <!-- actual relativistic sum -->
      <line :x1="X0" :x2="X0 + LEN" y1="350" y2="350" stroke="var(--line)" />
      <text class="num" :x="X0" y="336" font-size="12" fill="var(--fg)">w = (u+v)/(1+uv/c²)</text>
      <circle :cx="wX" cy="350" r="7" fill="var(--pos)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
