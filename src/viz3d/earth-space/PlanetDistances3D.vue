<script setup lang="ts">
import { computed, ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from '../useThree'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { readParams } from '../../viz/earth-space/planetDistancesModel'

// earth-space/planet-distances. Same params as the 2D picture: r (the planet's distance from the Sun, AU)
// and a (where it is on its orbit). A tilted view of the flat orbits: the glowing Sun in the middle, the
// Earth on its orbit at 1 AU, the planet on its own orbit, the sight line from Earth to the planet, the
// line from Earth to the Sun and the angle between them. A green ring lights up at the planet when the
// angle is at its biggest.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const P = computed(() => readParams(props.params))
const AU = 6
const hex = (c: THREE.Color) => '#' + c.getHexString()

function circle(radius: number, color: THREE.Color, opacity = 1, seg = 128) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < seg; i++) pts.push(new THREE.Vector3(Math.cos((i / seg) * 2 * Math.PI), 0, Math.sin((i / seg) * 2 * Math.PI)))
  const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }))
  l.scale.setScalar(radius)
  return l
}
function segment(color: THREE.Color) {
  const pos = new THREE.BufferAttribute(new Float32Array(6), 3)
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', pos)
  const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color }))
  l.frustumCulled = false
  return { l, pos }
}

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    // a square canvas (phones) needs the camera further back than a wide card; re-fit only when the shape class changes
    let wide: boolean | null = null
    const fit = () => {
      const w = camera.aspect >= 1.3
      if (w === wide) return
      const k = wide === null ? (w ? 1 : 1.6) : w ? 1 / 1.6 : 1.6
      wide = w
      const off = camera.position.clone().sub(controls.target).multiplyScalar(k)
      camera.position.copy(controls.target).add(off)
    }

    scene.background = new THREE.Color(0x05070d)
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0xffa726, transparent: true, opacity: 0.2, depthWrite: false }),
    )
    const light = new THREE.PointLight(0xfff4d6, 90, 0, 1.2)
    scene.add(sun, halo, light)

    scene.add(circle(AU, theme.muted, 0.7))
    const orbit = circle(1, theme.accent2, 0.9)
    scene.add(orbit)

    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 16), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    earth.position.set(AU, 0, 0)
    const planet = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 16), new THREE.MeshStandardMaterial({ color: 0xe8d9b5, roughness: 0.8 }))
    scene.add(earth, planet)
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.58, 32), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    ring.rotation.x = -Math.PI / 2
    scene.add(ring)

    const sight = segment(theme.accent)
    const toSun = segment(theme.accent2)
    scene.add(sight.l, toSun.l)
    const arcN = 32
    const arcPos = new THREE.BufferAttribute(new Float32Array(arcN * 3), 3)
    const arcGeo = new THREE.BufferGeometry()
    arcGeo.setAttribute('position', arcPos)
    const arc = new THREE.Line(arcGeo, new THREE.LineBasicMaterial({ color: theme.accent }))
    arc.frustumCulled = false
    scene.add(arc)

    const tagSun = label(t('planet-distances.sun'), '#ffd479', 0.9)
    const tagEarth = label(t('planet-distances.earth'), hex(theme.fg), 0.9)
    const tagPlanet = label(t('planet-distances.planet'), hex(theme.fg), 0.9)
    scene.add(tagSun, tagEarth, tagPlanet)
    tagSun.position.set(0, 1.5, 0)
    tagEarth.position.set(AU, 1, 0.5)

    let spin = 0
    return (dt) => {
      fit()
      const { r, rad, elong, atMax } = P.value
      orbit.scale.setScalar(r * AU)
      const pp = new THREE.Vector3(r * AU * Math.cos(rad), 0, -r * AU * Math.sin(rad))
      planet.position.copy(pp)
      ring.position.copy(pp)
      ring.visible = atMax
      tagPlanet.position.set(pp.x, 0.9, pp.z)

      // the sight line runs on a little past the planet, like the tangent at its biggest angle
      const E = earth.position
      const d = pp.clone().sub(E).normalize()
      const end = pp.clone().addScaledVector(d, 2.5)
      sight.pos.setXYZ(0, E.x, 0, E.z).setXYZ(1, end.x, 0, end.z)
      toSun.pos.setXYZ(0, E.x, 0, E.z).setXYZ(1, 0, 0, 0)
      sight.pos.needsUpdate = toSun.pos.needsUpdate = true

      // the angle at Earth, as an arc from the direction of the Sun to the direction of the planet
      const th = (elong * Math.PI) / 180
      const s0 = new THREE.Vector3(-1, 0, 0)
      for (let i = 0; i < arcN; i++) {
        const f = i / (arcN - 1)
        const v =
          th < 0.01
            ? s0.clone()
            : s0
                .clone()
                .multiplyScalar(Math.sin((1 - f) * th) / Math.sin(th))
                .addScaledVector(d, Math.sin(f * th) / Math.sin(th))
        arcPos.setXYZ(i, E.x + v.x * 1.6, 0.02, E.z + v.z * 1.6)
      }
      arcPos.needsUpdate = true
      arc.visible = th >= 0.01

      spin = Math.max(0, spin + dt * 0.4)
      earth.rotation.y = spin
      halo.scale.setScalar(1 + 0.04 * Math.sin(spin * 3))
    }
  },
  { camera: [3, 9, 11], target: [1, 0, 0], fov: 45 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <div class="flex flex-wrap items-baseline gap-x-4">
        <span class="num font-semibold" style="color: var(--accent)">{{ t('planet-distances.r.now') }}: {{ fmt(P.elong, 1) }}°</span>
        <span class="num" style="color: var(--pos)">{{ t('planet-distances.r.max') }}: {{ fmt(P.max, 1) }}°</span>
      </div>
      <span style="color: var(--muted)">{{ t('planet-distances.d3.note') }}</span>
    </div>
  </div>
</template>
