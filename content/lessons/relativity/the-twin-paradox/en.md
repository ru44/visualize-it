---
title: The twin who comes home younger
summary: >-
  One twin flies to a star and back at a large fraction of light speed; the
  twin who stayed on Earth ages more years than the traveler does, and the
  spacetime diagram shows exactly why the trip, not the flying itself, is
  what breaks the tie.
parameters:
  v: the ship's speed as a fraction of light speed, v/c
  D: the one-way distance to the star, in light-years
---

## Try it

1. Look at the spacetime diagram: Earth's worldline runs straight up the middle, and the ship's worldline goes out to the star and back, bending sharply at the turnaround.
2. Count the tick marks along each worldline. Earth's ticks are evenly spaced, one per year; the ship's ticks are spaced further apart in this picture, because each of the ship's own years covers more of Earth's time.
3. Drag v higher. The ship's line tilts closer to the dashed 45° light line, its ticks spread even further apart, and the age gap printed at the bottom grows.

## Real-life examples

1. **A round trip to Proxima Centauri**, D = 4.24 light-years, at v = 0.9. Earth counts T = 9.4 years; the traveler's own clock counts only τ = 4.1 years — the traveler comes home 5.3 years younger than a twin who stayed behind.
2. **A round trip to Sirius**, D = 8.6 light-years, at a gentler v = 0.5. Earth counts a long T = 34.4 years; the traveler still ages less, τ = 29.8 years, a 4.6-year gap even at only half light speed.
3. **A short, extreme hop**, D = 1 light-year at v = 0.99. Earth counts T = 2.0 years; the traveler's own clock counts only τ = 0.29 years, about 104 days, for the same round trip.

## Test yourself

1. Push v until γ reads about 2.
2. Set v to 0.99, close to the top of the slider.
3. Set the distance D to 8.6 light-years, the real distance to Sirius.

## Intuition

Both twins agree the ship travels a distance D out and D back, but they do not agree on how long that takes on the ship's own clock. Earth, which never accelerates, simply counts T = 2D/v years going by at a steady rate. The traveler's clock, moving at speed v the whole way, ticks slower by the familiar factor γ, so it only counts τ = T/γ years for the identical round trip — fewer years, on the very same clock, for the very same journey.

The apparent paradox is that motion is relative, so why isn't it the traveler who sees Earth age less? The answer is the turnaround: Earth's twin stays in one unbroken inertial frame the whole time, but the traveler has to decelerate, stop, and accelerate back toward home, briefly leaving inertial motion altogether. That single asymmetric event is what breaks the symmetry between the twins and picks out, unambiguously, which one actually aged less.

## Formal

Earth's clock, which never accelerates, simply counts the coordinate time for the round trip, $T = \dfrac{2D}{v}$, where $D$ is the one-way distance and $v$ is the ship's speed.

The traveler's own clock measures proper time instead, always shorter by the Lorentz factor: $\tau = \dfrac{T}{\gamma} = \dfrac{2D}{v}\sqrt{1-v^2/c^2}$, strictly less than $T$ for any speed above zero.

## Advanced

A full accounting of what each twin actually *sees* through a telescope during the trip, not just what their clocks read at the end, uses the relativistic Doppler effect: the traveler sees Earth's clock appear to run slow on the way out and fast on the way back, and the two effects do not cancel evenly around the turnaround — they resolve into exactly the same final age gap this page computes from the two worldlines.

## Derivation

1. Earth's own clock, sitting still the whole time, simply counts the ordinary round-trip time $T = 2D/v$ for the ship to reach the star and come back.
2. The traveling twin's clock runs slow by the familiar factor $\gamma$ the whole trip, so it counts proper time $\tau = T/\gamma = (2D/v)\sqrt{1-v^2/c^2}$ instead.
3. Since $\gamma \ge 1$ whenever $v > 0$, the difference $T - \tau$ is always positive and grows the closer $v$ gets to $c$ — the traveler always comes home younger, never the other way around.

## Real world

### GPS satellites, on a much gentler scale
A GPS satellite is, in miniature, a twin that keeps moving relative to the ground: its orbital motion alone would make its onboard clock run slightly slow compared to a ground clock, the same effect this page shows at wildly exaggerated speed and distance.

### Why no astronaut has done this yet
Even the fastest human spaceflight, the Apollo missions at roughly 11 km/s, gives v/c of about 0.00004 — far too small a fraction of light speed to produce a measurable age gap on a human timescale; the effect is real but needs speeds no current rocket can reach.

### Muon decay, the twin paradox on a subatomic clock
A muon that accelerates, turns around in a magnetic field, and returns to its starting point measures less of its own decay-clock time than a muon that never turned at all, a laboratory-scale version of exactly this asymmetry, confirmed to high precision.

### Interstellar travel proposals
Serious proposals for reaching nearby stars, like laser-sail concepts aiming for tens of percent of light speed, are studied partly because of this very effect: a probe or crew moving fast enough would experience meaningfully less elapsed time than mission control back on Earth.
