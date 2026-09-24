<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label, type Theme } from './useThree'

// Gas particles in a glass box. Default mode (ideal-gas-law): a piston box, params n (mol), T (K), V (L).
// Other modes reuse the same "particles in a box" engine for related lessons:
//  - first-law: the same piston box, but the piston sweeps from volume a to b; Q, W and ΔU=0 become arrows+labels.
//  - specific-heat: a sealed box on a heater; particles go from a vibrating lattice (solid) to free flight
//    (liquid/vapour) as the same piecewise T(x) the 2D curve uses crosses 0°C and 100°C.
//  - entropy: two reservoirs (hot/cold) with a turbine between them; Qh splits into work and waste heat Qc.
//  - reaction-rate: particles collide in a box; only the fraction with enough energy (set by the Arrhenius
//    fraction reacted) have turned into product, and everyone moves faster as T rises.
//  - diffusion: one box split by a porous membrane; particles start nLeft/nRight per side and cross through
//    pores sized by permeability until the two sides balance.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

// Reads slider k: options.fixed pins a value with no slider, options.map renames a slider.
function opt(k: string, d: number): number {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}
const MODE = (props.options && props.options.mode) || 'ideal-gas-law'
const MAX = 220
const R = 0.07

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 32px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

function mkCloud(n: number, xr: [number, number], yr: [number, number], zr: [number, number]) {
  return Array.from({ length: n }, () => ({
    p: new THREE.Vector3(xr[0] + Math.random() * (xr[1] - xr[0]), yr[0] + Math.random() * (yr[1] - yr[0]), zr[0] + Math.random() * (zr[1] - zr[0])),
    v: new THREE.Vector3().randomDirection(),
  }))
}

function mkParticles(scene: THREE.Scene, max: number, color: THREE.Color, seg: [number, number] = [10, 8]) {
  const geo = new THREE.SphereGeometry(0.07, seg[0], seg[1])
  const mat = new THREE.MeshStandardMaterial({ color })
  const inst = new THREE.InstancedMesh(geo, mat, max)
  scene.add(inst)
  return { inst, mat }
}

function bounce(pts: { p: THREE.Vector3; v: THREE.Vector3 }[], count: number, bx: [number, number, number, number, number, number], speed: number, dt: number, inst: THREE.InstancedMesh, m4: THREE.Matrix4) {
  const [xmin, xmax, ymin, ymax, zmin, zmax] = bx
  for (let i = 0; i < count; i++) {
    const q = pts[i]
    q.p.addScaledVector(q.v, speed * dt)
    if (q.p.x < xmin + R || q.p.x > xmax - R) ((q.v.x *= -1), (q.p.x = THREE.MathUtils.clamp(q.p.x, xmin + R, xmax - R)))
    if (q.p.y < ymin + R || q.p.y > ymax - R) ((q.v.y *= -1), (q.p.y = THREE.MathUtils.clamp(q.p.y, ymin + R, ymax - R)))
    if (q.p.z < zmin + R || q.p.z > zmax - R) ((q.v.z *= -1), (q.p.z = THREE.MathUtils.clamp(q.p.z, zmin + R, zmax - R)))
    inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))
  }
  inst.instanceMatrix.needsUpdate = true
}

// Glass box + piston + rod, shared by the default mode and first-law. setW(width) moves the piston.
function buildPistonBox(scene: THREE.Scene, theme: Theme, H: number, D: number) {
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1, H, D), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.35 }))
  glass.position.y = H / 2
  scene.add(glass)
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, H, D)), new THREE.LineBasicMaterial({ color: theme.muted }))
  edges.position.y = H / 2
  scene.add(edges)
  const piston = new THREE.Mesh(new THREE.BoxGeometry(0.25, H - 0.1, D - 0.1), new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.4, roughness: 0.5 }))
  piston.castShadow = true
  piston.position.y = H / 2
  scene.add(piston)
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3, 12), new THREE.MeshStandardMaterial({ color: theme.muted }))
  rod.rotation.z = Math.PI / 2
  rod.position.y = H / 2
  scene.add(rod)
  const setW = (Wd: number) => {
    glass.scale.x = Wd
    glass.position.x = Wd / 2
    edges.scale.x = Wd
    edges.position.x = Wd / 2
    piston.position.x = Wd + 0.125
    rod.position.x = Wd + 1.6
  }
  return setW
}

function setupIdealGas(scene: THREE.Scene, theme: Theme) {
  const H = 3
  const D = 3
  scene.add(ground(16, theme))
  const setW = buildPistonBox(scene, theme, H, D)
  const { inst } = mkParticles(scene, MAX, theme.accent)
  const pts = mkCloud(MAX, [0, 1], [0, H], [-D / 2, D / 2])
  const m4 = new THREE.Matrix4()
  return (dt: number) => {
    const n = opt('n', 1)
    const T = opt('T', 300)
    const V = opt('V', 25)
    const Wd = 1 + (V / 50) * 7
    setW(Wd)
    const count = Math.min(MAX, Math.round(n * 40))
    inst.count = count
    bounce(pts, count, [0, Wd, 0, H, -D / 2, D / 2], 2.2 * Math.sqrt(T / 300), dt, inst, m4)
  }
}

// n, T, a, b: the piston sweeps between volumes a and b; Q, W and ΔU=0 (isothermal) are shown as arrows+labels
// using the same W = nRT ln(b/a) the 2D area-under-curve picture uses.
function setupFirstLaw(scene: THREE.Scene, theme: Theme) {
  const H = 3
  const D = 3
  scene.add(ground(16, theme))
  const setW = buildPistonBox(scene, theme, H, D)
  const { inst } = mkParticles(scene, MAX, theme.accent)
  const pts = mkCloud(MAX, [0, 1], [0, H], [-D / 2, D / 2])
  const m4 = new THREE.Matrix4()

  const qArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1.6, H / 2, 0), 1, theme.pos)
  const wArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, H + 0.5, 0), 1, theme.accent2)
  scene.add(qArrow, wArrow)
  const qTag = label('', theme.pos.getStyle(), 0.4)
  const wTag = label('', theme.accent2.getStyle(), 0.4)
  const uTag = label('ΔU = 0', theme.muted.getStyle(), 0.34)
  scene.add(qTag, wTag, uTag)

  let simT = 0
  return (dt: number) => {
    simT += dt
    const n = opt('n', 1)
    const T = opt('T', 300)
    const a = Math.max(0.05, opt('a', 1))
    const b = Math.max(0.05, opt('b', 5))
    const period = 5
    const s = (1 - Math.cos((simT * 2 * Math.PI) / period)) / 2
    const V = a + (b - a) * s
    const Wd = 1 + V * 0.6
    setW(Wd)
    const count = Math.min(MAX, Math.round(n * 40))
    inst.count = count
    bounce(pts, count, [0, Wd, 0, H, -D / 2, D / 2], 2.2 * Math.sqrt(T / 300), dt, inst, m4)

    const work = n * 8.314 * T * Math.log(b / a)
    const dir = work >= 0 ? 1 : -1
    qArrow.setDirection(new THREE.Vector3(dir, 0, 0))
    wArrow.position.set(Wd + (dir > 0 ? 0.2 : 1.7), H + 0.5, 0)
    wArrow.setDirection(new THREE.Vector3(dir, 0, 0))
    qTag.position.set(-1.6, H + 0.6, 0)
    wTag.position.set(Wd + 0.9, H + 1.1, 0)
    uTag.position.set(Wd / 2, H + 1.6, 0)
    paint(qTag, `Q ${work >= 0 ? '+' : ''}${Math.round(work)} J`, theme.pos)
    paint(wTag, `W ${work >= 0 ? '+' : ''}${Math.round(work)} J`, theme.accent2)
  }
}

// P, m, x: heating power, mass and elapsed time drive the same piecewise T(x) the 2D curve plots.
// Particles sit in a lattice (solid) below 0°C and are released into free flight as they melt/heat/boil.
function setupSpecificHeat(scene: THREE.Scene, theme: Theme) {
  const S = 2.6
  scene.add(ground(14, theme))
  const box = new THREE.Mesh(new THREE.BoxGeometry(S, S, S), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.3 }))
  box.position.set(S / 2, S / 2, 0)
  scene.add(box)
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
  edges.position.copy(box.position)
  scene.add(edges)
  const heaterMat = new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.2 })
  const heater = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.55, S * 0.55, 0.12, 24), heaterMat)
  heater.position.set(S / 2, 0.07, 0) // sits just above the ground plane to avoid z-fighting
  scene.add(heater)
  const tTag = label('', theme.fg.getStyle(), 0.36)
  tTag.position.set(S / 2, S + 0.5, 0)
  scene.add(tTag)

  const N = 140
  const { inst, mat } = mkParticles(scene, N, theme.muted, [8, 6])
  inst.count = N
  const side = Math.ceil(Math.cbrt(N))
  const lattice = Array.from({ length: N }, (_, i) => {
    const ix = i % side
    const iy = Math.floor(i / side) % side
    const iz = Math.floor(i / (side * side))
    return new THREE.Vector3(0.15 + (ix / side) * (S - 0.3), 0.15 + (iy / side) * (S - 0.3), -S / 2 + 0.15 + (iz / side) * (S - 0.3))
  })
  const free = mkCloud(N, [0.1, S - 0.1], [0.1, S - 0.1], [-S / 2 + 0.1, S / 2 - 0.1])
  const m4 = new THREE.Matrix4()

  let simT = 0
  return (dt: number) => {
    simT += dt
    const power = Math.max(1, opt('P', 1000))
    const m = Math.max(0.05, opt('m', 0.5))
    const x = Math.max(0, opt('x', 100))
    const t1 = (m * 41800) / power
    const t2 = t1 + (m * 334000) / power
    const t3 = t2 + (m * 418600) / power
    const T = x < t1 ? -20 + (power * x) / (m * 2090) : x < t2 ? 0 : x < t3 ? (100 * (x - t2)) / (t3 - t2) : 100
    const meltCount = x < t1 ? 0 : x < t2 ? Math.round(N * ((x - t1) / Math.max(0.001, t2 - t1))) : N
    const heat = THREE.MathUtils.clamp((T + 20) / 120, 0.05, 1)
    heaterMat.emissiveIntensity = 0.15 + heat * 1.2
    mat.color.lerpColors(theme.muted, x >= t3 ? theme.accent2 : theme.accent, x < t1 ? 0 : heat)
    const speed = 0.3 + heat * (x >= t3 ? 3.2 : 1.6)

    for (let i = 0; i < N; i++) {
      if (i < meltCount) {
        const q = free[i]
        q.p.addScaledVector(q.v, speed * dt)
        if (q.p.x < R || q.p.x > S - R) ((q.v.x *= -1), (q.p.x = THREE.MathUtils.clamp(q.p.x, R, S - R)))
        if (q.p.y < R || q.p.y > S - R) ((q.v.y *= -1), (q.p.y = THREE.MathUtils.clamp(q.p.y, R, S - R)))
        if (q.p.z < -S / 2 + R || q.p.z > S / 2 - R) ((q.v.z *= -1), (q.p.z = THREE.MathUtils.clamp(q.p.z, -S / 2 + R, S / 2 - R)))
        inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))
      } else {
        const base = lattice[i]
        const j = heat * 0.05 + 0.01
        const ox = Math.sin(simT * 3.1 + i * 0.7) * j
        const oy = Math.sin(simT * 2.7 + i * 1.3) * j
        const oz = Math.sin(simT * 3.5 + i * 0.9) * j
        inst.setMatrixAt(i, m4.makeTranslation(base.x + ox, base.y + oy, base.z + oz))
      }
    }
    inst.instanceMatrix.needsUpdate = true
    paint(tTag, `${T >= 0 ? '+' : ''}${Math.round(T)}°C`, theme.fg)
  }
}

// Tc, x (=Th): two reservoirs and a turbine between them. Qh splits into work (up) and waste heat Qc
// (to the cold side) in the ratio the Carnot efficiency η = 1 - Tc/Th sets.
function setupEntropy(scene: THREE.Scene, theme: Theme) {
  scene.add(ground(14, theme))
  const mkTank = (cx: number, color: THREE.Color) => {
    const glass = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 2.2), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.28 }))
    glass.position.set(cx, 1.2, 0)
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.copy(glass.position)
    scene.add(edges)
    const { inst } = mkParticles(scene, 70, color, [8, 6])
    inst.count = 70
    const pts = mkCloud(70, [cx - 1, cx + 1], [0.1, 2.3], [-1, 1])
    return { inst, pts, cx }
  }
  const hot = mkTank(-3, theme.accent2)
  const cold = mkTank(3, theme.accent)
  const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.6, 16), new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.5, roughness: 0.4 }))
  engine.position.set(0, 1.2, 0)
  scene.add(engine)

  const qh = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1.7, 1.2, 0), 1.3, theme.accent2)
  const w = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 2.1, 0), 0.6, theme.pos)
  const qc = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0.6, 1.2, 0), 0.8, theme.accent)
  scene.add(qh, w, qc)
  const etaTag = label('', theme.pos.getStyle(), 0.42)
  etaTag.position.set(0, 3, 0)
  scene.add(etaTag)
  const m4 = new THREE.Matrix4()

  return (dt: number) => {
    const Tc = Math.max(1, opt('Tc', 300))
    const Th = Math.max(Tc + 1, opt('x', 600))
    const eta = THREE.MathUtils.clamp(1 - Tc / Th, 0, 1)
    bounce(hot.pts, 70, [hot.cx - 1, hot.cx + 1, 0.1, 2.3, -1, 1], 1.6 * Math.sqrt(Th / 300), dt, hot.inst, m4)
    bounce(cold.pts, 70, [cold.cx - 1, cold.cx + 1, 0.1, 2.3, -1, 1], 1.6 * Math.sqrt(Tc / 300), dt, cold.inst, m4)
    engine.rotation.y += dt * (0.4 + eta * 2.5)
    w.setLength(Math.max(0.15, 0.3 + eta * 1.3), 0.22, 0.14)
    qc.setLength(Math.max(0.15, 0.3 + (1 - eta) * 1.3), 0.22, 0.14)
    paint(etaTag, `η ${Math.round(eta * 100)}%`, theme.pos)
  }
}

// A0, Af, Ea, T, x: particles collide in a box; the fraction that has reacted (product-coloured) tracks
// the same [A] = [A]0·e^(−kt), k = Af·e^(−Ea/RT) the 2D curve plots, and speed rises with T.
function setupReactionRate(scene: THREE.Scene, theme: Theme) {
  const H = 3
  const D = 3
  const Wd = 4
  scene.add(ground(14, theme))
  const glass = new THREE.Mesh(new THREE.BoxGeometry(Wd, H, D), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.28 }))
  glass.position.set(Wd / 2, H / 2, 0)
  scene.add(glass)
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
  edges.position.copy(glass.position)
  scene.add(edges)

  const N = 130
  // base colour white: InstancedMesh multiplies it by each instance's colour, so white keeps the
  // per-particle reactant/product colour true instead of tinting it.
  const { inst } = mkParticles(scene, N, new THREE.Color(0xffffff), [8, 6])
  const pts = mkCloud(N, [0, Wd], [0, H], [-D / 2, D / 2])
  const energyOrder = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - 0.5)
  const reacted = new Uint8Array(N)
  const col = new THREE.Color()
  const m4 = new THREE.Matrix4()
  const kTag = label('', theme.muted.getStyle(), 0.3)
  kTag.position.set(Wd / 2, H + 0.4, 0)
  scene.add(kTag)

  return (dt: number) => {
    const A0 = THREE.MathUtils.clamp(opt('A0', 1), 0.1, 2)
    const Af = Math.max(0, opt('Af', 1e7))
    const Ea = opt('Ea', 48570)
    const T = Math.max(1, opt('T', 300))
    const x = Math.max(0, opt('x', 20))
    const k = Af * Math.exp(-Ea / (8.314 * T))
    const frac = Math.min(1, Math.exp(-k * x))
    // A0 sets how crowded the box looks (more starting concentration, more visible particles);
    // the reacted fraction below is a ratio, so it applies the same way regardless of count.
    const count = Math.max(20, Math.round(N * (A0 / 2)))
    inst.count = count
    const reactedCount = Math.round(count * (1 - frac))
    reacted.fill(0)
    let marked = 0
    for (let r = 0; r < N && marked < reactedCount; r++) {
      if (energyOrder[r] < count) {
        reacted[energyOrder[r]] = 1
        marked++
      }
    }

    const speed = 1.6 * Math.sqrt(T / 300)
    for (let i = 0; i < count; i++) {
      const q = pts[i]
      q.p.addScaledVector(q.v, speed * dt)
      if (q.p.x < R || q.p.x > Wd - R) ((q.v.x *= -1), (q.p.x = THREE.MathUtils.clamp(q.p.x, R, Wd - R)))
      if (q.p.y < R || q.p.y > H - R) ((q.v.y *= -1), (q.p.y = THREE.MathUtils.clamp(q.p.y, R, H - R)))
      if (q.p.z < -D / 2 + R || q.p.z > D / 2 - R) ((q.v.z *= -1), (q.p.z = THREE.MathUtils.clamp(q.p.z, -D / 2 + R, D / 2 - R)))
      inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))
      inst.setColorAt(i, reacted[i] ? col.copy(theme.pos) : col.copy(theme.accent))
    }
    inst.instanceMatrix.needsUpdate = true
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true
    paint(kTag, `k ${k >= 0.01 ? k.toFixed(2) : k.toExponential(1)} /s`, theme.muted)
  }
}

// nLeft, nRight, perm, temp, split: one box split by a porous membrane at `split`; particles start on
// their own side and cross through pores sized by `perm`, exactly the crossing rule the 2D picture uses.
function setupDiffusion(scene: THREE.Scene, theme: Theme) {
  const H = 3
  const D = 3
  const Wd = 6
  scene.add(ground(16, theme))
  const glass = new THREE.Mesh(new THREE.BoxGeometry(Wd, H, D), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.26 }))
  glass.position.set(Wd / 2, H / 2, 0)
  scene.add(glass)
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
  edges.position.copy(glass.position)
  scene.add(edges)
  const membrane = new THREE.Mesh(new THREE.BoxGeometry(0.06, H, D), new THREE.MeshStandardMaterial({ color: theme.fg, transparent: true, opacity: 0.5 }))
  membrane.position.set(Wd / 2, H / 2, 0)
  scene.add(membrane)

  const VIS_MAX = 200
  const { inst: instL } = mkParticles(scene, VIS_MAX, theme.accent, [8, 6])
  const { inst: instR } = mkParticles(scene, VIS_MAX, theme.accent2, [8, 6])
  const ptsL = mkCloud(VIS_MAX, [0.1, Wd - 0.1], [0.1, H - 0.1], [-D / 2 + 0.1, D / 2 - 0.1])
  const ptsR = mkCloud(VIS_MAX, [0.1, Wd - 0.1], [0.1, H - 0.1], [-D / 2 + 0.1, D / 2 - 0.1])
  const m4 = new THREE.Matrix4()
  const BANDS = 6

  let lastKey = -1
  return (dt: number) => {
    const nLeft = Math.max(0, opt('nLeft', 120))
    const nRight = Math.max(0, opt('nRight', 20))
    const perm = THREE.MathUtils.clamp(opt('perm', 30) / 100, 0, 1)
    const temp = Math.max(1, opt('temp', 300))
    const splitX = Wd * THREE.MathUtils.clamp(opt('split', 50) / 100, 0.1, 0.9)
    membrane.position.x = splitX

    const total = nLeft + nRight
    const scale = total > VIS_MAX * 2 ? (VIS_MAX * 2) / total : 1
    const cL = Math.min(VIS_MAX, Math.round(nLeft * scale))
    const cR = Math.min(VIS_MAX, Math.round(nRight * scale))
    const key = Math.round(nLeft) * 100000 + Math.round(nRight)
    if (key !== lastKey) {
      lastKey = key
      for (let i = 0; i < cL; i++) ptsL[i].p.set(0.1 + Math.random() * Math.max(0.05, splitX - 0.2), 0.1 + Math.random() * (H - 0.2), -D / 2 + 0.1 + Math.random() * (D - 0.2))
      for (let i = 0; i < cR; i++) ptsR[i].p.set(splitX + 0.1 + Math.random() * Math.max(0.05, Wd - splitX - 0.2), 0.1 + Math.random() * (H - 0.2), -D / 2 + 0.1 + Math.random() * (D - 0.2))
    }
    instL.count = cL
    instR.count = cR

    const cell = H / BANDS
    const gap = cell * perm
    const inPore = (y: number) => {
      for (let i = 0; i < BANDS; i++) {
        const c = i * cell + (cell - gap) / 2
        if (y > c && y < c + gap) return true
      }
      return false
    }
    const speed = 1.4 * Math.sqrt(temp / 300)
    const step = (list: { p: THREE.Vector3; v: THREE.Vector3 }[], count: number, inst: THREE.InstancedMesh) => {
      for (let i = 0; i < count; i++) {
        const q = list[i]
        q.v.x += (Math.random() - 0.5) * 0.3
        q.v.y += (Math.random() - 0.5) * 0.3
        q.v.z += (Math.random() - 0.5) * 0.3
        const mlen = q.v.length() || 1
        q.v.multiplyScalar(speed / mlen)
        const nx = q.p.x + q.v.x * dt
        if ((q.p.x < splitX && nx >= splitX) || (q.p.x > splitX && nx <= splitX)) {
          if (!inPore(q.p.y)) q.v.x *= -1
          else q.p.x = nx
        } else q.p.x = nx
        q.p.y += q.v.y * dt
        q.p.z += q.v.z * dt
        if (q.p.x < R || q.p.x > Wd - R) ((q.v.x *= -1), (q.p.x = THREE.MathUtils.clamp(q.p.x, R, Wd - R)))
        if (q.p.y < R || q.p.y > H - R) ((q.v.y *= -1), (q.p.y = THREE.MathUtils.clamp(q.p.y, R, H - R)))
        if (q.p.z < -D / 2 + R || q.p.z > D / 2 - R) ((q.v.z *= -1), (q.p.z = THREE.MathUtils.clamp(q.p.z, -D / 2 + R, D / 2 - R)))
        inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))
      }
      inst.instanceMatrix.needsUpdate = true
    }
    step(ptsL, cL, instL)
    step(ptsR, cR, instR)
  }
}

const CAMS: Record<string, { camera: [number, number, number]; target: [number, number, number] }> = {
  'ideal-gas-law': { camera: [6, 5, 9], target: [4, 1.4, 0] },
  'first-law': { camera: [6, 5, 9], target: [3.5, 1.4, 0] },
  'specific-heat': { camera: [6, 4.5, 7], target: [1.5, 1.5, 0] },
  entropy: { camera: [0, 4.5, 9.5], target: [0, 1.2, 0] },
  'reaction-rate': { camera: [6, 4.5, 8], target: [2, 1.4, 0] },
  diffusion: { camera: [6, 5, 9], target: [3, 1.4, 0] },
}

useThree(
  el,
  ({ scene, theme }) => {
    if (MODE === 'first-law') return setupFirstLaw(scene, theme)
    if (MODE === 'specific-heat') return setupSpecificHeat(scene, theme)
    if (MODE === 'entropy') return setupEntropy(scene, theme)
    if (MODE === 'reaction-rate') return setupReactionRate(scene, theme)
    if (MODE === 'diffusion') return setupDiffusion(scene, theme)
    return setupIdealGas(scene, theme)
  },
  CAMS[MODE] ?? CAMS['ideal-gas-law'],
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
