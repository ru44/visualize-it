<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, type Theme } from '../useThree'
import { FONT, hex, makeTag, makePhone, makeTower, makeHouse, fader } from './parts'
import { t, isRtl, locale } from '../../i18n'
import { codeAt, type Code } from '../../viz/networking/mmiCodes'

// networking/dialer-codes. Same params as src/viz/networking/MmiDialer.vue: code (0..4, which string
// is dialed) and rtt (one round trip to the carrier, ms). The flat picture shows how the dialer
// decides; this one shows where the request physically goes. A code the phone answers itself never
// leaves it. The two carrier codes ride the radio up to the tower, down its cable to the carrier and
// back, shown SLOW times slower than real with a clock counting the real milliseconds. A plain
// number goes all the way to the other phone, through the tower near it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const el = ref<HTMLElement>()

const SLOW = 15
const TYPE = 1.1 // s to type the code
const GLOW = 0.7 // s for a code answered on the phone
const CALL_TRIP = 2.6 // s for a call to reach the other phone (a call has no answer time to measure)
const SHOW = 3.4 // s the result stays before the scene types the code again
const IMEI = '490154203237518' // the usual textbook example, not a real phone's

type Stage = 'typing' | 'out' | 'back' | 'glow' | 'trip' | 'done'
const code = computed(() => codeAt(props.params.code))
const rtt = computed(() => Math.min(Math.max(props.params.rtt ?? 50, 10), 300))
const raw = computed(() => code.value.seg.map((s) => s.s).join(''))
const stage = ref<Stage>('typing')
const ms = ref(0)

function timeline(c: Code, rttMs: number): [Stage, number][] {
  const half = (rttMs / 2000) * SLOW
  if (c.dest === 'network') return [['typing', TYPE], ['out', half], ['back', half], ['done', SHOW]]
  if (c.dest === 'call') return [['typing', TYPE], ['trip', CALL_TRIP], ['done', SHOW]]
  return [['typing', TYPE], ['glow', GLOW], ['done', SHOW]]
}

const status = computed(() => {
  const c = code.value
  const s = stage.value
  if (s === 'typing') return t('viz3d.mmi.typing')
  if (s === 'out') return t('viz3d.mmi.out')
  if (s === 'back') return t('viz3d.mmi.back')
  if (c.dest === 'call') return s === 'trip' ? t('viz3d.mmi.calling') : t('viz3d.mmi.ringing')
  if (c.dest === 'network') return t(c.answer)
  return c.dest === 'app' ? t('viz3d.mmi.app') : t('viz3d.mmi.local')
})
// "120 ms" is a left-to-right run inside the sentence; isolated, Arabic keeps it as "120 ms", not "ms 120".
const msText = (v: number) => `\u2066${v} ms\u2069`
const clock = computed(() => {
  const c = code.value
  const s = stage.value
  if (c.dest === 'call' || s === 'typing') return ''
  if (c.dest !== 'network') return t('viz3d.mmi.zero', { ms: msText(0) })
  return s === 'done' ? t('viz3d.mmi.replied', { ms: msText(rtt.value) }) : `⏱ ${msText(ms.value)} · ${t('viz3d.mmi.slow', { k: SLOW })}`
})

const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

/** Position along a polyline at fraction f of its length: the pulse moves at one steady speed. */
function along(pts: THREE.Vector3[]) {
  const cum = [0]
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]))
  const total = cum[cum.length - 1]
  return (f: number, out: THREE.Vector3) => {
    const d = Math.min(Math.max(f, 0), 1) * total
    let i = 1
    while (i < cum.length - 1 && cum[i] < d) i++
    return out.copy(pts[i - 1]).lerp(pts[i], (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1))
  }
}

// ---- the scene ----------------------------------------------------------------------------------------
const PHONE_W = 1.6
const PHONE_H = 3
const B_W = 1
const B_H = 1.9
const MAST_A = 5.3
const MAST_B = 4.6
const DOCK = 0.24 // dock height under a phone

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.add(ground(26, theme))

    const A = new THREE.Vector3(-4.6, 0, 3.2)
    const TA = new THREE.Vector3(-3.2, 0, -2.6)
    const C = new THREE.Vector3(0.8, 0, -5.6)
    const TB = new THREE.Vector3(4.6, 0, -2.6)
    const B = new THREE.Vector3(4.9, 0, 2.8)

    for (const [x, z, w, d, h] of [[-7.6, -4.8, 1.6, 1.4, 1.1], [-0.9, -0.8, 1.3, 1.2, 0.9], [3.6, -7.2, 1.8, 1.4, 1.2], [8, -4.6, 1.4, 1.6, 1], [1.2, 2.6, 1.2, 1.1, 0.8]]) {
      const house = makeHouse(theme, w, d, h)
      house.position.set(x, 0, z)
      scene.add(house)
    }

    const phoneA = makePhone(PHONE_W, PHONE_H, theme, 420, textures)
    phoneA.group.position.set(A.x, PHONE_H / 2 + DOCK, A.z)
    phoneA.group.rotation.set(-0.1, 0.32, 0)
    scene.add(phoneA.group)
    const phoneB = makePhone(B_W, B_H, theme, 260, textures)
    phoneB.group.position.set(B.x, B_H / 2 + DOCK, B.z)
    phoneB.group.rotation.set(-0.1, -0.32, 0)
    scene.add(phoneB.group)

    const towerA = makeTower(MAST_A, theme)
    towerA.position.copy(TA)
    scene.add(towerA)
    const towerB = makeTower(MAST_B, theme)
    towerB.position.copy(TB)
    scene.add(towerB)

    // the carrier's building, with windows that light up while it works on a request
    const carrier = new THREE.Group()
    const box = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 2), new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.8 }))
    box.position.y = 1.1
    box.castShadow = box.receiveShadow = true
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
    edges.position.copy(box.position)
    const winMat = new THREE.MeshBasicMaterial({ color: theme.line, toneMapped: false })
    carrier.add(box, edges)
    for (let r = 0; r < 2; r++)
      for (let k = 0; k < 4; k++) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), winMat)
        win.position.set(-1.05 + k * 0.7, 0.8 + r * 0.75, 1.002)
        carrier.add(win)
      }
    carrier.position.copy(C)
    scene.add(carrier)

    // where each piece of the trip runs
    phoneA.group.updateMatrixWorld()
    phoneB.group.updateMatrixWorld()
    const topA = phoneA.group.localToWorld(new THREE.Vector3(0, PHONE_H / 2, 0))
    const topB = phoneB.group.localToWorld(new THREE.Vector3(0, B_H / 2, 0))
    const panelA = TA.clone().setY(MAST_A - 0.75)
    const panelB = TB.clone().setY(MAST_B - 0.75)
    const baseA = TA.clone().setY(0.1)
    const baseB = TB.clone().setY(0.1)
    const doorL = new THREE.Vector3(C.x - 0.8, 0.5, C.z + 1)
    const doorR = new THREE.Vector3(C.x + 0.8, 0.5, C.z + 1)
    const radio = (from: THREE.Vector3, to: THREE.Vector3) =>
      new THREE.QuadraticBezierCurve3(from, from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 1.6, 0)), to).getPoints(32)
    const cable = (from: THREE.Vector3, via: THREE.Vector3, to: THREE.Vector3) =>
      new THREE.CatmullRomCurve3([from.clone().setY(0.06), via, to.clone().setY(0.06)]).getPoints(32)
    const radioA = radio(topA, panelA)
    const radioB = radio(panelB, topB)
    const cableA = cable(baseA, new THREE.Vector3(-1.9, 0.06, -4.7), doorL)
    const cableB = cable(doorR, new THREE.Vector3(3.3, 0.06, -4.5), baseB)

    type Part = { mat: THREE.LineDashedMaterial | THREE.MeshStandardMaterial | THREE.LineBasicMaterial }
    const parts: Record<'radioA' | 'mastA' | 'cableA' | 'cableB' | 'mastB' | 'radioB', Part> = {} as any
    function dashed(pts: THREE.Vector3[], key: 'radioA' | 'radioB') {
      const mat = new THREE.LineDashedMaterial({ color: theme.accent2, dashSize: 0.22, gapSize: 0.16, transparent: true })
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)
      line.computeLineDistances()
      scene.add(line)
      parts[key] = { mat }
    }
    function tube(pts: THREE.Vector3[], key: 'cableA' | 'cableB') {
      const mat = new THREE.MeshStandardMaterial({ color: theme.muted, roughness: 0.7, transparent: true })
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.06, 6), mat))
      parts[key] = { mat }
    }
    function mast(from: THREE.Vector3, to: THREE.Vector3, key: 'mastA' | 'mastB') {
      const mat = new THREE.LineBasicMaterial({ color: theme.muted, transparent: true })
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), mat))
      parts[key] = { mat }
    }
    dashed(radioA, 'radioA')
    dashed(radioB, 'radioB')
    tube(cableA, 'cableA')
    tube(cableB, 'cableB')
    mast(panelA, baseA, 'mastA')
    mast(panelB, baseB, 'mastB')

    const toCarrier = along([...radioA, baseA, ...cableA])
    const toOther = along([...radioA, baseA, ...cableA, doorR, ...cableB, panelB, ...radioB])

    const pulse = new THREE.Group()
    pulse.add(
      new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), new THREE.MeshBasicMaterial({ color: theme.accent, toneMapped: false })),
      new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 12), new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.22, depthWrite: false })),
    )
    scene.add(pulse)
    // the ring that says "answered right here" around a phone
    const ringMat = new THREE.MeshBasicMaterial({ color: theme.pos, transparent: true, side: THREE.DoubleSide, depthWrite: false })
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 48), ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.set(A.x, 0.03, A.z)
    scene.add(ring)
    const ringB = ring.clone()
    ringB.material = ringMat.clone()
    ringB.position.set(B.x, 0.03, B.z)
    scene.add(ringB)

    // the phones' labels start at the phone's outer edge and grow inwards, so on a narrow screen they stay in view
    const tagYou = makeTag(0.055, textures, 'left')
    tagYou.sprite.position.copy(topA).add(new THREE.Vector3(-PHONE_W / 2, 0.6, 0))
    const tagAnswer = makeTag(0.062, textures, 'left')
    tagAnswer.sprite.position.copy(topA).add(new THREE.Vector3(-PHONE_W / 2, 2, 0))
    const tagTower = makeTag(0.055, textures)
    tagTower.sprite.position.copy(TA).setY(MAST_A + 0.75)
    const tagTowerB = makeTag(0.055, textures)
    tagTowerB.sprite.position.copy(TB).setY(MAST_B + 0.75)
    const tagCarrier = makeTag(0.055, textures)
    tagCarrier.sprite.position.copy(C).setY(2.85)
    const tagOther = makeTag(0.055, textures, 'right')
    tagOther.sprite.position.copy(topB).add(new THREE.Vector3(B_W / 2, 0.6, 0))
    scene.add(tagYou.sprite, tagAnswer.sprite, tagTower.sprite, tagTowerB.sprite, tagCarrier.sprite, tagOther.sprite)

    const fadeTowerA = fader(towerA)
    const fadeCarrier = fader(carrier)
    const fadeTowerB = fader(towerB)
    const fadePhoneB = fader(phoneB.group)

    // On a square phone screen the town is narrower than its view: step back so all of it fits.
    const narrow = camera.aspect < 1.3
    if (narrow) camera.position.sub(controls.target).multiplyScalar(1.5).add(controls.target)

    // ---- the two phone screens ----
    const SEG: Record<string, keyof Theme> = { px: 'accent2', sc: 'accent', sx: 'accent2', num: 'fg' }
    let lastA = ''
    function paintA(c: Code, typed: number, mode: 'dial' | 'wait' | 'reply' | 'calling' | 'app', dots: number) {
      const key = `${raw.value}|${typed}|${mode}|${dots}|${locale.value}`
      if (key === lastA) return
      lastA = key
      const { c: cv, g, tex } = phoneA.screen
      const W = cv.width
      const H = cv.height
      const dir = isRtl() ? 'rtl' : 'ltr'
      g.fillStyle = hex(theme.bg)
      g.fillRect(0, 0, W, H)
      // status bar: the clock and four signal bars
      g.fillStyle = hex(theme.fg)
      g.font = `600 26px ${FONT}`
      g.direction = 'ltr'
      g.textAlign = 'left'
      g.fillText('12:30', 28, 46)
      for (let i = 0; i < 4; i++) g.fillRect(W - 92 + i * 16, 46 - 10 - i * 7, 10, 10 + i * 7)
      if (mode === 'app') {
        g.fillStyle = hex(theme.accent)
        g.fillRect(0, 70, W, 110)
        g.fillStyle = '#ffffff'
        g.font = `600 44px ${FONT}`
        g.direction = dir
        g.textAlign = 'center'
        g.fillText(t('viz3d.mmi.scr.app'), W / 2, 142)
        ;(['viz3d.mmi.scr.app1', 'viz3d.mmi.scr.app2', 'viz3d.mmi.scr.app3'] as const).forEach((k, i) => {
          g.fillStyle = hex(theme.fg)
          g.font = `500 34px ${FONT}`
          g.fillText(t(k), W / 2, 270 + i * 110, W - 40)
          g.fillStyle = hex(theme.line)
          g.fillRect(28, 310 + i * 110, W - 56, 3)
        })
        tex.needsUpdate = true
        return
      }
      // the typed string, coloured like the flat picture: wrapper, service code, wrapper
      let left = typed
      const shown = c.seg.map((s) => {
        const part = s.s.slice(0, Math.max(0, left))
        left -= s.s.length
        return { ...s, s: part }
      })
      let size = 76
      g.direction = 'ltr'
      g.textAlign = 'left'
      const width = () => ((g.font = `600 ${size}px ${FONT}`), g.measureText(raw.value).width)
      while (width() > W - 44 && size > 30) size -= 4
      const full = width()
      let x = (W - full) / 2
      for (const s of shown) {
        g.fillStyle = hex(theme[SEG[s.k]] as THREE.Color)
        g.fillText(s.s, x, 220)
        x += g.measureText(s.s).width
      }
      if (mode === 'dial' && typed < raw.value.length) {
        g.fillStyle = hex(theme.accent)
        g.fillRect(x + 4, 220 - size * 0.8, 4, size * 0.9)
      }
      g.direction = dir
      g.textAlign = 'center'
      if (mode === 'wait') {
        g.fillStyle = hex(theme.muted)
        g.font = `500 32px ${FONT}`
        g.fillText(t('viz3d.mmi.scr.wait'), W / 2, 330)
        for (let i = 0; i < 3; i++) {
          g.globalAlpha = i === dots % 3 ? 1 : 0.3
          g.beginPath()
          g.arc(W / 2 - 30 + i * 30, 390, 9, 0, 2 * Math.PI)
          g.fill()
        }
        g.globalAlpha = 1
      }
      if (mode === 'calling') {
        g.fillStyle = hex(theme.muted)
        g.font = `500 34px ${FONT}`
        g.fillText(t('viz3d.mmi.scr.call'), W / 2, 330)
      }
      if (mode === 'reply') {
        const lines: { s: string; ltr?: boolean }[] =
          c.dest === 'phone'
            ? [{ s: 'IMEI' }, { s: IMEI, ltr: true }]
            : c.answer === 'mmi.a.cf'
              ? [{ s: t('viz3d.mmi.scr.cf') }, { s: t('viz3d.mmi.scr.cf1') }]
              : [{ s: t('viz3d.mmi.scr.ussd') }, { s: t('viz3d.mmi.scr.ussd1') }, { s: t('viz3d.mmi.scr.ussd2') }, { s: t('viz3d.mmi.scr.ussd3') }]
        const top = 280
        const h = 70 + lines.length * 62
        g.fillStyle = hex(theme.sunken)
        g.strokeStyle = hex(theme.line)
        g.lineWidth = 3
        g.beginPath()
        g.roundRect(26, top, W - 52, h, 24)
        g.fill()
        g.stroke()
        lines.forEach((l, i) => {
          g.fillStyle = hex(i === 0 ? theme.fg : theme.muted)
          g.font = i === 0 ? `600 36px ${FONT}` : `500 32px ${FONT}`
          g.direction = l.ltr ? 'ltr' : dir
          g.fillText(l.s, W / 2, top + 64 + i * 62, W - 80)
        })
      }
      // the call button: green to dial, red while a call is going out
      g.fillStyle = hex(mode === 'calling' ? theme.neg : theme.pos)
      g.beginPath()
      g.arc(W / 2, H - 110, 54, 0, 2 * Math.PI)
      g.fill()
      g.fillStyle = '#ffffff'
      g.font = `600 30px ${FONT}`
      g.direction = 'ltr'
      g.fillText(mode === 'calling' ? '✕' : '✆', W / 2, H - 99)
      tex.needsUpdate = true
    }
    let lastB = ''
    function paintB(ringing: boolean) {
      const key = `${ringing}|${locale.value}`
      if (key === lastB) return
      lastB = key
      const { c: cv, g, tex } = phoneB.screen
      const W = cv.width
      const H = cv.height
      g.fillStyle = hex(theme.bg)
      g.fillRect(0, 0, W, H)
      g.textAlign = 'center'
      if (ringing) {
        g.fillStyle = hex(theme.fg)
        g.font = `600 30px ${FONT}`
        g.direction = isRtl() ? 'rtl' : 'ltr'
        g.fillText(t('viz3d.mmi.scr.ring'), W / 2, 170, W - 24)
        g.fillStyle = hex(theme.pos)
        g.beginPath()
        g.arc(W / 2, H - 90, 40, 0, 2 * Math.PI)
        g.fill()
      } else {
        g.fillStyle = hex(theme.muted)
        g.font = `300 64px ${FONT}`
        g.direction = 'ltr'
        g.fillText('12:30', W / 2, H / 2)
      }
      tex.needsUpdate = true
    }

    // ---- the loop ----
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let clockS = 0
    let lastCode = ''
    return (dt, time) => {
      const c = code.value
      const rttMs = rtt.value
      const id = `${raw.value}|${rttMs}`
      if (id !== lastCode) ((lastCode = id), (clockS = 0))
      const tl = timeline(c, rttMs)
      const total = tl.reduce((a, [, d]) => a + d, 0)
      // Without motion, show the finished trip: the route lit and the answer on screen.
      clockS = reduced ? total - SHOW + 0.01 : (clockS + dt) % total
      let t0 = 0
      let s: Stage = 'done'
      let f = 0
      for (const [name, d] of tl) {
        if (clockS < t0 + d) {
          s = name
          f = (clockS - t0) / d
          break
        }
        t0 += d
      }
      if (stage.value !== s) stage.value = s
      const half = (rttMs / 2000) * SLOW
      const realMs = s === 'out' ? Math.round((f * half * 1000) / SLOW) : s === 'back' ? Math.round(((half + f * half) * 1000) / SLOW) : 0
      if (ms.value !== realMs) ms.value = realMs

      // which places this string reaches
      const net = c.dest === 'network'
      const call = c.dest === 'call'
      fadeTowerA(net || call ? 1 : 0.3)
      fadeCarrier(net || call ? 1 : 0.3)
      fadeTowerB(call ? 1 : 0.25)
      fadePhoneB(call ? 1 : 0.25)
      const on = { radioA: net || call, mastA: net || call, cableA: net || call, cableB: call, mastB: call, radioB: call }
      for (const [k, p] of Object.entries(parts)) {
        const active = on[k as keyof typeof on]
        p.mat.color.copy(active ? (k.startsWith('radio') ? theme.accent2 : theme.accent) : theme.muted)
        p.mat.opacity = active ? 1 : 0.25
      }

      // the pulse
      pulse.visible = s === 'out' || s === 'back' || s === 'trip'
      if (s === 'out') toCarrier(f, pulse.position)
      else if (s === 'back') toCarrier(1 - f, pulse.position)
      else if (s === 'trip') toOther(f, pulse.position)
      pulse.scale.setScalar(1 + 0.12 * Math.sin(time * 12))
      // the carrier's windows light up while the request is with it
      const busy = (net && ((s === 'out' && f > 0.9) || (s === 'back' && f < 0.12))) || (call && s === 'trip' && f > 0.42 && f < 0.58)
      winMat.color.copy(busy ? theme.accent : theme.line)

      // answered on the phone: a ring that spreads from the phone and stays there
      const local = !net && !call
      ring.visible = local && (s === 'glow' || s === 'done')
      if (ring.visible) {
        const u = s === 'glow' ? f : 1
        ring.scale.setScalar(0.4 + 1.1 * u + (s === 'done' ? 0.06 * Math.sin(time * 3) : 0))
        ringMat.opacity = s === 'glow' ? 0.9 : 0.55
      }
      ringB.visible = call && s === 'done'
      if (ringB.visible) {
        const u = (time * 0.9) % 1
        ringB.scale.setScalar(0.4 + 0.9 * u)
        ;(ringB.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - u)
      }
      phoneB.group.rotation.z = ringB.visible && !reduced ? Math.sin(time * 34) * 0.05 : 0

      // screens
      const typed = s === 'typing' ? Math.ceil(f * raw.value.length) : raw.value.length
      const mode =
        s === 'typing' ? 'dial' : call ? 'calling' : net ? (s === 'done' ? 'reply' : 'wait') : c.dest === 'app' ? (s === 'done' ? 'app' : 'dial') : 'reply'
      paintA(c, typed, mode, mode === 'wait' ? Math.floor(time * 3) : 0)
      paintB(call && s === 'done')

      // labels
      tagYou.paint(t('viz3d.mmi.you'), theme.fg, theme.bg)
      tagTower.paint(t('viz3d.mmi.tower'), net || call ? theme.fg : theme.muted, theme.bg)
      tagTowerB.paint(call ? t('viz3d.mmi.tower') : '', theme.fg, theme.bg)
      tagCarrier.paint(net || call ? t('viz3d.mmi.carrier') : '', theme.fg, theme.bg)
      tagOther.paint(call ? t('viz3d.mmi.other') : '', theme.fg, theme.bg)
      // on a narrow screen the strip above already says it, and there is no room beside the phone
      tagAnswer.paint(s === 'done' && !call && !narrow ? t(c.answer) : '', net ? theme.accent : theme.pos, theme.bg)
    }
  },
  { camera: [0.6, 7.8, 13.4], target: [0.6, 2.3, -1.2], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <!-- one strip across the top, so it never sits over a tower's label -->
    <div class="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-lg border px-3 py-1.5 text-xs" style="background: var(--panel); border-color: var(--line)">
      <span class="font-semibold" style="color: var(--fg)"><span dir="ltr" class="num" style="color: var(--accent)">{{ raw }}</span> · {{ t(code.kind) }}</span>
      <span style="color: var(--muted)">{{ status }}</span>
      <span v-if="clock" class="num ms-auto" :style="{ color: code.dest === 'network' ? 'var(--accent-2)' : 'var(--pos)' }">{{ clock }}</span>
    </div>
  </div>
</template>
