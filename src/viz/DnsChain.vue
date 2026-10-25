<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/dns. params step (0..4, scrubs the lookup), cache (resolver already knows the answer),
// rtt (ms per round trip). A name becomes an address by asking down a chain: resolver → root →
// .com → the site's own name server. A cache hit answers at the first stop: one round trip, not four.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const step = computed(() => Math.min(Math.max(Math.round(props.params.step ?? 0), 0), 4))
const cache = computed(() => Math.round(props.params.cache ?? 0) >= 1)
const rtt = computed(() => Math.min(Math.max(props.params.rtt ?? 50, 10), 200))

// with a cache hit the chain ends at the resolver: steps beyond 1 change nothing
const eff = computed(() => (cache.value ? Math.min(step.value, 1) : step.value))
const trips = computed(() => (cache.value ? (eff.value >= 1 ? 1 : 0) : eff.value >= 4 ? 4 : eff.value))
const elapsed = computed(() => trips.value * rtt.value)
const answered = computed(() => (cache.value ? eff.value >= 1 : step.value >= 4))

const NODES = computed(() => [
  { x: 90, y: 300, icon: '💻', key: 'dns.you' as const },
  { x: 265, y: 300, icon: '📒', key: 'dns.resolver' as const },
  { x: 440, y: 130, icon: '🌍', key: 'dns.root' as const },
  { x: 585, y: 200, icon: '🏷', key: 'dns.tld' as const },
  { x: 710, y: 300, icon: '🏠', key: 'dns.auth' as const },
])
// which hop is live at each step (from, to), plus the bubble said at that step
const HOPS = [
  { f: 0, t: 1, bubble: 'dns.ask' },
  { f: 1, t: 2, bubble: 'dns.rootSays' },
  { f: 1, t: 3, bubble: 'dns.tldSays' },
  { f: 1, t: 4, bubble: 'dns.authSays' },
  { f: 1, t: 0, bubble: 'dns.answer' },
] as const
const liveHop = computed(() => {
  if (step.value === 0) return HOPS[0]
  if (cache.value) return HOPS[4]
  if (step.value === 4) return HOPS[4]
  return HOPS[step.value]
})
const bubbleKey = computed(() => (cache.value && step.value >= 1 ? ('dns.cached' as const) : liveHop.value.bubble))

const readouts = computed(() => [
  { label: t('dns.name'), value: 'visualize-it.example', color: 'var(--accent)' },
  { label: t('dns.trips'), value: fmt(trips.value, 0) },
  { label: t('dns.clock'), value: `${fmt(elapsed.value, 0)} ms`, color: elapsed.value > 2 * rtt.value ? 'var(--neg)' : 'var(--pos)' },
  { label: t('dns.result'), value: answered.value ? '93.184.216.34' : '…', color: answered.value ? 'var(--pos)' : undefined },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('dns.hint') }}</text>

      <!-- quiet chain wires -->
      <g stroke="var(--line)" stroke-width="1.5" opacity="0.6">
        <line :x1="NODES[0].x" :y1="NODES[0].y" :x2="NODES[1].x" :y2="NODES[1].y" />
        <line :x1="NODES[1].x" :y1="NODES[1].y" :x2="NODES[2].x" :y2="NODES[2].y" />
        <line :x1="NODES[1].x" :y1="NODES[1].y" :x2="NODES[3].x" :y2="NODES[3].y" />
        <line :x1="NODES[1].x" :y1="NODES[1].y" :x2="NODES[4].x" :y2="NODES[4].y" />
      </g>
      <!-- the hop that is happening now -->
      <line :x1="NODES[liveHop.f].x" :y1="NODES[liveHop.f].y" :x2="NODES[liveHop.t].x" :y2="NODES[liveHop.t].y" stroke="var(--accent)" stroke-width="3" />

      <!-- the five machines -->
      <g v-for="(n, i) in NODES" :key="i">
        <circle :cx="n.x" :cy="n.y" r="30" fill="var(--panel)" :stroke="i === liveHop.t || i === liveHop.f ? 'var(--accent)' : 'var(--line)'" stroke-width="2" />
        <text :x="n.x" :y="n.y + 7" text-anchor="middle" font-size="20">{{ n.icon }}</text>
        <text :x="n.x" :y="n.y + 52" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t(n.key) }}</text>
      </g>
      <!-- greyed-out upper chain on a cache hit -->
      <rect v-if="cache" x="380" y="70" width="400" height="180" rx="10" fill="var(--panel)" opacity="0.55" />
      <text v-if="cache" x="580" y="90" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('dns.skipped') }}</text>

      <!-- what is being said -->
      <rect x="120" y="60" width="240" height="56" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <text x="240" y="83" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t(bubbleKey) }}</text>
      <text x="240" y="102" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ answered ? '93.184.216.34' : 'visualize-it.example → ?' }}</text>

      <!-- the stopwatch -->
      <rect x="120" y="390" width="560" height="16" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="120" y="390" :width="(elapsed / (4 * 200)) * 560" height="16" rx="5" :fill="cache ? 'var(--pos)' : 'var(--accent-2)'" />
      <text x="120" y="426" font-size="10" fill="var(--muted)" class="num">{{ t('dns.elapsed', { ms: fmt(elapsed, 0) }) }}</text>
      <text x="680" y="426" text-anchor="end" font-size="10" fill="var(--muted)" class="num">{{ t('dns.worst', { ms: fmt(4 * rtt, 0) }) }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dns.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
