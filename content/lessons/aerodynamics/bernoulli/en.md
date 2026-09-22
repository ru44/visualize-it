---
title: Bernoulli and continuity
summary: >-
  This is why a straw works and a carburettor mixes fuel with air: squeezing
  a flow through a narrow gap speeds it up and drops its pressure.
parameters:
  v1: inlet speed v₁
  ratio: throat / inlet area
variables:
  - static pressure
  - flow speed
  - pipe cross-sectional area
  - fluid density (assumed constant — incompressible)
---

## Try it

1. Picture air entering a pipe at 5 m/s, about a gentle breath through a straw.
2. Shrink «throat / inlet area» with the drag handle. The air must speed up to squeeze through, just like cars bunching up and accelerating through a lane closure.
3. Watch the three manometer tubes. The liquid sits lower at the narrow throat — that's where the pressure has dropped.

## Real-life examples

1. **A gentle breath through a straw.** Air entering at 5 m/s and squeezed to 30% of its starting width speeds up to about 17 m/s at the narrow point.
2. **Wind squeezed between two buildings.** A 10 m/s street breeze funnelled into a gap half as wide speeds up to 20 m/s, which is why alleys between towers feel so windy.
3. **Air rushing through a carburettor throat.** Intake air moving at 25 m/s and squeezed to a quarter of its width can reach 100 m/s right at the narrowest point.

## Test yourself

1. Squeeze the pipe until the air at the throat reaches about 20 m/s.
2. Create a pressure drop of about 500 Pa at the throat.
3. Find a gentle squeeze — throat speed under 15 m/s — that still drops the pressure by more than 100 Pa.

## Intuition

Picture a gentle breath of air entering a pipe at 5 m/s, about the speed of a light breeze. Shrink «throat / inlet area» with the drag handle and watch the particles: the same number must pass every slice of the pipe each second, so where it narrows they have to speed up to keep up. That is continuity, the same reason cars bunch up and accelerate through a lane closure.

Now watch the three manometer tubes. The liquid sits lower at the narrow throat than at the inlet or outlet, because the fast-moving air there is at lower pressure. Nothing is lost: the fluid pays for the speed it gains with the pressure it gives up, in equal measure, all along the pipe.

## Formal

Continuity for an incompressible fluid in a stream tube: $A_1 v_1 = A_2 v_2$, i.e. mass flow rate $\rho A v$ is constant.

Bernoulli’s equation along a streamline (steady, inviscid, incompressible, no elevation change): $p_1 + \tfrac12\rho v_1^2 = p_2 + \tfrac12\rho v_2^2$.

## Advanced

Bernoulli’s equation is the steady-flow, along-a-streamline statement of energy conservation for an inviscid fluid — it follows from integrating the Euler momentum equation $\rho(\mathbf v\cdot\nabla)\mathbf v = -\nabla p$ along a streamline. Real venturis lose a little total pressure to viscosity, which is why the outlet manometer here is drawn exactly level with the inlet only in this ideal, lossless model.

## Derivation

1. Mass in equals mass out for steady incompressible flow through a tube of varying area.
2. Euler's equation along a streamline with no other forces: a speeding fluid parcel is pushed forward by falling pressure.
3. Integrate from station 1 to station 2: the sum is conserved along the streamline.

## Real world

### Carburettors and atomisers
Air accelerated through a venturi throat drops in pressure enough to draw fuel or perfume up a side tube.

### Flow meters
Measuring the pressure drop through a known constriction (a venturi or orifice meter) gives the flow rate directly.

### Aneurysms
Blood speeding up through a narrowed artery drops in local pressure — the same physics, with real physiological consequences.

### Wind around buildings
Air squeezed between tall buildings speeds up and its pressure drops, which is why gaps between towers feel so much windier.
