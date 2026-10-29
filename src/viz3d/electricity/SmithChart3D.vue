<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground } from '../useThree'
import { FONT, hex, canvasTexture, makeTag } from '../networking/parts'
import { t } from '../../i18n'
import { fmt } from '../../engine/math'
import { Z0, readParams, gammaOf, zOf, rotate, mag, arg, vswrOf, envelope, cfmt, drawSmithGrid } from '../../viz/electricity/smithModel'

// electricity/smith-chart. Same params and model as src/viz/electricity/SmithChart.vue: R and X (the
// antenna, Ω) and d (how far back along the cable you look, in wavelengths). A transmitter pushes a
// wave down a cable to an antenna. Above the cable the forward wave (blue) runs towards the antenna
// and the echo (orange) runs back; on the cable itself their sum is drawn as beads inside the ribbon
// it never leaves. Rings leave the antenna for the power that gets out; the transmitter glows red
// with the power that comes back. A meter rides the cable at d, and the Smith chart on the board
// beside the antenna shows the antenna's point and the meter's point: the same point, turned.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()

const LAMBDA = 6 // world units per wavelength
const XT = -LAMBDA - 1.2 // the transmitter end of the cable; the antenna stands at x = 0
const CY = 1.0 // the cable's height
const WY = 3.4 // where the two travelling waves are drawn
const N = 160 // samples along the cable
const BOARD = { x: 3.3, y: 2.6, z: -2.1, r: 1.85 } // the chart standing beside the antenna

const p = computed(() => readParams(props.params))
const gL = computed(() => gammaOf(p.value.R / Z0, p.value.X / Z0))
const gD = computed(() => rotate(gL.value, p.value.d))
const zD = computed(() => zOf(gD.value))
const m = computed(() => mag(gL.value))
const pct = computed(() => Math.round(m.value * m.value * 100))
// "20%" and "50 − j50 Ω" are left-to-right runs inside the sentence; isolated, Arabic keeps them whole.
const iso = (s: string) => `⁦${s}⁩`
const sentence = computed(() =>
  m.value < 0.05 ? t('viz3d.smith.matched') : t('viz3d.smith.bounce', { pct: iso(`${pct.value}%`), vswr: iso(fmt(vswrOf(m.value), 1)) }),
)
const here = computed(() => t('viz3d.smith.here', { z: iso(`${cfmt(zD.value.re * Z0, zD.value.im * Z0)} Ω`) }))

// Walking: step d back from the antenna until half a wavelength, one full turn of the point.
const walking = ref(false)
function restart() {
  walking.value = false
  emit('set', 'd', 0)
}
function toggleWalk() {
  if (!walking.value && p.value.d >= 0.5) emit('set', 'd', 0)
  walking.value = !walking.value
}

const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.add(ground(30, theme))
    const lineOf = (color: THREE.Color, count: number, dashed = false, opacity = 1) => {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
      const mat = dashed
        ? new THREE.LineDashedMaterial({ color, dashSize: 0.14, gapSize: 0.1, transparent: true, opacity })
        : new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })
      const l = new THREE.Line(g, mat)
      scene.add(l)
      return l
    }
    const setPts = (l: THREE.Line, pts: THREE.Vector3[]) => {
      const a = l.geometry.attributes.position as THREE.BufferAttribute
      pts.forEach((v, i) => a.setXYZ(i, v.x, v.y, v.z))
      a.needsUpdate = true
      if (l.material instanceof THREE.LineDashedMaterial) l.computeLineDistances()
    }

    // the cable on its posts, the transmitter at the far end, the antenna at x = 0
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, -XT, 10), new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.7 }))
    cable.rotation.z = Math.PI / 2
    cable.position.set(XT / 2, CY, 0)
    cable.castShadow = true
    scene.add(cable)
    const postMat = new THREE.MeshStandardMaterial({ color: theme.line, roughness: 0.9 })
    for (const x of [XT + 1.6, XT / 2, -1.6]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, CY, 8), postMat)
      post.position.set(x, CY / 2, 0)
      scene.add(post)
    }
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 1.1), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 0.8 }))
    box.position.set(XT - 0.75, 0.55, 0)
    box.castShadow = box.receiveShadow = true
    scene.add(box)
    const dial = new THREE.Mesh(new THREE.CircleGeometry(0.2, 20), new THREE.MeshBasicMaterial({ color: theme.bg }))
    dial.position.set(XT - 0.75, 0.68, 0.56)
    scene.add(dial)
    const heatMat = new THREE.MeshBasicMaterial({ color: theme.neg, transparent: true, opacity: 0, depthWrite: false })
    const heat = new THREE.Mesh(new THREE.SphereGeometry(1.1, 18, 12), heatMat)
    heat.position.copy(box.position)
    scene.add(heat)
    const mastMat = new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 })
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, CY, 10), mastMat)
    mast.position.set(0, CY / 2, 0)
    scene.add(mast)
    const whip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.9, 8), mastMat)
    whip.position.set(0, CY + 0.95, 0)
    whip.castShadow = true
    scene.add(whip)
    // what the antenna sends out: rings spreading from the whip, faint when most of the wave bounces back
    const rings = [0, 1, 2].map(() => {
      const r = new THREE.Mesh(new THREE.TorusGeometry(1, 0.025, 6, 64), new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, opacity: 0.6 }))
      r.rotation.x = Math.PI / 2
      r.position.set(0, CY + 1.3, 0)
      scene.add(r)
      return r
    })

    // the waves: forward wave and echo above the cable; their sum as beads on the cable, inside its envelope
    const fwd = lineOf(theme.accent, N + 1)
    const echo = lineOf(theme.accent2, N + 1)
    const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshStandardMaterial({ color: theme.fg, roughness: 0.5 }), N + 1)
    beads.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(beads)
    const ribGeo = new THREE.BufferGeometry()
    ribGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((N + 1) * 6), 3))
    ribGeo.setIndex(Array.from({ length: N }, (_, i) => [2 * i, 2 * i + 1, 2 * i + 2, 2 * i + 1, 2 * i + 3, 2 * i + 2]).flat())
    const ribbon = new THREE.Mesh(
      ribGeo,
      new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }),
    )
    scene.add(ribbon)
    const base = lineOf(theme.muted, 2, true, 0.6) // the waves' zero line
    setPts(base, [new THREE.Vector3(XT, WY, 0), new THREE.Vector3(0, WY, 0)])

    // the meter riding the cable d wavelengths back from the antenna
    const probe = new THREE.Group()
    const meter = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.4), new THREE.MeshStandardMaterial({ color: theme.accent, roughness: 0.6 }))
    meter.position.y = -0.42
    meter.castShadow = true
    const clip = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 6, 20), new THREE.MeshStandardMaterial({ color: theme.accent }))
    probe.add(meter, clip)
    scene.add(probe)

    // the Smith chart on a board beside the antenna
    const boardTex = canvasTexture(1024, 1024, textures)
    let boardKey = ''
    function paintBoard() {
      const key = hex(theme.fg) + hex(theme.bg)
      if (key === boardKey) return
      boardKey = key
      const { c, g, tex } = boardTex
      g.clearRect(0, 0, c.width, c.height)
      g.globalAlpha = 0.94
      g.fillStyle = hex(theme.bg)
      g.beginPath()
      g.roundRect(0, 0, c.width, c.height, 40)
      g.fill()
      g.globalAlpha = 1
      drawSmithGrid(g, 512, 512, 430, { grid: hex(theme.muted), axis: hex(theme.fg), text: hex(theme.fg), font: FONT, match: hex(theme.accent) })
      tex.needsUpdate = true
    }
    const side = (BOARD.r * 1024) / 430
    const board = new THREE.Mesh(new THREE.PlaneGeometry(side, side), new THREE.MeshBasicMaterial({ map: boardTex.tex, transparent: true }))
    board.position.set(BOARD.x, BOARD.y, BOARD.z)
    scene.add(board)
    const frame = new THREE.Mesh(new THREE.BoxGeometry(side + 0.12, side + 0.12, 0.06), new THREE.MeshStandardMaterial({ color: theme.line, roughness: 0.8 }))
    frame.position.set(BOARD.x, BOARD.y, BOARD.z - 0.04)
    frame.castShadow = true
    scene.add(frame)
    for (const dx of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, BOARD.y, 8), postMat)
      leg.position.set(BOARD.x + dx * side * 0.4, BOARD.y / 2, BOARD.z - 0.04)
      scene.add(leg)
    }
    const onBoard = (g: { re: number; im: number }, lift = 0.04) => new THREE.Vector3(BOARD.x + g.re * BOARD.r, BOARD.y + g.im * BOARD.r, BOARD.z + lift)
    const loadDot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), new THREE.MeshBasicMaterial({ color: theme.accent2 }))
    const seenDot = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), new THREE.MeshBasicMaterial({ color: theme.accent }))
    const centre = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.1, 16), new THREE.MeshBasicMaterial({ color: theme.pos, side: THREE.DoubleSide }))
    centre.position.copy(onBoard({ re: 0, im: 0 }))
    scene.add(loadDot, seenDot, centre)
    const vswrRing = lineOf(theme.muted, 97, true, 0.8)
    const arcLine = lineOf(theme.accent, 41)
    const link = lineOf(theme.accent, 2, true, 0.7)

    const tags = {
      tx: makeTag(0.05, textures),
      ant: makeTag(0.05, textures),
      here: makeTag(0.05, textures),
      load: makeTag(0.045, textures, 'left'),
      seen: makeTag(0.045, textures, 'left'),
      chart: makeTag(0.05, textures),
      heat: makeTag(0.045, textures),
    }
    for (const tg of Object.values(tags)) scene.add(tg.sprite)
    tags.tx.sprite.position.set(XT - 0.75, 1.5, 0.6)
    tags.ant.sprite.position.set(0, CY + 2.25, 0)
    tags.chart.sprite.position.set(BOARD.x, BOARD.y + side / 2 + 0.35, BOARD.z)
    tags.heat.sprite.position.set(XT - 0.75, 2.0, 0.6)

    if (camera.aspect < 1.3) camera.position.sub(controls.target).multiplyScalar(1.9).add(controls.target)

    const mtx = new THREE.Matrix4()
    let lastKey = ''
    let lastStep = 0
    return (_dt, time) => {
      const { d } = p.value
      // walking: 0.005 λ every 0.05 s, half a wavelength in five seconds
      if (walking.value && time - lastStep > 0.05) {
        lastStep = time
        if (d >= 0.5) walking.value = false
        else emit('set', 'd', Math.round((d + 0.005) * 1000) / 1000)
      }
      const g = gL.value
      const gm = m.value
      const th = arg(g)
      paintBoard()
      const key = `${p.value.R}|${p.value.X}|${d}|${boardKey}`
      if (key !== lastKey) {
        lastKey = key
        // the envelope: ± the size of the voltage at each point of the cable
        const a = ribGeo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i <= N; i++) {
          const x = XT + (i / N) * -XT
          const A = envelope(g, -x / LAMBDA) * 0.5
          a.setXYZ(2 * i, x, CY + A, 0)
          a.setXYZ(2 * i + 1, x, CY - A, 0)
        }
        a.needsUpdate = true
        // the chart: the antenna's point, the circle it turns on, and the arc to the point seen from the meter
        loadDot.position.copy(onBoard(g, 0.05))
        seenDot.position.copy(onBoard(gD.value, 0.07))
        setPts(
          vswrRing,
          Array.from({ length: 97 }, (_, i) => onBoard({ re: gm * Math.cos((i / 96) * 2 * Math.PI), im: gm * Math.sin((i / 96) * 2 * Math.PI) }, 0.03)),
        )
        setPts(
          arcLine,
          Array.from({ length: 41 }, (_, i) => onBoard(rotate(g, (d * i) / 40), 0.06)),
        )
        probe.position.set(-d * LAMBDA, CY, 0)
        setPts(link, [new THREE.Vector3(-d * LAMBDA, CY + 0.18, 0), seenDot.position])
        link.visible = seenDot.visible = arcLine.visible = d > 0.002
        heatMat.opacity = gm * gm * 0.8
        tags.here.sprite.position.set(-d * LAMBDA, CY - 0.95, 0.3)
        tags.load.sprite.position.copy(loadDot.position).add(new THREE.Vector3(0.16, 0.04, 0.1))
        tags.seen.sprite.position.copy(seenDot.position).add(new THREE.Vector3(0.16, -0.2, 0.1))
        tags.seen.sprite.visible = d > 0.002
      }
      // the travelling waves: forward towards the antenna, the echo back, their sum on the cable
      const w = time * Math.PI
      const fa = fwd.geometry.attributes.position as THREE.BufferAttribute
      const ea = echo.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i <= N; i++) {
        const x = XT + (i / N) * -XT
        const s = -x / LAMBDA
        const f = Math.cos(w + 2 * Math.PI * s)
        const e = gm * Math.cos(w - 2 * Math.PI * s + th)
        fa.setXYZ(i, x, WY + 0.42 * f, 0)
        ea.setXYZ(i, x, WY + 0.42 * e, 0)
        mtx.makeTranslation(x, CY + 0.5 * (f + e), 0)
        beads.setMatrixAt(i, mtx)
      }
      fa.needsUpdate = ea.needsUpdate = true
      beads.instanceMatrix.needsUpdate = true
      rings.forEach((r, i) => {
        const u = (time * 0.45 + i / 3) % 1
        r.scale.setScalar(0.25 + 1.6 * u)
        ;(r.material as THREE.MeshBasicMaterial).opacity = (1 - u) * 0.7 * (1 - gm * gm)
      })
      tags.tx.paint(t('smith.transmitter'), theme.fg, theme.bg)
      tags.ant.paint(t('smith.antenna'), theme.fg, theme.bg)
      tags.here.paint(t('viz3d.smith.probe'), theme.accent, theme.bg)
      tags.load.paint(t('smith.load'), theme.accent2, theme.bg)
      tags.seen.paint(t('viz3d.smith.seen'), theme.accent, theme.bg)
      tags.chart.paint(t('viz3d.smith.chart'), theme.fg, theme.bg)
      tags.heat.paint(pct.value >= 1 ? t('viz3d.smith.heat', { pct: iso(`${pct.value}%`) }) : '', theme.neg, theme.bg)
    }
  },
  { camera: [-1.6, 6.2, 14.4], target: [-1.9, 2.3, -0.4], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div
      class="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-3 py-1.5 text-xs"
      style="background: var(--panel); border-color: var(--line)"
    >
      <span class="font-semibold" :style="{ color: m < 0.05 ? 'var(--pos)' : 'var(--fg)' }">{{ sentence }}</span>
      <span style="color: var(--muted)">{{ here }}</span>
      <span class="flex items-center gap-1.5" style="color: var(--muted)"
        ><span class="inline-block h-0.5 w-3" style="background: var(--accent)" />{{ t('viz3d.smith.forward') }}</span
      >
      <span class="flex items-center gap-1.5" style="color: var(--muted)"
        ><span class="inline-block h-0.5 w-3" style="background: var(--accent-2)" />{{ t('viz3d.smith.reflected') }}</span
      >
      <span class="flex items-center gap-1.5" style="color: var(--muted)"
        ><span class="inline-block h-2 w-2 rounded-full" style="background: var(--fg)" />{{ t('viz3d.smith.total') }}</span
      >
      <button class="pointer-events-auto ms-auto rounded-md border px-2 py-0.5" style="border-color: var(--line); color: var(--fg)" @click="toggleWalk">
        {{ walking ? t('viz3d.smith.pause') : t('viz3d.smith.walk') }}
      </button>
      <button
        class="pointer-events-auto rounded-md border px-2 py-0.5"
        style="border-color: var(--line); color: var(--muted)"
        @click="restart"
      >
        {{ t('viz3d.smith.restart') }}
      </button>
    </div>
  </div>
</template>
