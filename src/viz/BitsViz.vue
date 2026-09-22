<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// An 8-bit number: tap bits to flip them. params.value is the decimal (0..255).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 300
const v = computed(() => Math.min(255, Math.max(0, Math.round(props.params.value ?? 0))))
const bits = computed(() => Array.from({ length: 8 }, (_, i) => (v.value >> (7 - i)) & 1))
const flip = (i: number) => emit('set', 'value', v.value ^ (1 << (7 - i)))
const readouts = computed(() => [
  { label: t('bits.bin'), value: bits.value.join(''), color: 'var(--accent)' },
  { label: t('bits.dec'), value: String(v.value), color: 'var(--accent-2)' },
  { label: t('bits.hex'), value: '0x' + v.value.toString(16).toUpperCase().padStart(2, '0') },
  { label: 'ASCII', value: v.value >= 32 && v.value < 127 ? `'${String.fromCharCode(v.value)}'` : '—' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('bits.hint') }}</text>
      <g v-for="(b, i) in bits" :key="i" class="cursor-pointer" @click="flip(i)">
        <text class="num" :x="70 + i * 92" y="70" text-anchor="middle" font-size="12" fill="var(--muted)">2^{{ 7 - i }} = {{ 1 << (7 - i) }}</text>
        <rect :x="70 + i * 92 - 34" y="85" width="68" height="68" rx="14" :fill="b ? 'var(--accent)' : 'var(--sunken)'" stroke="var(--line)" />
        <text class="num" :x="70 + i * 92" y="136" text-anchor="middle" font-size="36" :fill="b ? '#fff' : 'var(--muted)'">{{ b }}</text>
        <text class="num" :x="70 + i * 92" y="185" text-anchor="middle" font-size="13" :fill="b ? 'var(--accent-2)' : 'var(--line)'">{{ b ? '+' + (1 << (7 - i)) : '·' }}</text>
      </g>
      <text class="num" :x="W / 2" y="245" text-anchor="middle" font-size="22" fill="var(--fg)">
        {{ bits.map((b, i) => (b ? 1 << (7 - i) : null)).filter((x) => x !== null).join(' + ') || '0' }} = {{ v }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
