---
title: 'Ising model: how magnets agree with their neighbours'
summary: Every atom in a magnet only checks its neighbours, yet below one exact temperature the whole block snaps into agreement, and above it the agreement falls apart.
parameters:
  temperature: temperature
  step: sweep
variables:
  - how strongly a spin wants to match its neighbours
  - a spin, pointing up or down
  - the net magnetization, the average of every spin
charts: []
---

## Try it

1. Watch the grid. Nobody moves the coloured squares directly — each one only compares itself with its four neighbours.
2. Drag "sweep" forward while "temperature" is low, around 1.5. The grid settles toward one solid colour: every spin copied its neighbours.
3. Now raise "temperature" past about 2.3 and sweep again. The single colour breaks into a scramble of small patches, and the magnet loses its pull.

## Real-life examples

1. **A cold fridge magnet.** Well below its Curie point the atomic spins copy their neighbours, and the whole block acts like one magnet.
2. **Right at the Curie point.** Iron loses its permanent magnetism near 770°C; at that exact temperature the pattern keeps forming and breaking apart.
3. **An overheated magnet.** Above the Curie point, heat jostles each spin faster than its neighbours can pull it into line, and the block keeps no memory of a direction.

## Test yourself

1. Cool the grid below temperature 2 and sweep to at least 100. Watch it settle toward one colour.
2. Heat it above 3 and sweep to at least 60. Watch the single colour scramble apart.
3. Set the temperature close to 2.27, the Curie point of this grid, and sweep to 150. The picture should look caught between order and chaos.

## Intuition

Picture 960 tiny compass needles arranged in a grid, each one only able to point up or down. Every needle would rather point the same way as the four needles next to it, because matching a neighbour costs less energy than fighting it. If the grid starts cold, a needle that disagrees with its neighbours is expensive to keep, so needles flip until huge patches point the same way — eventually the whole grid, one giant magnet built from nothing but a rule about neighbours.

Heat ruins this cooperation. At every step a warm grid lets a needle flip against the odds, the way a coin sometimes lands on its edge, and the hotter it gets the more often that happens. Past one sharp temperature — the Curie point — random flips outrun the pull of neighbours, and the big patches shred into a scramble that never settles down. Nobody designed a switch, yet the whole grid still has one.

## Formal

The grid has energy $E = -J \sum_{\text{neighbours}} s_i s_j$, summed over every pair of touching spins, where each $s_i = \pm 1$. Flipping spin $i$ costs $\Delta E = 2 J s_i \sum_{\text{neighbours}} s_j$.

The simulation applies the Metropolis rule: always flip when $\Delta E < 0$, and otherwise flip with probability $P(\text{flip}) = \min\left(1, e^{-\Delta E / T}\right)$. Averaged over the grid this reproduces the magnetization $M = \frac{1}{N}\sum_{i=1}^{N} s_i$ at temperature $T$.

## Advanced

Lars Onsager solved the two-dimensional Ising model exactly in 1944 and found the transition at $T_c = 2J / \big(k_B \ln(1+\sqrt2)\big) \approx 2.269\,J/k_B$, matching the number this grid settles near. Close to $T_c$, quantities such as the magnetization follow power laws with exponents that many unrelated physical systems share, a fact called universality: the Ising model describes not just magnets but any system of many parts each trying to match its neighbours.

## Derivation

1. Flipping one spin changes the energy by twice its coupling to its neighbours, because the sign of that one term reverses.
2. The Metropolis rule always accepts a flip that lowers energy, and accepts an energy-raising flip only with a probability that shrinks as temperature falls.
3. Averaging every spin over the whole grid gives the magnetization, the single number that tells you whether the grid is one magnet or a scramble.

## Real world

### Refrigerator magnets and transformer cores
Real ferromagnets are three-dimensional versions of this same rule, and every one has its own Curie point above which it stops being magnetic.

### Reading rocks for the planet's history
Some minerals freeze in their spin direction as lava cools past its Curie point, so geologists read ancient rock layers like a fossil compass.

### Hopfield networks
Early neural networks stored memories as low-energy spin patterns of an Ising-like grid, retrieving a whole memory from a partial cue by letting the spins settle.

### Modelling opinions and crowds
The same neighbour-copying rule, with "spin" standing for an opinion instead of a magnetic direction, models how crowds swing between agreement and split decisions.
