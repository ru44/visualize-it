<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same h(x) = A·cos(2π(x−t0)/12.42) + B·cos(2πx/12) as the 2D line plot, read off a marker fixed to
// Earth's surface. The water shell is stretched into two bulges that stay aimed at the Moon (lunar term)
// and at a fixed "sun" direction (solar term) while Earth spins underneath at its real 24 h rate — that
// spin, not the Moon's slow crawl, is why the marker passes through both bulges roughly twice a day. A flat
// plot can show the sum; only turning the Earth inside the bulge shows why there are two humps, not one.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const R = 1 // Earth radius, scene units
const ENV_R = 1.5 // resting water-shell radius
const K = 0.3 // metres → scene units for the bulge

useThree(
  el,
  ({ scene, theme }) => {
    // Follow the site's panel colour like every other scene, instead of a fixed night sky.
    scene.background = theme.sunken.clone()
    const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 40, 28), new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.85 }))
    scene.add(earth)
    const marker = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 10), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
    marker.rotation.z = Math.PI / 2
    earth.add(marker)

    const envGeo = new THREE.SphereGeometry(ENV_R, 44, 24)
    const posAttr = envGeo.attributes.position as THREE.BufferAttribute
    const dirs = new Float32Array(posAttr.array.length)
    for (let i = 0; i < posAttr.count; i++) dirs.set([posAttr.getX(i) / ENV_R, posAttr.getY(i) / ENV_R, posAttr.getZ(i) / ENV_R], i * 3)
    const envelope = new THREE.Mesh(envGeo, new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.35, roughness: 0.15, transmission: 0.55, side: THREE.DoubleSide }))
    scene.add(envelope)

    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 14), new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 1 }))
    scene.add(moon)
    scene.add(new THREE.PointLight(0xffffff, 25, 0, 1.2))
    const MOON_R = 4.2
    const moonOrbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 65 }, (_, i) => new THREE.Vector3(MOON_R * Math.cos((i / 64) * 2 * Math.PI), 0, MOON_R * Math.sin((i / 64) * 2 * Math.PI)))), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.4 }))
    scene.add(moonOrbit)

    let lastSig = ''
    const updateEnvelope = (A: number, B: number, moonBearing: number) => {
      const Ascaled = A * K
      const Bscaled = B * K
      for (let i = 0; i < posAttr.count; i++) {
        const dx = dirs[i * 3]
        const dy = dirs[i * 3 + 1]
        const dz = dirs[i * 3 + 2]
        const angle = Math.atan2(dz, dx)
        const r = ENV_R + Ascaled * Math.cos(2 * (angle - moonBearing)) + Bscaled * Math.cos(2 * angle) // solar bulge fixed at bearing 0
        posAttr.setXYZ(i, dx * r, dy * r, dz * r)
      }
      posAttr.needsUpdate = true
      envGeo.computeVertexNormals()
    }

    return () => {
      const A = Math.max(0, Math.min(3, props.params.A ?? 1.5))
      const B = Math.max(0, Math.min(1.5, props.params.B ?? 0.5))
      const t0 = props.params.t0 ?? 2
      const x = Math.max(0, Math.min(48, props.params.x ?? 6))
      const earthAngle = (Math.PI * x) / 12 // 24 h rotation
      const moonBearing = earthAngle - (Math.PI * (x - t0)) / 12.42
      earth.rotation.y = earthAngle
      moon.position.set(MOON_R * Math.cos(moonBearing), 0, MOON_R * Math.sin(moonBearing))
      moon.lookAt(0, 0, 0)
      const h = A * Math.cos((2 * Math.PI * (x - t0)) / 12.42) + B * Math.cos((2 * Math.PI * x) / 12) // exactly the 2D lesson's formula
      marker.position.set(R + 0.14 + h * K, 0, 0)

      const sig = `${A}|${B}|${t0}|${x}`
      if (sig !== lastSig) {
        lastSig = sig
        updateEnvelope(A, B, moonBearing)
      }
    }
  },
  { camera: [0, 4.5, 9.5], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
