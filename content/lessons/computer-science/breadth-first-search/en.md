---
title: Breadth-first search
summary: >-
  Explore a graph one layer at a time using a queue, guaranteeing the shortest
  path measured in hops.
parameters:
  start: start — starting node
  step: step — play position
variables:
  - the first-in-first-out list of nodes waiting to be explored
  - 'distance from the start node, measured in number of edges (hops)'
  - 'the set of nodes already discovered, so they are never queued twice'
---

## Intuition

Set the start node and press play: the node lights up, then every neighbour directly connected to it lights up together as one layer, then every neighbour of those lights up as the next layer, and so on until the target node is reached. Nodes never jump the queue — the algorithm always finishes an entire layer before starting the next one.

That layer-by-layer order is exactly what makes BFS find the shortest path in hops: the first time the target is reached, it must be by the fewest possible edges, because every shorter path would already have been explored in an earlier layer. Change the start node and the layers redraw from the new source, but the guarantee stays the same.

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
