<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// The unit square carried by [[a,b],[c,d]], with a test vector v (dashed) and its image Mv (solid) —
// the learner turns v with the vx/vy sliders, same numbers as the 2D grid. options.eigen
// (eigenvectors lesson) also draws the two real eigen-directions as dashed lines, highlights v/Mv
// and the line it lands on, and reads the stretch factor off as |Mv|/|v|.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const SQUARE: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]]
const Y = 0.02 // lift off the ground grid to avoid z-fighting

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

function mkDashed(color: THREE.Color) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color, dashSize: 0.2, gapSize: 0.15, transparent: true, opacity: 0.65 }),
  )
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(8, theme))
    const eigenMode = !!props.options.eigen

    const sq = new THREE.BufferGeometry()
    sq.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SQUARE.length * 3), 3))
    sq.setIndex([0, 1, 2, 0, 2, 3])
    const shape = new THREE.Mesh(sq, new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.5, side: THREE.DoubleSide }))
    scene.add(shape)
    const sqEdge = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 4 }, () => new THREE.Vector3())), new THREE.LineBasicMaterial({ color: theme.fg }))
    scene.add(sqEdge)

    const vLine = mkDashed(theme.muted)
    scene.add(vLine)
    const mv = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.fg)
    scene.add(mv)

    const eig1 = mkDashed(theme.pos)
    const eig2 = mkDashed(theme.pos)
    if (eigenMode) scene.add(eig1, eig2)
    const stretchTag = label('', theme.fg.getStyle(), 0.5)
    const eigTag1 = label('', theme.pos.getStyle(), 0.4)
    const eigTag2 = label('', theme.pos.getStyle(), 0.4)
    if (eigenMode) scene.add(stretchTag, eigTag1, eigTag2)

    return () => {
      const a = props.params.a ?? 1
      const b = props.params.b ?? 0
      const c = props.params.c ?? 0
      const d = props.params.d ?? 1
      const vx = props.params.vx ?? 1
      const vy = props.params.vy ?? 1
      const ap = (x: number, y: number): [number, number] => [a * x + b * y, c * x + d * y]

      const pos = sq.attributes.position as THREE.BufferAttribute
      const epos = sqEdge.geometry.attributes.position as THREE.BufferAttribute
      SQUARE.forEach(([x, y], i) => {
        const [wx, wy] = ap(x, y)
        pos.setXYZ(i, wx, Y, wy)
        epos.setXYZ(i, wx, Y, wy)
      })
      pos.needsUpdate = true
      epos.needsUpdate = true
      sq.computeVertexNormals()

      const [mvx, mvy] = ap(vx, vy)
      const vLen = Math.hypot(vx, vy)
      const mvLen = Math.hypot(mvx, mvy)
      const stretch = vLen > 1e-6 ? mvLen / vLen : 0

      const vpos = vLine.geometry.attributes.position as THREE.BufferAttribute
      vpos.setXYZ(0, 0, Y, 0)
      vpos.setXYZ(1, vx, Y, vy)
      vpos.needsUpdate = true
      vLine.computeLineDistances()

      let aligned = false
      if (eigenMode) {
        const tr = a + d
        const det = a * d - b * c
        const disc = tr * tr - 4 * det
        if (disc >= 0) {
          const l1 = (tr + Math.sqrt(disc)) / 2
          const l2 = (tr - Math.sqrt(disc)) / 2
          const evec = (l: number): [number, number] => (Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : Math.abs(a - l) < 1e-9 ? [1, 0] : [0, 1])
          const draw = (line: THREE.Line, ev: [number, number]) => {
            const n = Math.hypot(ev[0], ev[1]) || 1
            const ex = ev[0] / n
            const ey = ev[1] / n
            const p = line.geometry.attributes.position as THREE.BufferAttribute
            p.setXYZ(0, -ex * 8, Y, -ey * 8)
            p.setXYZ(1, ex * 8, Y, ey * 8)
            p.needsUpdate = true
            line.computeLineDistances()
            return Math.abs((vx * ex + vy * ey) / (vLen || 1)) > 0.985
          }
          const p1 = evec(l1)
          const p2 = evec(l2)
          aligned = draw(eig1, p1) || draw(eig2, p2)
          eig1.visible = eig2.visible = true
          const n1 = Math.hypot(p1[0], p1[1]) || 1
          const n2 = Math.hypot(p2[0], p2[1]) || 1
          setLabel(eigTag1, t('matrix3d.eigen', { n: fmt(l1, 2) }), theme.pos)
          setLabel(eigTag2, t('matrix3d.eigen', { n: fmt(l2, 2) }), theme.pos)
          eigTag1.position.set((p1[0] / n1) * 3, Y + 0.4, (p1[1] / n1) * 3)
          eigTag2.position.set((p2[0] / n2) * 3, Y + 0.4, (p2[1] / n2) * 3)
        } else {
          eig1.visible = eig2.visible = false
          setLabel(eigTag1, t('matrix.complexEig'), theme.muted)
          eigTag1.position.set(0, Y + 0.6, 0)
          setLabel(eigTag2, '', theme.muted)
        }
        setLabel(stretchTag, t('matrix3d.stretch', { n: fmt(stretch, 2) }), aligned ? theme.pos : theme.fg)
        stretchTag.position.set(mvx, Y + 0.5, mvy)
      }

      mv.position.set(0, Y, 0)
      if (mvLen > 1e-4) {
        mv.visible = true
        mv.setDirection(new THREE.Vector3(mvx, 0, mvy).normalize())
        mv.setLength(Math.max(0.1, mvLen), Math.min(0.3, mvLen * 0.3), Math.min(0.18, mvLen * 0.2))
      } else mv.visible = false
      mv.setColor(aligned ? theme.pos : theme.fg)
    }
  },
  { camera: [3.4, 3, 4.8], target: [0.5, 0, 0.5] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
