---
title: 'Wisdom of the crowd'
summary: Every follower's own guess at the right direction is badly wrong, yet the group's shared direction lands close to the truth, and gets more reliable the bigger the group.
parameters:
  n: group size
  individualNoise: individual error
  t: step
variables:
  - group size
  - individual error
  - step
charts: []
---

## Try it

1. Press play with the default 40 followers. Watch the green arrow (each follower's guess) point every which way while the orange arrow (the group average) settles fairly close to the true direction shown in the corner.
2. Drag "group size" down to about 6. The group arrow now wanders and can drift far from the true direction for long stretches — a small crowd is not reliable.
3. Drag "group size" up past 150 instead. However long you watch, the group arrow stays close to the true direction almost the whole time, even though individual followers are exactly as wrong as before.

## Real-life examples

1. **Six people guessing.** Six followers, each off by up to 70° on average: the group's shared guess can still end up badly wrong, because there are too few opinions for the errors to cancel out.
2. **Forty people guessing.** The same 70° of individual error, but 40 opinions to average: the group's shared direction usually lands within a few degrees of the truth.
3. **A crowd of 180.** The same 70° of individual error spread over 180 followers: the group's shared direction reliably lands within a degree or two of the truth, session after session.

## Test yourself

1. Set the group to 8 followers or fewer, small enough that the group's shared answer can still miss badly.
2. Set the group to 150 followers or more, large enough that the group's shared answer is reliably accurate.
3. Combine very noisy individuals (individual error at least 150°, barely better than a random guess) with a large group of at least 150, and see that the group still lands close to the truth.

## Intuition

A true direction is fixed but hidden (shown here as the green arrow, only for you to check against). Every follower gets one noisy, private look at it — some guess too far clockwise, some too far anticlockwise, and no follower's own guess (the small triangles) ever gets noticeably better no matter how long you run the simulation. Watch the readout "average follower's error": it stays roughly the same size whether the group has 6 members or 180.

What changes with group size is the orange arrow, the group's shared direction, found only from followers copying whatever their nearby neighbours currently believe — nobody tallies votes centrally. With few followers, a run of unlucky private guesses can drag the whole group off course, because there are not enough independent opinions to cancel each other out. With many followers, the same-sized individual mistakes point in every direction roughly equally often, so they mostly cancel, and the group's shared direction lands close to the truth almost every time — the readout "group's error" shrinks as "group size" grows, while "average follower's error" does not.

## Formal

Each follower $i$ holds a noisy estimate of a fixed true heading $\theta^*$, refreshed each step as $\theta^* + \varepsilon_i$ with $\varepsilon_i$ drawn independently from a fixed noise range. Followers only exchange information locally, blending their own noisy estimate with the current heading of nearby neighbours; no follower ever sees $\theta^*$ or the group average directly.

If the $\varepsilon_i$ were fully independent and averaged directly, the group mean's error would shrink roughly as $1/\sqrt{N}$ for $N$ followers, the classic wisdom-of-crowds rate: quadrupling the group only halves the group's typical error. The local, neighbour-only averaging simulated here reaches a similar outcome without any central tally, purely by repeated local contact.

## Advanced

This is the mechanism behind Francis Galton's 1907 finding that a fairground crowd's median guess at an ox's weight beat every individual expert guess, and behind honeybee swarms choosing a new nest site: many scouts independently and imperfectly assess candidate sites, recruit nearby bees to their favourite by dancing, and the colony reliably picks a good site even though no bee ever compares all the candidates itself. The requirement that makes this work is that individual errors be reasonably independent; once followers only copy each other and stop consulting their own private evidence, the group can lock onto a wrong answer just as confidently as a right one.

## Derivation

1. Every follower draws its own private, noisy estimate of the true direction, independent of everyone else's.
2. Each follower blends that private estimate with the current heading of whichever neighbours happen to be nearby, with no central vote count anywhere.
3. Because the private errors point in every direction roughly equally often, they cancel more completely as more followers are averaged together, so the group's shared direction ends up closer to the truth than almost any individual's.

## Real world

### Estimation markets and polling
Prediction markets and large surveys rely on exactly this effect: individually noisy forecasters, averaged in large enough numbers, regularly outperform any single expert.

### Honeybee nest-site selection
Scout bees independently assess candidate nest sites and recruit others by dancing; the swarm reliably converges on a good site through this same local, no-leader averaging.

### Ant trail formation
Ants laying and following pheromone trails each make noisy individual choices, yet the colony as a whole reliably finds short paths to food, because trail strength averages out individual wandering.

### Distributed sensor networks
Environmental and traffic-sensing networks combine many cheap, individually inaccurate sensors, because averaging many independent readings gives a far more reliable estimate than trusting any one sensor.
