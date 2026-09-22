---
title: 'Circle: circumference and area'
summary: >-
  Every point on a circle sits the same distance $r$ from its centre; that
  single number fixes how far around it is and how much area it encloses.
parameters:
  r: r — radius
variables:
  - the radius — drag the handle on the rim to change it
  - 'the circumference, the distance once around the circle'
  - the area enclosed by the circle
---

## Try it

1. Drag the handle on the rim to make the circle bigger and smaller.
2. Look at the straight line under the circle: it is the rim unrolled. About 6.28 radius-lengths fit along it, always.
3. Read «ratio C/d» under the picture. It never changes: that fixed number is π.

## Intuition

Drag the handle on the rim: the radius line stretches, and the circle grows or shrinks around it. Below, that same rim gets cut and laid out flat as a straight segment — watch how its length always lines up with about $6.28$ copies of the radius, tick by tick. That number, $2\pi$, is not a coincidence of this one circle; it is the same for every circle you could draw.

Because $C$ scales with $r$, the ratio $C/r$ never changes as you drag — it is always $2\pi$. That is really the definition of $\pi$: the fixed proportion between how far around a circle is and how big it is across.

## Formal

A circle of radius $r$ centred at a point $O$ is the set of points at distance exactly $r$ from $O$; its circumference is $C = 2\pi r$.

The disk it encloses has area $A = \pi r^2$, and for every circle the ratio $C/d$ of circumference to diameter equals the constant $\pi$.

## Advanced

Area and circumference are linked by calculus: $\frac{d}{dr}\pi r^2 = 2\pi r$. Growing the radius by $dr$ adds a thin ring of length $2\pi r$ — and integrating those rings, $\int_0^r 2\pi s\,ds$, rebuilds the area.

## Derivation

1. Slice the disk into $n$ thin wedges from the centre. Each wedge is nearly a triangle of height $r$ and base $C/n$, a sliver of the circumference.
2. Lay the wedges side by side, alternating direction so they interlock. As $n\to\infty$ the zig-zag edge straightens into a rectangle of height $r$ and width $C/2$ — half the unrolled circumference.
3. Multiply the rectangle's two sides and substitute $C = 2\pi r$: the disk's area falls out as $\pi r^2$.

## Real world

### Wheels and gears
A wheel's circumference tells you how far it travels in one full turn, which is how odometers and gear ratios are calculated.

### Pipes and cable
A pipe's cross-sectional area, $\pi r^2$, determines how much water or cable can pass through it.

### Orbits
To a good approximation a planet or satellite traces a circle, so $C = 2\pi r$ gives the distance it covers each revolution.

### Pizza economics
Area grows with $r^2$ while price often scales closer to $r$, which is why one large pizza usually beats two small ones.
