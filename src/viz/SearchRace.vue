<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Looking for one value among N sorted values: check them one by one, or halve the range each time (an index).
// params e (N = 10^e), target (0..63 on the 64 boxes drawn). Tap a box to search for it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const e = computed(() => Math.max(1, Math.min(12, Math.round(props.params.e ?? 6))))
const N = computed(() => 10 ** e.value)
const target = computed(() => Math.max(0, Math.min(63, Math.round(props.params.target ?? 41))))
const values = Array.from({ length: 64 }, (_, i) => i * 3 + 2)
const trace = computed(() => {
  const out: { lo: number; hi: number; mid: number }[] = []
  let lo = 0
  let hi = 63
  while (lo <= hi && out.length < 8) {
    const mid = (lo + hi) >> 1
    out.push({ lo, hi, mid })
    if (mid === target.value) break
    if (mid < target.value) lo = mid + 1
    else hi = mid - 1
  }
  return out
})
const binarySteps = computed(() => Math.ceil(Math.log2(N.value + 1)))
const time = (steps: number) => { const s = steps * 1e-6; return s < 1e-3 ? `${(s * 1e6).toFixed(0)} µs` : s < 1 ? `${(s * 1e3).toFixed(1)} ms` : s < 3600 ? `${s.toFixed(1)} s` : `${(s / 3600).toFixed(1)} h` }
const sep = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ')
const readouts = computed(() => [
  { label: 'N', value: sep(N.value) },
  { label: t('search.linear'), value: `${sep(N.value)} · ${time(N.value)}`, color: 'var(--neg)' },
  { label: t('search.binary'), value: `${binarySteps.value} · ${time(binarySteps.value)}`, color: 'var(--pos)' },
])
const bw = 11
const bx = (i: number) => 48 + i * bw
const svg = ref<SVGSVGElement>()
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('search.hint') }}</text>
      <g v-for="(v, i) in values" :key="i" class="cursor-pointer" @click="emit('set', 'target', i)">
        <rect :x="bx(i)" y="50" :width="bw - 2" height="26" rx="2" :fill="i === target ? 'var(--accent-2)' : 'var(--sunken)'" stroke="var(--line)" />
      </g>
      <text class="num" x="48" y="96" font-size="11" fill="var(--muted)">{{ t('search.sorted') }}</text>
      <g v-for="(s, k) in trace" :key="k">
        <rect :x="bx(s.lo)" :y="112 + k * 34" :width="(s.hi - s.lo + 1) * bw - 2" height="24" rx="4" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-opacity="0.5" />
        <rect :x="bx(s.mid)" :y="112 + k * 34" :width="bw - 2" height="24" rx="2" :fill="s.mid === target ? 'var(--pos)' : 'var(--accent)'" />
        <text class="num" x="30" :y="129 + k * 34" text-anchor="end" font-size="11" fill="var(--muted)">{{ k + 1 }}</text>
      </g>
      <g class="num" transform="translate(48, 410)" font-size="12">
        <text fill="var(--fg)">{{ t('search.found', { n: trace.length }) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
