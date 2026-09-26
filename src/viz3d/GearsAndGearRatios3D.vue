<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same omega2 = omega1*N1/N2, tau2 = tau1*N2/N1 as the 2D picture (GearsAndGearRatios.vue), but
// built as two real extruded gears that mesh in depth — teeth interlocking and spinning opposite
// ways, which the flat silhouette only draws side by side, never truly engaged.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const THICK = 0.3

function gearShape(r: number, teeth: number) {
  const shape = new THREE.Shape()
  for (let i = 0; i < 2 * teeth; i++) {
    const a = (i * Math.PI) / teeth
    const rr = i % 2 === 0 ? r * 1.14 : r * 0.86
    const x = rr * Math.cos(a)
    const y = rr * Math.sin(a)
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  shape.closePath()
  const hole = new THREE.Path()
  hole.absarc(0, 0, r * 0.22, 0, Math.PI * 2, false)
  shape.holes.push(hole)
  return shape
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 30px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(6, theme))
    const group = new THREE.Group()
    scene.add(group)
    let N1 = -1
    let N2 = -1
    let r1 = 1
    let r2 = 1
    let g1!: THREE.Mesh
    let g2!: THREE.Mesh

    const w2Tag = label('', theme.fg.getStyle(), 0.3)
    const ratioTag = label('', theme.accent.getStyle(), 0.28)
    scene.add(w2Tag, ratioTag)

    function rebuild() {
      group.clear()
      g1?.geometry.dispose()
      g2?.geometry.dispose()
      ;(g1?.material as THREE.Material)?.dispose()
      ;(g2?.material as THREE.Material)?.dispose()
      r1 = 0.4 + 0.025 * N1
      r2 = 0.4 + 0.025 * N2
      const geo1 = new THREE.ExtrudeGeometry(gearShape(r1, N1), { depth: THICK, bevelEnabled: false })
      const geo2 = new THREE.ExtrudeGeometry(gearShape(r2, N2), { depth: THICK, bevelEnabled: false })
      geo1.translate(0, 0, -THICK / 2)
      geo2.translate(0, 0, -THICK / 2)
      g1 = new THREE.Mesh(geo1, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.55, side: THREE.DoubleSide }))
      g2 = new THREE.Mesh(geo2, new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.55, side: THREE.DoubleSide }))
      g1.castShadow = g2.castShadow = true
      g1.receiveShadow = g2.receiveShadow = true
      g1.position.set(-(r1 + r2) / 2, r1, 0)
      g2.position.set((r1 + r2) / 2, r2, 0)
      group.add(g1, g2)
    }

    let a1 = 0
    let a2 = 0
    return (dt) => {
      const newN1 = Math.max(6, Math.round(props.params.N1 ?? 20))
      const newN2 = Math.max(6, Math.round(props.params.N2 ?? 20))
      if (newN1 !== N1 || newN2 !== N2) {
        N1 = newN1
        N2 = newN2
        rebuild()
      }
      const w1 = props.params.w1 ?? 300
      const w2 = (w1 * N1) / N2
      a1 += ((w1 * 2 * Math.PI) / 60) * dt
      a2 -= ((w2 * 2 * Math.PI) / 60) * dt
      g1.rotation.z = a1
      g2.rotation.z = a2

      const tau1 = props.params.tau1 ?? 20
      const tau2 = (tau1 * N2) / N1
      setLabel(w2Tag, `${fmt(w2, 0)} rpm`, theme.fg)
      w2Tag.position.set((r1 + r2) / 2, 2 * r2 + 0.4, 0)
      setLabel(ratioTag, `${t('gears3d.ratio')} ${fmt(N2 / N1, 2)} · ${fmt(tau2, 1)} N·m`, theme.accent)
      ratioTag.position.set(0, 2 * Math.max(r1, r2) + 0.75, 0)
    }
  },
  { camera: [0.3, 2.3, 5.2], target: [0, 1, 0], fov: 38 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
