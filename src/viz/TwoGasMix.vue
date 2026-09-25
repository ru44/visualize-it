<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params nLeft, nRight (molecule counts, illustrated as dot clusters), perm (% open). Entropy uses the
// same Stirling formula the "Formal" section derives: S/kB ≈ N ln N − nL ln nL − nR ln nR, maximised
// at the even split. A bar compares it to the maximum possible entropy for the same total N.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const nLeft = computed(() => Math.max(1, props.params.nLeft ?? 90))
const nRight = computed(() => Math.max(1, props.params.nRight ?? 10))
const perm = computed(() => Math.max(0, Math.min(100, props.params.perm ?? 30)))
const N = computed(() => nLeft.value + nRight.value)
const entropy = computed(() => N.value * Math.log(N.value) - nLeft.value * Math.log(nLeft.value) - nRight.value * Math.log(nRight.value))
const maxEntropy = computed(() => N.value * Math.log(2))

const BOX = { x: 120, y: 80, w: 560, h: 280 }
const MID = BOX.x + BOX.w / 2
const VIS_MAX = 120
function dots(n: number, total: number, left: boolean) {
  const c = Math.min(60, Math.max(1, Math.round((n / Math.max(1, total)) * VIS_MAX)))
  return Array.from({ length: c }, (_, i) => {
    const cols = 10
    const col = i % cols
    const row = Math.floor(i / cols)
    const x0 = left ? MID - 20 - col * 18 : MID + 20 + col * 18
    return { x: x0, y: BOX.y + 20 + row * 18 }
  })
}
const leftDots = computed(() => dots(nLeft.value, N.value, true))
const rightDots = computed(() => dots(nRight.value, N.value, false))
const pores = computed(() => Math.round(2 + (perm.value / 100) * 8))

const readouts = computed(() => [
  { label: t('mix.s'), value: `${fmt(entropy.value, 2)} k_B`, color: 'var(--accent)' },
  { label: t('mix.smax'), value: `${fmt(maxEntropy.value, 2)} k_B` },
  { label: 'n_L', value: String(Math.round(nLeft.value)) },
  { label: 'n_R', value: String(Math.round(nRight.value)) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('mix.hint') }}</text>

      <rect :x="BOX.x" :y="BOX.y" :width="BOX.w" :height="BOX.h" fill="none" stroke="var(--fg)" stroke-width="2" />
      <g v-for="i in pores" :key="i">
        <rect :x="MID - 3" :y="BOX.y + (i - 0.5) * (BOX.h / pores) - 8" width="6" height="16" fill="var(--sunken)" />
      </g>
      <line :x1="MID" :x2="MID" :y1="BOX.y" :y2="BOX.y + BOX.h" stroke="var(--muted)" stroke-width="3" stroke-dasharray="2 6" />

      <circle v-for="(d, i) in leftDots" :key="'l' + i" :cx="d.x" :cy="d.y" r="5" fill="var(--accent)" />
      <circle v-for="(d, i) in rightDots" :key="'r' + i" :cx="d.x" :cy="d.y" r="5" fill="var(--accent-2)" />

      <text class="num" :x="BOX.x + BOX.w * 0.25" :y="BOX.y + BOX.h + 24" text-anchor="middle" font-size="12" fill="var(--accent)">n_L = {{ fmt(nLeft, 0) }}</text>
      <text class="num" :x="BOX.x + BOX.w * 0.75" :y="BOX.y + BOX.h + 24" text-anchor="middle" font-size="12" fill="var(--accent-2)">n_R = {{ fmt(nRight, 0) }}</text>
      <text class="num" :x="BOX.x + BOX.w / 2" :y="BOX.y - 16" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('mix.perm') }}: {{ fmt(perm, 0) }}%</text>

      <!-- entropy bar vs its maximum for this N -->
      <text class="num" x="120" y="410" font-size="12" fill="var(--muted)">{{ t('mix.s') }} / {{ t('mix.smax') }}</text>
      <rect x="120" y="420" width="560" height="18" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <rect x="121" y="421" :width="558 * Math.min(1, entropy / maxEntropy)" height="16" fill="var(--pos)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
