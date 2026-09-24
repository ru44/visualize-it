<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Bernoulli site percolation on a cubic lattice: the same fixed-per-site random threshold trick as
// the 2D picture (Percolation.vue) — a site is open once p exceeds its own threshold. The cluster
// connected to the top face is highlighted; once it also reaches the bottom face a path threads
// clean through the whole cube. A cube needs a lower fraction open than a flat grid to first connect
// through, because every site has more neighbours to link up with.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const SIZE = 10
const N = SIZE * SIZE * SIZE
const SPACING = 0.75

function idx(x: number, y: number, z: number) {
  return x + y * SIZE + z * SIZE * SIZE
}
function makeThresholds(): Float32Array {
  let s = 48802341
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
  const out = new Float32Array(N)
  for (let i = 0; i < N; i++) out[i] = rnd()
  return out
}
const thresholds = makeThresholds()

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
  cx.font = '600 28px Inter, sans-serif'
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

    const cube = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const inst = new THREE.InstancedMesh(cube, new THREE.MeshStandardMaterial({ roughness: 0.7 }), N)
    group.add(inst)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()

    const tag = label('', theme.fg.getStyle(), 0.36)
    tag.position.set(0, -half - 1.3, 0)
    scene.add(tag)

    const open = new Uint8Array(N)
    const cluster = new Uint8Array(N)
    const stack = new Int32Array(N)

    function recompute() {
      const p = Math.max(0, Math.min(1, props.params.p ?? 0.3))
      for (let i = 0; i < N; i++) open[i] = thresholds[i] < p ? 1 : 0
      cluster.fill(0)
      let sp = 0
      for (let x = 0; x < SIZE; x++)
        for (let z = 0; z < SIZE; z++) {
          const i = idx(x, SIZE - 1, z)
          if (open[i]) { cluster[i] = 1; stack[sp++] = i }
        }
      let spans = false
      while (sp > 0) {
        const i = stack[--sp]
        const x = i % SIZE
        const y = Math.floor(i / SIZE) % SIZE
        const z = Math.floor(i / (SIZE * SIZE))
        if (y === 0) spans = true
        const neigh = [
          x > 0 ? idx(x - 1, y, z) : -1, x < SIZE - 1 ? idx(x + 1, y, z) : -1,
          y > 0 ? idx(x, y - 1, z) : -1, y < SIZE - 1 ? idx(x, y + 1, z) : -1,
          z > 0 ? idx(x, y, z - 1) : -1, z < SIZE - 1 ? idx(x, y, z + 1) : -1,
        ]
        for (const n of neigh) if (n >= 0 && open[n] && !cluster[n]) { cluster[n] = 1; stack[sp++] = n }
      }
      let count = 0
      for (let x = 0; x < SIZE; x++)
        for (let y = 0; y < SIZE; y++)
          for (let z = 0; z < SIZE; z++) {
            const i = idx(x, y, z)
            if (!open[i]) continue
            m4.makeTranslation((x - SIZE / 2 + 0.5) * SPACING, (y - SIZE / 2 + 0.5) * SPACING, (z - SIZE / 2 + 0.5) * SPACING)
            inst.setMatrixAt(count, m4)
            col.set(cluster[i] ? (spans ? theme.pos : theme.accent) : theme.line)
            inst.setColorAt(count, col)
            count++
          }
      inst.count = count
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      const status = spans ? t('percolation3d.spans') : t('percolation3d.notYet')
      setLabel(tag, `p ${fmt(p, 3)} · ${status}`, theme.bg, spans ? theme.pos : theme.fg)
    }
    recompute()
    watch(() => props.params.p, recompute)

    return (dt) => {
      group.rotation.y += dt * 0.1
    }
  },
  { camera: [7.5, 6, 10], target: [0, -0.3, 0], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <p class="num pointer-events-none absolute inset-x-2 top-2 text-center text-[11px]" style="color: var(--muted)">{{ t('percolation3d.threshold') }}</p>
  </div>
</template>
