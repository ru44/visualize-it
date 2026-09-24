<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label, type Theme } from './useThree'
import { t } from '../i18n'

// options.mode picks the physics; default (no mode) is the original three-quarks-in-a-shell scene,
// untouched — quarks-and-protons: positive quarks glow like theme.pos, negative ones like theme.neg, and
// the shell's wireframe picks up whichever sign the total charge lands on. Only a 3D shell can show three
// quarks actually sharing one confined volume.
// 'confinement' reuses the same engine for a different lesson: two quarks pulled apart by «separation d»;
// the gluon string between them stretches, then — past the same 1.2 fm breaking point
// src/viz/QuarkBuilder.vue's pull mode uses (energy = d·1.0 GeV > 1.2) — snaps into a second quark pair,
// so you are always left holding two particles, never a lone quark.                — quark-confinement
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const mode = props.options?.mode ?? 'default'
const P = (k: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

const Q = [
  { charge: 2 / 3, mass: 2.2 },
  { charge: -1 / 3, mass: 4.7 },
  { charge: -1 / 3, mass: 95 },
]
const BASE = [0, 1, 2].map((i) => {
  const a = (i / 3) * Math.PI * 2 - Math.PI / 2
  return new THREE.Vector3(0.5 * Math.cos(a), 0.15 * (i - 1), 0.5 * Math.sin(a))
})
// per-quark jiggle phases/frequencies, fixed so motion is deterministic and needs no per-frame randomness
const JIG = [0, 1, 2].map((i) => ({ fx: 1.3 + i * 0.3, fy: 1.7 + i * 0.2, fz: 1.1 + i * 0.4, px: i * 2.1, py: i * 1.3, pz: i * 0.7 }))

function setupDefault(scene: THREE.Scene, theme: Theme) {
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1.3, 32, 24), new THREE.MeshPhysicalMaterial({ color: theme.sunken, transparent: true, opacity: 0.16, roughness: 0.3, transmission: 0.4, side: THREE.DoubleSide }))
  scene.add(shell)
  const edge = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.3, 16, 10)), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.5 }))
  scene.add(edge)

  const quarks = [0, 1, 2].map(() => new THREE.Mesh(new THREE.SphereGeometry(0.2, 22, 16), new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.35 })))
  quarks.forEach((m) => scene.add(m))
  scene.add(new THREE.PointLight(0xffffff, 30, 0, 1.4))

  const linkGeo = [0, 1, 2].map(() => new THREE.BufferGeometry())
  const linkMat = new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.06, gapSize: 0.05, transparent: true, opacity: 0.6 })
  const links = linkGeo.map((g) => new THREE.Line(g, linkMat))
  links.forEach((l) => scene.add(l))

  let picks = [0, 1, 2]
  const applyPicks = () => {
    picks = ['q1', 'q2', 'q3'].map((k, i) => Math.max(0, Math.min(2, Math.round(props.params[k] ?? [0, 0, 1][i]))))
    let total = 0
    for (let i = 0; i < 3; i++) {
      const q = Q[picks[i]]
      total += q.charge
      const mat = quarks[i].material as THREE.MeshStandardMaterial
      mat.color.copy(q.charge > 0 ? theme.pos : theme.neg)
      quarks[i].scale.setScalar(0.7 + 0.06 * Math.cbrt(q.mass))
    }
    const edgeMat = edge.material as THREE.LineBasicMaterial
    edgeMat.color.copy(total > 0.4 ? theme.pos : total < -0.4 ? theme.neg : theme.muted)
  }
  applyPicks()
  watch(() => [props.params.q1, props.params.q2, props.params.q3], applyPicks)

  const tmp = new THREE.Vector3()
  return (dt: number, time: number) => {
    shell.rotation.y += dt * 0.08
    edge.rotation.y = shell.rotation.y
    for (let i = 0; i < 3; i++) {
      const j = JIG[i]
      tmp.set(BASE[i].x + 0.16 * Math.sin(time * j.fx + j.px), BASE[i].y + 0.16 * Math.sin(time * j.fy + j.py), BASE[i].z + 0.16 * Math.sin(time * j.fz + j.pz))
      if (tmp.length() > 1.1) tmp.setLength(1.1)
      quarks[i].position.copy(tmp)
    }
    for (let i = 0; i < 3; i++) {
      links[i].geometry.setFromPoints([quarks[i].position, quarks[(i + 1) % 3].position])
      links[i].computeLineDistances()
    }
  }
}

function setupConfinement(scene: THREE.Scene, theme: Theme) {
  const BREAK = 1.2 // fm — same snapping distance as QuarkBuilder.vue's pull mode (energy = d·1.0 GeV)
  const SCALE = 1.3 // scene units per fm
  const GAP = 0.5
  const mkQuark = (color: THREE.Color) => new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 14), new THREE.MeshStandardMaterial({ color, roughness: 0.4 }))
  const qA = mkQuark(theme.pos) // the original quark
  const qB = mkQuark(theme.neg) // the original antiquark
  const nA = mkQuark(theme.neg) // new antiquark, appears paired with qA once the string snaps
  const nB = mkQuark(theme.pos) // new quark, appears paired with qB once the string snaps
  scene.add(qA, qB, nA, nB)
  nA.visible = false
  nB.visible = false
  scene.add(new THREE.PointLight(0xffffff, 26, 0, 1.4))

  const mkString = () => new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 8), new THREE.MeshStandardMaterial({ color: theme.accent2, metalness: 0.3, roughness: 0.5 }))
  const strA = mkString()
  const strB = mkString()
  scene.add(strA, strB)
  strB.visible = false

  const tagD = label('', theme.accent.getStyle(), 0.34)
  tagD.position.set(0, 1.35, 0)
  scene.add(tagD)
  const tagState = label('', theme.pos.getStyle(), 0.38)
  tagState.position.set(0, 1.75, 0)
  scene.add(tagState)

  const up = new THREE.Vector3(0, 1, 0)
  const mid = new THREE.Vector3()
  const diff = new THREE.Vector3()
  const link = (mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) => {
    mid.copy(a).add(b).multiplyScalar(0.5)
    mesh.position.copy(mid)
    const dist = a.distanceTo(b)
    mesh.scale.set(1, Math.max(0.001, dist), 1)
    if (dist > 1e-4) mesh.quaternion.setFromUnitVectors(up, diff.copy(b).sub(a).normalize())
  }

  return () => {
    const d = THREE.MathUtils.clamp(P('d', 0.5), 0.05, 2)
    const energy = d * 1.0 // GeV, same string tension as QuarkBuilder.vue
    const snapped = energy > BREAK
    const half = (SCALE * Math.min(d, BREAK)) / 2
    const liveHalf = (SCALE * d) / 2

    if (!snapped) {
      qA.position.set(-liveHalf, 0, 0)
      qB.position.set(liveHalf, 0, 0)
      link(strA, qA.position, qB.position)
      strB.visible = false
      nA.visible = false
      nB.visible = false
    } else {
      qA.position.set(-half, 0, 0)
      nA.position.set(-half + GAP, 0, 0)
      qB.position.set(liveHalf, 0, 0)
      nB.position.set(liveHalf - GAP, 0, 0)
      nA.visible = true
      nB.visible = true
      strB.visible = true
      link(strA, qA.position, nA.position)
      link(strB, nB.position, qB.position)
    }
    setLabel(tagD, `d = ${d.toFixed(2)} fm`, theme.accent)
    setLabel(tagState, snapped ? t('proton3d.snapped') : t('proton3d.bound'), snapped ? theme.neg : theme.pos)
  }
}

useThree(
  el,
  ({ scene, theme }) => (mode === 'confinement' ? setupConfinement(scene, theme) : setupDefault(scene, theme)),
  mode === 'confinement' ? { camera: [0, 1, 6.2], target: [0, 0, 0], fov: 45 } : { camera: [0, 1.6, 4.2], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
