---
title: 'Position, velocity and constant acceleration'
summary: >-
  This is how engineers predict a car's braking distance, or how far a
  dropped ball falls, just from its starting speed and a constant
  acceleration.
parameters:
  x0: starting position x₀
  v0: initial velocity v₀
  a: acceleration a
  x: time t
variables:
  - position at $t=0$
  - velocity at $t=0$
  - constant acceleration
  - 'time (the horizontal axis, labelled $x$ on the plot)'
---

## Try it

1. Watch the point move along the curve as time passes.
2. Drag the point along the curve and watch the tangent line's slope — that slope is the object's velocity at that instant.
3. Set "acceleration a" to zero. The curve straightens into a line: constant speed, no speeding up.

## Real-life examples

1. **A car braking to a stop.** Starting at 8 m/s (about 29 km/h) and braking at 3 m/s², the car's position traces a downward-curving parabola until it stops.
2. **An elevator starting to rise.** From rest, an elevator accelerating at a gentle 1 m/s² smoothly builds up speed without jolting passengers.
3. **A skateboarder on a gentle slope.** Starting 2 m along at 1 m/s and speeding up at 2 m/s² down the hill, the position curve bends upward faster and faster.

## Test yourself

1. Make the object be at position 20 m exactly at t = 5 s.
2. Find v₀ and a so the object's velocity is exactly zero at t = 4 s.
3. Make the object return to its starting position x₀ at some time later than t = 0.

## Intuition

Picture a car starting at 8 m/s and braking hard at 3 m/s² until it stops. Drag the point along the curve and watch the tangent line: its slope is the car's velocity at that instant, and the dashed derivative curve traces that same slope over time as a straight line, because velocity changes at a steady rate under constant acceleration.

Now set "acceleration a" to zero: the curve straightens into a plain sloped line and the derivative curve goes flat, showing constant velocity with no speeding up or slowing down. Make "acceleration a" negative with a positive "initial velocity v₀" instead: the tangent starts steep and positive, flattens to zero at the peak, then tilts negative — the object slows, stops, and reverses, exactly like a ball thrown straight up.

## Formal

$x(t) = x_0 + v_0 t + \tfrac12 a t^2$; differentiating gives $v(t) = x'(t) = v_0 + at$.

Differentiating again, $a(t) = v'(t) = a$ — constant, consistent with the assumption.

## Advanced

This is the unique solution of $\ddot x = a$ (a constant) with initial conditions $x(0)=x_0$, $\dot x(0)=v_0$; it is the simplest second-order linear ODE with constant coefficients, and every higher kinematic quantity (jerk, snap) is defined by continuing to differentiate, each derivative flattening the previous curve's time-dependence by one degree.

## Derivation

1. Start from constant acceleration.
2. Integrate acceleration to get velocity, using $v(0)=v_0$.
3. Integrate velocity to get position, using $x(0)=x_0$.

## Real world

### Braking distance
A car braking at constant deceleration follows this parabola; doubling initial speed roughly quadruples stopping distance.

### Free fall
Dropping or throwing an object near Earth's surface is this equation with $a = -9.81\ \text{m/s}^2$.

### Elevators and trains
Comfortable constant-acceleration profiles are designed using exactly this position-time relationship.

### Rocket ascent (early phase)
Before fuel burn changes mass significantly, a rocket's early ascent is well modeled by constant acceleration.
