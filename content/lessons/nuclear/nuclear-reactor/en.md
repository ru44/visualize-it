---
title: 'Nuclear reactor: from splitting atoms to electricity'
summary: A reactor holds its own chain reaction on a knife's edge by trading two knobs against each other — control rods that soak up spare neutrons and a moderator that slows the rest down enough to be caught — turning a steady trickle of fissions into steam, a spinning turbine, and about 1 GW of electricity from a single large plant.
parameters:
  rods: control rod depth
  moderator: moderator amount
variables:
  - how far the control rods are pushed into the core, from 0 (fully out) to 1 (fully in)
  - how much moderator is present to slow neutrons down, from 0 (none) to 1 (full)
  - the plant's full rated power with nothing holding it back — about 1000 MW electric for a large reactor
charts: []
---

## Try it

1. Watch the red control rods and the blue water level inside the core, and the turbine spinning on the right.
2. Drag "control rod depth" up. The rods slide deeper into the core, and the power output and the turbine slow down.
3. Now drag "moderator amount" down toward zero instead. Even with the rods fully out, power collapses — without a moderator the chain reaction barely runs at all.

## Real-life examples

1. **Normal operation.** Rods 25% in, moderator full: the reactor settles at 75% of rated power, about 750 MW electric.
2. **An emergency shutdown (SCRAM).** Rods driven fully in cut power to zero almost immediately, whatever the moderator is doing.
3. **Rods fully withdrawn.** With the rods all the way out and the moderator full, the plant runs at its full rated 1000 MW.

## Test yourself

1. Find a rod depth and moderator amount that settle the plant at 75% power, about 750 MW.
2. Drive the control rods all the way in and confirm the reactor shuts down completely.
3. Get the plant above 90% of rated power.

## Intuition

Think of the reactor core as a room full of uranium-235 nuclei waiting for a slow neutron to wander close enough to be absorbed. Freshly released neutrons come out fast, far too fast to be caught efficiently, so the core is packed with a moderator — ordinary water, in most plants — whose only job is to slow them down through repeated collisions, the way a ball loses speed bouncing down a flight of stairs. Drag "moderator amount" toward zero and watch the power output collapse even with the control rods fully withdrawn: without something to slow the neutrons, hardly any of them get caught in time.

The control rods do the opposite job on purpose: they are built from materials that gulp down neutrons without doing anything useful with them, so sliding them deeper into the core removes neutrons from the chain reaction on demand. An operator does not run the plant at full power all the time; pulling the rods partway out and choosing how much moderator surrounds the fuel lets them dial the power to whatever level the electrical grid needs, and the reading on screen settles to that new level over a few seconds, the same way a real plant's power eases into a new setting rather than jumping instantly.

## Formal

With the control rods inserted to a depth fraction $d$ (0 fully out, 1 fully in) and a moderator fraction $m$ (0 none, 1 full) present, the plant's power settles near $P = (1-d)\,m\,P_0$, where $P_0$ is its full rated output.

Both extremes make physical sense: at $d = 1$ the rods absorb enough neutrons that $P = 0$ regardless of $m$, which is exactly how an emergency shutdown works, while at $d = 0$ and $m = 1$ nothing is holding the reaction back and $P$ reaches its rated maximum $P_0$.

## Advanced

Real power reactors run on low-enriched fuel, typically about 3 to 5 percent uranium-235 mixed with uranium-238 (natural uranium is only about 0.7 percent U-235), enough to sustain a chain reaction with a good moderator but far short of the roughly 90 percent enrichment a weapon would need; this bilinear model is a teaching simplification, since a real plant's power also depends on fuel burnup, xenon poisoning after a power change, and temperature feedback, all of which real control systems must account for on top of simple rod and moderator position.

## Derivation

1. With the rods fully out ($d=0$) and the moderator full ($m=1$), nothing is holding the reaction back, so power reaches its rated maximum, $P_0$.
2. With the rods fully in ($d=1$), they absorb enough neutrons to stop the chain reaction, so power drops to zero no matter how much moderator is present.
3. Between those extremes, power scales with both the fraction of rod left out and the fraction of moderator present: $P = (1-d)\,m\,P_0$.

## Real world

### Pressurized water reactors
Most power reactors use ordinary water as both coolant and moderator, so losing coolant also removes the moderator — a safety feature, since the chain reaction then weakens on its own.

### Load following
Some plants adjust their control rods through the day to match power output to demand, dropping output overnight when the grid needs less electricity.

### Xenon poisoning
A fission product, xenon-135, itself soaks up neutrons and briefly makes a reactor harder to restart shortly after a power change, an effect operators must plan around.

### Chernobyl and Fukushima
Both disasters trace back to the same core knobs shown here: at Chernobyl a moderator design flaw let power surge instead of settle, and at Fukushima the loss of cooling, not the chain reaction itself, released the fission products' stored heat.
