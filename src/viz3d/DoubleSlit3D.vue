<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// A source, a wall with two slits, and the water-ripple-like height field spreading beyond them —
// what the 2D picture's flat intensity-vs-y graph cannot show is that the stripes are a genuine 2D
// wave pattern. Particles still land one at a time on the screen, sampled from the exact same
// intensity(y) the 2D picture plots, so the stripe spacing always matches Δy = λ/(2.5d). With the
// detector on, the same sampling collapses to the two which-path bands.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const XWALL = 2.4
const XSCREEN = 8.6
const ZMAX = 2.6
const ZSCALE = 2.2
const WALL_H = 2.4
const WALL_T = 0.18
const MAX_HITS = 900
const NXR = 22
const NZR = 22

function sinc2(u: number): number {
  return Math.abs(u) < 1e-6 ? 1 : (Math.sin(u) / u) ** 2
}
function intensity(y: number, d: number, lam: number, det: boolean): number {
  if (det) {
    const g = (c: number) => Math.exp(-((y - c) ** 2) / 0.02)
    return 0.5 * (g(-0.12 * d) + g(0.12 * d))
  }
  return Math.cos((Math.PI * y * d * 2.5) / lam) ** 2 * sinc2((Math.PI * y * 0.6 * 2.5) / lam)
}
function sampleY(d: number, lam: number, det: boolean): number {
  for (let k = 0; k < 200; k++) {
    const y = Math.random() * 2 - 1
    if (Math.random() < intensity(y, d, lam, det)) return y
  }
  return 0
}

useThree(
  el,
  ({ scene, theme }) => {
    const source = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent }))
    source.position.set(0, WALL_H / 2, 0)
    scene.add(source)

    const wallMat = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.7 })
    const segGeo = new THREE.BoxGeometry(1, 1, 1)
    const mkSeg = () => {
      const m = new THREE.Mesh(segGeo, wallMat)
      scene.add(m)
      return m
    }
    const segTop = mkSeg()
    const segMid = mkSeg()
    const segBot = mkSeg()
    const setSeg = (mesh: THREE.Mesh, centerZ: number, sizeZ: number) => {
      mesh.scale.set(WALL_T, WALL_H, Math.max(0.05, sizeZ))
      mesh.position.set(XWALL, WALL_H / 2, centerZ)
    }

    const markerGeo = new THREE.SphereGeometry(0.09, 8, 6)
    const markerMat = new THREE.MeshStandardMaterial({ color: theme.neg })
    const markA = new THREE.Mesh(markerGeo, markerMat)
    const markB = new THREE.Mesh(markerGeo, markerMat)
    scene.add(markA, markB)

    const screenPlane = new THREE.Mesh(new THREE.PlaneGeometry(2 * ZMAX, WALL_H), new THREE.MeshStandardMaterial({ color: theme.sunken, side: THREE.DoubleSide, roughness: 1 }))
    screenPlane.rotation.y = Math.PI / 2
    screenPlane.position.set(XSCREEN, WALL_H / 2, 0)
    scene.add(screenPlane)

    // Interference ripple: a genuine 2D height field spreading from both slits, x = distance travelled.
    const RX0 = XWALL + 0.25
    const RX1 = XSCREEN - 0.35
    const rippleGeo = new THREE.PlaneGeometry(RX1 - RX0, 2 * ZMAX, NXR, NZR)
    rippleGeo.rotateX(-Math.PI / 2)
    rippleGeo.translate((RX0 + RX1) / 2, 0, 0)
    const rippleMesh = new THREE.Mesh(rippleGeo, new THREE.MeshStandardMaterial({ color: theme.accent, side: THREE.DoubleSide, roughness: 0.6, transparent: true, opacity: 0.85 }))
    scene.add(rippleMesh)
    const rPos = rippleGeo.attributes.position as THREE.BufferAttribute

    // Hits build up as a point cloud on the screen, sampled one at a time exactly like the 2D picture.
    const hitPos = new Float32Array(MAX_HITS * 3)
    const hitGeo = new THREE.BufferGeometry()
    const hitAttr = new THREE.BufferAttribute(hitPos, 3)
    hitGeo.setAttribute('position', hitAttr)
    hitGeo.setDrawRange(0, 0)
    const hitPts = new THREE.Points(hitGeo, new THREE.PointsMaterial({ color: theme.accent2, size: 0.08, transparent: true, opacity: 0.9, depthWrite: false }))
    scene.add(hitPts)
    let count = 0
    function addHit(d: number, lam: number, det: boolean) {
      if (count >= MAX_HITS) return
      const y = sampleY(d, lam, det)
      const i = count * 3
      // Just in front of the screen (smaller x, toward the camera/source side) so the opaque screen
      // plate never occludes the accumulating hits.
      hitPos[i] = XSCREEN - 0.02 - Math.random() * 0.05
      hitPos[i + 1] = 0.3 + Math.random() * (WALL_H - 0.6)
      hitPos[i + 2] = y * ZSCALE
      count++
      hitAttr.needsUpdate = true
      hitGeo.setDrawRange(0, count)
    }

    const srcTag = label('', theme.fg.getStyle(), 0.3)
    const scrTag = label('', theme.fg.getStyle(), 0.3)
    const watchTag = label('', theme.neg.getStyle(), 0.32)
    const spacingTag = label('', theme.accent2.getStyle(), 0.34)
    srcTag.position.set(0, WALL_H / 2 + 0.9, 0)
    scrTag.position.set(XSCREEN, WALL_H + 0.5, 0)
    watchTag.position.set(XWALL, WALL_H + 0.7, 0)
    spacingTag.position.set((XWALL + XSCREEN) / 2, WALL_H + 1.1, 0)
    scene.add(srcTag, scrTag, watchTag, spacingTag)
    function setText(spr: THREE.Sprite, text: string, color: THREE.Color) {
      const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = `600 ${Math.max(16, Math.min(30, Math.floor(340 / Math.max(4, text.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }
    setText(srcTag, t('slit.source'), theme.fg)
    setText(scrTag, t('slit.screen'), theme.fg)

    let lastKey = ''
    let acc = 0
    let simT = 0
    return (dt) => {
      const d = props.params.d ?? 3
      const lam = props.params.lam ?? 2
      const det = (props.params.detector ?? 0) >= 0.5
      const rate = props.params.rate ?? 40
      const off = 0.06 * d * ZSCALE
      const halfSlit = 0.05 * ZSCALE

      const key = `${d}|${lam}|${det}`
      if (key !== lastKey) {
        lastKey = key
        count = 0
        acc = 0
        hitGeo.setDrawRange(0, 0)
        setSeg(segTop, (off + halfSlit + ZMAX + 0.4) / 2, ZMAX + 0.4 - (off + halfSlit))
        setSeg(segBot, -((off + halfSlit + ZMAX + 0.4) / 2), ZMAX + 0.4 - (off + halfSlit))
        setSeg(segMid, 0, 2 * (off - halfSlit))
        markA.position.set(XWALL, WALL_H * 0.55, off)
        markB.position.set(XWALL, WALL_H * 0.55, -off)
        markA.visible = markB.visible = det
        watchTag.visible = det
        if (det) setText(watchTag, t('slit.watching'), theme.neg)
        setText(spacingTag, `${t('slit.spacing')}: ${det ? '—' : fmt(lam / (d * 2.5), 3)}`, theme.accent2)
        // Seed a batch immediately so the pattern is visible at once (also covers reduced-motion, which
        // never advances dt and would otherwise never accumulate any hits).
        for (let i = 0; i < 240; i++) addHit(d, lam, det)
      }

      acc += dt * rate
      while (acc > 1 && count < MAX_HITS) {
        acc -= 1
        addHit(d, lam, det)
      }

      simT += dt
      source.scale.setScalar(1 + 0.08 * Math.sin(simT * 2))
      const k = (2 * Math.PI) / (0.35 * lam + 0.15)
      const ripplePhase = simT * 3
      for (let i = 0; i < rPos.count; i++) {
        const vx = rPos.getX(i)
        const vz = rPos.getZ(i)
        const dx1 = vx - XWALL
        const dz1 = vz - off
        const dz2 = vz + off
        const r1 = Math.sqrt(dx1 * dx1 + dz1 * dz1)
        const r2 = Math.sqrt(dx1 * dx1 + dz2 * dz2)
        const decay = 1 / (1 + 0.22 * dx1)
        rPos.setY(i, decay * 0.5 * (Math.cos(k * r1 - ripplePhase) + Math.cos(k * r2 - ripplePhase)) * 0.5)
      }
      rPos.needsUpdate = true
      rippleGeo.computeVertexNormals()
    }
  },
  { camera: [1, 5, 13], target: [4.5, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
