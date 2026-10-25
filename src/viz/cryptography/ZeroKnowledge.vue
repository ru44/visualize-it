<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// The Ali Baba cave: a ring tunnel with a magic door at the back. Peggy walks in by one side; Victor
// then shouts which side she must come out of. Knowing the password, she always can. A cheater survives
// each round only by luck — watch the odds halve. params rounds (1..20), cheat (0 honest, 1 bluffing).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const rounds = computed(() => Math.max(1, Math.min(20, Math.round(props.params.rounds ?? 3))))
const cheat = computed(() => Math.round(props.params.cheat ?? 0) >= 1)
// deterministic "coin flips": Victor's challenge and the side a cheater happened to pick
const flip = (i: number, salt: number) => { let h = (Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 11, 40503)) >>> 0; h ^= h >>> 15; return (Math.imul(h, 2246822519) >>> 13) & 1 }
const rows = computed(() => Array.from({ length: rounds.value }, (_, i) => { const ask = flip(i, 1); const picked = flip(i, 2); return { ask, ok: !cheat.value || picked === ask } }))
const failAt = computed(() => rows.value.findIndex((r) => !r.ok))
const odds = computed(() => Math.pow(2, rounds.value))
const readouts = computed(() => [
  { label: t('zk.rounds'), value: String(rounds.value) },
  { label: t('zk.odds'), value: `1 / ${odds.value.toLocaleString('en-US')}`, color: 'var(--accent-2)' },
  { label: t('zk.learned'), value: t('zk.nothing'), color: 'var(--pos)' },
  { label: t('zk.verdict'), value: cheat.value ? (failAt.value >= 0 ? t('zk.caught', { n: failAt.value + 1 }) : t('zk.lucky')) : t('zk.convinced'), color: cheat.value && failAt.value >= 0 ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('zk.hint') }}</text>
      <!-- the cave: a ring with a door at the top -->
      <g transform="translate(170, 240)">
        <circle r="130" fill="none" stroke="var(--sunken)" stroke-width="44" />
        <circle r="130" fill="none" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 5" />
        <rect x="-16" y="-156" width="32" height="50" rx="5" fill="var(--accent-2)" />
        <text y="-124" text-anchor="middle" font-size="13" fill="#fff">🚪</text>
        <text y="-176" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('zk.door') }}</text>
        <rect x="-16" y="108" width="32" height="48" fill="var(--panel)" />
        <text x="-72" y="-20" text-anchor="middle" font-size="16" fill="var(--fg)" class="num">A</text>
        <text x="72" y="-20" text-anchor="middle" font-size="16" fill="var(--fg)" class="num">B</text>
        <text y="186" text-anchor="middle" font-size="12" fill="var(--fg)">🧍 {{ t('zk.victor') }}</text>
        <text y="96" text-anchor="middle" font-size="12">🧕</text>
        <text y="76" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('zk.peggy') }}</text>
      </g>
      <!-- the rounds: challenge and result -->
      <text x="400" y="66" font-size="12" font-weight="600" fill="var(--fg)">{{ t('zk.rows') }}</text>
      <g v-for="(r, i) in rows" :key="i" class="num" :transform="`translate(${400 + (i % 10) * 38}, ${80 + Math.floor(i / 10) * 64})`">
        <rect width="30" height="24" rx="5" fill="var(--sunken)" stroke="var(--line)" />
        <text x="15" y="17" text-anchor="middle" font-size="12" fill="var(--fg)">{{ r.ask ? 'B' : 'A' }}</text>
        <text x="15" y="46" text-anchor="middle" font-size="13" :fill="r.ok ? 'var(--pos)' : 'var(--neg)'">{{ r.ok ? '✓' : '✗' }}</text>
      </g>
      <!-- the cheater's shrinking odds -->
      <text x="400" y="262" font-size="12" font-weight="600" fill="var(--fg)">{{ t('zk.meter') }}</text>
      <g v-for="i in rounds" :key="'b' + i">
        <rect :x="400 + (i - 1) * 19" :y="280 + (1 - 1 / Math.pow(2, i - 1)) * 120" width="15" :height="Math.max(2, (1 / Math.pow(2, i - 1)) * 120)" rx="2" fill="var(--neg)" :fill-opacity="0.85" />
      </g>
      <line x1="398" y1="400" x2="790" y2="400" stroke="var(--line)" />
      <text x="400" y="420" font-size="11" fill="var(--muted)">{{ t('zk.after', { n: rounds }) }}</text>
      <text class="num" x="400" y="443" font-size="14" fill="var(--neg)">1 / {{ odds.toLocaleString('en-US') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
