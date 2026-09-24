<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from './useThree'

// The lopsided L-tile from the 2D picture, extruded once and reused as five copies that share one
// geometry: the dashed original, three single-operation ghosts (translate only, rotate only, reflect
// only) and the fully combined solid tile — flip, then rotate, then translate, the exact order the
// 2D view uses, reproduced here through THREE's own scale→rotate→translate composition so the
// numbers agree exactly (rotation.y = −θ and scale.x = −1 for a flip give precisely x' = x cosθ −
// y sinθ, y' = x sinθ + y cosθ with local y mapped to world z). The mirror plane (world x = 0, the
// plane flip acts across) and the rotation axis (the vertical line through O) are drawn as real 3D
// objects orbiting the camera can walk around — something the flat page can only gesture at with a
// dashed line and a dot.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const LOCAL = [
  { x: 1, y: -3 },
  { x: 3, y: -3 },
  { x: 3, y: -2 },
  { x: 2, y: -2 },
  { x: 2, y: -1 },
  { x: 1, y: -1 },
]

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(14, theme))

    const shape = new THREE.Shape(LOCAL.map((p) => new THREE.Vector2(p.x, -p.y)))
    const tileGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.45, bevelEnabled: false })
    tileGeo.rotateX(-Math.PI / 2) // footprint (x, z) now equals LOCAL (x, y) exactly; thickness runs along +y
    const edges = new THREE.EdgesGeometry(tileGeo)

    const ghost = (color: THREE.Color) => {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(tileGeo, new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.22, roughness: 0.8 })))
      g.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 })))
      scene.add(g)
      return g
    }
    ghost(theme.muted) // stays at rest — the original, un-transformed tile
    const tGhost = ghost(theme.pos) // translation alone
    const rGhost = ghost(theme.accent2) // rotation alone, about O
    const fGhost = ghost(theme.neg) // reflection alone, across the mirror plane
    fGhost.scale.x = -1

    const main = new THREE.Group()
    const mainMesh = new THREE.Mesh(tileGeo, new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.55 }))
    mainMesh.castShadow = true
    main.add(mainMesh, new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: theme.fg })))
    scene.add(main)

    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(9, 4), new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.08, side: THREE.DoubleSide }))
    mirror.rotation.y = Math.PI / 2 // the x = 0 plane, spanned by up (y) and depth (z)
    mirror.position.y = 2
    scene.add(mirror)

    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 65 }, (_, i) => new THREE.Vector3(3.6 * Math.cos((i / 64) * Math.PI * 2), 0.01, 3.6 * Math.sin((i / 64) * Math.PI * 2)))),
      new THREE.LineBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.35 }),
    )
    scene.add(ring)
    const axis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(0, 4, 0)]), new THREE.LineBasicMaterial({ color: theme.accent2 }))
    scene.add(axis)

    const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), new THREE.MeshStandardMaterial({ color: theme.fg }))
    scene.add(pivot)

    return () => {
      const angleDeg = (((props.params.angle ?? 40) % 360) + 360) % 360
      const rad = (angleDeg * Math.PI) / 180
      const tx = Math.min(3, Math.max(-3, props.params.tx ?? 1.5))
      const ty = Math.min(3, Math.max(-3, props.params.ty ?? 0.5))
      const flip = (props.params.flip ?? 0) >= 0.5

      tGhost.position.set(tx, 0, ty)
      rGhost.rotation.y = -rad

      main.scale.x = flip ? -1 : 1
      main.rotation.y = -rad
      main.position.set(tx, 0, ty)
      ;(mirror.material as THREE.MeshBasicMaterial).opacity = flip ? 0.22 : 0.07
    }
  },
  { camera: [9, 7, 11], target: [1, 1, 1] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
