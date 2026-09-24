<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// physics/fluid-flow. Same Reynolds thresholds as src/viz/FluidFlow.vue: Re = 2UR/ν, a smooth wake
// below Re≈47, shedding above it, using the same deflect() the 2D picture plots. That flow field is
// replicated at a couple of heights up a vertical cylinder — physically right, since a long cylinder
// in cross-flow has (almost) the same 2D pattern at every height — plus literal vortex rings that peel
// off and alternate sides downstream, which a flat wiggling dot trail cannot show.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const XSPAN = 4.2
const T_MAX = 8
const LANES = [-1.3, -0.6, 0.6, 1.3]
const LAYERS = [-0.6, 0.6]
const N_RINGS = 8

function deflect(R: number, shedding: boolean, wakeAmp: number, shedFreq: number, time: number, x: number, z0: number) {
  const bulge = (R * R * 1.6) / (R * R + x * x + z0 * z0)
  let z = z0 + Math.sign(z0 || 1) * bulge
  if (Math.abs(x) < R * 1.5 && Math.abs(z) < R * 1.08) z = Math.sign(z0 || 1) * R * 1.08
  if (x > R * 1.1 && shedding) {
    const k = (2 * Math.PI) / (2 * R * 1.4)
    const decay = Math.exp(-(x - R) / (6 * R))
    z += wakeAmp * Math.sin(k * (x - R) - 2 * Math.PI * shedFreq * time) * decay
  }
  return z
}

useThree(
  el,
  ({ scene, theme }) => {
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 24), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.8 }))
    scene.add(cyl)
    const lines = LAYERS.flatMap((y) => LANES.map((z0) => ({ y, z0, line: new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.6 })) })))
    lines.forEach((l) => scene.add(l.line))
    const dotGeo = new THREE.SphereGeometry(0.06, 8, 6)
    const dotMat = new THREE.MeshBasicMaterial({ color: theme.accent })
    const dots = new THREE.InstancedMesh(dotGeo, dotMat, lines.length)
    scene.add(dots)
    const ringMat = new THREE.MeshBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.85 })
    const rings = Array.from({ length: N_RINGS }, () => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 6, 16), ringMat)
      m.rotation.x = Math.PI / 2
      scene.add(m)
      return m
    })
    const m4 = new THREE.Matrix4()

    return (dt: number) => {
      const U = Math.max(0.2, props.params.U ?? 1.2)
      const R = Math.max(0.15, Math.min(1, props.params.R ?? 0.5))
      const nu = Math.max(0.0003, props.params.nu ?? 0.01)
      const time = Math.max(0, Math.min(T_MAX, props.params.t ?? 0))
      const Re = (2 * U * R) / nu
      const shedding = Re > 47
      const strouhal = shedding ? Math.max(0.05, Math.min(0.22, 0.2 * (1 - 21 / Re))) : 0
      const shedFreq = (strouhal * U) / (2 * R)
      const wakeAmp = R * 0.85 * Math.min(1, Math.max(0, (Re - 47) / 450))

      cyl.scale.set(R, 1, R)
      lines.forEach((l) => {
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= 24; i++) {
          const x = -XSPAN + (i / 24) * 2 * XSPAN
          pts.push(new THREE.Vector3(x, l.y, deflect(R, shedding, wakeAmp, shedFreq, time, x, l.z0)))
        }
        l.line.geometry.setFromPoints(pts)
      })
      lines.forEach((l, i) => {
        const cycle = ((time * (U / 2.6)) / (2 * XSPAN) + i / lines.length) % 1
        const x = -XSPAN + cycle * 2 * XSPAN
        m4.makeTranslation(x, l.y, deflect(R, shedding, wakeAmp, shedFreq, time, x, l.z0))
        dots.setMatrixAt(i, m4)
      })
      dots.instanceMatrix.needsUpdate = true

      rings.forEach((r, i) => {
        const phase = (time * U * 0.35 + i / N_RINGS) % 1
        const gen = Math.floor(time * U * 0.35 + i / N_RINGS)
        const side = gen % 2 === 0 ? 1 : -1
        r.position.set(R * 1.4 + phase * (XSPAN - R * 1.4), 0, side * wakeAmp * 1.4 * phase)
        r.scale.setScalar(0.6 + phase * 0.8)
        r.visible = shedding
      })

      if (dt > 0) emit('set', 't', (time + dt) % T_MAX)
    }
  },
  { camera: [6, 4, 8], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
