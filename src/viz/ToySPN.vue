<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A miniature block cipher (16 bits, the same three steps AES repeats on 128 bits): mix in the key, substitute
// each 4-bit piece through an S-box, shuffle the bits. Two inputs that differ in one bit are encrypted side by
// side; watch the difference spread. params rounds (0..4), flip (which input bit differs), key.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const SBOX = [0xe, 0x4, 0xd, 0x1, 0x2, 0xf, 0xb, 0x8, 0x3, 0xa, 0x6, 0xc, 0x5, 0x9, 0x0, 0x7]
const rounds = computed(() => Math.max(0, Math.min(4, Math.round(props.params.rounds ?? 2))))
const flip = computed(() => Math.max(0, Math.min(15, Math.round(props.params.flip ?? 0))))
const key = computed(() => Math.round(props.params.key ?? 0x3a94) & 0xffff)
const P = 0x26b7
const roundKey = (r: number) => ((key.value << (4 * r)) | (key.value >>> (16 - 4 * r))) & 0xffff
const sub = (x: number) => [12, 8, 4, 0].reduce((acc, s) => acc | (SBOX[(x >> s) & 0xf] << s), 0)
const perm = (x: number) => { let y = 0; for (let i = 0; i < 16; i++) if ((x >> (15 - i)) & 1) y |= 1 << (15 - ((i % 4) * 4 + Math.floor(i / 4))); return y }
function states(p: number) { const out = [p]; let x = p; for (let r = 1; r <= rounds.value; r++) { x ^= roundKey(r); x = sub(x); x = perm(x); out.push(x) }; return out }
const A = computed(() => states(P))
const B = computed(() => states(P ^ (1 << (15 - flip.value))))
const diffCount = (a: number, b: number) => { let x = a ^ b, c = 0; while (x) (c += x & 1), (x >>>= 1); return c }
const bit = (x: number, i: number) => (x >> (15 - i)) & 1
const hex = (x: number) => x.toString(16).toUpperCase().padStart(4, '0')
const S = 16
const readouts = computed(() => [
  { label: t('spn.rounds'), value: String(rounds.value) },
  { label: t('spn.different'), value: `${diffCount(A.value[rounds.value], B.value[rounds.value])} / 16`, color: 'var(--neg)' },
  { label: 'A', value: hex(A.value[rounds.value]), color: 'var(--accent)' },
  { label: 'B', value: hex(B.value[rounds.value]), color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('spn.hint') }}</text>
      <g v-for="(s, r) in A" :key="r" :transform="`translate(40, ${50 + r * 82})`">
        <text class="num" x="0" y="12" font-size="12" fill="var(--muted)">{{ r === 0 ? t('spn.input') : t('spn.after', { r }) }}</text>
        <g transform="translate(0, 20)"><rect v-for="i in 16" :key="i" :x="(i - 1) * S + Math.floor((i - 1) / 4) * 6" y="0" :width="S - 2" :height="S + 4" rx="3" :fill="bit(s, i - 1) ? 'var(--accent)' : 'var(--sunken)'" /></g>
        <g transform="translate(330, 20)"><rect v-for="i in 16" :key="i" :x="(i - 1) * S + Math.floor((i - 1) / 4) * 6" y="0" :width="S - 2" :height="S + 4" rx="3" :fill="bit(B[r], i - 1) ? 'var(--accent-2)' : 'var(--sunken)'" :stroke="bit(s, i - 1) !== bit(B[r], i - 1) ? 'var(--neg)' : 'none'" stroke-width="2" /></g>
        <text class="num" x="650" y="36" font-size="14" fill="var(--neg)">{{ diffCount(s, B[r]) }} {{ t('spn.bits') }}</text>
      </g>
      <text class="num" x="40" y="460" font-size="11" fill="var(--muted)">{{ t('spn.aes') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
