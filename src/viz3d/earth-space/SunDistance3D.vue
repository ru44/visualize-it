<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams, fmtRatio } from '../../viz/earth-space/sunDistanceModel'

// earth-space/sun-distance in 3D: Earth at the origin, the Moon straight ahead (-z) and the Sun at angle
// phi from the Moon, so that the angle at the Moon is a right angle. The Sun's real distance is up to
// hundreds of times the Moon's, so beyond a point the Sun is drawn closer than it is and the line from the
// Moon to it is dashed (compressed). The Moon is lit by the Sun: from Earth you see it half lit. The
// translucent wedge is the range of directions phi ± err. Params phi and err (degrees).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const EM = 4 // scene units for the Earth–Moon distance
const FAR = 22 // the farthest the Sun is drawn
const RAD = Math.PI / 180

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.background = new THREE.Color(0x05070d)
    const dirOf = (deg: number) => new THREE.Vector3(Math.sin(deg * RAD), 0, -Math.cos(deg * RAD))

    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 24), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    scene.add(earth)
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95 }))
    moon.position.set(0, 0, -EM)
    scene.add(moon)
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.5, 28, 20), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(sun)
    const light = new THREE.PointLight(0xfff4d6, 900, 0, 1.2)
    scene.add(light)

    const mkLine = (color: THREE.ColorRepresentation, dashed: boolean) => {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)])
      const m = dashed ? new THREE.LineDashedMaterial({ color, dashSize: 0.5, gapSize: 0.4 }) : new THREE.LineBasicMaterial({ color })
      return new THREE.Line(g, m)
    }
    const lineEM = mkLine(0xededf0, false)
    const lineES = mkLine(theme.accent, false)
    const lineMS = mkLine(0xededf0, false)
    const lineMSd = mkLine(0xededf0, true)
    scene.add(lineEM, lineES, lineMS, lineMSd)
    const setLine = (l: THREE.Line, a: THREE.Vector3, b: THREE.Vector3) => {
      const pos = l.geometry.getAttribute('position') as THREE.BufferAttribute
      pos.setXYZ(0, a.x, a.y, a.z)
      pos.setXYZ(1, b.x, b.y, b.z)
      pos.needsUpdate = true
      l.geometry.computeBoundingSphere()
      l.computeLineDistances()
    }
    setLine(lineEM, new THREE.Vector3(), moon.position)

    const wedgeGeo = new THREE.BufferGeometry()
    wedgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3))
    const wedge = new THREE.Mesh(
      wedgeGeo,
      new THREE.MeshBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }),
    )
    wedge.frustumCulled = false
    scene.add(wedge)

    const square = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0.6), new THREE.Vector3(0.6, 0, 0.6), new THREE.Vector3(0.6, 0, 0)]),
      new THREE.LineBasicMaterial({ color: 0xffc94d }),
    )
    square.position.copy(moon.position)
    scene.add(square)

    const lEarth = label(t('sun-distance.earth'), '#ededf0', 1.5)
    lEarth.position.set(0, 0, 2.8)
    scene.add(lEarth)
    const lMoon = label(t('sun-distance.moon'), '#ededf0', 1.5)
    lMoon.position.set(-2.8, 1, -EM)
    scene.add(lMoon)
    const lSun = label(t('sun-distance.sun'), '#ffc94d', 1.7)
    scene.add(lSun)
    const l90 = label('90°', '#ffc94d', 1.2)
    l90.position.set(2.2, 0.5, -EM + 1.6)
    scene.add(l90)
    const lPhi = label('φ', '#7aa2ff', 1.6)
    scene.add(lPhi)

    const base = camera.position.clone().sub(controls.target)
    let narrow: boolean | null = null
    const frame = (k: number) => {
      const isNarrow = camera.aspect < 1.3
      if (isNarrow === narrow) return
      narrow = isNarrow
      camera.position.copy(controls.target).addScaledVector(base, isNarrow ? k : 1)
    }
    return () => {
      frame(1.35)
      const p = P.value
      const phi = Math.min(p.phi, 89.99)
      const d = dirOf(phi)
      const real = EM / Math.cos(phi * RAD)
      const compressed = real > FAR
      const dist = compressed ? FAR : real
      const sunPos = d.clone().multiplyScalar(dist)
      sun.position.copy(sunPos)
      light.position.copy(sunPos)
      setLine(lineES, new THREE.Vector3(), sunPos)
      lineMS.visible = !compressed
      lineMSd.visible = compressed
      setLine(compressed ? lineMSd : lineMS, moon.position, sunPos)
      lSun.position.copy(sunPos).add(new THREE.Vector3(0, 3.2, 0))
      lPhi.position.copy(dirOf(phi / 2).multiplyScalar(4)).add(new THREE.Vector3(0, 0.3, 0))
      // the err wedge
      wedge.visible = p.err > 0
      const lo = dirOf(phi - p.err).multiplyScalar(FAR)
      const hi = dirOf(Math.min(phi + p.err, 89.99)).multiplyScalar(FAR)
      const pos = wedgeGeo.getAttribute('position') as THREE.BufferAttribute
      pos.setXYZ(1, lo.x, 0, lo.z)
      pos.setXYZ(2, hi.x, 0, hi.z)
      pos.needsUpdate = true
    }
  },
  { camera: [12, 24, 14], target: [10, 0, -3], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span dir="ltr" class="num" style="color: var(--accent)"
        >φ = {{ fmt(P.phi, 2) }}° · {{ fmtRatio(P.ratio) }} × · {{ fmt(P.sun, 1) }} {{ t('sun-distance.million') }}</span
      >
      <span style="color: var(--muted)">{{ t('sun-distance.cap3d') }}</span>
    </div>
  </div>
</template>
