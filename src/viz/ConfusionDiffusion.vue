<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Shannon's two ingredients, measured live. Flip one input bit and count how many output bits change in
// three ciphers: XOR with the key (no spread: 1 bit), one S-box pass (spreads only inside its nibble),
// and a full substitute-and-shuffle network (about half the block). params flip (0..15), rounds, key.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const SBOX = [0xe, 0x4, 0xd, 0x1, 0x2, 0xf, 0xb, 0x8, 0x3, 0xa, 0x6, 0xc, 0x5, 0x9, 0x0, 0x7]
const P = 0x26b7
const flip = computed(() => Math.max(0, Math.min(15, Math.round(props.params.flip ?? 0))))
const rounds = computed(() => Math.max(1, Math.min(4, Math.round(props.params.rounds ?? 2))))
const key16 = computed(() => { const k = Math.round(props.params.key ?? 58) & 0xff; return (k << 8) | k })
const sub = (x: number) => [12, 8, 4, 0].reduce((acc, s) => acc | (SBOX[(x >> s) & 0xf] << s), 0)
const perm = (x: number) => { let y = 0; for (let i = 0; i < 16; i++) if ((x >> (15 - i)) & 1) y |= 1 << (15 - ((i % 4) * 4 + Math.floor(i / 4))); return y }
const roundKey = (r: number) => ((key16.value << (4 * r)) | (key16.value >>> (16 - 4 * r))) & 0xffff
const spn = (p: number) => { let x = p; for (let r = 1; r <= rounds.value; r++) { x ^= roundKey(r); x = sub(x); x = perm(x) } return x }
const ciphers = computed(() => {
  const p2 = P ^ (1 << (15 - flip.value))
  return [
    { name: t('confdiff.xor'), a: P ^ key16.value, b: p2 ^ key16.value },
    { name: t('confdiff.sbox'), a: sub(P ^ key16.value), b: sub(p2 ^ key16.value) },
    { name: t('confdiff.spn', { r: rounds.value }), a: spn(P), b: spn(p2) },
  ].map((c) => ({ ...c, diff: c.a ^ c.b, count: ((x) => { let n = 0; while (x) (n += x & 1), (x >>>= 1); return n })(c.a ^ c.b) }))
})
const bit = (x: number, i: number) => (x >> (15 - i)) & 1
const S = 17
const readouts = computed(() => [
  ...ciphers.value.map((c) => ({ label: c.name, value: `${c.count} / 16`, color: c.count >= 6 ? 'var(--pos)' : 'var(--neg)' })),
  { label: t('confdiff.goal'), value: '≈ 8 / 16', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('confdiff.hint') }}</text>
      <!-- the two inputs, one flipped bit apart -->
      <text x="40" y="52" font-size="12" fill="var(--fg)">{{ t('confdiff.inputs') }}</text>
      <g transform="translate(40, 62)">
        <rect v-for="i in 16" :key="i" :x="(i - 1) * S + Math.floor((i - 1) / 4) * 6" y="0" :width="S - 2" height="20" rx="3" :fill="bit(P, i - 1) ? 'var(--accent)' : 'var(--sunken)'" :stroke="i - 1 === flip ? 'var(--neg)' : 'none'" stroke-width="2.5" />
      </g>
      <text x="360" y="77" font-size="11" fill="var(--neg)">{{ t('confdiff.flipped', { i: flip }) }}</text>
      <!-- three ciphers, their outputs and the damage -->
      <g v-for="(c, row) in ciphers" :key="row" :transform="`translate(40, ${120 + row * 112})`">
        <text x="0" y="12" font-size="12" fill="var(--fg)" font-weight="600">{{ c.name }}</text>
        <g transform="translate(0, 22)">
          <rect v-for="i in 16" :key="'a' + i" :x="(i - 1) * S + Math.floor((i - 1) / 4) * 6" y="0" :width="S - 2" height="18" rx="3" :fill="bit(c.a, i - 1) ? 'var(--accent)' : 'var(--sunken)'" />
          <rect v-for="i in 16" :key="'b' + i" :x="340 + (i - 1) * S + Math.floor((i - 1) / 4) * 6" y="0" :width="S - 2" height="18" rx="3" :fill="bit(c.b, i - 1) ? 'var(--accent-2)' : 'var(--sunken)'" :stroke="bit(c.diff, i - 1) ? 'var(--neg)' : 'none'" stroke-width="2" />
        </g>
        <!-- damage meter: how close to the ideal half -->
        <rect x="0" y="52" width="320" height="10" rx="5" fill="var(--sunken)" />
        <rect x="0" y="52" :width="(c.count / 16) * 320" height="10" rx="5" :fill="c.count >= 6 ? 'var(--pos)' : 'var(--neg)'" />
        <line x1="160" y1="48" x2="160" y2="66" stroke="var(--accent-2)" stroke-width="1.5" />
        <text class="num" x="340" y="62" font-size="13" :fill="c.count >= 6 ? 'var(--pos)' : 'var(--neg)'">{{ c.count }} {{ t('confdiff.bits') }}</text>
      </g>
      <text x="40" y="468" font-size="11" fill="var(--muted)">{{ t('confdiff.half') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
