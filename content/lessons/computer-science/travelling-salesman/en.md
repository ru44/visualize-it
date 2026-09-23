---
title: The travelling salesman problem
summary: Checking every possible delivery route works for a handful of stops, but the number of routes explodes so fast that no computer will ever check them all once the list gets long.
parameters:
  n: cities
  mode: method
  step: play position
variables:
  - how many cities there are
  - how many distinct routes visit every city once
charts: []
---

## Try it

1. Leave "method" on brute force with 6 cities and press play. Watch it try route after route, keeping the shortest found so far.
2. Raise "cities" to 8 and play again. The counter climbs into the thousands before the pass finishes, for two more cities.
3. Slide "method" to nearest neighbour and play. It picks a route instantly, but the dashed green line — the true shortest route — is sometimes a little shorter.

## Real-life examples

1. **A delivery van with 5 addresses.** Brute force checks every possible order and always finds the true shortest route, because with only 5 addresses there aren't many to check.
2. **A delivery van with 8 addresses.** Brute force still finds the true shortest route, but the counter now climbs past twenty thousand before it's done — three more stops turned "not many" into "a lot".
3. **A warehouse robot with 8 stops and one second to decide.** There's no time to check them all, so it uses nearest neighbour instead: always drive to the closest stop not yet visited. The route it picks is usually close to shortest, and it's ready instantly.

## Test yourself

1. Run brute force to the end with 8 cities.
2. Run nearest neighbour to the end, at any number of cities.
3. Run brute force to the end with only 4 cities, and see how quickly it finishes compared to 8.

## Intuition

With 4 cities there are only 3 genuinely different routes, and you could check them by hand in a minute. Add a fifth city and it's 12; a sixth and it's 60; by the eighth city, brute force is comparing over twenty thousand routes, and you can watch the "routes checked" counter climb to prove it. Every extra city multiplies the work by roughly the number of cities you already had — that's what "explodes" means here, not a vague feeling but a counter that visibly outruns the slider.

Nearest neighbour never checks more than one route: starting from the orange city, it always jumps to whichever unvisited city is closest right now, the way you might grab bags leaving a party by never walking further than you have to. That greedy choice is fast at any size, but a close stop now can strand you far from everything else later — which is why its solid route is sometimes a little longer than the dashed shortest one.

## Formal

Fixing one city as the start, the other $n - 1$ cities can be ordered in $(n - 1)!$ ways, and each ordering and its reverse trace the same loop, so the count of genuinely different routes is $R = \dfrac{(n - 1)!}{2}$.

No known algorithm finds the guaranteed shortest route faster than roughly $R$ in the worst case — the problem is NP-hard — so every exact solver either accepts that growth or, like nearest neighbour, gives up the guarantee of optimality for speed.

## Advanced

Dynamic programming (Held–Karp) finds the exact shortest route in $O(n^2 2^n)$ time by reusing the best route to every subset of visited cities, which beats brute force badly for mid-sized $n$ but is still exponential and useless past a few dozen cities. Real routing software instead uses heuristics like nearest neighbour as a starting guess, then improves it with local moves such as 2-opt, which repeatedly uncrosses any pair of edges that cross themselves, usually landing within a few percent of the true optimum in a fraction of a second.

## Derivation

1. Fix one city as the start; the other $n - 1$ cities can then be arranged in $(n - 1)!$ different orders.
2. Walking any of those orders forward or backward visits the same cities in the same loop, so each loop has been counted twice.
3. Dividing by two, $R = \dfrac{(n - 1)!}{2}$ counts every genuinely different route exactly once.

## Real world

### Delivery and ride-sharing apps
Routing dozens of stops for a driver uses heuristics and local search, not brute force, because real routes need an answer in milliseconds, not hours.

### Circuit board drilling
A drill that must visit thousands of hole positions on a circuit board is the same problem with points instead of cities, and it's where the name "travelling salesman" first stuck in engineering.

### DNA sequencing
Reassembling a genome from overlapping fragments can be framed as finding a short route through the fragments, one of many disguises this problem wears in computer science.

### Chip design
Wiring components on a chip so the total wire length is short is a close cousin of the same routing problem, solved with the same family of heuristics.
