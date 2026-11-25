---
title: Breadth-first search
summary: >-
  This search guarantees you'll find the shortest possible path between two
  points, layer by layer, before checking anything farther away.
parameters:
  start: start — starting node (0 = A … 9 = J)
  step: step — play position
variables:
  - the first-in-first-out list of nodes waiting to be explored
  - 'distance from the start node, measured in number of edges (hops)'
  - 'the set of nodes already discovered, so they are never queued twice'
---

## Try it

1. Leave «start» at 0 (circle A) and drag «step» slowly from 0 to 1 — circle A lights up first, then its direct neighbours B and F as one layer, then their neighbours C and G as the next layer. The visit order readout ends as A B F C G D H E I J, and the path length readout, 22, adds up the numbers on the 5 edges of the path to J.
2. Drag «step» back to 0 and forward again to replay the layers one at a time, and notice the goal, circle J, only lights up once every closer layer has already been explored.
3. Set «start» to 5 (circle F) and drag «step» to the end again — the layers redraw from the new starting point, and the goal is found in 4 hops (F, G, H, I, J) instead of 5, still the fewest possible.

## Real-life examples

- **Starting the search from yourself.** With start at 0 (circle A) and «step» dragged to the end, you watch the search spread outward in friend-of-friend layers until it reaches J: 5 introductions, the fewest needed to meet that person.
- **Starting from someone in the middle.** With start at 5 (circle F), the search begins one hop closer and reaches J in 4 layers instead of 5.
- **Starting right at the target.** With start at 9 (circle J) and «step» at 0, only J is marked, with a 0 beside it — its distance from itself is zero, and nothing has spread yet.

## Test yourself

1. Set start to 0 (circle A), then drag «step» all the way to the end.
2. Move start to 9 (circle J), wherever the play position happens to be.
3. Set start to 5 (circle F) and move «step» at least halfway.

## Intuition

Imagine you are looking for a classmate named Sam at a big party, and you only know who each person there knows, not where Sam is. You start by asking everyone you personally know — that's layer one — and if none of them is Sam, you ask everyone they know next — layer two — and so on, layer by layer, never skipping ahead. On screen that's the graph of 10 circles lettered A to J: the start slider picks which circle you begin at (0 is A, 9 is J), and dragging the step slider lights up each layer of neighbours before the next layer starts.

Because every layer finishes before the next one begins, the very first time you reach the target circle (always J), it has to be by the fewest possible hops — there is no way a shorter route was skipped, since it would have lit up in an earlier layer. Drag the step slider to replay the search at any point, or change the start node and drag it again: the layers redraw from wherever you begin, but the shortest-hop guarantee never breaks.

## Formal

BFS maintains a queue of discovered-but-unvisited nodes; it dequeues a node, marks it visited, and enqueues each unvisited neighbour, until the queue is empty or the target is found.

Because nodes are dequeued in the order they were first discovered, BFS visits nodes in strictly non-decreasing distance $d$ from the start, so the first time it reaches the target, that path uses the minimum number of edges.

## Advanced

BFS runs in O(V+E) time on a graph with V vertices and E edges, since each vertex is enqueued once and each edge is examined once. On unweighted graphs it is the shortest-path algorithm; on weighted graphs it must be replaced by Dijkstra's algorithm, which BFS is a special case of when every edge weight equals 1.

## Derivation

1. Begin with only the start node, at distance 0.
2. Every newly discovered node is exactly one hop farther than the node that found it.
3. Because layers are explored in order, the first arrival is guaranteed to be the fewest-hop path.

## Real world

### Social networks

"Degrees of separation" — friends of friends — is computed with BFS layer by layer from one person.

### GPS routing on unweighted maps

Finding the fewest intersections between two points (ignoring distance) is a direct BFS.

### Web crawling

Search engine crawlers often explore links breadth-first to sample a wide slice of the web before going deep.

### Puzzle solving

Finding the minimum number of moves to solve a sliding puzzle or a Rubik’s cube state is BFS over the space of configurations.
