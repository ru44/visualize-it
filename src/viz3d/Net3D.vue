<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'
import { t } from '../i18n'

// A wider text sprite than useThree's `label()` — the hinge readout needs more than one short word.
function wideTag(size = 0.5) {
  const c = document.createElement('canvas')
  c.width = 384
  c.height = 64
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthTest: false }))
  sp.scale.set(size * 6, size, 1)
  return sp
}

// The lesson's own flat net folds shut as `fold` goes 0 → 1, in real 3D instead of one fixed
// isometric drawing: the learner can orbit while it closes and see every hinge at once. A second
// solid (square pyramid) proves the fold is real geometry, not a canned cube animation — same
// hinge maths, a triangular flap instead of a square one, and a different closing angle worked out
// from where four apexes have to meet.
type P3 = { x: number; y: number; z: number }
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const solid = ref<'cube' | 'pyramid'>('cube')
const HT = 0.9 // pyramid flap height (> 0.5 so its apex can close over the base)
const A_FINAL = Math.acos(-0.5 / HT)

const QUAD: [number, number][] = [
  [-0.5, 0],
  [0.5, 0],
  [0.5, 1],
  [-0.5, 1],
]
const TRI: [number, number][] = [
  [-0.5, 0],
  [0.5, 0],
  [0, HT],
  [0, HT],
]
const BASE: P3[] = [
  { x: -0.5, y: -0.5, z: 0 },
  { x: 0.5, y: -0.5, z: 0 },
  { x: 0.5, y: 0.5, z: 0 },
  { x: -0.5, y: 0.5, z: 0 },
]
const v3 = (p: P3) => new THREE.Vector3(p.x, p.z, p.y) // math z (fold height) becomes three's up

function flap(O: P3, eu: P3, ev: P3, corners: [number, number][]): P3[] {
  return corners.map(([u, v]) => ({ x: O.x + u * eu.x + v * ev.x, y: O.y + u * eu.y + v * ev.y, z: O.z + u * eu.z + v * ev.z }))
}

useThree(
  el,
  ({ scene, theme }) => {
    const colors = [theme.sunken, theme.accent, theme.accent2, theme.pos, theme.pos, theme.accent2]
    const slots = colors.map((c) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3))
      geo.setIndex([0, 1, 2, 0, 2, 3])
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: c, side: THREE.DoubleSide, roughness: 0.7 }))
      const edge = new THREE.LineLoop(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3)), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.55 }))
      scene.add(mesh, edge)
      return { mesh, edge }
    })
    const tag = wideTag(0.5)
    scene.add(tag)
    let lastText = ''

    const setFace = (i: number, pts: P3[]) => {
      const p3 = pts.map(v3)
      const arr = (slots[i].mesh.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
      const earr = (slots[i].edge.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
      for (let k = 0; k < 4; k++) {
        arr[k * 3] = earr[k * 3] = p3[k].x
        arr[k * 3 + 1] = earr[k * 3 + 1] = p3[k].y
        arr[k * 3 + 2] = earr[k * 3 + 2] = p3[k].z
      }
      slots[i].mesh.geometry.attributes.position.needsUpdate = true
      slots[i].mesh.geometry.computeVertexNormals()
      slots[i].edge.geometry.attributes.position.needsUpdate = true
      slots[i].mesh.visible = slots[i].edge.visible = true
    }

    return () => {
      const fold = Math.min(1, Math.max(0, props.params.fold ?? 0))
      const cube = solid.value === 'cube'
      const target = cube ? Math.PI / 2 : A_FINAL
      const a = fold * target
      const cosA = Math.cos(a)
      const sinA = Math.sin(a)
      const corners = cube ? QUAD : TRI

      const N_O = { x: 0, y: 0.5, z: 0 }
      const N_eu = { x: 1, y: 0, z: 0 }
      const N_ev = { x: 0, y: cosA, z: sinA }
      const S_O = { x: 0, y: -0.5, z: 0 }
      const S_ev = { x: 0, y: -cosA, z: sinA }
      const E_O = { x: 0.5, y: 0, z: 0 }
      const E_eu = { x: 0, y: 1, z: 0 }
      const E_ev = { x: cosA, y: 0, z: sinA }
      const W_O = { x: -0.5, y: 0, z: 0 }
      const W_ev = { x: -cosA, y: 0, z: sinA }

      setFace(0, BASE)
      setFace(1, flap(N_O, N_eu, N_ev, corners))
      setFace(2, flap(S_O, N_eu, S_ev, corners))
      setFace(3, flap(E_O, E_eu, E_ev, corners))
      setFace(4, flap(W_O, E_eu, W_ev, corners))
      if (cube) {
        const Nfar = { x: 0, y: N_O.y + N_ev.y, z: N_ev.z }
        const Tdir = { x: 0, y: Math.cos(2 * a), z: Math.sin(2 * a) }
        const T = QUAD.map(([u, v]) => ({ x: Nfar.x + u, y: Nfar.y + v * Tdir.y, z: Nfar.z + v * Tdir.z }))
        setFace(5, T)
      } else {
        slots[5].mesh.visible = slots[5].edge.visible = false
      }

      const hinge = Math.round((a * 180) / Math.PI)
      const state = fold > 0.98 ? 'closed' : fold < 0.02 ? 'flat' : 'folding'
      const text = cube ? `${hinge}° · ${t(`nets.${state}` as any)}` : `${hinge}°`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.font = '500 30px Inter, sans-serif'
        cx.textAlign = 'center'
        cx.fillText(text, 192, 40)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
      tag.position.set(0, 1.7, 0)
    }
  },
  { camera: [2.6, 2.6, 3.2], target: [0, 0.35, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <button
      class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs"
      style="border-color: var(--line); background: var(--panel); color: var(--muted)"
      @click="solid = solid === 'cube' ? 'pyramid' : 'cube'"
    >
      {{ solid === 'cube' ? t('net3d.pyramid') : t('net3d.cube') }}
    </button>
  </div>
</template>
