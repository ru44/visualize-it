---
title: 'Graphs and Euler paths'
summary: 'Count the connections at each vertex to decide whether a connected network can be traversed using every edge exactly once.'
parameters:
  start: 'start — starting vertex: A = 0 through J = 9'
  step: 'step — progress through the search, from 0 to 1'
variables:
  - 'v: a vertex of the graph'
  - 'degree: number of edges meeting a vertex'
---

## Try it

1. Set start = 0 (A) and step = 0. Increase step toward 1 to inspect a breadth-first search. This animation explores vertices; it does not construct an Euler route.
2. Count the edges meeting A and B: A has 2, B has 3. Ignore the numbers on the edges when counting connections.
3. Count all ten degrees. B, D, E and H have odd degree, so this connected graph has no route using every edge exactly once.

## Real-life examples

1. **Exploring from depot A.** With start = 0 and step = 1, the search has visited all ten hubs. Its discovery connections do not form a trip covering every road once.
2. **Exploring from depot F.** With start = 5 and step = 1, the visit order changes. The degrees do not change, so the Euler-route conclusion stays the same.
3. **Pausing the search.** With start = 2 and step = 0.5, inspect the partially explored graph. Halfway through the animation does not mean half the road distance has been travelled.

## Test yourself

1. Select a vertex with odd degree.
2. Select a vertex with degree 4, the largest degree in this graph.
3. Set the search progress to 0.5.

## Intuition

Represent junctions by vertices and roads by edges. The degree of a vertex is the number of edges meeting it. A has two connections, to B and F. B has three, to A, C and G. The weights printed on the roads are separate information; they do not affect degree.

Imagine a route that uses every road once. Whenever it passes through an intermediate junction, it uses one edge to enter and another to leave. Those edges pair up. Only the starting and ending vertices can have an unpaired edge. This graph has four odd-degree vertices, B, D, E and H, so it cannot have such a route.

## Formal

An undirected graph consists of vertices and edges joining them. The degree $\deg(v)$ counts edges incident to v, counting a loop twice if loops are allowed. A trail may revisit vertices but does not repeat edges. An Euler trail, often called an Euler path, uses every edge exactly once.

For a finite undirected graph with at least one edge, an Euler trail exists exactly when all vertices incident to edges lie in one connected component and there are zero or two odd-degree vertices. With zero, the trail closes and may start at any vertex incident to an edge. With two, those vertices must be its endpoints.

## Advanced

The pairing argument explains why the degree condition is necessary. To show sufficiency, one can build trails and splice closed trails into them until every edge is used. Connectivity is essential: two separate cycles have only even degrees, yet no single trail can cover both. The breadth-first search shown here minimizes edge count to reachable vertices; its displayed accumulated weights need not be minimum-weight distances.

## Derivation

1. At an intermediate visit, arrival and departure use two distinct edges because an Euler trail cannot reuse an edge.
2. At every vertex other than two distinct endpoints, these uses pair up, making the degree even.
3. An open trail leaves one unpaired use at each endpoint. A closed trail leaves none. Thus an Euler trail has two odd-degree vertices or zero; connectivity is also required.

## Real world

### Covering every street

For an undirected street network, the rule tells us whether a route can cover each street exactly once. If not, a route covering all streets must repeat some edges or use multiple trips.

### Drawing without retracing

Treat intersections and endpoints in a line drawing as vertices. The same test determines whether the drawing can be traced in one stroke without retracing a line, provided its edges form one connected part.
