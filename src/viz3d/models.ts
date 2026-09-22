import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import meta from '../generated/models.json'

export interface ModelInfo { title: string; author: string; authorUrl: string; license: string; source: string; bytes: number; rotate: [number, number, number]; size?: number }
export const modelInfo = meta as unknown as Record<string, ModelInfo>
export const hasModel = (name: string) => name in modelInfo

// GLB models live in public/models/<name>.glb and are listed in content/models.yaml.
// Loading is cached; a missing file resolves to null so scenes can fall back to simple geometry.
const cache = new Map<string, Promise<THREE.Group | null>>()
const loader = new GLTFLoader()

export function loadModel(name: string): Promise<THREE.Group | null> {
  if (!hasModel(name)) return Promise.resolve(null)
  if (!cache.has(name))
    cache.set(
      name,
      new Promise((resolve) => loader.load(`./models/${name}.glb`, (g) => resolve(g.scene), undefined, () => resolve(null))),
    )
  return cache.get(name)!.then((g) => {
    if (!g) return null
    const c = g.clone(true)
    const [rx, ry, rz] = modelInfo[name].rotate ?? [0, 0, 0]
    const wrap = new THREE.Group()
    c.rotation.set((rx * Math.PI) / 180, (ry * Math.PI) / 180, (rz * Math.PI) / 180)
    wrap.add(c)
    return wrap
  })
}

/** Scale and centre a loaded model so its longest side equals `size`, resting on y = 0. */
export function fit(model: THREE.Object3D, size: number) {
  const box = new THREE.Box3().setFromObject(model)
  const dims = box.getSize(new THREE.Vector3())
  const s = size / Math.max(dims.x, dims.y, dims.z, 1e-6)
  model.scale.multiplyScalar(s)
  const box2 = new THREE.Box3().setFromObject(model)
  const c = box2.getCenter(new THREE.Vector3())
  model.position.sub(new THREE.Vector3(c.x, box2.min.y, c.z))
  model.traverse((o: any) => o.isMesh && ((o.castShadow = true), (o.receiveShadow = true)))
  return model
}
