<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// A double cone sliced by a plane hinged on a fixed point of its surface. Tilting the plane (the
// same eccentricity e the 2D lesson uses) sweeps the cut from a circle, through ellipses, through
// the one tilt that is parallel to the cone's own side (parabola, e = 1), into a hyperbola that
// cuts both nappes. The curve is not decoration: it is solved directly from the cone's equation
// x² + z² = (y·tanφ)², so the same e that drives the 2D focus-directrix picture drives this cut.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const PHI = (64 * Math.PI) / 180 // cone half-angle
const TAN = Math.tan(PHI)
const H = 2.4 // rendered half-height of each nappe
const R = H * TAN
const HINGE_Y = 1.4 // the plane always passes through this point on the cone's near side
const HINGE_R = HINGE_Y * TAN
const N = 140 // curve scan resolution
const T_SPAN = 3 * (H + R)

function kindOf(e: number) {
  return e < 0.03 ? 'circle' : e < 0.97 ? 'ellipse' : e < 1.03 ? 'parabola' : 'hyperbola'
}

useThree(
  el,
  ({ scene, theme }) => {
    const lathe = new THREE.LatheGeometry([new THREE.Vector2(R, H), new THREE.Vector2(0, 0), new THREE.Vector2(R, -H)], 40)
    const cone = new THREE.Mesh(lathe, new THREE.MeshStandardMaterial({ color: theme.line, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, roughness: 0.9 }))
    scene.add(cone)
    scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(lathe), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.3 })))

    const axis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -H, 0), new THREE.Vector3(0, H, 0)]), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.14, gapSize: 0.1 }))
    axis.computeLineDistances()
    scene.add(axis)
    const apex = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshStandardMaterial({ color: theme.fg }))
    scene.add(apex)

    const planeSize = 2.3 * (H + R)
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize), new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.24, side: THREE.DoubleSide, depthWrite: false }))
    scene.add(plane)

    const CAP = 2 * N
    const curves = [0, 1].map(() => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CAP * 3), 3))
      geo.setDrawRange(0, 0)
      const ln = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: theme.accent, linewidth: 2 }))
      scene.add(ln)
      return ln
    })

    const tag = label('', '#888', 0.55)
    scene.add(tag)
    let lastKind = ''

    const u = new THREE.Vector3(1, 0, 0)
    const v = new THREE.Vector3()
    const nrm = new THREE.Vector3()
    const basis = new THREE.Matrix4()

    return () => {
      const e = Math.max(0, props.params.e ?? 0.6)
      const cosT = Math.min(1, e * Math.cos(PHI))
      const sinT = Math.sqrt(1 - cosT * cosT)
      const K = e * e - 1
      const L = 2 * TAN * HINGE_Y * (TAN * cosT - sinT)

      v.set(0, cosT, sinT)
      nrm.crossVectors(u, v)
      plane.position.set(0, HINGE_Y, HINGE_R)
      plane.quaternion.setFromRotationMatrix(basis.makeBasis(u, v, nrm))

      let li = 0
      let runStart = -1
      const step = (2 * T_SPAN) / (N - 1)
      const yzOf = (i: number) => {
        const tt = -T_SPAN + i * step
        return { tt, y: HINGE_Y + tt * cosT, z: HINGE_R + tt * sinT, val: K * tt * tt + L * tt }
      }
      const flush = (start: number, end: number) => {
        if (li > 1) return
        const arr = (curves[li].geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
        let w = 0
        for (let i = start; i <= end; i++) {
          const { y, z, val } = yzOf(i)
          const a = Math.sqrt(Math.max(0, val))
          arr[w++] = a
          arr[w++] = y
          arr[w++] = z
        }
        for (let i = end; i >= start; i--) {
          const { y, z, val } = yzOf(i)
          const a = Math.sqrt(Math.max(0, val))
          arr[w++] = -a
          arr[w++] = y
          arr[w++] = z
        }
        const count = w / 3
        curves[li].geometry.setDrawRange(0, count)
        ;(curves[li].geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
        curves[li].geometry.computeBoundingSphere()
        li++
      }
      for (let i = 0; i < N; i++) {
        const { y, val } = yzOf(i)
        const valid = val >= 0 && Math.abs(y) <= H
        if (valid && runStart < 0) runStart = i
        if (!valid && runStart >= 0) {
          flush(runStart, i - 1)
          runStart = -1
        }
      }
      if (runStart >= 0) flush(runStart, N - 1)
      for (let k = li; k < 2; k++) curves[k].geometry.setDrawRange(0, 0)

      const kind = kindOf(e)
      if (kind !== lastKind) {
        lastKind = kind
        const text = t(`conics.${kind}` as any)
        tag.userData.text = ''
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.fillStyle = '#' + theme.accent2.getHexString()
        cx.font = '600 42px Inter, sans-serif'
        cx.textAlign = 'center'
        cx.fillText(text, 128, 46)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
      tag.position.set(0, H + 0.55, 0)
    }
  },
  { camera: [9, 6, 11], target: [0, 0.4, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
