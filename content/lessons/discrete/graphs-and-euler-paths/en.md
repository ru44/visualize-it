---
title: 'Graphs and Euler paths'
summary: >-
  Count how many roads meet at each hub, and you can tell whether a single
  route could use every road exactly once, without trying every possible
  order.
parameters:
  start: start — node the search begins from
  step: step — how far the search has progressed
variables:
  - v — a single vertex (node) of the graph
  - 'degree: how many edges touch a vertex'
---

## Try it

1. Tap hub A to set it as the start, then watch hub A's neighbours turn green one by one as the search finds them.
2. Drag the step slider slowly from 0 to 1 and watch the numbers above each hub fill in — each one is that hub's distance from the start, in minutes.
3. Count the lines touching hub G: that count is its degree, and it sets how many directions the search could branch from there.

## Real-life examples

1. **Dispatching from the main depot.** A courier company starts every morning route at hub A, the depot, and plays the whole search (step = 1) to see the order trucks would reach all ten hubs.
2. **Starting from a satellite warehouse.** The same company opens a second warehouse at hub F, and starting the search there instead reaches a different set of hubs first, in a different order.
3. **A half-finished shift.** A dispatcher checks hub C's route halfway through the morning (step = 0.5) to see which hubs have already been reached and which are still waiting.

## Test yourself

1. Find a hub where an odd number of roads meet (there are four such hubs in this map).
2. Find a hub where four roads meet, the highest degree in this map.
3. Pause the search exactly halfway through its run.

## Intuition

Picture ten delivery hubs, labelled A to J, joined by roads that take between 2 and 7 minutes to drive, the number printed on each line. Tap hub A to make it the starting point, then drag the step slider from 0 to 1 to watch the search spread outward one layer at a time. The hubs directly joined to A turn green first, then the ones one road further away. Hub C touches four lines, so it has more ways to branch than hub A, which touches only two roads.

Four of these hubs have an odd number of roads meeting them: B, D, E and H. Mathematicians call that count the degree of a vertex, written $\deg(v)$, and a single walk that crosses every road exactly once, an Euler path, can only exist when 0 or 2 hubs have an odd degree. This map has four odd hubs, so no route can cover every road just once — you would have to retrace at least one.

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
