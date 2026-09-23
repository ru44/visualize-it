---
title: The Mandelbrot set
summary: >-
  Repeat one simple rule on a point and colour it by how fast it flies away —
  the picture that comes out is the same jagged shape at every zoom level,
  however far in you go.
parameters:
  zoom: zoom level
  cx: centre (real part)
  cy: centre (imaginary part)
variables:
  - the number you keep squaring and shifting, starting at 0
  - the point you're testing — the pixel's own coordinate
  - how many rounds it took before z flew past distance 2 from the centre (or the cap, if it never did)
charts: []
---

## Try it

1. Watch the picture. Every pixel is a point c, coloured by how fast repeating "square then add c" sends it flying off.
2. Drag "zoom" up. The view halves in width each notch, and the same swirls and spirals reappear at every scale.
3. Drag "cx" and "cy" while zoomed in — the boundary of the black shape is where the interesting detail hides.

## Real-life examples

1. **The whole set.** Zoomed all the way out, you see the full black cardioid-and-circles shape that gives the fractal its name.
2. **Seahorse valley.** Zoom in near real −0.75, imaginary 0.1, and the boundary curls into rows of tiny spirals that look like seahorses, each slightly different from its neighbour.
3. **A mini Mandelbrot.** Near real −1.25, imaginary 0, a miniature copy of the whole set buds off the main shape — self-similarity in action.

## Test yourself

1. Zoom in to about level 6, roughly ×64 magnification.
2. Steer the view to seahorse valley, near real −0.75 and imaginary 0.1.
3. Find the miniature copy of the whole set near real −1.25, imaginary 0, zoomed in at least ×8.

## Intuition

Pick any point c on the picture — say c = −0.5. Start a number z at 0, then repeatedly replace z with z² + c. For most points near the visible black shape, z stays small forever, circling around without escaping, so that pixel is coloured black: it's "in the set." For points further out, z eventually shoots past distance 2 from the centre and races off to infinity, and the pixel is coloured by how many rounds that took — which is why the colour bands outside the black shape look like contour lines.

Drag "zoom" and the view halves in width each notch, but the picture never gets simpler: every level shows the same kind of spirals, seahorses and buds you saw at the start. That's self-similarity — the boundary of the Mandelbrot set repeats its own shape at every scale, forever, even though the rule behind it, square then add c, is one line long.

## Formal

For a complex number $c$, define the sequence $z_0 = 0$, $z_{k+1} = z_k^2 + c$. The point $c$ belongs to the Mandelbrot set if this sequence stays bounded — $|z_k|$ never grows without limit — as $k \to \infty$.

In practice a point is classed as escaped once $|z_k| > 2$, since once that happens $|z_k|$ is guaranteed to grow every following step; the colour of an escaped pixel is set by $k$, the round on which that first happened, capped at a maximum so slow points still get a colour.

## Advanced

The boundary of the Mandelbrot set is a fractal of Hausdorff dimension 2, infinitely detailed at every scale, even though the set itself has finite area (about 1.506 square units). That the set is connected — one piece, not scattered dust — is proven; whether every one of its infinitely many bulbs is itself locally connected is the famous open MLC conjecture.

## Derivation

1. Start the sequence at zero: $z_0 = 0$.
2. Each round squares the previous value and adds the fixed point being tested: $z_{k+1} = z_k^2 + c$.
3. Once the size of $z_k$ passes 2, it's certain to keep growing, so the round $k$ where that happens becomes the pixel's colour.

## Real world

### Computer graphics
Fractal renderers run exactly this loop in parallel over millions of pixels to draw endlessly detailed textures and backgrounds.

### Testing numerical software
Because the same simple loop produces such rich output, the Mandelbrot set is a classic stress test for how fast and how precisely a machine can do arithmetic.

### Chaos and dynamical systems
The set maps a whole family of dynamical systems at once: each point c stands for one rule, "square and add c," and the picture shows which rules stay tame and which blow up.

### Mathematical art
Zooming into the boundary is one of the most popular ways the public encounters "real" mathematics, because no photograph is needed — the beauty comes straight out of the formula.
