<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { wavelengthColor } from '../viz/color'

// Two energy levels (nf, ni) shown as the real shape of their s/p/d subshells, not a ring: every
// subshell of a level is centred on the same nucleus, so a bigger n is a bigger, fuzzier cloud, not
// a wider circle. Same E_n = -13.6/n² and photon wavelength as the 2D energy-ladder picture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

// Angular-probability clouds by rejection sampling on the unit sphere: s is isotropic, p is the
// familiar two-lobe dumbbell (|cosθ|² along the axis), d is the four-lobe clover (|sinθ|⁴cos²2φ`).
function cloud(target: number, l: number): Float32Array {
  const out: number[] = []
  let tries = 0
  while (out.length < target * 3 && tries < target * 40) {
    tries++
    const z = 1 - 2 * Math.random()
    const rxy = Math.sqrt(Math.max(0, 1 - z * z))
    const phi = Math.random() * Math.PI * 2
    const w = l === 0 ? 1 : l === 1 ? z * z : rxy ** 4 * Math.cos(2 * phi) ** 2
    if (Math.random() > w) continue
    const rad = 0.5 + 0.5 * Math.random()
    out.push(rxy * Math.cos(phi) * rad, z * rad, rxy * Math.sin(phi) * rad)
  }
  return new Float32Array(out)
}

const En = (n: number) => -13.6 / n ** 2
const R = (n: number) => 0.5 + 0.45 * n

useThree(
  el,
  ({ scene, theme }) => {
    const geos = [new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry()]
    geos[0].setAttribute('position', new THREE.BufferAttribute(cloud(220, 0), 3))
    geos[1].setAttribute('position', new THREE.BufferAttribute(cloud(260, 1), 3))
    geos[2].setAttribute('position', new THREE.BufferAttribute(cloud(320, 2), 3))
    const mats = [
      new THREE.PointsMaterial({ color: theme.muted, size: 0.06, transparent: true, opacity: 0.55, depthWrite: false }),
      new THREE.PointsMaterial({ color: theme.accent, size: 0.06, transparent: true, opacity: 0.6, depthWrite: false }),
      new THREE.PointsMaterial({ color: theme.accent2, size: 0.06, transparent: true, opacity: 0.6, depthWrite: false }),
    ]
    function cluster() {
      const group = new THREE.Group()
      const parts = geos.map((g, i) => new THREE.Points(g, mats[i]))
      parts.forEach((p) => group.add(p))
      scene.add(group)
      return { group, parts }
    }
    const lo = cluster()
    const hi = cluster()
    const tagLo = label('', '#888', 0.7)
    const tagHi = label('', '#888', 0.7)
    scene.add(tagLo, tagHi)
    const photon = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }))
    scene.add(photon)

    function paint(tag: THREE.Sprite, text: string) {
      if (tag.userData.text === text) return
      tag.userData.text = text
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.font = '500 40px Inter, sans-serif'
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let acc = 0
    return (dt) => {
      const ni = Math.max(2, Math.min(7, Math.round(props.params.ni ?? 3)))
      const nf = Math.max(1, Math.min(6, Math.round(props.params.nf ?? 2)))
      const valid = ni > nf
      const gap = 1.4
      const rNf = R(nf)
      const rNi = R(ni)
      lo.group.position.set(-(rNf + gap), 0, 0)
      hi.group.position.set(rNi + gap, 0, 0)
      lo.group.scale.setScalar(rNf)
      hi.group.scale.setScalar(rNi)
      lo.parts.forEach((p, l) => (p.visible = l <= Math.min(nf - 1, 2)))
      hi.parts.forEach((p, l) => (p.visible = l <= Math.min(ni - 1, 2)))
      tagLo.position.set(lo.group.position.x, rNf + 0.6, 0)
      tagHi.position.set(hi.group.position.x, rNi + 0.6, 0)
      paint(tagLo, `n=${nf}`)
      paint(tagHi, `n=${ni}`)

      photon.visible = valid
      if (valid) {
        const dE = En(ni) - En(nf)
        const nm = 1239.84 / dE
        ;(photon.material as THREE.MeshBasicMaterial).color.set(wavelengthColor(nm))
        acc = (acc + dt * 0.35) % 1
        const from = hi.group.position
        const to = lo.group.position
        photon.position.set(THREE.MathUtils.lerp(from.x, to.x, acc), Math.sin(acc * Math.PI) * 1.2 + 0.3, 0)
      }
    }
  },
  { camera: [0, 4, 18], target: [0, 1, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
