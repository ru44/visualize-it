<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Cantilever fixed at a wall (x=0), loaded at the free end — the exact same y(x) = Fx²(3L−x)/6EI as
// the 2D chart, with the same unit conversions and the same [0,300] mm display range from its
// options, so a slider gives the same number in both views. The deflection is exaggerated ×EXAG so
// millimetres read as a visible droop (stated on screen, never hidden). M(x) = F(L−x) never changes
// sign along a single-load cantilever, so the whole top face is tinted for tension and the whole
// bottom for compression, fading to neutral at the free end where the moment is zero — the beam's
// full 3D stress state, which the flat curve only implies.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const EXAG = 8
const MAX_MM = 300 // matches this lesson's 2D chart range option, so extreme sliders clip identically

function yAtMm(xm: number, L: number, F: number, E: number, I: number) {
  if (xm > L) return 0
  return ((F * xm * xm * (3 * L - xm)) / (6 * E * 1e9 * I * 1e-8)) * 1000
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(16, Math.min(34, Math.floor(360 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const N = 28
    const geo = new THREE.BoxGeometry(1, 1, 0.4, N, 1, 1)
    geo.translate(0.5, 0, 0) // local x now runs 0..1 along the beam's length fraction
    const pos = geo.attributes.position as THREE.BufferAttribute
    const fracX = new Float32Array(pos.count)
    const signY = new Float32Array(pos.count)
    const colors = new Float32Array(pos.count * 3)
    const neutral = new THREE.Color(theme.muted)
    const tension = new THREE.Color(theme.pos)
    const compression = new THREE.Color(theme.neg)
    for (let i = 0; i < pos.count; i++) {
      fracX[i] = pos.getX(i)
      signY[i] = pos.getY(i) >= 0 ? 1 : -1
      const intensity = 1 - fracX[i] // |M(x)| / M(0): maximum at the wall, zero at the free tip
      const c = neutral.clone().lerp(signY[i] > 0 ? tension : compression, 0.75 * intensity)
      colors.set([c.r, c.g, c.b], i * 3)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const beam = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }))
    beam.castShadow = true
    scene.add(beam)

    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 1.1), new THREE.MeshStandardMaterial({ color: theme.line, roughness: 0.9 }))
    wall.position.set(-0.15, 0, 0)
    scene.add(wall)

    const loadArrow = arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 1, theme.neg)
    scene.add(loadArrow)

    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), new THREE.MeshStandardMaterial({ color: theme.fg }))
    scene.add(marker)

    const tipTag = label('', theme.fg.getStyle(), 0.32)
    const atTag = label('', theme.accent2.getStyle(), 0.3)
    const exagTag = label('', theme.muted.getStyle(), 0.28)
    setLabel(exagTag, t('beam3d.exaggerated', { n: EXAG }), theme.muted)
    exagTag.position.set(-0.15, 1.05, 0.6)
    scene.add(tipTag, atTag, exagTag)

    let lastSig = ''
    return () => {
      const F = Math.max(0, props.params.F ?? 1000)
      const L = Math.max(0.2, props.params.L ?? 2)
      const E = Math.max(1, props.params.E ?? 200)
      const I = Math.max(0.1, props.params.I ?? 20)
      const xIn = Math.max(0, props.params.x ?? 2)

      const sig = `${F}|${L}|${E}|${I}`
      if (sig !== lastSig) {
        lastSig = sig
        beam.scale.x = L
        const crossH = THREE.MathUtils.clamp(0.12 + 0.3 * Math.cbrt(I / 200), 0.12, 0.42)
        for (let i = 0; i < pos.count; i++) {
          const mm = THREE.MathUtils.clamp(yAtMm(fracX[i] * L, L, F, E, I), 0, MAX_MM)
          pos.setY(i, signY[i] * (crossH / 2) - (EXAG * mm) / 1000)
        }
        pos.needsUpdate = true
        geo.computeVertexNormals()

        const tipMm = THREE.MathUtils.clamp(yAtMm(L, L, F, E, I), 0, MAX_MM)
        const tipY = -(EXAG * tipMm) / 1000
        setLabel(tipTag, t('beam3d.tip', { n: fmt(tipMm, 1) }), theme.fg)
        tipTag.position.set(L, tipY + 0.55, -0.65)

        const len = Math.min(1.6, 0.25 + F / 2500)
        loadArrow.setLength(len, 0.3, 0.18)
        loadArrow.position.set(L, tipY + len + 0.05, 0)
      }

      const mm = THREE.MathUtils.clamp(yAtMm(xIn, L, F, E, I), 0, MAX_MM)
      const y = -(EXAG * mm) / 1000
      marker.position.set(xIn, y, 0)
      setLabel(atTag, t('beam3d.at', { n: fmt(mm, 1) }), theme.accent2)
      atTag.position.set(xIn, y + 0.35, 0.45)
    }
  },
  { camera: [4, 2.6, 5], target: [1.2, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
