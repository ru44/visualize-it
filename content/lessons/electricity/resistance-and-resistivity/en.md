---
title: Resistance and resistivity
summary: >-
  A wire's resistance depends on more than what it is made of — a longer
  wire resists more, a thicker one resists less, and a material's own
  stubbornness, its resistivity, decides everything else, which is why
  toasters use nichrome wire and household cables use copper.
parameters:
  L: length L
  A: cross-section A
  mat: material
variables:
  - resistance — how strongly the wire opposes current, in ohms
  - resistivity — how stubbornly the material itself resists current, independent of its shape
  - length — how far the current has to travel along the wire
  - cross-section — the area of the wire, the "width" of the path current can take
charts: []
---

## Try it

1. Drag «length L» up. «R» climbs — a longer wire means more collisions along the way, so more resistance.
2. Drag «cross-section A» up. «R» falls — a thicker wire gives current more parallel paths, so less resistance.
3. Flip «material» from copper to nichrome. «R» jumps by nearly a hundred times for the very same shape.

## Real-life examples

1. **Copper household wire.** A 1 m copper wire with a 1 mm² cross-section has a resistance of only about 0.017 Ω — copper is chosen precisely because it resists so little.
2. **Toaster heating element.** A thin, 4 m nichrome wire folded inside a toaster has about 44 Ω, resisting current hard enough to glow red-hot.
3. **Small heater coil.** A thinner, 1 m nichrome coil reaches about 11 Ω — nichrome resists roughly 65 times more than copper for the same shape.

## Test yourself

1. Using copper, get the resistance to about 0.05 Ω.
2. Using nichrome with a cross-section under 2 mm², push the resistance above 40 Ω.
3. Using copper at least 2 m long, keep the resistance under 0.01 Ω.

## Intuition

Picture current-carrying electrons as people squeezing down a corridor full of obstacles. Stretch «length L» and there are simply more obstacles between start and finish, so more energy gets lost along the way — resistance rises in a straight line with length. Widen «cross-section A» instead and it is like opening extra corridors side by side: the same crowd now has more room to spread out, so each path is less congested and the overall resistance drops.

Shape only tells half the story, though. Flip «material» from copper to nichrome without touching «length L» or «cross-section A» at all, and the resistance still leaps by close to a hundred times, because nichrome's atoms simply obstruct moving electrons far more stubbornly than copper's do. That stubbornness — resistivity — is a property of the material alone, which is exactly why toasters and hair dryers are wound from nichrome wire, not copper.

## Formal

Resistance is proportional to length and inversely proportional to cross-sectional area, with resistivity $\rho$ as the constant of proportionality: $R = \rho\dfrac{L}{A}$, measured in ohms when $\rho$ is in $\Omega\cdot\text{m}$, $L$ in metres and $A$ in square metres.

Copper has $\rho \approx 1.68\times10^{-8}\ \Omega\cdot\text{m}$, while nichrome (a nickel-chromium alloy) has $\rho \approx 1.10\times10^{-6}\ \Omega\cdot\text{m}$ — about 65 times larger, which is why the same size of nichrome wire resists so much more.

## Advanced

Resistivity itself rises with temperature in most metals, since hotter atoms vibrate more and scatter the drifting electrons more often; a nichrome element glowing red-hot in a toaster actually resists noticeably more than the same wire cold.

## Derivation

1. Doubling the length of a wire doubles the number of collisions an electron meets on its way through, so resistance is proportional to length, $R \propto L$.
2. Doubling the cross-section gives current twice as many parallel paths to spread across, halving the congestion on each, so resistance is inversely proportional to area, $R \propto 1/A$.
3. Combining both with resistivity as the material's own constant of proportionality gives the full formula, $R = \rho L/A$.

## Real world

### Toasters and kettles
Heating appliances deliberately choose a resistive material like nichrome, sized so that the current driven through it dissipates enough power as heat to glow or boil water.

### Fuse wire
A fuse is a short, thin, carefully sized wire whose resistance is just high enough that a dangerous current heats it past its melting point, breaking the circuit before anything else does.

### Extension leads
A long, thin extension cable has meaningfully more resistance than the short, thick cable inside a wall, which is why cheap thin extension leads can overheat under a heavy load.

### Resistors
The resistors used in every circuit board are just carefully shaped and doped materials, engineered so their $R = \rho L/A$ lands on a precise, labelled value.
