<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// physics/torque-and-levers. params F1, d1 (a known force and its arm), x = d2 (the arm being
// dragged). F2 = F1·d1/x is exactly the balancing force the 2D chart plots. Here the counterweight's
// own size (its force) chases that target with a short lag instead of snapping to it instantly, so
// dragging d2 visibly tips the beam toward the bigger torque before it settles level once F2 catches
// up — the flat curve only ever shows the settled answer, never why it is the answer.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const SCALE = 0.32
const sizeFromForce = (f: number) => 0.22 + Math.min(1, f / 60) * 0.65

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 28px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(10, theme))
    const pivot = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.6, 4), new THREE.MeshStandardMaterial({ color: theme.muted }))
    pivot.rotation.y = Math.PI / 4
    pivot.position.y = 0.3
    scene.add(pivot)

    const beam = new THREE.Group()
    beam.position.y = 0.6
    scene.add(beam)
    const plank = new THREE.Mesh(new THREE.BoxGeometry(8, 0.16, 0.5), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.6 }))
    plank.castShadow = true
    beam.add(plank)
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 }))
    const w2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5 }))
    w1.castShadow = w2.castShadow = true
    beam.add(w1, w2)
    const tag = label('', theme.pos.getStyle(), 0.4)
    scene.add(tag)

    let smoothF2 = 0
    let firstFrame = true
    return (dt: number) => {
      const F1 = Math.max(5, props.params.F1 ?? 20)
      const d1 = Math.max(0.5, props.params.d1 ?? 2)
      const x = Math.max(0.3, props.params.x ?? 4)
      const targetF2 = (F1 * d1) / x
      if (firstFrame) {
        smoothF2 = targetF2
        firstFrame = false
      }
      smoothF2 += (targetF2 - smoothF2) * (dt > 0 ? Math.min(1, dt * 3) : 1)

      const s1 = sizeFromForce(F1)
      const s2 = sizeFromForce(smoothF2)
      w1.scale.setScalar(s1)
      w2.scale.setScalar(s2)
      w1.position.set(-d1 * SCALE, 0.08 + s1 / 2, 0)
      w2.position.set(x * SCALE, 0.08 + s2 / 2, 0)

      const torque1 = F1 * d1
      const torque2 = smoothF2 * x
      const angle = 0.45 * Math.tanh((torque1 - torque2) / 45)
      beam.rotation.z = angle

      tag.position.set(0, 2.2, 0)
      paint(tag, Math.abs(angle) < 0.03 ? t('viz3d.torque.balanced') : '', theme.pos)
    }
  },
  { camera: [0, 2.2, 8], target: [0, 0.9, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
