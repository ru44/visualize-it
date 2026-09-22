<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useThree, ground, arrow, label } from './useThree'
import { loadModel, fit } from './models'

// Launch from the origin along +X; params v (m/s), th (deg), x (metres along the ground = time marker).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const G = 9.81
const S = 0.1 // metres → scene units

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
    loadModel('cannon').then((m) => m && ((launcher.visible = false), scene.add(fit(m, 1.6)), (launcher.userData.model = m)))
    const trail = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent }))
    scene.add(trail)
    const vel = arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, theme.accent)
    scene.add(vel)
    const grav = arrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 1, theme.neg)
    scene.add(grav)
    const rangeMark = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.42, 32), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    rangeMark.rotation.x = -Math.PI / 2
    rangeMark.position.y = 0.01
    scene.add(rangeMark)
    const tag = label('', '#888', 0.6)
    scene.add(tag)

    let t = 0
    let playing = true
    watch(() => [props.params.v, props.params.th], () => ((t = 0), (playing = true)))
    return (dt) => {
      const v = props.params.v ?? 25
      const th = ((props.params.th ?? 45) * Math.PI) / 180
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
      if (tag.userData.text !== range.toFixed(1)) {
        tag.userData.text = range.toFixed(1)
        const c = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
        const cx = c.getContext('2d')!
        cx.clearRect(0, 0, c.width, c.height)
        cx.fillStyle = '#' + theme.pos.getHexString()
        cx.font = '500 40px Inter, sans-serif'
        cx.textAlign = 'center'
        cx.fillText(`${range.toFixed(1)} m`, 128, 46)
        ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
      }
    }
  },
  { camera: [-4, 6, 14], target: [-2, 1.5, 0] },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
