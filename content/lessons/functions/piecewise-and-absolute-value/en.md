---
title: Piecewise functions and absolute value
summary: >-
  One rule for part of the input, another rule for the rest — the shape
  behind taxi fares, tax brackets, and the absolute value |x|.
parameters:
  x: distance x
  a: a — where the rate changes
  p: p — rate before a
  q: q — rate after a
  c: c — starting fee
variables:
  - the input — for a taxi, the distance travelled
  - the distance where the rate changes
  - the rate charged before a
  - the rate charged from a onward
  - the starting fee
---

## Try it

1. Drag «x» across the point where the line changes direction, at «a». The slope itself changes there — two different rules, stitched together.
2. Set «p» to −1 and «q» to 1, with «a» and «c» at 0. The graph becomes a plain "V" — this is |x| in disguise.
3. Now raise «q» far above «p». The second piece climbs much faster than the first — a steep penalty rate kicking in after a threshold.

## Real-life examples

1. **A taxi fare.** 1.5 per km for the first a=4 km, then 2.5 per km after that, plus a 2-unit starting fee: a 6 km ride costs 1.5×4 + 2 + 2.5×2 = 13.
2. **A tax bracket.** A 10% rate up to a=5 units of income, then 25% above that: on 8 units of income, only the amount past 5 is taxed at the higher rate.
3. **The absolute value, |x|.** Set the before-rate to −1 and the after-rate to 1, with no shift: the two straight pieces meet at the origin and form a perfect "V" — at x=−3 the output is 3, exactly |−3|.

## Test yourself

1. Find p, q, a, c and x so the fare at x=6 comes out to exactly 13.
2. Turn the graph into a plain "V" shape centred at the origin — that is the absolute value function in disguise.
3. Make the rate after a exactly double the rate before it, with both rates positive.

## Intuition

A taxi meter does not charge the same rate the whole trip: the first few kilometres are cheaper, then the rate goes up. That is exactly what this graph draws — two straight pieces, stitched together at the point «a» where the rule switches. Drag the point across «a» and watch the direction the line is heading actually change, even though there is no gap or jump in height: the ride's total cost never suddenly resets, it simply starts climbing at a new rate.

Push «p» down to −1 and «q» up to 1, with «a» and «c» both at 0, and something neat happens: the two pieces become mirror images of each other, meeting at the origin in a sharp "V". That V is the absolute value function, |x| — nothing more than a piecewise rule that flips the sign of negative inputs and leaves positive ones alone.

## Formal

A piecewise function is defined by a different rule on each part of its domain: here $f(x) = px + c$ for $x < a$, and $f(x) = f(a) + q(x-a)$ for $x \ge a$, so the two pieces meet exactly at $x = a$ with no gap.

The absolute value is the special case $p = -1$, $q = 1$, $a = 0$, $c = 0$: $f(x) = -x$ for $x < 0$ and $f(x) = x$ for $x \ge 0$, usually written $|x|$.

## Advanced

A piecewise-defined function need not be continuous: allowing the two pieces to disagree at $a$ produces a jump discontinuity, the shape behind step functions, tax-withholding tables and digital signal quantisation, all of which are piecewise-constant rather than piecewise-linear.

## Derivation

1. Before the threshold, the rule is simply the first line: f(x) = px + c.
2. At exactly x = a, that first line has climbed to f(a) = pa + c — the value the second piece must start from.
3. From a onward, the second rate q takes over: f(x) = f(a) + q(x − a), so the two pieces meet with no gap.

## Real world

### Taxi and delivery fares
A base fee plus one rate for the first stretch and a different rate afterward is a standard piecewise pricing model.

### Income tax brackets
Each bracket taxes only the income within it at its own rate, so the total tax is a sum of piecewise-linear pieces.

### Absolute value in error and distance
Any "how far off" or "how far apart" measurement, such as GPS error or temperature deviation, is naturally |x|, since being too high and too low are equally bad.
