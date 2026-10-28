<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { t, locale } from '../../i18n'
import { roughIq } from '../../patterns/engine'
import type { Attempt } from '../../stores/patterns'

// The student's own record, kept on this device only because they asked: best score, change since
// last time, and every sitting on one line. Single series, so no legend; values live in the tiles,
// the two labelled points, the tooltip and the table.
const props = defineProps<{ attempts: Attempt[] }>()
const emit = defineEmits<{ forget: [] }>()

const last = computed(() => props.attempts[props.attempts.length - 1])
const prev = computed(() => props.attempts[props.attempts.length - 2])
const bestIdx = computed(() => props.attempts.reduce((b, a, i) => (a.s > props.attempts[b].s ? i : b), 0))
const best = computed(() => props.attempts[bestIdx.value])
const delta = computed(() => (prev.value ? last.value.s - prev.value.s : null))
const iqText = (s: number) => {
  const q = roughIq(s)
  return q.tooLow ? '< 70' : `≈ ${q.iq}`
}
const date = (d: string) => new Date(`${d}T12:00`).toLocaleDateString(locale.value === 'ar' ? 'ar' : 'en-GB', { day: 'numeric', month: 'short' })
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// ---- the line --------------------------------------------------------------------------------------
const wrap = ref<HTMLElement>()
const width = ref(600)
const ro = new ResizeObserver((e) => (width.value = Math.max(240, e[0].contentRect.width)))
// The line appears from the second sitting on, so start measuring whenever its box shows up.
watch(wrap, (el, old) => (old && ro.unobserve(old), el && ro.observe(el)))
onUnmounted(() => ro.disconnect())
const H = 190
const pad = { l: 30, r: 18, t: 24, b: 28 }
const plotW = computed(() => width.value - pad.l - pad.r)
const x = (i: number) => pad.l + (props.attempts.length < 2 ? plotW.value / 2 : (i * plotW.value) / (props.attempts.length - 1))
const y = (s: number) => pad.t + (H - pad.t - pad.b) * (1 - s / 60)
const path = computed(() => props.attempts.map((a, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(a.s).toFixed(1)}`).join(''))
const ticks = [0, 20, 40, 60]
// Name every sitting along the bottom when they fit; thin them out when they would crowd.
const every = computed(() => Math.max(1, Math.ceil(props.attempts.length / Math.floor(plotW.value / 28))))
const labelled = computed(() => [...new Set([bestIdx.value, props.attempts.length - 1])])

const hover = ref<number | null>(null)
function onMove(e: PointerEvent) {
  const box = (e.currentTarget as SVGElement).getBoundingClientRect()
  const step = props.attempts.length < 2 ? 1 : plotW.value / (props.attempts.length - 1)
  hover.value = Math.min(props.attempts.length - 1, Math.max(0, Math.round((e.clientX - box.left - pad.l) / step)))
}
function onKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
  e.preventDefault()
  const i = hover.value ?? props.attempts.length - 1
  hover.value = Math.min(props.attempts.length - 1, Math.max(0, i + (e.key === 'ArrowRight' ? 1 : -1)))
}
// Beside the crosshair, never over the point it describes: to its right if there is room, else its left.
const tipLeft = computed(() => {
  if (hover.value === null) return 0
  const at = x(hover.value)
  return at + 12 + 160 <= width.value ? at + 12 : Math.max(0, at - 12 - 160)
})
</script>

<template>
  <section class="surface p-5 sm:p-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="font-semibold">{{ t('pat.hist.t') }}</h2>
      <button class="text-xs underline" style="color: var(--muted)" @click="emit('forget')">{{ t('pat.hist.forget') }}</button>
    </div>

    <dl class="mt-4 grid grid-cols-3 gap-4">
      <div>
        <dt class="label">{{ t('pat.hist.best') }}</dt>
        <dd class="mt-1"><span dir="ltr" class="text-3xl font-semibold">{{ best.s }}<span class="text-base" style="color: var(--muted)"> / 60</span></span></dd>
        <dd class="text-sm" style="color: var(--muted)"><span dir="ltr">{{ iqText(best.s) }}</span></dd>
      </div>
      <div>
        <dt class="label">{{ t('pat.hist.latest') }}</dt>
        <dd class="mt-1"><span dir="ltr" class="text-3xl font-semibold">{{ last.s }}<span class="text-base" style="color: var(--muted)"> / 60</span></span></dd>
        <dd class="text-sm" :style="{ color: delta === null || delta === 0 ? 'var(--muted)' : delta > 0 ? 'var(--pos)' : 'var(--neg)' }">
          <template v-if="delta === null">{{ t('pat.hist.first') }}</template>
          <template v-else-if="delta === 0">{{ t('pat.hist.same') }}</template>
          <template v-else>{{ delta > 0 ? '▲' : '▼' }} {{ t(delta > 0 ? 'pat.hist.up' : 'pat.hist.down', { n: Math.abs(delta) }) }}</template>
        </dd>
      </div>
      <div>
        <dt class="label">{{ t('pat.hist.attempts') }}</dt>
        <dd class="mt-1 text-3xl font-semibold">{{ attempts.length }}</dd>
      </div>
    </dl>

    <div v-if="attempts.length >= 2" ref="wrap" dir="ltr" class="relative mt-5">
      <svg
        :width="width"
        :height="H"
        class="block touch-none outline-none"
        tabindex="0"
        role="img"
        :aria-label="t('pat.hist.chart', { n: attempts.length, best: best.s, last: last.s })"
        @pointermove="onMove"
        @pointerleave="hover = null"
        @focus="hover = attempts.length - 1"
        @blur="hover = null"
        @keydown="onKey"
      >
        <g v-for="v in ticks" :key="v">
          <line :x1="pad.l" :x2="width - pad.r" :y1="y(v)" :y2="y(v)" stroke="var(--grid)" stroke-width="1" />
          <text :x="pad.l - 8" :y="y(v) + 4" text-anchor="end" class="num" font-size="11" fill="var(--muted)">{{ v }}</text>
        </g>
        <template v-for="(a, i) in attempts" :key="a.id">
          <text v-if="i % every === 0 || i === attempts.length - 1" :x="x(i)" :y="H - 8" text-anchor="middle" class="num" font-size="11" fill="var(--muted)">{{ i + 1 }}</text>
        </template>
        <line v-if="hover !== null" :x1="x(hover)" :x2="x(hover)" :y1="pad.t - 8" :y2="H - pad.b" stroke="var(--muted)" stroke-width="1" />
        <path :d="path" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
        <circle v-for="(a, i) in attempts" :key="a.id" :cx="x(i)" :cy="y(a.s)" :r="hover === i ? 6.5 : 5" fill="var(--accent)" stroke="var(--panel)" stroke-width="2" />
        <text v-for="i in labelled" :key="'l' + i" :x="x(i)" :y="y(attempts[i].s) - 11" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ attempts[i].s }}</text>
      </svg>
      <div v-if="hover !== null" class="pointer-events-none absolute top-0 w-40 rounded-lg border px-3 py-2 text-xs shadow-sm" :style="{ left: `${tipLeft}px`, background: 'var(--panel)', borderColor: 'var(--line)' }">
        <p class="text-sm font-semibold" style="color: var(--fg)">{{ attempts[hover].s }} / 60 <span class="font-normal" style="color: var(--muted)">· {{ iqText(attempts[hover].s) }}</span></p>
        <p :dir="locale === 'ar' ? 'rtl' : 'ltr'" style="color: var(--muted)">{{ t('pat.hist.point', { n: hover + 1 }) }} · {{ t('pat.form.name', { v: attempts[hover].f + 1 }) }} · {{ date(attempts[hover].d) }}</p>
      </div>
    </div>
    <p v-else class="mt-4 text-sm" style="color: var(--muted)">{{ t('pat.hist.oneMore') }}</p>

    <details class="mt-4">
      <summary class="flex items-center gap-2 text-sm" style="color: var(--muted)"><span class="chev">›</span>{{ t('pat.hist.table') }}</summary>
      <div class="mt-2 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-start" style="color: var(--muted)">
              <th class="py-1 pe-3 text-start font-medium">#</th>
              <th class="py-1 pe-3 text-start font-medium">{{ t('pat.hist.col.date') }}</th>
              <th class="py-1 pe-3 text-start font-medium">{{ t('pat.form.t') }}</th>
              <th class="py-1 pe-3 text-end font-medium">{{ t('pat.hist.col.score') }}</th>
              <th class="py-1 pe-3 text-end font-medium">{{ t('pat.hist.col.iq') }}</th>
              <th class="py-1 text-end font-medium">{{ t('pat.time') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, i) in attempts" :key="a.id" class="border-t" style="border-color: var(--line)">
              <td class="num py-1 pe-3">{{ i + 1 }}</td>
              <td class="py-1 pe-3">{{ date(a.d) }}</td>
              <td class="num py-1 pe-3">{{ a.f + 1 }}</td>
              <td class="num py-1 pe-3 text-end"><span dir="ltr">{{ a.s }} / 60</span></td>
              <td class="num py-1 pe-3 text-end"><span dir="ltr">{{ iqText(a.s) }}</span></td>
              <td class="num py-1 text-end"><span dir="ltr">{{ clock(a.t) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
    <p class="mt-3 text-xs" style="color: var(--muted)">{{ t('pat.hist.saved') }}</p>
  </section>
</template>
