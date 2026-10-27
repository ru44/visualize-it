<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Item } from '../../patterns/engine'
import { explainItem, rulesIn } from '../../patterns/explain'
import { t } from '../../i18n'
import PatternGrid from './PatternGrid.vue'

// A worked example, one row at a time: read the top row, confirm on the middle one, build the gap.
const props = defineProps<{ item: Item }>()
const step = ref(1)
const reasons = computed(() => explainItem(props.item))
</script>

<template>
  <div class="grid items-start gap-5 md:grid-cols-[minmax(0,15rem)_1fr]">
    <PatternGrid :cells="item.cells" :highlight="step - 1" :gap="step === 3 ? item.options[item.answer] : null" class="mx-auto w-full max-w-[15rem]" />
    <div>
      <ol class="space-y-3 text-[15px] leading-relaxed">
        <li class="flex gap-3">
          <span class="num grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs" style="background: var(--accent-soft); color: var(--accent)">1</span>
          <span>{{ t('pat.lesson.step1') }}</span>
        </li>
        <li v-if="step >= 2" class="flex gap-3">
          <span class="num grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs" style="background: var(--accent-soft); color: var(--accent)">2</span>
          <span>{{ t('pat.lesson.step2', { list: rulesIn(item) }) }}</span>
        </li>
        <li v-if="step >= 3" class="flex gap-3">
          <span class="num grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs" style="background: var(--pos); color: #fff">3</span>
          <span>
            {{ t('pat.lesson.step3') }}
            <span v-for="(r, i) in reasons" :key="i" class="mt-1 block" style="color: var(--muted)">{{ r }}</span>
          </span>
        </li>
      </ol>
      <button v-if="step < 3" class="btn-primary mt-4 px-4 py-2 text-sm" @click="step++">{{ t('pat.lesson.next') }}</button>
      <button v-else class="mt-4 rounded-[10px] border px-4 py-2 text-sm hover:border-[var(--accent)]" style="border-color: var(--line)" @click="step = 1">{{ t('pat.lesson.again') }}</button>
    </div>
  </div>
</template>
