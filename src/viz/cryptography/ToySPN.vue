<script setup lang="ts">
import { computed } from 'vue'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// A miniature block cipher (16 bits, the same three steps AES repeats on 128 bits): mix in the key, substitute
// each 4-bit piece through an S-box, shuffle the bits. Message A is the two letters "hi"; message B is the same
// with one bit flipped (flip = 2 makes it "Hi"). Each stage shows A over B with a red column on every bit where
// they differ, and a bar counting those bits toward 8 of 16 (well mixed). params rounds (0..4), flip, key.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 530
const SBOX = [0xe, 0x4, 0xd, 0x1, 0x2, 0xf, 0xb, 0x8, 0x3, 0xa, 0x6, 0xc, 0x5, 0x9, 0x0, 0x7]
const rounds = computed(() => Math.max(0, Math.min(4, Math.round(props.params.rounds ?? 2))))
const flip = computed(() => Math.max(0, Math.min(15, Math.round(props.params.flip ?? 2))))
const key = computed(() => Math.round(props.params.key ?? 0x3a94) & 0xffff)
const P = 0x6869 // "hi"
const roundKey = (r: number) => ((key.value << (4 * r)) | (key.value >>> (16 - 4 * r))) & 0xffff
const sub = (x: number) => [12, 8, 4, 0].reduce((acc, s) => acc | (SBOX[(x >> s) & 0xf] << s), 0)
const perm = (x: number) => { let y = 0; for (let i = 0; i < 16; i++) if ((x >> (15 - i)) & 1) y |= 1 << (15 - ((i % 4) * 4 + Math.floor(i / 4))); return y }
function states(p: number) { const out = [p]; let x = p; for (let r = 1; r <= 4; r++) { x ^= roundKey(r); x = sub(x); x = perm(x); out.push(x) }; return out }
const A = computed(() => states(P))
const B = computed(() => states(P ^ (1 << (15 - flip.value))))
const diffCount = (a: number, b: number) => { let x = a ^ b, c = 0; while (x) (c += x & 1), (x >>>= 1); return c }
const bit = (x: number, i: number) => (x >> (15 - i)) & 1
const letters = (x: number) => String.fromCharCode(x >> 8, x & 0xff)

// Layout, left to right: labels, the 16 bits (always written left to right), the count bar. Arabic mirrors the
// label and bar columns around the bits.
const rtl = computed(() => isRtl())
const X = (x: number, w = 0) => (rtl.value ? W - x - w : x)
const anchor = computed(() => (rtl.value ? 'end' : 'start'))
const CELL = 22
const cellX = (i: number) => X(112, 478) + i * 28 + Math.floor(i / 4) * 10
const SEG = 11
const COUNT = 612
const segX = (i: number) => X(COUNT, 16 * SEG) + (rtl.value ? 15 - i : i) * SEG
const stageY = (r: number) => 44 + r * 100

const readouts = computed(() => [
  { label: t('spn.rounds'), value: String(rounds.value) },
  { label: t('spn.different'), value: `${diffCount(A.value[rounds.value], B.value[rounds.value])} / 16`, color: 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text :x="X(16)" y="22" font-size="13" fill="var(--muted)" :text-anchor="anchor">{{ t('spn.hint') }}</text>
      <g v-for="r in 5" :key="r" :opacity="r - 1 <= rounds ? 1 : 0.3">
        <text v-if="r > 1" :x="X(98)" :y="stageY(r - 1) - 7" font-size="13" fill="var(--muted)" text-anchor="middle">↓</text>
        <text v-if="r > 1" :x="X(112)" :y="stageY(r - 1) - 7" font-size="12" fill="var(--muted)" :text-anchor="anchor">{{ t('spn.step', { r: r - 1 }) }}</text>
        <text :x="X(16)" :y="stageY(r - 1) + 12" font-size="13" font-weight="600" fill="var(--fg)" :text-anchor="anchor">{{ r === 1 ? t('spn.input') : t('spn.after', { r: r - 1 }) }}</text>
        <!-- red column behind every bit where A and B differ -->
        <template v-if="r - 1 <= rounds">
          <template v-for="i in 16" :key="i">
            <rect v-if="bit(A[r - 1], i - 1) !== bit(B[r - 1], i - 1)" :x="cellX(i - 1) - 2" :y="stageY(r - 1) + 17" :width="CELL + 4" height="58" rx="5" fill="var(--neg)" fill-opacity="0.22" stroke="var(--neg)" stroke-width="2" />
          </template>
        </template>
        <g v-for="(row, k) in [A, B]" :key="k">
          <text :x="X(16)" :y="stageY(r - 1) + 37 + k * 28" font-size="14" font-weight="600" :fill="k ? 'var(--accent-2)' : 'var(--accent)'" :text-anchor="anchor">{{ k ? 'B' : 'A' }}</text>
          <text v-if="r === 1" :x="X(40)" :y="stageY(r - 1) + 37 + k * 28" font-size="14" fill="var(--fg)" :text-anchor="anchor" direction="ltr">“{{ letters(row[0]) }}”</text>
          <g v-for="i in 16" :key="i">
            <rect :x="cellX(i - 1)" :y="stageY(r - 1) + 20 + k * 28" :width="CELL" height="24" rx="4" :fill="r - 1 <= rounds && bit(row[r - 1], i - 1) ? (k ? 'var(--accent-2)' : 'var(--accent)') : 'var(--sunken)'" />
            <text v-if="r - 1 <= rounds" class="num" :x="cellX(i - 1) + CELL / 2" :y="stageY(r - 1) + 36 + k * 28" font-size="12" text-anchor="middle" :fill="bit(row[r - 1], i - 1) ? 'var(--bg)' : 'var(--muted)'">{{ bit(row[r - 1], i - 1) }}</text>
          </g>
        </g>
        <!-- how many bits differ, out of 16; the mark at 8 is "half", a well-mixed block. Number and words are
             separate texts: digits inside an Arabic SVG text can be reordered. -->
        <text v-if="r === 1" :x="X(COUNT)" :y="stageY(0) + 12" font-size="13" fill="var(--muted)" :text-anchor="anchor">{{ t('spn.different') }}</text>
        <template v-if="r - 1 <= rounds">
          <text class="num" :x="X(COUNT)" :y="stageY(r - 1) + 38" font-size="15" fill="var(--neg)" :text-anchor="anchor" direction="ltr">{{ diffCount(A[r - 1], B[r - 1]) }} / 16</text>
          <rect v-for="i in 16" :key="i" :x="segX(i - 1) + 1" :y="stageY(r - 1) + 48" :width="SEG - 2" height="12" rx="2" :fill="i <= diffCount(A[r - 1], B[r - 1]) ? 'var(--neg)' : 'var(--sunken)'" />
          <line :x1="X(COUNT + 8 * SEG)" :x2="X(COUNT + 8 * SEG)" :y1="stageY(r - 1) + 44" :y2="stageY(r - 1) + 64" stroke="var(--fg)" stroke-width="2" />
          <text :x="X(COUNT + 8 * SEG)" :y="stageY(r - 1) + 76" font-size="11" fill="var(--muted)" text-anchor="middle">{{ t('spn.half') }}</text>
        </template>
      </g>
    </svg>
    <p class="mt-2 px-4 text-xs" style="color: var(--muted)">{{ t('spn.legend') }} {{ t('spn.aes') }}</p>
    <Readouts :items="readouts" />
  </div>
</template>
