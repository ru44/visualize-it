---
title: Buoyancy and Archimedes' principle
summary: >-
  An object floats or sinks purely by comparing its own density to the
  fluid's — no other property of its shape or material matters.
parameters:
  rhoObj: object density ρ_obj
  rhoFluid: fluid density ρ_fluid
  V: object volume V
variables:
  - buoyant force
  - submerged volume and total object volume
  - object density and fluid density
---

## Intuition

Drag the block up or down and watch its density readout change — dragging it toward the bottom of the tank raises $\rho_{obj}$, and once it exceeds the fluid's density the block sinks all the way to the floor instead of settling at some depth. Watch the two force arrows: the downward one is weight, fixed by the object's own density and volume, and the upward one is the buoyant force, which grows only as more of the object gets submerged.

Notice the block always settles exactly where those two arrows balance. Push $\rho_{fluid}$ up instead — say, from fresh water toward something as dense as syrup — and the same floating block rides noticeably higher, because less of it now needs to be submerged to displace an equal weight of the denser fluid.

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
