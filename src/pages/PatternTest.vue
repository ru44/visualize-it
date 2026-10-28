<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t, isRtl, type Key } from '../i18n'
import { testItems, practiceItems, PER_SET, FORMS } from '../patterns/items'
import { FAMILIES, roughIq } from '../patterns/engine'
import { explainItem, explainPick, ruleName } from '../patterns/explain'
import { usePatterns } from '../stores/patterns'
import PatternGrid from '../components/patterns/PatternGrid.vue'
import PatternOptions from '../components/patterns/PatternOptions.vue'
import PatternPuzzle from '../components/patterns/PatternPuzzle.vue'
import PatternCell from '../components/patterns/PatternCell.vue'

// One page, three moments: the introduction, the sixty puzzles, the result. The store decides
// which one shows, so a reload lands back where the student was.
const store = usePatterns()
const total = testItems.length
const sets = total / PER_SET
const view = computed(() => (store.finished ? 'results' : store.started ? 'test' : 'intro'))
const sample = practiceItems.distribution[0]
const erased = ref(false)
const top = () => scrollTo({ top: 0 })

// Retakes use another version: the same rules and difficulty, puzzles the student has not seen.
const version = ref(0)
const nextVersion = computed(() => (store.form + 1) % FORMS)
function begin(v = version.value) {
  store.start(v)
  erased.value = false
  top()
}

// ---- the test ----------------------------------------------------------------------------------
const item = computed(() => store.items[store.current])
const setOf = (i: number) => Math.floor(i / PER_SET)
const now = ref(Date.now())
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const elapsed = computed(() => clock(Math.max(0, Math.floor((now.value - (store.startedAt ?? now.value)) / 1000))))
const confirming = ref(false)
const eraseArmed = ref(false)
const unanswered = computed(() => total - store.answered)

let advance = 0
function go(i: number) {
  clearTimeout(advance)
  confirming.value = false
  store.current = Math.min(Math.max(i, 0), total - 1)
}
function pick(o: number) {
  const i = store.current
  const first = store.answers[i] === null
  store.choose(i, o)
  clearTimeout(advance)
  // A first answer moves on by itself; changing an answer stays put.
  if (first && i < total - 1) advance = window.setTimeout(() => store.current === i && go(i + 1), 320)
}
function finish() {
  if (unanswered.value && !confirming.value) return void (confirming.value = true)
  confirming.value = false
  store.finish()
  top()
}
function keepGoing() {
  const next = store.answers.findIndex((a) => a === null)
  go(next < 0 ? store.current : next)
}
function startOver() {
  if (!eraseArmed.value) return void (eraseArmed.value = true)
  eraseArmed.value = false
  store.erase()
  top()
}
function onKey(e: KeyboardEvent) {
  if (view.value !== 'test' || e.metaKey || e.ctrlKey || e.altKey) return
  const el = e.target as HTMLElement | null
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
  if (/^[1-8]$/.test(e.key)) pick(Number(e.key) - 1)
  else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') go(store.current + ((e.key === 'ArrowRight') !== isRtl() ? 1 : -1))
}
let tick = 0
onMounted(() => {
  tick = window.setInterval(() => (now.value = Date.now()), 1000)
  addEventListener('keydown', onKey)
})
onUnmounted(() => {
  clearInterval(tick)
  clearTimeout(advance)
  removeEventListener('keydown', onKey)
})

// ---- the result --------------------------------------------------------------------------------
const score = computed(() => store.score)
const onlyWrong = ref(true)
const review = computed(() =>
  store.items.map((it, i) => ({ it, pick: store.answers[i], ok: store.answers[i] === it.answer })).filter((r) => !onlyWrong.value || !r.ok),
)
const pct = (right: number, all: number) => (all ? (100 * right) / all : 0)
const iq = computed(() => roughIq(score.value?.right ?? 0))
// The next target: a few more right answers, and the number they would bring.
const goal = computed(() => {
  const n = Math.min(4, total - (score.value?.right ?? total))
  return n > 0 ? { n, iq: roughIq((score.value?.right ?? 0) + n).iq } : null
})
function erase() {
  store.erase()
  erased.value = true
  top()
}
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-10 lg:px-8">
    <!-- ---- introduction ---- -->
    <template v-if="view === 'intro'">
      <p class="label mb-3" style="color: var(--accent)">{{ t('pat.kicker') }}</p>
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('pat.title') }}</h1>
      <p class="mt-3 max-w-2xl text-lg leading-relaxed" style="color: var(--muted)">{{ t('pat.lead') }}</p>
      <p v-if="erased" class="mt-4 rounded-lg px-3 py-2 text-sm" style="background: var(--accent-soft)">{{ t('pat.res.erased') }}</p>

      <div class="mt-7 grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <ul class="space-y-3">
          <li v-for="k in ['items', 'time', 'skip', 'after']" :key="k" class="flex gap-3 leading-relaxed">
            <svg class="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--pos)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            <span>{{ t(`pat.fact.${k}` as Key) }}</span>
          </li>
        </ul>
        <section class="surface flex gap-4 self-start p-5">
          <svg class="mt-0.5 shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          </svg>
          <div>
            <h2 class="font-semibold">{{ t('pat.private.t') }}</h2>
            <p class="mt-1 text-sm leading-relaxed" style="color: var(--muted)">{{ t('pat.private.d') }}</p>
          </div>
        </section>
      </div>

      <div class="mt-7">
        <div class="flex flex-wrap items-center gap-3">
          <span class="label">{{ t('pat.form.t') }}</span>
          <div class="flex rounded-lg border p-0.5 text-sm" style="border-color: var(--line)" role="radiogroup" :aria-label="t('pat.form.t')">
            <button
              v-for="v in FORMS"
              :key="v"
              role="radio"
              :aria-checked="version === v - 1"
              class="num rounded-md px-3 py-1"
              :style="version === v - 1 ? 'background: var(--sunken); color: var(--fg)' : 'color: var(--muted)'"
              @click="version = v - 1"
            >
              {{ v }}
            </button>
          </div>
        </div>
        <p class="mt-2 max-w-xl text-sm leading-relaxed" style="color: var(--muted)">{{ t('pat.form.d') }}</p>
      </div>

      <div class="mt-5 flex flex-wrap items-center gap-4">
        <button class="btn-primary px-6 py-3 text-base" @click="begin()">{{ t('pat.start') }}</button>
        <RouterLink to="/patterns/lesson" class="text-sm underline" style="color: var(--muted)">{{ t('pat.lessonFirst') }}</RouterLink>
      </div>

      <section class="mt-12">
        <h2 class="text-xl font-semibold tracking-tight">{{ t('pat.how.t') }}</h2>
        <p class="mt-2 max-w-2xl leading-relaxed" style="color: var(--muted)">{{ t('pat.how.d') }}</p>
        <div class="surface mt-4 p-5">
          <p class="label mb-4">{{ t('pat.sample') }}</p>
          <PatternPuzzle :item="sample" />
        </div>
      </section>
    </template>

    <!-- ---- the sixty puzzles ---- -->
    <template v-else-if="view === 'test'">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h1 class="text-lg font-semibold">
          {{ t('pat.question', { n: store.current + 1, total }) }}
          <span class="ms-2 text-sm font-normal" style="color: var(--muted)">{{ t('pat.set', { s: setOf(store.current) + 1 }) }} · {{ t('pat.form.name', { v: store.form + 1 }) }}</span>
        </h1>
        <span class="text-sm" style="color: var(--muted)">{{ t('pat.time') }} <span class="num">{{ elapsed }}</span></span>
      </div>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full" style="background: var(--sunken)">
        <div class="h-full rounded-full transition-all" :style="`width: ${pct(store.answered, total)}%; background: var(--accent)`" />
      </div>
      <p class="mt-1.5 text-xs" style="color: var(--muted)">{{ t('pat.answered', { n: store.answered, total }) }}</p>

      <div class="mt-4 grid items-start gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
        <PatternGrid :cells="item.cells" :label="t('pat.grid', { n: item.n })" class="mx-auto w-full max-w-[16.5rem] sm:max-w-sm" />
        <div>
          <p class="label mb-2">{{ t('pat.choose') }}</p>
          <PatternOptions :options="item.options" :selected="store.answers[store.current]" @pick="pick" />
          <div class="mt-5 flex flex-wrap items-center gap-2">
            <button class="rounded-[10px] border px-4 py-2 text-sm hover:border-[var(--accent)] disabled:opacity-40" style="border-color: var(--line)" :disabled="store.current === 0" @click="go(store.current - 1)">{{ t('pat.prev') }}</button>
            <button v-if="store.current < total - 1" class="rounded-[10px] border px-4 py-2 text-sm hover:border-[var(--accent)]" style="border-color: var(--line)" @click="go(store.current + 1)">
              {{ store.answers[store.current] === null ? t('pat.skip') : t('pat.next') }}
            </button>
            <button class="btn-primary ms-auto px-4 py-2 text-sm" @click="finish">{{ t('pat.finish') }}</button>
          </div>
          <div v-if="confirming" class="surface mt-3 p-4 text-sm" role="alert">
            <p>{{ t('pat.left', { n: unanswered }) }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button class="btn-primary px-4 py-2" @click="finish">{{ t('pat.finishAnyway') }}</button>
              <button class="rounded-[10px] border px-4 py-2 hover:border-[var(--accent)]" style="border-color: var(--line)" @click="keepGoing">{{ t('pat.keepGoing') }}</button>
            </div>
          </div>
          <p class="mt-4 hidden text-xs sm:block" style="color: var(--muted)">{{ t('pat.keys') }}</p>
        </div>
      </div>

      <!-- One row per set: jump anywhere, see what is still open. -->
      <section class="mt-10 space-y-1.5">
        <div v-for="s in sets" :key="s" class="flex items-center gap-3">
          <span class="label w-16 shrink-0 sm:w-20">{{ t('pat.res.setLabel', { s }) }}</span>
          <div dir="ltr" class="grid flex-1 grid-cols-12 gap-0.5 sm:gap-1">
            <button
              v-for="k in PER_SET"
              :key="k"
              class="num h-7 rounded text-[11px] transition-colors"
              :aria-label="t('pat.jump', { n: (s - 1) * PER_SET + k })"
              :aria-current="store.current === (s - 1) * PER_SET + k - 1 ? 'step' : undefined"
              :style="{
                background: store.answers[(s - 1) * PER_SET + k - 1] !== null ? 'var(--accent)' : 'var(--sunken)',
                color: store.answers[(s - 1) * PER_SET + k - 1] !== null ? 'var(--bg)' : 'var(--muted)',
                boxShadow: store.current === (s - 1) * PER_SET + k - 1 ? '0 0 0 2px var(--fg)' : 'none',
              }"
              @click="go((s - 1) * PER_SET + k - 1)"
            >
              {{ (s - 1) * PER_SET + k }}
            </button>
          </div>
        </div>
      </section>
      <button class="mt-8 text-xs underline" :style="{ color: eraseArmed ? 'var(--neg)' : 'var(--muted)' }" @click="startOver" @blur="eraseArmed = false">
        {{ eraseArmed ? t('pat.eraseSure') : t('pat.startOver') }}
      </button>
    </template>

    <!-- ---- the result ---- -->
    <template v-else-if="score">
      <p class="label" style="color: var(--accent)">{{ t('pat.title') }}</p>
      <h1 class="mt-1 text-3xl font-bold tracking-tight">{{ t('pat.res.title') }} <span class="text-lg font-normal" style="color: var(--muted)">· {{ t('pat.form.name', { v: store.form + 1 }) }}</span></h1>

      <section class="surface mt-6 grid gap-8 p-6 sm:grid-cols-2 md:grid-cols-[auto_auto_1fr]">
        <div>
          <p dir="ltr" class="num text-5xl font-semibold rtl:text-right">{{ score.right }}<span class="text-2xl" style="color: var(--muted)"> / {{ total }}</span></p>
          <p class="label mt-1">{{ t('pat.res.scoreLabel') }}</p>
          <p class="mt-4 text-sm" style="color: var(--muted)">{{ t('pat.time') }} <span class="num">{{ clock(store.seconds) }}</span></p>
        </div>
        <div>
          <p dir="ltr" class="num text-5xl font-semibold rtl:text-right" style="color: var(--accent)"><span class="text-2xl" style="color: var(--muted)">{{ iq.tooLow ? '< ' : '≈ ' }}</span>{{ iq.tooLow ? 70 : iq.iq }}</p>
          <p class="label mt-1">{{ t('pat.res.iq.label') }}</p>
          <p class="mt-4 text-sm" style="color: var(--muted)">{{ iq.tooLow ? t('pat.res.iq.tooLow') : t('pat.res.iq.range', { low: iq.low, high: iq.high }) }}</p>
        </div>
        <div class="sm:col-span-2 md:col-span-1">
          <h2 class="label mb-2">{{ t('pat.res.sets') }}</h2>
          <div v-for="(s, i) in score.bySet" :key="i" class="flex items-center gap-3 py-1 text-sm">
            <span class="w-24 shrink-0">{{ t('pat.res.setLabel', { s: i + 1 }) }}</span>
            <span class="h-2 flex-1 overflow-hidden rounded-full" style="background: var(--sunken)"><span class="block h-full rounded-full" :style="{ width: `${pct(s.right, s.total)}%`, background: 'var(--accent)' }" /></span>
            <span dir="ltr" class="num w-12 shrink-0 text-end" style="color: var(--muted)">{{ s.right }}/{{ s.total }}</span>
          </div>
        </div>
      </section>

      <section class="surface mt-4 p-6">
        <h2 class="label mb-1">{{ t('pat.res.rules') }}</h2>
        <p class="mb-3 text-sm leading-relaxed" style="color: var(--muted)">{{ t('pat.res.rulesNote') }}</p>
        <RouterLink v-for="f in FAMILIES" :key="f" :to="`/patterns/lesson#${f}`" class="-mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-[var(--sunken)]">
          <span class="w-36 shrink-0 font-medium">{{ ruleName(f) }}</span>
          <span class="h-2 flex-1 overflow-hidden rounded-full" style="background: var(--sunken)"><span class="block h-full rounded-full" :style="{ width: `${pct(score.byFamily[f].right, score.byFamily[f].total)}%`, background: 'var(--pos)' }" /></span>
          <span class="w-20 shrink-0 text-end" style="color: var(--muted)">{{ score.byFamily[f].total ? t('pat.rule.score', score.byFamily[f]) : t('pat.res.noData') }}</span>
        </RouterLink>
      </section>

      <section class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="surface p-5">
          <h2 class="font-semibold">{{ t('pat.res.iq.t') }}</h2>
          <p class="mt-2 text-sm leading-relaxed" style="color: var(--muted)">{{ t('pat.res.iq.d') }}</p>
        </div>
        <RouterLink to="/patterns/lesson" class="surface lift flex flex-col p-5" style="border-color: var(--accent)">
          <span v-if="goal" class="mb-2 font-medium leading-relaxed">{{ t('pat.res.iq.next', goal) }}</span>
          <span class="text-sm leading-relaxed">{{ t('pat.res.grow') }}</span>
          <span class="btn-primary mt-4 self-start px-5 py-2.5 text-sm">{{ t('pat.res.lesson') }}</span>
        </RouterLink>
      </section>

      <section class="mt-12">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-semibold tracking-tight">{{ t('pat.res.review') }}</h2>
          <div class="flex rounded-lg border p-0.5 text-sm" style="border-color: var(--line)">
            <button v-for="w in [true, false]" :key="String(w)" class="rounded-md px-3 py-1" :style="onlyWrong === w ? 'background: var(--sunken); color: var(--fg)' : 'color: var(--muted)'" @click="onlyWrong = w">
              {{ w ? t('pat.res.onlyWrong') : t('pat.res.all') }}
            </button>
          </div>
        </div>
        <p v-if="!review.length" class="mt-4 font-medium" style="color: var(--pos)">{{ t('pat.res.allRight') }}</p>
        <ol class="mt-4 space-y-4">
          <li v-for="r in review" :key="r.it.n" class="surface p-4 sm:p-5">
            <div class="flex items-center gap-3">
              <span class="num grid h-8 w-8 place-items-center rounded-full text-sm text-white" :style="{ background: r.ok ? 'var(--pos)' : 'var(--neg)' }">{{ r.it.n }}</span>
              <span class="text-sm font-medium" :style="{ color: r.ok ? 'var(--pos)' : 'var(--neg)' }">{{ r.ok ? t('pat.res.got') : r.pick === null ? t('pat.res.skipped') : t('pat.res.missed') }}</span>
              <span class="text-xs" style="color: var(--muted)">{{ t('pat.res.setLabel', { s: setOf(r.it.n - 1) + 1 }) }}</span>
            </div>
            <div class="mt-4 grid items-start gap-5 sm:grid-cols-[12rem_1fr]">
              <PatternGrid :cells="r.it.cells" :gap="r.it.options[r.it.answer]" class="w-full max-w-[12rem]" />
              <div>
                <div class="flex gap-4">
                  <figure v-if="r.pick !== null && !r.ok">
                    <div class="h-20 w-20 rounded-lg border-2 p-1.5" style="border-color: var(--neg); background: var(--paper)"><PatternCell :cell="r.it.options[r.pick]" /></div>
                    <figcaption class="mt-1 text-xs whitespace-nowrap" style="color: var(--muted)">{{ t('pat.res.yours') }} · <span class="num">{{ r.pick + 1 }}</span></figcaption>
                  </figure>
                  <figure>
                    <div class="h-20 w-20 rounded-lg border-2 p-1.5" style="border-color: var(--pos); background: var(--paper)"><PatternCell :cell="r.it.options[r.it.answer]" /></div>
                    <figcaption class="mt-1 text-xs whitespace-nowrap" style="color: var(--muted)">{{ t('pat.res.right') }} · <span class="num">{{ r.it.answer + 1 }}</span></figcaption>
                  </figure>
                </div>
                <template v-if="r.pick !== null && !r.ok">
                  <p v-for="(s, i) in explainPick(r.it, r.pick)" :key="'s' + i" class="mt-3 text-sm" style="color: var(--neg)">{{ s }}</p>
                </template>
                <p v-for="(s, i) in explainItem(r.it)" :key="i" class="mt-2 text-[15px] leading-relaxed">{{ s }}</p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      <div class="mt-10 flex flex-wrap gap-3">
        <RouterLink to="/patterns/train" class="rounded-[10px] border px-5 py-2.5 hover:border-[var(--accent)]" style="border-color: var(--line)">{{ t('pat.train.title') }}</RouterLink>
        <button class="btn-primary px-5 py-2.5" @click="begin(nextVersion)">{{ t('pat.res.retake', { v: nextVersion + 1 }) }}</button>
        <button class="rounded-[10px] border px-5 py-2.5 hover:border-[var(--neg)]" style="border-color: var(--line)" @click="erase">{{ t('pat.res.erase') }}</button>
      </div>
    </template>
  </main>
</template>
