<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// options.mode 'build': three quarks make a particle (params q1, q2, q3: 0 up, 1 down, 2 strange); the charges add up.
// options.mode 'pull': try to pull one quark out (param d, femtometres). The binding energy grows with distance until
// it is enough to create a new quark–antiquark pair, so you get two particles, never a lone quark.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const Q = [
  { s: 'u', q: 2 / 3, qs: '+⅔', m: 2.2 },
  { s: 'd', q: -1 / 3, qs: '−⅓', m: 4.7 },
  { s: 's', q: -1 / 3, qs: '−⅓', m: 95 },
]
const names: Record<string, [string, number]> = { duu: ['proton', 938.3], ddu: ['neutron', 939.6], uuu: ['deltaPP', 1232], ddd: ['deltaM', 1232], dsu: ['lambda', 1115.7], suu: ['sigmaP', 1189.4], dds: ['sigmaM', 1197.4], ssu: ['xi0', 1314.9], dss: ['xiM', 1321.7], sss: ['omegaM', 1672.5] }
const mode = computed(() => props.options.mode ?? 'build')
const picks = computed(() => ['q1', 'q2', 'q3'].map((k, i) => Math.max(0, Math.min(2, Math.round(props.params[k] ?? [0, 0, 1][i])))))
const key = computed(() => picks.value.map((i) => Q[i].s).sort().join(''))
const particle = computed(() => names[key.value] ?? ['unknown', 0])
const charge = computed(() => picks.value.reduce((s, i) => s + Q[i].q, 0))
const quarkMass = computed(() => picks.value.reduce((s, i) => s + Q[i].m, 0))
const chargeText = (c: number) => (Math.abs(c) < 1e-9 ? '0' : c > 0 ? `+${Math.round(c)}` : `−${Math.round(-c)}`)
const colors = ['#e5484d', '#30a46c', '#3e63dd']
// pull mode
const d = computed(() => props.params.d ?? 0.5)
const energy = computed(() => d.value * 1.0) // GeV, string tension about 1 GeV per femtometre
const snapped = computed(() => energy.value > 1.2)
const readouts = computed(() =>
  mode.value === 'build'
    ? [
        { label: t('quark.recipe'), value: picks.value.map((i) => Q[i].s).join(' '), color: 'var(--accent-2)' },
        { label: t('quark.charge'), value: `${picks.value.map((i) => Q[i].qs).join(' ')} = ${chargeText(charge.value)}`, color: 'var(--accent)' },
        { label: t('quark.particle'), value: t(`quark.${particle.value[0]}` as any) },
        ...(particle.value[1] ? [{ label: t('quark.massShare'), value: `${((quarkMass.value / particle.value[1]) * 100).toFixed(1)} %` }] : []),
      ]
    : [
        { label: t('quark.distance'), value: `${d.value.toFixed(2)} fm` },
        { label: t('quark.energy'), value: `${energy.value.toFixed(2)} GeV`, color: 'var(--accent-2)' },
        { label: t('quark.result'), value: snapped.value ? t('quark.twoParticles') : t('quark.stillOne'), color: snapped.value ? 'var(--neg)' : 'var(--pos)' },
      ],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <template v-if="mode === 'build'">
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('quark.hint') }}</text>
        <circle cx="260" cy="250" r="170" fill="var(--accent)" fill-opacity="0.06" stroke="var(--accent)" stroke-opacity="0.4" stroke-width="2" />
        <g v-for="(p, i) in picks" :key="i">
          <path :d="`M${260 + 90 * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)},${250 + 90 * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)} Q260,250 ${260 + 90 * Math.cos(((i + 1) * 2 * Math.PI) / 3 - Math.PI / 2)},${250 + 90 * Math.sin(((i + 1) * 2 * Math.PI) / 3 - Math.PI / 2)}`" fill="none" stroke="var(--muted)" stroke-width="3" stroke-dasharray="3 5" />
          <circle :cx="260 + 90 * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)" :cy="250 + 90 * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)" r="38" :fill="colors[i]" />
          <text class="num" :x="260 + 90 * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)" :y="256 + 90 * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)" text-anchor="middle" font-size="24" fill="#fff" font-weight="600">{{ Q[p].s }}</text>
          <text class="num" :x="260 + 90 * Math.cos((i * 2 * Math.PI) / 3 - Math.PI / 2)" :y="280 + 90 * Math.sin((i * 2 * Math.PI) / 3 - Math.PI / 2)" text-anchor="middle" font-size="12" fill="#fff">{{ Q[p].qs }}</text>
        </g>
        <g v-for="k in 3" :key="'pick' + k" :transform="`translate(500, ${60 + (k - 1) * 90})`">
          <text class="num" y="0" font-size="12" fill="var(--muted)">{{ t('quark.slot', { n: k }) }}</text>
          <g v-for="(q, qi) in Q" :key="q.s" class="cursor-pointer" @click="emit('set', `q${k}`, qi)"><rect :x="qi * 80" y="10" width="72" height="44" rx="10" :fill="picks[k - 1] === qi ? colors[k - 1] : 'var(--panel)'" stroke="var(--line)" /><text class="num" :x="qi * 80 + 36" y="38" text-anchor="middle" font-size="16" :fill="picks[k - 1] === qi ? '#fff' : 'var(--fg)'">{{ q.s }} {{ q.qs }}</text></g>
        </g>
        <text class="num" x="500" y="360" font-size="22" fill="var(--accent-2)">{{ t(`quark.${particle[0]}` as any) }}</text>
        <text class="num" x="500" y="392" font-size="14" fill="var(--fg)">{{ t('quark.charge') }}: {{ chargeText(charge) }}</text>
      </template>
      <template v-else>
        <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('quark.hintPull') }}</text>
        <template v-if="!snapped">
          <circle cx="220" cy="240" r="34" fill="#e5484d" /><text class="num" x="220" y="247" text-anchor="middle" font-size="20" fill="#fff">q</text>
          <path :d="`M254,240 ${Array.from({ length: 12 }, (_, i) => `Q${254 + ((d * 150) / 12) * (i + 0.5)},${240 + (i % 2 ? 14 : -14)} ${254 + ((d * 150) / 12) * (i + 1)},240`).join(' ')}`" fill="none" stroke="var(--accent-2)" :stroke-width="2 + energy * 3" />
          <circle :cx="288 + d * 150" cy="240" r="34" fill="#3e63dd" /><text class="num" :x="288 + d * 150" y="247" text-anchor="middle" font-size="20" fill="#fff">q̄</text>
        </template>
        <template v-else>
          <circle cx="200" cy="240" r="30" fill="#e5484d" /><circle cx="262" cy="240" r="30" fill="#3e63dd" fill-opacity="0.8" /><text class="num" x="231" y="300" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('quark.meson') }}</text>
          <circle :cx="330 + d * 150" cy="240" r="30" fill="#e5484d" fill-opacity="0.8" /><circle :cx="392 + d * 150" cy="240" r="30" fill="#3e63dd" /><text class="num" :x="361 + d * 150" y="300" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('quark.meson') }}</text>
          <text class="num" x="400" y="120" text-anchor="middle" font-size="16" fill="var(--neg)">{{ t('quark.snap') }}</text>
        </template>
        <g transform="translate(120, 360)" class="num" font-size="12">
          <text fill="var(--muted)">{{ t('quark.energy') }}</text>
          <rect y="10" :width="Math.min(560, energy * 400)" height="18" rx="4" fill="var(--accent-2)" />
          <line x1="480" x2="480" y1="4" y2="34" stroke="var(--neg)" stroke-dasharray="4 3" /><text x="484" y="50" fill="var(--neg)">{{ t('quark.pairCost') }}</text>
        </g>
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
