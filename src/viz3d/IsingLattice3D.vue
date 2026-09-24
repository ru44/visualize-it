<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Ising model in 3D: the same Metropolis rule and temperature slider as the 2D picture (Ising.vue),
// just on a cubic lattice with 6 neighbours per spin instead of a square grid with 4. Below its own
// critical temperature — higher here than in 2D, since every spin has more neighbours pulling it
// into line — the spins clump into aligned domains; above it they scramble into salt-and-pepper noise.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const SIZE = 8
const N = SIZE * SIZE * SIZE
const J = 1 // coupling strength, fixed — same as the 2D picture
const ATTEMPTS = Math.round(N / 3)
const SPACING = 0.85

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
function idx(x: number, y: number, z: number) {
  return x + y * SIZE + z * SIZE * SIZE
}
function neighbourSum(g: Int8Array, x: number, y: number, z: number) {
  return (
    g[idx((x - 1 + SIZE) % SIZE, y, z)] + g[idx((x + 1) % SIZE, y, z)] +
    g[idx(x, (y - 1 + SIZE) % SIZE, z)] + g[idx(x, (y + 1) % SIZE, z)] +
    g[idx(x, y, (z - 1 + SIZE) % SIZE)] + g[idx(x, y, (z + 1) % SIZE)]
  )
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color, bg: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  // A solid dark-on-light (or light-on-dark) panel keeps the readout legible over busy cube
  // geometry and pale gaps alike — a translucent panel close to the page colour nearly vanished there.
  cx.fillStyle = `rgb(${Math.round(bg.r * 255)}, ${Math.round(bg.g * 255)}, ${Math.round(bg.b * 255)})`
  cx.beginPath()
  cx.roundRect(8, 16, 240, 40, 8)
  cx.fill()
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 34px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const group = new THREE.Group()
    scene.add(group)
    const half = (SIZE * SPACING) / 2
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(SIZE * SPACING, SIZE * SPACING, SIZE * SPACING)), new THREE.LineBasicMaterial({ color: theme.line })))

    const cube = new THREE.BoxGeometry(0.62, 0.62, 0.62)
    const inst = new THREE.InstancedMesh(cube, new THREE.MeshStandardMaterial({ roughness: 0.6 }), N)
    group.add(inst)
    const m4 = new THREE.Matrix4()
    for (let x = 0; x < SIZE; x++)
      for (let y = 0; y < SIZE; y++)
        for (let z = 0; z < SIZE; z++) {
          m4.makeTranslation((x - SIZE / 2 + 0.5) * SPACING, (y - SIZE / 2 + 0.5) * SPACING, (z - SIZE / 2 + 0.5) * SPACING)
          inst.setMatrixAt(idx(x, y, z), m4)
        }
    inst.instanceMatrix.needsUpdate = true

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.set(0, -half - 0.5, 0)
    scene.add(tag)

    const col = new THREE.Color()
    function recompute() {
      const T = Math.max(0.5, Math.min(5, props.params.temperature ?? 3.5))
      const steps = Math.max(0, Math.min(200, Math.round(props.params.step ?? 0)))
      const rnd = makeRng(9301777)
      const g = new Int8Array(N)
      for (let i = 0; i < N; i++) g[i] = rnd() < 0.5 ? 1 : -1
      for (let s = 0; s < steps; s++)
        for (let a = 0; a < ATTEMPTS; a++) {
          const x = Math.floor(rnd() * SIZE)
          const y = Math.floor(rnd() * SIZE)
          const z = Math.floor(rnd() * SIZE)
          const site = idx(x, y, z)
          const dE = 2 * J * g[site] * neighbourSum(g, x, y, z)
          if (dE < 0 || rnd() < Math.exp(-dE / T)) g[site] = -g[site]
        }
      let mag = 0
      for (let i = 0; i < N; i++) {
        mag += g[i]
        col.set(g[i] > 0 ? theme.accent : theme.accent2)
        inst.setColorAt(i, col)
      }
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      setLabel(tag, t('ising3d.readout', { t: fmt(T, 2), m: fmt(Math.abs(mag / N), 3) }), theme.bg, theme.fg)
    }
    recompute()
    watch(() => [props.params.temperature, props.params.step], recompute)

    return (dt) => {
      group.rotation.y += dt * 0.12
    }
  },
  { camera: [6.5, 5, 8], target: [0, -0.3, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
