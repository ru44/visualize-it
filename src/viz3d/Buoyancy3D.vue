<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label } from './useThree'
import { t } from '../i18n'

// physics/buoyancy-archimedes. params rhoObj, rhoFluid (kg/m³), V (litres). Same formulas as
// src/viz/Buoyancy.vue: frac = min(1, rhoObj/rhoFluid) is the submerged fraction, weight = rhoObj·(V/1000)·g,
// buoy = rhoFluid·(V/1000)·frac·g. Unlike the flat picture's fixed water line, this tank is narrow
// enough that the water level itself visibly rises by the volume the object displaces.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const G = 9.81
const TANK_W = 2.4
const TANK_D = 2.4
const TANK_H = 3.4
const BASE_LEVEL = 1.5
const RISE_PER_M3 = 10 // stylized: a tank this narrow makes the displaced-volume rise easy to see

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
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
    scene.add(ground(9, theme))
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(TANK_W, TANK_H, TANK_D)), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.set(0, TANK_H / 2, 0)
    scene.add(edges)
    const waterMat = new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.35, roughness: 0.1, transmission: 0.5 })
    const water = new THREE.Mesh(new THREE.BoxGeometry(TANK_W - 0.04, 1, TANK_D - 0.04), waterMat)
    scene.add(water)
    const obj = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5 }))
    obj.castShadow = true
    scene.add(obj)
    const wArrow = arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 1, theme.neg)
    const bArrow = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.accent)
    scene.add(wArrow, bArrow)
    const tag = label('', theme.fg.getStyle(), 0.4)
    scene.add(tag)

    return () => {
      const rhoObj = Math.max(50, props.params.rhoObj ?? 600)
      const rhoFluid = Math.max(700, props.params.rhoFluid ?? 1000)
      const V = Math.max(1, props.params.V ?? 10) / 1000 // m³
      const frac = Math.min(1, rhoObj / rhoFluid)
      const sinks = rhoObj > rhoFluid
      const weight = rhoObj * V * G
      const buoy = rhoFluid * V * frac * G

      const level = BASE_LEVEL + frac * V * RISE_PER_M3
      water.scale.y = level
      water.position.set(0, level / 2, 0)

      const side = 0.4 + Math.cbrt(V) * 2.1
      obj.scale.setScalar(side)
      const centerY = sinks ? side / 2 : level - side * frac + side / 2
      obj.position.set(0, centerY, 0)

      const wLen = Math.min(2.0, weight / 450) + 0.15
      const bLen = Math.min(2.0, buoy / 450) + 0.15
      wArrow.position.set(-side / 2 - 0.15, centerY, 0)
      wArrow.setLength(wLen, 0.3, 0.18)
      bArrow.position.set(side / 2 + 0.15, centerY, 0)
      bArrow.setLength(bLen, 0.3, 0.18)

      tag.position.set(0, TANK_H + 0.4, 0)
      paint(tag, sinks ? t('viz3d.buoyancy.sinks') : t('viz3d.buoyancy.floats'), sinks ? theme.neg : theme.pos)
    }
  },
  { camera: [5.5, 4.3, 7.5], target: [0, 1.3, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
