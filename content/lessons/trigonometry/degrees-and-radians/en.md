---
title: Degrees and radians
summary: >-
  Degrees split a circle into 360 pieces by old habit; radians measure an angle
  by the arc it actually sweeps, which is why the formulas of calculus need them.
parameters:
  theta: angle θ
variables:
  - the angle in the everyday unit, where one full turn is 360°
  - the same angle in radians, counted as how many radius-lengths of arc it sweeps
---

## Try it

1. Drag the point around the circle and watch both angle readouts change together at the bottom.
2. Push the point to a quarter turn. The degree readout reads 90°, and the radian readout reads close to 1.57 — half of π.
3. Keep going until the radian readout reads close to 1.00. That is the one truly "natural" angle: where the arc already walked is exactly as long as the radius.

## Real-life examples

1. **Turning a steering wheel a quarter turn.** That is 90°, or π/2 ≈ 1.57 radians.
2. **A pizza slice cut so its curved crust is exactly as long as the pizza's radius.** Nobody orders a slice that way, but its angle is exactly 1 radian, about 57°.
3. **A ceiling fan blade sweeping three quarters of a turn.** That is 270°, or 3π/2 ≈ 4.71 radians.

## Test yourself

1. Set the angle to exactly half a turn, 180°, and read off its radian value: it should land on π ≈ 3.14.
2. Find the angle whose radian value is within 0.03 of exactly 1 — the "natural" angle.
3. Push the angle past 90° in degrees, yet keep its radian value under 2.

## Intuition

A degree only exists because ancient astronomers liked the number 360: it splits evenly into halves, thirds, quarters and more, and it roughly matches the days in a year. There is nothing about a circle itself that demands 360 of anything — it is just a convenient old habit, the same way an hour has 60 minutes.

A radian is different: drag the point around the rim and watch it trace out arc. One radian is the angle where that arc is exactly as long as the radius. Because this circle has radius 1, the radian readout at the bottom is not just an angle — it is literally the length of the curve the point has walked, in the same units as the radius itself.

## Formal

For a circle of radius $r$, an angle swept out over an arc length $s$ measures $\theta_{\text{rad}} = s/r$ radians. On the unit circle, where $r = 1$, this means $\theta_{\text{rad}}$ equals the arc length itself.

A full turn covers an arc of $2\pi r$, which is $360°$, so $2\pi$ radians and $360°$ describe the same rotation; scaling that ratio down gives $\theta_{\text{rad}} = \dfrac{\pi}{180}\,\theta^\circ$ for any angle.

## Advanced

Radians are the unit every calculus formula silently assumes: $\dfrac{d}{dx}\sin x = \cos x$ only holds when $x$ is in radians, because that is the unit in which the small-angle approximation $\sin x \approx x$ is exact in the limit. Angular velocity $\omega$ in physics is likewise always in radians per second.

## Derivation

1. One radian is defined so that the arc length $s$ it sweeps out equals the radius times the angle: $s = r\theta_{\text{rad}}$.
2. Going once all the way around, the arc length is the full circumference $2\pi r$, and the angle in degrees is $360°$ — two descriptions of the same full turn.
3. Dividing the circumference relation by $r$ turns $2\pi$ radians into $360°$, and scaling gives the conversion for any angle: $\theta_{\text{rad}} = \dfrac{\pi}{180}\,\theta^\circ$.

## Real world

### Engines and wheels
A car engine's speed is quoted in RPM (turns per minute), but the physics equations that predict its torque and power use angular velocity in radians per second.

### Computer graphics
Every rotation function in a graphics library or game engine — turning a sprite, spinning a 3D model — takes an angle in radians, not degrees, because that is what the underlying trigonometric functions expect.

### Astronomy
A star's parallax, the tiny shift used to measure its distance, is measured in arcseconds — fractions of a degree so small that astronomers often convert them to radians to keep the arithmetic simple.

### Figure skating and diving
A skater's "triple axel" is three and a half turns in the air, which judges write as 1260°, but the physics of how fast they must spin to complete it is worked out in radians per second.
