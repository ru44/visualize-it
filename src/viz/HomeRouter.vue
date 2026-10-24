<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/routers. params p (subnet prefix length), d (devices in the home).
// Every device gets a private 192.168.1.x address; the router rewrites each outgoing packet onto
// the single public address, remembering who asked in its NAT table. H = 2^(32−p) − 2 is how many
// devices the private subnet can hold.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = computed(() => Math.min(Math.max(Math.round(props.params.p ?? 24), 24), 30))
const d = computed(() => Math.min(Math.max(Math.round(props.params.d ?? 4), 1), 8))
const cap = computed(() => 2 ** (32 - p.value) - 2)
const full = computed(() => d.value > cap.value)
const ROUTER = { x: 390, y: 250 }
const CLOUD = { x: 665, y: 170 }
const devY = (i: number) => 86 + i * 44
const hue = (i: number) => `hsl(${(i * 47) % 360} 65% 52%)`

const time = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  time.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))
const packets = computed(() =>
  Array.from({ length: d.value }, (_, i) => {
    const tt = (time.value * 0.35 + i / d.value) % 1
    if (tt < 0.5) {
      const u = tt / 0.5
      return { x: 120 + (ROUTER.x - 120) * u, y: devY(i) + (ROUTER.y - devY(i)) * u, pub: false, i }
    }
    const u = (tt - 0.5) / 0.5
    return { x: ROUTER.x + (CLOUD.x - ROUTER.x) * u, y: ROUTER.y + (CLOUD.y - ROUTER.y) * u, pub: true, i }
  }),
)
const natRows = computed(() => Math.min(d.value, 4))

const readouts = computed(() => [
  { label: t('rtr.subnet'), value: `192.168.1.0/${p.value}` },
  { label: t('rtr.capacity'), value: String(cap.value), color: full.value ? 'var(--neg)' : 'var(--accent)' },
  { label: t('rtr.devices'), value: String(d.value) },
  { label: t('rtr.publicIp'), value: '203.0.113.7', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('rtr.hint') }}</text>
      <!-- the home's devices, each with a private address -->
      <text x="120" y="56" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('rtr.home') }}</text>
      <g v-for="i in d" :key="i">
        <circle cx="120" :cy="devY(i - 1)" r="13" :fill="hue(i - 1)" />
        <text x="146" :y="devY(i - 1) + 4" font-size="11" fill="var(--fg)" class="num">192.168.1.{{ i + 1 }}</text>
        <line x1="135" :y1="devY(i - 1)" :x2="ROUTER.x - 36" :y2="ROUTER.y" stroke="var(--line)" opacity="0.5" />
      </g>
      <!-- the router and its NAT table -->
      <rect :x="ROUTER.x - 36" :y="ROUTER.y - 26" width="72" height="52" rx="8" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
      <text :x="ROUTER.x" :y="ROUTER.y - 4" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('rtr.router') }}</text>
      <text :x="ROUTER.x" :y="ROUTER.y + 14" text-anchor="middle" font-size="9" fill="var(--muted)">NAT</text>
      <rect :x="ROUTER.x - 110" :y="ROUTER.y + 44" width="220" :height="26 + natRows * 18" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <text :x="ROUTER.x" :y="ROUTER.y + 62" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('rtr.natTable') }}</text>
      <text v-for="i in natRows" :key="'n' + i" :x="ROUTER.x" :y="ROUTER.y + 62 + i * 18" text-anchor="middle" font-size="9" fill="var(--fg)" class="num">192.168.1.{{ i + 1 }}:5{{ i }}10 → 203.0.113.7:4{{ i }}07</text>
      <text v-if="d > 4" :x="ROUTER.x" :y="ROUTER.y + 62 + 5 * 18" text-anchor="middle" font-size="9" fill="var(--muted)">…</text>
      <!-- the internet, where only one address is visible -->
      <ellipse :cx="CLOUD.x" :cy="CLOUD.y" rx="92" ry="50" fill="var(--sunken)" stroke="var(--line)" />
      <text :x="CLOUD.x" :y="CLOUD.y - 6" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('rtr.internet') }}</text>
      <text :x="CLOUD.x" :y="CLOUD.y + 14" text-anchor="middle" font-size="11" fill="var(--accent-2)" class="num">203.0.113.7</text>
      <line :x1="ROUTER.x + 36" :y1="ROUTER.y" :x2="CLOUD.x - 60" :y2="CLOUD.y + 26" stroke="var(--line)" stroke-width="2" />
      <!-- packets: coloured per device inside, all one colour outside -->
      <circle v-for="(pk, i) in packets" :key="'p' + i" :cx="pk.x" :cy="pk.y" r="5" :fill="pk.pub ? 'var(--accent-2)' : hue(pk.i)" />
      <text v-if="full" x="400" y="440" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('rtr.full', { cap }) }}</text>
      <text x="400" :y="H - 12" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rtr.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
