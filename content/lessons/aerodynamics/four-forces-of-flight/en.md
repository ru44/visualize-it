---
title: The four forces of flight
summary: >-
  Every aircraft in the sky is a tug-of-war between lift, weight, thrust and
  drag — and whether it climbs, cruises or descends comes down to which pair
  is winning.
parameters:
  throttle: throttle
  v: airspeed v
variables:
  - thrust, the engines' forward push
  - drag, the air's backward resistance
  - weight, gravity's pull on the aircraft
  - climb (flight-path) angle, positive nose-up
---

## Try it

1. Picture an 8,000 kg regional jet climbing out at 100 m/s, throttle at 80%.
2. Read the climb angle γ and the rate-of-climb readout: it should be climbing steeply.
3. Pull «throttle» down toward 30%. Watch the nose-down flight path angle grow and the aircraft start to sink instead of climb — the same four arrows, a different winner.

## Real-life examples

1. **Climbing out after takeoff.** Throttle at 80% and 100 m/s: thrust of 48,000 N beats drag of about 36,750 N, and the 11,250 N of spare thrust buys a climb of roughly 8° — about 2,800 feet per minute.
2. **Level cruise.** Throttle trimmed to 61% at 100 m/s makes thrust and drag balance almost exactly, so the flight path angle sits near 0°: the aircraft holds its altitude.
3. **Descending with the throttle back.** At only 30% throttle and the same 100 m/s, drag heavily outweighs thrust, and the aircraft sinks at a steep flight-path angle — a pilot doing this for real would also slow down to make the descent gentler.

## Test yourself

1. Get the aircraft climbing at about 10 m/s (roughly 2,000 feet per minute).
2. Trim the throttle so the flight path angle is within half a degree of level.
3. Pull the throttle back until the aircraft is descending steeper than 10° nose-down.

## Intuition

Picture the regional jet from a side view, four arrows pinned to it: thrust pushing forward along the flight path, drag pushing back along it, weight pulling straight down, and lift pushing up perpendicular to the flight path. Drag «throttle» up past where drag is balanced and thrust wins the tug-of-war along the flight path — the aircraft can no longer fly straight and level, so it tilts its whole flight path upward until gravity's pull along that new, tilted path grows enough to re-balance the fight. That tilt is the climb angle γ, and $T - D = W\sin\gamma$ says exactly how much spare thrust buys how much climb.

Now drag «throttle» down instead. Once thrust can no longer match drag, the same balancing act runs the other way: the flight path tilts downward, and gravity's component along that new path adds itself to thrust, making up the shortfall against drag. That's a descent — an aircraft with the engines at idle isn't defying physics, it is trading altitude for the forward push it no longer gets from the engines. Perpendicular to whichever flight path the aircraft has settled onto, lift is still doing its separate job: supporting the weight component in that direction, $L = W\cos\gamma$, which is why a climbing or descending aircraft needs only slightly less lift than a level one.

## Formal

For a steady (non-accelerating) flight path tilted by angle $\gamma$ from the horizontal, resolving forces along and across the path gives two balances: $T - D = W\sin\gamma$ along the path, and $L = W\cos\gamma$ across it. Level flight is the special case $\gamma = 0$, where $T = D$ and $L = W$.

Drag itself depends on speed and shape: $D = \tfrac12\rho v^2 C_D A$, so the "drag wins" side of the tug-of-war grows quickly with airspeed, which is part of why every aircraft has both a never-exceed speed and a minimum flying speed.

## Advanced

Rearranging the along-path balance gives $\gamma \approx (T-D)/W$ for small angles, and multiplying by speed gives the rate of climb, $v\sin\gamma \approx v(T-D)/W$ — this is the "specific excess thrust" view of climb performance, and swapping thrust for engine power turns it into the more general "specific excess power" used to compare very different aircraft.

## Derivation

1. Drag from the air resisting the aircraft's motion is $D = \tfrac12\rho v^2 C_D A$, growing with the square of airspeed.
2. Along the flight path, Newton's second law for zero acceleration requires the forward push to exactly balance drag plus the pull of gravity resolved along that path: $T - D = W\sin\gamma$.
3. Perpendicular to the flight path, lift alone balances the remaining component of weight: $L = W\cos\gamma$ — together, these two balances are the whole "four forces" picture.

## Real world

### Takeoff performance charts
Pilots calculate a required climb gradient after engine failure straight from this balance: how much spare thrust is left once one engine is gone decides whether the aircraft can clear obstacles.

### Glider tow planes
A tow plane hauling a glider aloft needs enough spare thrust to lift both aircraft's combined weight component along a climbing flight path — heavier gliders mean shallower tow climbs.

### Fuel-efficient cruise
Airlines fly close to the speed where $D$ is smallest for the aircraft's weight, since that is where the smallest thrust — and the least fuel — is needed to hold $T = D$ in level flight.

### Engine-out descent planning
When an engine fails, the remaining thrust often cannot match drag at all, forcing $\gamma < 0$: pilots plan a controlled descent, choosing the speed that gives the shallowest possible sink rate.
