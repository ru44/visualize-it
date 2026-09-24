<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'
import { torusDelta, wrap } from '../viz/boidsCore'

// options.mode picks the steering rule; default 'flock' is the original, untouched.
// flock (sep,align,coh): separation+alignment+cohesion — flocking-boids.
// couzin (rep,orient,attract): nested zones, repulsion wins — couzin-zones, same tree as Boids.vue.
// vicsek (r,noise°): average neighbour heading + noise as a 3D wobble — vicsek-alignment, cf Vicsek.vue.
// All three run continuously, unlike their 2D pictures' scrubbed "t".
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()

const N = 120
const W = 14, H = 8, D = 8
const BL = 0.4 // scene units per body-length slider unit — same scale flock always used
const VSCALE = W / 800 // vicsek's r is a raw pixel radius in an 800-wide 2D world
const DEG = Math.PI / 180
const SPEED = 0.11, TURN = 0.16
const MODE = (props.options && props.options.mode) || 'flock'
const T_MAX = MODE === 'vicsek' ? 220 : 240

const P = (k: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && k in o.fixed) return o.fixed[k]
  const src = (o.map && o.map[k]) || k
  return props.params[src] ?? d
}

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
    const tmp = new Float64Array(3) // reused output of the per-mode neighbour rule below

    // separation + alignment + cohesion — unchanged from before the reuse.
    function flockDesired(i: number, sepR: number, alignR: number, cohR: number) {
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
      tmp[0] = vx; tmp[1] = vy; tmp[2] = vz
    }

    // Repulsion zone overrides everything; otherwise blend the orientation-zone heading average with
    // the attraction-zone direction average — same decision tree as Boids.vue's couzinStep, in 3D.
    function couzinDesired(i: number, repR: number, orientR: number, attractR: number) {
      const ix = i * 3
      let rx = 0, ry = 0, rz = 0, rc = 0
      let ox = 0, oy = 0, oz = 0, oc = 0
      let ax = 0, ay = 0, az = 0, ac = 0
      for (let j = 0; j < N; j++) {
        if (j === i) continue
        const jx = j * 3
        const dx = torusDelta(pos[jx], pos[ix], W)
        const dy = torusDelta(pos[jx + 1], pos[ix + 1], H)
        const dz = torusDelta(pos[jx + 2], pos[ix + 2], D)
        const dist = Math.hypot(dx, dy, dz)
        if (dist < repR) { rx -= dx; ry -= dy; rz -= dz; rc++ }
        else {
          if (dist < orientR) { ox += head[jx]; oy += head[jx + 1]; oz += head[jx + 2]; oc++ }
          if (dist < attractR) { ax += dx; ay += dy; az += dz; ac++ }
        }
      }
      if (rc) { tmp[0] = rx; tmp[1] = ry; tmp[2] = rz; return }
      if (oc && ac) { tmp[0] = ox / oc + ax / ac; tmp[1] = oy / oc + ay / ac; tmp[2] = oz / oc + az / ac; return }
      if (oc) { tmp[0] = ox; tmp[1] = oy; tmp[2] = oz; return }
      if (ac) { tmp[0] = ax; tmp[1] = ay; tmp[2] = az; return }
      tmp[0] = head[ix]; tmp[1] = head[ix + 1]; tmp[2] = head[ix + 2]
    }

    // Average own heading with every neighbour's inside the radius, then add a random 3D wobble
    // scaled by the noise amplitude — same ingredients as Vicsek.vue's atan2(sum) + noise, in 3D.
    function vicsekDesired(i: number, radius: number, noiseRad: number) {
      const ix = i * 3
      let sx = head[ix], sy = head[ix + 1], sz = head[ix + 2]
      for (let j = 0; j < N; j++) {
        if (j === i) continue
        const jx = j * 3
        const dx = torusDelta(pos[jx], pos[ix], W)
        const dy = torusDelta(pos[jx + 1], pos[ix + 1], H)
        const dz = torusDelta(pos[jx + 2], pos[ix + 2], D)
        if (Math.hypot(dx, dy, dz) < radius) { sx += head[jx]; sy += head[jx + 1]; sz += head[jx + 2] }
      }
      rv.randomDirection()
      const w = noiseRad / 2
      tmp[0] = sx + rv.x * w; tmp[1] = sy + rv.y * w; tmp[2] = sz + rv.z * w
    }

    function step(p1: number, p2: number, p3: number) {
      for (let i = 0; i < N; i++) {
        const ix = i * 3
        if (MODE === 'couzin') couzinDesired(i, p1, p2, p3)
        else if (MODE === 'vicsek') vicsekDesired(i, p1, p2)
        else flockDesired(i, p1, p2, p3)

        let vx = tmp[0], vy = tmp[1], vz = tmp[2]
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
      if (MODE === 'couzin') step(P('rep', 1) * BL, P('orient', 3) * BL, P('attract', 12) * BL)
      else if (MODE === 'vicsek') step(P('r', 40) * VSCALE, P('noise', 90) * DEG, 0)
      else step(P('sep', 2) * BL, P('align', 6) * BL, P('coh', 8) * BL)
      ;[pos, nextPos] = [nextPos, pos]
      ;[head, nextHead] = [nextHead, head]
      paint()
      emit('set', 't', (P('t', 0) + 1) % (T_MAX + 1))
    }
  },
  { camera: [16, 11, 18], target: [0, 0, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
