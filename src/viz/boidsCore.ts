// Shared helpers for the boid-style simulations (Boids.vue, Vicsek.vue, CollectiveChoice.vue): a
// tiny seeded RNG, angle/vector helpers and an SVG triangle marker, so each component only has to
// implement its own steering rule instead of re-deriving this plumbing five times.

/** Deterministic RNG so the same parameters always draw the same picture. */
export function seededRng(seed: number) {
  let s = seed >>> 0 || 1
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export const TAU = Math.PI * 2

export function wrap(v: number, max: number) {
  return ((v % max) + max) % max
}

/** Shortest signed distance around a torus of size `max` (so edge wrap-around doesn't look far). */
export function torusDelta(a: number, b: number, max: number) {
  let d = a - b
  if (d > max / 2) d -= max
  if (d < -max / 2) d += max
  return d
}

export function headingOf(x: number, y: number) {
  return Math.atan2(y, x)
}

/** Small triangle pointing along `heading`, ready to drop into an SVG <polygon points="…">. */
export function boidPoints(x: number, y: number, heading: number, len = 10, wid = 6) {
  const c = Math.cos(heading)
  const s = Math.sin(heading)
  const tipX = x + c * len * 0.6
  const tipY = y + s * len * 0.6
  const backX = x - c * len * 0.4
  const backY = y - s * len * 0.4
  const nx = -s * wid * 0.5
  const ny = c * wid * 0.5
  return `${tipX.toFixed(1)},${tipY.toFixed(1)} ${(backX + nx).toFixed(1)},${(backY + ny).toFixed(1)} ${(backX - nx).toFixed(1)},${(backY - ny).toFixed(1)}`
}

export interface Boid { x: number; y: number; h: number }

/** Random boids scattered over W×H with random headings, from a fixed seed. */
export function seedBoids(n: number, w: number, h: number, seed: number): Boid[] {
  const rnd = seededRng(seed)
  return Array.from({ length: n }, () => ({ x: rnd() * w, y: rnd() * h, h: rnd() * TAU }))
}

/** Mean resultant length of a set of headings (0 = random directions, 1 = all aligned). */
export function polarization(hs: number[]): number {
  if (!hs.length) return 0
  let x = 0
  let y = 0
  for (const h of hs) { x += Math.cos(h); y += Math.sin(h) }
  return Math.hypot(x, y) / hs.length
}
