<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Earth orbiting the Sun with a fixed 23.4° tilt: the tilt, not the distance, makes the seasons.
// params day (0..365), tilt (deg). The lit hemisphere and the latitude receiving sunlight straight on are shown.
// mode 'moon': the Moon orbiting Earth, lit by a distant Sun — the real 3D lighting produces the same phase as the
// 2D picture for the same day (earth-space/moon-phases, param day 0..29.53).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const mode = (props.options?.mode as string | undefined) ?? 'default'

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x0b0f1a)
    if (mode === 'moon') {
      const sunDir = new THREE.Vector3(1, 0.12, 0.25).normalize()
      const sunLamp = new THREE.DirectionalLight(0xfff4d6, 3)
      sunLamp.position.copy(sunDir.clone().multiplyScalar(20))
      scene.add(sunLamp)
      const sunMark = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
      sunMark.position.copy(sunDir.clone().multiplyScalar(13))
      scene.add(sunMark)
      const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
      scene.add(earth)
      const orbitR = 4
      const orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(Array.from({ length: 97 }, (_, i) => new THREE.Vector3(orbitR * Math.cos((i / 96) * 2 * Math.PI), 0, -orbitR * Math.sin((i / 96) * 2 * Math.PI)))),
        new THREE.LineBasicMaterial({ color: theme.muted }),
      )
      scene.add(orbit)
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 28, 20), new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95 }))
      scene.add(moon)
      const P = 29.53
      return (dt) => {
        const day = (((props.params.day ?? 0) % P) + P) % P
        const ang = (day / P) * 2 * Math.PI
        // Same angle convention as the 2D picture: ang = 0 puts the Moon on the Sun side of Earth (new moon).
        moon.position.set(orbitR * Math.cos(ang), 0, -orbitR * Math.sin(ang))
        earth.rotation.y += dt * 0.6
        moon.rotation.y += dt * 0.6
      }
    }
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(sun)
    const light = new THREE.PointLight(0xffffff, 60, 0, 1.2)
    scene.add(light)
    const orbitR = 9
    const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, i) => new THREE.Vector3(orbitR * Math.cos((i / 128) * 2 * Math.PI), 0, orbitR * Math.sin((i / 128) * 2 * Math.PI)))), new THREE.LineBasicMaterial({ color: theme.muted }))
    scene.add(orbit)
    const earthG = new THREE.Group()
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    earthG.add(earth)
    earthG.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.003, 24, 12)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })))
    const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }))
    earthG.add(axis)
    const equator = new THREE.Mesh(new THREE.TorusGeometry(1.01, 0.012, 8, 96), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
    equator.rotation.x = Math.PI / 2
    earthG.add(equator)
    const subsolar = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(subsolar)
    scene.add(earthG)
    const labels = ['Mar', 'Jun', 'Sep', 'Dec']
    labels.forEach((_, i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: theme.muted }))
      const a = (i / 4) * 2 * Math.PI
      m.position.set(orbitR * Math.cos(a), 0, orbitR * Math.sin(a))
      scene.add(m)
    })
    return (dt) => {
      const day = props.params.day ?? 172
      const tilt = ((props.params.tilt ?? 23.4) * Math.PI) / 180
      // day 80 ≈ March equinox at angle 0; June solstice at angle π/2 (Earth's tilted axis points toward the Sun)
      const a = ((day - 80) / 365.25) * 2 * Math.PI
      earthG.position.set(orbitR * Math.cos(a), 0, orbitR * Math.sin(a))
      // Axis fixed in space, tilted toward +x... tilt toward the June-solstice direction (−z here, where Earth is at a = π/2 → position (0,0,+9)); axis leans toward −z so that at a=π/2 the north pole faces the Sun.
      earthG.rotation.set(0, 0, 0)
      earthG.rotateOnAxis(new THREE.Vector3(1, 0, 0), -tilt)
      earth.rotation.y += dt * 2
      // subsolar point: the surface point facing the Sun
      const toSun = earthG.position.clone().negate().normalize()
      subsolar.position.copy(earthG.position.clone().add(toSun.multiplyScalar(1.02)))
    }
  },
  mode === 'moon' ? { camera: [0, 2, 6.5], target: [0, 0, 0], fov: 50 } : { camera: [0, 10, 20], target: [0, 0, 0], fov: 40 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
