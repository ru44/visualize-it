<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { fmt } from '../engine/math'

// physics/nuclear/medical-isotopes. Same hours/isotope params and the same 0.5^(hours/halfLife)
// decay law as src/viz/MedicalIsotopes.vue. A simplified body shows WHERE each tracer actually
// gathers — technetium-99m spread widely through the skeleton for a bone scan, iodine-131
// concentrated tightly at the thyroid in the throat — something a flat decay curve cannot show.
// Each glowing hotspot fades and shrinks over the hours slider, tracking the same fraction
// remaining as the 2D chart's marker.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const HALF_LIFE = [6, 192.48]

// Approximate skeleton points for a Tc-99m bone scan, and the throat point for I-131.
const TC_SPOTS: [number, number, number][] = [
  [0, 1.58, 0], [-0.22, 1.15, 0], [0.22, 1.15, 0], [-0.22, 0.62, 0.03], [0.22, 0.62, 0.03],
  [-0.14, 0.12, 0.02], [0.14, 0.12, 0.02], [0, 0.95, 0.05], [0, 1.3, 0.03],
]
const I_SPOTS: [number, number, number][] = [[-0.05, 1.42, 0.08], [0.05, 1.42, 0.08]]

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 24px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(6, theme))
    const skin = new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.9 })
    const body = new THREE.Group()
    body.add(new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), skin).translateY(1.58))
    body.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.55, 4, 10), skin).translateY(1.15))
    const legGeo = new THREE.CapsuleGeometry(0.09, 0.65, 4, 8)
    for (const s of [-1, 1]) body.add(new THREE.Mesh(legGeo, skin).translateX(s * 0.12).translateY(0.4))
    const armGeo = new THREE.CapsuleGeometry(0.07, 0.5, 4, 8)
    for (const s of [-1, 1]) {
      const arm = new THREE.Mesh(armGeo, skin)
      arm.position.set(s * 0.32, 1.15, 0)
      arm.rotation.z = s * 0.25
      body.add(arm)
    }
    body.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(body)

    const glowGeo = new THREE.SphereGeometry(0.07, 12, 10)
    const makeGlow = (p: [number, number, number]) => {
      const mat = new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 1 })
      const m = new THREE.Mesh(glowGeo, mat)
      m.position.set(...p)
      scene.add(m)
      return m
    }
    const tcGlows = TC_SPOTS.map(makeGlow)
    const iGlows = I_SPOTS.map((p) => { const g = makeGlow(p); g.scale.setScalar(1.6); return g })

    const tag = label('', theme.fg.getStyle(), 0.3)
    tag.position.set(0, 2.05, 0)
    scene.add(tag)

    let lastKey = ''
    return () => {
      const hours = Math.max(0, Math.min(48, props.params.hours ?? 6))
      const idx = Math.round(props.params.isotope ?? 0) === 1 ? 1 : 0
      const f = Math.pow(0.5, hours / HALF_LIFE[idx])
      tcGlows.forEach((g) => {
        g.visible = idx === 0
        g.scale.setScalar(0.5 + 0.8 * f)
        ;(g.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + 2.2 * f
      })
      iGlows.forEach((g) => {
        g.visible = idx === 1
        g.scale.setScalar((0.5 + 0.8 * f) * 1.6)
        ;(g.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + 2.2 * f
      })
      const key = `${hours.toFixed(0)}|${idx}`
      if (key !== lastKey) {
        lastKey = key
        paint(tag, `${idx === 0 ? 'Tc-99m' : 'I-131'} ${fmt(f * 100, 0)}%`, theme.fg)
      }
    }
  },
  { camera: [0, 1.0, 3.4], target: [0, 0.85, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
