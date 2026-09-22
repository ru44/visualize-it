---
title: 'Position, velocity and constant acceleration'
summary: >-
  Position under constant acceleration is a parabola in time; its slope at any
  instant is the velocity.
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

## Intuition

Drag the point along the curve and watch the tangent line: its slope is the velocity at that instant, and the dashed derivative curve traces exactly that slope over time — a straight line, because velocity under constant acceleration changes at a steady rate.

Set $a = 0$: the parabola straightens into a plain sloped line and the derivative curve goes flat — constant velocity, no acceleration. Now make $a$ negative with a positive $v_0$: the tangent starts steep and positive, flattens to zero at the peak, then tilts negative — the object slows, stops, and reverses, exactly like a ball thrown straight up.

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
