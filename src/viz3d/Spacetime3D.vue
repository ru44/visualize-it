<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree } from './useThree'

// Gravity as curved space: a heavy star dents a stretchy sheet and a planet rolls around the dent.
// params M (star mass, 1..10), x (orbit radius, 2..8).
// mode 'lensing': light from a background source bends around the mass into an Einstein ring or two arcs, at the
// same angular radius θ_E = 0.12√M as the 2D picture (cosmos/gravitational-lensing, params M, offset).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const mode = (props.options?.mode as string | undefined) ?? 'default'
useThree(
  el,
  ({ scene, theme }) => {
    scene.background = new THREE.Color(0x0b0f1a)
    if (mode === 'lensing') {
      const WS = 3.5 // world units per unit of θ (same scale for θ_E and offset, so their ratio matches the 2D picture)
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.6 }))
      scene.add(lens)
      const source = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), new THREE.MeshBasicMaterial({ color: theme.pos }))
      scene.add(source)
      const N = 40
      const mkRay = () => new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
      const rayGeo1 = mkRay()
      const rayGeo2 = mkRay()
      const ray1 = new THREE.Line(rayGeo1, new THREE.LineBasicMaterial({ color: theme.accent2 }))
      const ray2 = new THREE.Line(rayGeo2, new THREE.LineBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.55 }))
      scene.add(ray1, ray2)
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.03, 8, 64), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
      const img1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
      const img2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), new THREE.MeshBasicMaterial({ color: theme.accent2, transparent: true, opacity: 0.6 }))
      scene.add(ring, img1, img2)
      const OZ = 9
      const SZ = -8
      // Quadratic Bézier from the source, bent at (cx, 0, 0) near the lens, to the observer — scalar math, no per-frame allocation.
      const bez = (geo: THREE.BufferGeometry, x0: number, cx: number) => {
        const p = geo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < N; i++) {
          const t = i / (N - 1)
          const u = 1 - t
          p.setXYZ(i, u * u * x0 + 2 * u * t * cx, 0, u * u * SZ + t * t * OZ)
        }
        p.needsUpdate = true
      }
      let lastE = -1
      return () => {
        const M = props.params.M ?? 4
        const off = props.params.offset ?? 0.25
        lens.scale.setScalar(0.6 + M * 0.06)
        const thetaE = 0.12 * Math.sqrt(M)
        const disc = Math.sqrt(off * off + 4 * thetaE * thetaE)
        const th1 = (off + disc) / 2 // major image, same side as the source
        const th2 = (off - disc) / 2 // minor image, opposite side, inside θ_E
        source.position.set(off * WS, 0, SZ)
        const ringish = Math.abs(off) < 0.03 // lined up: the two images merge into the Einstein ring, as in the 2D picture
        ring.visible = ringish
        img1.visible = img2.visible = !ringish
        if (ringish) {
          if (Math.abs(thetaE - lastE) > 1e-3) {
            ring.geometry.dispose()
            ring.geometry = new THREE.TorusGeometry(Math.max(0.05, thetaE * WS), 0.03, 8, 64)
            lastE = thetaE
          }
          bez(rayGeo1, off * WS, thetaE * WS)
          bez(rayGeo2, off * WS, -thetaE * WS)
        } else {
          img1.position.set(th1 * WS, 0, 0)
          img2.position.set(th2 * WS, 0, 0)
          bez(rayGeo1, off * WS, th1 * WS)
          bez(rayGeo2, off * WS, th2 * WS)
        }
      }
    }
    const N = 90
    const geo = new THREE.PlaneGeometry(22, 22, N, N)
    geo.rotateX(-Math.PI / 2)
    const base = Float32Array.from(geo.attributes.position.array as Float32Array)
    const sheet = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.55 }))
    scene.add(sheet)
    const star = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc94d }))
    scene.add(star)
    scene.add(new THREE.PointLight(0xffffff, 40, 0, 1.2))
    const planet = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), new THREE.MeshStandardMaterial({ color: theme.pos }))
    scene.add(planet)
    const depth = (r: number, M: number) => (-M * 0.55) / Math.sqrt(r * r + 0.9)
    let lastM = -1
    let theta = 0
    return (dt) => {
      const M = props.params.M ?? 5
      const R = props.params.x ?? 5
      if (M !== lastM) {
        const src = new THREE.PlaneGeometry(22, 22, N, N)
        src.rotateX(-Math.PI / 2)
        const p = src.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < p.count; i++) p.setY(i, depth(Math.hypot(base[i * 3], base[i * 3 + 2]), M))
        sheet.geometry.dispose()
        sheet.geometry = new THREE.WireframeGeometry(src)
        src.dispose()
        star.scale.setScalar(0.6 + M * 0.06)
        star.position.y = depth(0, M) + 0.3
        lastM = M
      }
      theta += dt * Math.sqrt(M / R ** 3) * 3
      planet.position.set(R * Math.cos(theta), depth(R, M) + 0.3, R * Math.sin(theta))
    }
  },
  mode === 'lensing' ? { camera: [0, 3, 13], target: [0, 0, 0], fov: 42 } : { camera: [0, 9, 14], target: [0, -1.5, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
