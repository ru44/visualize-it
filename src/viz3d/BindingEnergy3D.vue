<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'
import { elements } from '../viz/elements'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// physics/binding-energy. Packs A nucleons into a sphere of radius r0*A^(1/3) (r0 = 1.2 fm, scaled to
// scene units), the same real formula behind the nuclear radius. Positions fill the volume evenly (a
// Fibonacci-sphere radial fill), so as A grows the surface — where a nucleon has fewer "glue" neighbours
// within the strong force's short reach — becomes a shrinking fraction of the whole, exactly the
// surface term that pulls the 2D curve down for small A. Short white lines only join genuinely nearby
// pairs, standing in for that short-range glue; nucleons are coloured by how many such bonds they have,
// so surface nucleons visibly dim. Large A samples a representative subset (never more than N_MAX)
// rather than every nucleon, for triangle budget; the readouts always use the real A, Z, N.
const A_V = 15.75, A_S = 17.8, A_C = 0.711, A_A = 23.7
const A_MIN = 2, A_MAX = 240
const N_MAX = 130
const R0 = 1.2 // fm
const SCALE = 0.34 // scene units per fm
const GOLDEN = Math.PI * (3 - Math.sqrt(5))

function stableZ(A: number): number {
  return Math.max(1, Math.min(A - 1, Math.round(A / (2 + 0.015 * Math.pow(A, 2 / 3)))))
}
function beOverA(A: number): number {
  const Z = stableZ(A)
  const term = A_V * A - A_S * Math.pow(A, 2 / 3) - (A_C * Z * (Z - 1)) / Math.pow(A, 1 / 3) - (A_A * (A - 2 * Z) ** 2) / A
  return Math.max(0, term) / A
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const stats = ref('')
const idTag = ref('')

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    const group = new THREE.Group()
    scene.add(group)
    const geo = new THREE.IcosahedronGeometry(0.22, 0)
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.5 })
    const inst = new THREE.InstancedMesh(geo, mat, N_MAX)
    group.add(inst)
    const bonds = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.35 }))
    group.add(bonds)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()

    let lastA = -1
    function rebuild() {
      const A = Math.max(A_MIN, Math.min(A_MAX, Math.round(props.params.A ?? 12)))
      if (A === lastA) return
      lastA = A
      const Z = stableZ(A)
      const N = A - Z
      const n = Math.min(A, N_MAX)
      const R = R0 * Math.cbrt(A) * SCALE

      const pos: THREE.Vector3[] = []
      for (let i = 0; i < n; i++) {
        const frac = (i + 0.5) / n
        const r = R * Math.cbrt(frac)
        const y = 1 - 2 * frac
        const rad = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = i * GOLDEN
        pos.push(new THREE.Vector3(r * rad * Math.cos(theta), r * y, r * rad * Math.sin(theta)))
      }
      // neighbour count within a spacing-scaled cutoff — the short-range "glue"
      const cutoff = (1.7 * R) / Math.cbrt(n || 1)
      const neigh = new Array(n).fill(0)
      const bondPts: number[] = []
      for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
          const d = pos[i].distanceTo(pos[j])
          if (d < cutoff) {
            neigh[i]++
            neigh[j]++
            if (d < cutoff * 0.72) bondPts.push(pos[i].x, pos[i].y, pos[i].z, pos[j].x, pos[j].y, pos[j].z)
          }
        }
      const maxNeigh = Math.max(1, ...neigh)
      let surface = 0
      for (let i = 0; i < n; i++) {
        const bound = neigh[i] / maxNeigh
        if (bound < 0.5) surface++
        col.copy(theme.muted).lerp(theme.accent, bound)
        inst.setColorAt(i, col)
        m4.makeTranslation(pos[i].x, pos[i].y, pos[i].z)
        inst.setMatrixAt(i, m4)
      }
      for (let i = n; i < N_MAX; i++) inst.setMatrixAt(i, m4.makeScale(0, 0, 0))
      inst.count = N_MAX
      inst.instanceMatrix.needsUpdate = true
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      bonds.geometry.setAttribute('position', new THREE.Float32BufferAttribute(bondPts, 3))

      const sym = elements[Z - 1]?.s ?? `Z${Z}`
      idTag.value = `${sym}-${A}`
      const dist = Math.max(2.4, R * 2.6)
      camera.position.set(dist, dist * 0.7, dist)
      controls.target.set(0, 0, 0)
      stats.value = t('viz3d.binding.stats', { z: String(Z), n: String(N), eba: fmt(beOverA(A), 2), surf: String(Math.round((100 * surface) / n)) })
    }
    rebuild()
    watch(() => props.params.A, rebuild)

    return (dt: number) => {
      group.rotation.y += dt * 0.15
    }
  },
  { camera: [4, 3, 4], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <p class="num pointer-events-none absolute inset-x-2 top-2 text-center text-[11px]" style="color: var(--muted)">{{ t('viz3d.binding.note') }}</p>
    <p class="num pointer-events-none absolute inset-x-2 top-6 text-center text-lg font-semibold" style="color: var(--fg)">{{ idTag }}</p>
    <p class="num pointer-events-none absolute inset-x-2 top-12 text-center text-[11px]" style="color: var(--muted)">{{ stats }}</p>
  </div>
</template>
