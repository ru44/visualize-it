<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Left: the same string as the 2D picture, y(x,t) = 2A sin(nπx/L) cos(2πft), L = 6 m, with its n+1
// nodes marked. Right: a circular drum skin driven by the same n, A, f, t — a flat line can only
// ever show one slice of a wave; the membrane shows a 2D mode needs a radial AND an angular number.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const L = 6
const STRING_N = 121
const DR = 2.2
const NR = 12
const NT = 32
const DRUM_X = 7.2

function buildDrum() {
  const pos: number[] = [0, 0, 0]
  const r: number[] = [0]
  const th: number[] = [0]
  for (let i = 1; i <= NR; i++) {
    const rr = (i / NR) * DR
    for (let j = 0; j < NT; j++) {
      const t = (j / NT) * Math.PI * 2
      pos.push(rr * Math.cos(t), 0, rr * Math.sin(t))
      r.push(rr)
      th.push(t)
    }
  }
  const idx: number[] = []
  for (let j = 0; j < NT; j++) idx.push(0, 1 + j, 1 + ((j + 1) % NT))
  for (let i = 1; i < NR; i++) {
    const b0 = 1 + (i - 1) * NT
    const b1 = 1 + i * NT
    for (let j = 0; j < NT; j++) {
      const a = b0 + j
      const b = b0 + ((j + 1) % NT)
      const c = b1 + j
      const d = b1 + ((j + 1) % NT)
      idx.push(a, c, d, a, d, b)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(pos.length), 3))
  geo.setIndex(idx)
  return { geo, r: new Float32Array(r), th: new Float32Array(th) }
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.GridHelper(18, 18, theme.line, theme.grid).translateX(2).translateY(-1.6))

    const sPos = new Float32Array(STRING_N * 3)
    for (let i = 0; i < STRING_N; i++) sPos[i * 3] = (i / (STRING_N - 1)) * L - L / 2
    const stringGeo = new THREE.BufferGeometry()
    stringGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    scene.add(new THREE.Line(stringGeo, new THREE.LineBasicMaterial({ color: theme.accent })))
    for (const x of [-L / 2, L / 2]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8), new THREE.MeshStandardMaterial({ color: theme.muted }))
      post.position.set(x, 0, 0)
      scene.add(post)
    }
    const nodeInst = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshStandardMaterial({ color: theme.neg }), 7)
    scene.add(nodeInst)

    const { geo: drumGeo, r: drumR, th: drumTh } = buildDrum()
    const drum = new THREE.Mesh(drumGeo, new THREE.MeshStandardMaterial({ color: theme.accent2, side: THREE.DoubleSide, roughness: 0.6 }))
    drum.position.set(DRUM_X, 0, 0)
    drum.castShadow = true
    scene.add(drum)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(DR, 0.035, 6, 32), new THREE.MeshStandardMaterial({ color: theme.muted }))
    rim.rotation.x = Math.PI / 2
    rim.position.set(DRUM_X, 0, 0)
    scene.add(rim)

    const tp = new THREE.Vector3()
    const tq = new THREE.Quaternion()
    const s1 = new THREE.Vector3(1, 1, 1)
    const s0 = new THREE.Vector3(0, 0, 0)
    const tm = new THREE.Matrix4()

    return () => {
      const A = props.params.A ?? 1
      const n = Math.max(1, Math.min(6, Math.round(props.params.n ?? 2)))
      const f = props.params.f ?? 0.4
      const t = props.params.t ?? 0
      const phase = Math.cos(2 * Math.PI * f * t)

      const sp = stringGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < STRING_N; i++) {
        const localX = (i / (STRING_N - 1)) * L
        sp.setY(i, 2 * A * Math.sin((n * Math.PI * localX) / L) * phase)
      }
      sp.needsUpdate = true

      for (let k = 0; k < 7; k++) {
        if (k <= n) {
          tp.set(-L / 2 + (k * L) / n, 0, 0)
          tm.compose(tp, tq, s1)
        } else {
          tm.compose(s0, tq, s0)
        }
        nodeInst.setMatrixAt(k, tm)
      }
      nodeInst.instanceMatrix.needsUpdate = true

      const m = (n - 1) % 3
      const k2 = Math.floor((n - 1) / 3) + 1
      const dp = drumGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < drumR.length; i++) {
        const rr = drumR[i]
        const rad = m === 0 ? Math.cos((k2 - 0.5) * Math.PI * (rr / DR)) : Math.sin((k2 * Math.PI * rr) / DR)
        const ang = m === 0 ? 1 : Math.cos(m * drumTh[i])
        dp.setY(i, A * rad * ang * phase)
      }
      dp.needsUpdate = true
      drumGeo.computeVertexNormals()
    }
  },
  { camera: [3.5, 5, 13], target: [3.5, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
