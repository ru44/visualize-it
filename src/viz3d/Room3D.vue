<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label, type Theme } from './useThree'

// A room with a heater on the back wall. Air particles are pulled into a closed convection loop:
// they warm and rise near the heater, drift across the ceiling, cool and sink at the far wall, then
// creep back along the floor — the full 3D circulation a flat 2D arrow diagram cannot show. Reads
// the same dT (°C) the 2D picture uses to drive convection, and Tsurf (K) for the heater's glow.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 32px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

const W = 6
const H = 3.4
const D = 4

useThree(
  el,
  ({ scene, theme }: { scene: THREE.Scene; theme: Theme }) => {
    scene.add(ground(16, theme))
    const wallMat = new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 1, side: THREE.DoubleSide })
    const back = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat)
    back.position.set(W / 2, H / 2, -D / 2)
    scene.add(back)
    const side = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat)
    side.rotation.y = Math.PI / 2
    side.position.set(0, H / 2, 0)
    scene.add(side)

    const heaterMat = new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.3 })
    const heater = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.12), heaterMat)
    heater.position.set(1.2, 0.5, -D / 2 + 0.1)
    scene.add(heater)

    const tsTag = label('', theme.accent2.getStyle(), 0.32)
    tsTag.position.set(1.2, 1.1, -D / 2 + 0.1)
    scene.add(tsTag)
    const vTag = label('', theme.fg.getStyle(), 0.32)
    vTag.position.set(W - 1.3, H - 0.3, 0)
    scene.add(vTag)

    const N = 90
    const geo = new THREE.SphereGeometry(0.06, 8, 6)
    const mat = new THREE.MeshStandardMaterial({ color: theme.accent })
    const inst = new THREE.InstancedMesh(geo, mat, N)
    scene.add(inst)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()
    // Each particle rides the same closed loop (0→1): 0–0.3 rises by the heater, 0.3–0.5 drifts across
    // the ceiling, 0.5–0.8 sinks at the far wall, 0.8–1 creeps back along the floor to the heater.
    const phase = Array.from({ length: N }, (_, i) => i / N)
    const lane = Array.from({ length: N }, () => (Math.random() - 0.5) * (D - 0.6))

    const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    let simT = 0
    return (dt: number) => {
      const dTemp = Math.max(0.1, props.params.dT ?? 40)
      const Tsurf = Math.max(1, props.params.Tsurf ?? 350)
      const speed = 0.15 + Math.sqrt(dTemp) * 0.09
      const heat = THREE.MathUtils.clamp((Tsurf - 300) / 500, 0, 1)
      heaterMat.emissiveIntensity = 0.15 + heat * 1.4
      if (!reduced) simT += dt * speed

      for (let i = 0; i < N; i++) {
        const s = (phase[i] + simT * 0.12) % 1
        let x: number, y: number
        if (s < 0.3) {
          const u = s / 0.3
          x = 1.2 + (Math.random() - 0.5) * 0.05
          y = 0.5 + u * (H - 0.6)
        } else if (s < 0.5) {
          const u = (s - 0.3) / 0.2
          x = 1.2 + u * (W - 1.8)
          y = H - 0.1
        } else if (s < 0.8) {
          const u = (s - 0.5) / 0.3
          x = W - 0.6
          y = H - 0.1 - u * (H - 0.5)
        } else {
          const u = (s - 0.8) / 0.2
          x = W - 0.6 - u * (W - 1.8)
          y = 0.1
        }
        const temp = 1 - Math.min(1, s / 0.6)
        col.lerpColors(theme.accent, theme.accent2, temp * heat)
        inst.setMatrixAt(i, m4.makeTranslation(x, y, lane[i]))
        inst.setColorAt(i, col)
      }
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      paint(tsTag, `${Math.round(Tsurf)} K`, theme.accent2)
      paint(vTag, `≈ ${speed.toFixed(2)} m/s`, theme.fg)
    }
  },
  { camera: [8, 5, 9], target: [W / 2, 1.4, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
