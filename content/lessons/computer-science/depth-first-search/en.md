---
title: Depth-first search
summary: >-
  This is how a computer finds its way through a maze, a file system, or a
  puzzle by committing to one path and backing up only when it hits a dead
  end.
parameters:
  start: start — starting node (0 = A … 9 = J)
  step: step — play position
variables:
  - the last-in-first-out list of nodes to explore next
  - the set of nodes already discovered
  - >-
    stepping back to the previous node once every neighbour of the current one
    is visited
---

## Try it

1. Set the slider "start" to 0 (circle A) and drag "step" slowly from 0 toward 1 — watch a single path snake from A toward the goal, circle J, one neighbour at a time: A, F, G, H, I, J.
2. Drag "step" back to 0, then set "start" to 9 (circle J) — the path begins right on the goal, so J is the very first circle visited.
3. Set "start" to 3 (circle D) and slide "step" past the halfway point — the path goes D, I, J, finds no new neighbour at J, and backtracks: it jumps back to I's other neighbour, H.

## Real-life examples

- **Exploring a corn maze from the gate.** Starting at 0 (room A), the entrance, with the play position run to the end (step = 1) shows the one path DFS commits to, A F G H I J, reaching the exit without a single dead end on the way.
- **Already standing at the exit.** Starting at 9 (room J), the same room as the goal, with the play position paused at the very beginning (step = 0) shows the search finishing instantly, because there is nowhere left to go.
- **Starting from the middle of the maze.** Starting at 3 (room D) and running the play position all the way to the end (step = 1) shows the path reach J after two moves, then double back to H to finish exploring the other rooms.

## Test yourself

1. Start the search at 0 (circle A) and drag the play position all the way to the end.
2. Move the starting node to 9 (circle J), right on top of the goal itself — the search that finds it instantly.
3. Start the search at 3 (circle D) and push the play position past halfway — catch the path backtracking from J to H.

## Intuition

Picture a corn maze with 10 rooms lettered A to J, and a single exit at room J. Set the slider "start" to 0 (room A) and slide "step" slowly to the right: a single path snakes out from room A, committing to one doorway at a time and diving as deep as the maze allows, instead of spreading out to every nearby room at once. Only when the current room has no unexplored doorway left does the path step back — backtrack — to the most recent room that still has one.

That backing-up behaviour is exactly what happens when you retrace your steps in a real maze after hitting a dead end: you don't start over, you just return to the last junction with an unused turn. Move "start" to 3 (room D) instead of 0 and watch the path reach room J, the goal, and then double back to H because J has no unexplored doorway. DFS keeps whichever path it finds first, which is often longer than the shortest way out: from room E (start = 4) it walks straight to J and the path length readout shows 6, although going through I would add up to only 5.

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
