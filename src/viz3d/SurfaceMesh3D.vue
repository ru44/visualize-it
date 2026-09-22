<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { compile } from 'mathjs'
import { useThree, arrow } from './useThree'

// z = f(x, y) as a shaded mesh with contour-like colouring, a tangent plane and the gradient arrow.
// options: expr, extent, zRange; params x0, y0.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

useThree(
  el,
  ({ scene, theme }) => {
    const code = compile(props.options.expr)
    const f = (x: number, y: number) => {
      try {
        const v = code.evaluate({ x, y })
        return typeof v === 'number' && Number.isFinite(v) ? v : 0
      } catch {
        return 0
      }
    }
    const e = props.options.extent ?? 2
    const [z0, z1] = props.options.zRange ?? [0, 8]
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
  },
  { camera: [5, 5, 6], target: [0, 1.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
