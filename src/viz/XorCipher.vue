<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One-time pad: every bit of the message is XOR-ed with a random key bit. XOR-ing again with the same key
// gives the message back. param key (seed for the random key). options.text: a short Latin message.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const text = computed<string>(() => (props.options.text ?? 'HELLO').slice(0, 5))
const seed = computed(() => Math.round(props.params.key ?? 42))
const keyBytes = computed(() => { let s = seed.value * 2654435761 >>> 0; return text.value.split('').map(() => ((s = (s * 1103515245 + 12345) >>> 0), (s >>> 16) & 255)) })
const msg = computed(() => text.value.split('').map((c) => c.charCodeAt(0)))
const cipher = computed(() => msg.value.map((m, i) => m ^ keyBytes.value[i]))
const bits = (b: number) => Array.from({ length: 8 }, (_, i) => (b >> (7 - i)) & 1)
const hex = (a: number[]) => a.map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ')
const CW = 17
const x0 = (i: number) => 110 + i * (8 * CW + 10)
const rows = computed(() => [
  { label: t('xor.message'), bytes: msg.value, color: 'var(--accent)' },
  { label: t('xor.key'), bytes: keyBytes.value, color: 'var(--neg)' },
  { label: t('xor.cipher'), bytes: cipher.value, color: 'var(--accent-2)' },
  { label: t('xor.key'), bytes: keyBytes.value, color: 'var(--neg)' },
  { label: t('xor.back'), bytes: cipher.value.map((c, i) => c ^ keyBytes.value[i]), color: 'var(--pos)' },
])
const readouts = computed(() => [
  { label: t('xor.message'), value: text.value },
  { label: t('xor.key') + ' (hex)', value: hex(keyBytes.value), color: 'var(--neg)' },
  { label: t('xor.cipher') + ' (hex)', value: hex(cipher.value), color: 'var(--accent-2)' },
  { label: t('xor.back'), value: String.fromCharCode(...cipher.value.map((c, i) => c ^ keyBytes.value[i])), color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('xor.hint') }}</text>
      <g v-for="(ch, i) in text" :key="'c' + i"><text class="num" :x="x0(i) + 4 * CW" y="60" text-anchor="middle" font-size="22" fill="var(--fg)">{{ ch }}</text></g>
      <g v-for="(r, ri) in rows" :key="ri" :transform="`translate(0, ${90 + ri * 66 + (ri >= 3 ? 20 : 0)})`">
        <text class="num" x="100" y="20" text-anchor="end" font-size="12" :fill="r.color">{{ r.label }}</text>
        <g v-for="(b, i) in r.bytes" :key="i"><g v-for="(bit, j) in bits(b)" :key="j"><rect :x="x0(i) + j * CW" y="4" :width="CW - 3" height="24" rx="3" :fill="bit ? r.color : 'var(--sunken)'" :fill-opacity="bit ? 0.85 : 1" /><text class="num" :x="x0(i) + j * CW + (CW - 3) / 2" y="21" text-anchor="middle" font-size="11" :fill="bit ? '#fff' : 'var(--muted)'">{{ bit }}</text></g></g>
        <text v-if="ri === 1 || ri === 3" class="num" x="100" y="-12" text-anchor="end" font-size="16" fill="var(--muted)">⊕</text>
        <line v-if="ri === 2" x1="110" :x2="x0(text.length)" y1="-8" y2="-8" stroke="var(--line)" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
