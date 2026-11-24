---
title: Dijkstra's algorithm
summary: >-
  This is how GPS apps and network routers pick the cheapest route across a
  map or network where some connections cost more than others.
parameters:
  start: start — starting node (0 = A … 9 = J)
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

1. Set the slider "start" to 0 (circle A) and slide "step" slowly from 0 toward 1 — the small number beside each circle is its best distance so far, and the circles lock in (turn green) one at a time, always the smallest unlocked number first. At the end the path length A→J readout shows 15.
2. Reset "step" to 0, then set "start" to 9 (circle J) — the goal is now the start, so its distance is 0 before the search begins.
3. Set "start" to 4 (circle E) and drag "step" to the end — the direct edge E–J costs 6, but the chain E–I–J costs 2 + 3 = 5; Dijkstra locks in the smaller total, and the path length E→J readout shows 5.

## Real-life examples

- **Planning a road trip from home.** Starting at 0 (town A), home, with the play position run to the end (step = 1) shows the algorithm settle the cheapest route to every town on the map, ending at town J with a total of 15.
- **Already at your destination.** Starting at 9 (town J), the same town as the goal, with the play position at the very start (step = 0) shows a trip that costs nothing, because you're already there.
- **Starting from a smaller town along the way.** Starting at 4 (town E) and running "step" to the end shows the algorithm weigh a direct, expensive toll road (6) against a longer, cheaper route through I (5) before it settles on the cheapest way to town J.

## Test yourself

1. Start the search at 0 (circle A) and run the play position all the way to the end.
2. Set the starting node to 9 (circle J), right on top of the goal.
3. Start at 4 (circle E) and move the play position past the halfway point.

## Intuition

Picture ten towns on a map, lettered A to J, connected by roads that cost different amounts of fuel — some short cuts are pricey toll roads, some long ways round are cheap. Set the slider "start" to 0 (town A) and slide "step" to the right: watch the number beside each town lock in, one at a time, always settling the closest not-yet-locked town next. Once town J, the destination, locks in, you have the cheapest route from home.

That locking-in step is what is called greedy: once a town's cheapest cost is fixed, it never changes again, and that's only safe because no road has a negative cost, so no hidden shortcut could undercut it later. Move "start" to 4 (town E) instead of 0 and watch a single expensive direct road, E–J at 6, lose out to a longer chain of cheap roads, E–I–J at 5, on the way to town J, exactly as a real trip planner would choose the toll-free detour to save money overall.

## Formal

Dijkstra maintains a tentative distance $d(v)$ for every node (initially $\infty$ except $d(\text{start})=0$); it repeatedly extracts the unfinished node $u$ with minimum $d(u)$ from a priority queue, finalises it, and relaxes each edge $(u,v)$: $d(v) \gets \min(d(v), d(u)+w(u,v))$.

With a binary-heap priority queue the algorithm runs in $O((V+E)\log V)$ time; it requires every edge weight $w(u,v) \ge 0$, because a negative edge could make an already-finalised node's distance wrong in hindsight.

## Advanced

The more general Bellman–Ford algorithm tolerates negative edges (but not negative cycles) at the cost of O(VE) time by relaxing every edge up to V−1 times instead of relying on the greedy priority order. A* extends Dijkstra with a heuristic estimate of remaining distance, focusing the search toward the target instead of expanding uniformly outward.

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
