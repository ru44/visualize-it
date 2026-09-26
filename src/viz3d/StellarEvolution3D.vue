<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// A star swelling into a giant, rendered at TRUE relative scale against its planets' orbits — something the
// flat 2D picture deliberately compresses (a log scale) to stay readable. Here, when the star's real radius
// (same R(mass, age) formula as StellarEvolution.vue) passes an orbit's real radius, that planet is truly engulfed.
// 1 R☉ = 0.00465 AU; scene units: 1 AU = 12 units. Mercury orbits at 0.387 AU, Earth at 1 AU.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const AU = 12
const R_TO_UNITS = 0.00465 * AU // R☉ -> scene units, true to scale
const MERCURY_R = 0.387 * AU
const EARTH_R = 1 * AU

type Fate = 'dwarf' | 'sunlike' | 'massive' | 'hyper'
const fate = (M: number): Fate => (M < 0.5 ? 'dwarf' : M < 8 ? 'sunlike' : M < 20 ? 'massive' : 'hyper')
const lerp = (a: number, b: number, f: number) => a + (b - a) * Math.max(0, Math.min(1, f))

function starState(M: number, A: number) {
  const f = fate(M)
  const Tms = 5772 * Math.pow(M, 0.475)
  const Rmain = Math.pow(M, 0.8)
  if (f === 'dwarf' || A < 1) return { R: Rmain, T: Tms, supernova: false }
  const Rpeak = f === 'sunlike' ? 150 * Math.pow(M, 0.3) : 400 * Math.pow(M / 10, 0.5)
  const Rremnant = f === 'sunlike' ? 0.011 : f === 'massive' ? 0.0000172 : Math.max(0.000004, 4.24e-6 * M)
  if (A < 1.08) return { R: lerp(Rmain, Rpeak, (A - 1) / 0.08), T: lerp(Tms, 3500, (A - 1) / 0.08), supernova: false }
  if (A < 1.12) return { R: Rpeak, T: 3500, supernova: false }
  const cf = (A - 1.12) / 0.03
  return { R: lerp(Rpeak, Rremnant, cf), T: f === 'sunlike' ? lerp(3500, 25000, cf) : f === 'massive' ? 12000 : 0, supernova: f !== 'sunlike' && cf < 0.4 }
}

function starColor(T: number): THREE.Color {
  if (T <= 0) return new THREE.Color(0x111827)
  if (T < 3700) return new THREE.Color(0xff5a3c)
  if (T < 5200) return new THREE.Color(0xff9a4d)
  if (T < 6000) return new THREE.Color(0xffe08a)
  if (T < 7500) return new THREE.Color(0xffffff)
  if (T < 10000) return new THREE.Color(0xcddcff)
  return new THREE.Color(0x9fb8ff)
}

function ring(radius: number, color: THREE.Color) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= 96; i++) pts.push(new THREE.Vector3(radius * Math.cos((i / 96) * 2 * Math.PI), 0, radius * Math.sin((i / 96) * 2 * Math.PI)))
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 }))
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const starGeo = new THREE.SphereGeometry(1, 48, 32)
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffe08a })
    const star = new THREE.Mesh(starGeo, starMat)
    scene.add(star)
    const glow = new THREE.PointLight(0xffffff, 2.2, 80)
    star.add(glow)

    const mercuryOrbit = ring(MERCURY_R, theme.muted)
    const earthOrbit = ring(EARTH_R, theme.accent)
    scene.add(mercuryOrbit, earthOrbit)
    const mercury = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshStandardMaterial({ color: 0x9a8a7a }))
    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
    scene.add(mercury, earth)

    const starPositions = new Float32Array(1000 * 3)
    for (let i = 0; i < starPositions.length; i++) starPositions[i] = (Math.random() - 0.5) * 200
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPositions, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.18 })))

    const flash = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, opacity: 0 }))
    scene.add(flash)

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let clock = 0
    return (dt: number) => {
      clock += reduced ? 0 : dt
      const mass = Math.max(0.1, props.params.mass ?? 1)
      const age = Math.max(0, Math.min(1.15, props.params.age ?? 0.5))
      const s = starState(mass, age)
      const radius = Math.max(0.045, s.R * R_TO_UNITS)
      star.scale.setScalar(radius)
      starMat.color.copy(starColor(s.T))
      glow.color.copy(starMat.color)
      glow.intensity = s.T > 0 ? 2.2 : 0.1

      mercury.visible = radius < MERCURY_R * 0.98
      earth.visible = radius < EARTH_R * 0.98
      const wobble = reduced ? 0 : clock
      mercury.position.set(MERCURY_R * Math.cos(wobble * 1.6), 0, MERCURY_R * Math.sin(wobble * 1.6))
      earth.position.set(EARTH_R * Math.cos(wobble), 0, EARTH_R * Math.sin(wobble))

      flash.position.copy(star.position)
      if (s.supernova) {
        flash.visible = true
        const p = ((reduced ? 0.5 : (clock * 2) % 1) + 1) % 1
        flash.scale.setScalar(radius + p * 14)
        ;(flash.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - p)
      } else flash.visible = false
    }
  },
  { camera: [0, 16, 32], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
