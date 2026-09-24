<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// A wave packet, not the 2D picture's static cross-section: it travels in from the source, meets the
// barrier wall, and splits — most of it bounces back, a small part reappears beyond the wall. Same
// κ = K0·√(V-1), T ≈ e^(-2κw) as the 2D lesson (K0 = 12, the same constant WaveFunction.vue uses).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const XMAX = 8.5
const B0 = 3.2
const K0 = 12
const SIGMA = 0.45
const KWAVE = 9
const PERIOD = 6
const NX = 140

useThree(
  el,
  ({ scene, theme }) => {
    const ribbonGeo = new THREE.PlaneGeometry(XMAX, 1.3, NX, 1)
    ribbonGeo.rotateX(-Math.PI / 2)
    ribbonGeo.translate(XMAX / 2, 0, 0)
    const ribbon = new THREE.Mesh(ribbonGeo, new THREE.MeshStandardMaterial({ color: theme.accent, side: THREE.DoubleSide, roughness: 0.55 }))
    ribbon.castShadow = true
    scene.add(ribbon)
    const posAttr = ribbonGeo.attributes.position as THREE.BufferAttribute

    const baseline = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(XMAX, 0, 0)]), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.5 }))
    scene.add(baseline)

    const source = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), new THREE.MeshStandardMaterial({ color: theme.fg }))
    source.position.set(0, 0, 0)
    scene.add(source)

    // Barrier wall: a unit cube scaled to height ∝ V and width ∝ w, so its shape tracks both sliders.
    const wallMat = new THREE.MeshStandardMaterial({ color: theme.neg, transparent: true, opacity: 0.3 })
    const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), wallMat)
    const wallOutline = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: theme.neg }))
    const barrierGroup = new THREE.Group()
    barrierGroup.add(wallMesh, wallOutline)
    scene.add(barrierGroup)

    const wallTag = label('', theme.neg.getStyle(), 0.34)
    const escTag = label('', theme.accent2.getStyle(), 0.36)
    const incTag = label('', theme.fg.getStyle(), 0.3)
    incTag.position.set(0.9, 0.7, 0)
    scene.add(wallTag, escTag, incTag)

    function setText(spr: THREE.Sprite, lines: string[], color: THREE.Color) {
      const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.textAlign = 'center'
      const longest = Math.max(...lines.map((l) => l.length))
      const size = Math.max(15, Math.min(30, Math.floor(300 / Math.max(4, longest))))
      cx.font = `600 ${size}px Inter, sans-serif`
      const y0 = lines.length > 1 ? 28 : 40
      lines.forEach((l, i) => cx.fillText(l, 128, y0 + i * (size + 6)))
      ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }
    setText(incTag, [t('wave.incoming')], theme.fg)

    let lastKey = ''
    // Start already mid-crossing so the split is visible even under reduced motion (dt frozen at 0).
    let simT = PERIOD * 0.53
    let carrierPhase = 0
    return (dt) => {
      const V = props.params.V ?? 2
      const w = props.params.w ?? 0.1
      const kappa = V > 1 ? K0 * Math.sqrt(V - 1) : 0
      const T = V > 1 ? Math.exp(-2 * kappa * w) : 1
      const Wscene = THREE.MathUtils.clamp(w * 6, 0.12, 2.2)

      const key = `${V.toFixed(2)}|${w.toFixed(2)}`
      if (key !== lastKey) {
        lastKey = key
        const height = 0.7 + Math.min(4, V) * 0.55
        barrierGroup.scale.set(Wscene, height, 1.3)
        barrierGroup.position.set(B0 + Wscene / 2, height / 2, 0)
        wallMat.opacity = 0.16 + 0.07 * Math.min(4, V)
        wallTag.position.set(B0 + Wscene / 2, height + 0.55, 0)
        setText(wallTag, [`${t('wave.barrier')} ${fmt(V, 2)}×E`, `${t('wave.width')} ${fmt(w, 2)}`], theme.neg)
        escTag.position.set(XMAX - 0.9, 0.9, 0)
        setText(escTag, [`${t('wave.escaped')} ${fmt(T * 100, T < 0.01 ? 3 : 1)} %`], theme.accent2)
      }

      simT += dt
      carrierPhase += dt * 9
      const u = (simT % PERIOD) / PERIOD
      const R = Math.sqrt(Math.max(0, 1 - T))
      const Tamp = Math.sqrt(T)
      const farEdge = B0 + Wscene
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i)
        let h = 0
        if (u < 0.5) {
          const xi = (u / 0.5) * B0
          const d = x - xi
          h = Math.exp(-(d * d) / (2 * SIGMA * SIGMA)) * Math.cos(KWAVE * d - carrierPhase)
        } else {
          const f = (u - 0.5) / 0.5
          const xr = B0 * (1 - f)
          const xt = farEdge + f * (XMAX - farEdge)
          if (x <= B0 + 0.06) {
            const d = x - xr
            h += R * Math.exp(-(d * d) / (2 * SIGMA * SIGMA)) * Math.cos(KWAVE * d - carrierPhase)
          }
          if (x >= farEdge - 0.06) {
            const d = x - xt
            h += Tamp * Math.exp(-(d * d) / (2 * SIGMA * SIGMA)) * Math.cos(KWAVE * d - carrierPhase)
          }
        }
        posAttr.setY(i, h * 0.9)
      }
      posAttr.needsUpdate = true
      ribbonGeo.computeVertexNormals()
    }
  },
  { camera: [1, 3.2, 10], target: [B0 + 1, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
