<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useThree } from '../useThree'
import { makeTag } from '../networking/parts'
import { t } from '../../i18n'
import { readParams, auFrom, SUN_ARCSEC, K_GAP, EARTH_D } from '../../viz/earth-space/transitOfVenusModel'

// earth-space/transit-of-venus, in 3D. Earth on the left with two observers b apart, Venus in between,
// the Sun on the right. Sizes and distances are squeezed so everything fits (said in the caption).
// The two sight lines run from the observers through Venus to the Sun (they follow b). On the Sun's
// face the two tracks are drawn delta apart, K_GAP times bigger than the truth, with Venus's two dots
// on them. t moves Venus across the Sun.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const textures: THREE.Texture[] = []
const info = computed(() => {
  const p = readParams(props.params)
  return `b = ${Math.round(p.b).toLocaleString('en-US')} km  ·  ${p.delta.toFixed(1)}″  ·  ${auFrom(p.b, p.delta).toFixed(1)}`
})
onUnmounted(() => textures.forEach((x) => x.dispose()))

const EARTH = new THREE.Vector3(-10, 0, 0)
const ER = 1.6
const VENUS = new THREE.Vector3(-3.5, 0, 0)
const SUN = new THREE.Vector3(9, 0, 0)
const SR = 4
const Z_VENUS = 1 // how far Venus swings to each side of the line
const N_SEG = 24
const NORTH_COL = 0x2f5bea
const SOUTH_COL = 0x0d9488

const sunSurface = (y: number, z: number) => new THREE.Vector3(SUN.x - Math.sqrt(Math.max(0.5, SR * SR - y * y - z * z)) - 0.04, y, z)

useThree(
  el,
  ({ scene, camera, controls, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const up = new THREE.Vector3(0, 1, 0)

    // a thin bar between two points, re-aimed every frame
    const bars: THREE.Mesh[] = []
    const bar = (color: number, r = 0.03) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 6), new THREE.MeshBasicMaterial({ color }))
      scene.add(m)
      bars.push(m)
      return m
    }
    const aim = (m: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) => {
      const d = b.clone().sub(a)
      m.position.copy(a).addScaledVector(d, 0.5)
      m.scale.set(1, Math.max(d.length(), 1e-4), 1)
      m.quaternion.setFromUnitVectors(up, d.normalize())
    }

    const earth = new THREE.Mesh(new THREE.SphereGeometry(ER, 40, 28), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    earth.position.copy(EARTH)
    scene.add(earth)
    const sun = new THREE.Mesh(new THREE.SphereGeometry(SR, 48, 32), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    sun.position.copy(SUN)
    scene.add(sun)
    const venus = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16), new THREE.MeshStandardMaterial({ color: 0xe8d9b0, roughness: 0.8 }))
    scene.add(venus)
    const axis = bar(0x55606f, 0.015)
    aim(axis, EARTH, SUN)

    const obsN = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), new THREE.MeshBasicMaterial({ color: NORTH_COL }))
    const obsS = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), new THREE.MeshBasicMaterial({ color: SOUTH_COL }))
    const dotN = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshBasicMaterial({ color: 0x111111 }))
    const dotS = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshBasicMaterial({ color: 0x111111 }))
    const endN = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshBasicMaterial({ color: NORTH_COL }))
    const endS = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshBasicMaterial({ color: SOUTH_COL }))
    scene.add(obsN, obsS, dotN, dotS, endN, endS)
    const sightN = bar(NORTH_COL, 0.025)
    const sightS = bar(SOUTH_COL, 0.025)
    const trackN = Array.from({ length: N_SEG }, () => bar(NORTH_COL, 0.04))
    const trackS = Array.from({ length: N_SEG }, () => bar(SOUTH_COL, 0.04))

    // labels
    const tags = {
      earth: makeTag(0.046, textures),
      venus: makeTag(0.046, textures),
      sun: makeTag(0.046, textures),
      north: makeTag(0.044, textures),
      south: makeTag(0.044, textures),
    }
    tags.earth.sprite.position.set(EARTH.x, -ER - 0.9, 0)
    tags.venus.sprite.position.set(VENUS.x, 1.3, 0)
    tags.sun.sprite.position.set(SUN.x, SR + 0.8, 0)
    tags.north.sprite.position.set(EARTH.x + 0.3, ER + 1.2, 0)
    tags.south.sprite.position.set(EARTH.x + 0.3, -ER - 1.8, 0)
    scene.add(...Object.values(tags).map((x) => x.sprite))

    const narrow = camera.aspect < 1.3
    if (narrow) {
      camera.position.sub(controls.target).multiplyScalar(1.55).add(controls.target)
    }

    return () => {
      const p = readParams(props.params)
      const yo = (p.b / 2 / (EARTH_D / 2)) * ER // observers' height above/below the Earth-Sun line
      const xo = EARTH.x + Math.sqrt(ER * ER - yo * yo)
      const zv = (p.t - 0.5) * 2 * Z_VENUS
      venus.position.set(VENUS.x, 0, zv)
      obsN.position.set(xo, yo, 0)
      obsS.position.set(xo, -yo, 0)

      // sight lines: from each observer through Venus, on to the Sun's face
      const reach = (yObs: number) => {
        const k = (SUN.x - SR - VENUS.x) / (VENUS.x - xo)
        return new THREE.Vector3(0, 0, 0).set(0, -yObs * k, zv * (1 + k))
      }
      const lN = reach(yo)
      const lS = reach(-yo)
      const hitN = sunSurface(lN.y, lN.z)
      const hitS = sunSurface(lS.y, lS.z)
      aim(sightN, obsN.position, hitN)
      aim(sightS, obsS.position, hitS)
      endN.position.copy(hitN)
      endS.position.copy(hitS)

      // tracks on the Sun's face: delta apart, drawn K_GAP times bigger; Venus's dots sit on them
      const half = (K_GAP * p.delta * 2 * SR) / SUN_ARCSEC / 2
      const zr = Z_VENUS * (1 + (SUN.x - SR - VENUS.x) / (VENUS.x - xo)) // where the sight lines land across the Sun
      const draw = (segs: THREE.Mesh[], y: number) => {
        let prev = sunSurface(y, -zr)
        for (let i = 1; i <= N_SEG; i++) {
          const cur = sunSurface(y, -zr + (2 * zr * i) / N_SEG)
          aim(segs[i - 1], prev, cur)
          prev = cur
        }
      }
      draw(trackN, -half) // seen from the north, Venus crosses lower
      draw(trackS, half)
      dotN.position.copy(sunSurface(-half, zr * (2 * p.t - 1)))
      dotS.position.copy(sunSurface(half, zr * (2 * p.t - 1)))

      tags.earth.paint(t('transit-of-venus.earth'), theme.fg, theme.bg)
      tags.venus.paint(t('transit-of-venus.venus'), theme.fg, theme.bg)
      tags.sun.paint(t('transit-of-venus.sun'), theme.fg, theme.bg)
      tags.north.paint(t('transit-of-venus.north'), theme.fg, theme.bg)
      tags.south.paint(t('transit-of-venus.south'), theme.fg, theme.bg)
    }
  },
  { camera: [0.7, 5, 24], target: [0.7, 0, 0], fov: 44 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span dir="ltr" class="num font-semibold" style="color: var(--accent)">{{ t('transit-of-venus.mkm', { v: info }) }}</span>
      <span style="color: var(--muted)">{{ t('transit-of-venus.cap3d') }}</span>
    </div>
  </div>
</template>
