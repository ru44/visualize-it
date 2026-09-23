<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same three quarks as the 2D builder (q1..q3: 0 up +2/3, 1 down −1/3, 2 strange −1/3) and the same total
// charge, but coloured by sign instead of by slot: positive quarks glow like theme.pos, negative ones like
// theme.neg, and the shell's wireframe picks up whichever sign the total charge lands on. The flat picture
// can show the sum as a number; only a 3D shell can show three quarks actually sharing one confined volume.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const Q = [
  { charge: 2 / 3, mass: 2.2 },
  { charge: -1 / 3, mass: 4.7 },
  { charge: -1 / 3, mass: 95 },
]
const BASE = [0, 1, 2].map((i) => {
  const a = (i / 3) * Math.PI * 2 - Math.PI / 2
  return new THREE.Vector3(0.5 * Math.cos(a), 0.15 * (i - 1), 0.5 * Math.sin(a))
})
// per-quark jiggle phases/frequencies, fixed so motion is deterministic and needs no per-frame randomness
const JIG = [0, 1, 2].map((i) => ({ fx: 1.3 + i * 0.3, fy: 1.7 + i * 0.2, fz: 1.1 + i * 0.4, px: i * 2.1, py: i * 1.3, pz: i * 0.7 }))

useThree(
  el,
  ({ scene, theme }) => {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1.3, 32, 24), new THREE.MeshPhysicalMaterial({ color: theme.sunken, transparent: true, opacity: 0.16, roughness: 0.3, transmission: 0.4, side: THREE.DoubleSide }))
    scene.add(shell)
    const edge = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.3, 16, 10)), new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.5 }))
    scene.add(edge)

    const quarks = [0, 1, 2].map(() => new THREE.Mesh(new THREE.SphereGeometry(0.2, 22, 16), new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.35 })))
    quarks.forEach((m) => scene.add(m))
    scene.add(new THREE.PointLight(0xffffff, 30, 0, 1.4))

    const linkGeo = [0, 1, 2].map(() => new THREE.BufferGeometry())
    const linkMat = new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.06, gapSize: 0.05, transparent: true, opacity: 0.6 })
    const links = linkGeo.map((g) => new THREE.Line(g, linkMat))
    links.forEach((l) => scene.add(l))

    let picks = [0, 1, 2]
    const applyPicks = () => {
      picks = ['q1', 'q2', 'q3'].map((k, i) => Math.max(0, Math.min(2, Math.round(props.params[k] ?? [0, 0, 1][i]))))
      let total = 0
      for (let i = 0; i < 3; i++) {
        const q = Q[picks[i]]
        total += q.charge
        const mat = quarks[i].material as THREE.MeshStandardMaterial
        mat.color.copy(q.charge > 0 ? theme.pos : theme.neg)
        quarks[i].scale.setScalar(0.7 + 0.06 * Math.cbrt(q.mass))
      }
      const edgeMat = edge.material as THREE.LineBasicMaterial
      edgeMat.color.copy(total > 0.4 ? theme.pos : total < -0.4 ? theme.neg : theme.muted)
    }
    applyPicks()
    watch(() => [props.params.q1, props.params.q2, props.params.q3], applyPicks)

    const tmp = new THREE.Vector3()
    return (dt, t) => {
      shell.rotation.y += dt * 0.08
      edge.rotation.y = shell.rotation.y
      for (let i = 0; i < 3; i++) {
        const j = JIG[i]
        tmp.set(BASE[i].x + 0.16 * Math.sin(t * j.fx + j.px), BASE[i].y + 0.16 * Math.sin(t * j.fy + j.py), BASE[i].z + 0.16 * Math.sin(t * j.fz + j.pz))
        if (tmp.length() > 1.1) tmp.setLength(1.1)
        quarks[i].position.copy(tmp)
      }
      for (let i = 0; i < 3; i++) {
        links[i].geometry.setFromPoints([quarks[i].position, quarks[(i + 1) % 3].position])
        links[i].computeLineDistances()
      }
    }
  },
  { camera: [0, 1.6, 4.2], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
