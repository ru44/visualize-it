<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A stick and a tree under the same sun: two right triangles that share the same angle at the
// ground, so they are similar (same shape). Their heights and shadows stay in the same ratio no
// matter how tall the tree is — and the two triangles become congruent (same shape AND size)
// only in the special case where the tree is exactly as tall as the stick.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const D2R = Math.PI / 180

const sun = computed(() => Math.min(75, Math.max(15, props.params.sun ?? 40)))
const hStick = computed(() => Math.max(0.3, props.params.hStick ?? 1.2))
const hTree = computed(() => Math.max(0.3, props.params.hTree ?? 6))

const tanSun = computed(() => Math.tan(sun.value * D2R))
const sStick = computed(() => hStick.value / tanSun.value)
const sTree = computed(() => hTree.value / tanSun.value)
const congruent = computed(() => Math.abs(hTree.value - hStick.value) < 0.05)

// pixels per metre, chosen so the taller of the two objects always fits
const PX = computed(() => Math.min(52, 360 / Math.max(hTree.value, hStick.value)))
const groundY = 380
const stickBaseX = 160
const treeBaseX = 520

const readouts = computed(() => [
  { label: t('shadow-triangles.hStick'), value: `${fmt(hStick.value, 2)} m`, color: 'var(--accent-2)' },
  { label: t('shadow-triangles.sStick'), value: `${fmt(sStick.value, 2)} m`, color: 'var(--accent-2)' },
  { label: t('shadow-triangles.hTree'), value: `${fmt(hTree.value, 2)} m`, color: 'var(--accent)' },
  { label: t('shadow-triangles.sTree'), value: `${fmt(sTree.value, 2)} m`, color: 'var(--accent)' },
  { label: t('shadow-triangles.ratio'), value: `${fmt(hStick.value / sStick.value, 3)} = ${fmt(hTree.value / sTree.value, 3)}` },
  { label: t('shadow-triangles.relation'), value: congruent.value ? t('shadow-triangles.congruent') : t('shadow-triangles.similar'), color: congruent.value ? 'var(--pos)' : 'var(--accent)' },
])

function rightTriangle(baseX: number, h: number, s: number) {
  const px = PX.value
  const top = { x: baseX, y: groundY - h * px }
  const base = { x: baseX, y: groundY }
  const tip = { x: baseX + s * px, y: groundY }
  return { top, base, tip, path: `M${top.x},${top.y} L${base.x},${base.y} L${tip.x},${tip.y} Z` }
}
const stickTri = computed(() => rightTriangle(stickBaseX, hStick.value, sStick.value))
const treeTri = computed(() => rightTriangle(treeBaseX, hTree.value, sTree.value))

const sunRays = computed(() =>
  [stickTri.value.top, treeTri.value.top].map((p) => ({ x1: p.x - 90 * Math.cos(sun.value * D2R), y1: p.y - 90 * Math.sin(sun.value * D2R), x2: p.x, y2: p.y })),
)

const svg = ref<SVGSVGElement>()
const dragTarget = ref<'hStick' | 'hTree' | null>(null)
function drag(e: PointerEvent) {
  if (!dragTarget.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sy = ((e.clientY - box.top) / box.height) * H
  if (dragTarget.value === 'hStick') emit('set', 'hStick', Math.max(0.3, (groundY - sy) / PX.value))
  else if (dragTarget.value === 'hTree') emit('set', 'hTree', Math.max(0.3, (groundY - sy) / PX.value))
}
function down(which: 'hStick' | 'hTree', e: PointerEvent) {
  dragTarget.value = which
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragTarget.value = null
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="drag" @pointerup="up" @pointercancel="up">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('shadow-triangles.hint') }}</text>
      <line x1="40" :y1="groundY" x2="760" :y2="groundY" stroke="var(--line)" stroke-width="2" />

      <line v-for="(r, i) in sunRays" :key="i" :x1="r.x1" :y1="r.y1" :x2="r.x2" :y2="r.y2" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />

      <path :d="stickTri.path" fill="var(--accent-2)" fill-opacity="0.18" stroke="var(--accent-2)" stroke-width="2" />
      <path :d="treeTri.path" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="2" />

      <g class="num" font-size="13">
        <text :x="stickTri.top.x - 12" :y="(stickTri.top.y + stickTri.base.y) / 2" text-anchor="end" fill="var(--accent-2)">{{ fmt(hStick, 2) }} m</text>
        <text :x="(stickTri.base.x + stickTri.tip.x) / 2" :y="stickTri.base.y + 20" text-anchor="middle" fill="var(--accent-2)">{{ fmt(sStick, 2) }} m</text>
        <text :x="treeTri.top.x - 12" :y="(treeTri.top.y + treeTri.base.y) / 2" text-anchor="end" fill="var(--accent)">{{ fmt(hTree, 2) }} m</text>
        <text :x="(treeTri.base.x + treeTri.tip.x) / 2" :y="treeTri.base.y + 20" text-anchor="middle" fill="var(--accent)">{{ fmt(sTree, 2) }} m</text>
      </g>

      <circle :cx="stickTri.top.x" :cy="stickTri.top.y" r="7" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" class="cursor-grab" @pointerdown="down('hStick', $event)" />
      <circle :cx="treeTri.top.x" :cy="treeTri.top.y" r="7" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" class="cursor-grab" @pointerdown="down('hTree', $event)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
