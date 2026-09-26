<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// electromagnetism/magnets-and-field-lines. The 2D picture only ever draws one flat plane of field
// lines bulging away from the N-N gap. Here the SAME two magnets, at the SAME distance r, sit inside
// a full 3D shell of dipole field-line loops (r(theta) = C sin^2(theta), revolved around the magnet's
// axis): orbiting the camera shows the loops wrap all the way around the magnet, which a flat drawing
// cannot show. Force arrows use the SAME F = 3*mu0/(2*pi)*m1*m2/r^4 as the 2D readout.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const MU0_OVER_2PI = 2e-7
const AZ_LINES = 8
const THETA_STEPS = 40

const HALF_LEN = 0.45
function makeMagnetGroup(theme: any) {
  const g = new THREE.Group()
  const half = new THREE.CylinderGeometry(0.22, 0.22, HALF_LEN, 16)
  half.rotateZ(Math.PI / 2)
  const nMesh = new THREE.Mesh(half, new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.45 }))
  const sMesh = new THREE.Mesh(half, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.45 }))
  nMesh.position.x = HALF_LEN / 2
  sMesh.position.x = -HALF_LEN / 2
  nMesh.castShadow = sMesh.castShadow = true
  g.add(nMesh, sMesh)
  return g
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(14, 14, theme.line, theme.grid).translateY(-1.8))

    const magnetA = makeMagnetGroup(theme) // fixed at origin, N pole faces +x (toward B)
    scene.add(magnetA)
    const magnetB = makeMagnetGroup(theme) // N pole faces -x (toward A) -> like poles facing
    magnetB.rotation.z = Math.PI
    scene.add(magnetB)

    // field-line shell around magnet A: revolved dipole loops r(theta) = C sin^2(theta)
    const fieldGroup = new THREE.Group()
    scene.add(fieldGroup)
    const lineMat = new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.55 })
    const tubes: THREE.Line[] = []
    for (let i = 0; i < AZ_LINES; i++) {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((THETA_STEPS + 1) * 3), 3))
      const line = new THREE.Line(geo, lineMat)
      fieldGroup.add(line)
      tubes.push(line)
    }

    const forceA = arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-0.45, 0, 0), 1, theme.neg, 0.2)
    const forceB = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0.45, 0, 0), 1, theme.neg, 0.2)
    scene.add(forceA, forceB)

    const tag = label('', undefined, 0.5)
    tag.position.set(0, 1.7, 0)
    scene.add(tag)
    let lastText = ''
    function setLabel(text: string) {
      if (text === lastText) return
      lastText = text
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '500 22px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(text, 128, 38)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let clock = 0
    return (dt) => {
      const m1 = props.params.m1 ?? 1
      const m2 = props.params.m2 ?? 1
      const r = props.params.r ?? 0.05
      const F = 3 * MU0_OVER_2PI * m1 * m2 / r ** 4

      const sceneR = 1.15 + (r / 0.3) * 2.6
      magnetA.position.x = -sceneR / 2
      magnetB.position.x = sceneR / 2

      const C = 0.6 + 0.35 * Math.sqrt(m1)
      clock += dt * 0.15
      for (let i = 0; i < AZ_LINES; i++) {
        const phi = (i / AZ_LINES) * Math.PI * 2 + clock
        const line = tubes[i]!
        const pos = (line.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
        for (let j = 0; j <= THETA_STEPS; j++) {
          const theta = 0.12 + (j / THETA_STEPS) * (Math.PI - 0.24)
          const rad = C * Math.sin(theta) * Math.sin(theta)
          const ax = rad * Math.cos(theta) + magnetA.position.x
          const off = rad * Math.sin(theta)
          pos[j * 3] = ax
          pos[j * 3 + 1] = off * Math.sin(phi)
          pos[j * 3 + 2] = off * Math.cos(phi)
        }
        ;(line.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
      }

      const armLen = Math.min(1.6, 0.35 + Math.log10(1 + F * 40) * 0.7)
      forceA.position.x = magnetA.position.x - 0.45
      forceB.position.x = magnetB.position.x + 0.45
      forceA.setLength(armLen, armLen * 0.35, armLen * 0.22)
      forceB.setLength(armLen, armLen * 0.35, armLen * 0.22)

      setLabel(`F ≈ ${F < 0.01 ? F.toExponential(1) : F.toFixed(3)} N`)
    }
  },
  { camera: [3.2, 2.4, 4.6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
