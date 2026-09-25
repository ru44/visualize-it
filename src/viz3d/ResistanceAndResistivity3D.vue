<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'

// electricity/resistance-and-resistivity. Same params (L, A, mat) and same R = rho·L/A as the 2D
// picture. The flat picture draws the wire as a flat rectangle; here it is a real cylinder in 3D, so
// changing the length and thickness sliders visibly stretches and thickens an actual solid wire, and
// orbiting around it shows the cross-section area the flat picture can only ever draw as one edge-on view.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const RHO_COPPER = 1.68e-8
const RHO_NICHROME = 1.1e-6

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.CylinderGeometry(1, 1, 1, 28, 1)
    geo.rotateZ(Math.PI / 2)
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.5 })
    const wire = new THREE.Mesh(geo, mat)
    wire.castShadow = true
    scene.add(wire)

    const capL = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), mat)
    const capR = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), mat)
    scene.add(capL, capR)

    const tag = label('', undefined, 0.45)
    tag.position.set(0, 1.8, 0)
    scene.add(tag)
    let lastText = ''

    return () => {
      const L = Math.max(props.params.L ?? 1, 0.05)
      const A = Math.max(props.params.A ?? 1, 0.02)
      const isNichrome = (props.params.mat ?? 0) >= 0.5
      const rho = isNichrome ? RHO_NICHROME : RHO_COPPER
      const R = (rho * L) / (A * 1e-6)

      const visualLen = 1.2 + (L / 5) * 4.5
      const radius = 0.08 + Math.sqrt(A) * 0.18

      wire.scale.set(visualLen, radius, radius)
      capL.position.set(-visualLen / 2, 0, 0)
      capR.position.set(visualLen / 2, 0, 0)
      capL.scale.setScalar(radius)
      capR.scale.setScalar(radius)
      mat.color.copy(isNichrome ? theme.accent2 : theme.accent)

      tag.position.set(0, radius + 1.1, 0)
      const text = `R = ${R < 1 ? R.toFixed(4) : R.toFixed(2)} Ω`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.font = '600 26px Inter, sans-serif'
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.textAlign = 'center'
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [3.5, 2.6, 5], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
