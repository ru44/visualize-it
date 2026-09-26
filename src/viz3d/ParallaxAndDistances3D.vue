<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// The shifting star against the background: Earth orbits the Sun, and the near star's on-screen position
// wobbles in step with it (amplitude set by the same parallax angle p as the 2D picture), while a genuinely
// distant backdrop of stars stays put. That depth difference is real 3D perspective — something a flat
// diagram can only fake with drawn angle lines, but here the viewer can orbit the camera and watch true
// motion parallax between the near star and the far backdrop for themselves.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const STAR_Z = -15

function starfield(radius: number, n: number, size: number) {
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(radius * (0.85 + Math.random() * 0.15))
    p[i * 3] = v.x
    p[i * 3 + 1] = Math.abs(v.y) * 0.6 + 1
    p[i * 3 + 2] = v.z
  }
  return new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3)), new THREE.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: true }))
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    scene.add(starfield(46, 900, 0.22)) // the fixed, distant backdrop

    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffe08a }))
    scene.add(sun)
    sun.add(new THREE.PointLight(0xffffff, 1.5, 30))
    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent }))
    scene.add(earth)
    const orbit = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.4 }))
    scene.add(orbit)

    const nearStar = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16), new THREE.MeshBasicMaterial({ color: 0xcddcff }))
    nearStar.position.set(0, 1.6, STAR_Z)
    nearStar.add(new THREE.PointLight(0xcddcff, 0.9, 6))
    scene.add(nearStar)

    const sight = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.3 }))
    scene.add(sight)

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let theta = 0
    let lastOrbitR = -1
    return (dt: number) => {
      const p = Math.max(0.001, props.params.p ?? 0.3)
      const baseline = Math.max(0.1, props.params.baseline ?? 1)
      const orbitR = 1.4 + 1.1 * Math.log10(baseline + 1)
      const amp = 0.3 + 2.2 * Math.sqrt(p)

      if (Math.abs(orbitR - lastOrbitR) > 1e-4) {
        lastOrbitR = orbitR
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= 72; i++) pts.push(new THREE.Vector3(orbitR * Math.cos((i / 72) * 2 * Math.PI), 0, orbitR * Math.sin((i / 72) * 2 * Math.PI)))
        orbit.geometry.setFromPoints(pts)
      }

      theta += reduced ? 0 : dt * 0.7
      earth.position.set(orbitR * Math.cos(theta), 0, orbitR * Math.sin(theta))
      nearStar.position.set(amp * Math.cos(theta), 1.6 + amp * 0.3 * Math.sin(theta), STAR_Z)
      const sp = [earth.position.clone(), nearStar.position.clone()]
      sight.geometry.setFromPoints(sp)
    }
  },
  { camera: [0, 8, 18], target: [0, 0.5, -3], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
