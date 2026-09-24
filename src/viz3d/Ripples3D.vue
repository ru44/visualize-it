<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// content/lessons/waves/interference-and-beats. The 2D picture is a 1D time chart of
// sin(2*pi*f1*x) + sin(2*pi*f2*x) at a single point; x is time, read with the same params.x here.
// Two point sources on a water surface, each with the SAME f1/f2, show what that 1D chart cannot:
// a 2D interference field, bright where the two ripples add (constructive) and flat/grey along the
// hyperbolic nodal lines where they cancel — and, because f1 != f2, that pattern itself drifts as
// you drag x, the spatial picture of the very beat the chart is showing in time.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const D = 2.2 // source separation
const V = 9 // wave speed, world units / s (chosen so 5-12 Hz gives a few clean rings)
const E = 3.4 // water surface half-extent
const N = 46
const S1 = new THREE.Vector3(-D / 2, 0, 0)
const S2 = new THREE.Vector3(D / 2, 0, 0)

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(14, Math.min(24, Math.floor(460 / Math.max(8, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.PlaneGeometry(2 * E, 2 * E, N, N)
    geo.rotateX(-Math.PI / 2)
    const count = (geo.attributes.position as THREE.BufferAttribute).count
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    const water = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.1, side: THREE.DoubleSide }))
    scene.add(water)
    scene.add(new THREE.GridHelper(2 * E, 8, theme.line, theme.grid).translateY(-0.9))

    const sources = [S1, S2].map((p) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 10), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
      m.position.copy(p)
      scene.add(m)
      return m
    })

    const tag = label('', theme.fg.getStyle(), 0.42)
    tag.position.set(0, 2.1, 0)
    scene.add(tag)

    const scratch = new THREE.Color()
    let cachedKey = ''
    return () => {
      const f1 = props.params.f1 ?? 8
      const f2 = props.params.f2 ?? 9
      const tSec = props.params.x ?? 0.5
      const key = `${f1}|${f2}|${tSec}`
      if (key === cachedKey) return
      cachedKey = key

      const pos = geo.attributes.position as THREE.BufferAttribute
      const col = geo.attributes.color as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i)
        const pz = -pos.getZ(i)
        const r1 = Math.hypot(px - S1.x, pz - S1.z)
        const r2 = Math.hypot(px - S2.x, pz - S2.z)
        const h1 = Math.sin(2 * Math.PI * f1 * (tSec - r1 / V)) / Math.sqrt(1 + r1)
        const h2 = Math.sin(2 * Math.PI * f2 * (tSec - r2 / V)) / Math.sqrt(1 + r2)
        const h = 0.55 * (h1 + h2)
        pos.setY(i, h)
        const amt = Math.min(1, Math.abs(h) / 0.75)
        scratch.copy(theme.sunken).lerp(h >= 0 ? theme.pos : theme.neg, amt)
        col.setXYZ(i, scratch.r, scratch.g, scratch.b)
      }
      pos.needsUpdate = true
      col.needsUpdate = true
      geo.computeVertexNormals()

      // Lifted well above the highest possible crest so the bobbing post is never buried by the mesh.
      sources[0]!.position.y = 1.3 + 0.14 * Math.sin(2 * Math.PI * f1 * tSec)
      sources[1]!.position.y = 1.3 + 0.14 * Math.sin(2 * Math.PI * f2 * tSec)

      const beat = Math.abs(f1 - f2)
      setLabel(tag, t('viz3d.ripples.beat', { f1: fmt(f1, 1), f2: fmt(f2, 1), beat: fmt(beat, 2) }), theme.fg)
    }
  },
  { camera: [0.5, 7.5, 9], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
