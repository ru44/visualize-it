---
title: Predator–prey cycles (Lotka–Volterra)
summary: >-
  Foxes and rabbits, or lynx and hares: two populations locked in a cycle, each
  driving the other’s rise and fall.
parameters:
  a: a — prey birth rate
  b: b — predation rate
  c: c — efficiency turning prey into predators
  d: d — predator death rate
  x0: x₀ — starting prey
  y0: y₀ — starting predators
  tView: time marker
variables:
  - prey population (e.g. rabbits)
  - predator population (e.g. foxes)
  - 'prey birth rate, unchecked by predators'
  - predation rate — how often an encounter removes a prey
  - efficiency — the share of eaten prey converted into new predators
  - 'predator death rate, unchecked by prey'
---

## Try it

1. Watch prey rise first, while predators are still scarce.
2. Watch predators rise next as food (prey) becomes abundant — then watch prey crash.
3. Watch predators starve and decline as prey grows scarce, letting prey recover — and the cycle repeats.

## Real-life examples

- **Lynx and snowshoe hare.** A slow, classic cycle (birth rate a = 0.6, predation rate b = 0.02) starting from 40 hares and 9 lynx, matching the decade-long boom-and-bust seen in real fur-trading records.
- **A fast-cycling pest and its predator.** High rates all round (a = 1.5, b = 0.15) starting from 30 pests and 10 predators produce a much quicker boom-and-bust cycle.
- **Wolves and a large deer herd.** A slow predator decline (d = 0.2) starting from 50 deer and 15 wolves stretches the cycle into a long, gentle swing.

## Test yourself

1. Set the predator equilibrium level (a divided by b) to 20.
2. Set the prey equilibrium level (d divided by c times b) to 50.
3. Start with four times as many prey as predators.

## Intuition

Watch the two curves chase each other: prey rises first (few predators to stop it), then predators rise as food is abundant, which crashes the prey, which then starves the predators, letting prey recover — around and around. Drag b up and predators catch prey more easily: the prey peak falls and the cycle speeds up.

Raise d and predators die off faster whenever prey is scarce, deepening their troughs; raise a and prey rebounds faster, making the peaks taller. Neither population settles at a fixed size here — they orbit around the equilibrium point $(\text{prey},\text{pred}) = (d/(cb),\, a/b)$ forever, in a closed loop whose size depends on where you start.

## Formal

The equilibrium $(\text{prey}^*,\text{pred}^*) = (d/(cb),\, a/b)$ is where both derivatives vanish; nearby trajectories orbit it in closed cycles rather than spiralling in or out.

The quantity $V = cb\,\text{prey} - d\ln(\text{prey}) + b\,\text{pred} - a\ln(\text{pred})$ is conserved along solutions, which is why the cycles neither grow nor shrink over time.

## Advanced

Because Lotka–Volterra cycles are only neutrally stable (conserved, not attracting), real ecosystems — with added self-limitation such as a carrying capacity on the prey — instead spiral toward a fixed point or a limit cycle; the pure model is the idealised starting case every richer predator–prey model is checked against.

## Derivation

1. Set both derivatives to zero to find the equilibrium populations.
2. From the first equation: at equilibrium, predators sit at $a/b$.
3. From the second equation: at equilibrium, prey sit at $d/(cb)$ — each population’s steady level is set by the other’s parameters.

## Real world

### Lynx and snowshoe hare
Hudson’s Bay Company fur-trading records (1845–1935) show an almost decade-long lynx–hare cycle matching this model closely.

### Fisheries
Vito Volterra devised the model to explain why predatory fish catches rose in the Adriatic when fishing paused during World War I.

### Pest control
Introducing a natural predator to control a pest can itself oscillate for years before settling down.

### Immune response
A similar cycle appears between a pathogen population and the immune cells that hunt it.
