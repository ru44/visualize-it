<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// The exact same board, seeds and step rule as the 2D picture (GameOfLife.vue) — same GLIDER and
// PULSAR patterns, same seeded randomness for "random" — duplicated here (a .vue file has nothing to
// import from) the way Spring3D.vue reuses DampedSpring.vue's closed form, so both views agree
// generation for generation. Instead of showing one generation, every generation from 0 up to "gen"
// is stacked upward as its own layer: a glider's diagonal crawl becomes a diagonal staircase, and an
// oscillator becomes a twisted column. Layers beyond LAYER_CAP slide, so the tower stays a fixed height.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const COLS = 48
const ROWS = 28
const LAYER_CAP = 28
const LAYER_HEIGHT = 0.3
const CELL = 0.2
const CAPACITY = 3200
const GLIDER: [number, number][] = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
const PULSAR: [number, number][] = [[2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0], [0, 2], [5, 2], [7, 2], [12, 2], [0, 3], [5, 3], [7, 3], [12, 3], [0, 4], [5, 4], [7, 4], [12, 4], [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5]]

function seedGrid(start: number, density: number): boolean[] {
  const g = new Array(COLS * ROWS).fill(false)
  if (start === 1) {
    for (let k = 0; k < 6; k++) for (const [x, y] of GLIDER) g[(3 + y + k * 4) * COLS + (3 + x + k * 7)] = true
  } else if (start === 2) {
    for (const [x, y] of PULSAR) g[(7 + y) * COLS + (17 + x)] = true
    for (const [x, y] of PULSAR) g[(7 + y) * COLS + (2 + x)] = true
  } else {
    let s = 12345
    const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
    for (let i = 0; i < g.length; i++) g[i] = rnd() * 100 < density
  }
  return g
}
function stepOnce(g: boolean[]): boolean[] {
  const out = new Array(COLS * ROWS).fill(false)
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++) {
      let n = 0
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          if (g[((y + dy + ROWS) % ROWS) * COLS + ((x + dx + COLS) % COLS)]) n++
        }
      out[y * COLS + x] = g[y * COLS + x] ? n === 2 || n === 3 : n === 3
    }
  return out
}

useThree(
  el,
  ({ scene, theme }) => {
    const group = new THREE.Group()
    scene.add(group)
    const cellGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16)
    const inst = new THREE.InstancedMesh(cellGeo, new THREE.MeshStandardMaterial({ roughness: 0.6 }), CAPACITY)
    group.add(inst)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()
    const tag = label('', theme.fg.getStyle(), 0.34)
    scene.add(tag)

    function recompute() {
      const start = Math.round(props.params.start ?? 0)
      const density = Math.max(2, Math.min(60, props.params.density ?? 25))
      const topGen = Math.max(0, Math.min(120, Math.round(props.params.gen ?? 0)))
      let g = seedGrid(start, density)
      const history: boolean[][] = [g]
      for (let i = 0; i < topGen; i++) { g = stepOnce(g); history.push(g) }
      const startGen = Math.max(0, topGen - LAYER_CAP + 1)
      const shown = history.slice(startGen)

      let count = 0
      for (let li = shown.length - 1; li >= 0 && count < CAPACITY; li--) {
        const grid = shown[li]
        const age = shown.length > 1 ? (shown.length - 1 - li) / (shown.length - 1) : 0
        col.copy(theme.accent).lerp(theme.muted, age)
        for (let cell = 0; cell < grid.length && count < CAPACITY; cell++) {
          if (!grid[cell]) continue
          const x = cell % COLS
          const y = Math.floor(cell / COLS)
          m4.makeTranslation((x - COLS / 2 + 0.5) * CELL, li * LAYER_HEIGHT, (y - ROWS / 2 + 0.5) * CELL)
          inst.setMatrixAt(count, m4)
          inst.setColorAt(count, col)
          count++
        }
      }
      inst.count = count
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      tag.position.set(0, Math.max(shown.length * LAYER_HEIGHT, 1.2) + 0.6, 0)
      const text = tag.userData.text
      const next = t('lifestack3d.readout', { g: String(topGen) })
      if (text !== next) {
        tag.userData.text = next
        const img = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = img.getContext('2d')!
        cx.clearRect(0, 0, img.width, img.height)
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.font = '600 34px Inter, sans-serif'
        cx.textAlign = 'center'
        cx.fillText(next, 128, 46)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
    recompute()
    watch(() => [props.params.start, props.params.density, props.params.gen], recompute)

    return (dt) => {
      group.rotation.y += dt * 0.08
    }
  },
  { camera: [10, 8, 11], target: [0, 3.5, 0], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <p class="num pointer-events-none absolute inset-x-2 top-2 text-center text-[11px]" style="color: var(--muted)">{{ t('viz3d.lifeStack.note') }}</p>
  </div>
</template>
