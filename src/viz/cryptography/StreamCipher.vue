<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// A stream cipher in miniature (the ChaCha20 idea): key + nonce + position → keystream byte, XORed onto
// each letter. Two messages are encrypted side by side. Give the second one the same nonce and the two
// keystreams match — XOR the ciphertexts and the key drops out. params key, nonce, nonce2 (0..255).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const m1 = computed<string>(() => (props.options.m1 ?? 'ATTACK').toUpperCase().slice(0, 8))
const m2 = computed<string>(() => (props.options.m2 ?? 'RETIRE').toUpperCase().slice(0, 8))
const key = computed(() => Math.round(props.params.key ?? 90) & 0xff)
const n1 = computed(() => Math.round(props.params.nonce ?? 7) & 0xff)
const n2 = computed(() => Math.round(props.params.nonce2 ?? 8) & 0xff)
const reused = computed(() => n1.value === n2.value)
// a toy keystream generator: mixes key, nonce and position into one byte
const ks = (k: number, n: number, i: number) => { let h = (Math.imul(k, 2654435761) ^ Math.imul(n, 40503) ^ Math.imul(i + 1, 2246822519)) >>> 0; h ^= h >>> 13; h = Math.imul(h, 2654435761) >>> 0; return (h ^ (h >>> 16)) & 0xff }
const hex = (b: number) => b.toString(16).toUpperCase().padStart(2, '0')
const row = (msg: string, nonce: number) => msg.split('').map((ch, i) => { const p = ch.charCodeAt(0); const k = ks(key.value, nonce, i); return { ch, p, k, c: p ^ k } })
const r1 = computed(() => row(m1.value, n1.value))
const r2 = computed(() => row(m2.value, n2.value))
const leak = computed(() => r1.value.map((x, i) => (r2.value[i] ? x.c ^ r2.value[i].c : 0)))
const pleak = computed(() => r1.value.map((x, i) => (r2.value[i] ? x.p ^ r2.value[i].p : 0)))
const hue = (b: number) => `hsl(${Math.round((b / 255) * 360)} 60% 48%)`
const S = 44
const readouts = computed(() => [
  { label: t('stream.nonces'), value: `${n1.value} / ${n2.value}`, color: reused.value ? 'var(--neg)' : 'var(--pos)' },
  { label: t('stream.cipher') + ' 1', value: r1.value.map((x) => hex(x.c)).join(' ') },
  { label: t('stream.cipher') + ' 2', value: r2.value.map((x) => hex(x.c)).join(' ') },
  { label: reused.value ? t('stream.leaking') : t('stream.safe'), value: reused.value ? leak.value.map(hex).join(' ') : '—', color: reused.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('stream.hint') }}</text>
      <g v-for="(rw, m) in [r1, r2]" :key="m" :transform="`translate(40, ${48 + m * 150})`">
        <text x="0" y="12" font-size="12" font-weight="600" fill="var(--fg)">{{ t('stream.msg', { n: m + 1 }) }} · {{ t('stream.nonce') }} = {{ m ? n2 : n1 }}</text>
        <g v-for="(b, i) in rw" :key="i" class="num" :transform="`translate(${150 + i * (S + 6)}, 0)`">
          <rect y="22" :width="S" height="26" rx="5" fill="var(--panel)" stroke="var(--line)" />
          <text :x="S / 2" y="40" text-anchor="middle" font-size="14" fill="var(--fg)">{{ b.ch }}</text>
          <text :x="S / 2" y="64" text-anchor="middle" font-size="10" fill="var(--muted)">⊕</text>
          <rect y="70" :width="S" height="22" rx="5" :fill="hue(b.k)" :stroke="reused && m === 1 ? 'var(--neg)' : 'none'" stroke-width="2" />
          <text :x="S / 2" y="85" text-anchor="middle" font-size="11" fill="#fff">{{ hex(b.k) }}</text>
          <rect y="100" :width="S" height="22" rx="5" fill="var(--sunken)" stroke="var(--accent)" />
          <text :x="S / 2" y="115" text-anchor="middle" font-size="11" fill="var(--accent)">{{ hex(b.c) }}</text>
        </g>
        <text x="104" y="40" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('stream.plain') }}</text>
        <text x="104" y="85" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('stream.keystream') }}</text>
        <text x="104" y="115" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('stream.cipher') }}</text>
      </g>
      <!-- what an eavesdropper computes from the two ciphertexts alone -->
      <g transform="translate(40, 356)">
        <text x="0" y="12" font-size="12" font-weight="600" :fill="reused ? 'var(--neg)' : 'var(--muted)'">{{ t('stream.attack') }}</text>
        <g v-for="(b, i) in leak" :key="i" class="num" :transform="`translate(${150 + i * (S + 6)}, 0)`">
          <rect y="22" :width="S" height="24" rx="5" :fill="reused ? 'var(--neg)' : 'var(--sunken)'" :fill-opacity="reused ? 0.85 : 1" />
          <text :x="S / 2" y="38" text-anchor="middle" font-size="11" :fill="reused ? '#fff' : 'var(--muted)'">{{ hex(b) }}</text>
          <text v-if="reused" :x="S / 2" y="66" text-anchor="middle" font-size="12" fill="var(--neg)">{{ hex(pleak[i]) }}</text>
        </g>
        <text v-if="reused" x="104" y="64" text-anchor="end" font-size="11" fill="var(--neg)">{{ t('stream.equals') }}</text>
        <text x="150" y="92" font-size="11" :fill="reused ? 'var(--neg)' : 'var(--pos)'">{{ reused ? t('stream.reuseWarn') : t('stream.freshNote') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
