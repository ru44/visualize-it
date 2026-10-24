<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// RSA as a padlock anyone can snap shut: Bob publishes the open lock (n, e); only his private key d
// opens it. params p, q (snapped to the nearest prime) and the message m. The real numbers run live:
// n = pq, φ = (p−1)(q−1), d = e⁻¹ mod φ, c = m^e mod n.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PRIMES = [2, 3, 5, 7, 11, 13]
const snap = (v: number) => PRIMES.reduce((best, x) => (Math.abs(x - v) < Math.abs(best - v) ? x : best), PRIMES[0])
const p = computed(() => snap(Math.round(props.params.p ?? 5)))
const q = computed(() => snap(Math.round(props.params.q ?? 11)))
const same = computed(() => p.value === q.value)
const n = computed(() => p.value * q.value)
const phi = computed(() => (p.value - 1) * (q.value - 1))
const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x)
const e = computed(() => [3, 5, 7, 11, 17, 19].find((x) => x < phi.value && gcd(x, phi.value) === 1) ?? 0)
const d = computed(() => { if (!e.value) return 0; for (let k = 1; k < phi.value; k++) if ((k * e.value) % phi.value === 1) return k; return 0 })
const m = computed(() => Math.min(Math.max(2, Math.round(props.params.m ?? 7)), n.value - 1))
const tooBig = computed(() => Math.round(props.params.m ?? 7) > n.value - 1)
const modpow = (base: number, ex: number, mod: number) => { let r = 1; const x = base % mod; for (let i = 0; i < ex; i++) r = (r * x) % mod; return r }
const c = computed(() => modpow(m.value, e.value, n.value))
const back = computed(() => modpow(c.value, d.value, n.value))
const ok = computed(() => !same.value && e.value > 0)
const hue = (v: number) => `hsl(${Math.round((v / n.value) * 360)} 70% 52%)`
const readouts = computed(() => [
  { label: `n = ${p.value} × ${q.value}`, value: String(n.value) },
  { label: `φ(n)`, value: `${phi.value}`, color: 'var(--accent-2)' },
  { label: t('rsa.public'), value: ok.value ? `(n=${n.value}, e=${e.value})` : '—', color: 'var(--accent)' },
  { label: t('rsa.private'), value: ok.value ? `d=${d.value}` : '—', color: 'var(--accent-2)' },
  { label: `c = m^e mod n`, value: ok.value ? String(c.value) : '—' },
  { label: `c^d mod n`, value: ok.value ? String(back.value) : '—', color: ok.value && back.value === m.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('rsa.hint') }}</text>
      <!-- Alice, left: has the message -->
      <text x="110" y="120" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ t('rsa.alice') }}</text>
      <circle cx="110" cy="180" r="30" :fill="hue(m)" />
      <text x="110" y="186" text-anchor="middle" font-size="15" fill="#fff" class="num">m = {{ m }}</text>
      <text x="110" y="232" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rsa.message') }}</text>
      <!-- Bob, right: makes the keys -->
      <text x="690" y="120" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ t('rsa.bob') }}</text>
      <text x="690" y="150" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">p = {{ p }}, q = {{ q }}</text>
      <text x="690" y="172" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">n = {{ n }}, φ = {{ phi }}</text>
      <text x="690" y="200" text-anchor="middle" font-size="13" fill="var(--accent-2)" class="num">🗝 d = {{ ok ? d : '?' }}</text>
      <text x="690" y="222" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rsa.private') }}</text>
      <!-- the open padlock Bob publishes, travelling left -->
      <g transform="translate(360, 90)">
        <path d="M20,22 v-8 a16,16 0 0 1 32,0 v8" fill="none" stroke="var(--accent)" stroke-width="4" />
        <rect x="12" y="22" width="48" height="36" rx="6" fill="var(--accent)" />
        <text x="36" y="46" text-anchor="middle" font-size="11" fill="#fff" class="num">n,e</text>
      </g>
      <line x1="640" y1="110" x2="420" y2="110" stroke="var(--line)" stroke-dasharray="4 3" />
      <text x="520" y="100" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rsa.publishes') }}</text>
      <!-- locked box travelling right -->
      <g v-if="ok">
        <rect x="330" y="280" width="140" height="56" rx="10" fill="var(--sunken)" stroke="var(--accent)" stroke-width="2" />
        <path d="M384,280 v-6 a16,16 0 0 1 32,0 v6" fill="none" stroke="var(--accent)" stroke-width="4" />
        <text x="400" y="314" text-anchor="middle" font-size="15" fill="var(--fg)" class="num">c = {{ c }}</text>
        <line x1="150" y1="308" x2="326" y2="308" stroke="var(--line)" />
        <line x1="474" y1="308" x2="630" y2="308" stroke="var(--line)" />
        <text x="238" y="298" text-anchor="middle" font-size="11" fill="var(--muted)">m^e mod n = {{ c }}</text>
        <text x="552" y="298" text-anchor="middle" font-size="11" fill="var(--muted)">c^d mod n = {{ back }}</text>
        <circle cx="690" cy="308" r="26" :fill="hue(back)" />
        <text x="690" y="314" text-anchor="middle" font-size="14" fill="#fff" class="num">{{ back }}</text>
        <text x="400" y="372" text-anchor="middle" font-size="18">👁</text>
        <text x="400" y="394" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rsa.eve', { n, e, c }) }}</text>
      </g>
      <text v-if="same" x="400" y="310" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('rsa.samePrime') }}</text>
      <text v-if="!same && !e" x="400" y="310" text-anchor="middle" font-size="13" fill="var(--neg)">{{ t('rsa.tooSmall') }}</text>
      <text v-if="tooBig" x="110" y="252" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('rsa.msgTooBig') }}</text>
      <text x="400" y="452" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('rsa.factor', { n }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
