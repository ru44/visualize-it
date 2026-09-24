<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label } from './useThree'
import { loadModel, fit } from './models'

// Launch from the origin along +X. Default mode (physics/projectile-motion): params v (m/s), th (deg),
// x (metres along the ground = time marker). Drag mode (options.mode = 'drag', physics/projectile-with-drag):
// params v0, th, k step the same quadratic-drag equations as the 2D picture (dt = 0.012 s), so the
// solid (drag) path and its range readout match the 2D solid curve, next to the dashed no-drag parabola.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const G = 9.81
const S = 0.1 // metres → scene units

const P = (key: string, d: number) => {
  const o = props.options ?? {}
  if (o.fixed && key in o.fixed) return o.fixed[key]
  const src = (o.map && o.map[key]) || key
  return props.params[src] ?? d
}
const mode = () => props.options?.mode ?? 'default'

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(24, theme))
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4 }))
    ball.castShadow = true
    scene.add(ball)
    loadModel('ball').then((m) => m && (ball.visible = false, scene.add(fit(m, 0.56)), (ball.userData.model = m)))
    const launcher = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.2, 16), new THREE.MeshStandardMaterial({ color: theme.muted }))
    launcher.castShadow = true
    scene.add(launcher)
    const trail = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent }))
    scene.add(trail)
    const dashTrail = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.3, gapSize: 0.2 }))
    dashTrail.visible = false
    scene.add(dashTrail)
    const vel = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent)
    scene.add(vel)
    const grav = arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 1, theme.neg)
    scene.add(grav)
    const rangeMark = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.42, 32), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    rangeMark.rotation.x = -Math.PI / 2
    rangeMark.position.y = 0.01
    scene.add(rangeMark)
    const noDragMark = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.42, 32), new THREE.MeshBasicMaterial({ color: theme.muted, side: THREE.DoubleSide }))
    noDragMark.rotation.x = -Math.PI / 2
    noDragMark.position.y = 0.01
    noDragMark.visible = false
    scene.add(noDragMark)
    const tag = label('', '#888', 0.6)
    scene.add(tag)
    const tag2 = label('', '#888', 0.42)
    tag2.visible = false
    scene.add(tag2)

    const setTag = (s: THREE.Sprite, text: string, color: THREE.Color) => {
      if (s.userData.text === text) return
      s.userData.text = text
      const c = (s.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.fillStyle = '#' + color.getHexString()
      cx.font = `500 ${Math.max(18, Math.min(40, Math.floor(380 / Math.max(4, text.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(s.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let t = 0
    let playing = true
    let anim = 0
    let dragPts: THREE.Vector3[] = []
    let dragVel: THREE.Vector3[] = []

    function recomputeDrag() {
      const v0 = P('v0', 25)
      const th = (P('th', 45) * Math.PI) / 180
      const k = Math.max(0, P('k', 0.02))
      const vx0 = v0 * Math.cos(th)
      const vy0 = v0 * Math.sin(th)
      const noRange = (v0 * v0 * Math.sin(2 * th)) / G
      const noTf = vx0 > 0 ? noRange / vx0 : 0
      const noPts: THREE.Vector3[] = []
      for (let i = 0; i <= 60; i++) {
        const tt = (noTf * i) / 60
        noPts.push(new THREE.Vector3(vx0 * tt * S - 10, Math.max(0, vy0 * tt - 0.5 * G * tt * tt) * S + 0.3, 0))
      }
      dashTrail.geometry.setFromPoints(noPts)
      dashTrail.computeLineDistances()

      let x = 0
      let y = 0
      let vx = vx0
      let vy = vy0
      const dt = 0.012
      dragPts = [new THREE.Vector3(-10, 0.3, 0)]
      dragVel = [new THREE.Vector3(vx, vy, 0)]
      for (let i = 0; i < 3000; i++) {
        const v = Math.hypot(vx, vy)
        vx += -k * v * vx * dt
        vy += (-G - k * v * vy) * dt
        const px = x + vx * dt
        const py = y + vy * dt
        if (py < 0) {
          const frac = y / (y - py)
          x += vx * dt * frac
          dragPts.push(new THREE.Vector3(x * S - 10, 0.3, 0))
          dragVel.push(new THREE.Vector3(vx, vy, 0))
          break
        }
        x = px
        y = py
        dragPts.push(new THREE.Vector3(x * S - 10, y * S + 0.3, 0))
        dragVel.push(new THREE.Vector3(vx, vy, 0))
      }
      trail.geometry.setFromPoints(dragPts)
      rangeMark.position.x = x * S - 10
      noDragMark.position.x = noRange * S - 10
      tag.position.set(rangeMark.position.x, 0.9, 0)
      tag2.position.set(noDragMark.position.x, 0.55, -0.9)
      setTag(tag, `${x.toFixed(1)} m`, theme.pos)
      setTag(tag2, `${noRange.toFixed(1)} m (no drag)`, theme.muted)
    }

    watch(
      () => [mode(), P('v', 25), P('th', 45), P('v0', 25), P('k', 0.02)],
      () => {
        const isDrag = mode() === 'drag'
        dashTrail.visible = isDrag
        noDragMark.visible = isDrag
        tag2.visible = isDrag
        if (isDrag) {
          anim = 0
          recomputeDrag()
        } else {
          t = 0
          playing = true
        }
      },
      { immediate: true },
    )

    return (dt) => {
      if (mode() === 'drag') {
        if (dragPts.length < 2) return
        anim = (((anim + dt / 2.4) % 1) + 1) % 1
        const idx = Math.min(dragPts.length - 1, Math.floor(anim * dragPts.length))
        const p = dragPts[idx]
        ball.position.copy(p)
        const bm = ball.userData.model as THREE.Object3D | undefined
        if (bm) bm.position.set(p.x, p.y - 0.28, p.z)
        const th = (P('th', 45) * Math.PI) / 180
        launcher.position.set(-10, 0.5, 0)
        launcher.rotation.z = Math.PI / 2 - th
        const lm = launcher.userData.model as THREE.Object3D | undefined
        if (lm) (lm.position.set(-10, 0, 0), (lm.rotation.z = th))
        const vNow = dragVel[idx]
        vel.position.copy(p)
        vel.setDirection(vNow.clone().normalize())
        vel.setLength(Math.max(0.2, vNow.length() * 0.06), 0.3, 0.18)
        grav.position.copy(p)
        grav.setLength(0.9, 0.3, 0.18)
        return
      }
      const v = P('v', 25)
      const th = (P('th', 45) * Math.PI) / 180
      const vx = v * Math.cos(th)
      const vy = v * Math.sin(th)
      const tf = (2 * vy) / G
      if (playing) {
        t += dt * 0.9
        if (t >= tf) (t = tf), (playing = false)
        emit('set', 'x', Math.min(100, vx * t))
      }
      const xs = vx * t
      const ys = Math.max(0, vy * t - 0.5 * G * t * t)
      const p = new THREE.Vector3(xs * S - 10, ys * S + 0.3, 0)
      ball.position.copy(p)
      const bm = ball.userData.model as THREE.Object3D | undefined
      if (bm) bm.position.set(p.x, p.y - 0.28, p.z)
      launcher.position.set(-10, 0.5, 0)
      launcher.rotation.z = Math.PI / 2 - th
      const lm = launcher.userData.model as THREE.Object3D | undefined
      if (lm) (lm.position.set(-10, 0, 0), (lm.rotation.z = th))
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 80; i++) {
        const tt = (tf * i) / 80
        pts.push(new THREE.Vector3(vx * tt * S - 10, Math.max(0, vy * tt - 0.5 * G * tt * tt) * S + 0.3, 0))
      }
      trail.geometry.setFromPoints(pts)
      const vNow = new THREE.Vector3(vx, vy - G * t, 0)
      vel.position.copy(p)
      vel.setDirection(vNow.clone().normalize())
      vel.setLength(Math.max(0.2, vNow.length() * 0.06), 0.3, 0.18)
      grav.position.copy(p)
      grav.setLength(0.9, 0.3, 0.18)
      rangeMark.position.x = vx * tf * S - 10
      tag.position.set(rangeMark.position.x, 0.6, 0)
      const range = vx * tf
      setTag(tag, `${range.toFixed(1)} m`, theme.pos)
    }
  },
  { camera: [-4, 6, 14], target: [-2, 1.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
