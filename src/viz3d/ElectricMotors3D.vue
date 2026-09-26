<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// electromagnetism/electric-motors. The 2D picture only ever shows the coil's two wires end-on, as
// two dots, because it is a flat side view. Here the SAME coil, at the SAME angle theta, is a real
// rectangular loop spinning about its axle: orbiting the camera shows its true depth and the split
// ring commutator's actual disc shape, which the flat dots cannot. Torque uses the SAME
// tau = N*I*A*B*sin(theta) as the 2D readout, shown as a coloured arc and a text label.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const RC = 0.65
const LZ = 0.9
const ARC_STEPS = 32

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(12, 12, theme.line, theme.grid).translateY(-1.6))

    // fixed magnet poles, flanking the coil along X
    const poleGeo = new THREE.BoxGeometry(0.5, 1.7, 2.3)
    const nPole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.5 }))
    nPole.position.set(-1.7, 0, 0)
    const sPole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 }))
    sPole.position.set(1.7, 0, 0)
    nPole.castShadow = sPole.castShadow = true
    scene.add(nPole, sPole)
    for (const fy of [-0.5, 0, 0.5]) {
      const a = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1.35, fy, 0), 2.7, theme.muted, 0.14)
      scene.add(a)
    }

    // axle
    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2 * LZ + 0.7, 10), new THREE.MeshStandardMaterial({ color: theme.muted }))
    axle.rotation.x = Math.PI / 2
    scene.add(axle)

    // coil loop: rebuilt each frame from theta (dynamic BufferGeometry)
    const coilGeo = new THREE.BufferGeometry()
    coilGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(5 * 3), 3))
    const coilMat = new THREE.LineBasicMaterial({ color: theme.fg, linewidth: 2 })
    const coilLine = new THREE.Line(coilGeo, coilMat)
    scene.add(coilLine)
    // coloured tubes for the two force-bearing wires (current direction)
    const wireMatA = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4, emissive: theme.accent2, emissiveIntensity: 0.4 })
    const wireMatB = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.4, emissive: theme.accent, emissiveIntensity: 0.4 })
    const wireGeo = new THREE.CylinderGeometry(0.05, 0.05, 2 * LZ, 8)
    wireGeo.rotateX(Math.PI / 2)
    const wireA = new THREE.Mesh(wireGeo, wireMatA)
    const wireB = new THREE.Mesh(wireGeo, wireMatB)
    scene.add(wireA, wireB)

    // commutator: two coloured half-rings at one end of the axle, rotating with theta
    const ringGeoA = new THREE.RingGeometry(0.16, 0.3, 24, 1, 0, Math.PI)
    const ringGeoB = new THREE.RingGeometry(0.16, 0.3, 24, 1, Math.PI, Math.PI)
    const ringA = new THREE.Mesh(ringGeoA, new THREE.MeshStandardMaterial({ color: theme.accent2, side: THREE.DoubleSide }))
    const ringB = new THREE.Mesh(ringGeoB, new THREE.MeshStandardMaterial({ color: theme.accent, side: THREE.DoubleSide }))
    ringA.position.z = ringB.position.z = -LZ - 0.32
    scene.add(ringA, ringB)
    const brushGeo = new THREE.BoxGeometry(0.12, 0.12, 0.18)
    const brushMat = new THREE.MeshStandardMaterial({ color: theme.fg })
    const brushT = new THREE.Mesh(brushGeo, brushMat)
    const brushBt = new THREE.Mesh(brushGeo, brushMat)
    brushT.position.set(0, 0.3, -LZ - 0.32)
    brushBt.position.set(0, -0.3, -LZ - 0.32)
    scene.add(brushT, brushBt)

    // torque arc, in front of the coil
    const arcGeo = new THREE.BufferGeometry()
    arcGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((ARC_STEPS + 1) * 3), 3))
    const arcLine = new THREE.Line(arcGeo, new THREE.LineBasicMaterial({ color: theme.pos, linewidth: 3 }))
    scene.add(arcLine)
    const arcHead = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 8), new THREE.MeshStandardMaterial({ color: theme.pos }))
    scene.add(arcHead)

    const tag = label('', undefined, 0.5)
    tag.position.set(0, 1.9, 0)
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

    return () => {
      const N = props.params.N ?? 100
      const I = props.params.I ?? 0.5
      const A = props.params.A ?? 0.001
      const B = props.params.B ?? 0.4
      const theta = props.params.theta ?? Math.PI / 2
      const tau = N * I * A * B * Math.sin(theta)
      const outward = Math.sin(theta) >= 0

      const cx = RC * Math.cos(theta)
      const cy = RC * Math.sin(theta)
      const p1: [number, number, number] = [cx, cy, -LZ]
      const p2: [number, number, number] = [cx, cy, LZ]
      const p3: [number, number, number] = [-cx, -cy, LZ]
      const p4: [number, number, number] = [-cx, -cy, -LZ]
      const pos = (coilGeo.attributes.position as THREE.BufferAttribute).array as Float32Array
      ;[p1, p2, p3, p4, p1].forEach((p, i) => pos.set(p, i * 3))
      ;(coilGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true

      wireA.position.set(cx, cy, 0)
      wireB.position.set(-cx, -cy, 0)
      wireMatA.color.copy(outward ? theme.accent2 : theme.accent)
      wireMatA.emissive.copy(outward ? theme.accent2 : theme.accent)
      wireMatB.color.copy(outward ? theme.accent : theme.accent2)
      wireMatB.emissive.copy(outward ? theme.accent : theme.accent2)

      ringA.rotation.z = theta
      ringB.rotation.z = theta
      ;(ringA.material as THREE.MeshStandardMaterial).color.copy(outward ? theme.accent2 : theme.accent)
      ;(ringB.material as THREE.MeshStandardMaterial).color.copy(outward ? theme.accent : theme.accent2)

      const sweep = Math.min((140 / 180) * Math.PI, 0.15 + Math.abs(tau) * 15)
      const a0 = Math.PI / 2 + 0.25
      const dir = 1
      const apos = (arcGeo.attributes.position as THREE.BufferAttribute).array as Float32Array
      for (let i = 0; i <= ARC_STEPS; i++) {
        const a = a0 + dir * (i / ARC_STEPS) * sweep
        apos[i * 3] = 1.35 * Math.cos(a)
        apos[i * 3 + 1] = 1.35 * Math.sin(a)
        apos[i * 3 + 2] = LZ + 0.3
      }
      ;(arcGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
      const aEnd = a0 + dir * sweep
      arcHead.position.set(1.35 * Math.cos(aEnd), 1.35 * Math.sin(aEnd), LZ + 0.3)
      arcHead.rotation.z = aEnd + Math.PI / 2

      setLabel(`τ ≈ ${tau.toFixed(4)} N·m`)
    }
  },
  { camera: [3.6, 2.2, 4.4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
