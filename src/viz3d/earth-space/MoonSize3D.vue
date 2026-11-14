<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree } from '../useThree'
import { makeTag } from '../networking/parts'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams, km, pct, REAL_MOON } from '../../viz/earth-space/moonSizeModel'

// earth-space/moon-size. Same params as the 2D picture: k and pos. The Sun is far to the left (not to
// scale), then the Earth, and its shadow narrows towards the right. The Earth is a fixed size; the Moon
// is drawn at the size your k gives (Earth = k + 1 Moons), and the shadow where the Moon crosses it is
// exactly k Moons wide. A row of k ghost Moons below the path shows that. pos moves the Moon across.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

const RE = 1.3 // the Earth's radius in the scene
const DM = 5 // where the Moon crosses the shadow (shortened, to fit)
const SUN_X = -7

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    // a narrow (phone) canvas needs the camera further back
    if (camera.aspect < 1.3) camera.position.sub(controls.target).multiplyScalar(1.7).add(controls.target)
    scene.background = new THREE.Color(0x05070d)
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 20), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    sun.position.set(SUN_X, 0, 0)
    scene.add(sun)
    const lamp = new THREE.PointLight(0xfff4d6, 120, 0, 1.1)
    lamp.position.set(SUN_X + 2.2, 0, 0)
    scene.add(lamp)
    const earth = new THREE.Mesh(new THREE.SphereGeometry(RE, 40, 28), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    scene.add(earth)
    const moonMat = new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95 })
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), moonMat)
    scene.add(moon)

    // sunlight reaching the Earth's edges
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffc94d, transparent: true, opacity: 0.5 })
    for (const s of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, -SUN_X - 1.8, 6), edgeMat)
      m.rotation.z = Math.PI / 2
      m.position.set((SUN_X + 1.8) / 2, 0, s * RE)
      scene.add(m)
    }

    const shadowMat = new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false })
    let cone: THREE.Mesh | null = null
    let coneKey = ''
    const ghostMat = new THREE.MeshBasicMaterial({ color: theme.accent, wireframe: true })
    const ghosts = Array.from({ length: 6 }, () => {
      const g = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), ghostMat)
      scene.add(g)
      return g
    })
    const tagSun = makeTag(0.042, textures)
    const tagEarth = makeTag(0.042, textures)
    const tagMoon = makeTag(0.042, textures)
    const tagRow = makeTag(0.042, textures)
    scene.add(tagSun.sprite, tagEarth.sprite, tagMoon.sprite, tagRow.sprite)
    const lit = new THREE.Color(0xd7d3ca)
    const red = new THREE.Color(0xb3392f)

    return () => {
      const { k, pos, moon: dMoon } = P.value
      const rm = RE / (k + 1) // the Moon's radius, from Earth = k + 1 Moons
      const rs = k * rm // the shadow's radius where the Moon crosses it
      moon.scale.setScalar(rm)

      if (`${k}` !== coneKey) {
        coneKey = `${k}`
        if (cone) (scene.remove(cone), cone.geometry.dispose())
        const len = DM * 1.7
        const rEnd = Math.max(0.001, RE - (rm / DM) * len)
        cone = new THREE.Mesh(new THREE.CylinderGeometry(rEnd, RE, len, 40, 1, true), shadowMat)
        cone.rotation.z = -Math.PI / 2
        cone.position.set(len / 2, 0, 0)
        scene.add(cone)
      }

      const z = -(rs + rm) + (pos / 100) * 2 * (rs + rm)
      moon.position.set(DM, 0, z)
      const inside = Math.max(0, Math.min(1, (rs + rm - Math.abs(z)) / (2 * rm)))
      moonMat.color.copy(lit).lerp(red, inside * 0.85)

      const full = Math.floor(k)
      const frac = k - full
      ghosts.forEach((g, i) => {
        if (i < full) {
          g.visible = true
          g.scale.setScalar(rm)
          g.position.set(DM, -1.3, -rs + rm + i * 2 * rm)
        } else if (i === full && frac > 0.02) {
          g.visible = true
          g.scale.setScalar(rm * frac)
          g.position.set(DM, -1.3, -rs + full * 2 * rm + frac * rm)
        } else g.visible = false
      })

      tagSun.sprite.position.set(SUN_X, 2.8, 0)
      tagEarth.sprite.position.set(0, RE + 0.7, 0)
      tagMoon.sprite.position.set(DM, rm + 0.7, z)
      tagRow.sprite.position.set(DM, -2.1, 0)
      tagSun.paint(t('moon-size.3d.sun'), theme.accent2, theme.bg)
      tagEarth.paint(t('moon-size.earth'), theme.fg, theme.bg)
      tagMoon.paint(t('moon-size.3d.moon', { d: km(dMoon) }), theme.accent2, theme.bg)
      tagRow.paint(t('moon-size.across', { k: fmt(k, 2) }), theme.accent, theme.bg)
    }
  },
  { camera: [0.5, 7, 13], target: [-1.5, 1, 0], fov: 46 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <div class="flex flex-wrap items-baseline gap-x-3">
        <span class="num font-semibold" style="color: var(--accent-2)">{{
          t('moon-size.3d.mine', { d: km(P.moon), real: km(REAL_MOON), err: pct(P.err) })
        }}</span>
      </div>
      <div style="color: var(--muted)">{{ t('moon-size.3d.note') }}</div>
    </div>
  </div>
</template>
