<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams, unitSpiral } from '../../viz/geometry/distanceInAnyDimensionModel'

// geometry/distance-in-any-dimension. Same params as the 2D picture. For n up to 3 a box with sides a: three
// coloured legs walk along its edges and a white line goes straight across. For n above 3 the box stays, and
// standing on the end of its diagonal the further legs are drawn as the same fan of right triangles, each new
// leg at a right angle to the line so far. Sizes are scaled to fit, a small a is drawn smaller.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const hex = (c: THREE.Color) => '#' + c.getHexString()
const MAXLEG = 11

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

    const grp = new THREE.Group()
    scene.add(grp)
    const cols = [theme.accent, theme.accent2, theme.pos, theme.neg]
    const up = new THREE.Vector3(0, 1, 0)
    const cyl = new THREE.CylinderGeometry(1, 1, 1, 10)
    const mk = (color: THREE.Color, r: number, opacity = 1) => {
      const m = new THREE.Mesh(cyl, new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity }))
      m.userData.r = r
      grp.add(m)
      return m
    }
    const seg = (m: THREE.Mesh, A: THREE.Vector3, B: THREE.Vector3) => {
      const d = B.clone().sub(A)
      const len = d.length()
      m.visible = len > 1e-6
      if (!m.visible) return
      m.position.copy(A).add(B).multiplyScalar(0.5)
      m.quaternion.setFromUnitVectors(up, d.normalize())
      m.scale.set(m.userData.r, len, m.userData.r)
    }
    const legs = Array.from({ length: MAXLEG }, (_, i) => mk(cols[i % 4], 0.06))
    const radials = Array.from({ length: MAXLEG }, () => mk(theme.muted, 0.025, 0.7))
    const final = mk(theme.fg, 0.09)

    const box = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
      new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.55 }),
    )
    grp.add(box)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), new THREE.MeshBasicMaterial({ color: theme.fg }))
    grp.add(dot)
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), new THREE.MeshBasicMaterial({ color: theme.accent }))
    grp.add(tip)
    const tagA = label(t('distance-in-any-dimension.3d.a'), hex(theme.accent), 0.7)
    const tagD = label(t('distance-in-any-dimension.3d.d'), hex(theme.fg), 0.8)
    scene.add(tagA, tagD)

    const D = new THREE.Vector3(1, 1, 1).normalize()
    const W = up
      .clone()
      .sub(D.clone().multiplyScalar(up.dot(D)))
      .normalize()
    let key = ''
    return () => {
      fit()
      const { n, a } = P.value
      const k = `${n}|${a}`
      if (k === key) return
      key = k
      const s = (5 / Math.sqrt(Math.max(n, 3))) * (0.4 + (0.6 * (a - 1)) / 9)
      box.scale.setScalar(s)
      box.position.setScalar(s / 2)
      // the points: the box legs go east, north, up; further points sit on a fan around the diagonal
      const pts: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(s, 0, 0), new THREE.Vector3(s, 0, s), new THREE.Vector3(s, s, s)]
      if (n > 3) {
        const { r, ang } = unitSpiral(n)
        for (let q = 4; q <= n; q++) {
          const phi = ang[q - 1] - ang[2]
          pts.push(
            D.clone()
              .multiplyScalar(Math.cos(phi))
              .add(W.clone().multiplyScalar(Math.sin(phi)))
              .multiplyScalar(s * r[q - 1]),
          )
        }
      }
      for (let i = 0; i < MAXLEG; i++) {
        legs[i].visible = i < n
        if (i < n) seg(legs[i], pts[i], pts[i + 1])
        const on = i + 1 >= 2 && i + 1 < n
        radials[i].visible = on
        if (on) seg(radials[i], pts[0], pts[i + 1])
      }
      seg(final, pts[0], pts[n])
      tip.position.copy(pts[n])
      // fit: the bounding sphere of the box and the points fills about 70 % of the lower part of the view
      const bb = new THREE.Box3()
      bb.expandByPoint(new THREE.Vector3(0, 0, 0)).expandByPoint(new THREE.Vector3(s, s, s))
      pts.forEach((q) => bb.expandByPoint(q))
      const sph = bb.getBoundingSphere(new THREE.Sphere())
      const f = 3.4 / Math.max(sph.radius, 1e-6)
      grp.scale.setScalar(f)
      const want = controls.target.clone().add(new THREE.Vector3(0, -1.6, 0))
      grp.position.copy(want).sub(sph.center.clone().multiplyScalar(f))
      grp.updateMatrixWorld(true)
      tagA.position.copy(grp.localToWorld(new THREE.Vector3(s / 2, -0.5 / f, 0)))
      tagD.position.copy(
        grp.localToWorld(
          pts[0]
            .clone()
            .add(pts[n])
            .multiplyScalar(0.5)
            .add(new THREE.Vector3(-0.1, 0.45 / f, 0)),
        ),
      )
    }
  },
  { camera: [-11.5, 7.5, 12.1], target: [0.3, 3.4, 0.3], fov: 45 },
)

const info = computed(() => t('distance-in-any-dimension.3d.line1', { d: fmt(P.value.d, 3), e: fmt(P.value.edges, 1) }))
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span class="num font-semibold" style="color: var(--accent)">{{ info }}</span>
      <span style="color: var(--muted)">{{ P.n > 3 ? t('distance-in-any-dimension.3d.fan') : t('distance-in-any-dimension.3d.box') }}</span>
    </div>
  </div>
</template>
