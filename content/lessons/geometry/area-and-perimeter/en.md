---
title: Area and perimeter
summary: >-
  The same length of fence encloses far more land as a square than as a thin
  rectangle, and even more as a circle — perimeter fixes a budget, and shape
  decides what you get for it.
parameters:
  P: fence length P
  f: rectangle shape f
variables:
  - the area enclosed
  - the total perimeter (the fence length), shared by all three shapes
  - the rectangle's width
  - the rectangle's height
---

## Try it

1. Drag the little handle on the rectangle's right edge. Its width and height trade off, but its perimeter never changes — only its area does.
2. Pull the rectangle thin and long. Its area readout drops well below the square's, even though both used exactly the same fence.
3. Bring the rectangle back to a square (width equals height). Now compare the square's area to the circle's: the circle, with the same fence, always wins.

## Real-life examples

1. **A long, thin plot.** 24 m of fence stretched into a 1.8 m by 10.2 m strip encloses about 18 m² — barely half of what a square would give.
2. **The same 24 m, squared off.** A 6 m by 6 m square encloses 36 m², the most any rectangle can manage with that fence.
3. **32 m, mostly one direction.** An 11.2 m by 4.8 m rectangle uses more fence overall but still falls short of the square drawn with the same length.

## Test yourself

1. Bring the rectangle back to a square.
2. Make the rectangle's area less than half the square's area.
3. Make the circle's radius bigger than 4 m.

## Intuition

Imagine you're given a fixed length of fence and asked to enclose as much land as possible. Drag the rectangle's edge and you'll see the shape trade width for height while the fence length (the perimeter) stays exactly the same — but the area readout keeps changing, rising as the two sides get closer to equal and falling as one stretches out thin. A very long, narrow strip wastes most of its fence on two long sides that face each other uselessly close together.

The best rectangle for a given amount of fence is always the square, because that's the one point where width and height are perfectly balanced. But the square still isn't the best shape overall — swap the corners for a smooth curve and the same length of fence, bent into a circle, encloses even more. Corners are where a shape "wastes" fence pinching inward; a circle has none.

## Formal

For a rectangle of perimeter $P$ and width $w$, the area is $A = w\left(\dfrac{P}{2} - w\right)$, which is maximised at $w = \dfrac{P}{4}$ — the square — giving $A = \left(\dfrac{P}{4}\right)^2$.

Among every closed shape with perimeter $P$, none encloses more area than the circle: $A \le \dfrac{P^2}{4\pi}$, with equality only when the shape is a circle.

## Advanced

This is the isoperimetric inequality, and it holds in any dimension: among all solids with a given surface area, the sphere encloses the most volume, which is why soap bubbles are round — surface tension pulls the film toward the shape that costs the least surface for the volume of air it traps.

## Derivation

1. For a rectangle of perimeter P and width w, the height is P/2 minus w, so its area is w times that height.
2. That area is a downward-curving parabola in w, and it peaks exactly halfway, at w = P/4 — a square.
3. Comparing every possible shape rather than just rectangles, the same fence length P always encloses at most P² ⁄ (4π) of area, and only a circle actually reaches that limit.

## Real world

### Farming
Farmers fencing a paddock with a fixed roll of wire get the most grazing land by fencing a square rather than a long strip, without spending a metre more of wire.

### Packaging
A circular pipe uses less material than a square duct of the same cross-sectional area, which is one reason plumbing and ductwork favour round shapes over sharp-cornered ones.

### Urban planning
Round or square plazas pack more usable space per metre of surrounding wall or railing than long thin ones, which is why many public squares are, in fact, roughly square.

### Biology
Cell membranes and soap films both minimise surface for the volume they enclose, which is the three-dimensional cousin of a circle beating every rectangle in the plane.
