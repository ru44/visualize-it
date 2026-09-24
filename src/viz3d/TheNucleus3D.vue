<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { isStable, symbolFor, nuclearRadiusFm } from '../viz/nuclideData'

// content/lessons/nuclear/the-nucleus. Same Z (protons) and N (neutrons) as src/viz/TheNucleus.vue,
// same radius formula R = 1.2·A^(1/3) fm. The 2D picture fakes depth by filling a disk; this scene
// packs the same A nucleons through the actual volume of a ball, so the cube-root scaling is the real
// reason the radius grows the way it does, not just a number — turning the ball slowly shows nucleons
// sit at every depth, not just around a flat ring.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const MAX_A = 44
const GOLDEN = 2.399963229728653
const SCALE = 0.42 // three.js units per fm-ish step, chosen so R stays on screen for every A

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 26px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.SphereGeometry(1, 14, 12)
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 })
    const inst = new THREE.InstancedMesh(geo, mat, MAX_A)
    inst.castShadow = true
    scene.add(inst)
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 18), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.92, roughness: 0.1, thickness: 0.3, transparent: true, opacity: 0.16 }))
    scene.add(shell)
    const tag = label('', theme.fg.getStyle(), 0.34)
    scene.add(tag)
    const col = new THREE.Color()
    const m4 = new THREE.Matrix4()

    let lastKey = ''
    return () => {
      const Z = Math.round(Math.min(20, Math.max(1, props.params.Z ?? 6)))
      const N = Math.round(Math.min(24, Math.max(0, props.params.N ?? 6)))
      const A = Z + N
      const key = `${Z}|${N}`
      if (key === lastKey) return
      lastKey = key

      const R = SCALE * Math.cbrt(A)
      shell.scale.setScalar(R + 0.1)
      const dotR = Math.min(0.22, Math.max(0.08, 0.85 * (R / Math.cbrt(A))))

      for (let i = 0; i < MAX_A; i++) {
        if (i >= A) {
          m4.makeScale(0, 0, 0)
          inst.setMatrixAt(i, m4)
          continue
        }
        const frac = (i + 0.5) / A
        const r = R * Math.cbrt(frac)
        const z = 1 - 2 * frac
        const rxy = Math.sqrt(Math.max(0, 1 - z * z))
        const phi = i * GOLDEN
        const x = r * rxy * Math.cos(phi)
        const y = r * z
        const zz = r * rxy * Math.sin(phi)
        m4.compose(new THREE.Vector3(x, y, zz), new THREE.Quaternion(), new THREE.Vector3(dotR, dotR, dotR))
        inst.setMatrixAt(i, m4)
        inst.setColorAt(i, i < Z ? col.copy(theme.accent) : col.copy(theme.accent2))
      }
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true

      const stable = isStable(Z, N)
      tag.position.set(0, R + 0.5, 0)
      paint(tag, `${symbolFor(Z)}-${A} · ${nuclearRadiusFm(A).toFixed(2)} fm`, stable ? theme.pos : theme.neg)
    }
  },
  { camera: [2.6, 2, 3.2], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
