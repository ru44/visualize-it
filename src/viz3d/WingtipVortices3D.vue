<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// What the flat top-down 2D picture (aerodynamics/wingtip-vortices-and-induced-drag) cannot show:
// the vortex is a 3D corkscrew trailing downstream behind the wing, not a flat spiral, and the
// two tip vortices sit at different heights than the wing itself once they roll up. Same params
// (AR, alpha, winglets) and the same vortexSize/winglets scaling as the 2D picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const S_REF = 16
const SCALE = 1 / 3 // metres -> scene units, so a 24 m span fits a compact scene

useThree(
  el,
  ({ scene, theme }) => {
    const wingGeo = new THREE.BoxGeometry(1.1, 0.09, 1)
    const wing = new THREE.Mesh(wingGeo, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
    wing.castShadow = true
    scene.add(wing)

    const wingletGeo = new THREE.BoxGeometry(0.08, 0.5, 0.32)
    const wingletMat = new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.5 })
    const wingletL = new THREE.Mesh(wingletGeo, wingletMat)
    const wingletR = new THREE.Mesh(wingletGeo, wingletMat)
    scene.add(wingletL, wingletR)

    const grid = new THREE.GridHelper(24, 24, theme.line, theme.grid)
    grid.position.y = -3
    scene.add(grid)

    // Two vortex cores, one per tip, each a set of particles spiralling backward (−X, behind the
    // wing) around a tube centred on that tip's Z position. Rebuilt only when span/size changes.
    const N_PER = 90
    const TRAIL = 9
    const seedL = Array.from({ length: N_PER }, (_, i) => ({ s: i / N_PER, ang: (i * 2.399) % (Math.PI * 2) }))
    const seedR = Array.from({ length: N_PER }, (_, i) => ({ s: i / N_PER, ang: (i * 2.399) % (Math.PI * 2) }))
    const posL = new Float32Array(N_PER * 3)
    const posR = new Float32Array(N_PER * 3)
    const vortexL = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(posL, 3)),
      new THREE.PointsMaterial({ color: theme.accent2, size: 0.09, transparent: true, opacity: 0.85 }),
    )
    const vortexR = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(posR, 3)),
      new THREE.PointsMaterial({ color: theme.accent2, size: 0.09, transparent: true, opacity: 0.85 }),
    )
    scene.add(vortexL, vortexR)

    // A thin downwash sheet between the two vortices, sinking slightly as it trails back.
    const NS = 60
    const sheetSeed = Array.from({ length: NS }, (_, i) => ({ s: i / NS, z: (Math.random() - 0.5) * 0.8 }))
    const sheetPos = new Float32Array(NS * 3)
    const sheet = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(sheetPos, 3)),
      new THREE.PointsMaterial({ color: theme.muted, size: 0.05, transparent: true, opacity: 0.5 }),
    )
    scene.add(sheet)

    let halfSpan = 1
    return (dt, tsec) => {
      const AR = Math.max(1, props.params.AR ?? 9)
      const alpha = props.params.alpha ?? 8
      const winglets = (props.params.winglets ?? 0) > 0.5
      const CL = 2 * Math.PI * Math.sin((alpha * Math.PI) / 180)
      const spanM = Math.sqrt(AR * S_REF)
      halfSpan = (spanM / 2) * SCALE
      wing.scale.z = Math.max(0.3, (spanM * SCALE) / 1)
      wingletL.visible = wingletR.visible = winglets
      wingletL.position.set(0, 0.25, -halfSpan)
      wingletR.position.set(0, 0.25, halfSpan)

      const radius = Math.min(0.75, 0.16 + 0.42 * CL) * (winglets ? 0.65 : 1)
      const spin = 1 + CL * 0.6
      const t0 = tsec

      const fillCore = (seed: typeof seedL, pos: Float32Array, tipZ: number, dir: number) => {
        for (let i = 0; i < seed.length; i++) {
          const { s, ang } = seed[i]
          const depth = ((s + t0 * 0.12) % 1) * TRAIL
          const a = ang + dir * spin * t0 * 4
          const r = radius * (0.5 + 0.5 * Math.min(1, depth / 1.2))
          pos[i * 3] = -depth
          pos[i * 3 + 1] = Math.sin(a) * r
          pos[i * 3 + 2] = tipZ + Math.cos(a) * r
        }
      }
      fillCore(seedL, posL, -halfSpan, 1)
      fillCore(seedR, posR, halfSpan, -1)
      ;(vortexL.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
      ;(vortexR.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true

      for (let i = 0; i < sheetSeed.length; i++) {
        const { s, z } = sheetSeed[i]
        const depth = ((s + t0 * 0.12) % 1) * TRAIL
        sheetPos[i * 3] = -depth
        sheetPos[i * 3 + 1] = -0.05 - 0.22 * Math.min(1, depth / 3)
        sheetPos[i * 3 + 2] = z * halfSpan * 1.7
      }
      ;(sheet.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
  },
  { camera: [8, 3.4, 7.5], target: [-2.5, -0.3, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
