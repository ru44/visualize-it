<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'
import { fmt } from '../engine/math'

// content/lessons/waves/transverse-and-longitudinal. The 2D picture draws the longitudinal wave as
// a flat row of dots bunching sideways. This scene draws the SAME s(x,t) = A sin(kx - wt) as an
// actual coiled spring: each loop sits at x_rest + s(x_rest, t) along the coil's axis while its
// angle keeps turning at a constant rate, so loops visibly crowd into compressions and spread into
// rarefactions along a real 3D helix — a shape a flat row of dots cannot show.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const LEN = 8
const TURNS = 20
const PPT = 10 // points per turn
const N = TURNS * PPT
const RADIUS = 0.45

useThree(
  el,
  ({ scene, theme }) => {
    const positions = new Float32Array((N + 1) * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const coil = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: theme.fg }))
    coil.position.x = -LEN / 2
    scene.add(coil)
    scene.add(new THREE.GridHelper(12, 12, theme.line, theme.grid).translateY(-1.4))

    const mkSupport = () => new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.9), new THREE.MeshStandardMaterial({ color: theme.muted }))
    const supL = mkSupport()
    const supR = mkSupport()
    scene.add(supL, supR)

    const tag = label('', theme.fg.getStyle(), 0.4)
    tag.position.set(0, 2.2, 0)
    scene.add(tag)
    function setLabel(text: string) {
      if (tag.userData.text === text) return
      tag.userData.text = text
      const img = (tag.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = img.getContext('2d')!
      cx.clearRect(0, 0, img.width, img.height)
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.font = `500 ${Math.max(14, Math.min(22, Math.floor(460 / Math.max(8, text.length))))}px Inter, sans-serif`
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(tag.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }

    let clock = 0
    return (dt) => {
      const f = props.params.f ?? 0.8
      const lambda = props.params.lambda ?? 2
      const A = props.params.A ?? 0.5
      const k = (2 * Math.PI) / lambda
      const w = 2 * Math.PI * f
      clock += dt

      const pos = geo.attributes.position as THREE.BufferAttribute
      for (let j = 0; j <= N; j++) {
        const xRest = (j / N) * LEN
        const s = A * Math.sin(k * xRest - w * clock)
        const x = xRest + s
        const ang = (j / PPT) * 2 * Math.PI
        pos.setXYZ(j, x, RADIUS * Math.sin(ang), RADIUS * Math.cos(ang))
      }
      pos.needsUpdate = true

      supL.position.set(coil.position.x, 0, 0)
      supR.position.set(coil.position.x + LEN, 0, 0)

      setLabel(t('viz3d.coil.wavelength', { lambda: fmt(lambda, 2) }))
    }
  },
  { camera: [5, 3, 9], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
