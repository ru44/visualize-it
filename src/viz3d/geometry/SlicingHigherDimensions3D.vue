<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams } from '../../viz/geometry/slicingHigherDimensionsModel'

// geometry/slicing-higher-dimensions. Same params as the 2D picture. n = 3: a translucent ball passes
// through a horizontal glass sheet and the bright disc is where they meet. n = 2: a flat disc standing
// upright crosses a line. n = 4: a 4D ball cannot be drawn, so the scene shows the 3D slice itself, a
// solid ball of radius r that swells and shrinks with h, and a gauge for the fourth direction.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const S = 0.35 // world units per cm
const hex = (c: THREE.Color) => '#' + c.getHexString()

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    let wide: boolean | null = null
    const fit = () => {
      const w = camera.aspect >= 1.3
      if (w === wide) return
      if (wide !== null || !w) {
        const k = wide === null ? 1.5 : w ? 1 / 1.5 : 1.5
        camera.position.sub(controls.target).multiplyScalar(k).add(controls.target)
      }
      wide = w
    }
    scene.background = new THREE.Color(0x05070d)

    const glass = new THREE.MeshStandardMaterial({ color: theme.accent, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false })
    const sheet = new THREE.Group()
    sheet.add(new THREE.Mesh(new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2), glass))
    sheet.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2)),
        new THREE.LineBasicMaterial({ color: theme.accent }),
      ),
    )
    scene.add(sheet)

    const orange = new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.32, roughness: 0.4, depthWrite: false })
    const ball3 = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), orange)
    scene.add(ball3)
    const disc2 = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      new THREE.MeshStandardMaterial({ color: theme.accent2, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false }),
    )
    scene.add(disc2)
    const cut3 = new THREE.Mesh(new THREE.CircleGeometry(1, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffe08a, side: THREE.DoubleSide }))
    scene.add(cut3)
    const cut2 = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.08), new THREE.MeshBasicMaterial({ color: 0xffe08a }))
    scene.add(cut2)
    const slice4 = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.35, metalness: 0.1 }))
    scene.add(slice4)
    const wire4 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 24, 16),
      new THREE.MeshBasicMaterial({ color: theme.muted, wireframe: true, transparent: true, opacity: 0.25 }),
    )
    scene.add(wire4)

    // gauge for the fourth direction (n = 4): a pole with a bead at h
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1, 8), new THREE.MeshBasicMaterial({ color: theme.muted }))
    pole.position.x = -4.6
    scene.add(pole)
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
    bead.position.x = -4.6
    scene.add(bead)

    const tagSheet = label(t('slicing-higher-dimensions.3d.sheet'), hex(theme.accent), 1)
    tagSheet.position.set(3.2, 0.8, 4.6)
    const tagSlice = label(t('slicing-higher-dimensions.3d.slice'), '#ffe08a', 1)
    const tagWide = label(t('slicing-higher-dimensions.3d.widest'), hex(theme.muted), 0.45)
    const tagW = label(t('slicing-higher-dimensions.3d.w'), hex(theme.accent2), 0.45)
    const tagCap = label(t('slicing-higher-dimensions.3d.cap4'), hex(theme.pos), 0.55)
    scene.add(tagSheet, tagSlice, tagWide, tagW, tagCap)

    return () => {
      fit()
      const { n, h, R, here, r } = P.value
      const is2 = n === 2
      const is3 = n === 3
      const is4 = n === 4
      sheet.visible = !is4
      ball3.visible = is3
      ball3.position.y = h * S
      ball3.scale.setScalar(R * S)
      disc2.visible = is2
      disc2.position.y = h * S
      disc2.scale.setScalar(R * S)
      cut3.visible = is3 && here
      cut3.position.y = 0.01
      cut3.scale.setScalar(Math.max(r * S, 0.001))
      cut2.visible = is2 && here
      cut2.scale.x = Math.max(2 * r * S, 0.001)
      cut2.position.y = 0.01
      slice4.visible = is4 && here
      slice4.position.y = 0
      slice4.scale.setScalar(Math.max(r * S, 0.001))
      wire4.visible = is4
      wire4.scale.setScalar(R * S)
      pole.visible = bead.visible = tagW.visible = is4
      pole.scale.y = 2 * R * S
      bead.position.y = h * S
      tagW.position.set(-4.6, R * S + 0.55, 0)
      tagSheet.visible = !is4
      tagSlice.visible = (is3 || is2) && here
      tagSlice.position.set(r * S + 2.4, 0.9, 0)
      tagWide.visible = is4
      tagWide.position.set(0, -R * S - 0.5, 0)
      tagCap.visible = is4
      tagCap.position.set(0, R * S + 0.8, 0)
    }
  },
  { camera: [7.5, 4.5, 12], target: [0, 1.6, 0], fov: 45 },
)

const caption = computed(() => {
  const n = P.value.n
  if (!P.value.here) return t('slicing-higher-dimensions.3d.none')
  return n === 2 ? t('slicing-higher-dimensions.3d.cap2') : n === 3 ? t('slicing-higher-dimensions.3d.cap3') : t('slicing-higher-dimensions.3d.cap4')
})
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span dir="ltr" class="num font-semibold" style="color: var(--accent)">r = √(R² − h²) = {{ fmt(P.r, 2) }} cm</span>
      <span style="color: var(--muted)">{{ caption }}</span>
      <span style="color: var(--muted)">{{ t('slicing-higher-dimensions.3d.note') }}</span>
    </div>
  </div>
</template>
