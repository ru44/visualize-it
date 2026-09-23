<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { makeFn, riemannSamples, riemannSum, fmt, type RiemannRule } from '../engine/math'

// The same curve y = f(x) the 2D lesson integrates, spun around the x-axis into a solid of
// revolution. The pale smooth shape is the true solid; the stack of short opaque discs is the
// same n, a, b and rule the 2D rectangles use, turned into slices — shrink a rectangle's width to
// dx and spin it, and you get one disc of volume π·f(x)²·dx. That sum is exactly what the integral
// is doing, just made of solids instead of strips.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const SX = 1 // x → scene units
const SR = 0.15 // f(x) → scene units (radius)
const RINGS = 34
const ANG = 18
const MAX_DISCS = 32

useThree(
  el,
  ({ scene, theme }) => {
    const o = props.options ?? {}
    const fn = makeFn(o.expr ?? 'x^2')
    const f = (x: number) => fn(x, props.params)

    const surfGeo = new THREE.BufferGeometry()
    const surf = new THREE.Mesh(surfGeo, new THREE.MeshStandardMaterial({ color: theme.accent, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false, roughness: 0.8 }))
    scene.add(surf)

    const curve = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent2 }))
    scene.add(curve)

    const axis = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.14, gapSize: 0.1 }))
    scene.add(axis)

    const discGeo = new THREE.CylinderGeometry(1, 1, 1, 14, 1, false)
    discGeo.rotateZ(Math.PI / 2)
    const discs = new THREE.InstancedMesh(discGeo, new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.62, roughness: 0.5 }), MAX_DISCS)
    discs.castShadow = true
    scene.add(discs)
    const dummy = new THREE.Object3D()

    const nTag = label('', '#888', 0.42)
    const sumTag = label('', '#888', 0.42)
    const volTag = label('', '#888', 0.42)
    scene.add(nTag, sumTag, volTag)
    const paint = (sp: THREE.Sprite, text: string, color: THREE.Color) => {
      const c = (sp.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = '600 30px Inter, sans-serif'
      cx.textAlign = 'center'
      cx.fillText(text, c.width / 2, 40)
      ;(sp.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let lastKey = ''
    return () => {
      const a = Math.max(o.domain?.[0] ?? -1, props.params.a ?? 0)
      const b = Math.min(o.domain?.[1] ?? 5, props.params.b ?? 4)
      const n = Math.max(1, Math.round(props.params.n ?? 4))
      const rule = (o.rule as RiemannRule) ?? 'left'
      const key = `${a.toFixed(3)}|${b.toFixed(3)}|${n}|${rule}`
      if (key === lastKey || b <= a) return
      lastKey = key

      // smooth solid: the true surface of revolution
      const pos = new Float32Array(RINGS * (ANG + 1) * 3)
      const curvePts: THREE.Vector3[] = []
      for (let i = 0; i < RINGS; i++) {
        const x = a + ((b - a) * i) / (RINGS - 1)
        const r = Math.max(0, f(x)) * SR
        const xs = x * SX
        curvePts.push(new THREE.Vector3(xs, r, 0))
        for (let j = 0; j <= ANG; j++) {
          const ang = (j / ANG) * Math.PI * 2
          const k = (i * (ANG + 1) + j) * 3
          pos[k] = xs
          pos[k + 1] = r * Math.cos(ang)
          pos[k + 2] = r * Math.sin(ang)
        }
      }
      const idx: number[] = []
      for (let i = 0; i < RINGS - 1; i++) {
        for (let j = 0; j < ANG; j++) {
          const a0 = i * (ANG + 1) + j
          const b0 = a0 + (ANG + 1)
          idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1)
        }
      }
      surfGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      surfGeo.setIndex(idx)
      surfGeo.computeVertexNormals()
      curve.geometry.setFromPoints(curvePts)
      axis.geometry.setFromPoints([new THREE.Vector3((a - 0.4) * SX, 0, 0), new THREE.Vector3((b + 0.4) * SX, 0, 0)])
      axis.computeLineDistances()

      // discs: the same Riemann partition as the 2D rectangles, spun into slices
      const samples = riemannSamples(f, a, b, n, rule)
      const shown = Math.min(n, MAX_DISCS)
      const stride = n / shown
      let volSum = 0
      for (const s of samples) volSum += Math.PI * (Number.isFinite(s.y) ? s.y * s.y : 0) * s.dx
      for (let i = 0; i < shown; i++) {
        const s = samples[Math.min(n - 1, Math.round(i * stride))]
        const r = Math.max(1e-4, Math.abs(s.y)) * SR
        const dx = (n > MAX_DISCS ? (b - a) / shown : s.dx) * SX
        dummy.position.set((s.x0 + s.dx / 2) * SX, 0, 0)
        dummy.scale.set(dx * 0.94, r, r)
        dummy.updateMatrix()
        discs.setMatrixAt(i, dummy.matrix)
      }
      discs.count = shown
      discs.instanceMatrix.needsUpdate = true

      const areaSum = riemannSum(f, a, b, n, rule)
      paint(nTag, `n = ${n}`, theme.fg)
      paint(sumTag, `sum ≈ ${fmt(areaSum, 2)}`, theme.accent)
      paint(volTag, `V ≈ ${fmt(volSum, 2)}`, theme.accent2)
      const mid = ((a + b) / 2) * SX
      const topR = Math.max(0.6, f((a + b) / 2) * SR)
      nTag.position.set(mid, topR + 1.55, 0)
      sumTag.position.set(mid, topR + 1.05, 0)
      volTag.position.set(mid, topR + 0.55, 0)
    }
  },
  { camera: [3, 4, 8], target: [2.2, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
