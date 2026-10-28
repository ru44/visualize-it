<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from '../useThree'
import { FONT, hex, canvasTexture, makeTag, makeTower } from './parts'
import { t, locale } from '../../i18n'
import { fmt } from '../../engine/math'
import { SPAN, P1, readParams, signal, handoverAt, barsOf } from '../../viz/networking/cellModel'

// networking/cell-towers. Same params and model as src/viz/networking/CellTowers.vue: d (km from
// tower A), n (how fast the signal fades) and H (handover margin, dB). You walk down the road between
// two towers. A live link runs to the tower your phone uses and a faint one to the tower it keeps
// measuring; rings on the ground mark where each tower drops to 3, 2 and 1 bars, and they shrink as
// n grows and the town fills with taller buildings. The gate over the road is the handover point.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()

const KM = 2 // world units per km
const MAST = 5.6
const X = (km: number) => (km - SPAN / 2) * KM
const RINGS = [-85, -95, -105] // where the bars drop from 4 to 3, 3 to 2, 2 to 1

const p = computed(() => readParams(props.params))
const pA = computed(() => signal(p.value.d, p.value.n))
const pB = computed(() => signal(SPAN - p.value.d, p.value.n))
const diff = computed(() => pB.value - pA.value)
const onB = computed(() => diff.value > p.value.H)
const used = computed(() => (onB.value ? pB.value : pA.value))
const bars = computed(() => barsOf(used.value))
const place = computed(() => t(`viz3d.towers.place${Math.min(3, Math.floor((p.value.n - 2) / 0.5))}` as 'viz3d.towers.place0'))
// "−92 dBm" and "3.2 dB" are left-to-right runs inside the sentence; isolated, Arabic keeps them whole.
const iso = (s: string) => `⁦${s}⁩`
const db = (v: number) => iso(`${fmt(Math.abs(v), 1)} dB`)
const sentence = computed(() => {
  if (onB.value) return t('viz3d.towers.moved', { h: db(p.value.H) })
  if (diff.value <= 0) return t('viz3d.towers.weaker', { db: db(diff.value) })
  return t('viz3d.towers.waiting', { db: db(diff.value), h: db(p.value.H) })
})

// Walking: step d forward a tenth of a km at a time until tower B.
const walking = ref(false)
function toggleWalk() {
  if (!walking.value && p.value.d >= 5.8) emit('set', 'd', 0.2)
  walking.value = !walking.value
}

const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

// A seeded scatter of buildings and trees, away from the road and the towers' feet.
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
}
const rnd = makeRng(20261028)
function scatter(count: number) {
  const out: { x: number; z: number; w: number; d: number; k: number }[] = []
  while (out.length < count) {
    const x = (rnd() * 2 - 1) * 8.4
    const z = -7 + rnd() * 12.5
    if (Math.abs(z) < 1.5 || Math.hypot(x - X(0), z) < 1.6 || Math.hypot(x - X(SPAN), z) < 1.6) continue
    if (out.some((o) => Math.hypot(o.x - x, o.z - z) < 1.15)) continue
    // in front of the road (towards the camera) only low houses, so nothing hides you or the road
    out.push({ x, z, w: 0.55 + rnd() * 0.6, d: 0.55 + rnd() * 0.6, k: z > 0 ? 0.1 + rnd() * 0.06 : 0.5 + rnd() * 0.5 })
  }
  return out
}
const LOTS = scatter(64)

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.add(ground(30, theme))

    // the road, with the stretch each tower serves painted along its edge
    const road = new THREE.Mesh(new THREE.PlaneGeometry(X(SPAN) - X(0) + 3, 1.3), new THREE.MeshStandardMaterial({ color: theme.line, roughness: 1 }))
    road.rotation.x = -Math.PI / 2
    road.position.y = 0.01
    road.receiveShadow = true
    scene.add(road)
    for (let k = 0; k < 14; k++) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.07), new THREE.MeshBasicMaterial({ color: theme.bg }))
      dash.rotation.x = -Math.PI / 2
      dash.position.set(X(0) + 0.4 + k * 0.9, 0.015, 0)
      scene.add(dash)
    }
    const stripe = (color: THREE.Color) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.22), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 }))
      m.rotation.x = -Math.PI / 2
      m.position.set(0, 0.02, 0.78)
      scene.add(m)
      return m
    }
    const stripeA = stripe(theme.accent)
    const stripeB = stripe(theme.accent2)

    // the middle of the road, where both towers are equally strong
    const midLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.03, -6.5), new THREE.Vector3(0, 0.03, 5.5)]), new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.25, gapSize: 0.2 }))
    midLine.computeLineDistances()
    scene.add(midLine)

    // the handover gate over the road
    const gate = new THREE.Group()
    const gateMat = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.6 })
    for (const z of [-0.85, 0.85]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), gateMat)
      post.position.set(0, 0.8, z)
      post.castShadow = true
      gate.add(post)
    }
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.8), gateMat)
    bar.position.y = 1.6
    gate.add(bar)
    scene.add(gate)

    // towers, with the rings where each one drops a bar
    const towers = [
      { km: 0, color: theme.accent, label: 'towers.towerA' as const },
      { km: SPAN, color: theme.accent2, label: 'towers.towerB' as const },
    ].map((tw) => {
      const g = makeTower(MAST, theme)
      g.position.set(X(tw.km), 0, 0)
      scene.add(g)
      const circle = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, i) => new THREE.Vector3(Math.cos((i / 128) * 2 * Math.PI), 0, Math.sin((i / 128) * 2 * Math.PI))))
      const rings = RINGS.map((_, i) => {
        const ring = new THREE.Line(circle, new THREE.LineBasicMaterial({ color: tw.color, transparent: true, opacity: 0.75 - i * 0.22 }))
        ring.position.set(X(tw.km), 0.04, 0)
        scene.add(ring)
        return ring
      })
      const tag = makeTag(0.055, textures)
      tag.sprite.position.set(X(tw.km), MAST + 0.8, 0)
      scene.add(tag.sprite)
      return { ...tw, rings, tag, panel: new THREE.Vector3(X(tw.km), MAST - 0.75, 0) }
    })

    // the town: trees in open country, more and taller buildings as n grows
    const blockMat = new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.85 })
    const edgeMat = new THREE.LineBasicMaterial({ color: theme.muted, transparent: true, opacity: 0.45 })
    const unitBox = new THREE.BoxGeometry(1, 1, 1)
    unitBox.translate(0, 0.5, 0)
    const unitEdges = new THREE.EdgesGeometry(unitBox)
    const blocks = LOTS.map((l) => {
      const g = new THREE.Group()
      const m = new THREE.Mesh(unitBox, blockMat)
      m.castShadow = m.receiveShadow = true
      g.add(m, new THREE.LineSegments(unitEdges, edgeMat))
      g.position.set(l.x, 0, l.z)
      g.scale.set(l.w, 1, l.d)
      scene.add(g)
      return { g, l }
    })
    const treeMat = new THREE.MeshStandardMaterial({ color: theme.pos, roughness: 0.9 })
    const trees = LOTS.slice(0, 26).map((l) => {
      const tree = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1, 7), treeMat)
      tree.position.set(l.x + 0.3, 0.5, l.z - 0.3)
      tree.castShadow = true
      scene.add(tree)
      return tree
    })

    // you: a small figure on the road, the link to your tower, and your bars above you
    const you = new THREE.Group()
    const skin = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.6 })
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.55, 4, 10), skin)
    body.position.y = 0.48
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), skin)
    head.position.y = 1.05
    body.castShadow = head.castShadow = true
    you.add(body, head)
    scene.add(you)
    const linkMat = new THREE.LineBasicMaterial({ color: theme.accent })
    const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), linkMat)
    scene.add(link)
    const probeMat = new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.12, gapSize: 0.16, transparent: true, opacity: 0.8 })
    const probe = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), probeMat)
    scene.add(probe)
    const pulseMat = new THREE.MeshBasicMaterial({ color: theme.accent, toneMapped: false })
    const pulses = Array.from({ length: 3 }, () => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), pulseMat)
      scene.add(s)
      return s
    })

    // bars and dBm over your head, the size of a label at any distance
    const barsTex = canvasTexture(512, 128, textures)
    const barsTag = new THREE.Sprite(new THREE.SpriteMaterial({ map: barsTex.tex, transparent: true, depthTest: false, sizeAttenuation: false }))
    barsTag.scale.set(0.072 * 4, 0.072, 1)
    barsTag.renderOrder = 10
    scene.add(barsTag)
    let lastBars = ''
    function paintBars(nBars: number, dbm: number) {
      const key = `${nBars}|${fmt(dbm, 0)}|${hex(theme.fg)}`
      if (key === lastBars) return
      lastBars = key
      const { c, g, tex } = barsTex
      g.clearRect(0, 0, c.width, c.height)
      g.globalAlpha = 0.9
      g.fillStyle = hex(theme.bg)
      g.beginPath()
      g.roundRect(8, 8, c.width - 16, c.height - 16, 26)
      g.fill()
      g.globalAlpha = 1
      for (let i = 0; i < 4; i++) {
        g.fillStyle = hex(i < nBars ? theme.pos : theme.line)
        g.fillRect(40 + i * 30, 98 - 16 - i * 16, 20, 16 + i * 16)
      }
      g.fillStyle = hex(nBars ? theme.fg : theme.neg)
      g.font = `600 54px ${FONT}`
      g.direction = 'ltr'
      g.textAlign = 'left'
      g.textBaseline = 'middle'
      g.fillText(`${fmt(dbm, 0).replace('-', '−')} dBm`, 178, 66)
      tex.needsUpdate = true
    }
    const tagHand = makeTag(0.05, textures)
    scene.add(tagHand.sprite)
    const tagMid = makeTag(0.045, textures)
    tagMid.sprite.position.set(0, 0.3, 5.9)
    scene.add(tagMid.sprite)

    if (camera.aspect < 1.3) camera.position.sub(controls.target).multiplyScalar(1.4).add(controls.target)

    let lastKey = ''
    let lastStep = 0
    return (_dt, time) => {
      const { d, n, H } = p.value
      // walking: a tenth of a km every 0.12 s
      if (walking.value && time - lastStep > 0.12) {
        lastStep = time
        if (d >= 5.8) walking.value = false
        else emit('set', 'd', Math.round((d + 0.1) * 10) / 10)
      }

      const b = onB.value
      const hand = handoverAt(n, H)
      const key = `${d}|${n}|${H}|${locale.value}`
      if (key !== lastKey) {
        lastKey = key
        // who serves each stretch of road, and the gate where it changes
        const xh = X(hand)
        stripeA.scale.x = xh - X(0)
        stripeA.position.x = (X(0) + xh) / 2
        stripeB.scale.x = X(SPAN) - xh
        stripeB.position.x = (xh + X(SPAN)) / 2
        gate.position.x = xh
        // in front of the road, so it never sits on your bars as you walk through the gate
        tagHand.sprite.position.set(xh, 0.2, 2)
        // rings: radius where P1 − 10·n·log10(r) equals each threshold; hidden past the edge of the town
        for (const tw of towers)
          tw.rings.forEach((ring, i) => {
            const r = 10 ** ((P1 - RINGS[i]) / (10 * n)) * KM
            ring.scale.setScalar(r)
            ring.visible = r < 13
          })
        // the town: u = 0 open country … 1 dense city
        const u = (n - 2) / 2
        const shown = Math.round(4 + 56 * u)
        blocks.forEach(({ g, l }, i) => {
          g.visible = i < shown
          g.scale.y = 0.35 + l.k * (0.35 + 3.4 * u * u)
        })
        trees.forEach((tree, i) => (tree.visible = i < Math.round(26 * (1 - u)) && i >= shown))
        you.position.set(X(d), 0, 0)
      }

      // links: solid to the tower in use, dashed to the one still being measured
      const headPos = new THREE.Vector3(X(d), 1.15, 0)
      const serving = towers[b ? 1 : 0]
      const other = towers[b ? 0 : 1]
      const lp = link.geometry.attributes.position as THREE.BufferAttribute
      lp.setXYZ(0, headPos.x, headPos.y, headPos.z)
      lp.setXYZ(1, serving.panel.x, serving.panel.y, serving.panel.z)
      lp.needsUpdate = true
      linkMat.color.copy(serving.color)
      const pp = probe.geometry.attributes.position as THREE.BufferAttribute
      pp.setXYZ(0, headPos.x, headPos.y, headPos.z)
      pp.setXYZ(1, other.panel.x, other.panel.y, other.panel.z)
      pp.needsUpdate = true
      probe.computeLineDistances()
      pulseMat.color.copy(serving.color)
      pulses.forEach((s, i) => s.position.copy(serving.panel).lerp(headPos, (time * 0.7 + i / 3) % 1))

      you.position.y = walking.value ? Math.abs(Math.sin(time * 9)) * 0.06 : 0
      barsTag.position.set(X(d), 2.05, 0)
      paintBars(bars.value, used.value)
      for (const tw of towers) tw.tag.paint(t(tw.label), tw.color, theme.bg)
      tagHand.paint(t('towers.handover'), theme.fg, theme.bg)
      tagMid.paint(t('towers.middle'), theme.muted, theme.bg)
    }
  },
  { camera: [0, 9.6, 16.2], target: [0, 2.2, -1], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div class="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-3 py-1.5 text-xs" style="background: var(--panel); border-color: var(--line)">
      <span class="font-semibold" :style="{ color: onB ? 'var(--accent-2)' : 'var(--accent)' }">{{ t('viz3d.towers.on', { t: onB ? 'B' : 'A' }) }}</span>
      <span class="num" dir="ltr" style="color: var(--fg)">{{ fmt(used, 0).replace('-', '−') }} dBm</span>
      <span style="color: var(--muted)">{{ sentence }}</span>
      <span class="ms-auto" style="color: var(--muted)">{{ place }}</span>
      <button class="pointer-events-auto rounded-md border px-2 py-0.5" style="border-color: var(--line); color: var(--fg)" @click="toggleWalk">{{ walking ? t('viz3d.towers.pause') : t('viz3d.towers.walk') }}</button>
      <button class="pointer-events-auto rounded-md border px-2 py-0.5" style="border-color: var(--line); color: var(--muted)" @click="walking = false; emit('set', 'd', 0.2)">{{ t('viz3d.towers.restart') }}</button>
    </div>
  </div>
</template>
