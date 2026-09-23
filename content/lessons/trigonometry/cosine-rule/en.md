---
title: Cosine rule
summary: >-
  Know all three sides of any triangle, even one with no right angle, and the
  cosine rule hands you an angle — including the exact right angle Pythagoras predicts.
parameters:
  a: side a
  b: side b
  c: side c — opposite angle C
variables:
  - one side of the triangle
  - a second side
  - the third side, opposite the angle C
  - the angle C, opposite side c, worked out from the three sides
---

## Try it

1. Set the three sliders to 3 m, 4 m and 5 m. Look at the angle readout C: it lands exactly on 90°.
2. Now push slider c up toward 9 m while keeping a and b at 3 m and 4 m. Angle C grows well past 90°, and the triangle's outline stretches into a wide, flat shape.
3. Keep pulling c up until it nearly equals a + b. The two shorter sides almost fail to reach each other, and past that point the "no triangle" message appears.

## Real-life examples

1. **Checking a corner without a set-square.** Sides of 3 m, 4 m and 5 m give a computed angle of exactly 90° — the same 3-4-5 trick as the Pythagorean theorem, reached from a different direction.
2. **A tent held up by two 5 m poles anchored 8.8 m apart.** The angle between the poles at the top comes out well over 120°, a wide and shallow peak.
3. **Surveying a triangular plot of land.** Tape-measured sides of 5 m, 7 m and 9 m let a surveyor compute every corner angle without ever swinging a protractor.

## Test yourself

1. Make angle C exactly 90°.
2. Make angle C wider than 120° while keeping side a above 6 m.
3. Push the two shorter sides so their combined length comes within 1 m of the longest side, without breaking the triangle.

## Intuition

Set the sliders to 3 m, 4 m and 5 m and look at the angle readout C: it reads 90° exactly, even though nothing told the triangle directly to be a right triangle — three side lengths alone were enough to pin the angle down. That is the whole promise of the cosine rule: once you know all three sides, every angle follows, no protractor needed.

Now drag c up past 5 m while a and b stay put. The triangle has to lean further and further open to let that longer side fit between the same two endpoints, and angle C grows to match. Push c far enough and the two shorter sides can no longer reach each other at all — the shape breaks, and the picture switches to a warning instead of a triangle.

## Formal

For a triangle with sides $a$, $b$ and $c$, where $C$ is the angle opposite side $c$: $c^2 = a^2+b^2-2ab\cos C$.

Because this is one equation relating four quantities, it runs in both directions: given two sides and the angle between them it gives the third side, and given all three sides — as the sliders do here — the same formula, rearranged, gives back the angle.

## Advanced

Solved for the angle, the rule reads $\cos C = \dfrac{a^2+b^2-c^2}{2ab}$. When $a^2+b^2=c^2$ this fraction is exactly $0$, so $C=90°$ — the Pythagorean theorem is the special case of the cosine rule where the angle happens to be a right angle and the $-2ab\cos C$ term vanishes entirely.

## Derivation

1. Place $C$ at the origin, $A$ at $(b,0)$ and $B$ at $(a\cos C,\,a\sin C)$; the distance from $A$ to $B$ is exactly $c$.
2. Squaring that distance gives $c^2 = (b-a\cos C)^2 + (a\sin C)^2 = b^2 - 2ab\cos C + a^2\cos^2C + a^2\sin^2C$.
3. Since $\sin^2C+\cos^2C=1$, the squared terms collapse to $a^2$, leaving $c^2 = a^2+b^2-2ab\cos C$.

## Real world

### Surveying and mapping
A surveyor who can measure three distances but not an angle directly — across a river, say — uses the cosine rule to compute the missing angle from the sides alone.

### Navigation
A ship or aircraft that has travelled two known legs of a journey can find the angle it turned through, or the straight-line distance home, with the same formula run in either direction.

### Engineering and trusses
Engineers designing a triangular truss or bracket, where every strut length is fixed by the design, use the cosine rule to check that no joint angle is dangerously sharp or shallow.

### Astronomy
Given the Earth-Sun and Earth-star distances and the angle between them, astronomers used this same rule long before computers to work out distances no one could measure directly.
