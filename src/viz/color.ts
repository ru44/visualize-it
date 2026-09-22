/** Approximate visible colour of light with wavelength `nm` (380–750 nm); grey outside the visible range. */
export function wavelengthColor(nm: number): string {
  if (nm < 380 || nm > 750) return 'rgb(150,150,160)'
  let r = 0, g = 0, b = 0
  if (nm < 440) (r = (440 - nm) / 60), (b = 1)
  else if (nm < 490) (g = (nm - 440) / 50), (b = 1)
  else if (nm < 510) (g = 1), (b = (510 - nm) / 20)
  else if (nm < 580) (r = (nm - 510) / 70), (g = 1)
  else if (nm < 645) (r = 1), (g = (645 - nm) / 65)
  else r = 1
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (750 - nm)) / 50 : 1
  const c = (v: number) => Math.round(255 * Math.pow(v * f, 0.8))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}
export const bandOf = (nm: number) => (nm < 380 ? 'uv' : nm > 750 ? 'ir' : 'visible')
