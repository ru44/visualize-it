<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// Shamir's secret sharing drawn as a curve: the secret is where a hidden polynomial of degree k−1
// crosses x = 0, and each share is one point on it. Reveal fewer than k shares and every secret is
// still possible (the ghost curves); reveal k and the curve snaps into place.
// params secret (0..8), k (2..4), shown (0..5).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const secret = computed(() => Math.max(0, Math.min(8, Math.round(props.params.secret ?? 5))))
const k = computed(() => Math.max(2, Math.min(4, Math.round(props.params.k ?? 3))))
const shown = computed(() => Math.max(0, Math.min(5, Math.round(props.params.shown ?? 2))))
// fixed small coefficients so the curve stays on screen
const coef = computed(() => [secret.value, ...Array.from({ length: k.value - 1 }, (_, i) => ((((secret.value * 7 + (i + 1) * 13) % 5) - 2) || 1) / (i + 1))])
const f = (x: number) => coef.value.reduce((acc, c, i) => acc + c * x ** i, 0)
const shares = computed(() => Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: f(i + 1) })))
// Lagrange interpolation through a set of points
const lagrange = (pts: { x: number; y: number }[]) => (x: number) => pts.reduce((acc, p, i) => acc + p.y * pts.reduce((w, q, j) => (i === j ? w : (w * (x - q.x)) / (p.x - q.x)), 1), 0)
const revealed = computed(() => shares.value.slice(0, shown.value))
const locked = computed(() => shown.value >= k.value)
// ghost curves: for each possible secret, a curve through the revealed shares and (0, s′)
const ghosts = computed(() => (locked.value ? [] : Array.from({ length: 9 }, (_, s) => lagrange([{ x: 0, y: s }, ...revealed.value.slice(0, k.value - 1)]))))
const ys = computed(() => shares.value.map((s) => s.y).concat([secret.value, 0, 10]))
const ymin = computed(() => Math.min(...ys.value) - 3)
const ymax = computed(() => Math.max(...ys.value) + 3)
const X = (x: number) => 90 + x * 120
const Y = (y: number) => 430 - ((y - ymin.value) / (ymax.value - ymin.value)) * 390
const path = (fn: (x: number) => number) => Array.from({ length: 57 }, (_, i) => { const x = -0.3 + (i / 56) * 5.8; return `${i ? 'L' : 'M'}${X(x).toFixed(1)},${Math.max(10, Math.min(470, Y(fn(x)))).toFixed(1)}` }).join('')
const readouts = computed(() => [
  { label: t('shamir.threshold'), value: `${k.value} / 5` },
  { label: t('shamir.revealed'), value: String(shown.value), color: 'var(--accent)' },
  { label: t('shamir.secret'), value: locked.value ? String(secret.value) : '?', color: locked.value ? 'var(--neg)' : 'var(--pos)' },
  { label: t('shamir.status'), value: locked.value ? t('shamir.found') : t('shamir.candidates', { n: 9 }), color: locked.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('shamir.hint') }}</text>
      <!-- axes -->
      <line :x1="X(0)" y1="20" :x2="X(0)" y2="440" stroke="var(--line)" />
      <line :x1="X(-0.3)" :y1="Y(0)" :x2="X(5.5)" :y2="Y(0)" stroke="var(--line)" />
      <text v-for="i in 5" :key="i" :x="X(i)" :y="Y(0) + 16" text-anchor="middle" font-size="11" fill="var(--muted)" class="num">{{ i }}</text>
      <text :x="X(0) - 10" y="34" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('shamir.axis') }}</text>
      <!-- ghost curves: every one of these secrets still fits -->
      <path v-for="(g, i) in ghosts" :key="'g' + i" :d="path(g)" fill="none" stroke="var(--accent-2)" stroke-opacity="0.3" stroke-width="1.5" />
      <circle v-for="(g, i) in ghosts" :key="'gd' + i" :cx="X(0)" :cy="Y(i)" r="4" fill="var(--accent-2)" fill-opacity="0.5" />
      <!-- the true curve, only once enough shares are out -->
      <path v-if="locked" :d="path(f)" fill="none" stroke="var(--neg)" stroke-width="2.5" />
      <circle v-if="locked" :cx="X(0)" :cy="Y(secret)" r="9" fill="var(--neg)" />
      <text v-if="locked" :x="X(0) - 14" :y="Y(secret) + 5" text-anchor="end" font-size="14" fill="var(--neg)" font-weight="700" class="num">{{ secret }}</text>
      <!-- the shares -->
      <g v-for="(s, i) in shares" :key="'s' + i" class="num">
        <circle :cx="X(s.x)" :cy="Y(s.y)" r="8" :fill="i < shown ? 'var(--accent)' : 'var(--sunken)'" :stroke="i < shown ? 'none' : 'var(--line)'" />
        <text :x="X(s.x)" :y="Y(s.y) - 14" text-anchor="middle" font-size="10" :fill="i < shown ? 'var(--accent)' : 'var(--muted)'">{{ i < shown ? `(${s.x}, ${+s.y.toFixed(1)})` : '🔒' }}</text>
      </g>
      <text x="460" y="56" font-size="12" :fill="locked ? 'var(--neg)' : 'var(--pos)'" font-weight="600">{{ locked ? t('shamir.lockedMsg', { k }) : t('shamir.hiddenMsg', { n: Math.max(0, k - shown) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
