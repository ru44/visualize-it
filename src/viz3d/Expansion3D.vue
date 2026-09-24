<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, arrow, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// Same a(t) as the 2D picture's Expansion.vue history(): integrate da/dt = sqrt(Ωm/a + ΩΛ a² + Ωk)
// from a tiny a, then read the scale factor at tView (0..1 into that same history). A 3×3×3 lattice of
// 26 galaxies around "you" at the centre is scaled outward by that one factor a(t) in every direction
// at once, with an arrow at each galaxy sized by v = H(t)·d — this lesson's own v = H_0 d — something
// the 2D picture's flat, single-plane scatter of dots cannot show: expansion looks the same any way you turn.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

function history(m: number, l: number) {
  const k = 1 - m - l
  const out: { t: number; a: number; rate: number }[] = []
  let a = 0.02
  let tt = 0
  const dt = 0.004
  while (tt < 2.2 && a < 6) {
    const rate = m / a + l * a * a + k
    if (rate <= 0) break
    a += Math.sqrt(rate) * dt
    tt += dt
    out.push({ t: tt, a, rate })
  }
  return out
}

// 26 lattice points around the centre (3×3×3 minus the centre itself, which is "you").
const OFFSETS: [number, number, number][] = []
for (let ix = -1; ix <= 1; ix++) for (let iy = -1; iy <= 1; iy++) for (let iz = -1; iz <= 1; iz++) if (ix || iy || iz) OFFSETS.push([ix, iy, iz])
const D0 = 1.7 // scene units per lattice step at scale factor 1

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
    const starPos = new Float32Array(900 * 3)
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 200
    scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPos, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.18 })))

    const you = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.35 }))
    scene.add(you)
    const youTag = label('', theme.accent.getStyle(), 0.4)
    youTag.position.set(0, 0.6, 0)
    scene.add(youTag)
    const scaleTag = label('', theme.pos.getStyle(), 0.4)
    scaleTag.position.set(0, 4.6, 0)
    scene.add(scaleTag)

    const N = OFFSETS.length
    const galaxies = new THREE.InstancedMesh(new THREE.SphereGeometry(0.14, 10, 8), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.6 }), N)
    scene.add(galaxies)
    const arrows = OFFSETS.map(() => arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 0.02, theme.pos))
    arrows.forEach((a) => scene.add(a))

    const m4 = new THREE.Matrix4()
    const dir = new THREE.Vector3()
    const pos = new THREE.Vector3()
    let hist = history(1, 0)
    let lastOm = NaN
    let lastOl = NaN

    return () => {
      const om = THREE.MathUtils.clamp(props.params.om ?? 1, 0, 1)
      const ol = THREE.MathUtils.clamp(props.params.ol ?? 0, 0, 1)
      if (om !== lastOm || ol !== lastOl) {
        hist = history(om, ol)
        lastOm = om
        lastOl = ol
      }
      const tv = THREE.MathUtils.clamp(props.params.tView ?? 0.6, 0, 1)
      const now = hist[Math.min(hist.length - 1, Math.round(tv * (hist.length - 1)))] ?? { a: 1, rate: 1 }
      const a = now.a
      const H = Math.sqrt(Math.max(0, now.rate)) / a // instantaneous H(t) = ȧ/a
      const scaleFactor = Math.min(2.6, a)

      for (let i = 0; i < N; i++) {
        const [ix, iy, iz] = OFFSETS[i]
        pos.set(ix, iy, iz).multiplyScalar(D0 * scaleFactor)
        galaxies.setMatrixAt(i, m4.makeTranslation(pos.x, pos.y, pos.z))
        const d0 = Math.sqrt(ix * ix + iy * iy + iz * iz) * D0 // reference (today-scale) distance
        const v = H * d0 * scaleFactor // v = H(t) · d, this lesson's own Hubble's law
        dir.set(ix, iy, iz).normalize()
        const ar = arrows[i]
        ar.position.copy(pos)
        ar.setDirection(dir)
        ar.setLength(Math.min(1.1, 0.28 * v) + 0.02, 0.16, 0.1)
      }
      galaxies.instanceMatrix.needsUpdate = true
      setLabel(youTag, t('exp.us'), theme.accent)
      setLabel(scaleTag, `a = ${fmt(a, 2)}`, theme.pos)
    }
  },
  { camera: [0, 7, 15], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
