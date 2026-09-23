---
title: 'Vicsek: order out of noise'
summary: 90 particles that only copy their neighbours' heading, plus a pinch of randomness, either march together or wander like gas — and the switch between the two is sudden.
parameters:
  r: interaction radius
  noise: noise
  t: step
variables:
  - interaction radius
  - noise amplitude
  - step
charts: []
---

## Try it

1. Press play at the default noise. The 90 particles drift with no clear common direction; the readout "order" sits well below 1.
2. Drag "noise" down toward zero. Within a few dozen steps the particles lock onto one shared heading and "order" climbs close to 1.
3. Drag "noise" up past three-quarters of its range instead. The particles never agree on anything, moving like gas molecules, and "order" stays near 0 however long you run it.

## Real-life examples

1. **Calm conditions, strong alignment.** Only 15° of random wobble each step: every particle keeps closely copying its neighbours, and the group quickly marches as one.
2. **A noisy, borderline crowd.** 90° of wobble, right around where this group's order breaks down: watch the picture for a while and the group drifts between loosely ordered and scattered.
3. **Chaotic conditions, no alignment.** 260° of wobble, more than a right angle in either direction every step: any agreement a particle reaches with its neighbours is undone before it can spread.

## Test yourself

1. Set the noise to 20° or below, so the group locks into a shared heading.
2. Set the noise to 240° or above, so the group never aligns at all.
3. Find a noise value between 60° and 110°, in the range where this group sits right on the edge between order and disorder.

## Intuition

Picture 90 midges over a pond, each one only doing two things every step: look at every other midge within the "interaction radius" circle around it, average their headings, then add a small random wobble of up to "noise" degrees before moving forward. No midge remembers the group's overall direction, and no midge is in charge.

At low noise the wobble is too small to undo the averaging, so once a patch of midges happens to agree, that agreement spreads outward until the whole swarm shares one heading — the readout "order" climbs toward 1. At high noise, the random wobble is bigger than whatever direction the averaging suggests, so any local agreement gets scrambled again before it can spread, and "order" stays near 0. Between those two extremes there is a noise level where the group can go either way, called the critical noise, and the group's behaviour there changes sharply rather than gradually.

## Formal

Each particle $i$ moves at a fixed speed. At every step its heading updates to $\theta_i(t+1) = \langle \theta_j(t)\rangle_{j \in \text{neighbours}} + \eta \xi_i$, where the average is over every particle within the interaction radius (including itself), $\eta$ is the noise amplitude and $\xi_i$ is drawn fresh each step from a uniform random range.

The order parameter is the length of the average heading vector, $\phi = \frac{1}{N}\left|\sum_i (\cos\theta_i, \sin\theta_i)\right|$, equal to 1 when every particle agrees and close to 0 when headings are spread randomly. Sweeping $\eta$ across the critical noise takes $\phi$ from near 1 down to near 0.

## Advanced

Tamás Vicsek and collaborators introduced this model in 1995 as the simplest system that shows a genuine order-disorder phase transition driven purely by noise, with no attraction or repulsion term at all — alignment alone is enough. Near the critical noise the order parameter's approach to zero, and the size of the largest ordered patch, follow power laws in the noise and in the particle density, the same mathematical signature seen in magnets losing their magnetism as they heat up.

## Derivation

1. Every particle looks at every other particle within the interaction radius and averages their headings, including its own.
2. A random value drawn from the noise amplitude is added to that average heading.
3. The particle moves one step forward in the resulting heading, and the whole population updates at once.

## Real world

### Bird flocks and fish schools
The Vicsek model was built to capture the essential physics of flocking with the fewest possible ingredients, and its order-disorder switch matches how real flocks and schools can suddenly become polarised or fall apart.

### Bacterial swarms
Colonies of swimming bacteria such as *Bacillus subtilis* show the same alignment-driven transition between swirling disorder and coordinated streaming as their density crosses a threshold.

### Active matter physics
Physicists use the Vicsek model as the founding example of "active matter" — particles that consume energy to move themselves — and study its phase transition to understand self-propelled systems from robot swarms to cell tissue.

### Traffic and pedestrian flow
Models of dense pedestrian or vehicle traffic borrow the same alignment-plus-noise idea to explain why a crowd can suddenly shift from disordered milling to a smoothly flowing lane.
