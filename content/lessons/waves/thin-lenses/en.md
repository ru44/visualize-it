---
title: Thin lenses and image formation
summary: >-
  Where a lens puts the image of an object depends on only two numbers — the
  lens's focal length and how far away the object sits.
parameters:
  f: focal length f
  doo: object distance d₀
  ho: object height h₀
variables:
  - focal length f
  - object distance and image distance
  - object height and image height
  - magnification m
---

## Intuition

Drag the object (the red arrow) closer to or farther from the lens along the axis. With it well outside the focal point, the three construction rays cross on the far side and trace out a real, upside-down image — drag it far enough and that image shrinks toward the focal point on the far side.

Now drag the object inside the focal length, closer to the lens than the marked $F$. The rays that left the lens now spread apart instead of crossing, so they never form a real image; only their backward extensions meet, on the same side as the object, drawn here as a dashed, upright, enlarged arrow — a virtual image, exactly what a magnifying glass produces.

## Formal

The thin-lens equation relates the three distances: $\dfrac{1}{f} = \dfrac{1}{d_0} + \dfrac{1}{d_i}$, with $d_i$ coming out negative when the image is virtual.

Magnification compares heights: $m = h_i/h_0 = -d_i/d_0$, so a negative $m$ means an upside-down real image and a positive $m$ means an upright virtual one.

## Advanced

The same lens equation, with a sign convention, covers diverging as well as converging lenses ($f < 0$) and describes compound systems by treating each lens's image as the next lens's object. Real optical designs stack several such thin-lens elements to cancel aberrations that a single lens cannot avoid.

## Derivation

1. Similar triangles on either side of the lens relate the two heights to the two distances, with a minus sign for the image being upside-down.
2. Combining that ratio with the geometry of the two construction rays through the lens's focal points gives the thin-lens equation.
3. Rearranging the height ratio in terms of the distances gives the magnification formula directly.

## Real world

### Cameras
A camera lens focuses light from the scene onto the sensor exactly as this equation describes, and autofocus is just motorized adjustment of $d_i$.

### The human eye
The eye's lens changes its own focal length (accommodation) to keep images sharp on the retina as $d_0$ changes.

### Magnifying glasses
Holding a magnifying glass closer to an object than its focal length produces the enlarged, upright virtual image seen when the object sits inside $F$.

### Projectors
A projector places its source image just outside the focal length so the lens casts a large, real, inverted image onto a distant screen.
