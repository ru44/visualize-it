import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** Theme colours resolved from the CSS variables, so 3D scenes follow light/dark like everything else. */
export function themeColors() {
  const cs = getComputedStyle(document.documentElement)
  const c = (v: string) => new THREE.Color(cs.getPropertyValue(v).trim() || '#888')
  return { bg: c('--panel'), fg: c('--fg'), muted: c('--muted'), line: c('--line'), grid: c('--grid'), accent: c('--accent'), accent2: c('--accent-2'), pos: c('--pos'), neg: c('--neg'), sunken: c('--sunken') }
}
export type Theme = ReturnType<typeof themeColors>

export function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export interface ThreeCtx {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  theme: Theme
}

/**
 * Sets up renderer, camera, orbit controls, lights and a resize/animation loop on a container ref.
 * `setup` builds the scene once; `frame(dt, t)` runs every frame. Everything is disposed on unmount.
 */
export function useThree(container: Ref<HTMLElement | undefined>, setup: (ctx: ThreeCtx) => void | ((dt: number, t: number) => void), opts: { camera?: [number, number, number]; target?: [number, number, number]; fov?: number } = {}) {
  const ready = ref(false)
  let ctx: ThreeCtx | null = null
  let raf = 0
  let frame: ((dt: number, t: number) => void) | void
  let observer: ResizeObserver | null = null
  let themeObs: MutationObserver | null = null

  onMounted(() => {
    const el = container.value
    if (!el) return
    const theme = themeColors()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(opts.fov ?? 45, 1, 0.1, 500)
    camera.position.set(...(opts.camera ?? [8, 6, 10]))
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(...(opts.target ?? [0, 0, 0]))
    controls.enableDamping = true
    controls.maxPolarAngle = Math.PI * 0.49
    scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.1))
    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(6, 12, 6)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.camera.left = sun.shadow.camera.bottom = -20
    sun.shadow.camera.right = sun.shadow.camera.top = 20
    scene.add(sun)
    ctx = { scene, camera, renderer, controls, theme }

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    observer = new ResizeObserver(resize)
    observer.observe(el)
    themeObs = new MutationObserver(() => ctx && Object.assign(ctx.theme, themeColors()))
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    frame = setup(ctx)
    let last = performance.now()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const loop = (now: number) => {
      const dt = reduced ? 0 : Math.min((now - last) / 1000, 0.05)
      last = now
      frame?.(dt, now / 1000)
      controls.update()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    ready.value = true
  })

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    observer?.disconnect()
    themeObs?.disconnect()
    if (!ctx) return
    ctx.controls.dispose()
    ctx.scene.traverse((o: any) => {
      o.geometry?.dispose?.()
      const m = o.material
      if (Array.isArray(m)) m.forEach((x) => x.dispose?.())
      else m?.dispose?.()
    })
    ctx.renderer.dispose()
    ctx.renderer.domElement.remove()
    ctx = null
  })

  return { ready }
}

// ---- small helpers shared by scenes -------------------------------------------------------------
export function ground(size = 20, theme: Theme) {
  const g = new THREE.Group()
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({ color: theme.sunken, roughness: 1 }))
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true
  g.add(plane)
  const grid = new THREE.GridHelper(size, size, theme.line, theme.grid)
  grid.position.y = 0.002
  g.add(grid)
  return g
}

export function arrow(dir: THREE.Vector3, origin: THREE.Vector3, length: number, color: THREE.Color, head = 0.35) {
  return new THREE.ArrowHelper(dir.clone().normalize(), origin, Math.max(0.01, length), color, Math.min(head, length * 0.4), Math.min(head * 0.6, length * 0.25))
}

/** A text label that always faces the camera (canvas sprite). */
export function label(text: string, color = '#333', size = 0.5) {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 64
  const x = c.getContext('2d')!
  x.font = '500 40px Inter, sans-serif'
  x.fillStyle = color
  x.textAlign = 'center'
  x.fillText(text, 128, 46)
  const tex = new THREE.CanvasTexture(c)
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }))
  s.scale.set(size * 4, size, 1)
  return s
}
