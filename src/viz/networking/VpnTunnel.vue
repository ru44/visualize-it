<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/vpn. params vpn (tunnel off/on), h (tunnel header bytes per 1500-byte packet),
// B (your line's bandwidth, Mbps). With the tunnel up, the ISP sees only one encrypted pipe to the
// VPN server; the price is h bytes of wrapper per packet: goodput G = B(1 − h/1500).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const on = computed(() => Math.round(props.params.vpn ?? 1) >= 1)
const h = computed(() => Math.min(Math.max(Math.round(props.params.h ?? 60), 20), 120))
const B = computed(() => Math.min(Math.max(props.params.B ?? 100, 10), 500))
const G = computed(() => (on.value ? B.value * (1 - h.value / 1500) : B.value))
const eff = computed(() => (on.value ? 1 - h.value / 1500 : 1))

const LAPTOP = { x: 90, y: 230 }
const ISP = { x: 300, y: 230 }
const VPN = { x: 500, y: 230 }
const SITE = { x: 700, y: 230 }
const time = useAnimationClock()
const packets = computed(() =>
  Array.from({ length: 4 }, (_, i) => {
    const u = (time.value * 0.3 + i / 4) % 1
    return { x: LAPTOP.x + (SITE.x - LAPTOP.x) * u, u }
  }),
)

const readouts = computed(() => [
  { label: t('vpn.tunnel'), value: on.value ? t('vpn.on') : t('vpn.off'), color: on.value ? 'var(--pos)' : 'var(--neg)' },
  { label: t('vpn.overhead'), value: on.value ? `${h.value} / 1500 B` : '—', color: 'var(--accent-2)' },
  { label: t('vpn.efficiency'), value: `${fmt(eff.value * 100, 1)}%` },
  { label: 'G = B(1 − h/1500)', value: `${fmt(G.value, 1)} Mbps`, color: 'var(--accent)' },
  { label: t('vpn.siteSees'), value: on.value ? t('vpn.vpnAddr') : t('vpn.homeAddr') },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('vpn.hint') }}</text>
      <!-- the wire from laptop to site -->
      <line :x1="LAPTOP.x" :y1="LAPTOP.y" :x2="SITE.x" :y2="SITE.y" stroke="var(--line)" stroke-width="2" />
      <!-- the tunnel pipe, laptop → VPN server -->
      <rect v-if="on" :x="LAPTOP.x" :y="LAPTOP.y - 18" :width="VPN.x - LAPTOP.x" height="36" rx="16" fill="var(--accent)" opacity="0.18" stroke="var(--accent)" />
      <text v-if="on" :x="(LAPTOP.x + VPN.x) / 2" :y="LAPTOP.y - 28" text-anchor="middle" font-size="10" fill="var(--accent)">{{ t('vpn.pipe') }}</text>
      <!-- packets: sealed inside the tunnel, plain outside it -->
      <g v-for="(pk, i) in packets" :key="i">
        <rect :x="pk.x - 9" :y="LAPTOP.y - 7" width="18" height="14" rx="3" :fill="on && pk.x < VPN.x ? 'var(--accent)' : 'var(--panel)'" :stroke="on && pk.x < VPN.x ? 'none' : 'var(--accent-2)'" />
        <text v-if="on && pk.x < VPN.x" :x="pk.x" :y="LAPTOP.y + 4" text-anchor="middle" font-size="9" fill="#fff">🔒</text>
      </g>
      <!-- laptop -->
      <rect :x="LAPTOP.x - 26" :y="LAPTOP.y + 24" width="52" height="34" rx="5" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <text :x="LAPTOP.x" :y="LAPTOP.y + 80" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('vpn.you') }}</text>
      <!-- the ISP and what it can read -->
      <circle :cx="ISP.x" :cy="ISP.y - 60" r="26" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <text :x="ISP.x" :y="ISP.y - 54" text-anchor="middle" font-size="16">👁</text>
      <line :x1="ISP.x" :y1="ISP.y - 34" :x2="ISP.x" :y2="ISP.y - 20" stroke="var(--line)" stroke-dasharray="3 3" />
      <rect :x="ISP.x - 100" y="60" width="200" height="86" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <text :x="ISP.x" y="80" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('vpn.ispSees') }}</text>
      <g v-if="!on">
        <text :x="ISP.x" y="102" text-anchor="middle" font-size="11" fill="var(--neg)" class="num">bank-example.com</text>
        <text :x="ISP.x" y="120" text-anchor="middle" font-size="11" fill="var(--neg)" class="num">clinic-example.org</text>
        <text :x="ISP.x" y="138" text-anchor="middle" font-size="11" fill="var(--neg)" class="num">news-example.net</text>
      </g>
      <g v-else>
        <text :x="ISP.x" y="108" text-anchor="middle" font-size="11" fill="var(--pos)" class="num">vpn-server … 🔒</text>
        <text :x="ISP.x" y="130" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('vpn.encrypted') }}</text>
      </g>
      <!-- the VPN server where the wrapper comes off -->
      <g v-if="on">
        <rect :x="VPN.x - 22" :y="VPN.y + 24" width="44" height="40" rx="5" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
        <text :x="VPN.x" :y="VPN.y + 80" text-anchor="middle" font-size="11" fill="var(--accent)">{{ t('vpn.server') }}</text>
      </g>
      <!-- the site -->
      <rect :x="SITE.x - 26" :y="SITE.y + 24" width="52" height="40" rx="5" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="SITE.x" :y="SITE.y + 50" text-anchor="middle" font-size="12">🏦</text>
      <text :x="SITE.x" :y="SITE.y + 80" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('vpn.site') }}</text>
      <!-- bandwidth vs goodput -->
      <rect x="120" y="370" width="560" height="16" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="120" y="370" :width="(G / 500) * 560" height="16" rx="5" fill="var(--accent)" />
      <rect v-if="on" :x="120 + (G / 500) * 560" y="370" :width="((B - G) / 500) * 560" height="16" fill="var(--accent-2)" opacity="0.6" />
      <text x="120" y="406" font-size="10" fill="var(--muted)" class="num">{{ t('vpn.goodput', { g: fmt(G, 0) }) }}</text>
      <text x="680" y="406" text-anchor="end" font-size="10" fill="var(--muted)" class="num">B = {{ fmt(B, 0) }} Mbps</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('vpn.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
