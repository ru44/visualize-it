<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// physics/nuclear/fusion-in-stars. Same temperature and stage params as src/viz/FusionInStars.vue.
// A star cut open, shown as nested half-sphere shells: the outer, coolest shell is unburned
// hydrogen, and each inner shell is a hotter, heavier fuel — helium, carbon, oxygen, silicon/iron —
// that only appears once "core temperature" crosses that fuel's ignition threshold, the same
// "onion" structure a real evolved massive star develops. A flat 2D chart cannot show this nested
// 3D layering or let you look inside the star.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const FUELS = [
  { minT: 10, nameKey: 'star.fuel.h', radius: 2.1 },
  { minT: 100, nameKey: 'star.fuel.he', radius: 1.65 },
  { minT: 600, nameKey: 'star.fuel.c', radius: 1.25 },
  { minT: 1500, nameKey: 'star.fuel.o', radius: 0.9 },
  { minT: 2700, nameKey: 'star.fuel.si', radius: 0.55 },
]

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 30px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 160, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const group = new THREE.Group()
    scene.add(group)
    const shells = FUELS.map((f, i) => {
      const color = theme.accent.clone().lerp(theme.neg, i / (FUELS.length - 1))
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, emissive: color, emissiveIntensity: 0.2, side: THREE.DoubleSide })
      const shell = new THREE.Mesh(new THREE.SphereGeometry(f.radius, 20, 14, 0, Math.PI), mat)
      const cap = new THREE.Mesh(new THREE.CircleGeometry(f.radius, 24), mat)
      shell.castShadow = shell.receiveShadow = true
      group.add(shell, cap)
      return { shell, cap, mat }
    })
    const tag = label('', theme.fg.getStyle(), 0.34)
    tag.position.set(0, 2.7, 0)
    scene.add(tag)

    let lastIdx = -1
    let clock = 0
    return (dt: number) => {
      if (!reduced) group.rotation.y += dt * 0.05
      clock += dt
      const temperature = Math.max(10, Math.min(3200, props.params.temperature ?? 15))
      const activeIdx = FUELS.reduce((acc, f, i) => (temperature >= f.minT ? i : acc), 0)
      if (activeIdx !== lastIdx) {
        lastIdx = activeIdx
        shells.forEach((s, i) => {
          s.shell.visible = s.cap.visible = i <= activeIdx
        })
        paint(tag, t(FUELS[activeIdx].nameKey as any), theme.fg)
      }
      const pulse = reduced ? 0 : 0.12 * (0.5 + 0.5 * Math.sin(clock * 2.4))
      shells[activeIdx].mat.emissiveIntensity = 0.28 + pulse
    }
  },
  { camera: [2.2, 1.5, -3.9], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
