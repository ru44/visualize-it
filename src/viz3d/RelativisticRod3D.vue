<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'

// The 2D picture compares two bar WIDTHS on a flat ruler — it can never show that only the length along
// the direction of motion actually shrinks, while the rod's own diameter (perpendicular to its flight)
// stays exactly the rod's rest diameter for every observer. Orbiting this 3D rod proves that directly:
// its cross-section never changes shape as v climbs, only its length does. Same L0, v, L, γ as the 2D page.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const SCALE = 0.28 // scene units per metre
const R = 0.32 // rod radius, scene units (fixed — this is exactly what the flat picture cannot show staying fixed)
const DRIFT = 1.6 // scene units/s, a constant visual crossing speed (this scene is about length, not speed)
const LOOP = 14

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(16, theme))

    // rest-length ghost, fixed in place for comparison
    const ghostGeo = new THREE.CylinderGeometry(R, R, 1, 24, 1, true)
    const ghost = new THREE.Mesh(ghostGeo, new THREE.MeshBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.25, wireframe: true }))
    ghost.rotation.z = Math.PI / 2
    ghost.position.set(0, R + 0.02, -2.2)
    scene.add(ghost)
    const ghostTag = label('', theme.muted.getStyle(), 0.3)
    scene.add(ghostTag)

    // the moving, length-contracted rod
    const rodGeo = new THREE.CylinderGeometry(R, R, 1, 28, 1)
    const rodMat = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.45 })
    const rod = new THREE.Mesh(rodGeo, rodMat)
    rod.rotation.z = Math.PI / 2
    rod.position.y = R + 0.02
    rod.castShadow = true
    scene.add(rod)
    const rodTag = label('', theme.accent.getStyle(), 0.32)
    scene.add(rodTag)

    // two end-cap rings, drawn on the ghost, so the eye can compare "where the rod's own ends sit"
    // against where the moving rod's ends actually reach
    const ring = (x: number) => {
      const r = new THREE.Mesh(new THREE.RingGeometry(R * 0.94, R * 1.1, 20), new THREE.MeshBasicMaterial({ color: theme.muted, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }))
      r.rotation.y = Math.PI / 2
      r.position.set(x, R + 0.02, -2.2)
      scene.add(r)
      return r
    }
    const ringL = ring(0)
    const ringR = ring(0)

    let simT = 0
    const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

    function rebuild() {
      const v = Math.min(0.999, Math.max(0, props.params.v ?? 0.6))
      const L0 = Math.max(0.5, props.params.L0 ?? 10)
      const gamma = 1 / Math.sqrt(1 - v * v)
      const L = L0 / gamma

      const ghostLen = L0 * SCALE
      const rodLen = L * SCALE
      ghost.scale.y = ghostLen
      rod.scale.y = rodLen
      ringL.position.x = -ghostLen / 2
      ringR.position.x = ghostLen / 2
      ghostTag.position.set(0, R + 0.75, -2.2)
      label2(ghostTag, `L₀=${L0.toFixed(1)}m`, theme.muted)

      simT = 0
      rod.userData.rodLen = rodLen
      rod.userData.v = v
      label2(rodTag, `L=${L.toFixed(2)}m γ=${gamma.toFixed(2)}`, theme.accent)
    }

    function label2(spr: THREE.Sprite, text: string, color: THREE.Color) {
      if (spr.userData.text === text) return
      spr.userData.text = text
      const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      const size = Math.max(16, Math.min(30, Math.floor(320 / Math.max(6, text.length))))
      cx.font = `600 ${size}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    rebuild()
    watch(() => [props.params.v, props.params.L0], rebuild)

    return (dt: number) => {
      if (!reduced) simT += dt
      const rodLen = (rod.userData.rodLen as number) ?? 1
      const x = -LOOP / 2 - rodLen / 2 + ((DRIFT * simT) % (LOOP + rodLen))
      rod.position.x = x
      rodTag.position.set(x, R + 0.75, 0)
    }
  },
  { camera: [5.5, 3.2, 6.5], target: [0, 0.6, -1], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
