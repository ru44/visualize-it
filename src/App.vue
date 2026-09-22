<script setup lang="ts">
import { t, locale } from './i18n'
import { useSettings } from './stores/settings'

const settings = useSettings()
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
          <span dir="ltr">visualize·it</span>
        </RouterLink>
        <div class="flex items-center gap-0.5 text-sm sm:gap-1">
          <RouterLink to="/#subjects" class="rounded-lg px-2.5 py-1.5 hover:bg-[var(--sunken)] sm:px-3" style="color: var(--muted)">{{ t('nav.learn') }}</RouterLink>
          <RouterLink to="/graph" class="rounded-lg px-2.5 py-1.5 hover:bg-[var(--sunken)] sm:px-3" style="color: var(--muted)" active-class="!text-[var(--fg)]">{{ t('nav.graph') }}</RouterLink>
          <RouterLink to="/classic" class="rounded-lg px-2.5 py-1.5 hover:bg-[var(--sunken)] sm:px-3" style="color: var(--muted)" active-class="!text-[var(--fg)]">{{ t('nav.sims') }}</RouterLink>
          <RouterLink to="/notation" class="hidden rounded-lg px-3 py-1.5 hover:bg-[var(--sunken)] sm:block" style="color: var(--muted)" active-class="!text-[var(--fg)]">{{ t('nav.notation') }}</RouterLink>
          <RouterLink to="/map" class="hidden rounded-lg px-3 py-1.5 hover:bg-[var(--sunken)] md:block" style="color: var(--muted)" active-class="!text-[var(--fg)]">{{ t('nav.map') }}</RouterLink>
          <button class="rounded-lg border px-2.5 py-1 text-sm hover:border-[var(--accent)]" style="border-color: var(--line)" @click="settings.nextLocale()">{{ t('nav.language') }}</button>
          <button
            class="grid h-9 w-9 place-items-center rounded-lg hover:bg-[var(--sunken)]"
            :aria-label="t('nav.theme')"
            @click="settings.toggleTheme()"
          >
            <svg v-if="settings.theme === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
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
          <component :is="Component" :key="route.path + locale" />
        </Transition>
      </RouterView>
    </div>

    <footer class="mt-16 border-t" style="border-color: var(--line)">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm lg:px-8" style="color: var(--muted)">
        <p>{{ t('footer.note') }}</p>
        <p class="flex gap-4">
          <RouterLink to="/notation" class="hover:underline">{{ t('nav.notation') }}</RouterLink>
          <RouterLink to="/map" class="hover:underline">{{ t('footer.map') }}</RouterLink>
          <RouterLink to="/classic" class="hover:underline">{{ t('classic.title') }}</RouterLink>
          <a href="https://github.com/ru44/visualize-it" class="hover:underline">GitHub</a>
        </p>
      </div>
    </footer>
  </div>
</template>
