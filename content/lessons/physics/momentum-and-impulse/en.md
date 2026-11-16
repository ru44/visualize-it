---
title: 'Impulse: the area under a force-time pulse'
summary: 'Calculate a change in momentum from the area under a net-force graph, and compare short and long force pulses.'
parameters:
  Fmax: 'Fmax — peak net force'
  w: 'w — pulse-width parameter'
  a: 'a — start time'
  b: 'b — end time'
variables:
  - 'net force as a function of time'
  - 'width parameter; force falls to peak/e at this offset'
  - 'impulse over the selected interval, equal to momentum change'
---

## Try it

1. Set Fmax = 6 N, w = 0.08 s, a = 0 s and b = 1 s. The shaded impulse is about 0.851 N·s.
2. Keep the bounds fixed, halve Fmax to 3 N and double w to 0.16 s. The impulse remains close to 0.851 N·s, while the pulse is lower and broader.
3. Reduce the interval to a = 0.4 s and b = 0.6 s. Only the middle of the broader pulse is counted, so the impulse decreases. Keep a < b for a forward time interval.

## Real-life examples

1. **Narrow pulse.** Fmax = 9 N and w = 0.03 s over 0.3–0.7 s give about 0.479 N·s. Almost the whole pulse lies inside this interval.
2. **Broad pulse.** Fmax = 2 N and w = 0.3 s over 0.1–0.9 s give about 1.000 N·s. The peak is lower than in the first example, but the impulse is larger.
3. **Very brief pulse.** Fmax = 10 N and w = 0.02 s over 0.4–0.6 s give about 0.354 N·s. These are illustrative force histories; peak force alone does not determine the impulse or the effect on a particular object.

## Test yourself

1. Choose a < b and adjust the controls for an impulse near 1.5 N·s over the selected interval.
2. Keep peak force near 5 N and choose w greater than 0.3 s. This broadens the pulse; it does not preserve impulse automatically.
3. Make w less than 0.05 s and peak force less than 3 N.

## Intuition

A 2 N net force acting for 3 s gives the same impulse as a 6 N net force acting for 1 s: both force-time rectangles have area 6 N·s. For a changing force, we add the small contributions over time instead. The resulting area is called impulse, and it equals the change in momentum.

The pulse here has a smooth peak at 0.5 s. Increasing its width while holding its height fixed increases impulse. To keep impulse about the same, a wider pulse needs a lower peak, and the chosen interval must include the relevant parts. The 3D animation illustrates a push; use the 2D integral for numerical comparisons rather than inferring impulse from the animated distance travelled.

## Formal

For a constant-mass object, the impulse of the net force is $J=\int_a^b F(t)\,dt=\Delta p=m[v(b)-v(a)]$. Impulse has units N·s, equivalent to kg·m/s. If F is only one of several forces, its impulse is only one contribution to the total momentum change.

For $b>a$, average net force satisfies the exact relation $J=\bar F(b-a)$. The modeled pulse is $F(t)=F_{\max}\exp[-((t-0.5)/w)^2]$, where w controls width and is not a sharp start-to-end duration. At a time w from the peak, the force is $F_{\max}/e$.

## Advanced

The pulse integrated over all time has area Fmax·w·√π. A finite interval captures only part of that area, so Fmax·w alone is not the impulse. For a fixed momentum change, increasing duration reduces the average net force; it does not by itself determine the peak, which also depends on the force profile. In several dimensions, momentum and impulse are vectors.

## Derivation

1. For constant mass, the net force equals m times the rate of change of velocity.
2. Integrate over the chosen time interval. The velocity derivative converts the integral into the difference of endpoint velocities.
3. Multiplying that velocity difference by the constant mass gives the change in momentum.

## Real world

### Comparing contact forces

Two contacts can produce the same momentum change with different force histories. Compare the area over the whole contact, not just the largest force.

### Force measurements

A force sensor recording a pulse can be used to estimate impulse numerically. The recording window and sampling rate must capture the pulse adequately.
