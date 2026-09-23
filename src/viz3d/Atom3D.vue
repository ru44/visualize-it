<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { elements } from '../viz/elements'
import { t } from '../i18n'

// The nucleus with electron shells at their real relative sizes: shell n sits at roughly n² times the
// first shell's radius, not spaced evenly like the flat diagram. Electrons still fill 2, 8, 8, 2 as Z
// grows — same rule, same numbers as the 2D picture — but here they sit on the surface of each shell.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const CAPS = [2, 8, 8, 2]
const SPEED = [0.4, -0.28, 0.2, -0.15]
const R1 = 0.55 // radius of shell 1; shell n sits at R1 · n²

function shellConfig(z: number): number[] {
  let remaining = z
  const config: number[] = []
  for (const cap of CAPS) {
    if (remaining <= 0) break
    const fill = Math.min(cap, remaining)
    config.push(fill)
    remaining -= fill
  }
  return config
}

function fibonacciDirs(n: number): THREE.Vector3[] {
  return Array.from({ length: n }, (_, i) => {
    const yv = n > 1 ? 1 - (2 * i) / (n - 1) : 0
    const r = Math.sqrt(Math.max(0, 1 - yv * yv))
    const ang = i * 2.399963
    return new THREE.Vector3(Math.cos(ang) * r, yv, Math.sin(ang) * r)
  })
}

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }))
    scene.add(nucleus)
    const tag = label('', undefined, 0.6)
    scene.add(tag)

    const shellGeo = new THREE.SphereGeometry(0.09, 10, 8)
    const innerMat = new THREE.MeshStandardMaterial({ color: theme.accent })
    const valenceMat = new THREE.MeshStandardMaterial({ color: theme.accent2 })
    const dirs = CAPS.map((c) => fibonacciDirs(c))
    const insts = CAPS.map((c) => {
      const inst = new THREE.InstancedMesh(shellGeo, innerMat, c)
      scene.add(inst)
      return inst
    })
    const wires = CAPS.map(() => {
      const w = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 20, 14)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.45 }))
      scene.add(w)
      return w
    })
    const m4 = new THREE.Matrix4()

    let lastZ = -1
    let lastN = -1
    function rebuild() {
      const Z = Math.round(Math.min(20, Math.max(1, props.params.Z ?? 11)))
      const N = Math.round(Math.min(24, Math.max(0, props.params.N ?? 12)))
      if (Z === lastZ && N === lastN) return
      lastZ = Z
      lastN = N
      const config = shellConfig(Z)
      const A = Z + N
      nucleus.scale.setScalar(0.22 + Math.cbrt(Math.max(1, A)) * 0.09)
      const sym = elements[Z - 1]?.s ?? '?'
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '600 40px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(`${sym}-${A}`, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true

      for (let s = 0; s < CAPS.length; s++) {
        const n = s + 1
        const r = R1 * n * n
        const count = config[s] ?? 0
        const inst = insts[s]!
        inst.count = count
        inst.material = s === config.length - 1 ? valenceMat : innerMat
        for (let i = 0; i < count; i++) {
          const d = dirs[s]![i]!
          m4.makeTranslation(d.x * r, d.y * r, d.z * r)
          inst.setMatrixAt(i, m4)
        }
        inst.instanceMatrix.needsUpdate = true
        wires[s]!.visible = count > 0
        wires[s]!.scale.setScalar(r)
      }
      const outerR = Math.max(1.2, R1 * config.length * config.length)
      tag.position.set(0, outerR + 0.8, 0)
      controls.target.set(0, 0, 0)
      camera.position.set(outerR * 1.1, outerR * 0.75, outerR * 1.3)
    }
    rebuild()
    watch(() => [props.params.Z, props.params.N], rebuild)

    return (dt) => {
      for (let s = 0; s < insts.length; s++) insts[s]!.rotation.y += dt * SPEED[s]!
    }
  },
  { camera: [3, 2.5, 4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <p class="num pointer-events-none absolute inset-x-2 top-2 text-center text-[11px]" style="color: var(--muted)">{{ t('viz3d.atom.note') }}</p>
  </div>
</template>
