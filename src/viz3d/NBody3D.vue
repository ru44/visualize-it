<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same gravity as the 2D lesson (softened, leapfrog, masses 900/15/m2) so distances and speeds match it
// exactly. The extra dimension only tilts the third body's orbital plane by a fixed inclination around the
// x-axis (a rotation about the origin, so its distance from the star is unchanged): the star and first
// planet stay in one flat plane, the third body's plane crosses it at two nodes on the x-axis. That is
// enough to show a real n-body orbit is not flat, and — once m2 is large — that its path never closes.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const DT = 0.06
const INCL = 0.56 // rad, ~32°: fixed tilt of the third body's orbital plane
const S = 0.045 // sim units → scene units

interface Body { m: number; x: number; y: number; vx: number; vy: number }

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x0b0f1a)
    const stars = new Float32Array(900 * 3)
    for (let i = 0; i < stars.length; i++) stars[i] = (Math.random() - 0.5) * 220
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(stars, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })))

    const COLORS = [theme.accent2, theme.accent, theme.pos]
    const RADII = [0.55, 0.22, 0.2]
    const meshes = [0, 1, 2].map((i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(RADII[i], 20, 14), i === 0 ? new THREE.MeshBasicMaterial({ color: COLORS[i] }) : new THREE.MeshStandardMaterial({ color: COLORS[i] }))
      scene.add(m)
      return m
    })
    scene.add(new THREE.PointLight(0xffffff, 40, 0, 1.2))
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 65 }, (_, i) => new THREE.Vector3(4.95 * Math.cos((i / 64) * 2 * Math.PI), 0, 4.95 * Math.sin((i / 64) * 2 * Math.PI)))), new THREE.LineBasicMaterial({ color: theme.grid, transparent: true, opacity: 0.4 }))
    scene.add(ring)
    const trail1 = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: COLORS[1] }))
    const trail2 = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: COLORS[2] }))
    scene.add(trail1, trail2)

    let bodies: Body[] = []
    let hist1: THREE.Vector3[] = []
    let hist2: THREE.Vector3[] = []
    let stepAcc = 0
    let stepCount = 0
    const MAX_STEPS = 2400
    const TRAIL_LEN = 320

    const accel = (i: number) => {
      let ax = 0
      let ay = 0
      for (let j = 0; j < bodies.length; j++) {
        if (j === i) continue
        const dx = bodies[j].x - bodies[i].x
        const dy = bodies[j].y - bodies[i].y
        const r2 = dx * dx + dy * dy + 4
        const r = Math.sqrt(r2)
        ax += (bodies[j].m * dx) / (r2 * r)
        ay += (bodies[j].m * dy) / (r2 * r)
      }
      return { ax, ay }
    }

    const reset = () => {
      const n = (Math.round(props.params.n ?? 3) >= 3 ? 3 : 2)
      const m2 = Math.max(0.001, Math.min(400, props.params.m2 ?? 120))
      bodies = [{ m: 900, x: 0, y: 0, vx: 0, vy: 0 }, { m: 15, x: 110, y: 0, vx: 0, vy: Math.sqrt(900 / 110) }]
      if (n === 3) bodies.push({ m: m2, x: 0, y: -190, vx: Math.sqrt(900 / 190) * 1.05, vy: 0 })
      meshes[2].visible = n === 3
      hist1 = []
      hist2 = []
      stepCount = 0
    }
    reset()
    watch(() => [props.params.n, props.params.m2], reset)

    // sim (x, y) → scene position; body 2 (index 2) is rotated INCL around the x-axis so |pos| from the
    // star is preserved (same r2 the 2D lesson would read) but it lifts out of the ecliptic.
    const place = (b: Body, tilt: boolean) => {
      const x = b.x * S
      const z = b.y * S
      return tilt ? new THREE.Vector3(x, z * Math.sin(INCL), z * Math.cos(INCL)) : new THREE.Vector3(x, 0, z)
    }

    return (dt) => {
      let acc = bodies.map((_, i) => accel(i))
      stepAcc += dt * (700 / 22)
      while (stepAcc >= 1 && stepCount < MAX_STEPS) {
        for (let i = 0; i < bodies.length; i++) { bodies[i].vx += 0.5 * acc[i].ax * DT; bodies[i].vy += 0.5 * acc[i].ay * DT; bodies[i].x += bodies[i].vx * DT; bodies[i].y += bodies[i].vy * DT }
        acc = bodies.map((_, i) => accel(i))
        for (let i = 0; i < bodies.length; i++) { bodies[i].vx += 0.5 * acc[i].ax * DT; bodies[i].vy += 0.5 * acc[i].ay * DT }
        stepAcc -= 1
        stepCount++
      }
      if (stepCount >= MAX_STEPS) reset()

      meshes[0].position.copy(place(bodies[0], false))
      meshes[1].position.copy(place(bodies[1], false))
      hist1.push(place(bodies[1], false))
      if (hist1.length > TRAIL_LEN) hist1.shift()
      trail1.geometry.setFromPoints(hist1)
      if (bodies.length === 3) {
        const p2 = place(bodies[2], true)
        meshes[2].position.copy(p2)
        hist2.push(p2)
        if (hist2.length > TRAIL_LEN) hist2.shift()
        trail2.geometry.setFromPoints(hist2)
      } else {
        trail2.geometry.setFromPoints([])
      }
    }
  },
  { camera: [9, 7, 6], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
