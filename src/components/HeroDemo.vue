<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'

// A tiny self-running derivative demo. Pure Math — keeps the landing bundle light.
const W = 520
const H = 340
const f = (x: number) => Math.sin(x) + 0.25 * x
const df = (x: number) => Math.cos(x) + 0.25
const sx = (x: number) => W / 2 + x * 52
const sy = (y: number) => H / 2 + 10 - y * 62

const x = ref(-2)
let raf = 0
let heldUntil = 0
const svg = ref<SVGSVGElement>()

const curve = computed(() => {
  let d = ''
  for (let i = 0; i <= 200; i++) {
    const xv = -5 + (10 * i) / 200
    d += `${i ? 'L' : 'M'}${sx(xv).toFixed(1)},${sy(f(xv)).toFixed(1)}`
  }
  return d
})
const tangent = computed(() => {
  const m = df(x.value)
  const dx = 1.5 / Math.hypot(1, m)
  return { x1: sx(x.value - dx), y1: sy(f(x.value) - m * dx), x2: sx(x.value + dx), y2: sy(f(x.value) + m * dx), m }
})

function move(e: PointerEvent) {
  const box = svg.value!.getBoundingClientRect()
  x.value = Math.max(-4.6, Math.min(4.6, (((e.clientX - box.left) / box.width) * W - W / 2) / 52))
  heldUntil = performance.now() + 2500
}
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const loop = (t: number) => {
    if (t > heldUntil) x.value = 4.2 * Math.sin(t * 0.00045)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <figure class="surface overflow-hidden">
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none" @pointermove="move">
      <g stroke="var(--grid)">
        <line v-for="i in 9" :key="`v${i}`" :x1="sx(i - 5)" :x2="sx(i - 5)" y1="0" :y2="H" />
        <line v-for="i in 5" :key="`h${i}`" x1="0" :x2="W" :y1="sy(i - 3)" :y2="sy(i - 3)" />
      </g>
      <line x1="0" :x2="W" :y1="sy(0)" :y2="sy(0)" stroke="var(--line)" stroke-width="1.5" />
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <line v-bind="tangent" stroke="var(--accent-2)" stroke-width="2" stroke-linecap="round" />
      <circle :cx="sx(x)" :cy="sy(f(x))" r="6" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
    </svg>
    <figcaption class="flex items-center justify-between border-t px-4 py-2.5 text-sm" style="border-color: var(--line)">
      <span style="color: var(--muted)">{{ t('home.demo') }}</span>
      <span class="num shrink-0 ps-3" style="color: var(--accent-2)">{{ t('home.slope') }} {{ tangent.m >= 0 ? '+' : '' }}{{ tangent.m.toFixed(2) }}</span>
    </figcaption>
  </figure>
</template>
