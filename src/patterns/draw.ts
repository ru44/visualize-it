// Turns a cell into SVG primitives on a 100×100 canvas. Pure, so the tests can check that no two
// options of an item look alike — the check is on what is drawn, not on the numbers behind it.
import type { Cell, Part, Role } from './engine'

export interface Prim {
  /** a path, or a circle when d is absent */
  d?: string
  cx?: number
  cy?: number
  r?: number
  fill: string
  sw: number
}

export const SHAPES = ['triangle', 'square', 'pentagon', 'hexagon', 'circle', 'diamond', 'star'] as const
/** white, light grey, dark grey, black — on paper that stays light in both themes, so the names stay true */
export const FILLS = ['var(--paper)', 'color-mix(in srgb, var(--ink) 28%, var(--paper))', 'color-mix(in srgb, var(--ink) 62%, var(--paper))', 'var(--ink)']
const RADIUS: Record<Role, number[]> = { main: [14, 20, 26, 32, 38], outer: [22, 28, 34, 38, 41], inner: [8, 11, 14, 17, 20] }
/** Grows each figure so that, at the same size step, they look about equally big. */
const SCALE = [1.18, 1.1, 1.05, 1, 0.9, 1, 1.12]

const f1 = (x: number) => Math.round(x * 10) / 10
const pathOf = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join('L') + 'Z'

function outline(shape: number, R: number): [number, number][] {
  const ring = (n: number, r: number, from: number) => Array.from({ length: n }, (_, k) => [r * Math.cos(from + (2 * Math.PI * k) / n), r * Math.sin(from + (2 * Math.PI * k) / n)] as [number, number])
  const r = R * SCALE[shape]
  switch (SHAPES[shape]) {
    case 'triangle':
      return ring(3, r, -Math.PI / 2)
    case 'square':
      return ring(4, r, -Math.PI / 4)
    case 'pentagon':
      return ring(5, r, -Math.PI / 2)
    case 'hexagon':
      return ring(6, r, -Math.PI / 2)
    case 'diamond':
      return [
        [0, -r * 1.12],
        [r * 0.72, 0],
        [0, r * 1.12],
        [-r * 0.72, 0],
      ]
    default: // star
      return Array.from({ length: 10 }, (_, k) => {
        const a = -Math.PI / 2 + (Math.PI * k) / 5
        const rr = k % 2 ? r * 0.47 : r
        return [rr * Math.cos(a), rr * Math.sin(a)] as [number, number]
      })
  }
}

/** A figure centred on (cx, cy) by its bounding box, so triangles do not sit high. */
function figure(shape: number, R: number, cx: number, cy: number, fill: string, sw: number): Prim {
  if (SHAPES[shape] === 'circle') return { cx, cy, r: f1(R * SCALE[4]), fill, sw }
  const pts = outline(shape, R)
  const ys = pts.map((p) => p[1])
  const dy = (Math.min(...ys) + Math.max(...ys)) / 2
  return { d: pathOf(pts.map(([x, y]) => [cx + x, cy + y - dy])), fill, sw }
}

/** Dice patterns over a 3×3 grid of slots: counts up to nine can be seen at a glance. */
export const GROUP_SLOTS: number[][] = [[], [4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8], [0, 2, 3, 4, 5, 6, 8], [0, 1, 2, 3, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]]
const SLOT = [22, 50, 78]
/** The ring of eight places for a lone dot, clockwise from the top-left corner. */
export const RING: [number, number][] = [
  [12, 12],
  [50, 12],
  [88, 12],
  [88, 50],
  [88, 88],
  [50, 88],
  [12, 88],
  [12, 50],
]
/** The eight strokes a lines picture is built from: four sides, two diagonals, two middle lines. */
export const STROKES = ['M24 24H76', 'M76 24V76', 'M24 76H76', 'M24 24V76', 'M24 24L76 76', 'M76 24L24 76', 'M50 24V76', 'M24 50H76']
const DOT_GRID = [26, 50, 74]

function arrow(rot: number, L: number): Prim[] {
  const a = (rot * Math.PI) / 4
  const at = (x: number, y: number): [number, number] => [50 + x * Math.cos(a) - y * Math.sin(a), 50 + x * Math.sin(a) + y * Math.cos(a)]
  const h = L * 0.55
  const w = L * 0.38
  const [x0, y0] = at(0, L)
  const [x1, y1] = at(0, -L + h * 0.9)
  return [
    { d: `M${f1(x0)} ${f1(y0)}L${f1(x1)} ${f1(y1)}`, fill: 'none', sw: L > 20 ? 4 : 3 },
    { d: pathOf([at(0, -L), at(-w, -L + h), at(w, -L + h)]), fill: 'var(--ink)', sw: 1.5 },
  ]
}

function drawPart(p: Part): Prim[] {
  const v = p.v
  switch (p.kind) {
    case 'shape':
      return [figure(v.shape!, RADIUS[p.role][v.size!], 50, 50, FILLS[v.fill!], p.role === 'inner' ? 2.2 : 2.6)]
    case 'group':
      return GROUP_SLOTS[v.count!].map((s) => figure(v.shape!, 10, SLOT[s % 3], SLOT[Math.floor(s / 3)], FILLS[v.fill!], 2))
    case 'arrow':
      return arrow(v.rot!, p.role === 'inner' ? 15 : 30)
    case 'dot':
      return [{ cx: RING[v.pos!][0], cy: RING[v.pos!][1], r: 6.5, fill: 'var(--ink)', sw: 0 }]
    case 'lines':
      return STROKES.filter((_, k) => v.lines! & (1 << k)).map((d) => ({ d, fill: 'none', sw: 3.4 }))
    case 'dots':
      return Array.from({ length: 9 }, (_, k) => k)
        .filter((k) => v.dots! & (1 << k))
        .map((k) => ({ cx: DOT_GRID[k % 3], cy: DOT_GRID[Math.floor(k / 3)], r: 7, fill: 'var(--ink)', sw: 0 }))
  }
}

/** Outer figures first, so whatever sits inside is drawn on top. */
export const draw = (cell: Cell): Prim[] => [...cell.filter((p) => p.role === 'outer'), ...cell.filter((p) => p.role !== 'outer')].flatMap(drawPart)
