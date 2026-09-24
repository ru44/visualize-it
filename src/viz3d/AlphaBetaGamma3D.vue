<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// nuclear/alpha-beta-gamma. Same type/material/thickness params and same range/half-value-layer
// numbers as src/viz/AlphaBetaGamma.vue, but instead of one line of dots per beam this shows a whole
// cross-section of the beam — dozens of particles spread over a plane, all flying at one slab — which
// is what actually makes gamma's exponential thinning legible: some rays miss straight through even a
// thick slab, others don't, and only a crowd of them in space shows that as a genuine statistical
// spray rather than a single pass/fail dot.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const RANGE_ALPHA = 0.05
const RANGE_BETA = [12, 3.5, 0.8]
const HVL_GAMMA = [84, 29, 6.5]
const MATERIAL_OPACITY = [0.18, 0.45, 0.85]
const COLS = 8
const ROWS = 8
const N = COLS * ROWS
const LANE = 6 // world units the swarm travels before looping
const SPEED = 1.1
const SLAB_W = 1.7
const SLAB_D = 1.9

function seeded(i: number) { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s) }
function transmission(x: number, m: number) { return Math.pow(0.5, x / HVL_GAMMA[m]) }

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 24px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(9, theme))
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.1, SLAB_W, SLAB_D), new THREE.MeshStandardMaterial({ color: theme.fg, transparent: true, roughness: 0.6 }))
    slab.position.y = SLAB_W / 2
    scene.add(slab)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: theme.line }))
    scene.add(edges)
    const geo = new THREE.SphereGeometry(0.06, 10, 8)
    const mats = [0, 1, 2].map((k) => new THREE.MeshStandardMaterial({ color: k === 0 ? theme.accent : k === 1 ? theme.accent2 : theme.fg, emissive: k === 0 ? theme.accent : k === 1 ? theme.accent2 : theme.fg, emissiveIntensity: 0.3 }))
    const inst = new THREE.InstancedMesh(geo, mats[0], N)
    inst.castShadow = true
    scene.add(inst)
    const tag = label('', theme.fg.getStyle(), 0.3)
    scene.add(tag)
    const m4 = new THREE.Matrix4()
    const zero = new THREE.Matrix4().makeScale(0, 0, 0)

    let lastKey = ''
    return (dt: number, tSec: number) => {
      const type = Math.max(0, Math.min(2, Math.round(props.params.type ?? 0)))
      const material = Math.max(0, Math.min(2, Math.round(props.params.material ?? 1)))
      const thickness = Math.max(0, Math.min(50, props.params.thickness ?? 5))
      inst.material = mats[type]
      const key = `${type}|${material}|${thickness.toFixed(1)}`
      const slabThick = thickness > 0 ? 0.06 + thickness * 0.026 : 0
      slab.visible = slabThick > 0
      slab.scale.set(slabThick / 0.1, 1, 1)
      edges.visible = slabThick > 0
      edges.scale.set(slabThick, SLAB_W, SLAB_D)
      edges.position.set(0, SLAB_W / 2, 0)

      let blocked = false
      let frac = 1
      if (slabThick > 0) {
        if (type === 0) { blocked = thickness >= RANGE_ALPHA; frac = blocked ? 0 : 1 }
        else if (type === 1) { blocked = thickness >= RANGE_BETA[material]; frac = blocked ? 0 : 1 }
        else frac = transmission(thickness, material)
      }
      const halfSlab = slabThick / 2

      for (let i = 0; i < N; i++) {
        const row = Math.floor(i / COLS)
        const col = i % COLS
        const py = 0.35 + (row / (ROWS - 1)) * (SLAB_W - 0.5)
        const pz = -SLAB_D / 2 + 0.2 + (col / (COLS - 1)) * (SLAB_D - 0.4)
        const phase = seeded(i) * LANE
        const x = -LANE / 2 + ((phase + tSec * SPEED) % LANE)
        const survives = type === 2 ? seeded(i + 97) < frac : !blocked
        const hits = slabThick > 0 && x >= -halfSlab
        if (hits && !survives) m4.copy(zero)
        else m4.makeTranslation(x, py, pz)
        inst.setMatrixAt(i, m4)
      }
      inst.instanceMatrix.needsUpdate = true
      ;(slab.material as THREE.MeshStandardMaterial).opacity = MATERIAL_OPACITY[material]

      if (key !== lastKey) {
        lastKey = key
        tag.position.set(0, SLAB_W + 0.5, 0)
        const text = type === 2 ? `${(frac * 100).toFixed(1)}%` : blocked ? t('abg.blocked') : t('abg.passes')
        paint(tag, text, blocked || (type === 2 && frac < 0.2) ? theme.pos : theme.neg)
      }
    }
  },
  { camera: [4.5, 3.4, 5.5], target: [0, 1, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
