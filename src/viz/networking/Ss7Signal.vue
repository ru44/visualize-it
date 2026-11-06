<script setup lang="ts">
import { computed } from 'vue'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, lineAt, MODES, STATES, ROUND_TRIPS, WAIT_FOR, LINE_NO, LINE_SAY, type Place } from './ss7Model'

// networking/ss7. params mode (0 a call, 1 a text, 2 a phone arriving abroad), step (messages that have
// arrived so far), h (links each message crosses) and hop (ms per link). Top: the signalling network —
// your exchange A, the relay points (STP) and, at the far end, your friend's exchange B and the home
// register (HLR) — with the current message travelling on it. Bottom: the voice lines between A and B,
// one of them held for the call and then carrying it. Below the picture, the conversation so far.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const roam = computed(() => p.value.mode === 2)
const msg = computed(() => (p.value.step > 0 ? p.value.flow[p.value.step - 1] : null))
const line = computed(() => lineAt(p.value.mode, p.value.step))
const n = computed(() => ROUND_TRIPS[p.value.mode])
const oneMs = computed(() => p.value.h * p.value.hop)
const waitMs = computed(() => 2 * n.value * oneMs.value)

// ---- places ----
const Y0 = 150
const YOU = { x: 44, y: Y0 }
const XA = 128
const B = { x: 650, y: 206 }
const HLR = { x: 650, y: 86 }
const FRIEND = { x: 736, y: 206 }
const stps = computed(() => {
  const m = p.value.h - 1
  const gap = m > 1 ? Math.min(92, (580 - 214) / (m - 1)) : 0
  return Array.from({ length: m }, (_, i) => 580 - (m - 1 - i) * gap)
})
const at = (pl: Place) => (pl === 'A' ? { x: XA, y: Y0 } : pl === 'B' ? B : HLR)
/** The points a message passes through, from its sender to its receiver. */
function route(from: Place, to: Place) {
  const last = { x: stps.value[stps.value.length - 1], y: Y0 }
  if (from !== 'A' && to !== 'A') return [at(from), last, at(to)]
  const chain = [{ x: XA, y: Y0 }, ...stps.value.map((x) => ({ x, y: Y0 })), at(from === 'A' ? to : from)]
  return from === 'A' ? chain : chain.reverse()
}
const pts = computed(() => (msg.value ? route(msg.value.from, msg.value.to) : []))
const pathD = computed(() => pts.value.map((q, i) => `${i ? 'L' : 'M'}${q.x} ${q.y}`).join(''))
const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
const end = computed(() => pts.value[pts.value.length - 1] ?? { x: 0, y: 0 })
const placeName = (pl: Place) => t(pl === 'A' ? (roam.value ? 'ss7.p.Aroam' : 'ss7.p.A') : pl === 'B' ? (roam.value ? 'ss7.p.Broam' : 'ss7.p.B') : 'ss7.p.H')
const used = computed(() => new Set(p.value.flow.flatMap((m) => [m.from, m.to])))

// ---- the voice lines ----
const STRANDS = Array.from({ length: 8 }, (_, i) => 300 + i * 10)
const MINE = STRANDS[LINE_NO - 1]
const lineColor = computed(() => (line.value === 'talk' ? 'var(--pos)' : line.value === 'held' ? 'var(--accent-2)' : 'var(--line)'))

// ---- phones ----
const s = computed(() => p.value.step)
const ringing = computed(() => p.value.mode === 0 && s.value === 2)
const talking = computed(() => line.value === 'talk')
const textShown = computed(() => p.value.mode === 1 && s.value >= 3)
const delivered = computed(() => p.value.mode === 1 && s.value >= 4)
const welcomed = computed(() => roam.value && s.value >= 5)
const arcs = (x: number, y: number, side: number) =>
  [9, 15].map((r) => `M${x + side * r * 0.7} ${y - r * 0.7} A${r} ${r} 0 0 ${side > 0 ? 1 : 0} ${x + side * r * 0.7} ${y + r * 0.7}`)

const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const arrow = computed(() => (isRtl() ? '←' : '→'))

const readouts = computed(() => [
  { label: t('ss7.r.msg'), value: `${s.value}/${p.value.flow.length}` },
  { label: t('ss7.r.h'), value: `${p.value.h}` },
  { label: t('ss7.r.hop'), value: `${p.value.hop} ms` },
  { label: t('ss7.r.one'), value: `${oneMs.value} ms` },
  { label: t('ss7.r.n'), value: `${n.value}` },
  { label: t(WAIT_FOR[p.value.mode]), value: `${waitMs.value} ms`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <defs>
        <marker id="ss7-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x="16" y="20" font-size="12" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('ss7.hint') }}</text>
      <text x="16" y="42" font-size="11" font-weight="600" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('ss7.band.signal') }}</text>

      <!-- the signalling network: A, the relay points, then B and the home register at the far end -->
      <line :x1="XA" :y1="Y0" :x2="stps[stps.length - 1]" :y2="Y0" stroke="var(--line)" stroke-width="2.5" />
      <line :x1="stps[stps.length - 1]" :y1="Y0" :x2="B.x" :y2="B.y" stroke="var(--line)" stroke-width="2.5" />
      <line :x1="stps[stps.length - 1]" :y1="Y0" :x2="HLR.x" :y2="HLR.y" stroke="var(--line)" stroke-width="2.5" />
      <!-- the current message: its route, a number on each link it crosses, and the envelope -->
      <g v-if="msg">
        <path :d="pathD" fill="none" stroke="var(--accent)" stroke-width="3.5" marker-end="url(#ss7-head)" opacity="0.85" />
        <g v-for="(q, i) in pts.slice(1)" :key="i">
          <circle :cx="(q.x + pts[i].x) / 2" :cy="(q.y + pts[i].y) / 2 - 12" r="8" fill="var(--panel)" stroke="var(--accent)" stroke-width="1" />
          <text :x="(q.x + pts[i].x) / 2" :y="(q.y + pts[i].y) / 2 - 8.5" text-anchor="middle" font-size="9.5" class="num" fill="var(--accent)">{{ i + 1 }}</text>
        </g>
      </g>
      <g v-for="(x, i) in stps" :key="'stp' + i">
        <rect :x="x - 8" :y="Y0 - 8" width="16" height="16" rx="2" :transform="`rotate(45 ${x} ${Y0})`" fill="var(--panel)" :stroke="msg ? 'var(--accent)' : 'var(--muted)'" stroke-width="2" />
      </g>
      <text :x="(stps[0] + stps[stps.length - 1]) / 2" :y="Y0 + 32" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('ss7.stp', { n: stps.length }) }}</text>

      <!-- the exchanges' own wires down to the voice lines -->
      <g :opacity="p.mode === 0 ? 1 : 0.25">
        <line :x1="XA" :y1="Y0 + 20" :x2="XA" :y2="STRANDS[7]" stroke="var(--muted)" stroke-width="2" />
        <line :x1="B.x" :y1="B.y + 20" :x2="B.x" :y2="STRANDS[7]" stroke="var(--muted)" stroke-width="2" />
      </g>
      <!-- exchange A -->
      <g :opacity="used.has('A') ? 1 : 0.3">
        <rect :x="XA - 22" :y="Y0 - 20" width="44" height="40" rx="4" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.8" />
        <rect v-for="k in 6" :key="k" :x="XA - 15 + ((k - 1) % 3) * 11" :y="Y0 - 12 + Math.floor((k - 1) / 3) * 13" width="7" height="7" rx="1" :fill="msg && (msg.to === 'A' || msg.from === 'A') ? 'var(--accent)' : 'var(--line)'" />
        <text :x="XA" :y="Y0 + 38" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir" paint-order="stroke" stroke="var(--panel)" stroke-width="5" stroke-linejoin="round">{{ placeName('A') }}</text>
      </g>
      <!-- exchange B -->
      <g :opacity="used.has('B') ? 1 : 0.3">
        <rect :x="B.x - 22" :y="B.y - 20" width="44" height="40" rx="4" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.8" />
        <rect v-for="k in 6" :key="k" :x="B.x - 15 + ((k - 1) % 3) * 11" :y="B.y - 12 + Math.floor((k - 1) / 3) * 13" width="7" height="7" rx="1" :fill="msg && (msg.to === 'B' || msg.from === 'B') ? 'var(--accent)' : 'var(--line)'" />
        <text :x="B.x" :y="B.y + 38" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir" paint-order="stroke" stroke="var(--panel)" stroke-width="5" stroke-linejoin="round">{{ placeName('B') }}</text>
      </g>
      <!-- the home register: a database drum -->
      <g :opacity="used.has('H') ? 1 : 0.3">
        <path :d="`M${HLR.x - 17} ${HLR.y - 12} v24 a17 6 0 0 0 34 0 v-24`" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.8" />
        <ellipse :cx="HLR.x" :cy="HLR.y - 12" rx="17" ry="6" :fill="msg && (msg.to === 'H' || msg.from === 'H') ? 'var(--accent)' : 'var(--panel)'" stroke="var(--fg)" stroke-width="1.8" />
        <path :d="`M${HLR.x - 17} ${HLR.y} a17 6 0 0 0 34 0`" fill="none" stroke="var(--fg)" stroke-width="1.2" />
        <text :x="HLR.x + 26" :y="HLR.y - 2" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir" :text-anchor="start">{{ t('ss7.p.Hlong') }}</text>
        <text :x="HLR.x + 26" :y="HLR.y + 13" font-size="10.5" fill="var(--muted)" direction="ltr" text-anchor="start">HLR</text>
      </g>

      <!-- the envelope riding the current message's route -->
      <g v-if="msg" :key="`${p.mode}-${s}-${p.h}`" :transform="reduced ? `translate(${end.x} ${end.y})` : undefined">
        <animateMotion v-if="!reduced" :path="pathD" :dur="`${0.5 * (pts.length - 1)}s`" repeatCount="indefinite" />
        <rect x="-11" y="-8" width="22" height="16" rx="2" fill="var(--accent)" stroke="var(--panel)" stroke-width="1.5" />
        <path d="M-10 -7 L0 1 L10 -7" fill="none" stroke="var(--panel)" stroke-width="1.5" />
      </g>

      <!-- what the current message says -->
      <g v-if="msg">
        <rect x="150" y="56" width="420" height="42" rx="10" fill="var(--sunken)" stroke="var(--accent)" stroke-width="1.2" />
        <text x="360" y="73" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">
          {{ placeName(msg.from) }} {{ arrow }} {{ placeName(msg.to) }} · <tspan class="num" direction="ltr" fill="var(--accent)" font-weight="700">{{ msg.code }}</tspan>
        </text>
        <text x="360" y="91" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('ss7.q', { s: t(msg.say) }) }}</text>
      </g>

      <!-- the phones: you (or your friend, landed abroad) on the left; your friend on the right -->
      <g>
        <rect :x="YOU.x - 10" :y="YOU.y - 17" width="20" height="34" rx="4" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.8" />
        <rect :x="YOU.x - 7" :y="YOU.y - 12" width="14" height="22" rx="1.5" :fill="talking ? 'var(--pos)' : 'var(--sunken)'" />
        <line :x1="YOU.x + 10" :y1="YOU.y" :x2="XA - 22" :y2="Y0" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3" />
        <text x="14" :y="YOU.y - 26" :text-anchor="start" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir">{{ roam ? t('ss7.friendAbroad') : t('ss7.you') }}</text>
        <text v-if="roam" :x="YOU.x" :y="YOU.y + 36" text-anchor="middle" font-size="16">✈</text>
        <text v-if="delivered || welcomed" :x="YOU.x" :y="YOU.y + 34" text-anchor="middle" font-size="11" font-weight="700" fill="var(--pos)" :direction="dir" :dy="roam ? 16 : 0">{{ delivered ? '✓✓' : t('ss7.roaming') }}</text>
        <path v-for="(d, i) in talking ? arcs(YOU.x - 4, YOU.y, -1) : []" :key="'ya' + i" :d="d" fill="none" stroke="var(--pos)" stroke-width="1.5" />
      </g>
      <g :opacity="roam ? 0.3 : 1">
        <line :x1="FRIEND.x - 10" :y1="FRIEND.y" :x2="B.x + 22" :y2="B.y" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3" />
        <rect :x="FRIEND.x - 10" :y="FRIEND.y - 17" width="20" height="34" rx="4" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.8" />
        <rect :x="FRIEND.x - 7" :y="FRIEND.y - 12" width="14" height="22" rx="1.5" :fill="ringing ? 'var(--accent-2)' : talking ? 'var(--pos)' : 'var(--sunken)'" />
        <text :x="FRIEND.x" :y="FRIEND.y - 28" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir">{{ roam ? t('ss7.wasHere') : t('ss7.friend') }}</text>
        <path v-for="(d, i) in ringing || talking ? arcs(FRIEND.x + 4, FRIEND.y, 1) : []" :key="'fa' + i" :d="d" fill="none" :stroke="ringing ? 'var(--accent-2)' : 'var(--pos)'" stroke-width="1.5" />
      </g>
      <g v-if="textShown">
        <rect :x="FRIEND.x - 52" :y="FRIEND.y + 26" width="104" height="24" rx="8" fill="var(--accent)" />
        <text :x="FRIEND.x" :y="FRIEND.y + 42" text-anchor="middle" font-size="11" font-weight="600" fill="#fff" :direction="dir">{{ t('ss7.text') }}</text>
      </g>

      <!-- the voice lines between the two exchanges; line 7 is the one kept for this call -->
      <text :x="XA + 8" y="284" font-size="11" font-weight="600" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('ss7.band.voice') }}</text>
      <g :opacity="p.mode === 0 ? 1 : 0.25">
        <line v-for="y in STRANDS" :key="y" :x1="XA" :y1="y" :x2="B.x" :y2="y" :stroke="y === MINE ? lineColor : 'var(--line)'" :stroke-width="y === MINE && line !== 'free' ? 4 : 2" />
        <line v-if="talking" :x1="XA" :y1="MINE" :x2="B.x" :y2="MINE" stroke="var(--panel)" stroke-width="2" stroke-dasharray="6 14" :class="{ 'ss7-flow': !reduced }" />
        <text :x="B.x + 10" :y="MINE + 4" font-size="10.5" font-weight="600" :fill="line === 'free' ? 'var(--muted)' : lineColor" direction="ltr" text-anchor="start">{{ t('ss7.lineNo', { n: LINE_NO }) }}</text>
      </g>
      <text x="389" y="400" text-anchor="middle" font-size="11.5" :fill="p.mode === 0 ? lineColor : 'var(--muted)'" :direction="dir" font-weight="600">
        {{ p.mode === 0 ? t(LINE_SAY[line]) : t(roam ? 'ss7.line.roam' : 'ss7.line.sms') }}
      </text>

      <!-- where the conversation is now -->
      <text x="400" y="440" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg)" :direction="dir">{{ t(STATES[p.mode][s]) }}</text>
      <text x="400" :y="H - 12" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('ss7.caption') }}</text>
    </svg>

    <!-- the conversation so far, like a chat between the exchanges -->
    <ol class="mx-4 mb-2 space-y-1 text-sm">
      <li class="label mb-1">{{ t('ss7.log', { mode: t(MODES[p.mode]) }) }}</li>
      <li v-for="(m, i) in p.flow" :key="m.code + i" class="flex flex-wrap items-baseline gap-x-2 rounded-md px-2 py-0.5" :style="{ opacity: i < s ? 1 : 0.4, background: i === s - 1 ? 'var(--sunken)' : 'transparent' }">
        <span class="num" style="color: var(--muted)">{{ i + 1 }}.</span>
        <span style="color: var(--muted)">{{ placeName(m.from) }} {{ arrow }} {{ placeName(m.to) }}</span>
        <span dir="ltr" class="num font-semibold" style="color: var(--accent)">{{ m.code }}</span>
        <span :style="{ color: 'var(--fg)', fontWeight: i === s - 1 ? 600 : 400 }">{{ t('ss7.q', { s: t(m.say) }) }}</span>
      </li>
    </ol>
    <Readouts :items="readouts" />
  </div>
</template>

<style scoped>
.ss7-flow {
  animation: ss7-flow 0.9s linear infinite;
}
@keyframes ss7-flow {
  to {
    stroke-dashoffset: -20;
  }
}
</style>
