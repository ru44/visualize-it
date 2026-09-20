<script setup lang="ts">
import { ref, watchEffect } from 'vue'

function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(initialTheme())
watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {}
})
</script>

<template>
  <nav class="flex items-center justify-between border-b px-4 py-3 lg:px-8" style="border-color: var(--line)">
    <RouterLink to="/" class="font-semibold tracking-tight">visualize<span style="color: var(--accent)">·</span>it</RouterLink>
    <div class="flex items-center gap-5 text-sm">
      <RouterLink to="/map" style="color: var(--muted)">Map</RouterLink>
      <button style="color: var(--muted)" @click="theme = theme === 'dark' ? 'light' : 'dark'">
        {{ theme === 'dark' ? 'Light' : 'Dark' }} mode
      </button>
    </div>
  </nav>
  <RouterView />
</template>
