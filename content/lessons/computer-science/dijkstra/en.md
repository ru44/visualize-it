---
title: Dijkstra's algorithm
summary: >-
  This is how GPS apps and network routers pick the cheapest route across a
  map or network where some connections cost more than others.
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

## Try it

1. Set the slider "start" to 0 and slide "step" slowly from 0 toward 1 — watch the running-distance readout for each node lock in, one at a time, always the smallest unlocked number first.
2. Reset "step" to 0, then set "start" to 9 — the target is now the start, so the whole search is already solved before it begins.
3. Set "start" to 3 and play "step" to the end — compare a direct, heavy edge to a longer chain of light edges on the graph; Dijkstra always locks in whichever total is smaller.

## Real-life examples

- **Planning a road trip from home.** Starting at node 0, home, with the play position run to the end (step = 1) shows the algorithm settle the cheapest route to every town on the map, ending at node 9.
- **Already at your destination.** Starting at node 9, the same node as the target, with the play position at the very start (step = 0) shows a trip that costs nothing, because you're already there.
- **Starting from a smaller town along the way.** Starting at node 3 and running "step" to the end shows the algorithm weigh a short, expensive toll road against a longer, cheaper route before it settles on the cheapest way to node 9.

## Test yourself

1. Start the search at node 0 and run the play position all the way to the end.
2. Set the starting node to 9, right on top of the target.
3. Start at node 3 and move the play position past the halfway point.

## Intuition

Picture ten towns on a map, numbered 0 through 9, connected by roads that cost different amounts of fuel — some short cuts are pricey toll roads, some long ways round are cheap. Set the slider "start" to 0 and slide "step" to the right: watch the running-distance readout for each town lock in, one at a time, always settling the closest not-yet-locked town next. Once town 9, the destination, locks in, you have the cheapest route from home.

That locking-in step is what is called greedy: once a town's cheapest cost is fixed, it never changes again, and that's only safe because no road has a negative cost, so no hidden shortcut could undercut it later. Move "start" to node 3 instead of 0 and watch a single expensive direct road lose out to a longer chain of cheap roads on the way to node 9, exactly as a real trip planner would choose the toll-free detour to save money overall.

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
