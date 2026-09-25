<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// What the flat side view (aerodynamics/helicopters-and-rotors) cannot show: the disc is a full
// circle spinning fast enough to blur into a solid-looking plane, tilting in 3D with the
// swashplate, and the downwash is a genuine 3D cone of air spreading out beneath it, not a flat
// fan of lines. Same params (R, W, tilt) and the same momentum-theory v_i as the 2D picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const RHO = 1.225
const SCALE = 1 / 3.2 // metres -> scene units

useThree(
  el,
  ({ scene, theme }) => {
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 1.1, 6, 14), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.55 }))
    body.rotation.z = Math.PI / 2
    body.position.y = -0.15
    body.castShadow = true
    scene.add(body)

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), new THREE.MeshStandardMaterial({ color: theme.muted }))
    scene.add(mast)

    const discGroup = new THREE.Group()
    scene.add(discGroup)
    const discGeo = new THREE.CylinderGeometry(1, 1, 0.015, 48)
    const disc = new THREE.Mesh(discGeo, new THREE.MeshStandardMaterial({ color: theme.accent, transparent: true, opacity: 0.28, roughness: 0.4 }))
    discGroup.add(disc)
    const blades = [0, 1, 2, 3].map((i) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.02, 0.09), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }))
      b.rotation.y = (i * Math.PI) / 2
      discGroup.add(b)
      return b
    })

    const grid = new THREE.GridHelper(20, 20, theme.line, theme.grid)
    grid.position.y = -3
    scene.add(grid)

    // Downwash: a widening cone of particles streaming down from the disc.
    const N = 260
    const seed = Array.from({ length: N }, () => ({ ang: Math.random() * Math.PI * 2, r0: Math.random(), s: Math.random() }))
    const posArr = new Float32Array(N * 3)
    const flow = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(posArr, 3)),
      new THREE.PointsMaterial({ color: theme.accent, size: 0.05, transparent: true, opacity: 0.7 }),
    )
    scene.add(flow)

    let radiusScene = 1
    return (dt, t0) => {
      const R = Math.max(0.1, props.params.R ?? 3.84)
      const weight = Math.max(1, props.params.W ?? 6076)
      const tiltDeg = props.params.tilt ?? 0
      const tiltRad = (tiltDeg * Math.PI) / 180
      const A = Math.PI * R * R
      const thrust = weight / Math.cos(tiltRad)
      const vi = Math.sqrt(thrust / (2 * RHO * A))

      radiusScene = Math.max(0.4, R * SCALE)
      discGroup.scale.setScalar(radiusScene)
      discGroup.position.y = 0.42
      discGroup.rotation.z = tiltRad
      mast.position.y = 0.22
      const spin = 6 + vi * 0.3
      blades.forEach((b, i) => (b.rotation.y = (i * Math.PI) / 2 + t0 * spin))

      const speed = 0.6 + vi * 0.09
      const dir = new THREE.Vector3(Math.sin(tiltRad), -Math.cos(tiltRad), 0)
      const hubY = 0.42
      for (let i = 0; i < N; i++) {
        const s = (seed[i].s + t0 * speed * 0.15) % 1
        const spread = radiusScene * (0.3 + s * 1.3)
        const a = seed[i].ang
        const x = Math.cos(a) * spread * seed[i].r0
        const z = Math.sin(a) * spread * seed[i].r0
        const drop = s * 2.6
        posArr[i * 3] = x + dir.x * drop
        posArr[i * 3 + 1] = hubY + dir.y * drop
        posArr[i * 3 + 2] = z
      }
      ;(flow.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
  },
  { camera: [6.5, 3.6, 6.5], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
