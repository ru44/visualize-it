import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { Theme } from '../useThree'
import { isRtl, locale } from '../../i18n'

// Pieces of a small town shared by the networking scenes: phones, cell towers, houses and labels.
// Canvas textures are pushed into `keep` so the scene can dispose of them when it unmounts.

export const FONT = 'Inter, "IBM Plex Sans Arabic", system-ui, sans-serif'
export const hex = (c: THREE.Color) => '#' + c.getHexString()

export function canvasTexture(w: number, h: number, keep: THREE.Texture[]) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  keep.push(tex)
  return { c, g: c.getContext('2d')!, tex }
}

/**
 * A label that always faces the camera, on a soft plate so it reads over the ground grid. Its size is
 * fixed on screen (height is a share of the view), so a far tower reads as well as a near phone.
 * `side` pins the plate's left or right edge to the label's position, so a label beside something near
 * the edge of the view grows towards the middle instead of off the screen.
 */
export function makeTag(height: number, keep: THREE.Texture[], side: 'center' | 'left' | 'right' = 'center') {
  const { c, g, tex } = canvasTexture(1024, 112, keep)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, sizeAttenuation: false }))
  sprite.scale.set((height * c.width) / c.height, height, 1)
  sprite.center.set(side === 'left' ? 0 : side === 'right' ? 1 : 0.5, 0.5)
  sprite.renderOrder = 10
  let last = ''
  function paint(text: string, color: THREE.Color, plate: THREE.Color) {
    const key = `${text}|${hex(color)}|${hex(plate)}|${locale.value}`
    if (key === last) return
    last = key
    g.clearRect(0, 0, c.width, c.height)
    if (text) {
      g.font = `600 56px ${FONT}`
      g.direction = isRtl() ? 'rtl' : 'ltr'
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      const w = Math.min(c.width - 8, g.measureText(text).width + 52)
      const x0 = side === 'left' ? 4 : side === 'right' ? c.width - 4 - w : (c.width - w) / 2
      g.globalAlpha = 0.9
      g.fillStyle = hex(plate)
      g.beginPath()
      g.roundRect(x0, 10, w, c.height - 20, 26)
      g.fill()
      g.globalAlpha = 1
      g.fillStyle = hex(color)
      g.fillText(text, x0 + w / 2, c.height / 2 + 2, w - 40)
    }
    tex.needsUpdate = true
  }
  return { sprite, paint }
}

/** A phone standing in a little dock, its screen a canvas `px` pixels wide that the scene paints. */
export function makePhone(w: number, h: number, theme: Theme, px: number, keep: THREE.Texture[]) {
  const group = new THREE.Group()
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.18, 4, 0.08), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.45 }))
  body.castShadow = true
  group.add(body)
  const sw = w * 0.88
  const sh = h * 0.9
  const screen = canvasTexture(px, Math.round((px * sh) / sw), keep)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshBasicMaterial({ map: screen.tex, toneMapped: false }))
  face.position.z = 0.092
  group.add(face)
  const dock = new THREE.Mesh(new THREE.BoxGeometry(w * 0.8, 0.22, 0.7), new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.8 }))
  dock.position.set(0, -h / 2 - 0.13, -0.05)
  dock.castShadow = dock.receiveShadow = true
  group.add(dock)
  return { group, screen }
}

/** A lattice mast with three antenna panels near the top; the panels sit at height − 0.75. */
export function makeTower(height: number, theme: Theme) {
  const group = new THREE.Group()
  // a four-legged lattice mast: the wireframe of an open, tapered square prism draws its legs, rungs and braces
  const lattice = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.55, height, 4, 7, true), new THREE.MeshBasicMaterial({ color: theme.muted, wireframe: true }))
  lattice.position.y = height / 2
  lattice.rotation.y = Math.PI / 4
  group.add(lattice)
  // three antenna panels, one per 120° sector
  for (let i = 0; i < 3; i++) {
    const a = (i * 2 * Math.PI) / 3 + 0.5
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1, 0.1), new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.6 }))
    panel.position.set(Math.sin(a) * 0.3, height - 0.75, Math.cos(a) * 0.3)
    panel.rotation.y = a
    panel.castShadow = true
    group.add(panel)
  }
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), new THREE.MeshBasicMaterial({ color: theme.neg }))
  beacon.position.y = height + 0.1
  group.add(beacon)
  const footing = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.4), new THREE.MeshStandardMaterial({ color: theme.line, roughness: 1 }))
  footing.position.y = 0.06
  footing.receiveShadow = true
  group.add(footing)
  return group
}

export function makeHouse(theme: Theme, w: number, d: number, h: number) {
  const group = new THREE.Group()
  const walls = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.9 }))
  walls.position.y = h / 2
  walls.castShadow = walls.receiveShadow = true
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(w, d) / 2 + 0.1, h * 0.6, 4), new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.9 }))
  roof.position.y = h + h * 0.3
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  group.add(walls, roof)
  return group
}

/** Every material under obj fades together, to dim the places that take no part. */
export function fader(obj: THREE.Object3D) {
  const mats: THREE.Material[] = []
  obj.traverse((o: any) => {
    if (o.material) ((o.material.transparent = true), mats.push(o.material))
  })
  let cur = -1
  return (o: number) => {
    if (o === cur) return
    cur = o
    mats.forEach((m) => (m.opacity = o))
  }
}
