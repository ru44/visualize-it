---
title: Gliding and glide ratio
summary: >-
  With the engines off, height is the only fuel left — and a single number,
  the glide ratio, says exactly how many metres forward an aircraft (or a
  paper plane) buys for every metre of height it spends.
parameters:
  LD: lift-to-drag ratio L/D
  h: starting height h
variables:
  - lift
  - drag
  - glide (flight-path) angle below the horizon
---

## Try it

1. Picture a paper aeroplane released from a 1.5 m desk, glide ratio about 4.
2. Read the glide distance: only a few metres, and the glide angle is steep.
3. Drag «lift-to-drag ratio L/D» up toward a real glider's 30, and watch the same starting height suddenly buy a huge distance instead.

## Real-life examples

1. **A paper aeroplane from a desk.** Released 1.5 m up with a glide ratio around 4, it covers roughly 6 m before touching down — a steep, short glide.
2. **A sailplane released at 1,000 m.** With a glide ratio of about 30, it can cover roughly 30 km before landing — cross-country soaring depends on exactly this number.
3. **A widebody jet with both engines out, from 12,500 m.** At a clean glide ratio of about 15, it could in theory cover a straight-line 187 km — famous real engine-out glides have covered somewhat less, because the crew also had to manoeuvre to lose extra height before landing.

## Test yourself

1. Reach a glide distance of about 30 km starting from 1,000 m — sailplane territory.
2. Push the glide ratio above 40 — a top competition sailplane.
3. Starting from a realistic desk height (2 m or less), still cover more than 8 m of glide distance.

## Intuition

With no engine, an aircraft has exactly one source of forward motion left: gravity, pulling it down a shallow descending path instead of straight down. Drag «starting height h» up and down and watch the glide distance track it directly — more height banked means more distance bought, at a fixed exchange rate set by the aircraft's shape. That exchange rate is the glide ratio: drag «lift-to-drag ratio L/D» up and the same starting height suddenly buys far more distance, because a more efficient shape needs a shallower glide angle to balance drag with the pull of gravity along its path.

Here's the part worth sitting with: the glide ratio doesn't care how heavy the aircraft is. A loaded glider and an empty one, released from the same height at the same L/D, cover the same distance — the heavier one just has to fly a bit faster to do it, since both lift and drag scale with weight in exactly the same proportion. Weight decides speed, not distance; shape decides distance.

## Formal

In a steady, unpowered glide, the flight-path angle $\gamma$ below the horizon satisfies $\dfrac{L}{D} = \dfrac{1}{\tan\gamma}$ — a shallower angle (bigger glide ratio) needs a more aerodynamically efficient aircraft.

For small angles, $\tan\gamma \approx \gamma$ in radians, and the horizontal distance covered while losing height $h$ is approximately $\text{distance} \approx h \cdot (L/D)$ — the simple multiplication this lesson's picture uses.

## Advanced

Because glide ratio depends only on $L/D$, and both lift and drag scale with the square of airspeed at a fixed angle of attack, an aircraft has a *best* glide speed where $L/D$ peaks; flying faster or slower than that speed (even though still gliding stably) trades away some of the available distance, which is why glider pilots fly a specific "best glide" speed rather than whatever feels comfortable.

## Derivation

1. In a steady glide with no thrust, gravity is the only engine: the weight component along the flight path balances drag, and the component across it balances lift — $W\sin\gamma = D, \quad W\cos\gamma = L$.
2. Dividing one equation by the other cancels the weight entirely: $\dfrac{L}{D} = \dfrac{\cos\gamma}{\sin\gamma} = \dfrac{1}{\tan\gamma}$ — glide ratio depends only on how efficiently the shape flies, never on how heavy it is.
3. For a shallow glide, $\tan\gamma \approx \gamma$ (radians), so the horizontal distance covered while losing height $h$ is $\text{distance} \approx h \cdot (L/D)$.

## Real world

### Competition sailplanes
The best modern sailplanes reach glide ratios above 60, meaning a single kilometre of altitude can, in perfectly still air, buy more than 60 km of straight-line distance.

### Space Shuttle re-entry
The Shuttle orbiter glided to landing with a glide ratio of only about 4.5 — closer to a brick than a sailplane — which is why its final approach was flown far steeper than an airliner's.

### Engine-out emergency checklists
Every airliner's emergency procedures include a known best-glide speed and an estimated glide ratio, so a crew who loses all engines can immediately estimate how far they can reach.

### Hang gliders and paragliders
Recreational glide ratios of 8 to 12 (hang gliders) up to 10 or more (modern paragliders) are exactly what pilots use, before launching, to judge whether a distant landing field is even reachable.
