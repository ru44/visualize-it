<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Same Sun–Earth–Moon geometry as the 2D picture (earth-space/eclipses), but in true 3D: the Moon's
// orbit is a circle tilted 5.14° from Earth's flat orbital plane (drawn as a second ring), and the
// Sun's direction sweeps around with the same ω. Only a flat diagram can't show WHY a tilted circle
// only ever touches a flat one at two points (the nodes) — from an angle here, you can see both rings
// and watch the Sun-facing point on the tilted ring dip through the flat one only near ω = 0° or 180°.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const I = (5.14 * Math.PI) / 180
const R = 4 // scene units standing for the real Earth–Moon distance
const LU_REAL = 374.4 // thousand km, real umbra length
const SUN_DIST = 11

useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x05070d)

    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.9 }))
    scene.add(earth)

    const ecliptic = new THREE.Mesh(new THREE.TorusGeometry(R, 0.012, 6, 96), new THREE.MeshBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.5 }))
    ecliptic.rotation.x = Math.PI / 2
    scene.add(ecliptic)
    const moonOrbit = new THREE.Mesh(new THREE.TorusGeometry(R, 0.012, 6, 96), new THREE.MeshBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.6 }))
    moonOrbit.rotation.x = Math.PI / 2 - I
    scene.add(moonOrbit)

    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(sun)
    const sunLight = new THREE.PointLight(0xfff4d6, 90, 0, 1.1)
    scene.add(sunLight)

    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 16), new THREE.MeshStandardMaterial({ color: 0xd7d3ca, roughness: 0.95 }))
    scene.add(moon)

    const umbraMat = new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    const umbra = new THREE.Mesh(new THREE.ConeGeometry(0.27, 1, 20, 1, true), umbraMat)
    scene.add(umbra)
    const penMat = new THREE.MeshBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.16, side: THREE.DoubleSide })
    const penumbra = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.6, 1, 20, 1, true), penMat)
    scene.add(penumbra)

    const patch = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0.85, side: THREE.DoubleSide }))
    patch.visible = false
    scene.add(patch)

    const up = new THREE.Vector3(0, 1, 0)
    return (dt) => {
      const omega = ((props.params.omega ?? 90) * Math.PI) / 180
      const dist = props.params.dist ?? 384.4 // thousand km
      const theta = omega
      sun.position.set(SUN_DIST * Math.cos(theta), 0, SUN_DIST * Math.sin(theta))
      sunLight.position.copy(sun.position)
      const moonPos = new THREE.Vector3(R * Math.cos(theta), R * Math.sin(theta) * Math.sin(I), R * Math.sin(theta) * Math.cos(I))
      moon.position.copy(moonPos)

      const axis = moonPos.clone().sub(sun.position).normalize() // points from Sun through Moon, onward
      const luScene = (LU_REAL * R) / dist // scale the real umbra length by the same ratio as the orbit
      umbra.scale.set(1, luScene, 1)
      umbra.position.copy(moonPos).addScaledVector(axis, luScene / 2)
      umbra.quaternion.setFromUnitVectors(up, axis)

      penumbra.scale.set(1, R, 1)
      penumbra.position.copy(moonPos).addScaledVector(axis, R / 2)
      penumbra.quaternion.setFromUnitVectors(up, axis)

      // Real hit-test, same numbers as the 2D picture: h = d sin(i sin ω), compared to Earth's radius.
      const beta = 5.14 * Math.sin(theta)
      const h = dist * 1000 * Math.sin((beta * Math.PI) / 180)
      if (Math.abs(h) < 6371) {
        patch.visible = true
        patch.position.copy(axis).multiplyScalar(-1.01)
        patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), axis.clone().multiplyScalar(-1))
        patch.scale.setScalar(dist < LU_REAL ? 1 : 0.55)
      } else {
        patch.visible = false
      }
      earth.rotation.y += dt * 0.3
    }
  },
  { camera: [7, 5, 9], target: [0, 0, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
