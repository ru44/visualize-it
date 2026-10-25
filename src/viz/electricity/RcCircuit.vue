<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRafLoop } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// electricity/rc-circuit. params V0 (V), R (kΩ), C (µF), x = time since the switch closed (s).
// A real circuit: battery, resistor, capacitor. The time slider scrubs the charging moment —
// plate charge fills as V_C = V0(1−e^(−t/τ)) and the current dots slow down as the capacitor
// pushes back. τ = RC lands in seconds because kΩ·µF = ms·… (R·C/1000 here).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const V0 = computed(() => Math.max(props.params.V0 ?? 9, 0.1))
const R = computed(() => Math.max(props.params.R ?? 2, 0.1))
const C = computed(() => Math.max(props.params.C ?? 1000, 1))
const time = computed(() => Math.max(props.params.x ?? 2, 0))
const tauS = computed(() => (R.value * C.value) / 1000)
const vc = computed(() => V0.value * (1 - Math.exp(-time.value / tauS.value)))
const cur = computed(() => (V0.value / R.value) * Math.exp(-time.value / tauS.value)) // mA
const fillFrac = computed(() => vc.value / V0.value)

// --- current dots around the loop; speed follows the instantaneous current ---
// loop: (170,360)→(170,140)→(630,140)→(630,360)→back
const SEG = [220, 460, 220, 460]
const PER = SEG[0] + SEG[1] + SEG[2] + SEG[3]
const shift = ref(0)
useRafLoop((dt) => {
  shift.value = (shift.value + (cur.value / (V0.value / R.value)) * 90 * dt) % (PER / 12)
})
const dotXY = (dist: number) => {
  let s = dist % PER
  if (s < SEG[0]) return { x: 170, y: 360 - s }
  s -= SEG[0]
  if (s < SEG[1]) return { x: 170 + s, y: 140 }
  s -= SEG[1]
  if (s < SEG[2]) return { x: 630, y: 140 + s }
  s -= SEG[2]
  return { x: 630 - s, y: 360 }
}
const dots = computed(() => Array.from({ length: 12 }, (_, i) => dotXY(i * (PER / 12) + shift.value)))
const plateMarks = computed(() => Math.round(fillFrac.value * 6))

// --- mini chart of V_C(t), with the scrubbed moment marked ---
const CH = { x: 270, y: 236, w: 260, h: 150 }
const pts = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 60; i++) {
    const tt = (i / 60) * 10
    const v = V0.value * (1 - Math.exp(-tt / tauS.value))
    out.push(`${CH.x + (tt / 10) * CH.w},${CH.y + CH.h - (v / 12) * CH.h}`)
  }
  return out.join(' ')
})
const markX = computed(() => CH.x + (Math.min(time.value, 10) / 10) * CH.w)
const markY = computed(() => CH.y + CH.h - (vc.value / 12) * CH.h)

// drag horizontally over the chart to scrub time
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.round(Math.min(10, Math.max(0, ((px - CH.x) / CH.w) * 10)) * 100) / 100)
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'τ = RC', value: `${fmt(tauS.value, 2)} s` },
  { label: 't', value: `${fmt(time.value, 2)} s` },
  { label: 'V_C', value: `${fmt(vc.value, 2)} V`, color: 'var(--accent)' },
  { label: 'I', value: `${fmt(cur.value, 3)} mA`, color: 'var(--accent-2)' },
  { label: t('rcc.charged'), value: `${fmt(fillFrac.value * 100, 1)}%`, color: fillFrac.value > 0.99 ? 'var(--pos)' : undefined },
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
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('rcc.hint') }}</text>
      <!-- the loop -->
      <path d="M170,360 V140 H630 V360 H170" fill="none" stroke="var(--line)" stroke-width="3" />
      <circle v-for="(dt2, i) in dots" :key="i" :cx="dt2.x" :cy="dt2.y" r="4" fill="var(--accent-2)" :opacity="cur / (V0 / R) < 0.02 ? 0.2 : 0.9" />
      <!-- battery on the left -->
      <rect x="150" y="228" width="40" height="44" fill="var(--panel)" stroke="var(--line)" />
      <line x1="156" y1="238" x2="184" y2="238" stroke="var(--fg)" stroke-width="3" />
      <line x1="163" y1="250" x2="177" y2="250" stroke="var(--fg)" stroke-width="2" />
      <text x="140" y="256" text-anchor="end" font-size="12" fill="var(--fg)" class="num">V₀ = {{ fmt(V0, 1) }} V</text>
      <!-- resistor on the top -->
      <path d="M350,140 l10,-12 l16,24 l16,-24 l16,24 l16,-24 l10,12" fill="none" stroke="var(--accent-2)" stroke-width="3" />
      <text x="400" y="112" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">R = {{ fmt(R, 1) }} kΩ</text>
      <!-- capacitor on the right: plates fill with + and − as V_C rises -->
      <line x1="630" y1="228" x2="630" y2="236" stroke="var(--line)" stroke-width="3" />
      <line x1="600" y1="236" x2="660" y2="236" stroke="var(--accent)" stroke-width="5" />
      <line x1="600" y1="258" x2="660" y2="258" stroke="var(--accent)" stroke-width="5" />
      <line x1="630" y1="258" x2="630" y2="266" stroke="var(--line)" stroke-width="3" />
      <text v-for="i in plateMarks" :key="'pl' + i" :x="586 + i * 12" y="232" text-anchor="middle" font-size="11" fill="var(--accent)" class="num">+</text>
      <text v-for="i in plateMarks" :key="'mn' + i" :x="586 + i * 12" y="272" text-anchor="middle" font-size="11" fill="var(--accent)" class="num">−</text>
      <text x="676" y="251" font-size="12" fill="var(--fg)" class="num">C = {{ fmt(C, 0) }} µF</text>
      <text x="676" y="271" font-size="12" fill="var(--accent)" class="num">V_C = {{ fmt(vc, 2) }} V</text>
      <!-- the charging curve, scrubbed by t -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <polyline :points="pts" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="markX" :y1="CH.y" :x2="markX" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <circle :cx="markX" :cy="markY" r="5" fill="var(--accent-2)" />
      <text :x="CH.x + 4" :y="CH.y + 14" font-size="10" fill="var(--muted)" class="num">V_C(t)</text>
      <text :x="CH.x + CH.w - 4" :y="CH.y + CH.h + 14" text-anchor="end" font-size="10" fill="var(--muted)" class="num">t · 0–10 s</text>
      <text :x="CH.x + CH.w / 2" :y="CH.y + CH.h + 14" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('rcc.scrub') }}</text>
      <text :x="W / 2" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rcc.caption', { tau: fmt(tauS, 2) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
