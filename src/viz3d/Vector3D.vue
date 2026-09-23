<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// An arrow v = (vx, vy, 0) with its axis components, a dashed rectangle "box" spanning them, its
// length and the angle it makes with the x-axis. Everything lives in the vertical z=0 plane — orbit
// the camera to look at it edge-on and it really is flat, which the 2D picture can't show directly.
// options.mode: 'add' (algebra/vectors) chains vx·x̂ then vy·ŷ tip-to-tail into v; 'split'
// (trig/vector-components) drops both components from the origin, matching the 2D unit circle.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

function setArrow(ah: THREE.ArrowHelper, ox: number, oy: number, dx: number, dy: number) {
  const len = Math.hypot(dx, dy)
  ah.position.set(ox, oy, 0)
  if (len < 1e-4) {
    ah.visible = false
    return
  }
  ah.visible = true
  ah.setDirection(new THREE.Vector3(dx, dy, 0).normalize())
  ah.setLength(Math.max(0.06, len), Math.min(0.28, len * 0.35), Math.min(0.16, len * 0.22))
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(6, theme))
    const split = props.options.mode === 'split'
    const S = split ? 3 : 1 // visual scale only — labels always show the true, unscaled numbers

    const compX = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    const compY = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.pos)
    const vArrow = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.fg)
    scene.add(compX, compY, vArrow)

    const box = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 8 }, () => new THREE.Vector3())),
      new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.12, gapSize: 0.08 }),
    )
    scene.add(box)

    const arc = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 25 }, () => new THREE.Vector3())),
      new THREE.LineBasicMaterial({ color: theme.muted }),
    )
    scene.add(arc)

    const lenTag = label('', theme.fg.getStyle(), 0.55)
    const angTag = label('', theme.muted.getStyle(), 0.4)
    scene.add(lenTag, angTag)

    return () => {
      const theta = ((props.params.theta ?? 15) * Math.PI) / 180
      const vx = split ? Math.cos(theta) : (props.params.vx ?? 2)
      const vy = split ? Math.sin(theta) : (props.params.vy ?? 1)
      const len = Math.hypot(vx, vy)
      const angDeg = (Math.atan2(vy, vx) * 180) / Math.PI
      const angRad = (angDeg * Math.PI) / 180
      const gx = vx * S
      const gy = vy * S

      setArrow(compX, 0, 0, gx, 0)
      setArrow(compY, split ? 0 : gx, 0, 0, gy)
      setArrow(vArrow, 0, 0, gx, gy)

      const bp = box.geometry.attributes.position as THREE.BufferAttribute
      bp.setXYZ(0, 0, 0, 0)
      bp.setXYZ(1, gx, 0, 0)
      bp.setXYZ(2, gx, 0, 0)
      bp.setXYZ(3, gx, gy, 0)
      bp.setXYZ(4, gx, gy, 0)
      bp.setXYZ(5, 0, gy, 0)
      bp.setXYZ(6, 0, gy, 0)
      bp.setXYZ(7, 0, 0, 0)
      bp.needsUpdate = true
      box.computeLineDistances()

      const ap = arc.geometry.attributes.position as THREE.BufferAttribute
      const R = Math.min(1, 0.4 + len * 0.15)
      for (let i = 0; i <= 24; i++) {
        const f = angRad * (i / 24)
        ap.setXYZ(i, Math.cos(f) * R, Math.sin(f) * R, 0)
      }
      ap.needsUpdate = true

      setLabel(lenTag, t('vector3d.length', { n: fmt(len, split ? 4 : 2) }), theme.fg)
      lenTag.position.set(gx / 2, gy / 2 + 0.4, 0.3)
      setLabel(angTag, t('vector3d.angle', { n: fmt(angDeg, 1) }), theme.muted)
      angTag.position.set(Math.cos(angRad / 2) * (R + 0.4), Math.sin(angRad / 2) * (R + 0.4), 0)
    }
  },
  { camera: [1.6, 2.2, 5.2], target: [0.6, 0.8, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
