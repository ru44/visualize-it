<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { fmt } from '../engine/math'

// The same shelf-bracket truss as the 2D picture (BridgesAndTrusses.vue): Fbrace = W*sqrt(L^2+h^2)/h
// (compression), Farm = W*L/h (tension). Built as real 3D box members whose thickness scales with
// their own force, so the load path — how the force actually splits between the two members — is
// something you can see and orbit around, not just read off a flat line diagram.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

function beamBetween(a: THREE.Vector3, b: THREE.Vector3, thickness: number, color: THREE.Color) {
  const dir = new THREE.Vector3().subVectors(b, a)
  const len = dir.length()
  const geo = new THREE.BoxGeometry(thickness, len, thickness)
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.6 }))
  mesh.position.copy(a).addScaledVector(dir, 0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  mesh.castShadow = mesh.receiveShadow = true
  return mesh
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
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
    let arm: THREE.Mesh | null = null
    let brace: THREE.Mesh | null = null

    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 0.8), new THREE.MeshStandardMaterial({ color: theme.line, roughness: 0.9 }))
    wall.position.set(-0.04, -0.4, 0)
    wall.receiveShadow = true
    scene.add(wall)

    const loadArrow = arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 1, theme.fg)
    scene.add(loadArrow)

    const armTag = label('', theme.pos.getStyle(), 0.24)
    const braceTag = label('', theme.neg.getStyle(), 0.24)
    scene.add(armTag, braceTag)

    let lastSig = ''
    return () => {
      const W = Math.max(1, props.params.W ?? 300)
      const L = Math.max(0.05, props.params.L ?? 0.6)
      const h = Math.max(0.02, props.params.h ?? 0.4)
      const hyp = Math.sqrt(L * L + h * h)
      const Fbrace = (W * hyp) / h
      const Farm = (W * L) / h

      const sig = `${L}|${h}`
      if (sig !== lastSig) {
        lastSig = sig
        if (arm) { scene.remove(arm); arm.geometry.dispose(); (arm.material as THREE.Material).dispose() }
        if (brace) { scene.remove(brace); brace.geometry.dispose(); (brace.material as THREE.Material).dispose() }
        const tip = new THREE.Vector3(L, 0, 0)
        const wallLow = new THREE.Vector3(0, -h, 0)
        const armThick = THREE.MathUtils.clamp(0.015 + Farm / 40000, 0.02, 0.14)
        const braceThick = THREE.MathUtils.clamp(0.015 + Fbrace / 40000, 0.02, 0.14)
        arm = beamBetween(new THREE.Vector3(0, 0, 0), tip, armThick, theme.pos)
        brace = beamBetween(wallLow, tip, braceThick, theme.neg)
        scene.add(arm, brace)

        loadArrow.position.set(L, 0, 0)
        loadArrow.setLength(Math.min(1.2, 0.3 + W / 900), 0.22, 0.14)
        armTag.position.set(L / 2, 0.2, 0)
        braceTag.position.set(L / 2 - 0.05, -h / 2 + 0.2, 0.3)
      }
      setLabel(armTag, `${fmt(Farm, 0)} N`, theme.pos)
      setLabel(braceTag, `${fmt(Fbrace, 0)} N`, theme.neg)
    }
  },
  { camera: [2.6, 1.1, 3.2], target: [0.5, -0.2, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
