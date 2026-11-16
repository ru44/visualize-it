---
title: Friction on an inclined plane
summary: 'Resolve gravity along a slope and distinguish sliding friction from the static friction that can hold an object at rest.'
parameters:
  mu: 'μ — friction coefficient used in the model'
  x: 'θ — incline angle above horizontal'
variables:
  - 'incline angle above the horizontal'
  - 'kinetic coefficient in the graph; also used as static limit in 3D'
  - 'signed downhill acceleration for a block already sliding downhill'
---

## Try it

1. Set μ = 0.4 and θ = 30°. For a block already sliding down the incline, the formula gives about 1.51 m/s² down the slope.
2. Keep μ = 0.4 and reduce θ to 10°. The formula is about −2.16 m/s²: a down-sliding block would slow. It does not mean a stationary block accelerates uphill.
3. Find the zero near θ = 21.8°. The 3D illustration also uses μ as a static-friction limit and holds the block below this threshold. That equal-coefficient assumption is a simplification.

## Real-life examples

1. **Small friction coefficient.** At μ = 0.06 and θ = 20°, the down-sliding acceleration is about 2.80 m/s², which is positive, not a stationary case.
2. **Intermediate friction.** At μ = 0.4 and θ = 30°, the acceleration is about 1.51 m/s². A positive acceleration means increasing downhill speed, not necessarily slow motion.
3. **Steep incline.** At μ = 0.9 and θ = 70°, the acceleration is about 6.20 m/s². These coefficients are model inputs, not measured values guaranteed for named materials or wet surfaces.

## Test yourself

1. Set μ = 0.5 and find an angle giving a sliding-formula acceleration within 0.3 m/s² of zero.
2. Make the calculated downhill acceleration approximately 3 m/s².
3. Set θ = 45° and find μ giving a calculated acceleration within 0.3 m/s² of zero.

## Intuition

Gravity pulls vertically, but the surface constrains the block's motion along the slope. The component pulling downhill is mg sin θ. The normal force perpendicular to the slope is mg cos θ in this model. When the block is sliding downhill, kinetic friction points uphill, reducing the net downhill force.

A stationary block is different. Static friction adjusts to oppose the downhill pull, up to a maximum; it is not always equal to that maximum. Thus a negative value of the plotted sliding formula cannot be interpreted as uphill acceleration from rest. The 2D graph describes a down-sliding block; the 3D illustration adds a rest condition using the same μ for static and kinetic friction.

## Formal

For a block sliding downhill on a fixed incline, with no other applied forces, $N=mg\cos\theta$ and $f_k=\mu_kN$. Taking downhill as positive gives $a=g(\sin\theta-\mu_k\cos\theta)$. The control labelled μ supplies μₖ for this calculation, and $g=9.81\ \mathrm{m/s^2}$.

For a block initially at rest, static friction can hold it when $mg\sin\theta\le\mu_smg\cos\theta$, or $\tan\theta\le\mu_s$ below 90°. Static and kinetic coefficients need not be equal. The zero of the sliding formula satisfies $\tan\theta=\mu_k$ and is not generally the angle at which a resting block starts to slide.

## Advanced

Once a down-sliding block stops, the kinetic-friction expression must be reconsidered. If it remains at rest, use static friction; if it moves uphill, kinetic friction reverses direction. Mass cancels from the simple acceleration formula because both gravity and friction are proportional to mass. Extra forces or a friction law that changes with conditions can invalidate this cancellation or the constant-coefficient approximation.

## Derivation

1. Choose downhill as positive and add the gravity component and opposing friction force along that direction.
2. For downhill sliding, the magnitude of kinetic friction is μ times the normal force. With no acceleration perpendicular to the surface, N = mg cos θ.
3. Apply Fnet = ma and cancel the positive mass to obtain the sliding acceleration.

## Real world

### Sliding experiments

Measure motion along a fixed incline and compare with the model. Distinguish the angle at which a resting block starts moving from its acceleration after it has started.

### Friction measurements

The coefficient depends on the pair of surfaces and their condition. A value from this illustration alone is not a design specification for ramps or footwear.
