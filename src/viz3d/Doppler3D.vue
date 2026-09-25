<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// content/lessons/waves/doppler-effect. Same f1 = f*v/(v-vs), f2 = f*v/(v+vs), v = 343 m/s as the
// 2D picture, which only ever draws flat circles. Real wavefronts are spheres; orbiting this scene
// shows the true 3D bunching ahead of the source and spreading behind it that a top-down circle
// diagram can only hint at.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const SOUND_V = 343
const VSCENE = 1.6 // world units / s, visual expansion speed
const EMIT_EVERY = 0.5
const MAX_AGE = 4.5
const RANGE = 5 // source travels -RANGE..RANGE
const POOL = 10

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(16, theme))
    const sphereGeo = new THREE.SphereGeometry(1, 20, 14)
    const pool = Array.from({ length: POOL }, () => {
      const mat = new THREE.MeshBasicMaterial({ color: theme.accent2, wireframe: true, transparent: true, opacity: 0.5 })
      const m = new THREE.Mesh(sphereGeo, mat)
      m.visible = false
      scene.add(m)
      return { mesh: m, mat, born: -1, x: 0 }
    })
    let next = 0

    const source = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.7, 12), new THREE.MeshStandardMaterial({ color: theme.fg }))
    source.rotation.z = -Math.PI / 2
    source.position.y = 0.5
    scene.add(source)

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.set(0, 2.6, 0)
    scene.add(tag)
    function setLabel(text: string) {
      if (tag.userData.text === text) return
      tag.userData.text = text
      const img = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.font = `500 ${Math.max(13, Math.min(22, Math.floor(520 / Math.max(8, text.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    // Pre-roll a few seconds of history so the scene already has expanding wavefronts on the very
    // first rendered frame, instead of only filling in after EMIT_EVERY has elapsed.
    const initVs = props.params.vs ?? 20
    const initMach = initVs / SOUND_V
    let clock = 3.2
    let sinceEmit = 0
    let sx = -RANGE + initMach * VSCENE * clock
    for (let born = EMIT_EVERY, i = 0; born <= clock && i < POOL; born += EMIT_EVERY, i++) {
      const slot = pool[i]!
      slot.born = born
      slot.x = -RANGE + initMach * VSCENE * born
      slot.mesh.visible = true
      next = i + 1
    }
    return (dt) => {
      const vs = props.params.vs ?? 20
      const f = props.params.f ?? 500
      const mach = vs / SOUND_V
      clock += dt
      sx += mach * VSCENE * dt
      if (sx > RANGE) sx = -RANGE
      source.position.x = sx

      sinceEmit += dt
      if (sinceEmit >= EMIT_EVERY) {
        sinceEmit = 0
        const slot = pool[next % POOL]!
        next++
        slot.born = clock
        slot.x = sx
        slot.mesh.visible = true
      }
      for (const slot of pool) {
        if (slot.born < 0) continue
        const age = clock - slot.born
        if (age > MAX_AGE) {
          slot.mesh.visible = false
          slot.born = -1
          continue
        }
        const r = Math.max(0.02, age * VSCENE)
        slot.mesh.position.set(slot.x, 0.5, 0)
        slot.mesh.scale.setScalar(r)
        slot.mat.opacity = 0.55 * (1 - age / MAX_AGE)
      }

      const f1 = (f * SOUND_V) / (SOUND_V - vs)
      const f2 = (f * SOUND_V) / (SOUND_V + vs)
      setLabel(t('viz3d.doppler.readout', { f1: fmt(f1, 0), f2: fmt(f2, 0) }))
    }
  },
  { camera: [2, 3.4, 9], target: [0, 0.4, 0], fov: 44 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
