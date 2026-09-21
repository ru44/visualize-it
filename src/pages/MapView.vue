<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { lessons, getLesson } from '../lessons'
import { localize } from '../lessons/localize'
import { t, type Key } from '../i18n'
import type { Subject } from '../lessons/types'

const router = useRouter()
const W = 960
const ROW = 84
const PER_ROW = 5
const BOX = { w: 172, h: 34 }

const subjects = computed(() => [...new Set(lessons.map((l) => l.subject))])
const active = ref<Subject>(subjects.value[0])

// Depth = longest prerequisite chain across the whole curriculum, so every arrow points downward.
const depthOf = new Map<string, number>()
function depth(id: string, seen: string[] = []): number {
  if (depthOf.has(id)) return depthOf.get(id)!
  const pre = (getLesson(id)?.prerequisites ?? []).filter((p) => getLesson(p) && !seen.includes(p))
  const d = pre.length ? Math.max(...pre.map((p) => depth(p, [...seen, id]))) + 1 : 0
  depthOf.set(id, d)
  return d
}

// Show the chosen subject plus the outside lessons it directly depends on.
const graph = computed(() => {
  const own = lessons.filter((l) => l.subject === active.value)
  const ids = new Set(own.map((l) => l.id))
  for (const l of own) for (const p of l.prerequisites) if (getLesson(p)) ids.add(p)
  const byDepth = new Map<number, string[]>()
  for (const id of ids) byDepth.set(depth(id), [...(byDepth.get(depth(id)) ?? []), id])

  const nodes = new Map<string, { id: string; title: string; x: number; y: number; own: boolean }>()
  let row = 0
  for (const d of [...byDepth.keys()].sort((a, b) => a - b)) {
    const list = byDepth.get(d)!
    for (let i = 0; i < list.length; i += PER_ROW, row++) {
      const chunk = list.slice(i, i + PER_ROW)
      chunk.forEach((id, j) => nodes.set(id, { id, title: localize(getLesson(id)!).title, x: (W * (j + 1)) / (chunk.length + 1), y: 36 + row * ROW, own: getLesson(id)!.subject === active.value }))
    }
  }
  const edges = [...ids].flatMap((id) => getLesson(id)!.prerequisites.filter((p) => nodes.has(p)).map((p) => ({ from: nodes.get(p)!, to: nodes.get(id)! })))
  return { nodes: [...nodes.values()], edges, height: 72 + (row - 1) * ROW }
})
const short = (t: string) => (t.length > 24 ? t.slice(0, 23) + '…' : t)
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-10 lg:px-8">
    <h1 class="text-3xl font-semibold tracking-tight">{{ t('map.title') }}</h1>
    <p class="mt-1" style="color: var(--muted)">{{ t('map.lead') }}</p>

    <div class="mt-5 flex flex-wrap gap-1 rounded-xl p-1" style="background: var(--sunken)" role="tablist">
      <button
        v-for="s in subjects"
        :key="s"
        role="tab"
        :aria-selected="active === s"
        class="rounded-lg px-3 py-1.5 text-sm transition-colors"
        :style="active === s ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
        @click="active = s"
      >
        {{ t(`subject.${s}` as Key) }}
      </button>
    </div>

    <div class="surface mt-4 overflow-x-auto p-4">
      <svg :viewBox="`0 0 ${W} ${graph.height}`" class="block w-full" style="min-width: 760px">
        <line v-for="(e, i) in graph.edges" :key="i" :x1="e.from.x" :y1="e.from.y + BOX.h / 2" :x2="e.to.x" :y2="e.to.y - BOX.h / 2" stroke="var(--muted)" stroke-opacity="0.45" />
        <g v-for="n in graph.nodes" :key="n.id" class="cursor-pointer" @click="router.push(`/lesson/${n.id}`)">
          <title>{{ n.title }}</title>
          <rect
            :x="n.x - BOX.w / 2"
            :y="n.y - BOX.h / 2"
            :width="BOX.w"
            :height="BOX.h"
            rx="9"
            :fill="n.own ? 'var(--sunken)' : 'var(--panel)'"
            stroke="var(--line)"
            :stroke-dasharray="n.own ? undefined : '4 3'"
            class="transition-colors hover:stroke-[var(--accent)]"
          />
          <text :x="n.x" :y="n.y + 4" text-anchor="middle" font-size="12.5" :fill="n.own ? 'var(--fg)' : 'var(--muted)'">{{ short(n.title) }}</text>
        </g>
      </svg>
    </div>
  </main>
</template>
