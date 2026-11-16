---
title: Angles of elevation and depression
summary: 'Use a viewing angle and a horizontal distance to calculate the height difference between two points.'
parameters:
  a: 'a — height difference (m)'
  b: 'b — horizontal distance (m)'
variables:
  - 'a: vertical difference between observer and target'
  - 'b: horizontal separation'
  - 'θ: acute angle between horizontal and line of sight'
---

## Try it

1. Set a = 30 m and b = 40 m. The angle opposite a is about 36.87°. Here a represents a height difference and b a horizontal distance, although the drawing rotates the triangle and places a horizontally on screen.
2. Keep a = 30 and increase b to 80. The angle falls to about 20.56°: the same height difference looks smaller from farther away.
3. Set a = 52 and b = 1000. Read an angle of about 2.98°. Use the controls and numerical values; the diagram rescales to fit.

## Real-life examples

1. **A roof above eye level.** A height difference of 30 m over a horizontal distance of 40 m gives about 36.87°. If the observer's eyes are 1.6 m above the building's ground level, the roof is 31.6 m above that level.
2. **A shallow line of sight.** A rise of 52 m over 1000 m horizontally gives about 2.98°. This is a geometric example, not a flight instruction.
3. **A distant tower top.** A difference of 100 m over 150 m horizontally gives about 33.69°. The 100 m is measured from the observer's eye level.

## Test yourself

1. Make the angle approximately 3°, within 0.3°.
2. Make the angle greater than 45°.
3. Keep a greater than 80 m while making the angle less than 20°.

## Intuition

Look toward a roof and imagine a horizontal line through your eyes. The angle between that line and your upward line of sight is the angle of elevation. The triangle's vertical side is the difference between the roof and your eyes, not automatically the building's full height. With a difference of 30 m and a horizontal distance of 40 m, the ratio is 30/40 = 0.75.

Now imagine looking back from the roof. Measure downward from a horizontal line through that higher point: this is the angle of depression. In a flat-ground model, the two horizontal reference lines are parallel, so the elevation and depression angles between the same two points are equal. Rotating the triangle on the page changes neither the lengths nor the angle.

## Formal

For positive height difference a and horizontal distance b, $\tan\theta=a/b$ and $\theta=\arctan(a/b)$. The displayed acute angle is opposite side a. Use consistent length units; the angle readout is in degrees.

If b and θ are known, $a=b\tan\theta$. To find an object's height above a shared ground level, add the observer's eye height. A sloping distance is the hypotenuse and cannot replace b in this formula.

## Advanced

Equality of elevation and depression angles assumes parallel local horizontals. This flat model omits curvature and refraction over long distances. For the same measured angle, doubling b doubles a; errors in distance or angle therefore affect the inferred height.

## Derivation

1. Draw a horizontal reference line through each endpoint of the line of sight. In the flat model these lines are parallel.
2. The line of sight crosses both parallels, giving equal alternate interior angles: elevation at one endpoint and depression at the other.
3. In the right triangle, divide the opposite side a by the adjacent side b to obtain the tangent of the angle.

## Real world

### Measuring an inaccessible point

A measured elevation angle and horizontal distance can give a roof's height above the measuring instrument. Add the instrument's height to refer the result to ground level.

### Looking down from a platform

If a platform's height above a target is known, its depression angle gives the horizontal distance through $b=a/\tan\theta$.
