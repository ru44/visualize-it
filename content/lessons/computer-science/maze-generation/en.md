---
title: Maze generation
summary: A computer can draw a maze that has exactly one path between any two points, by growing a tree instead of drawing corridors by hand.
parameters:
  algo: algorithm
  size: grid size
  step: walls opened
variables:
  - the maze's cells — the grid you're carving
  - the walls removed — the corridors you can walk through
charts: []
---

## Try it

1. Leave the algorithm on depth-first backtracking and press play. Watch it dig one long corridor, backtrack when it's stuck, and dig again.
2. Slide the algorithm to Prim's and play again, on the same grid size. Notice how many more short dead ends appear near the start.
3. Raise "grid size" and replay either algorithm. The green start and red finish stay connected by exactly one route, however big the maze gets.

## Real-life examples

1. **A hedge maze dug in one long walk.** Depth-first backtracking always pushes forward into new ground and only turns back when it's boxed in, which is exactly how a single gardener digging one path at a time would work — the result is a long, winding maze with few branches.
2. **A maze grown from a seed at the centre.** Prim's algorithm keeps a shopping list of every wall next to ground it has already dug and opens a random one from that list each step, so passages sprout from many places at once — the result is short, evenly spread dead ends.
3. **A theme-park maze covering a whole field.** Both algorithms scale to any grid size, but a bigger field needs more walls opened, and depth-first backtracking's corridors get proportionally longer as the field grows.

## Test yourself

1. Run depth-first backtracking all the way to the end.
2. Run Prim's algorithm all the way to the end, on the same grid size.
3. Carve a complete maze on a grid at least 15 cells wide.

## Intuition

Picture a gardener with a pair of shears, standing in one corner of a hedge field. Depth-first backtracking is a gardener who always cuts straight into whichever neighbouring square hasn't been touched yet, and only turns around — backtracks — once every neighbour is already cut. You see the orange square race ahead in one long thread, then jump backward several squares at once when it hits a dead end, before pushing forward again from there.

Prim's algorithm instead keeps a running list of every wall that borders cut ground, and at each step picks one wall from that whole list at random, wherever it happens to sit on the grid. Because the pick can land anywhere on the frontier, not just at the newest cut square, the maze grows outward from many points on its edge together, leaving lots of short branches instead of one long thread.

## Formal

Both algorithms build a spanning tree of the grid graph: a set of opened walls that connects every cell, contains no cycle, and is unique between any two cells. For a grid of $V$ cells that means opening exactly $E = V - 1$ walls, out of the many more that could have been opened.

Depth-first backtracking is randomized depth-first search on that graph; Prim's algorithm is randomized Prim's algorithm with every edge weighted equally, so it always grows from the whole visited frontier rather than from one advancing point.

## Advanced

Both are special cases of choosing a uniformly random spanning tree only when every edge has the same weight; assign each wall a random real weight instead and Prim's algorithm becomes the minimum spanning tree algorithm, which is no longer what generates a maze. Kruskal's algorithm — sort every wall randomly and open it unless it would close a cycle, checked with a union-find structure — produces yet another texture, closer to Prim's than to depth-first, because it too can open a wall anywhere on the grid.

## Derivation

1. A perfect maze — one path between any two cells, no loops — is exactly a spanning tree of the grid graph.
2. A tree never has a cycle, and adding any edge to a tree either reconnects two already-separate parts or closes a cycle; a tree on $V$ vertices always has exactly $V - 1$ edges.
3. So an algorithm that opens walls without ever reconnecting two already-visited cells will, after opening exactly $V - 1$ walls, leave every pair of cells joined by one unique path.

## Real world

### Video game level generation
Roguelike dungeons are often grown with exactly this kind of randomized spanning-tree carving, then decorated with rooms and monsters afterwards.

### Circuit board routing
Connecting every component on a board with the least wire, without any loop wasting copper, is the same spanning-tree problem the maze algorithms solve.

### Network design
An internet backbone that must reach every city at least once, as cheaply as possible, is solved by the weighted cousin of these algorithms: the minimum spanning tree.

### Puzzle books
The winding, single-corridor look of a printed "solve the maze" puzzle usually comes from depth-first backtracking; its long dead ends make for a harder, more satisfying puzzle than Prim's shorter branches.
