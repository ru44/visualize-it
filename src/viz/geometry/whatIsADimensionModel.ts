// geometry/what-is-a-dimension. n = how many directions the thing may move in (1 train, 2 ship, 3 plane),
// x, y, z = its coordinates. Only the first n coordinates count; the others are ignored (drawn as 0).
export const readParams = (p: Record<string, number>) => {
  const n = Math.max(1, Math.min(3, Math.round(p.n ?? 2)))
  const x = p.x ?? 6
  const y = n >= 2 ? (p.y ?? 3) : 0
  const z = n >= 3 ? (p.z ?? 2) : 0
  const nums = [x, y, z].slice(0, n)
  const num = (v: number) => (Math.round(v * 10) / 10).toString()
  return { n, x, y, z, nums, ignore: 3 - n, address: `(${nums.map(num).join(', ')})` }
}
