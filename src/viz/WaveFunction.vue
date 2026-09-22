<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Solutions of Schrödinger's equation in three classic situations. options.mode:
//  'box'     particle in a box: ψₙ = √2 sin(nπx), energy ∝ n² (param n)
//  'tunnel'  a wave meeting a barrier higher than its energy (params V = barrier/energy, w = width)
//  'packet'  a wave packet: narrow in position ⇔ wide in momentum (param sx)
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const mode = computed(() => props.options.mode ?? 'box')
const phase = ref(0)
let raf = 0
let last = 0
function tick(now: number) { phase.value += Math.min(now - last, 50) / 1000; last = now; raf = requestAnimationFrame(tick) }
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const path = (f: (x: number) => number, x0: number, x1: number, px0: number, px1: number, y0: number, scale: number) =>
  Array.from({ length: 301 }, (_, i) => { const x = x0 + ((x1 - x0) * i) / 300; return `${i ? 'L' : 'M'}${(px0 + ((px1 - px0) * i) / 300).toFixed(1)},${(y0 - f(x) * scale).toFixed(1)}` }).join('')
// box
const n = computed(() => Math.max(1, Math.min(6, Math.round(props.params.n ?? 1))))
const psi = (x: number) => Math.SQRT2 * Math.sin(n.value * Math.PI * x)
// tunnel
const V = computed(() => props.params.V ?? 2)
const w = computed(() => props.params.w ?? 0.1)
const K0 = 12
const kappa = computed(() => (V.value > 1 ? K0 * Math.sqrt(V.value - 1) : 0))
const T = computed(() => (V.value > 1 ? Math.exp(-2 * kappa.value * w.value) : 1))
const B0 = 0.45
const tunnelWave = (x: number) => {
  const k = 40
  const tph = phase.value * 4
  if (x < B0) return Math.cos(k * x - tph)
  if (x < B0 + w.value) return Math.cos(k * B0 - tph) * Math.exp(-kappa.value * (x - B0))
  return Math.sqrt(T.value) * Math.cos(k * x - tph)
}
// packet
const sx = computed(() => props.params.sx ?? 0.08)
const packet = (x: number) => Math.exp(-((x - 0.5) ** 2) / (4 * sx.value ** 2)) * Math.cos(60 * (x - 0.5) - phase.value * 3)
const pDist = (p: number) => Math.exp(-(p ** 2) * 2 * sx.value ** 2 * 400)
const readouts = computed(() =>
  mode.value === 'box'
    ? [{ label: 'n', value: String(n.value) }, { label: t('wave.energy'), value: `${n.value ** 2} × E₁`, color: 'var(--accent-2)' }, { label: t('wave.nodes'), value: String(n.value - 1) }]
    : mode.value === 'tunnel'
      ? [{ label: t('wave.barrier'), value: `${fmt(V.value, 2)} × E` }, { label: t('wave.width'), value: fmt(w.value, 2) }, { label: t('wave.through'), value: `${fmt(T.value * 100, T.value < 0.01 ? 3 : 1)} %`, color: 'var(--accent-2)' }]
      : [{ label: 'Δx', value: fmt(sx.value, 3), color: 'var(--accent)' }, { label: 'Δp', value: fmt(1 / (2 * sx.value), 2), color: 'var(--accent-2)' }, { label: 'Δx · Δp', value: '0.5 = ħ/2', color: 'var(--pos)' }],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <template v-if="mode === 'box'">
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('wave.hintBox') }}</text>
        <rect x="80" y="60" width="12" height="360" fill="var(--fg)" /><rect x="548" y="60" width="12" height="360" fill="var(--fg)" />
        <line x1="92" x2="548" y1="160" y2="160" stroke="var(--line)" /><line x1="92" x2="548" y1="340" y2="340" stroke="var(--line)" />
        <text class="num" x="100" y="80" font-size="12" fill="var(--accent)">ψ</text>
        <path :d="path((x) => psi(x) * Math.cos(n ** 2 * phase * 2), 0, 1, 92, 548, 160, 55)" fill="none" stroke="var(--accent)" stroke-width="2.5" />
        <text class="num" x="100" y="265" font-size="12" fill="var(--accent-2)">|ψ|² · {{ t('wave.where') }}</text>
        <path :d="path((x) => psi(x) ** 2, 0, 1, 92, 548, 400, 55) + ' L548,400 L92,400 Z'" fill="var(--accent-2)" fill-opacity="0.35" stroke="var(--accent-2)" />
        <g transform="translate(620, 60)" class="num" font-size="12">
          <text fill="var(--muted)">{{ t('wave.levels') }}</text>
          <g v-for="k in 6" :key="k"><line x1="0" x2="130" :y1="380 - (k * k * 360) / 36" :y2="380 - (k * k * 360) / 36" :stroke="k === n ? 'var(--accent-2)' : 'var(--line)'" :stroke-width="k === n ? 3 : 1.5" /><text x="136" :y="384 - (k * k * 360) / 36" :fill="k === n ? 'var(--accent-2)' : 'var(--muted)'">n={{ k }}</text></g>
        </g>
      </template>
      <template v-else-if="mode === 'tunnel'">
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('wave.hintTunnel') }}</text>
        <rect :x="40 + B0 * 720" y="80" :width="w * 720" height="320" fill="var(--neg)" :fill-opacity="0.12 + 0.06 * Math.min(4, V)" />
        <text class="num" :x="40 + (B0 + w / 2) * 720" y="72" text-anchor="middle" font-size="12" fill="var(--neg)">{{ t('wave.wall') }}</text>
        <line x1="40" x2="760" y1="240" y2="240" stroke="var(--line)" />
        <path :d="path(tunnelWave, 0, 1, 40, 760, 240, 110)" fill="none" stroke="var(--accent)" stroke-width="2.5" />
        <text class="num" x="80" y="420" font-size="13" fill="var(--fg)">{{ t('wave.incoming') }}</text>
        <text class="num" x="740" y="420" text-anchor="end" font-size="13" fill="var(--accent-2)">{{ t('wave.escaped') }} {{ fmt(T * 100, T < 0.01 ? 3 : 1) }} %</text>
      </template>
      <template v-else>
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('wave.hintPacket') }}</text>
        <text class="num" x="40" y="60" font-size="13" fill="var(--accent)">{{ t('wave.position') }}</text>
        <line x1="40" x2="460" y1="260" y2="260" stroke="var(--line)" />
        <path :d="path(packet, 0, 1, 40, 460, 260, 150)" fill="none" stroke="var(--accent)" stroke-width="2" />
        <path :d="path((x) => Math.exp(-((x - 0.5) ** 2) / (2 * sx ** 2)), 0, 1, 40, 460, 260, 150)" fill="none" stroke="var(--accent)" stroke-dasharray="4 3" />
        <text class="num" x="500" y="60" font-size="13" fill="var(--accent-2)">{{ t('wave.momentum') }}</text>
        <line x1="500" x2="760" y1="400" y2="400" stroke="var(--line)" />
        <path :d="path(pDist, -0.5, 0.5, 500, 760, 400, 300) + ' L760,400 L500,400 Z'" fill="var(--accent-2)" fill-opacity="0.35" stroke="var(--accent-2)" />
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
