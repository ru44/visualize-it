---
title: Degrees and radians
summary: 'Measure the same turn in degrees and radians, then connect radians to arc length.'
parameters:
  theta: 'θ — angle in degrees'
variables:
  - 'θ°: degree measure, with 360° per turn'
  - 'θ in radians: swept arc length divided by radius'
---

## Try it

1. Set θ = 90°. The two angle readouts show 90° and approximately 1.5708 radians: two units for the same quarter-turn.
2. Move back to 57°. This is approximately 0.9948 radians, close to one radian.
3. Set θ = 180°, then 360°. The radian values are π and 2π. The point completes half a turn, then a full turn.

## Real-life examples

1. **A quarter-turn.** A marked wheel turning through 90° rotates through π/2 radians, about 1.57.
2. **Nearly one radian.** At 57°, the swept arc is about 0.9948 times the radius. Exactly one radian is about 57.30°, so this preset is an approximation.
3. **Three quarters of a turn.** At 270°, the angle is 3π/2 radians, about 4.71.

## Test yourself

1. Set exactly half a turn, 180°, and read its radian value.
2. Find an angle whose radian value differs from 1 by at most 0.03.
3. Choose an angle greater than 90° but less than 2 radians.

## Intuition

Degrees divide a full turn into 360 equal parts. Radians measure a turn using the circle itself: divide the length of the swept arc by the radius. If the arc has the same length as the radius, the angle is one radian. If the arc is twice as long as the radius, the angle is two radians.

The ratio does not depend on the circle's size. Doubling the radius also doubles the arc length for a fixed angle, leaving their ratio unchanged. On the unit circle, the radius is 1, so the numerical arc length equals the angle in radians. The curved arc, not the straight chord joining its endpoints, is the length used here.

## Formal

For radius $r>0$ and swept arc length s measured in the same length unit, $\theta_{\mathrm{rad}}=s/r$. Thus $s=r\theta_{\mathrm{rad}}$. Radians are a ratio of lengths, not a new length unit.

One full turn has arc length $2\pi r$, so $360^\circ=2\pi\ \mathrm{rad}$. Convert degree values using $\theta_{\mathrm{rad}}=(\pi/180)\theta_{\mathrm{deg}}$; convert back by multiplying by $180/\pi$.

## Advanced

The derivative formula d(sin x)/dx = cos x assumes x is a radian measure. With a degree-valued input u, the function is sin(πu/180), whose derivative includes the factor π/180. Angular speed may be given in degrees per second or revolutions per minute; convert to the units a formula expects.

## Derivation

1. Define radian measure as arc length divided by radius, then rearrange to express arc length.
2. For a full turn, substitute the circumference for arc length. This turn is also 360°.
3. Divide by the radius and use the same proportion for any fraction of a turn to obtain the conversion factor.

## Real world

### A wheel's rim

For a wheel of radius 0.5 m rotating through 2 radians, a marked point travels 1 m along its circular path relative to the centre.

### Programming rotations

Check which unit a function accepts. To supply a radian-based function with a 90° rotation, pass π/2; passing 90 would specify a different rotation.
