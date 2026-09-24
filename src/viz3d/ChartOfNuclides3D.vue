<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { bindingEnergyPerNucleon, classify, symbolFor } from '../viz/nuclideData'

// content/lessons/nuclear/chart-of-nuclides. Same Z, N and binding energy per nucleon (B/A) as the 2D
// chart's readout. Height is how far B/A falls short of its real-world peak (about 8.8 MeV, near
// iron-56), so the best-bound nuclei sit at the valley floor and the loosely-bound ones climb the
// walls on either side — the "valley of stability" the 2D band only hints at, as an actual valley.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const ZMAX = 30
const NMAX = 45
const SEG = 46
const SX = 2.6 / ZMAX
const SZ = 2.6 / NMAX
const BPA_PEAK = 8.8 // MeV, the real binding-energy-per-nucleon ceiling near iron-56
const VSCALE = 0.14 // world units per MeV short of the peak

function heightFor(z: number, n: number): number {
  const bpa = Math.max(0, bindingEnergyPerNucleon(z, n))
  return Math.max(0, BPA_PEAK - bpa) * VSCALE
}

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 24px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.PlaneGeometry(ZMAX * SX, NMAX * SZ, SEG, SEG)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const z = Math.round(Math.max(1, pos.getX(i) / SX + ZMAX / 2))
      const n = Math.round(Math.max(0, pos.getZ(i) / SZ + NMAX / 2))
      pos.setY(i, heightFor(z, n))
    }
    geo.computeVertexNormals()
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.85, side: THREE.DoubleSide, flatShading: false }))
    mesh.position.set(0, 0, 0)
    mesh.receiveShadow = true
    scene.add(mesh)
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.35 }))
    scene.add(wire)

    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.5 }))
    scene.add(marker)
    const tag = label('', theme.fg.getStyle(), 0.28)
    scene.add(tag)

    let lastKey = ''
    return () => {
      const Z = Math.round(Math.min(ZMAX, Math.max(1, props.params.Z ?? 26)))
      const N = Math.round(Math.min(NMAX, Math.max(0, props.params.N ?? 30)))
      const key = `${Z}|${N}`
      if (key === lastKey) return
      lastKey = key

      const bpa = bindingEnergyPerNucleon(Z, N)
      const x = (Z - ZMAX / 2) * SX
      const zPos = (N - NMAX / 2) * SZ
      const y = heightFor(Z, N)
      marker.position.set(x, y + 0.06, zPos)
      tag.position.set(x, y + 0.32, zPos)

      const mode = classify(Z, N)
      const col = mode === 'stable' ? theme.pos : mode === 'n-rich' ? theme.accent : theme.accent2
      paint(tag, `${symbolFor(Z)}-${Z + N} · ${bpa.toFixed(2)} MeV`, col)
      ;(marker.material as THREE.MeshStandardMaterial).color.copy(col)
      ;(marker.material as THREE.MeshStandardMaterial).emissive.copy(col)
    }
  },
  { camera: [2.6, 2.1, 2.9], target: [0, 0.5, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
