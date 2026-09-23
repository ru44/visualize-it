---
title: Firefly synchronisation
summary: Thousands of fireflies flash on their own private clocks, and yet within a few minutes the whole tree blinks as one.
parameters:
  n: number of fireflies
  k: coupling strength
  step: generation
variables:
  - how many fireflies are on screen, each with its own natural rhythm
  - how strongly a flash you see nudges your own clock forward
  - which generation of flashes you are looking at right now
charts: []
---

## Try it

1. Set "coupling strength" near 0 and press play. Every dot pulses at its own pace; the field stays a flicker of unrelated dots.
2. Now raise "coupling strength" to about 0.6 and restart. Within a few dozen generations the dots start brightening together.
3. Watch the "sync" readout. It starts near 0 (nobody agrees) and climbs toward 1 as the flashes line up.

## Real-life examples

1. **A quiet tree.** With coupling near 0, fireflies barely notice each other: 24 fireflies flash in a random scatter for the whole 150 generations.
2. **The famous synchronous trees of Southeast Asia.** With strong coupling (0.6) among 24 fireflies, the field locks into one shared flash well before generation 150.
3. **A small, tightly linked group.** Twelve fireflies with very strong coupling (0.9) sync within about 60 generations, faster than a larger, looser group.

## Test yourself

1. Push the coupling strength to 0.6 or higher and run to generation 100 or beyond. Watch the sync readout approach 1.
2. Drop the coupling below 0.1 and run to generation 100. The sync readout stays low no matter how long you wait.
3. Set the fireflies to 12 and run to at least generation 50, with coupling high enough to see them lock together quickly.

## Intuition

Picture a firefly with its own tiny internal clock, ticking up from 0 to a full turn before it flashes and resets. Left alone, every firefly's clock runs at a slightly different speed, so the flashes stay scattered forever. Now give each firefly one rule: when it sees a nearby flash, nudge your own clock forward a little, toward that flash. Drag "coupling strength" up and you are turning up how hard that nudge pulls.

Nobody is in charge and no firefly can see the whole field, only its neighbours' flashes. Yet a strong enough nudge is self-reinforcing: the more fireflies that flash together, the harder the pull on the stragglers, and the sync readout climbs from near 0 toward 1 as if on cue. This is the same trick your heart's own pacemaker cells use to beat as one.

## Formal

Each firefly $i$ carries a phase $\theta_i$ that increases steadily and wraps at $2\pi$; a flash happens whenever $\theta_i$ crosses $2\pi$. Coupling nudges each phase toward the others: $\dot\theta_i = \omega_i + \dfrac{K}{N}\sum_j \sin(\theta_j - \theta_i)$, the Kuramoto model, where $K$ is the coupling strength and $N$ the number of fireflies.

The order parameter $r = \left|\dfrac{1}{N}\sum_j e^{i\theta_j}\right|$ measures how bunched the phases are: $r \approx 0$ when they are spread evenly around the circle, and $r \to 1$ once every phase sits at nearly the same point, which is exactly the "sync" readout shown under the picture.

## Advanced

Kuramoto showed that this system has a sharp coupling threshold $K_c$, set by how spread out the natural rates $\omega_i$ are: below $K_c$ the incoherent state ($r \approx 0$) is stable, and above it a synchronised cluster grows and eventually locks the whole population, with $r$ rising continuously from 0 near the threshold. The same mathematics describes power-grid generators staying in step and neurons firing together.

## Derivation

1. Every firefly's internal clock advances at its own fixed rate between flashes, so left alone the flashes stay scattered.
2. Seeing a nearby flash adds a small forward nudge to your own clock, proportional to how far behind you are in the cycle.
3. Once enough fireflies nudge each other on the same rough schedule, the nudges reinforce instead of cancel, and the whole field's flashes converge onto one tick.

## Real world

### Southeast Asian firefly trees
Certain species of firefly along Southeast Asian riverbanks gather by the thousand and flash in near-perfect unison after dusk, a phenomenon travellers have documented for centuries.

### Heart pacemaker cells
The sinoatrial node's thousands of individual pacemaker cells each tick on their own, but electrical coupling between neighbours locks them into one shared rhythm that drives every heartbeat.

### Power grids
Generators feeding the same electrical grid must spin in phase with each other; the coupling between them through the shared network keeps them locked together the same way coupled fireflies lock their flashes.

### Applause turning into rhythmic clapping
An audience clapping at random rates sometimes drifts, entirely without anyone leading it, into one shared clapping rhythm once enough people can hear and match their neighbours.
