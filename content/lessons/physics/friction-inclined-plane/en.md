---
title: Friction on an inclined plane
summary: >-
  An object on a slope stays put as long as friction can match gravity's pull
  along the incline; past a critical angle it cannot, and sliding begins.
parameters:
  mu: coefficient of friction μ
  x: incline angle θ
variables:
  - angle of the incline from horizontal
  - coefficient of friction between object and surface
  - 'net acceleration down the slope (negative means friction wins, it stays put)'
---

## Intuition

At shallow angles the curve sits below zero: gravity's pull along the slope is weaker than the maximum friction can resist, so nothing accelerates — the object is held in place. Drag the angle up and watch the curve rise toward zero.

The root, where the curve crosses zero, is the critical angle: past it, the curve is positive and the object accelerates down the slope. Raise $\mu$ (rougher surface) and that crossing point pushes to a steeper angle — a higher $\mu$ buys you a steeper slope before sliding starts.

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
