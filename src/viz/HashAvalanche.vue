<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// SHA-256, computed live by the browser. options.mode:
//  'avalanche'  change one letter (param pos) and about half of the 256 output bits flip
//  'salt'       the same password with two different salts (params s1, s2) gives unrelated hashes
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const mode = computed(() => props.options.mode ?? 'avalanche')
const base = computed<string>(() => props.options.text ?? 'hello world')
const pos = computed(() => Math.max(0, Math.min(base.value.length - 1, Math.round(props.params.pos ?? 0))))
const password = computed<string>(() => props.options.password ?? 'sunshine1')
const s1 = computed(() => Math.round(props.params.s1 ?? 17))
const s2 = computed(() => Math.round(props.params.s2 ?? 742))
const inputs = computed<[string, string]>(() => {
  if (mode.value === 'salt') return [`${password.value}#${s1.value}`, `${password.value}#${s2.value}`]
  const b = base.value
  const c = b.charCodeAt(pos.value)
  const changed = c === 122 ? 'a' : c === 32 ? '_' : String.fromCharCode(c + 1)
  return [b, b.slice(0, pos.value) + changed + b.slice(pos.value + 1)]
})
const hashes = ref<[Uint8Array, Uint8Array] | null>(null)
async function sha(s: string) { return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))) }
watchEffect(async () => { const [a, b] = inputs.value; if (!crypto?.subtle) return; hashes.value = [await sha(a), await sha(b)] })
const bitAt = (h: Uint8Array, i: number) => (h[i >> 3] >> (7 - (i & 7))) & 1
const hex = (h: Uint8Array) => Array.from(h, (b) => b.toString(16).padStart(2, '0')).join('')
const diff = computed(() => (hashes.value ? Array.from({ length: 256 }, (_, i) => bitAt(hashes.value![0], i) !== bitAt(hashes.value![1], i)).filter(Boolean).length : 0))
const readouts = computed(() => [
  { label: mode.value === 'salt' ? t('hash.user1') : t('hash.original'), value: inputs.value[0], color: 'var(--accent)' },
  { label: mode.value === 'salt' ? t('hash.user2') : t('hash.changed'), value: inputs.value[1], color: 'var(--accent-2)' },
  { label: t('hash.flipped'), value: `${diff.value} / 256`, color: 'var(--neg)' },
])
const S = 11
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ mode === 'salt' ? t('hash.hintSalt') : t('hash.hint') }}</text>
      <template v-if="hashes">
        <g v-for="(h, k) in hashes" :key="k" :transform="`translate(${40 + k * 380}, 50)`">
          <text class="num" x="0" y="0" font-size="13" :fill="k ? 'var(--accent-2)' : 'var(--accent)'" direction="ltr">“{{ inputs[k] }}”</text>
          <g transform="translate(0, 14)"><rect v-for="i in 256" :key="i" :x="((i - 1) % 16) * S" :y="Math.floor((i - 1) / 16) * S" :width="S - 1.5" :height="S - 1.5" :fill="bitAt(h, i - 1) ? (k ? 'var(--accent-2)' : 'var(--accent)') : 'var(--sunken)'" :stroke="k && bitAt(hashes[0], i - 1) !== bitAt(h, i - 1) ? 'var(--neg)' : 'none'" stroke-width="1.5" /></g>
          <foreignObject y="200" width="330" height="60"><div xmlns="http://www.w3.org/1999/xhtml" dir="ltr" style="font: 11px/1.4 ui-monospace, monospace; color: var(--muted); word-break: break-all">{{ hex(h) }}</div></foreignObject>
        </g>
      </template>
      <text v-else class="num" x="400" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('hash.unavailable') }}</text>
      <text class="num" x="400" y="360" text-anchor="middle" font-size="18" fill="var(--neg)">{{ t('hash.flipped') }}: {{ diff }} / 256</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
