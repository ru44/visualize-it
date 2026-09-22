---
title: Thin lenses and image formation
summary: >-
  A magnifying glass held close to a page makes the letters look bigger and
  upright, but held farther away it flips the whole view upside-down — where
  the lens puts that image depends on just two numbers: its focal length and
  how far away the object sits.
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

## Try it

1. Drag the red arrow (the object) far from the lens. Watch the three rays cross on the far side, drawing a small, upside-down image.
2. Drag the object closer, past the mark labelled F. The rays now spread apart instead of crossing — a big, upright, dashed image appears instead.
3. Raise the slider "focal length f". Watch where the crossing point (or the dashed image) moves.

## Real-life examples

1. **A camera photographing a distant tree.** With the tree far away (object distance d₀ = 25, focal length f = 6, height h₀ = 2) the lens forms a small, upside-down real image on the sensor — exactly what the shutter captures.
2. **A magnifying glass over small text.** Held close to the page (d₀ = 3, f = 6, h₀ = 1) the object sits inside the focal length, so the lens produces a large, upright, virtual image the eye can focus on.
3. **A projector lens showing a slide.** Placed just outside its focal length (d₀ = 12, f = 10, h₀ = 1.5), the lens throws a large, real, upside-down image onto the distant screen — which is why the slide is mounted upside-down inside the projector.

## Test yourself

1. Position the object so the image forms exactly 10 units behind the lens (image distance = 10).
2. Move the object inside the focal length so the lens makes a virtual image, like a magnifying glass.
3. Get a magnification of exactly −2: an image twice as tall as the object, and upside-down.

## Intuition

Hold a magnifying glass a few centimetres above a page of text and the letters look bigger while staying right-side up — move the same glass a metre away instead, and it flips the whole scene upside-down. Both behaviours come from the same lens; only the object's distance changes, called $d_0$. On screen, the red arrow standing on the axis is the object: drag it closer to or farther from the lens. With it well outside the mark labelled $F$ (the focal point, 6 units from the lens by default), the three construction rays cross on the far side and trace a real, upside-down image; drag it far enough away and that image shrinks toward $F$.

Now drag the object inside $F$, closer to the lens than the focal length. The rays leaving the lens now spread apart instead of crossing, so they never form a real image — only their backward extensions meet, on the same side as the object, drawn here as a dashed, upright, enlarged arrow. That dashed arrow is a virtual image, exactly what the magnifying glass produced when held close to the page.

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
