<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// electricity/charge-and-current. Same params (I, A, t) and the same v_d = I/(nAe) formula as the
// 2D picture. The flat picture can only show dots gliding smoothly forward; what it cannot show is
// that each electron is really jittering randomly off the copper lattice at high speed, with only a
// tiny net drift added on top — the zigzag here is that random thermal motion, exaggerated in scale
// (like the 2D dots) but reacting to the sliders the same way the 2D drift-speed readout does.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const N = 8.5e28
const E_CHARGE = 1.6e-19
const WIRE_LEN = 6
const HALF_LEN = WIRE_LEN / 2
const COLS = 10
const GRID = 3
const ELECTRONS = 16

useThree(
  el,
  ({ scene, theme }) => {
    // lattice: fixed copper atoms in a 3D grid, drawn once with an InstancedMesh (cheap: one draw call)
    const atomGeo = new THREE.SphereGeometry(0.09, 10, 8)
    const atomMat = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.5, metalness: 0.3 })
    const count = COLS * GRID * GRID
    const atoms = new THREE.InstancedMesh(atomGeo, atomMat, count)
    const m = new THREE.Matrix4()
    let idx = 0
    for (let i = 0; i < COLS; i++) {
      const x = -HALF_LEN + (i / (COLS - 1)) * WIRE_LEN
      for (let j = 0; j < GRID; j++) for (let k = 0; k < GRID; k++) {
        const y = (j - (GRID - 1) / 2) * 0.45
        const z = (k - (GRID - 1) / 2) * 0.45
        m.setPosition(x, y, z)
        atoms.setMatrixAt(idx++, m)
      }
    }
    scene.add(atoms)

    // faint wire outline
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(WIRE_LEN, 1.2, 1.2)), new THREE.LineBasicMaterial({ color: theme.line, transparent: true, opacity: 0.5 }))
    scene.add(outline)

    // electrons: small spheres that jitter around a slot and slowly drift forward, wrapping at the end
    const eGeo = new THREE.SphereGeometry(0.06, 10, 8)
    const eMat = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.4 })
    const electrons: THREE.Mesh[] = []
    const state = Array.from({ length: ELECTRONS }, () => ({
      slotX: (Math.random() - 0.5) * WIRE_LEN,
      slotY: (Math.random() - 0.5) * 0.9,
      slotZ: (Math.random() - 0.5) * 0.9,
      phase: Math.random() * Math.PI * 2,
      speed: 4 + Math.random() * 3,
      drift: 0,
    }))
    for (let i = 0; i < ELECTRONS; i++) {
      const mesh = new THREE.Mesh(eGeo, eMat)
      scene.add(mesh)
      electrons.push(mesh)
    }

    const tag = label('', undefined, 0.45)
    tag.position.set(0, 1.4, 0)
    scene.add(tag)
    let lastText = ''

    return (dt: number, tt: number) => {
      const I = Math.max(props.params.I ?? 2, 0.01)
      const A = Math.max(props.params.A ?? 1.5, 0.01)
      const vd = I / (N * (A * 1e-6) * E_CHARGE) // m/s, the real (tiny) drift speed
      const visualDrift = 0.12 + I * 0.09 // units/s — same proportional reaction as the 2D dots

      for (let i = 0; i < ELECTRONS; i++) {
        const s = state[i]
        s.drift += visualDrift * dt
        const jx = Math.sin(tt * s.speed + s.phase) * 0.16
        const jy = Math.sin(tt * s.speed * 1.3 + s.phase * 2) * 0.14
        const jz = Math.cos(tt * s.speed * 0.9 + s.phase) * 0.14
        let x = s.slotX + s.drift + jx
        x = ((((x + HALF_LEN) % WIRE_LEN) + WIRE_LEN) % WIRE_LEN) - HALF_LEN
        electrons[i].position.set(x, s.slotY + jy, s.slotZ + jz)
      }

      const text = `${t('cc3d.drift')}: ${vd < 0.001 ? (vd * 1000).toExponential(2) : (vd * 1000).toFixed(4)} mm/s`
      if (text !== lastText) {
        lastText = text
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        let size = 20
        cx.textAlign = 'center'
        do {
          cx.font = `500 ${size}px Inter, sans-serif`
          size -= 1
        } while (cx.measureText(text).width > c.width - 8 && size > 10)
        cx.fillStyle = '#' + theme.fg.getHexString()
        cx.fillText(text, 128, 38)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [4.5, 3, 6], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
