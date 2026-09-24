---
title: Alpha, beta and gamma radiation
summary: A sheet of paper stops alpha radiation dead, a few millimetres of aluminium stops beta, but gamma rays only ever get thinner, never fully blocked, however much lead you stack up.
parameters:
  type: radiation type
  material: shield material
  thickness: shield thickness
variables:
  - the number of rays arriving before any shielding, treated as 100%
  - this material's half-value layer — the thickness that cuts the beam exactly in half
  - the shield's thickness
  - how many half-value layers of thickness the shield contains
  - the fraction of the original beam that gets through
charts: []
---

## Try it

1. Watch the three beams: alpha (top), beta (middle) and gamma (bottom), all flying at the same wall.
2. Set "shield material" to paper and drag "shield thickness" up from zero. The alpha beam stops the instant the wall appears; beta and gamma barely notice.
3. Switch "shield material" to lead and push "shield thickness" toward 50 mm. The gamma beam keeps thinning but never fully stops, while beta was already blocked by a sliver of it.

## Real-life examples

1. **A smoke detector's tiny alpha source.** It sits behind a thin foil window, thinner than a millimetre — plenty to stop its alpha particles from ever leaving the detector housing.
2. **A strontium-90 beta source, shielded properly.** Five millimetres of aluminium is enough to stop its beta particles, which is why aluminium and plastic, not lead, are the standard choice for beta shielding.
3. **A hospital's lead-lined gamma room.** Twenty millimetres of lead cuts the gamma beam to roughly an eighth of its original strength — real protection, but not a perfect wall.

## Test yourself

1. Stop the beta beam using paper alone, no metal at all.
2. Cut the gamma beam to under 5% of its original strength using lead.
3. Choose a lead shield thin enough to let the beta beam sneak through.

## Intuition

Alpha and beta particles are chunks of matter — a helium nucleus for alpha, an electron for beta — crashing through a solid and losing a little energy in every collision until they run out and stop. That gives each one a fixed range in a given material: thinner than the range and it sails through untouched, thicker than the range and it never comes out the other side. That is why the picture shows a clean, sudden "blocked" or "passes" for those two lanes, with nothing in between.

A gamma ray is not a chunk of matter but a burst of light, far more energetic than the light your eyes see. It does not lose energy gradually; it either slams straight through unaffected or is absorbed in one single event, and there is no way to know in advance which will happen to any one ray. Thicken the shield and you only change the odds — more rays get unlucky and are absorbed, but there is never a thickness that guarantees every last one is stopped, which is exactly what the flickering dots in the gamma lane are showing you.

## Formal

Alpha and beta particles have a well-defined range $x$ in a material: below it the beam passes with $I = I_0$, at or above it $I = 0$. That range is a few hundredths of a millimetre for alpha in any solid, and a few millimetres of aluminium for a typical beta particle — thin enough that a sheet of paper already stops alpha, but not beta.

A beam of gamma rays instead follows $I = I_0\left(\frac{1}{2}\right)^{x/H}$: every extra thickness $H$, the material's half-value layer, cuts the surviving fraction $I/I_0$ in half again, the same halving law as a half-life but measured in millimetres of shielding instead of seconds.

## Advanced

The half-value layer $H$ is set by the material and the gamma energy through $H = \ln 2/\mu$, where $\mu$ is the linear attenuation coefficient; denser, higher-atomic-number materials like lead have a much larger $\mu$ and so a much smaller $H$, which is why lead is the standard gamma shield despite being a poor choice for beta — a fast beta particle slowing down in a heavy element like lead throws off penetrating secondary X-rays (bremsstrahlung), so shielding designers deliberately choose light elements like aluminium or plastic for beta and save lead for gamma.

## Derivation

1. After one half-value layer the beam is cut in half; after $k$ half-value layers it has been cut in half $k$ times.
2. A shield of thickness $x$ contains $k = x/H$ half-value layers.
3. Substituting gives the surviving fraction after a shield of any thickness: $I = I_0\left(\frac{1}{2}\right)^{x/H}$.

## Real world

### Smoke detectors
The americium-241 inside emits alpha particles that never leave the sensor chamber, stopped by the foil and the surrounding air itself, which is why the device is safe to keep on a ceiling.

### Nuclear medicine and industrial radiography
Technicians shield beta-emitting tracers with plastic or aluminium, and gamma-emitting sources with lead or thick concrete, choosing the material to match the radiation, not just piling on the densest thing available.

### X-ray and CT rooms
The lead lining in a hospital scanning room's walls and the lead apron worn nearby are sized in half-value layers, calculated so the dose on the far side falls to an accepted safe fraction.

### Spacecraft and astronauts
Deep-space missions face a mix of particles and high-energy gamma-like radiation that ordinary shielding thicknesses can only thin, not stop completely, which is why mission planners work in total accumulated dose rather than expecting any shield to bring the count to zero.
