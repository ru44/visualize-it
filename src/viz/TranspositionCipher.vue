<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Rail-fence transposition: the letters never change, they just move. The message zigzags down and up
// across `rails` rows; the cipher text reads the rows left to right. params rails (2..6) and pos, the
// letter being followed. options.text is the sample message.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const text = computed<string>(() => (props.options.text ?? 'WE ARE DISCOVERED RUN').toUpperCase())
const letters = computed(() => text.value.replace(/[^A-Z]/g, '').split(''))
const rails = computed(() => Math.max(2, Math.min(6, Math.round(props.params.rails ?? 3))))
const period = computed(() => 2 * (rails.value - 1))
const railOf = (i: number) => { const m = i % period.value; return m < rails.value ? m : period.value - m }
const pos = computed(() => Math.max(0, Math.min(letters.value.length - 1, Math.round(props.params.pos ?? 0))))
const rows = computed(() => Array.from({ length: rails.value }, (_, r) => letters.value.map((ch, i) => (railOf(i) === r ? { ch, i } : null)).filter((x) => x !== null) as { ch: string; i: number }[]))
const cipher = computed(() => rows.value.map((row) => row.map((c) => c.ch).join('')).join(' '))
const hue = (r: number) => `hsl(${200 + r * 42} 65% 50%)`
const dx = computed(() => Math.min(34, 720 / letters.value.length))
const X = (i: number) => 48 + i * dx.value
const Y = (r: number) => 64 + r * 40
const readouts = computed(() => [
  { label: t('transp.rails'), value: String(rails.value) },
  { label: t('transp.period'), value: String(period.value), color: 'var(--accent-2)' },
  { label: t('transp.plain'), value: letters.value.join('') },
  { label: t('transp.cipher'), value: cipher.value, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="emit('set', 'pos', (pos + 1) % letters.length)">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('transp.hint') }}</text>
      <!-- the zigzag path -->
      <polyline :points="letters.map((_, i) => `${X(i)},${Y(railOf(i))}`).join(' ')" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <g v-for="(ch, i) in letters" :key="i" class="num">
        <circle :cx="X(i)" :cy="Y(railOf(i))" :r="i === pos ? 15 : 12" :fill="i === pos ? 'var(--accent-2)' : hue(railOf(i))" />
        <text :x="X(i)" :y="Y(railOf(i)) + 5" text-anchor="middle" font-size="13" fill="#fff" font-weight="600">{{ ch }}</text>
      </g>
      <!-- read the rows off -->
      <text x="48" :y="Y(rails - 1) + 48" font-size="12" fill="var(--muted)">{{ t('transp.read') }}</text>
      <g v-for="(row, r) in rows" :key="'r' + r" class="num">
        <circle :cx="60" :cy="Y(rails - 1) + 70 + r * 26" r="9" :fill="hue(r)" />
        <text :x="60" :y="Y(rails - 1) + 74 + r * 26" text-anchor="middle" font-size="10" fill="#fff">{{ r + 1 }}</text>
        <text v-for="(c, j) in row" :key="j" :x="90 + j * 22" :y="Y(rails - 1) + 75 + r * 26" text-anchor="middle" font-size="14" :fill="c.i === pos ? 'var(--accent-2)' : 'var(--fg)'" :font-weight="c.i === pos ? 700 : 400">{{ c.ch }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
