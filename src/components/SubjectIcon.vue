<script setup lang="ts">
import type { Subject } from '../lessons/types'

// One simple line drawing per subject — recognisable at a glance, no text needed.
defineProps<{ subject: Subject }>()
const paths: Record<Subject, string> = {
  algebra: 'M5 7h6M8 4v6M13 17l6-6M13 11l6 6M5 16h6',
  functions: 'M3 19c4 0 5-14 9-14s5 14 9 14',
  calculus: 'M4 20V9c0-3 2-5 5-5M4 20h16M9 20v-7M14 20V9M19 20V6',
  geometry: 'M4 19h16L12 5z M12 19v-4h-3',
  trigonometry: 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12l5.5-5.5M12 12h8',
  physics: 'M3 18h18M6 18v-6h6v6M12 15h7M16 12l3 3-3 3',
  waves: 'M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0 2 3 2 3',
  electricity: 'M13 3L5 14h6l-1 7 8-11h-6z',
  electromagnetism: 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8',
  aerodynamics: 'M3 14c3-5 10-6 18-2-6 1-12 3-18 2zM3 8h8M3 19h10',
  thermodynamics: 'M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0zM12 9v8',
  statistics: 'M4 20h16M6 16v-5M10 16V8M14 16v-3M18 16V5',
  chemistry: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9',
}
</script>

<template>
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[subject]" />
  </svg>
</template>
