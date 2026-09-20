<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { lessons, getLesson } from '../lessons'

const router = useRouter()
const W = 960
const ROW = 96
const BOX = { w: 168, h: 34 }

// Depth = longest prerequisite chain, so every arrow points downward.
const depthOf = new Map<string, number>()
function depth(id: string, seen: string[] = []): number {
  if (depthOf.has(id)) return depthOf.get(id)!
  const pre = (getLesson(id)?.prerequisites ?? []).filter((p) => getLesson(p) && !seen.includes(p))
  const d = pre.length ? Math.max(...pre.map((p) => depth(p, [...seen, id]))) + 1 : 0
  depthOf.set(id, d)
  return d
}

const nodes = computed(() => {
  const rows = new Map<number, string[]>()
  for (const l of lessons) rows.set(depth(l.id), [...(rows.get(depth(l.id)) ?? []), l.id])
  const out = new Map<string, { id: string; title: string; x: number; y: number }>()
  for (const [d, ids] of rows)
    ids.forEach((id, i) => out.set(id, { id, title: getLesson(id)!.title, x: (W * (i + 1)) / (ids.length + 1), y: 40 + d * ROW }))
  return out
})
const edges = computed(() =>
  lessons.flatMap((l) => l.prerequisites.filter((p) => nodes.value.has(p)).map((p) => ({ from: nodes.value.get(p)!, to: nodes.value.get(l.id)! }))),
)
const height = computed(() => 80 + Math.max(...[...nodes.value.values()].map((n) => n.y)))
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-10 lg:px-8">
    <h1 class="text-2xl font-semibold tracking-tight">Learning map</h1>
    <p class="mt-1" style="color: var(--muted)">Each concept rests on the ones above it. Start at the top, or jump in anywhere.</p>
    <div class="mt-6 overflow-x-auto">
      <svg :viewBox="`0 0 ${W} ${height}`" class="block w-full" style="min-width: 720px">
        <line
          v-for="(e, i) in edges"
          :key="i"
          :x1="e.from.x"
          :y1="e.from.y + BOX.h / 2"
          :x2="e.to.x"
          :y2="e.to.y - BOX.h / 2"
          stroke="var(--muted)"
          stroke-opacity="0.5"
        />
        <g v-for="n in nodes.values()" :key="n.id" class="cursor-pointer" @click="router.push(`/lesson/${n.id}`)">
          <rect :x="n.x - BOX.w / 2" :y="n.y - BOX.h / 2" :width="BOX.w" :height="BOX.h" rx="6" fill="var(--panel)" stroke="var(--line)" />
          <text :x="n.x" :y="n.y + 4" text-anchor="middle" font-size="13" fill="var(--fg)">{{ n.title }}</text>
        </g>
      </svg>
    </div>
  </main>
</template>
