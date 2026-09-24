<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { useThree } from './useThree'
import { t } from '../i18n'

// Gray-Scott reaction-diffusion — the same F(1-A) feed and (F+k)B kill formulas as the 2D grid
// (ReactionDiffusion.vue) — run across the vertices of a sphere instead of a flat grid: each vertex
// reacts with its mesh neighbours, so the same spots-or-stripes instability that the 2D picture
// plots on a rectangle wraps around a closed surface, the way real coat patterns do.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const DU = 0.16
const DV = 0.08
const SUB_STEPS = 20
const RADIUS = 1.6

function hash(i: number) {
  const v = Math.sin(i * 12.9898) * 43758.5453
  return v - Math.floor(v)
}

// Every vertex's mesh neighbours, read off the sphere's own triangle index — the graph the sphere's
// surface actually has, in place of a grid's fixed four neighbours.
function buildAdjacency(geo: THREE.BufferGeometry, count: number): Int32Array[] {
  const sets = Array.from({ length: count }, () => new Set<number>())
  const idxAttr = geo.getIndex()!
  for (let f = 0; f < idxAttr.count; f += 3) {
    const a = idxAttr.getX(f)
    const b = idxAttr.getX(f + 1)
    const c = idxAttr.getX(f + 2)
    sets[a].add(b); sets[a].add(c)
    sets[b].add(a); sets[b].add(c)
    sets[c].add(a); sets[c].add(b)
  }
  return sets.map((s) => Int32Array.from(s))
}

useThree(
  el,
  ({ scene, theme }) => {
    // IcosahedronGeometry hands back a non-indexed triangle soup (one seam-free vertex per triangle
    // corner); merging shared corners back into single vertices is what gives every vertex a small,
    // well-defined set of mesh neighbours to diffuse with.
    const geo = mergeVertices(new THREE.IcosahedronGeometry(RADIUS, 3))
    const V = geo.attributes.position.count
    const adjacency = buildAdjacency(geo, V)
    const colors = new Float32Array(V * 3)
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const group = new THREE.Group()
    scene.add(group)
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75 }))
    mesh.castShadow = true
    group.add(mesh)

    function seed() {
      const a = new Float32Array(V).fill(1)
      const b = new Float32Array(V)
      for (let i = 0; i < V; i++) if (hash(i) < 0.06) b[i] = 0.6 + 0.4 * hash(i * 7.31)
      return { a, b }
    }
    function euler(a: Float32Array, b: Float32Array, F: number, K: number) {
      const na = new Float32Array(V)
      const nb = new Float32Array(V)
      for (let i = 0; i < V; i++) {
        const nbrs = adjacency[i]
        let sa = 0
        let sb = 0
        for (let n = 0; n < nbrs.length; n++) { sa += a[nbrs[n]]; sb += b[nbrs[n]] }
        const k = nbrs.length
        const av = a[i]
        const bv = b[i]
        const lapA = sa - k * av
        const lapB = sb - k * bv
        const reaction = av * bv * bv
        na[i] = Math.min(1, Math.max(0, av + DU * lapA - reaction + F * (1 - av)))
        nb[i] = Math.min(1, Math.max(0, bv + DV * lapB + reaction - (F + K) * bv))
      }
      return { a: na, b: nb }
    }
    let cache = { feed: -1, kill: -1, step: 0, ...seed() }
    function simulate(F: number, K: number, target: number) {
      if (cache.feed !== F || cache.kill !== K || cache.step > target) cache = { feed: F, kill: K, step: 0, ...seed() }
      while (cache.step < target) {
        const r = euler(cache.a, cache.b, F, K)
        cache.a = r.a
        cache.b = r.b
        cache.step++
      }
      return cache
    }

    function recompute() {
      const F = Math.max(0.01, Math.min(0.09, props.params.feed ?? 0.03))
      const K = Math.max(0.03, Math.min(0.07, props.params.kill ?? 0.062))
      const step = Math.max(0, Math.min(150, Math.round(props.params.step ?? 0)))
      const { b } = simulate(F, K, step * SUB_STEPS)
      const bg = theme.sunken
      const fg = theme.accent
      for (let i = 0; i < V; i++) {
        const w = Math.min(1, b[i] * 1.4)
        colors[i * 3] = bg.r + (fg.r - bg.r) * w
        colors[i * 3 + 1] = bg.g + (fg.g - bg.g) * w
        colors[i * 3 + 2] = bg.b + (fg.b - bg.b) * w
      }
      ;(geo.attributes.color as THREE.BufferAttribute).needsUpdate = true
    }
    recompute()
    watch(() => [props.params.feed, props.params.kill, props.params.step], recompute)

    return (dt) => {
      group.rotation.y += dt * 0.15
    }
  },
  { camera: [3, 2, 3.6], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <p class="num pointer-events-none absolute inset-x-2 top-2 text-center text-[11px]" style="color: var(--muted)">{{ t('viz3d.reactionSphere.note') }}</p>
  </div>
</template>
