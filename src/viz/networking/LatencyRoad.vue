<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/latency-and-bandwidth. params L (round-trip latency, ms), B (bandwidth, Mbps),
// S (file size, MB). The road's LENGTH is latency, its LANES are bandwidth: a ping only cares how
// long the road is, a download mostly cares how wide. T = L/1000 + 8S/B seconds.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const L = computed(() => Math.min(Math.max(props.params.L ?? 40, 5), 600))
const B = computed(() => Math.min(Math.max(props.params.B ?? 100, 5), 1000))
const S = computed(() => Math.min(Math.max(props.params.S ?? 100, 1), 1000))
const T = computed(() => L.value / 1000 + (8 * S.value) / B.value)
const lanes = computed(() => Math.max(1, Math.min(8, Math.round(Math.log2(B.value / 5) + 1))))

// road geometry: length tracks latency, width tracks lanes
const roadX = 150
const roadW = computed(() => 180 + 420 * (L.value / 600))
const roadY = 210
const laneH = 11
const roadH = computed(() => lanes.value * laneH)

const time = useAnimationClock()

// trucks: one per lane, speed on screen fixed (latency = road length, so a longer road takes longer)
const trucks = computed(() =>
  Array.from({ length: lanes.value }, (_, i) => {
    const u = (time.value * 0.25 + i / lanes.value) % 1
    return { x: roadX + roadW.value * u, y: roadY + i * laneH + laneH / 2 }
  }),
)
const pingU = computed(() => (time.value * 0.5) % 2) // there and back
const pingX = computed(() => (pingU.value < 1 ? roadX + roadW.value * pingU.value : roadX + roadW.value * (2 - pingU.value)))

const readouts = computed(() => [
  { label: t('lat.ping'), value: `${fmt(L.value, 0)} ms`, color: 'var(--accent-2)' },
  { label: t('lat.firstByte'), value: `${fmt(L.value, 0)} ms` },
  { label: t('lat.stream'), value: `${fmt((8 * S.value) / B.value, 2)} s` },
  { label: 'T = L + 8S/B', value: `${fmt(T.value, 2)} s`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lat.hint') }}</text>

      <!-- you and the server -->
      <rect :x="roadX - 60" :y="roadY - 8" width="44" height="32" rx="5" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <text :x="roadX - 38" :y="roadY + 52" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('lat.you') }}</text>
      <rect :x="roadX + roadW + 16" :y="roadY - 14" width="40" height="46" rx="5" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="roadX + roadW + 36" :y="roadY + 52" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('lat.server') }}</text>

      <!-- the road: length = latency, lanes = bandwidth -->
      <rect :x="roadX" :y="roadY" :width="roadW" :height="roadH" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <line v-for="i in lanes - 1" :key="'l' + i" :x1="roadX" :y1="roadY + i * laneH" :x2="roadX + roadW" :y2="roadY + i * laneH" stroke="var(--line)" stroke-dasharray="6 6" stroke-width="0.7" />
      <circle v-for="(tr, i) in trucks" :key="'t' + i" :cx="tr.x" :cy="tr.y" r="4" fill="var(--accent)" />
      <!-- the ping: a lone motorbike, there and back -->
      <circle :cx="pingX" :cy="roadY - 16" r="5" fill="var(--accent-2)" />
      <text :x="pingX" :y="roadY - 26" text-anchor="middle" font-size="9" fill="var(--accent-2)">{{ t('lat.pingRider') }}</text>

      <!-- length / width captions -->
      <text :x="roadX + roadW / 2" :y="roadY + roadH + 22" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ t('lat.length', { l: fmt(L, 0) }) }}</text>
      <text :x="roadX - 14" :y="roadY + roadH / 2 + 3" text-anchor="end" font-size="10" fill="var(--muted)" class="num">{{ t('lat.lanes', { b: fmt(B, 0) }) }}</text>

      <!-- two stopwatches: the gamer vs the downloader -->
      <g font-size="11">
        <rect x="120" y="340" width="260" height="78" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="250" y="362" text-anchor="middle" fill="var(--fg)">{{ t('lat.gamer') }}</text>
        <text x="250" y="386" text-anchor="middle" font-size="18" class="num" :fill="L <= 40 ? 'var(--pos)' : L <= 120 ? 'var(--accent-2)' : 'var(--neg)'">{{ fmt(L, 0) }} ms</text>
        <text x="250" y="406" text-anchor="middle" font-size="9" fill="var(--muted)">{{ t('lat.gamerNote') }}</text>
        <rect x="420" y="340" width="260" height="78" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="550" y="362" text-anchor="middle" fill="var(--fg)">{{ t('lat.downloader', { s: fmt(S, 0) }) }}</text>
        <text x="550" y="386" text-anchor="middle" font-size="18" class="num" :fill="T <= 5 ? 'var(--pos)' : T <= 30 ? 'var(--accent-2)' : 'var(--neg)'">{{ fmt(T, 1) }} s</text>
        <text x="550" y="406" text-anchor="middle" font-size="9" fill="var(--muted)">{{ t('lat.downloaderNote') }}</text>
      </g>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('lat.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
