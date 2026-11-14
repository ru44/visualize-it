<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree } from '../useThree'
import { makeTag } from '../networking/parts'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams, km, pct, REAL_C } from '../../viz/earth-space/earthSizeModel'

// earth-space/earth-size. Same params as the 2D picture: theta and d. A globe with two sticks: the one
// at Syene stands straight up under the Sun's parallel rays (no shadow); the one at Alexandria stands
// theta further round and leans away from the rays by theta. The solid globe is the Earth you measured
// (its size follows your circumference 360/theta x d); the grey wire globe is the real Earth.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

const R_REAL = 3
const STICK = 0.9
const UP = new THREE.Vector3(0, 1, 0)
const v = (x: number, y: number) => new THREE.Vector3(x, y, 0)
const place = (m: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) => {
  const d = b.clone().sub(a)
  m.position.copy(a).addScaledVector(d, 0.5)
  m.scale.set(1, Math.max(0.001, d.length()), 1)
  m.quaternion.setFromUnitVectors(UP, d.clone().normalize())
}

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    // a narrow (phone) canvas needs the camera further back
    if (camera.aspect < 1.3) camera.position.sub(controls.target).multiplyScalar(1.5).add(controls.target)
    scene.background = new THREE.Color(0x05070d)
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9, transparent: true, opacity: 0.55, depthWrite: false }),
    )
    const net = new THREE.Mesh(
      new THREE.SphereGeometry(1, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.18 }),
    )
    const ghost = new THREE.Mesh(
      new THREE.SphereGeometry(R_REAL, 24, 16),
      new THREE.MeshBasicMaterial({ color: theme.muted, wireframe: true, transparent: true, opacity: 0.55 }),
    )
    scene.add(globe, net, ghost)

    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(sun)

    const mk = (color: THREE.Color | number, r: number) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 10), new THREE.MeshBasicMaterial({ color }))
    const stickS = mk(0xffffff, 0.07)
    const stickA = mk(0xffffff, 0.07)
    const shadow = mk(0x000000, 0.09)
    const rayA = mk(0xffc94d, 0.04)
    const radS = mk(theme.muted, 0.02)
    const radA = mk(theme.muted, 0.02)
    ;[radS, radA].forEach((m) => ((m.material as THREE.MeshBasicMaterial).depthTest = false))
    scene.add(stickS, stickA, shadow, rayA, radS, radA)

    const rays: THREE.Mesh[] = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((x) => {
      const m = mk(0xffc94d, 0.012)
      ;(m.material as THREE.MeshBasicMaterial).transparent = true
      ;(m.material as THREE.MeshBasicMaterial).opacity = 0.4
      scene.add(m)
      return m
    })
    const rayX = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4]

    let arcGround: THREE.Mesh | null = null
    let arcCentre: THREE.Mesh | null = null
    let key = ''
    const tagS = makeTag(0.042, textures, 'right')
    const tagA = makeTag(0.042, textures, 'left')
    const tagSun = makeTag(0.042, textures)
    const tagReal = makeTag(0.042, textures)
    const tagCen = makeTag(0.042, textures)
    scene.add(tagS.sprite, tagA.sprite, tagSun.sprite, tagReal.sprite, tagCen.sprite)

    return () => {
      const { theta, c } = P.value
      const th = (theta * Math.PI) / 180
      const Rs = R_REAL * Math.max(0.3, Math.min(1.3, c / REAL_C))
      globe.scale.setScalar(Rs)
      net.scale.setScalar(Rs * 1.002)
      const top = Rs + 1.6
      sun.position.set(0, top + 0.6, 0)

      const S0 = v(0, Rs)
      const S1 = v(0, Rs + STICK)
      const A0 = v(Rs * Math.sin(th), Rs * Math.cos(th))
      const A1 = v((Rs + STICK) * Math.sin(th), (Rs + STICK) * Math.cos(th))
      place(stickS, S0, S1)
      place(stickA, A0, A1)
      const hitY = Math.sqrt(Math.max(0, Rs * Rs - A1.x * A1.x))
      place(rayA, v(A1.x, top), v(A1.x, A1.y))
      place(shadow, A0, v(A1.x, hitY))
      place(radS, v(0, 0), S0)
      place(radA, v(0, 0), A0)
      rays.forEach((m, i) => {
        const x = rayX[i]
        const y = Math.abs(x) < Rs ? Math.sqrt(Rs * Rs - x * x) : 0
        m.visible = Math.abs(x) < Rs
        if (m.visible) place(m, v(x, top), v(x, y))
      })

      const k = `${theta}|${Rs}`
      if (k !== key) {
        key = k
        for (const o of [arcGround, arcCentre]) o && (scene.remove(o), o.geometry.dispose(), (o.material as THREE.Material).dispose())
        arcGround = new THREE.Mesh(new THREE.TorusGeometry(Rs * 1.01, 0.06, 8, 48, th), new THREE.MeshBasicMaterial({ color: theme.pos }))
        arcGround.rotation.z = Math.PI / 2 - th
        arcCentre = new THREE.Mesh(
          new THREE.TorusGeometry(Math.min(1.4, Rs * 0.5), 0.04, 8, 48, th),
          new THREE.MeshBasicMaterial({ color: theme.accent2, depthTest: false }),
        )
        arcCentre.rotation.z = Math.PI / 2 - th
        scene.add(arcGround, arcCentre)
      }

      tagS.sprite.position.set(-0.15, Rs + STICK + 0.45, 0)
      tagA.sprite.position.set(A1.x + 0.15, A1.y + 0.45, 0)
      tagSun.sprite.position.set(0, top + 1.5, 0)
      tagReal.sprite.position.set(-R_REAL * 0.72, -R_REAL * 0.78, 0.6)
      tagCen.sprite.position.set(0, -0.45, 0)
      tagS.paint(t('earth-size.syene'), theme.fg, theme.bg)
      tagA.paint(t('earth-size.alex'), theme.fg, theme.bg)
      tagSun.paint(t('earth-size.3d.sun'), theme.accent2, theme.bg)
      tagReal.paint(t('earth-size.3d.real'), theme.muted, theme.bg)
      tagCen.paint(`θ = ${fmt(theta, 1)}°`, theme.accent2, theme.bg)
    }
  },
  { camera: [0, 5, 20], target: [0, 3.7, 0], fov: 42 },
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
        <span class="num font-semibold" style="color: var(--accent)">θ = {{ fmt(P.theta, 1) }}° · {{ km(P.d) }} km</span>
        <span class="num" style="color: var(--fg)">{{ t('earth-size.3d.mine', { c: km(P.c), real: km(REAL_C), err: pct(P.err) }) }}</span>
      </div>
      <div style="color: var(--muted)">{{ t('earth-size.3d.note') }}</div>
    </div>
  </div>
</template>
