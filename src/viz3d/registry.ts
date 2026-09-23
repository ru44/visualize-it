import { defineAsyncComponent, type Component } from 'vue'

/**
 * 3D scenes a lesson opts into with `visualization3d: { type }` in its lesson.yaml. Same props and
 * emits as a 2D visualization. Like src/viz, every file here registers itself: the type is the file
 * name without the "3D" suffix, in kebab-case, so Spacetime3D.vue is `spacetime` and
 * SurfaceMesh3D.vue is `surface` through the alias below.
 */
const ALIASES: Record<string, string> = { SurfaceMesh: 'surface' }

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const modules = import.meta.glob('./*3D.vue')

export const viz3dRegistry: Record<string, Component> = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => {
    const name = path.slice(2, -6)
    return [ALIASES[name] ?? kebab(name), defineAsyncComponent(load as () => Promise<{ default: Component }>)]
  }),
)
