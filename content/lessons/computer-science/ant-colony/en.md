---
title: Ant colony optimization
summary: No single ant plans a route; a short path just gets walked, and re-walked, and marked with scent more often than a long one, until the whole colony ends up using it.
parameters:
  n: cities
  rho: evaporation rate
  iter: generation
variables:
  - how much pheromone sits on one edge right now
  - the evaporation rate — how much of that pheromone disappears each generation
  - the pheromone the generation's best tour adds back
charts: []
---

## Try it

1. Press play with a low evaporation rate. Watch the lines slowly thicken as pheromone piles up on the edges ants keep reusing.
2. Raise "evaporation rate" and play again. Weak trails vanish almost every generation, so only a handful of edges ever get thick.
3. Raise "cities" and replay. It takes longer, but the green best-tour line keeps getting a little shorter as the generations pass.

## Real-life examples

1. **A real ant trail that lasts for days.** A slow-fading pheromone, set by a low evaporation rate, lets many overlapping trails coexist for a while, so the colony explores widely before settling on a route.
2. **A pheromone that fades in minutes.** A high evaporation rate wipes out any trail the ants aren't actively reinforcing, so only the very best route stays marked at all.
3. **A delivery network with 11 depots.** More stops mean more possible tours to sift through, and a moderate evaporation rate lets the colony explore several before committing to one.

## Test yourself

1. Let the colony run all 30 generations.
2. Push "evaporation rate" to 0.6 or higher and run at least 15 generations.
3. Scale up to 10 or more cities and run at least 20 generations.

## Intuition

Each ant, in turn, has to choose its next city from whatever's left. It doesn't calculate anything — it just weighs every option by how much pheromone already sits on that edge and how close the city is, then picks randomly with those weights, the way you might lean toward a restaurant that already has a queue outside and also happens to be nearby, without ever comparing every restaurant in town.

No single ant needs to find a good route for the colony to end up with one. Every trail fades a little each generation — drag "evaporation rate" up and watch thick lines thin fast — but the generation's shortest tour gets fresh pheromone laid on exactly its own edges. Edges that keep appearing in short tours get reinforced generation after generation, while edges only ever used by long, unlucky tours fade away and stop being chosen at all.

## Formal

Standing at city $i$, an ant weighs every unvisited city $j$ by $\tau_{ij}^\alpha \eta_{ij}^\beta$ and picks one at random with those weights — more pheromone or a shorter hop both raise the odds.

Once every ant has finished, pheromone evaporates everywhere, $\tau \leftarrow (1-\rho)\tau$, and then the generation's shortest tour deposits $\Delta\tau = 1/L$ back onto its own edges, so a short tour rewards its edges more than a long one does.

## Advanced

Real implementations rarely let every ant deposit pheromone: the elitist and MAX-MIN variants used here let only the best tour of the generation (or the best ever seen) lay new pheromone, which converges faster but risks getting stuck if the colony commits too early — MAX-MIN guards against that by clamping $\tau$ between fixed bounds so no edge can ever be fully forgotten or fully dominant. The exponents $\alpha$ and $\beta$ trade off memory against greed: $\alpha = 0$ ignores pheromone and always chases the nearest city, while $\beta = 0$ ignores distance and follows the crowd alone.

## Derivation

1. Standing at city $i$, an ant weighs every unvisited city $j$ by $\tau_{ij}^\alpha \eta_{ij}^\beta$ and picks one at random with those weights — more pheromone or a shorter hop both raise the odds.
2. Once every ant has finished its tour, pheromone evaporates everywhere: $\tau \leftarrow (1-\rho)\tau$.
3. The generation's shortest tour then deposits $\Delta\tau = 1/L$ back onto its own edges, so a short tour rewards its edges more than a long one does.

## Real world

### Vehicle routing software
Delivery companies use ant-colony-style solvers as one ingredient among several to warm-start routes for hundreds of stops before refining them further.

### Network routing
Some telecommunication routing protocols use a pheromone-like scheme, where "ant" packets probe paths and reinforce the ones with the least congestion.

### Job-shop scheduling
Ordering tasks on shared machines to finish a factory's work fastest is structurally the same search, and ant colony optimization is one standard heuristic for it.

### Biology itself
The algorithm isn't just inspired by ants — biologists use it as a working model to explain how real ant colonies find short paths without any ant knowing the whole map.
