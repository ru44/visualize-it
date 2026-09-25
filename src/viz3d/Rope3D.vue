<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// content/lessons/waves/wave-basics. The 2D picture is a flat SVG curve y(x,t) = A sin(2*pi*(x/lambda
// - f*t)) for x in [0, 8] m. This scene builds the SAME rope as a real 3D ribbon with width and
// shading, viewable from an angle — something a flat SVG line cannot show: that a real rope has a
// genuine 3D shape yet all its motion stays confined to one plane (up/down only, never sideways).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const LEN = 8
const SEG = 48
const WSEG = 3
const THICK = 0.35

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.PlaneGeometry(LEN, THICK, SEG, WSEG)
    geo.rotateX(-Math.PI / 2) // lies flat in x-z; we lift it with y = wave height
    const count = (geo.attributes.position as THREE.BufferAttribute).count
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    const rope = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, side: THREE.DoubleSide }))
    rope.position.x = LEN / 2 // so x runs 0..LEN, matching the 2D picture
    scene.add(rope)
    scene.add(new THREE.GridHelper(12, 12, theme.line, theme.grid).translateY(-1.6))

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 10), new THREE.MeshStandardMaterial({ color: theme.fg }))
    scene.add(hand)

    // particle: a bead threaded at a fixed x, showing pure transverse (up/down only) motion
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.25 }))
    scene.add(bead)
    // crest tracker: rides the rope at the wave's own phase speed v = f*lambda
    const crest = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.4 }))
    scene.add(crest)

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.set(LEN / 2, 2.6, 0)
    scene.add(tag)

    function setLabel(text: string, color: THREE.Color) {
      if (tag.userData.text === text) return
      tag.userData.text = text
      const img = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = `500 ${Math.max(14, Math.min(24, Math.floor(460 / Math.max(8, text.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    const partX = 4
    const scratch = new THREE.Color()
    let clock = 0
    return (dt) => {
      const f = props.params.f ?? 0.5
      const lambda = props.params.lambda ?? 2
      const A = props.params.A ?? 0.4
      clock += dt
      const yAt = (xm: number) => A * Math.sin(2 * Math.PI * (xm / lambda - f * clock))

      const pos = geo.attributes.position as THREE.BufferAttribute
      const col = geo.attributes.color as THREE.BufferAttribute
      for (let i = 0; i < pos.count; i++) {
        const xLocal = pos.getX(i) + LEN / 2 // 0..LEN
        const h = yAt(xLocal)
        pos.setY(i, h)
        const amt = Math.min(1, Math.abs(h) / Math.max(0.05, A))
        scratch.copy(theme.sunken).lerp(h >= 0 ? theme.pos : theme.neg, amt * 0.7)
        col.setXYZ(i, scratch.r, scratch.g, scratch.b)
      }
      pos.needsUpdate = true
      col.needsUpdate = true
      geo.computeVertexNormals()

      hand.position.set(0, yAt(0), 0)
      bead.position.set(partX, yAt(partX), 0)
      const v = f * lambda
      const cx = (lambda / 4 + v * clock) % LEN
      crest.position.set(cx, yAt(cx) + 0.05, 0)

      setLabel(t('viz3d.rope.speed', { v: fmt(v, 2) }), theme.fg)
    }
  },
  { camera: [4, 3.4, 7], target: [4, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
