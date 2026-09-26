---
title: 'Graph colouring: maps and schedules'
summary: >-
  Colour every region of a map so that no two touching regions share a
  colour, and you never need more than four — the same trick keeps clashing
  exams, radio channels and computer variables apart.
parameters:
  k: colours allowed — how many colours you are allowed to use
  order: start — which region the colouring begins from (tap a region)
variables:
  - the graph made from the map — one node per region, one edge wherever two regions share a border
  - the chromatic number — the fewest colours any proper colouring of the map can use
  - the maximum degree — the largest number of neighbours any single region touches
---

## Try it

1. Tap the WA region to start colouring from there, and watch each region fill in with the smallest colour number not already used by an already-coloured neighbour.
2. Drag "colours allowed" down to 2 and notice SA — the region touching the most others — turn hatched red: two colours are not enough for this map.
3. Drag "colours allowed" back up to 3, then to 4, and watch the red hatching disappear both times.

## Real-life examples

1. **Two colours are not enough.** With only two colours allowed, starting the count at Western Australia, South Australia ends up clashing with a neighbour — proof that this map genuinely needs more than two.
2. **The minimum that works.** Three colours, again starting at Western Australia, colour every one of the seven regions with no clash at all — the fewest colours this real map actually needs.
3. **The theorem's promise.** Four colours, starting instead from South Australia, also finish with zero clashes — the number the four-colour theorem guarantees will always be enough, for any flat map at all.

## Test yourself

1. Set "colours allowed" to 2 and find the region that always ends up hatched red, whichever region you start counting from.
2. Set "colours allowed" to 4, the number the four-colour theorem promises is always enough for a map drawn on a flat page.
3. Start the colouring from Tasmania, the one region with no shared border with any other, and see that it is never the one hatched red.

## Intuition

Picture a simplified map of Australia's states and territories, split into seven regions. Two regions that share a real border, like Western Australia and South Australia, are not allowed to be painted the same colour — otherwise you could not tell on the map where one state ends and the other begins. Tap any region to start colouring from there; the picture then works its way around the map, giving each new region the lowest-numbered colour that none of its already-painted neighbours are using.

South Australia is the busiest region here — it shares a border with five others — so it is the first to run out of options when colours are scarce. With only two colours allowed, whichever of its mutually touching neighbours gets coloured last is left with no valid colour, and is shown hatched in red. Add a third colour and the clash disappears completely: three colours turn out to be enough for every region in this map, however you order the count.

## Formal

A proper colouring of a graph $G$ assigns each vertex a colour so that no edge joins two vertices of the same colour. The chromatic number $\chi(G)$ is the fewest colours any proper colouring can use; a map's regions and shared borders form exactly such a graph, one vertex per region and one edge per shared border.

A simple greedy method always finds some proper colouring, though maybe not the cheapest one: visit the vertices in any order, and give each the lowest-numbered colour not already used by an earlier-coloured neighbour. Since a vertex has at most $\Delta(G)$ neighbours, at most $\Delta(G)$ colours can be blocked when its turn arrives, so $\Delta(G)+1$ colours are always enough for this method to succeed: $\chi(G) \le \Delta(G) + 1$.

## Advanced

For maps drawn on a flat page specifically, a far stronger fact holds no matter how tangled the borders are or how high any one region's degree climbs: four colours always suffice. That is the four-colour theorem, conjectured in 1852 and finally proved in 1976 by Kenneth Appel and Wolfgang Haken with the help of a computer checking around 1,900 special cases — the first major theorem whose proof genuinely depended on a machine.

## Derivation

1. Colour the regions one at a time, in whatever order you like, always giving the next region the smallest colour number that none of its already-coloured neighbours are using.
2. Any single region touches at most $\Delta(G)$ other regions, so when its turn comes, at most $\Delta(G)$ colour numbers can already be ruled out by its neighbours.
3. That leaves at least one colour free whenever $\Delta(G)+1$ colours are available, so this method can never get stuck once $\chi(G) \le \Delta(G)+1$.

## Real world

### Exam and shift scheduling
Each exam is a region, and two exams touch if any student must sit both; colouring by allowed time-slot guarantees no student is ever asked to be in two exams at once, and the same trick schedules work shifts around shared staff.

### Mobile phone masts
Nearby radio masts must use different frequency channels or their signals interfere, exactly like touching map regions needing different colours; network planners solve a colouring problem to reuse as few channels as possible across a whole city.

### Register allocation in compilers
A compiler assigns each variable in a running program to one of a small number of processor registers; two variables that are both in use at the same time cannot share a register, so the compiler colours a graph of variables to pack them into as few registers as it can.

### Sudoku and printed atlases
Sudoku is a colouring puzzle in disguise — each cell is a vertex, and cells sharing a row, column or box are joined by an edge; printers colouring a real atlas use the very same rule as this lesson, keeping ink costs down by never using more colours than the four-colour theorem says they need to.
