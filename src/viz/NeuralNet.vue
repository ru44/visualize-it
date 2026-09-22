<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A 2-3-1 network with tanh hidden units. params: w11 w12 w21 w22 w31 w32 (input→hidden), v1 v2 v3 (hidden→out),
// b (output bias), x, y (the probe input). Left: the network with live activations; right: its decision map.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = (k: string, d = 0) => props.params[k] ?? d
const sig = (z: number) => 1 / (1 + Math.exp(-z))
function forward(x: number, y: number) {
  const h = [Math.tanh(p('w11', 1) * x + p('w12', 1) * y), Math.tanh(p('w21', 1) * x - p('w22', 1) * y), Math.tanh(p('w31', -1) * x + p('w32', 1) * y)]
  const out = sig(p('v1', 1) * h[0] + p('v2', 1) * h[1] + p('v3', 1) * h[2] + p('b', 0))
  return { h, out }
}
const probe = computed(() => forward(p('x', 0.5), p('y', 0.5)))
// decision map 24×24 cells over [-3,3]²
const cells = computed(() => {
  const out: { x: number; y: number; v: number }[] = []
  for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) out.push({ x: i, y: j, v: forward(-3 + (i + 0.5) * 0.25, 3 - (j + 0.5) * 0.25).out })
  return out
})
const map = { x: 470, y: 60, s: 15 }
const mx = (x: number) => map.x + ((x + 3) / 6) * 24 * map.s
const my = (y: number) => map.y + ((3 - y) / 6) * 24 * map.s
const nodes = { in: [[60, 160], [60, 320]], hid: [[220, 100], [220, 240], [220, 380]], out: [[380, 240]] }
const wts = computed(() => [
  ...[['w11', 0, 0], ['w12', 1, 0], ['w21', 0, 1], ['w22', 1, 1], ['w31', 0, 2], ['w32', 1, 2]].map(([k, i, h]) => ({ x1: nodes.in[i as number][0], y1: nodes.in[i as number][1], x2: nodes.hid[h as number][0], y2: nodes.hid[h as number][1], w: p(k as string, 1) * (k === 'w22' ? -1 : 1) })),
  ...['v1', 'v2', 'v3'].map((k, h) => ({ x1: nodes.hid[h][0], y1: nodes.hid[h][1], x2: nodes.out[0][0], y2: nodes.out[0][1], w: p(k, 1) })),
])
const readouts = computed(() => [
  { label: 'x, y', value: `${fmt(p('x', 0.5), 2)}, ${fmt(p('y', 0.5), 2)}` },
  { label: 'h₁ h₂ h₃', value: probe.value.h.map((v) => fmt(v, 2)).join('  '), color: 'var(--accent)' },
  { label: t('nn.output'), value: fmt(probe.value.out, 3), color: 'var(--accent-2)' },
  { label: t('nn.class'), value: probe.value.out > 0.5 ? 'A' : 'B', color: probe.value.out > 0.5 ? 'var(--accent-2)' : 'var(--accent)' },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const X = ((e.clientX - b.left) / b.width) * W
  const Y = ((e.clientY - b.top) / b.height) * H
  if (X < map.x || X > map.x + 24 * map.s || Y < map.y || Y > map.y + 24 * map.s) return
  emit('set', 'x', -3 + ((X - map.x) / (24 * map.s)) * 6)
  emit('set', 'y', 3 - ((Y - map.y) / (24 * map.s)) * 6)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('nn.hint') }}</text>
      <!-- weights -->
      <line v-for="(e, i) in wts" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" :stroke="e.w >= 0 ? 'var(--accent-2)' : 'var(--accent)'" :stroke-width="Math.min(8, 0.6 + Math.abs(e.w) * 2.2)" stroke-opacity="0.75" />
      <!-- nodes -->
      <g v-for="(n, i) in nodes.in" :key="'i' + i"><circle :cx="n[0]" :cy="n[1]" r="20" fill="var(--panel)" stroke="var(--fg)" stroke-width="2" /><text class="num" :x="n[0]" :y="n[1] + 5" text-anchor="middle" font-size="13" fill="var(--fg)">{{ i ? 'y' : 'x' }}</text><text class="num" :x="n[0]" :y="n[1] + 36" text-anchor="middle" font-size="11" fill="var(--muted)">{{ fmt(i ? p('y', 0.5) : p('x', 0.5), 2) }}</text></g>
      <g v-for="(n, i) in nodes.hid" :key="'h' + i"><circle :cx="n[0]" :cy="n[1]" r="20" :fill="probe.h[i] >= 0 ? 'var(--accent-2)' : 'var(--accent)'" :fill-opacity="0.2 + 0.8 * Math.abs(probe.h[i])" stroke="var(--fg)" stroke-width="1.5" /><text class="num" :x="n[0]" :y="n[1] + 5" text-anchor="middle" font-size="12" fill="var(--fg)">{{ fmt(probe.h[i], 2) }}</text></g>
      <g><circle :cx="nodes.out[0][0]" :cy="nodes.out[0][1]" r="24" fill="var(--accent-2)" :fill-opacity="0.15 + 0.85 * probe.out" stroke="var(--fg)" stroke-width="2" /><text class="num" :x="nodes.out[0][0]" :y="nodes.out[0][1] + 5" text-anchor="middle" font-size="13" fill="var(--fg)">{{ fmt(probe.out, 2) }}</text></g>
      <g class="num" font-size="11" fill="var(--muted)"><text x="60" y="440" text-anchor="middle">{{ t('nn.inputs') }}</text><text x="220" y="440" text-anchor="middle">{{ t('nn.hidden') }}</text><text x="380" y="440" text-anchor="middle">{{ t('nn.out') }}</text></g>
      <!-- decision map -->
      <rect v-for="(c, i) in cells" :key="i" :x="map.x + c.x * map.s" :y="map.y + c.y * map.s" :width="map.s" :height="map.s" :fill="c.v > 0.5 ? 'var(--accent-2)' : 'var(--accent)'" :fill-opacity="0.15 + 0.6 * Math.abs(c.v - 0.5) * 2" />
      <rect :x="map.x" :y="map.y" :width="24 * map.s" :height="24 * map.s" fill="none" stroke="var(--line)" />
      <circle :cx="mx(p('x', 0.5))" :cy="my(p('y', 0.5))" r="7" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
      <text class="num" :x="map.x + 12 * map.s" :y="map.y + 24 * map.s + 22" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('nn.map') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
