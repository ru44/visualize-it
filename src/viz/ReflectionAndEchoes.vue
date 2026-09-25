<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/reflection-and-echoes. t_echo = 2d/v. The pulse's on-screen travel time is
// a fixed visual duration (real d/v range from ms to seconds would otherwise be unwatchable); the
// readouts show the true numbers.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PX0 = 70
const WALL = 700
const BASE = 240
const LEG = 1.6 // seconds, visual time per leg (out or back)

const d = computed(() => props.params.d ?? 50)
const v = computed(() => props.params.v ?? 340)
const free = computed(() => (props.params.endType ?? 0) >= 0.5)
const tEcho = computed(() => (2 * d.value) / v.value)

const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  clock.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const phase = computed(() => (clock.value % (2 * LEG)) / LEG) // 0..2
const outbound = computed(() => phase.value < 1)
const pulseX = computed(() => (outbound.value ? PX0 + phase.value * (WALL - PX0) : WALL - (phase.value - 1) * (WALL - PX0)))
// flip on the return leg only when the wall is a fixed (hard) end
const flip = computed(() => !outbound.value && !free.value)
const pulseH = computed(() => (flip.value ? 26 : -26))

function bumpPath(cx: number, h: number): string {
  const w = 34
  return `M${cx - w},${BASE} Q${cx},${BASE + h} ${cx + w},${BASE}`
}

const readouts = computed(() => [
  { label: t('echo.d'), value: fmt(d.value, 0) + ' m', color: 'var(--accent)' },
  { label: t('echo.v'), value: fmt(v.value, 0) + ' m/s' },
  { label: t('echo.delay'), value: fmt(tEcho.value, tEcho.value < 1 ? 3 : 2) + ' s', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ outbound ? t('echo.hintOut') : t('echo.hintBack') }}</text>
      <line :x1="PX0" :x2="WALL" :y1="BASE" :y2="BASE" stroke="var(--grid)" stroke-dasharray="4 4" />
      <circle :cx="PX0" :cy="BASE" r="8" fill="var(--fg)" />
      <text class="num" :x="PX0" :y="BASE + 34" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('echo.source') }}</text>

      <template v-if="free">
        <line :x1="WALL" :x2="WALL" y1="150" y2="330" stroke="var(--muted)" stroke-width="4" stroke-dasharray="10 8" />
        <text class="num" :x="WALL + 10" y="150" font-size="11" fill="var(--muted)">{{ t('echo.free') }}</text>
      </template>
      <template v-else>
        <rect :x="WALL" y="150" width="16" height="180" fill="var(--fg)" />
        <text class="num" :x="WALL + 10" y="150" font-size="11" fill="var(--fg)">{{ t('echo.fixed') }}</text>
      </template>

      <path :d="bumpPath(pulseX, pulseH)" fill="none" stroke="var(--accent-2)" stroke-width="3" stroke-linecap="round" />
      <text class="num" x="16" y="420" font-size="12" fill="var(--muted)">{{ t('echo.tip') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
