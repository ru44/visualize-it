---
title: 'Couzin zones: swarm, mill or stream'
summary: The same fish, obeying the same three zones, either huddle in place, circle like a doughnut, or all dart the same way — depending on one radius.
parameters:
  rep: repulsion-zone radius
  orient: orientation-zone radius
  attract: attraction-zone radius
  t: step
variables:
  - repulsion-zone radius
  - orientation-zone radius
  - attraction-zone radius
  - step
charts: []
---

## Try it

1. Press play. With the orientation zone small, the 36 fish huddle into a loose, shapeless swarm that barely goes anywhere.
2. Raise "orientation-zone radius" to about a third of its range. The swarm reorganises into a rotating ring with an empty centre — a milling school.
3. Raise "orientation-zone radius" further, past half its range. The ring breaks open and the whole school now streams across the screen in one shared direction.

## Real-life examples

1. **A locust swarm milling in place.** A tiny orientation zone next to a wide attraction zone: each insect avoids its neighbours and drifts toward the group, but nothing makes it copy anyone's heading, so the swarm churns without going anywhere.
2. **A school forming a doughnut.** A modest orientation zone lets nearby fish copy each other locally, and with a wide attraction zone that local copying wraps around into a slowly rotating ring, empty in the middle.
3. **A school streaming from a threat.** A wide orientation zone next to a narrower attraction zone: heading now spreads through almost the whole group, and the school moves as one polarised stream, the shape sardines take when a predator approaches.

## Test yourself

1. Set a small orientation zone with a wide attraction zone, so the group swarms without a shared direction.
2. Set a middling orientation zone (between 3 and 5) with a wide attraction zone, so the group forms a rotating, doughnut-shaped school.
3. Push the orientation zone past 10, so the group streams as one polarised body.

## Intuition

Picture 36 fish, each reacting to three invisible circles around it, smallest to largest: the repulsion zone (too close, so swim away), the orientation zone (nearby, so match its heading), and the attraction zone (further out, so swim toward it). Any fish inside the repulsion zone wins outright, because avoiding a collision matters more than anything else. Otherwise, a fish averages whatever the orientation and attraction zones ask for and turns a little that way.

The readout "order" reads near 0 for the shapeless swarm and the rotating doughnut alike, because in both a fish's neighbours point every which way on average. Only once "orientation-zone radius" grows large enough that most of the group falls inside it does "order" climb toward 1, which is the moment the doughnut breaks open and the school streams off in one direction. Iain Couzin ran exactly this experiment on real fish and locusts in 2002 and found the same three outcomes from the same one dial.

## Formal

Each fish keeps three zones of radius $r$, ordered $\text{repulsion} < \text{orientation} < \text{attraction}$. Any neighbour inside the repulsion zone sets the desired heading directly away from it; failing that, the fish averages the heading of neighbours in the orientation zone with the direction toward neighbours in the attraction zone, then turns toward that average by a limited angle each step.

Sweeping the orientation-zone radius alone, with the other two zones fixed, takes the group through three regimes: swarm (both order measures low), torus or "mill" (the group forms a ring, still with low net heading order), and dynamic parallel group (heading order near 1, the whole group polarised).

## Advanced

Couzin, Krause, James and Ruxton (2002) showed this three-zone rule reproduces the main collective states seen across real animal groups — fish schools, bird flocks, insect swarms — from one underlying mechanism, without any individual needing to sense the group's overall shape. The transitions between swarm, torus and polarised states behave like a phase transition: small changes in the orientation-zone radius near the boundary between regimes produce large, sudden changes in the group's measured order.

## Derivation

1. Any fish inside the repulsion zone makes this fish turn straight away from it, overriding everything else.
2. With no repulsion triggered, this fish averages the heading of every fish inside the orientation zone.
3. It also averages the direction toward every fish inside the attraction zone, blends that with the orientation average, and turns toward the result.

## Real world

### Fish schools
Real schools of fish measurably shift between milling and polarised swimming, matching what this same zone model predicts as local sensing ranges change with lighting, density or fear.

### Locust and insect swarms
Couzin's original zone model was built to explain how marching locust bands switch between disordered milling and coordinated marching, a switch tied to real outbreaks of locust plagues.

### Search and rescue robotics
Robot swarms built from Couzin-style zones can be tuned from a wide search pattern (swarm) to a coordinated sweep (polarised group) by adjusting one sensing radius, without reprogramming any individual robot.

### Crowd safety
Models of pedestrian crowds borrow the same repel-orient-attract structure to predict when a crowd stays loosely spread versus when it locks into a single moving current, relevant to crowd-crush prevention.
