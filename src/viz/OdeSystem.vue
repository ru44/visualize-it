<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { compile } from 'mathjs'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

/**
 * Integrates any system  dY/dt = F(Y, t, params)  with classical RK4 and plots every variable.
 * options: { vars: ['S','I','R'], equations: ['-b*S*I/N', ...] (mathjs, may use vars, t and params),
 *            initial: ['N - I0', 'I0', '0'] (expressions in params), tMax, yMax?, labels?: string[], colors?: string[] }
 * The param `tView` (0..1) scrubs the marker along the curves. Rerun happens automatically when params change.
 */
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 56, r: 24, t: 24, b: 40 }
const vars = computed<string[]>(() => props.options.vars)
const palette = ['var(--accent)', 'var(--neg)', 'var(--pos)', 'var(--accent-2)', 'var(--fg)']
const colors = computed<string[]>(() => props.options.colors ?? palette)
const labels = computed<string[]>(() => props.options.labels ?? vars.value)

const fns = computed(() => (props.options.equations as string[]).map((e) => compile(e)))
const inits = computed(() => (props.options.initial as string[]).map((e) => compile(e)))
const tMax = computed(() => props.options.tMax ?? 100)

interface Sim { ts: number[]; ys: number[][] }
const sim = computed<Sim>(() => {
  const n = vars.value.length
  const scope: Record<string, number> = { ...props.params }
  let y: number[]
  try {
    y = inits.value.map((c) => Number(c.evaluate(scope)))
  } catch {
    y = Array(n).fill(0)
  }
  const f = (tt: number, yy: number[]) => {
    const s: Record<string, number> = { ...scope, t: tt }
    vars.value.forEach((v, i) => (s[v] = yy[i]))
    return fns.value.map((c) => {
      try {
        const v = c.evaluate(s)
        return typeof v === 'number' && Number.isFinite(v) ? v : 0
      } catch {
        return 0
      }
    })
  }
  const steps = 800
  const h = tMax.value / steps
  const ts = [0]
  const ys = [y.slice()]
  for (let i = 0; i < steps; i++) {
    const tt = i * h
    const k1 = f(tt, y)
    const k2 = f(tt + h / 2, y.map((v, j) => v + (h / 2) * k1[j]))
    const k3 = f(tt + h / 2, y.map((v, j) => v + (h / 2) * k2[j]))
    const k4 = f(tt + h, y.map((v, j) => v + h * k3[j]))
    y = y.map((v, j) => v + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]))
    ts.push(tt + h)
    ys.push(y.slice())
  }
  return { ts, ys }
})

const yMax = computed(() => props.options.yMax ?? Math.max(1e-9, ...sim.value.ys.flat().filter(Number.isFinite)) * 1.08)
const yMin = computed(() => Math.min(0, props.options.yMin ?? Math.min(...sim.value.ys.flat().filter(Number.isFinite))))
const sx = (tt: number) => PAD.l + (tt / tMax.value) * (W - PAD.l - PAD.r)
const sy = (v: number) => H - PAD.b - ((v - yMin.value) / (yMax.value - yMin.value)) * (H - PAD.t - PAD.b)
const paths = computed(() => vars.value.map((_, j) => sim.value.ts.map((tt, i) => `${i ? 'L' : 'M'}${sx(tt).toFixed(1)},${sy(sim.value.ys[i][j]).toFixed(1)}`).join('')))

// Scrub marker: tView in [0,1]; animates on its own unless the user drags.
const tView = computed(() => Math.min(1, Math.max(0, props.params.tView ?? 1)))
const idx = computed(() => Math.round(tView.value * (sim.value.ts.length - 1)))
const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tView.value + dt / 8
    if (v >= 1) (v = 1), (playing.value = false)
    emit('set', 'tView', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'tView' in props.params) {
    playing.value = true
    raf = requestAnimationFrame(tick)
  }
})
onUnmounted(() => cancelAnimationFrame(raf))
watch(() => Object.entries(props.params).filter(([k]) => k !== 'tView').map(([, v]) => v).join(), () => 'tView' in props.params && (emit('set', 'tView', 0), (playing.value = true)))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  emit('set', 'tView', (x - PAD.l) / (W - PAD.l - PAD.r))
}
function down(e: PointerEvent) {
  if (!('tView' in props.params)) return
  dragging.value = true
  playing.value = false
  svg.value?.setPointerCapture(e.pointerId)
  pick(e)
}
const yTicks = computed(() => {
  const span = yMax.value - yMin.value
  const step = [1, 2, 5].map((m) => m * 10 ** Math.floor(Math.log10(span / 4))).find((s) => span / s <= 8) ?? span / 4
  const out: number[] = []
  for (let v = Math.ceil(yMin.value / step) * step; v <= yMax.value; v += step) out.push(+v.toPrecision(10))
  return out
})
const readouts = computed(() => [
  { label: t('ode.time'), value: fmt(sim.value.ts[idx.value], 2) },
  ...vars.value.map((v, j) => ({ label: labels.value[j], value: fmt(sim.value.ys[idx.value][j], 3), color: colors.value[j % colors.value.length] })),
])
</script>

<template>
  <div class="relative">
    <button v-if="'tView' in params" class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && tView >= 1) $emit('set', 'tView', 0)">
      {{ playing ? t('plot.pause') : t('plot.play') }}
    </button>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" :class="'tView' in params ? 'cursor-ew-resize' : ''" @pointerdown="down" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="v in yTicks" :key="v">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(v)" :y2="sy(v)" stroke="var(--grid)" />
          <text :x="PAD.l - 6" :y="sy(v) + 4" text-anchor="end">{{ fmt(v, 3) }}</text>
        </template>
        <template v-for="i in 5" :key="'t' + i">
          <text :x="sx((tMax * i) / 5)" :y="H - PAD.b + 16" text-anchor="middle">{{ fmt((tMax * i) / 5, 2) }}</text>
        </template>
      </g>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <path v-for="(d, j) in paths" :key="j" :d="d" fill="none" :stroke="colors[j % colors.length]" stroke-width="2.2" />
      <template v-if="'tView' in params">
        <line :x1="sx(sim.ts[idx])" :x2="sx(sim.ts[idx])" :y1="PAD.t" :y2="H - PAD.b" stroke="var(--muted)" stroke-dasharray="4 3" />
        <circle v-for="(_, j) in vars" :key="'m' + j" :cx="sx(sim.ts[idx])" :cy="sy(sim.ys[idx][j])" r="5" :fill="colors[j % colors.length]" stroke="var(--panel)" stroke-width="1.5" />
      </template>
      <g class="num" font-size="12">
        <template v-for="(lab, j) in labels" :key="'l' + j">
          <rect :x="PAD.l + 8 + j * 120" :y="PAD.t - 6" width="12" height="12" rx="2" :fill="colors[j % colors.length]" />
          <text :x="PAD.l + 26 + j * 120" :y="PAD.t + 4" fill="var(--fg)">{{ lab }}</text>
        </template>
      </g>
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('ode.hint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
