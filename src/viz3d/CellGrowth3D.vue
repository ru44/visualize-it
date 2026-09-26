<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from './useThree'

// Same model as src/viz/CellSize.vue: a sphere of radius r (µm) can only be fed by diffusion to a
// depth d = 200/√activity µm. The 2D picture can only show a flat cross-section, where a starved
// core of radius (r-d) looks like it covers an AREA fraction ((r-d)/r)². The real cell is a solid:
// that same core is a VOLUME fraction ((r-d)/r)³ — bigger than the flat slice makes it look. This
// scene renders the actual solid sphere so the true volume, not a slice of it, is what you see.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const D0 = 200

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(8, theme))
    const geo = new THREE.SphereGeometry(1, 40, 28)
    const outer = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: theme.accent, transparent: true, opacity: 0.42, roughness: 0.3, metalness: 0, side: THREE.DoubleSide }))
    outer.castShadow = true
    scene.add(outer)
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: theme.fg, wireframe: true, transparent: true, opacity: 0.35 }))
    outer.add(wire)
    const core = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.6 }))
    core.castShadow = true
    scene.add(core)

    return (dt) => {
      const r = Math.max(1, props.params.r ?? 50)
      const activity = Math.max(0.1, props.params.activity ?? 1)
      const d = D0 / Math.sqrt(activity)
      const coreFrac = Math.max(0, (r - d) / r)
      // Square-root world scale: a 1 µm bacterium and a 1000 µm egg cell both fit on screen; only
      // the ratio between outer and core is the real physics (matches CellSize.vue exactly).
      const worldR = 0.3 + 2.3 * Math.sqrt(r / 1000)
      outer.scale.setScalar(worldR)
      outer.position.y = worldR
      core.visible = coreFrac > 0.01
      core.scale.setScalar(worldR * coreFrac)
      core.position.y = worldR
      ;(core.material as THREE.MeshStandardMaterial).color = coreFrac > 0.01 ? theme.neg : theme.pos
      outer.rotation.y += dt * 0.15
      core.rotation.y += dt * 0.15
    }
  },
  { camera: [5, 3.5, 6], target: [0, 1, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
