<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// Same carving algorithms, RNG and default seed as MazeGen.vue (copied verbatim below) so the two
// views always carve the identical maze for the same algo/size — only rendered as short walls over a
// floor grid instead of lines on paper, so a phone can look over the whole thing while it grows.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const CELL = 1
const WALL_H = 0.85
const SEED = 1 // MazeGen.vue's own default, before any "shuffle" click
const MAX_SIZE = 18
const MAX_WALLS = 2 * MAX_SIZE * (MAX_SIZE - 1)

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}
interface Edge { a: number; b: number }
function carve(algo: number, n: number): Edge[] {
  const V = n * n
  const rng = makeRng(SEED * 1000 + n)
  const visited = new Array(V).fill(false)
  const nbrs = (k: number) => {
    const i = Math.floor(k / n)
    const j = k % n
    const out: number[] = []
    if (i > 0) out.push(k - n)
    if (i < n - 1) out.push(k + n)
    if (j > 0) out.push(k - 1)
    if (j < n - 1) out.push(k + 1)
    return out
  }
  const frames: Edge[] = []
  if (algo === 0) {
    const stack = [0]
    visited[0] = true
    while (stack.length) {
      const cur = stack[stack.length - 1]
      const open = nbrs(cur).filter((x) => !visited[x])
      if (open.length) {
        const next = open[Math.floor(rng() * open.length)]
        visited[next] = true
        frames.push({ a: cur, b: next })
        stack.push(next)
      } else stack.pop()
    }
  } else {
    visited[0] = true
    let frontier = nbrs(0).map((to) => ({ from: 0, to }))
    while (frontier.length) {
      const idx = Math.floor(rng() * frontier.length)
      const w = frontier[idx]
      frontier = frontier.slice(0, idx).concat(frontier.slice(idx + 1))
      if (visited[w.to]) continue
      visited[w.to] = true
      frames.push({ a: w.from, b: w.to })
      frontier = frontier.concat(nbrs(w.to).filter((x) => !visited[x]).map((to) => ({ from: w.to, to })))
    }
  }
  return frames
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
    scene.add(ground(24, theme))
    const walls = new THREE.InstancedMesh(new THREE.BoxGeometry(CELL * 0.92, WALL_H, 0.08), new THREE.MeshStandardMaterial({ color: theme.fg }), MAX_WALLS)
    walls.castShadow = true
    scene.add(walls)
    const start = new THREE.Mesh(new THREE.BoxGeometry(CELL * 0.9, 0.05, CELL * 0.9), new THREE.MeshStandardMaterial({ color: theme.pos }))
    const finish = new THREE.Mesh(new THREE.BoxGeometry(CELL * 0.9, 0.05, CELL * 0.9), new THREE.MeshStandardMaterial({ color: theme.neg }))
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
    const boundMat = new THREE.MeshStandardMaterial({ color: theme.fg })
    const boundGeo = new THREE.BoxGeometry(1, 1, 1)
    const bounds = [0, 1, 2, 3].map(() => new THREE.Mesh(boundGeo, boundMat))
    scene.add(start, finish, marker, ...bounds)

    const algoLabel = label('', '#fff', 0.34)
    algoLabel.userData.color = '#' + theme.fg.getHexString()
    const progLabel = label('', '#fff', 0.3)
    progLabel.userData.color = '#' + theme.fg.getHexString()
    scene.add(algoLabel, progLabel)

    const IDENT = new THREE.Quaternion()
    const TURN = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
    const SCALE1 = new THREE.Vector3(1, 1, 1)
    const ZERO = new THREE.Matrix4().makeScale(0, 0, 0)
    let matrices: THREE.Matrix4[] = []
    let pairs: [number, number][] = []
    let trace: Edge[] = []
    let lastKey = ''
    const cellPos = (k: number, n: number) => new THREE.Vector3((k % n - (n - 1) / 2) * CELL, WALL_H / 2, (Math.floor(k / n) - (n - 1) / 2) * CELL)

    return (dt: number) => {
      const algo = Math.round(props.params.algo ?? 0) ? 1 : 0
      const size = Math.max(5, Math.min(MAX_SIZE, Math.round(props.params.size ?? 10)))
      const key = `${algo}-${size}`
      if (key !== lastKey) {
        lastKey = key
        trace = carve(algo, size)
        matrices = []
        pairs = []
        const m4 = new THREE.Matrix4()
        for (let k = 0; k < size * size; k++) {
          const col = k % size
          const row = Math.floor(k / size)
          const pk = cellPos(k, size)
          if (col < size - 1) {
            const p2 = cellPos(k + 1, size)
            m4.compose(pk.clone().add(p2).multiplyScalar(0.5), TURN, SCALE1)
            matrices.push(m4.clone())
            pairs.push([k, k + 1])
          }
          if (row < size - 1) {
            const p2 = cellPos(k + size, size)
            m4.compose(pk.clone().add(p2).multiplyScalar(0.5), IDENT, SCALE1)
            matrices.push(m4.clone())
            pairs.push([k, k + size])
          }
        }
        walls.count = matrices.length
        start.position.copy(cellPos(0, size)).setY(0.03)
        finish.position.copy(cellPos(size * size - 1, size)).setY(0.03)
        const span = size * CELL
        const half = span / 2
        for (const [i, b] of bounds.entries()) {
          const horiz = i < 2
          b.scale.set(horiz ? span : 0.08, WALL_H, horiz ? 0.08 : span)
          b.position.set(0, WALL_H / 2, 0)
          if (i === 0) b.position.z = -half
          else if (i === 1) b.position.z = half
          else if (i === 2) b.position.x = -half
          else b.position.x = half
        }
      }
      const progress = Math.max(0, Math.min(1, props.params.step ?? 0))
      const fi = Math.round(progress * trace.length)
      const opened = new Set<string>()
      for (let i = 0; i < fi; i++) { const e = trace[i]; opened.add(e.a < e.b ? `${e.a}-${e.b}` : `${e.b}-${e.a}`) }
      for (let i = 0; i < matrices.length; i++) {
        const [a, b] = pairs[i]
        const key2 = a < b ? `${a}-${b}` : `${b}-${a}`
        walls.setMatrixAt(i, opened.has(key2) ? ZERO : matrices[i])
      }
      walls.instanceMatrix.needsUpdate = true
      const curCell = trace[Math.max(0, fi - 1)]?.b ?? 0
      marker.position.copy(cellPos(curCell, size)).setY(0.3)

      setText(algoLabel, algo === 0 ? t('maze.dfs') : t('maze.prim'))
      setText(progLabel, `${t('maze.opened')}: ${fi}/${trace.length} · ${t('maze.cells')}: ${size * size}`)
      algoLabel.position.set(0, (size / 2) * CELL + 2, 0)
      progLabel.position.set(0, (size / 2) * CELL + 1.4, 0)
      // Same auto-carve pace as MazeGen.vue's own play button, driving the shared "step" slider —
      // harmless to a challenge here since maze challenges only ever require step >= 0.99.
      if (progress < 1) emit('set', 'step', Math.min(1, progress + dt / 3))
    }
  },
  { camera: [11, 13, 13], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
