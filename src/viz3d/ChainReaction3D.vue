<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { fmt } from '../engine/math'
import { t } from '../i18n'

// nuclear/chain-reaction. Same params (k, generations) and the SAME population number as
// src/viz/ChainReaction.vue (identical seed and cap rule, see countPopulation below) — but here
// every neutron also has a place in space, inside a ball of fuel whose radius grows with k. A
// neutron born near the middle of a small ball reaches the surface and escapes after only a step
// or two; the same neutron in a large ball almost always gets captured first and causes another
// fission. That is the flat tree's abstract "k" made physical: critical mass is a size, not just a
// number.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const CAP = 28
const MAX_DOTS = 40
const RAD = 0.06

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
// Mirrors src/viz/ChainReaction.vue's population computed: simulate the same capped
// Galton-Watson process with the same seed, fall back to the exact k^g once it hits the cap.
function countPopulation(k: number, generations: number) {
  const rnd = makeRng(1000 + Math.round(k * 1000))
  const floorK = Math.floor(k)
  const frac = k - floorK
  let n = 1
  for (let g = 1; g <= generations; g++) {
    let next = 0
    for (let pi = 0; pi < n && next < CAP; pi++) {
      let children = floorK
      if (rnd() < frac) children++
      next += children
    }
    n = next
    if (n >= CAP) return Math.round(k ** generations)
  }
  return n
}
const sphereR = (k: number) => 0.5 + ((k - 0.5) / 2) * 1.0

function paintLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 22px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const glass = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 18), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.92, roughness: 0.05, thickness: 0.3, transparent: true, opacity: 0.22 }))
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.35 }))
    scene.add(edges)
    const geo = new THREE.SphereGeometry(RAD, 10, 8)
    const escMat = new THREE.MeshStandardMaterial({ color: theme.muted, transparent: true, opacity: 0.5 })
    const capMat = new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.3 })
    const dots = Array.from({ length: MAX_DOTS }, () => { const m = new THREE.Mesh(geo, capMat); scene.add(m); return m })
    const tag = label('', theme.pos.getStyle(), 0.3)
    scene.add(tag)

    let lastKey = ''
    return () => {
      const k = Math.max(0.5, Math.min(2.5, props.params.k ?? 1))
      const generations = Math.max(0, Math.min(12, Math.round(props.params.generations ?? 0)))
      const key = `${k.toFixed(2)}|${generations}`
      if (key === lastKey) return
      lastKey = key

      const R = sphereR(k)
      glass.scale.setScalar(R)
      edges.scale.setScalar(R * 1.02)

      for (let i = 0; i < MAX_DOTS; i++) {
        const rnd = makeRng(i * 7919 + Math.round(k * 1000) * 31 + generations)
        let pos = new THREE.Vector3()
        let escaped = false
        for (let g = 0; g < generations && !escaped; g++) {
          const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize()
          const next = pos.clone().addScaledVector(dir, 0.45 * R)
          if (next.length() > R) { pos = dir.multiplyScalar(R * 0.98); escaped = true } else pos = next
        }
        dots[i].position.copy(pos)
        dots[i].material = escaped ? escMat : capMat
        dots[i].visible = true
      }

      const pop = countPopulation(k, generations)
      tag.position.set(0, R + 0.7, 0)
      const status = k < 0.98 ? t('chain.dying') : k > 1.02 ? t('chain.growing') : t('chain.steady')
      paintLabel(tag, `${fmt(pop, 0)} · ${status}`, theme.pos)
    }
  },
  { camera: [2.4, 1.7, 2.6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
