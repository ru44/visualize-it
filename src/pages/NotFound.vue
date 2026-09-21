<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <main class="mx-auto max-w-xl px-4 py-24 text-center">
    <p class="num text-5xl" style="color: var(--muted)">404</p>
    <h1 class="mt-4 text-xl font-semibold">{{ t('nf.title') }}</h1>
    <p class="mt-2" style="color: var(--muted)">{{ t('nf.text') }}</p>
    <RouterLink to="/" class="btn-primary mt-6 inline-block px-5 py-2.5 text-sm">{{ t('lesson.backHome') }}</RouterLink>
  </main>
</template>
