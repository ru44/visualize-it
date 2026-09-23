---
title: Lotka–Volterra cycles
summary: >-
  Plot predator numbers against prey numbers instead of both against time,
  and their endless chase draws a closed loop — one whose size depends
  entirely on how far the starting numbers sit from the one point where
  neither population moves at all.
parameters:
  alpha: prey growth rate α
  beta: predation rate β
  gamma: predator death rate γ
  delta: predator growth per catch δ
  x0: starting prey x₀
  y0: starting predators y₀
  tView: time
variables:
  - the prey population
  - the predator population
  - the prey's own growth rate
  - how often a predator meets and catches prey
  - the predator's death rate
  - how much a catch grows the predator population
charts: []
---

## Try it

1. Watch the left panel. The orange loop is prey plotted against predators, and the blue dot traces around it as "time" runs forward — the dashed cross marks the one population pair where nothing moves.
2. Drag "starting prey" far from its default of 60. The loop the dot traces grows noticeably larger, even though nothing about the predation itself changed.
3. Now set starting prey to 60 and starting predators to 10, exactly on the dashed cross. The loop collapses to a single point — both populations just sit still.

## Real-life examples

1. **Hares and lynx starting right at balance.** 60 hares and 10 lynx, exactly the pair where births equal deaths for both: the populations stay essentially flat, no boom, no bust.
2. **A hare population crashed to a handful.** Only 15 hares and 3 lynx to start: far from balance, and the chase that follows swings both populations through a wide loop, hares surging once predators are scarce, then lynx surging once hares are plentiful.
3. **Both already abundant when counted.** 75 hares and 25 lynx, both above their balanced numbers: the system still swings through a large loop, just starting from the opposite side of the same centre.

## Test yourself

1. Set "starting prey" and "starting predators" to match the balance point — $\gamma/(\delta\beta)$ prey and $\alpha/\beta$ predators — and watch the loop shrink to a dot.
2. Push "starting prey" to more than twice the balance point's prey number and watch how much larger the loop grows.
3. Let "time" run all the way to the end and watch the loop close back on its own starting point.

## Intuition

Picture two numbers changing together: how many prey animals there are, and how many predators. Instead of drawing each against time on its own chart, this lesson plots them against each other — prey along the bottom, predators up the side. As time moves forward the point representing "today's populations" wanders, and because more prey feeds more predators, more predators eat down the prey, fewer prey starves the predators, and fewer predators let prey recover, that wandering point does not drift off anywhere — it turns back on itself and closes into a loop.

There is exactly one pair of numbers, marked by the dashed cross, where births and deaths cancel out for both species at once; start there and nothing moves. Start anywhere else and the system doesn't head toward that point either — it circles it forever, and the further the starting point sits from the cross, the wider that circle swings, meaning a bigger boom followed by a bigger bust, indefinitely, with no tendency to settle down.

## Formal

The two populations obey $\frac{dx}{dt} = \alpha x - \beta xy, \qquad \frac{dy}{dt} = \delta\beta xy - \gamma y$, where $x$ is prey and $y$ is predators: prey grow on their own at rate $\alpha$ and are removed by encounters with predators at rate $\beta$, while predators grow from those same encounters at rate $\delta\beta$ and die off at rate $\gamma$ regardless of prey.

Setting both rates of change to zero at once gives the one resting point: from the prey equation, $\alpha x = \beta xy$ forces $y^* = \alpha/\beta$, and from the predator equation, $\delta\beta xy = \gamma y$ forces $x^* = \gamma/(\delta\beta)$ — this is exactly the dashed cross in the phase panel, and every other starting point orbits around it rather than approaching it.

## Advanced

This system has a conserved quantity along every orbit — a combination of $x$, $y$ and the four rates that stays exactly constant as the point moves — which is the mathematical reason the loops close perfectly instead of spiralling in or out; real predator–prey data never closes quite this cleanly, because it lacks the carrying capacity, time delays and randomness real populations have. Ecologists therefore treat this model as a clean starting skeleton, not a prediction engine, and typically add a prey carrying capacity or predator satiation limit to prevent runaway growth and get orbits that spiral toward a single stable population pair instead of looping forever.

## Derivation

1. A resting point needs both rates of change to be exactly zero at once.
2. The prey equation at rest forces the predator number to sit at $\alpha/\beta$.
3. The predator equation at rest forces the prey number to sit at $\gamma/(\delta\beta)$.

## Real world

### The Hudson's Bay lynx and hare records
Nearly a century of fur-trading records of snowshoe hare and lynx pelts is the classic real-world dataset showing this exact boom-and-bust cycling between a predator and its prey.

### Aphids and ladybugs in a garden
Release a few ladybugs into a garden thick with aphids and the two populations chase each other through cycles much like this model, season after season.

### Bacteria and the viruses that hunt them
Bacteriophage viruses and their bacterial hosts cycle through the same boom-and-bust dynamic in a petri dish, on a timescale of hours instead of years.

### Fisheries
Predatory fish stocks and the smaller fish they eat can swing through Lotka–Volterra-like cycles, which is part of why fishing quotas try to avoid pushing either population's starting point too far from its natural balance.
