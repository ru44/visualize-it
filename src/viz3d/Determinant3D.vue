<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// The unit cube pushed by [[a,b],[c,d]] — extended with an untouched third axis — into a
// parallelepiped. Its volume is exactly |ad-bc|, the same area the 2D picture reads off the grid;
// when the determinant hits zero the two in-plane edges line up and the whole box goes flat.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const CORNERS: [number, number, number][] = [
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
  [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
]
const EDGES = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]
const FACES = [0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 4, 5, 0, 5, 1, 3, 2, 6, 3, 6, 7, 1, 5, 6, 1, 6, 2, 0, 3, 7, 0, 7, 4]

// Local x → column (a, c), local z → column (b, d); local y is the untouched extrusion axis.
function warp(a: number, b: number, c: number, d: number, lx: number, ly: number, lz: number): [number, number, number] {
  return [lx * a + lz * b, ly + 0.01, lx * c + lz * d]
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(6, theme))

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CORNERS.length * 3), 3))
    geo.setIndex(FACES)
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.6, side: THREE.DoubleSide, roughness: 0.5 }))
    mesh.castShadow = true
    scene.add(mesh)

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CORNERS.length * 3), 3))
    edgeGeo.setIndex(EDGES)
    const edges = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: theme.fg }))
    scene.add(edges)

    // Static dashed reference: the original unit cube, never transformed.
    const refPos = new Float32Array(CORNERS.length * 3)
    CORNERS.forEach(([x, y, z], i) => refPos.set([x, y, z], i * 3))
    const refGeo = new THREE.BufferGeometry()
    refGeo.setAttribute('position', new THREE.BufferAttribute(refPos, 3))
    refGeo.setIndex(EDGES)
    const refCube = new THREE.LineSegments(refGeo, new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.08, gapSize: 0.06 }))
    refCube.computeLineDistances()
    scene.add(refCube)

    const tag = label('', theme.fg.getStyle(), 0.34)
    scene.add(tag)

    return () => {
      const a = props.params.a ?? 1
      const b = props.params.b ?? 0
      const c = props.params.c ?? 0
      const d = props.params.d ?? 1
      const det = a * d - b * c

      const pos = geo.attributes.position as THREE.BufferAttribute
      const epos = edgeGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < CORNERS.length; i++) {
        const [lx, ly, lz] = CORNERS[i]
        const [wx, wy, wz] = warp(a, b, c, d, lx, ly, lz)
        pos.setXYZ(i, wx, wy, wz)
        epos.setXYZ(i, wx, wy, wz)
      }
      pos.needsUpdate = true
      epos.needsUpdate = true
      geo.computeVertexNormals()

      const col = det < 0 ? theme.neg : theme.pos
      setLabel(tag, t('determinant3d.readout', { d: fmt(det, 3), v: fmt(Math.abs(det), 3) }), col)
      tag.position.set((a + b) / 2, 2.15, (c + d) / 2)
    }
  },
  { camera: [3, 2.6, 4.2], target: [0.5, 0.5, 0.3] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
