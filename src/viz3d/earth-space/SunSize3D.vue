<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { readParams, squeeze, num } from '../../viz/earth-space/sunSizeModel'

// earth-space/sun-size. Same params as the 2D picture: n (how many times farther the Sun is than the
// Moon) and cover (how far the Moon has slid over the Sun). Your eye on Earth is on the left; a sight
// cone opens from it through the Moon to the Sun. The Moon sits where the cone is as wide as the Moon,
// the Sun is the disc that fills the cone at the far end, so it grows with n. Distances are squeezed
// and the Moon and Earth are drawn bigger than true (the caption says so).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))

const EYE = -14
const TOTAL = 26
const MOON_R = 0.35
const hex = (c: THREE.Color) => '#' + c.getHexString()

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    // a square canvas (phones) needs the camera further back than a wide card; re-fit only when the shape class changes
    let wide: boolean | null = null
    const fit = () => {
      const w = camera.aspect >= 1.3
      if (w === wide) return
      const k = wide === null ? (w ? 1 : 1.6) : w ? 1 / 1.6 : 1.6
      wide = w
      const off = camera.position.clone().sub(controls.target).multiplyScalar(k)
      camera.position.copy(controls.target).add(off)
    }

    scene.background = new THREE.Color(0x05070d)

    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 24), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    earth.position.set(EYE - 0.9, 0, 0)
    scene.add(earth)

    const moon = new THREE.Mesh(new THREE.SphereGeometry(MOON_R, 24, 16), new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95 }))
    scene.add(moon)

    const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(sun)
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 20),
      new THREE.MeshBasicMaterial({ color: 0xffa726, transparent: true, opacity: 0.18, depthWrite: false }),
    )
    scene.add(halo)
    const sunLight = new THREE.PointLight(0xfff4d6, 120, 0, 1.2)
    scene.add(sunLight)

    // the sight cone: unit cone (apex +y), turned so its apex points at the eye
    const coneGeo = new THREE.ConeGeometry(1, 1, 48, 1, true)
    const cone = new THREE.Mesh(
      coneGeo,
      new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }),
    )
    cone.rotation.z = Math.PI / 2
    scene.add(cone)
    const rimPos = new THREE.BufferAttribute(new Float32Array(24), 3)
    const rimGeo = new THREE.BufferGeometry()
    rimGeo.setAttribute('position', rimPos)
    const rim = new THREE.LineSegments(rimGeo, new THREE.LineBasicMaterial({ color: theme.accent2 }))
    rim.frustumCulled = false
    scene.add(rim)

    const tagEye = label(t('sun-size.eye'), hex(theme.fg), 0.9)
    const tagMoon = label(t('sun-size.moon'), hex(theme.fg), 0.9)
    const tagSun = label(t('sun-size.sun'), '#ffd479', 1.2)
    scene.add(tagEye, tagMoon, tagSun)
    tagEye.position.set(EYE - 0.9, -1.7, 0)

    let spin = 0
    return (dt) => {
      fit()
      const { n, cover } = P.value
      const { dm, sunR } = squeeze(n, TOTAL, MOON_R, 1.8)
      const sunX = EYE + TOTAL
      const moonX = EYE + dm
      // the Moon starts to one side of the Sun's disc and slides in to sit exactly in front of it
      const z0 = (1 - cover) * (2 * MOON_R + 0.4)

      sun.position.set(sunX, 0, 0)
      sun.scale.setScalar(sunR)
      halo.position.copy(sun.position)
      halo.scale.setScalar(sunR * 1.25)
      sunLight.position.copy(sun.position)
      moon.position.set(moonX, 0, z0)

      cone.scale.set(sunR, TOTAL, sunR)
      cone.position.set(EYE + TOTAL / 2, 0, 0)

      // four edge lines from the eye to the rim of the Sun
      ;[
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([y, z], i) => rimPos.setXYZ(i * 2, EYE, 0, 0).setXYZ(i * 2 + 1, sunX, y * sunR, z * sunR))
      rimPos.needsUpdate = true

      tagMoon.position.set(moonX, 0.95, z0)
      tagSun.position.set(sunX, sunR + 1.1, 0)
      spin = Math.max(0, spin + dt * 0.3)
      earth.rotation.y = spin
    }
  },
  { camera: [-1.5, 8, 31], target: [-1, 0, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span dir="ltr" class="num font-semibold" style="color: var(--accent)">{{ P.n }} × 3,474 km = {{ num(P.sunKm) }} km</span>
      <span style="color: var(--muted)">{{ t('sun-size.caption3d') }}</span>
    </div>
  </div>
</template>
