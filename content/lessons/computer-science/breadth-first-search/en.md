---
title: Breadth-first search
summary: >-
  This search guarantees you'll find the shortest possible path between two
  points, layer by layer, before checking anything farther away.
parameters:
  start: start — starting node
  step: step — play position
variables:
  - the first-in-first-out list of nodes waiting to be explored
  - 'distance from the start node, measured in number of edges (hops)'
  - 'the set of nodes already discovered, so they are never queued twice'
---

## Try it

1. Leave «start» at node 0 and press play — watch node 0 light up, then its direct neighbours light up together as one layer, then their neighbours as the next layer.
2. Drag «step» back to 0 and forward again to replay the layers one at a time, and notice the target node (9) only lights up once every closer layer has already been explored.
3. Change «start» and press play again — the layers redraw from the new starting point, but the target is still always found in the fewest possible hops.

## Real-life examples

- **Starting the search from yourself.** With start at node 0 and the animation played through, you watch the search spread outward in friend-of-friend layers until it reaches node 9, showing the fewest introductions needed to meet that person.
- **Starting from someone in the middle.** With start at node 5, the search begins from a node already several hops into the network, often reaching node 9 in fewer layers.
- **Starting right at the target.** With start at node 9 and the animation paused at the very beginning, node 9 lights up alone — its distance from itself is zero, and nothing has spread yet.

## Test yourself

1. Set start to node 0, then let the animation play all the way to the end.
2. Move start to node 9, wherever the play position happens to be.
3. Set start to node 5 and play at least halfway through the animation.

## Intuition

Imagine you are looking for a classmate named Sam at a big party, and you only know who each person there knows, not where Sam is. You start by asking everyone you personally know — that's layer one — and if none of them is Sam, you ask everyone they know next — layer two — and so on, layer by layer, never skipping ahead. On screen that's the graph of 10 numbered circles: the start slider picks which circle you begin at, and pressing play lights up each layer of neighbours together before the next layer starts.

Because every layer finishes before the next one begins, the very first time you reach the target circle (always node 9), it has to be by the fewest possible hops — there is no way a shorter route was skipped, since it would have lit up in an earlier layer. Drag the step slider to replay the search at any point, or change the start node and press play again: the layers redraw from wherever you begin, but the shortest-hop guarantee never breaks.

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
