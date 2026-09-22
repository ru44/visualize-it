---
title: Tides
summary: >-
  The Moon does not pull water toward it so much as stretch Earth along the
  Earth-Moon line, raising two bulges at once — one near, one far.
parameters:
  A: lunar tide amplitude
  B: solar tide amplitude
  t0: lunar tide phase offset
  x: time
variables:
  - the sea-level height above the mean
  - the amplitude of the lunar tide component
  - the amplitude of the solar tide component
  - the phase offset of the lunar tide, in hours
  - time, in hours
---

## Intuition

Drag time forward and watch the sea level rise and fall roughly twice a day. That is the lunar bulge sweeping past as Earth spins underneath it, and because the Moon also creeps along its orbit each day, the two high tides land about 50 minutes later each day rather than exactly 12 hours apart — a full lunar day is 24 h 50 min, not 24 h.

Now raise $B$ toward $A$ and watch the pattern change shape: when the solar and lunar bulges line up you get the tall spring tides of new and full moon, and when they are a quarter-cycle apart you get the small neap tides of the first and last quarter — the very same phase that sets the Moon's visual shape.

## Formal

The lunar tide has period 12.42 hours (half of 24 h 50 min, since each location passes under two bulges per lunar day): $A\cos\left(\frac{2\pi(x-t_0)}{12.42}\right)$. The Sun raises a second, weaker pair of bulges on a clean 12-hour cycle: $B\cos\left(\frac{2\pi x}{12}\right)$.

Adding them gives the observed sea level, $h(x) = A\cos\left(\frac{2\pi(x-t_0)}{12.42}\right) + B\cos\left(\frac{2\pi x}{12}\right)$, whose overall height beats up and down over about 14.8 days as the two cosines drift in and out of phase.

## Advanced

The Moon's tidal pull is a differential force: it is stronger on the near side of Earth than at the centre and weaker still on the far side, and it is that difference — not the pull itself — that stretches Earth into an ellipsoid with two bulges. Because tidal force falls off as the inverse cube of distance rather than the inverse square, the much closer Moon dominates the much more massive but far more distant Sun, contributing roughly twice the Sun's tidal effect.

## Derivation

1. The Moon's gravity is slightly stronger on Earth's near side than at the far side, stretching the oceans into a bulge on each side and giving a roughly 12.42-hour rhythm as Earth spins beneath them.
2. The Sun does the same on a clean 12-hour cycle, but more weakly because it is so much farther away.
3. The tide you see is the sum of both waves, so their alignment over the month decides whether tides run large or small.

## Real world

### Coastal shipping and fishing
Harbours schedule loading and fishing trips around predicted high and low tides read straight off this kind of curve.

### Tidal power
Tidal barrages and turbines are sized around the spring-neap range, since spring tides can move several times the water volume of neap tides.

### Tide pools and ecosystems
Intertidal life times feeding and reproduction to the tidal rhythm, some species even keeping to it in captivity with no ocean nearby.

### Bay of Fundy
The Bay of Fundy has the world's largest tidal range, over 15 metres, because its shape resonates with the roughly 12-hour tidal period.
