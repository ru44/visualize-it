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
  'computer-science': 'M4 5h16v11H4zM8 20h8M12 16v4M8 9l2 2-2 2M12 13h4',
  biology: 'M8 3c0 6 8 6 8 12M16 3c0 6-8 6-8 12M8 15v6M16 15v6M9 7h6M9 11h6',
  'earth-space': 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M3 10c4 1 6 3 9 2s5-3 9-1M4 16c3-1 6 0 8 1s5 0 8-2',
  economics: 'M4 19h16M4 19V5M7 15l4-5 3 3 6-7M14 6h6v6',
  engineering: 'M2 12h3l2-6 3 12 3-9 2 5 2-2h5',
  discrete: 'M5 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7 7l4 9M17 7l-4 9M5 6h14',
  ai: 'M4 6h4M4 12h4M4 18h4M12 4v4M12 10v4M12 16v4M16 8h4M16 16h4M8 6l4 2M8 12l4 2M8 18l4-2M12 8l4 0M12 14l4 2M12 20l4-4',
  numbers: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
  data: 'M12 5m-8 0a8 3 0 1 0 16 0a8 3 0 1 0-16 0M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  quantum: 'M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M12 12m-9 0a9 3.5 0 1 0 18 0a9 3.5 0 1 0-18 0M12 12m-9 0a9 3.5 60 1 0 18 0a9 3.5 60 1 0-18 0',
  relativity: 'M3 8c3 0 5 6 9 6s6-6 9-6M3 13c3 0 5 5 9 5s6-5 9-5M12 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  cryptography: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',
  cosmos: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M4 18c2-6 14-10 16-12M18 4l.5 1.5L20 6l-1.5.5L18 8l-.5-1.5L16 6l1.5-.5z',
  complexity: 'M5 5h4v4H5zM15 5h4v4h-4zM10 10h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4z',
  chemistry: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9',
}
</script>

<template>
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[subject]" />
  </svg>
</template>
