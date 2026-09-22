<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from './useThree'

// Gas particles in a glass box with a piston; params n (mol), T (K), V (L). Elastic wall bounces only.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(16, theme))
    const H = 3
    const D = 3
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1, H, D), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.35 }))
    glass.position.y = H / 2
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, H, D)), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.y = H / 2
    scene.add(edges)
    const piston = new THREE.Mesh(new THREE.BoxGeometry(0.25, H - 0.1, D - 0.1), new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.4, roughness: 0.5 }))
    piston.castShadow = true
    piston.position.y = H / 2
    scene.add(piston)
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3, 12), new THREE.MeshStandardMaterial({ color: theme.muted }))
    rod.rotation.z = Math.PI / 2
    rod.position.y = H / 2
    scene.add(rod)
    const MAX = 220
    const geo = new THREE.SphereGeometry(0.07, 10, 8)
    const mat = new THREE.MeshStandardMaterial({ color: theme.accent })
    const inst = new THREE.InstancedMesh(geo, mat, MAX)
    scene.add(inst)
    const P = Array.from({ length: MAX }, () => ({ p: new THREE.Vector3(Math.random(), Math.random() * H, (Math.random() - 0.5) * D), v: new THREE.Vector3().randomDirection() }))
    const m4 = new THREE.Matrix4()
    return (dt) => {
      const n = props.params.n ?? 1
      const T = props.params.T ?? 300
      const V = props.params.V ?? 25
      const W = 1 + (V / 50) * 7 // box length in scene units
      glass.scale.x = W
      glass.position.x = W / 2
      edges.scale.x = W
      edges.position.x = W / 2
      piston.position.x = W + 0.125
      rod.position.x = W + 1.6
      const count = Math.min(MAX, Math.round(n * 40))
      inst.count = count
      const speed = 2.2 * Math.sqrt(T / 300)
      for (let i = 0; i < count; i++) {
        const q = P[i]
        q.p.addScaledVector(q.v, speed * dt)
        if (q.p.x < 0.07 || q.p.x > W - 0.07) ((q.v.x *= -1), (q.p.x = THREE.MathUtils.clamp(q.p.x, 0.07, W - 0.07)))
        if (q.p.y < 0.07 || q.p.y > H - 0.07) ((q.v.y *= -1), (q.p.y = THREE.MathUtils.clamp(q.p.y, 0.07, H - 0.07)))
        if (q.p.z < -D / 2 + 0.07 || q.p.z > D / 2 - 0.07) ((q.v.z *= -1), (q.p.z = THREE.MathUtils.clamp(q.p.z, -D / 2 + 0.07, D / 2 - 0.07)))
        inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))
      }
      inst.instanceMatrix.needsUpdate = true
    }
  },
  { camera: [6, 5, 9], target: [4, 1.4, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
