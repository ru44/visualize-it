---
title: Polynomial shape
summary: >-
  One number, the degree, sets a hard limit on how many hills and dips a
  curve can have and which way its ends point — before you plot a single
  point.
parameters:
  x: point x
  n: n — degree
  a: a — leading coefficient
variables:
  - the degree — the highest power in the polynomial, a hard limit on how many turns the curve can have
  - the leading coefficient — its sign decides which way the curve's far ends point
  - the input being dragged along the curve
  - the output, the curve's height at that input
---

## Try it

1. Move the slider «n — degree» from 2 up to 5. Watch the curve grow more turns each step: one at n=2, up to four at n=5.
2. Flip the sign of «a — leading coefficient» from positive to negative. The two ends of the curve swap which way they point.
3. Drag the point along the curve and watch it cross the horizontal axis. Each crossing is a root.

## Real-life examples

1. **A single hill.** A car's fuel efficiency against speed rises to one peak then falls (n=2, a=1): one turning point, the simplest curved shape there is.
2. **A wiggle with two turns.** A day's temperature can climb, dip in some shade at noon, then climb again before falling at dusk (n=3, a=-1, so the far right end dives down): two turning points instead of one.
3. **A bumpy ridge.** A hiking trail's elevation along a ridge climbs, dips, climbs, dips, and climbs again (n=5, a=1): four turning points, the most this curve family can show, and x=1 lands exactly on one of its five crossings of zero.

## Test yourself

1. Set the degree to 4 with a positive leading coefficient, so both ends of the curve point upward.
2. Set the degree to 3 with a negative leading coefficient, so the curve's right end dives downward instead of rising.
3. Set the degree to its highest option and land the point exactly on x = 1, one of the curve's roots.

## Intuition

A hiking trail along a ridge can climb, dip into a saddle, climb again, dip again — every dip or peak along the way is a turn. The slider «n — degree» sets a hard limit on how many turns a curve like this can have: at n=2 there is room for exactly one turn, the familiar single peak or dip of a parabola; push n up to 5 and the curve can wiggle through as many as four turns, climbing and dipping across the picture like that bumpy ridge.

Drag the point along the curve and watch where it crosses the flat horizontal line — each crossing is a root, a place where the curve's height is exactly zero. Flip the sign of «a — leading coefficient» and look at the far left and right edges of the curve instead of the middle: with an even degree both edges swing the same way, while with an odd degree one edge climbs and the other dives, no matter how many wiggles happen in between.

## Formal

A polynomial is any sum of whole-number powers of $x$: $f(x) = a_n x^n + \dots + a_1 x + a_0$. Its degree is the highest power $n$ that appears with a nonzero coefficient, and this single number controls the curve's whole shape.

Far from the middle of the graph, only the leading term $a x^n$ matters. If $n$ is even, both ends of the curve point the same way — up when $a > 0$, down when $a < 0$. If $n$ is odd, the ends point opposite ways, one up and one down.

## Advanced

The number of turning points equals the number of times the slope changes sign, and the slope of a degree-$n$ polynomial is itself a polynomial of degree $n-1$ — a fact from calculus that bounds the turns at exactly $n-1$, though a real curve can turn fewer times if some of those slope-zero points repeat or never materialise. Odd-degree polynomials are guaranteed at least one real root, since their two ends point in opposite directions and a continuous curve going from below zero to above zero must cross zero somewhere; even-degree polynomials carry no such guarantee.

## Derivation

1. A degree-$n$ polynomial can cross zero — have a root — at most $n$ times, since it factors into at most $n$ linear pieces.
2. Between any two consecutive roots the curve must leave zero, go one way, and come back, so it turns around at least once in every gap between roots.
3. With at most $n$ roots there are at most $n-1$ gaps between them, so the curve has at most $n-1$ turning points in total.

## Real world

### Roller coasters
A coaster's hill-and-dip layout is a curve with several turning points, each one a crest or a trough riders feel in their stomach.

### Hiking trails and terrain
Elevation along a ridge trail climbs and dips repeatedly; the more turns the profile has, the bumpier the walk.

### Stock price swings
A short stretch of a price chart can often be matched to a low-degree polynomial with a handful of local peaks and dips.

### Folding a box from a flat sheet
The volume of a box folded up from a flat sheet, as a function of the fold size, is a polynomial whose single peak tells you the most efficient fold.
