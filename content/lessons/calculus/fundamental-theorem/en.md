---
title: The fundamental theorem of calculus
summary: >-
  Differentiation and integration are inverse operations: the area accumulated
  so far, differentiated, gives back the very curve you were finding area under.
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

## Intuition

Drag $b$ to the right with $a$ fixed at $0$ and watch two things at once: the shaded area above grows or shrinks, and the chart's marker on $F(b)$ moves to match — the chart is literally tracking the running total of the shaded area as $b$ advances.

Now look at where $v(x) = 2\sin(x) + 0.5$ is positive versus negative: exactly where it is positive, $F(b)$ in the chart is climbing; exactly where $v(x)$ dips negative, $F(b)$ turns around and falls. The curve above is the slope of the chart below — differentiating the accumulated area gives back the very curve you integrated.

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
