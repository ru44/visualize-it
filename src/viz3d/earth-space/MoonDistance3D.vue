<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams, COVER_KEY, km } from '../../viz/earth-space/moonDistanceModel'

// earth-space/moon-distance in 3D: the eye at the origin, the coin on a stick along +x, the Moon far
// away on the same line and the cone of sight skimming the coin's edge. The coin and the Moon are drawn
// at one shared angular scale, so the cone touches the Moon's rim exactly when the coin just covers it.
// The Moon is much nearer and bigger than in life (exaggerated). A small screen above the eye shows
// what the eye sees. Params c (mm) and L (cm), as in the flat picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const UNIT = 0.04 // scene units per cm of stick
const KMM = 0.0974 // scene units per mm of coin: with UNIT it makes the coin and the Moon share one scale
const MOON_X = 13.3
const MOON_R = 1.46

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.background = new THREE.Color(0x05070d)
    const red = new THREE.Color(0xe11d48)
    const green = new THREE.Color(0x0d9488)

    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 }))
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), new THREE.MeshBasicMaterial({ color: 0x111111 }))
    pupil.position.set(0.17, 0, 0)
    eye.add(pupil)
    scene.add(eye)

    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1, 8), new THREE.MeshStandardMaterial({ color: theme.muted }))
    stick.rotation.z = Math.PI / 2
    scene.add(stick)
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.06, 40),
      new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4, metalness: 0.3 }),
    )
    coin.rotation.z = Math.PI / 2
    scene.add(coin)

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(MOON_R, 40, 28),
      new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95, emissive: 0x2a2924 }),
    )
    moon.position.set(MOON_X, 0, 0)
    scene.add(moon)

    // the cone of sight: apex at the eye, wide end at the Moon's distance
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1, 1, 48, 1, true),
      new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }),
    )
    cone.rotation.z = Math.PI / 2
    const coneHolder = new THREE.Group()
    coneHolder.add(cone)
    scene.add(coneHolder)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.025, 6, 64), new THREE.MeshBasicMaterial({ color: theme.accent }))
    rim.rotation.y = Math.PI / 2
    scene.add(rim)

    // the little screen: what the eye sees
    const cv = document.createElement('canvas')
    cv.width = cv.height = 256
    const tex = new THREE.CanvasTexture(cv)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: tex }))
    screen.position.set(2.6, 2.4, 0)
    scene.add(screen)
    let drawn = ''
    const paint = (size: number, ok: boolean) => {
      const key = `${size.toFixed(3)}${ok}`
      if (key === drawn) return
      drawn = key
      const g = cv.getContext('2d')!
      g.fillStyle = '#0b1220'
      g.fillRect(0, 0, 256, 256)
      g.save()
      g.beginPath()
      g.rect(0, 0, 256, 256)
      g.clip()
      g.fillStyle = 'rgba(217,115,13,0.65)'
      g.beginPath()
      g.arc(128, 128, 62 * size, 0, Math.PI * 2)
      g.fill()
      g.restore()
      g.strokeStyle = ok ? '#2dd4bf' : '#ededf0'
      g.lineWidth = 5
      g.setLineDash([12, 8])
      g.beginPath()
      g.arc(128, 128, 62, 0, Math.PI * 2)
      g.stroke()
      tex.needsUpdate = true
    }

    const lEye = label(t('moon-distance.eye'), '#ededf0', 0.55)
    lEye.position.set(0, -0.8, 0)
    scene.add(lEye)
    const lCoin = label(t('moon-distance.coin'), '#f5b453', 0.55)
    scene.add(lCoin)
    const lMoon = label(t('moon-distance.moon'), '#ededf0', 0.6)
    lMoon.position.set(MOON_X, MOON_R + 0.8, 0)
    scene.add(lMoon)
    const lSees = label(t('moon-distance.sees'), '#ededf0', 0.5)
    lSees.position.set(2.6, 4.7, 0)
    scene.add(lSees)
    const lFar = label(t('moon-distance.far'), '#8e8e99', 0.5)
    lFar.position.set(MOON_X / 2 + 1, -2.6, 0)
    scene.add(lFar)

    const base = camera.position.clone().sub(controls.target)
    let narrow: boolean | null = null
    const frame = (k: number) => {
      const isNarrow = camera.aspect < 1.3
      if (isNarrow === narrow) return
      narrow = isNarrow
      camera.position.copy(controls.target).addScaledVector(base, isNarrow ? k : 1)
    }
    return () => {
      frame(1.6)
      const p = P.value
      const lx = p.L * UNIT
      const half = (p.c * KMM) / 2
      stick.scale.y = lx
      stick.position.x = lx / 2
      coin.scale.set(half, 1, half)
      coin.position.x = lx
      lCoin.position.set(lx, half + 0.7, 0)
      const coneR = (half * MOON_X) / lx
      cone.scale.set(coneR, MOON_X, coneR)
      coneHolder.position.x = MOON_X / 2
      rim.scale.set(half, half, half)
      rim.position.x = lx
      ;(moon.material as THREE.MeshStandardMaterial).emissive.set(p.cover === 'exact' ? 0x0a4a43 : 0x2a2924)
      ;(rim.material as THREE.MeshBasicMaterial).color.set(p.cover === 'exact' ? green : p.cover === 'big' ? red : theme.accent)
      paint(Math.min(p.size, 4), p.cover === 'exact')
    }
  },
  { camera: [10, 4.5, 17], target: [7, 2.4, 0], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span class="font-semibold" :style="{ color: P.cover === 'exact' ? 'var(--pos)' : 'var(--neg)' }">{{ t(COVER_KEY[P.cover]) }}</span>
      <span dir="ltr" class="num" style="color: var(--accent)">c = {{ fmt(P.c, 1) }} mm · L = {{ fmt(P.L, 1) }} cm → {{ km(P.distance) }} km</span>
      <span style="color: var(--muted)">{{ t('moon-distance.cap3d') }}</span>
    </div>
  </div>
</template>
