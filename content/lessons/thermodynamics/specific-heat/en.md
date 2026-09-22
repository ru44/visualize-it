---
title: Specific heat and latent heat
summary: >-
  Heating a substance raises its temperature smoothly — except during a phase
  change, where every joule goes into breaking or forming bonds instead, and the
  temperature holds perfectly flat.
parameters:
  P: heating power P
  m: mass of ice/water m
  x: time t
variables:
  - heat energy delivered
  - specific heat capacity — energy to raise 1 kg by 1°C
  - latent heat — energy to change phase with no temperature change
  - mass being heated
---

## Intuition

Drag the time point x forward and follow the temperature: it climbs steadily as ice warms, then suddenly goes flat at 0°C even though the heater keeps running — that plateau is the ice melting. All the energy during the flat stretch is going into breaking the crystal structure, none of it into temperature.

Keep dragging and temperature resumes climbing through liquid water, then flattens again at 100°C for boiling. Raise the heating power P and every stage compresses sideways — same total energy needed, delivered faster; raise the mass m instead and every stage stretches out, because there is simply more material to heat and melt.

## Formal

While no phase change is occurring, $Q = mc\Delta T$: heat delivered is proportional to mass, specific heat capacity, and temperature rise, so $T$ rises linearly in time for constant power.

During a phase change, $Q = mL$ with temperature held fixed: the plateau length in time is $mL/P$, proportional to mass and latent heat, inversely proportional to power.

## Advanced

The energy absorbed during melting or boiling is really a change in enthalpy at constant pressure, $\Delta H = mL$, and at the molecular level it goes entirely into breaking intermolecular bonds (hydrogen bonds, for water) rather than increasing average kinetic energy — which is exactly why temperature, a measure of average kinetic energy, does not move during the plateau.

## Derivation

1. Time to warm ice from −20°C to 0°C at constant power P.
2. Time added by the melting plateau: energy goes into latent heat, not temperature.
3. Time added heating liquid water up to boiling; the curve is built by chaining these three stages plus the plateaus.

## Real world

### Cooking
Water stays at a rolling 100°C boil no matter how high the stove is turned — extra heat just boils it faster, it never gets hotter at sea level.

### Ice packs
Ice at 0°C absorbs a large amount of heat while melting without warming up, making it far more effective at cooling than the same mass of cold water.

### Climate moderation
Oceans have a high specific heat capacity, so coastal climates change temperature more slowly than inland regions for the same energy input.

### Steam burns
Steam at 100°C carries far more energy than boiling water at the same temperature, because of the latent heat released when it condenses on skin.
