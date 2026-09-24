<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// The 3D generalisation of HilbertCurve.vue's flat curve: a single path visiting every cell of a
// side×side×side cube exactly once, unit step at a time, drawn progressively by the same "t" (0..1)
// the 2D picture uses. Cell count grows as 8^order, so order is capped at 3 here (512 cells) even
// though the shared slider goes to 5 — order 4 or 5 would be an unreadable tangle in 3D.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const CUBE = 6
const MAX_ORDER = 3
const MAX_CELLS = 8 ** MAX_ORDER
const LIFT = CUBE / 2 + 0.4

// Recursive 3D Hilbert curve: returns 8^order unit-step cell centres, in visiting order, filling a
// side×side×side cube. Standard box-halving construction (verified separately: unit steps, no dupes).
function hilbert3D(x0: number, y0: number, z0: number, xi: number, xj: number, xk: number, yi: number, yj: number, yk: number, zi: number, zj: number, zk: number, order: number, pts: number[]) {
  if (order <= 0) {
    pts.push(x0 + (xi + yi + zi) / 2, y0 + (xj + yj + zj) / 2, z0 + (xk + yk + zk) / 2)
    return
  }
  const h = (x0: number, y0: number, z0: number, xi: number, xj: number, xk: number, yi: number, yj: number, yk: number, zi: number, zj: number, zk: number) => hilbert3D(x0, y0, z0, xi, xj, xk, yi, yj, yk, zi, zj, zk, order - 1, pts)
  h(x0, y0, z0, yi / 2, yj / 2, yk / 2, zi / 2, zj / 2, zk / 2, xi / 2, xj / 2, xk / 2)
  h(x0 + xi / 2, y0 + xj / 2, z0 + xk / 2, zi / 2, zj / 2, zk / 2, xi / 2, xj / 2, xk / 2, yi / 2, yj / 2, yk / 2)
  h(x0 + xi / 2 + yi / 2, y0 + xj / 2 + yj / 2, z0 + xk / 2 + yk / 2, zi / 2, zj / 2, zk / 2, xi / 2, xj / 2, xk / 2, yi / 2, yj / 2, yk / 2)
  h(x0 + xi / 2 + yi, y0 + xj / 2 + yj, z0 + xk / 2 + yk, -xi / 2, -xj / 2, -xk / 2, -yi / 2, -yj / 2, -yk / 2, zi / 2, zj / 2, zk / 2)
  h(x0 + xi / 2 + yi + zi / 2, y0 + xj / 2 + yj + zj / 2, z0 + xk / 2 + yk + zk / 2, -xi / 2, -xj / 2, -xk / 2, -yi / 2, -yj / 2, -yk / 2, zi / 2, zj / 2, zk / 2)
  h(x0 + xi / 2 + yi + zi, y0 + xj / 2 + yj + zj, z0 + xk / 2 + yk + zk, -zi / 2, -zj / 2, -zk / 2, xi / 2, xj / 2, xk / 2, -yi / 2, -yj / 2, -yk / 2)
  h(x0 + xi / 2 + yi / 2 + zi, y0 + xj / 2 + yj / 2 + zj, z0 + xk / 2 + yk / 2 + zk, -zi / 2, -zj / 2, -zk / 2, xi / 2, xj / 2, xk / 2, -yi / 2, -yj / 2, -yk / 2)
  h(x0 + xi / 2 + zi, y0 + xj / 2 + zj, z0 + xk / 2 + zk, yi / 2, yj / 2, yk / 2, -zi / 2, -zj / 2, -zk / 2, -xi / 2, -xj / 2, -xk / 2)
}

function setText(spr: THREE.Sprite, text: string) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = spr.userData.color
  cx.textAlign = 'center'
  let size = 28
  cx.font = `500 ${size}px Inter, sans-serif`
  while (size > 12 && cx.measureText(text).width > img.width - 20) {
    size -= 1
    cx.font = `500 ${size}px Inter, sans-serif`
  }
  cx.fillText(text, 128, 40)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(10, theme))
    const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)), new THREE.LineBasicMaterial({ color: theme.line }))
    box.position.y = LIFT
    scene.add(box)

    const posAttr = new THREE.BufferAttribute(new Float32Array(MAX_CELLS * 3), 3)
    const colAttr = new THREE.BufferAttribute(new Float32Array(MAX_CELLS * 3), 3)
    const dotsGeo = new THREE.BufferGeometry()
    dotsGeo.setAttribute('position', posAttr)
    const dots = new THREE.Points(dotsGeo, new THREE.PointsMaterial({ color: theme.muted, size: 0.06, transparent: true, opacity: 0.5 }))
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', posAttr)
    lineGeo.setAttribute('color', colAttr)
    const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 2 }))
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent2 }))
    scene.add(dots, line, tip)

    const gridLabel = label('', '#fff', 0.42)
    gridLabel.userData.color = '#' + theme.fg.getHexString()
    gridLabel.position.set(0, CUBE + 1.1, 0)
    const stepLabel = label('', '#fff', 0.36)
    stepLabel.userData.color = '#' + theme.accent2.getHexString()
    stepLabel.position.set(0, CUBE + 0.5, 0)
    scene.add(gridLabel, stepLabel)

    const lo = new THREE.Color(theme.accent)
    const hi = new THREE.Color(theme.accent2)
    let lastOrder = -1
    let cellCount = 0

    return () => {
      const orderReq = Math.max(1, Math.min(5, Math.round(props.params.order ?? 3)))
      const order = Math.min(MAX_ORDER, orderReq)
      if (order !== lastOrder) {
        lastOrder = order
        const side = 2 ** order
        const pts: number[] = []
        hilbert3D(0, 0, 0, side, 0, 0, 0, side, 0, 0, 0, side, order, pts)
        cellCount = pts.length / 3
        const scale = CUBE / side
        for (let i = 0; i < cellCount; i++) {
          const x = (pts[i * 3] - side / 2) * scale
          const y = (pts[i * 3 + 1] - side / 2) * scale + LIFT
          const z = (pts[i * 3 + 2] - side / 2) * scale
          posAttr.setXYZ(i, x, y, z)
          const c = lo.clone().lerp(hi, i / (cellCount - 1))
          colAttr.setXYZ(i, c.r, c.g, c.b)
        }
        posAttr.needsUpdate = true
        colAttr.needsUpdate = true
        dotsGeo.setDrawRange(0, cellCount)
        dotsGeo.computeBoundingSphere()
        lineGeo.computeBoundingSphere()
        setText(gridLabel, orderReq > MAX_ORDER ? t('viz3d.hilbert3d.clamped', { n: side }) : `${t('hilbert.grid')}: ${side}×${side}×${side}`)
      }
      const frac = Math.max(0, Math.min(1, props.params.t ?? 0))
      const idx = Math.max(0, Math.round(frac * (cellCount - 1)))
      lineGeo.setDrawRange(0, idx + 1)
      tip.position.set(posAttr.getX(idx), posAttr.getY(idx), posAttr.getZ(idx))
      setText(stepLabel, `${t('hilbert.step')}: ${idx} / ${cellCount - 1}`)
    }
  },
  { camera: [9, 8, 10], target: [0, LIFT, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
