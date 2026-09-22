---
title: Mach number and compressibility
summary: >-
  Mach number compares your speed to the local speed of sound; that ratio, not
  raw speed, decides when shock waves and compressibility effects take over.
parameters:
  x: air temperature T
  vAircraft: aircraft speed
variables:
  - 'Mach number, v/a — dimensionless'
  - local speed of sound
  - 'ratio of specific heats for air, about 1.4'
  - 'specific gas constant for air, 287 J/(kg·K)'
  - absolute air temperature
charts:
  - title: Mach number vs air temperature at fixed aircraft speed
    xLabel: T (K)
    yLabel: M = v / a
    series:
      - M(T)
---

## Intuition

Drag the temperature point along the curve: the speed of sound rises with the square root of temperature, so the same aircraft speed corresponds to a lower Mach number in warm air and a higher Mach number in cold air. That is why "how fast" only tells half the story — the same 250 m/s is comfortably subsonic on a warm day at sea level but pushes much closer to Mach 1 at the cold temperatures found at cruise altitude.

Now raise the aircraft-speed slider and watch the Mach-number chart respond — the marker climbs toward and past M = 1. Airliners deliberately cruise around M ≈ 0.8, fast enough to cover distance efficiently but comfortably below the point where shock waves start forming over the wing, which would sharply increase drag and disturb the smooth airflow the whole lift picture depends on.

## Formal

For an ideal gas, the speed of sound is $a = \sqrt{\gamma R T}$ — it depends only on temperature, not on pressure or density directly.

Flow regimes are classified by Mach number: subsonic $M<0.8$, transonic $0.8<M<1.2$, supersonic $1.2<M<5$, hypersonic $M>5$.

## Advanced

As local flow accelerates over a curved surface (like a wing) even a subsonic free stream can reach M = 1 locally; beyond that a shock wave forms where the flow abruptly, almost discontinuously, decelerates back to subsonic — producing wave drag and, in transonic flight, buffet. Wing sweep and supercritical airfoil sections are specifically shaped to delay this local shock formation to a higher free-stream Mach number.

## Derivation

1. Ideal gas law relates pressure, density and temperature for air.
2. The speed of sound is the rate small pressure disturbances propagate — an isentropic (adiabatic, reversible) process, giving the factor $\gamma$.
3. Divide actual speed by the local speed of sound to get the dimensionless Mach number.

## Real world

### Airliner cruise speed
Cruising near M ≈ 0.8 in the cold air at 11 km altitude balances fuel efficiency against the sharp drag rise approaching M = 1.

### Concorde and supersonic transport
Sustained supersonic cruise (M > 1) demands very different, thin swept or delta wings to manage shock waves and wave drag.

### Transonic wing design
Sweep and supercritical airfoils delay the local Mach-1 point on the wing to higher speeds, pushing back the onset of wave drag.

### Sonic booms
A shock wave trailing a supersonic aircraft reaches the ground as the sudden pressure jump heard as a boom.
