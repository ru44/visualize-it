<script setup lang="ts">
import type { Cell } from '../../patterns/engine'
import { t } from '../../i18n'
import PatternCell from './PatternCell.vue'

// The eight numbered answers. With `answer` set, the right one is marked and so is a wrong pick.
const props = defineProps<{ options: Cell[]; selected?: number | null; answer?: number | null; wrong?: number[]; disabled?: boolean }>()
const emit = defineEmits<{ pick: [i: number] }>()

function ring(i: number) {
  if (props.answer === i) return 'var(--pos)'
  if (props.wrong?.includes(i) || (props.answer != null && props.selected === i)) return 'var(--neg)'
  if (props.selected === i) return 'var(--accent)'
  return 'transparent'
}
</script>

<template>
  <div dir="ltr" class="grid grid-cols-4 gap-2 sm:gap-3">
    <button
      v-for="(o, i) in options"
      :key="i"
      type="button"
      class="group relative rounded-xl border p-1.5 transition-colors disabled:cursor-default"
      :class="disabled ? '' : 'hover:border-[var(--accent)]'"
      :style="{ borderColor: selected === i || answer === i ? ring(i) : 'var(--line)', boxShadow: `0 0 0 2px ${ring(i)}`, background: 'var(--paper)' }"
      :aria-label="t('pat.option', { n: i + 1 })"
      :aria-pressed="selected === i"
      :disabled="disabled"
      @click="emit('pick', i)"
    >
      <span class="block aspect-square p-[6%]"><PatternCell :cell="o" /></span>
      <span class="num absolute top-1 left-1.5 text-[11px] font-medium" style="color: color-mix(in srgb, var(--ink) 55%, var(--paper))">{{ i + 1 }}</span>
      <span v-if="answer === i" class="absolute top-0.5 right-1 text-sm font-bold" style="color: var(--pos)">✓</span>
      <span v-else-if="wrong?.includes(i) || (answer != null && selected === i)" class="absolute top-0.5 right-1 text-sm font-bold" style="color: var(--neg)">✗</span>
    </button>
  </div>
</template>
