<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label, type ThreeCtx } from './useThree'
import { loadModel, fit } from './models'

// Five modes, chosen once by options.mode (fixed per lesson, so each mode builds only what it needs):
//  default  (physics/newtons-second-law): a crate pushed by F = ma. params F, m.
//  incline  (physics/friction-inclined-plane): a crate on a ramp, a(θ) = g(sinθ − μcosθ). params mu, x.
//  work     (physics/work-and-energy): a crate pushed against a spring; the energy tank fills with
//            W = ½k(b²−a²), the same area the 2D picture shades. params k, a, b.
//  impulse  (physics/momentum-and-impulse): a force pulse along a timeline nudges a crate only inside
//            [a, b]; J = ∫ F dt matches the 2D picture's shaded pulse. params Fmax, w, a, b.
//  collision (physics/collisions): two carts collide with restitution e, same formulas as the 2D scene,
//            driving the shared `t` slider itself. params m1, m2, e, t.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const G = 9.81

const P = (key: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && key in o.fixed) return o.fixed[key]
  const src = (o.map && o.map[key]) || key
  return props.params[src] ?? d
}
const initialMode = props.options?.mode ?? 'default'

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(18, Math.min(34, Math.floor(340 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

function setupDefault({ scene, theme }: ThreeCtx) {
  scene.add(ground(30, theme))
  const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
  box.castShadow = true
  scene.add(box)
  loadModel('crate').then((m) => m && ((box.visible = false), scene.add(fit(m, 1)), (box.userData.model = m)))
  const force = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
  const accel = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.pos)
  scene.add(force, accel)
  for (let i = -14; i <= 14; i++) {
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.6), new THREE.MeshBasicMaterial({ color: theme.muted }))
    tick.position.set(i, 0.01, 1.2)
    scene.add(tick)
  }
  let x = -7
  let vel = 0
  watch(() => [P('F', 10), P('m', 2)], () => ((x = -7), (vel = 0)))
  return (dt: number) => {
    const F = P('F', 10)
    const m = P('m', 2)
    const a = F / m
    vel += a * dt * 0.6
    x += vel * dt * 0.6
    if (x > 12) ((x = -7), (vel = 0))
    const side = Math.cbrt(m) * 0.7
    box.scale.setScalar(side)
    box.position.set(x, side / 2, 0)
    const bm = box.userData.model as THREE.Object3D | undefined
    if (bm) (bm.scale.setScalar(side), bm.position.set(x, 0, 0))
    force.position.set(x - side / 2 - Math.max(0.3, F * 0.06), side / 2, 0)
    force.setLength(Math.max(0.3, F * 0.06), 0.3, 0.2)
    accel.position.set(x, side + 0.4, 0)
    accel.setLength(Math.max(0.2, a * 0.25), 0.3, 0.2)
  }
}

function setupIncline({ scene, theme }: ThreeCtx) {
  scene.add(ground(24, theme))
  const PIVOT_X = -6
  const RAMP_L = 9
  const RAMP_T = 0.25
  const BLOCK = 0.9
  const rampGroup = new THREE.Group()
  rampGroup.position.set(PIVOT_X, 0, 0)
  scene.add(rampGroup)
  const ramp = new THREE.Mesh(new THREE.BoxGeometry(RAMP_L, RAMP_T, 3), new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.85 }))
  ramp.position.set(RAMP_L / 2, RAMP_T / 2, 0)
  ramp.castShadow = true
  ramp.receiveShadow = true
  rampGroup.add(ramp)
  const block = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
  block.castShadow = true
  rampGroup.add(block)
  const gArrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
  const fArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.pos)
  rampGroup.add(gArrow, fArrow)
  const tag = label('', '#888', 0.5)
  scene.add(tag)
  const tmp = new THREE.Vector3()

  let s = RAMP_L * 0.72
  let sv = 0
  return (dt: number) => {
    const theta = (P('x', 30) * Math.PI) / 180
    const mu = Math.max(0, P('mu', 0.4))
    rampGroup.rotation.z = theta
    const gComp = Math.sin(theta)
    const fMax = mu * Math.cos(theta)
    const a = G * (gComp - fMax)
    if (a > 0) {
      sv += a * dt * 0.4
      s -= sv * dt * 0.4
      if (s < 0.5) ((s = RAMP_L * 0.72), (sv = 0))
    } else sv = 0
    const held = a <= 0
    const by = RAMP_T / 2 + BLOCK / 2
    block.position.set(s, by, 0)
    gArrow.position.set(s, by, 0)
    gArrow.setLength(Math.max(0.15, gComp * 1.3), 0.25, 0.15)
    fArrow.position.set(s, by, 0)
    fArrow.setLength(Math.max(0.15, (held ? gComp : fMax) * 1.3), 0.25, 0.15)
    block.getWorldPosition(tmp)
    tag.position.set(tmp.x, tmp.y + 1.1, tmp.z)
    setLabel(tag, `a = ${a.toFixed(2)} m/s²${held ? ' (held)' : ''}`, held ? theme.pos : theme.accent2)
  }
}

function setupWork({ scene, theme }: ThreeCtx) {
  scene.add(ground(24, theme))
  const ANCHOR_X = -9
  const BLOCK = 0.9
  const anchor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.4, 1.4), new THREE.MeshStandardMaterial({ color: theme.muted }))
  anchor.position.set(ANCHOR_X, 0.7, 0)
  anchor.castShadow = true
  scene.add(anchor)
  const block = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
  block.castShadow = true
  scene.add(block)
  const N = 14
  const spring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(Array.from({ length: N + 1 }, () => new THREE.Vector3())),
    new THREE.LineBasicMaterial({ color: theme.fg }),
  )
  scene.add(spring)
  const fArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
  scene.add(fArrow)
  const TANK_X = 8
  const TANK_H = 4
  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, TANK_H, 16, 1, true),
    new THREE.MeshStandardMaterial({ color: theme.line, side: THREE.DoubleSide, transparent: true, opacity: 0.35 }),
  )
  shell.position.set(TANK_X, TANK_H / 2, 0)
  scene.add(shell)
  const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1, 16), new THREE.MeshStandardMaterial({ color: theme.pos }))
  fill.position.set(TANK_X, 0.001, 0)
  scene.add(fill)
  const tag = label('', '#888', 0.5)
  scene.add(tag)

  const W_MAX = 200 // ½ · k_max(4) · b_max(10)²
  let phase = 0
  return (dt: number) => {
    const k = Math.max(0, P('k', 1.5))
    const a = P('a', 0)
    const b = P('b', 5)
    const lo = Math.min(a, b)
    const hi = Math.max(a, b)
    phase = (((phase + dt / 2.2) % 1) + 1) % 1
    const x = lo + (hi - lo) * phase
    const bx = ANCHOR_X + 1 + x
    block.position.set(bx, BLOCK / 2, 0)
    const pts = spring.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i <= N; i++) {
      const f = i / N
      const px = ANCHOR_X + 0.4 + f * (bx - ANCHOR_X - 0.4 - BLOCK / 2)
      const yOff = i === 0 || i === N ? 0 : i % 2 === 0 ? 0.18 : -0.18
      pts.setXYZ(i, px, 0.5 + yOff, 0)
    }
    pts.needsUpdate = true
    const F = k * x
    fArrow.position.set(bx + BLOCK / 2, BLOCK / 2, 0)
    fArrow.setLength(Math.max(0.2, F * 0.25), 0.25, 0.15)
    const W = 0.5 * k * (b * b - a * a)
    const frac = Math.max(0, Math.min(1, Math.abs(W) / W_MAX))
    fill.scale.y = Math.max(0.001, frac * TANK_H)
    fill.position.y = (frac * TANK_H) / 2 + 0.001
    tag.position.set(TANK_X, TANK_H + 0.6, 0)
    setLabel(tag, `W = ${W.toFixed(1)} J`, theme.pos)
  }
}

function setupImpulse({ scene, theme }: ThreeCtx) {
  scene.add(ground(24, theme))
  const T0 = -8
  const T1 = 8
  const BLOCK = 0.9
  const toX = (tt: number) => T0 + tt * (T1 - T0)
  const rail = new THREE.Mesh(new THREE.BoxGeometry(T1 - T0, 0.15, 0.15), new THREE.MeshStandardMaterial({ color: theme.line }))
  rail.position.set((T0 + T1) / 2, 0.3, -2)
  scene.add(rail)
  const highlight = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.2), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, opacity: 0.5, side: THREE.DoubleSide }))
  highlight.rotation.x = -Math.PI / 2
  highlight.position.y = 0.31
  scene.add(highlight)
  const piston = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
  piston.castShadow = true
  scene.add(piston)
  const fArrow = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.accent2)
  scene.add(fArrow)
  const block = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
  block.castShadow = true
  scene.add(block)
  const tag = label('', '#888', 0.5)
  scene.add(tag)

  let phase = 0
  let bx = toX(0.05)
  let bv = 0
  return (dt: number) => {
    const Fmax = Math.max(0, P('Fmax', 6))
    const w = Math.max(0.01, P('w', 0.08))
    const a = P('a', 0)
    const b = P('b', 1)
    const Fat = (tt: number) => Fmax * Math.exp(-(((tt - 0.5) / w) ** 2))
    const wasNearEnd = phase > 0.97
    phase = (((phase + dt / 2.5) % 1) + 1) % 1
    if (wasNearEnd && phase < 0.5) ((bx = toX(0.05)), (bv = 0))
    const height = Fat(phase)
    piston.position.set(toX(phase), 0.3 + height * 0.35, -2)
    fArrow.position.set(toX(phase), 0.32, -2)
    fArrow.setLength(Math.max(0.15, height * 0.35), 0.2, 0.12)
    const lo = Math.min(a, b)
    const hi = Math.max(a, b)
    highlight.scale.x = Math.max(0.02, (hi - lo) * (T1 - T0))
    highlight.position.x = toX((lo + hi) / 2)
    if (phase >= lo && phase <= hi) bv += height * dt * 0.5
    bx += bv * dt * 0.5
    block.position.set(Math.min(toX(1) - 0.6, bx), BLOCK / 2, 2)
    const n = 200
    let sum = Fat(lo) + Fat(hi)
    for (let i = 1; i < n; i++) sum += Fat(lo + ((hi - lo) * i) / n) * (i % 2 ? 4 : 2)
    const J = (sum * (hi - lo)) / n / 3
    tag.position.set(0, 3.2, 0)
    setLabel(tag, `J = ${J.toFixed(2)} N·s`, theme.pos)
  }
}

function setupCollision({ scene, theme }: ThreeCtx) {
  scene.add(ground(24, theme))
  const V1I = 4
  const V2I = -1
  const x1_0 = -6
  const x2_0 = 6
  const halfW = (m: number) => 0.5 + 0.15 * m
  const cart1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
  cart1.castShadow = true
  scene.add(cart1)
  const cart2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.6 }))
  cart2.castShadow = true
  scene.add(cart2)
  const v1Arrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.fg)
  const v2Arrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.fg)
  scene.add(v1Arrow, v2Arrow)
  const tag = label('', '#888', 0.5)
  scene.add(tag)

  let playing = true
  watch(() => [P('m1', 6), P('m2', 6), P('e', 1)], () => ((playing = true), emit('set', 't', 0)))
  return (dt: number) => {
    const m1 = Math.max(0.5, P('m1', 6))
    const m2 = Math.max(0.5, P('m2', 6))
    const e = Math.max(0, Math.min(1, P('e', 1)))
    const tCollide = (x2_0 - x1_0 - halfW(m1) - halfW(m2)) / (V1I - V2I)
    const v1f = ((m1 - e * m2) * V1I + (1 + e) * m2 * V2I) / (m1 + m2)
    const v2f = ((m2 - e * m1) * V2I + (1 + e) * m1 * V1I) / (m1 + m2)
    const tEnd = tCollide + 1.3
    const tProg = Math.max(0, Math.min(1, P('t', 0)))
    if (playing && dt > 0) {
      const next = tProg + dt / 3.5
      if (next >= 1) (emit('set', 't', 1), (playing = false))
      else emit('set', 't', next)
    }
    const time = tProg * tEnd
    const hit = time >= tCollide
    const x1c = x1_0 + V1I * tCollide
    const x2c = x2_0 + V2I * tCollide
    const x1 = hit ? x1c + v1f * (time - tCollide) : x1_0 + V1I * time
    const x2 = hit ? x2c + v2f * (time - tCollide) : x2_0 + V2I * time
    const cv1 = hit ? v1f : V1I
    const cv2 = hit ? v2f : V2I
    const s1 = Math.cbrt(m1) * 0.6
    const s2 = Math.cbrt(m2) * 0.6
    cart1.scale.setScalar(s1)
    cart1.position.set(x1, s1 / 2, 0)
    cart2.scale.setScalar(s2)
    cart2.position.set(x2, s2 / 2, 0)
    v1Arrow.position.set(x1, s1 + 0.3, 0)
    v1Arrow.setDirection(new THREE.Vector3(cv1 >= 0 ? 1 : -1, 0, 0))
    v1Arrow.setLength(Math.max(0.15, Math.abs(cv1) * 0.3), 0.22, 0.14)
    v2Arrow.position.set(x2, s2 + 0.3, 0)
    v2Arrow.setDirection(new THREE.Vector3(cv2 >= 0 ? 1 : -1, 0, 0))
    v2Arrow.setLength(Math.max(0.15, Math.abs(cv2) * 0.3), 0.22, 0.14)
    const p0 = m1 * V1I + m2 * V2I
    tag.position.set(0, 3, 0)
    setLabel(tag, `p = ${p0.toFixed(1)} kg·m/s`, theme.fg)
  }
}

const CAMERAS: Record<string, { camera: [number, number, number]; target: [number, number, number] }> = {
  default: { camera: [1, 6, 15], target: [2, 0.6, 0] },
  incline: { camera: [-1, 7, 14], target: [-2, 2.5, 0] },
  work: { camera: [2, 6, 15], target: [0, 1.5, 0] },
  impulse: { camera: [0, 6, 15], target: [0, 1.5, 0] },
  collision: { camera: [2, 6, 14], target: [0, 0.8, 0] },
}

useThree(
  el,
  (ctx) => {
    if (initialMode === 'incline') return setupIncline(ctx)
    if (initialMode === 'work') return setupWork(ctx)
    if (initialMode === 'impulse') return setupImpulse(ctx)
    if (initialMode === 'collision') return setupCollision(ctx)
    return setupDefault(ctx)
  },
  CAMERAS[initialMode] ?? CAMERAS.default,
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
