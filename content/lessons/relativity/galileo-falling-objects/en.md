---
title: A ball and a feather falling
summary: >-
  Every dropped object speeds up at exactly the same rate — until air gets in
  the way, which is why a feather seems to fall slower than a ball.
parameters:
  h: drop height h
  air: air (0 = vacuum, 1 = air)
---

## Try it

1. Watch the blue ball and the feather drop from height h. With air on, the feather drifts down slowly while the ball falls fast.
2. Switch air to 0 — vacuum. Now the ball and the feather land at exactly the same moment, however heavy or light they are.
3. Raise h to 100 m and switch air back to 1. Over the longer fall, the gap between the ball and the feather grows even wider.

## Real-life examples

1. **A ball and a feather on Earth.** Air pushes back on the feather, so over a 2 m drop the ball lands well before the feather touches down.
2. **The Moon, 1971.** Apollo 15's commander dropped a hammer and a falcon feather from about the same height in the Moon's airless sky. Both hit the dust at the same instant — direct proof that gravity does not care about mass.
3. **A hundred-metre drop through air.** Over 100 m of Earth's atmosphere, air resistance has much longer to act, so the feather falls far behind the ball.

## Test yourself

1. Make the ball and feather fall from exactly 50 m.
2. Switch off air resistance so the ball and the feather land together, like on the Moon.
3. Using $t = \sqrt{2h/9.81}$, find a height where a vacuum drop takes about 3 seconds.

## Intuition

Picture the blue ball and the feather held at the same height and let go together. With air switched on, the feather drifts down slowly while the heavy ball drops almost straight to the floor — the same thing you would see dropping a coin and a sheet of paper in your room. Switch air to 0, though, and the feather suddenly keeps pace with the ball all the way down.

The reason is that gravity pulls every object toward the ground at the same rate, called $g$, worth about 9.8 metres per second faster every second, whether the object is a feather or a hammer. Only air resistance holds light, wide objects back, and once the air is gone — as it is on the Moon — that difference disappears completely.

## Formal

When gravity is the only force on a falling object, Newton's second law $F = mg$ gives an acceleration $a = g$ that does not depend on the object's mass $m$ — the mass cancels out of the equation entirely.

Starting from rest, the speed after time $t$ is $v = gt$ and the distance fallen is $h = \tfrac{1}{2}gt^2$. Solving for the time gives $t = \sqrt{\dfrac{2h}{g}}$, the time it takes the ball and the feather to reach the floor.

## Advanced

In air, drag grows with the square of speed, so each object settles into its own terminal velocity — around 50 m/s for a dense ball and under 1 m/s for a feather — which is why the air slider makes such a dramatic difference over a long drop, even though gravity itself never changes.

## Derivation

1. With gravity as the only force, Newton's second law $F=mg$ gives an acceleration $a=g$ that does not depend on the object's mass.
2. Starting from rest, that constant acceleration builds up a speed $v=gt$ and a distance $h=\tfrac12gt^2$ as time passes.
3. Solving the distance equation for time gives $t=\sqrt{2h/g}$ — the same fall time for every mass, once air is out of the way.

## Real world

### Apollo 15, 1971
Commander David Scott dropped a geological hammer and a falcon feather on live television; with no lunar air to slow the feather, both hit the ground at the same instant, exactly as gravity alone predicts.

### Skydiving
A skydiver spread out flat falls far slower than one diving head-first, because a bigger surface catches more air — the same effect that separates the ball from the feather on this page.

### Vacuum-tube demonstrations
Physics classrooms drop a coin and a feather inside a tube with the air pumped out, so students watch them land together and reproduce the Moon experiment on Earth.

### Why heavier does not mean faster
Aristotle believed heavy objects fall faster, and dropping a feather seems to agree — but that is air resistance fooling us, not gravity itself, which pulls every mass equally hard.
