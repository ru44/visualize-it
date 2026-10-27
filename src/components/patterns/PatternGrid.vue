<script setup lang="ts">
import type { Cell } from '../../patterns/engine'
import PatternCell from './PatternCell.vue'

// The 3×3 puzzle. Always left-to-right, like the figures everywhere on the site: the rules run
// along the rows in that direction. `gap` fills the missing picture (review, worked examples).
defineProps<{ cells: Cell[]; gap?: Cell | null; highlight?: number | null; label?: string }>()
</script>

<template>
  <div dir="ltr" role="img" :aria-label="label" class="grid grid-cols-3 gap-px overflow-hidden rounded-xl border" style="border-color: var(--line); background: color-mix(in srgb, var(--ink) 16%, var(--paper))">
    <div
      v-for="(c, i) in cells"
      :key="i"
      class="aspect-square p-[7%] transition-colors"
      :style="{ background: highlight === Math.floor(i / 3) ? 'color-mix(in srgb, var(--accent) 16%, var(--paper))' : 'var(--paper)' }"
    >
      <PatternCell v-if="i < 8" :cell="c" />
      <div v-else-if="gap" class="h-full w-full rounded-md" style="outline: 2px solid var(--pos); outline-offset: 2px"><PatternCell :cell="gap" /></div>
      <div v-else class="grid h-full w-full place-items-center rounded-md border-2 border-dashed text-3xl font-semibold" style="border-color: color-mix(in srgb, var(--ink) 35%, var(--paper)); color: color-mix(in srgb, var(--ink) 55%, var(--paper))">?</div>
    </div>
  </div>
</template>
