---
title: Terminal velocity
summary: >-
  A falling body speeds up only until drag grows to match gravity — after that
  its speed levels off at a fixed terminal value.
parameters:
  m: mass m
  Cd: drag coefficient C_D
  A: frontal area A
  x: time t
variables:
  - downward speed at time t
  - terminal velocity — the speed at which drag exactly balances weight
  - mass of the falling body
  - 'drag coefficient and frontal area, same as in the drag equation'
charts:
  - title: 'Drag force climbs toward weight, then holds steady'
    xLabel: t (s)
    yLabel: 'force (N), weight shown flat'
    series:
      - drag force
      - weight m·g
---

## Intuition

Drag the time point along the curve: it starts steep, exactly like free fall under gravity alone, then bends over and flattens toward a ceiling. Early on drag is tiny compared to weight, so the body accelerates at nearly $g$; as speed builds, drag — growing with $v^2$ — catches up to weight and the net force, and hence the acceleration, shrinks toward zero.

Now raise the mass slider: terminal velocity increases, because a heavier body needs more drag force, hence more speed, to balance its larger weight. Raise the frontal area instead (think: skydiver opening their arms and legs) and terminal velocity falls — more drag per unit speed means less speed is needed to reach balance. A skydiver in a head-down dive versus a spread-eagle "box" position is choosing between two very different $A$ values, and hence two very different terminal speeds.

## Formal

Newton’s second law with quadratic drag: $m\dot v = mg - \tfrac12\rho C_D A v^2$, giving the differential equation solved by $v(t) = v_t\tanh(gt/v_t)$.

Terminal velocity is where acceleration is zero: $mg = \tfrac12 \rho C_D A v_t^2 \;\Rightarrow\; v_t = \sqrt{2mg/(\rho C_D A)}$.

## Advanced

The $\tanh$ solution is exact for constant $C_D$; in reality $C_D$ itself varies with Reynolds number and body orientation (a tumbling skydiver has a time-varying effective $A$), so real trajectories only approximate this closed form, though it remains an excellent first model for parachutists and falling objects in air.

## Derivation

1. Weight acts down at all times; drag acts up, opposing motion, and grows with $v^2$.
2. Rewrite using the terminal velocity $v_t$ as a natural speed scale — the ODE becomes separable.
3. Separate and integrate from $v(0)=0$; $\tanh$ starts linear (like free fall) and saturates at 1 (speed → $v_t$).

## Real world

### Skydiving
A belly-to-earth skydiver reaches about 55 m/s terminal velocity; head-down, with far less frontal area, the same person can exceed 90 m/s.

### Raindrops
Small raindrops fall gently at only a few m/s terminal velocity, which is why fine drizzle drifts rather than stings.

### Parachute design
A parachute’s huge area is chosen specifically to make $v_t$ survivably small before landing.

### Hailstone size and damage
Larger hailstones have higher terminal velocity (mass grows faster than area), which is why big hail is so much more damaging.
