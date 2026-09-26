<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// view 0: a hash table — each key jumps straight to bucket h(k) = k mod m, and a small m
// causes collisions (two keys, one bucket). view 1: a checksum — the same idea used on a
// whole message instead of one key, so a changed byte in transit changes the checksum too.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const view = computed(() => Math.round(props.params.view ?? 0))
const m = computed(() => Math.max(4, Math.min(11, Math.round(props.params.m ?? 7))))
const corrupt = computed(() => Math.round(props.params.corrupt ?? 0) === 1)

// ---- hash table -----------------------------------------------------------------------------
const KEYS = [23, 47, 12, 88, 31, 56, 19]
const placed = computed(() => KEYS.map((k) => ({ k, b: k % m.value })))
const bucketCounts = computed(() => {
  const c = new Array(m.value).fill(0)
  for (const p of placed.value) c[p.b]++
  return c
})
const collisions = computed(() => bucketCounts.value.filter((c) => c > 1).length)
const loadFactor = computed(() => KEYS.length / m.value)
const bucketX = (b: number) => 260 + b * (520 / m.value)
const bucketW = computed(() => 520 / m.value - 6)

// ---- checksum ---------------------------------------------------------------------------------
const MSG = ['H', 'e', 'l', 'l', 'o']
const BYTES = [72, 101, 108, 108, 111]
const CORRUPT_IDX = 2
const recvBytes = computed(() => (corrupt.value ? BYTES.map((v, i) => (i === CORRUPT_IDX ? v - 8 : v)) : BYTES.slice()))
const sumMod = (arr: number[]) => arr.reduce((s, v) => s + v, 0) % 256
const sentSum = sumMod(BYTES)
const recvSum = computed(() => sumMod(recvBytes.value))
const okMatch = computed(() => sentSum === recvSum.value)

const readouts = computed(() =>
  view.value === 0
    ? [
        { label: t('hc.collisions'), value: String(collisions.value), color: collisions.value ? 'var(--neg)' : 'var(--pos)' },
        { label: t('hc.loadFactor'), value: loadFactor.value.toFixed(2) },
        { label: t('hc.buckets'), value: String(m.value) },
      ]
    : [
        { label: t('hc.checksumSender'), value: String(sentSum) },
        { label: t('hc.checksumReceiver'), value: String(recvSum.value), color: okMatch.value ? 'var(--pos)' : 'var(--neg)' },
        { label: okMatch.value ? t('hc.match') : t('hc.mismatch'), value: okMatch.value ? '✓' : '✗', color: okMatch.value ? 'var(--pos)' : 'var(--neg)' },
      ],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="26" font-size="13" fill="var(--muted)">{{ view === 0 ? t('hc.hint0') : t('hc.hint1') }}</text>

      <template v-if="view === 0">
        <text class="num" x="16" y="58" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hc.key') }} → h(k) = k mod {{ m }}</text>
        <g v-for="(p, i) in placed" :key="'row' + p.k">
          <text class="num" x="16" :y="82 + i * 26" font-size="13" fill="var(--fg)">{{ p.k }} mod {{ m }} = {{ p.b }}</text>
        </g>

        <text class="num" x="260" y="58" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hc.buckets') }}</text>
        <g v-for="b in m" :key="'bk' + b">
          <rect :x="bucketX(b - 1)" y="70" :width="bucketW" height="330" rx="6" :fill="bucketCounts[b - 1] > 1 ? 'var(--neg)' : 'var(--sunken)'" :fill-opacity="bucketCounts[b - 1] > 1 ? 0.12 : 1" stroke="var(--line)" />
          <text class="num" :x="bucketX(b - 1) + bucketW / 2" y="410" text-anchor="middle" font-size="11" fill="var(--muted)">{{ b - 1 }}</text>
        </g>
        <g v-for="(p, i) in placed" :key="'chip' + p.k">
          <rect :x="bucketX(p.b) + 4" :y="76 + placed.slice(0, i).filter((q) => q.b === p.b).length * 40" :width="bucketW - 8" height="34" rx="6" :fill="bucketCounts[p.b] > 1 ? 'var(--neg)' : 'var(--accent)'" fill-opacity="0.8" />
          <text class="num" :x="bucketX(p.b) + bucketW / 2" :y="76 + placed.slice(0, i).filter((q) => q.b === p.b).length * 40 + 22" text-anchor="middle" font-size="13" fill="#fff">{{ p.k }}</text>
        </g>
      </template>

      <template v-else>
        <text class="num" x="16" y="70" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hc.sender') }}: "Hello"</text>
        <g v-for="(c, i) in MSG" :key="'s' + i">
          <rect :x="16 + i * 90" y="86" width="76" height="50" rx="8" fill="var(--sunken)" stroke="var(--line)" />
          <text class="num" :x="54 + i * 90" y="108" text-anchor="middle" font-size="16" fill="var(--fg)">'{{ c }}'</text>
          <text class="num" :x="54 + i * 90" y="128" text-anchor="middle" font-size="12" fill="var(--muted)">{{ BYTES[i] }}</text>
        </g>
        <text class="num" x="16" y="180" font-size="14" fill="var(--accent)">{{ t('hc.checksumSender') }} = ({{ BYTES.join(' + ') }}) mod 256 = {{ sentSum }}</text>

        <text class="num" x="16" y="240" font-size="13" font-weight="600" fill="var(--fg)">{{ t('hc.receiver') }}</text>
        <g v-for="(v, i) in recvBytes" :key="'r' + i">
          <rect :x="16 + i * 90" y="256" width="76" height="50" rx="8" :fill="corrupt && i === CORRUPT_IDX ? 'var(--neg)' : 'var(--sunken)'" :fill-opacity="corrupt && i === CORRUPT_IDX ? 0.25 : 1" stroke="var(--line)" />
          <text class="num" :x="54 + i * 90" y="278" text-anchor="middle" font-size="16" :fill="corrupt && i === CORRUPT_IDX ? 'var(--neg)' : 'var(--fg)'">{{ v }}</text>
          <text class="num" :x="54 + i * 90" y="298" text-anchor="middle" font-size="11" fill="var(--muted)">byte {{ i }}</text>
        </g>
        <text class="num" x="16" y="350" font-size="14" :fill="okMatch ? 'var(--pos)' : 'var(--neg)'">{{ t('hc.checksumReceiver') }} = ({{ recvBytes.join(' + ') }}) mod 256 = {{ recvSum }}</text>
        <text class="num" x="16" y="390" font-size="20" font-weight="700" :fill="okMatch ? 'var(--pos)' : 'var(--neg)'">{{ okMatch ? t('hc.match') : t('hc.mismatch') }}</text>
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
