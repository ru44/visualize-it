<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { t } from '../i18n'

// Same z = z^2 + c loop and the same window of the complex plane as Mandelbrot.vue's canvas (its
// scale = (240/3.2)·2^zoom, so its visible width is 3.2/2^zoom and height 1.92/2^zoom — reused here
// exactly), but escape time k becomes height instead of colour: a mesh, not a raymarched Mandelbulb,
// so a phone can render it. Slow-escaping points near the boundary spike up; the set itself (k caps
// out) becomes a flat plateau — a third dimension the flat picture has no room for.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const W = 6
const H = 3.6
const GX = 50
const GY = 30
const HMAX = 2

function setText(spr: THREE.Sprite, text: string) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = spr.userData.color
  cx.textAlign = 'center'
  let size = 28
  cx.font = `500 ${size}px Inter, sans-serif`
  while (size > 12 && cx.measureText(text).width > img.width - 20) {
    size -= 1
    cx.font = `500 ${size}px Inter, sans-serif`
  }
  cx.fillText(text, 128, 40)
  ;(spr.material as THREE.SpriteMaterial).map!.needsUpdate = true
}

useThree(
  el,
  ({ scene, theme }) => {
    const geo = new THREE.PlaneGeometry(W, H, GX, GY)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.75 }))
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: theme.fg, transparent: true, opacity: 0.06 }))
    scene.add(wire)

    const lo = new THREE.Color(theme.accent)
    const hi = new THREE.Color(theme.accent2)
    const inside = theme.fg

    const zoomLabel = label('', '#fff', 0.34)
    zoomLabel.userData.color = '#' + theme.fg.getHexString()
    zoomLabel.position.set(0, HMAX + 1.2, 0)
    const iterLabel = label('', '#fff', 0.3)
    iterLabel.userData.color = '#' + theme.fg.getHexString()
    iterLabel.position.set(0, HMAX + 0.7, 0)
    const capt = label('', '#fff', 0.26)
    capt.userData.color = '#' + theme.muted.getHexString()
    setText(capt, t('viz3d.mandelbulb.caption'))
    capt.position.set(0, -0.9, 0)
    scene.add(zoomLabel, iterLabel, capt)

    let lastZ = NaN
    let lastCx = NaN
    let lastCy = NaN

    return () => {
      const zoom = Math.max(0, Math.min(8, props.params.zoom ?? 0))
      const cx = Math.max(-2, Math.min(1, props.params.cx ?? -0.5))
      const cy = Math.max(-1.2, Math.min(1.2, props.params.cy ?? 0))
      if (zoom === lastZ && cx === lastCx && cy === lastCy) return
      lastZ = zoom
      lastCx = cx
      lastCy = cy

      const Wc = 3.2 / Math.pow(2, zoom)
      const Hc = 1.92 / Math.pow(2, zoom)
      const maxIter = Math.round(Math.min(300, 60 + zoom * 25))
      let insideCount = 0
      for (let i = 0; i < pos.count; i++) {
        const xl = pos.getX(i)
        const zl = -pos.getZ(i)
        const x0 = cx + (xl / W) * Wc
        const y0 = cy + (zl / H) * Hc
        let x = 0
        let y = 0
        let x2 = 0
        let y2 = 0
        let k = 0
        while (x2 + y2 < 4 && k < maxIter) {
          y = 2 * x * y + y0
          x = x2 - y2 + x0
          x2 = x * x
          y2 = y * y
          k++
        }
        const frac = k / maxIter
        pos.setY(i, frac * HMAX)
        const c = k >= maxIter ? inside : lo.clone().lerp(hi, frac)
        colors[i * 3] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b
        if (k >= maxIter) insideCount++
      }
      pos.needsUpdate = true
      geo.attributes.color.needsUpdate = true
      geo.computeVertexNormals()
      wire.geometry.dispose()
      wire.geometry = new THREE.WireframeGeometry(geo)

      setText(zoomLabel, `${t('mandel.zoom')}: ×${Math.round(Math.pow(2, zoom))}`)
      setText(iterLabel, `${t('mandel.iter')}: ${maxIter} · ${t('mandel.inside')}: ${((100 * insideCount) / pos.count).toFixed(1)}%`)
    }
  },
  { camera: [4.5, 3.6, 4], target: [0, 0.4, 0], fov: 42 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
