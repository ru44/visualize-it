---
title: Stress, strain and materials
summary: >-
  Pull on almost anything gently enough and it springs straight back —
  pull hard enough and it stays bent forever. This lesson shows where
  that line is.
parameters:
  E: E — Young's modulus (stiffness)
  Y: Y — yield stress (elastic limit)
  sigma: σ — the stress you apply
variables:
  - "σ — the stress: the pulling force spread over the material's cross-section"
  - "ε — the strain: how much the material has stretched, as a fraction of its original length"
  - E — Young's modulus, how stiff the material is while it's still elastic
  - Y — the yield stress, where the material stops springing all the way back
  - E_p — the plastic hardening stiffness, how much stress still rises for extra strain past yield
  - ε_Y — the strain at the yield point, the largest stretch that fully recovers
---

## Try it

1. Drag $\sigma$ (applied stress) up slowly from zero with $E$ and $Y$ at their steel defaults. Watch the strain climb in a dead straight line, then bend and flatten once $\sigma$ passes $Y$.
2. Now drop $E$ far down, toward rubber's stiffness. The same small stress now produces a huge strain — and the material stays fully elastic across a much wider range of $\sigma$.
3. With steel-like $E$ again, push $\sigma$ well past $Y$ and watch the readouts: some of that strain is now permanent — it will not fully disappear even if $\sigma$ drops back to zero.

## Real-life examples

1. **A steel bolt tightened normally.** Stressed to about 100 MPa, well under its 250 MPa yield point, the bolt stretches only about 0.05% — utterly invisible, and it springs back perfectly if loosened.
2. **The same steel bolt badly over-tightened.** Pulled to 400 MPa, past its 250 MPa yield point, the bolt stretches about 1.6% — and even after the load is removed, roughly 1.4% of that stretch never goes away: the bolt is now permanently longer and weaker.
3. **A rubber band stretched by hand.** With a much softer stiffness (about 50 MPa) and an elastic limit near 15 MPa, just 8 MPa of pulling stress already produces a 16% stretch — but because it's still under the elastic limit, letting go snaps it straight back.

## Test yourself

1. Find a stiff, steel-like material ($E$ above 100 GPa) with $\sigma$ still below $Y$, so it stays fully elastic.
2. Find a stiff, steel-like material with $\sigma$ pushed past $Y$, so it takes a permanent set.
3. Find a soft, rubber-like material ($E$ under 1 GPa) with $\sigma$ still below $Y$, so it stretches a lot but still springs back.

## Intuition

Stretch a steel paperclip just a little and let go: it snaps straight back to its original shape, because the pulling stress never reached the point where the bonds between its atoms permanently rearrange. Stretch it too far, past that point, and it stays bent — some of its atoms have slid past their neighbours and settled into new positions that a simple spring-back cannot undo.

A rubber band tells almost the opposite story on the same graph: it is roughly 4000 times less stiff than steel, so the same everyday pulling force stretches it enormously, sometimes to several times its original length — yet because that stretching is still elastic (the long tangled rubber molecules are just uncoiling, not sliding past each other), it keeps springing all the way back, over and over, long after a piece of steel pulled that far would have snapped.

## Formal

While $\varepsilon \le \varepsilon_Y$, stress and strain are directly proportional, $\sigma = E\varepsilon$: this is Hooke's law, and releasing the load anywhere in this region returns the strain exactly to zero. The yield strain itself is set by both material constants together, $\varepsilon_Y = \frac{Y}{E}$.

Past that point, $\sigma = Y + E_p(\varepsilon-\varepsilon_Y)$: stress keeps climbing, but only slowly, since the hardening stiffness $E_p$ is much smaller than $E$. Releasing the load from here no longer returns to zero strain — the material keeps a permanent, residual stretch equal to the difference between where it is now and where pure elastic spring-back from that stress would place it.

## Advanced

Real materials rarely have as sharp a corner at $Y$ as this simplified model draws, and many, rubber included, do not truly "yield" like a metal at all — they simply approach a breaking stress instead; treating the numbers here past a material's real elastic range as a rough estimate, not a precise prediction, keeps the model honest.

## Derivation

1. The strain at which the material first stops being purely elastic is set by both constants together: $\varepsilon_Y = \frac{Y}{E}$.
2. Below that strain, Hooke's law applies directly, $\sigma = E\varepsilon$: stress and strain rise together in a straight line, and unloading returns exactly to zero.
3. Above that strain, the material yields: $\sigma = Y + E_p(\varepsilon-\varepsilon_Y)$, with a much smaller slope $E_p$, and some of the strain gained here never comes back out.

## Real world

### Steel bolts and structural fasteners
Engineers deliberately keep working stresses well under $Y$ so every bolt stays in the fully elastic, fully recoverable region for its whole working life.

### Car crumple zones
A car's front structure is designed to pass its yield point on purpose in a crash, absorbing the collision's energy as permanent, plastic bending instead of transmitting it straight to the passengers.

### Bent paperclips and coat hangers
Bend a paperclip past its elastic limit and it stays bent — a simple, everyday demonstration of the exact plastic region this lesson models, right down to the permanent set that remains after you let go.

### Rubber seals and bands
Gaskets, O-rings and rubber bands are chosen specifically for their huge elastic range, so they can stretch a great deal under everyday handling and still return to their original shape instead of taking a permanent set.
