---
title: Crowd flow, lanes and doorway clogs
summary: Nobody plans it, but walkers crossing each other's path sort themselves into lanes, and a narrow doorway can turn a smooth crowd into a solid queue.
parameters:
  gap: doorway gap
  n: number of walkers
  t: time
variables:
  - g
  - n
charts: []
---

## Try it

1. Press play with a wide "doorway gap". Blue and orange walkers cross a wide-open doorway with barely a pause, and a few faint lanes appear where the two colours pass each other.
2. Narrow the gap to about 0.35 and restart. Walkers now bunch up in front of the wall before squeezing through one small opening at a time.
3. Push "number of walkers" up while keeping the gap narrow. "Queued at the door" climbs fast: more people compete for the same small opening.

## Real-life examples

1. **A wide-open doorway.** With the gap almost fully open and 30 walkers, the crowd barely slows down passing through.
2. **A standard doorway.** At a gap of 0.35, the same 30 walkers form a visible queue before squeezing through.
3. **A packed evacuation.** With the gap narrowed to 0.2 and 45 walkers, the queue builds fast and stays large for a long time.

## Test yourself

1. Open the doorway gap to at least 0.8 and let the crowd cross for at least 40 steps.
2. Narrow the gap to 0.25 or less with at least 40 walkers, and run for at least 60 steps.
3. Push the number of walkers to about 45 and run for at least 80 steps.

## Intuition

Picture a corridor with people walking one way in blue and the other way in orange, all heading toward a wall with a single gap in it. Nobody is told to form a line: each walker just wants to keep moving forward and to step a little sideways whenever someone else gets close, stepping further aside from a walker coming the other way than from one going the same way as them. Watch closely and the crowd quietly splits into lanes, blue mostly on one side and orange on the other, purely from everyone avoiding their neighbours.

Now watch what happens at the wall. When the gap is wide, walkers barely notice it and pass straight through. Narrow it, and walkers arriving at the wall outside the gap can't get through, so they pile up and drift sideways until they find the opening, exactly the crowding you feel trying to squeeze through a single open door while a queue builds behind you. No walker decided to queue; queuing is just what happens when many people try to fit through one gap at once.

## Formal

Each walker has a preferred direction and steers away from any other walker within a short radius, with a stronger push away from a walker heading the opposite way than one heading the same way, which is enough for lanes to form spontaneously. A wall blocks any walker whose path would cross it outside a gap of width $g$.

Because only walkers inside that gap's height can pass, the rate at which people get through is limited by $g$, not by how many people want to cross: $g \downarrow \Rightarrow$ the crowd backs up at the doorway.

## Advanced

Lane formation and doorway clogging both come from the same short-range avoidance rule, no walker is told to form a lane or a queue, and both are studied with the same social-force models used in real evacuation engineering. Past a critical density near a narrow exit, models like this one reproduce "faster is slower": walkers pushing harder to get through actually reduce the flow rate, because crowding near the gap increases collisions and stalls, a counter-intuitive result confirmed in real crowd studies and a reason evacuation design favours multiple wide exits over one large one.

## Derivation

1. Every walker steers toward its own destination but away from any other walker within a short radius, more strongly away from one heading the opposite way, which is what lets lanes form.
2. A wall stands across the corridor except for a gap of width $g$, and only walkers lined up with that gap can pass through it.
3. As $g$ shrinks, fewer walkers fit through per step while just as many keep arriving, so a queue grows in front of the wall.

## Real world

### Building evacuation
Fire codes require minimum door and corridor widths precisely because a narrow exit becomes the bottleneck for an entire evacuating crowd, however fast people can walk.

### Subway platforms and turnstiles
The same queuing pattern appears at ticket gates and platform doors, where a wide entry rarely causes a backup but a narrow one reliably does at rush hour.

### Stadium and concert exits
Venues design multiple wide exits instead of one grand one because splitting a crowd across several adequate gaps clears people faster than funnelling everyone through a single wide one.

### Traffic merges
The same clog-at-a-bottleneck pattern shows up when lanes of cars merge into fewer lanes: the merge point, not the open road, sets how fast traffic actually moves.
