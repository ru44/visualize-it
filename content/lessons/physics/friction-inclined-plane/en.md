---
title: Friction on an inclined plane
summary: >-
  This is why a rubber-soled shoe grips a steep roof but slides on wet tile,
  and how engineers pick safe ramp angles for wheelchairs and warehouses.
parameters:
  mu: coefficient of friction μ
  x: incline angle θ
variables:
  - angle of the incline from horizontal
  - coefficient of friction between object and surface
  - 'net acceleration down the slope (negative means friction wins, it stays put)'
---

## Try it

1. Watch the curve at a shallow incline angle — it sits below zero, meaning the block stays put.
2. Drag the slider "incline angle θ" up. Watch the curve rise toward zero, then cross it.
3. Now raise "coefficient of friction μ". The crossing point, where sliding begins, moves to a steeper angle.

## Real-life examples

1. **A waxed ski on packed snow.** With μ≈0.06 and a gentle 20° slope, the tiny friction barely slows the skier — they accelerate down almost as if the slope were frictionless.
2. **A wooden crate on a wooden ramp.** With μ=0.4 on a 30° ramp, friction nearly matches gravity's pull, so the crate creeps down slowly instead of sliding fast.
3. **A rubber shoe on wet tile.** With μ=0.9 the shoe still slides on a steep 70° slope — its grip can't keep up with such a steep pitch.

## Test yourself

1. With friction μ = 0.5, find the incline angle where the block is exactly on the verge of sliding (acceleration = 0).
2. Make the block accelerate down the slope at exactly 3 m/s².
3. Set the incline to 45° and find the friction coefficient where the block just barely stays still.

## Intuition

Picture a wooden crate on a 20° ramp with a slippery, waxed surface, friction coefficient μ = 0.06: at this shallow angle the curve on screen sits below zero, meaning gravity's pull along the slope is weaker than friction can resist, so the crate stays put. Drag the slider "incline angle θ" up and watch the curve climb toward zero.

The point where the curve crosses zero is the critical angle: past it, the curve turns positive and the crate accelerates down the slope. Now raise "coefficient of friction μ" instead, say to 0.9, and watch that crossing point shift to a much steeper angle — a rougher surface buys you a steeper ramp before anything starts sliding.

## Formal

Along the incline, $ma = mg\sin\theta - \mu mg\cos\theta$, giving $a(\theta) = g(\sin\theta - \mu\cos\theta)$, independent of mass.

The critical (sliding) angle satisfies $a=0$: $\tan\theta_c = \mu$ — a direct, mass-independent measurement of the friction coefficient.

## Advanced

This root-finding structure is identical to the linear-equation and quadratic-root lessons: the physically meaningful boundary (here, the onset of sliding) is precisely where a governing expression crosses zero, and the derivative of $a(\theta)$ with respect to $\theta$ tells you how sensitively the sliding onset shifts if $\mu$ or the incline changes — useful for engineering safety margins on ramps and roofs.

## Derivation

1. Forces along the incline: gravity component down the slope minus friction.
2. Friction opposes motion, proportional to the normal force $N = mg\cos\theta$.
3. Apply Newton's second law; mass cancels.

## Real world

### Wheelchair ramps and roofing codes
Building codes set maximum slope angles based on friction coefficients of the intended surface material.

### Vehicle hill-holding
Parking brakes must overcome exactly this friction-versus-gravity balance on a slope.

### Conveyor and chute design
Industrial chutes are angled just past the critical sliding angle so material flows rather than jams.

### Rock and snow slides
Natural slopes near their critical friction angle are prone to sudden slides when moisture reduces $\mu$.
