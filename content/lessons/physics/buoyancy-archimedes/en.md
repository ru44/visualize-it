---
title: Buoyancy and Archimedes' principle
summary: 'Compare an object’s weight with the weight of fluid it displaces to predict floating, sinking or neutral buoyancy.'
parameters:
  rhoObj: 'average object density'
  rhoFluid: 'fluid density'
  V: 'total object volume'
variables:
  - 'upward force equal to the displaced fluid’s weight'
  - 'immersed volume and total object volume'
  - 'average object density and surrounding fluid density'
---

## Try it

1. Set object density to 600 kg/m³, fluid density to 1000 kg/m³ and volume to 10 L. The object floats with 60% submerged; weight and buoyancy are both about 58.9 N.
2. Keep the fluid and volume fixed and raise object density to 1200 kg/m³. Fully submerged buoyancy is only 98.1 N, less than the weight 117.7 N, so the object sinks to the illustrated floor.
3. Restore object density to 600 kg/m³ and raise fluid density to 1200 kg/m³. Half the volume is now submerged. Dragging vertically changes object density; it does not apply a separate pushing force.

## Real-life examples

1. **An ice-like block.** A 20 L block of average density 920 kg/m³ in fluid of density 1000 kg/m³ floats with 92%, or 18.4 L, submerged. Its weight and buoyancy are about 180.5 N.
2. **A cork-like block.** At object density 240 kg/m³, fluid density 1000 kg/m³ and volume 5 L, 24%, or 1.2 L, is submerged. Both forces are about 11.8 N.
3. **A dense block.** At 2500 kg/m³ with volume 10 L in fluid of density 1000 kg/m³, weight is about 245.3 N and fully submerged buoyancy 98.1 N. It cannot float freely at the surface under this model.

## Test yourself

1. Make the object float with half its volume submerged.
2. Make object density greater than fluid density so the object sinks.
3. Choose fluid density and total object volume giving a fully submerged buoyancy near 150 N. This checks the maximum displaced volume, even if the current object floats only partly submerged.

## Intuition

Fluid pressure is greater at greater depth. For an immersed object, the resulting pressure forces have an upward net effect: buoyancy. Its magnitude equals the weight of the fluid displaced by the immersed part. The object's own weight depends on its total mass, not just the part below the surface.

A freely floating object settles at a submerged volume for which buoyancy equals its weight. A denser object may need more displacement than its entire volume can provide, so it sinks. At the illustrated floor, a support force must balance the remaining weight; the displayed weight and buoyancy arrows are not the full force diagram there. The model assumes fluid access beneath the object when calculating submerged buoyancy.

## Formal

In a uniform fluid at rest, buoyancy is $F_b=\rho_fV_{\mathrm{sub}}g$. For an object of average density ρₒ and total volume V, its weight is $W=\rho_oVg$. Use cubic metres in these formulas; $1\ \mathrm{L}=0.001\ \mathrm{m^3}$.

For free floating equilibrium with no other vertical forces, $V_{\mathrm{sub}}/V=\rho_o/\rho_f$. If $\rho_o<\rho_f$, the object can float partly submerged. If $\rho_o=\rho_f$, it is neutrally buoyant when fully immersed and need not sit at one particular depth. If $\rho_o>\rho_f$, buoyancy alone cannot support it.

## Advanced

The density ratio determines the submerged volume fraction, not necessarily the submerged height fraction for an irregular shape. It also does not determine rotational stability. A sealed hollow object can float because its average density includes the enclosed space; admitting fluid can change that average. The 3D tank's volume and water-level changes are visually scaled, so the numerical force and fraction readouts are the quantitative reference.

## Derivation

1. Use Archimedes' principle: the upward buoyancy equals the weight of displaced fluid.
2. Calculate the object's weight from its average density and total volume.
3. For a freely floating object, set buoyancy equal to weight and solve for the submerged volume fraction. This balance is possible only when that fraction is at most one.

## Real world

### Hollow floating objects

An object made from a dense material can float if its watertight outer volume is large enough relative to its total mass. Material density alone is not the object's average density.

### Comparing fluids

At the same object mass, a denser fluid requires less displaced volume to support the object. This changes how much of a floating object lies below the surface.
