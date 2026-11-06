<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { useThree, ground, type Theme } from '../useThree'
import { FONT, hex, makeTag, makePhone, makeTower, makeHouse, fader } from './parts'
import { t, isRtl, locale } from '../../i18n'
import { readParams, lineAt, slowFor, MODES, STATES, ROUND_TRIPS, WAIT_FOR, LINE_NO, LINE_SAY, type Msg, type Place } from '../../viz/networking/ss7Model'

// networking/ss7. Same params and model as src/viz/networking/Ss7Signal.vue: mode (call, text, arriving
// abroad), step, h (links per message) and hop (ms per link). Two towns: yours on the left with your
// exchange, your friend's on the right with their exchange and the home register (HLR). Messages fly
// along a network on poles above the towns, stopping at every relay point (STP); the call's voice
// line lies on the ground between the two exchanges and lights up only once it is held, then used.
// A message is shown slowed down, with a clock counting the real milliseconds.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const el = ref<HTMLElement>()

const HOLD = 2.6 // s the result stays before the message flies again
const PLAY_HOLD = 1.4 // s between messages while the whole conversation plays
const P = computed(() => readParams(props.params))
const playing = ref(false)
function togglePlay() {
  if (!playing.value) emit('set', 'step', 0)
  playing.value = !playing.value
}

// what the strip over the scene says, updated from the frame loop
const flying = ref(false)
const shown = ref(0)
const realMs = ref(0)
const placeName = (pl: Place) => t(pl === 'A' ? (P.value.mode === 2 ? 'ss7.p.Aroam' : 'ss7.p.A') : pl === 'B' ? (P.value.mode === 2 ? 'ss7.p.Broam' : 'ss7.p.B') : 'ss7.p.H')
const msg = computed<Msg | null>(() => (P.value.step > 0 ? P.value.flow[P.value.step - 1] : null))
const hopsOf = (m: Msg) => (m.from !== 'A' && m.to !== 'A' ? 2 : P.value.h)
const slow = computed(() => slowFor(P.value.h * P.value.hop))
const ms = (v: number) => `⁦${v} ms⁩`
const clock = computed(() => {
  const m = msg.value
  const { h, hop, mode } = P.value
  if (m && flying.value) return `${ms(realMs.value)} / ${ms(hopsOf(m) * hop)} · ${t('viz3d.ss7.slow', { k: slow.value })}`
  return `${t(WAIT_FOR[mode])}: ${ms(2 * ROUND_TRIPS[mode] * h * hop)}`
})

const textures: THREE.Texture[] = []
onUnmounted(() => textures.forEach((x) => x.dispose()))

// ---- places ----------------------------------------------------------------------------------------------
const SIG = 3.6 // height of the signalling network
const XA = -6.5
const XB = 6.5
const ZX = 1.2 // the exchanges' z
const A_SIG = new THREE.Vector3(XA, SIG, ZX)
const B_SIG = new THREE.Vector3(XB, SIG, ZX)
const H_POS = new THREE.Vector3(6.6, 0, -4.4)
const H_SIG = H_POS.clone().setY(SIG)
const Z_STP = -1.2
const stpX = (m: number) => {
  const gap = m > 1 ? Math.min(1.8, 7 / (m - 1)) : 0
  return Array.from({ length: m }, (_, i) => 3.4 - (m - 1 - i) * gap)
}
const PHONE_W = 1.3
const PHONE_H = 2.4
const DOCK = 0.24
const TRUNK_Z = 2.5
const TRUNK_GAP = 0.15

useThree(
  el,
  ({ scene, theme, camera, controls }) => {
    scene.add(ground(30, theme))
    for (const [x, z, w, d, h] of [[-10.5, -5, 1.6, 1.4, 1.1], [-4.2, -4.6, 1.3, 1.2, 0.9], [-2, 5.4, 1.2, 1.1, 0.8], [2.4, -5.6, 1.6, 1.3, 1], [10.6, -5.2, 1.4, 1.6, 1], [3, 5.6, 1.3, 1.2, 0.9]]) {
      const house = makeHouse(theme, w, d, h)
      house.position.set(x, 0, z)
      scene.add(house)
    }

    // ---- exchanges: a building with windows that light while it sends or receives ----
    function exchange(x: number) {
      const g = new THREE.Group()
      const box = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2, 1.8), new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.8 }))
      box.position.y = 1
      box.castShadow = box.receiveShadow = true
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: theme.muted }))
      edges.position.copy(box.position)
      const win = new THREE.MeshBasicMaterial({ color: theme.line, toneMapped: false })
      g.add(box, edges)
      for (let r = 0; r < 2; r++)
        for (let k = 0; k < 3; k++) {
          const w = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), win)
          w.position.set(-0.75 + k * 0.75, 0.65 + r * 0.7, 0.902)
          g.add(w)
        }
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, SIG - 2), new THREE.MeshStandardMaterial({ color: theme.muted }))
      mast.position.y = 2 + (SIG - 2) / 2
      g.add(mast)
      g.position.set(x, 0, ZX)
      scene.add(g)
      return { group: g, win }
    }
    const exA = exchange(XA)
    const exB = exchange(XB)

    // ---- the home register: a stack of drums, the friend's number written in it ----
    const hlr = new THREE.Group()
    const drumMat = new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.6 })
    const drumTop = new THREE.MeshBasicMaterial({ color: theme.line, toneMapped: false })
    for (let i = 0; i < 3; i++) {
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.5, 32), [drumMat, drumTop, drumMat])
      drum.position.y = 0.3 + i * 0.62
      drum.castShadow = true
      hlr.add(drum)
    }
    const hmast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, SIG - 1.8), new THREE.MeshStandardMaterial({ color: theme.muted }))
    hmast.position.y = 1.8 + (SIG - 1.8) / 2
    hlr.add(hmast)
    hlr.position.copy(H_POS)
    scene.add(hlr)

    // ---- relay points (STP): a lit box on a pole; up to seven, the extra ones hidden ----
    const stps = Array.from({ length: 7 }, () => {
      const g = new THREE.Group()
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, SIG), new THREE.MeshStandardMaterial({ color: theme.muted }))
      pole.position.y = SIG / 2
      const mat = new THREE.MeshStandardMaterial({ color: theme.bg, roughness: 0.5, emissive: theme.accent, emissiveIntensity: 0 })
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), mat)
      box.position.y = SIG
      box.rotation.y = Math.PI / 4
      box.castShadow = true
      g.add(pole, box)
      scene.add(g)
      return { g, mat }
    })

    // ---- links between them: unit cylinders stretched between two points ----
    const linkGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8)
    const links = Array.from({ length: 9 }, () => {
      const mat = new THREE.MeshBasicMaterial({ color: theme.muted, transparent: true })
      const mesh = new THREE.Mesh(linkGeo, mat)
      scene.add(mesh)
      return { mesh, mat }
    })
    const UP = new THREE.Vector3(0, 1, 0)
    function stretch(mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) {
      const d = b.clone().sub(a)
      mesh.position.copy(a).addScaledVector(d, 0.5)
      mesh.scale.set(1, d.length(), 1)
      mesh.quaternion.setFromUnitVectors(UP, d.normalize())
      mesh.visible = true
    }

    // ---- the voice lines on the ground; line 7 is the one held for the call ----
    const trunk = new THREE.Group()
    const strandGeo = new THREE.CylinderGeometry(0.05, 0.05, XB - XA - 2.6, 8)
    const strands = Array.from({ length: 8 }, (_, i) => {
      const mat = new THREE.MeshStandardMaterial({ color: theme.line, roughness: 0.7 })
      const s = new THREE.Mesh(strandGeo, mat)
      s.rotation.z = Math.PI / 2
      s.position.set(0, 0.08, TRUNK_Z + i * TRUNK_GAP)
      trunk.add(s)
      return mat
    })
    const mineZ = TRUNK_Z + (LINE_NO - 1) * TRUNK_GAP
    const beadMat = new THREE.MeshBasicMaterial({ color: theme.pos, toneMapped: false })
    const beads = Array.from({ length: 8 }, () => {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), beadMat)
      trunk.add(b)
      return b
    })
    scene.add(trunk)
    const fadeTrunk = fader(trunk)
    const fadeHlr = fader(hlr)

    // ---- the phones, the towers they talk to and the cable from each tower to its exchange ----
    const you = makePhone(PHONE_W, PHONE_H, theme, 300, textures)
    you.group.position.set(-10.4, PHONE_H / 2 + DOCK, 3.6)
    you.group.rotation.set(-0.1, 0.35, 0)
    const fr = makePhone(PHONE_W, PHONE_H, theme, 300, textures)
    fr.group.position.set(10.4, PHONE_H / 2 + DOCK, 3.6)
    fr.group.rotation.set(-0.1, -0.35, 0)
    scene.add(you.group, fr.group)
    const towerA = makeTower(4.4, theme)
    towerA.position.set(-10, 0, -1.4)
    const towerB = makeTower(4.4, theme)
    towerB.position.set(10, 0, -1.4)
    scene.add(towerA, towerB)
    const faint = new THREE.LineDashedMaterial({ color: theme.muted, dashSize: 0.2, gapSize: 0.15 })
    for (const [ph, tw, ex] of [[you.group, towerA, XA], [fr.group, towerB, XB]] as const) {
      const top = ph.position.clone().setY(PHONE_H + DOCK + 0.1)
      const panel = tw.position.clone().setY(3.65)
      const radio = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(top, top.clone().lerp(panel, 0.5).setY(4.6), panel).getPoints(24)), faint)
      radio.computeLineDistances()
      const cable = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3([tw.position.clone().setY(0.05), new THREE.Vector3((tw.position.x + ex) / 2, 0.05, 0.6), new THREE.Vector3(ex, 0.05, ZX)]), 24, 0.045, 6),
        new THREE.MeshStandardMaterial({ color: theme.muted }),
      )
      scene.add(radio, cable)
    }
    const fadeFriend = fader(fr.group)
    const fadeTowerB = fader(towerB)
    const ringMat = new THREE.MeshBasicMaterial({ color: theme.accent2, transparent: true, side: THREE.DoubleSide, depthWrite: false })
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 48), ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.set(10.4, 0.03, 3.6)
    scene.add(ring)

    // ---- the message: a glowing envelope with its code above it ----
    const env = new THREE.Group()
    const envMat = new THREE.MeshBasicMaterial({ color: theme.accent, toneMapped: false })
    env.add(
      new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.46, 0.08), envMat),
      new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.18, depthWrite: false })),
    )
    scene.add(env)
    const tagEnv = makeTag(0.05, textures)
    scene.add(tagEnv.sprite)

    // ---- labels ----
    const tagYou = makeTag(0.048, textures, 'left')
    tagYou.sprite.position.set(-10.4 - PHONE_W / 2, PHONE_H + DOCK + 0.6, 3.6)
    const tagFr = makeTag(0.048, textures, 'right')
    tagFr.sprite.position.set(10.4 + PHONE_W / 2, PHONE_H + DOCK + 0.6, 3.6)
    const tagA = makeTag(0.048, textures)
    tagA.sprite.position.set(XA, 2.45, ZX + 1)
    const tagB = makeTag(0.048, textures)
    tagB.sprite.position.set(XB, 2.45, ZX + 1)
    const tagH = makeTag(0.048, textures)
    tagH.sprite.position.copy(H_POS).setY(2.3).add(new THREE.Vector3(0, 0, 1))
    const tagStp = makeTag(0.044, textures)
    const tagTrunk = makeTag(0.046, textures)
    tagTrunk.sprite.position.set(0, 0.6, TRUNK_Z + 8 * TRUNK_GAP + 0.5)
    scene.add(tagYou.sprite, tagFr.sprite, tagA.sprite, tagB.sprite, tagH.sprite, tagStp.sprite, tagTrunk.sprite)

    const narrow = camera.aspect < 1.3
    if (narrow) {
      // on a phone the people's labels would sit on the exchanges' labels: lift them above
      tagYou.sprite.position.y += 1.6
      tagFr.sprite.position.y += 1.6
      camera.position.sub(controls.target).multiplyScalar(1.55).add(controls.target)
      // the strip over the scene is tall on a phone: aim higher so the towns sit below it
      camera.position.y += 3
      controls.target.y += 3
    }

    // ---- the phone screens ----
    type Line = { s: string; c: keyof Theme; size: number; ltr?: boolean }
    type Screen = { lines: Line[]; bubble?: { s: string; mine: boolean }; foot?: Line; end?: boolean }
    function painter(ph: ReturnType<typeof makePhone>) {
      let last = ''
      return (sc: Screen) => {
        const key = JSON.stringify(sc) + locale.value
        if (key === last) return
        last = key
        const { c: cv, g, tex } = ph.screen
        const W = cv.width
        const H = cv.height
        const dir = isRtl() ? 'rtl' : 'ltr'
        g.fillStyle = hex(theme.bg)
        g.fillRect(0, 0, W, H)
        g.fillStyle = hex(theme.fg)
        g.font = `600 20px ${FONT}`
        g.direction = 'ltr'
        g.textAlign = 'left'
        g.fillText('12:30', 20, 34)
        for (let i = 0; i < 4; i++) g.fillRect(W - 70 + i * 12, 34 - 8 - i * 5, 8, 8 + i * 5)
        g.textAlign = 'center'
        sc.lines.forEach((l, i) => {
          g.fillStyle = hex(theme[l.c])
          g.font = `600 ${l.size}px ${FONT}`
          g.direction = l.ltr ? 'ltr' : dir
          g.fillText(l.s, W / 2, H * 0.22 + i * l.size * 1.5, W - 30)
        })
        if (sc.bubble) {
          g.font = `500 32px ${FONT}`
          g.direction = dir
          const bw = Math.min(W - 40, g.measureText(sc.bubble.s).width + 40)
          const right = sc.bubble.mine !== isRtl()
          const x0 = right ? W - 20 - bw : 20
          g.fillStyle = hex(sc.bubble.mine ? theme.accent : theme.sunken)
          g.beginPath()
          g.roundRect(x0, H * 0.4, bw, 66, 22)
          g.fill()
          g.fillStyle = sc.bubble.mine ? '#ffffff' : hex(theme.fg)
          g.fillText(sc.bubble.s, x0 + bw / 2, H * 0.4 + 44, bw - 20)
        }
        if (sc.foot) {
          g.fillStyle = hex(theme[sc.foot.c])
          g.font = `600 ${sc.foot.size}px ${FONT}`
          g.direction = dir
          g.fillText(sc.foot.s, W / 2, H * 0.62, W - 30)
        }
        if (sc.end) {
          g.fillStyle = hex(theme.neg)
          g.beginPath()
          g.arc(W / 2, H - 70, 36, 0, 2 * Math.PI)
          g.fill()
          g.fillStyle = '#ffffff'
          g.font = `600 26px ${FONT}`
          g.direction = 'ltr'
          g.fillText('✕', W / 2, H - 61)
        }
        tex.needsUpdate = true
      }
    }
    const paintYou = painter(you)
    const paintFr = painter(fr)
    const NUM = '0555 012 345'
    const idle: Screen = { lines: [{ s: '12:30', c: 'muted', size: 64, ltr: true }] }
    const talkTime = (time: number) => `00:${String(Math.floor(time) % 60).padStart(2, '0')}`

    // ---- the loop ----
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let phaseT = 0
    let lastKey = ''
    let lastM = -1
    const pos = new THREE.Vector3()
    return (dt, time) => {
      const { mode, flow, step, h, hop } = P.value
      const key = `${mode}|${step}|${h}|${hop}`
      if (key !== lastKey) ((lastKey = key), (phaseT = 0))
      phaseT = Math.max(0, phaseT + dt) // the first frame's dt can come out slightly negative

      // the network for this h: relay points, links, and which links the current message uses
      const m = h - 1
      const xs = stpX(m)
      if (m !== lastM) {
        lastM = m
        stps.forEach((s, i) => {
          s.g.visible = i < m
          if (i < m) s.g.position.set(xs[i], 0, Z_STP)
        })
        links.forEach((l) => (l.mesh.visible = false))
        const chain = [A_SIG, ...xs.map((x) => new THREE.Vector3(x, SIG, Z_STP))]
        for (let i = 0; i < m; i++) stretch(links[i].mesh, chain[i], chain[i + 1])
        stretch(links[m].mesh, chain[m], B_SIG)
        stretch(links[m + 1].mesh, chain[m], H_SIG)
        tagStp.sprite.position.set(xs[Math.floor(m / 2)], SIG + 0.9, Z_STP)
      }
      const msgNow = step > 0 ? flow[step - 1] : null
      const sigOf = (pl: Place) => (pl === 'A' ? A_SIG : pl === 'B' ? B_SIG : H_SIG)
      const last = new THREE.Vector3(xs[m - 1], SIG, Z_STP)
      let route: THREE.Vector3[] = []
      let used: number[] = []
      if (msgNow) {
        if (msgNow.from !== 'A' && msgNow.to !== 'A') {
          route = [sigOf(msgNow.from), last, sigOf(msgNow.to)]
          used = [m, m + 1]
        } else {
          const far = msgNow.from === 'A' ? msgNow.to : msgNow.from
          const fwd = [A_SIG, ...xs.map((x) => new THREE.Vector3(x, SIG, Z_STP)), sigOf(far)]
          route = msgNow.from === 'A' ? fwd : fwd.reverse()
          used = [...Array.from({ length: m }, (_, i) => i), far === 'B' ? m : m + 1]
        }
      }
      const nseg = route.length - 1
      const k = slowFor(h * hop)
      const fly = msgNow ? (nseg * hop * k) / 1000 : 0
      const loop = fly + HOLD

      // playing the whole conversation: next message once this one has arrived and been seen
      if (playing.value && phaseT >= (step === 0 ? 1.2 : fly + PLAY_HOLD)) {
        if (step < flow.length) emit('set', 'step', step + 1)
        else playing.value = false
      }
      const tt = reduced ? fly + 0.01 : playing.value ? Math.min(phaseT, loop - 0.001) : phaseT % loop
      const inFlight = !!msgNow && tt < fly
      const f = inFlight ? tt / fly : 1
      const st = inFlight ? step - 1 : step // the state the towns show
      if (flying.value !== inFlight) flying.value = inFlight
      if (shown.value !== st) shown.value = st
      const r = Math.round(f * nseg * hop)
      if (realMs.value !== r) realMs.value = r

      // the envelope, hop by hop at one steady pace per link
      env.visible = inFlight
      tagEnv.sprite.visible = inFlight
      if (inFlight) {
        const u = f * nseg
        const i = Math.min(Math.floor(u), nseg - 1)
        pos.copy(route[i]).lerp(route[i + 1], u - i)
        env.position.copy(pos)
        env.lookAt(camera.position)
        env.scale.setScalar(1 + 0.1 * Math.sin(time * 10))
        tagEnv.sprite.position.copy(pos).setY(SIG + 0.75)
        tagEnv.paint(msgNow!.code, theme.accent, theme.bg)
      }
      links.forEach((l, i) => {
        const on = !!msgNow && used.includes(i)
        l.mat.color.copy(on ? theme.accent : theme.muted)
        l.mat.opacity = on ? 1 : 0.55
      })
      stps.forEach((s, i) => {
        if (i >= m) return
        const near = inFlight && pos.distanceTo(new THREE.Vector3(xs[i], SIG, Z_STP)) < 0.6
        s.mat.emissiveIntensity = near ? 0.9 : 0
      })
      const lit = (pl: Place) => !!msgNow && ((inFlight && f < 0.12 && msgNow.from === pl) || (!inFlight && tt < fly + 0.8 && msgNow.to === pl))
      exA.win.color.copy(lit('A') ? theme.accent : theme.line)
      exB.win.color.copy(lit('B') ? theme.accent : theme.line)
      drumTop.color.copy(lit('H') ? theme.accent : theme.line)

      // the voice line: free, held for the call, then carrying it
      const line = lineAt(mode, st)
      fadeTrunk(mode === 0 ? 1 : 0.25)
      fadeHlr(mode === 0 ? 0.3 : 1)
      strands.forEach((mat, i) => mat.color.copy(i === LINE_NO - 1 ? (line === 'talk' ? theme.pos : line === 'held' ? theme.accent2 : theme.line) : theme.line))
      beads.forEach((b, i) => {
        b.visible = line === 'talk'
        const half = (XB - XA - 2.6) / 2
        const u = (time * 0.35 + i / 4) % 1
        b.position.set(i % 2 ? half - 2 * half * u : -half + 2 * half * u, 0.08, mineZ)
      })

      // the phones
      const roam = mode === 2
      fadeFriend(roam ? 0.3 : 1)
      fadeTowerB(roam ? 0.3 : 1)
      const ringing = mode === 0 && st === 2
      ring.visible = ringing
      if (ringing) {
        const u = (time * 0.9) % 1
        ring.scale.setScalar(0.4 + 0.9 * u)
        ringMat.opacity = 0.9 * (1 - u)
      }
      fr.group.rotation.z = ringing && !reduced ? Math.sin(time * 34) * 0.05 : 0
      if (mode === 0) {
        const talk = line === 'talk'
        paintYou({ lines: [{ s: NUM, c: 'fg', size: 40, ltr: true }, { s: talk ? talkTime(time) : t(st >= 4 ? 'viz3d.ss7.ended' : st >= 2 ? 'viz3d.ss7.ringing' : 'viz3d.ss7.calling'), c: talk ? 'pos' : 'muted', size: 34, ltr: talk }], end: st < 4 })
        paintFr(ringing ? { lines: [{ s: t('viz3d.ss7.incoming'), c: 'fg', size: 36 }, { s: '0500 987 654', c: 'muted', size: 32, ltr: true }] } : talk ? { lines: [{ s: talkTime(time), c: 'pos', size: 56, ltr: true }], end: true } : idle)
      } else if (mode === 1) {
        paintYou({ lines: [], bubble: { s: t('ss7.text'), mine: true }, foot: st >= 4 ? { s: `✓✓ ${t('viz3d.ss7.delivered')}`, c: 'pos', size: 30 } : { s: t('viz3d.ss7.sending'), c: 'muted', size: 30 } })
        paintFr(st >= 3 ? { lines: [{ s: t('viz3d.ss7.newText'), c: 'muted', size: 30 }], bubble: { s: t('ss7.text'), mine: false } } : idle)
      } else {
        paintYou(st >= 5 ? { lines: [{ s: t('viz3d.ss7.abroadNet'), c: 'fg', size: 34 }, { s: `✈ ${t('ss7.roaming')}`, c: 'pos', size: 34 }] } : { lines: [{ s: t('viz3d.ss7.searching'), c: 'muted', size: 32 }] })
        paintFr(idle)
      }

      // labels
      tagYou.paint(roam ? t('ss7.friendAbroad') : t('ss7.you'), theme.fg, theme.bg)
      tagFr.paint(roam ? t('ss7.wasHere') : t('ss7.friend'), roam ? theme.muted : theme.fg, theme.bg)
      tagA.paint(placeName('A'), theme.fg, theme.bg)
      tagB.paint(placeName('B'), theme.fg, theme.bg)
      tagH.paint(`${t('ss7.p.Hlong')} (HLR)`, mode === 0 ? theme.muted : theme.fg, theme.bg)
      tagStp.paint(t('ss7.stp', { n: m }), theme.muted, theme.bg)
      tagTrunk.paint(mode === 0 ? t(LINE_SAY[line]) : t(roam ? 'ss7.line.roam' : 'ss7.line.sms'), mode === 0 && line !== 'free' ? (line === 'talk' ? theme.pos : theme.accent2) : theme.muted, theme.bg)
    }
  },
  { camera: [0, 10.5, 19.5], target: [0, 1.6, -0.2], fov: 42 },
)
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="el" class="h-full w-full" />
    <div class="pointer-events-none absolute inset-x-3 top-3 flex flex-col gap-0.5 rounded-lg border px-3 py-1.5 text-xs" style="background: var(--panel); border-color: var(--line)">
      <div class="flex flex-wrap items-baseline gap-x-3">
        <span class="font-semibold" style="color: var(--fg)">{{ t(MODES[P.mode]) }}</span>
        <span v-if="msg && flying" style="color: var(--fg)"><span dir="ltr" class="num font-semibold" style="color: var(--accent)">{{ msg.code }}</span> {{ placeName(msg.from) }} {{ isRtl() ? '←' : '→' }} {{ placeName(msg.to) }} · {{ t('ss7.q', { s: t(msg.say) }) }}</span>
        <span v-else style="color: var(--muted)">{{ t(STATES[P.mode][shown]) }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span class="num" style="color: var(--accent-2)">{{ clock }}</span>
        <button class="pointer-events-auto ms-auto rounded-md border px-2 py-0.5" style="border-color: var(--line); color: var(--fg)" @click="togglePlay">{{ playing ? t('viz3d.ss7.stop') : t('viz3d.ss7.play') }}</button>
      </div>
    </div>
  </div>
</template>
