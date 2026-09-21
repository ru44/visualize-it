<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import * as M from 'mathjs'
import { normalize } from '../engine/explorer'
import { derivativeExpr, fmt } from '../engine/math'

type Kind = 'fn' | 'polar' | 'param' | 'implicit' | 'field'
interface Entry {
  id: number
  kind: Kind
  text: string
  on: boolean
  deriv: boolean
}

const kinds: Record<Kind, { label: string; hint: string; name: string }> = {
  fn: { label: 'y =', hint: 'a*sin(x) + x/3', name: 'Function' },
  polar: { label: 'r =', hint: '1 + 2*cos(3*theta)', name: 'Polar' },
  param: { label: '(x, y) =', hint: '4*cos(3t) ; 4*sin(2t)', name: 'Parametric' },
  implicit: { label: '0 =', hint: 'x^2 + y^2 - 9', name: 'Implicit' },
  field: { label: 'F =', hint: '-y ; x', name: 'Vector field' },
}
const palette = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)', 'var(--fg)']
const RESERVED = new Set(['x', 'y', 't', 'theta'])

function load(): Entry[] {
  try {
    const saved = JSON.parse(localStorage.getItem('graph') ?? 'null')
    if (Array.isArray(saved) && saved.length) return saved
  } catch {}
  return [
    { id: 1, kind: 'fn', text: 'a*sin(x) + x/3', on: true, deriv: false },
    { id: 2, kind: 'implicit', text: 'x^2 + y^2 - 9', on: true, deriv: false },
  ]
}
const entries = ref<Entry[]>(load())
watch(entries, (v) => {
  try {
    localStorage.setItem('graph', JSON.stringify(v))
  } catch {}
}, { deep: true })

let nextId = Math.max(0, ...entries.value.map((e) => e.id)) + 1
const add = (kind: Kind) => entries.value.push({ id: nextId++, kind, text: kinds[kind].hint, on: true, deriv: false })
const remove = (id: number) => (entries.value = entries.value.filter((e) => e.id !== id))

// ---- compile each entry into 1 or 2 evaluators ---------------------------------------------
type Ev = (scope: Record<string, number>) => number
function compileOne(text: string): { ev: Ev; symbols: string[] } | null {
  try {
    const src = normalize(text).replace(/θ/g, 'theta')
    const node = M.parse(src)
    const code = node.compile()
    const symbols = [...new Set(node.filter((n: any) => n.isSymbolNode).map((n: any) => n.name as string))].filter((s) => !RESERVED.has(s) && !(s in M))
    return {
      symbols,
      ev: (scope) => {
        try {
          const v = code.evaluate(scope)
          return typeof v === 'number' ? v : NaN
        } catch {
          return NaN
        }
      },
    }
  } catch {
    return null
  }
}
const compiled = computed(() =>
  entries.value.map((e) => {
    const parts = (e.kind === 'param' || e.kind === 'field' ? e.text.split(';') : [e.text]).map((p) => (p.trim() ? compileOne(p) : null))
    const need = e.kind === 'param' || e.kind === 'field' ? 2 : 1
    const ok = parts.length === need && parts.every(Boolean)
    const d = ok && e.kind === 'fn' && e.deriv ? derivativeExpr(normalize(e.text)) : null
    return { ok, evs: ok ? parts.map((p) => p!.ev) : [], symbols: ok ? parts.flatMap((p) => p!.symbols) : [], dEv: d ? compileOne(d)?.ev : undefined }
  }),
)

// ---- free symbols become sliders ---------------------------------------------------------------
const params = reactive<Record<string, number>>({})
const playing = reactive<Record<string, boolean>>({})
watch(
  () => [...new Set(compiled.value.flatMap((c) => c.symbols))].sort().join(','),
  (joined) => {
    const names = joined ? joined.split(',') : []
    for (const n of names) if (!(n in params)) params[n] = 1
    for (const n of Object.keys(params)) if (!names.includes(n)) delete params[n], delete playing[n]
  },
  { immediate: true },
)
let raf = 0
let last = 0
const dir: Record<string, number> = {}
function tick(t: number) {
  const dt = Math.min(t - last, 50) / 1000
  last = t
  for (const n of Object.keys(playing)) {
    if (!playing[n]) continue
    dir[n] ??= 1
    let v = params[n] + dir[n] * dt * 1.5
    if (v > 5 || v < -5) (dir[n] *= -1), (v = Math.max(-5, Math.min(5, v)))
    params[n] = +v.toFixed(3)
  }
  raf = requestAnimationFrame(tick)
}
raf = requestAnimationFrame(tick)
onUnmounted(() => cancelAnimationFrame(raf))

// ---- view -----------------------------------------------------------------------------------------
const W = 800
const H = 520
const view = reactive({ cx: 0, cy: 0, span: 20 }) // span = visible width in x units; aspect is 1:1
const tMax = ref(6.2832)
const x0 = computed(() => view.cx - view.span / 2)
const y1 = computed(() => view.cy + (view.span * H) / W / 2)
const k = computed(() => W / view.span) // pixels per unit
const sx = (x: number) => (x - x0.value) * k.value
const sy = (y: number) => (y1.value - y) * k.value
const ux = (px: number) => x0.value + px / k.value
const uy = (py: number) => y1.value - py / k.value

const ticks = computed(() => {
  const raw = view.span / 10
  const p = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 5, 10].map((m) => m * p).find((s) => s >= raw)!
  const xs: number[] = []
  const ys: number[] = []
  for (let v = Math.ceil(x0.value / step) * step; v <= x0.value + view.span; v += step) xs.push(+v.toPrecision(12))
  for (let v = Math.ceil(uy(H) / step) * step; v <= y1.value; v += step) ys.push(+v.toPrecision(12))
  return { xs, ys }
})

function zoom(factor: number, px = W / 2, py = H / 2) {
  const [ax, ay] = [ux(px), uy(py)]
  view.span = Math.max(1e-3, Math.min(1e5, view.span * factor))
  view.cx += ax - ux(px)
  view.cy += ay - uy(py)
}
const svg = ref<SVGSVGElement>()
const toLocal = (e: MouseEvent) => {
  const b = svg.value!.getBoundingClientRect()
  return [((e.clientX - b.left) / b.width) * W, ((e.clientY - b.top) / b.height) * H] as const
}
function wheel(e: WheelEvent) {
  const [px, py] = toLocal(e)
  zoom(Math.exp(e.deltaY * 0.0015), px, py)
}
let grab: readonly [number, number] | null = null
const cursor = ref<{ x: number; y: number } | null>(null)
function down(e: PointerEvent) {
  grab = toLocal(e)
  svg.value!.setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  const p = toLocal(e)
  cursor.value = { x: ux(p[0]), y: uy(p[1]) }
  if (!grab) return
  view.cx -= (p[0] - grab[0]) / k.value
  view.cy += (p[1] - grab[1]) / k.value
  grab = p
}
const reset = () => Object.assign(view, { cx: 0, cy: 0, span: 20 })

// ---- geometry ---------------------------------------------------------------------------------------
function polyline(pts: [number, number][]) {
  let d = ''
  let pen = false
  let prev = 0
  for (const [x, y] of pts) {
    const [px, py] = [sx(x), sy(y)]
    const ok = Number.isFinite(px) && Number.isFinite(py) && Math.abs(py) < 1e5 && Math.abs(px) < 1e5
    if (!ok || (pen && Math.abs(py - prev) > H * 1.5)) pen = false
    if (ok) {
      d += `${pen ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`
      pen = true
      prev = py
    }
  }
  return d
}

function marching(ev: Ev) {
  const nx = 96
  const ny = 62
  const xs = Array.from({ length: nx + 1 }, (_, i) => ux((W * i) / nx))
  const ys = Array.from({ length: ny + 1 }, (_, j) => uy((H * j) / ny))
  const g = ys.map((y) => xs.map((x) => ev({ ...params, x, y })))
  let d = ''
  const lerp = (a: number, b: number, fa: number, fb: number) => a + ((b - a) * fa) / (fa - fb)
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const [a, b, c, e] = [g[j][i], g[j][i + 1], g[j + 1][i + 1], g[j + 1][i]]
      if (![a, b, c, e].every(Number.isFinite)) continue
      const pts: [number, number][] = []
      if (a * b < 0) pts.push([lerp(xs[i], xs[i + 1], a, b), ys[j]])
      if (b * c < 0) pts.push([xs[i + 1], lerp(ys[j], ys[j + 1], b, c)])
      if (c * e < 0) pts.push([lerp(xs[i + 1], xs[i], c, e), ys[j + 1]])
      if (e * a < 0) pts.push([xs[i], lerp(ys[j + 1], ys[j], e, a)])
      for (let p = 0; p + 1 < pts.length; p += 2) d += `M${sx(pts[p][0]).toFixed(1)},${sy(pts[p][1]).toFixed(1)}L${sx(pts[p + 1][0]).toFixed(1)},${sy(pts[p + 1][1]).toFixed(1)}`
    }
  return d
}

function arrows(P: Ev, Q: Ev) {
  const out: { x1: number; y1: number; x2: number; y2: number; o: number }[] = []
  const cell = 40
  let max = 1e-9
  const raw: [number, number, number, number][] = []
  for (let py = cell / 2; py < H; py += cell)
    for (let px = cell / 2; px < W; px += cell) {
      const s = { ...params, x: ux(px), y: uy(py) }
      const [u, v] = [P(s), Q(s)]
      if (!Number.isFinite(u) || !Number.isFinite(v)) continue
      max = Math.max(max, Math.hypot(u, v))
      raw.push([px, py, u, v])
    }
  for (const [px, py, u, v] of raw) {
    const m = Math.hypot(u, v)
    if (!m) continue
    const L = cell * 0.42
    out.push({ x1: px - (u / m) * L, y1: py + (v / m) * L, x2: px + (u / m) * L, y2: py - (v / m) * L, o: 0.25 + 0.75 * Math.sqrt(m / max) })
  }
  return out
}

const drawn = computed(() =>
  entries.value.map((e, i) => {
    const c = compiled.value[i]
    const color = palette[i % palette.length]
    if (!e.on || !c.ok) return { id: e.id, color, d: '', dd: '', arrows: [] }
    const n = 900
    let d = ''
    let dd = ''
    let arr: ReturnType<typeof arrows> = []
    if (e.kind === 'fn') {
      const xs = Array.from({ length: n + 1 }, (_, j) => ux((W * j) / n))
      d = polyline(xs.map((x) => [x, c.evs[0]({ ...params, x })]))
      if (c.dEv) dd = polyline(xs.map((x) => [x, c.dEv!({ ...params, x })]))
    } else if (e.kind === 'polar') {
      d = polyline(Array.from({ length: 1600 }, (_, j) => {
        const theta = (tMax.value * j) / 1599
        const r = c.evs[0]({ ...params, theta, t: theta })
        return [r * Math.cos(theta), r * Math.sin(theta)] as [number, number]
      }))
    } else if (e.kind === 'param') {
      d = polyline(Array.from({ length: 1600 }, (_, j) => {
        const t = (tMax.value * j) / 1599
        return [c.evs[0]({ ...params, t }), c.evs[1]({ ...params, t })] as [number, number]
      }))
    } else if (e.kind === 'implicit') d = marching(c.evs[0])
    else arr = arrows(c.evs[0], c.evs[1])
    return { id: e.id, color, d, dd, arrows: arr }
  }),
)

const probes = computed(() => {
  if (!cursor.value) return []
  const x = cursor.value.x
  return entries.value.flatMap((e, i) => {
    const c = compiled.value[i]
    if (e.kind !== 'fn' || !e.on || !c.ok) return []
    const y = c.evs[0]({ ...params, x })
    return Number.isFinite(y) ? [{ x, y, color: palette[i % palette.length] }] : []
  })
})
const usesT = computed(() => entries.value.some((e) => e.on && (e.kind === 'polar' || e.kind === 'param')))
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 py-6 lg:px-8">
    <header class="mb-5">
      <h1 class="text-3xl font-semibold tracking-tight">Graphing</h1>
      <p class="mt-1" style="color: var(--muted)">Functions, polar and parametric curves, implicit equations and vector fields. Any extra letter becomes a slider.</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside class="surface order-2 space-y-5 self-start p-4 lg:order-1">
        <ul class="space-y-3">
          <li v-for="(e, i) in entries" :key="e.id" class="rounded-xl border p-2.5" :style="{ borderColor: compiled[i].ok ? 'var(--line)' : 'var(--neg)' }">
            <div class="flex items-center gap-2">
              <button
                class="h-4 w-4 shrink-0 rounded-full border-2"
                :style="{ borderColor: palette[i % palette.length], background: e.on ? palette[i % palette.length] : 'transparent' }"
                :aria-label="e.on ? 'Hide' : 'Show'"
                @click="e.on = !e.on"
              />
              <select v-model="e.kind" class="rounded-md bg-transparent text-xs" style="color: var(--muted)" aria-label="Kind">
                <option v-for="(kd, key) in kinds" :key="key" :value="key">{{ kd.name }}</option>
              </select>
              <span class="flex-1" />
              <button v-if="e.kind === 'fn'" class="num rounded px-1.5 text-xs" :style="e.deriv ? 'background: var(--accent-soft); color: var(--accent)' : 'color: var(--muted)'" title="Show derivative" @click="e.deriv = !e.deriv">f′</button>
              <button class="px-1 text-sm" style="color: var(--muted)" aria-label="Remove" @click="remove(e.id)">✕</button>
            </div>
            <label class="mt-1.5 flex items-center gap-2">
              <span class="num shrink-0 text-xs" style="color: var(--muted)">{{ kinds[e.kind].label }}</span>
              <input v-model="e.text" class="num min-w-0 flex-1 bg-transparent py-1 text-sm outline-none" :placeholder="kinds[e.kind].hint" spellcheck="false" autocomplete="off" />
            </label>
            <p v-if="!compiled[i].ok" class="mt-1 text-xs" style="color: var(--neg)">
              Can’t read this{{ e.kind === 'param' || e.kind === 'field' ? ' — two expressions separated by “;”' : '' }}.
            </p>
          </li>
        </ul>

        <div>
          <p class="label mb-1.5">Add</p>
          <div class="flex flex-wrap gap-1.5">
            <button v-for="(kd, key) in kinds" :key="key" class="rounded-full border px-2.5 py-1 text-xs hover:border-[var(--accent)]" style="border-color: var(--line); color: var(--muted)" @click="add(key)">+ {{ kd.name }}</button>
          </div>
        </div>

        <div v-if="Object.keys(params).length || usesT" class="space-y-3">
          <p class="label">Parameters</p>
          <label v-for="(v, name) in params" :key="name" class="block">
            <span class="flex items-center justify-between text-sm">
              <span class="num">{{ name }}</span>
              <span class="flex items-center gap-2">
                <button class="num text-xs" style="color: var(--muted)" @click="playing[name] = !playing[name]">{{ playing[name] ? '❚❚' : '▶' }}</button>
                <span class="num rounded px-1.5 text-[13px]" style="background: var(--sunken)">{{ fmt(v, 2) }}</span>
              </span>
            </span>
            <input v-model.number="params[name]" type="range" min="-5" max="5" step="0.01" class="w-full" :style="{ '--p': `${((v + 5) / 10) * 100}%` }" :aria-label="String(name)" />
          </label>
          <label v-if="usesT" class="block">
            <span class="flex justify-between text-sm"><span class="num">t, θ from 0 to</span><span class="num">{{ fmt(tMax, 2) }}</span></span>
            <input v-model.number="tMax" type="range" min="0.1" max="62.83" step="0.01" class="w-full" :style="{ '--p': `${(tMax / 62.83) * 100}%` }" aria-label="t range" />
          </label>
        </div>
      </aside>

      <section class="surface relative order-1 overflow-hidden lg:order-2">
        <div class="absolute right-3 top-3 z-10 flex gap-1">
          <button v-for="b in [{ t: '+', f: () => zoom(0.7) }, { t: '−', f: () => zoom(1.4) }, { t: 'reset', f: reset }]" :key="b.t" class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="b.f">
            {{ b.t }}
          </button>
        </div>
        <svg
          ref="svg"
          :viewBox="`0 0 ${W} ${H}`"
          class="block w-full cursor-grab touch-none select-none active:cursor-grabbing"
          @wheel.prevent="wheel"
          @pointerdown="down"
          @pointermove="move"
          @pointerup="grab = null"
          @pointercancel="grab = null"
          @pointerleave="cursor = null"
        >
          <g class="num" font-size="11" fill="var(--muted)">
            <template v-for="t in ticks.xs" :key="`x${t}`">
              <line :x1="sx(t)" :x2="sx(t)" y1="0" :y2="H" stroke="var(--grid)" />
              <text v-if="t !== 0" :x="sx(t)" :y="Math.min(H - 6, Math.max(12, sy(0) + 14))" text-anchor="middle">{{ t }}</text>
            </template>
            <template v-for="t in ticks.ys" :key="`y${t}`">
              <line x1="0" :x2="W" :y1="sy(t)" :y2="sy(t)" stroke="var(--grid)" />
              <text v-if="t !== 0" :x="Math.min(W - 30, Math.max(6, sx(0) + 6))" :y="sy(t) + 4">{{ t }}</text>
            </template>
          </g>
          <line x1="0" :x2="W" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
          <line :x1="sx(0)" :x2="sx(0)" y1="0" :y2="H" stroke="var(--muted)" />

          <g v-for="c in drawn" :key="c.id">
            <line v-for="(a, j) in c.arrows" :key="j" :x1="a.x1" :y1="a.y1" :x2="a.x2" :y2="a.y2" :stroke="c.color" :stroke-opacity="a.o" stroke-width="1.5" stroke-linecap="round" />
            <circle v-for="(a, j) in c.arrows" :key="`h${j}`" :cx="a.x2" :cy="a.y2" r="2.2" :fill="c.color" :fill-opacity="a.o" />
            <path v-if="c.dd" :d="c.dd" fill="none" :stroke="c.color" stroke-width="1.5" stroke-dasharray="5 4" />
            <path v-if="c.d" :d="c.d" fill="none" :stroke="c.color" stroke-width="2.2" stroke-linejoin="round" />
          </g>

          <g v-for="(p, i) in probes" :key="i">
            <circle :cx="sx(p.x)" :cy="sy(p.y)" r="4.5" :fill="p.color" stroke="var(--panel)" stroke-width="2" />
            <text class="num" :x="sx(p.x) + 8" :y="sy(p.y) - 8" font-size="11" :fill="p.color">{{ fmt(p.y, 3) }}</text>
          </g>
        </svg>
        <p class="num flex justify-between border-t px-4 py-2 text-xs" style="border-color: var(--line); color: var(--muted)">
          <span>{{ cursor ? `x ${fmt(cursor.x, 3)}   y ${fmt(cursor.y, 3)}` : 'scroll to zoom · drag to pan' }}</span>
          <span>1 : 1 scale</span>
        </p>
      </section>
    </div>
  </main>
</template>
