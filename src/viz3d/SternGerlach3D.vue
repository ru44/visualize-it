<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// The flat picture shows one slice through the beam. What it cannot show: the beam has real width
// (many atoms travelling side by side, spread across the z axis) and the magnet's two pole pieces
// have genuinely different 3D shapes — a pointed edge above, a wide trough below — which is what
// makes the field inhomogeneous in the first place. Same s (mm) = 21300*G/v^2 as the 2D picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const XSRC = -3.2
const XM0 = -1.2
const XM1 = 0.4
const XSCREEN = 3.2
const WORLD_PER_MM = 2.2
const N_ATOMS = 14
const PERIOD = 3.2
const HALF_WIDTH = 0.45
const BEAM_Y = 1.3

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(16, theme))

    const source = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshStandardMaterial({ color: theme.fg }))
    source.position.set(XSRC, BEAM_Y, 0)
    scene.add(source)

    // Asymmetric pole pieces: a pointed blade on top, a flat trough below — the shape that makes the
    // field's gradient point along y. Both sit above the ground plane so neither is hidden by it.
    const poleMat = new THREE.MeshStandardMaterial({ color: theme.neg, transparent: true, opacity: 0.55, roughness: 0.5 })
    const blade = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.65, XM1 - XM0, 3), poleMat)
    blade.rotation.z = Math.PI / 2
    blade.rotation.y = Math.PI / 6
    blade.position.set((XM0 + XM1) / 2, BEAM_Y + 0.65, 0)
    const trough = new THREE.Mesh(new THREE.BoxGeometry(XM1 - XM0, 0.32, 1.5), poleMat.clone())
    trough.position.set((XM0 + XM1) / 2, BEAM_Y - 0.7, 0)
    scene.add(blade, trough)

    const screenPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.4), new THREE.MeshStandardMaterial({ color: theme.sunken, side: THREE.DoubleSide, roughness: 1 }))
    screenPlane.rotation.y = Math.PI / 2
    screenPlane.position.set(XSCREEN, BEAM_Y, 0)
    scene.add(screenPlane)

    const MAX_HITS = 600
    const hitPos = new Float32Array(MAX_HITS * 3)
    const hitCol = new Float32Array(MAX_HITS * 3)
    const hitGeo = new THREE.BufferGeometry()
    hitGeo.setAttribute('position', new THREE.BufferAttribute(hitPos, 3))
    hitGeo.setAttribute('color', new THREE.BufferAttribute(hitCol, 3))
    hitGeo.setDrawRange(0, 0)
    const hitPts = new THREE.Points(hitGeo, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }))
    scene.add(hitPts)
    let hitCount = 0
    function addHit(y: number, z: number, up: boolean) {
      if (hitCount >= MAX_HITS) hitCount = 0
      const i = hitCount * 3
      hitPos[i] = XSCREEN - 0.03
      hitPos[i + 1] = BEAM_Y + y
      hitPos[i + 2] = z
      const c = up ? theme.accent : theme.accent2
      hitCol[i] = c.r; hitCol[i + 1] = c.g; hitCol[i + 2] = c.b
      hitCount++
      ;(hitGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
      ;(hitGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true
      hitGeo.setDrawRange(0, hitCount)
    }

    // A small pool of travelling atoms, reused every loop — never allocated per frame.
    const atomGeo = new THREE.SphereGeometry(0.07, 8, 6)
    const atoms = Array.from({ length: N_ATOMS }, (_, i) => {
      const up = i % 2 === 0
      const m = new THREE.Mesh(atomGeo, new THREE.MeshStandardMaterial({ color: up ? theme.accent : theme.accent2 }))
      const z = (((i * 37) % 100) / 100 - 0.5) * 2 * HALF_WIDTH
      const phase = (i / N_ATOMS) * PERIOD
      scene.add(m)
      return { mesh: m, up, z, phase, landed: -1 }
    })

    const gTag = label('', theme.fg.getStyle(), 0.32)
    const sepTag = label('', theme.accent.getStyle(), 0.34)
    gTag.position.set((XM0 + XM1) / 2, BEAM_Y + 0.9, 0)
    sepTag.position.set(XSCREEN, BEAM_Y + 1.1, 0)
    scene.add(gTag, sepTag)
    function setText(spr: THREE.Sprite, txt: string, color: THREE.Color) {
      const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = `600 ${Math.max(16, Math.min(28, Math.floor(320 / Math.max(4, txt.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(txt, 128, 46)
      ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }
    setText(gTag, t('sg.magnet'), theme.fg)

    let lastKey = ''
    let simT = 0
    return (dt) => {
      const G = props.params.G ?? 6
      const v = props.params.v ?? 650
      const sepMM = (21300 * G) / v ** 2
      const halfY = Math.min(1.0, (sepMM * WORLD_PER_MM) / 2)

      const key = `${G.toFixed(1)}|${v.toFixed(0)}`
      if (key !== lastKey) {
        lastKey = key
        setText(sepTag, `s = ${fmt(sepMM, 3)} mm`, theme.accent)
        hitCount = 0
        hitGeo.setDrawRange(0, 0)
      }

      simT += dt
      for (const a of atoms) {
        const u = ((simT + a.phase) % PERIOD) / PERIOD
        const sign = a.up ? 1 : -1
        let x: number, y: number
        if (u < 0.45) {
          x = XSRC + (u / 0.45) * (XM1 - XSRC)
          y = BEAM_Y
        } else {
          const f = (u - 0.45) / 0.55
          x = XM1 + f * (XSCREEN - XM1)
          y = BEAM_Y + sign * halfY * f
        }
        a.mesh.position.set(x, y, a.z)
        const justLanded = u < a.landed
        if (justLanded || a.landed < 0) addHit(sign * halfY, a.z, a.up)
        a.landed = u
      }
    }
  },
  { camera: [2, 3.4, 9.5], target: [0, 1.0, 0], fov: 48 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
