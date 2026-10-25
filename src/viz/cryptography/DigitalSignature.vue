<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// A digital signature is RSA run backwards: Alice presses her private exponent d onto the
// contract's fingerprint h = (m² + 1) mod n, and anyone can lift the seal with the public (n, e).
// The tamper slider lets a forger bump the contract in transit; Bob's recomputed fingerprint
// then disagrees with the one inside the seal.
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
const m = computed(() => Math.min(Math.max(2, Math.round(props.params.m ?? 7)), 20))
const tamper = computed(() => Math.min(Math.max(0, Math.round(props.params.tamper ?? 0)), 5))
const ok = computed(() => !same.value && e.value > 0)
const hash = (v: number) => (v * v + 1) % n.value
const modpow = (base: number, ex: number, mod: number) => { let r = 1; const x = base % mod; for (let i = 0; i < ex; i++) r = (r * x) % mod; return r }
const h = computed(() => hash(m.value))
const s = computed(() => (ok.value ? modpow(h.value, d.value, n.value) : 0))
const m2 = computed(() => m.value + tamper.value)
const h2 = computed(() => hash(m2.value))
const unsealed = computed(() => (ok.value ? modpow(s.value, e.value, n.value) : 0))
const valid = computed(() => ok.value && unsealed.value === h2.value)
const collision = computed(() => valid.value && tamper.value > 0)
const hue = (v: number) => `hsl(${Math.round((v / n.value) * 360)} 70% 52%)`
const readouts = computed(() => [
  { label: t('sig.public'), value: ok.value ? `(n=${n.value}, e=${e.value})` : '—', color: 'var(--accent)' },
  { label: t('sig.private'), value: ok.value ? `d=${d.value}` : '—', color: 'var(--accent-2)' },
  { label: `H(m)`, value: ok.value ? String(h.value) : '—', color: 'var(--accent)' },
  { label: `s = h^d mod n`, value: ok.value ? String(s.value) : '—', color: 'var(--accent-2)' },
  { label: `s^e mod n / H(m′)`, value: ok.value ? `${unsealed.value} / ${h2.value}` : '—', color: valid.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('sig.hint') }}</text>
      <!-- Alice publishes the open lock (n, e); pressing a seal needs her private d -->
      <text x="400" y="62" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sig.publishes', { n, e }) }}</text>
      <line x1="185" y1="110" x2="368" y2="110" stroke="var(--line)" stroke-dasharray="4 3" />
      <line x1="444" y1="110" x2="630" y2="110" stroke="var(--line)" stroke-dasharray="4 3" />
      <g transform="translate(370, 76)">
        <path d="M20,22 v-8 a16,16 0 0 1 32,0 v8" fill="none" stroke="var(--accent)" stroke-width="4" />
        <rect x="12" y="22" width="48" height="36" rx="6" fill="var(--accent)" />
        <text x="36" y="46" text-anchor="middle" font-size="11" fill="#fff" class="num">n,e</text>
      </g>
      <!-- Alice, left: her keys, her contract, its fingerprint, her seal -->
      <text x="110" y="120" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ t('sig.alice') }}</text>
      <text x="110" y="150" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">p = {{ p }}, q = {{ q }}</text>
      <text x="110" y="172" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">n = {{ n }}, φ = {{ phi }}</text>
      <text x="110" y="200" text-anchor="middle" font-size="13" fill="var(--accent-2)" class="num">🗝 d = {{ ok ? d : '?' }}</text>
      <text x="110" y="222" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sig.private') }}</text>
      <circle cx="110" cy="300" r="26" :fill="hue(m % n)" />
      <text x="110" y="306" text-anchor="middle" font-size="15" fill="#fff" class="num">m = {{ m }}</text>
      <text x="110" y="342" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sig.message') }}</text>
      <text x="110" y="372" text-anchor="middle" font-size="12" fill="var(--accent)" class="num">H(m) = {{ ok ? h : '—' }}</text>
      <text v-if="ok" x="110" y="398" text-anchor="middle" font-size="12" fill="var(--accent-2)" class="num">s = {{ h }}^{{ d }} mod {{ n }} = {{ s }}</text>
      <!-- Bob, right: re-hash what arrived, open the seal, compare -->
      <text x="690" y="120" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ t('sig.bob') }}</text>
      <g v-if="ok">
        <text x="690" y="160" text-anchor="middle" font-size="12" fill="var(--accent)" class="num">H({{ m2 }}) = {{ h2 }}</text>
        <text x="690" y="180" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('sig.recompute') }}</text>
        <text x="690" y="212" text-anchor="middle" font-size="12" fill="var(--accent-2)" class="num">{{ s }}^{{ e }} mod {{ n }} = {{ unsealed }}</text>
        <text x="690" y="232" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('sig.unseal') }}</text>
        <text x="690" y="268" text-anchor="middle" font-size="28" :fill="valid ? 'var(--pos)' : 'var(--neg)'">{{ valid ? '✓' : '✗' }}</text>
        <!-- the sealed contract crossing the wire -->
        <rect x="330" y="280" width="140" height="56" rx="10" fill="var(--sunken)" stroke="var(--accent-2)" stroke-width="2" />
        <text x="382" y="314" text-anchor="middle" font-size="15" :fill="tamper > 0 ? 'var(--neg)' : 'var(--fg)'" class="num">m′ = {{ m2 }}</text>
        <circle cx="444" cy="308" r="15" fill="var(--accent-2)" />
        <text x="444" y="312" text-anchor="middle" font-size="10" fill="#fff" class="num">{{ s }}</text>
        <line x1="140" y1="308" x2="326" y2="308" stroke="var(--line)" />
        <line x1="474" y1="308" x2="630" y2="308" stroke="var(--line)" />
        <text v-if="tamper > 0" x="238" y="296" text-anchor="middle" font-size="12" fill="var(--neg)">✍ {{ t('sig.forger', { t: tamper }) }}</text>
        <circle cx="690" cy="308" r="26" :fill="hue(m2 % n)" />
        <text x="690" y="314" text-anchor="middle" font-size="14" fill="#fff" class="num">{{ m2 }}</text>
        <text x="400" y="356" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('sig.sends') }}</text>
        <text x="400" y="404" text-anchor="middle" font-size="13" :fill="valid ? 'var(--pos)' : 'var(--neg)'" font-weight="600">{{ valid ? t('sig.match') : t('sig.noMatch') }}</text>
      </g>
      <text v-if="collision" x="400" y="428" text-anchor="middle" font-size="11" fill="var(--neg)">{{ t('sig.collision') }}</text>
      <text v-if="same" x="400" y="310" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('sig.samePrime') }}</text>
      <text v-if="!same && !e" x="400" y="310" text-anchor="middle" font-size="13" fill="var(--neg)">{{ t('sig.tooSmall') }}</text>
      <text x="400" y="456" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('sig.forge', { n }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
