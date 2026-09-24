<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { compile } from 'mathjs'
import { useThree, arrow, ground, type Theme } from './useThree'

// options.mode picks the surface; default 'tangent' is the original z = f(x, y) scene (a shaded mesh,
// a tangent plane and the gradient arrow at x0, y0), completely unchanged — calculus/gradient,
// ai/loss-landscape, calculus/partial-derivatives-saddle.
// 'bell' draws the bivariate normal density (1/(2πs²))·exp(−(u²+v²)/2), u = (x−μ)/s, v = (y−μ)/s,
// for statistics/normal-distribution: the surface is built once in these z-score coordinates (a
// fixed unit-height bump centred under the camera), and each frame only its group's scale changes —
// width by s, height by 1/(2πs²) — an exact, cheap reproduction of the part of the formula that
// isn't just "shift by μ". Two rings mark 1σ and 2σ, tying back to the lesson's own 68/95/99.7 rule
// — a full 2D domain the 2D chart's single 1D slice through μ cannot show.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const mode = props.options?.mode ?? 'tangent'

const P = (k: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

function setupTangent(scene: THREE.Scene, theme: Theme, options: Record<string, any>) {
  const code = compile(options.expr)
  const f = (x: number, y: number) => {
    try {
      const v = code.evaluate({ x, y })
      return typeof v === 'number' && Number.isFinite(v) ? v : 0
    } catch {
      return 0
    }
  }
  const e = options.extent ?? 2
  const [z0, z1] = options.zRange ?? [0, 8]
  const zs = (z: number) => ((THREE.MathUtils.clamp(z, z0, z1) - z0) / (z1 - z0)) * 4 // scene height 0..4
  const N = 60
  const geo = new THREE.PlaneGeometry(2 * e, 2 * e, N, N)
  geo.rotateX(-Math.PI / 2)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)
  const lo = new THREE.Color(theme.accent).lerp(new THREE.Color(0xffffff), 0.35)
  const hi = new THREE.Color(theme.accent2)
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = -pos.getZ(i)
    const h = zs(f(x, y))
    pos.setY(i, h)
    const c = lo.clone().lerp(hi, h / 4)
    colors.set([c.r, c.g, c.b], i * 3)
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.7 }))
  mesh.castShadow = true
  scene.add(mesh)
  scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.08 })))
  const floor = new THREE.GridHelper(2 * e, 8, theme.line, theme.grid)
  scene.add(floor)
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.45, side: THREE.DoubleSide }))
  scene.add(plane)
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), new THREE.MeshStandardMaterial({ color: theme.fg }))
  scene.add(dot)
  const grad = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
  scene.add(grad)
  const drop = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.1, gapSize: 0.08 }))
  scene.add(drop)
  return () => {
    const x = props.params.x0 ?? 0
    const y = props.params.y0 ?? 0
    const h = 1e-4
    const fx = (f(x + h, y) - f(x - h, y)) / (2 * h)
    const fy = (f(x, y + h) - f(x, y - h)) / (2 * h)
    const k = 4 / (z1 - z0) // vertical scale
    const p = new THREE.Vector3(x, zs(f(x, y)), -y)
    dot.position.copy(p)
    plane.position.copy(p)
    // Tangent plane normal in scene coords: (−fx·k, 1, fy·k) (y is flipped into −z)
    plane.lookAt(p.clone().add(new THREE.Vector3(-fx * k, 1, fy * k)))
    const g = new THREE.Vector3(fx, 0, -fy)
    grad.position.set(x, 0.02, -y)
    grad.setDirection(g.length() ? g.clone().normalize() : new THREE.Vector3(1, 0, 0))
    grad.setLength(Math.min(2, g.length() * 0.3) + 0.01, 0.25, 0.15)
    drop.geometry.setFromPoints([p, new THREE.Vector3(x, 0, -y)])
    drop.computeLineDistances()
  }
}

function setupBell(scene: THREE.Scene, theme: Theme) {
  scene.add(ground(16, theme))
  const E = 3 // half-width shown, in standard deviations either side of the mean (the 3σ ≈ 99.7% rule)
  const N = 44
  const geo = new THREE.PlaneGeometry(2 * E, 2 * E, N, N)
  geo.rotateX(-Math.PI / 2)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)
  const lo = new THREE.Color(theme.accent).lerp(new THREE.Color(0xffffff), 0.4)
  const hi = new THREE.Color(theme.accent2)
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i)
    const v = pos.getZ(i)
    const h0 = Math.exp(-(u * u + v * v) / 2) // unit bivariate-normal shape in z-score coordinates
    pos.setY(i, h0)
    const c = lo.clone().lerp(hi, h0)
    colors.set([c.r, c.g, c.b], i * 3)
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  const group = new THREE.Group()
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.6 }))
  mesh.castShadow = true
  group.add(mesh)
  const ringMat = new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.55 })
  for (const r of [1, 2]) {
    const pts = Array.from({ length: 65 }, (_, i) => new THREE.Vector3(r * Math.cos((i / 64) * Math.PI * 2), 0.003, r * Math.sin((i / 64) * Math.PI * 2)))
    group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMat))
  }
  scene.add(group)
  const HEIGHT = 5 // visual exaggeration so the (small) density values read as a proper hill
  return () => {
    // μ only slides the peak along the 2D chart's x-axis; here the bell is always drawn centred
    // under the camera in σ-relative coordinates (so it can never drift out of frame), and only its
    // width (∝ s) and height (∝ 1/s²) respond to the slider — exactly the part of the formula μ
    // doesn't touch.
    const s = Math.max(0.05, P('s', 1.5))
    group.scale.set(s, HEIGHT / (2 * Math.PI * s * s), s)
  }
}

useThree(
  el,
  ({ scene, theme }) => (mode === 'bell' ? setupBell(scene, theme) : setupTangent(scene, theme, props.options)),
  mode === 'bell' ? { camera: [7, 5, 7], target: [0, 0.2, 0], fov: 42 } : { camera: [5, 5, 6], target: [0, 1.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
