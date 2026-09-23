---
title: 'Directed percolation: spreading that cannot look back'
summary: One active square tries to activate itself and its neighbour on the next row down; below a sharp threshold the pattern always dies out, and above it, activity can spread forever.
parameters:
  p: activation probability
  gen: time step
variables:
  - the chance an active site activates a given neighbour, one step later
charts: []
---

## Try it

1. Press play. Time runs downward: each new row is one step later than the row above it, so the whole picture is a map of where activity has been.
2. Drag "activation probability" low. The pattern narrows to a point within a handful of rows and stops growing new rows entirely.
3. Drag it to about 0.6447 or higher. The pattern can keep spreading for as long as you let the picture run.

## Real-life examples

1. **Too weak to spread.** With activation probability 0.5, run 60 steps: the single active site almost always fails to keep any descendant alive for long, and the pattern narrows to nothing.
2. **Right at the threshold.** With activation probability 0.6447, run all 120 steps: this sits close to the value where growing forever and dying out become equally likely, so the pattern is thin, patchy and unpredictable.
3. **Comfortably above threshold.** With activation probability 0.85, run 100 steps: the active band keeps a healthy width the whole way down, and dying out becomes very unlikely.

## Test yourself

1. Set activation probability to 0.5 or below and run at least 40 steps. Confirm the pattern dies out.
2. Set it to 0.8 or above and run at least 60 steps. Confirm activity is still present at the bottom.
3. Set it within 0.02 of 0.6447 and run at least 80 steps, right at the threshold between dying out and spreading.

## Intuition

Picture a single spark at the top of the picture. Every step, that spark can pass its activity straight down to the cell below it, and it can also pass it diagonally to the next cell over — each attempt independent, and each one succeeding with the probability you drag. Nothing can move backward in time: once a row goes fully dark, nothing later can revive it, because the only way a cell lights up is from an active cell one step earlier.

That one-way arrow of time is what makes this different from something like the sandpile or a plain infection on a static grid: here the picture itself is a record of an entire history, growing one row at a time, and never rewritten. Turn the activation probability down and the spark almost always burns out within a few rows, every single time you restart it. Turn it up past a sharp threshold and the same spark can, with real probability, keep lighting new cells forever — the central fact of directed percolation is that this switch between "always dies" and "can survive forever" happens abruptly, at one particular value of the probability.

## Formal

Each active site can activate itself and its right neighbour, one step later, each independently with probability $p$. A dead site cannot revive itself: it becomes active at the next step only if at least one of the attempts aimed at it succeeds.

There is a critical probability $p_c \approx 0.6447$ for this rule. Below it, a single active seed dies out with probability 1 on an infinite lattice, however long you wait. Above it, the seed has a positive probability of surviving forever, and the picture keeps producing new active rows no matter how far down you look.

## Advanced

Directed percolation is famous less for this one lattice model than for how often the same critical behaviour reappears: chemical reactions on a catalytic surface, certain models of epidemics, and the onset of sustained turbulence in some fluids all share the same critical exponents near their own threshold, even though the underlying rules look nothing alike. Systems that share exponents this way are said to belong to the same universality class, and directed percolation is one of the most common classes found in nature.

## Derivation

1. Every active site can activate itself and its right neighbour one step later, each independently with probability $p$.
2. A site does not stay active on its own: it is active next step only if at least one of those attempts succeeds.
3. Below the critical value $p_c$ activity always dies out eventually; above it, activity can survive forever with positive probability.

## Real world

### Epidemics without recovery back-flow
Case counts that only ever depend on the previous generation of infections, never on later ones, spread as a directed process in time exactly like this picture, with a real threshold separating an outbreak that fizzles from one that becomes sustained.

### Fluid seeping through rock
Water pulled downward by gravity through a porous rock only ever flows further down, never back up, so whether it reaches the bottom depends on a threshold in how connected the open pores are, directed the same way this picture is.

### Catalytic surface reactions
A chemical reaction that needs an already-active neighbouring site to keep going, and stops for good once a patch goes fully inactive, shows the same sharp survive-or-die threshold studied here.

### The onset of turbulence
As fluid flow speeds up, patches of turbulence can die out or spread and merge; in some flows the switch from always dying out to persisting forever follows directed-percolation statistics almost exactly.
