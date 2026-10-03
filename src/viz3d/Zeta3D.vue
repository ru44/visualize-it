<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'
import { zetaC } from '../engine/zeta'
import { fmt } from '../engine/math'
import { t } from '../i18n'

// The height |ζ(s)| over the complex plane, s = σ + i·t with σ in −3..5 and t in −4..4. The half
// right of σ = 1 (where the sum 1^-s + 2^-s + … settles) and the half left of it (reached only by
// continuation) are one unbroken surface in two colours, with a single spike at s = 1. The line
// along t = 0 is the curve of the 2D picture, and the ball rides it at the slider's s.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const HMAX = 3
const K = 1.1 // scene height per unit of |ζ|

function sprite(color: string, halo: string, width = 3.6) {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 64
  const tex = new THREE.CanvasTexture(c)
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }))
  s.scale.set(width, width / 8, 1)
  s.renderOrder = 10
  const set = (text: string) => {
    const x = c.getContext('2d')!
    x.clearRect(0, 0, c.width, c.height)
    x.font = '500 34px Inter, "IBM Plex Sans Arabic", sans-serif'
    x.fillStyle = color
    x.strokeStyle = halo
    x.lineWidth = 7
    x.lineJoin = 'round'
    x.textAlign = 'center'
    x.strokeText(text, 256, 44)
    x.fillText(text, 256, 44)
    tex.needsUpdate = true
  }
  return { s, set }
}

useThree(
  el,
  ({ scene, theme }) => {
    const height = (sigma: number, tt: number) => {
      const [re, im] = zetaC(sigma, tt)
      return Math.min(Math.hypot(re, im), HMAX) * K
    }
    const geo = new THREE.PlaneGeometry(8, 8, 96, 96)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const white = new THREE.Color(0xffffff)
    for (let i = 0; i < pos.count; i++) {
      const sigma = pos.getX(i) + 1
      const h = height(sigma, -pos.getZ(i))
      pos.setY(i, h)
      const c = (sigma > 1 ? theme.accent : theme.accent2).clone().lerp(white, 0.5 * (1 - h / (HMAX * K)))
      colors.set([c.r, c.g, c.b], i * 3)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.7 }))
    mesh.castShadow = true
    scene.add(mesh)
    scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.06 })))
    scene.add(new THREE.GridHelper(8, 8, theme.line, theme.grid))

    // the 2D picture's curve, lying on the surface along t = 0
    const slice = Array.from({ length: 241 }, (_, i) => -3 + (8 * i) / 240).map((sigma) => new THREE.Vector3(sigma - 1, height(sigma, 0) + 0.03, 0))
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(slice), new THREE.LineBasicMaterial({ color: theme.fg })))
    // the wall σ = 1 on the floor
    const wall = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.01, -4), new THREE.Vector3(0, 0.01, 4)]), new THREE.LineDashedMaterial({ color: theme.fg, dashSize: 0.2, gapSize: 0.15 }))
    wall.computeLineDistances()
    scene.add(wall)

    const halo = '#' + theme.bg.getHexString()
    const works = sprite('#' + theme.accent.getHexString(), halo)
    works.set(t('zeta.works'))
    works.s.position.set(2.3, 3.9, -4)
    const beyond = sprite('#' + theme.accent2.getHexString(), halo)
    beyond.set(t('zeta.beyond'))
    beyond.s.position.set(-2.3, 3.9, -4)
    scene.add(works.s, beyond.s)

    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 14), new THREE.MeshStandardMaterial({ color: theme.fg }))
    const drop = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ color: theme.fg, dashSize: 0.1, gapSize: 0.08 }))
    const value = sprite('#' + theme.fg.getHexString(), halo, 3)
    scene.add(ball, drop, value.s)

    let last = NaN
    return () => {
      const s = props.params.s ?? 2
      if (s === last) return
      last = s
      const h = height(s, 0)
      ball.position.set(s - 1, h, 0)
      drop.geometry.setFromPoints([ball.position, new THREE.Vector3(s - 1, 0, 0)])
      drop.computeLineDistances()
      value.s.position.set(s - 1, h + 0.7, 0)
      value.set(Math.abs(s - 1) < 1e-9 ? t('zeta.none') : `ζ(${fmt(s, 2)}) = ${fmt(zetaC(s, 0)[0], 4)}`)
    }
  },
  { camera: [5.5, 7, 10.5], target: [0, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
