---
title: The fundamental theorem of calculus
summary: >-
  A car's odometer and speedometer are two sides of the same coin — read one
  and you can work out the other, and this is the rule connecting them.
parameters:
  a: a (start)
  b: b (end)
variables:
  - the curve being shaded — think of it as a velocity
  - accumulated area (distance) from $a=0$ up to $b$ — the chart below
  - the bounds of the shaded region
charts:
  - title: Accumulated distance F(b) = ∫ from 0 to b
    xLabel: b
    yLabel: F(b)
    series:
      - F(b) = -2cos(x) + 0.5x + 2
---

## Try it

1. Drag «b (end)» to the right with «a (start)» fixed at 0. The shaded area above grows, and the chart's marker on F(b) climbs to match.
2. Watch where the curve above dips below the axis. The chart's marker turns around and falls there too.
3. Drag «a (start)» away from 0. The shaded region — and the accumulated total — shrinks by whatever area is cut off on the left.

## Real-life examples

1. **Early odometer reading.** With a = 0 and b = 3, only a short stretch of driving has accumulated — the running total is still small.
2. **Mid-trip odometer reading.** With a = 0 and b = 6, the trip has passed its fastest climbing stretch and the total is levelling off.
3. **A trip segment recorded only from the 2-second mark.** With a = 2 and b = 8, the accumulated total counts only the distance covered after the odometer was reset at a = 2.

## Test yourself

1. Make the accumulated area F(b) − F(a) equal about 5.
2. Find a window (with b at least 1 apart from a) where the accumulated area returns to 0.
3. Push the accumulated area above 6.

## Intuition

Picture a car's trip odometer, reset to 0 at the start of a drive. The wavy curve on screen is the car's speed at every moment, and the shaded region beneath it is the distance covered so far. Drag «b (end)» to the right with «a (start)» fixed at 0, and watch two things at once: the shaded area grows or shrinks, and the marker on the chart below — the odometer reading — climbs or falls to match.

Now look at where the speed curve dips below the middle line: right there, the car is momentarily going backward, so the odometer marker turns around and falls too. The speed curve above is exactly the slope of the odometer chart below — read off how the total distance is changing, and you get back the very speed curve you started with.

## Formal

If $F(b) = \int_a^b f(x)\,dx$, then $F'(b) = f(b)$ — the Fundamental Theorem of Calculus, Part 1.

Part 2: if $F$ is any antiderivative of $f$, then $\int_a^b f(x)\,dx = F(b) - F(a)$, turning area computation into evaluating an antiderivative at two points.

## Advanced

The proof of Part 1 hinges on the Mean Value Theorem for integrals: $F(b+h)-F(b) = \int_b^{b+h} f \approx f(b)\,h$ for small $h$ because $f$ is continuous, so the difference quotient $[F(b+h)-F(b)]/h \to f(b)$ — accumulation and instantaneous rate are two sides of the same limiting process, one taken over an interval, one at a point.

## Derivation

1. Define the accumulated area up to $b$.
2. The extra sliver of area is approximately a thin rectangle of height $f(b)$ and width $h$, for small $h$.
3. Divide by $h$ and take the limit: the derivative of the accumulated area is the curve itself.

## Real world

### Velocity and distance
A car's odometer reading is the accumulated area under its velocity-time graph; its speedometer is the derivative of the odometer reading.

### Water tank filling
Total water in a tank is the accumulated inflow rate; the inflow rate is the derivative of the total.

### Economics
Total cost is the accumulated marginal cost; marginal cost is the derivative of total cost.

### Physics work-energy
Work done is the area under a force-displacement curve; force is the derivative (rate of change) of accumulated work with displacement.
