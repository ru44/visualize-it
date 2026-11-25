---
title: Three ways heat moves
summary: 'Compare conduction through material, convection involving moving fluid, and radiation emitted by a surface.'
parameters:
  dT: 'ΔT — temperature difference for conduction and convection'
  k: 'k — conductivity of the conducting path'
  Tsurf: 'T — absolute temperature of the emitting surface'
variables:
  - 'energy transferred by each mechanism; dividing by time gives power'
  - 'thermal conductivity'
  - 'area used by the relevant panel'
  - 'temperature difference across the path or between surface and fluid'
  - 'length of the conduction path'
  - 'convective transfer coefficient'
  - 'emissivity, between zero and one'
  - 'Stefan–Boltzmann constant'
  - 'absolute surface temperature in kelvin'
---

## Try it

1. Set ΔT = 40°C, k = 15 and T = 350 K. Read about 0.10 W of conduction, 240 W of convection and 38 W of emitted radiation. The panels use different areas and assumptions, so they are separate examples.
2. Double ΔT to 80°C. Conduction and convection double. The radiation reading stays unchanged because its surface-temperature control has not changed.
3. Restore ΔT = 40°C and double T from 350 to 700 K. Emitted radiation rises by a factor of 16, to about 613 W. Changing k affects only the conduction panel.

## Real-life examples

1. **A conducting handle model.** At ΔT = 70°C and k = 15 W/(m·K), a 0.15 m path with cross-section 25 mm² transfers 0.175 W in the steady one-dimensional model.
2. **A poorly conducting path.** At ΔT = 40°C and k = 0.2 W/(m·K), conduction is about 0.00133 W. The separate convection example still gives 240 W, and radiation at 350 K remains about 38 W.
3. **Higher conductivity and surface temperature.** At ΔT = 60°C, k = 400 and T = 800 K, the three readings are 4 W, 360 W and about 1045 W. They are not an energy balance for one object.

## Test yourself

1. Make the conduction rate approximately 1 W.
2. Make emitted radiative power approximately 500 W.
3. Set ΔT above 60°C and k above 200 W/(m·K).

## Intuition

A spoon's handle can warm even though the liquid touches only its other end. Energy passes through the material without the whole spoon moving: this is conduction. In convection, fluid motion transports energy. For example, buoyancy can make warmer, less dense air rise through cooler surroundings. Fans and pumps can also drive convection; it does not require natural rising motion.

Radiation carries energy through electromagnetic waves and can cross a vacuum. A surface emits radiation and also absorbs radiation from its surroundings. The displayed radiation value is emission alone, not net heat loss. The pictures illustrate three mechanisms with separate fixed geometries. Their colours and arrows are cues, not a simulation of a spoon's temperature over time or a calculated room airflow.

## Formal

Steady one-dimensional conduction through a uniform path is $\dot Q_{cond}=kA\Delta T/d$. This panel uses $A=2.5\times10^{-5}\ \mathrm{m^2}$ and $d=0.15\ \mathrm{m}$. Convection is modelled as $\dot Q_{conv}=hA\Delta T$, with $h=5\ \mathrm{W/(m^2\cdot K)}$ and $A=1.2\ \mathrm{m^2}$. A temperature difference has the same numerical value in kelvin and degrees Celsius.

Emitted radiation is $P_{emit}=\varepsilon\sigma AT^4$, with $\varepsilon=0.9$, $A=0.05\ \mathrm{m^2}$ and $\sigma=5.67\times10^{-8}\ \mathrm{W/(m^2\cdot K^4)}$. T must be in kelvin. For a grey surface exchanging radiation with large surroundings at temperature Tₛ under the usual full-view approximation, net loss is $P_{net}=\varepsilon\sigma A(T^4-T_s^4)$.

## Advanced

The constant h summarizes fluid flow and thermal boundary-layer behavior; it can change with conditions. Conductivity and emissivity can also depend on temperature. Thus the simple proportional comparisons here hold with those coefficients fixed. Radiation does not automatically dominate every hot object's energy transfer: area, surroundings, contact and flow matter too.

## Derivation

1. For steady conduction, multiply conductivity by area and temperature gradient; for a uniform path the gradient magnitude is temperature difference divided by length.
2. For the convection estimate, multiply the surface-to-fluid temperature difference by area and the transfer coefficient.
3. For emitted thermal radiation, multiply emissivity, the Stefan–Boltzmann constant, surface area and the fourth power of absolute temperature.

## Real world

### Insulated containers

Reducing gas in a gap reduces conduction and convection through that gap. Radiation and conduction through supports can still transfer energy.

### Heating a room

A heater can transfer energy by convection and radiation at the same time. Their shares depend on the heater and room; its name alone does not determine them.
