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
  <div class="flex min-h-screen flex-col">
    <nav class="sticky top-0 z-20 border-b backdrop-blur-md" style="border-color: var(--line); background: color-mix(in srgb, var(--bg) 82%, transparent)">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold tracking-tight">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="21" height="21" rx="6" stroke="var(--line)" stroke-width="1.5" fill="var(--panel)" />
            <path d="M5 17c3-1 4-10 7-10s3 8 7 9" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
            <circle cx="12" cy="7.4" r="1.8" fill="var(--accent-2)" />
          </svg>
          visualize·it
        </RouterLink>
        <div class="flex items-center gap-1 text-sm">
          <RouterLink to="/#concepts" class="rounded-lg px-3 py-1.5 hover:bg-[var(--sunken)]" style="color: var(--muted)">Concepts</RouterLink>
          <RouterLink to="/map" class="rounded-lg px-3 py-1.5 hover:bg-[var(--sunken)]" style="color: var(--muted)" active-class="!text-[var(--fg)]">Map</RouterLink>
          <a href="./legacy/index.html" class="hidden rounded-lg px-3 py-1.5 hover:bg-[var(--sunken)] sm:block" style="color: var(--muted)">Classic sims</a>
          <button
            class="ml-1 grid h-9 w-9 place-items-center rounded-lg hover:bg-[var(--sunken)]"
            :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
            @click="theme = theme === 'dark' ? 'light' : 'dark'"
          >
            <svg v-if="theme === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <div class="flex-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>

    <footer class="mt-16 border-t" style="border-color: var(--line)">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm lg:px-8" style="color: var(--muted)">
        <p>Visualizations are conceptual models — built to make the idea visible, not to replace the physics.</p>
        <p class="flex gap-4">
          <RouterLink to="/map" class="hover:underline">Learning map</RouterLink>
          <a href="./legacy/index.html" class="hover:underline">Classic simulations</a>
          <a href="https://github.com/ru44/visualize-it" class="hover:underline">GitHub</a>
        </p>
      </div>
    </footer>
  </div>
</template>
