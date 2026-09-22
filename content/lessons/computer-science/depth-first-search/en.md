---
title: Depth-first search
summary: >-
  Plunge as deep as possible along one path using a stack, backtracking only
  when stuck — the algorithm behind mazes and recursion.
parameters:
  start: start — starting node
  step: step — play position
variables:
  - the last-in-first-out list of nodes to explore next
  - the set of nodes already discovered
  - >-
    stepping back to the previous node once every neighbour of the current one
    is visited
---

## Intuition

Press play and watch a single path snake out from the start node, committing to one neighbour at a time and diving as deep as the graph allows, instead of spreading out layer by layer like BFS does. Only when the current node has no unvisited neighbour left does the path step back — backtrack — to the most recent node that still has an unexplored option.

That stack-like behaviour is exactly what recursive function calls do for free: each call is "go deeper," and returning from a call is the backtrack. Compare the path DFS traces to the layered spread BFS draws on the same graph — DFS reaches the target by whatever path it commits to first, which is often longer, not shorter.

## Formal

DFS maintains a stack (explicit, or implicit via recursion): it visits a node, marks it visited, and recurses into the first unvisited neighbour; when no unvisited neighbour remains, it returns (pops) to the previous node.

Unlike BFS, DFS gives no shortest-path guarantee — it finds a path to the target, not necessarily the shortest one — but it uses only O(d) extra memory for the current path (or its recursion stack), where d is the maximum depth reached, versus BFS's O(V) queue in the worst case.

## Advanced

DFS runs in O(V+E) time, the same bound as BFS, but its recursion naturally computes extra structure for free: discovery and finish times classify every edge as a tree, back, forward or cross edge, which is exactly how cycle detection and topological sorting of a directed acyclic graph are implemented.

## Derivation

1. Begin with just the start node on the stack (or as the first recursive call).
2. Always commit to going one step deeper before considering any alternative.
3. When a branch is exhausted, return to the nearest node that still has options.

## Real world

### Maze generation and solving
Carving or solving a maze by always taking an unexplored passage and backing up at dead ends is DFS.

### Puzzle and game solvers
Chess engines and Sudoku solvers explore one line of play to its conclusion before backtracking — DFS with pruning.

### Compilers
Detecting cycles in dependency graphs (e.g. circular imports) and topologically ordering build steps both use DFS.

### File system traversal
Recursively walking into every subfolder before moving to a sibling folder is DFS over the directory tree.
