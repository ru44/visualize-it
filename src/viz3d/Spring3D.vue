<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from './useThree'

// options.mode picks the physics; default 'free' is the original scene, untouched.
// 'free'   x(t) = A cos(wt), w = sqrt(k/m)                                    — physics/simple-harmonic-motion
// 'damped' m x¨ + c x˙ + kx = 0, released from x0 at rest — same closed form  — physics/damped-oscillation
//          as src/viz/DampedSpring.vue's xAt(), so the two views agree exactly.
// 'driven' steady-state driven amplitude X(w) = F/sqrt((w0²-w²)²+(2gw)²),     — waves/damped-oscillation-resonance
//          peaking near w0; the support itself is drawn shaking at w to show what is driving it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const P = (k: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

// Same closed form as DampedSpring.vue's xAt(): released from x0 with zero velocity.
function dampedX(t: number, x0: number, k: number, m: number, c: number): number {
  const w = Math.sqrt(k / m)
  const z = c / (2 * Math.sqrt(k * m))
  if (z < 0.999) {
    const wd = w * Math.sqrt(1 - z * z)
    return x0 * Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t))
  }
  if (z < 1.001) return x0 * (1 + w * t) * Math.exp(-w * t)
  const s = w * Math.sqrt(z * z - 1)
  const r1 = -w * z + s
  const r2 = -w * z - s
  return x0 * ((r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1))
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(12, theme))
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 1), new THREE.MeshStandardMaterial({ color: theme.muted }))
    beam.position.y = 6
    scene.add(beam)
    // Fallback coil.
    const coil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 80 }, (_, i) => new THREE.Vector3(0.35 * Math.cos(i * 0.6), i / 79, 0.35 * Math.sin(i * 0.6)))), 200, 0.04, 8), new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.6, roughness: 0.4 }))
    scene.add(coil)
    const mass = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5 }))
    mass.castShadow = true
    scene.add(mass)
    const eq = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.55, 32), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    eq.rotation.x = -Math.PI / 2
    scene.add(eq)
    const trail = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent }))
    scene.add(trail)
    const hist: number[] = []
    const rest = 3 // equilibrium height of the mass centre
    const mode = props.options?.mode ?? 'free'

    return () => {
      let y: number
      let massScale = 1
      if (mode === 'damped') {
        const k = P('k', 20)
        const m = P('m', 1)
        const c = P('c', 2)
        const x0 = P('x0', 1)
        const t = P('t', 0)
        y = rest - dampedX(t, x0, k, m, c)
        massScale = Math.cbrt(m) * 0.9
        beam.position.y = 6
      } else if (mode === 'driven') {
        const A = P('A', 3)
        const g = P('g', 0.2)
        const w = P('w', 3)
        const t = P('x', 3)
        const F = P('F', 2)
        const w0 = P('w0', 3)
        const denom = Math.sqrt((w0 * w0 - w * w) ** 2 + (2 * g * w) ** 2)
        const X = denom > 1e-6 ? F / denom : A
        const phase = Math.atan2(2 * g * w, w0 * w0 - w * w)
        const driveAmp = Math.min(0.5, 0.06 * A) // small visible shake of the support driving it
        beam.position.y = 6 + driveAmp * Math.cos(w * t)
        y = rest - Math.min(3, X) * Math.cos(w * t - phase)
      } else {
        const A = props.params.A ?? 1
        const k = props.params.k ?? 4
        const m = props.params.m ?? 1
        const t = props.params.x ?? 0
        const w = Math.sqrt(k / m)
        y = rest - A * Math.cos(w * t) // scene: +A means stretched downward at t = 0
        massScale = Math.cbrt(m) * 0.9
        beam.position.y = 6
      }
      mass.position.set(0, y, 0)
      mass.scale.setScalar(massScale)
      eq.position.set(0, rest, 0)
      const len = beam.position.y - 0.1 - (y + 0.4 * mass.scale.y)
      coil.position.y = y + 0.4 * mass.scale.y
      coil.scale.y = len
      hist.push(y)
      if (hist.length > 240) hist.shift()
      trail.geometry.setFromPoints(hist.map((h, i) => new THREE.Vector3(1.5 + (i / 240) * 6, h, 0)))
    }
  },
  { camera: [7, 5, 11], target: [2.5, 3, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
