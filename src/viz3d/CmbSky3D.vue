<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// The sky as a sphere, seen from outside: a smooth, low-frequency pattern of warmer and cooler patches —
// the same kind of anisotropy the real CMB sky has — with the tiny fluctuations exaggerated so they read,
// painted around a mean colour set by «temperature T», the exact number the 2D curve's peak wavelength
// (2.898/T) also follows. A single wavelength plot cannot show the glow filling the whole sky at once and
// varying by direction; only a sphere can.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

// A handful of fixed axes/frequencies sum into one smooth, deterministic "sky" pattern in [-1, 1].
const AXES = [
  { v: new THREE.Vector3(0.6, 0.8, 0.1).normalize(), f: 2.1, p: 0.4, w: 0.4 },
  { v: new THREE.Vector3(-0.3, 0.4, 0.9).normalize(), f: 3.4, p: 1.7, w: 0.3 },
  { v: new THREE.Vector3(0.8, -0.5, 0.3).normalize(), f: 4.7, p: 2.6, w: 0.2 },
  { v: new THREE.Vector3(-0.6, -0.7, -0.4).normalize(), f: 6.1, p: 0.9, w: 0.14 },
  { v: new THREE.Vector3(0.2, 0.1, -0.95).normalize(), f: 8.3, p: 3.1, w: 0.1 },
]
function fluct(d: THREE.Vector3): number {
  let s = 0
  for (const ax of AXES) s += ax.w * Math.sin(ax.f * d.dot(ax.v) + ax.p)
  return THREE.MathUtils.clamp(s, -1, 1)
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const geo = new THREE.SphereGeometry(2.4, 40, 26)
    const posAttr = geo.attributes.position
    const n = posAttr.count
    const colors = new Float32Array(n * 3)
    const d = new THREE.Vector3()
    const f = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      d.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)).normalize()
      f[i] = fluct(d)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const sky = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true }))
    scene.add(sky)

    const tag = label('', theme.fg.getStyle(), 0.44)
    tag.position.set(0, 3.2, 0)
    scene.add(tag)

    const mean = new THREE.Color()
    const c = new THREE.Color()
    let lastT = NaN
    return (dt) => {
      sky.rotation.y += dt * 0.05
      const T = THREE.MathUtils.clamp(props.params.T ?? 2.725, 1, 10)
      if (T !== lastT) {
        lastT = T
        const tn = THREE.MathUtils.clamp((T - 1) / 9, 0, 1)
        mean.copy(theme.accent).lerp(theme.accent2, tn)
        for (let i = 0; i < n; i++) {
          c.copy(mean).lerp(f[i] > 0 ? theme.pos : theme.neg, Math.abs(f[i]) * 0.5)
          colors[i * 3] = c.r
          colors[i * 3 + 1] = c.g
          colors[i * 3 + 2] = c.b
        }
        geo.attributes.color.needsUpdate = true
      }
      setLabel(tag, t('cmbsky3d.avgTemp', { v: fmt(T, 2) }), theme.pos)
    }
  },
  { camera: [0, 0.6, 6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
