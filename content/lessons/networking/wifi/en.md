---
title: 'Wi-Fi: how far a whisper of radio reaches'
summary: >-
  Your router shouts with a fifth of a watt, and every metre and every wall
  takes its cut — the signal bars on your phone are just an accountant's
  report of what survived the trip.
parameters:
  d: d — metres between the router and the phone
  w: w — walls standing in the way
  L: L — decibels each wall eats (drywall ≈ 3, brick ≈ 8)
variables:
  - received power at the phone, in dBm
  - transmit power at the router, fixed at 20 dBm here
---

## Try it

1. Drag the phone away from the router: the rings fade, the distance term 20·log₁₀(d) grows, and the bars drop one by one.
2. Keep d = 5 and raise w instead: each wall takes a flat L-decibel bite — two brick walls can cost more than twenty metres of open air.
3. Find the dead zone: push the phone past the last wall until the budget line at the top goes below −80 and the bars empty out.

## Real-life examples

- **One room away.** Five metres and one plasterboard wall: a comfortable −39 dBm, full bars, full speed.
- **Next to the router.** Two metres, no walls: −26 dBm, as strong as home Wi-Fi ever gets — where speed tests get their bragging numbers.
- **The far bedroom.** Twenty-five metres and three brick walls: about −72 dBm, one shaky bar, and video calls start to stutter.

## Test yourself

1. Keep a strong signal: −50 dBm or better.
2. Build a dead zone: drive the signal below −75 dBm.
3. Punch through 3 walls and still hold −65 dBm — thin walls are the trick.

## Intuition

Drop a pebble in a pond and the ripples get weaker as they spread — the same energy stretched over a bigger and bigger circle. Radio does this in three dimensions, so doubling the distance always costs the same slice of signal, and engineers count those slices in decibels. On screen, the fading rings are the spreading; drag the phone and watch its bars pay for every metre.

Walls are a different kind of toll: each one absorbs a fixed fraction of whatever reaches it, a flat fee of L decibels, whether the signal arrives strong or weak. That is why the sim is really a budget: start with the router's 20 dBm, pay 40 dB just to get the first metre at Wi-Fi frequencies, pay 20·log₁₀(d) for the distance, then w·L for the walls — and the phone needs roughly −80 dBm or better of what is left to hold a link at all.

## Formal

The model is $P_r = P_t - 40 - 20\log_{10} d - wL$ in dBm: free-space loss at 2.4 GHz is about 40 dB over the first metre, then 20 dB for every tenfold increase in distance, and each wall subtracts its own fixed $L$.

Decibels are logarithmic bookkeeping: −10 dB means a tenth of the power, −20 dB a hundredth, so the straight-line subtraction on screen hides an enormous multiplicative collapse — between full bars at −40 dBm and the dead zone at −80 dBm lies a factor of ten thousand in actual power.

## Advanced

Real Wi-Fi juggles two bands: 2.4 GHz travels farther and squeezes through walls better, while 5 GHz carries far more data but pays a steeper wall tax — which is why routers now sell both and phones hop between them. Data rate itself follows the signal-to-noise ratio: as $P_r$ sinks toward the noise floor the router keeps the link alive by switching to slower, sturdier encodings, which is why the far bedroom gets bars before it gets bandwidth. Mesh systems simply refuse the long trip: several small hops, each with a healthy budget, beat one heroic one.

## Derivation

1. Radio spreads like a sphere, so the power crossing each square metre falls with the square of distance — in decibels, a loss of $20\log_{10} d$.
2. Each wall absorbs a fixed fraction of what hits it, a flat $wL$ decibels in total.
3. Start from the router's $P_t = 20$ dBm, subtract the first-metre cost and both tolls, and what remains at the phone is $P_r$.

## Real world

### Where to put the router
Central, high and in the open: every wall skipped refunds whole bars, which no expensive router can buy back.

### Mesh and extenders
Several short, strong hops replace one long, starved one — the budget is paid in small instalments.

### Why the microwave kills the video call
Microwave ovens leak at 2.45 GHz, right inside Wi-Fi's 2.4 GHz band, raising the noise floor your signal must stay above.

### 5 GHz vs 2.4 GHz
The faster band loses more per wall, so phones quietly fall back to 2.4 GHz at the edge of the house.
