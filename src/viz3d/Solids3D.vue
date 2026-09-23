<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { fmt } from '../engine/math'

// A cube of side s grows next to a fixed 1 m reference cube — the same pair the 2D picture shows,
// with the same A = 6s² and V = s³. What 2D cannot do: the growing cube is gridded into its own
// unit cells (n = round(s) per edge), so at s = 2 a learner can actually count 8 little cubes
// filling it, not just read a number — the square-cube law made countable.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const REF = { x: -1.5, y: 0.5, z: 0.5 } // fixed 1 m reference cube centre

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(16, theme))
    const refGeo = new THREE.BoxGeometry(1, 1, 1)
    const ref_ = new THREE.LineSegments(new THREE.EdgesGeometry(refGeo), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.06, gapSize: 0.05 }))
    ref_.position.set(REF.x, REF.y, REF.z)
    ref_.computeLineDistances()
    scene.add(ref_)
    const refTag = label('1 m', '#888', 0.4)
    refTag.position.set(REF.x, 1.2, REF.z)
    scene.add(refTag)

    const mat = new THREE.MeshStandardMaterial({ color: theme.accent, transparent: true, opacity: 0.55, roughness: 0.6 })
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat)
    mesh.castShadow = true
    scene.add(mesh)
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.35 }))
    scene.add(wire)

    const aTag = label('', '#888', 0.36)
    const vTag = label('', '#888', 0.36)
    scene.add(aTag, vTag)
    const paint = (sp: THREE.Sprite, text: string, color: THREE.Color) => {
      const c = (sp.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = '600 38px Inter, sans-serif'
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(sp.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let lastS = -1
    return () => {
      const s = Math.min(4, Math.max(0.2, props.params.s ?? 1))
      if (Math.abs(s - lastS) > 1e-3) {
        lastS = s
        const n = Math.max(1, Math.round(s))
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(s, s, s, n, n, n)
        mesh.position.set(s / 2, s / 2, s / 2)
        wire.geometry.dispose()
        wire.geometry = new THREE.WireframeGeometry(mesh.geometry)
        wire.position.copy(mesh.position)

        const A = 6 * s * s
        const V = s * s * s
        paint(aTag, `A ${fmt(A, 2)} m²`, theme.accent)
        paint(vTag, `V ${fmt(V, 2)} m³`, theme.pos)
        aTag.position.set(s / 2, s + 0.85, s + 0.4)
        vTag.position.set(s / 2, s + 1.55, s + 0.4)
      }
    }
  },
  { camera: [8, 6, 11], target: [1, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
