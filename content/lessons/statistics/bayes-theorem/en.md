---
title: Conditional probability and Bayes’ theorem
summary: >-
  A test is 99% accurate and yours came back positive. How worried should you
  be? Usually much less than you think.
parameters:
  prior: how common the condition is
  sens: sensitivity — positives among the ill
  spec: specificity — negatives among the healthy
variables:
  - the prior — how likely the condition was before any test
  - >-
    the sensitivity — how often the test is positive when the condition is
    present
  - >-
    the posterior — what you actually want: the chance of the condition given a
    positive test
---

## Intuition

Picture 1000 people. With the starting values, 10 of them have the condition and the test catches almost all of them (about 10 true positives). But among the 990 healthy people, 5% — about 50 — also test positive. So of the 60 or so positive results, only 10 are real: a positive test means roughly a 1 in 6 chance of illness, not 99%.

Drag the divider to make the condition more common and watch the posterior climb: the test has not changed, but the base rate has. This is why screening programmes for rare diseases produce many false alarms and why a second, independent test is so valuable.

## Formal

$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$ and $P(B) = P(B \mid A)P(A) + P(B \mid A^c)P(A^c)$ (total probability). Substituting gives Bayes’ theorem.

In odds form: posterior odds = prior odds × likelihood ratio, with LR = sensitivity / (1 − specificity).

## Advanced

Bayesian inference treats parameters as random: $p(\theta \mid \text{data}) \propto p(\text{data} \mid \theta)\,p(\theta)$. Conjugate priors (Beta for a Bernoulli $p$, Gamma for a Poisson rate) make the update closed-form; in general it is done numerically by MCMC. The base-rate fallacy is the human failure to weight the prior.

## Derivation

1. The same overlap counted two ways — the top-left block of the grid.
2. All positives: true positives plus false positives.
3. Divide: the share of positives that are genuine.

## Real world

### Medical screening
Mammography, PSA and prenatal tests all suffer from low base rates; results are interpreted with Bayes.

### Spam filters
The probability an email is spam given its words is updated word by word — “naive Bayes”.

### Courts and forensics
A DNA match probability of 1 in a million is not a 1-in-a-million chance of innocence when millions of people were searched: the prosecutor’s fallacy.

### Self-driving cars
Sensor readings update the car’s belief about where obstacles are, frame by frame, with exactly this rule.
