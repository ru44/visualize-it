<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// electromagnetism/electromagnetic-waves-and-the-spectrum. The 2D picture can only draw one wiggly
// line, because paper is flat. A real EM wave has TWO perpendicular fields at once — here E (vertical
// arrows) and B (horizontal-into-depth arrows) oscillate together along the propagation axis, which a
// flat drawing cannot show at all. Cycle count matches the 2D picture's own (illustrative) count for
// the same e; lambda and f in the label use the SAME 3*10^(8-e) formula as the 2D readouts.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const LEN = 6
const N_PTS = 26

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(10, 10, theme.line, theme.grid).translateY(-1.8))

    const axisGeo = new THREE.CylinderGeometry(0.012, 0.012, LEN, 6)
    axisGeo.rotateZ(Math.PI / 2)
    const axis = new THREE.Mesh(axisGeo, new THREE.MeshStandardMaterial({ color: theme.muted }))
    scene.add(axis)

    const eArrows = Array.from({ length: N_PTS }, () => arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 0.01, theme.accent, 0.1))
    const bArrows = Array.from({ length: N_PTS }, () => arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 0.01, theme.accent2, 0.1))
    eArrows.forEach((a) => scene.add(a))
    bArrows.forEach((a) => scene.add(a))

    const tag = label('', undefined, 0.45)
    tag.position.set(0, 2.1, 0)
    scene.add(tag)
    let lastText = ''
    function setLabel(text: string) {
      if (text === lastText) return
      lastText = text
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '500 15px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(text, 128, 38)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let phase = 0
    return (dt) => {
      const e = props.params.e ?? -2
      const lambda = Math.pow(10, e)
      const freq = 3e8 / lambda
      const cycles = Math.round(Math.min(14, Math.max(2, 3 - e * 0.7)))
      const k = (cycles * 2 * Math.PI) / LEN
      phase += dt * 1.4

      const AMP = 0.7
      for (let i = 0; i < N_PTS; i++) {
        const x = -LEN / 2 + (i / (N_PTS - 1)) * LEN
        const sE = Math.sin(k * x - phase)
        const sB = Math.sin(k * x - phase)
        const eA = eArrows[i]!
        eA.position.set(x, 0, 0)
        eA.setDirection(new THREE.Vector3(0, Math.sign(sE) || 1, 0))
        eA.setLength(Math.max(0.02, Math.abs(sE) * AMP), 0.09, 0.05)
        const bA = bArrows[i]!
        bA.position.set(x, 0, 0)
        bA.setDirection(new THREE.Vector3(0, 0, Math.sign(sB) || 1))
        bA.setLength(Math.max(0.02, Math.abs(sB) * AMP), 0.09, 0.05)
      }

      const lamTxt = lambda < 1e-3 || lambda > 1e4 ? lambda.toExponential(1) : lambda.toFixed(3)
      const fTxt = freq < 1e-3 || freq > 1e6 ? freq.toExponential(2) : freq.toFixed(1)
      setLabel(`λ ≈ ${lamTxt} m, f ≈ ${fTxt} Hz`)
    }
  },
  { camera: [3.2, 2.6, 5.4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
