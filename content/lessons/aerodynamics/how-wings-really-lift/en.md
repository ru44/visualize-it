---
title: How wings really lift
summary: >-
  The air above a wing really does move faster and push less — and the wing
  really does throw air downward — because those are the same event seen two
  ways, not two competing explanations, and the old "equal transit time"
  story is simply wrong.
parameters:
  alpha: angle of attack α
  v: airspeed v
variables:
  - lift force, the net upward push on the wing
  - pressure difference between the lower (high) and upper (low) surface
  - wing area
---

## Try it

1. Picture a small aircraft climbing away after takeoff, tilted 5° into the air at 50 m/s.
2. Raise «angle of attack α» slowly. Watch the blue (low pressure) shading over the top thicken and the orange dot finish its lap of the top surface well before the orange dot on the bottom.
3. Read the two crossing times at the bottom of the picture. They are never equal — that is the point.

## Real-life examples

1. **A light aircraft climbing after takeoff.** Tilted 5° at 50 m/s, the top-surface air already crosses the wing clearly faster than the bottom-surface air, and the pressure gap is strong enough to lift the plane.
2. **The same aircraft on a slow final approach.** Tilted up to 12° at only 30 m/s, the pressure gap has to work much harder per unit of speed, so the angle does most of the lifting now.
3. **A wing pushed well past its stall.** Tilted to 18° at 40 m/s, the smooth suction over the top has broken down into swirls, and the pressure gap collapses even though the wing is tilted the most.

## Test yourself

1. Reach about 15,000 N of lift while staying at or below the 15° stall angle.
2. Push the angle of attack past 15° and keep the lift coefficient above 1.0 anyway.
3. Without exceeding 15°, get the pressure difference between the two surfaces to at least 600 Pa.

## Intuition

Forget the story you may have heard: that the air splitting at the leading edge must meet its partner again at the trailing edge, so the top path — being longer over a curved wing — forces the air above to speed up. That story is false, and you can see it fail here: drag «angle of attack α» up and watch the two timer dots. The top dot finishes its lap of the wing well ahead of the bottom dot, every time, even though the top path is barely longer than the bottom one. Equal transit time is not what makes the top air fast.

What actually makes the top air fast is that the wing bends the whole flow field around it, and the bending is strongest just above the curved, tilted surface — that is what a real fluid does when it has to flow past a shape without leaving a gap behind it. Faster air over the top means lower pressure there (drag «airspeed v» and watch the blue shading strengthen at higher speed); slower, squeezed air underneath means higher pressure. That pressure difference, multiplied by the wing's area, is the lift force — and it is exactly the same number you would get by asking how hard the wing throws air downward and invoking Newton's third law. One event, two honest ways to add it up.

## Formal

Lift is the net force from a pressure difference between the lower and upper surfaces, integrated over the wing area: $L = \Delta p\, S$, where $\Delta p = p_{\text{lower}} - p_{\text{upper}}$ is set by how much the local flow speed differs above and below, via Bernoulli's relation $p + \tfrac12\rho v^2 = \text{const}$ along a streamline.

Equivalently, the wing deflects the oncoming air downward: each second it changes the vertical momentum of a mass flow $\dot m$ by an amount $\Delta v_y$ (the downwash), and by Newton's third law the reaction pushes the wing up with force $L = \dot m\, \Delta v_y$. Bernoulli's pressure account and Newton's momentum account describe one physical process and always agree.

## Advanced

The genuinely correct reason the top-surface flow is faster is circulation: a real (viscous) fluid leaving a sharp trailing edge must do so smoothly, not by wrapping around it — the Kutta condition. That condition fixes a unique circulation $\Gamma$ around the wing, and it is this circulation, added to the oncoming flow, that speeds up the top and slows the bottom. Equal transit time was never part of the argument.

## Derivation

1. Along any streamline, Bernoulli's relation says pressure trades off against speed squared: where the flow moves faster, pressure is lower.
2. Separately, Newton's second and third laws say that pushing a mass flow $\dot m$ of air downward by $\Delta v_y$ every second requires — and produces — an equal upward reaction force on the wing.
3. Multiplying the pressure difference by the wing's area, or multiplying the mass flow by the downward velocity change, gives the same number: they are two ways of measuring the one lift force.

## Real world

### Wind tunnels and pressure taps
Engineers testing a new wing shape often measure surface pressure directly with rows of tiny taps, reconstructing $\Delta p$ across the whole surface rather than guessing it from streamline shapes.

### Smoke and dye visualisations
The elegant curved streamlines you see in smoke-tunnel photos show the deflected flow (Newton's picture) directly; the pressure difference (Bernoulli's picture) has to be measured separately, because it is invisible to smoke.

### Why race-car wings work upside down
An inverted wing pushes air upward instead of down, so by the same reasoning it presses the car downward onto the track — same physics, opposite sign.

### Textbooks that still repeat the myth
The equal-transit-time explanation persists in some popular science because it sounds tidy; professional aerodynamics texts have not used it as the explanation for decades.
