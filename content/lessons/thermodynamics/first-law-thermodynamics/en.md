---
title: 'The first law: energy, heat, and work'
summary: 'Account for heat, work and internal energy, using a constant-temperature ideal-gas process as a worked example.'
parameters:
  n: 'n — amount of ideal gas'
  T: 'T — temperature held fixed along the path'
  a: 'a — initial volume V₁'
  b: 'b — final volume V₂'
variables:
  - 'internal energy of the gas'
  - 'heat transferred into the gas, with sign'
  - 'work done by the gas, with sign'
  - 'pressure, volume and absolute temperature'
---

## Try it

1. Set n = 1 mol, T = 300 K, a = 1 L and b = 5 L. The signed area gives about 4014 J of work done by the gas.
2. Keep n, a and b fixed and raise T to 400 K. Work rises in the same ratio, to about 5352 J. Each selected curve is a separate constant-temperature process.
3. Set a = 5 L and b = 1 L. The signed work becomes negative: the surroundings do work on the gas during compression. At a = b, work is zero.

## Real-life examples

1. **Warmer isothermal expansion.** At n = 1 mol and T = 500 K, expansion from 1 to 5 L gives W ≈ 6690 J. Maintaining temperature requires the same amount of heat input.
2. **A smaller amount of gas.** At n = 0.5 mol and T = 300 K, expansion from 2 to 8 L gives W ≈ 1729 J. Temperature stays fixed in this example.
3. **A threefold expansion.** At n = 2 mol and T = 250 K, expansion from 3 to 9 L gives W ≈ 4567 J. These are ideal isothermal paths, not complete models of an engine stroke or rising air parcel.

## Test yourself

1. Obtain positive work near 2000 J.
2. Set b = 2a and make work greater than 1500 J.
3. Compress the gas so work done by it is −1500 J or less.

## Intuition

Choose the gas as the system. Heat entering adds energy; work done by the gas transfers energy out. Internal energy changes by the difference. If the gas does 100 J of work while receiving 100 J of heat, its internal energy stays unchanged. If heat transfer is zero, doing positive work instead reduces internal energy.

The displayed example deliberately holds an ideal gas at constant temperature. Its internal energy therefore stays fixed, and heat must replace the energy transferred out as work during expansion. On the graph, horizontal position is volume in litres and vertical position is pressure in kilopascals. The signed integral records the direction from a to b. The 3D piston repeats a schematic sweep; its labels describe the selected a-to-b process, not a self-running engine cycle.

## Formal

For a closed system with negligible changes in overall kinetic and potential energy, $\Delta U=Q-W$. Q is positive into the system, and W is positive when the system does work on its surroundings. Boundary work is $W=\int_{V_1}^{V_2}P_{ext}\,dV$; for a mechanically reversible, quasistatic path, use the gas pressure P in that integral.

Here $P=nRT/V$ at fixed n and T, so $W=nRT\ln(V_2/V_1)$. An ideal gas has $\Delta U=0$ on this isothermal path, giving $Q=W$. With pressure in kPa and volume in litres, area is in joules because $1\ \mathrm{kPa\cdot L}=1\ \mathrm J$. Use the signed-area readout when the bounds are reversed.

## Advanced

Heat and work depend on the path, while internal-energy change depends on the end states. A fast insulated compression is different from this isothermal process and can raise temperature. The pressure curve can extend above the plotting window at high n or T; clipping the drawing does not change the integral. An isothermal expansion can convert absorbed heat to work, but it is not a complete cycle returning the gas to its initial state.

## Derivation

1. Rearrange the ideal-gas equation to express pressure in terms of volume, with amount and temperature fixed.
2. Integrate pressure over the selected volume interval; the constant factors stay outside the integral.
3. Evaluate the logarithmic volume ratio. Constant ideal-gas temperature means no internal-energy change, so heat equals work with the stated sign convention.

## Real world

### Compression and expansion

The first law keeps track of energy in many gas processes. To calculate a particular path, also specify heat transfer and how pressure changes with volume.

### Engine cycles

The signed area enclosed by a quasistatic pressure–volume cycle gives net boundary work. One expansion curve alone does not describe the complete cycle.
