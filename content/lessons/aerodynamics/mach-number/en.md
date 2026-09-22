---
title: Mach number and compressibility
summary: >-
  This predicts when an aircraft is close to breaking the sound barrier —
  because what matters is speed compared to sound, not raw speed alone.
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

## Try it

1. Picture an airliner cruising at 250 m/s through the cold air 11 km up, where it's about −53°C (220 K).
2. Drag the point along the curve, toward colder «air temperature T». The Mach number climbs, even at the same speed.
3. Now raise «aircraft speed» toward 340 m/s. The marker climbs toward, and can pass, Mach 1 — the speed of sound.

## Real-life examples

1. **An airliner cruising at altitude.** Flying at 250 m/s through 220 K air, 11 km up, it sits at about Mach 0.84, the sweet spot airliners are built for.
2. **A small propeller plane on a warm day.** Flying at 90 m/s through 305 K air near sea level, it's a comfortable Mach 0.26 — nowhere near the sound barrier.
3. **A fighter jet at high altitude.** Flying at 340 m/s through the same cold 220 K air, it's already past Mach 1: it has broken the sound barrier.

## Test yourself

1. Find a temperature and speed that give a Mach number of about 0.8, typical airliner cruise.
2. Using the coldest air on the slider, push the Mach number above 1.
3. Flying at least 100 m/s, choose warm enough air to keep the Mach number below 0.3.

## Intuition

Picture an airliner cruising at 250 m/s through the cold air 11 km up, about −53°C. Drag the point along the curve, toward colder «air temperature T»: the speed of sound drops with the square root of temperature, so the same aircraft speed gives a higher Mach number in cold air than in warm air. That is why "how fast" only tells half the story — the same 250 m/s is comfortably subsonic at sea level on a warm day but pushes much closer to the sound barrier at the cold temperatures found at cruise altitude.

Now raise «aircraft speed» toward 340 m/s and watch the Mach-number chart respond: the marker climbs toward, and can pass, Mach 1. Airliners deliberately cruise around Mach 0.8, fast enough to cover distance efficiently but comfortably below the point where shock waves start forming over the wing — shock waves that would sharply increase drag and disturb the smooth airflow the whole idea of lift depends on.

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
