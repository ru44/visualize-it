---
title: Hopfield networks
summary: >-
  Store three pictures by wiring every cell to every other cell, damage one
  of them badly, and the network flips cells one sweep at a time until the
  whole picture is back — it never kept the pixels, only how they agree.
parameters:
  noise: damage
  pattern: memory
  step: sweep
variables:
  - how many of the memory's cells are flipped before recall starts
  - which of the three stored memories you are testing
  - how many recall sweeps have run
charts: []
---

## Try it

1. At sweep 0 you see a damaged copy of the chosen memory next to the clean original in the corner — some cells are already wrong.
2. Drag "sweep" forward. Cell by cell, the big grid pulls itself toward the clean pattern shown in the corner, and the match reading climbs toward 100%.
3. Push "damage" up past 40% and run the sweeps again. Watch whether recall still finds the exact original, or settles into something close but not quite it.

## Real-life examples

1. **A lightly smudged X.** With 15% of the X's cells flipped, a handful of sweeps is enough to pull it back to the clean pattern in the corner.
2. **A badly torn cross recovered.** With 35% of the plus-sign's cells flipped, recall still reaches the clean pattern, just needing more sweeps to get there.
3. **A square pushed to the edge.** With half of the square's cells flipped — as damaged as this network ever gets tested here — recall is pushed to its limit, and the match reading shows how close it actually lands.

## Test yourself

1. Push damage to 40% or higher and run at least 12 sweeps — see recall claw its way back regardless.
2. Keep damage at 10% or under and run at least 2 sweeps — see how fast a lightly damaged memory snaps back.
3. Test the square pattern with damage at 30% or higher.

## Intuition

The big grid does not store any picture as pixels. Instead, every cell is wired to every other cell with a single number, and that number was set once, during training, to "how often did these two cells agree across the memories I was shown". A cell then simply looks at every other cell, weighs each one by that agreement number, adds it all up, and turns itself on if the total leans positive — nothing more complicated than that, repeated for every cell, every sweep.

Starting from a damaged pattern, most cells still agree with their neighbours the way the clean memory says they should, and only a minority are wrong. Each sweep, the wrong cells feel pressure from their many correctly-agreeing neighbours and flip back into line, while a correct cell has no reason to move. That is why recall climbs steadily toward the clean pattern shown in the corner rather than jumping there at once — and why, past some amount of damage, there just aren't enough correct neighbours left to pull a cell back, and recall stalls short of perfect.

## Formal

Training sets each connection to $w_{ij} = \sum_{p} x_i^{p} x_j^{p}$, the sum over every stored memory of how that memory's cells $i$ and $j$ agree (both +1 or both −1 add a positive amount; disagreement subtracts). Recall repeatedly applies $s_i \leftarrow \operatorname{sign}\left(\sum_{j\neq i} w_{ij}s_j\right)$ to one cell at a time.

Each such update can only keep the network's total "disagreement energy" the same or lower it, and since that energy has a smallest possible value at each stored memory, the sweeps are guaranteed to stop changing — though which stored memory, if any, they stop at depends on how damaged the starting pattern was.

## Advanced

A Hopfield network is limited in how many patterns it can reliably store this way — as a rough rule roughly 0.14 times the number of cells — beyond which stored memories start to blur into each other or into spurious patterns that were never actually stored but happen to be stable points of the energy anyway; this network keeps well under that limit with only three memories on a hundred cells. Modern "modern Hopfield networks" used in some transformer-style architectures generalise this same energy-descending idea to store vastly more patterns with a sharper, exponential rule instead of the plain sum used here.

## Derivation

1. Train each connection once as the sum, over every stored memory, of how that memory's two cells agree.
2. Recall updates one cell at a time to whichever sign a weighted sum of its neighbours favours.
3. Sweep every cell this way, in a fixed order, until a full sweep changes nothing.

## Real world

### Error-correcting memory
Hopfield networks were an early demonstration that a damaged input can be repaired using only pairwise agreement, an idea now underlying more general content-addressable memory systems.

### Image and pattern completion
Given a partial or noisy version of a stored pattern, the same recall rule fills in the missing or wrong parts from what the network already learned.

### Optimisation problems
Because settling always lowers the same energy function, early Hopfield networks were also wired up to represent hard scheduling and routing problems, with a good answer sitting at a low-energy stable point.

### Modern attention-based memory
Some recent neural architectures reintroduce Hopfield-style energy minimisation, sharpened to store far more patterns, as a way to look up stored information by partial content instead of an exact address.
