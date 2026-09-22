<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from './useThree'

// A mass hanging from a spring, x(t) = A cos(ωt) with ω = √(k/m); the slider x is time.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(12, theme))
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 1), new THREE.MeshStandardMaterial({ color: theme.muted }))
    beam.position.y = 6
    scene.add(beam)
    // Fallback coil.
    const coil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 80 }, (_, i) => new THREE.Vector3(0.35 * Math.cos(i * 0.6), i / 79, 0.35 * Math.sin(i * 0.6)))), 200, 0.04, 8), new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.6, roughness: 0.4 }))
    scene.add(coil)
    const mass = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5 }))
    mass.castShadow = true
    scene.add(mass)
    const eq = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.55, 32), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    eq.rotation.x = -Math.PI / 2
    scene.add(eq)
    const trail = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent }))
    scene.add(trail)
    const hist: number[] = []
    return () => {
      const A = props.params.A ?? 1
      const k = props.params.k ?? 4
      const m = props.params.m ?? 1
      const t = props.params.x ?? 0
      const w = Math.sqrt(k / m)
      const rest = 3 // equilibrium height of the mass centre
      const y = rest - A * Math.cos(w * t) // scene: +A means stretched downward at t = 0
      mass.position.set(0, y, 0)
      mass.scale.setScalar(Math.cbrt(m) * 0.9)
      eq.position.set(0, rest, 0)
      const len = 6 - 0.1 - (y + 0.4 * mass.scale.y)
      coil.position.y = y + 0.4 * mass.scale.y
      coil.scale.y = len
      hist.push(y)
      if (hist.length > 240) hist.shift()
      trail.geometry.setFromPoints(hist.map((h, i) => new THREE.Vector3(1.5 + (i / 240) * 6, h, 0)))
    }
  },
  { camera: [7, 5, 11], target: [2.5, 3, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
