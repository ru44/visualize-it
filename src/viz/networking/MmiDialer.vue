<script setup lang="ts">
import { computed } from 'vue'
import { t, isRtl, type Key } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { codeAt, type Dest, type Seg } from './mmiCodes'

// networking/dialer-codes. params code (0..4, which string is dialed), rtt (one round trip to the
// carrier, ms). The dialer is a small parser: all digits → a phone call; a string wrapped in * and #
// following the MMI grammar *#SC# → not a call. Then it asks who can answer: the phone itself (IMEI,
// instant), the carrier (call-forward status, a USSD menu: one round trip), or — for the Android
// *#*#…#*#* shape — an app on the phone that listens for that code.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

// The figure stays left-to-right like every figure on the site, but its sentences take the reader's
// direction, so Arabic keeps "50 ms" and "#" in place. A start-aligned label flips to "end" in Arabic
// so it still grows rightwards from its x.
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const SEG_COLOR: Record<Seg['k'], string> = { px: 'var(--accent-2)', sc: 'var(--accent)', sx: 'var(--accent-2)', num: 'var(--fg)' }

const code = computed(() => codeAt(props.params.code))
const rtt = computed(() => Math.min(Math.max(props.params.rtt ?? 50, 10), 300))
const raw = computed(() => code.value.seg.map((s) => s.s).join(''))
const time = computed(() => code.value.n * rtt.value)
const isCall = computed(() => code.value.dest === 'call')

// The four places a dialed string can end up. Wide enough for the reply line in either language.
const CARD_W = 160
const DESTS: { id: Dest; x: number; icon: string; label: Key }[] = [
  { id: 'phone', x: 32, icon: '📱', label: 'mmi.dest.phone' },
  { id: 'network', x: 216, icon: '📡', label: 'mmi.dest.network' },
  { id: 'app', x: 400, icon: '🧩', label: 'mmi.dest.app' },
  { id: 'call', x: 584, icon: '📞', label: 'mmi.dest.call' },
]
const dest = computed(() => DESTS.find((d) => d.id === code.value.dest)!)
const destX = computed(() => dest.value.x + CARD_W / 2)
// From the phone's bottom edge down to the card it reaches: never across the phone's own text.
const arrow = computed(() => `M145 222 C 145 266, ${destX.value} 262, ${destX.value} 300`)

// The dialer's three questions, in the order it asks them. A plain number stops after the first.
const ladder = computed(() => [
  { q: 'mmi.q.digits' as Key, reached: true, ok: isCall.value, a: isCall.value ? t('mmi.yes') : t('mmi.no') },
  { q: 'mmi.q.pattern' as Key, reached: !isCall.value, ok: !isCall.value, a: isCall.value ? '—' : t('mmi.yes') },
  { q: 'mmi.q.where' as Key, reached: !isCall.value, ok: !isCall.value, a: isCall.value ? '—' : t(dest.value.label) },
])

const readouts = computed(() => [
  { label: t('mmi.r.typed'), value: raw.value, color: 'var(--accent)' },
  { label: t('mmi.r.kind'), value: t(code.value.kind) },
  { label: t('mmi.r.handled'), value: t(dest.value.label) },
  { label: t('mmi.r.time'), value: isCall.value ? '—' : code.value.n === 0 ? t('mmi.instant') : `${time.value} ms`, color: code.value.n === 0 ? 'var(--pos)' : 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="22" font-size="12" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('mmi.hint') }}</text>
      <!-- what the coloured parts of a code mean -->
      <g font-size="11" fill="var(--muted)">
        <rect x="16" y="35" width="11" height="11" rx="2" fill="var(--accent-2)" />
        <text x="33" y="45" :direction="dir" :text-anchor="start">{{ t('mmi.key.wrap') }}</text>
        <rect x="230" y="35" width="11" height="11" rx="2" fill="var(--accent)" />
        <text x="247" y="45" :direction="dir" :text-anchor="start">{{ t('mmi.key.sc') }}</text>
      </g>

      <!-- the phone, with the dialed string on its screen -->
      <rect x="40" y="70" width="210" height="150" rx="18" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <rect x="56" y="90" width="178" height="58" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <text x="145" y="127" text-anchor="middle" font-size="22" class="num" direction="ltr">
        <tspan v-for="(s, i) in code.seg" :key="i" :fill="SEG_COLOR[s.k]">{{ s.s }}</tspan>
      </text>
      <text x="145" y="176" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t(code.kind) }}</text>
      <text x="145" y="200" text-anchor="middle" font-size="11.5" font-weight="600" :fill="isCall ? 'var(--pos)' : 'var(--accent)'" :direction="dir">{{ isCall ? t('mmi.verb.dial') : t('mmi.verb.route') }}</text>

      <!-- the dialer's questions, asked in order -->
      <g v-for="(row, i) in ladder" :key="i" :opacity="row.reached ? 1 : 0.35">
        <circle cx="300" :cy="96 + i * 48" r="13" :fill="row.reached ? 'var(--accent-soft)' : 'var(--sunken)'" stroke="var(--line)" />
        <text x="300" :y="100 + i * 48" text-anchor="middle" font-size="12" font-weight="600" :fill="row.reached ? 'var(--accent)' : 'var(--muted)'" class="num">{{ i + 1 }}</text>
        <text x="324" :y="100 + i * 48" font-size="13" fill="var(--fg)" :direction="dir" :text-anchor="start">{{ t(row.q) }}</text>
        <rect x="596" :y="82 + i * 48" width="176" height="28" rx="14" :fill="row.reached ? 'var(--panel)' : 'var(--sunken)'" :stroke="row.reached && i === 2 ? 'var(--accent)' : 'var(--line)'" />
        <text x="684" :y="100 + i * 48" text-anchor="middle" font-size="12" :fill="row.reached && i === 2 ? 'var(--accent)' : 'var(--fg)'" :direction="dir">{{ row.a }}</text>
      </g>

      <!-- the arrow to the place this string reaches -->
      <defs>
        <marker id="mmi-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="var(--accent)" /></marker>
      </defs>
      <path :d="arrow" fill="none" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#mmi-arrow)" />

      <!-- the four places; the one this string reaches lights up -->
      <g v-for="d in DESTS" :key="d.id">
        <rect :x="d.x" y="306" :width="CARD_W" height="104" rx="12" fill="var(--panel)" :stroke="d.id === code.dest ? 'var(--accent)' : 'var(--line)'" :stroke-width="d.id === code.dest ? 2.5 : 1.5" :opacity="d.id === code.dest ? 1 : 0.45" />
        <text :x="d.x + CARD_W / 2" y="340" text-anchor="middle" font-size="22" :opacity="d.id === code.dest ? 1 : 0.45">{{ d.icon }}</text>
        <text :x="d.x + CARD_W / 2" y="364" text-anchor="middle" font-size="12" fill="var(--fg)" :opacity="d.id === code.dest ? 1 : 0.45" :direction="dir">{{ t(d.label) }}</text>
        <text v-if="d.id === code.dest" :x="d.x + CARD_W / 2" y="390" text-anchor="middle" font-size="10.5" fill="var(--muted)" :direction="dir">{{ t(code.answer) }}</text>
      </g>

      <!-- whether a round trip to the carrier is paid -->
      <text x="400" y="440" text-anchor="middle" font-size="11.5" :fill="code.n === 1 ? 'var(--accent-2)' : 'var(--muted)'" :direction="dir">
        {{ isCall ? t('mmi.foot.call') : code.n === 0 ? t('mmi.foot.local') : t('mmi.foot.net', { ms: time }) }}
      </text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('mmi.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
