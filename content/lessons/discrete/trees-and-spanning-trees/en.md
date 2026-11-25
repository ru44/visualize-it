---
title: 'Trees and spanning trees: connecting for less'
summary: 'Connect all vertices without cycles, then use edge costs to find a spanning tree with the smallest total.'
parameters:
  step: 'step — fraction of the 14 sorted candidate edges considered'
  town: 'town — farm whose connected group is highlighted: A = 0 through H = 7'
variables:
  - 'E: edges accepted into the tree'
  - 'V: vertices, represented by the eight farms'
---

## Try it

1. Set step = 0, then increase it to 0.14. Two edges have been considered and accepted, joining B to C and D to E.
2. Set step = 0.5. Seven accepted edges connect all eight farms, with total weight 25.
3. Set step = 0.57. The eighth considered edge is rejected because its endpoints are already connected. Tap different farms to inspect their connected group; the selected farm does not change the algorithm.

## Real-life examples

1. **Completed network.** With step = 1 and town = 0, all 14 candidate pipes have been considered. Seven are accepted, seven rejected, and the total weight is 25.
2. **Connected before the list ends.** With step = 0.5 and town = 6, all eight farms are already connected. The remaining candidates cannot add a new connection between separate groups.
3. **Two early connections.** With step = 0.14 and town = 1, the accepted edges are B–C and D–E. B's connected group contains only B and C.

## Test yourself

1. Set step = 0.5 to inspect the completed tree after seven candidates have been considered.
2. Set step close to 8/14, about 0.57, to see the first rejected edge.
3. Select farm G, corresponding to town = 6, and inspect its connected group at different stages.

## Intuition

The eight farms are vertices, and each candidate pipe is an edge with a cost. Start with no pipes: there are eight separate groups. Adding a pipe between two groups merges them. Adding a pipe inside an already connected group creates a cycle instead, giving an alternative route between its endpoints.

The diagram considers pipes from cheapest to most expensive and accepts a pipe only when it merges separate groups. This is Kruskal's algorithm. Seven accepted pipes reduce eight groups to one. The result connects every farm without a cycle, so it is a spanning tree. Here its total cost is the smallest possible among all spanning trees using the candidate edges.

## Formal

A tree is a connected undirected graph with no cycles. A spanning tree includes every vertex of the original graph and a subset of its edges. For $|V|$ vertices, it has $|E|=|V|-1$ edges. Removing any tree edge disconnects it; adding an edge between two of its vertices creates a cycle.

A minimum spanning tree minimizes the sum of its edge weights. For a connected weighted undirected graph, Kruskal's algorithm sorts edges by weight and accepts each unless it creates a cycle. It can stop after accepting $|V|-1$ edges. The visualization continues through the remaining candidates to show their rejection.

## Advanced

The edge-count argument proves why a tree needs seven edges here; it does not by itself prove minimum cost. The greedy choice is justified by an exchange argument: a cheapest edge joining separate components can replace an edge crossing the same separation in a minimum tree without increasing cost. Distinct weights guarantee a unique minimum spanning tree; ties may allow several.

## Derivation

1. Initially every vertex forms a separate group, so there are as many groups as vertices.
2. Each accepted edge merges exactly two groups and reduces the group count by one.
3. Reaching one connected group from eight needs seven merges. In general, the required edge count is one less than the number of vertices.

## Real world

### Comparing connection costs

A spanning-tree model compares the total cost of connecting sites using a fixed set of candidate links. It assumes total link cost is the objective; capacity and failure tolerance may call for extra connections in an actual network.

### Grouping points

One way to group data points is to build a minimum spanning tree with distances as weights, then remove selected long edges. The remaining connected components form groups.
