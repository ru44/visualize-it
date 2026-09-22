// Reads the credits Sketchfab embeds in each public/models/*.glb (asset.extras) and merges them with
// content/models.yaml (orientation hints), so scenes can show attribution automatically.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import YAML from 'yaml'

export function collectModels(root: string) {
  const dir = join(root, 'public/models')
  const hints: Record<string, any> = Object.fromEntries((YAML.parse(readFileSync(join(root, 'content/models.yaml'), 'utf8')) as any[]).map((m) => [m.name, m]))
  const out: Record<string, any> = {}
  if (!existsSync(dir)) return out
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.glb'))) {
    const name = f.replace('.glb', '')
    const b = readFileSync(join(dir, f))
    if (b.subarray(0, 4).toString() !== 'glTF') continue
    const len = b.readUInt32LE(12)
    const json = JSON.parse(b.subarray(20, 20 + len).toString('utf8'))
    const ex = json.asset?.extras ?? {}
    const h = hints[name] ?? {}
    out[name] = {
      title: ex.title ?? h.title ?? name,
      author: (ex.author ?? '').replace(/\s*\(https?:[^)]*\)/, ''),
      authorUrl: /\((https?:[^)]*)\)/.exec(ex.author ?? '')?.[1] ?? '',
      license: (ex.license ?? h.license ?? '').replace(/\s*\(https?:[^)]*\)/, ''),
      source: ex.source ?? h.source ?? '',
      bytes: b.length,
      rotate: h.rotate ?? [0, 0, 0],
      size: h.size,
    }
  }
  return out
}
