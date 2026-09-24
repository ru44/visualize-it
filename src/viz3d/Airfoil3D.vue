<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow } from './useThree'
import { loadModel, fit } from './models'

// Five modes share this file. Default (mode undefined/'craft', unchanged): an aircraft pitched to the angle of
// attack in a stream of air particles — aerodynamics/lift and aerodynamics/stall-and-angle-of-attack, params alpha, v.
// 'drag'    a body in a wind tunnel, drag arrow grows with v² — aerodynamics/drag-equation, params rho, Cd, A, x.
// 'wings'   a wing whose span sets its aspect ratio, with lift/drag arrows — aerodynamics/lift-to-drag, params AR, x.
// 'mach'    an aircraft with a Mach cone past Mach 1 — aerodynamics/mach-number, params x (air temp K), vAircraft.
// 'venturi' a narrowing pipe, flow speeds up and pressure drops at the throat — aerodynamics/bernoulli, params v1, ratio;
//           also physics/bernoulli-and-flow-rate, which drags absolute areas A1 and x=A2 instead of a ratio — options.map
//           renames A2 to x for that lesson, and the venturi code below derives ratio = A2/A1 whenever A1 is supplied.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const mode = (props.options?.mode as string | undefined) ?? 'craft'

// Reads slider k: options.fixed pins a value with no slider, options.map renames a slider. Used only by
// the venturi mode below — the other modes are untouched and keep reading props.params directly.
function P(k: string, d: number): number {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

useThree(
  el,
  ({ scene, theme }) => {
    if (mode === 'drag') {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.4, 24), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
      body.rotation.z = Math.PI / 2 // flat face confronts the oncoming wind (−X)
      scene.add(body)
      const drag = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1.2, 0, 0), 1, theme.accent2)
      scene.add(drag)
      const tunnel = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(14, 5, 5)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.35 }))
      scene.add(tunnel)
      const N = 300
      const pts = new Float32Array(N * 3)
      for (let i = 0; i < N; i++) pts.set([(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 4.4, (Math.random() - 0.5) * 4.4], i * 3)
      const air = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)), new THREE.PointsMaterial({ color: theme.muted, size: 0.06 }))
      scene.add(air)
      return (dt) => {
        const rho = props.params.rho ?? 1.225
        const Cd = props.params.Cd ?? 0.3
        const A = props.params.A ?? 2.2
        const v = props.params.x ?? 25
        const r = Math.max(0.15, Math.sqrt(A / Math.PI))
        body.scale.set(r, 1, r)
        const D = 0.5 * rho * Cd * A * v * v
        drag.position.set(1.2, 0, 0)
        drag.setLength(Math.min(6, D / 300) + 0.2, 0.4, 0.25)
        const p = air.geometry.attributes.position as THREE.BufferAttribute
        const speed = 2 + v / 15
        for (let i = 0; i < N; i++) {
          let x = p.getX(i) - dt * speed
          if (x < -10) x = 10
          p.setX(i, x)
        }
        p.needsUpdate = true
      }
    } else if (mode === 'wings') {
      const S = 16 // reference wing area — matches the default mode's S so C_L, C_D read the same as the 2D picture
      const chord = 1.4
      const wing = new THREE.Mesh(new THREE.BoxGeometry(chord, 0.1, 1), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
      scene.add(wing)
      const refWing = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(chord, 0.1, 1)), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.5 }))
      refWing.position.y = -1.3
      scene.add(refWing)
      const lift = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0.1, 0), 1, theme.pos)
      const drag = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0.1, 0), 1, theme.accent2)
      scene.add(lift, drag)
      return () => {
        const AR = props.params.AR ?? 7
        const a = props.params.x ?? 5
        wing.scale.z = Math.max(0.5, 0.4 * Math.sqrt(AR * S))
        refWing.scale.z = 0.4 * Math.sqrt(6 * S)
        const CL = 0.11 * (a + 2)
        const CD = 0.02 + (CL * CL) / (Math.PI * AR * 0.85)
        lift.setLength(Math.min(4, Math.max(0.05, CL * 2)) + 0.2, 0.35, 0.22)
        drag.setLength(Math.min(4, Math.max(0.05, CD * 16)) + 0.2, 0.35, 0.22)
      }
    } else if (mode === 'mach') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 2.4, 6, 12), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }))
      body.rotation.z = Math.PI / 2
      scene.add(body)
      const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 24, 1, true), new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.3, side: THREE.DoubleSide }))
      cone.rotation.z = -Math.PI / 2 // apex toward the nose (+X), opening toward the wake (−X)
      scene.add(cone)
      const rings = [0.55, 0.95, 1.35].map((r0) => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(r0, 0.015, 6, 32), new THREE.MeshBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.55 - r0 * 0.15 }))
        m.rotation.y = Math.PI / 2
        scene.add(m)
        return m
      })
      return () => {
        const T = props.params.x ?? 288
        const v = props.params.vAircraft ?? 250
        const a = Math.sqrt(1.4 * 287 * T)
        const M = v / a
        const supersonic = M > 1
        cone.visible = supersonic
        rings.forEach((r) => (r.visible = !supersonic))
        if (supersonic) {
          // Fix the cone's base radius and solve for its length: right at Mach 1 the cone angle is ~90° (short,
          // wide), and it narrows and stretches out as M grows — this stays on screen instead of blowing up near M=1.
          const mu = Math.asin(Math.min(1, 1 / M))
          const rad = 1.3
          const len = Math.min(6, rad / Math.tan(mu))
          cone.scale.set(rad, len, rad)
          cone.position.set(1.2 - len / 2, 0, 0)
        }
      }
    } else if (mode === 'venturi') {
      const L = 8
      const R1 = 1.1
      const FLAT = L * 0.34
      const pipeR = (z: number, rt: number) => rt + (R1 - rt) * smoothstep(Math.min(1, Math.abs(z) / FLAT))
      const buildPipe = (ratio: number) => {
        const rt = R1 * Math.sqrt(ratio)
        const pts = Array.from({ length: 29 }, (_, i) => {
          const z = -L / 2 + (L * i) / 28
          return new THREE.Vector2(Math.max(0.03, pipeR(z, rt)), z)
        })
        const geo = new THREE.LatheGeometry(pts, 22)
        geo.rotateZ(Math.PI / 2) // the lathe's profile axis becomes the world flow axis (X); the profile is symmetric so the sign flip does not matter
        return geo
      }
      const pipe = new THREE.Mesh(buildPipe(0.5), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.9, transparent: true, opacity: 0.45, side: THREE.DoubleSide }))
      scene.add(pipe)
      const hi = theme.accent
      const lo = theme.accent2
      const stations = [-3.6, 0, 3.6].map((x) => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 6, 24), new THREE.MeshBasicMaterial({ color: hi }))
        m.rotation.y = Math.PI / 2
        m.position.x = x
        scene.add(m)
        return m
      })
      const N = 140
      const seed = Array.from({ length: N }, () => ({ z: (Math.random() - 0.5) * L, ang: Math.random() * Math.PI * 2, frac: 0.2 + Math.random() * 0.7 }))
      const posArr = new Float32Array(N * 3)
      const flow = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(posArr, 3)), new THREE.PointsMaterial({ color: theme.line, size: 0.07 }))
      scene.add(flow)
      let lastRatio = -1
      return (dt) => {
        const v1 = P('v1', 10)
        const A1 = P('A1', 0) // 0 = this lesson has no A1 slider, so fall back to a direct ratio slider
        const ratio = Math.max(0.05, A1 > 0 ? P('A2', A1) / A1 : P('ratio', 0.5))
        const rt = R1 * Math.sqrt(ratio)
        if (Math.abs(ratio - lastRatio) > 1e-3) {
          pipe.geometry.dispose()
          pipe.geometry = buildPipe(ratio)
          stations.forEach((m) => {
            const r = pipeR(m.position.x, rt)
            m.scale.setScalar(r / 0.3)
            const f = Math.max(0, Math.min(1, (R1 - r) / (R1 - rt + 1e-6)))
            ;(m.material as THREE.MeshBasicMaterial).color.copy(hi).lerp(lo, f)
          })
          lastRatio = ratio
        }
        const p = flow.geometry.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < N; i++) {
          const s = seed[i]
          const r = pipeR(s.z, rt)
          const speed = v1 * (R1 / r) ** 2
          s.z += dt * speed * 0.45
          if (s.z > L / 2) s.z = -L / 2
          const rr = pipeR(s.z, rt) * s.frac
          p.setXYZ(i, s.z, rr * Math.cos(s.ang), rr * Math.sin(s.ang))
        }
        p.needsUpdate = true
      }
    }
    // default: an aircraft pitched to the angle of attack in a stream of air particles. lift and drag arrows scale with
    // the same simple model as the 2D airfoil (C_L linear to 15°, then stall). params alpha (deg), v (m/s).
    const craft = new THREE.Group()
    scene.add(craft)
    // Fallback: a simple wing-and-body shape.
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 3, 8, 16), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }))
    body.rotation.z = Math.PI / 2
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 5), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
    craft.add(body, wing)
    loadModel('airplane').then((m) => m && ((body.visible = wing.visible = false), craft.add(fit(m, 7))))
    const lift = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.pos)
    const drag = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    scene.add(lift, drag)
    // Air: streaks flowing along −X → they move from +X to −X past the craft (craft flies toward −X? keep air flowing toward −X).
    const N = 400
    const pts = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) pts.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 8 + 1, (Math.random() - 0.5) * 10], i * 3)
    const air = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)), new THREE.PointsMaterial({ color: theme.muted, size: 0.06 }))
    scene.add(air)
    const grid = new THREE.GridHelper(30, 30, theme.line, theme.grid)
    grid.position.y = -3
    scene.add(grid)
    return (dt) => {
      const a = props.params.alpha ?? 5
      const v = props.params.v ?? 50
      const CL = a <= 15 ? 0.11 * (a + 2) : Math.max(0.3, 1.87 - 0.19 * (a - 15))
      const CD = 0.02 + (CL * CL) / (Math.PI * 7 * 0.85) + (a > 15 ? 0.35 * Math.min(1, (a - 15) / 5) : 0)
      craft.rotation.z = (a * Math.PI) / 180 // nose up
      const q = 0.5 * 1.225 * v * v * 16
      lift.position.set(0, 1, 0)
      lift.setLength(Math.min(6, (q * CL) / 12000) + 0.2, 0.4, 0.25)
      drag.position.set(0, 1, 0)
      drag.setDirection(new THREE.Vector3(-1, 0, 0))
      drag.setLength(Math.min(6, (q * CD) / 12000) + 0.2, 0.4, 0.25)
      // air streams past toward −X; above the wing it is nudged down behind the craft (downwash) and gets turbulent when stalled
      const p = air.geometry.attributes.position as THREE.BufferAttribute
      const stalled = a > 15
      for (let i = 0; i < N; i++) {
        let x = p.getX(i) - dt * (2 + v / 20)
        let y = p.getY(i)
        const z = p.getZ(i)
        if (x < 0 && x > -6 && Math.abs(z) < 3) y -= dt * CL * 0.6 * (y > 0 ? 1 : 0.3)
        if (stalled && x < 0.5 && x > -5 && y > 0 && y < 2.5 && Math.abs(z) < 3) y += (Math.random() - 0.5) * dt * 6
        if (x < -12) (x = 12), (y = (Math.random() - 0.5) * 8 + 1)
        p.setXYZ(i, x, y, z)
      }
      p.needsUpdate = true
    }
  },
  mode === 'wings'
    ? { camera: [9, 3.2, 1.5], target: [0, -0.4, 0], fov: 45 }
    : mode === 'venturi'
      ? { camera: [6, 3, 8], target: [0, 0, 0], fov: 45 }
      : mode === 'mach'
        ? { camera: [6, 3, 11], target: [0, 0.3, -1], fov: 42 }
        : mode === 'drag'
          ? { camera: [7, 3, 10], target: [0, 0, 0], fov: 45 }
          : { camera: [5, 3, 10], target: [0, 0.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
