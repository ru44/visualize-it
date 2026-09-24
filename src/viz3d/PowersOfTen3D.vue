<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// Same landmark list and "nearest" rule as PowersOfTen.vue (2D), so the icon and 10^e value always
// agree with the ruler. The trick: three wireframe boxes at exact 1:10:100 ratio sit nested around the
// origin, and the whole group is scaled by 1/box-size every frame, so the "current" box always looks
// the same size on screen while the box ten times smaller/larger really does look ten times off — a
// continuous zoom a flat ruler can't give.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

type Shape = 'particle' | 'thread' | 'figure' | 'block' | 'peak' | 'planet' | 'orbit' | 'stars'
const ITEMS: { id: string; e: number; shape: Shape }[] = [
  { id: 'proton', e: -15, shape: 'particle' }, { id: 'atom', e: -10, shape: 'particle' },
  { id: 'dna', e: -8.7, shape: 'thread' }, { id: 'bacterium', e: -6, shape: 'particle' },
  { id: 'hair', e: -4, shape: 'thread' }, { id: 'ant', e: -2.5, shape: 'thread' },
  { id: 'child', e: 0.1, shape: 'figure' }, { id: 'field', e: 2, shape: 'block' },
  { id: 'everest', e: 3.95, shape: 'peak' }, { id: 'earth', e: 7.1, shape: 'planet' },
  { id: 'sun', e: 9.14, shape: 'planet' }, { id: 'earthSun', e: 11.18, shape: 'orbit' },
  { id: 'lightYear', e: 15.98, shape: 'stars' }, { id: 'galaxy', e: 21, shape: 'stars' },
  { id: 'universe', e: 26.9, shape: 'stars' },
]
const MIN = -15
const MAX = 27
const nearest = (e: number) => [...ITEMS].sort((a, b) => Math.abs(a.e - e) - Math.abs(b.e - e))[0]

function shapeFor(kind: Shape, color: THREE.Color): THREE.Object3D {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.55 })
  if (kind === 'particle') return new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), mat)
  if (kind === 'thread') return new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), mat)
  if (kind === 'figure') {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.4, 4, 8), mat))
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), mat)
    head.position.y = 0.5
    g.add(head)
    return g
  }
  if (kind === 'block') return new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), mat)
  if (kind === 'peak') return new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.9, 5), mat)
  if (kind === 'planet') return new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16), mat)
  if (kind === 'orbit') {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), mat))
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.015, 6, 40), mat)
    ring.rotation.x = Math.PI / 2.2
    g.add(ring)
    return g
  }
  const n = 60
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const r = 0.5 * Math.cbrt(Math.random())
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    p[i * 3] = r * Math.sin(ph) * Math.cos(th)
    p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
    p[i * 3 + 2] = r * Math.cos(ph)
  }
  return new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3)), new THREE.PointsMaterial({ color, size: 0.05 }))
}

function setText(spr: THREE.Sprite, text: string) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = spr.userData.color
  cx.textAlign = 'center'
  let size = 30
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
    scene.background = new THREE.Color(0x05070d)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.9))
    const sun = new THREE.DirectionalLight(0xffffff, 1.2)
    sun.position.set(4, 6, 5)
    scene.add(sun)

    const n = 400
    const sp = new Float32Array(n * 3)
    for (let i = 0; i < sp.length; i++) sp[i] = (Math.random() - 0.5) * 60
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(sp, 3)), new THREE.PointsMaterial({ color: theme.fg, size: 0.05, transparent: true, opacity: 0.5 })))

    const world = new THREE.Group()
    scene.add(world)
    const REF = 2
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1)
    const mkCube = (color: THREE.Color, op: number) => new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }))
    const prevCube = mkCube(theme.muted, 0.5)
    const curCube = mkCube(theme.accent, 0.9)
    const nextCube = mkCube(theme.muted, 0.22)
    world.add(prevCube, curCube, nextCube)

    const colors: Record<Shape, THREE.Color> = { particle: theme.muted, thread: theme.muted, figure: theme.accent, block: theme.accent2, peak: theme.accent2, planet: theme.pos, orbit: theme.pos, stars: theme.fg }
    let curObj: THREE.Object3D | null = null
    let curShape: Shape | null = null

    const nameLabel = label('', '#fff', 0.55)
    nameLabel.userData.color = '#' + theme.fg.getHexString()
    nameLabel.position.set(0, 1.7, 0)
    scene.add(nameLabel)
    const caption = label('', '#fff', 0.32)
    caption.userData.color = '#' + theme.muted.getHexString()
    setText(caption, t('p10.rule'))
    caption.position.set(0, -1.7, 0)
    scene.add(caption)

    return () => {
      const e = Math.max(MIN, Math.min(MAX, props.params.e ?? 0))
      const frac = e - Math.floor(e)
      const cur = REF * Math.pow(10, frac)
      curCube.scale.setScalar(cur)
      prevCube.scale.setScalar(cur / 10)
      nextCube.scale.setScalar(cur * 10)
      world.scale.setScalar(REF / cur)

      const near = nearest(e)
      if (near.shape !== curShape) {
        curShape = near.shape
        if (curObj) {
          world.remove(curObj)
          curObj.traverse((o: any) => {
            o.geometry?.dispose?.()
            o.material?.dispose?.()
          })
        }
        curObj = shapeFor(near.shape, colors[near.shape])
        world.add(curObj)
      }
      if (curObj) curObj.scale.setScalar(cur * 0.35)
      setText(nameLabel, `${t(`p10.size.${near.id}` as any)} · 10^${e.toFixed(1)}`)
    }
  },
  { camera: [3.4, 2.4, 4.4], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
