import { defineAsyncComponent, type Component } from 'vue'

// Every .vue file under this folder is a visualization, organized one subfolder per subject hall
// (multi-subject ones live in shared/). A lesson names it in kebab-case, so GameOfLife.vue is
// `game-of-life` — the folder never matters, only the file name. Nothing has to be registered by
// hand: drop in a file and a lesson can use it. Only names that do not follow from the filename
// live in ALIASES.
const ALIASES: Record<string, string> = {
  CircleViz: 'circle',
  BitsViz: 'bits',
  Surface3D: 'surface-3d',
  XYModel: 'xy-model',
}

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const modules = import.meta.glob('./**/*.vue')

export const vizRegistry: Record<string, Component> = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => {
    const name = path.split('/').pop()!.slice(0, -4)
    return [ALIASES[name] ?? kebab(name), defineAsyncComponent(load as () => Promise<{ default: Component }>)]
  }),
)
