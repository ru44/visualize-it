<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Gravity as curved space: a heavy star dents a stretchy sheet and a planet rolls around the dent.
// params M (star mass, 1..10), x (orbit radius, 2..8).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x0b0f1a)
    const N = 90
    const geo = new THREE.PlaneGeometry(22, 22, N, N)
    geo.rotateX(-Math.PI / 2)
    const base = Float32Array.from(geo.attributes.position.array as Float32Array)
    const sheet = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.55 }))
    scene.add(sheet)
    const star = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(star)
    scene.add(new THREE.PointLight(0xffffff, 40, 0, 1.2))
    const planet = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), new THREE.MeshStandardMaterial({ color: theme.pos }))
    scene.add(planet)
    const depth = (r: number, M: number) => (-M * 0.55) / Math.sqrt(r * r + 0.9)
    let lastM = -1
    let theta = 0
    return (dt) => {
      const M = props.params.M ?? 5
      const R = props.params.x ?? 5
      if (M !== lastM) {
        const src = new THREE.PlaneGeometry(22, 22, N, N)
        src.rotateX(-Math.PI / 2)
        const p = src.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < p.count; i++) p.setY(i, depth(Math.hypot(base[i * 3], base[i * 3 + 2]), M))
        sheet.geometry.dispose()
        sheet.geometry = new THREE.WireframeGeometry(src)
        src.dispose()
        star.scale.setScalar(0.6 + M * 0.06)
        star.position.y = depth(0, M) + 0.3
        lastM = M
      }
      theta += dt * Math.sqrt(M / R ** 3) * 3
      planet.position.set(R * Math.cos(theta), depth(R, M) + 0.3, R * Math.sin(theta))
    }
  },
  { camera: [0, 9, 14], target: [0, -1.5, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
