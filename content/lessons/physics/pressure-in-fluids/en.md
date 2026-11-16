---
title: Pressure in fluids
summary: 'Calculate how pressure increases with depth in a stationary fluid, keeping surface pressure separate from the added pressure.'
parameters:
  rho: 'ρ — constant fluid density'
  x: 'x — depth below the surface'
variables:
  - 'vertical depth below the fluid surface'
  - 'total absolute pressure at that depth'
  - 'surface pressure, fixed at 101325 Pa'
  - 'constant fluid density in kg/m³'
---

## Try it

1. Set density to 1000 kg/m³ and depth to 0 m. The graph reads 101.325 kPa, the surface pressure used in this model, rather than zero.
2. Increase depth to 10 m. The fluid adds 98.1 kPa, giving total pressure 199.425 kPa.
3. Keep depth at 10 m and increase density to 1200 kg/m³. The added pressure becomes 117.72 kPa and total pressure 219.045 kPa. Density changes the slope of the line, not its surface intercept.

## Real-life examples

1. **A water-like fluid at 3 m.** At density 1000 kg/m³, the increase is 29.43 kPa and total pressure is 130.755 kPa.
2. **A slightly denser fluid at 10 m.** At 1020 kg/m³, the increase is 100.062 kPa and total pressure is 201.387 kPa.
3. **A denser fluid at 5 m.** At 1240 kg/m³, the increase is 60.822 kPa and total pressure is 162.147 kPa. These chosen densities illustrate the model; fluid composition and temperature affect actual values.

## Test yourself

1. Make total pressure approximately 200000 Pa, shown as 200 kPa on the graph.
2. Make the pressure increase above the surface value approximately 50000 Pa, or 50 kPa.
3. Keep density at 1000 kg/m³ and make total pressure within 3000 Pa of 150000 Pa.

## Intuition

Imagine a small stationary column of fluid. Pressure at its bottom must be greater than at its top to support the fluid's weight. Adding another metre of the same-density fluid adds the same weight per unit area, so pressure increases linearly with depth when density and gravity are constant.

The surface is already under pressure. Here that pressure is fixed at 101325 Pa, and the liquid adds more as depth increases. The total is called absolute pressure; the increase relative to the surface is the pressure difference ρgx. Pressure acts in every direction at a point in a fluid at rest, so the side walls also experience pressure. It is not a force that acts only downward.

## Formal

For a stationary fluid of constant density ρ and constant gravitational acceleration g, $P=P_0+\rho gx$. Here x is vertical depth below the surface and P₀ is surface pressure. This model uses $P_0=101325\ \mathrm{Pa}$ and $g=9.81\ \mathrm{m/s^2}$.

The difference from surface pressure is $\Delta P=\rho gx$, while the slope is $dP/dx=\rho g$. One pascal is one newton per square metre; $1\ \mathrm{kPa}=1000\ \mathrm{Pa}$. The 2D graph and 3D probe display total pressure in kPa, whereas the challenges calculate in Pa.

## Advanced

If density or gravity varies significantly with depth, integrate dP/dx = ρ(x)g(x) instead of using one constant product. An exponential atmospheric profile follows under additional assumptions such as an isothermal ideal gas and constant gravity; it is not the general profile of every atmosphere. The display uses a fixed surface pressure and does not model flowing-fluid effects.

## Derivation

1. Balance forces on a thin horizontal fluid slab. The pressure increase across thickness dx must support its weight per area, ρg dx.
2. Integrate from the surface to depth x with constant density and gravity.
3. Add the resulting increase to the given surface pressure to obtain total pressure.

## Real world

### Connected containers

The same stationary fluid connected beneath the surface has equal pressure at equal depths when the surface conditions agree, even if the containers have different shapes.

### Forces on walls

Pressure increases toward the bottom of a liquid-filled tank. To find the total force on a wall, integrate pressure over its area and account for pressure on the other side.
