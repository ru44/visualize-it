---
title: 'Graphs and Euler paths'
summary: >-
  A graph is just dots and the lines between them. Count how many lines meet
  at each dot, and you can tell whether one walk can cross every line once.
parameters:
  start: start — node the search begins from
  step: step — how far the search has progressed
variables:
  - v — a single vertex (node) of the graph
  - 'degree: how many edges touch a vertex'
---

## Intuition

Drag start around the ten labelled nodes A–J and watch the search spread outward, one layer at a time, along the weighted edges connecting them. Each node's degree — how many edges touch it — controls how many directions the search can branch into right there; a node with three neighbours offers three ways forward, a dead end offers none.

Degree is also the key to a much older puzzle than any search algorithm: the bridges of Königsberg. Picture each landmass as a node and each bridge as an edge, exactly like the nodes and edges you see here, and the question becomes purely about counting how many edges meet at each node.

## Formal

A graph consists of vertices (the nodes) and edges (the connections between pairs of them); a path is a sequence of edges that visits vertices one after another without repeating an edge. The degree of a vertex, $\deg(v)$, is simply how many edges touch it.

An Euler path — a walk that uses every edge of the graph exactly once — exists if and only if the graph has zero or two vertices of odd degree; with zero, the walk can start and end anywhere, and with two, it must start at one odd vertex and end at the other.

## Advanced

The Königsberg bridge problem asked whether a walker could cross all seven bridges exactly once; Euler showed it was impossible because all four landmasses had odd degree, far more than the two allowed. A tree is a special graph with no cycles at all, exactly $n-1$ edges for n vertices, and exactly one path between any two vertices — the strict minimum of connections needed to keep a graph connected.

## Derivation

1. Any time an Euler path passes through a vertex without stopping there, it enters along one edge and leaves along another, using up exactly two of that vertex's edges.
2. Since every visit to a non-endpoint vertex uses edges two at a time, that vertex's total degree must come out even, with nothing left over.
3. Only the walk's two endpoints can break that pattern, since they use just one edge each at the very start or the very end, so at most two vertices are allowed to have odd degree.

## Real world

### Road and delivery networks
A route that covers every street in a neighbourhood exactly once, like some snowplough or mail routes, only exists cleanly when the street graph obeys the odd-degree rule.

### Social networks
Each person is a vertex and each friendship an edge; a person's degree is simply their number of direct friends, and the whole graph reveals clusters and central connectors.

### Circuit boards and wiring
Router and printed-circuit-board tools use graph structure to plan traces, and tree-shaped wiring (no cycles) is often preferred to guarantee a unique path between any two points.

### The internet and computer networks
Routers are vertices and physical or logical links are edges; the same degree and connectivity ideas decide reachability and how traffic can route around a failed link.
