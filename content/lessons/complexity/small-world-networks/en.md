---
title: Small worlds and six degrees of separation
summary: Rewire just a few links in a ring of neighbours at random, and a network where everyone is far from everyone else suddenly puts any two people a handful of steps apart.
parameters:
  p: rewiring probability
  k: links per node
variables:
  - the chance each link gets rewired to a random node instead of a neighbour
  - the average number of hops between two random nodes
  - the fraction of a node's neighbours who are also neighbours of each other
charts: []
---

## Try it

1. Leave "rewiring probability" at 0. Every white dot links only to its nearest neighbours around the ring; a message would need many hops to cross the circle.
2. Nudge the slider up to about 0.1. A handful of links turn orange and jump across the ring. Watch "average path length L" fall sharply even though almost nothing else changed.
3. Push the slider to 1. Every link is now a random jump. The path length barely improves further, and "clustering C" collapses because neighbours no longer share neighbours.

## Real-life examples

1. **A village with no gossip shortcuts.** With no rewiring, news only spreads neighbour to neighbour, so it takes many hops to cross the group.
2. **A village with one well-travelled trader.** A small rewiring probability adds a few long-distance links; the whole group is now only a few hops apart, and local friend groups are still tight.
3. **A random acquaintance network.** With every link randomised, reaching anyone is fast, but there's almost no local structure left: your friends are unlikely to know each other.

## Test yourself

1. Keep the network as a plain ring: rewiring probability 0 and 4 links per node.
2. Push the rewiring probability to at least 0.5.
3. Set the links per node to its maximum, 8.

## Intuition

Sixteen white dots sit in a circle, and orange or grey lines connect each one to its nearest neighbours on either side, so the network starts as a plain ring: reaching the dot on the opposite side takes many short hops, one neighbour at a time. Drag "rewiring probability" up from 0 and a few of those lines detach from a neighbour and reattach to some far-off dot instead, drawn in orange so you can spot them.

Those few long lines act like shortcuts across the whole circle: even at a small rewiring probability, "average path length L" drops fast, because a handful of long jumps can shorten almost every pair's route. Meanwhile "clustering C" barely moves, because most dots still mostly link to their old neighbours, so tight local knots of connected friends survive even while the network as a whole becomes easy to cross — the small-world effect behind "six degrees of separation".

## Formal

Start from a ring where every node connects to its $k$ nearest neighbours, then rewire each link independently to a uniformly random node with probability $p$. Two summary numbers describe the result: $L$, the average shortest-path length between pairs of nodes, and $C$, the average fraction of a node's neighbours that are also linked to each other.

Watts and Strogatz showed that for a wide range of small $p$, $L$ falls almost as fast as it would for a fully random network, while $C$ stays close to its value at $p = 0$: $p \uparrow \Rightarrow L \downarrow$ fast, while $C$ stays high, for small $p$.

## Advanced

The drop in $L$ happens because a single long-range edge can shortcut an otherwise-large neighbourhood, and even a small number of such edges (of order $\log N$ for $N$ nodes) is enough to shrink the diameter to order $\log N$, matching random-graph scaling, while $C$ stays $O(k/N)$ close to the ring's value because most triangles are still local. This combination, high clustering with short paths, is why the model is used to study epidemic spread and synchronisation on real social and neural networks, which share both properties.

## Derivation

1. Build a ring of $N$ nodes where each one links to its $k$ nearest neighbours, so the network starts perfectly regular.
2. Go through every link once and, independently with probability $p$, replace its far end with a uniformly random node instead of the original neighbour.
3. A small number of rewired links already shortcuts most long routes, so $L$ falls fast while $C$, which depends on local triangles, barely changes for small $p$.

## Real world

### Social networks
Most of your friends know each other, but a few acquaintances from a different city or job are the long-range links that make "a friend of a friend" reach almost anyone quickly.

### Neural wiring
Brains mix short local connections between nearby neurons with a smaller number of long-range fibres, giving fast global communication without the wiring cost of connecting everything to everything.

### Power grids and the internet
Engineers deliberately add a few long-distance links to otherwise local networks, because a handful of shortcuts cuts the worst-case distance a signal or a fault has to travel dramatically.

### Disease spread
A few long-distance travellers can carry an outbreak across an entire country almost as fast as across one city, because a mostly-local contact network has hidden long-range links too.
