---
title: 'Linear equations: where the line crosses zero'
summary: >-
  Find the one missing number that makes both sides of an equation balance —
  the skill behind budgets, taxi fares, and knowing when two costs become equal.
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

## Try it

1. Look at the blue line and the orange point sitting on it. Drag the point left and right along "x".
2. Watch the number beside it, $f(x)$, shrink as you drag. When it reaches exactly zero, the point sits on the horizontal axis — that is the solution.
3. Now move the "intercept b" or "target k" slider instead. Notice how the whole line, and its crossing point, slides up or down with it.

## Real-life examples

1. **Buying notebooks on a budget.** Notebooks cost 1.50 dollars each (slope m = 1.5) and the store adds a 2-dollar delivery fee (intercept b = 2). With an 8-dollar budget (target k = 8), you can buy exactly 4 notebooks.
2. **Taking a taxi.** The taxi charges 0.50 dollars per kilometre (m = 0.5) plus a 3-dollar flat pickup fee (b = 3). With 6 dollars in your pocket (k = 6), you can ride 6 kilometres.
3. **Saving up from debt.** You save 2 dollars every week (m = 2) but start 3 dollars in debt (b = −3). Reaching 5 dollars in savings (k = 5) takes 4 weeks.

## Test yourself

1. Find slider values for m, b and k so that x = −5 is the exact solution — the point should sit right on the axis there.
2. Make every value of x solve the equation at once, so the whole line lies flat on the horizontal axis. (Think about what the slope must be.)
3. Make the equation impossible to solve, so that no value of x ever balances it. (Think about a flat line that never touches zero.)

## Intuition

Say you want to spend exactly 20 dollars on notebooks. Each one costs 3 dollars, and the store charges a fixed 2-dollar delivery fee no matter how many you order. How many notebooks can you buy? Move the orange point along the blue line and watch the number beside it, $f(x)$, shrink toward zero — that number is how far the two sides of the equation are from balancing. Where the point crosses the horizontal axis, the two sides balance exactly: the answer is 6 notebooks.

The slider labelled slope m is the price of one notebook: how much the line rises as $x$ grows by one. The slider labelled intercept b is the fixed delivery fee, and target k is the total amount you have to spend. Raise b or k and the whole blue line shifts up or down, sliding the crossing point sideways with it. Raise m instead and the line tilts: a steeper line reaches zero after a much shorter drag, because each extra notebook now costs more.

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
