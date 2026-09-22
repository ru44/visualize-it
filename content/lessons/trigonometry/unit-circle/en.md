---
title: The unit circle
summary: >-
  Sine and cosine are just the coordinates of a point walking around a circle of
  radius 1.
parameters:
  theta: angle θ
variables:
  - the angle swept counter-clockwise from the positive x-axis
  - the x-coordinate of the point on the unit circle
  - the y-coordinate of the point on the unit circle
  - 'sin θ divided by cos θ, undefined where cos θ = 0'
---

## Try it

1. Drag the point around the circle. The green bar is its height: that is sin.
2. The blue bar is how far right it is: that is cos.
3. Watch the wave on the right draw itself as you go round. A wave is just a circle seen over time.

## Real-life examples

1. **Clock hands at quarter past.** The minute hand points straight up at 90°, where the point on the circle sits exactly at its highest.
2. **Compass bearing southwest.** A bearing of 225° points down and to the left, where both the horizontal and vertical distances from the centre are negative.
3. **Ferris wheel near the top.** A car that has swung 80° around the wheel is close to the very top, nearly as high as it will get.

## Test yourself

1. Find an angle where the height of the point (sin θ) equals 0.5.
2. Go past 180° yet keep the horizontal distance (cos θ) above 0.5.
3. Land in the region where both the height and the horizontal distance are negative.

## Intuition

Drag the point around the rim of the circle. Its horizontal distance from the centre is $\cos\theta$, its vertical distance is $\sin\theta$ — you are not memorising a table, you are watching two shadows cast by one spinning point.

As you drag, the wave on the right traces itself out. The dashed connector shows why: the height of the point on the circle is exactly the height of the dot on the sine curve. Sine and cosine are the circle unrolled onto a straight timeline.

## Formal

For a point $(\cos\theta, \sin\theta)$ on the unit circle, $\theta$ is the angle in radians measured counter-clockwise from the positive $x$-axis.

Because the point always lies at distance 1 from the origin, $\sin^2\theta + \cos^2\theta = 1$ for every value of $\theta$.

## Advanced

Euler’s formula packages both coordinates: $e^{i\theta} = \cos\theta + i\sin\theta$. Angle addition becomes multiplication of exponentials, and $\sin$, $\cos$ are the solutions of $y'' = -y$ — which is why they appear in every oscillation.

## Derivation

1. The point sits on a circle of radius 1, so its coordinates form the legs of a right triangle whose hypotenuse is 1.
2. Define cosine and sine as exactly those coordinates: adjacent over hypotenuse and opposite over hypotenuse, with hypotenuse 1.
3. Substituting the definitions back into the circle equation gives the Pythagorean identity — true for every angle, all at once.

## Real world

### Sound
A pure musical tone is a sine wave in air pressure over time; the unit circle is the machine that generates it.

### AC electricity
Mains voltage oscillates as $\sin(\omega t)$ because it is produced by a coil rotating at constant angular speed.

### Rotation
Any point on a spinning wheel or gear traces out sine and cosine in its horizontal and vertical position over time.

### Navigation
Converting between a bearing-and-distance and map coordinates uses sine and cosine directly.
