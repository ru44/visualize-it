<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// One dimension up from MarchingSquares.vue: instead of a 2D field sampled on a grid and a contour
// line drawn where it crosses "level", a 3D field is sampled on a small grid and a whole surface is
// extracted where it crosses the same "level" — the technique a CT or MRI scan uses to become a
// printable 3D model. Same threshold value and the same kind of seeded random bumps as the 2D field,
// generalised to three dimensions; "res" is scaled down to a grid a phone can triangulate every frame.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const SCALE = 2.2

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}
// Same shape as MarchingSquares.vue's field(): a handful of seeded Gaussian bumps, in 3D.
function makeField() {
  const rng = makeRng(1)
  const bumps = Array.from({ length: 4 }, () => ({ cx: 0.2 + rng() * 0.6, cy: 0.2 + rng() * 0.6, cz: 0.2 + rng() * 0.6, s: 0.16 + rng() * 0.1, a: 0.8 + rng() * 0.5 }))
  return (x: number, y: number, z: number) => {
    let v = 0
    for (const b of bumps) v += b.a * Math.exp(-((x - b.cx) ** 2 + (y - b.cy) ** 2 + (z - b.cz) ** 2) / (2 * b.s * b.s))
    return Math.min(1, v)
  }
}

function setText(spr: THREE.Sprite, text: string) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = spr.userData.color
  cx.textAlign = 'center'
  let size = 28
  cx.font = `500 ${size}px Inter, sans-serif`
  while (size > 12 && cx.measureText(text).width > img.width - 20) {
    size -= 1
    cx.font = `500 ${size}px Inter, sans-serif`
  }
  cx.fillText(text, 128, 40)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(10, theme))
    const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(SCALE * 2, SCALE * 2, SCALE * 2)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.35 }))
    box.position.y = SCALE
    scene.add(box)

    const mat = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5, side: THREE.DoubleSide })
    let mc: MarchingCubes | null = null
    let grid = 0

    const infoLabel = label('', '#fff', 0.34)
    infoLabel.userData.color = '#' + theme.fg.getHexString()
    infoLabel.position.set(0, SCALE * 2 + 1.1, 0)
    const note = label('', '#fff', 0.3)
    note.userData.color = '#' + theme.muted.getHexString()
    setText(note, t('viz3d.mcubes.note'))
    note.position.set(0, -0.9, 0)
    scene.add(infoLabel, note)

    let lastLevel = NaN

    return () => {
      const level = Math.max(0.05, Math.min(0.95, props.params.level ?? 0.5))
      const res = Math.max(6, Math.min(28, Math.round(props.params.res ?? 16)))
      const g = Math.round(8 + ((res - 6) / (28 - 6)) * 8) // 8..16, a grid small enough for every-frame triangulation
      if (g !== grid) {
        grid = g
        if (mc) {
          scene.remove(mc)
          mc.geometry.dispose()
        }
        const resolution = grid + 2 // MarchingCubes.update() skips a 1-cell border, so pad it
        mc = new MarchingCubes(resolution, mat, false, false, 4000)
        mc.scale.setScalar(SCALE)
        mc.position.y = SCALE
        scene.add(mc)
        const field = makeField()
        for (let iz = 0; iz < resolution; iz++)
          for (let iy = 0; iy < resolution; iy++)
            for (let ix = 0; ix < resolution; ix++) {
              const inside = ix >= 1 && ix <= grid && iy >= 1 && iy <= grid && iz >= 1 && iz <= grid
              const v = inside ? field((ix - 1) / (grid - 1), (iy - 1) / (grid - 1), (iz - 1) / (grid - 1)) : 0
              mc.setCell(ix, iy, iz, v)
            }
        lastLevel = NaN // force a retriangulation below
      }
      if (mc && level !== lastLevel) {
        lastLevel = level
        mc.isolation = level
        mc.update()
      }
      setText(infoLabel, `${t('ms.level')}: ${level.toFixed(2)} · ${t('ms.res')}: ${grid}×${grid}×${grid}`)
    }
  },
  { camera: [6.5, 6, 7], target: [0, SCALE, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
