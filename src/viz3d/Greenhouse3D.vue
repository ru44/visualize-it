<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same energy balance as the 2D curve: T = [(1-albedo)·1361 / (4·σ·(1-x/2))]^(1/4) − 273.15. Parallel
// sunlight arrows strike one side, the sunlit disc; infrared arrows leave in every direction, since a
// sphere radiates all around, and a fraction x/2 of them — the exact factor in the equation — are turned
// back by the atmosphere instead of escaping. A flat curve cannot show that asymmetry between catching
// light and losing heat, only a globe can.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const SIGMA = 5.67e-8
const S0 = 1361
const R = 2
const A_R = 2.3
const N_OUT = 8

function fibSphere(n: number): THREE.Vector3[] {
  const ga = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = ga * i
    return new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r)
  })
}
const IR_DIRS = fibSphere(N_OUT)
const SUN_OFFSETS: [number, number][] = [[0, 0], [0.6, 0], [-0.6, 0], [0, 0.6], [0, -0.6]]
const SUN_X = 3.6

function setLabel(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = `600 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)
    const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 36, 24), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.85 }))
    scene.add(earth)
    scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(R + 0.01, 18, 10)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })))
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(A_R, 28, 18), new THREE.MeshPhysicalMaterial({ color: theme.accent2, transparent: true, opacity: 0.15, roughness: 0.4, transmission: 0.6, side: THREE.DoubleSide }))
    scene.add(atmo)

    const sunArrows = SUN_OFFSETS.map(([y, z]) => arrow(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(SUN_X, y, z), 1.2, theme.pos))
    sunArrows.forEach((a) => scene.add(a))
    const irArrows = IR_DIRS.map((d) => arrow(d, d.clone().multiplyScalar(A_R), 0.8, theme.accent))
    irArrows.forEach((a) => scene.add(a))

    const tag = label('', theme.fg.getStyle(), 0.44)
    tag.position.set(0, 3.1, 0)
    scene.add(tag)

    let lastKey = ''
    return (dt) => {
      earth.rotation.y += dt * 0.1
      atmo.rotation.y += dt * 0.06
      const alb = THREE.MathUtils.clamp(props.params.alb ?? 0.3, 0.1, 0.6)
      const x = THREE.MathUtils.clamp(props.params.x ?? 0.78, 0, 0.95)
      const flux = ((1 - alb) * S0) / (4 * SIGMA * (1 - x / 2))
      const T = Math.pow(flux, 0.25) - 273.15
      const blocked = Math.round(N_OUT * (x / 2))
      const key = `${blocked}:${x.toFixed(2)}`
      if (key !== lastKey) {
        lastKey = key
        ;(atmo.material as THREE.MeshPhysicalMaterial).opacity = 0.1 + x * 0.3
        irArrows.forEach((a, i) => {
          const escaping = i >= blocked
          const dvec = IR_DIRS[i]
          a.setDirection(escaping ? dvec : dvec.clone().negate())
          a.position.copy(dvec.clone().multiplyScalar(escaping ? A_R : A_R + 0.7))
          a.setLength(escaping ? 1.0 : 0.55, 0.22, 0.13)
          const lm = a.line.material as THREE.LineBasicMaterial
          const cm = a.cone.material as THREE.MeshBasicMaterial
          lm.color.copy(escaping ? theme.accent : theme.neg)
          cm.color.copy(escaping ? theme.accent : theme.neg)
        })
      }
      setLabel(tag, t('greenhouse3d.surfaceTemp', { v: fmt(T, 0) }), theme.pos)
    }
  },
  { camera: [0, 2.4, 8.5], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
