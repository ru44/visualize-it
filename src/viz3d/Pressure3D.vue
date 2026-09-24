<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'

// physics/pressure-in-fluids. params rho (kg/m³), x = depth (m). Same formula as the 2D chart:
// P = 101325 + rho·9.81·x, in Pa. A 100 m water column (scene-scaled) with pressure arrows on two
// walls at fixed depths, growing with depth and with ρ; a probe on a rod at depth x reads the same
// pressure the 2D picture's marker shows.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const TOP_Y = 4
const SCENE_PER_M = TOP_Y / 100
const DEPTHS = [0, 20, 40, 60, 80, 100]
const HALF = 1

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
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
    const waterMat = new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.32, roughness: 0.15, transmission: 0.4 })
    const water = new THREE.Mesh(new THREE.BoxGeometry(HALF * 2, TOP_Y, HALF * 2), waterMat)
    water.position.set(0, TOP_Y / 2, 0)
    scene.add(water)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(water.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.copy(water.position)
    scene.add(edges)
    const surface = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.15, side: THREE.DoubleSide }))
    surface.rotation.x = -Math.PI / 2
    surface.position.y = TOP_Y
    scene.add(surface)

    const wallArrows = DEPTHS.map((d) => ({
      d,
      x: arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(HALF, TOP_Y - d * SCENE_PER_M, 0), 0.3, theme.accent2),
      z: arrow(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, TOP_Y - d * SCENE_PER_M, -HALF), 0.3, theme.accent2),
    }))
    wallArrows.forEach((a) => scene.add(a.x, a.z))

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, TOP_Y, 8), new THREE.MeshStandardMaterial({ color: theme.muted }))
    rod.position.set(0, TOP_Y / 2, 0)
    scene.add(rod)
    const probe = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshStandardMaterial({ color: theme.fg, emissive: theme.accent2, emissiveIntensity: 0.3 }))
    scene.add(probe)
    const tag = label('', theme.fg.getStyle(), 0.38)
    scene.add(tag)

    return () => {
      const rho = Math.max(700, Math.min(1400, props.params.rho ?? 1000))
      const depth = Math.max(0, Math.min(100, props.params.x ?? 10))
      waterMat.color.copy(theme.accent).lerp(theme.muted, (rho - 700) / 700)

      wallArrows.forEach((a) => {
        const P = 101325 + rho * 9.81 * a.d
        const len = Math.min(1.6, P / 700000) + 0.12
        a.x.setLength(len, 0.16, 0.1)
        a.z.setLength(len, 0.16, 0.1)
      })

      const y = TOP_Y - depth * SCENE_PER_M
      probe.position.set(0, y, 0)
      const pKpa = Math.round((101325 + rho * 9.81 * depth) / 1000)
      tag.position.set(0.55, y + 0.12, 0)
      paint(tag, t('viz3d.pressure.reading', { v: pKpa }), theme.fg)
    }
  },
  { camera: [4.8, 3.6, 5.8], target: [0, 1.8, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
