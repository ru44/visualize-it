---
title: The six trig functions
summary: >-
  Sine and cosine are a point's coordinates on a circle of radius 1; tangent,
  cotangent, secant and cosecant are just other lengths you can measure on
  the same picture.
parameters:
  theta: angle θ
variables:
  - the angle, measured from the 3 o'clock direction
  - height of the point above the centre line
  - the point's distance sideways from the centre
  - the segment cut on the vertical line touching the circle at (1, 0)
  - the segment cut on the horizontal line touching the circle at (0, 1)
  - the segment from the centre out to that vertical touching line
  - the segment from the centre out to that horizontal touching line
---

## Try it

1. Drag the black dot around the circle. Watch the blue segment (cos θ) and the orange segment (sin θ) grow and shrink.
2. Push past 90°. The green tan θ segment on the right flips to the other side of its touching line, and past 270° it flips back.
3. Bring θ close to 0°. The red cot θ and grey csc θ segments shoot off screen — they show "±∞" because there is no cotangent of 0°.

## Real-life examples

1. **A ramp at 30°.** For every metre you walk forward, you climb tan 30° ≈ 0.58 m; the ramp's length for a 1 m rise is csc 30° = 2 m.
2. **A leaning ladder at 150°.** Past a right angle the point sits in the second quadrant, so cos θ is negative: the ladder's foot is now on the far side of the wall.
3. **A shadow at 240°.** In the third quadrant both sin θ and cos θ are negative, so a shadow's length (built from tan θ) is still positive — the two negatives cancel.

## Test yourself

1. Set θ so that tan θ = 1 exactly.
2. Find an angle in the third quadrant, where both sin θ and cos θ are negative.
3. Make sin θ as large as it can possibly get.

## Intuition

Picture a bicycle wheel of radius 1 with a marker taped to its rim. As the wheel turns, the marker's height above the axle is sin θ and its sideways distance from the axle is cos θ — that is the whole definition, no formula needed first. Drag the dot around the circle and watch the orange (sin θ) and blue (cos θ) segments trace exactly that height and that sideways distance.

The other four functions come from two lines that just touch the circle: a vertical one on the right, at x = 1, and a horizontal one on top, at y = 1. Extend the line from the centre through the moving dot until it hits each touching line. The piece cut on the vertical line is tan θ, and the whole line from the centre to that point is sec θ; the piece cut on the horizontal line is cot θ, and the whole line to that point is csc θ. When the dot nears the top or the side of the circle, these lines almost never meet the touching line at all, which is why tan θ and sec θ blow up near 90°, and cot θ and csc θ blow up near 0°.

## Formal

By definition, $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ and $\cot\theta = \dfrac{1}{\tan\theta} = \dfrac{\cos\theta}{\sin\theta}$.

Likewise $\sec\theta = \dfrac{1}{\cos\theta}$ and $\csc\theta = \dfrac{1}{\sin\theta}$, so all four follow from sine and cosine alone.

## Advanced

Because $\sin^2\theta + \cos^2\theta = 1$, dividing through by $\cos^2\theta$ gives $\tan^2\theta + 1 = \sec^2\theta$, and dividing by $\sin^2\theta$ gives $1 + \cot^2\theta = \csc^2\theta$ — the two companion identities to the Pythagorean one, both provable straight from this picture.

## Derivation

1. Sine is how high the point sits above the centre line, and cosine is how far sideways it sits from the centre — the picture's two most basic lengths.
2. Extending the radius to the vertical touching line cuts off a segment of length tan θ, because that segment's height-to-distance ratio matches the point's own sin θ to cos θ ratio.
3. The same radius, extended to the horizontal touching line instead, cuts off cot θ; the two extended lines themselves, from the centre out to each touching line, are sec θ and csc θ.

## Real world

### Ramps and roofs
A ramp's rise-over-run is tan of its angle, so building codes cap the tangent of a wheelchair ramp's slope directly.

### Surveying
Surveyors measure one angle and one side, then use tan and sin to find distances they cannot walk to directly, like the width of a river.

### Computer graphics
A rotation on screen is built from sin and cos of the turning angle; every spinning icon and 3-D camera move uses them thousands of times a second.

### Optics
The bending of light at a surface, Snell's law, compares the sine of the entry angle to the sine of the exit angle.
