<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/elasticity. params a, b (demand line Q = a − bx), x = the price you set. The demand
// line with the revenue RECTANGLE x·Q shaded under it — drag the price and watch the rectangle
// grow, peak where |E| = 1, then shrink as customers walk away. A queue of buyers tracks Q.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const a = computed(() => Math.max(props.params.a ?? 100, 1))
const b = computed(() => Math.max(props.params.b ?? 2, 0.01))
const price = computed(() => Math.min(Math.max(props.params.x ?? 20, 0), 50))
const Q = computed(() => Math.max(a.value - b.value * price.value, 0))
const R = computed(() => price.value * Q.value)
const E = computed(() => (Q.value > 0 ? (b.value * price.value) / Q.value : Infinity))
const bestPrice = computed(() => a.value / (2 * b.value))
const Rmax = computed(() => (a.value * a.value) / (4 * b.value))

const CH = { x: 90, y: 70, w: 420, h: 300 }
const px = (xp: number) => CH.x + (xp / 50) * CH.w
const py = (q: number) => CH.y + CH.h - (q / 200) * CH.h
const qAt = (xp: number) => Math.max(a.value - b.value * xp, 0)

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sx = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.round(Math.min(50, Math.max(0, ((sx - CH.x) / CH.w) * 50)) * 2) / 2)
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const buyers = computed(() => Math.min(Math.round(Q.value / 8), 24))
const readouts = computed(() => [
  { label: t('mkt.price'), value: fmt(price.value, 1), color: 'var(--accent-2)' },
  { label: 'Q = a − b·x', value: fmt(Q.value, 0), color: 'var(--accent)' },
  { label: 'R = x·Q', value: fmt(R.value, 0), color: 'var(--pos)' },
  { label: '|E| = bx/(a−bx)', value: Q.value > 0 ? fmt(E.value, 2) : '∞', color: Math.abs(E.value - 1) < 0.07 ? 'var(--pos)' : undefined },
  { label: t('mkt.best'), value: `${fmt(bestPrice.value, 1)} → R = ${fmt(Rmax.value, 0)}` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('mkt.hint') }}</text>
      <!-- demand line and the revenue rectangle -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <rect :x="CH.x" :y="py(Q)" :width="px(price) - CH.x" :height="CH.y + CH.h - py(Q)" fill="var(--pos)" opacity="0.3" />
      <line :x1="px(0)" :y1="py(qAt(0))" :x2="px(Math.min(a / b, 50))" :y2="py(qAt(Math.min(a / b, 50)))" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="px(price)" :y1="CH.y" :x2="px(price)" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="4 3" />
      <circle :cx="px(price)" :cy="py(Q)" r="6" fill="var(--accent-2)" />
      <line :x1="px(bestPrice)" :y1="CH.y + CH.h" :x2="px(bestPrice)" :y2="CH.y + CH.h - 14" stroke="var(--pos)" stroke-width="2.5" />
      <text :x="px(bestPrice)" :y="CH.y + CH.h + 16" text-anchor="middle" font-size="9" fill="var(--pos)" class="num">|E|=1</text>
      <text :x="CH.x + 8" :y="CH.y + 16" font-size="10" fill="var(--muted)">{{ t('mkt.axis') }}</text>
      <text :x="px(price)" :y="CH.y + CH.h + 30" text-anchor="middle" font-size="11" fill="var(--accent-2)" class="num">{{ t('mkt.tag', { x: fmt(price, 1) }) }}</text>
      <text :x="CH.x + (px(price) - CH.x) / 2" :y="py(Q) + (CH.y + CH.h - py(Q)) / 2 + 4" text-anchor="middle" font-size="12" fill="var(--pos)" class="num">R = {{ fmt(R, 0) }}</text>
      <!-- the queue -->
      <text x="570" y="92" font-size="12" font-weight="600" fill="var(--fg)">{{ t('mkt.queue', { q: fmt(Q, 0) }) }}</text>
      <circle v-for="i in buyers" :key="i" :cx="570 + ((i - 1) % 8) * 26" :cy="120 + Math.floor((i - 1) / 8) * 28" r="9" fill="var(--accent)" opacity="0.8" />
      <text v-if="buyers === 0" x="570" y="126" font-size="11" fill="var(--neg)">{{ t('mkt.empty') }}</text>
      <!-- advice -->
      <text x="570" y="236" font-size="12" :fill="Math.abs(E - 1) < 0.07 ? 'var(--pos)' : 'var(--fg)'">
        {{ Math.abs(E - 1) < 0.07 ? t('mkt.atPeak') : E < 1 ? t('mkt.raise') : t('mkt.lower') }}
      </text>
      <text x="570" y="258" font-size="10" fill="var(--muted)">{{ E < 1 ? t('mkt.inelastic') : t('mkt.elastic') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('mkt.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
