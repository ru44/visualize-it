<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same critical-angle test as src/viz/RayOptics.vue's 'refraction' mode (theta_c = asin(n2/n1), TIR
// when n1 sin(theta1) > n2) — content/lessons/waves/total-internal-reflection. The flat 2D picture
// only ever shows one bounce off a straight boundary; this scene bounces a beam many times down a
// BENT tube, all at the same incidence angle theta1, and shows it escaping the moment that angle
// stops clearing the critical angle — a real fibre's whole reason to exist.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const R = 0.32 // fibre radius
const CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-4.2, -1, 0),
  new THREE.Vector3(-2, 0.9, 0.5),
  new THREE.Vector3(0, 1.1, -0.4),
  new THREE.Vector3(2, 0.1, 0.6),
  new THREE.Vector3(4.2, -1, 0),
])
const SEG = 240
const LEN = CURVE.getLength()
const frenet = CURVE.computeFrenetFrames(SEG, false)
const PTS = Array.from({ length: SEG + 1 }, (_, i) => CURVE.getPointAt(i / SEG))
const MAX_BOUNCES = 44

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(14, Math.min(24, Math.floor(460 / Math.max(8, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const tube = new THREE.Mesh(new THREE.TubeGeometry(CURVE, 80, R, 8, false), new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.22, roughness: 0.1, side: THREE.DoubleSide, depthWrite: false }))
    scene.add(tube)
    scene.add(new THREE.GridHelper(14, 14, theme.line, theme.grid).translateY(-2.4))

    const pathGeo = new THREE.BufferGeometry()
    const pathBuf = new Float32Array((MAX_BOUNCES + 2) * 3)
    pathGeo.setAttribute('position', new THREE.BufferAttribute(pathBuf, 3))
    const path = new THREE.Line(pathGeo, new THREE.LineBasicMaterial({ color: theme.pos }))
    scene.add(path)

    const escapeBeam = new THREE.Line(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3)), new THREE.LineDashedMaterial({ color: theme.neg, dashSize: 0.15, gapSize: 0.1 }))
    scene.add(escapeBeam)

    const photon = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), new THREE.MeshStandardMaterial({ color: theme.fg, emissive: theme.accent2, emissiveIntensity: 0.6 }))
    scene.add(photon)

    const tagAngle = label('', theme.fg.getStyle(), 0.42)
    tagAngle.position.set(0, 2.6, 0)
    const tagState = label('', theme.fg.getStyle(), 0.42)
    tagState.position.set(0, 2.05, 0)
    scene.add(tagAngle, tagState)

    let clock = 0
    let cachedKey = ''
    let travel: THREE.Vector3[] = [PTS[0]!]
    let segLens: number[] = [1]
    let total = 1
    return (dt) => {
      const theta1 = props.params.theta1 ?? 50
      const n1 = props.params.n1 ?? 1.5
      const n2 = props.params.n2 ?? 1
      const key = `${theta1}|${n1}|${n2}`
      if (key !== cachedKey) {
        cachedKey = key
        const th1 = (theta1 * Math.PI) / 180
        const sinT2 = (n1 / n2) * Math.sin(th1)
        const tir = Math.abs(sinT2) > 1
        const th2 = tir ? 0 : Math.asin(sinT2)
        const crit = n1 > n2 ? Math.asin(n2 / n1) : NaN

        const dz = THREE.MathUtils.clamp((2 * R * 0.9) / Math.max(0.06, Math.tan(th1)), 0.32, 1.6)
        const ds = dz / LEN
        const pts = [PTS[0]!.clone()]
        let s = 0
        let side = 1
        let bounces = 0
        let escapeIdx = -1
        while (s < 1 - ds * 0.5 && bounces < MAX_BOUNCES) {
          s = Math.min(1, s + ds)
          const idx = Math.round(s * SEG)
          const p = PTS[idx]!.clone().addScaledVector(frenet.normals[idx]!, side * R * 0.88)
          pts.push(p)
          bounces++
          if (!tir) {
            escapeIdx = idx
            break
          }
          side = -side
        }

        if (escapeIdx >= 0) {
          const p = pts[pts.length - 1]!
          const nrm = frenet.normals[escapeIdx]!
          const tan = frenet.tangents[escapeIdx]!
          const out = tan.clone().multiplyScalar(Math.sin(th2)).add(nrm.clone().multiplyScalar(Math.cos(th2))).normalize()
          const posAttr = escapeBeam.geometry.attributes.position as THREE.BufferAttribute
          posAttr.setXYZ(0, p.x, p.y, p.z)
          const end = p.clone().addScaledVector(out, 1.6)
          posAttr.setXYZ(1, end.x, end.y, end.z)
          posAttr.needsUpdate = true
          escapeBeam.computeLineDistances()
          escapeBeam.visible = true
          pts.push(end) // the photon marker continues onto the leaking beam
        } else {
          escapeBeam.visible = false
        }
        travel = pts
        segLens = travel.slice(1).map((p, i) => p.distanceTo(travel[i]!))
        total = segLens.reduce((a, b) => a + b, 0) || 1

        const posAttr = pathGeo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < pts.length; i++) posAttr.setXYZ(i, pts[i]!.x, pts[i]!.y, pts[i]!.z)
        pathGeo.setDrawRange(0, pts.length)
        posAttr.needsUpdate = true
        path.material.color.copy(tir ? theme.pos : theme.neg)

        const deg = (r: number) => fmt((r * 180) / Math.PI, 1) + '°'
        const angleTxt = Number.isFinite(crit) ? `θ1=${deg(th1)}   θc=${deg(crit)}` : `θ1=${deg(th1)}`
        setLabel(tagAngle, angleTxt, tir ? theme.pos : theme.neg)
        setLabel(tagState, tir ? t('viz3d.fibre.guided') : t('viz3d.fibre.escapes'), tir ? theme.pos : theme.neg)
      }

      // A photon marker walks the (possibly escaping) path so the bouncing is visible; frozen if
      // prefers-reduced-motion (dt stays 0, so clock never advances).
      clock = (clock + dt * 2.4) % total
      let acc = 0
      let seg = 0
      while (seg < segLens.length - 1 && acc + segLens[seg]! < clock) {
        acc += segLens[seg]!
        seg++
      }
      const segLen = segLens[seg] || 1
      const f = (clock - acc) / segLen
      photon.position.lerpVectors(travel[seg]!, travel[seg + 1]!, THREE.MathUtils.clamp(f, 0, 1))
    }
  },
  { camera: [3, 3.4, 9], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
