---
title: Dijkstra's algorithm
summary: >-
  Find the cheapest path across a graph whose edges have different weights,
  always expanding the closest unfinished node next.
parameters:
  start: start — starting node
  step: step — play position
variables:
  - >-
    the shortest known distance from the start to node v, updated as the
    algorithm runs
  - the weight (cost) of the edge from u to v
  - >-
    the frontier of discovered nodes, always giving up the one with smallest
    d(v) next
---

## Intuition

Watch the readout of running distances update as the algorithm expands nodes: each step it commits to the unfinished node with the smallest distance found so far, locks that distance in as final, and then checks whether reaching its neighbours through it is cheaper than what was known before. Unlike BFS, this graph's edges have different weights, so the fewest-edges path is not always the cheapest one — Dijkstra tracks the running total, not the hop count.

Once a node is locked in, its distance never changes again — that is the greedy step, and it is only safe because every edge weight is non-negative, so no undiscovered path could possibly be shorter. Compare a direct heavy edge to a longer route of light edges on the graph: Dijkstra correctly prefers whichever total is smaller.

## Formal

Dijkstra maintains a tentative distance $d(v)$ for every node (initially $\infty$ except $d(\text{start})=0$); it repeatedly extracts the unfinished node $u$ with minimum $d(u)$ from a priority queue, finalises it, and relaxes each edge $(u,v)$: $d(v) \gets \min(d(v), d(u)+w(u,v))$.

With a binary-heap priority queue the algorithm runs in $O((V+E)\log V)$ time; it requires every edge weight $w(u,v) \ge 0$, because a negative edge could make an already-finalised node's distance wrong in hindsight.

## Advanced

Dijkstra is a special case of the more general Bellman–Ford algorithm, which tolerates negative edges (but not negative cycles) at the cost of O(VE) time by relaxing every edge up to V−1 times instead of relying on the greedy priority order. A* extends Dijkstra with a heuristic estimate of remaining distance, focusing the search toward the target instead of expanding uniformly outward.

## Derivation

1. Nothing is known yet except the trivial distance to the start itself.
2. Greedily pick the closest unfinished node — its distance can no longer improve, because all other edges are non-negative.
3. Relax every edge out of u: update a neighbour's distance if reaching it through u is cheaper.

## Real world

### GPS navigation
Turn-by-turn directions minimising travel time weight each road segment by its drive time and run Dijkstra (or a close variant) to find the route.

### Network routing
Internet routers use shortest-path algorithms related to Dijkstra to pick the lowest-cost path for packets.

### Flight and logistics planning
Cheapest-fare or fastest-connection search across a network of routes with different costs is a weighted shortest-path problem.

### Its failure mode
Dijkstra gives wrong answers on graphs with negative edge weights, since it locks in a node's distance before checking whether a cheaper, longer path exists through a negative edge; Bellman–Ford is used instead when negative weights are possible.
