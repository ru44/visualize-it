<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams } from '../../viz/geometry/elevenDimensionsModel'

// geometry/eleven-dimensions. Same params as the 2D picture. A long hose with an ant going round it at
// angle a (0 = on the side facing the camera). The camera distance follows D on a compressed scale: real
// distances would need an enormous scene, so the hose is made to look as thick as it would to the eye
// (a hairline once theta is below the eye's limit). The caption says so.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const RHO = 0.6 // radius of the hose in the scene

useThree(
  el,
  ({ scene, theme, camera, controls, renderer }) => {
    scene.background = new THREE.Color(0x05070d)
    camera.far = 3000
    camera.near = 1
    camera.updateProjectionMatrix()
    controls.enableZoom = false

    const hose = new THREE.Mesh(
      new THREE.CylinderGeometry(RHO, RHO, 1, 40, 1, false).rotateZ(Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 }),
    )
    scene.add(hose)

    // an ant: three body parts along the walking direction (x), legs as thin lines
    const ant = new THREE.Group()
    const mat = new THREE.MeshStandardMaterial({ color: 0xff9d2e, roughness: 0.6 })
    ;[
      [-0.26, 0.1],
      [0, 0.12],
      [0.28, 0.15],
    ].forEach(([x, r]) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat)
      m.position.set(x, 0.12, 0)
      ant.add(m)
    })
    const legs = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(
        [-0.1, 0, 0.1].flatMap((x) => [
          new THREE.Vector3(x, 0.1, -0.2),
          new THREE.Vector3(x, 0, -0.14),
          new THREE.Vector3(x, 0.1, 0.2),
          new THREE.Vector3(x, 0, 0.14),
        ]),
      ),
      new THREE.LineBasicMaterial({ color: 0xffd9a8 }),
    )
    ant.add(legs)
    scene.add(ant)

    const up = new THREE.Vector3(0, 1, 0)
    const dir = new THREE.Vector3()
    return () => {
      const { ratio, a } = P.value
      // on-screen thickness in pixels, exaggerated like the 2D picture: a hairline at the eye's limit,
      // growing with the logarithm of theta above it
      const T = ratio < 1 ? 1.5 + 2.5 * ratio : Math.min(4 + 16 * Math.log2(ratio), 200)
      const H = Math.max(renderer.domElement.clientHeight, 100)
      const d = Math.max(3.5, (RHO * H) / (T * Math.tan(Math.PI / 8)))
      const k = camera.aspect < 1.3 ? 1.5 : 1
      dir.copy(camera.position).sub(controls.target).normalize()
      camera.position.copy(controls.target).addScaledVector(dir, d * k)
      hose.scale.x = Math.max(60, d * 4)

      const rad = (a * Math.PI) / 180
      const n = new THREE.Vector3(0, Math.sin(rad), Math.cos(rad))
      ant.position.copy(n).multiplyScalar(RHO)
      ant.quaternion.setFromUnitVectors(up, n)
    }
  },
  { camera: [0, 2.5, 10], target: [0, 0, 0], fov: 45 },
)

const verdict = computed(() => t(P.value.sees2 ? 'eleven-dimensions.v2' : 'eleven-dimensions.v1'))
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span class="font-semibold" :style="{ color: P.sees2 ? 'var(--pos)' : 'var(--accent-2)' }">{{ verdict }}</span>
      <span dir="ltr" class="num" style="color: var(--accent)">θ = {{ fmt(P.theta * 1000, 2) }} / 1000 · D = {{ fmt(P.D, 1) }} m</span>
      <span style="color: var(--muted)">{{ t('eleven-dimensions.3d.exag') }} {{ t('eleven-dimensions.3d.scale') }}</span>
    </div>
  </div>
</template>
