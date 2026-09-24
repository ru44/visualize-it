<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// physics/nuclear-fusion. params temperature, confinement, step — the same three knobs and 0..150
// step range as src/viz/Fusion.vue. Nuclei repel by an inverse-square push and fuse (vanish in a
// flash) only within FUSE_R of each other; speed grows with sqrt(temperature) and the box shrinks
// with confinement, the same two levers the 2D box uses — this one is a real 3D box, so nuclei can
// dodge each other in a third dimension the flat picture has no room for.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()
const N = 14
const DT = 0.05
const SUB = 4
const CHARGE_K = 0.4
const FUSE_R = 0.22
const SPEED_K = 0.7
const RAD = 0.09
const MAX_EVENTS = 10
const BOX0 = { w: 3, h: 2, d: 2 }

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  cx.font = '600 26px Inter, sans-serif'
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

function simulate(temperature: number, confinement: number, steps: number) {
  const scale = 1.3 - confinement
  const box = { w: BOX0.w * scale, h: BOX0.h * scale, d: BOX0.d * scale }
  const rnd = makeRng(20260101)
  const pos = Array.from({ length: N }, () => new THREE.Vector3((rnd() - 0.5) * box.w * 0.85, (rnd() * 0.85 + 0.08) * box.h, (rnd() - 0.5) * box.d * 0.85))
  const vel = Array.from({ length: N }, () => new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize())
  const alive: boolean[] = new Array(N).fill(true)
  const events: { p: THREE.Vector3; atStep: number }[] = []
  const targetSpeed = SPEED_K * Math.sqrt(temperature)
  for (let s = 0; s < steps * SUB; s++) {
    const acc = Array.from({ length: N }, () => new THREE.Vector3())
    for (let i = 0; i < N; i++) {
      if (!alive[i]) continue
      for (let j = i + 1; j < N; j++) {
        if (!alive[j]) continue
        const d = pos[i].distanceTo(pos[j]) || 0.001
        if (d < FUSE_R) {
          alive[i] = alive[j] = false
          events.push({ p: pos[i].clone().add(pos[j]).multiplyScalar(0.5), atStep: Math.floor(s / SUB) })
          continue
        }
        const f = CHARGE_K / (d * d)
        const dir = pos[i].clone().sub(pos[j]).divideScalar(d)
        acc[i].addScaledVector(dir, f)
        acc[j].addScaledVector(dir, -f)
      }
    }
    for (let i = 0; i < N; i++) {
      if (!alive[i]) continue
      vel[i].addScaledVector(acc[i], DT).normalize().multiplyScalar(targetSpeed)
      pos[i].addScaledVector(vel[i], DT)
      const hx = box.w / 2 - RAD
      const hz = box.d / 2 - RAD
      if (pos[i].x < -hx || pos[i].x > hx) (vel[i].x *= -1), (pos[i].x = THREE.MathUtils.clamp(pos[i].x, -hx, hx))
      if (pos[i].y < RAD || pos[i].y > box.h - RAD) (vel[i].y *= -1), (pos[i].y = THREE.MathUtils.clamp(pos[i].y, RAD, box.h - RAD))
      if (pos[i].z < -hz || pos[i].z > hz) (vel[i].z *= -1), (pos[i].z = THREE.MathUtils.clamp(pos[i].z, -hz, hz))
    }
  }
  return { box, pos, alive, events }
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(8, theme))
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.28 }))
    scene.add(glass)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: theme.muted }))
    scene.add(edges)
    const geo = new THREE.SphereGeometry(RAD, 12, 10)
    const mat = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 0.25 })
    const inst = new THREE.InstancedMesh(geo, mat, N)
    inst.castShadow = true
    scene.add(inst)
    const rings = Array.from({ length: MAX_EVENTS }, () => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 6, 20), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true }))
      m.visible = false
      scene.add(m)
      return m
    })
    const tag = label('', theme.pos.getStyle(), 0.32)
    scene.add(tag)
    const m4 = new THREE.Matrix4()

    let lastKey = ''
    let world = simulate(1.5, 0.6, 0)
    let acc = 0
    return (dt: number) => {
      const temperature = Math.max(0.2, Math.min(5, props.params.temperature ?? 1.5))
      const confinement = Math.max(0.3, Math.min(1, props.params.confinement ?? 0.6))
      const step = Math.max(0, Math.min(150, Math.round(props.params.step ?? 0)))
      const key = `${temperature.toFixed(2)}|${confinement.toFixed(2)}|${step}`
      if (key !== lastKey) {
        lastKey = key
        world = simulate(temperature, confinement, step)
        glass.scale.set(world.box.w, world.box.h, world.box.d)
        glass.position.y = world.box.h / 2
        edges.scale.copy(glass.scale)
        edges.position.copy(glass.position)
        for (let i = 0; i < N; i++) {
          if (world.alive[i]) m4.makeTranslation(world.pos[i].x, world.pos[i].y, world.pos[i].z)
          else m4.makeScale(0, 0, 0)
          inst.setMatrixAt(i, m4)
        }
        inst.instanceMatrix.needsUpdate = true
        const recent = world.events.slice(-MAX_EVENTS)
        recent.forEach((ev, i) => {
          const r = rings[i]
          r.visible = true
          r.position.copy(ev.p)
          const age = step - ev.atStep
          r.scale.setScalar(1 + age * 0.15)
          ;(r.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - age / 40)
        })
        for (let i = recent.length; i < MAX_EVENTS; i++) rings[i].visible = false
        tag.position.set(0, world.box.h + 0.6, 0)
        paint(tag, `${t('fusion.events')}: ${world.events.length}`, theme.pos)
      }
      acc += dt
      if (acc > 0.09 && step < 150) {
        acc = 0
        emit('set', 'step', step + 1)
      }
    }
  },
  { camera: [4, 3.2, 5], target: [0, 1, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
