---
title: Pressure in fluids
summary: >-
  This is why your ears hurt when you dive to the bottom of a pool, and why
  dams are built much thicker at the base than at the top.
parameters:
  rho: fluid density ρ
  x: depth x
variables:
  - depth below the surface
  - pressure at that depth
  - pressure at the surface (atmospheric, at $x = 0$)
  - fluid density
---

## Try it

1. Watch the curve start at the surface, x = 0.
2. Drag the slider "depth x" deeper. Watch the pressure climb in a straight line.
3. Now raise "fluid density ρ" toward something denser, like seawater. The line's slope gets steeper.

## Real-life examples

1. **Swimming pool, 3 m deep.** In fresh water (1000 kg/m³), the pressure at the bottom of a 3 m pool is already noticeably higher than at the surface.
2. **Scuba diving in the sea at 10 m.** Seawater is slightly denser (1020 kg/m³) than fresh water, and at 10 m depth the pressure has risen by about one atmosphere.
3. **Floating in the Dead Sea at 5 m.** The Dead Sea's water is far saltier and denser (1240 kg/m³), so pressure builds up faster with depth than in ordinary seawater.

## Test yourself

1. Make the total pressure reach 200,000 Pa (about twice atmospheric pressure).
2. Find a depth and density where the pressure increase from the surface alone equals 50,000 Pa.
3. Keeping the fluid as fresh water (ρ=1000 kg/m³), find the depth where the pressure reaches 150,000 Pa.

## Intuition

Picture diving to 3 metres in a swimming pool, fresh water with density 1000 kg/m³. Drag the slider "depth x" deeper and watch the curve climb in a dead straight line: no curving, no flattening, because each extra metre of water above you adds exactly the same weight on top of everything below it. At depth zero the curve starts at ordinary atmospheric pressure, not zero, because the air above the surface is already pressing down.

Now raise "fluid density ρ" from fresh water toward something denser, like seawater at 1020 kg/m³ or the salty Dead Sea at 1240 kg/m³, and watch the line's slope get steeper: the same depth now carries far more weight per square metre, so the pressure at any given depth jumps up.

## Formal

Hydrostatic pressure grows linearly with depth: $P = P_0 + \rho g x$, where $P_0$ is the pressure at the surface and $x$ is measured straight down from it.

The slope of that line is $\rho g$ — pressure per metre of depth — so doubling the fluid's density doubles how fast pressure builds with depth.

## Advanced

This formula assumes an incompressible fluid of uniform density, which is an excellent approximation for water or mercury over ordinary depths but breaks down for a gas like air, whose density itself falls with altitude — the true atmospheric pressure profile is exponential, not linear, because $\rho$ in the formula is no longer constant.

## Derivation

1. A thin horizontal slab of fluid, thickness $dx$, adds its own weight per unit area, $\rho g\,dx$, to the pressure pushing down on everything beneath it.
2. Adding up all those slabs from the surface down to depth $x$ gives the total extra pressure, $\rho g x$, on top of the surface pressure.
3. Adding that to the surface pressure gives the pressure at any depth, $P = P_0 + \rho g x$.

## Real world

### Ears hurting when diving
Water is roughly 800 times denser than air, so descending just a few metres in a pool already adds a noticeable fraction of an atmosphere, enough to feel in your eardrums.

### Dams built thicker at the base
Engineers make a dam far thicker near the bottom because the water pressure there, and the force it exerts on the wall, is much greater than near the surface.

### The 10-metre rule for divers
Water pressure rises by about one atmosphere for roughly every 10 metres of depth, a rule of thumb divers use to plan how their tanks and buoyancy will behave.

### Submarine hulls
Submarine hulls are built to withstand steadily rising hydrostatic pressure as they dive, with a strict depth limit set by how much pressure the hull can take before failing.
