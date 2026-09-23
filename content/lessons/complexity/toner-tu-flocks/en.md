---
title: Flocks as a fluid
summary: Instead of tracking every animal in a flock one by one, track a density and a flow at every point, the way weather forecasters track air instead of every single molecule.
parameters:
  diffusion: neighbour matching
  pressure: crowding push
  step: generation
variables:
  - how strongly each cell's flow matches its neighbours
  - how hard crowding pushes flock away from dense cells
  - which generation of the flowing ring you are watching
charts: []
---

## Try it

1. Set "crowding push" near 0 and press play. The starting ripple in density barely moves; cells mostly just settle toward their own preferred flow.
2. Raise "crowding push" to about 0.8 and restart. Now a visible band of higher density travels steadily around the ring instead of sitting still.
3. Watch the "density wave size" readout: it stays small with weak crowding push and grows once crowding is strong enough to drive a real travelling wave.

## Real-life examples

1. **No travelling wave.** With crowding push almost off (0.1) and moderate neighbour matching, the ring's density stays close to flat for all 200 generations.
2. **A clear travelling wave.** With crowding push at 0.8 and the same neighbour matching, a density band forms and keeps travelling around the ring for the full 200 generations.
3. **Strong matching, strong crowding.** Pushing neighbour matching to 1.6 alongside strong crowding (0.8) settles into a smoother, faster-travelling wave by generation 120.

## Test yourself

1. Set "crowding push" below 0.2 and run to generation 150 or beyond. The density stays nearly flat; no real wave forms.
2. Set "crowding push" to 0.6 or higher and run to generation 150. A travelling density wave should be clearly visible circling the ring.
3. Set "neighbour matching" to about 1.6 and run to at least generation 100, and compare how much smoother the wave looks.

## Intuition

Forget individual animals for a moment. Instead, picture the flock as a ring of connected cells, each one holding a density (how crowded that patch is) and a flow (how fast and in which direction that patch is moving). Three simple rules run at every cell: settle your flow toward one preferred speed, match your flow to your neighbours', and get pushed away from cells that are more crowded than you. Drag "neighbour matching" and you strengthen the second rule; drag "crowding push" and you strengthen the third.

None of those three rules mentions waves, yet together they produce one. A cell that is slightly denser pushes flock into its neighbours through crowding, which in turn changes those neighbours' density, which pushes their neighbours, and so on around the ring. The result is not the density just spreading out and flattening, the way heat diffuses; it is a genuine travelling wave, a band of extra density that keeps moving around the ring instead of dying away, because the underlying flock keeps moving through it.

## Formal

Let $\rho(x,t)$ be the local density and $v(x,t)$ the local flow speed along the ring. Flow obeys $\dfrac{\partial v}{\partial t} = D\dfrac{\partial^2 v}{\partial x^2} + (v_0^2 - v^2)v - P\dfrac{\partial \rho}{\partial x}$: a diffusion term with strength $D$ (neighbour matching), a relaxation toward a preferred speed $v_0$, and a pressure term with strength $P$ (crowding push) that pushes flow away from denser regions.

Density simply follows the flock that carries it, through the continuity equation $\dfrac{\partial \rho}{\partial t} + \dfrac{\partial (\rho v)}{\partial x} = 0$: density rises wherever more flock flows in than flows out. Combined with the pressure term above, a small density bump does not just flatten out, it propagates, which is exactly the travelling band the "density wave size" readout tracks.

## Advanced

This is a one-dimensional cut of the Toner–Tu theory, the continuum hydrodynamic description of flocking. Its key discovery is that ordinary fluid intuition breaks down for a flock: because there is a preferred flow direction (the term relaxing $v$ toward $v_0$), sound-like density waves can travel even in a compressible, noisy, disordered active fluid where an ordinary equilibrium fluid at the same density and noise level would have no long-range order at all, a result now called "giant number fluctuations" in real flocking data.

## Derivation

1. Every cell's flow relaxes on its own toward one preferred speed, independent of its neighbours.
2. Neighbouring cells also smooth their flow together, while a denser cell pushes its flow into less crowded neighbours.
3. Because density simply follows wherever the flow carries it, a small starting ripple in density does not flatten out but keeps travelling around the ring as a wave.

## Real world

### Locust and starling density waves
Dense insect swarms and bird flocks show travelling bands of higher density moving through them, the same phenomenon field biologists model with fluid equations rather than tracking every animal.

### Traffic jam waves on a highway
A dense patch of slow-moving cars on a highway does not stay put; it propagates backward through the traffic as a "phantom" jam wave, a mechanical cousin of the flocking wave here.

### Bacterial swarms
Dense colonies of swimming bacteria on a plate show travelling density and flow patterns that active-matter physicists describe with the same continuum equations used for animal flocks.

### Pedestrian crowd surges
Very dense crowds moving through a corridor can develop travelling "stop-and-go" waves of crowding, studied with fluid-like crowd models for exactly the safety reasons this lesson's maths explains.
