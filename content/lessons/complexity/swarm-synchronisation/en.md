---
title: Swarm synchronisation
summary: A flock that gathers in space and a crowd that claps in rhythm are the same trick, and here both happen to the same moving dots at once.
parameters:
  n: number of boids
  k: coupling strength
  step: generation
variables:
  - how many boids are moving and flashing on screen
  - how strongly nearby boids pull each other's phase into step
  - which generation of the flock you are watching
charts: []
---

## Try it

1. Set "coupling strength" near 0 and press play. The dots gather into a loose moving cluster, but their brightness flickers independently.
2. Raise "coupling strength" toward 1.2 and restart. Now the dots gather AND their brightness starts pulsing together.
3. Watch the "order" readout climb from near 0 toward 1 as the flock's phases line up, the same measure firefly-synchronisation used for flashes.

## Real-life examples

1. **A loose, unsynced cluster.** With coupling near 0, 18 boids still flock together in space, but their phases wander independently for the full 150 generations.
2. **A tight, rhythmic swarm.** With coupling at 0.6, the same 18 boids gather and their phases lock into one shared pulse well before generation 150.
3. **A big, strongly coupled flock.** 28 boids with coupling pushed to 1.2 reach a locked, pulsing flock by generation 100, even with more neighbours to agree with.

## Test yourself

1. Push coupling to 0.6 or higher and run to generation 100 or beyond. Watch the order readout approach 1.
2. Drop coupling below 0.1 and run to generation 100. The flock still gathers, but the order readout stays low.
3. Set the boids to 28 and coupling high enough to reach an order near 1 by generation 80.

## Intuition

Each dot is doing two things at once, using the same trick each time: look at your nearby neighbours, then move a little toward their centre and nudge your own rhythm a little toward theirs. Neither rule looks at the whole flock, only at whoever is close enough to see right now. Drag "coupling strength" up and you make that phase-nudging pull stronger without changing how hard the dots pull toward each other in space.

What is striking is that the two effects, gathering in space and locking in rhythm, feed each other. Once boids are close together they have more neighbours to sync with, and once they are synced their motion stays more predictable, which keeps them close. That is why the "order" readout climbs quickly once coupling crosses a threshold, instead of creeping up slowly the whole time.

## Formal

Boid $i$ has a position and a phase $\theta_i$ updated once per generation. Position moves toward the average position of neighbours within a fixed radius; phase follows the Kuramoto rule restricted to those same neighbours: $\dot\theta_i = \omega_i + \dfrac{K}{m_i}\sum_{j \in \text{neighbours}} \sin(\theta_j - \theta_i)$, where $m_i$ is how many neighbours boid $i$ currently has and $K$ is the coupling strength.

The order parameter $r = \left|\dfrac{1}{N}\sum_j e^{i\theta_j}\right|$ again measures how locked the phases are, exactly as in the firefly model, with $r \to 1$ once the whole flock pulses together and $r \approx 0$ while phases stay scattered.

## Advanced

Coupling only nearby neighbours instead of the whole population, as here, is closer to the real biology than a global Kuramoto model: it is a form of the Vicsek model with an added phase variable, and it couples the two order parameters, spatial cohesion and phase alignment, through the neighbour graph itself. Because that graph changes as the flock moves, the two transitions (flocking together, then locking phase) can happen at different coupling strengths depending on how the flock is arranged.

## Derivation

1. Every boid steers toward the average position of whichever neighbours are close enough right now.
2. That same set of neighbours also pulls the boid's own phase a little closer to theirs, exactly as fireflies nudge each other.
3. As the flock gathers, each boid gains more neighbours to sync with, so the two processes lock together into one moving, pulsing flock.

## Real world

### Starling murmurations
Starling flocks turn and ripple as one shape by each bird tracking only its handful of closest neighbours, gathering in space the same way this model's boids do.

### Cicada choruses
Some cicada species that start out calling at random gradually shift their calls into a shared rhythm as they gather in the same trees, coupling location and timing together.

### Synchronous traffic on a highway
Cars merging onto a busy highway settle into loosely spaced clusters that also drift into a shared following rhythm, once close enough to react to the cars right around them.

### Cardiac cell cultures
Heart-muscle cells grown together in a dish both migrate toward each other and synchronise their contractions, a lab version of exactly the two coupled processes shown here.
