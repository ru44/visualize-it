<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same RK4 integration as the 2D Lorenz.vue (identical σ, ρ, β, starting gap and step count), but
// drawn in full x, y, z instead of projected onto the x-z plane — the flat picture can only show
// one shadow of the butterfly; here the whole wingspan and the split between the two paths show up.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const STEPS = 2200
const DT = 0.008

function integrate(buf: Float32Array, x0: number, y0: number, z0: number, sigma: number, rho: number, beta: number) {
  let x = x0
  let y = y0
  let z = z0
  buf[0] = x
  buf[1] = y
  buf[2] = z
  const d = (x: number, y: number, z: number): [number, number, number] => [sigma * (y - x), x * (rho - z) - y, x * y - beta * z]
  for (let i = 0; i < STEPS; i++) {
    const [k1x, k1y, k1z] = d(x, y, z)
    const [k2x, k2y, k2z] = d(x + (DT / 2) * k1x, y + (DT / 2) * k1y, z + (DT / 2) * k1z)
    const [k3x, k3y, k3z] = d(x + (DT / 2) * k2x, y + (DT / 2) * k2y, z + (DT / 2) * k2z)
    const [k4x, k4y, k4z] = d(x + DT * k3x, y + DT * k3y, z + DT * k3z)
    x += (DT / 6) * (k1x + 2 * k2x + 2 * k3x + k4x)
    y += (DT / 6) * (k1y + 2 * k2y + 2 * k3y + k4y)
    z += (DT / 6) * (k1z + 2 * k2z + 2 * k3z + k4z)
    buf[(i + 1) * 3] = x
    buf[(i + 1) * 3 + 1] = y
    buf[(i + 1) * 3 + 2] = z
  }
}

useThree(
  el,
  ({ scene, theme }) => {
    const group = new THREE.Group()
    scene.add(group)
    const posA = new Float32Array((STEPS + 1) * 3)
    const posB = new Float32Array((STEPS + 1) * 3)
    const geoA = new THREE.BufferGeometry()
    geoA.setAttribute('position', new THREE.BufferAttribute(posA, 3))
    const geoB = new THREE.BufferGeometry()
    geoB.setAttribute('position', new THREE.BufferAttribute(posB, 3))
    const lineA = new THREE.Line(geoA, new THREE.LineBasicMaterial({ color: theme.accent }))
    const lineB = new THREE.Line(geoB, new THREE.LineBasicMaterial({ color: theme.accent2 }))
    group.add(lineA, lineB)
    const headA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: theme.accent }))
    const headB = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
    group.add(headA, headB)
    const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.3, gapSize: 0.2 }))
    group.add(link)

    let key = ''
    return () => {
      const sigma = props.params.sigma ?? 10
      const rho = props.params.rho ?? 28
      const beta = props.params.beta ?? 8 / 3
      const sep = Math.max(0, props.params.sep ?? 1)
      const t01 = Math.min(1, Math.max(0, props.params.t ?? 1))
      const k = `${sigma},${rho},${beta},${sep}`
      if (k !== key) {
        key = k
        integrate(posA, 0.1, 0, 0, sigma, rho, beta)
        integrate(posB, 0.1 + sep, 0, 0, sigma, rho, beta)
        geoA.attributes.position.needsUpdate = true
        geoB.attributes.position.needsUpdate = true
        let xmin = Infinity
        let xmax = -Infinity
        let ymin = Infinity
        let ymax = -Infinity
        let zmin = Infinity
        let zmax = -Infinity
        for (const buf of [posA, posB]) {
          for (let i = 0; i <= STEPS; i++) {
            const x = buf[i * 3]
            const y = buf[i * 3 + 1]
            const z = buf[i * 3 + 2]
            if (x < xmin) xmin = x
            if (x > xmax) xmax = x
            if (y < ymin) ymin = y
            if (y > ymax) ymax = y
            if (z < zmin) zmin = z
            if (z > zmax) zmax = z
          }
        }
        const cx = (xmin + xmax) / 2
        const cy = (ymin + ymax) / 2
        const cz = (zmin + zmax) / 2
        const ext = Math.max(xmax - xmin, ymax - ymin, zmax - zmin, 1e-3) / 2
        const s = 9 / ext
        group.scale.setScalar(s)
        group.position.set(-cx * s, -cy * s, -cz * s)
      }
      const idx = Math.max(1, Math.round(t01 * STEPS))
      geoA.setDrawRange(0, idx + 1)
      geoB.setDrawRange(0, sep > 0 ? idx + 1 : 0)
      const ax = posA[idx * 3]
      const ay = posA[idx * 3 + 1]
      const az = posA[idx * 3 + 2]
      const bx = posB[idx * 3]
      const by = posB[idx * 3 + 1]
      const bz = posB[idx * 3 + 2]
      headA.position.set(ax, ay, az)
      headB.position.set(sep > 0 ? bx : ax, sep > 0 ? by : ay, sep > 0 ? bz : az)
      headB.visible = sep > 0
      link.visible = sep > 0
      if (sep > 0) {
        const p = link.geometry.attributes.position as THREE.BufferAttribute
        p.setXYZ(0, ax, ay, az)
        p.setXYZ(1, bx, by, bz)
        p.needsUpdate = true
        link.computeLineDistances()
      }
    }
  },
  { camera: [20, 14, 20], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
