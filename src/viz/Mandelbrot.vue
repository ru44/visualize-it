<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Repeat z = z^2 + c starting from z = 0. If |z| ever passes 2 it will run away to infinity — colour the
// point by how many rounds that took. Points that never pass 2 (up to the cap) are the Mandelbrot set itself.
// params: zoom (view width halves each +1), cx/cy (the point the view is centred on).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const PW = 240
const PH = 144
const canvas = ref<HTMLCanvasElement>()
const cx = computed(() => Math.max(-2, Math.min(1, props.params.cx ?? -0.5)))
const cy = computed(() => Math.max(-1.2, Math.min(1.2, props.params.cy ?? 0)))
const zoom = computed(() => Math.max(0, Math.min(8, props.params.zoom ?? 0)))
const maxIter = computed(() => Math.round(Math.min(300, 60 + zoom.value * 25)))
const insidePct = ref(0)

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const v = parseInt(n || '000000', 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
const lerp = (a: number[], b: number[], t: number) => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t)

function draw() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  const cs = getComputedStyle(document.documentElement)
  const palette = [hexToRgb(cs.getPropertyValue('--accent')), hexToRgb(cs.getPropertyValue('--accent-2')), hexToRgb(cs.getPropertyValue('--pos'))]
  const inside = hexToRgb(cs.getPropertyValue('--fg'))
  const img = ctx.createImageData(PW, PH)
  const scale = (PW / 3.2) * Math.pow(2, zoom.value)
  const iters = maxIter.value
  let insideCount = 0
  for (let j = 0; j < PH; j++) {
    const y0 = cy.value + (j - PH / 2) / scale
    for (let i = 0; i < PW; i++) {
      const x0 = cx.value + (i - PW / 2) / scale
      let x = 0
      let y = 0
      let x2 = 0
      let y2 = 0
      let k = 0
      while (x2 + y2 < 4 && k < iters) {
        y = 2 * x * y + y0
        x = x2 - y2 + x0
        x2 = x * x
        y2 = y * y
        k++
      }
      let rgb: number[]
      if (k >= iters) {
        rgb = inside
        insideCount++
      } else {
        const band = 12
        const idx = Math.floor(k / band) % palette.length
        const frac = (k % band) / band
        rgb = lerp(palette[idx], palette[(idx + 1) % palette.length], frac)
      }
      const o = (j * PW + i) * 4
      img.data[o] = rgb[0]
      img.data[o + 1] = rgb[1]
      img.data[o + 2] = rgb[2]
      img.data[o + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  insidePct.value = (100 * insideCount) / (PW * PH)
}
watch([cx, cy, zoom], draw)
let obs: MutationObserver | null = null
onMounted(() => {
  draw()
  obs = new MutationObserver(draw)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})
onUnmounted(() => obs?.disconnect())

const readouts = computed(() => [
  { label: t('mandel.zoom'), value: `×${fmt(Math.pow(2, zoom.value), 1)}`, color: 'var(--accent)' },
  { label: t('mandel.center'), value: `${fmt(cx.value, 3)}, ${fmt(cy.value, 3)}i` },
  { label: t('mandel.iter'), value: String(maxIter.value) },
  { label: t('mandel.inside'), value: `${fmt(insidePct.value, 1)}%`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <div class="relative">
      <canvas ref="canvas" :width="PW" :height="PH" class="block w-full select-none" style="image-rendering: pixelated; aspect-ratio: 5 / 3" />
      <p class="num pointer-events-none absolute start-3 top-2 text-xs" style="color: var(--muted)">{{ t('mandel.hint') }}</p>
    </div>
    <Readouts :items="readouts" />
  </div>
</template>
