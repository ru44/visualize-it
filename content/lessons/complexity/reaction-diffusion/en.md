---
title: 'Turing patterns: two chemicals that paint spots and stripes'
summary: A chemical that multiplies itself by eating a plain one, balanced against a steady trickle of fresh supply, settles into spots, stripes or splitting blobs — Alan Turing's 1952 explanation for how a plain animal coat grows its pattern.
parameters:
  feed: feed rate F
  kill: kill rate k
  step: iteration
variables:
  - the plain chemical, spread thin and slowly refilled
  - the pigment chemical, which multiplies by consuming A
  - how fast a chemical spreads to its neighbours
  - how fast A is refilled where it has been eaten
  - how fast B fades away on its own
charts: []
---

## Try it

1. Watch the seed in the middle of the grid. Chemical B eats chemical A and makes more of itself, spreading out from that single spot.
2. Drag "iteration" forward at the starting feed and kill rates. The seed grows into rounded blobs that keep splitting into two.
3. Load the "stripes" preset and run it forward. The very same rule, only with different feed and kill rates, paints long stripes instead of spots.

## Real-life examples

1. **Leopard and cheetah spots.** A feed rate near 0.035 and a kill rate near 0.065 settle into round, isolated spots on an otherwise plain coat.
2. **Zebra and tiger stripes.** Lower both rates, feed near 0.022 and kill near 0.051, and the same rule stretches its blobs into long connected stripes instead.
3. **A growing coral or a dividing cell colony.** At feed near 0.025 and kill near 0.06, every blob keeps splitting into two as it grows, the way a coral head or a colony of cells spreads outward.

## Test yourself

1. Set "feed rate F" between 0.03 and 0.04 and "kill rate k" above 0.06, then run to iteration 100 or beyond. Spots should cover the grid.
2. Set "feed rate F" below 0.03 and "kill rate k" below 0.055, then run to iteration 100 or beyond. Stripes should form instead of spots.
3. Run all the way to iteration 150 and watch the pattern settle into its final shape.

## Intuition

Picture a drop of blue dye landing on a white sheet, except this dye multiplies itself wherever there is enough of a plain, invisible chemical nearby to feed on, eating that chemical as it grows. Left alone, the blue patch would eat everything within reach and stop. But a steady trickle of fresh plain chemical keeps arriving everywhere on the sheet (the "feed" rate), while the blue itself slowly fades away on its own (the "kill" rate). Caught between those two knobs, the blue patch can't win everywhere and can't die out everywhere either, so it settles into a shape instead — a spot, a stripe, or a maze — and mostly stops changing.

Alan Turing showed in 1952 that this exact tug-of-war between a fast-spreading and a slow-spreading chemical can start from an almost featureless sheet of cells and paint a pattern with no blueprint anywhere in the rule, just two numbers: how fast each chemical spreads, and how fast the reaction feeds and kills. Nudge those two numbers only slightly and the same simple rule paints something that looks utterly different, from leopard spots to zebra stripes to the whorled ridges on a seashell.

## Formal

Two chemicals $A$ and $B$ diffuse and react across a grid: $\frac{\partial A}{\partial t} = D_A \nabla^2 A - AB^2 + F(1-A)$, where diffusion spreads $A$ out, the term $AB^2$ is $B$ consuming $A$ to multiply, and $F(1-A)$ slowly refills $A$ back toward $1$.

$B$ follows $\frac{\partial B}{\partial t} = D_B \nabla^2 B + AB^2 - (F+k)B$: it grows from consuming $A$ and decays at the combined rate $F+k$, so $F$ and $k$ together decide whether $B$ spreads into open blobs or tight, isolated dots.

## Advanced

A uniform mix of $A$ and $B$ is a valid steady state of these equations, but it can be unstable: if $B$ diffuses more slowly than $A$, a tiny random bump in $B$ locally starves its neighbours of $A$ faster than diffusion can smooth the bump away, so the bump grows instead of dying out. This is the Turing instability, and which wavelength grows fastest sets the spacing between the spots or stripes that eventually appear. The Gray–Scott equations used here are one well-studied member of a much larger family of activator–inhibitor systems that all share this same instability.

## Derivation

1. The discrete Laplacian adds up a cell's four neighbours and subtracts four times the cell itself, the same stencil used for both A and B.
2. One time step nudges A by its own diffusion, minus whatever B just ate, plus a small top-up toward 1.
3. The same time step nudges B by its own diffusion, plus whatever it just ate, minus everything that decayed away.

## Real world

### Animal coat patterns
Leopard rosettes, zebra stripes and giraffe patches each sit in a different corner of the same feed-and-kill map this grid explores.

### Seashell pigment patterns
The zigzag and wave patterns painted on many seashells come from the same two-chemical rule running along the shell's growing edge, one row at a time.

### Finger spacing in a growing limb
Some models of how a hand's five fingers space themselves evenly apart use a Turing-style pair of chemicals, one spreading fast and one slow.

### Chemical clocks in the lab
The Belousov–Zhabotinsky reaction is a real chemical mixture that paints spreading spiral and target patterns in a shallow dish, obeying this same reaction-diffusion mathematics.
