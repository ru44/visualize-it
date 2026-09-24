---
title: The chart of nuclides
summary: >-
  Plot every possible nucleus by its protons and neutrons and the stable ones
  trace a single bending band, the valley of stability, with iron sitting at
  its most tightly bound point.
parameters:
  Z: protons Z
  N: neutrons N
variables:
  - the nuclide's total binding energy — the energy needed to break it apart into separate protons and neutrons, in MeV
  - the mass number, Z + N
  - the number of protons
  - the number of neutrons
  - one of four fitting constants measured from real nuclei (aV ≈ 15.8, aS ≈ 18.3, aC ≈ 0.714, aA ≈ 23.2 MeV)
charts: []
---

## Try it

1. Start at iron-56 (Z = 26, N = 30): the big dot sits right on the green band, the most tightly bound ordinary nucleus there is.
2. Drag "neutrons N" up past 40 while Z stays at 26. The dot climbs off the band and turns the colour for "too many neutrons" — a real nucleus there sheds a neutron's worth of charge by β⁻ decay.
3. Now drag "protons Z" down toward 1 while N stays high. You're tracing the top edge of the chart, far from any known stable isotope.

## Real-life examples

1. **Iron-56.** Sitting almost exactly at the peak of the binding-energy curve, which is why fusion stops releasing energy once a star's core turns to iron.
2. **Carbon-14.** Two neutrons above carbon's stable band, slowly decaying by β⁻ — the clock archaeologists read to date old bones.
3. **Carbon-10.** Two neutrons below carbon's stable band, a lab-made, proton-rich isotope that decays by emitting a positron (β⁺).

## Test yourself

1. Build a nucleus with at least 11 more neutrons than protons.
2. Build iron-56 itself, Z = 26 and N = 30.
3. Find a (Z, N) whose binding energy per nucleon comes within half an MeV of the real peak, about 8.8 MeV.

## Intuition

Every dot on this chart is one possible nucleus, plotted by how many protons it has across and how many neutrons it has up. Drag both sliders together along the green band and you're walking through real elements one at a time, always staying close to a nucleus that actually exists in nature. Step off the band in either direction, though, and the big dot changes colour: it has strayed into a mix too lopsided to hold together forever.

The band itself bends upward and to the right rather than following the dashed N = Z line, because every proton you add pushes every other proton away a little harder, while neutrons only add attraction to their neighbours. Heavier stable nuclei fight that growing repulsion by carrying extra neutrons — by calcium, Z = 20, the stable band already needs a couple more neutrons than protons just to hold together.

## Formal

The semi-empirical mass formula estimates a nucleus's total binding energy $B$ from four competing effects: a bulk attraction that grows with $A$, a surface penalty for nucleons with fewer neighbours, the Coulomb repulsion between every pair of protons, and a penalty for having very different numbers of protons $Z$ and neutrons $N$, each weighted by a constant $a$ fitted to real nuclei.

Dividing by $A$ gives binding energy per nucleon, $\frac{B}{A} = a_V - a_S A^{-1/3} - a_C \frac{Z(Z-1)}{A^{4/3}} - a_A \frac{(N-Z)^2}{A^2}$, exactly the height plotted in the 3D scene: it climbs to about 8.8 MeV near iron-56 and falls away on every side, including toward the roughly 200 MeV released when a uranium-235 nucleus splits into two far more tightly bound fragments.

## Advanced

A fifth term, a pairing energy of roughly ±12 divided by the square root of $A$ MeV, nudges even-even nuclei (both Z and N even) a little more tightly bound and odd-odd nuclei a little less, which is why almost every stable nuclide has an even proton or neutron count — deuterium (hydrogen-2), lithium-6, boron-10 and nitrogen-14 are four of only five stable odd-odd nuclides in all of nature.

## Derivation

1. Every nucleon attracts its near neighbours about equally, so a bulk volume term makes the binding energy grow directly with A, the way the volume of a drop of liquid grows with how much liquid it holds.
2. Nucleons on the surface have fewer neighbours to bind to, and every proton repels every other proton, so a surface penalty and a Coulomb penalty both subtract from that bulk term, along with a penalty for having far more neutrons than protons or the other way round.
3. Dividing the whole binding energy by A turns it into binding energy per nucleon, the number that actually measures how tightly a nucleus is held together, whatever its size.

## Real world

### Where iron comes from
Nuclear fusion in a star's core keeps releasing energy right up until it starts building iron and nickel, the most tightly bound nuclei there are; fusing them further would cost energy instead of releasing it, which is why a star's core collapses once it fills with iron.

### Nuclear fission
Splitting a uranium-235 nucleus moves both fragments toward the peak of the binding-energy curve, releasing about 200 MeV in the process — roughly fifty million times the energy a single chemical reaction releases.

### Nuclear medicine
Iodine-131 and technetium-99m both sit just off the stable band, decaying at a convenient, known rate, which is exactly what makes them useful and predictable for scans and treatment.

### Cosmic nucleosynthesis
Elements heavier than iron are forged mainly in the extreme neutron floods of colliding neutron stars and supernovae, which briefly push nuclei far up the neutron-rich wall of this very chart before they decay back toward the stable band.
