<script setup lang="ts">
import { ref, watch } from 'vue'
import { t } from '../i18n'
import MathText from './MathText.vue'

// Real-life situations as buttons: clicking loads their numbers into the sliders.
const props = defineProps<{ presets: { label: string; text: string; params: Record<string, number> }[]; lessonId: string }>()
const emit = defineEmits<{ load: [params: Record<string, number>] }>()
const active = ref(-1)
watch(() => props.lessonId, () => (active.value = -1))
function choose(i: number) {
  active.value = i
  emit('load', props.presets[i].params)
}
</script>

<template>
  <div v-if="presets.length">
    <p class="label mb-2">{{ t('real.title') }}</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(p, i) in presets"
        :key="i"
        class="rounded-full border px-3 py-1.5 text-sm transition-colors"
        :style="active === i ? 'background: var(--accent); border-color: var(--accent); color: #fff' : 'border-color: var(--line)'"
        @click="choose(i)"
      >
        {{ p.label }}
      </button>
    </div>
    <p v-if="active >= 0" class="mt-2 text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="presets[active].text" /></p>
  </div>
</template>
