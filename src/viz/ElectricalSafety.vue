<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/electrical-safety. params: V (touch voltage), Rb (body resistance). A simple stick
// figure shows the current path hand-to-hand, and a labelled danger gauge compares the computed
// body current in mA against the real thresholds: perception (1), can't-let-go (10), RCD trip (30),
// and the roughly fatal range (100-200), with an RCD indicator that visibly trips above 30 mA.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const voltage = computed(() => Math.max(props.params.V ?? 230, 0.1))
const bodyR = computed(() => Math.max(props.params.Rb ?? 1000, 1))
const currentA = computed(() => voltage.value / bodyR.value)
const currentMA = computed(() => currentA.value * 1000)
const tripped = computed(() => currentMA.value >= 30)

// log-scale gauge from 0.1 mA to 1000 mA
const GX0 = 260, GX1 = 760
const gx = (mA: number) => GX0 + (Math.log10(Math.max(0.1, Math.min(1000, mA))) - -1) / (3 - -1) * (GX1 - GX0)
const marks = [{ mA: 1, key: 'es.perceive' }, { mA: 10, key: 'es.hold' }, { mA: 30, key: 'es.rcd' }, { mA: 100, key: 'es.fatal' }]

const readouts = computed(() => [
  { label: 'V', value: `${fmt(voltage.value)} V` },
  { label: 'Rb', value: `${fmt(bodyR.value)} Ω` },
  { label: 'Ib = V/Rb', value: `${currentMA.value < 1 ? currentMA.value.toFixed(3) : fmt(currentMA.value, 1)} mA`, color: tripped.value ? 'var(--neg)' : 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('es.hint') }}</text>

      <!-- stick figure touching a live wire, current path hand to hand -->
      <g transform="translate(80, 150)">
        <circle cx="40" cy="20" r="18" fill="none" stroke="var(--fg)" stroke-width="2" />
        <line x1="40" y1="38" x2="40" y2="110" stroke="var(--fg)" stroke-width="2" />
        <line x1="40" y1="60" x2="0" y2="30" :stroke="tripped ? 'var(--neg)' : 'var(--accent)'" stroke-width="3" />
        <line x1="40" y1="60" x2="80" y2="90" :stroke="tripped ? 'var(--neg)' : 'var(--accent)'" stroke-width="3" />
        <line x1="40" y1="110" x2="15" y2="170" stroke="var(--fg)" stroke-width="2" />
        <line x1="40" y1="110" x2="65" y2="170" stroke="var(--fg)" stroke-width="2" />
        <text x="-30" y="24" font-size="11" fill="var(--muted)">{{ t('es.live') }}</text>
        <line x1="-20" y1="30" x2="0" y2="30" :stroke="tripped ? 'var(--neg)' : 'var(--accent)'" stroke-width="3" />
        <text x="90" y="95" font-size="11" fill="var(--muted)">{{ t('es.ground') }}</text>
      </g>

      <!-- danger gauge -->
      <line :x1="GX0" y1="260" :x2="GX1" y2="260" stroke="var(--line)" stroke-width="6" />
      <line :x1="GX0" y1="260" :x2="Math.min(GX1, gx(currentMA))" y2="260" :stroke="tripped ? 'var(--neg)' : 'var(--accent)'" stroke-width="6" />
      <g v-for="m in marks" :key="m.mA">
        <line :x1="gx(m.mA)" y1="248" :x2="gx(m.mA)" y2="272" stroke="var(--muted)" />
        <text :x="gx(m.mA)" y="292" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t(m.key as any) }}</text>
        <text :x="gx(m.mA)" y="238" text-anchor="middle" font-size="9" fill="var(--muted)">{{ m.mA }} mA</text>
      </g>
      <circle :cx="Math.min(GX1, Math.max(GX0, gx(currentMA)))" cy="260" r="8" :fill="tripped ? 'var(--neg)' : 'var(--accent)'" />

      <text :x="(GX0 + GX1) / 2" y="330" text-anchor="middle" font-size="14" font-weight="600" :fill="tripped ? 'var(--neg)' : 'var(--fg)'">
        {{ tripped ? t('es.tripped') : t('es.safe') }}
      </text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('es.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
