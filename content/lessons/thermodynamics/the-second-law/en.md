---
title: 'The second law: why things never un-mix'
summary: >-
  Open a bottle of perfume in a corner of a room and its scent spreads
  to fill every corner within minutes — but no one has ever watched a
  room full of scented air spontaneously gather itself back into the
  bottle, and that one-way street is the second law of thermodynamics.
parameters:
  nLeft: molecules on the left n_L
  nRight: molecules on the right n_R
  perm: how open the partition is
variables:
  - entropy
  - Boltzmann constant, 1.38×10⁻²³ J/K
  - multiplicity, the number of microscopic arrangements matching this split
  - molecules on the left side
  - molecules on the right side
  - total molecules, n_L + n_R
---

## Try it

1. Set "molecules on the left" high and "molecules on the right" low, then raise "how open the partition is". Watch the gas mix toward an even split on its own.
2. Drag both sliders to 50. Notice this even split has the largest number of possible microscopic arrangements — the most likely state by far.
3. Lower "how open the partition is" toward zero with an uneven split. Notice the order can now sit there indefinitely, because almost nothing can cross to disturb it.

## Real-life examples

1. **Perfume released in one corner.** Starting with 95 molecules of scent concentrated on the left and only 5 on the right, an open partition lets them spread until the room is filled evenly — order collapsing into disorder, never the other way around.
2. **A room that has fully aired out.** With 50 molecules on each side and the partition wide open, the gas sits at its most-mixed, highest-entropy state — the configuration with overwhelmingly more ways to arrange the same molecules than any lopsided split has.
3. **A sealed, unopened bottle.** With 80 molecules trapped on the left and only 20 on the right, but the partition almost fully closed, that imbalance survives — order is not forbidden, it is just enormously unlikely to arise or persist once molecules are actually free to wander.

## Test yourself

1. Get the two sides to exactly the same number of molecules.
2. Push the entropy (in units of k_B) above 60 while keeping the two sides clearly unequal (differing by more than 10).
3. Keep the left side above 90 molecules with the partition nearly sealed (below 5% open).

## Intuition

Drop an ice cube into a warm drink and it melts, cooling the drink; you have never once seen a warm drink spontaneously freeze part of itself into a floating ice cube while the rest gets warmer, even though nothing in the first law of thermodynamics — energy conservation — actually forbids that. What forbids it is the second law: heat flows from hot to cold because there are vastly more ways for the energy to end up spread evenly than concentrated back into one small cold patch. On screen, set "molecules on the left" high and "molecules on the right" low, then open the partition, and watch the same idea play out with gas instead of heat: molecules wander from where they are crowded to where they are not, simply because there are so many more ways to be spread out than to be crowded in a corner.

Every specific arrangement of molecules is exactly as likely as every other specific arrangement — the reason mixed states dominate is that there are overwhelmingly more of them. A 50/50 split of even a modest 100 molecules already has vastly more possible microscopic arrangements than a 95/5 split does, and for the roughly 10²³ molecules in a real gas the gap becomes so extreme that watching them spontaneously un-mix would take far, far longer than the age of the universe — not impossible in principle, just so overwhelmingly improbable that "never" is the honest word for it.

## Formal

Entropy counts the number of microscopic arrangements, $\Omega$, consistent with what you can observe macroscopically: $S = k_B\ln\Omega$.

For $N$ molecules split $n_L$ left and $n_R$ right, Stirling's approximation gives $S/k_B \approx N\ln N - n_L\ln n_L - n_R\ln n_R$, which is maximised exactly at the even split $n_L = n_R$ — the state with the most ways to happen, and so the state any isolated system drifts toward.

## Advanced

The second law is fundamentally statistical, not absolute: nothing in physics prevents every molecule in a room from spontaneously rushing into one corner at the same instant, it is merely so improbable for a real number of molecules that no one has ever observed it, which is why the law is phrased as "entropy never decreases" for realistically large systems rather than as a strict logical impossibility.

## Derivation

1. The multiplicity Ω(n_L, n_R) = N!/(n_L!n_R!) counts every distinct way to place N molecules with n_L on the left and n_R on the right.
2. Boltzmann's definition sets entropy as S = k_B ln Ω, turning that count directly into a physical quantity.
3. Stirling's approximation for large N turns the factorials into logarithms, giving S/k_B ≈ N ln N − n_L ln n_L − n_R ln n_R, maximised at the even split.

## Real world

### Refrigerators
A fridge does not break the second law — it moves heat from cold to hot only by doing work and dumping extra heat into the room, so the total entropy of fridge-plus-room still rises.

### Mixing cream into coffee
Cream disperses evenly through coffee and never gathers itself back into a single drop, the same one-way statistical drift as gas filling a room.

### Heat death arguments
Some cosmologists describe the universe's very long-term fate using exactly this logic: energy spreading toward its most probable, most evenly distributed arrangement.

### Engineering reliability
Engineers design one-way processes such as combustion and braking around the second law: the energy released as heat can never fully be recaptured as useful work, which sets a hard ceiling on any engine's efficiency.
