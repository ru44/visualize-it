---
title: Home range
summary: An animal that wanders at random but is always pulled back toward its den ends up covering a patch of ground of a fairly steady size, its home range.
parameters:
  home: pull toward den
  explore: wander speed
  step: tick
variables:
  - how strongly the animal is pulled back toward its den
  - how far the animal wanders on each step before the pull acts
  - how many steps of wandering you are watching
charts: []
---

## Try it

1. Set "pull toward den" near 0 and press play. The animal wanders off and the shaded patch of visited ground keeps growing the whole time.
2. Now raise "pull toward den" to about 0.25 and restart. The patch grows at first, then its growth slows and it settles into a roughly fixed size.
3. Watch the "cells visited" readout stop climbing once the animal has been pulled back and forth across the same patch a few times.

## Real-life examples

1. **A nearly free wanderer.** With almost no pull back to the den (0.05), the visited patch keeps growing for the whole 300 steps and never settles.
2. **A typical forager.** With a moderate pull (0.25) and normal wandering speed, the visited patch grows early on, then settles into a steady home range well before step 300.
3. **A bold but tethered animal.** Even with fast wandering (2.5) but a strong pull back (0.6), the animal ranges further from the den each trip but still settles into a bounded, larger patch.

## Test yourself

1. Set "pull toward den" below 0.1 and run to step 250 or beyond. Watch the visited patch keep growing instead of settling.
2. Set "pull toward den" to 0.5 or higher with a wander speed of 2 or higher, and run to step 250. The animal ranges widely but still settles into a bounded patch.
3. Set the wander speed to about 2.5 with a strong pull back (0.5 or higher), and watch how large the settled patch becomes compared to a calmer wanderer.

## Intuition

At every step the animal picks a new direction at random and moves a little, exactly like it is exploring with no plan at all. But on top of that random step, something always tugs it back toward one fixed point, the den, and the tug gets stronger the farther away it has wandered. Drag "pull toward den" up and you make that tug stronger; drag "wander speed" up and you make each random step bigger, and so pull it further from the den before the tug catches up.

The two effects fight each other in a way that settles down. Far from the den, the tug back is strong and tends to win, pulling the animal home; close to the den, the tug is weak and the random wandering wins, letting the animal roam locally. The result is not a fixed path but a patch of ground the animal keeps revisiting, and the "cells visited" readout stops climbing once that patch has been explored, which is exactly what field biologists call a home range.

## Formal

Write $x$ for the animal's position relative to its den. Each step adds a random wander of typical size $D$ plus a restoring pull $-k x$ toward the den, where $k$ is "pull toward den": $x_{t+1} = x_t - k\,x_t + D\,\xi_t$, with $\xi_t$ a fresh random direction each step. This is a discrete Ornstein–Uhlenbeck process, the standard model of a wandering-but-tethered animal.

Such a process has a stationary spread that no longer grows with time: the mean squared distance from the den settles to $\langle x^2 \rangle \approx D^2 / (2k)$, so a bigger pull $k$ shrinks the home range while a bigger wander $D$ grows it, exactly the trade-off the "cells visited" readout shows settling to a steady value.

## Advanced

Unlike an unrestrained random walk, whose visited area grows without bound as $\sqrt{t}$ forever, the Ornstein–Uhlenbeck process reaches a true stationary distribution, so quantities like the utilisation distribution (how much time the animal spends in each patch of ground) converge to a fixed shape, usually estimated in field ecology by kernel density estimation on GPS tracking data rather than assumed analytically.

## Derivation

1. Each step the animal picks a new wander direction at random, independent of where it has been before.
2. That random wander is added to a pull that always points back toward the den, growing stronger the farther the animal has strayed.
3. Once the two effects balance on average, the patch of ground the animal keeps revisiting stops growing and settles into a fixed-size home range.

## Real world

### GPS-collared wildlife studies
Ecologists fit GPS collars to animals from wolves to sea turtles and use exactly this kind of wander-plus-pull model to estimate a species' home range from the tracking points.

### Central-place foraging in ants and bees
Ants and bees repeatedly leave and return to a fixed nest or hive while foraging over a bounded area, a textbook case of wandering tethered to one central place.

### Human commuting patterns
People's daily movement, mobile-phone location data shows, tends to cluster around a small number of anchor points like home and work, with a bounded range of typical wandering around each.

### Territorial fish on a reef
A reef fish will patrol and forage over a patch of coral centred on its shelter, chasing off intruders near the centre but tolerating them at the edge of its settled range.
