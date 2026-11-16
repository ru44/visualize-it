---
title: Conditional probability and Bayes’ theorem
summary: 'Find the share of positive results that are true positives by counting both true and false positives.'
parameters:
  prior: 'prevalence — proportion with the condition'
  sens: 'sensitivity — positive results among those with the condition'
  spec: 'specificity — negative results among those without it'
variables:
  - 'prior probability that the condition is present'
  - 'sensitivity: positive-result probability given the condition'
  - 'posterior: condition probability given a positive result'
---

## Try it

1. Set prevalence to 1%, sensitivity to 99% and specificity to 95%. Per 1000 people, the model expects 9.9 true positives and 49.5 false positives. The display rounds these counts, but uses unrounded values for the 16.67% posterior.
2. Keep the test settings and raise prevalence to 20%. More positives now come from people with the condition, and the posterior rises to about 83.19%.
3. Return prevalence to 1% and raise specificity to 99.5%. Reducing false positives raises the posterior to about 66.67%, even though sensitivity stays unchanged.

## Real-life examples

1. **A hypothetical rare condition.** At prevalence 1%, sensitivity 99% and specificity 95%, about one-sixth of positive results are true positives. These are teaching values, not performance figures for a named medical test.
2. **A more common condition.** With prevalence 20%, sensitivity 90% and specificity 85%, the expected counts per 1000 are 180 true positives and 120 false positives. The posterior is 60%.
3. **Fewer false alarms.** At prevalence 5%, sensitivity 98% and specificity 98%, there are 49 expected true positives and 19 false positives per 1000. The posterior is about 72.06%.

## Test yourself

1. Adjust the controls until the probability of the condition given a positive result is about 50%.
2. Keep prevalence at most 2% and make that posterior probability at least 95%.
3. Keep prevalence at least 20% and make the posterior at most 40%.

## Intuition

A test can detect most people with a condition yet produce many false positives when the condition is rare. Out of 1000 people with the default settings, only 10 have the condition, and nearly all test positive. The other 990 form a much larger group, so a 5% false-positive rate produces about 50 additional positives. To interpret a positive result, compare the true positives with all positives, not with all people who have the condition.

This changes the question from “How often is the test positive when the condition is present?” to “Among positive results, how often is the condition present?” The first is sensitivity; the second is the posterior probability. The rectangles divide the population by condition and result. Very narrow regions have a minimum display width, and counts are rounded, so use the probability readout rather than measuring pixel areas or dividing rounded counts.

## Formal

Let A mean the condition is present and B mean the result is positive. Provided $P(B)>0$, Bayes' theorem gives $P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}$. The vertical bar means “given”; reversing what follows it changes the question.

The positive-result probability is $P(B)=P(B\mid A)P(A)+P(B\mid A^c)P(A^c)$. The two terms are true positives and false positives. Sensitivity is $P(B\mid A)$, specificity is $P(B^c\mid A^c)$, and the false-positive rate is one minus specificity. Prevalence supplies $P(A)$ for this population model.

## Advanced

With a nonzero false-positive rate, posterior odds equal prior odds times sensitivity divided by that false-positive rate. Updating repeatedly requires a likelihood that accounts for dependence between observations; two tests on the same person are not automatically independent. The population used for the prior and the conditions under which test performance was measured both matter.

## Derivation

1. Express the same overlap, A and B together, using either conditional probability multiplied by its conditioning event's probability.
2. Divide all positive results into two disjoint groups: those with the condition and those without it.
3. Divide the true-positive probability by the total positive probability to obtain the fraction of positives that have the condition.

## Real world

### Automated alerts

A detector may flag both real faults and normal operation. When real faults are rare, even a small false-alarm rate can account for many of the alerts.

### Classifying messages

A message classifier combines information about message categories with evidence from the message. Bayes' rule describes the update; the quality of the result depends on whether the probabilities in the model fit the situation.
