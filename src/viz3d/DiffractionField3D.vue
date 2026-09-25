<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// content/lessons/waves/diffraction. The 2D picture draws a schematic cone at the estimated
// spreading half-angle theta = asin(lambda/a). This scene instead sums real Huygens point sources
// across the gap (same a, lambda) into an actual height field behind it, showing the genuine
// interference fringes the flat cone diagram only approximates.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const XLEN = 8 // world metres downrange
const ZLEN = 8 // world metres lateral
const NX = 56
const NZ = 40
const NSRC = 9

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.PlaneGeometry(XLEN, ZLEN, NX, NZ)
    geo.rotateX(-Math.PI / 2)
    const count = (geo.attributes.position as THREE.BufferAttribute).count
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    const field = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, side: THREE.DoubleSide }))
    field.position.x = XLEN / 2
    scene.add(field)
    scene.add(new THREE.GridHelper(XLEN, 8, theme.line, theme.grid).translateX(XLEN / 2).translateY(-0.8))

    const barrierMat = new THREE.MeshStandardMaterial({ color: theme.muted })
    const barL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.4, ZLEN), barrierMat)
    const barR = barL.clone()
    scene.add(barL, barR)

    const srcMarkers = Array.from({ length: NSRC }, () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
      scene.add(m)
      return m
    })

    const scratch = new THREE.Color()
    let clock = 0
    return (dt) => {
      const a = props.params.a ?? 1
      const lambda = props.params.lambda ?? 0.7
      const k = (2 * Math.PI) / lambda
      clock += dt * 1.6

      const half = Math.min(ZLEN / 2 - 0.1, a / 2)
      barL.position.set(0, 0.5, -(ZLEN / 2 + half) / 2)
      barL.scale.z = (ZLEN / 2 - half) / ZLEN
      barR.position.set(0, 0.5, (ZLEN / 2 + half) / 2)
      barR.scale.z = (ZLEN / 2 - half) / ZLEN

      const srcZ: number[] = []
      for (let i = 0; i < NSRC; i++) srcZ.push(-half + (i / (NSRC - 1)) * 2 * half)
      srcMarkers.forEach((m, i) => m.position.set(0.05, 0.5, srcZ[i]!))

      const pos = geo.attributes.position as THREE.BufferAttribute
      const col = geo.attributes.color as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const wx = pos.getX(i) + XLEN / 2
        const wz = -pos.getZ(i)
        let sum = 0
        for (const sz of srcZ) {
          const r = Math.hypot(wx, wz - sz)
          sum += Math.sin(k * r - clock) / Math.sqrt(1 + r)
        }
        const h = (0.5 * sum) / Math.sqrt(NSRC)
        pos.setY(i, h)
        const amt = Math.min(1, Math.abs(h) / 0.35)
        scratch.copy(theme.sunken).lerp(h >= 0 ? theme.pos : theme.neg, amt * 0.8)
        col.setXYZ(i, scratch.r, scratch.g, scratch.b)
      }
      pos.needsUpdate = true
      col.needsUpdate = true
      geo.computeVertexNormals()
    }
  },
  { camera: [1.5, 6, 9], target: [4, 0, 0], fov: 44 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
