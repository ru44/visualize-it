<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// content/lessons/waves/polarisation. Same I1 = I0/2, I2 = I1*cos^2(theta) as the 2D picture, which
// can only show the field's direction as a flat, rotated line on the page. Light travels along X
// here; the field is a real vector in the Y-Z plane perpendicular to it, and this scene draws that
// full plane directly — many random directions before filter 1, one direction after it, and a
// shorter vector at angle theta after filter 2 — something a single flat page cannot show at once.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const F1X = -1.6
const F2X = 1.6
const N = 22
const GOLDEN = 137.5 * (Math.PI / 180)

useThree(
  el,
  ({ scene, theme }) => {
    const mkFilter = (color: THREE.Color) => {
      const g = new THREE.Group()
      const disk = new THREE.Mesh(new THREE.CircleGeometry(1.1, 28), new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.16, side: THREE.DoubleSide }))
      disk.rotation.y = Math.PI / 2
      g.add(disk)
      for (let i = -2; i <= 2; i++) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 2.1, 0.05), new THREE.MeshStandardMaterial({ color }))
        bar.position.set(0, 0, i * 0.22)
        g.add(bar)
      }
      scene.add(g)
      return g
    }
    const f1 = mkFilter(theme.fg)
    f1.position.x = F1X
    const f2 = mkFilter(theme.accent2)
    f2.position.x = F2X

    const axisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)]), new THREE.LineDashedMaterial({ color: theme.line, dashSize: 0.15, gapSize: 0.1 }))
    axisLine.computeLineDistances()
    scene.add(axisLine)

    const xs = Array.from({ length: N }, (_, i) => -4 + (8 * i) / (N - 1))
    const fields = xs.map((x) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: theme.accent }))
      scene.add(line)
      return { x, line, geo }
    })

    let clock = 0
    return (dt) => {
      const theta = ((props.params.theta ?? 90) * Math.PI) / 180
      clock += dt
      f2.rotation.x = theta

      fields.forEach((fl, i) => {
        let angle: number
        let amp: number
        if (fl.x < F1X) {
          angle = i * GOLDEN
          amp = 0.85
        } else if (fl.x < F2X) {
          angle = 0
          amp = 0.85
        } else {
          angle = theta
          amp = 0.85 * Math.abs(Math.cos(theta))
        }
        const osc = amp * Math.sin(clock * 2.4 - fl.x * 0.9)
        const y = Math.cos(angle) * osc
        const z = Math.sin(angle) * osc
        const pos = fl.geo.attributes.position as THREE.BufferAttribute
        pos.setXYZ(0, fl.x, -y, -z)
        pos.setXYZ(1, fl.x, y, z)
        pos.needsUpdate = true
      })
    }
  },
  { camera: [3.2, 2.6, 6.5], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
