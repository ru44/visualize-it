<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Diffie-Hellman as paint mixing: every number mod p is a colour (its hue). g is the public paint;
// a and b are private pigments. Mixing = modular exponentiation, and unmixing is the discrete log.
// params g (2..10), a, b (1..11); options.p is the prime modulus (default 23).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const P = computed(() => Math.max(2, Math.round(props.options.p ?? 23)))
const g = computed(() => Math.max(2, Math.round(props.params.g ?? 5)))
const a = computed(() => Math.max(1, Math.round(props.params.a ?? 6)))
const b = computed(() => Math.max(1, Math.round(props.params.b ?? 9)))
const modpow = (base: number, e: number, m: number) => { let r = 1; const x = base % m; for (let i = 0; i < e; i++) r = (r * x) % m; return r }
const A = computed(() => modpow(g.value, a.value, P.value))
const B = computed(() => modpow(g.value, b.value, P.value))
const s = computed(() => modpow(B.value, a.value, P.value))
const hue = (v: number) => `hsl(${Math.round((v / P.value) * 360)} 70% 52%)`
const readouts = computed(() => [
  { label: `A = g^a mod ${P.value}`, value: String(A.value), color: hue(A.value) },
  { label: `B = g^b mod ${P.value}`, value: String(B.value), color: hue(B.value) },
  { label: t('dh.shared'), value: `${s.value} = ${modpow(A.value, b.value, P.value)}`, color: hue(s.value) },
  { label: t('dh.eve'), value: `g=${g.value}, A=${A.value}, B=${B.value}` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('dh.hint') }}</text>
      <!-- public paint g -->
      <rect x="360" y="36" width="80" height="34" rx="8" :fill="hue(g)" />
      <text x="400" y="58" text-anchor="middle" font-size="14" fill="#fff" class="num">g = {{ g }}</text>
      <text x="400" y="88" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dh.public') }}</text>
      <!-- the public channel -->
      <rect x="250" y="160" width="300" height="190" rx="12" fill="var(--sunken)" stroke="var(--line)" stroke-dasharray="6 4" />
      <text x="400" y="182" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dh.channel') }}</text>
      <text x="400" y="340" text-anchor="middle" font-size="20">👁</text>
      <!-- Alice -->
      <g v-for="(side, i) in [{ x: 60, name: t('dh.alice'), sec: a, pub: A, got: B }, { x: 620, name: t('dh.bob'), sec: b, pub: B, got: A }]" :key="i">
        <text :x="side.x + 60" y="130" text-anchor="middle" font-size="14" fill="var(--fg)" font-weight="600">{{ side.name }}</text>
        <rect :x="side.x" y="150" width="120" height="30" rx="8" :fill="hue(side.sec)" />
        <text :x="side.x + 60" y="170" text-anchor="middle" font-size="12" fill="#fff" class="num">{{ i ? 'b' : 'a' }} = {{ side.sec }} 🔒</text>
        <text :x="side.x + 60" y="198" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('dh.secret') }}</text>
        <!-- mixed public value, slides into the channel -->
        <rect :x="i ? 460 : 260" y="220" width="80" height="30" rx="8" :fill="hue(side.pub)" />
        <text :x="(i ? 460 : 260) + 40" y="240" text-anchor="middle" font-size="12" fill="#fff" class="num">{{ i ? 'B' : 'A' }} = {{ side.pub }}</text>
        <line :x1="side.x + 60" y1="184" :x2="(i ? 460 : 260) + 40" y2="218" stroke="var(--line)" />
        <!-- the swap -->
        <path :d="i ? 'M460,265 h-120' : 'M340,245 h120'" :stroke="hue(side.pub)" stroke-width="2" fill="none" />
        <text :x="400" :y="i ? 278 : 212" text-anchor="middle" font-size="10" fill="var(--muted)">{{ i ? '⟵' : '⟶' }}</text>
        <!-- final shared colour -->
        <rect :x="side.x" y="380" width="120" height="36" rx="8" :fill="hue(s)" stroke="var(--accent-2)" stroke-width="2" />
        <text :x="side.x + 60" y="403" text-anchor="middle" font-size="13" fill="#fff" class="num">s = {{ s }}</text>
        <line :x1="(i ? 340 : 460) + 20" y1="252" :x2="side.x + 60" y2="378" stroke="var(--line)" stroke-dasharray="3 3" />
        <text :x="side.x + 60" y="432" text-anchor="middle" font-size="11" fill="var(--muted)">{{ i ? `A^b mod ${P}` : `B^a mod ${P}` }}</text>
      </g>
      <text x="400" y="404" text-anchor="middle" font-size="13" fill="var(--pos)" font-weight="600">{{ t('dh.same') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
