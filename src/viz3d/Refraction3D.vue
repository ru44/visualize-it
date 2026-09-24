<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Snell's law n1 sin(theta1) = n2 sin(theta2), same formulas as src/viz/RayOptics.vue's 'refraction'
// mode — content/lessons/waves/refraction-snells-law. The plane of incidence is tilted off the world
// axes (AZ below) so the beam is a genuinely 3D object bending in its own plane, and the refracted
// beam is drawn visibly inside a solid block — a fixed 2D diagram, which only ever shows one plane
// face-on, cannot show either of those.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const AZ = Math.PI / 6.5
const HORIZ = new THREE.Vector3(Math.cos(AZ), 0, Math.sin(AZ))
const UP = new THREE.Vector3(0, 1, 0)
const ARC_SEG = 24

function beamLine(color: THREE.Color, opacity: number, dashed = false) {
  const mat = dashed ? new THREE.LineDashedMaterial({ color, dashSize: 0.18, gapSize: 0.12, transparent: true, opacity }) : new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
  return new THREE.Line(geo, mat)
}
function aim(ln: THREE.Line, a: THREE.Vector3, b: THREE.Vector3) {
  const p = ln.geometry.attributes.position as THREE.BufferAttribute
  p.setXYZ(0, a.x, a.y, a.z)
  p.setXYZ(1, b.x, b.y, b.z)
  p.needsUpdate = true
  ln.computeLineDistances()
}
function arcTo(ln: THREE.Line, angle: number, below: boolean, r: number) {
  const pos = new Float32Array((ARC_SEG + 1) * 3)
  for (let i = 0; i <= ARC_SEG; i++) {
    const p = (i / ARC_SEG) * angle
    const v = new THREE.Vector3().addScaledVector(UP, (below ? -1 : 1) * Math.cos(p)).addScaledVector(HORIZ, Math.sin(p)).multiplyScalar(r)
    pos.set([v.x, v.y, v.z], i * 3)
  }
  ln.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  ln.geometry.attributes.position.needsUpdate = true
}

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `500 ${Math.max(15, Math.min(26, Math.floor(460 / Math.max(8, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const block = new THREE.Mesh(new THREE.BoxGeometry(8, 6, 8), new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.22, roughness: 0.1, depthWrite: false }))
    block.position.y = -3
    scene.add(block)
    scene.add(new THREE.GridHelper(8, 8, theme.line, theme.grid))

    const inc = beamLine(theme.accent2, 1)
    const refl = beamLine(theme.muted, 0.6)
    const refr = beamLine(theme.accent2, 1)
    const critGuide = beamLine(new THREE.Color(theme.neg), 0.5, true)
    scene.add(inc, refl, refr, critGuide)

    const arcA = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.fg }))
    const arcB = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent2 }))
    scene.add(arcA, arcB)

    const tag = label('', theme.fg.getStyle(), 0.5)
    tag.position.set(0, 3.4, 0)
    scene.add(tag)

    return () => {
      const th1 = ((props.params.theta1 ?? 40) * Math.PI) / 180
      const n1 = props.params.n1 ?? 1
      const n2 = props.params.n2 ?? 1.5
      const sinT2 = (n1 / n2) * Math.sin(th1)
      const tir = Math.abs(sinT2) > 1
      const th2 = tir ? 0 : Math.asin(sinT2)
      const crit = n1 > n2 ? Math.asin(n2 / n1) : NaN

      const dIn = new THREE.Vector3().addScaledVector(HORIZ, Math.sin(th1)).addScaledVector(UP, -Math.cos(th1))
      const dRefl = new THREE.Vector3().addScaledVector(HORIZ, Math.sin(th1)).addScaledVector(UP, Math.cos(th1))
      aim(inc, dIn.clone().multiplyScalar(-5), new THREE.Vector3())
      aim(refl, new THREE.Vector3(), dRefl.multiplyScalar(4))
      ;(refl.material as THREE.LineBasicMaterial).opacity = tir ? 1 : 0.5

      refr.visible = !tir
      if (!tir) {
        const dRefr = new THREE.Vector3().addScaledVector(HORIZ, Math.sin(th2)).addScaledVector(UP, -Math.cos(th2))
        aim(refr, new THREE.Vector3(), dRefr.multiplyScalar(4.2))
      }

      arcTo(arcA, th1, false, 1.3)
      arcB.visible = !tir
      if (!tir) arcTo(arcB, th2, true, 1.1)

      critGuide.visible = Number.isFinite(crit)
      if (Number.isFinite(crit)) {
        const v = new THREE.Vector3().addScaledVector(UP, Math.cos(crit)).addScaledVector(HORIZ, Math.sin(crit)).multiplyScalar(3.6)
        aim(critGuide, new THREE.Vector3(), v)
      }

      const deg = (r: number) => fmt((r * 180) / Math.PI, 1) + '°'
      const text = tir ? `θ1=${deg(th1)}  ${t('optics.tir')}` : `θ1=${deg(th1)}  θ2=${deg(th2)}`
      setLabel(tag, text, tir ? theme.neg : theme.fg)
    }
  },
  { camera: [7, 5, 9], target: [0, -0.5, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
