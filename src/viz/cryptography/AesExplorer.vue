<script setup lang="ts">
import { computed, ref } from 'vue'
import { t, type Key } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { aesTrace, MIX, mul, SBOX } from '../../engine/aes'

// Real AES-128, one step at a time. The student types a message and a key (16 bytes each); params pick the
// round (0 = the XOR with the key before the rounds), the step inside the round (1 SubBytes, 2 ShiftRows,
// 3 MixColumns, 4 AddRoundKey) and the byte to trace (0..15 in AES order: down each column, left to right).
// The picture shows the 4×4 state before and after that step, and beside it the step's own tool: the S-box
// table, the row shifts, the MixColumns matrix, or the round key. Clicking a byte selects it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const message = ref<string>(props.options.message ?? 'hello world 2026')
const keyText = ref<string>(props.options.key ?? 'my secret key 16')
// first 16 bytes of the UTF-8 text, a shorter text filled with spaces
const bytes = (s: string) => {
  const b = Array.from(new TextEncoder().encode(s)).slice(0, 16)
  while (b.length < 16) b.push(0x20)
  return b
}
const trace = computed(() => aesTrace(bytes(message.value), bytes(keyText.value)))

const round = computed(() => Math.max(0, Math.min(10, Math.round(props.params.round ?? 1))))
// round 0 has only the key step
const step = computed(() => (round.value === 0 ? 4 : Math.max(1, Math.min(4, Math.round(props.params.step ?? 1)))))
const cell = computed(() => Math.max(0, Math.min(15, Math.round(props.params.cell ?? 0))))
const R = computed(() => trace.value[round.value])
const before = computed(() => [R.value.start, R.value.start, R.value.sub, R.value.shift, R.value.mix][round.value === 0 ? 0 : step.value])
const after = computed(() => [R.value.end, R.value.sub, R.value.shift, R.value.mix, R.value.end][round.value === 0 ? 0 : step.value])
const lastMix = computed(() => round.value === 10 && step.value === 3)

const row = computed(() => cell.value % 4)
const col = computed(() => cell.value >> 2)
// where the selected byte came from in the "before" grid
const sources = computed(() => {
  if (step.value === 2) return [row.value + 4 * ((col.value + row.value) % 4)]
  if (step.value === 3 && !lastMix.value) return [0, 1, 2, 3].map((j) => 4 * col.value + j)
  return [cell.value]
})

const hx = (b: number) => b.toString(16).padStart(2, '0')
const bin = (b: number) => b.toString(2).padStart(8, '0')
const letter = (b: number) => (b === 0x20 ? '␣' : b > 0x20 && b < 0x7f ? String.fromCharCode(b) : '')
const stepName = (s: number) => t(`aes.step${s}` as Key)

// layout
const W = 800
// the S-box table needs the most height, the row shifts a little less
const H = computed(() => (step.value === 1 ? 356 : step.value === 2 ? 312 : 266))
const CELL = 40
const PITCH = 44
const GY = 56
const gx = (g: number) => (g === 0 ? 16 : 252)
const cx = (g: number, i: number) => gx(g) + (i >> 2) * PITCH
const cy = (i: number) => GY + (i % 4) * PITCH
const SX = 440 // S-box table
const SW = 20.5
const SH = 19
const SY = 46
function pick(g: number, i: number) {
  // a byte clicked in the "before" grid during ShiftRows selects the place it lands
  const dest = g === 0 && step.value === 2 ? (i % 4) + 4 * (((i >> 2) - (i % 4) + 4) % 4) : i
  emit('set', 'cell', dest)
}

const mixTerms = computed(() => MIX[row.value].map((k, j) => ({ k, b: before.value[4 * col.value + j], p: mul(before.value[4 * col.value + j], k) })))
const readouts = computed(() => [
  { label: t('aes.roundLabel'), value: String(round.value) },
  { label: t('aes.stepLabel'), value: t(`aes.short${step.value}` as Key) },
  { label: t('aes.byteLabel'), value: `${hx(before.value[sources.value[0]])} → ${hx(after.value[cell.value])}` },
])
const cipher = computed(() => trace.value[10].end.map(hx).join('').replace(/(.{8})/g, '$1 ').trim())
</script>

<template>
  <div>
    <div class="grid gap-3 px-4 pt-4 sm:grid-cols-2">
      <label class="block text-sm">
        <span style="color: var(--muted)">{{ t('aes.message') }}</span>
        <input v-model="message" dir="ltr" maxlength="32" class="num mt-1 w-full rounded-lg border px-3 py-1.5" style="border-color: var(--line); background: var(--sunken)" />
      </label>
      <label class="block text-sm">
        <span style="color: var(--muted)">{{ t('aes.key') }}</span>
        <input v-model="keyText" dir="ltr" maxlength="32" class="num mt-1 w-full rounded-lg border px-3 py-1.5" style="border-color: var(--line); background: var(--sunken)" />
      </label>
      <p class="text-xs sm:col-span-2" style="color: var(--muted)">{{ t('aes.bytesNote') }}</p>
    </div>
    <p class="px-4 pt-3 text-[15px] font-semibold">
      {{ round === 0 ? t('aes.title0') : t('aes.title', { r: round, s: step, name: stepName(step) }) }}
    </p>
    <p class="px-4 text-sm" style="color: var(--muted)">{{ lastMix ? t('aes.what3last') : t(`aes.what${step}` as Key) }} {{ t('aes.click') }}</p>

    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <!-- the state before and after the step -->
      <g v-for="(grid, g) in [before, after]" :key="g">
        <text :x="gx(g) + 86" :y="GY - 12" font-size="13" fill="var(--muted)" text-anchor="middle">{{ g ? t('aes.after') : t('aes.before') }}</text>
        <g v-for="i in 16" :key="i" class="cursor-pointer" @pointerdown="pick(g, i - 1)">
          <rect
            :x="cx(g, i - 1)"
            :y="cy(i - 1)"
            :width="CELL"
            :height="CELL"
            rx="6"
            :fill="(g ? cell === i - 1 : sources.includes(i - 1)) ? 'var(--accent)' : 'var(--sunken)'"
            :stroke="g === 0 && step === 3 && !lastMix && sources[row] === i - 1 ? 'var(--fg)' : 'none'"
            stroke-width="2"
          />
          <text class="num" :x="cx(g, i - 1) + CELL / 2" :y="cy(i - 1) + (round === 0 && g === 0 ? 20 : 25)" font-size="15" text-anchor="middle" :fill="(g ? cell === i - 1 : sources.includes(i - 1)) ? 'var(--bg)' : 'var(--fg)'">{{ hx(grid[i - 1]) }}</text>
          <text v-if="round === 0 && g === 0" class="num" :x="cx(g, i - 1) + CELL / 2" :y="cy(i - 1) + 34" font-size="10" text-anchor="middle" :fill="sources.includes(i - 1) ? 'var(--bg)' : 'var(--muted)'">{{ letter(grid[i - 1]) }}</text>
        </g>
      </g>
      <line x1="198" :y1="GY + 86" x2="240" :y2="GY + 86" stroke="var(--muted)" stroke-width="2" marker-end="url(#aes-arrow)" />
      <text x="218" :y="GY + 76" font-size="16" text-anchor="middle" fill="var(--fg)">{{ ['', 'S', '⇠', '×', '⊕'][step] }}</text>
      <defs>
        <marker id="aes-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)" /></marker>
      </defs>
      <text x="16" :y="GY + 4 * PITCH + 22" font-size="12" fill="var(--muted)">{{ t('aes.order') }}</text>

      <!-- 1 · the S-box: row = first hex digit of the byte, column = second -->
      <g v-if="step === 1">
        <text :x="SX + 178" y="16" font-size="12" fill="var(--muted)" text-anchor="middle">{{ t('aes.sbox') }}</text>
        <rect :x="SX + 14" :y="SY + (before[cell] >> 4) * SH" :width="16 * SW" :height="SH" fill="var(--accent)" fill-opacity="0.15" />
        <rect :x="SX + 14 + (before[cell] & 15) * SW" :y="SY" :width="SW" :height="16 * SH" fill="var(--accent)" fill-opacity="0.15" />
        <text v-for="d in 16" :key="'c' + d" class="num" :x="SX + 14 + (d - 1) * SW + SW / 2" :y="SY - 6" font-size="10" text-anchor="middle" :fill="d - 1 === (before[cell] & 15) ? 'var(--accent)' : 'var(--muted)'" :font-weight="d - 1 === (before[cell] & 15) ? 700 : 400">{{ (d - 1).toString(16) }}</text>
        <g v-for="r in 16" :key="'r' + r">
          <text class="num" :x="SX + 6" :y="SY + (r - 1) * SH + 13" font-size="10" text-anchor="middle" :fill="r - 1 === before[cell] >> 4 ? 'var(--accent)' : 'var(--muted)'" :font-weight="r - 1 === before[cell] >> 4 ? 700 : 400">{{ (r - 1).toString(16) }}</text>
          <template v-for="c in 16" :key="c">
            <rect v-if="(r - 1) * 16 + c - 1 === before[cell]" :x="SX + 14 + (c - 1) * SW" :y="SY + (r - 1) * SH" :width="SW" :height="SH" rx="3" fill="var(--accent)" />
            <text class="num" :x="SX + 14 + (c - 1) * SW + SW / 2" :y="SY + (r - 1) * SH + 13" font-size="9.5" text-anchor="middle" :fill="(r - 1) * 16 + c - 1 === before[cell] ? 'var(--bg)' : 'var(--fg)'" :opacity="(r - 1) * 16 + c - 1 === before[cell] ? 1 : 0.75">{{ hx(SBOX[(r - 1) * 16 + c - 1]) }}</text>
          </template>
        </g>
      </g>

      <!-- 2 · each row slides left by its row number -->
      <g v-if="step === 2">
        <g v-for="r in 4" :key="r">
          <text :x="SX + 4" :y="40 + (r - 1) * 76" font-size="12" fill="var(--muted)">{{ t('aes.rowShift', { r: r - 1 }) }}</text>
          <g v-for="c in 4" :key="c">
            <rect :x="SX + 4 + (c - 1) * 34" :y="48 + (r - 1) * 76" width="30" height="30" rx="5" :fill="sources[0] === r - 1 + 4 * (c - 1) ? 'var(--accent)' : 'var(--sunken)'" />
            <text class="num" :x="SX + 19 + (c - 1) * 34" :y="68 + (r - 1) * 76" font-size="12" text-anchor="middle" :fill="sources[0] === r - 1 + 4 * (c - 1) ? 'var(--bg)' : 'var(--fg)'">{{ hx(before[r - 1 + 4 * (c - 1)]) }}</text>
            <rect :x="SX + 210 + (c - 1) * 34" :y="48 + (r - 1) * 76" width="30" height="30" rx="5" :fill="cell === r - 1 + 4 * (c - 1) ? 'var(--accent)' : 'var(--sunken)'" />
            <text class="num" :x="SX + 225 + (c - 1) * 34" :y="68 + (r - 1) * 76" font-size="12" text-anchor="middle" :fill="cell === r - 1 + 4 * (c - 1) ? 'var(--bg)' : 'var(--fg)'">{{ hx(after[r - 1 + 4 * (c - 1)]) }}</text>
          </g>
          <line :x1="SX + 148" :y1="63 + (r - 1) * 76" :x2="SX + 200" :y2="63 + (r - 1) * 76" stroke="var(--muted)" stroke-width="2" marker-end="url(#aes-arrow)" />
          <text class="num" :x="SX + 174" :y="56 + (r - 1) * 76" font-size="12" fill="var(--muted)" text-anchor="middle">{{ r === 1 ? '·' : `← ${r - 1}` }}</text>
        </g>
      </g>

      <!-- 3 · the fixed matrix times the column = the new column -->
      <g v-if="step === 3" :opacity="lastMix ? 0.3 : 1">
        <text :x="SX + 66" y="40" font-size="12" fill="var(--muted)" text-anchor="middle">{{ t('aes.matrix') }}</text>
        <text :x="SX + 214" y="40" font-size="12" fill="var(--muted)" text-anchor="middle">{{ t('aes.column', { c: col }) }}</text>
        <g v-for="r in 4" :key="r">
          <rect v-if="r - 1 === row && !lastMix" :x="SX" :y="50 + (r - 1) * 46" width="132" height="38" rx="6" fill="var(--accent)" fill-opacity="0.18" />
          <text v-for="j in 4" :key="j" class="num" :x="SX + 18 + (j - 1) * 32" :y="75 + (r - 1) * 46" font-size="17" text-anchor="middle" fill="var(--fg)">{{ MIX[r - 1][j - 1] }}</text>
          <rect :x="SX + 194" :y="50 + (r - 1) * 46" width="40" height="38" rx="6" :fill="!lastMix ? 'var(--accent)' : 'var(--sunken)'" :fill-opacity="!lastMix ? 0.35 : 1" />
          <text class="num" :x="SX + 214" :y="75 + (r - 1) * 46" font-size="15" text-anchor="middle" fill="var(--fg)">{{ hx(before[4 * col + r - 1]) }}</text>
          <rect :x="SX + 284" :y="50 + (r - 1) * 46" width="40" height="38" rx="6" :fill="r - 1 === row && !lastMix ? 'var(--accent)' : 'var(--sunken)'" />
          <text class="num" :x="SX + 304" :y="75 + (r - 1) * 46" font-size="15" text-anchor="middle" :fill="r - 1 === row && !lastMix ? 'var(--bg)' : 'var(--fg)'">{{ hx(after[4 * col + r - 1]) }}</text>
        </g>
        <path :d="`M${SX - 2} 48 h-6 v176 h6 M${SX + 134} 48 h6 v176 h-6`" fill="none" stroke="var(--muted)" stroke-width="2" />
        <text :x="SX + 164" y="142" font-size="20" text-anchor="middle" fill="var(--fg)">×</text>
        <text :x="SX + 259" y="142" font-size="20" text-anchor="middle" fill="var(--fg)">=</text>
      </g>

      <!-- 4 · this round's key, XORed byte by byte -->
      <g v-if="step === 4">
        <text :x="SX + 86 + 60" :y="GY - 12" font-size="13" fill="var(--muted)" text-anchor="middle">{{ t('aes.roundKey', { r: round }) }}</text>
        <g v-for="i in 16" :key="i" class="cursor-pointer" @pointerdown="emit('set', 'cell', i - 1)">
          <rect :x="SX + 60 + ((i - 1) >> 2) * PITCH" :y="cy(i - 1)" :width="CELL" :height="CELL" rx="6" :fill="cell === i - 1 ? 'var(--accent-2)' : 'var(--sunken)'" />
          <text class="num" :x="SX + 80 + ((i - 1) >> 2) * PITCH" :y="cy(i - 1) + 25" font-size="15" text-anchor="middle" :fill="cell === i - 1 ? 'var(--bg)' : 'var(--fg)'">{{ hx(R.key[i - 1]) }}</text>
        </g>
        <text :x="SX + 30" :y="GY + 92" font-size="24" text-anchor="middle" fill="var(--fg)">⊕</text>
      </g>
    </svg>

    <!-- how the selected byte was made -->
    <div class="mx-4 mb-3 rounded-lg px-4 py-3 text-sm" style="background: var(--sunken)">
      <template v-if="step === 1">{{ t('aes.subCalc', { a: hx(before[cell]), row: (before[cell] >> 4).toString(16), col: (before[cell] & 15).toString(16), b: hx(after[cell]) }) }}</template>
      <template v-else-if="step === 2">{{ row === 0 ? t('aes.shift0') : t('aes.shiftCalc', { r: row, from: (col + row) % 4, to: col }) }}</template>
      <template v-else-if="step === 3">
        <template v-if="lastMix">{{ t('aes.what3last') }}</template>
        <template v-else>
          <div dir="ltr" class="num text-left text-[15px]">
            {{ mixTerms.map((m) => `${m.k}·${hx(m.b)}`).join(' ⊕ ') }}<br />= {{ mixTerms.map((m) => hx(m.p)).join(' ⊕ ') }} = <b>{{ hx(after[cell]) }}</b>
          </div>
          <p class="mt-1" style="color: var(--muted)">{{ t('aes.mixRule') }}</p>
        </template>
      </template>
      <template v-else>
        <pre dir="ltr" class="num text-left text-[15px]">  {{ bin(before[cell]) }}  {{ hx(before[cell]) }}
⊕ {{ bin(R.key[cell]) }}  {{ hx(R.key[cell]) }}  ({{ t('aes.keyWord') }})
= {{ bin(after[cell]) }}  {{ hx(after[cell]) }}</pre>
        <p class="mt-1" style="color: var(--muted)">{{ t('aes.xorRule') }}</p>
      </template>
    </div>
    <p class="flex flex-wrap gap-x-2 px-4 pb-3 text-sm">
      <bdi style="color: var(--muted)">{{ t('aes.cipher') }}</bdi>
      <span dir="ltr" class="num">{{ cipher }}</span>
    </p>
    <Readouts :items="readouts" />
  </div>
</template>
