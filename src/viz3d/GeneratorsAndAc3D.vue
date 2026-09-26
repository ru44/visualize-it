<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// electromagnetism/generators-and-ac. The 2D picture draws the coil as a flat rotating line (a side
// view) plus the resulting wave. Here the SAME coil, at the SAME instant phi = 2*pi*f*t, is a real 3D
// loop turning on continuous slip rings (not a split commutator) — orbiting shows the loop's true
// depth and the rings' unbroken shape, which the flat line cannot. v(t) and V_peak match the 2D exactly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const RC = 0.65
const LZ = 0.85

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(12, 12, theme.line, theme.grid).translateY(-1.6))

    const poleGeo = new THREE.BoxGeometry(0.5, 1.7, 2.3)
    const nPole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.5 }))
    nPole.position.set(-1.7, 0, 0)
    const sPole = new THREE.Mesh(poleGeo, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 }))
    sPole.position.set(1.7, 0, 0)
    nPole.castShadow = sPole.castShadow = true
    scene.add(nPole, sPole)
    for (const fy of [-0.5, 0, 0.5]) scene.add(arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1.35, fy, 0), 2.7, theme.muted, 0.14))

    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2 * LZ + 0.7, 10), new THREE.MeshStandardMaterial({ color: theme.muted }))
    axle.rotation.x = Math.PI / 2
    scene.add(axle)

    const coilGeo = new THREE.BufferGeometry()
    coilGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(5 * 3), 3))
    const coilLine = new THREE.Line(coilGeo, new THREE.LineBasicMaterial({ color: theme.fg }))
    scene.add(coilLine)
    const wireMatA = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4, emissive: theme.accent2, emissiveIntensity: 0.3 })
    const wireMatB = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.4, emissive: theme.accent, emissiveIntensity: 0.3 })
    const wireGeo = new THREE.CylinderGeometry(0.05, 0.05, 2 * LZ, 8)
    wireGeo.rotateX(Math.PI / 2)
    const wireA = new THREE.Mesh(wireGeo, wireMatA)
    const wireB = new THREE.Mesh(wireGeo, wireMatB)
    scene.add(wireA, wireB)

    // continuous slip rings (not split), one per wire, plus fixed brush contacts
    const ringMatA = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.35 })
    const ringMatB = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.35 })
    const ringGeo = new THREE.TorusGeometry(0.3, 0.035, 8, 28)
    const ringA = new THREE.Mesh(ringGeo, ringMatA)
    const ringB = new THREE.Mesh(ringGeo, ringMatB)
    ringA.position.z = -LZ - 0.25
    ringB.position.z = -LZ - 0.5
    scene.add(ringA, ringB)
    const brushGeo = new THREE.BoxGeometry(0.14, 0.1, 0.16)
    const brushMat = new THREE.MeshStandardMaterial({ color: theme.fg })
    const brA = new THREE.Mesh(brushGeo, brushMat)
    const brB = new THREE.Mesh(brushGeo, brushMat)
    brA.position.set(0, 0.3, -LZ - 0.25)
    brB.position.set(0, 0.3, -LZ - 0.5)
    scene.add(brA, brB)

    // lamp: a small glowing sphere fed by the brushes, brightness ~ |v|/Vpeak
    const lampMat = new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0 })
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), lampMat)
    lamp.position.set(0, 0.9, -LZ - 0.4)
    scene.add(lamp)

    const tag = label('', undefined, 0.5)
    tag.position.set(0, 2, 0)
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
      const B = props.params.B ?? 0.5
      const A = props.params.A ?? 0.05
      const rpm = props.params.rpm ?? 3000
      const tt = props.params.t ?? 0.02
      const f = rpm / 60
      const Vpeak = N * B * A * 2 * Math.PI * f
      const v = Vpeak * Math.sin(2 * Math.PI * f * tt)
      const phi = (2 * Math.PI * f * tt) % (2 * Math.PI)
      const outward = v >= 0

      const cx = RC * Math.cos(phi)
      const cy = RC * Math.sin(phi)
      const p1: [number, number, number] = [cx, cy, -LZ]
      const p2: [number, number, number] = [cx, cy, LZ]
      const p3: [number, number, number] = [-cx, -cy, LZ]
      const p4: [number, number, number] = [-cx, -cy, -LZ]
      const pos = (coilGeo.attributes.position as THREE.BufferAttribute).array as Float32Array
      ;[p1, p2, p3, p4, p1].forEach((p, i) => pos.set(p, i * 3))
      ;(coilGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true

      wireA.position.set(cx, cy, 0)
      wireB.position.set(-cx, -cy, 0)
      const frac = Vpeak > 0 ? Math.min(1, Math.abs(v) / Vpeak) : 0
      wireMatA.emissiveIntensity = 0.2 + 0.8 * frac
      wireMatB.emissiveIntensity = 0.2 + 0.8 * frac
      wireMatA.color.copy(outward ? theme.accent2 : theme.accent)
      wireMatA.emissive.copy(outward ? theme.accent2 : theme.accent)
      wireMatB.color.copy(outward ? theme.accent : theme.accent2)
      wireMatB.emissive.copy(outward ? theme.accent : theme.accent2)

      lampMat.emissiveIntensity = 0.15 + 1.2 * frac

      setLabel(`v ≈ ${Math.abs(v) < 10 ? v.toFixed(2) : v.toFixed(0)} V`)
    }
  },
  { camera: [3.6, 2.2, 4.4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
