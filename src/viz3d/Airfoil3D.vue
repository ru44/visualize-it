<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow } from './useThree'
import { loadModel, fit } from './models'

// An aircraft pitched to the angle of attack in a stream of air particles; lift and drag arrows scale with
// the same simple model as the 2D airfoil (C_L linear to 15°, then stall). params alpha (deg), v (m/s).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

useThree(
  el,
  ({ scene, theme }) => {
    const craft = new THREE.Group()
    scene.add(craft)
    // Fallback: a simple wing-and-body shape.
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 3, 8, 16), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }))
    body.rotation.z = Math.PI / 2
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 5), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
    craft.add(body, wing)
    loadModel('airplane').then((m) => m && ((body.visible = wing.visible = false), craft.add(fit(m, 7))))
    const lift = arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, theme.pos)
    const drag = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent2)
    scene.add(lift, drag)
    // Air: streaks flowing along −X → they move from +X to −X past the craft (craft flies toward −X? keep air flowing toward −X).
    const N = 400
    const pts = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) pts.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 8 + 1, (Math.random() - 0.5) * 10], i * 3)
    const air = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)), new THREE.PointsMaterial({ color: theme.muted, size: 0.06 }))
    scene.add(air)
    const grid = new THREE.GridHelper(30, 30, theme.line, theme.grid)
    grid.position.y = -3
    scene.add(grid)
    return (dt) => {
      const a = props.params.alpha ?? 5
      const v = props.params.v ?? 50
      const CL = a <= 15 ? 0.11 * (a + 2) : Math.max(0.3, 1.87 - 0.19 * (a - 15))
      const CD = 0.02 + (CL * CL) / (Math.PI * 7 * 0.85) + (a > 15 ? 0.35 * Math.min(1, (a - 15) / 5) : 0)
      craft.rotation.z = (a * Math.PI) / 180 // nose up
      const q = 0.5 * 1.225 * v * v * 16
      lift.position.set(0, 1, 0)
      lift.setLength(Math.min(6, (q * CL) / 12000) + 0.2, 0.4, 0.25)
      drag.position.set(0, 1, 0)
      drag.setDirection(new THREE.Vector3(-1, 0, 0))
      drag.setLength(Math.min(6, (q * CD) / 12000) + 0.2, 0.4, 0.25)
      // air streams past toward −X; above the wing it is nudged down behind the craft (downwash) and gets turbulent when stalled
      const p = air.geometry.attributes.position as THREE.BufferAttribute
      const stalled = a > 15
      for (let i = 0; i < N; i++) {
        let x = p.getX(i) - dt * (2 + v / 20)
        let y = p.getY(i)
        const z = p.getZ(i)
        if (x < 0 && x > -6 && Math.abs(z) < 3) y -= dt * CL * 0.6 * (y > 0 ? 1 : 0.3)
        if (stalled && x < 0.5 && x > -5 && y > 0 && y < 2.5 && Math.abs(z) < 3) y += (Math.random() - 0.5) * dt * 6
        if (x < -12) (x = 12), (y = (Math.random() - 0.5) * 8 + 1)
        p.setXYZ(i, x, y, z)
      }
      p.needsUpdate = true
    }
  },
  { camera: [5, 3, 10], target: [0, 0.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
