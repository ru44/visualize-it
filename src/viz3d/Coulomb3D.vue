<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// Two point charges in free space. The 2D picture only ever plots the field in the flat plane through
// both charges; the real field has the same strength at the same distance in every direction around
// that line (cylindrical symmetry), which only a 3D grid of arrows can show. The force arrows on each
// charge, and every field arrow, use the exact same k·q/r² as the 2D readouts.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const K = 8.99e9
const GX = [-3.5, -1.75, 0, 1.75, 3.5]
const GY = [-1.5, 0, 1.5]
const GZ = [-1.5, 0, 1.5]
const POINTS: [number, number, number][] = []
for (const gx of GX) for (const gy of GY) for (const gz of GZ) POINTS.push([gx, gy, gz])

useThree(
  el,
  ({ scene, theme }) => {
    const q1Mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 22, 16), new THREE.MeshStandardMaterial({ roughness: 0.4 }))
    const q2Mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 22, 16), new THREE.MeshStandardMaterial({ roughness: 0.4 }))
    q1Mesh.castShadow = q2Mesh.castShadow = true
    scene.add(q1Mesh, q2Mesh)

    const fieldArrows = POINTS.map(() => arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 0.3, theme.muted))
    fieldArrows.forEach((a) => scene.add(a))
    const f1Arrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    const f2Arrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    scene.add(f1Arrow, f2Arrow)
    const tag = label('', undefined, 0.55)
    tag.position.set(0, 2.6, 0)
    scene.add(tag)

    const dir = new THREE.Vector3()
    const dirF = new THREE.Vector3()
    let lastText = ''

    return () => {
      const q1 = props.params.q1 ?? 2
      const q2 = props.params.q2 ?? -2
      const d = Math.max(0.2, props.params.d ?? 3)
      const x1 = -d / 2
      const x2 = d / 2

      q1Mesh.position.set(x1, 0, 0)
      q2Mesh.position.set(x2, 0, 0)
      q1Mesh.scale.setScalar(0.16 + 0.09 * Math.sqrt(Math.abs(q1)))
      q2Mesh.scale.setScalar(0.16 + 0.09 * Math.sqrt(Math.abs(q2)))
      ;(q1Mesh.material as THREE.MeshStandardMaterial).color.copy(q1 >= 0 ? theme.pos : theme.neg)
      ;(q2Mesh.material as THREE.MeshStandardMaterial).color.copy(q2 >= 0 ? theme.pos : theme.neg)

      const Q1 = q1 * 1e-6
      const Q2 = q2 * 1e-6

      for (let i = 0; i < POINTS.length; i++) {
        const p = POINTS[i]!
        const a = fieldArrows[i]!
        const dx1 = p[0] - x1
        const dy1 = p[1]
        const dz1 = p[2]
        const r1sq = Math.max(dx1 * dx1 + dy1 * dy1 + dz1 * dz1, 0.05)
        const r1 = Math.sqrt(r1sq)
        const dx2 = p[0] - x2
        const dy2 = p[1]
        const dz2 = p[2]
        const r2sq = Math.max(dx2 * dx2 + dy2 * dy2 + dz2 * dz2, 0.05)
        const r2 = Math.sqrt(r2sq)
        if (r1 < 0.45 || r2 < 0.45) {
          a.visible = false
          continue
        }
        a.visible = true
        const m1 = (K * Q1) / r1sq
        const m2 = (K * Q2) / r2sq
        const ex = m1 * (dx1 / r1) + m2 * (dx2 / r2)
        const ey = m1 * (dy1 / r1) + m2 * (dy2 / r2)
        const ez = m1 * (dz1 / r1) + m2 * (dz2 / r2)
        const mag = Math.hypot(ex, ey, ez) || 1e-9
        dir.set(ex / mag, ey / mag, ez / mag)
        a.position.set(p[0], p[1], p[2])
        a.setDirection(dir)
        const len = THREE.MathUtils.clamp(0.15 + 0.28 * (Math.log10(mag) - 1), 0.15, 1.1)
        a.setLength(len, len * 0.4, len * 0.22)
      }

      const r = Math.max(d, 0.2)
      const F = (K * Q1 * Q2) / (r * r)
      const flen = THREE.MathUtils.clamp(0.3 + 3.2 * Math.sqrt(Math.abs(F)), 0.3, 2.2)
      const attract = Q1 * Q2 < 0
      f1Arrow.position.set(x1, 0, 0)
      dirF.set(attract ? 1 : -1, 0, 0)
      f1Arrow.setDirection(dirF)
      f1Arrow.setLength(flen, flen * 0.3, flen * 0.18)
      f2Arrow.position.set(x2, 0, 0)
      dirF.set(attract ? -1 : 1, 0, 0)
      f2Arrow.setDirection(dirF)
      f2Arrow.setLength(flen, flen * 0.3, flen * 0.18)

      const text = `F ≈ ${F.toExponential(2)} N (${attract ? 'attract' : 'repel'})`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.font = '500 22px Inter, sans-serif'
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.textAlign = 'center'
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [5, 3.5, 7], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
