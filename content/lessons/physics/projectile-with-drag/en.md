---
title: Projectile motion with air drag
summary: >-
  Air resistance eats into a thrown ball's range and height, and once it is
  strong enough the best launch angle drops well below the classic 45°.
parameters:
  v0: launch speed
  th: launch angle
  k: drag strength
variables:
  - speed, the length of the velocity vector at any instant
  - the horizontal component of velocity
  - the vertical component of velocity
  - drag strength, how hard the air pushes back
  - gravitational acceleration
charts: []
---

## Try it

1. Set «drag strength» to 0 and watch the solid and dashed curves land in the exact same spot — no air resistance yet.
2. Raise «drag strength». The solid curve (with drag) falls short of the dashed one (no drag), and the gap in the range readouts grows.
3. With strong drag on, drag «launch angle» down from 45°. The range creeps back up — a lower angle can beat 45° once the air is pushing back.

## Real-life examples

1. **A ball thrown in a vacuum.** With «drag strength» at 0, the classic 45° angle really does give the longest range, exactly as the textbook formula says.
2. **The same throw through real air.** At a modest drag strength the ball still leaves at 45°, but lands noticeably short of the vacuum prediction.
3. **A javelin thrower's lower angle.** With strong drag on, dropping the angle to 38° actually lands the object farther than 45° would.

## Test yourself

1. Turn drag off completely and confirm the two curves land together.
2. Push the drag up until it clearly bends the trajectory short.
3. With noticeable drag on, find a launch angle below 40° for the throw.

## Intuition

Throw a ball with no air at all and physics only has to fight gravity: the path is a clean, symmetric parabola, and 45° is provably the angle that sends it farthest. The dashed curve in this picture is exactly that ideal throw — turn «drag strength» to 0 and the solid curve lands right on top of it.

Real air pushes back on anything moving through it, and it pushes harder the faster the object goes — which is worst right at launch, when the ball is fastest. Raise «drag strength» and watch the solid curve peel away from the dashed one: it comes down earlier and lands closer to you, because speed, and so drag, was highest exactly when the ball had the most distance left to cover.

## Formal

Drag pushes back along the velocity, with a strength proportional to speed squared; splitting it into horizontal and vertical parts gives $\dfrac{dv_x}{dt} = -k v\,v_x$ and $\dfrac{dv_y}{dt} = -g-k v\,v_y$, where $v=\sqrt{v_x^2+v_y^2}$.

Unlike the no-drag case, these two equations do not combine into one closed formula for the path — the picture instead advances $v_x$, $v_y$, and the position by a tiny time step, over and over, until the object reaches the ground.

## Advanced

For small drag the range loss is close to linear in $k$, but strong drag makes the optimal launch angle itself a function of $v_0$ and $k$ — heavier, denser objects such as a shot put barely notice drag and keep an angle near 45°, while light, draggy ones such as a badminton shuttlecock do best launched much closer to vertical.

## Derivation

1. At any instant the object's speed is the length of its velocity vector, combining the horizontal and vertical parts.
2. Drag always points opposite the velocity and scales with the square of the speed, giving separate equations for how the horizontal and vertical velocity change.
3. Because drag removes energy at every instant, the object travels less far overall, and the launch angle that used to be optimal no longer is.

## Real world

### Artillery and ballistics
Early gunners already knew shells fall short of the "45° is best" prediction; accounting for drag was one of the first triumphs of numerical trajectory calculation.

### Baseball and golf
A well-hit ball's dimples or seams change how air flows around it, which is why real trajectories deviate from the smooth-sphere drag used in textbooks too.

### Skydiving
The same drag term, scaled up, is what makes a skydiver's fall stop accelerating and settle into a steady terminal speed instead of speeding up forever.

### Spacecraft re-entry
Engineers shape a capsule's heat shield specifically to maximise drag on the way down, trading range and speed for a survivable landing.
