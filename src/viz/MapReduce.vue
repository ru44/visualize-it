<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Counting words in four documents on four machines. param step: 0 split, 1 map, 2 shuffle, 3 reduce.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const step = computed(() => Math.max(0, Math.min(3, Math.round(props.params.step ?? 0))))
const docs = computed(() => [1, 2, 3, 4].map((i) => t(`mr.doc${i}` as any)))
const words = computed(() => docs.value.map((d) => d.split(/\s+/).filter(Boolean)))
const unique = computed(() => [...new Set(words.value.flat())])
const totals = computed(() => unique.value.map((w) => ({ w, n: words.value.flat().filter((x) => x === w).length })))
const palette = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)', 'var(--fg)', 'var(--muted)']
const colorOf = (w: string) => palette[unique.value.indexOf(w) % palette.length]
const readouts = computed(() => [
  { label: t('mr.stage'), value: t(`mr.s${step.value}` as any), color: 'var(--accent-2)' },
  { label: t('mr.machines'), value: '4' },
  { label: t('mr.words'), value: String(words.value.flat().length) },
  { label: t('mr.unique'), value: String(unique.value.length) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <g class="num" font-size="12">
        <g v-for="s in 4" :key="s" class="cursor-pointer" @click="emit('set', 'step', s - 1)">
          <rect :x="16 + (s - 1) * 196" y="10" width="186" height="30" rx="8" :fill="s - 1 <= step ? 'var(--fg)' : 'var(--panel)'" stroke="var(--line)" />
          <text :x="16 + (s - 1) * 196 + 93" y="30" text-anchor="middle" :fill="s - 1 <= step ? 'var(--bg)' : 'var(--fg)'">{{ s }} · {{ t(`mr.s${s - 1}` as any) }}</text>
        </g>
      </g>
      <!-- machines with their documents -->
      <g v-for="(d, i) in docs" :key="i" :transform="`translate(16, ${62 + i * 100})`">
        <rect width="190" height="84" rx="10" fill="var(--panel)" stroke="var(--line)" />
        <text x="10" y="20" font-size="11" fill="var(--muted)">{{ t('mr.machine') }} {{ i + 1 }}</text>
        <text x="10" y="48" font-size="14" fill="var(--fg)">{{ d }}</text>
      </g>
      <!-- map output -->
      <g v-if="step >= 1">
        <g v-for="(ws, i) in words" :key="'m' + i" :transform="`translate(230, ${62 + i * 100})`">
          <g v-for="(w, j) in ws" :key="j"><rect :x="(j % 3) * 88" :y="Math.floor(j / 3) * 28" width="82" height="22" rx="5" :fill="colorOf(w)" fill-opacity="0.2" :stroke="colorOf(w)" /><text :x="(j % 3) * 88 + 8" :y="Math.floor(j / 3) * 28 + 15" font-size="12" fill="var(--fg)">{{ w }}, 1</text></g>
        </g>
      </g>
      <!-- shuffle + reduce -->
      <g v-if="step >= 2" transform="translate(510, 62)">
        <g v-for="(tt, i) in totals" :key="tt.w" :transform="`translate(0, ${i * Math.min(64, 390 / totals.length)})`">
          <rect width="270" :height="Math.min(56, 390 / totals.length - 6)" rx="8" :fill="colorOf(tt.w)" fill-opacity="0.12" :stroke="colorOf(tt.w)" />
          <text x="10" y="20" font-size="13" fill="var(--fg)">{{ tt.w }}: <tspan fill="var(--muted)">{{ Array(tt.n).fill('1').join(' + ') }}</tspan></text>
          <text v-if="step >= 3" x="258" y="22" text-anchor="end" font-size="18" font-weight="600" :fill="colorOf(tt.w)">{{ tt.n }}</text>
        </g>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
