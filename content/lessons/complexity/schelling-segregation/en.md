---
title: Schelling's model of segregation
summary: Give every dot a mild preference for a few neighbours like itself, nothing close to wanting to live apart, and the whole grid still sorts itself into solid blocks of one colour.
parameters:
  tolerance: tolerance for unlike neighbours
  density: how full the grid starts
  gen: round
variables:
  - f
  - t
charts: []
---

## Try it

1. Press play with "tolerance for unlike neighbours" at 0.3. Watch small same-colour clumps grow into large solid blocks over the rounds.
2. Raise the tolerance to about 0.55, so each dot only minds being in a small minority, and restart. The grid still separates, just more slowly and with messier borders.
3. Push "how full the grid starts" up to 0.9 and restart. With so little empty space, dots struggle to find a happy spot and "unhappy" stays high for longer.

## Real-life examples

1. **A relaxed preference.** With tolerance 0.3, a dot moves only once more than 30% of its neighbours are the other colour, on a fairly open grid. Even so, solid same-colour blocks form.
2. **An easygoing preference.** At tolerance 0.55, a dot tolerates being a small minority among its neighbours. Segregation still happens, only more slowly.
3. **A crowded, strict neighbourhood.** At tolerance 0.15 and 90% of cells filled, dots are picky and empty cells are scarce, so many rounds pass before things settle.

## Test yourself

1. Set the tolerance for unlike neighbours to about 0.2.
2. Fill the grid to at least 90% and run for at least 20 rounds.
3. Set the tolerance to about 0.5 and run for at least 25 rounds.

## Intuition

Picture a grid of orange and teal dots on mostly-empty squares, each one placed at random. Every round, a dot counts its eight neighbours: if more than "tolerance" of the occupied ones are the other colour, the dot is unhappy and jumps to any empty square where it would no longer be. Press play and watch: dots that start in a mixed area keep hopping until they land next to enough of their own colour.

Even a mild tolerance, wanting only a third of your neighbours to match, is enough to sort the whole grid into solid blocks over a few dozen rounds, because every move that satisfies one dot can make its new neighbours' math change too, and the pattern snowballs. Thomas Schelling built this model with coins on a checkerboard in 1971 to show that individually mild preferences can add up to a collectively extreme outcome that nobody on the grid actually wanted.

## Formal

Each occupied cell has a fraction $f$ of its occupied neighbours that are a different type; the cell's owner is unhappy when $f$ exceeds a tolerance $t$. Unhappy agents relocate to a random empty cell where the new $f$ is at most $t$.

Even for values of $t$ well above one half, meaning most agents would be happy in a genuinely mixed neighbourhood, repeatedly applying $f > t \Rightarrow$ move drives the grid toward large single-colour regions, because local corrections compound across the whole grid.

## Advanced

The model is a stochastic agent-based system with no global objective; segregation is an emergent equilibrium, not something any agent is trying to achieve. Later work shows the effect is robust to grid shape, neighbourhood size and to replacing the hard threshold $t$ with a smooth preference, and that even a tolerance $t$ near one half still produces segregation far sharper than that tolerance alone would suggest, a mismatch between individual intent and collective outcome sometimes called the "Schelling paradox".

## Derivation

1. Every occupied cell compares itself with its eight occupied neighbours and counts what fraction, $f$, are a different type from itself.
2. An agent is unhappy exactly when that fraction exceeds its tolerance, $f > t$, however small the gap.
3. Unhappy agents move to a random empty cell where the fraction of unlike neighbours would satisfy $f \le t$, and the whole grid updates one round at a time.

## Real world

### Housing patterns
Schelling built this model to explain why cities can end up sharply segregated by race or income even when most residents say they would be comfortable in a mixed neighbourhood.

### Online communities
The same dynamic shows up when people drift toward forums or feeds where most others already agree with them, even without anyone aiming for an echo chamber.

### School and workplace clustering
Mild preferences for familiar colleagues or classmates can produce strongly clustered teams or friend groups over time, the same tipping dynamic on a social rather than a spatial grid.

### Urban planning
Planners use variants of this model to test how small policy nudges, like mixed-income housing requirements, change how sharply a city sorts itself.
