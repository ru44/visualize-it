<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'

// The potential V(x,y) = kq1/r1 + kq2/r2 (exactly the 2D readout's formula) drawn as a landscape: a hill
// where V is positive, a well where it is negative. The 2D picture only ever gives V as a number at one
// dragged point; here the whole surface is visible at once, a small positive test charge visibly rolls
// downhill toward lower V, and the rings on the slopes are true equipotentials of that same surface.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const K = 8.99e9
const EX = 4
const EY = 2.4
const FLOOR = 0.35 // closest a grid point/ball may get to a charge, so V stays finite
const H = 2.2 // scene units for the tallest hill / deepest well
const VSCALE = 20000 // V that maps to a visually "full" hill (matches the lesson's own 20 kV target)
const N = 30

function potentialAt(x: number, y: number, Q1: number, Q2: number, x1: number, x2: number) {
  const r1 = Math.max(Math.hypot(x - x1, y), FLOOR)
  const r2 = Math.max(Math.hypot(x - x2, y), FLOOR)
  return K * Q1 * (1 / r1) + K * Q2 * (1 / r2)
}
const heightOf = (v: number) => H * Math.tanh(v / VSCALE)

useThree(
  el,
  ({ scene, theme }) => {
    const xs = Array.from({ length: N + 1 }, (_, i) => -EX + (2 * EX * i) / N)
    const ys = Array.from({ length: N + 1 }, (_, j) => -EY + (2 * EY * j) / N)
    const hGrid: number[][] = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0))

    const nVerts = (N + 1) * (N + 1)
    const positions = new Float32Array(nVerts * 3)
    const colors = new Float32Array(nVerts * 3)
    const indices: number[] = []
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const a = j * (N + 1) + i
        const b = a + 1
        const c = a + (N + 1)
        const d = c + 1
        indices.push(a, c, b, b, c, d)
      }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setIndex(indices)
    const surface = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.85 }))
    surface.receiveShadow = true
    scene.add(surface)
    scene.add(new THREE.GridHelper(2 * EX, 16, theme.grid, theme.grid))

    const contourPos = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.pos, transparent: true, opacity: 0.75 }))
    const contourNeg = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.75 }))
    scene.add(contourPos, contourNeg)

    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 14), new THREE.MeshStandardMaterial({ color: theme.fg }))
    ball.castShadow = true
    scene.add(ball)
    const tag = label('', undefined, 0.5)
    scene.add(tag)

    const scratch = new THREE.Color()
    function marchLevel(level: number, out: THREE.Vector3[]) {
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const x0 = xs[i]!
          const x1 = xs[i + 1]!
          const y0 = ys[j]!
          const y1 = ys[j + 1]!
          const corners: [number, number, number][] = [
            [x0, y0, hGrid[j]![i]!],
            [x1, y0, hGrid[j]![i + 1]!],
            [x1, y1, hGrid[j + 1]![i + 1]!],
            [x0, y1, hGrid[j + 1]![i]!],
          ]
          const cross: THREE.Vector3[] = []
          for (let e = 0; e < 4; e++) {
            const a = corners[e]!
            const b = corners[(e + 1) % 4]!
            if ((a[2] - level) * (b[2] - level) < 0) {
              const t = (level - a[2]) / (b[2] - a[2])
              cross.push(new THREE.Vector3(a[0] + (b[0] - a[0]) * t, level, -(a[1] + (b[1] - a[1]) * t)))
            }
          }
          if (cross.length >= 2) out.push(cross[0]!, cross[1]!)
        }
      }
    }

    let bx = 0
    let by = 0
    let bvx = 0
    let bvy = 0
    function resetBall() {
      bx = THREE.MathUtils.clamp(props.params.px ?? 0.5, -EX, EX)
      by = THREE.MathUtils.clamp(props.params.py ?? 1.2, -EY, EY)
      bvx = 0
      bvy = 0
    }

    function rebuild() {
      const q1 = props.params.q1 ?? 2
      const q2 = props.params.q2 ?? 2
      const d = Math.max(0.2, props.params.d ?? 3)
      const Q1 = q1 * 1e-6
      const Q2 = q2 * 1e-6
      const x1 = -d / 2
      const x2 = d / 2
      for (let j = 0; j <= N; j++) {
        const y = ys[j]!
        for (let i = 0; i <= N; i++) {
          const x = xs[i]!
          const h = heightOf(potentialAt(x, y, Q1, Q2, x1, x2))
          hGrid[j]![i] = h
          const idx = j * (N + 1) + i
          positions[idx * 3] = x
          positions[idx * 3 + 1] = h
          positions[idx * 3 + 2] = -y
          scratch.copy(theme.sunken)
          if (h >= 0) scratch.lerp(theme.pos, Math.min(1, h / H))
          else scratch.lerp(theme.neg, Math.min(1, -h / H))
          colors[idx * 3] = scratch.r
          colors[idx * 3 + 1] = scratch.g
          colors[idx * 3 + 2] = scratch.b
        }
      }
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
      geo.computeVertexNormals()
      const pPts: THREE.Vector3[] = []
      const nPts: THREE.Vector3[] = []
      for (const lvl of [0.4, 0.9, 1.5]) {
        marchLevel(lvl, pPts)
        marchLevel(-lvl, nPts)
      }
      contourPos.geometry.setFromPoints(pPts)
      contourNeg.geometry.setFromPoints(nPts)
      resetBall()
    }
    rebuild()
    watch(() => [props.params.q1, props.params.q2, props.params.d, props.params.px, props.params.py], rebuild)

    let lastText = ''
    return (dt: number) => {
      const q1 = props.params.q1 ?? 2
      const q2 = props.params.q2 ?? 2
      const d = Math.max(0.2, props.params.d ?? 3)
      const Q1 = q1 * 1e-6
      const Q2 = q2 * 1e-6
      const x1 = -d / 2
      const x2 = d / 2
      const EPS = 0.05
      const hC = heightOf(potentialAt(bx, by, Q1, Q2, x1, x2))
      const gx = (heightOf(potentialAt(bx + EPS, by, Q1, Q2, x1, x2)) - heightOf(potentialAt(bx - EPS, by, Q1, Q2, x1, x2))) / (2 * EPS)
      const gy = (heightOf(potentialAt(bx, by + EPS, Q1, Q2, x1, x2)) - heightOf(potentialAt(bx, by - EPS, Q1, Q2, x1, x2))) / (2 * EPS)
      const ACC = 2.4
      const DAMP = 2.2
      bvx += (-gx * ACC - DAMP * bvx) * dt
      bvy += (-gy * ACC - DAMP * bvy) * dt
      bx = THREE.MathUtils.clamp(bx + bvx * dt, -EX, EX)
      by = THREE.MathUtils.clamp(by + bvy * dt, -EY, EY)
      ball.position.set(bx, hC + 0.1, -by)
      tag.position.set(bx, hC + 0.5, -by)

      const V = potentialAt(bx, by, Q1, Q2, x1, x2)
      const text = `V ≈ ${V.toExponential(2)} V`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.font = '500 22px Inter, sans-serif'
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.textAlign = 'center'
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [7, 6, 8], target: [0, 0.3, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
