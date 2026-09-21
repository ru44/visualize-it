<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

const props = defineProps<{ tex: string; display?: boolean }>()
const html = computed(() => katex.renderToString(props.tex, { displayMode: props.display, throwOnError: false }))
</script>

<template>
  <span dir="ltr" class="inline-block max-w-full" v-html="html" />
</template>
