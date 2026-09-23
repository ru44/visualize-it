<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same r_s = 2.95·x km as the 2D line plot (x = mass in solar masses), just turned into a sphere instead
// of a dot on a graph. The disc and the bent light rays are schematic (the 2D lesson has no such numbers
// to match), but they scale off the very same r_s, so a bigger horizon always bends light more and pulls
// the disc in tighter — the flat plot can only ever show the radius growing, not what that radius does.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const K = 0.045 // km → scene units

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const stars = new Float32Array(1200 * 3)
    for (let i = 0; i < stars.length; i++) stars[i] = (Math.random() - 0.5) * 260
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(stars, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.22 })))

    const horizon = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshBasicMaterial({ color: 0x000000 }))
    scene.add(horizon)
    const photonRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: theme.accent }))
    photonRing.rotation.x = Math.PI / 2
    scene.add(photonRing)
    const disc = new THREE.Mesh(new THREE.RingGeometry(1, 2, 64, 1), new THREE.MeshBasicMaterial({ color: 0xffb347, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }))
    disc.rotation.x = Math.PI / 2 + 0.2
    scene.add(disc)

    const N_RAYS = 5
    const rayMat = new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.9 })
    const rays = Array.from({ length: N_RAYS }, () => new THREE.Line(new THREE.BufferGeometry(), rayMat))
    rays.forEach((r) => scene.add(r))

    const OFFSETS = [0.05, 0.35, 0.8, 1.5, 2.6] // impact parameter offsets from the horizon, nearest first
    const buildRays = (radius: number) => {
      const SEG = 36
      for (let k = 0; k < N_RAYS; k++) {
        const b = radius * 1.2 + OFFSETS[k]
        const captured = b < radius * 1.55
        const theta = Math.min(2.4, (2.4 * radius) / b) // schematic bend angle, grows with r_s / b
        const xStart = -6
        const xEnd = captured ? -radius * 0.9 : 6
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= SEG; i++) {
          const u = i / SEG
          const x = xStart + u * (xEnd - xStart)
          const ease = 1 / (1 + Math.exp(-6 * (u - 0.55))) // 0 far away, ~1 well past closest approach
          const z = captured ? b - ease * (b - radius * 0.3) : b - ease * theta * b
          pts.push(new THREE.Vector3(x, 0, z))
        }
        rays[k].geometry.dispose()
        rays[k].geometry = new THREE.BufferGeometry().setFromPoints(pts)
      }
    }

    let radius = 0.3
    const update = () => {
      const rsKm = 2.95 * Math.max(0.1, Math.min(20, props.params.x ?? 1))
      radius = rsKm * K
      horizon.scale.setScalar(Math.max(radius, 0.05))
      photonRing.scale.setScalar(radius * 1.55)
      disc.geometry.dispose()
      disc.geometry = new THREE.RingGeometry(radius * 1.65 + 0.05, radius * 1.65 + 0.6, 64, 1)
      buildRays(radius)
    }
    update()
    watch(() => props.params.x, update)

    return (dt) => {
      disc.rotation.z += dt * 0.4
      photonRing.rotation.z += dt * 0.15
    }
  },
  { camera: [0, 5, 11], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
