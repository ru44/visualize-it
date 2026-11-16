---
title: 'Graph colouring: maps and schedules'
summary: 'Assign colours so neighbouring vertices differ, then distinguish a successful colouring from a proof that fewer colours are impossible.'
parameters:
  k: 'k — number of available colours'
  order: 'order — first region in the cyclic processing order; tap a region'
variables:
  - 'G: graph of regions and shared borders'
  - 'χ: fewest colours needed for a proper colouring'
  - 'Δ: largest number of neighbours of any vertex'
---

## Try it

1. Set order = 0 (WA) and k = 2. SA has no available colour and receives a dashed red outline.
2. Keep order = 0 and set k = 3. Every region gets a colour without a conflict.
3. Keep k = 3 and set order = 4. QLD now has no available colour. The starting region changes the greedy choices; a failed attempt alone does not prove that no colouring exists.

## Real-life examples

1. **Two colours.** With k = 2 and order = 0, WA and NT use different colours. SA borders both and needs a third. These three mutually adjacent regions prove that two colours cannot work.
2. **Three colours.** With k = 3 and order = 0, every region is coloured. Combining this construction with the triangle argument proves that the minimum is exactly three.
3. **Four available colours.** With k = 4 and order = 2, the method completes a colouring. Allowing four colours does not mean that all four must be used.

## Test yourself

1. Set k = 2 and inspect which regions the method cannot colour.
2. Set k = 4 and inspect the resulting colouring.
3. Set order = 6 to begin with TAS, which has no shared borders in this model.

## Intuition

Suppose each region needs a colour different from every region sharing a border with it. Regions that do not share a border may reuse a colour. We can represent each region by a vertex and each shared border by an edge; then the rule is that the two ends of every edge must differ.

The diagram uses a greedy method: process the regions in the displayed order and give each the first available colour. It never revises an earlier choice. A dashed outline means this procedure has run out of allowed colours at that region. To prove that two colours are impossible here, use the triangle WA–NT–SA: all three pairs are neighbours, so all three need different colours.

## Formal

A proper colouring of a finite simple graph $G$ assigns colours to vertices so that adjacent vertices differ. The chromatic number $\chi(G)$ is the minimum number needed. This is a property of the graph, not of one chosen processing order.

Let $\Delta(G)$ be the largest vertex degree. When greedy colouring reaches a vertex, at most $\Delta(G)$ colours are forbidden by previously coloured neighbours. With $\Delta(G)+1$ colours, at least one remains available, proving $\chi(G) \le \Delta(G)+1$.

## Advanced

Every planar graph can be properly coloured with at most four colours. This existence theorem does not say that any greedy order will find such a colouring. It also does not apply to every scheduling graph: conflicts in a schedule may form a nonplanar graph. For maps, sharing only a point does not count as sharing a border.

## Derivation

1. Visit the vertices in order, choosing a colour not used by any already coloured neighbour.
2. The number of forbidden colours cannot exceed the number of neighbours, which is at most the graph's maximum degree.
3. One more colour than that maximum guarantees an available choice at every step, so the method constructs a proper colouring.

## Real world

### Exam timetables

Represent exams by vertices and connect two if a student must take both. Colours represent time slots. A proper colouring avoids clashes, assuming other scheduling restrictions are handled separately.

### Sudoku constraints

Represent cells by vertices and connect cells that must contain different digits. Digits act as colours. The given clues fix some colours before the remaining cells are filled.
