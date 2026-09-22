<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Caesar cipher: an outer plain alphabet and an inner alphabet turned by `shift`. options.text is the sample.
// param shift (0..25). Drag around the wheel to turn it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// Vigenère: options.keywords is a list of keywords; param kw picks one and param pos the letter being encrypted.
const keywords = computed<string[] | undefined>(() => props.options.keywords)
const keyword = computed(() => (keywords.value ? keywords.value[Math.max(0, Math.min(keywords.value.length - 1, Math.round(props.params.kw ?? 0)))] : ''))
const text = computed<string>(() => props.options.text ?? 'MEET ME AT NOON')
const letterIdx = (i: number) => text.value.slice(0, i).replace(/[^A-Za-z]/g, '').length
const shiftAt = (i: number) => (keyword.value ? A.indexOf(keyword.value[letterIdx(i) % keyword.value.length]) : ((Math.round(props.params.shift ?? 3) % 26) + 26) % 26)
const cur = computed(() => Math.max(0, Math.min(text.value.length - 1, Math.round(props.params.pos ?? 0))))
const shift = computed(() => shiftAt(keyword.value ? cur.value : 0))
const cipher = computed(() => text.value.toUpperCase().split('').map((c, i) => (/[A-Z]/.test(c) ? A[(A.indexOf(c) + shiftAt(i)) % 26] : c)).join(''))
const C = { x: 240, y: 240 }
const pos = (i: number, r: number) => ({ x: C.x + r * Math.sin((i / 26) * 2 * Math.PI), y: C.y - r * Math.cos((i / 26) * 2 * Math.PI) })
const readouts = computed(() => [
  { label: t('cipher.shift'), value: String(shift.value), color: 'var(--accent-2)' },
  { label: t('cipher.plain'), value: text.value },
  { label: t('cipher.cipher'), value: cipher.value, color: 'var(--accent)' },
  keyword.value ? { label: t('cipher.keyword'), value: keyword.value, color: 'var(--accent-2)' } : { label: t('cipher.keys'), value: '26' },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - C.x
  const y = ((e.clientY - b.top) / b.height) * H - C.y
  const ang = Math.atan2(x, -y)
  emit('set', 'shift', Math.round((((ang / (2 * Math.PI)) * 26) % 26 + 26) % 26))
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('cipher.hint') }}</text>
      <circle :cx="C.x" :cy="C.y" r="200" fill="var(--sunken)" stroke="var(--line)" />
      <circle :cx="C.x" :cy="C.y" r="150" fill="var(--panel)" stroke="var(--line)" />
      <g v-for="i in 26" :key="i" class="num" font-size="14">
        <text :x="pos(i - 1, 178).x" :y="pos(i - 1, 178).y + 5" text-anchor="middle" fill="var(--fg)">{{ A[i - 1] }}</text>
        <text :x="pos(i - 1, 128).x" :y="pos(i - 1, 128).y + 5" text-anchor="middle" fill="var(--accent-2)" font-weight="600">{{ A[(i - 1 + shift) % 26] }}</text>
      </g>
      <line :x1="C.x" :y1="C.y - 100" :x2="C.x" :y2="C.y - 205" stroke="var(--accent)" stroke-width="2" />
      <text class="num" :x="C.x" :y="C.y + 6" text-anchor="middle" font-size="26" fill="var(--accent-2)">+{{ shift }}</text>
      <!-- letter by letter -->
      <g class="num" font-size="18">
        <text x="500" y="150" fill="var(--muted)" font-size="12">{{ t('cipher.plain') }}</text>
        <text v-for="(ch, i) in text.split('')" :key="'p' + i" :x="500 + i * 19" y="180" text-anchor="middle" :fill="keyword && i === cur ? 'var(--accent-2)' : 'var(--fg)'" :font-weight="keyword && i === cur ? 700 : 400">{{ ch }}</text>
        <template v-if="keyword"><text v-for="(ch, i) in text.split('')" :key="'k' + i" :x="500 + i * 19" y="212" text-anchor="middle" font-size="12" fill="var(--muted)">{{ /[A-Za-z]/.test(ch) ? '+' + shiftAt(i) : '' }}</text></template>
        <g v-if="!keyword"><g v-for="(ch, i) in text.split('')" :key="'a' + i"><line v-if="ch !== ' '" :x1="500 + i * 19" y1="192" :x2="500 + i * 19" y2="224" stroke="var(--line)" /></g></g>
        <text x="500" y="250" fill="var(--muted)" font-size="12">{{ t('cipher.cipher') }}</text>
        <text v-for="(ch, i) in cipher.split('')" :key="'c' + i" :x="500 + i * 19" y="280" text-anchor="middle" :fill="keyword && i === cur ? 'var(--accent-2)' : 'var(--accent)'" font-weight="600">{{ ch }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
