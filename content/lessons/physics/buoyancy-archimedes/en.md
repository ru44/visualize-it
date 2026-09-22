---
title: Buoyancy and Archimedes' principle
summary: >-
  This is why a steel ship floats but a steel coin sinks, and why you float
  more easily in salty seawater than in a swimming pool.
parameters:
  rhoObj: object density ρ_obj
  rhoFluid: fluid density ρ_fluid
  V: object volume V
variables:
  - buoyant force
  - submerged volume and total object volume
  - object density and fluid density
---

## Try it

1. Watch the block sitting in the tank of fluid.
2. Drag "object density ρ_obj" up. Watch the block sink lower until it drops to the floor.
3. Now raise "fluid density ρ_fluid" instead. The same block floats higher.

## Real-life examples

1. **An ice cube in a glass of water.** Ice (920 kg/m³) is only slightly less dense than water (1000 kg/m³), so it floats with most of its 20 L volume submerged.
2. **A cork bobbing in water.** Cork (240 kg/m³) is far less dense than water, so a 5 L cork rides mostly above the surface.
3. **A rock dropped in a pond.** At 2500 kg/m³, denser than the 1000 kg/m³ water, a 10 L rock sinks straight to the bottom.

## Test yourself

1. Make the object float with exactly half its volume submerged.
2. Make the object dense enough to sink completely to the bottom.
3. Find a fluid density and volume that give a buoyant force of 150 N when the object is fully submerged.

## Intuition

Picture a 20-litre block of ice, density 920 kg/m³, floating in a tank of water, density 1000 kg/m³. Drag the block up or down and watch the density readout change: pull it toward the bottom and "object density" rises, and once it passes the fluid's density the block sinks all the way to the floor instead of settling partway down.

Watch the two arrows on the block: the downward one is its weight, fixed by its own density and volume, and the upward one is the buoyant force, which grows only as more of the block is pushed under the surface. It always settles exactly where those two arrows balance. Now raise "fluid density ρ_fluid" toward something as thick as syrup: the same floating block rides noticeably higher, because less of it needs to go underwater to push aside an equal weight of the heavier fluid.

## Formal

Archimedes' principle: the buoyant force on a submerged or floating object equals the weight of the fluid it displaces, $F_b = \rho_{fluid} V_{sub}\,g$.

For a floating object at equilibrium, buoyancy exactly balances weight, which pins down the submerged fraction: $V_{sub}/V = \rho_{obj}/\rho_{fluid}$, independent of the object's shape.

## Advanced

Because only the *average* density of the object matters, a steel ship floats even though steel itself is roughly eight times denser than water — the hull encloses enough air that the ship's average density, hull plus cargo plus air, stays below the water's. Submarines exploit the same principle in reverse, flooding or emptying ballast tanks to fine-tune their average density above, below, or exactly at the water's.

## Derivation

1. Archimedes' principle states the buoyant force directly: the weight of the fluid displaced by the submerged volume.
2. The object's own weight depends on its own density and its full volume, not just the submerged part.
3. Setting those two forces equal at equilibrium and solving gives the submerged fraction as the simple ratio of the two densities.

## Real world

### Ships and boat hulls
A steel hull shaped to enclose a large volume of air has a low enough average density to float, even though solid steel would sink instantly.

### The Dead Sea
Its water is so salty that $\rho_{fluid}$ is far above ordinary seawater, so swimmers float with much more of their body above the surface than usual.

### Hot-air balloons
Heating the air inside the balloon lowers its density below that of the surrounding cooler air, so the balloon and its basket are buoyed upward.

### Icebergs
Ice is only slightly less dense than seawater, so roughly ten percent of an iceberg's volume sits above the surface and the rest hides below.
