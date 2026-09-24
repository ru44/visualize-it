<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One fission event, scrubbed by "time" (0..100, % through the event). "speed" (km/s) decides the
// outcome: a slow neutron (thermal, ~2 km/s in a reactor) gets absorbed and splits the nucleus; a
// fast one (fission neutrons leave at ~15-20,000 km/s) mostly bounces off instead (elastic scatter).
// Fission channel used: n + U-235 -> U-236* -> Ba-141 + Kr-92 + 3n, ~200 MeV total (168 MeV right
// away as fragment/neutron motion and gamma rays, ~30 MeV more later as the fragments decay).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 400
const CY = 250
const R0 = 44
const SLOW_MAX = 5000

const speed = computed(() => Math.max(0, Math.min(20000, props.params.speed ?? 1000)))
const timePct = computed(() => Math.max(0, Math.min(100, props.params.time ?? 0)))
const t01 = computed(() => timePct.value / 100)
const isSlow = computed(() => speed.value < SLOW_MAX)

const lerp = (a: number, b: number, u: number) => a + (b - a) * u
const clamp01 = (u: number) => Math.max(0, Math.min(1, u))
const smooth = (a: number, b: number, x: number) => { const u = clamp01((x - a) / (b - a)); return u * u * (3 - 2 * u) }

// ---- neutron trajectory ---------------------------------------------------------------------
const neutron = computed(() => {
  const u = t01.value
  if (isSlow.value) {
    if (u >= 0.15) return null // absorbed into the nucleus
    return { x: lerp(50, CX - R0 - 4, u / 0.15), y: CY }
  }
  if (u <= 0.45) return { x: lerp(50, CX - R0 - 6, u / 0.45), y: lerp(225, 236, u / 0.45) }
  const v = (u - 0.45) / 0.55
  return { x: lerp(CX - R0 - 6, 760, v), y: lerp(236, 400, v) }
})

// ---- nucleus shape (slow path): compound nucleus -> stretch -> split ------------------------
const stretch = computed(() => smooth(0.25, 0.6, t01.value))
const split = computed(() => smooth(0.6, 1, t01.value))
const compound = computed(() => (isSlow.value ? smooth(0.15, 0.25, t01.value) * (1 - smooth(0.25, 0.35, t01.value)) : 0))
const rx = computed(() => R0 * lerp(1, 2.15, stretch.value) * (1 - split.value))
const ry = computed(() => R0 * lerp(1, 0.55, stretch.value) * (1 - split.value))
const nucleusR = computed(() => R0 * (1 + 0.12 * compound.value))
const showWhole = computed(() => !isSlow.value || t01.value < 0.25)
const showStretch = computed(() => isSlow.value && t01.value >= 0.25 && split.value < 1)

const heavy = computed(() => ({ x: CX - 100 * split.value, y: CY, r: 27 }))
const light = computed(() => ({ x: CX + 153 * split.value, y: CY, r: 21 }))

const freeNeutrons = computed(() => {
  if (!isSlow.value || split.value <= 0) return []
  const dist = 170 * split.value
  return [-100, -20, 100].map((deg) => {
    const a = (deg * Math.PI) / 180
    return { x: CX + Math.cos(a) * dist, y: CY + Math.sin(a) * dist }
  })
})

const flash = computed(() => (isSlow.value && split.value > 0 && split.value < 1 ? { r: 20 + split.value * 60, op: Math.max(0, 1 - split.value * 1.4) } : null))

// ---- energy budget (only once fission actually happens) --------------------------------------
const fissioned = computed(() => isSlow.value && split.value >= 0.999)
const energy = computed(() => {
  const prog = split.value // ramps the bar in as the split completes
  return { prompt: 168 * prog, delayed: fissioned.value ? 30 : 0, total: fissioned.value ? 198 : Math.round(168 * prog) }
})
const barX = 60
const barW = 500
const barY = 430
const promptW = computed(() => (energy.value.prompt / 200) * barW)
const delayedW = computed(() => (energy.value.delayed / 200) * barW)

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 70) {
    last = now
    if (timePct.value >= 100) playing.value = false
    else emit('set', 'time', timePct.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('fission.speed'), value: `${fmt(speed.value, 0)} km/s` },
  { label: t('fission.time'), value: `${fmt(timePct.value, 0)}%` },
  { label: t('fission.outcome'), value: isSlow.value ? t('fission.fission') : t('fission.scatter'), color: isSlow.value ? 'var(--pos)' : 'var(--muted)' },
  { label: t('fission.neutrons'), value: isSlow.value ? String(freeNeutrons.value.length) : '0' },
  { label: t('fission.energy'), value: fissioned.value ? `≈${fmt(energy.value.total, 0)} MeV` : t('fission.none'), color: fissioned.value ? 'var(--pos)' : undefined },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'time', 0)">{{ t('fission.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('fission.hint') }}</text>

      <circle v-if="flash" :cx="CX" :cy="CY" :r="flash.r" fill="none" stroke="var(--pos)" stroke-width="2" :stroke-opacity="flash.op" />

      <g v-if="showWhole">
        <circle :cx="CX" :cy="CY" :r="nucleusR" fill="var(--accent)" fill-opacity="0.85" />
        <text class="num" :x="CX" :y="CY + 4" text-anchor="middle" font-size="12" fill="var(--panel)">{{ t(isSlow && t01 >= 0.15 ? 'fission.compound' : 'fission.nucleus') }}</text>
      </g>
      <ellipse v-if="showStretch" :cx="CX" :cy="CY" :rx="rx" :ry="ry" fill="var(--accent)" fill-opacity="0.85" />

      <g v-if="split > 0">
        <circle :cx="heavy.x" :cy="heavy.y" :r="heavy.r" fill="var(--accent-2)" />
        <text v-if="split > 0.5" class="num" :x="heavy.x" :y="heavy.y - heavy.r - 6" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fission.heavy') }}</text>
        <circle :cx="light.x" :cy="light.y" :r="light.r" fill="var(--accent-2)" />
        <text v-if="split > 0.5" class="num" :x="light.x" :y="light.y - light.r - 6" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fission.light') }}</text>
      </g>
      <g v-for="(n, i) in freeNeutrons" :key="'fn' + i">
        <circle :cx="n.x" :cy="n.y" :r="4" fill="var(--pos)" />
      </g>

      <g v-if="neutron">
        <circle :cx="neutron.x" :cy="neutron.y" r="5" fill="var(--pos)" />
        <text class="num" :x="neutron.x" :y="neutron.y - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fission.neutron') }}</text>
      </g>

      <g v-if="fissioned" font-size="11" class="num">
        <rect :x="barX" :y="barY" :width="barW" height="14" rx="3" fill="var(--sunken)" stroke="var(--line)" />
        <rect :x="barX" :y="barY" :width="promptW" height="14" rx="3" fill="var(--pos)" />
        <rect :x="barX + promptW" :y="barY" :width="delayedW" height="14" rx="3" fill="var(--accent-2)" />
        <text :x="barX" :y="barY - 6" fill="var(--muted)">{{ t('fission.prompt') }} ≈{{ fmt(energy.prompt, 0) }} MeV · {{ t('fission.delayed') }} ≈{{ fmt(energy.delayed, 0) }} MeV · {{ t('fission.total') }} ≈{{ fmt(energy.total, 0) }} MeV</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
