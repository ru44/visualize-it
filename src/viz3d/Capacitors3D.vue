<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// electricity/capacitors. Same params (C in µF, V in volts) and same Q = CV, E = ½CV² as the 2D
// picture. The flat picture can only draw the field as parallel lines on one flat cross-section; here
// a real grid of field-vector arrows fills the whole 3D gap and visibly weakens and fringes outward
// near the plate edges — something a flat diagram of two lines can never show.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const GRID = 5
const PLATE_SIZE = 2.2

useThree(
  el,
  ({ scene, theme }) => {
    const plateGeo = new THREE.BoxGeometry(PLATE_SIZE, 0.06, PLATE_SIZE)
    const topMat = new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.5 })
    const botMat = new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.5 })
    const topPlate = new THREE.Mesh(plateGeo, topMat)
    const botPlate = new THREE.Mesh(plateGeo, botMat)
    topPlate.castShadow = botPlate.castShadow = true
    topPlate.receiveShadow = botPlate.receiveShadow = true
    scene.add(topPlate, botPlate)

    // field arrows filling the gap, denser near the centre, fainter near the edges (fringing)
    const positions: [number, number][] = []
    for (let i = 0; i < GRID; i++) for (let j = 0; j < GRID; j++) {
      const x = (i / (GRID - 1) - 0.5) * PLATE_SIZE * 0.85
      const z = (j / (GRID - 1) - 0.5) * PLATE_SIZE * 0.85
      positions.push([x, z])
    }
    const arrows = positions.map(() => arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 0.5, theme.accent))
    arrows.forEach((a) => scene.add(a))

    const tag = label('', undefined, 0.4)
    tag.position.set(0, 1.6, 0)
    scene.add(tag)
    let lastText = ''

    return () => {
      const C = Math.max(props.params.C ?? 150, 0.1)
      const V = Math.max(props.params.V ?? 300, 0.1)
      const Q = C * 1e-6 * V
      const E = 0.5 * C * 1e-6 * V * V

      // gap shrinks a little as capacitance rises — a visual metaphor, not a literal geometry formula
      const gap = THREE.MathUtils.clamp(1.6 - Math.log10(C) * 0.35, 0.5, 1.6)
      topPlate.position.y = gap / 2
      botPlate.position.y = -gap / 2
      const intensity = THREE.MathUtils.clamp(V / 400, 0.05, 1)
      topMat.emissive = theme.pos
      topMat.emissiveIntensity = intensity * 0.4
      botMat.emissive = theme.neg
      botMat.emissiveIntensity = intensity * 0.4

      for (let i = 0; i < positions.length; i++) {
        const [x, z] = positions[i]!
        const centreness = 1 - Math.hypot(x, z) / (PLATE_SIZE * 0.7)
        const len = Math.max(0.1, gap * 0.9) * (0.4 + intensity * 0.6) * Math.max(0.25, centreness)
        arrows[i]!.position.set(x, gap / 2 - 0.02, z)
        arrows[i]!.setLength(len, len * 0.3, len * 0.18)
        ;(arrows[i]!.line.material as THREE.LineBasicMaterial).opacity = 0.4 + centreness * 0.6
        ;(arrows[i]!.line.material as THREE.LineBasicMaterial).transparent = true
      }

      tag.position.set(0, gap / 2 + 1, 0)
      const text = `Q = ${(Q * 1000).toFixed(2)} mC, E = ${E.toFixed(3)} J`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        let size = 20
        cx.textAlign = 'center'
        do {
          cx.font = `500 ${size}px Inter, sans-serif`
          size -= 1
        } while (cx.measureText(text).width > c.width - 8 && size > 10)
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [3.2, 2.4, 3.6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
