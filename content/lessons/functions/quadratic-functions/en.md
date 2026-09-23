---
title: Quadratic functions in vertex form
summary: >-
  Read a parabola's peak or dip straight off the formula, no algebra needed —
  the same shape that traces a thrown ball's path through the air.
parameters:
  x: point x
  a: a — curvature
  h: h — vertex x
  k: k — vertex height
variables:
  - how sharply the curve bends, and whether it opens upward (a dip) or downward (a peak)
  - the horizontal position of the turning point
  - the height of the turning point
  - the input being dragged along the curve
---

## Try it

1. Drag the point along the curve. It slides up one side, over the top, and down the other — its height is f(x) at that x.
2. Move the slider «h — vertex x» left and right. The whole curve slides sideways with it, turning point and all.
3. Now flip the sign of «a — curvature» from negative to positive. The curve flips from a peak to a dip, but the turning point stays exactly where h and k put it.

## Real-life examples

1. **A basketball's arc.** Thrown so its height follows f(x) = -0.75(x-2)² + 3 (a=-0.75, h=2, k=3): the ball peaks 3 metres up at x=2 metres out, then falls back to the ground at x=4.
2. **A skateboard half-pipe.** The ramp's height above its flat bottom follows f(x) = 0.3x² (a=0.3, h=0, k=0): the lowest point sits right at the centre, and the walls curve up evenly on both sides.
3. **A fountain jet.** Water shot from a nozzle follows f(x) = -0.4(x+3)² + 4 (a=-0.4, h=-3, k=4): the jet peaks 4 metres up, 3 metres to the left of where you're standing.

## Test yourself

1. Make the curve open upward with its turning point sitting at height 6.
2. Move the turning point to exactly (h=-3, k=4).
3. Make a downward-opening curve that comes back down to height 0 exactly at x=5.

## Intuition

Picture shooting a basketball at the hoop: the ball leaves your hand, climbs, peaks, then drops. On this graph that whole flight is one curve, and dragging the orange point along it is like following the ball frame by frame — its height above the ground is f(x) at whatever x you land on. The single highest point the ball reaches, 3 metres up here, is the curve's turning point, and it sits exactly where the sliders «h» and «k» put it: 2 metres out, 3 metres high. No solving required — h and k hand you the peak directly.

Now drag «h» itself and watch the whole arc slide sideways, peak and all, without changing its shape. Drag «k» and it slides straight up or down instead. Flip the sign of «a» from negative to positive and the peak turns into a dip — the same curve you'd get from a skateboard ramp instead of a thrown ball — while the turning point stays locked to h and k the entire time. The number a only ever controls how sharply the curve bends, never where its turning point sits.

## Formal

Vertex form writes a quadratic as $f(x) = a(x-h)^2 + k$. Its turning point, called the vertex, sits at $(h, k)$, and the curve is symmetric about the vertical line $x = h$.

If $a > 0$ the vertex is the curve's lowest point (a minimum); if $a < 0$ it is the highest point (a maximum). Either way, $|a|$ sets how steeply the curve bends away from the vertex.

## Advanced

Vertex form connects to the more familiar $f(x) = ax^2 + bx + c$ by $h = -\tfrac{b}{2a}$ and $k = c - \tfrac{b^2}{4a}$ — the two are the same family of curves, just parametrised differently. Every parabola is, underneath, a scaled and shifted copy of $y = x^2$: vertex form makes that shift explicit instead of leaving it buried inside $b$ and $c$.

## Derivation

1. Squaring a real number never gives a negative result, so $(x-h)^2$ is zero or positive for every $x$.
2. When $a$ is positive, multiplying by it keeps that fact true: $a(x-h)^2$ is smallest, exactly $0$, only when $x=h$.
3. Adding $k$ shifts every one of those values up by $k$, so the smallest output $f(x)$ can give is exactly $k$, reached at $x=h$. (When $a$ is negative the same argument flips: $k$ becomes the largest output instead.)

## Real world

### Sports and thrown objects
A ball, arrow, or javelin in flight traces a downward-opening parabola, and vertex form hands you its peak height and the moment it happens directly.

### Skate parks and ramps
A half-pipe's cross-section is an upward-opening parabola, its vertex the lowest point riders swoop through.

### Fountains and water jets
Each stream from a fountain nozzle follows its own parabolic arc, peaking at a height and distance set by the water pressure and angle.

### Suspension bridge cables
The main cable of a suspension bridge sags to its lowest point at the centre span, then rises toward each tower in a curve close to a parabola.
