<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'

// electromagnetism/transformers. The 2D picture draws the iron core as a flat rectangle, which
// cannot show that both coils sit on the SAME closed loop of flux. Here the core is a real 3D ring;
// a travelling glow shows flux passing through both coils together. V_s, I and P_loss are computed
// with the SAME formulas as the 2D readouts, from the same Np, Ns, Vp, P, R sliders.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const LEG_X = 1.1
const TOP_Y = 0.85
const THICK = 0.16

function ringPoints(): THREE.Vector3[] {
  // a rounded rectangular loop in the X-Y plane, the core's centreline
  const pts: THREE.Vector3[] = []
  const corners: [number, number][] = [
    [LEG_X, TOP_Y],
    [-LEG_X, TOP_Y],
    [-LEG_X, -TOP_Y],
    [LEG_X, -TOP_Y],
  ]
  for (let i = 0; i < 4; i++) {
    const [x, y] = corners[i]!
    pts.push(new THREE.Vector3(x, y, 0))
  }
  return pts
}

function helixPoints(legX: number, turns: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const steps = turns * 10
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const ang = t * turns * Math.PI * 2
    const y = -0.62 + t * 1.24
    pts.push(new THREE.Vector3(legX + 0.24 * Math.cos(ang), y, 0.24 * Math.sin(ang)))
  }
  return pts
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(10, 10, theme.line, theme.grid).translateY(-1.5))

    const curve = new THREE.CatmullRomCurve3(ringPoints(), true, 'catmullrom', 0.1)
    const coreGeo = new THREE.TubeGeometry(curve, 64, THICK, 10, true)
    const coreMat = new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.6, metalness: 0.2 })
    scene.add(new THREE.Mesh(coreGeo, coreMat))

    let coilP = new THREE.Mesh(new THREE.BufferGeometry())
    let coilS = new THREE.Mesh(new THREE.BufferGeometry())
    const coilMatP = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.4 })
    const coilMatS = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4 })
    scene.add(coilP, coilS)
    function rebuildCoil(old: THREE.Mesh, legX: number, turns: number, mat: THREE.Material) {
      scene.remove(old)
      old.geometry.dispose()
      const c = new THREE.CatmullRomCurve3(helixPoints(legX, turns))
      const geo = new THREE.TubeGeometry(c, Math.max(20, turns * 8), 0.045, 6, false)
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      return mesh
    }

    // flux indicator: small glowing spheres travelling around the shared loop
    const N_DOTS = 10
    const dots = Array.from({ length: N_DOTS }, () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshStandardMaterial({ color: theme.pos, emissive: theme.pos, emissiveIntensity: 0.8 }))
      scene.add(m)
      return m
    })

    const tag = label('', undefined, 0.45)
    tag.position.set(0, 1.7, 0)
    scene.add(tag)
    let lastText = ''
    function setLabel(text: string) {
      if (text === lastText) return
      lastText = text
      const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '500 20px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(text, 128, 38)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let lastNp = -1
    let lastNs = -1
    let clock = 0
    return (dt) => {
      const Np = props.params.Np ?? 1000
      const Ns = props.params.Ns ?? 50
      const Vp = props.params.Vp ?? 230
      const P = props.params.P ?? 1000000
      const R = props.params.R ?? 5
      const turnsP = Math.round(Math.min(12, 2 + Math.sqrt(Np) / 3))
      const turnsS = Math.round(Math.min(12, 2 + Math.sqrt(Ns) / 3))
      if (turnsP !== lastNp) {
        lastNp = turnsP
        coilP = rebuildCoil(coilP, -LEG_X, turnsP, coilMatP)
      }
      if (turnsS !== lastNs) {
        lastNs = turnsS
        coilS = rebuildCoil(coilS, LEG_X, turnsS, coilMatS)
      }

      const Vs = (Vp * Ns) / Np
      const I = P / Vp
      const Ploss = I * I * R
      const frac = P > 0 ? Math.min(1, Ploss / P) : 0
      setLabel(`V_s ≈ ${Vs < 1000 ? Vs.toFixed(1) : Vs.toFixed(0)} V, loss ${(frac * 100).toFixed(2)}%`)

      clock += dt * 0.25
      for (let i = 0; i < N_DOTS; i++) {
        const t = ((i / N_DOTS + clock) % 1 + 1) % 1
        const p = curve.getPointAt(t)
        dots[i]!.position.copy(p)
        const mat = dots[i]!.material as THREE.MeshStandardMaterial
        mat.color.copy(theme.pos)
        mat.emissive.copy(theme.pos)
        mat.emissiveIntensity = 0.4 + 0.6 * frac
      }
    }
  },
  { camera: [3.2, 1.6, 4.4], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
