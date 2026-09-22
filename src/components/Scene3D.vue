<script setup lang="ts">
import { computed } from 'vue'
import { viz3dRegistry } from '../viz3d/registry'
import { webglAvailable } from '../viz3d/useThree'
import { t } from '../i18n'
import { modelInfo } from '../viz3d/models'

// Hosts a 3D scene in a fixed-aspect box with a fallback when WebGL is missing.
const props = defineProps<{ type: string; options: Record<string, any>; params: Record<string, number> }>()
defineEmits<{ set: [name: string, value: number] }>()
const comp = computed(() => viz3dRegistry[props.type])
const ok = webglAvailable()
// Credits for the models this scene may load (CC-BY requires attribution).
const credits = computed(() => ((props.options.models as string[] | undefined) ?? []).map((n) => modelInfo[n]).filter(Boolean))
</script>

<template>
  <div class="relative aspect-[5/3] w-full">
    <component :is="comp" v-if="comp && ok" :params="params" :options="options" @set="(n: string, v: number) => $emit('set', n, v)" />
    <p v-else class="grid h-full place-items-center p-6 text-center text-sm" style="color: var(--muted)">{{ ok ? t('three.missing') : t('three.noWebgl') }}</p>
    <p class="num pointer-events-none absolute bottom-2 start-3 text-[11px]" style="color: var(--muted)">{{ t('three.hint') }}</p>
  </div>
  <p v-if="credits.length" class="border-t px-4 py-1.5 text-[11px]" style="border-color: var(--line); color: var(--muted)">
    {{ t('three.models') }}
    <template v-for="(c, i) in credits" :key="c.title"><span v-if="i">, </span>“{{ c.title }}” — <a :href="c.authorUrl || c.source" target="_blank" rel="noopener" class="underline">{{ c.author }}</a> ({{ c.license }})</template>
  </p>
</template>
