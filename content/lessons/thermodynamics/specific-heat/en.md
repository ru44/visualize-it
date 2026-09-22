---
title: Specific heat and latent heat
summary: >-
  Boiling water for pasta always plateaus at 100°C no matter how high you
  turn the stove — extra heat just makes it boil faster, not hotter — and
  that flat stretch is where all the added energy goes into changing the
  water's state instead of its temperature.
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

## Try it

1. Drag the time point x forward. Follow the temperature: it climbs, then holds flat, then climbs again.
2. Raise the slider "heating power P". Every stage compresses — the same total energy now arrives faster.
3. Raise the slider "mass m" instead. Every stage stretches out — there is more material to heat.

## Real-life examples

1. **A kettle boiling water.** At high power (P = 2000 W) heating half a kilogram of water (m = 0.5 kg), the temperature races through each stage in well under a minute.
2. **A campfire slowly melting snow.** At low power (P = 300 W) melting a kilogram of snow (m = 1 kg), the flat melting stage alone can take nearly twenty minutes.
3. **A microwave defrosting ice.** At moderate power (P = 800 W) on 1.5 kg of ice, the long flat plateau at 0°C is why defrosting takes far longer than reheating already-liquid food.

## Test yourself

1. Get all the ice to melt and the water to reach boiling in under 200 seconds total.
2. Make the melting plateau (ice turning to water) last close to 60 seconds.
3. Heat a mass of 1.5 kg so the whole warming-melting-boiling process takes longer than 300 seconds.

## Intuition

Put a pot of ice on a hot stove and watch a thermometer in it: the temperature climbs steadily at first, then suddenly holds dead flat at 0°C even though the burner keeps blasting heat — that flat stretch is the ice melting. On screen, drag the time point, labelled $x$ in seconds, forward along the curve and follow the temperature the same way: it climbs, flattens at 0°C, climbs again through liquid water, then flattens once more at 100°C for boiling.

All the energy delivered during a flat stretch goes into breaking the ice's crystal structure or turning liquid into vapour — none of it raises the temperature, which is why a rolling boil never gets hotter than 100°C no matter how high you turn the stove. Raise the slider "heating power P" and every stage compresses sideways, because the same total energy now arrives faster; raise the slider "mass m" instead and every stage stretches out, because there is simply more ice and water to heat and melt.

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
