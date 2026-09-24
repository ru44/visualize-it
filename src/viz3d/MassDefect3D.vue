<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// physics/mass-defect. Same binding-energy formula as src/viz/MassDefect.vue (see its comment for
// why light nuclei use real measured values). The flat balance scale can only show a static
// before/after; this scene plays the event itself — Z+N separate nucleons flying together from open
// space into a packed nucleus, releasing a flash sized by the missing mass turned to energy — on a
// loop, since a real nucleus only forms once.
const U_MEV = 931.5
const A_V = 15.75, A_S = 17.8, A_C = 0.711, A_A = 23.7, A_P = 12.0
const LIGHT: Record<string, number> = { '1,0': 0, '1,1': 2.224, '1,2': 8.482, '2,1': 7.718, '2,2': 28.296 }
function bindingMeV(Z: number, N: number): number {
  const key = `${Z},${N}`
  if (key in LIGHT) return LIGHT[key]
  const A = Z + N
  if (A < 1) return 0
  const pair = Z % 2 === 0 && N % 2 === 0 ? A_P / Math.sqrt(A) : Z % 2 === 1 && N % 2 === 1 ? -A_P / Math.sqrt(A) : 0
  const val = A_V * A - A_S * Math.pow(A, 2 / 3) - (A_C * Z * (Z - 1)) / Math.pow(A, 1 / 3) - (A_A * (A - 2 * Z) ** 2) / A + pair
  return Math.max(0, val)
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const N_MAX = 26
const R0 = 1.2
const SCALE = 0.42
const GOLDEN = Math.PI * (3 - Math.sqrt(5))
const PERIOD = 6
const FLY = 2.6

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(15, Math.min(28, Math.floor(400 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.IcosahedronGeometry(0.16, 1)
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.45 })
    const inst = new THREE.InstancedMesh(geo, mat, N_MAX)
    scene.add(inst)
    const flash = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, opacity: 0 }))
    scene.add(flash)
    const tag = label('', theme.fg.getStyle(), 0.36)
    tag.position.set(0, 1.9, 0)
    scene.add(tag)
    const m4 = new THREE.Matrix4()
    const col = new THREE.Color()
    const cur = new THREE.Vector3()

    let scatter: THREE.Vector3[] = []
    let packed: THREE.Vector3[] = []
    let kinds: ('p' | 'n')[] = []
    let n = 0
    let ebVal = 0
    let dmVal = 0
    let lastKey = ''
    function rebuild() {
      const Z = Math.max(1, Math.min(12, Math.round(props.params.Z ?? 2)))
      const N = Math.max(0, Math.min(14, Math.round(props.params.N ?? 2)))
      const key = `${Z},${N}`
      if (key === lastKey) return
      lastKey = key
      n = Math.min(N_MAX, Z + N)
      ebVal = bindingMeV(Z, N)
      dmVal = ebVal / U_MEV
      const A = Z + N
      const R = Math.max(0.35, R0 * Math.cbrt(A) * SCALE)
      scatter = []
      packed = []
      kinds = []
      for (let i = 0; i < n; i++) {
        const theta = i * GOLDEN
        const y = 1 - (2 * (i + 0.5)) / n
        const rad = Math.sqrt(Math.max(0, 1 - y * y))
        scatter.push(new THREE.Vector3(2.6 * rad * Math.cos(theta), 1.4 + 2.6 * y, 2.6 * rad * Math.sin(theta)))
        const r = R * Math.cbrt((i + 0.5) / n)
        packed.push(new THREE.Vector3(r * rad * Math.cos(theta), 1.4 + r * y, r * rad * Math.sin(theta)))
        kinds.push(i < Z ? 'p' : 'n')
      }
      for (let i = 0; i < n; i++) {
        col.copy(kinds[i] === 'p' ? theme.accent2 : theme.accent)
        inst.setColorAt(i, col)
      }
      m4.makeScale(0, 0, 0)
      for (let i = n; i < N_MAX; i++) inst.setMatrixAt(i, m4)
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true
      flash.position.set(0, 1.4, 0)
    }
    rebuild()
    watch(() => [props.params.Z, props.params.N], rebuild)

    let simT = 0
    return (dt: number) => {
      simT += dt
      const loopT = simT % PERIOD
      const flyP = Math.min(1, loopT / FLY)
      const eased = 1 - Math.pow(1 - flyP, 3)
      for (let i = 0; i < n; i++) {
        cur.lerpVectors(scatter[i], packed[i], eased)
        m4.makeTranslation(cur.x, cur.y, cur.z)
        inst.setMatrixAt(i, m4)
      }
      inst.instanceMatrix.needsUpdate = true

      const age = loopT - FLY
      if (age >= 0 && age < 1.4) {
        const p = age / 1.4
        const r = 0.18 + Math.cbrt(Math.max(0.01, ebVal)) * 0.11
        flash.scale.setScalar(r * (1 + p * 3.2))
        ;(flash.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - p)
      } else {
        ;(flash.material as THREE.MeshBasicMaterial).opacity = 0
      }
      paint(tag, t('viz3d.mass.readout', { e: fmt(ebVal, 1), d: fmt(dmVal, 3) }), theme.fg)
    }
  },
  { camera: [3.2, 2.6, 3.6], target: [0, 1.2, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
