---
title: The infection that needs a minimum spark
summary: One infected cell tries to pass its infection to its neighbours before it recovers; below a critical rate it always fizzles out, and above it the infection can keep going forever.
parameters:
  rate: infection rate
  step: step
variables:
  - the chance each infected neighbour passes the infection on, per step
  - the chance an infected cell recovers, per step (fixed at 0.5 here)
charts: []
---

## Try it

1. Press play and watch the single red cell in the centre. Each step it may infect a neighbour, and it may recover.
2. Drag "infection rate" low. The red patch shrinks and disappears within a handful of steps.
3. Drag it high instead. The infection spreads outward and keeps a red patch alive far longer.

## Real-life examples

1. **A rate too low to catch on.** With an infection rate of 0.05, run for 80 steps: the single infected cell almost always recovers, and any neighbour it infects recovers too, before the infection can build a foothold.
2. **A rate that spreads easily.** With an infection rate of 0.3, run for 80 steps: new infections regularly outpace recoveries, and the infected patch keeps growing.
3. **Sitting right at the edge.** With an infection rate of 0.125, run for 150 steps: this is close to the rate at which infections and recoveries roughly balance, so the outcome is much less predictable than the two cases above.

## Test yourself

1. Set the rate to 0.08 or below and run at least 60 steps. Confirm the infection dies out.
2. Set the rate to 0.25 or above and run at least 60 steps. Confirm the infection is still spreading.
3. Set the rate within 0.02 of 0.125 and run at least 100 steps, right at the edge between dying out and spreading.

## Intuition

Picture an illness that never leaves anyone immune: you catch it, you're sick for a while, then you recover and can catch it again. Every step, each infected cell has one fixed chance of recovering, and it also has some chance of passing the infection to each of its healthy neighbours — the "infection rate" you drag. That is the whole rule: no cell plans anything, and no cell remembers whether it was ever sick before.

Whether an outbreak that starts from a single cell dies out or keeps going forever turns out to depend almost entirely on that one number. Make the infection rate too low and every infected cell tends to recover before it manages to infect anyone else, so the whole thing collapses back to nothing — reliably, no matter how many times you restart it. Push the rate high enough and new infections outpace recoveries often enough that the patch never fully empties out. Somewhere between those two behaviours sits a critical rate, and near it the outcome stops being predictable at all.

## Formal

A healthy cell with $n$ infected neighbours becomes infected with probability $1-(1-\lambda)^n$, where $\lambda$ is the chance any one infected neighbour passes on the infection this step. An infected cell recovers to healthy with fixed probability $r$.

A rough mean-field estimate treats every cell as having its 4 neighbours infected independently at the population's average infection level: an infected cell then creates, on average, $4\lambda$ new infections before recovering after an average of $1/r$ steps. Setting that expected number of secondary infections to one gives a critical rate $\lambda_c \approx \dfrac{r}{4}$: with $r = 0.5$ here, $\lambda_c \approx 0.125$.

## Advanced

This mean-field number is only an estimate: it assumes every neighbour is infected independently at the same average rate, while the real grid builds correlated clusters of infected and healthy cells that make the infection die out a little more easily than the mean-field estimate predicts. Finding the exact critical rate for a rule like this one, on an infinite two-dimensional grid, is a classic hard problem in probability theory, usually studied through large simulations rather than an exact formula.

## Derivation

1. A healthy cell with $n$ infected neighbours catches the infection with probability $1-(1-\lambda)^n$.
2. An infected cell recovers to healthy with fixed probability $r$ every step.
3. A mean-field balance between new infections and recoveries gives the critical rate $\lambda_c \approx \dfrac{r}{4}$.

## Real world

### Endemic diseases
Illnesses that never grant lasting immunity, like the common cold, settle into exactly this kind of balance between new cases and recoveries rather than ever being wiped out for good.

### Computer viruses
A cleaned, reconnected machine can be reinfected by an infected neighbour on the network, the same catch-and-recover cycle modelled here, with a real threshold below which an outbreak always fizzles.

### Forest and grassland fires
A patch that has burned can grow flammable fuel again over time, so persistent fire regimes in some ecosystems behave like an infection that keeps a low, stable level going rather than dying out completely.

### Rumours and forgetting
An idea spreading through a group, where people who stop talking about it can hear it again later, follows the same catch-and-recover dynamic, with real campaigns living or dying near their own critical rate.
