<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'
import { torusDelta, wrap } from '../viz/boidsCore'

// Same three rules as the 2D flock (separation, alignment, cohesion, each with its own radius in
// body-lengths) but steering a full 3D heading inside a box instead of a 2D angle on a flat page —
// 120 birds is the same idea at a scale a phone can still run.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()

const N = 120
const W = 14
const H = 8
const D = 8
const BL = 0.4 // scene units per body-length slider unit
const SPEED = 0.11
const TURN = 0.16
const T_MAX = 240

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, D)), new THREE.LineBasicMaterial({ color: theme.line })))

    let pos = new Float32Array(N * 3)
    let head = new Float32Array(N * 3)
    let nextPos = new Float32Array(N * 3)
    let nextHead = new Float32Array(N * 3)
    const rv = new THREE.Vector3()
    for (let i = 0; i < N; i++) {
      pos[i * 3] = Math.random() * W
      pos[i * 3 + 1] = Math.random() * H
      pos[i * 3 + 2] = Math.random() * D
      rv.randomDirection()
      head[i * 3] = rv.x
      head[i * 3 + 1] = rv.y
      head[i * 3 + 2] = rv.z
    }

    const cone = new THREE.ConeGeometry(0.11, 0.4, 6)
    cone.rotateX(Math.PI / 2) // point along +Z so it aligns with the heading via setFromUnitVectors
    const inst = new THREE.InstancedMesh(cone, new THREE.MeshStandardMaterial({ color: theme.accent }), N)
    scene.add(inst)

    const up = new THREE.Vector3(0, 0, 1)
    const desired = new THREE.Vector3()
    const cur = new THREE.Vector3()
    const tp = new THREE.Vector3()
    const q = new THREE.Quaternion()
    const m4 = new THREE.Matrix4()
    const scale1 = new THREE.Vector3(1, 1, 1)

    function step(sepR: number, alignR: number, cohR: number) {
      for (let i = 0; i < N; i++) {
        const ix = i * 3
        let sx = 0, sy = 0, sz = 0, sc = 0
        let ax = 0, ay = 0, az = 0, ac = 0
        let cx = 0, cy = 0, cz = 0, cc = 0
        for (let j = 0; j < N; j++) {
          if (j === i) continue
          const jx = j * 3
          const dx = torusDelta(pos[jx], pos[ix], W)
          const dy = torusDelta(pos[jx + 1], pos[ix + 1], H)
          const dz = torusDelta(pos[jx + 2], pos[ix + 2], D)
          const dist = Math.hypot(dx, dy, dz)
          if (dist < sepR) { sx -= dx; sy -= dy; sz -= dz; sc++ }
          if (dist < alignR) { ax += head[jx]; ay += head[jx + 1]; az += head[jx + 2]; ac++ }
          if (dist < cohR) { cx += dx; cy += dy; cz += dz; cc++ }
        }
        let vx = head[ix] * 0.6, vy = head[ix + 1] * 0.6, vz = head[ix + 2] * 0.6
        if (sc) { vx += (sx / sc) * 1.6; vy += (sy / sc) * 1.6; vz += (sz / sc) * 1.6 }
        if (ac) { vx += ax / ac; vy += ay / ac; vz += az / ac }
        if (cc) { vx += cx / cc; vy += cy / cc; vz += cz / cc }
        let len = Math.hypot(vx, vy, vz)
        if (len < 1e-6) { vx = head[ix]; vy = head[ix + 1]; vz = head[ix + 2]; len = 1 }
        desired.set(vx / len, vy / len, vz / len)
        cur.set(head[ix], head[ix + 1], head[ix + 2])
        const angle = Math.acos(THREE.MathUtils.clamp(cur.dot(desired), -1, 1))
        let ndx: number, ndy: number, ndz: number
        if (angle < 1e-4) {
          ndx = cur.x; ndy = cur.y; ndz = cur.z
        } else {
          const tt = Math.min(1, TURN / angle)
          ndx = cur.x + (desired.x - cur.x) * tt
          ndy = cur.y + (desired.y - cur.y) * tt
          ndz = cur.z + (desired.z - cur.z) * tt
          const l2 = Math.hypot(ndx, ndy, ndz) || 1
          ndx /= l2; ndy /= l2; ndz /= l2
        }
        nextHead[ix] = ndx; nextHead[ix + 1] = ndy; nextHead[ix + 2] = ndz
        nextPos[ix] = wrap(pos[ix] + ndx * SPEED, W)
        nextPos[ix + 1] = wrap(pos[ix + 1] + ndy * SPEED, H)
        nextPos[ix + 2] = wrap(pos[ix + 2] + ndz * SPEED, D)
      }
    }

    function paint() {
      for (let i = 0; i < N; i++) {
        const ix = i * 3
        cur.set(head[ix], head[ix + 1], head[ix + 2])
        q.setFromUnitVectors(up, cur)
        tp.set(pos[ix] - W / 2, pos[ix + 1] - H / 2, pos[ix + 2] - D / 2)
        m4.compose(tp, q, scale1)
        inst.setMatrixAt(i, m4)
      }
      inst.instanceMatrix.needsUpdate = true
    }
    paint()

    let acc = 0
    return (dt) => {
      acc += dt
      if (acc < 1 / 16) return
      acc = 0
      step((props.params.sep ?? 2) * BL, (props.params.align ?? 6) * BL, (props.params.coh ?? 8) * BL)
      ;[pos, nextPos] = [nextPos, pos]
      ;[head, nextHead] = [nextHead, head]
      paint()
      emit('set', 't', ((props.params.t ?? 0) + 1) % (T_MAX + 1))
    }
  },
  { camera: [16, 11, 18], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
