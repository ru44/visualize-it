<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// biology/hardy-weinberg. param x = p, the frequency of allele A. Left: the Punnett square whose
// areas ARE p², 2pq and q². Right: a village of 100 individuals coloured by genotype, so the
// algebra and the population are the same picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = computed(() => Math.min(Math.max(props.params.x ?? 0.3, 0), 1))
const q = computed(() => 1 - p.value)
const pAA = computed(() => p.value * p.value)
const pAa = computed(() => 2 * p.value * q.value)
const paa = computed(() => q.value * q.value)

const SQ = 240
const SX = 80
const SY = 130
const split = computed(() => SQ * p.value)

const nAA = computed(() => Math.round(pAA.value * 100))
const naa = computed(() => Math.round(paa.value * 100))
const nAa = computed(() => 100 - nAA.value - naa.value)
const people = computed(() => {
  const arr: { x: number; y: number; g: 0 | 1 | 2 }[] = []
  for (let i = 0; i < 100; i++) {
    const g = i < nAA.value ? 0 : i < nAA.value + nAa.value ? 1 : 2
    arr.push({ x: 455 + (i % 10) * 32, y: 120 + Math.floor(i / 10) * 30, g })
  }
  return arr
})

// --- Drag inside the Punnett square to set p ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.round(Math.min(1, Math.max(0, (px - SX) / SQ)) * 100) / 100)
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  if (px > SX + SQ + 40) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'p (A)', value: fmt(p.value, 2), color: 'var(--accent)' },
  { label: 'q = 1−p (a)', value: fmt(q.value, 2), color: 'var(--accent-2)' },
  { label: 'p² (AA)', value: `${fmt(pAA.value, 3)} · ${nAA.value}/100`, color: 'var(--accent)' },
  { label: '2pq (Aa)', value: `${fmt(pAa.value, 3)} · ${nAa.value}/100` },
  { label: 'q² (aa)', value: `${fmt(paa.value, 3)} · ${naa.value}/100`, color: 'var(--accent-2)' },
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
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('hw.hint') }}</text>
      <!-- Punnett square: the areas are the genotype shares -->
      <text :x="SX + SQ / 2" :y="SY - 36" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hw.square') }}</text>
      <rect :x="SX" :y="SY" :width="split" :height="split" fill="var(--accent)" opacity="0.85" />
      <rect :x="SX + split" :y="SY" :width="SQ - split" :height="split" fill="var(--accent)" opacity="0.35" />
      <rect :x="SX" :y="SY + split" :width="split" :height="SQ - split" fill="var(--accent)" opacity="0.35" />
      <rect :x="SX + split" :y="SY + split" :width="SQ - split" :height="SQ - split" fill="var(--accent-2)" opacity="0.8" />
      <rect :x="SX" :y="SY" :width="SQ" :height="SQ" fill="none" stroke="var(--line)" />
      <text v-if="p > 0.14" :x="SX + split / 2" :y="SY + split / 2 + 5" text-anchor="middle" font-size="14" fill="#fff" class="num">AA</text>
      <text v-if="p > 0.1 && q > 0.1" :x="SX + split + (SQ - split) / 2" :y="SY + split / 2 + 5" text-anchor="middle" font-size="13" fill="var(--fg)" class="num">Aa</text>
      <text v-if="p > 0.1 && q > 0.1" :x="SX + split / 2" :y="SY + split + (SQ - split) / 2 + 5" text-anchor="middle" font-size="13" fill="var(--fg)" class="num">Aa</text>
      <text v-if="q > 0.14" :x="SX + split + (SQ - split) / 2" :y="SY + split + (SQ - split) / 2 + 5" text-anchor="middle" font-size="14" fill="#fff" class="num">aa</text>
      <!-- axis labels: egg and sperm each carry A with chance p -->
      <text :x="SX + split / 2" :y="SY - 10" text-anchor="middle" font-size="12" fill="var(--accent)" class="num">A · p = {{ fmt(p, 2) }}</text>
      <text :x="SX + split + (SQ - split) / 2" :y="SY - 10" text-anchor="middle" font-size="12" fill="var(--accent-2)" class="num">a · {{ fmt(q, 2) }}</text>
      <text :x="SX - 14" :y="SY + split / 2 + 4" text-anchor="end" font-size="12" fill="var(--accent)" class="num">A</text>
      <text :x="SX - 14" :y="SY + split + (SQ - split) / 2 + 4" text-anchor="end" font-size="12" fill="var(--accent-2)" class="num">a</text>
      <text :x="SX + SQ / 2" :y="SY + SQ + 28" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hw.areas') }}</text>
      <!-- the same shares as 100 villagers -->
      <text x="599" y="94" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hw.village') }}</text>
      <g v-for="(person, i) in people" :key="i">
        <circle :cx="person.x" :cy="person.y" r="10" :fill="person.g === 0 ? 'var(--accent)' : person.g === 2 ? 'var(--accent-2)' : 'var(--accent)'" :opacity="person.g === 1 ? 0.45 : 0.9" />
        <circle v-if="person.g === 1" :cx="person.x" :cy="person.y" r="10" fill="none" stroke="var(--accent-2)" stroke-width="3" />
      </g>
      <text x="599" y="438" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hw.legend', { aa: nAA, ab: nAa, bb: naa }) }}</text>
      <text :x="W / 2" :y="H - 12" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('hw.equilibrium') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
