---
title: 'Trees and spanning trees: connecting for less'
summary: >-
  Eight farms need irrigation pipe: find the cheapest set of pipes that
  connects every farm with no wasted loops, and you have built a minimum
  spanning tree.
parameters:
  step: pipes considered — how far through the sorted list of possible pipes the process has gone
  town: farm — which farm to check the connections of (tap a farm)
variables:
  - the edges — the pipes that end up in the tree
  - the vertices — the farms being connected
---

## Try it

1. Leave "pipes considered" at 1 and read the total-cost readout — that is the cheapest possible way to link all eight farms with pipe.
2. Tap farm G, then drag "pipes considered" up slowly from 0 and watch exactly when its circle joins the shaded group of farms already linked to it.
3. Keep dragging past halfway and watch a dashed red pipe appear — the algorithm's first rejection, because every farm is already connected by then and that pipe would only create a loop.

## Real-life examples

1. **The finished network.** All fourteen possible pipes considered, checking on farm A: the cheapest total layout is complete, every farm linked with no wasted pipe.
2. **Exactly at completion.** Stop right at the halfway point, checking farm G: every farm, including G, is already linked, even though seven of the fourteen possible pipes were never even considered.
3. **Just the cheapest two.** Stop very early, checking farm B: only the two cheapest pipes have been laid, and B is linked to just one other farm so far.

## Test yourself

1. Stop the process at the exact point where all eight farms first become fully connected.
2. Push a little further, to about four-sevenths of the way through, and find the very first pipe that gets rejected for closing a loop.
3. Tap farm G and watch the slider to see which pipe finally links it to the rest.

## Intuition

Eight farms, A to H, could be linked by any of fourteen possible underground pipes, each with its own cost to dig and lay, shown as the number on the line. Sort those fourteen pipes from cheapest to priciest and lay them down one at a time in that order, but skip any pipe that would only reconnect two farms already linked through some other route — laying it would waste money on a redundant loop. "Pipes considered" controls how far down that sorted list you have looked.

Tap any farm to see, in a soft highlight, exactly which other farms are already reachable from it through the pipes laid so far. Run the process to the end and exactly seven pipes survive — one fewer than the number of farms — connecting every farm for the lowest total cost possible. Any fewer pipes and some farm is stranded; any more, and at least one pipe is wasted money forming a loop that adds no new connection.

## Formal

A tree is a connected graph with no cycles. A spanning tree of a connected graph reaches every vertex using only some of its edges, chosen so that no cycle appears; removing any single edge from a tree would disconnect it, and adding any edge to it would create exactly one cycle. For $|V|$ vertices, every spanning tree has exactly $|E| = |V| - 1$ edges, never more and never fewer.

When each edge carries a cost, or weight, a minimum spanning tree is the spanning tree whose edges sum to the smallest possible total. Kruskal's algorithm builds one directly: sort all edges by weight, then add each edge in turn unless it would close a cycle with edges already chosen, stopping once $|V|-1$ edges have been added.

## Advanced

A minimum spanning tree is unique whenever no two edges share exactly the same weight; with ties, more than one minimum spanning tree can exist, though they all share the same total cost. Kruskal's method is one of two classic approaches — Prim's algorithm instead grows a single tree outward one cheapest connecting edge at a time, always starting from one chosen vertex — and both are guaranteed to find a true minimum, not just a locally good answer.

## Derivation

1. Start with the $|V|$ farms as isolated points and no pipes at all: that counts as $|V|$ separate groups.
2. Every pipe accepted by the algorithm joins two farms from different groups into one, so each accepted pipe reduces the number of separate groups by exactly one.
3. Merging $|V|$ separate groups down to a single connected group therefore always takes exactly $|V| - 1$ accepted pipes, so $|E| = |V| - 1$.

## Real world

### Rural electrification and water networks
Power and water utilities connect villages or farms using minimum spanning trees to keep total cable or pipe length, and cost, as low as possible while still reaching everyone.

### Computer network backbones
Network engineers plan fibre-optic backbones the same way, linking data centres or offices with the least total cable while still reaching every site.

### Preventing loops in office networks
Ethernet switches run the Spanning Tree Protocol, which automatically disables extra cable connections that would form loops, because a looping network floods itself with endlessly circulating traffic.

### Clustering and map-drawing algorithms
Some clustering methods build a minimum spanning tree over a set of points and then cut its most expensive edges to split the points into natural groups, and mapmakers use similar trees to lay out transit lines with minimal total track.
