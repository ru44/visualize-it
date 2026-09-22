<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Gravitational lensing: a heavy (possibly invisible) mass bends light from a galaxy behind it into arcs, or a full
// Einstein ring when they line up. params M (lens mass, sets the Einstein radius), offset (source position).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const canvas = ref<HTMLCanvasElement>()
const M = computed(() => props.params.M ?? 4)
const off = computed(() => props.params.offset ?? 0.25)
const thetaE = computed(() => 0.12 * Math.sqrt(M.value)) // in units of half the picture height
const PW = 320
const PH = 192
function draw() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(PW, PH)
  const dark = document.documentElement.dataset.theme === 'dark'
  const bg = dark ? [11, 15, 26] : [245, 246, 250]
  const E2 = thetaE.value ** 2
  for (let j = 0; j < PH; j++)
    for (let i = 0; i < PW; i++) {
      const x = ((i - PW / 2) / (PH / 2)) * 1
      const y = (j - PH / 2) / (PH / 2)
      const r2 = x * x + y * y + 1e-9
      const bx = x - (E2 * x) / r2 - off.value
      const by = y - (E2 * y) / r2
      const s = Math.exp(-((bx * bx) / 0.006 + (by * by) / 0.004))
      const lens = Math.exp(-r2 / 0.0015) * 0.9
      const k = (j * PW + i) * 4
      img.data[k] = bg[0] + (255 - bg[0]) * Math.min(1, s * 1.0) * 0.95 + lens * 60
      img.data[k + 1] = bg[1] + (200 - bg[1]) * Math.min(1, s) * 0.9 + lens * 50
      img.data[k + 2] = bg[2] + (120 - bg[2]) * Math.min(1, s) * 0.8 + lens * 90
      img.data[k + 3] = 255
    }
  ctx.putImageData(img, 0, 0)
}
watch([M, off], draw)
let obs: MutationObserver | null = null
onMounted(() => { draw(); obs = new MutationObserver(draw); obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }) })
onUnmounted(() => obs?.disconnect())
const magnification = computed(() => { const u = Math.abs(off.value) / thetaE.value; return u < 1e-3 ? '≫ 10' : fmt((u * u + 2) / (u * Math.sqrt(u * u + 4)), 2) })
const readouts = computed(() => [
  { label: t('lens.radius'), value: fmt(thetaE.value, 3), color: 'var(--accent-2)' },
  { label: t('lens.offset'), value: fmt(off.value, 3) },
  { label: t('lens.magnification'), value: magnification.value, color: 'var(--accent)' },
  { label: t('lens.shape'), value: Math.abs(off.value) < 0.02 ? t('lens.ring') : Math.abs(off.value) < thetaE.value ? t('lens.arcs') : t('lens.shifted') },
])
</script>

<template>
  <div>
    <div class="relative">
      <canvas ref="canvas" :width="PW" :height="PH" class="block w-full" style="image-rendering: auto; aspect-ratio: 5 / 3" />
      <p class="num pointer-events-none absolute start-3 top-2 text-xs" style="color: var(--muted)">{{ t('lens.hint') }}</p>
    </div>
    <Readouts :items="readouts" />
  </div>
</template>
