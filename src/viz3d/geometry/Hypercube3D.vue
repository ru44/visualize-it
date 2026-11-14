<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree } from '../useThree'
import { t } from '../../i18n'
import { readParams, build, pieces, fmtInt, strokeFor, MAX_N } from '../../viz/geometry/hypercubeModel'

// geometry/hypercube, 3D. Same params as the picture (n, spin, sweep). The n-cube is squeezed down to 3 dimensions by
// the same perspective rule and drawn with one LineSegments per axis; buffers are allocated once and filled in place.
// On top of `spin` the newest axis turns slowly by itself (not with prefers-reduced-motion).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const cur = computed(() => [0, 1, 2, 3].map((k) => pieces(P.value.n, k)))
const RADIUS = 3.3 // world radius of the shape's bounding sphere
const DROP = -1.4 // shape sits in the lower part of the view; the overlay covers the top
const PER_AXIS = 2 ** (MAX_N - 1) // edges along one axis, at most

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    let wide: boolean | null = null
    const fit = () => {
      const w = camera.aspect >= 1.3
      if (w === wide) return
      if (wide === null) {
        if (!w) camera.position.sub(controls.target).multiplyScalar(1.15).add(controls.target)
      } else if (w)
        camera.position
          .sub(controls.target)
          .multiplyScalar(1 / 1.15)
          .add(controls.target)
      else camera.position.sub(controls.target).multiplyScalar(1.15).add(controls.target)
      wide = w
    }

    const palette = [theme.fg, theme.pos, theme.accent2, theme.neg]
    const lines: { pos: THREE.BufferAttribute; seg: THREE.LineSegments; mat: THREE.LineBasicMaterial }[] = []
    for (let k = 0; k < MAX_N; k++) {
      const pos = new THREE.BufferAttribute(new Float32Array(PER_AXIS * 2 * 3), 3)
      pos.setUsage(THREE.DynamicDrawUsage)
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', pos)
      g.setDrawRange(0, 0)
      const mat = new THREE.LineBasicMaterial({ color: palette[k % 4], transparent: true, opacity: 0.6 })
      const seg = new THREE.LineSegments(g, mat)
      seg.frustumCulled = false
      scene.add(seg)
      lines.push({ pos, seg, mat })
    }
    const dotPos = new THREE.BufferAttribute(new Float32Array(64 * 3), 3)
    const dg = new THREE.BufferGeometry()
    dg.setAttribute('position', dotPos)
    dg.setDrawRange(0, 0)
    const dots = new THREE.Points(dg, new THREE.PointsMaterial({ color: theme.fg, size: 0.16, sizeAttenuation: true }))
    dots.frustumCulled = false
    scene.add(dots)

    let auto = 0
    let key = ''
    return (dt) => {
      fit()
      auto = Math.max(0, auto + dt * 9) % 360
      const { n, spin, sweep } = P.value
      const k2 = `${n}|${spin}|${sweep}|${auto.toFixed(2)}`
      if (k2 === key) return
      key = k2
      const sh = build(n, spin, sweep, 3, auto)
      const { pts, edges, box } = sh
      const cx = (box[0] + box[3]) / 2
      const cy = (box[1] + box[4]) / 2
      const cz = (box[2] + box[5]) / 2
      const r = Math.hypot(box[3] - box[0], box[4] - box[1], box[5] - box[2]) / 2
      const SIZE = RADIUS / Math.max(r, 1e-6)
      for (let k = 0; k < MAX_N; k++) {
        const L = lines[k]
        const e = edges[k]
        if (!e) {
          L.seg.geometry.setDrawRange(0, 0)
          continue
        }
        const arr = L.pos.array as Float32Array
        for (let q = 0; q < e.length; q++) {
          const v = e[q] * 3
          arr[q * 3] = (pts[v] - cx) * SIZE
          arr[q * 3 + 1] = (pts[v + 1] - cy) * SIZE + DROP
          arr[q * 3 + 2] = (pts[v + 2] - cz) * SIZE
        }
        L.pos.needsUpdate = true
        L.seg.geometry.setDrawRange(0, e.length)
        const newest = k === n - 1
        L.mat.color.copy(newest ? theme.accent : palette[k % 4])
        L.mat.opacity = strokeFor(n, newest).opacity
      }
      const nd = n <= 6 ? sh.count : 0
      const da = dotPos.array as Float32Array
      for (let i = 0; i < nd; i++) {
        da[i * 3] = (pts[i * 3] - cx) * SIZE
        da[i * 3 + 1] = (pts[i * 3 + 1] - cy) * SIZE + DROP
        da[i * 3 + 2] = (pts[i * 3 + 2] - cz) * SIZE
      }
      dotPos.needsUpdate = true
      dg.setDrawRange(0, nd)
    }
  },
  { camera: [0, 3, 12], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span class="num font-semibold" style="color: var(--accent)">
        {{ t('hypercube.3d.counts', { n: P.n, v: fmtInt(cur[0]), e: fmtInt(cur[1]), f: fmtInt(cur[2]), c: fmtInt(cur[3]) }) }}
      </span>
      <span style="color: var(--muted)">{{ t('hypercube.3d.note') }}</span>
    </div>
  </div>
</template>
