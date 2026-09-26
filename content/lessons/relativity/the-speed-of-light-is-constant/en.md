---
title: Why light's speed never changes
summary: >-
  Bounce a beam of light up and down inside a moving train and measure how
  fast it travels diagonally, as seen from the platform — it is always
  exactly the same number, never faster for a faster train.
parameters:
  v: train's speed as a fraction of light speed, v/c
  L: mirror spacing inside the light clock
---

## Try it

1. Watch the light clock inside the train: a flash of light bounces between a floor mirror and a ceiling mirror. At v = 0.3 the train barely moves during one bounce, so the diagonal path drawn from the platform looks almost straight up and down.
2. Raise v toward 0.7 and 0.9. The train slides further sideways during each bounce, so the same flash now traces a much longer, shallower diagonal — yet the readout for its speed along that diagonal never moves off 299,792,458 m/s.
3. Check the two clock readouts: Δt₀ is what a passenger's watch would time for one bounce, Δt is what a platform clock times for the same bounce. Watch Δt pull ahead of Δt₀ as v climbs, even though the light itself never sped up.

## Real-life examples

1. **The Parker Solar Probe**, the fastest object humans have ever built, reached about 192 km/s — v = 0.00064 here. Its light clock's diagonal path is stretched only a hair; γ is 1.0000002, too close to 1 to draw any differently from a stationary train.
2. **A beam at half light speed**, v = 0.5. Now the stretching is real: γ = 1.15, so the platform clock already reads noticeably more than a passenger's watch for the very same bounce.
3. **A beam at v = 0.866**, roughly nine-tenths of light speed. γ has reached almost exactly 2: the platform times the bounce at almost double the passenger's own count, purely from geometry, because the light's speed itself could not budge.

## Test yourself

1. Push v until γ reads about 2.
2. Set v to the Parker Solar Probe's real speed, 0.00064.
3. Set the mirror spacing L to a real tabletop light clock's size, 1 metre.

## Intuition

Inside the train, a passenger's light clock is simple: a flash leaves the floor mirror, hits the ceiling mirror a distance L above, and comes straight back, taking a time Δt₀ = 2L/c by the passenger's own watch. From the platform, though, the train is sliding sideways the whole time the flash is in the air, so the same flash has to travel a longer, diagonal path to reach a ceiling mirror that has itself moved sideways.

Here is the part that took Einstein's postulate to accept: that diagonal path is still covered at exactly c, the same c the passenger measured going straight up. Not c + v, not some blend — exactly c, every single time, for every v you drag on the slider. A longer path covered at the same speed can only mean one thing: it takes longer. That is the platform clock reading Δt, always at least as large as Δt₀, and growing without limit as v approaches c.

## Formal

For one bounce, the diagonal the platform sees has a vertical leg of length 2L (floor to ceiling and back) and a horizontal leg of length $v\,\Delta t$ (how far the train slides while the flash is airborne), so by the Pythagorean theorem and light's constant speed $c$, $c\,\Delta t = \sqrt{(2L)^2 + (v\,\Delta t)^2}$.

Solving for $\Delta t$ gives $\Delta t = \dfrac{2L/c}{\sqrt{1-v^2/c^2}} = \gamma\,\Delta t_0$, where $\Delta t_0 = 2L/c$ is what the passenger's own watch reads and $\gamma = 1/\sqrt{1-v^2/c^2}$ is always at least 1.

## Advanced

This is exactly the logic behind the 1887 Michelson–Morley experiment: it tried to detect Earth's motion through a supposed "ether" by comparing light's round-trip time along two perpendicular arms, expecting a tiny mismatch from the motion. None was ever found, at any time of year, to extraordinary precision — the cleanest real-world proof that light's speed truly does not depend on the speed of whatever is doing the measuring.

## Derivation

1. Light's speed is postulated to be the same $c$ for every observer, so the platform must time the flash's longer diagonal path at that same $c$: $c\,\Delta t = \sqrt{(2L)^2 + (v\,\Delta t)^2}$.
2. Solving that equation for $\Delta t$ gives $\Delta t = \dfrac{2L/c}{\sqrt{1-v^2/c^2}} = \gamma\,\Delta t_0$, stretching the platform's measured time beyond the passenger's own $\Delta t_0 = 2L/c$.
3. Because $\gamma = 1/\sqrt{1-v^2/c^2}$ is at least 1 for any train speed $v$ below $c$, the platform's clock never reads less than the passenger's, no matter how the geometry is drawn.

## Real world

### Michelson and Morley's interferometer
Splitting a beam and sending its two halves down perpendicular arms, then recombining them, Michelson and Morley expected Earth's 30 km/s orbital motion to shift the light's timing detectably. It never did, in any direction, at any season — direct evidence that there is no hidden "ether wind" and that light's speed is the same for every observer, which is exactly the assumption this light clock relies on.

### GPS satellites
Every GPS satellite carries an atomic clock whose ticks must be corrected for exactly this stretching, because it orbits at about 3.9 km/s relative to the ground; engineers who ignored it would see position errors grow by kilometres per day.

### Particle accelerators
Beams of protons at CERN are pushed to v > 0.999999c, and every calculation of how long their unstable companions survive depends on exactly this Δt = γΔt₀ relationship holding to extraordinary precision — which it does, every time it is tested.

### Why nothing can ever reach light speed itself
As v climbs toward c in this picture, the diagonal path keeps stretching but the speed along it never can, since c is fixed; the passenger's whole bounce would need to take an ever-larger slice of the platform's time, which is one reason nothing with mass can ever be pushed all the way to v = c.
