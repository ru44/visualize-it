<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { fmt } from '../engine/math'

// nuclear/nuclear-reactor. Same params (rods, moderator, both %) and the same
// power = P0*(1-rods/100)*(moderator/100) as src/viz/NuclearReactor.vue. The flat core diagram can
// show rods sliding and a water level, but not why the moderator matters: here neutrons visibly
// slow down the moment they enter the water (short, jittery steps) and speed back up above it (long
// dashes), because being slow is exactly what lets uranium-235 catch them.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P0 = 1000
const VW = 1.6, VD = 1.6, VH = 2.0
const N = 10
const RODS = [
  [-0.45, -0.45], [0.5, 0.1], [-0.1, 0.55],
]
const FUEL: [number, number][] = []
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) FUEL.push([(i - 1.5) * 0.32, (j - 1.5) * 0.32])

function paintLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 22px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(6, theme))
    const vessel = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, VH, 24, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.08, thickness: 0.2, transparent: true, opacity: 0.18, side: THREE.DoubleSide }))
    vessel.position.y = VH / 2
    scene.add(vessel)

    const water = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 24), new THREE.MeshPhysicalMaterial({ color: theme.accent2, transmission: 0.6, roughness: 0.15, transparent: true, opacity: 0.35 }))
    scene.add(water)

    const fuelGeo = new THREE.CylinderGeometry(0.05, 0.05, VH, 8)
    const fuelMat = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.15 })
    const fuel = new THREE.InstancedMesh(fuelGeo, fuelMat, FUEL.length)
    const m4 = new THREE.Matrix4()
    FUEL.forEach(([x, z], i) => { m4.makeTranslation(x, VH / 2, z); fuel.setMatrixAt(i, m4) })
    fuel.instanceMatrix.needsUpdate = true
    scene.add(fuel)

    const rodGeo = new THREE.CylinderGeometry(0.08, 0.08, VH, 10)
    const rodMat = new THREE.MeshStandardMaterial({ color: theme.neg, emissive: theme.neg, emissiveIntensity: 0.3 })
    const rods = RODS.map(([x, z]) => { const m = new THREE.Mesh(rodGeo, rodMat); m.position.set(x, VH / 2, z); scene.add(m); return m })

    const nGeo = new THREE.SphereGeometry(0.045, 8, 6)
    const fastMat = new THREE.MeshStandardMaterial({ color: theme.muted, emissive: theme.muted, emissiveIntensity: 0.2 })
    const slowMat = new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.35 })
    const rnd = (() => { let s = 20260301; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) })()
    const dots = Array.from({ length: N }, () => {
      const m = new THREE.Mesh(nGeo, fastMat)
      m.position.set((rnd() - 0.5) * VW, rnd() * VH, (rnd() - 0.5) * VD)
      scene.add(m)
      return m
    })
    const vel = Array.from({ length: N }, () => new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize())

    const tag = label('', theme.pos.getStyle(), 0.3)
    scene.add(tag)

    return (dt: number) => {
      const rodsPct = Math.max(0, Math.min(100, props.params.rods ?? 50))
      const moderatorPct = Math.max(0, Math.min(100, props.params.moderator ?? 80))
      const insertion = rodsPct / 100
      const fillH = (moderatorPct / 100) * VH

      rods.forEach((r) => (r.position.y = VH / 2 + (1 - insertion) * VH))
      water.scale.set(0.98, Math.max(0.001, fillH), 0.98)
      water.position.y = fillH / 2

      for (let i = 0; i < N; i++) {
        const inWater = dots[i].position.y < fillH
        const speed = inWater ? 0.35 : 1.1
        dots[i].position.addScaledVector(vel[i], speed * dt)
        const hx = VW / 2, hz = VD / 2
        if (dots[i].position.x < -hx || dots[i].position.x > hx) vel[i].x *= -1
        if (dots[i].position.z < -hz || dots[i].position.z > hz) vel[i].z *= -1
        if (dots[i].position.y < 0.05 || dots[i].position.y > VH - 0.05) vel[i].y *= -1
        dots[i].position.x = THREE.MathUtils.clamp(dots[i].position.x, -hx, hx)
        dots[i].position.z = THREE.MathUtils.clamp(dots[i].position.z, -hz, hz)
        dots[i].position.y = THREE.MathUtils.clamp(dots[i].position.y, 0.05, VH - 0.05)
        dots[i].material = inWater ? slowMat : fastMat
      }

      const powerPct = (1 - rodsPct / 100) * (moderatorPct / 100) * 100
      tag.position.set(0, VH + 0.5, 0)
      paintLabel(tag, `${fmt(powerPct, 0)}% · ${fmt((powerPct / 100) * P0, 0)} MW`, theme.pos)
    }
  },
  { camera: [3.2, 2.6, 3.6], target: [0, 0.9, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
