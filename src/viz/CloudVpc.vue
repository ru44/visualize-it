<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/cloud-vpc. params p (subnet prefix), pub (how many subnets face the internet).
// One rented block of the cloud, 10.0.0.0/16 = 65,536 addresses, carved into S = 2^(p−16) subnets
// of H = 2^(32−p) − 2 usable addresses each. Public subnets get the gateway; the rest stay locked.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = computed(() => Math.min(Math.max(Math.round(props.params.p ?? 20), 18), 26))
const pub = computed(() => Math.min(Math.max(Math.round(props.params.pub ?? 1), 1), 4))
const S = computed(() => 2 ** (p.value - 16))
const hosts = computed(() => 2 ** (32 - p.value) - 2)
const SHOW = computed(() => Math.min(S.value, 24))
const COLS = 6
const TW = 92
const TH = 56
const GX = 116
const GY = 180
const tile = (i: number) => ({ x: GX + (i % COLS) * (TW + 8), y: GY + Math.floor(i / COLS) * (TH + 10) })
const thirdOctet = (i: number) => i * (256 / 2 ** (p.value - 16)) // subnet stride in the 10.0.x.0 octet (p ≤ 24)
const label = (i: number) => (p.value <= 24 ? `10.0.${Math.round(thirdOctet(i))}.0/${p.value}` : `subnet ${i + 1} /${p.value}`)

const readouts = computed(() => [
  { label: t('vpc.block'), value: '10.0.0.0/16 · 65,536' },
  { label: 'S = 2^(p−16)', value: String(S.value), color: 'var(--accent)' },
  { label: 'H = 2^(32−p) − 2', value: hosts.value.toLocaleString('en-US'), color: 'var(--accent-2)' },
  { label: t('vpc.public'), value: String(Math.min(pub.value, S.value)) },
  { label: t('vpc.private'), value: String(Math.max(S.value - pub.value, 0)) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('vpc.hint') }}</text>
      <!-- the internet above, reachable only through the gateway -->
      <circle cx="400" cy="60" r="26" fill="var(--sunken)" stroke="var(--line)" stroke-width="2" />
      <text x="400" y="66" text-anchor="middle" font-size="16">🌍</text>
      <text x="454" y="64" font-size="11" fill="var(--muted)">{{ t('vpc.internet') }}</text>
      <line x1="400" y1="86" x2="400" y2="128" stroke="var(--accent)" stroke-width="3" />
      <text x="412" y="112" font-size="10" fill="var(--accent)">{{ t('vpc.igw') }}</text>
      <!-- the VPC fence -->
      <rect x="92" y="128" width="616" height="310" rx="14" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="7 4" />
      <text x="110" y="152" font-size="12" font-weight="600" fill="var(--accent)" class="num">VPC · 10.0.0.0/16</text>
      <text x="698" y="152" text-anchor="end" font-size="10" fill="var(--muted)">{{ t('vpc.fence') }}</text>
      <!-- the subnets -->
      <g v-for="i in SHOW" :key="i">
        <rect :x="tile(i - 1).x" :y="tile(i - 1).y" :width="TW" :height="TH" rx="7" :fill="i - 1 < pub ? 'var(--accent)' : 'var(--sunken)'" :opacity="i - 1 < pub ? 0.85 : 1" :stroke="i - 1 < pub ? 'none' : 'var(--line)'" />
        <text :x="tile(i - 1).x + TW / 2" :y="tile(i - 1).y + 22" text-anchor="middle" font-size="9" :fill="i - 1 < pub ? '#fff' : 'var(--fg)'" class="num">{{ label(i - 1) }}</text>
        <text :x="tile(i - 1).x + TW / 2" :y="tile(i - 1).y + 42" text-anchor="middle" font-size="11" :fill="i - 1 < pub ? '#fff' : 'var(--muted)'">{{ i - 1 < pub ? '🌍' : '🔒' }}</text>
      </g>
      <text v-if="S > SHOW" :x="GX + 3 * (TW + 8)" :y="GY + 4 * (TH + 10) + 14" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('vpc.more', { n: S - SHOW }) }}</text>
      <text x="400" :y="H - 24" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('vpc.caption', { h: hosts.toLocaleString('en-US') }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
