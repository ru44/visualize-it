<script setup lang="ts">
defineProps<{ items: { label: string; value: string; color?: string }[] }>()
</script>

<template>
  <dl class="flex flex-wrap gap-x-8 gap-y-2 border-t px-4 py-3" style="border-color: var(--line)">
    <div v-for="r in items" :key="r.label">
      <dt class="label">{{ r.label }}</dt>
      <dd class="num text-lg" :style="{ color: r.color }">{{ r.value }}</dd>
    </div>
  </dl>
</template>
