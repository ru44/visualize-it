---
title: Reynolds number
summary: >-
  One number tells you whether air behaves like thick syrup or like something
  that barely resists at all — and it's why a bee and a jumbo jet fly in
  completely different kinds of air.
parameters:
  L: length scale L
  v: speed v
variables:
  - the Reynolds number — a plain ratio, no units
  - air density
  - flow speed
  - a length that characterises the object (wingspan, body length, ball diameter)
  - dynamic viscosity of the fluid — how "sticky" it is
---

## Try it

1. Start where the sliders begin: a bee's wing, about 1 cm, flapping at roughly 3 m/s.
2. Watch the wake behind the shape: at this size and speed it stays smooth, barely disturbed.
3. Drag «length scale L» and «speed v» up toward a jet's wing, tens of metres at hundreds of metres per second, and watch the same wake erupt into a chaotic, swirling mess.

## Real-life examples

1. **A bee's wing.** About 1 cm across, beating at roughly 3 m/s, gives a Reynolds number near 2,000 — air feels noticeably syrupy at this scale, which is part of why insects flap rather than glide.
2. **A thrown ball.** A 22 cm ball moving at 8 m/s gives a Reynolds number around 119,000 — big enough that the wake is fully turbulent and "normal-feeling" air resistance applies.
3. **A jumbo jet's wing.** An 8 m wing chord at 250 m/s gives a Reynolds number of roughly 135 million — a hundred thousand times higher than the bee's, air might as well have almost no stickiness at all.

## Test yourself

1. Get the Reynolds number to about 2,000 — bee territory.
2. Push the Reynolds number above 10 million — jet territory, where the flow is thoroughly turbulent.
3. Pull the Reynolds number below 1 — creeping flow, where viscosity totally dominates, the world a swimming bacterium lives in.

## Intuition

Two objects moving through air can experience completely different kinds of air, even though it's the same gas. What matters is not size or speed alone but their combination, weighed against how "thick" the air feels at that scale: the Reynolds number $\mathrm{Re}$. Drag «length scale L» and «speed v» together toward the bee's corner of the sliders and the wake barely wobbles — the air's stickiness (viscosity) is winning, smoothing out any disturbance almost as fast as it forms. That's why a bee's wingbeat looks nothing like a fan blade: at that size, air resists motion the way honey resists a spoon.

Now drag both sliders toward the jet's corner. The wake explodes into swirling eddies, because at a large size and high speed, the air's own inertia — its tendency to keep moving once disturbed — completely swamps its stickiness. $\mathrm{Re}$ is literally that ratio: how much inertia matters compared to how much viscosity matters. A jumbo jet's wing and a bee's wing obey the exact same equations of fluid motion; they just live at opposite ends of the same dial.

## Formal

The Reynolds number is defined as $\mathrm{Re} = \dfrac{\rho v L}{\mu}$, the ratio of inertial forces to viscous forces in a flow, where $\rho$ is the fluid's density, $v$ the flow speed, $L$ a characteristic length, and $\mu$ the fluid's dynamic viscosity.

Two flows with the same $\mathrm{Re}$ — even at wildly different absolute sizes and speeds — are dynamically similar: their streamline patterns, scaled by $L$, look identical. This is why a 1:50 scale model in a wind tunnel can predict a full-size aircraft's behaviour, provided the tunnel speed is chosen to match $\mathrm{Re}$.

## Advanced

Formally, $\mathrm{Re}$ falls out of writing the Navier–Stokes equations in dimensionless form: rescale length by $L$ and speed by $v$, and every term collapses to a single coefficient, $1/\mathrm{Re}$, multiplying the viscous term. Low $\mathrm{Re}$ flows (Stokes flow) drop that term's competitor entirely and become linear and reversible; high $\mathrm{Re}$ flows are governed almost entirely by inertia, with viscosity mattering only in a thin boundary layer.

## Derivation

1. A moving fluid carries inertial forces that scale, roughly, as density times speed squared times length squared: $\rho v^2 L^2$.
2. Viscous forces resisting that motion scale as viscosity times speed times length: $\mu v L$.
3. Dividing inertial by viscous forces and cancelling one factor each of $v$ and $L$ leaves exactly $\mathrm{Re} = \rho v L/\mu$ — a number, not a force, because the units cancel completely.

## Real world

### Wind-tunnel scale models
Engineers testing a scale model must either speed up the tunnel's flow or use a denser gas to keep $\mathrm{Re}$ matched to the full-size aircraft, or the model's airflow simply won't behave the same way.

### Why insects don't have "mini airliner" wings
At an insect's Reynolds number, smooth streamlined shapes offer little advantage over flapping, cambered ones — the physics that rewards a sleek jet wing barely applies at that scale.

### Swimming microorganisms
A bacterium swims at a Reynolds number around 0.0001: viscosity so dominates that it cannot coast even a fraction of a millimetre after stopping its flagellum, unlike a swimming fish.

### Pipe flow and plumbing
Engineers designing pipework use the same Reynolds number, with pipe diameter as $L$, to predict whether water will flow smoothly or turbulently — turbulent flow wastes far more pumping energy to friction.
