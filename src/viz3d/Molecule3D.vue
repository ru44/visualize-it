<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useThree, label } from './useThree'
import { loadModel, fit } from './models'
import { elements } from '../viz/elements'
import { t } from '../i18n'

// A water molecule (covalent, sharing electrons, bent at 104.5°) next to a salt lattice (ionic, whole
// electrons traded, packed in a repeating grid) — two different answers to the same octet rule, side by
// side. The ring beneath each brightens for whichever kind of bond the selected element (Z) leans toward.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()
const METAL = new Set(['alkali', 'alkaline', 'transition', 'post'])
const ANGLE = (104.5 * Math.PI) / 180

function bond(from: THREE.Vector3, to: THREE.Vector3, color: THREE.Color) {
  const dir = to.clone().sub(from)
  const len = dir.length()
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, len, 8), new THREE.MeshStandardMaterial({ color }))
  cyl.position.copy(from).addScaledVector(dir, 0.5)
  cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
  return cyl
}

useThree(
  el,
  ({ scene, theme }) => {
    // ---- water (covalent), left -------------------------------------------------------------------
    const water = new THREE.Group()
    water.position.set(-2.3, 0.9, 0)
    scene.add(water)
    const half = ANGLE / 2
    const O = new THREE.Vector3(0, 0, 0)
    const H1 = new THREE.Vector3(Math.sin(half), Math.cos(half), 0)
    const H2 = new THREE.Vector3(-Math.sin(half), Math.cos(half), 0)
    const oMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 14), new THREE.MeshStandardMaterial({ color: theme.neg, roughness: 0.4 }))
    const h1Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.5 }))
    const h2Mesh = h1Mesh.clone()
    h1Mesh.position.copy(H1)
    h2Mesh.position.copy(H2)
    const fallback = new THREE.Group()
    fallback.add(oMesh, h1Mesh, h2Mesh, bond(O, H1, theme.muted), bond(O, H2, theme.muted))
    water.add(fallback)
    loadModel('water-molecule').then((m) => {
      if (!m) return
      fallback.visible = false
      water.add(fit(m, 1.5))
    })
    const wTag = label('', undefined, 0.5)
    wTag.position.set(0, 1.5, 0)
    water.add(wTag)
    const angleTag = label('104.5°', undefined, 0.4)
    angleTag.position.set(0, 0.55, 0.35)
    water.add(angleTag)

    // ---- salt lattice (ionic), right ---------------------------------------------------------------
    const salt = new THREE.Group()
    salt.position.set(2.3, 0.9, 0)
    scene.add(salt)
    const naMat = new THREE.MeshStandardMaterial({ color: theme.accent2, roughness: 0.4 })
    const clMat = new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.5 })
    const naGeo = new THREE.SphereGeometry(0.16, 8, 6)
    const clGeo = new THREE.SphereGeometry(0.12, 8, 6)
    const SPACING = 0.42
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++) {
          const isNa = (i + j + k) % 2 === 0
          const ion = new THREE.Mesh(isNa ? naGeo : clGeo, isNa ? naMat : clMat)
          ion.position.set(i * SPACING, j * SPACING + 0.6, k * SPACING)
          salt.add(ion)
        }
    const sTag = label('', undefined, 0.5)
    sTag.position.set(0, 1.5, 0)
    salt.add(sTag)

    // ---- highlight rings: which bond type the current element (Z) leans toward --------------------
    const ringMat1 = new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
    const ringMat2 = ringMat1.clone()
    const wRing = new THREE.Mesh(new THREE.RingGeometry(0.85, 0.98, 32), ringMat1)
    const sRing = new THREE.Mesh(new THREE.RingGeometry(0.85, 0.98, 32), ringMat2)
    wRing.rotation.x = sRing.rotation.x = -Math.PI / 2
    water.add(wRing)
    salt.add(sRing)

    function setText(sprite: THREE.Sprite, text: string) {
      const c = (sprite.material as THREE.SpriteMaterial).map!.image as HTMLCanvasElement
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, c.width, c.height)
      cx.font = '500 34px Inter, sans-serif'
      cx.fillStyle = '#' + theme.fg.getHexString()
      cx.textAlign = 'center'
      cx.fillText(text, 128, 46)
      ;(sprite.material as THREE.SpriteMaterial).map!.needsUpdate = true
    }
    setText(wTag, `H₂O · ${t('viz3d.molecule.covalent')}`)
    setText(sTag, `NaCl · ${t('viz3d.molecule.ionic')}`)

    let lastZ = -1
    return () => {
      const Z = Math.round(Math.min(86, Math.max(1, props.params.Z ?? 9)))
      if (Z === lastZ) return
      lastZ = Z
      const leansIonic = METAL.has(elements[Z - 1]?.c ?? '')
      ringMat1.opacity = leansIonic ? 0.12 : 0.4
      ringMat2.opacity = leansIonic ? 0.4 : 0.12
    }
  },
  { camera: [2, 3, 7], target: [0, 0.9, 0], fov: 45 },
)
</script>

<template>
  <div ref="el" class="h-full w-full" />
</template>
