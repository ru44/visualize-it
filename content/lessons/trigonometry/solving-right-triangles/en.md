---
title: Solving right triangles
summary: >-
  Know any two pieces of a right triangle — a side and the angle, or two sides
  — and SOH-CAH-TOA finds everything else, from a ladder's angle to a ramp's slope.
parameters:
  a: leg a — opposite θ
  b: leg b — adjacent to θ
variables:
  - the leg opposite the angle θ (drag its far vertex)
  - the leg adjacent to θ (drag its far vertex)
  - the hypotenuse, computed from a and b
  - the angle θ, opposite side a
---

## Try it

1. Drag the vertex at the far end of leg «a — opposite θ» up and down, and watch the angle θ change with it.
2. Now drag the vertex on leg «b — adjacent to θ» instead, and watch the hypotenuse stretch to match.
3. Set the two legs so θ reads close to 45°. At that point the triangle mirrors itself, and a and b become equal.

## Real-life examples

1. **A ladder against a wall.** It reaches 6 m up the wall while its foot sits 1.5 m out: a steep, sturdy angle.
2. **A wheelchair ramp.** Rising 1 m over a 5 m run keeps the ramp gentle, well under the steepest slope building codes allow.
3. **A staircase or roof pitch.** Rising 4 m over a 2 m run is a steep pitch, more like a ladder than a walkable stair.

## Test yourself

1. Make θ exactly 45°.
2. Make the triangle steeper than 70° while keeping leg b under 2 m.
3. Make it shallower than 15° while keeping leg a above 1 m.

## Intuition

A 6 m ladder mark on the wall with its foot 1.5 m out looks steep just by eye — but "steep" becomes a number the moment you compare the two legs. Drag the far vertex of leg a and the angle θ swings with it: taller leg a for the same leg b means a bigger angle, exactly the way a ladder leaning closer to the wall gets steeper.

The three ratios sin, cos and tan are just three ways of comparing sides of this same triangle. sin θ compares the leg opposite θ to the hypotenuse; cos θ compares the leg next to θ to the hypotenuse; tan θ skips the hypotenuse entirely and compares the two legs directly. Whichever two of the triangle's six pieces (three sides, three angles) you already know, one of these three ratios gets you the rest.

## Formal

In a right triangle with legs $a$ and $b$, hypotenuse $c = \sqrt{a^2+b^2}$, and angle $\theta$ opposite side $a$: $\sin\theta = a/c$ and $\cos\theta = b/c$.

Dividing one by the other cancels the hypotenuse: $\tan\theta = \sin\theta/\cos\theta = a/b$, so knowing just the two legs gives the angle directly, without ever computing $c$.

## Advanced

These three ratios only work for a right triangle: $\theta$ must be one of the two acute angles, and the ratio is defined against the specific right angle in the triangle. A triangle with no right angle needs the sine rule or the cosine rule instead, which reduce to these same SOH-CAH-TOA ratios the moment one angle happens to be $90°$.

## Derivation

1. The Pythagorean theorem gives the hypotenuse from the two legs: $c = \sqrt{a^2+b^2}$.
2. Each leg measured against that hypotenuse defines sine and cosine: $\sin\theta = a/c$, $\cos\theta = b/c$.
3. Dividing sine by cosine cancels $c$, leaving tangent as the two legs compared directly: $\tan\theta = a/b$.

## Real world

### Construction and safety codes
A ladder is considered safe at roughly 75° from the ground; setting the foot too far out or too close in pushes the angle outside that range.

### Accessibility ramps
Building codes cap wheelchair ramps at about 4.8° (a 1-in-12 slope), which SOH-CAH-TOA turns directly into a maximum rise for any given run.

### Surveying
A surveyor measures one side and one angle of a right triangle with a theodolite, then uses these ratios to compute a distance too large or awkward to measure directly.

### Carpentry and roofing
A roof's "pitch" is usually given as a ratio of rise to run, which is exactly $\tan\theta$ for the angle the roof makes with the horizontal.
