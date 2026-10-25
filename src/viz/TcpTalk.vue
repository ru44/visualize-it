<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/tcp. params loss (% of packets the line drops), ack (1 = TCP: acknowledge and resend,
// 0 = UDP: fire and forget). Ten numbered stripes of a picture cross a stormy gap; which ones drop
// is deterministic in the loss slider, so scrubbing it tells one honest story. With acks every hole
// is noticed and refilled; without them the picture keeps its holes forever.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const N = 10
const loss = computed(() => Math.min(Math.max(props.params.loss ?? 10, 0), 50))
const ack = computed(() => Math.round(props.params.ack ?? 1) >= 1)
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
const dropped = computed(() => Array.from({ length: N }, (_, i) => rnd(i + 1) < loss.value / 100))
const nDropped = computed(() => dropped.value.filter(Boolean).length)
const delivered = computed(() => (ack.value ? N : N - nDropped.value))
const expectedSends = computed(() => (loss.value >= 100 ? Infinity : 1 / (1 - loss.value / 100)))

const SX = 150
const RX = 650
const rowY = (i: number) => 70 + i * 30
const dropX = (i: number) => SX + 90 + rnd(i * 3 + 7) * 220

const readouts = computed(() => [
  { label: t('tcp.mode'), value: ack.value ? 'TCP' : 'UDP', color: ack.value ? 'var(--pos)' : 'var(--accent-2)' },
  { label: t('tcp.loss'), value: `${fmt(loss.value, 0)}%` },
  { label: t('tcp.delivered'), value: `${fmt(delivered.value * 10, 0)}%`, color: delivered.value === N ? 'var(--pos)' : 'var(--neg)' },
  { label: t('tcp.resends'), value: ack.value ? `${fmt(nDropped.value, 0)}` : '0' },
  { label: 'E = 1/(1−p)', value: fmt(expectedSends.value, 2), color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('tcp.hint') }}</text>

      <!-- the stormy gap -->
      <rect :x="SX + 60" y="48" :width="RX - SX - 120" height="310" rx="10" fill="var(--sunken)" opacity="0.6" />
      <text :x="(SX + RX) / 2" y="42" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('tcp.storm', { p: fmt(loss, 0) }) }}</text>

      <!-- sender stack -->
      <text :x="SX - 10" y="42" text-anchor="end" font-size="11" fill="var(--fg)">{{ t('tcp.sender') }}</text>
      <text :x="RX + 60" y="42" text-anchor="start" font-size="11" fill="var(--fg)">{{ t('tcp.receiver') }}</text>

      <g v-for="i in N" :key="i" class="num" font-size="9">
        <!-- sent stripe -->
        <rect :x="SX - 40" :y="rowY(i - 1)" width="44" height="20" rx="3" fill="var(--accent)" opacity="0.9" />
        <text :x="SX - 18" :y="rowY(i - 1) + 14" text-anchor="middle" fill="#fff">{{ i }}</text>

        <g v-if="dropped[i - 1]">
          <!-- first attempt dies in the storm -->
          <line :x1="SX + 8" :y1="rowY(i - 1) + 10" :x2="dropX(i)" :y2="rowY(i - 1) + 10" stroke="var(--neg)" stroke-width="1.5" stroke-dasharray="5 4" />
          <text :x="dropX(i) + 8" :y="rowY(i - 1) + 14" font-size="11" fill="var(--neg)">⚡</text>
          <g v-if="ack">
            <!-- no ACK came back, so it is sent again and gets through -->
            <line :x1="SX + 8" :y1="rowY(i - 1) + 16" :x2="RX - 4" :y2="rowY(i - 1) + 16" stroke="var(--pos)" stroke-width="1.5" />
            <text :x="(SX + RX) / 2" :y="rowY(i - 1) + 28" text-anchor="middle" font-size="8" fill="var(--pos)">{{ t('tcp.again') }}</text>
          </g>
        </g>
        <g v-else>
          <line :x1="SX + 8" :y1="rowY(i - 1) + 10" :x2="RX - 4" :y2="rowY(i - 1) + 10" stroke="var(--accent)" stroke-width="1.5" />
          <!-- the little thank-you note travelling home -->
          <line v-if="ack" :x1="RX - 10" :y1="rowY(i - 1) + 17" :x2="SX + 14" :y2="rowY(i - 1) + 17" stroke="var(--muted)" stroke-width="0.8" stroke-dasharray="2 4" />
        </g>

        <!-- received stripe: the picture being reassembled -->
        <rect :x="RX + 4" :y="rowY(i - 1)" width="44" height="20" rx="3" :fill="ack || !dropped[i - 1] ? 'var(--accent-2)' : 'var(--sunken)'" :stroke="ack || !dropped[i - 1] ? 'none' : 'var(--neg)'" :stroke-dasharray="ack || !dropped[i - 1] ? '' : '4 3'" />
        <text v-if="ack || !dropped[i - 1]" :x="RX + 26" :y="rowY(i - 1) + 14" text-anchor="middle" fill="#fff">{{ i }}</text>
        <text v-else :x="RX + 26" :y="rowY(i - 1) + 14" text-anchor="middle" fill="var(--neg)">?</text>
      </g>

      <!-- verdict -->
      <text x="400" y="400" text-anchor="middle" font-size="12" :fill="delivered === N ? 'var(--pos)' : 'var(--neg)'">
        {{ delivered === N ? t('tcp.complete') : t('tcp.holes', { n: fmt(N - delivered, 0) }) }}
      </text>
      <text x="400" y="424" text-anchor="middle" font-size="10" fill="var(--muted)">{{ ack ? t('tcp.tcpNote') : t('tcp.udpNote') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('tcp.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
