<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label, type Theme } from './useThree'

// nuclear/radiation-dose. Same five sources, same millisievert numbers and the same 100 mSv threshold
// as src/viz/RadiationDose.vue, but turned into physical sizes instead of bar lengths: a translucent
// cloud around a person-sized figure grows with the cumulative dose, and a fixed reference pole beside
// it marks the 100 mSv level, so "how much bigger" is something you see in space, not just read off an
// axis.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const DOSE_MSV = [0.0001, 0.005, 0.04, 7, 2.4]
const THRESHOLD = 100

function radiusOf(mSv: number) {
  const l = Math.log10(Math.max(mSv, 1e-4))
  return THREE.MathUtils.clamp(0.32 + 0.22 * (l + 4), 0.32, 3.2)
}

function fmtDose(mSv: number) {
  if (mSv < 0.001) return `${(mSv * 1000).toFixed(2)} µSv`
  if (mSv < 1) return `${(mSv * 1000).toFixed(0)} µSv`
  return `${mSv < 10 ? mSv.toFixed(2) : mSv.toFixed(1)} mSv`
}

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

function person(theme: Theme) {
  const g = new THREE.Group()
  const skin = new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.7 })
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.7, 4, 8), skin)
  torso.position.y = 1.0
  torso.castShadow = true
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), skin)
  head.position.y = 1.62
  head.castShadow = true
  const legGeo = new THREE.CapsuleGeometry(0.11, 0.7, 4, 8)
  const legL = new THREE.Mesh(legGeo, skin)
  legL.position.set(-0.12, 0.35, 0)
  const legR = new THREE.Mesh(legGeo, skin)
  legR.position.set(0.12, 0.35, 0)
  g.add(torso, head, legL, legR)
  return g
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(10, theme))
    scene.add(person(theme))
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 18), new THREE.MeshPhysicalMaterial({ color: theme.pos, transparent: true, opacity: 0.4, transmission: 0.15, roughness: 0.3 }))
    cloud.position.y = 1.0
    scene.add(cloud)
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 12), new THREE.MeshStandardMaterial({ color: theme.neg }))
    bar.position.x = 2.4
    scene.add(bar)
    const barCap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), new THREE.MeshStandardMaterial({ color: theme.neg }))
    scene.add(barCap)
    const barTag = label(`100 mSv`, theme.neg.getStyle(), 0.28)
    scene.add(barTag)
    const doseTag = label('', theme.fg.getStyle(), 0.3)
    scene.add(doseTag)

    const refR = radiusOf(THRESHOLD)
    const barHeight = refR * 2
    bar.scale.y = barHeight
    bar.position.y = barHeight / 2
    barCap.position.set(2.4, barHeight, 0)
    barTag.position.set(2.4, barHeight + 0.35, 0)

    let lastKey = ''
    return (_dt: number, tSec: number) => {
      const source = Math.max(0, Math.min(4, Math.round(props.params.source ?? 0)))
      const repeats = Math.max(1, Math.min(100, Math.round(props.params.time ?? 1)))
      const total = DOSE_MSV[source] * repeats
      const r = radiusOf(total)
      cloud.scale.setScalar(r + Math.sin(tSec * 0.6) * 0.02)
      const factor = THREE.MathUtils.clamp(total / THRESHOLD, 0, 1)
      ;(cloud.material as THREE.MeshPhysicalMaterial).color.copy(theme.pos).lerp(theme.neg, factor)

      const key = `${source}|${repeats}`
      if (key !== lastKey) {
        lastKey = key
        paint(doseTag, fmtDose(total), theme.fg)
        doseTag.position.set(0, Math.max(r + 1.3, 2.15), 0)
      }
    }
  },
  { camera: [5, 3, 6.5], target: [0.6, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
