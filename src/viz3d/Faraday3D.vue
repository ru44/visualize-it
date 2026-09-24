<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// A bar magnet oscillating along the axis of a coil. Flux Phi(t) = B*A*cos(2*pi*f*t) and emf(t) =
// N*B*A*2*pi*f*sin(2*pi*f*t) are exactly the 2D lesson's own formulas, evaluated at the same time slider
// x. The flat curve only ever plots emf versus t; here the field lines threading the coil (density ~ |Phi|)
// and the coil's own glow (~ emf, colour = its sign) show what is actually happening in space as it happens.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const ZAMP = 1.5 // scene units the magnet swings either side of the coil
const LINE_OFFSETS: [number, number][] = [
  [0, 0],
  [0.35, 0],
  [-0.35, 0],
  [0, 0.35],
  [0, -0.35],
]

useThree(
  el,
  ({ scene, theme }) => {
    function coilRadius(A: number) {
      return 0.55 + 0.45 * Math.sqrt(A)
    }
    const coilMat = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5, emissive: 0x000000, emissiveIntensity: 0 })
    let coil = new THREE.Mesh(new THREE.BufferGeometry(), coilMat)
    let sceneR = coilRadius(props.options?.A ?? 1)
    scene.add(coil)

    function rebuildCoil(A: number, N: number) {
      sceneR = coilRadius(A)
      const turns = THREE.MathUtils.clamp(Math.round(N / 12), 3, 16)
      const pts: THREE.Vector3[] = []
      const steps = turns * 8
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const angle = 2 * Math.PI * turns * t
        pts.push(new THREE.Vector3(sceneR * Math.cos(angle), sceneR * Math.sin(angle), -0.25 + 0.5 * t))
      }
      scene.remove(coil)
      coil.geometry.dispose()
      coil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), Math.min(160, steps), 0.035, 6, false), coilMat)
      scene.add(coil)
    }

    const halfGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 12)
    halfGeo.rotateX(Math.PI / 2)
    const nHalf = new THREE.Mesh(halfGeo, new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.4 }))
    nHalf.position.z = 0.3
    const sHalf = new THREE.Mesh(halfGeo, new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.4 }))
    sHalf.position.z = -0.3
    const magnet = new THREE.Group()
    magnet.add(nHalf, sHalf)
    magnet.castShadow = true
    scene.add(magnet)

    const fieldLines = LINE_OFFSETS.map(() => {
      const a = arrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 3.2, theme.accent, 0.22)
      ;(a.line.material as THREE.LineBasicMaterial).transparent = true
      ;(a.cone.material as THREE.MeshBasicMaterial).transparent = true
      return a
    })
    fieldLines.forEach((a) => scene.add(a))

    const tag = label('', undefined, 0.5)
    tag.position.set(0, 2, 0)
    scene.add(tag)

    let lastA = -1
    let lastN = -1
    let lastText = ''
    return () => {
      const B = props.params.B ?? 1
      const A = props.params.A ?? 1
      const f = props.params.f ?? 0.5
      const N = props.params.N ?? 50
      const x = props.params.x ?? 1
      if (A !== lastA || N !== lastN) {
        lastA = A
        lastN = N
        rebuildCoil(A, N)
      }

      const theta = 2 * Math.PI * f * x
      const phi = B * A * Math.cos(theta)
      const emf0 = N * B * A * 2 * Math.PI * f
      const emf = emf0 * Math.sin(theta)

      magnet.position.z = ZAMP * Math.sin(theta)

      const dir = phi >= 0 ? 1 : -1
      const frac = THREE.MathUtils.clamp(Math.abs(phi) / Math.max(1e-6, B * A), 0.12, 1)
      for (let i = 0; i < fieldLines.length; i++) {
        const a = fieldLines[i]!
        const [oy, oz] = LINE_OFFSETS[i]!
        a.position.set(oy * sceneR, oz * sceneR, dir > 0 ? -1.6 : 1.6)
        a.setDirection(dir > 0 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 0, -1))
        ;(a.line.material as THREE.LineBasicMaterial).opacity = frac
        ;(a.cone.material as THREE.MeshBasicMaterial).opacity = frac
      }

      const glowFrac = Math.abs(Math.sin(theta))
      coilMat.emissive.copy(emf >= 0 ? theme.pos : theme.neg)
      coilMat.emissiveIntensity = 0.15 + 0.9 * glowFrac

      const text = `ε ≈ ${emf.toFixed(1)} V`
      if (text !== lastText) {
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
    }
  },
  { camera: [3.4, 2, 4.6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
