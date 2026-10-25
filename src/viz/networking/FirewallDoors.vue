<script setup lang="ts">
import { computed } from 'vue'
import { useAnimationClock } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/firewall. params web (door 443 open), ssh (door 22 open), R (attack probes per minute).
// A firewall is a wall of 65,535 numbered doors, all bricked shut by default; every service you run
// opens exactly one. Legitimate visitors walk to the door they want; a scanner bot sweeps numbers and
// bounces off brick — unless a door you forgot about answers.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const web = computed(() => Math.round(props.params.web ?? 1) >= 1)
const ssh = computed(() => Math.round(props.params.ssh ?? 0) >= 1)
const R = computed(() => Math.min(Math.max(props.params.R ?? 100, 10), 500))
const nOpen = computed(() => (web.value ? 1 : 0) + (ssh.value ? 1 : 0))

const WALL_X = 430
const time = useAnimationClock()

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
// visitors: honest browsers walking to door 443
const visitors = computed(() =>
  Array.from({ length: 3 }, (_, i) => {
    const u = (time.value * 0.3 + i / 3) % 1
    return { x: 80 + (WALL_X - 24 - 80) * u, y: 150 + 10 * Math.sin(i * 5), through: web.value && u > 0.97 }
  }),
)
// the scanner bot: fires at pseudo-random port numbers, density scales with R
const probes = computed(() => {
  const n = Math.round(3 + (R.value / 500) * 9)
  return Array.from({ length: n }, (_, i) => {
    const u = (time.value * 0.55 + i / n) % 1
    const port = Math.floor(rnd(i + 11) * 65535) + 1
    const hitSsh = ssh.value && i % 5 === 2
    const y = hitSsh ? 320 : 120 + rnd(i * 3 + 1) * 230
    const bounce = !hitSsh
    const x = bounce && u > 0.9 ? WALL_X - 24 - (u - 0.9) * 600 : 80 + (WALL_X - 24 - 80) * Math.min(u, bounce ? 0.9 : 1)
    return { x, y: 390 - (390 - y) * Math.min(u * 1.6, 1), port, hitSsh, bounced: bounce && u > 0.9 }
  })
})

const readouts = computed(() => [
  { label: t('fw.open'), value: fmt(nOpen.value, 0), color: nOpen.value > 1 ? 'var(--accent-2)' : 'var(--pos)' },
  { label: t('fw.sealed'), value: fmt(65535 - nOpen.value, 0) },
  { label: t('fw.probes'), value: `${fmt(R.value * 1440, 0)} / ${t('fw.day')}`, color: 'var(--accent-2)' },
  { label: t('fw.sshDoor'), value: ssh.value ? t('fw.answering') : t('fw.brick'), color: ssh.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('fw.hint') }}</text>

      <!-- the wall -->
      <rect :x="WALL_X - 24" y="60" width="48" height="360" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="i in 11" :key="'b' + i">
        <line :x1="WALL_X - 24" :y1="60 + i * 32" :x2="WALL_X + 24" :y2="60 + i * 32" stroke="var(--line)" stroke-width="0.7" />
      </g>
      <text :x="WALL_X" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('fw.wall') }}</text>

      <!-- door 443 -->
      <rect :x="WALL_X - 18" y="134" width="36" height="34" rx="4" :fill="web ? 'var(--pos)' : 'var(--sunken)'" :stroke="web ? 'none' : 'var(--line)'" />
      <text :x="WALL_X" y="155" text-anchor="middle" font-size="10" :fill="web ? '#fff' : 'var(--muted)'" class="num">443</text>
      <text :x="WALL_X + 34" y="155" font-size="9" fill="var(--muted)">{{ web ? t('fw.webOn') : t('fw.webOff') }}</text>
      <!-- door 22 -->
      <rect :x="WALL_X - 18" y="304" width="36" height="34" rx="4" :fill="ssh ? 'var(--neg)' : 'var(--sunken)'" :stroke="ssh ? 'none' : 'var(--line)'" />
      <text :x="WALL_X" y="325" text-anchor="middle" font-size="10" :fill="ssh ? '#fff' : 'var(--muted)'" class="num">22</text>
      <text :x="WALL_X + 34" y="325" font-size="9" fill="var(--muted)">{{ ssh ? t('fw.sshOn') : t('fw.sshOff') }}</text>

      <!-- honest visitors -->
      <g v-for="(v, i) in visitors" :key="'v' + i">
        <circle :cx="v.x" :cy="v.y" r="5" fill="var(--accent)" />
      </g>
      <text x="100" y="128" font-size="10" fill="var(--accent)">{{ t('fw.visitors') }}</text>

      <!-- the scanner bot -->
      <rect x="60" y="384" width="36" height="28" rx="5" fill="var(--panel)" stroke="var(--neg)" stroke-width="2" />
      <text x="78" y="403" text-anchor="middle" font-size="12">🤖</text>
      <text x="78" y="430" text-anchor="middle" font-size="9" fill="var(--neg)">{{ t('fw.bot', { r: fmt(R, 0) }) }}</text>
      <g v-for="(p, i) in probes" :key="'p' + i" class="num">
        <circle :cx="p.x" :cy="p.y" r="3" :fill="p.hitSsh ? 'var(--neg)' : 'var(--muted)'" />
        <text v-if="!p.bounced" :x="p.x" :y="p.y - 6" text-anchor="middle" font-size="7" fill="var(--muted)">{{ p.port }}</text>
      </g>

      <!-- behind the wall -->
      <rect x="520" y="120" width="200" height="70" rx="8" fill="var(--panel)" stroke="var(--line)" />
      <text x="620" y="148" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('fw.webServer') }}</text>
      <text x="620" y="168" text-anchor="middle" font-size="9" :fill="web ? 'var(--pos)' : 'var(--muted)'">{{ web ? t('fw.serving') : t('fw.unreachable') }}</text>
      <rect x="520" y="290" width="200" height="70" rx="8" fill="var(--panel)" :stroke="ssh ? 'var(--neg)' : 'var(--line)'" :stroke-width="ssh ? 2 : 1" />
      <text x="620" y="318" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('fw.sshServer') }}</text>
      <text x="620" y="338" text-anchor="middle" font-size="9" :fill="ssh ? 'var(--neg)' : 'var(--muted)'">{{ ssh ? t('fw.guessing') : t('fw.safe') }}</text>

      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fw.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
