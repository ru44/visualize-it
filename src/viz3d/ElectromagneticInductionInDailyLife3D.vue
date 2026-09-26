<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'

// electromagnetism/electromagnetic-induction-in-daily-life. The 2D picture draws the target as a flat
// bar with a single arc arrow. Here the target is a real disc, seen from an angle, with a full ring
// of eddy-current dots swirling around its true flat circular face — a shape the 2D side view cannot
// show. P and eps_rms use the SAME formulas as the 2D readouts, from the same B, A, f, R sliders.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const N_DOTS = 14

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(10, 10, theme.line, theme.grid).translateY(-1.6))

    // driver coil (vertical helix, above the target)
    const coilPts: THREE.Vector3[] = []
    const TURNS = 6
    for (let i = 0; i <= TURNS * 10; i++) {
      const t = i / (TURNS * 10)
      const ang = t * TURNS * Math.PI * 2
      coilPts.push(new THREE.Vector3(0.4 * Math.cos(ang), 0.7 + t * 0.6, 0.4 * Math.sin(ang)))
    }
    const coilCurve = new THREE.CatmullRomCurve3(coilPts)
    const coil = new THREE.Mesh(new THREE.TubeGeometry(coilCurve, 120, 0.035, 6, false), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.4 }))
    scene.add(coil)

    // target disc
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.14, 28), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.7 }))
    disc.position.y = -0.4
    disc.castShadow = disc.receiveShadow = true
    scene.add(disc)

    // eddy-current dots, swirling around the disc's rim
    const dots = Array.from({ length: N_DOTS }, () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.6 }))
      scene.add(m)
      return m
    })

    const tag = label('', undefined, 0.42)
    tag.position.set(0, 2.1, 0)
    scene.add(tag)
    let lastText = ''
    function setLabel(text: string) {
      if (text === lastText) return
      lastText = text
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '500 19px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(text, 128, 38)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let clock = 0
    return (dt) => {
      const B = props.params.B ?? 0.005
      const A = props.params.A ?? 0.0003
      const f = props.params.f ?? 25000
      const R = props.params.R ?? 0.0001
      const epsPeak = A * B * 2 * Math.PI * f
      const epsRms = epsPeak / Math.SQRT2
      const P = (epsRms * epsRms) / R
      const heating = P > 20

      const rDisc = 0.35 + 0.5 * Math.sqrt(A / 0.002)
      disc.scale.set(rDisc / 0.9, 1, rDisc / 0.9)

      clock += dt * 0.6
      const col = heating ? theme.neg : theme.accent2
      for (let i = 0; i < N_DOTS; i++) {
        const a = (i / N_DOTS) * Math.PI * 2 + clock
        dots[i]!.position.set(rDisc * 0.82 * Math.cos(a), disc.position.y + 0.09, rDisc * 0.82 * Math.sin(a))
        const mat = dots[i]!.material as THREE.MeshStandardMaterial
        mat.color.copy(col)
        mat.emissive.copy(col)
        mat.emissiveIntensity = 0.3 + 0.9 * Math.min(1, epsRms * 3)
      }

      const epsTxt = epsRms < 0.01 ? epsRms.toExponential(2) : epsRms.toFixed(3)
      const pTxt = P < 0.01 || P > 1e5 ? P.toExponential(2) : P.toFixed(2)
      setLabel(`ε_rms ≈ ${epsTxt} V, P ≈ ${pTxt} W`)
    }
  },
  { camera: [2.6, 2.2, 3.6], target: [0, -0.1, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
