<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Throw darts at random inside a square that has a circle inscribed in it. The share that lands inside the
// circle times 4 estimates π, and the error shrinks the more darts you throw. params: N (darts), speed.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const SIZE = 360
const X0 = (W - SIZE) / 2 - 120
const Y0 = (H - SIZE) / 2
const N = computed(() => Math.max(10, Math.min(2000, Math.round(props.params.N ?? 300))))
const speed = computed(() => Math.max(1, Math.min(400, Math.round(props.params.speed ?? 80))))

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
// Every dart's position is fixed by its index, so the same N always shows the same picture and growing N
// just adds more darts to the ones already thrown.
const darts = computed(() => {
  const rnd = mulberry32(424242)
  return Array.from({ length: N.value }, () => {
    const x = rnd() * 2 - 1
    const y = rnd() * 2 - 1
    return { x, y, inside: x * x + y * y <= 1 }
  })
})

const revealed = ref(0)
const playing = ref(true)
let raf = 0
let last = 0
let acc = 0
function tick(now: number) {
  if (playing.value && revealed.value < N.value) {
    acc += (speed.value * Math.min(now - last, 50)) / 1000
    last = now
    const add = Math.floor(acc)
    if (add) {
      acc -= add
      revealed.value = Math.min(N.value, revealed.value + add)
    }
  } else last = now
  raf = requestAnimationFrame(tick)
}
function restart() {
  revealed.value = 0
  acc = 0
}
watch(N, restart)
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = false
    revealed.value = N.value
  }
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const shown = computed(() => darts.value.slice(0, revealed.value))
const inside = computed(() => shown.value.reduce((s, d) => s + (d.inside ? 1 : 0), 0))
const piEst = computed(() => (revealed.value ? (4 * inside.value) / revealed.value : 0))
const px = (x: number) => X0 + SIZE / 2 + (x * SIZE) / 2
const py = (y: number) => Y0 + SIZE / 2 + (y * SIZE) / 2
const readouts = computed(() => [
  { label: t('mc.thrown'), value: String(revealed.value) },
  { label: t('mc.inside'), value: String(inside.value), color: 'var(--accent)' },
  { label: t('mc.pi'), value: fmt(piEst.value, 4), color: 'var(--accent-2)' },
  { label: t('mc.error'), value: fmt(Math.abs(piEst.value - Math.PI), 4) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('mc.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('mc.hint') }}</text>
      <rect :x="X0" :y="Y0" :width="SIZE" :height="SIZE" fill="var(--sunken)" stroke="var(--line)" />
      <circle :cx="X0 + SIZE / 2" :cy="Y0 + SIZE / 2" :r="SIZE / 2" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle v-for="(d, i) in shown" :key="i" :cx="px(d.x)" :cy="py(d.y)" r="2.2" :fill="d.inside ? 'var(--accent)' : 'var(--muted)'" :fill-opacity="d.inside ? 0.85 : 0.5" />
      <g transform="translate(560, 90)" class="num" font-size="14">
        <text fill="var(--fg)">π ≈ 4 × {{ inside }}/{{ revealed || 1 }}</text>
        <text y="26" fill="var(--accent-2)" font-size="20">{{ fmt(piEst, 4) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
