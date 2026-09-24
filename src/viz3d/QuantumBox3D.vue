<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// Particle in a box: instead of the 2D curve of |ψ|², a translucent point cloud fills the box with
// density ∝ |ψₙ|² = 2 sin²(nπx/L), so it visibly crowds near the antinodes and thins to nothing at
// each of the n-1 nodes — gaps a flat curve can only mark with a dashed line, never actually show as
// empty space in a cloud. Same Eₙ = n² × E₁ ladder as the 2D readout.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const L = 6
const CROSS = 1.3
const MAX_PTS = 850
const NODE_SLOTS = 5 // n up to 6 → up to 5 interior nodes

useThree(
  el,
  ({ scene, theme }) => {
    const wallGeo = new THREE.BoxGeometry(0.12, CROSS + 0.3, CROSS + 0.3)
    const wallMat = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.6 })
    const wallA = new THREE.Mesh(wallGeo, wallMat)
    const wallB = new THREE.Mesh(wallGeo, wallMat)
    wallA.position.x = 0
    wallB.position.x = L
    scene.add(wallA, wallB)

    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(L, CROSS, CROSS),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.92, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.2 }),
    )
    glass.position.x = L / 2
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: theme.line }))
    edges.position.x = L / 2
    scene.add(edges)

    // Probability-density cloud: rejection-sampled from |ψₙ|² along x, uniform across the cross-section.
    const posArr = new Float32Array(MAX_PTS * 3)
    const geo = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(posArr, 3)
    geo.setAttribute('position', posAttr)
    const cloud = new THREE.Points(geo, new THREE.PointsMaterial({ color: theme.accent2, size: 0.16, transparent: true, opacity: 0.85, depthWrite: false }))
    scene.add(cloud)

    function sampleX(n: number): number {
      for (let tries = 0; tries < 30; tries++) {
        const x = Math.random() * L
        const w = Math.sin((n * Math.PI * x) / L) ** 2
        if (Math.random() < w) return x
      }
      return L / 2
    }
    function fillPoint(i: number, n: number) {
      posArr[i * 3] = sampleX(n)
      posArr[i * 3 + 1] = (Math.random() - 0.5) * CROSS
      posArr[i * 3 + 2] = (Math.random() - 0.5) * CROSS
    }

    // Node markers: faint cross-section slices where |ψ|² = 0, empty by construction of the sampling above.
    const nodeGeo = new THREE.PlaneGeometry(CROSS, CROSS)
    const nodeMat = new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.14, side: THREE.DoubleSide })
    const nodeOutlineGeo = new THREE.EdgesGeometry(nodeGeo)
    const nodes = Array.from({ length: NODE_SLOTS }, () => {
      const g = new THREE.Group()
      const fill = new THREE.Mesh(nodeGeo, nodeMat)
      fill.rotation.y = Math.PI / 2
      const outline = new THREE.LineSegments(nodeOutlineGeo, new THREE.LineDashedMaterial({ color: theme.neg, dashSize: 0.08, gapSize: 0.06 }))
      outline.rotation.y = Math.PI / 2
      outline.computeLineDistances()
      g.add(fill, outline)
      scene.add(g)
      return g
    })

    const tag = label('', theme.accent2.getStyle(), 0.42)
    scene.add(tag)
    function paint(text: string) {
      if (tag.userData.text === text) return
      tag.userData.text = text
      const img = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + theme.accent2.getHexString()
      cx.font = '600 32px Inter, sans-serif'
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let lastN = -1
    let cursor = 0
    return (dt) => {
      const n = Math.max(1, Math.min(6, Math.round(props.params.n ?? 1)))
      if (n !== lastN) {
        lastN = n
        for (let i = 0; i < MAX_PTS; i++) fillPoint(i, n)
        posAttr.needsUpdate = true
        for (let k = 0; k < NODE_SLOTS; k++) {
          const idx = k + 1
          const show = idx < n
          nodes[k].visible = show
          if (show) nodes[k].position.set((idx * L) / n, 0, 0)
        }
        paint(`${t('wave.energy')}: ${n * n} × E₁`)
        tag.position.set(L / 2, CROSS / 2 + 0.9, 0)
      }
      // A gentle shimmer keeps the cloud alive without moving its shape; frozen when dt = 0
      // (prefers-reduced-motion, handled by useThree itself), so it never autoplays motion.
      const reroll = Math.min(MAX_PTS, Math.floor(dt * 220))
      for (let k = 0; k < reroll; k++) {
        fillPoint(cursor, n)
        cursor = (cursor + 1) % MAX_PTS
      }
      if (reroll > 0) posAttr.needsUpdate = true
    }
  },
  { camera: [2.2, 2.6, 7], target: [L / 2, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
