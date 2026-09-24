<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same Gutenberg–Richter numbers as the 2D charts: log10 E = 1.5x + 4.8 is linear in magnitude x, so a
// wave ring whose radius grows linearly with x sits on that same log-energy scale, and the energy ratio
// to a magnitude-5 quake, 10^(1.5(x-5)), sets how hard the city marker shakes. A flat curve can only plot
// energy; a globe can show a wavefront actually spreading outward from the focus and a city actually shaking.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const R = 2
const EPI = new THREE.Vector3(0, 1, 0.15).normalize()
const CITY = new THREE.Vector3(0.75, 0.55, 0.2).normalize()
const CITY_THETA = EPI.angleTo(CITY)

function basis(n: THREE.Vector3): [THREE.Vector3, THREE.Vector3] {
  const r = Math.abs(n.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
  const u = new THREE.Vector3().crossVectors(r, n).normalize()
  const w = new THREE.Vector3().crossVectors(n, u).normalize()
  return [u, w]
}
const [U, W] = basis(EPI)
function ringPts(theta: number, segs = 40): THREE.Vector3[] {
  const ct = Math.cos(theta)
  const st = Math.sin(theta)
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= segs; i++) {
    const ph = (i / segs) * Math.PI * 2
    pts.push(EPI.clone().multiplyScalar(ct).addScaledVector(U, st * Math.cos(ph)).addScaledVector(W, st * Math.sin(ph)).multiplyScalar(R))
  }
  return pts
}

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
    const crust = new THREE.Mesh(new THREE.SphereGeometry(R, 36, 24), new THREE.MeshPhysicalMaterial({ color: theme.sunken, transparent: true, opacity: 0.4, roughness: 0.5, transmission: 0.5, side: THREE.DoubleSide }))
    scene.add(crust)
    const core = new THREE.Mesh(new THREE.SphereGeometry(R * 0.35, 20, 14), new THREE.MeshStandardMaterial({ color: theme.accent2, emissive: theme.accent2, emissiveIntensity: 0.35 }))
    scene.add(core)
    const focus = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), new THREE.MeshStandardMaterial({ color: theme.neg, emissive: theme.neg, emissiveIntensity: 0.6 }))
    focus.position.copy(EPI).multiplyScalar(R * 0.55)
    scene.add(focus)

    const rings = [0, 1].map(() => new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.pos, transparent: true })))
    rings.forEach((r) => scene.add(r))

    const cityMat = new THREE.MeshStandardMaterial({ color: theme.accent })
    const city = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.14), cityMat)
    const cityRest = CITY.clone().multiplyScalar(R)
    city.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), CITY)
    scene.add(city)
    const envelope = new THREE.Mesh(new THREE.RingGeometry(0.6, 1, 24), new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.5, side: THREE.DoubleSide }))
    envelope.position.copy(CITY).multiplyScalar(R + 0.01)
    envelope.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), CITY)
    scene.add(envelope)

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.copy(CITY).multiplyScalar(R + 0.7)
    scene.add(tag)

    const PERIOD = 4.5
    return (dt, clock) => {
      const x = THREE.MathUtils.clamp(props.params.x ?? 6, 0, 9)
      const ratio = Math.pow(10, 1.5 * (x - 5))
      const thetaMax = 0.25 + x * 0.11
      rings.forEach((ring, i) => {
        const phase = (((clock / PERIOD + i * 0.5) % 1) + 1) % 1
        ring.geometry.setFromPoints(ringPts(phase * thetaMax))
        ;(ring.material as THREE.LineBasicMaterial).opacity = 1 - phase
      })
      const shakeAmp = THREE.MathUtils.clamp(0.02 + 0.06 * Math.log10(1 + ratio), 0.02, 0.45)
      city.position.copy(cityRest).addScaledVector(U, Math.sin(clock * 14) * shakeAmp).addScaledVector(W, Math.cos(clock * 11) * shakeAmp * 0.7)
      envelope.scale.setScalar(shakeAmp)
      const felt = thetaMax >= CITY_THETA
      cityMat.color.copy(felt ? theme.neg : theme.accent)
      core.rotation.y += dt * 0.03
      setLabel(tag, t('quake3d.city', { v: fmt(x, 1) }), theme.pos)
    }
  },
  { camera: [3.4, 3.6, 5], target: [0, 0.8, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
