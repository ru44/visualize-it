<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Power = P0 * (1 - rods/100) * (moderator/100): control rods absorb neutrons (pull them out, more
// power), the moderator slows neutrons so uranium-235 can actually catch them (more moderator, more
// power); with no moderator or with rods fully in, the chain reaction cannot sustain itself. The
// displayed power eases toward its target, and the turbine's spin follows it, so a slider move reads
// as the plant genuinely "settling" to a new level, the way a real one does over seconds to minutes.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const VX = 60, VY = 66, VW = 250, VH = 330
const P0 = 1000 // MW electric, a large plant

const rods = computed(() => Math.max(0, Math.min(100, props.params.rods ?? 50)))
const moderator = computed(() => Math.max(0, Math.min(100, props.params.moderator ?? 80)))
const powerPct = computed(() => (1 - rods.value / 100) * (moderator.value / 100) * 100)
const electricMW = computed(() => (powerPct.value / 100) * P0)
const status = computed(() => (rods.value >= 100 ? { key: 'npp.shutdown' as const, color: 'var(--muted)' } : moderator.value < 10 ? { key: 'npp.nomoderator' as const, color: 'var(--neg)' } : { key: 'npp.running' as const, color: 'var(--pos)' }))

const rodH = computed(() => (rods.value / 100) * VH)
const waterH = computed(() => (moderator.value / 100) * VH)
const rodCols = [0.22, 0.5, 0.78]
const fuelCols = [0.08, 0.36, 0.64, 0.92]

// ---- drag directly on the picture ------------------------------------------------------------
function dragParam(param: 'rods' | 'moderator', ev: PointerEvent) {
  const svg = (ev.currentTarget as SVGElement).ownerSVGElement
  if (!svg) return
  const move = (e: PointerEvent) => {
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    const frac = param === 'rods' ? (loc.y - VY) / VH : (VY + VH - loc.y) / VH
    emit('set', param, Math.max(0, Math.min(100, Math.round((frac * 100) / 5) * 5)))
  }
  const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

// ---- settle the displayed power toward the target, spin the turbine to match ------------------
const dispPower = ref(powerPct.value)
const angle = ref(0)
let raf = 0
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
function tick() {
  if (reduced) dispPower.value = powerPct.value
  else {
    dispPower.value += (powerPct.value - dispPower.value) * 0.05
    angle.value = (angle.value + dispPower.value * 0.15) % 360
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const steam = computed(() => {
  const n = Math.round((dispPower.value / 100) * 4)
  return Array.from({ length: n }, (_, i) => {
    const u = ((angle.value / 360 + i / 4) % 1)
    return { x: VX + VW - 20 + u * 190, y: VY + 10 - u * 60 }
  })
})

const readouts = computed(() => [
  { label: t('npp.rods'), value: `${fmt(rods.value, 0)}%` },
  { label: t('npp.moderator'), value: `${fmt(moderator.value, 0)}%` },
  { label: t('npp.power'), value: `${fmt(dispPower.value, 0)}%` },
  { label: t('npp.electric'), value: `${fmt(electricMW.value, 0)} MW`, color: 'var(--pos)' },
  { label: t('npp.status'), value: t(status.value.key), color: status.value.color },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('npp.hint') }}</text>

      <rect :x="VX" :y="VY" :width="VW" :height="VH" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="VX + 2" :y="VY + VH - waterH" :width="VW - 4" :height="waterH" fill="var(--accent-2)" fill-opacity="0.22" style="cursor: ns-resize" @pointerdown="dragParam('moderator', $event)" />
      <rect v-for="(cx, i) in fuelCols" :key="'f' + i" :x="VX + cx * VW - 5" :y="VY + 14" width="10" :height="VH - 28" rx="3" fill="var(--accent)" fill-opacity="0.7" />
      <g v-for="(cx, i) in rodCols" :key="'r' + i" style="cursor: ns-resize" @pointerdown="dragParam('rods', $event)">
        <rect :x="VX + cx * VW - 7" :y="VY" width="14" :height="Math.max(4, rodH)" rx="3" fill="var(--neg)" />
      </g>
      <text class="num" :x="VX + VW / 2" :y="VY + VH + 18" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('npp.fuel') }} · {{ t('npp.rated') }}</text>

      <path :d="`M ${VX + VW - 4} ${VY + 8} Q ${VX + VW + 120} ${VY - 30} 480 160`" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 5" />
      <circle v-for="(s, i) in steam" :key="'s' + i" :cx="s.x" :cy="s.y" r="3" fill="var(--muted)" fill-opacity="0.6" />

      <g :transform="`rotate(${angle} 480 160)`">
        <line v-for="i in 6" :key="'b' + i" x1="480" y1="160" :x2="480 + Math.cos((i * Math.PI) / 3) * 34" :y2="160 + Math.sin((i * Math.PI) / 3) * 34" stroke="var(--accent-2)" stroke-width="5" stroke-linecap="round" />
      </g>
      <circle cx="480" cy="160" r="40" fill="none" stroke="var(--line)" stroke-width="2" />
      <text class="num" x="480" y="215" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('npp.turbine') }}</text>

      <rect x="560" y="135" width="70" height="50" rx="6" fill="var(--panel)" stroke="var(--line)" />
      <text class="num" x="595" y="165" text-anchor="middle" font-size="13" fill="var(--fg)">G</text>
      <text class="num" x="595" y="200" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('npp.generator') }}</text>

      <line x1="630" y1="160" x2="700" y2="160" stroke="var(--pos)" stroke-width="2" />
      <text class="num" x="770" y="150" text-anchor="end" font-size="18" fill="var(--pos)">⚡</text>
      <text class="num" x="770" y="172" text-anchor="end" font-size="13" fill="var(--pos)">{{ fmt(electricMW, 0) }} MW</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
