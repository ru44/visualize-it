<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'

// A coil of n turns per metre carrying current I. Ampère's law gives a field inside that is uniform and
// B = mu0*n*I (the exact same number as the 2D chart's marked point), and a field outside so weak the 2D
// chart never even plots it. The flat B-vs-I curve cannot show that spatial pattern — only that one number.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const MU0 = 4 * Math.PI * 1e-7
const L = 3.2 // coil length, scene units
const RC = 0.7 // coil radius, scene units
const INSIDE_OFFSETS: [number, number][] = [
  [0, 0],
  [0.35, 0],
  [-0.35, 0],
  [0, 0.35],
  [0, -0.35],
]
const XS = [-L / 3, 0, L / 3]

useThree(
  el,
  ({ scene, theme }) => {
    const coilMat = new THREE.MeshStandardMaterial({ color: theme.fg, metalness: 0.5, roughness: 0.4 })
    let coil = new THREE.Mesh(new THREE.BufferGeometry(), coilMat)
    scene.add(coil)

    function rebuildCoil() {
      const n = props.params.n ?? 2000
      const turns = THREE.MathUtils.clamp(Math.round(n / 180), 6, 28)
      const pts: THREE.Vector3[] = []
      const steps = turns * 10
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const angle = 2 * Math.PI * turns * t
        pts.push(new THREE.Vector3(-L / 2 + L * t, RC * Math.cos(angle), RC * Math.sin(angle)))
      }
      scene.remove(coil)
      coil.geometry.dispose()
      coil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), Math.min(220, turns * 8), 0.045, 6, false), coilMat)
      scene.add(coil)
    }
    rebuildCoil()
    watch(() => props.params.n, rebuildCoil)

    const insideArrows: THREE.ArrowHelper[] = []
    for (const x of XS)
      for (const [oy, oz] of INSIDE_OFFSETS) {
        const a = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(x, oy, oz), 0.5, theme.accent2)
        insideArrows.push(a)
        scene.add(a)
      }
    const outsideArrows: THREE.ArrowHelper[] = []
    for (const x of [-L / 2.2, 0, L / 2.2])
      for (const ang of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
        const oy = RC * 1.5 * Math.cos(ang)
        const oz = RC * 1.5 * Math.sin(ang)
        const a = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(x, oy, oz), 0.18, theme.muted)
        outsideArrows.push(a)
        scene.add(a)
      }

    const tag = label('', undefined, 0.55)
    tag.position.set(0, 2, 0)
    scene.add(tag)

    let lastText = ''
    return () => {
      const I = props.params.I ?? 10
      const n = props.params.n ?? 2000
      const B = MU0 * n * I // Tesla
      const B_mT = B * 1000
      const lenIn = THREE.MathUtils.clamp(0.25 + 0.9 * Math.sqrt(B_mT / 314), 0.25, 1.3)
      for (const a of insideArrows) a.setLength(lenIn, lenIn * 0.32, lenIn * 0.2)
      const lenOut = THREE.MathUtils.clamp(0.08 + 0.05 * Math.sqrt(B_mT / 314), 0.08, 0.22)
      for (const a of outsideArrows) a.setLength(lenOut, lenOut * 0.4, lenOut * 0.25)

      const text = `B ≈ ${B_mT.toFixed(1)} mT`
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
  { camera: [3.5, 2.6, 4.6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
