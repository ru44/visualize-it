<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Item } from '../../patterns/engine'
import { explainItem, explainPick } from '../../patterns/explain'
import { t } from '../../i18n'
import PatternGrid from './PatternGrid.vue'
import PatternOptions from './PatternOptions.vue'

// A practice puzzle with instant feedback: wrong picks are marked and can be retried; "show why"
// reveals the answer, the rules, and what the last wrong pick broke. Nothing is recorded; the
// parent hears once per puzzle whether it was solved on the first try.
const props = defineProps<{ item: Item }>()
const emit = defineEmits<{ result: [firstTry: boolean] }>()
const wrong = ref<number[]>([])
const solved = ref(false)
const shown = ref(false)
const last = ref<number | null>(null)

function pick(i: number) {
  if (solved.value) return
  last.value = i
  if (i === props.item.answer) {
    solved.value = true
    emit('result', wrong.value.length === 0)
  } else if (!wrong.value.includes(i)) wrong.value.push(i)
}
function why() {
  if (!solved.value) emit('result', false)
  shown.value = true
}
const reasons = computed(() => explainItem(props.item))
const slips = computed(() => (last.value !== null && last.value !== props.item.answer ? explainPick(props.item, last.value) : []))
</script>

<template>
  <div class="grid items-start gap-5 md:grid-cols-[minmax(0,15rem)_1fr]">
    <PatternGrid :cells="item.cells" :gap="solved || shown ? item.options[item.answer] : null" class="mx-auto w-full max-w-[15rem]" />
    <div>
      <PatternOptions :options="item.options" :selected="last" :answer="solved || shown ? item.answer : null" :wrong="wrong" :disabled="solved || shown" @pick="pick" />
      <p v-if="solved" class="mt-3 font-medium" style="color: var(--pos)">{{ t('pat.lesson.right') }}</p>
      <p v-else-if="wrong.length && !shown" class="mt-3 text-sm" style="color: var(--muted)">{{ t('pat.lesson.wrong') }}</p>
      <button v-if="!shown && (wrong.length || solved)" class="mt-2 text-sm font-medium underline" style="color: var(--accent)" @click="why">{{ t('pat.lesson.why') }}</button>
      <div v-if="shown" class="mt-3 space-y-1.5 text-[15px] leading-relaxed">
        <p v-for="(s, i) in slips" :key="'s' + i" style="color: var(--neg)">{{ s }}</p>
        <p v-for="(r, i) in reasons" :key="'r' + i">{{ r }}</p>
      </div>
    </div>
  </div>
</template>
