<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// The transit seen from the side: a real, opaque planet orbiting a real, opaque star, rendered with correct
// depth. Viewed edge-on (the default camera here) the planet visibly passes in front of the star's disc —
// exactly the alignment a transit needs. Rotate to look down on the orbit and the planet just circles beside
// the star instead: the flat 2D light curve can show THAT a transit happens, but not WHY only edge-on systems
// show one. Sizes use the same Rp/Rs ratio as ExoplanetTransits.vue, floored so the planet stays visible.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const R_EARTH_KM = 6371
const R_SUN_KM = 696000
const ORBIT_R = 4.6
const STAR_R = 1.3

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const stars = new Float32Array(700 * 3)
    for (let i = 0; i < stars.length; i++) stars[i] = (Math.random() - 0.5) * 120
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(stars, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })))

    const star = new THREE.Mesh(new THREE.SphereGeometry(STAR_R, 40, 28), new THREE.MeshBasicMaterial({ color: 0xffe08a }))
    scene.add(star)
    const glow = new THREE.PointLight(0xfff2c8, 2.4, 60)
    star.add(glow)

    const orbitPts: THREE.Vector3[] = []
    for (let i = 0; i <= 96; i++) orbitPts.push(new THREE.Vector3(ORBIT_R * Math.cos((i / 96) * 2 * Math.PI), 0, ORBIT_R * Math.sin((i / 96) * 2 * Math.PI)))
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbitPts), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.35 })))

    const planetGeo = new THREE.SphereGeometry(1, 32, 22)
    const planetMat = new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.9 })
    const planet = new THREE.Mesh(planetGeo, planetMat)
    scene.add(planet)

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let theta = 0
    return (dt: number) => {
      const Rp = Math.max(0.1, props.params.Rp ?? 1)
      const Rs = Math.max(0.05, props.params.Rs ?? 1)
      const ratio = (Rp * R_EARTH_KM) / (Rs * R_SUN_KM)
      planet.scale.setScalar(Math.max(0.07, STAR_R * ratio))
      theta += reduced ? 0 : dt * 0.5
      planet.position.set(ORBIT_R * Math.cos(theta), 0, ORBIT_R * Math.sin(theta))
    }
  },
  { camera: [0, 1.1, 9.5], target: [0, 0, 0], fov: 40 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
