<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow } from './useThree'

// Earth with a satellite; the 2D lesson's slider x = distance from Earth's centre in thousands of km.
// Gravity g = GM/r² shrinks with distance; the orbital speed for a circle at that radius is √(GM/r).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const GM = 3.986e14
const R_EARTH = 6371 // km

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x0b0f1a)
    const stars = new Float32Array(1500 * 3)
    for (let i = 0; i < stars.length; i++) stars[i] = (Math.random() - 0.5) * 300
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(stars, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 })))
    const S = 2 / R_EARTH // km → scene units: Earth radius = 2
    const earth = new THREE.Mesh(new THREE.SphereGeometry(2, 48, 32), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.8 }))
    scene.add(earth)
    scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(2.005, 24, 12)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })))
    const sat = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0xffffff }))
    scene.add(sat)
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.3), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
    sat.add(panel)
    const orbit = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.muted }))
    scene.add(orbit)
    const gArrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.neg)
    const vArrow = arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1, theme.pos)
    scene.add(gArrow, vArrow)
    let theta = 0
    return (dt) => {
      const rKm = Math.max(R_EARTH + 200, (props.params.x ?? 6.4) * 1000)
      const r = rKm * S
      const g = GM / (rKm * 1000) ** 2 // m/s²
      const vOrb = Math.sqrt(GM / (rKm * 1000)) // m/s
      // angular speed exaggerated so an orbit takes ~8 s at LEO, scaling with Kepler (T ∝ r^1.5)
      theta += dt * (2 * Math.PI / 8) * Math.pow(6.6 / (rKm / 1000), 1.5)
      sat.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
      sat.lookAt(0, 0, 0)
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 128; i++) pts.push(new THREE.Vector3(r * Math.cos((i / 128) * 2 * Math.PI), 0, r * Math.sin((i / 128) * 2 * Math.PI)))
      orbit.geometry.setFromPoints(pts)
      gArrow.position.copy(sat.position)
      gArrow.setDirection(sat.position.clone().negate().normalize())
      gArrow.setLength(Math.min(3, g * 0.3) + 0.1, 0.3, 0.15)
      vArrow.position.copy(sat.position)
      vArrow.setDirection(new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta)))
      vArrow.setLength(vOrb / 4000 + 0.1, 0.3, 0.15)
      const m = earth.userData.model as THREE.Object3D | undefined
      if (m) m.rotation.y += dt * 0.1
      else earth.rotation.y += dt * 0.1
    }
  },
  { camera: [0, 9, 18], target: [0, 0, 0], fov: 40 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
