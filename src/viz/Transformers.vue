<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/transformers. params: Np, Ns (turns), Vp (V), P (W), R (line ohms).
// Vs = Vp*Ns/Np, I = P/Vp, Ploss = I^2*R. The core shows the turns ratio; the line below shows how
// much of the sent power is lost to heat, which shrinks fast as Vp (dragged, log-scaled) rises.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const Np = computed(() => Math.max(props.params.Np ?? 1000, 1))
const Ns = computed(() => Math.max(props.params.Ns ?? 50, 1))
const Vp = computed(() => Math.max(props.params.Vp ?? 230, 1))
const P = computed(() => Math.max(props.params.P ?? 1000000, 0))
const R = computed(() => Math.max(props.params.R ?? 5, 0))

const Vs = computed(() => (Vp.value * Ns.value) / Np.value)
const I = computed(() => P.value / Vp.value)
const Ploss = computed(() => I.value ** 2 * R.value)
const lossFrac = computed(() => Math.min(1, P.value > 0 ? Ploss.value / P.value : 0))

const turnsP = computed(() => Math.round(Math.min(14, 2 + Math.sqrt(Np.value) / 3)))
const turnsS = computed(() => Math.round(Math.min(14, 2 + Math.sqrt(Ns.value) / 3)))

const LEG_L = 300
const LEG_R = 500
const CORE_TOP = 55
const CORE_BOT = 250

function coilLoops(legX: number, n: number) {
  const out: { cx: number; cy: number }[] = []
  const step = (CORE_BOT - CORE_TOP - 30) / Math.max(1, n - 1)
  for (let i = 0; i < n; i++) out.push({ cx: legX, cy: CORE_TOP + 15 + i * step })
  return out
}
const loopsP = computed(() => coilLoops(LEG_L, turnsP.value))
const loopsS = computed(() => coilLoops(LEG_R, turnsS.value))

// --- drag the power line to set Vp on a log scale (it spans 200 V to 400,000 V) ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
const LINE_X0 = 90
const LINE_X1 = 710
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const frac = Math.min(1, Math.max(0, (px - LINE_X0) / (LINE_X1 - LINE_X0)))
  const vp = 200 * Math.pow(400000 / 200, frac)
  emit('set', 'Vp', Math.min(400000, Math.max(200, vp)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const linePx = computed(() => LINE_X0 + (Math.log(Vp.value / 200) / Math.log(400000 / 200)) * (LINE_X1 - LINE_X0))

const readouts = computed(() => [
  { label: 'N_p : N_s', value: `${fmt(Np.value, 4)} : ${fmt(Ns.value, 4)}` },
  { label: 'V_s = V_p N_s/N_p', value: `${fmt(Vs.value, 4)} V`, color: 'var(--accent-2)' },
  { label: 'I = P/V_p', value: `${fmt(I.value, 4)} A` },
  { label: 'P_loss = I²R', value: `${fmt(Ploss.value, 4)} W (${fmt(lossFrac.value * 100, 3)}%)`, color: 'var(--neg)' },
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
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('tf.hint') }}</text>

      <!-- iron core (loop) -->
      <rect :x="LEG_L - 40" :y="CORE_TOP" :width="LEG_R - LEG_L + 80" :height="CORE_BOT - CORE_TOP" rx="16" fill="none" stroke="var(--muted)" stroke-width="20" />

      <!-- primary coil -->
      <ellipse v-for="(p, i) in loopsP" :key="'p' + i" :cx="p.cx" :cy="p.cy" rx="13" ry="8" fill="none" stroke="var(--accent)" stroke-width="3" />
      <text :x="LEG_L" :y="CORE_TOP - 14" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('tf.primary') }} (N_p)</text>
      <line :x1="LEG_L" :y1="CORE_BOT + 30" :x2="LEG_L" :y2="CORE_BOT + 6" stroke="var(--accent)" stroke-width="2.5" />
      <text :x="LEG_L" :y="CORE_BOT + 50" text-anchor="middle" font-size="13" fill="var(--fg)">V_p</text>

      <!-- secondary coil -->
      <ellipse v-for="(p, i) in loopsS" :key="'s' + i" :cx="p.cx" :cy="p.cy" rx="13" ry="8" fill="none" stroke="var(--accent-2)" stroke-width="3" />
      <text :x="LEG_R" :y="CORE_TOP - 14" text-anchor="middle" font-size="12" fill="var(--accent-2)">{{ t('tf.secondary') }} (N_s)</text>
      <line :x1="LEG_R" :y1="CORE_BOT + 30" :x2="LEG_R" :y2="CORE_BOT + 6" stroke="var(--accent-2)" stroke-width="2.5" />
      <text :x="LEG_R" :y="CORE_BOT + 50" text-anchor="middle" font-size="13" fill="var(--fg)">V_s</text>

      <!-- transmission line + loss -->
      <text :x="W / 2" :y="330" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('tf.lossCaption') }}</text>
      <rect :x="LINE_X0" y="345" :width="LINE_X1 - LINE_X0" height="18" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="LINE_X0" y="345" :width="(LINE_X1 - LINE_X0) * lossFrac" height="18" rx="4" fill="var(--neg)" />
      <circle :cx="linePx" cy="354" r="9" fill="var(--fg)" style="cursor: ew-resize" />
      <text :x="LINE_X0" y="392" font-size="12" fill="var(--muted)">200 V</text>
      <text :x="LINE_X1" y="392" text-anchor="end" font-size="12" fill="var(--muted)">400,000 V</text>
      <text :x="W / 2" y="425" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">V_p = {{ fmt(Vp, 4) }} V</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
