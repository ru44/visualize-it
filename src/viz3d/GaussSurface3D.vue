<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'

// A charge Q spread over a ball of radius R; the learner drags a closed Gaussian surface out to radius x
// and can reshape it from a sphere to a box. The field arrows are always radial (that is the real field);
// only the imaginary surface around them changes shape. As long as that surface still encloses all of Q,
// the flux through it stays exactly Q/ε0 no matter its size or shape — the flat 2D picture, which only
// ever plots E(x) along one ray, cannot show that the total flux does not care about the surface at all.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const shape = ref<'sphere' | 'box'>('sphere')

const K = 8.99e9
const EPS0 = 8.854e-12
const N_ARROWS = 14
const DIRS = Array.from({ length: N_ARROWS }, (_, i) => {
  const yv = 1 - (2 * i) / (N_ARROWS - 1)
  const r = Math.sqrt(Math.max(0, 1 - yv * yv))
  const ang = i * 2.399963
  return new THREE.Vector3(Math.cos(ang) * r, yv, Math.sin(ang) * r)
})

function surfaceDist(dir: THREE.Vector3, x: number, s: 'sphere' | 'box') {
  return s === 'sphere' ? x : x / Math.max(Math.abs(dir.x), Math.abs(dir.y), Math.abs(dir.z), 1e-6)
}

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5 }))
    scene.add(ball)
    const surfMat = new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.65 })
    const fillMat = new THREE.MeshStandardMaterial({ color: theme.accent, transparent: true, opacity: 0.06, side: THREE.DoubleSide })
    const sphereSurf = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 16, 12)), surfMat)
    const boxSurf = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(2, 2, 2)), surfMat)
    const sphereFill = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), fillMat)
    const boxFill = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), fillMat)
    scene.add(sphereSurf, boxSurf, sphereFill, boxFill)
    const arrows = DIRS.map((d) => arrow(d, new THREE.Vector3(), 1, theme.pos))
    arrows.forEach((a) => scene.add(a))
    const tag = label('', undefined, 0.55)
    tag.position.set(0, 3, 0)
    scene.add(tag)

    function applyShape() {
      sphereSurf.visible = sphereFill.visible = shape.value === 'sphere'
      boxSurf.visible = boxFill.visible = shape.value === 'box'
    }
    function reframe() {
      const R = props.params.R ?? 1
      const x = Math.max(0.05, props.params.x ?? 1.5)
      const extent = Math.max(x, R) + 0.7
      controls.target.set(0, 0, 0)
      camera.position.set(extent * 1.3, extent, extent * 1.6)
    }
    applyShape()
    reframe()
    watch(() => [props.params.x, props.params.R, shape.value], () => (applyShape(), reframe()))

    let lastText = ''
    return () => {
      const Q = props.params.Q ?? 20
      const R = props.params.R ?? 1
      const x = Math.max(0.05, props.params.x ?? 1.5)
      ball.scale.setScalar(R)
      const s = shape.value
      sphereSurf.scale.setScalar(x)
      sphereFill.scale.setScalar(x)
      boxSurf.scale.setScalar(x)
      boxFill.scale.setScalar(x)
      const fullyEnclosed = x >= R
      surfMat.color.copy(fullyEnclosed ? theme.pos : theme.neg)
      tag.position.y = Math.max(x, R) * 0.7

      const E = x < R ? (K * Q * 1e-9 * x) / R ** 3 : (K * Q * 1e-9) / x ** 2
      const enc = x < R ? Q * (x / R) ** 3 : Q
      const len = Math.min(1.5, 0.25 + E / 60)
      for (let i = 0; i < arrows.length; i++) {
        const d = DIRS[i]!
        const dist = surfaceDist(d, x, s)
        arrows[i]!.position.copy(d).multiplyScalar(Math.max(dist - len * 0.6, 0.05))
        arrows[i]!.setLength(len, len * 0.35, len * 0.22)
      }
      const flux = (enc * 1e-9) / EPS0
      const text = `Φ ≈ ${flux.toExponential(1)} N·m²/C`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.font = '500 22px Inter, sans-serif'
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.textAlign = 'center'
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [4, 3, 5], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <button
      class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs"
      style="border-color: var(--line); background: var(--panel); color: var(--muted)"
      @click="shape = shape === 'sphere' ? 'box' : 'sphere'"
    >
      {{ shape === 'sphere' ? t('viz3d.gauss.toBox') : t('viz3d.gauss.toSphere') }}
    </button>
  </div>
</template>
