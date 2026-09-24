<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// physics/radioactive-decay. Same seed and per-atom lifetime formula as RadioactiveDecay.vue, so both
// views agree on exactly which atoms are alive for the same sliders. The flat grid can dim a cell; only
// a 3D scene can put every atom at its own point in space and let the decay moment itself — the flash —
// happen there, once, the instant that atom's lifetime is crossed.
const MAX_N = 300
const DISPLAY_MAX = 220
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
const lifeRng = makeRng(20260924)
const LIFETIMES = Array.from({ length: MAX_N }, () => -Math.log2(1 - Math.min(0.999999, lifeRng())))
const posRng = makeRng(20260925)
const BOX = { w: 3.2, h: 2.2, d: 2.2 }
const POSITIONS = Array.from({ length: MAX_N }, () => new THREE.Vector3((posRng() - 0.5) * (BOX.w - 0.3), 0.15 + posRng() * (BOX.h - 0.3), (posRng() - 0.5) * (BOX.d - 0.3)))

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const MAX_FLASH = 14

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(15, Math.min(28, Math.floor(400 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(10, theme))
    const glass = new THREE.Mesh(new THREE.BoxGeometry(BOX.w, BOX.h, BOX.d), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.22 }))
    glass.position.y = BOX.h / 2
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.copy(glass.position)
    scene.add(edges)

    const geo = new THREE.IcosahedronGeometry(0.075, 1)
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.4 })
    const inst = new THREE.InstancedMesh(geo, mat, DISPLAY_MAX)
    inst.castShadow = true
    scene.add(inst)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()

    const flashes = Array.from({ length: MAX_FLASH }, () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, opacity: 0 }))
      scene.add(m)
      return { mesh: m, age: 99 }
    })
    let nextFlash = 0
    function spawnFlash(p: THREE.Vector3) {
      const f = flashes[nextFlash]
      nextFlash = (nextFlash + 1) % MAX_FLASH
      f.mesh.position.copy(p)
      f.age = 0
    }

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.set(0, BOX.h + 0.5, 0)
    scene.add(tag)

    let lastTime = -1
    function rebuild() {
      const time = Math.max(0, Math.min(8, props.params.time ?? 0))
      const N0 = Math.max(10, Math.min(MAX_N, Math.round(props.params.N0 ?? 100)))
      const n = Math.min(N0, DISPLAY_MAX)
      for (let i = 0; i < n; i++) {
        const isAlive = LIFETIMES[i] > time
        col.copy(isAlive ? theme.accent : theme.muted)
        inst.setColorAt(i, col)
        inst.setMatrixAt(i, m4.makeTranslation(POSITIONS[i].x, POSITIONS[i].y, POSITIONS[i].z))
        if (!REDUCED && lastTime >= 0 && LIFETIMES[i] <= time && LIFETIMES[i] > lastTime) spawnFlash(POSITIONS[i])
      }
      // slots beyond N0 (up to the fixed instance count) are hidden, not just recoloured, so an
      // atom count below DISPLAY_MAX never leaves stray spheres visible in the box.
      m4.makeScale(0, 0, 0)
      for (let i = n; i < DISPLAY_MAX; i++) inst.setMatrixAt(i, m4)
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      lastTime = time
      let realAlive = 0
      for (let i = 0; i < N0; i++) if (LIFETIMES[i] > time) realAlive++
      paint(tag, t('viz3d.rdecay.readout', { a: String(realAlive), n: String(N0), k: fmt(time, 2) }), theme.fg)
    }
    rebuild()
    watch(() => [props.params.time, props.params.N0], rebuild)

    return (dt: number) => {
      for (const f of flashes) {
        if (f.age > 1) continue
        f.age += dt
        const mat2 = f.mesh.material as THREE.MeshBasicMaterial
        mat2.opacity = Math.max(0, 0.7 * (1 - f.age))
        f.mesh.scale.setScalar(0.08 + f.age * 0.5)
      }
    }
  },
  { camera: [3.6, 2.6, 4.2], target: [0, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
