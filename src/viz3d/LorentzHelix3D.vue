<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, ground } from './useThree'

// A charged particle in a uniform magnetic field B (the vertical helix axis) plus an optional electric
// field E. The 2D lesson only ever shows the circular motion perpendicular to B (a closed ring); the same
// particle also carries a steady velocity component along B, which the flat picture cannot show at all —
// so the ring becomes a rising, spiralling helix. The dotted line on the floor is exactly the 2D picture:
// the helix's shadow, projected onto the plane perpendicular to B.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const STEPS = 220
const TURNS = 3
const MAX_DURATION = 9 // seconds of simulated flight the path covers, capped so weak fields don't blow up the scale
const K_OMEGA = 0.55 // rad/s of cyclotron rotation per unit |q·B|
const K_DRIFT = 0.35 // scene units/s of E-field push per unit q·E
const K_SPEED = 0.16 // scene units/s per unit speed v
const PITCH_FRAC = 0.4 // fraction of v that climbs along B; the rest stays in the circular part

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.add(ground(10, theme))
    const trailMat = new THREE.LineBasicMaterial({ color: theme.fg })
    const trail = new THREE.Line(new THREE.BufferGeometry(), trailMat)
    const shadow = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.6 }))
    scene.add(trail, shadow)
    const ballMat = new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.4 })
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), ballMat)
    ball.castShadow = true
    scene.add(ball)
    const bArrow = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0), 1, theme.accent2)
    scene.add(bArrow)
    const vArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent)
    scene.add(vArrow)

    let pts: THREE.Vector3[] = []
    let simT = 0
    const tmpDir = new THREE.Vector3()

    function rebuild() {
      const q = props.params.q ?? 1
      const v = props.params.v ?? 5
      const B = props.params.B ?? 1
      const E = props.params.E ?? 0
      const omega = q * B * K_OMEGA
      const duration = Math.min(MAX_DURATION, Math.abs(omega) > 1e-3 ? (TURNS * 2 * Math.PI) / Math.abs(omega) : 6)
      const dt = duration / STEPS
      const radialFrac = Math.sqrt(1 - PITCH_FRAC * PITCH_FRAC)
      let a = 0
      let b = 0
      let va = v * K_SPEED * radialFrac
      let vb = 0
      const vpar = v * K_SPEED * PITCH_FRAC
      let y = 0
      const p: THREE.Vector3[] = []
      const s: THREE.Vector3[] = []
      for (let i = 0; i <= STEPS; i++) {
        p.push(new THREE.Vector3(a, y, b))
        s.push(new THREE.Vector3(a, 0.01, b))
        const aa = -omega * vb
        const ab = omega * va - q * E * K_DRIFT
        va += aa * dt
        vb += ab * dt
        a += va * dt
        b += vb * dt
        y += vpar * dt
      }
      pts = p
      trail.geometry.setFromPoints(p)
      shadow.geometry.setFromPoints(s)
      simT = 0
      ballMat.color.copy(q > 0 ? theme.pos : q < 0 ? theme.neg : theme.muted)

      const box = new THREE.Box3().setFromPoints(p)
      const center = box.getCenter(new THREE.Vector3())
      const size = Math.max(3, box.getSize(new THREE.Vector3()).length())
      controls.target.copy(center)
      camera.position.set(center.x + size * 0.55, center.y + size * 0.4, center.z + size * 0.65)
      bArrow.position.set(center.x, box.min.y - 0.5, center.z)
      bArrow.setDirection(new THREE.Vector3(0, Math.sign(B) || 1, 0))
      bArrow.setLength(box.max.y - box.min.y + 1, 0.3, 0.18)
      bArrow.visible = B !== 0
    }
    rebuild()
    watch(() => [props.params.q, props.params.v, props.params.B, props.params.E], rebuild)

    return (dt) => {
      simT = (simT + Math.max(0, dt) / 6) % 1
      const idx = Math.min(STEPS - 1, Math.max(0, Math.floor(simT * STEPS)))
      const p0 = pts[idx]!
      const p1 = pts[idx + 1] ?? p0
      ball.position.copy(p0)
      tmpDir.subVectors(p1, p0)
      if (tmpDir.lengthSq() > 1e-9) {
        vArrow.position.copy(p0)
        vArrow.setDirection(tmpDir.normalize())
        vArrow.setLength(0.9, 0.25, 0.15)
      }
    }
  },
  { camera: [4, 3, 7], target: [0, 1, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
