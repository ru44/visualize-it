---
title: Conditional probability and Bayes’ theorem
summary: >-
  A test that is 99% accurate still misleads you more often than you'd guess —
  see why a positive result rarely means what it seems.
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

## Try it

1. Watch the grid: it splits 1000 people into those with the condition (left) and without it (right), and into a positive test (top) or negative (bottom).
2. Drag the «how common the condition is» slider down toward 1%. Watch the false positives among the healthy swamp the true positives among the sick.
3. Now drag it up toward 20%. The same test means something very different: most positive results are now real.

## Real-life examples

1. **Mammography screening.** Only about 1 in 100 women screened actually has breast cancer; the test catches 99% of real cases but also wrongly flags 5% of healthy women, so most positive results turn out to be false alarms.
2. **Flu season rapid test.** When 1 in 5 patients at a busy clinic really has the flu, a test that is right 90% of the time on the sick and 85% of the time on the healthy gives positive results that are usually genuine.
3. **Workplace drug test.** Only about 1 in 20 employees actually uses the tested drug; even a test that is 98% accurate produces enough false alarms among the other 19 that a single positive result gets checked again.

## Test yourself

1. Adjust the sliders until a positive result means exactly a 50% chance of truly having the condition.
2. Keep «how common the condition is» at 2% or below, but push your confidence after a positive test above 95%.
3. Set «how common the condition is» to 20% or higher, but make the test unreliable enough that a positive result still leaves you 40% confident or less.

## Intuition

Picture 1000 people tested for a condition. With the starting numbers, 10 of them truly have it, and the test catches almost all of them — about 10 true positives. But among the 990 healthy people, 5% of them, about 50, also test positive by mistake. So out of roughly 60 positive results, only 10 are real: a positive test means about a 1-in-6 chance of actually being ill, not 99%.

Drag the «how common the condition is» slider up and watch your true confidence climb along with it: the test itself has not changed, only how common the condition was to begin with. This is why screening whole healthy populations for rare diseases produces so many false alarms, and why doctors often order a second, independent test before treating anyone.

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
