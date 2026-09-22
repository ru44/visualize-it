---
title: The SIR epidemic model
summary: >-
  An outbreak splits a population into three groups — susceptible, infected,
  recovered — and two numbers, how fast the disease spreads and how fast people
  recover, decide whether it fizzles out or explodes.
parameters:
  'N': N — total population
  I0: I₀ — people infected at day 0
  beta: 'β — contacts that infect, per day'
  gamma: 'γ — recovery rate, per day'
  tView: time marker
variables:
  - susceptible — people who can still catch the disease
  - infected — people currently sick and able to spread it
  - >-
    recovered — people who have had it and can no longer spread it (or have
    died)
  - 'total population, held fixed: S + I + R = N'
  - >-
    transmission rate — new infections a single case causes per day, if everyone
    were susceptible
  - recovery rate — the fraction of the infected group that recovers each day
  - >-
    basic reproduction number — average new infections caused by one case in a
    fully susceptible population
---

## Intuition

Three curves race across the plot: susceptible falls, infected rises then falls back to zero, recovered climbs and levels off. Drag β up and the infected curve shoots higher and earlier — more contacts mean a faster, sharper wave. Drag γ up instead and people leave the infected group faster, so the same wave arrives lower and passes quicker.

The infected curve only grows while $\beta S/N > \gamma$: once enough people have moved to the susceptible-depleted side, each case infects less than one new person on average and the outbreak turns over on its own, even with nobody left immune by choice. That is herd immunity — reached once the susceptible share falls below $1/R_0$, where $R_0 = \beta/\gamma$.

## Formal

$R_0 = \beta/\gamma$ is the average number of secondary infections one case produces in a fully susceptible population; the outbreak grows while $R_0 S/N > 1$ and shrinks once $S/N < 1/R_0$.

$S$, $I$ and $R$ always satisfy $S + I + R = N$, since the equations only move individuals between compartments and create or destroy none.

## Advanced

The final-size relation $\ln(S_0/S_\infty) = R_0(1 - S_\infty/N)$ (obtained by dividing $dS$ by $dR$ and integrating) shows that even a very large $R_0$ leaves some of the population untouched — an epidemic burns out from a shrinking pool of susceptibles, not from running out of time.

## Derivation

1. Factor the infected equation: whether $I$ grows or shrinks depends only on the sign of $\beta S/N - \gamma$.
2. The outbreak can only grow while the susceptible share exceeds $1/R_0$.
3. Once the immune (or removed) share passes $1 - 1/R_0$, the remaining susceptible share is below $1/R_0$ and new cases decline on their own.

## Real world

### Seasonal flu
Flu has R0 around 1.3, so a modest fraction of immune people each season is often enough to keep it from taking off widely.

### Measles
Measles has R0 near 15–18, among the highest known, which is why roughly 95% vaccination coverage is needed for herd immunity.

### Flattening the curve
Lowering β through distancing or masks does not just delay an epidemic — it lowers and widens the infected peak, keeping hospitals below capacity.

### Smallpox eradication
Sustained vaccination pushed the susceptible share worldwide below 1/R0 everywhere at once, driving smallpox to zero in the wild by 1980.
