<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// ai/diffusion. params step (how far along the denoising walk, %), seed (which noise we started
// from). Each pixel is a blend between deterministic static and the target picture; the same slider
// run backwards is exactly how the model was trained (clean → noisy), and different seeds walk to
// different pictures — that is where the variety of generated images comes from.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const N = 14
const step = computed(() => Math.min(Math.max(props.params.step ?? 0, 0), 100))
const seed = computed(() => Math.min(Math.max(Math.round(props.params.seed ?? 1), 1), 6))

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + seed.value * 78.233) * 43758.5453
  return x - Math.floor(x)
}

// three 14×14 targets; the seed picks which one this noise happens to walk to
const PICS: string[][] = [
  // a heart
  '00000000000000,00110000011000,01111000111100,11111101111110,11111111111110,11111111111110,01111111111100,00111111111000,00011111110000,00001111100000,00000111000000,00000010000000,00000000000000,00000000000000'.split(','),
  // a star
  '00000001000000,00000011100000,00000011100000,00000111110000,01111111111110,00111111111100,00011111111000,00001111110000,00011111111000,00011100111000,00111000011100,00110000001100,00000000000000,00000000000000'.split(','),
  // a moon
  '00000111110000,00011111111000,00111111100000,01111110000000,01111100000000,11111100000000,11111000000000,11111000000000,11111100000000,01111100000000,01111110000000,00111111100000,00011111111000,00000111110000'.split(','),
]
const pic = computed(() => PICS[(seed.value - 1) % 3])
const u = computed(() => {
  const x = step.value / 100
  return x * x * (3 - 2 * x)
})
// pixel brightness: pure static at step 0, the picture at step 100
function bright(r: number, c: number) {
  const target = pic.value[r][c] === '1' ? 1 : 0
  return (1 - u.value) * rnd(r * N + c + 1) + u.value * target
}
const noisePct = computed(() => 100 - step.value)

const CELL = 19
const GX = 270
const GY = 80

const readouts = computed(() => [
  { label: t('dfu.step'), value: `${fmt(step.value, 0)}%` },
  { label: t('dfu.noise'), value: `${fmt(noisePct.value, 0)}%`, color: noisePct.value > 50 ? 'var(--accent-2)' : 'var(--pos)' },
  { label: t('dfu.seed'), value: `#${fmt(seed.value, 0)}`, color: 'var(--accent)' },
  { label: t('dfu.verdict'), value: step.value >= 95 ? t('dfu.clean') : step.value <= 5 ? t('dfu.static') : t('dfu.emerging') },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('dfu.hint') }}</text>

      <!-- the two directions, written over the image -->
      <text x="400" y="58" text-anchor="middle" font-size="11" fill="var(--accent-2)">{{ t('dfu.trainDir') }} ⟶</text>
      <text x="400" y="420" text-anchor="middle" font-size="11" fill="var(--pos)">⟵ {{ t('dfu.genDir') }}</text>

      <!-- the canvas -->
      <rect :x="GX - 6" :y="GY - 6" :width="N * CELL + 11" :height="N * CELL + 11" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="r in N" :key="'r' + r">
        <rect
          v-for="c in N"
          :key="'c' + c"
          :x="GX + (c - 1) * CELL"
          :y="GY + (r - 1) * CELL"
          :width="CELL - 1"
          :height="CELL - 1"
          fill="var(--accent)"
          :opacity="0.06 + 0.9 * bright(r - 1, c - 1)"
        />
      </g>

      <!-- progress rail with both labels -->
      <rect x="150" y="440" width="500" height="10" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="150" y="440" :width="500 * (step / 100)" height="10" rx="4" fill="var(--pos)" />
      <text x="150" y="434" font-size="9" fill="var(--muted)">{{ t('dfu.pure') }}</text>
      <text x="650" y="434" text-anchor="end" font-size="9" fill="var(--muted)">{{ t('dfu.picture') }}</text>

      <text x="60" y="240" text-anchor="middle" font-size="10" fill="var(--muted)" :transform="`rotate(-90 60 240)`">{{ t('dfu.side') }}</text>
      <text x="740" y="240" text-anchor="middle" font-size="10" fill="var(--muted)" :transform="`rotate(90 740 240)`">{{ t('dfu.sideGen') }}</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dfu.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
