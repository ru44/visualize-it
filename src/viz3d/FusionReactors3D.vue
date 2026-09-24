<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// physics/nuclear/fusion-reactors. Same temperature/density/confinement params, the same Lawson
// triple product and the same 3e21 ignition threshold as src/viz/FusionReactors.vue. A tokamak's
// donut-shaped vessel holds a torus of plasma, confined by magnetic field lines that spiral around
// it — a combination of a toroidal field around the big ring and a poloidal field around the tube —
// real 3D geometry a flat Lawson chart cannot show. The plasma glow and field lines brighten
// together as the triple product climbs toward the ignition threshold.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const IGNITE = 3e21
const R = 1.3, r = 0.45

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
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const group = new THREE.Group()
    scene.add(group)

    const vessel = new THREE.Mesh(new THREE.TorusGeometry(R, r, 20, 48), new THREE.MeshStandardMaterial({ color: theme.muted, metalness: 0, roughness: 0.9, transparent: true, opacity: 0.12, side: THREE.DoubleSide }))
    vessel.rotation.x = Math.PI / 2
    group.add(vessel)

    const plasmaMat = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.6, roughness: 1, metalness: 0 })
    const plasma = new THREE.Mesh(new THREE.TorusGeometry(R, r * 0.65, 16, 40), plasmaMat)
    plasma.rotation.x = Math.PI / 2
    group.add(plasma)

    const N_LINES = 5, K = 5, SEG = 220
    const lines = Array.from({ length: N_LINES }, (_, li) => {
      const pts: THREE.Vector3[] = []
      const phase = (li / N_LINES) * Math.PI * 2
      for (let i = 0; i <= SEG; i++) {
        const tt = (i / SEG) * Math.PI * 2
        const rr = R + r * 0.82 * Math.cos(K * tt + phase)
        pts.push(new THREE.Vector3(rr * Math.cos(tt), r * 0.82 * Math.sin(K * tt + phase), rr * Math.sin(tt)))
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.5 }))
      group.add(line)
      return line
    })

    const tag = label('', theme.fg.getStyle(), 0.32)
    tag.position.set(0, R + 1, 0)
    scene.add(tag)

    let lastKey = ''
    return (dt: number) => {
      if (!reduced) group.rotation.y += dt * 0.12
      const temperature = Math.max(1, Math.min(30, props.params.temperature ?? 10))
      const density = Math.max(0.1, Math.min(3, props.params.density ?? 1))
      const confinement = Math.max(0.1, Math.min(10, props.params.confinement ?? 3))
      const triple = density * 1e20 * temperature * confinement
      const ratio = Math.min(1.4, triple / IGNITE)
      const ignited = ratio >= 1
      plasmaMat.color.copy(theme.accent).lerp(theme.pos, Math.min(1, ratio))
      plasmaMat.emissive.copy(plasmaMat.color)
      plasmaMat.emissiveIntensity = 0.5 + ratio * 1.3
      lines.forEach((l) => {
        const m = l.material as THREE.LineBasicMaterial
        m.opacity = 0.25 + Math.min(1, ratio) * 0.65
        m.color.copy(theme.accent2).lerp(theme.pos, Math.min(1, ratio))
      })
      const key = `${temperature.toFixed(1)}|${density.toFixed(2)}|${confinement.toFixed(1)}`
      if (key !== lastKey) {
        lastKey = key
        paint(tag, `${triple.toExponential(1)} ${ignited ? t('reactor.status.ignited') : t('reactor.status.below')}`, ignited ? theme.pos : theme.fg)
      }
    }
  },
  { camera: [3.4, 2.4, 3.6], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
