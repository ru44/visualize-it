<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, label } from './useThree'
import { t } from '../i18n'

// 10^e, e = 0..12, same values DotGrid.vue's "scale" mode reads off its 10,000-dot grid. Here a
// thousand unit cubes stack into one 10×10×10 block (reached at e=3); from e=4 that whole block
// shrinks into a labelled "key" cube and the SAME 10×10×10 lattice is rebuilt out of block-sized
// cubes instead, so ten thousand, a hundred thousand and a million are the same shape one size up —
// a volume to walk around that a flat grid of dots can't give. Both lattices are capped InstancedMeshes.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const CAP = 1000
const SPACING = 1
function latticePos(k: number): THREE.Vector3 {
  const iy = Math.floor(k / 100)
  const rem = k % 100
  const iz = Math.floor(rem / 10)
  const ix = rem % 10
  return new THREE.Vector3((ix - 4.5) * SPACING, iy * SPACING + SPACING / 2, (iz - 4.5) * SPACING)
}
const sep = (n: number) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')
const NAMES = ['one', 'ten', 'hundred', 'thousand', 'tenThousand', 'hundredThousand', 'million', 'tenMillion', 'hundredMillion', 'billion', 'tenBillion', 'hundredBillion', 'trillion']
// Same thresholds as DotGrid.vue's duration(): counting one number per second.
function duration(s: number): string {
  if (s < 60) return t('dots.sec', { n: sep(s) })
  if (s < 3600) return t('dots.min', { n: sep(s / 60) })
  if (s < 86400) return t('dots.hour', { n: sep(s / 3600) })
  if (s < 31557600) return t('dots.day', { n: sep(s / 86400) })
  return t('dots.year', { n: sep(s / 31557600) })
}

function setText(spr: THREE.Sprite, text: string) {
  if (spr.userData.text === text) return
  spr.userData.text = text
  const img = (spr.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
  const cx = img.getContext('2d')!
  cx.clearRect(0, 0, img.width, img.height)
  cx.fillStyle = spr.userData.color
  cx.textAlign = 'center'
  let size = 30
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
    scene.add(ground(16, theme))

    const m4 = new THREE.Matrix4()
    const unitsMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.85, 0.85, 0.85), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 }), CAP)
    const blocksMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.94, 0.94, 0.94), new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4 }), CAP)
    for (const mesh of [unitsMesh, blocksMesh]) {
      for (let k = 0; k < CAP; k++) {
        m4.setPosition(latticePos(k))
        mesh.setMatrixAt(k, m4)
      }
      mesh.castShadow = true
      mesh.instanceMatrix.needsUpdate = true
    }
    const unitsGroup = new THREE.Group()
    unitsGroup.add(unitsMesh)
    scene.add(unitsGroup, blocksMesh)

    const topLabel = label('', '#fff', 0.7)
    topLabel.userData.color = '#' + theme.fg.getHexString()
    topLabel.position.set(0, 13, 0)
    const nameLabel = label('', '#fff', 0.45)
    nameLabel.userData.color = '#' + theme.fg.getHexString()
    nameLabel.position.set(0, 11.9, 0)
    const timeLabel = label('', '#fff', 0.4)
    timeLabel.userData.color = '#' + theme.fg.getHexString()
    timeLabel.position.set(0, 11, 0)
    const keyLabel = label('', '#fff', 0.32)
    keyLabel.userData.color = '#' + theme.fg.getHexString()
    scene.add(topLabel, nameLabel, timeLabel, keyLabel)

    return () => {
      const e = Math.max(0, Math.min(12, Math.round(props.params.e ?? 6)))
      const total = 10 ** e

      if (e <= 3) {
        unitsGroup.position.set(0, 0, 0)
        unitsGroup.scale.setScalar(1)
        unitsMesh.count = total
        blocksMesh.count = 0
        keyLabel.visible = false
      } else {
        unitsGroup.position.set(-6.3, 0, -6.3)
        unitsGroup.scale.setScalar(0.16)
        unitsMesh.count = CAP
        blocksMesh.count = Math.min(CAP, total / 1000)
        keyLabel.visible = true
        keyLabel.position.set(-6.3, 2, -6.3)
        setText(keyLabel, t('viz3d.million.key', { n: sep(1000) }))
      }
      setText(topLabel, sep(total))
      setText(nameLabel, t(`dots.n.${NAMES[e]}` as any))
      setText(timeLabel, t('viz3d.million.counting', { d: duration(total) }))
    }
  },
  { camera: [15, 11, 17], target: [0, 4, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
