<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// networking/nas-and-raid. params n (disks), s (TB per disk), mode (0 stripe, 1 mirror, 2 parity),
// dead (kill disk 1). One family-photo file is spread across the bays; pull a disk and watch which
// layout shrugs it off. Usable space: stripe ns, mirror ns/2, parity (n−1)s.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const n = computed(() => Math.min(Math.max(Math.round(props.params.n ?? 4), 3), 8))
const s = computed(() => Math.min(Math.max(Math.round(props.params.s ?? 4), 1), 20))
const mode = computed(() => Math.min(Math.max(Math.round(props.params.mode ?? 2), 0), 2))
const dead = computed(() => Math.round(props.params.dead ?? 0) >= 1)
const raw = computed(() => n.value * s.value)
const usable = computed(() => (mode.value === 0 ? raw.value : mode.value === 1 ? raw.value / 2 : (n.value - 1) * s.value))
const survives = computed(() => mode.value !== 0)
const modeName = computed(() => (mode.value === 0 ? t('nas.stripe') : mode.value === 1 ? t('nas.mirror') : t('nas.parity')))

const DX = 96
const DW = 38
const DGAP = 46
const DY = 150
const DH2 = 230
const diskX = (i: number) => DX + i * DGAP
const hue = (j: number) => `hsl(${(j * 57 + 10) % 360} 65% 52%)`
// the file: 6 blocks laid out by mode. Each block = {disk, row, j, parity?, copy?}
const blocks = computed(() => {
  const out: { disk: number; row: number; j: number; parity: boolean; copy: boolean }[] = []
  if (mode.value === 0) {
    for (let j = 0; j < 6; j++) out.push({ disk: j % n.value, row: Math.floor(j / n.value), j, parity: false, copy: false })
  } else if (mode.value === 1) {
    const half = Math.floor(n.value / 2)
    for (let j = 0; j < 6; j++) {
      out.push({ disk: j % half, row: Math.floor(j / half), j, parity: false, copy: false })
      out.push({ disk: half + (j % half), row: Math.floor(j / half), j, parity: false, copy: true })
    }
  } else {
    const dataDisks = n.value - 1
    for (let j = 0; j < 6; j++) out.push({ disk: j % dataDisks, row: Math.floor(j / dataDisks), j, parity: false, copy: false })
    for (let row = 0; row <= Math.floor(5 / dataDisks); row++) out.push({ disk: n.value - 1, row, j: -1, parity: true, copy: false })
  }
  return out
})
const blockY = (row: number) => DY + 26 + row * 30

const readouts = computed(() => [
  { label: t('nas.disks'), value: `${n.value} × ${s.value} TB` },
  { label: t('nas.mode'), value: modeName.value, color: 'var(--accent)' },
  { label: t('nas.raw'), value: `${raw.value} TB` },
  { label: t('nas.usable'), value: `${fmt(usable.value, 1)} TB`, color: 'var(--accent-2)' },
  { label: t('nas.oneDead'), value: survives.value ? t('nas.ok') : t('nas.lostAll'), color: survives.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('nas.hint') }}</text>
      <!-- the NAS box and its bays -->
      <rect :x="DX - 20" :y="DY - 40" :width="n * DGAP + 32" :height="DH2 + 78" rx="12" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <text :x="DX - 20 + (n * DGAP + 32) / 2" :y="DY - 16" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('nas.box') }}</text>
      <g v-for="i in n" :key="i">
        <rect :x="diskX(i - 1)" :y="DY" :width="DW" :height="DH2" rx="6" fill="var(--sunken)" :stroke="dead && i === 1 ? 'var(--neg)' : 'var(--line)'" :stroke-width="dead && i === 1 ? 2.5 : 1" />
        <text :x="diskX(i - 1) + DW / 2" :y="DY + DH2 + 20" text-anchor="middle" font-size="9" fill="var(--muted)" class="num">{{ s }} TB</text>
        <text v-if="dead && i === 1" :x="diskX(i - 1) + DW / 2" :y="DY + DH2 / 2 + 10" text-anchor="middle" font-size="30" fill="var(--neg)">✕</text>
      </g>
      <!-- the file's blocks -->
      <g v-for="(b, idx) in blocks" :key="idx">
        <rect
          v-if="!(dead && b.disk === 0 && !b.parity) || mode === 0"
          :x="diskX(b.disk) + 5"
          :y="blockY(b.row)"
          :width="DW - 10"
          height="22"
          rx="4"
          :fill="b.parity ? 'var(--muted)' : hue(b.j)"
          :opacity="(dead && b.disk === 0) ? 0.25 : b.copy ? 0.55 : b.parity ? 0.8 : 1"
        />
        <text v-if="b.parity && !(dead && b.disk === 0)" :x="diskX(b.disk) + DW / 2" :y="blockY(b.row) + 16" text-anchor="middle" font-size="10" fill="#fff" class="num">P</text>
      </g>
      <!-- recovery story -->
      <text v-if="dead && mode === 0" x="595" y="200" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('nas.gone') }}</text>
      <text v-if="dead && mode === 1" x="595" y="200" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('nas.copySaves') }}</text>
      <text v-if="dead && mode === 2" x="595" y="200" text-anchor="middle" font-size="12" fill="var(--pos)">{{ t('nas.rebuild') }}</text>
      <text v-if="!dead" x="595" y="200" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('nas.pull') }}</text>
      <!-- capacity bar -->
      <text x="505" y="266" font-size="11" fill="var(--fg)">{{ t('nas.capacity') }}</text>
      <rect x="505" y="278" width="240" height="16" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="505" y="278" :width="(usable / 160) * 240" height="16" rx="5" fill="var(--accent-2)" />
      <text x="505" y="314" font-size="10" fill="var(--accent-2)" class="num">{{ t('nas.usableOf', { u: fmt(usable, 1), raw }) }}</text>
      <text x="505" y="344" font-size="10" fill="var(--muted)">{{ mode === 0 ? t('nas.stripeNote') : mode === 1 ? t('nas.mirrorNote') : t('nas.parityNote') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('nas.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
