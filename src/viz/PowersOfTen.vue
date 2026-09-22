<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A logarithmic ruler: each step to the right is ten times bigger. options.mode: 'size' (metres), 'bytes', 'numbers'.
// param e is the exponent; the nearest landmark is shown large. Drag along the ruler to move.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
type Item = { id: string; e: number; icon: string }
const sets: Record<string, { min: number; max: number; unit: string; items: Item[] }> = {
  size: { min: -15, max: 27, unit: 'm', items: [
    { id: 'proton', e: -15, icon: '⚛️' }, { id: 'atom', e: -10, icon: '⚛️' }, { id: 'dna', e: -8.7, icon: '🧬' }, { id: 'bacterium', e: -6, icon: '🦠' },
    { id: 'hair', e: -4, icon: '〰️' }, { id: 'ant', e: -2.5, icon: '🐜' }, { id: 'child', e: 0.1, icon: '🧒' }, { id: 'field', e: 2, icon: '🏟️' },
    { id: 'everest', e: 3.95, icon: '🏔️' }, { id: 'earth', e: 7.1, icon: '🌍' }, { id: 'sun', e: 9.14, icon: '☀️' }, { id: 'earthSun', e: 11.18, icon: '🪐' },
    { id: 'lightYear', e: 15.98, icon: '✨' }, { id: 'galaxy', e: 21, icon: '🌌' }, { id: 'universe', e: 26.9, icon: '🔭' } ] },
  bytes: { min: 0, max: 22, unit: 'B', items: [
    { id: 'letter', e: 0, icon: '🔤' }, { id: 'message', e: 2, icon: '💬' }, { id: 'page', e: 3.3, icon: '📄' }, { id: 'photo', e: 6.5, icon: '🖼️' },
    { id: 'song', e: 6.7, icon: '🎵' }, { id: 'movie', e: 9.6, icon: '🎬' }, { id: 'phone', e: 11.1, icon: '📱' }, { id: 'laptop', e: 12, icon: '💻' },
    { id: 'petabyte', e: 15, icon: '🗄️' }, { id: 'exabyte', e: 18, icon: '🏢' }, { id: 'worldData', e: 21, icon: '🌐' } ] },
  numbers: { min: 0, max: 100, unit: '', items: [
    { id: 'thousand', e: 3, icon: '🏫' }, { id: 'million', e: 6, icon: '🏟️' }, { id: 'billion', e: 9, icon: '👥' }, { id: 'people', e: 9.9, icon: '🌍' },
    { id: 'trillion', e: 12, icon: '💰' }, { id: 'sand', e: 18.9, icon: '🏖️' }, { id: 'stars', e: 23, icon: '⭐' }, { id: 'atoms', e: 80, icon: '⚛️' }, { id: 'googol', e: 100, icon: '🔢' } ] },
}
const mode = computed(() => (props.options.mode ?? 'size') as keyof typeof sets)
const set = computed(() => sets[mode.value])
const e = computed(() => Math.max(set.value.min, Math.min(set.value.max, props.params.e ?? 0)))
const X0 = 40
const X1 = W - 40
const sx = (v: number) => X0 + ((v - set.value.min) / (set.value.max - set.value.min)) * (X1 - X0)
const nearest = computed(() => [...set.value.items].sort((a, b) => Math.abs(a.e - e.value) - Math.abs(b.e - e.value))[0])
const ticks = computed(() => { const step = set.value.max - set.value.min > 50 ? 10 : set.value.max - set.value.min > 25 ? 3 : 1; const out: number[] = []; for (let v = Math.ceil(set.value.min / step) * step; v <= set.value.max; v += step) out.push(v); return out })
const byteName = (x: number) => { const u = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; const k = Math.max(0, Math.min(8, Math.floor(x / 3))); return `${(10 ** (x - 3 * k)).toPrecision(3).replace(/\.?0+$/, '')} ${u[k]}` }
const written = computed(() => {
  const k = Math.round(e.value)
  if (mode.value === 'bytes') return byteName(e.value)
  if (k < 0) return `0.${'0'.repeat(-k - 1)}1 ${set.value.unit}`
  if (k <= 24) return '1' + ' '.repeat(0) + '0'.repeat(k).replace(/(?=(0{3})+$)/g, ' ') + (set.value.unit ? ` ${set.value.unit}` : '')
  return t('p10.zeros', { n: k })
})
const readouts = computed(() => [
  { label: t('p10.power'), value: `10^${e.value.toFixed(mode.value === 'numbers' ? 0 : 1)}`, color: 'var(--accent-2)' },
  { label: t('p10.written'), value: written.value },
  { label: t('p10.nearest'), value: t(`p10.${mode.value}.${nearest.value.id}` as any), color: 'var(--accent)' },
  { label: t('p10.times'), value: t('p10.stepsFrom', { n: Math.round(Math.abs(e.value - set.value.items[0].e)), what: t(`p10.${mode.value}.${set.value.items[0].id}` as any) }) },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(ev: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((ev.clientX - b.left) / b.width) * W
  emit('set', 'e', set.value.min + ((x - X0) / (X1 - X0)) * (set.value.max - set.value.min))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-ew-resize touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('p10.hint') }}</text>
      <text x="400" y="150" text-anchor="middle" font-size="96">{{ nearest.icon }}</text>
      <text x="400" y="200" text-anchor="middle" font-size="22" fill="var(--fg)">{{ t(`p10.${mode}.${nearest.id}` as any) }}</text>
      <text class="num" x="400" y="232" text-anchor="middle" font-size="16" fill="var(--accent-2)">{{ written }}</text>
      <line :x1="X0" :x2="X1" y1="340" y2="340" stroke="var(--muted)" stroke-width="2" />
      <g v-for="v in ticks" :key="v"><line :x1="sx(v)" :x2="sx(v)" y1="332" y2="348" stroke="var(--muted)" /><text class="num" :x="sx(v)" y="366" text-anchor="middle" font-size="10" fill="var(--muted)">{{ v }}</text></g>
      <g v-for="it in set.items" :key="it.id"><text :x="sx(it.e)" y="320" text-anchor="middle" :font-size="it.id === nearest.id ? 22 : 15" :opacity="it.id === nearest.id ? 1 : 0.55">{{ it.icon }}</text></g>
      <circle :cx="sx(e)" cy="340" r="9" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" />
      <text class="num" x="400" y="410" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('p10.rule') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
