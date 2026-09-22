---
title: Depth-first search
summary: >-
  This is how a computer finds its way through a maze, a file system, or a
  puzzle by committing to one path and backing up only when it hits a dead
  end.
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

## Try it

1. Set the slider "start" to 0 and drag "step" slowly from 0 toward 1 — watch a single path snake from node 0 toward the target, node 9, one neighbour at a time.
2. Drag "step" back to 0, then set "start" to 9 — the path begins right on the target, so there's nowhere left to search.
3. Set "start" to 4 and slide "step" past the halfway point — watch the path backtrack, jumping back to an earlier node, at least once before it reaches node 9.

## Real-life examples

- **Exploring a corn maze from the gate.** Starting at node 0, the entrance, with the play position run to the end (step = 1) shows the complete path DFS commits to before it reaches node 9, backtracking wherever the maze forces a dead end.
- **Already standing at the exit.** Starting at node 9, the same node as the target, with the play position paused at the very beginning (step = 0) shows the search finishing instantly, because there is nowhere left to go.
- **Starting from the middle of the maze.** Starting at node 4 and running the play position all the way to the end (step = 1) shows how many times the path has to double back before it finally reaches node 9.

## Test yourself

1. Start the search at node 0 and let the animation play out fully, all the way to the target.
2. Move the starting node to node 9, right on top of the target itself — the search that finds it instantly.
3. Start the search at node 4 and push the play position past halfway — catch the path backtracking on its way to node 9.

## Intuition

Picture a corn maze with 10 numbered rooms, 0 through 9, and a single exit at room 9. Set the slider "start" to 0 and slide "step" slowly to the right: a single path snakes out from room 0, committing to one doorway at a time and diving as deep as the maze allows, instead of spreading out to every nearby room at once. Only when the current room has no unexplored doorway left does the path step back — backtrack — to the most recent room that still has one.

That backing-up behaviour is exactly what happens when you retrace your steps in a real maze after hitting a dead end: you don't start over, you just return to the last junction with an unused turn. Move "start" to node 4 instead of 0 and watch the path from the middle of the maze twist and double back several times before finally reaching room 9, the target, because DFS commits to whichever path it finds first, which is often longer than the shortest way out.

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
