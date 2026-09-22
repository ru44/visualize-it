---
title: Terminal velocity
summary: >-
  This predicts the top speed a skydiver, raindrop, or falling object ever
  reaches — because drag eventually grows to match gravity and stops it
  speeding up further.
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

## Try it

1. Picture a 75 kg skydiver falling belly-down, arms and legs spread wide.
2. Drag the time point «time t» along the curve: it starts steep, like free fall, then bends over and flattens.
3. Now shrink «frontal area A», as if the skydiver tucked into a head-down dive. The speed it flattens toward — the terminal velocity — rises.

## Real-life examples

1. **A skydiver falling belly-down.** At 75 kg with arms and legs spread (area 0.7 m²), they level off at about 55 m/s — roughly 200 km/h.
2. **The same skydiver diving head-down.** Tucked in with far less area (0.3 m²), they can reach about 76 m/s — much faster, purely from a smaller shape.
3. **A heavier skydiver with gear, tucked in.** At 120 kg with a moderate 0.5 m² area, they level off around 62 m/s.

## Test yourself

1. Tune the mass, drag coefficient, and area for a terminal velocity of about 60 m/s.
2. Find a time and body shape where the falling speed reaches about 50 m/s.
3. Reach at least 95% of terminal velocity within the first 10 seconds of the fall.

## Intuition

Picture a 75 kg skydiver falling belly-down, arms and legs spread wide. Drag the time point «time t» along the curve: it starts steep, exactly like free fall under gravity alone, then bends over and flattens toward a ceiling. Early on, drag is tiny compared to weight, so the body speeds up almost as fast as anything in free fall; as speed builds, drag catches up to weight, and the extra speed gained each second shrinks toward zero.

Now raise «mass m»: the terminal velocity increases, because a heavier body needs more drag force, and hence more speed, to balance its larger weight. Shrink «frontal area A» instead, as if the skydiver tucked into a head-down dive, and terminal velocity rises for the opposite reason — less drag per unit speed means more speed is needed to reach balance. A skydiver diving head-down versus spread out in a "box" position is choosing between two very different shapes, and hence two very different top speeds.

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
