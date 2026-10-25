<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/bluetooth. params k (rival pairs sharing the room), r (hops per second, drawn slowed).
// Your phone and earbud hop across the 79 Bluetooth channels in perfect sync; rivals land where
// they like. A clash ruins one hop — chance P = 1 − (1 − 1/79)^k — and the very next hop fixes it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const CH = 79
const k = computed(() => Math.min(Math.max(Math.round(props.params.k ?? 5), 0), 30))
const r = computed(() => Math.min(Math.max(Math.round(props.params.r ?? 1600), 100), 1600))
const pCollide = computed(() => 1 - (1 - 1 / CH) ** k.value)

const hop = ref(0)
let raf = 0
let last = 0
let acc = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  acc += dt * (1.5 + r.value / 800) // stylised hop tempo
  if (acc >= 1) {
    hop.value += Math.floor(acc)
    acc -= Math.floor(acc)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const SX = 60
const SW = 680
const SY = 170
const SH2 = 56
const chX = (c: number) => SX + (c + 0.5) * (SW / CH)
const myCh = computed(() => ((hop.value * 17 + 7) % CH + CH) % CH)
const rivals = computed(() => Array.from({ length: k.value }, (_, j) => (((hop.value * (13 + j * 7) + j * 31 + 3) % CH) + CH) % CH))
const clash = computed(() => rivals.value.includes(myCh.value))

const readouts = computed(() => [
  { label: t('bt.channels'), value: '79 × 1 MHz' },
  { label: t('bt.rivals'), value: String(k.value), color: 'var(--accent-2)' },
  { label: t('bt.rate'), value: `${r.value}/s` },
  { label: 'P = 1 − (1 − 1/79)^k', value: `${fmt(pCollide.value * 100, 1)}%`, color: pCollide.value > 0.2 ? 'var(--neg)' : 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('bt.hint') }}</text>
      <!-- the 79-channel band -->
      <rect v-for="c in CH" :key="c" :x="SX + (c - 1) * (SW / CH)" :y="SY" :width="SW / CH - 1" :height="SH2" :fill="c - 1 === myCh ? (clash ? 'var(--neg)' : 'var(--accent)') : 'var(--sunken)'" :stroke="c - 1 === myCh ? 'none' : 'var(--line)'" stroke-width="0.4" />
      <text :x="SX" :y="SY - 8" font-size="10" fill="var(--muted)" class="num">2.402 GHz</text>
      <text :x="SX + SW" :y="SY - 8" text-anchor="end" font-size="10" fill="var(--muted)" class="num">2.480 GHz</text>
      <!-- rival pairs camped on their own channels -->
      <circle v-for="(rc, j) in rivals" :key="'rv' + j" :cx="chX(rc)" :cy="SY - 20 - (j % 3) * 12" r="4" fill="var(--accent-2)" opacity="0.55" />
      <!-- your pair, hopping in sync -->
      <rect x="128" y="320" width="34" height="58" rx="7" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
      <text x="145" y="398" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('bt.phone') }}</text>
      <circle cx="652" cy="348" r="20" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
      <text x="652" y="398" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('bt.earbud') }}</text>
      <line x1="145" y1="320" :x2="chX(myCh)" :y2="SY + SH2" stroke="var(--accent)" stroke-dasharray="3 3" />
      <line x1="652" y1="328" :x2="chX(myCh)" :y2="SY + SH2" stroke="var(--accent)" stroke-dasharray="3 3" />
      <text :x="chX(myCh)" :y="SY + SH2 + 18" text-anchor="middle" font-size="10" fill="var(--accent)" class="num">{{ t('bt.myCh', { c: myCh + 1 }) }}</text>
      <text x="400" y="330" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">{{ t('bt.hopNo', { n: hop }) }}</text>
      <text v-if="clash" x="400" y="356" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('bt.clash') }}</text>
      <text v-else x="400" y="356" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('bt.clear') }}</text>
      <text x="400" y="430" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('bt.retry') }}</text>
      <text x="400" :y="H - 12" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('bt.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
