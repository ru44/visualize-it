<script setup lang="ts">
import { computed } from 'vue'
import Katex from './Katex.vue'

// Plain text with inline $LaTeX$ segments.
const props = defineProps<{ text: string }>()
const parts = computed(() => props.text.split('$').map((s, i) => ({ s, math: i % 2 === 1 })))
</script>

<template>
  <span><template v-for="(p, i) in parts" :key="i"><Katex v-if="p.math" :tex="p.s" /><template v-else>{{ p.s }}</template></template></span>
</template>
