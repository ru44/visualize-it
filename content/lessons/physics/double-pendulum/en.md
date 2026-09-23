---
title: The double pendulum
summary: >-
  Bolt a second rod to the bottom of a swinging rod and the neat, repeating
  swing is gone — release two copies less than a degree apart and within a
  few seconds they are swinging in completely different directions.
parameters:
  theta0: starting angle θ₀
  sep: starting gap
  L: rod length L
  t: time
variables:
  - the upper rod's angle from straight down
  - the lower rod's angle from straight down
charts: []
---

## Try it

1. Press play and watch the blue pendulum swing. Both rods swap energy back and forth in a tangle that never quite repeats.
2. Raise "starting gap" to a few degrees. A second, orange pendulum starts almost on top of the blue one.
3. Watch the orange trail (the lower tip's path) pull away from the blue rod within a couple of seconds, even though they started only a hair apart.

## Real-life examples

1. **A gentle rocking swing.** Released from 45°, a double pendulum barely swings past the middle, and the two copies stay close together far longer.
2. **A wide, energetic swing.** Released from 120°, close to horizontal, the lower rod already whips around unpredictably.
3. **Two copies, clearly apart.** Released from 150° with a 3° starting gap on a slightly shorter rod, the two lower tips are on opposite sides of the pivot within a few swings.

## Test yourself

1. Set the starting angle below 60° and watch how gently — and how predictably — both pendulums swing.
2. Set the starting angle above 100° with a starting gap under 1°, and watch the tips separate anyway.
3. Set the starting gap above 2.5° and see how quickly the two lower tips end up far apart.

## Intuition

A single pendulum is easy to predict: pull it back and it swings, like a clock's. Bolt a second, identical rod to the bottom of the first one, and the second rod's swing constantly changes how the first one is loaded, while the first rod's swing constantly changes where the second one starts from. Each one is steering the other, and neither ever "wins" a steady rhythm.

Drag "starting gap" up and release two pendulums only a fraction of a degree apart. For the first swing or two they move almost as one — the picture looks like a single, slightly fat pendulum. Then, exactly as with the weather, the tiny difference in where they started gets amplified swing after swing, and the orange trail on screen goes its own way.

## Formal

With two equal rods of length $L$ and equal point masses, the equations of motion are $2\ddot\theta_1 + \ddot\theta_2\cos(\theta_1-\theta_2) + \dot\theta_2^2\sin(\theta_1-\theta_2) + 2\frac{g}{L}\sin\theta_1 = 0$ and $\ddot\theta_2 + \ddot\theta_1\cos(\theta_1-\theta_2) - \dot\theta_1^2\sin(\theta_1-\theta_2) + \frac{g}{L}\sin\theta_2 = 0$.

These two equations are coupled and nonlinear (through the $\sin$ and $\cos$ of $\theta_1-\theta_2$), so unlike a single pendulum there is no neat closed-form solution; the picture is built by stepping the equations forward numerically in tiny time slices.

## Advanced

For large enough swings the system is chaotic in the same technical sense as the Lorenz system: nearby trajectories in the four-dimensional state space $(\theta_1,\theta_2,\dot\theta_1,\dot\theta_2)$ separate at a rate set by a positive largest Lyapunov exponent. For small starting angles, though, the motion is close to two coupled harmonic oscillators and stays predictable — chaos here is a large-swing phenomenon, not a universal one.

## Derivation

1. The equations couple $\theta_1$, the upper rod's angle, and $\theta_2$, the lower rod's angle, through their difference $\theta_1-\theta_2$.
2. The first equation balances the upper rod's own swing against the pull of gravity and the load passed down from the lower rod.
3. Both pendulums share the same rod length $L$ and start from $\theta_1(0)=\theta_2(0)$; only the tiny starting gap on $\theta_1$ tells them apart.

## Real world

### Why it names a whole field of physics
The double pendulum is one of the simplest possible mechanical systems that is genuinely chaotic, so it is a standard classroom and lab demonstration of what "sensitive dependence on starting conditions" actually looks like.

### Robot arms
A robot arm with two or more joints faces the same coupling: the motion of a wrist joint changes the load an elbow joint feels, which is why robotics engineers plan trajectories carefully rather than just swinging joints freely.

### Gymnastics and diving
A gymnast's body on the bars, or a diver tucking mid-air, behaves like a jointed chain of rods; skilled athletes learn to control a system that would otherwise tumble unpredictably.

### Testing simulation software
Because the exact path is so sensitive to tiny numerical differences, the double pendulum is a popular stress test for physics-engine and numerical-integration code.
