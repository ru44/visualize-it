<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'

// The 2D page can only show the RESULT: light's path bent relative to the cabin. This scene shows the
// CAUSE, from outside the elevator: the light beam truly travels in a straight, unbending line through
// space (the pale world-fixed line), while the elevator box accelerates upward beneath it. A trace drawn
// live on the box's own back wall — in the box's own local coordinates — is exactly the curve the 2D
// page draws, but built here from the external geometry instead of asserted. Same a and the same real
// yLight = 1/2·a·(W/c)^2 as the 2D readout; W = 2.4 m, the same cabin width.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const C = 299792458
const CAB_W = 2.4 // m, matches the 2D cabin width exactly
const HALF_W = 1.25 // scene units, half the box's inner span
const CYCLE = 1.3 // s, one full accelerate-and-reset loop
const CROSS_T = 0.34 // s, how long the beam's crossing "blink" lasts within a cycle
const VIS_A = 0.42 // scale from real a (m/s^2) to visible upward acceleration
const BEAM_Y = 1.55 // world height (scene units) the beam always travels at

function paint(spr: THREE.Sprite, text: string, color: THREE.Color) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = '#' + color.getHexString()
  const size = Math.max(14, Math.min(28, Math.floor(300 / Math.max(6, text.length))))
  cx.font = `600 ${size}px Inter, sans-serif`
  cx.textAlign = 'center'
  cx.fillText(text, 128, 46)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    scene.add(ground(14, theme))

    // the beam's true, unbending path through space
    const beamLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, BEAM_Y, 0), new THREE.Vector3(4, BEAM_Y, 0)]),
      new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.45 }),
    )
    scene.add(beamLine)

    const box = new THREE.Group()
    scene.add(box)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(HALF_W * 2, 1.5), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 1, side: THREE.DoubleSide }))
    floor.rotation.x = -Math.PI / 2
    floor.castShadow = floor.receiveShadow = true
    box.add(floor)
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(HALF_W * 2, 2.2, 1.5)), new THREE.LineBasicMaterial({ color: theme.line }))
    edges.position.y = 1.1
    box.add(edges)
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(HALF_W * 2, 2.2), new THREE.MeshBasicMaterial({ color: theme.sunken, transparent: true, opacity: 0.18, side: THREE.DoubleSide }))
    backWall.position.set(0, 1.1, -0.72)
    box.add(backWall)

    const trace = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: theme.accent2, linewidth: 2 }))
    box.add(trace)
    const photon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), new THREE.MeshBasicMaterial({ color: theme.pos }))
    scene.add(photon)

    const aTag = label('', theme.accent.getStyle(), 0.34)
    aTag.position.set(0, 3.1, 0)
    scene.add(aTag)
    const yTag = label('', theme.muted.getStyle(), 0.28)
    yTag.position.set(0, 2.75, 0)
    scene.add(yTag)

    let tracePts: THREE.Vector3[] = []
    const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    let cycleT = 0
    let lastCycleIdx = -1

    return (dt: number) => {
      if (!reduced) cycleT += dt
      const tInCycle = cycleT % CYCLE
      const cycleIdx = Math.floor(cycleT / CYCLE)
      if (cycleIdx !== lastCycleIdx) {
        lastCycleIdx = cycleIdx
        tracePts = []
      }

      const a = Math.max(0.1, props.params.a ?? 9.81)
      const aVis = a * VIS_A
      box.position.y = 0.5 * aVis * tInCycle * tInCycle

      const crossing = tInCycle <= CROSS_T
      photon.visible = crossing
      if (crossing) {
        const f = tInCycle / CROSS_T
        const wx = -HALF_W + f * (2 * HALF_W)
        photon.position.set(wx, BEAM_Y, -0.35)
        const localY = BEAM_Y - box.position.y
        tracePts.push(new THREE.Vector3(wx, localY, -0.68))
        if (tracePts.length > 60) tracePts.shift()
        trace.geometry.setFromPoints(tracePts)
      }

      const yLight = 0.5 * a * (CAB_W / C) ** 2
      paint(aTag, `a = ${a.toFixed(2)} m/s²`, theme.accent)
      paint(yTag, `y_light ≈ ${yLight.toExponential(1)} m`, theme.muted)
    }
  },
  { camera: [4.8, 3.2, 6.2], target: [0, 1.4, 0], fov: 44 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
