<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, type Theme } from './useThree'

// options.mode picks the scene; default 'kepler' is the original Earth+satellite view, untouched.
// 'kepler'   Earth with a satellite at radius x; g = GM/r², v = sqrt(GM/r)   — earth-space/kepler-orbits,
//                                                                              physics/universal-gravitation
// 'circular' a ball on a circular track of radius `rad` at speed x, with     — physics/circular-motion
//            its inward a_c = x²/rad arrow, the same formula as the 2D chart.
// 'escape'   a launch from radius x whose real conic-section trajectory      — earth-space/escape-velocity
//            (fall back / bound orbit / escape) is set by its speed relative
//            to v_esc(x) = sqrt(2GM/x), swept automatically since this lesson has no speed slider.
// 'quasar'   a black hole's accretion disc whose brightness follows          — cosmos/quasars
//            L = 14.8 * eta * x, the same rule as the 2D chart.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const GM = 3.986e14
const R_EARTH = 6371 // km
const mode = props.options?.mode ?? 'kepler'

const P = (k: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

function stars(scene: THREE.Scene, n: number) {
  const p = new Float32Array(n * 3)
  for (let i = 0; i < p.length; i++) p[i] = (Math.random() - 0.5) * 260
  scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.24 })))
}

function setupKepler(scene: THREE.Scene, theme: Theme) {
  scene.background = new THREE.Color(0x0b0f1a)
  stars(scene, 1500)
  const S = 2 / R_EARTH // km → scene units: Earth radius = 2
  const earth = new THREE.Mesh(new THREE.SphereGeometry(2, 48, 32), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.8 }))
  scene.add(earth)
  scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(2.005, 24, 12)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })))
  const sat = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  scene.add(sat)
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.3), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
  sat.add(panel)
  const orbit = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.muted }))
  scene.add(orbit)
  const gArrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.neg)
  const vArrow = arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1, theme.pos)
  scene.add(gArrow, vArrow)
  let theta = 0
  return (dt: number) => {
    const rKm = Math.max(R_EARTH + 200, P('x', 6.4) * 1000)
    const r = rKm * S
    const g = GM / (rKm * 1000) ** 2 // m/s²
    const vOrb = Math.sqrt(GM / (rKm * 1000)) // m/s
    // angular speed exaggerated so an orbit takes ~8 s at LEO, scaling with Kepler (T ∝ r^1.5)
    theta += dt * ((2 * Math.PI) / 8) * Math.pow(6.6 / (rKm / 1000), 1.5)
    sat.position.set(r * Math.cos(theta), 0, r * Math.sin(theta))
    sat.lookAt(0, 0, 0)
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) pts.push(new THREE.Vector3(r * Math.cos((i / 128) * 2 * Math.PI), 0, r * Math.sin((i / 128) * 2 * Math.PI)))
    orbit.geometry.setFromPoints(pts)
    gArrow.position.copy(sat.position)
    gArrow.setDirection(sat.position.clone().negate().normalize())
    gArrow.setLength(Math.min(3, g * 0.3) + 0.1, 0.3, 0.15)
    vArrow.position.copy(sat.position)
    vArrow.setDirection(new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta)))
    vArrow.setLength(vOrb / 4000 + 0.1, 0.3, 0.15)
    earth.rotation.y += dt * 0.1
  }
}

function setupCircular(scene: THREE.Scene, theme: Theme) {
  scene.add(ground(10, theme))
  const track = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.muted }))
  scene.add(track)
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
  ball.castShadow = true
  scene.add(ball)
  const aArrow = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1, theme.neg)
  const vArrow = arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1, theme.pos)
  scene.add(aArrow, vArrow)
  let theta = 0
  let lastR = -1
  return (dt: number) => {
    const rad = Math.max(1, P('rad', 5))
    const v = Math.max(0, P('x', 8))
    const sceneR = 0.9 + rad * 0.22 // visual scale so the 1..20 m range fits the view
    if (rad !== lastR) {
      lastR = rad
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 96; i++) pts.push(new THREE.Vector3(sceneR * Math.cos((i / 96) * 2 * Math.PI), 0.01, sceneR * Math.sin((i / 96) * 2 * Math.PI)))
      track.geometry.setFromPoints(pts)
    }
    theta += dt * (v / rad) // real angular speed, omega = v / r
    const p = new THREE.Vector3(sceneR * Math.cos(theta), 0.3, sceneR * Math.sin(theta))
    ball.position.copy(p)
    const ac = (v * v) / rad
    aArrow.position.copy(p)
    aArrow.setDirection(new THREE.Vector3(-p.x, 0, -p.z).normalize())
    aArrow.setLength(Math.min(2.5, 0.12 * ac) + 0.15, 0.3, 0.15)
    vArrow.position.copy(p)
    vArrow.setDirection(new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta)))
    vArrow.setLength(Math.min(2.5, 0.18 * v) + 0.15, 0.3, 0.15)
  }
}

function setupEscape(scene: THREE.Scene, theme: Theme) {
  scene.background = new THREE.Color(0x0b0f1a)
  stars(scene, 900)
  const earth = new THREE.Mesh(new THREE.SphereGeometry(2, 40, 28), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.8 }))
  scene.add(earth)
  const path = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent }))
  scene.add(path)
  const vArrow = arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1, theme.accent2)
  scene.add(vArrow)
  const probe = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  scene.add(probe)
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let clock = 0
  return (dt: number) => {
    clock += dt
    const rKm = Math.max(R_EARTH + 1, P('x', 6.4) * 1000)
    const r0 = rKm * 1000 // metres, matches the 2D formula's x*1e6
    const S2 = 2 / (R_EARTH * 1000) // metres → scene units, same scale as the Earth sphere (radius 2)
    const vEsc = Math.sqrt((2 * GM) / r0)
    const vCirc = Math.sqrt(GM / r0)
    // no speed slider exists on this lesson, so sweep the launch speed through v_esc automatically;
    // frozen at exactly v_esc (the lesson's own "point where kinetic energy matches the pull") when reduced motion.
    const factor = reduced ? 1 : 1 + 0.75 * Math.sin(clock * ((2 * Math.PI) / 14))
    const v0 = Math.max(0.05, factor) * vEsc
    const h = r0 * v0 // purely tangential launch: specific angular momentum
    const energy = (v0 * v0) / 2 - GM / r0
    const p = (h * h) / GM // semi-latus rectum, metres
    const e = Math.sqrt(Math.max(0, 1 + (2 * energy * h * h) / (GM * GM)))
    const atApo = v0 < vCirc // launch point is always an apsis; which one depends on the speed
    const rOf = (th: number) => p / (atApo ? 1 - e * Math.cos(th) : 1 + e * Math.cos(th))
    const pts: THREE.Vector3[] = []
    if (e < 1) {
      for (let i = 0; i <= 96; i++) {
        const th = (2 * Math.PI * i) / 96
        const rr = rOf(th)
        pts.push(new THREE.Vector3(rr * S2 * Math.cos(th), 0, rr * S2 * Math.sin(th)))
        if (rr < R_EARTH * 1000) break // dips into the planet: it falls back
      }
    } else {
      for (const dir of [-1, 1]) {
        for (let i = dir < 0 ? 0 : 1; i <= 48; i++) {
          const th = dir * i * (2.3 / 48)
          const rr = rOf(th)
          if (!isFinite(rr) || rr <= 0 || rr * S2 > 14) break
          const pt = new THREE.Vector3(rr * S2 * Math.cos(th), 0, rr * S2 * Math.sin(th))
          if (dir < 0) pts.unshift(pt)
          else pts.push(pt)
        }
      }
    }
    path.geometry.setFromPoints(pts)
    const rp = p / (1 + e) // periapsis, metres
    path.material.color.copy(e >= 1 ? theme.pos : rp < R_EARTH * 1000 ? theme.neg : theme.accent)
    const launch = new THREE.Vector3(r0 * S2, 0, 0)
    probe.position.copy(launch)
    vArrow.position.copy(launch)
    vArrow.setDirection(new THREE.Vector3(0, 0, 1))
    vArrow.setLength(Math.min(2.5, v0 / 3000) + 0.1, 0.3, 0.15)
    earth.rotation.y += dt * 0.1
  }
}

function setupQuasar(scene: THREE.Scene, theme: Theme) {
  scene.background = new THREE.Color(0x05070d)
  stars(scene, 700)
  const horizon = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 24), new THREE.MeshBasicMaterial({ color: 0x000000 }))
  scene.add(horizon)
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const cx = c.getContext('2d')!
  const grad = cx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  cx.fillStyle = grad
  cx.fillRect(0, 0, 128, 128)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), color: theme.accent2, transparent: true, depthWrite: false }))
  scene.add(glow)
  const N = 220
  const positions = new Float32Array(N * 3)
  const colors = new Float32Array(N * 3)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const disc = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }))
  scene.add(disc)
  const baseAngle = new Float32Array(N)
  const baseR = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    baseAngle[i] = Math.random() * Math.PI * 2
    baseR[i] = 1.1 + Math.random() * 2.6
  }
  const cool = theme.muted
  const hot = theme.accent2
  const scratch = new THREE.Color()
  let clock = 0
  return (dt: number) => {
    clock += dt
    const eta = Math.min(0.4, Math.max(0.01, P('eta', 0.1)))
    const mdot = Math.max(0, P('x', 1))
    const L = 14.8 * eta * mdot // trillions of Suns — same rule as the 2D chart
    const Lfrac = Math.min(1, L / 60)
    const speed = 0.12 + 0.05 * mdot // faster inflow the more matter is feeding the hole
    const span = 2.6
    for (let i = 0; i < N; i++) {
      const r = 1.1 + (((baseR[i] - 1.1 - clock * speed) % span) + span) % span
      const ang = baseAngle[i] + clock * (0.9 / Math.sqrt(r))
      positions[i * 3] = r * Math.cos(ang)
      positions[i * 3 + 1] = 0.03 * Math.sin(ang * 3 + r)
      positions[i * 3 + 2] = r * Math.sin(ang)
      const heat = Math.max(0, 1 - (r - 1.1) / span) * (0.4 + 0.6 * Lfrac)
      scratch.copy(cool).lerp(hot, heat)
      colors[i * 3] = scratch.r
      colors[i * 3 + 1] = scratch.g
      colors[i * 3 + 2] = scratch.b
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.color.needsUpdate = true
    glow.scale.setScalar(1.6 + 3 * Lfrac)
    ;(glow.material as THREE.SpriteMaterial).opacity = 0.25 + 0.65 * Lfrac
    horizon.rotation.y += dt * 0.05
  }
}

const CAMERA =
  mode === 'circular'
    ? { camera: [6, 5, 9] as [number, number, number], target: [0, 0.3, 0] as [number, number, number] }
    : mode === 'quasar'
      ? { camera: [0, 4, 9] as [number, number, number], target: [0, 0, 0] as [number, number, number], fov: 42 }
      : mode === 'escape'
        ? { camera: [0, 10, 20] as [number, number, number], target: [0, 0, 0] as [number, number, number], fov: 42 }
        : { camera: [0, 9, 18] as [number, number, number], target: [0, 0, 0] as [number, number, number], fov: 40 }

useThree(
  el,
  ({ scene, theme }) => {
    if (mode === 'circular') return setupCircular(scene, theme)
    if (mode === 'escape') return setupEscape(scene, theme)
    if (mode === 'quasar') return setupQuasar(scene, theme)
    return setupKepler(scene, theme)
  },
  CAMERA,
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
