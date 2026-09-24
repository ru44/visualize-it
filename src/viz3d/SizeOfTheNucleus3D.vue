<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'

// content/lessons/nuclear/size-of-the-nucleus. Same θ = 2·arctan(Zze²/(8πε₀Eb)) as the 2D picture, for
// the same Z=79 (gold), z=2 (alpha) and sliders b, E. The flat picture only ever shows aims in one
// plane; here the beam comes in from every direction around the nucleus, and the tiny gold sphere sits
// at the centre of a huge, mostly-empty atom outline — showing why almost every alpha misses it clean.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const Z_GOLD = 79
const Z_ALPHA = 2
const E_CHARGE = 1.602176634e-19
const EPS0 = 8.8541878128e-12
const K = (Z_GOLD * Z_ALPHA * E_CHARGE * E_CHARGE) / (8 * Math.PI * EPS0)
const ATOM_R = 2.6 // the atom's outer edge, three.js units — nucleus is ~1e-5 of this, drawn oversized to stay visible
const NUCLEUS_R = 0.05
const RAYS = 12

function thetaRad(bFm: number, eMeV: number): number {
  const eJ = eMeV * 1.602176634e-13
  const bM = Math.max(1e-16, bFm) * 1e-15
  return 2 * Math.atan(K / (eJ * bM))
}
function dispOffset(bFm: number): number {
  return 0.35 + 1.55 * Math.sqrt(Math.min(Math.abs(bFm), 300) / 300)
}

useThree(
  el,
  ({ scene, theme }) => {
    const atom = new THREE.Mesh(new THREE.SphereGeometry(ATOM_R, 24, 18), new THREE.MeshBasicMaterial({ color: theme.line, wireframe: true, transparent: true, opacity: 0.25 }))
    scene.add(atom)
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(NUCLEUS_R, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.4 }))
    scene.add(nucleus)

    const tubeR = 0.012
    const lines: THREE.Mesh[] = []
    for (let i = 0; i < RAYS + 1; i++) {
      const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(), new THREE.Vector3(0, 0, 1)), 20, tubeR, 6, false), new THREE.MeshBasicMaterial({ color: i === RAYS ? theme.accent2 : theme.muted, transparent: true, opacity: i === RAYS ? 1 : 0.4 }))
      scene.add(m)
      lines.push(m)
    }
    const tag = label('', theme.fg.getStyle(), 0.3)
    tag.position.set(0, 1.05, 0)
    scene.add(tag)

    function rayCurve(offsetIdx: number, bSigned: number, theta: number): THREE.CatmullRomCurve3 {
      const ang = (offsetIdx / RAYS) * Math.PI * 2
      const perp = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0)
      const dir = new THREE.Vector3(0, 0, -1)
      const off = dispOffset(bSigned)
      const start = perp.clone().multiplyScalar(off).addScaledVector(dir, -ATOM_R)
      const kink = perp.clone().multiplyScalar(off).addScaledVector(dir, -0.25)
      const bendAxis = new THREE.Vector3().crossVectors(dir, perp).normalize()
      const outDir = dir.clone().applyAxisAngle(bendAxis, theta)
      const end = kink.clone().addScaledVector(outDir, ATOM_R)
      return new THREE.CatmullRomCurve3([start, kink.clone().addScaledVector(dir, 0.12), kink, kink.clone().addScaledVector(outDir, 0.12), end])
    }

    let lastKey = ''
    return () => {
      const b = Math.max(1, Math.min(300, props.params.b ?? 20))
      const E = Math.max(1, Math.min(10, props.params.E ?? 5))
      const key = `${b}|${E}`
      if (key === lastKey) return
      lastKey = key

      for (let i = 0; i < RAYS; i++) {
        const bg = 60 + i * 17
        const th = thetaRad(bg, E)
        const curve = rayCurve(i, bg, th)
        const geo = new THREE.TubeGeometry(curve, 24, tubeR, 6, false)
        lines[i]!.geometry.dispose()
        lines[i]!.geometry = geo
      }
      const theta = thetaRad(b, E)
      const curve = rayCurve(RAYS, b, theta)
      const geo = new THREE.TubeGeometry(curve, 28, tubeR * 1.6, 8, false)
      lines[RAYS]!.geometry.dispose()
      lines[RAYS]!.geometry = geo

      const thetaDeg = (theta * 180) / Math.PI
      const closest = ((2 * K) / (E * 1.602176634e-13) / 1e-15).toFixed(1)
      paint(tag, `θ ${thetaDeg.toFixed(0)}° · D ${closest} fm`, theme.fg)
    }

    function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
      const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = '600 22px Inter, sans-serif'
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }
  },
  { camera: [3.4, 2.2, 3.4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
