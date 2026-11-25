---
title: Thermal expansion
summary: 'Calculate a small change in length from temperature change, original length and a material’s expansion coefficient.'
parameters:
  alpha: 'α — coefficient in millionths per °C'
  L0: 'L₀ — initial length'
  dT: 'ΔT — final minus initial temperature'
variables:
  - 'signed change in length'
  - 'linear expansion coefficient'
  - 'initial length at the reference temperature'
  - 'signed temperature change'
---

## Try it

1. Set α = 12, L₀ = 18 m and ΔT = 35°C. The α control is in millionths per degree, so the calculated extension is 7.56 mm.
2. Keep α and L₀ fixed and change ΔT to 0, then −30°C. Length change becomes zero, then −6.48 mm: cooling gives contraction for this positive coefficient.
3. Return to ΔT = 35°C and double L₀ to 36 m. Extension doubles to 15.12 mm. The gap graphic exaggerates the small length change; use the readout for the physical value.

## Real-life examples

1. **A freely expanding steel-like bar.** With α = 12 × 10⁻⁶/°C, L₀ = 18 m and ΔT = 35°C, the bar lengthens by 7.56 mm if unconstrained.
2. **An aluminium-like member.** With α = 23 × 10⁻⁶/°C, L₀ = 40 m and ΔT = 45°C, the calculated increase is 41.4 mm, or 4.14 cm.
3. **A cooling member.** With α = 12 × 10⁻⁶/°C, L₀ = 25 m and ΔT = −30°C, the change is −9 mm. Negative change means shortening, not negative total length.

## Test yourself

1. Obtain a positive length change near 0.02 m, or 20 mm.
2. Obtain a negative length change.
3. Set α above 20 on its millionths-per-degree scale, L₀ above 30 m and ΔT above 40°C.

## Intuition

A long object can have a noticeable total expansion even when each metre grows only a little. For the first example, each metre gains 12 millionths of a metre per degree. Multiplying by 35 degrees and 18 metres gives 0.00756 m. Doubling length doubles the number of small extensions being added.

The coefficient describes how much a particular material expands over a temperature range. Many solids expand on heating because their average atomic separations increase; the atoms themselves do not simply get larger. Materials differ, and some contract on heating over certain ranges. The separate bimetal illustration uses fixed steel-like and brass-like coefficients and responds only to ΔT, not to the α and L₀ controls.

## Formal

For approximately constant linear expansion coefficient and free expansion, $\Delta L=\alpha L_0\Delta T$. Here $\Delta T=T_{final}-T_{initial}$ and the final length is $L=L_0+\Delta L$. The control value must be multiplied by $10^{-6}$ to obtain α in inverse degrees Celsius.

The fractional change is $\Delta L/L_0=\alpha\Delta T$. This is a small-change approximation when $|\alpha\Delta T|\ll1$. For positive α, warming lengthens and cooling shortens the object. If expansion is constrained, stresses arise and the actual length change need not equal the free-expansion prediction.

## Advanced

For an isotropic material with small expansion, area and volume changes are approximately $\Delta A/A_0=2\alpha\Delta T$ and $\Delta V/V_0=3\alpha\Delta T$. These factors do not apply unchanged to anisotropic materials. A bonded bimetal bends because its layers prefer different free expansions; its actual curvature also depends on thickness and elastic properties. The displayed rotation is schematic, not a calculated thermostat deflection.

## Derivation

1. Define the linear expansion coefficient as fractional length change per unit temperature change in the small-change approximation.
2. Multiply that coefficient by the temperature change to get the fractional length change.
3. Multiply by the original length to obtain the change in length.

## Real world

### Structural movement

Bridge bearings and joints can accommodate temperature-related movement. A complete design also considers restraint, loads and material properties.

### Bimetal devices

Two bonded layers with different expansion coefficients can bend as temperature changes. That motion can operate a mechanical temperature switch.
