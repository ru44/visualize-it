<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { fmt } from '../engine/math'
import { t } from '../i18n'

// nuclear/nuclear-fission. Same params (speed km/s, time 0..100 %) and same SLOW_MAX / phase
// breakpoints as src/viz/Fission.vue, so both views agree. Here the nucleus is a ball of nucleons
// (a stand-in for the 236 in U-236*) that stretches along one axis and splits into an unequal pair
// of clusters (heavier/slower, lighter/faster — momentum conservation), something the flat picture
// can only fake with two circles. A fast neutron just grazes the ball and flies off instead.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const N = 40
const HEAVY_N = 24
const R0 = 0.55
const RAD = 0.075
const SLOW_MAX = 5000

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
function ballPoints(n: number, seed: number) {
  const rnd = makeRng(seed)
  const pts: THREE.Vector3[] = []
  while (pts.length < n) {
    const x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = rnd() * 2 - 1
    if (x * x + y * y + z * z <= 1) pts.push(new THREE.Vector3(x, y, z).multiplyScalar(R0))
  }
  return pts.sort((a, b) => a.x - b.x)
}
const clamp01 = (u: number) => Math.max(0, Math.min(1, u))
const smooth = (a: number, b: number, x: number) => { const u = clamp01((x - a) / (b - a)); return u * u * (3 - 2 * u) }
const lerpV = (a: THREE.Vector3, b: THREE.Vector3, u: number) => a.clone().lerp(b, u)

const BASE = ballPoints(N, 20260214)
const EJECT_DIRS = [new THREE.Vector3(1, 0.6, -0.7).normalize(), new THREE.Vector3(-0.4, -1, 0.6).normalize(), new THREE.Vector3(0.6, -0.4, 1).normalize()]

function paintLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 24px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.SphereGeometry(RAD, 10, 8)
    const mat = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.15 })
    const inst = new THREE.InstancedMesh(geo, mat, N)
    inst.castShadow = true
    scene.add(inst)
    const nmat = new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.3 })
    const incoming = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), nmat)
    scene.add(incoming)
    const ejected = Array.from({ length: 3 }, () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), nmat); m.visible = false; scene.add(m); return m })
    const grid = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(R0 * 1.05, 10, 8)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.25 }))
    scene.add(grid)
    const tag = label('', theme.pos.getStyle(), 0.3)
    scene.add(tag)
    const m4 = new THREE.Matrix4()
    const v3 = new THREE.Vector3()

    let lastKey = ''
    return () => {
      const speed = Math.max(0, Math.min(20000, props.params.speed ?? 1000))
      const timePct = Math.max(0, Math.min(100, props.params.time ?? 0))
      const key = `${speed.toFixed(0)}|${timePct.toFixed(0)}`
      if (key === lastKey) return
      lastKey = key
      const tt = timePct / 100
      const slow = speed < SLOW_MAX

      const compound = slow ? smooth(0.15, 0.25, tt) * (1 - smooth(0.25, 0.35, tt)) : 0
      const stretch = slow ? smooth(0.25, 0.6, tt) : 0
      const split = slow ? smooth(0.6, 1, tt) : 0
      grid.visible = split < 0.999
      grid.scale.setScalar(1 + 0.12 * compound)

      for (let i = 0; i < N; i++) {
        const p = BASE[i]
        let x = p.x * (1 + 0.12 * compound) * (1 - stretch) + p.x * 2.15 * stretch
        const y = p.y * (1 - 0.4 * stretch)
        const z = p.z * (1 - 0.4 * stretch)
        if (i < HEAVY_N) x -= 0.9 * split
        else x += 1.35 * split
        m4.makeTranslation(x, y, z)
        inst.setMatrixAt(i, m4)
      }
      inst.instanceMatrix.needsUpdate = true

      for (let i = 0; i < 3; i++) {
        ejected[i].visible = slow && split > 0
        if (ejected[i].visible) ejected[i].position.copy(v3.copy(EJECT_DIRS[i]).multiplyScalar(1.5 * split))
      }

      if (slow) {
        incoming.visible = tt < 0.15
        if (incoming.visible) incoming.position.copy(lerpV(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(-R0 - 0.1, 0, 0), tt / 0.15))
      } else {
        incoming.visible = true
        incoming.position.copy(tt <= 0.45 ? lerpV(new THREE.Vector3(-2, 0.4, 0), new THREE.Vector3(-R0 - 0.15, 0.45, 0), tt / 0.45) : lerpV(new THREE.Vector3(-R0 - 0.15, 0.45, 0), new THREE.Vector3(2.2, -1.1, 1.3), (tt - 0.45) / 0.55))
      }

      const fissioned = slow && split >= 0.999
      tag.position.set(0, R0 + 1.1, 0)
      const label1 = slow ? t('fission.fission') : t('fission.scatter')
      const label2 = fissioned ? `≈${fmt(198, 0)} MeV` : t('fission.none')
      paintLabel(tag, `${label1} · ${label2}`, theme.pos)
    }
  },
  { camera: [2.6, 1.9, 3], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
