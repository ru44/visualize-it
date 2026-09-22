---
title: 'Linear equations: where two lines meet'
summary: >-
  Solving $mx + b = k$ is exactly the same problem as finding where the line $y
  = mx + b - k$ crosses zero.
parameters:
  m: slope m
  b: intercept b
  k: target value k
  x: x (drag until the curve hits zero)
variables:
  - slope of the line
  - y-intercept
  - target value on the right-hand side
  - the unknown — where the plotted line crosses zero
---

## Intuition

Drag the point along the line and watch the readout for $f(x)$: solving $mx + b = k$ is nothing more than sliding $x$ until that readout hits zero, because the line you are dragging along is $y = mx + b - k$, the original equation with everything moved to one side.

Change $b$ or $k$ and the whole line shifts up or down, so the crossing point slides sideways. Change $m$ and the line tilts — steeper slopes mean the same vertical shift moves the crossing a much shorter horizontal distance.

## Formal

For $m \ne 0$, $mx + b = k$ has the unique solution $x = (k - b)/m$.

The graph of $y = mx + b - k$ is a straight line with slope $m$ and $y$-intercept $b - k$; its unique zero is the solution.

## Advanced

When $m = 0$ the "line" is horizontal: if $b = k$ every $x$ satisfies the equation (infinitely many solutions), and if $b \ne k$ no $x$ does. This is the case that distinguishes a genuinely first-degree equation from a degenerate one, and it recurs throughout linear algebra as the difference between a consistent and an inconsistent system.

## Derivation

1. Start from the equation as given.
2. Move everything to one side — this is exactly the plotted curve.
3. Divide by $m$ (valid whenever $m \ne 0$).

## Real world

### Break-even points
Cost and revenue are both linear in units sold; the break-even point is where the two lines meet.

### Unit conversion
Fahrenheit and Celsius are related by a linear equation, $F = \tfrac95 C + 32$.

### Pricing plans
Two phone plans with different base fees and per-minute rates cross at the usage level where they cost the same.

### Motion at constant speed
Position versus time is linear; finding when two vehicles meet is solving a linear equation.
