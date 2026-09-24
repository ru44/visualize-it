---
title: 'Chain reaction: when one split starts more'
summary: Every fission throws off a couple of spare neutrons, and if on average more than one of them goes on to split another nucleus, the number of splits doubles and redoubles every generation — the difference between a reactor humming along steadily and a reaction that runs away.
parameters:
  k: multiplication factor k
  generations: generations
variables:
  - the average number of neutrons from one fission that go on to cause another fission — above 1 the population grows, below 1 it shrinks
  - "which generation you're counting: 0 is the very first fission, 1 is the fissions its neutrons cause, 2 is theirs, and so on"
charts: []
---

## Try it

1. Set "multiplication factor k" to exactly 1.00 and drag "generations" up. The tree grows one node per row, forever — a steady chain reaction.
2. Lower k below 1 and run it again. The tree thins out and the branches stop, generation after generation, until nothing is left.
3. Raise k above 1.5 and watch each row fan out wider than the last, doubling and redoubling.

## Real-life examples

1. **A reactor losing neutrons.** With k = 0.7, too many neutrons leak out or get absorbed without causing a new fission; ten generations in, the chain has essentially died out.
2. **A power reactor at full steam.** Operators hold k at exactly 1.00, so the reactor produces a steady output, generation after generation, for as long as they want.
3. **An uncontrolled reaction.** With k = 1.8, the population very nearly doubles every generation; by generation 8 it is already far past what the tree can draw.

## Test yourself

1. Bring k below 0.9 and run at least 8 generations, until the population is essentially zero.
2. Hold k within 0.01 of exactly 1 and reach at least generation 5, keeping the population steady.
3. Push k above 1.5 and reach generation 6 or beyond, so the population runs into the dozens or more.

## Intuition

Every dot in the picture is one fission, and every line leading down from it is a neutron it released that goes on to cause the next fission. Not every neutron from a real fission manages that — some leak out of the fuel, some get absorbed by something that isn't uranium, some just miss — so what matters is the average number that succeed, called k. If k is below 1, each generation has on average fewer fissions than the one before, the same way a chain letter dies out once, on average, each person forwards it to less than one new person. If k is above 1, each generation has more, and "more than the last one, every time" is exactly how something explodes rather than fizzles.

k = 1 is the knife-edge in between, and it is also the number every power reactor is built to sit at: exactly one neutron from each fission goes on to cause the next one, no more and no less, so the chain reaction neither dies nor runs away — it just keeps going at a steady rate, which is what "steady power output" actually means at the level of individual neutrons. Nudge k even a little above 1 and watch how fast the row widths grow on screen; real reactors avoid that by using control rods to soak up just enough neutrons to keep k pinned to 1, which is exactly the subject of the next lesson.

## Formal

Starting from $N_0$ neutrons in generation zero, each generation multiplies the population by the same factor $k$, so $N_1 = k N_0$, then $N_2 = k N_1 = k^2 N_0$, and after $g$ generations $N_g = k^{g} N_0$ — plain exponential growth or decay depending only on whether $k$ is above or below 1.

In a real reactor $k$, more precisely $k_{\text{eff}}$, the effective multiplication factor, depends on the fuel's enrichment, its geometry and density, and how many neutrons a moderator or control rods remove before they can cause another fission; $k_{\text{eff}} < 1$ is called subcritical, $k_{\text{eff}} = 1$ critical, and $k_{\text{eff}} > 1$ supercritical.

## Advanced

Real reactors are built to run only barely supercritical on a small, slow-arriving slice of "delayed" neutrons that some fission fragments emit seconds after decaying, rather than on the "prompt" neutrons released in the first instant; because those delayed neutrons take time to show up, a reactor with $k_{\text{eff}}$ just above 1 changes power over seconds, giving control rods time to react, while a reactor that goes prompt supercritical, meaning $k_{\text{eff}} > 1$ from prompt neutrons alone, changes power almost instantly — the distinction at the heart of every civilian reactor's safety margin.

## Derivation

1. Start with $N_0$ neutrons causing fissions in generation zero, and multiply by k to reach generation one — that is the definition of "k neutrons per fission go on to cause another."
2. Apply the same multiplication again to get generation two, which is k times generation one, or k² times the start.
3. Repeating the multiplication g times in a row is the same as raising k to the power g, giving $N_g = k^{g} N_0$.

## Real world

### Commercial power reactors
Every commercial reactor's control system exists to hold $k_{\text{eff}}$ at 1.00 despite the fuel slowly burning up and the core heating and cooling.

### Criticality accidents
Several historic laboratory accidents happened when researchers accidentally assembled enough fissile material, by hand, to push k just over 1 — a stark reminder that criticality is a property of geometry and mass, not intention.

### Nuclear weapons
A weapon is designed to jump k far above 1 within microseconds, so as many generations as possible complete before the assembly blows itself apart.

### Research reactors
Small research and training reactors are often run at a low, steady power specifically to keep k held exactly at 1 for hours at a time, producing neutrons for experiments rather than electricity.
