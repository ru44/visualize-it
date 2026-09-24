<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Thin-lens equation, same formulas as src/viz/RayOptics.vue's 'lens' mode:
// d_i = f*d_0/(d_0-f), h_i = -(d_i/d_0)*h_0, virtual when d_i < 0 — content/lessons/waves/thin-lenses.
// Instead of the 2D picture's 2-3 construction rays, a whole fan sampled around the lens aperture is
// drawn from the object to the lens and on to the image: every ray in the fan meets at the same
// point, which a flat diagram (one slice through the axis) cannot show.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const APERTURE = 2.1
const RAYS = 9

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
  ({ scene, theme, camera, controls }) => {
    scene.add(new THREE.GridHelper(24, 12, theme.line, theme.grid))
    const axis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-40, 0, 0), new THREE.Vector3(40, 0, 0)]), new THREE.LineBasicMaterial({ color: theme.muted }))
    scene.add(axis)

    // Lens: a squashed sphere (biconvex lentil) whose thin axis is the world X (optical) axis.
    const lens = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 16), new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.32, roughness: 0.12, side: THREE.DoubleSide, depthWrite: false }))
    lens.scale.set(0.45, APERTURE, APERTURE)
    scene.add(lens)

    const fMarkers = [-1, 1].map((s) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), new THREE.MeshStandardMaterial({ color: theme.muted }))
      scene.add(m)
      return { m, s }
    })

    const object = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.accent2)
    const image = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.neg)
    scene.add(object, image)

    // Ray fan: RAYS incoming (object -> lens) + RAYS outgoing (lens -> beyond), one LineSegments each.
    const inGeo = new THREE.BufferGeometry()
    inGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(RAYS * 4 * 3), 3))
    const raysIn = new THREE.LineSegments(inGeo, new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.7 }))
    scene.add(raysIn)
    const dashGeo = new THREE.BufferGeometry()
    dashGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(RAYS * 2 * 3), 3))
    const raysDash = new THREE.LineSegments(dashGeo, new THREE.LineDashedMaterial({ color: theme.pos, dashSize: 0.15, gapSize: 0.1, transparent: true, opacity: 0.6 }))
    scene.add(raysDash)

    const tag = label('', theme.fg.getStyle(), 0.5)
    scene.add(tag)

    let lastExtent = -1
    return () => {
      const f = props.params.f ?? 6
      const doo = Math.max(0.2, props.params.doo ?? 15)
      const ho = props.params.ho ?? 3
      const di = doo === f ? Infinity : (f * doo) / (doo - f)
      const finite = Number.isFinite(di)
      const hi = finite ? -(di / doo) * ho : 0
      const virtual = finite && di < 0
      const diClamped = finite ? THREE.MathUtils.clamp(di, -50, 50) : 50

      const midX = (-doo + (finite ? diClamped : 0)) / 2
      const span = Math.max(doo + Math.abs(finite ? diClamped : 0), 2 * f, 6)
      if (Math.abs(span - lastExtent) > 0.4) {
        lastExtent = span
        camera.position.set(midX + span * 0.55, span * 0.42 + 2.5, span * 0.85)
        controls.target.set(midX, 0, 0)
      }

      fMarkers.forEach(({ m, s }) => m.position.set(s * f, 0, 0))

      object.position.set(-doo, 0, 0)
      object.setLength(Math.max(0.05, ho), Math.min(0.3, ho * 0.3 + 0.02), Math.min(0.18, ho * 0.2 + 0.01))

      const P0 = new THREE.Vector3(-doo, ho, 0)
      const Pi = new THREE.Vector3(diClamped, finite ? hi : 0, 0)
      const chief = finite ? Pi.clone().normalize() : new THREE.Vector3(doo, -ho, 0).normalize()

      if (finite) {
        image.visible = true
        image.position.set(di, 0, 0)
        image.setDirection(new THREE.Vector3(0, hi >= 0 ? 1 : -1, 0))
        image.setLength(Math.max(0.05, Math.abs(hi)), Math.min(0.3, Math.abs(hi) * 0.3 + 0.02), Math.min(0.18, Math.abs(hi) * 0.2 + 0.01))
        image.setColor(virtual ? theme.pos : theme.neg) // same convention as RayOptics.vue: virtual = pos, real = neg
      } else {
        image.visible = false
      }

      const inPos = inGeo.attributes.position as THREE.BufferAttribute
      const dashPos = dashGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < RAYS; i++) {
        const ang = (i / RAYS) * Math.PI * 2
        const PL = new THREE.Vector3(0, Math.cos(ang) * APERTURE * 0.82, Math.sin(ang) * APERTURE * 0.82)
        inPos.setXYZ(i * 4 + 0, P0.x, P0.y, P0.z)
        inPos.setXYZ(i * 4 + 1, PL.x, PL.y, PL.z)

        let dir: THREE.Vector3
        if (finite) {
          dir = Pi.clone().sub(PL)
          if (dir.x < 0) dir.negate()
          dir.normalize()
        } else {
          dir = chief.clone()
        }
        const forward = PL.clone().addScaledVector(dir, finite ? Math.abs(diClamped) + 6 : 9)
        inPos.setXYZ(i * 4 + 2, PL.x, PL.y, PL.z)
        inPos.setXYZ(i * 4 + 3, forward.x, forward.y, forward.z)

        if (virtual) {
          dashPos.setXYZ(i * 2, PL.x, PL.y, PL.z)
          dashPos.setXYZ(i * 2 + 1, Pi.x, Pi.y, Pi.z)
        } else {
          dashPos.setXYZ(i * 2, PL.x, PL.y, PL.z)
          dashPos.setXYZ(i * 2 + 1, PL.x, PL.y, PL.z)
        }
      }
      inPos.needsUpdate = true
      dashPos.needsUpdate = true
      raysDash.computeLineDistances()
      raysDash.visible = virtual

      const m = finite ? -di / doo : 0
      const kind = !finite ? t('optics.none') : virtual ? t('optics.virtual') : t('optics.real')
      setLabel(tag, `${kind}   dᵢ=${finite ? fmt(di, 2) : '∞'}   m=${finite ? fmt(m, 2) : '—'}`, virtual ? theme.pos : theme.neg)
      tag.position.set((-doo + (finite ? di : 0)) / 2, Math.max(ho, finite ? Math.abs(hi) : 0) + 1.3, 0)
    }
  },
  { camera: [9, 6, 13], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
