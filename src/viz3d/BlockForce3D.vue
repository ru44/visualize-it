<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow } from './useThree'
import { loadModel, fit } from './models'

// A crate pushed along the floor with F = ma. params F (N), m (kg).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(30, theme))
    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
    box.castShadow = true
    scene.add(box)
    loadModel('crate').then((m) => m && ((box.visible = false), scene.add(fit(m, 1)), (box.userData.model = m)))
    const force = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    const accel = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.pos)
    scene.add(force, accel)
    // Ticks every metre so speed is visible.
    for (let i = -14; i <= 14; i++) {
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.6), new THREE.MeshBasicMaterial({ color: theme.muted }))
      tick.position.set(i, 0.01, 1.2)
      scene.add(tick)
    }
    let x = -7
    let vel = 0
    watch(() => [props.params.F, props.params.m], () => ((x = -7), (vel = 0)))
    return (dt) => {
      const F = props.params.F ?? 10
      const m = props.params.m ?? 2
      const a = F / m
      vel += a * dt * 0.6
      x += vel * dt * 0.6
      if (x > 12) ((x = -7), (vel = 0))
      const side = Math.cbrt(m) * 0.7
      box.scale.setScalar(side)
      box.position.set(x, side / 2, 0)
      const bm = box.userData.model as THREE.Object3D | undefined
      if (bm) (bm.scale.setScalar(side), bm.position.set(x, 0, 0))
      force.position.set(x - side / 2 - Math.max(0.3, F * 0.06), side / 2, 0)
      force.setLength(Math.max(0.3, F * 0.06), 0.3, 0.2)
      accel.position.set(x, side + 0.4, 0)
      accel.setLength(Math.max(0.2, a * 0.25), 0.3, 0.2)
    }
  },
  { camera: [1, 6, 15], target: [2, 0.6, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
