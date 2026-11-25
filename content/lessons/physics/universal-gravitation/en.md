---
title: Gravitational field strength with distance
summary: 'Use distance from Earth’s centre to calculate gravitational acceleration outside a spherical Earth model.'
parameters:
  x: 'r — distance from Earth’s centre'
variables:
  - 'centre-to-object distance in thousands of kilometres'
  - 'gravitational acceleration magnitude at that distance'
  - 'Earth-model gravitational parameter, 3.986 × 10¹⁴ m³/s²'
---

## Try it

1. Set r to 6.4 on the control. This means 6400 km from Earth's centre, not 6400 km above its surface. The model gives g ≈ 9.73 m/s².
2. Double the setting to 12.8. The acceleration falls to about 2.43 m/s², one-quarter as much.
3. Set r to 20, meaning 20000 km from the centre. The acceleration is about 0.997 m/s². Gravity remains nonzero throughout the plotted range.

## Real-life examples

1. **A low-orbit distance.** At a centre-to-object distance of 6800 km, the model gives about 8.62 m/s². This strong gravitational acceleration is compatible with apparent weightlessness during free fall.
2. **A larger orbit.** At 26600 km from the centre, acceleration is about 0.563 m/s². A circular orbit in this model has a period of about 11.99 hours.
3. **Roughly a one-day orbit.** At 42200 km from the centre, acceleration is about 0.224 m/s² and the circular period is about 23.97 hours. Remaining above one location also requires an equatorial orbit in the direction of Earth's rotation.

## Test yourself

1. Find a distance giving gravitational acceleration close to 1 m/s².
2. Find a distance giving about 2.43 m/s², approximately one-quarter of the value at 6400 km.
3. Find a distance where gravitational acceleration is less than 0.2 m/s².

## Intuition

Distance matters because the same attracting mass produces a weaker field farther away. For this model, doubling the distance from the centre divides gravitational acceleration by four. Doubling height above the surface does not generally do that: height must first be added to the body's radius to obtain the centre-to-object distance.

Gravity is still strong close to Earth in orbit. An orbiting object continually falls while its sideways motion carries it around the planet. Apparent weightlessness occurs because the object and its surroundings fall together, not because gravity has vanished. The 3D orbit uses accelerated playback and a minimum displayed radius of 6571 km; use the 2D graph for the selected distance, including smaller settings.

## Formal

Outside a spherically symmetric body of mass M, the gravitational acceleration magnitude is $g(r)=GM/r^2$, directed toward its centre. The distance r must be measured from the centre. The Earth model here uses $GM=3.986\times10^{14}\ \mathrm{m^3/s^2}$ and converts the control's thousands of kilometres into metres.

A test mass m experiences force magnitude $F=mg=GMm/r^2$. The acceleration is independent of that test mass in this model. For a circular orbit dominated by the central body, $v=\sqrt{GM/r}$ and $T=2\pi\sqrt{r^3/(GM)}$. A circular orbit needs this matching speed, not just a chosen radius.

## Advanced

The inverse-square expression applies outside a spherical mass distribution; it cannot be extended unchanged toward the centre inside Earth. A spherical shell's field vanishes inside that shell, so interior fields depend on how mass is distributed. Real Earth is not perfectly spherical, and rotation and other gravitating bodies also matter in more precise calculations.

## Derivation

1. Start with Newton's force law for two point masses, or the exterior field of a spherical central body.
2. Divide the force magnitude by the test mass to obtain gravitational acceleration.
3. Substitute r = 6.4 million metres and the chosen GM. The result is about 9.73 m/s², close to familiar surface gravity but not a precision surface model.

## Real world

### Comparing orbital scales

Larger circular orbits around the same dominant body have lower speeds and longer periods. The acceleration remains what bends the motion into an orbit.

### Distinguishing force from apparent weight

A support or scale measures a contact force, which can be zero in free fall even when gravitational force is substantial. This distinction explains why “weightless” does not mean “without gravity.”
