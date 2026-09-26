<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Cardiac output CO = HR × SV: how much blood the heart moves each minute. The heart icon beats at
// the true period 60/HR seconds; the dot on the loop completes one full circuit of the body's ~5 L
// of blood in the true time it actually takes, 5000/CO minutes — both driven by the same CO number.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()

const W = 800
const H = 480
const HR = computed(() => Math.max(1, props.params.HR ?? 70))
const SV = computed(() => Math.max(1, props.params.SV ?? 70))
const coML = computed(() => HR.value * SV.value)
const coL = computed(() => coML.value / 1000)
const circSeconds = computed(() => (5000 / coML.value) * 60)

const elapsed = ref(0)
let raf = 0
let last = 0
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
function loop(now: number) {
  if (last) elapsed.value += (now - last) / 1000
  last = now
  raf = requestAnimationFrame(loop)
}
onMounted(() => { if (!reduced) raf = requestAnimationFrame(loop) })
onUnmounted(() => cancelAnimationFrame(raf))

const beatPhase = computed(() => (elapsed.value % (60 / HR.value)) / (60 / HR.value))
const heartScale = computed(() => 1 + 0.14 * Math.max(0, Math.sin(beatPhase.value * Math.PI * 2)) ** 2)

const loopCx = 560
const loopCy = 250
const loopR = 150
const angle = computed(() => ((elapsed.value % circSeconds.value) / circSeconds.value) * Math.PI * 2 - Math.PI / 2)
const dotX = computed(() => loopCx + loopR * Math.cos(angle.value))
const dotY = computed(() => loopCy + loopR * Math.sin(angle.value))

const gaugeMax = 30
const gaugeX = 300
const gaugeTop = 380
const gaugeW = 420
const gaugeFill = computed(() => gaugeW * Math.min(1, coL.value / gaugeMax))

const readouts = computed(() => [
  { label: t('co.hr'), value: `${fmt(HR.value, 0)} bpm` },
  { label: t('co.sv'), value: `${fmt(SV.value, 0)} mL` },
  { label: t('co.co'), value: `${fmt(coL.value, 1)} L/min`, color: 'var(--accent)' },
  { label: t('co.time'), value: `${fmt(circSeconds.value, 0)} s`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="24" y="28" font-size="13" fill="var(--muted)">{{ t('co.hint') }}</text>

      <g :transform="`translate(170,180) scale(${heartScale})`">
        <path d="M0,-28 C0,-48 -30,-48 -40,-24 C-50,-48 -80,-48 -80,-28 C-80,4 -40,44 0,64 C40,44 80,4 80,-28 C80,-48 50,-48 40,-24 C30,-48 0,-48 0,-28 Z" fill="var(--neg)" opacity="0.85" />
      </g>
      <text x="170" y="290" font-size="12" text-anchor="middle" fill="var(--muted)">{{ t('co.heart') }}</text>

      <circle :cx="loopCx" :cy="loopCy" :r="loopR" fill="none" stroke="var(--line)" stroke-width="10" />
      <circle :cx="dotX" :cy="dotY" r="9" fill="var(--accent)" />
      <text :x="loopCx" :y="loopCy" font-size="12" text-anchor="middle" fill="var(--muted)">{{ t('co.loop') }}</text>

      <text :x="gaugeX" :y="gaugeTop - 14" font-size="12" fill="var(--muted)">{{ t('co.gauge') }}</text>
      <rect :x="gaugeX" :y="gaugeTop" :width="gaugeW" height="30" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="gaugeX" :y="gaugeTop" :width="gaugeFill" height="30" rx="6" fill="var(--accent)" />
      <text :x="gaugeX" :y="gaugeTop + 46" font-size="11" fill="var(--muted)">0</text>
      <text :x="gaugeX + gaugeW" :y="gaugeTop + 46" font-size="11" text-anchor="end" fill="var(--muted)">{{ gaugeMax }} L/min</text>

      <text x="24" :y="H - 16" font-size="11" fill="var(--muted)">{{ t('co.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
