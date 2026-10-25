<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/packet-switching. params S (message size, KB), P (packet size, bytes), cut (top route
// down, 0/1). The message is chopped into k = ceil(1000·S/P) numbered packets; odd ones ride the top
// route, even ones the bottom — unless the top link is cut, when everything reroutes. The receiver's
// shelf puts them back in order no matter how they arrive.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const S = computed(() => Math.min(Math.max(props.params.S ?? 12, 1), 60))
const P = computed(() => Math.min(Math.max(props.params.P ?? 1500, 200), 1500))
const cut = computed(() => Math.round(props.params.cut ?? 0) >= 1)
const k = computed(() => Math.ceil((1000 * S.value) / P.value))

const SRC = { x: 80, y: 240 }
const DST = { x: 720, y: 240 }
const TOP: [number, number][] = [
  [80, 240],
  [230, 120],
  [440, 100],
  [600, 150],
  [720, 240],
]
const BOT: [number, number][] = [
  [80, 240],
  [250, 350],
  [470, 370],
  [720, 240],
]
function along(path: [number, number][], u: number) {
  const segs = path.length - 1
  const s = Math.min(segs - 1e-6, u * segs)
  const i = Math.floor(s)
  const f = s - i
  return { x: path[i][0] + (path[i + 1][0] - path[i][0]) * f, y: path[i][1] + (path[i + 1][1] - path[i][1]) * f }
}

const time = useAnimationClock()

// up to 12 packets shown travelling; the rest are implied by the counter
const shown = computed(() => Math.min(k.value, 12))
const moving = computed(() =>
  Array.from({ length: shown.value }, (_, i) => {
    const topRoute = !cut.value && i % 2 === 0
    // bottom route is a touch slower and queues when it carries everything
    const speed = topRoute ? 0.22 : 0.17
    const u = (time.value * speed + (i * 0.83) / shown.value) % 1.3
    const arrived = u >= 1
    const p = arrived ? { x: DST.x, y: DST.y } : along(topRoute ? TOP : BOT, u)
    return { n: i + 1, top: topRoute, u: Math.min(u, 1), x: p.x, y: p.y, arrived }
  }),
)
const arrivedSet = computed(() => new Set(moving.value.filter((m) => m.arrived).map((m) => m.n)))

const readouts = computed(() => [
  { label: t('pkt.msg'), value: `${fmt(S.value, 0)} KB` },
  { label: t('pkt.size'), value: `${fmt(P.value, 0)} B` },
  { label: 'k = ⌈1000·S/P⌉', value: `${fmt(k.value, 0)}`, color: 'var(--accent)' },
  { label: t('pkt.routes'), value: cut.value ? t('pkt.oneRoute') : t('pkt.twoRoutes'), color: cut.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('pkt.hint') }}</text>

      <!-- the two routes through the mesh -->
      <polyline :points="TOP.map((p) => p.join(',')).join(' ')" fill="none" :stroke="cut ? 'var(--line)' : 'var(--accent)'" stroke-width="2" :opacity="cut ? 0.35 : 0.5" />
      <polyline :points="BOT.map((p) => p.join(',')).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2" opacity="0.5" />
      <g v-if="cut">
        <line x1="320" y1="90" x2="350" y2="130" stroke="var(--neg)" stroke-width="3" />
        <line x1="350" y1="90" x2="320" y2="130" stroke="var(--neg)" stroke-width="3" />
        <text x="335" y="76" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('pkt.linkDown') }}</text>
      </g>

      <!-- routers -->
      <g v-for="(r, i) in [...TOP.slice(1, -1), ...BOT.slice(1, -1)]" :key="'r' + i">
        <circle :cx="r[0]" :cy="r[1]" r="13" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
        <circle :cx="r[0]" :cy="r[1]" r="4" fill="var(--muted)" />
      </g>

      <!-- sender: the message being chopped -->
      <rect :x="SRC.x - 48" :y="SRC.y - 24" width="48" height="48" rx="6" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <text :x="SRC.x - 24" :y="SRC.y + 44" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('pkt.sender') }}</text>

      <!-- packets in flight -->
      <g v-for="m in moving" :key="'p' + m.n">
        <g v-if="!m.arrived">
          <rect :x="m.x - 9" :y="m.y - 8" width="18" height="16" rx="3" fill="var(--accent)" />
          <text :x="m.x" :y="m.y + 4" text-anchor="middle" font-size="9" fill="#fff" class="num">{{ m.n }}</text>
        </g>
      </g>

      <!-- receiver and the reassembly shelf -->
      <rect :x="DST.x" :y="DST.y - 24" width="48" height="48" rx="6" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="DST.x + 24" :y="DST.y + 44" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('pkt.receiver') }}</text>
      <g font-size="9" class="num">
        <text x="400" y="420" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('pkt.shelf') }}</text>
        <g v-for="i in shown" :key="'s' + i">
          <rect :x="400 - shown * 11 + (i - 1) * 22" y="430" width="20" height="18" rx="3" :fill="arrivedSet.has(i) ? 'var(--pos)' : 'var(--sunken)'" :stroke="arrivedSet.has(i) ? 'none' : 'var(--line)'" />
          <text :x="400 - shown * 11 + (i - 1) * 22 + 10" y="443" text-anchor="middle" :fill="arrivedSet.has(i) ? '#fff' : 'var(--muted)'">{{ i }}</text>
        </g>
        <text v-if="k > shown" :x="400 + shown * 11 + 10" y="443" fill="var(--muted)">+{{ fmt(k - shown, 0) }}</text>
      </g>
      <text x="400" :y="H - 4" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('pkt.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
