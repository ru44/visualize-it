<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// nuclear/decay-chains. Same chain table and secular-equilibrium fractions as src/viz/DecayChains.vue.
// Here the chain is a real staircase you can orbit around: each tread's length along the walk is that
// member's own half-life (log-scaled, since they span seconds to billions of years — a dimension a
// flat N-Z chart has no room to show), the stairs descend one level per decay, and the radon tread —
// present in all three series — glows and grows a small drifting cloud, the same gas that seeps out
// of uranium- or thorium-bearing rock and soil into basements.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const Y = 3.1557e7, D = 86400, HR = 3600, MIN = 60
type M = [string, number, number, number, 'a' | 'b' | null]
const CHAINS: { members: M[] }[] = [
  { members: [
    ['U-238', 238, 92, 4.468e9 * Y, null], ['Th-234', 234, 90, 24.10 * D, 'a'], ['Pa-234m', 234, 91, 1.17 * MIN, 'b'], ['U-234', 234, 92, 245500 * Y, 'b'],
    ['Th-230', 230, 90, 75380 * Y, 'a'], ['Ra-226', 226, 88, 1600 * Y, 'a'], ['Rn-222', 222, 86, 3.8235 * D, 'a'], ['Po-218', 218, 84, 3.10 * MIN, 'a'],
    ['Pb-214', 214, 82, 26.8 * MIN, 'a'], ['Bi-214', 214, 83, 19.9 * MIN, 'b'], ['Po-214', 214, 84, 164.3e-6, 'b'], ['Pb-210', 210, 82, 22.3 * Y, 'a'],
    ['Bi-210', 210, 83, 5.013 * D, 'b'], ['Po-210', 210, 84, 138.376 * D, 'b'], ['Pb-206', 206, 82, Infinity, 'a'],
  ] },
  { members: [
    ['U-235', 235, 92, 7.04e8 * Y, null], ['Th-231', 231, 90, 25.52 * HR, 'a'], ['Pa-231', 231, 91, 32760 * Y, 'b'], ['Ac-227', 227, 89, 21.772 * Y, 'a'],
    ['Th-227', 227, 90, 18.68 * D, 'b'], ['Ra-223', 223, 88, 11.43 * D, 'a'], ['Rn-219', 219, 86, 3.96, 'a'], ['Po-215', 215, 84, 1.781e-3, 'a'],
    ['Pb-211', 211, 82, 36.1 * MIN, 'a'], ['Bi-211', 211, 83, 2.14 * MIN, 'b'], ['Tl-207', 207, 81, 4.77 * MIN, 'a'], ['Pb-207', 207, 82, Infinity, 'b'],
  ] },
  { members: [
    ['Th-232', 232, 90, 1.405e10 * Y, null], ['Ra-228', 228, 88, 5.75 * Y, 'a'], ['Ac-228', 228, 89, 6.15 * HR, 'b'], ['Th-228', 228, 90, 1.9116 * Y, 'b'],
    ['Ra-224', 224, 88, 3.6319 * D, 'a'], ['Rn-220', 220, 86, 55.6, 'a'], ['Po-216', 216, 84, 0.145, 'a'], ['Pb-212', 212, 82, 10.64 * HR, 'a'],
    ['Bi-212', 212, 83, 60.55 * MIN, 'b'], ['Po-212', 212, 84, 299e-9, 'b'], ['Pb-208', 208, 82, Infinity, 'a'],
  ] },
]
const MAXN = 15
const SPACING = 1.05
const DROP = 0.55
function treadLen(Tsec: number) { const l = Math.log10(Math.max(Tsec, 1e-7)); return THREE.MathUtils.clamp(0.25 + ((l + 4) / 22) * 0.65, 0.25, 0.9) }

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
    scene.add(ground(10, theme))
    const treadGeo = new THREE.BoxGeometry(1, 0.22, 0.85)
    const treads = Array.from({ length: MAXN }, () => {
      const m = new THREE.Mesh(treadGeo, new THREE.MeshStandardMaterial({ color: theme.fg }))
      m.castShadow = m.receiveShadow = true
      scene.add(m)
      return m
    })
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), new THREE.MeshBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.22 }))
    scene.add(cloud)
    const parentTag = label('', theme.accent.getStyle(), 0.3)
    const stableTag = label('', theme.pos.getStyle(), 0.3)
    const radonTag = label('', theme.accent2.getStyle(), 0.3)
    scene.add(parentTag, stableTag, radonTag)

    let lastKey = ''
    return (dt: number, tSec: number) => {
      const chain = Math.max(0, Math.min(2, Math.round(props.params.chain ?? 0)))
      const time = Math.max(0, Math.min(10, props.params.time ?? 1))
      const ms = CHAINS[chain].members
      const n = ms.length
      const T0 = ms[0][3]
      const f0 = Math.pow(0.5, time)
      const frac = ms.map((m, i) => (i === 0 ? f0 : i === n - 1 ? 0 : (m[3] / T0) * f0))
      frac[n - 1] = Math.max(0, 1 - frac.slice(0, -1).reduce((a, b) => a + b, 0))
      const radonIdx = ms.findIndex((m) => m[0].startsWith('Rn-'))

      for (let i = 0; i < MAXN; i++) {
        const tr = treads[i]
        if (i >= n) { tr.visible = false; continue }
        tr.visible = true
        const len = i === n - 1 ? 0.9 : treadLen(ms[i][3])
        tr.scale.set(len, 1, 1)
        tr.position.set(i * SPACING, -i * DROP, 0)
        const mat = tr.material as THREE.MeshStandardMaterial
        const isRadon = i === radonIdx
        mat.color.copy(i === 0 ? theme.accent : i === n - 1 ? theme.pos : isRadon ? theme.accent2 : theme.fg)
        mat.emissive.copy(mat.color)
        mat.emissiveIntensity = 0.15 + 0.55 * Math.pow(Math.max(frac[i], 1e-13), 0.12)
        mat.opacity = 1
      }

      const rp = treads[radonIdx]?.position
      if (rp) {
        cloud.visible = true
        cloud.position.set(rp.x, rp.y + 0.28 + Math.sin(tSec * 0.8) * 0.05, rp.z)
        const pulse = 1 + Math.sin(tSec * 1.3) * 0.08
        cloud.scale.set(pulse, pulse * 0.4, pulse)
      }

      const key = `${chain}|${time.toFixed(1)}`
      if (key !== lastKey) {
        lastKey = key
        parentTag.position.set(0, 0.7, 0)
        paint(parentTag, ms[0][0], theme.accent)
        stableTag.position.set((n - 1) * SPACING, -(n - 1) * DROP + 0.7, 0)
        paint(stableTag, ms[n - 1][0], theme.pos)
        if (radonIdx >= 0) {
          radonTag.position.set(radonIdx * SPACING, -radonIdx * DROP + 1.1, 0)
          paint(radonTag, `${ms[radonIdx][0]} (${t('decay.gasTag')})`, theme.accent2)
        }
      }
    }
  },
  { camera: [5.5, 3.2, 12], target: [6.5, -3.2, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
