<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { readParams } from '../../viz/geometry/whatIsADimensionModel'

// geometry/what-is-a-dimension. Same params as the 2D picture. A transparent box with three coloured axes
// (east, north, height). The small sphere sits at (x, y, z) using only the first n coordinates; dashed guide
// lines read off each number. When n is 1 only the first axis is bright, when n is 2 the first two.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))

const S = 0.8 // scene units per number
const hex = (c: THREE.Color) => '#' + c.getHexString()

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    let wide: boolean | null = null
    const fit = () => {
      const w = camera.aspect >= 1.3
      if (w === wide) return
      if (!w) camera.position.sub(controls.target).multiplyScalar(1.5).add(controls.target)
      else if (wide !== null)
        camera.position
          .sub(controls.target)
          .multiplyScalar(1 / 1.5)
          .add(controls.target)
      wide = w
    }

    // the box: faint edges and a floor
    const box = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(10 * S, 10 * S, 10 * S)),
      new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.45 }),
    )
    box.position.set(5 * S, 5 * S, 5 * S)
    scene.add(box)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10 * S, 10 * S),
      new THREE.MeshBasicMaterial({ color: theme.sunken, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.set(5 * S, 0, 5 * S)
    scene.add(floor)

    // axes: x east (scene X), y north (scene Z), z height (scene Y)
    const cols = [theme.accent, theme.pos, theme.accent2]
    const dirs = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0)]
    const axes = dirs.map((d, i) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 10 * S, 12), new THREE.MeshBasicMaterial({ color: cols[i], transparent: true }))
      m.position.copy(d.clone().multiplyScalar(5 * S))
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d)
      scene.add(m)
      return m
    })
    const words = [t('what-is-a-dimension.3d.x'), t('what-is-a-dimension.3d.y'), t('what-is-a-dimension.3d.z')]
    const names = words.map((w, i) => {
      const s = label(w, hex(cols[i]), 0.7)
      s.position.copy(dirs[i].clone().multiplyScalar(10.9 * S))
      scene.add(s)
      return s
    })

    // the thing
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 28, 20), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.4 }))
    scene.add(ball)
    const tag = label(t('what-is-a-dimension.3d.thing'), hex(theme.fg), 0.7)
    scene.add(tag)

    // dashed guides: up from the floor, along the floor to both axes
    const pos = new THREE.BufferAttribute(new Float32Array(18), 3)
    const gg = new THREE.BufferGeometry()
    gg.setAttribute('position', pos)
    const guides = new THREE.LineSegments(gg, new THREE.LineDashedMaterial({ color: theme.fg, dashSize: 0.18, gapSize: 0.12 }))
    guides.frustumCulled = false
    scene.add(guides)

    return () => {
      fit()
      const { n, x, y, z } = P.value
      const X = x * S
      const Z = y * S
      const Y = z * S
      ball.position.set(X, Y, Z)
      tag.position.set(X, Y + 0.75, Z)
      axes.forEach((a, i) => ((a.material as THREE.MeshBasicMaterial).opacity = i < n ? 1 : 0.15))
      names.forEach((s, i) => (s.material.opacity = i < n ? 1 : 0.25))
      const seg: number[][] = [
        [X, Y, Z, X, 0, Z],
        [X, 0, Z, X, 0, 0],
        [X, 0, Z, 0, 0, Z],
      ]
      seg.forEach((s, i) => {
        pos.setXYZ(i * 2, s[0], s[1], s[2])
        pos.setXYZ(i * 2 + 1, s[3], s[4], s[5])
      })
      pos.needsUpdate = true
      gg.setDrawRange(0, 6)
      guides.computeLineDistances()
    }
  },
  { camera: [18, 12, 21], target: [4, 6.5, 4], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span dir="ltr" class="num font-semibold" style="color: var(--accent)">{{ P.address }}</span>
      <span style="color: var(--fg)">{{ t('what-is-a-dimension.3d.need', { n: P.n }) }}</span>
      <span style="color: var(--muted)">{{ t('what-is-a-dimension.3d.note') }}</span>
    </div>
  </div>
</template>
