<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A population of 1000 squares. Columns split by whether the condition is present (prior);
// each column is split by whether the test says "positive". Bayes' theorem is just reading the grid.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const prior = computed(() => Math.min(0.99, Math.max(0.001, (props.params.prior ?? 1) / 100)))
const sens = computed(() => Math.min(1, Math.max(0, (props.params.sens ?? 99) / 100)))
const spec = computed(() => Math.min(1, Math.max(0, (props.params.spec ?? 95) / 100)))

const tp = computed(() => prior.value * sens.value)
const fn_ = computed(() => prior.value * (1 - sens.value))
const fp = computed(() => (1 - prior.value) * (1 - spec.value))
const tn = computed(() => (1 - prior.value) * spec.value)
const posterior = computed(() => tp.value / (tp.value + fp.value))

const box = { x: 40, y: 50, w: 520, h: 380 }
const split = computed(() => box.x + Math.max(6, prior.value * box.w))
const rects = computed(() => {
  const leftW = split.value - box.x
  const rightW = box.x + box.w - split.value
  return [
    { x: box.x, y: box.y, w: leftW, h: sens.value * box.h, fill: 'var(--accent-2)', op: 0.85, label: 'TP', v: tp.value },
    { x: box.x, y: box.y + sens.value * box.h, w: leftW, h: (1 - sens.value) * box.h, fill: 'var(--neg)', op: 0.5, label: 'FN', v: fn_.value },
    { x: split.value, y: box.y, w: rightW, h: (1 - spec.value) * box.h, fill: 'var(--accent-2)', op: 0.35, label: 'FP', v: fp.value },
    { x: split.value, y: box.y + (1 - spec.value) * box.h, w: rightW, h: spec.value * box.h, fill: 'var(--sunken)', op: 1, label: 'TN', v: tn.value },
  ]
})
const per1000 = (v: number) => Math.round(v * 1000)
const readouts = computed(() => [
  { label: t('bayes.tp'), value: `${per1000(tp.value)} / 1000`, color: 'var(--accent-2)' },
  { label: t('bayes.fp'), value: `${per1000(fp.value)} / 1000` },
  { label: t('bayes.posterior'), value: fmt(posterior.value * 100, 2) + ' %', color: 'var(--accent-2)' },
  { label: t('bayes.prior'), value: fmt(prior.value * 100, 2) + ' %', color: 'var(--accent)' },
])

const dragging = ref(false)
function down(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const b = svg.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  emit('set', 'prior', Math.max(0.1, Math.min(50, ((x - box.x) / box.w) * 100)))
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-ew-resize touch-none select-none" @pointerdown="down" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="40" y="24" font-size="12" fill="var(--muted)">{{ t('bayes.hint') }}</text>
      <g v-for="r in rects" :key="r.label">
        <rect :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.fill" :fill-opacity="r.op" stroke="var(--panel)" stroke-width="1.5" />
        <text v-if="r.w > 40 && r.h > 18" class="num" :x="r.x + r.w / 2" :y="r.y + r.h / 2 + 4" text-anchor="middle" font-size="12" :fill="r.label === 'TN' || r.label === 'FP' ? 'var(--fg)' : '#fff'">{{ per1000(r.v) }}</text>
      </g>
      <line :x1="split" :x2="split" :y1="box.y - 8" :y2="box.y + box.h + 8" stroke="var(--fg)" stroke-width="2" />
      <text class="num" :x="box.x" :y="box.y + box.h + 24" font-size="12" fill="var(--fg)">{{ t('bayes.has') }} {{ fmt(prior * 100, 1) }} %</text>
      <text class="num" :x="box.x + box.w" :y="box.y + box.h + 24" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('bayes.hasNot') }}</text>

      <g class="num" font-size="12">
        <rect x="590" y="60" width="16" height="16" fill="var(--accent-2)" fill-opacity="0.85" /><text x="614" y="73" fill="var(--fg)">{{ t('bayes.tp') }}</text>
        <rect x="590" y="88" width="16" height="16" fill="var(--accent-2)" fill-opacity="0.35" /><text x="614" y="101" fill="var(--fg)">{{ t('bayes.fp') }}</text>
        <rect x="590" y="116" width="16" height="16" fill="var(--neg)" fill-opacity="0.5" /><text x="614" y="129" fill="var(--fg)">{{ t('bayes.fn') }}</text>
        <rect x="590" y="144" width="16" height="16" fill="var(--sunken)" stroke="var(--line)" /><text x="614" y="157" fill="var(--fg)">{{ t('bayes.tn') }}</text>
        <text x="590" y="210" fill="var(--muted)">{{ t('bayes.positives') }}</text>
        <text x="590" y="232" fill="var(--fg)" font-size="15">{{ per1000(tp) }} + {{ per1000(fp) }} = {{ per1000(tp) + per1000(fp) }}</text>
        <text x="590" y="270" fill="var(--muted)">{{ t('bayes.ofWhichIll') }}</text>
        <text x="590" y="296" fill="var(--accent-2)" font-size="22">{{ fmt(posterior * 100, 1) }} %</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
