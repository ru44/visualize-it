// The result as a picture to send to friends: score, rough IQ estimate and the five rules — no name,
// no answers. Drawn on a canvas in the page, so nothing leaves the device until the student shares
// the file themselves. Always on light paper, whatever the site's theme, so it reads in any chat.
import { draw, FILLS } from './draw'
import type { Cell } from './engine'

export interface CardData {
  rtl: boolean
  site: string
  title: string
  score: number
  total: number
  scoreLabel: string
  /** e.g. "≈ 104" or "< 70" */
  iq: string
  iqLabel: string
  iqRange: string
  version: string
  rules: { name: string; value: string; share: number }[]
  anon: string
  dare: string
  url: string
  /** a puzzle drawn in the corner, its last picture left as a question mark */
  puzzle: Cell[]
}

const W = 1200
const H = 630
const C = { bg: '#f4f4f3', panel: '#ffffff', fg: '#16161a', muted: '#6b6b76', line: '#e6e6e9', track: '#efeff1', accent: '#2f5bea', pos: '#0d9488', ink: '#1d1d22' }
// The puzzle's four shades, as the site draws them on light paper.
const SHADES = ['#ffffff', '#c6c6c8', '#7a7a7e', C.ink]

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}

function drawCell(g: CanvasRenderingContext2D, cell: Cell, x: number, y: number, size: number) {
  g.save()
  g.translate(x, y)
  g.scale(size / 100, size / 100)
  g.strokeStyle = C.ink
  g.lineJoin = g.lineCap = 'round'
  for (const p of draw(cell)) {
    const shade = FILLS.indexOf(p.fill)
    const fill = p.fill === 'none' ? null : shade >= 0 ? SHADES[shade] : C.ink
    const path = new Path2D()
    if (p.d) path.addPath(new Path2D(p.d))
    else path.arc(p.cx!, p.cy!, p.r!, 0, 2 * Math.PI)
    if (fill) ((g.fillStyle = fill), g.fill(path))
    if (p.sw) ((g.lineWidth = p.sw), g.stroke(path))
  }
  g.restore()
}

export async function renderCard(d: CardData): Promise<Blob> {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const g = c.getContext('2d')!
  const family = d.rtl ? '"IBM Plex Sans Arabic", Inter' : 'Inter, "IBM Plex Sans Arabic"'
  await Promise.all([400, 600].map((w) => document.fonts.load(`${w} 40px ${family}`).catch(() => {})))
  const font = (weight: number, px: number) => `${weight} ${px}px ${family}, system-ui, sans-serif`
  // Arabic mirrors the layout: a point x from the left becomes x from the right.
  const X = (x: number) => (d.rtl ? W - x : x)
  // maxWidth keeps a long translation inside its column: the canvas narrows it rather than overflow.
  const text = (s: string, x: number, y: number, weight: number, px: number, color: string, maxWidth: number, align: CanvasTextAlign = 'start') => {
    g.font = font(weight, px)
    g.fillStyle = color
    g.textAlign = align
    g.direction = d.rtl ? 'rtl' : 'ltr'
    g.fillText(s, X(x), y, maxWidth)
  }
  // Numbers read left to right in every language: measure the run, then place it from its left edge.
  const ltrRun = (parts: [string, number, number, string][], x: number, y: number) => {
    g.direction = 'ltr'
    g.textAlign = 'left'
    const widths = parts.map(([s, w, px]) => ((g.font = font(w, px)), g.measureText(s).width))
    let left = d.rtl ? X(x) - widths.reduce((a, b) => a + b, 0) : x
    parts.forEach(([s, w, px, color], i) => {
      g.font = font(w, px)
      g.fillStyle = color
      g.fillText(s, left, y)
      left += widths[i]
    })
  }

  g.fillStyle = C.bg
  g.fillRect(0, 0, W, H)
  roundRect(g, 32, 32, W - 64, H - 64, 28)
  g.fillStyle = C.panel
  g.fill()
  g.strokeStyle = C.line
  g.lineWidth = 2
  g.stroke()

  text(d.site, 88, 104, 600, 24, C.accent, 600)
  text(d.title, 88, 152, 600, 40, C.fg, 680)

  ltrRun([[String(d.score), 600, 128, C.fg], [` / ${d.total}`, 400, 44, C.muted]], 88, 290)
  text(d.scoreLabel, 88, 328, 400, 22, C.muted, 320)
  ltrRun([[d.iq, 600, 96, C.accent]], 430, 290)
  text(d.iqLabel, 430, 328, 400, 22, C.muted, 330)
  if (d.iqRange) text(d.iqRange, 430, 356, 400, 19, C.muted, 330)

  d.rules.forEach((r, i) => {
    const y = 396 + i * 30
    text(r.name, 88, y + 7, 400, 21, C.fg, 228)
    const [a, b] = d.rtl ? [W - 600, W - 330] : [330, 600]
    roundRect(g, a, y - 6, b - a, 12, 6)
    g.fillStyle = C.track
    g.fill()
    if (r.share > 0) {
      const w = Math.max(12, (b - a) * r.share)
      roundRect(g, d.rtl ? b - w : a, y - 6, w, 12, 6)
      g.fillStyle = C.pos
      g.fill()
    }
    text(r.value, 620, y + 7, 400, 19, C.muted, 150)
  })

  // A puzzle in the corner: the thing itself, with its question mark.
  const size = 96
  const gap = 4
  const gx = d.rtl ? 92 : W - 92 - 3 * size - 2 * gap
  const gy = 96
  roundRect(g, gx - 10, gy - 10, 3 * size + 2 * gap + 20, 3 * size + 2 * gap + 20, 16)
  g.fillStyle = '#d9d9dc'
  g.fill()
  d.puzzle.forEach((cell, i) => {
    const cx = gx + (i % 3) * (size + gap)
    const cy = gy + Math.floor(i / 3) * (size + gap)
    g.fillStyle = C.panel
    g.fillRect(cx, cy, size, size)
    if (i < 8) drawCell(g, cell, cx + 8, cy + 8, size - 16)
    else {
      g.font = font(600, 44)
      g.fillStyle = C.muted
      g.textAlign = 'center'
      g.fillText('?', cx + size / 2, cy + size / 2 + 16)
    }
  })
  // Under the puzzle, lined up with its outer edge.
  text(d.version, W - 92, gy + 3 * size + 2 * gap + 46, 400, 20, C.muted, 3 * size + 2 * gap, 'end')
  text(d.dare, W - 92, 520, 600, 26, C.fg, 3 * size + 2 * gap, 'end')

  text(d.anon, 88, 562, 400, 20, C.muted, 520)
  g.font = font(600, 20)
  g.fillStyle = C.accent
  g.direction = 'ltr'
  g.textAlign = d.rtl ? 'left' : 'right'
  g.fillText(d.url, d.rtl ? 92 : W - 92, 562, 520)

  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('no image'))), 'image/png'))
}
