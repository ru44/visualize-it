---
title: Thermal expansion
summary: >-
  Railway lines used to buckle in summer heat and old bridges have
  finger-like metal gaps you can feel through your car tyres — both
  exist because almost every solid grows slightly longer when it warms
  up, and a thermostat's coiled metal strip turns that tiny growth into
  a useful on/off switch.
parameters:
  alpha: linear expansion coefficient α (×10⁻⁶/°C)
  L0: original length L₀
  dT: temperature change ΔT
variables:
  - change in length
  - linear expansion coefficient
  - original length before heating
  - change in temperature
---

## Try it

1. Raise the slider "temperature change ΔT" from negative to positive. Watch the rail's expansion gap close and the numeric ΔL grow.
2. Raise the slider "expansion coefficient α" toward aluminium's value. Watch the same ΔT now push the rail further apart.
3. Raise the slider "original length L₀". Watch a longer starting rail move by far more millimetres for the exact same ΔT.

## Real-life examples

1. **A steel railway line at midday.** An 18 m length of rail (α = 12×10⁻⁶/°C) heating by 35°C in the sun grows by about 7.6 mm — small per rail, but enough to buckle a continuously welded track without expansion joints.
2. **An aluminium bridge girder in summer.** A 40 m aluminium girder (α = 23×10⁻⁶/°C) warming by 45°C stretches over 4 cm, which is exactly why long bridges rest on rollers or expansion joints at one end.
3. **A concrete road slab in a winter cold snap.** A 25 m slab (α = 12×10⁻⁶/°C) cooling by 30°C shrinks by about 9 mm, opening the sealed gaps between slabs that summer heat had closed.

## Test yourself

1. Get the length change to about 2 cm (0.02 m).
2. Make the material contract: get a negative length change.
3. Set up a big expansion: α above 20×10⁻⁶/°C, L₀ above 30 m, and ΔT above 40°C, all at once.

## Intuition

Heat a solid and its atoms do not get bigger — they simply vibrate more, and on average sit slightly farther apart from their neighbours, so the whole object grows a little in every dimension. On screen, drag "temperature change ΔT" upward and watch the rail's expansion gap close as the numeric length change ΔL climbs; drag it below zero and the rail shrinks back, opening the gap again.

Different materials expand by different amounts for the same temperature change, captured by the coefficient α: raise the slider "expansion coefficient α" toward aluminium's value with ΔT and L₀ fixed, and the same warming now produces a noticeably bigger ΔL, because aluminium's atoms are held more loosely than steel's. A bimetallic strip, two different metals bonded together, exploits exactly this mismatch: brass expands faster than steel, so a heated strip of the two bonds curls toward the steel side, and that curl is precisely what flips the switch inside an old-fashioned thermostat.

## Formal

For modest temperature changes, a solid's change in length is $\Delta L = \alpha L_0 \Delta T$, where $\alpha$ is the material's linear expansion coefficient, $L_0$ its original length, and $\Delta T$ the temperature change.

Because $\alpha$ is usually only a few parts per million per degree, $\Delta L$ stays small for everyday temperature swings — but it is never zero, and engineers must design for it whenever a structure is long, rigid, and exposed to weather.

## Advanced

Area and volume expand faster than length: a flat sheet's area grows at roughly $2\alpha$ and a solid's volume at roughly $3\alpha$ per degree, because each of the two or three dimensions expands independently by the same linear fraction, and those small fractional changes simply add.

## Derivation

1. Each dimension of a solid grows almost linearly with temperature over modest ranges, which is exactly what α is defined to capture.
2. The fractional change in length equals α times the temperature change: ΔL/L₀ = αΔT.
3. Multiplying through by the original length gives the length change directly: ΔL = αL₀ΔT.

## Real world

### Railway tracks
Modern continuously welded rail is laid with built-in stress or small expansion joints specifically to absorb the growth a full-length steel rail undergoes in summer heat.

### Bridges
Long bridges rest on rollers, bearings or expansion joints at one end so the whole structure can grow and shrink with the seasons without cracking.

### Thermostats
A coiled bimetallic strip bends as it warms because its two bonded metals expand at different rates, and that bending physically opens or closes an electrical contact.

### Power lines
Overhead cables are hung with deliberate sag because they contract and pull tighter on cold nights, and a taut summer cable would snap in a hard winter freeze.
