<script setup lang="ts">
import { computed } from 'vue'
import { elements, shells, type Cat } from './elements'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The table coloured by category; params Z selects an element (tap a cell). options.colorBy: 'category' | 'mass'.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const cell = 40
const ox = 24
const oy = 40
const colors: Record<Cat, string> = { alkali: '#e11d48', alkaline: '#f97316', transition: '#eab308', post: '#22c55e', metalloid: '#14b8a6', nonmetal: '#3b82f6', halogen: '#8b5cf6', noble: '#ec4899', lanthanide: '#a3a3a3', actinide: '#737373' }
const Z = computed(() => Math.min(86, Math.max(1, Math.round(props.params.Z ?? 6))))
const sel = computed(() => elements[Z.value - 1])
const pos = (e: (typeof elements)[number]) => (e.g === 0 ? { x: ox + (e.z - 57 + 3) * cell, y: oy + 8.5 * cell } : { x: ox + (e.g - 1) * cell, y: oy + (e.p - 1) * cell })
const sh = computed(() => shells(Z.value))
const readouts = computed(() => [
  { label: t('ptable.element'), value: `${sel.value.s} · ${sel.value.n}`, color: colors[sel.value.c] },
  { label: 'Z', value: String(sel.value.z) },
  { label: t('ptable.mass'), value: fmt(sel.value.m, 3) + ' u' },
  { label: t('ptable.groupPeriod'), value: `${sel.value.g || '—'} / ${sel.value.p}` },
  { label: t('ptable.shells'), value: sh.value.join(' · ') },
  { label: t('ptable.category'), value: t(`ptable.cat.${sel.value.c}` as any) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('ptable.hint') }}</text>
      <g v-for="e in elements" :key="e.z" class="cursor-pointer" @click="emit('set', 'Z', e.z)">
        <rect :x="pos(e).x + 1" :y="pos(e).y + 1" :width="cell - 2" :height="cell - 2" rx="4" :fill="colors[e.c]" :fill-opacity="e.z === Z ? 1 : 0.55" :stroke="e.z === Z ? 'var(--fg)' : 'none'" stroke-width="2" />
        <text class="num" :x="pos(e).x + cell / 2" :y="pos(e).y + cell / 2 + 5" text-anchor="middle" font-size="13" font-weight="600" fill="#fff">{{ e.s }}</text>
        <text class="num" :x="pos(e).x + 4" :y="pos(e).y + 11" font-size="8" fill="#fff" fill-opacity="0.85">{{ e.z }}</text>
      </g>
      <!-- selected element card with shells -->
      <g :transform="`translate(${ox + 3 * cell + 10}, ${oy + 6})`">
        <rect x="0" y="0" width="290" height="110" rx="10" fill="var(--panel)" stroke="var(--line)" />
        <text class="num" x="16" y="42" font-size="34" font-weight="600" fill="var(--fg)">{{ sel.s }}</text>
        <text x="16" y="66" font-size="13" fill="var(--fg)">{{ sel.n }}</text>
        <text class="num" x="16" y="88" font-size="11" fill="var(--muted)">Z = {{ sel.z }} · {{ fmt(sel.m, 2) }} u</text>
        <g transform="translate(225, 55)">
          <circle r="5" :fill="colors[sel.c]" />
          <circle v-for="(n, i) in sh" :key="i" :r="10 + i * 7" fill="none" stroke="var(--muted)" stroke-opacity="0.6" />
          <circle v-for="(n, i) in sh" :key="'e' + i" :cx="(10 + i * 7) * Math.cos(i)" :cy="(10 + i * 7) * Math.sin(i)" r="2" fill="var(--accent)" />
          <text class="num" x="0" y="58" text-anchor="middle" font-size="10" fill="var(--muted)">{{ sh.join('·') }}</text>
        </g>
      </g>
      <g class="num" font-size="10">
        <template v-for="(col, cat, i) in colors" :key="cat"><rect :x="ox + (i % 5) * 150" :y="H - 42 + Math.floor(i / 5) * 18" width="10" height="10" rx="2" :fill="col" /><text :x="ox + (i % 5) * 150 + 14" :y="H - 33 + Math.floor(i / 5) * 18" fill="var(--muted)">{{ t(`ptable.cat.${cat}` as any) }}</text></template>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
