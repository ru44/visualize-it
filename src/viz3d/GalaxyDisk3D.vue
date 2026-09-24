<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same v(r) as RotationCurve.vue: a star's speed comes from the visible mass alone (vVis) plus whatever
// the halo slider adds (vTot). Stars sit at the same r = 30·frac^1.4, golden-angle layout as the 2D star
// field, then spin at their own ω = v(r)/r: with the halo at 0 the outer stars crawl and the disc winds
// up unevenly in a few seconds; raise the halo and the flat curve keeps them turning almost in step with
// the inner stars — a spiral galaxy's real "winding problem", which a single flat curve cannot animate.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const G = 4.3e-6 // kpc·(km/s)²/M☉
const M_VIS = 6e10
const RD = 3
const mVis = (r: number) => M_VIS * (1 - Math.exp(-r / RD) * (1 + r / RD))
const vVis = (r: number) => Math.sqrt((G * mVis(r)) / Math.max(r, 0.01))
const vTot = (r: number, halo: number) => Math.sqrt(vVis(r) ** 2 + G * halo * 1e9)
const N = 220
const S = 1 / 6 // kpc → scene units, so 30 kpc ≈ 5 units
const STARS = Array.from({ length: N }, (_, i) => ({ r: 30 * Math.pow(((i * 0.618) % 1) * 0.95 + 0.02, 1.4), a: i * 2.39996, y: (((i * 0.371) % 1) - 0.5) * 0.12 }))

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const starPos = new Float32Array(500 * 3)
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 90
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.12 })))

    const halo = new THREE.Mesh(new THREE.SphereGeometry(1, 26, 18), new THREE.MeshPhysicalMaterial({ color: theme.accent2, transparent: true, opacity: 0.08, roughness: 0.3, transmission: 0.5, side: THREE.DoubleSide }))
    scene.add(halo)

    const disc = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: theme.accent2 }), N)
    scene.add(disc)
    const follow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.4 }))
    scene.add(follow)
    const tag = label('', theme.pos.getStyle(), 0.42)
    scene.add(tag)

    const m4 = new THREE.Matrix4()
    let ang = 0
    return (dt: number) => {
      const haloV = Math.max(0, props.params.halo ?? 0)
      const rStar = THREE.MathUtils.clamp(props.params.r ?? 15, 1, 30)
      halo.scale.setScalar(0.8 + haloV * 0.45)
      ;(halo.material as THREE.MeshPhysicalMaterial).opacity = 0.04 + haloV * 0.018

      ang += dt * 0.045
      for (let i = 0; i < N; i++) {
        const s = STARS[i]
        const v = vTot(s.r, haloV)
        const theta = s.a + ang * (v / Math.max(s.r, 0.5))
        const x = s.r * S * Math.cos(theta)
        const z = s.r * S * Math.sin(theta)
        m4.makeTranslation(x, s.y, z)
        disc.setMatrixAt(i, m4)
      }
      disc.instanceMatrix.needsUpdate = true

      const vHere = vTot(rStar, haloV)
      const thetaHere = ang * (vHere / Math.max(rStar, 0.5))
      follow.position.set(rStar * S * Math.cos(thetaHere), 0.05, rStar * S * Math.sin(thetaHere))
      tag.position.set(follow.position.x, 0.55, follow.position.z)
      setLabel(tag, t('galaxydisk3d.speed', { v: fmt(vHere, 0) }), theme.pos)
    }
  },
  { camera: [0, 4.4, 6.5], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
