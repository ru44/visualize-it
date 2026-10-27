<script setup lang="ts">
import { computed } from 'vue'
import type { Cell } from '../../patterns/engine'
import { draw } from '../../patterns/draw'

const props = defineProps<{ cell: Cell }>()
const prims = computed(() => draw(props.cell))
</script>

<template>
  <svg viewBox="0 0 100 100" class="block h-full w-full" aria-hidden="true">
    <template v-for="(p, i) in prims" :key="i">
      <path v-if="p.d" :d="p.d" :style="{ fill: p.fill, stroke: 'var(--ink)', strokeWidth: p.sw }" stroke-linejoin="round" stroke-linecap="round" />
      <circle v-else :cx="p.cx" :cy="p.cy" :r="p.r" :style="{ fill: p.fill, stroke: 'var(--ink)', strokeWidth: p.sw }" />
    </template>
  </svg>
</template>
