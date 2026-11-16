---
title: What probability means
summary: 'Distinguish the chance of a result from the proportion you observe in a finite experiment.'
parameters:
  p: 'p — probability of success per trial'
  N: 'N — total trials'
  speed: 'animation speed'
variables:
  - 'success probability specified by the model'
  - 'planned number of trials'
  - 'observed successes divided by completed trials'
---

## Try it

1. Set p = 0.5 and N = 200. The dashed line marks the chance of success; the changing line shows successes divided by trials completed so far.
2. Compare the first few trials with later ones. Each new result has less influence as the total grows, but the line can still move away from p.
3. Restart the experiment with the same settings. Results will usually differ. Changing the speed affects playback, not the chance of success.

## Real-life examples

1. **Fair coin model.** At p = 0.5 and N = 200, the expected number of successes is 100. An individual run need not have exactly 100.
2. **Coloured counter.** Imagine drawing from a bag containing 3 red and 7 blue counters, replacing and mixing after each draw. Counting red as success gives p = 0.3; over 360 draws the expected count is 108.
3. **Random generator.** A generator with success probability 0.15 has an expected 90 successes in 600 trials. This is not the probability of one face of a fair six-sided die, which is 1/6.

## Test yourself

1. Make p × N, the expected total successes, equal 300.
2. Keep p below 0.2 while making the expected total greater than 100.
3. Use at least 1500 trials and choose p within 0.05 of 0.5.

## Intuition

A fair coin has two equally likely outcomes. Calling one side “success” gives it probability 1/2. That does not mean every pair of flips contains one success. Five flips could contain four successes, giving an observed proportion of 4/5. The probability belongs to the model; the observed proportion describes the results collected.

Here $p$ sets the chance of success on each independent simulated trial. The horizontal axis counts trials, and the vertical axis shows the proportion of successes. The dots show up to the latest 40 outcomes. Larger samples tend to give proportions closer to p, but no finite run must end exactly there. A streak also does not change the chance on the next independent trial.

## Formal

An outcome is one possible result; an event A is a collection of outcomes. In a finite set of equally likely outcomes, $P(A)=|A|/|\Omega|$, where the vertical bars mean “number of outcomes.” Without equal likelihood, a ratio of counts is not sufficient.

Probabilities satisfy $0\le P(A)\le1$. An event and its complement exhaust the possibilities, so $P(A^c)=1-P(A)$. After N trials, the observed proportion is $\hat p_N=\text{successes}/N$; its value can differ from the underlying probability.

## Advanced

For independent trials with the same success probability, the law of large numbers explains why the proportion tends toward p as the sample grows. It does not define all probability: probability can also describe uncertainty about a single event. The shaded band is a normal approximation at each fixed trial count, not a guarantee for the entire path; it can be inaccurate in small samples.

## Derivation

1. Identify all possible outcomes and the outcomes belonging to the event of interest.
2. If the outcomes are equally likely, divide the event's count by the total count.
3. Repeating independent trials with unchanged probability lets us estimate that probability from the observed proportion. Convergence is a long-run result, not a promise about a particular finite run.

## Real world

### Games of chance

For a fair six-sided die, the event “even number” contains three of the six outcomes, so its probability is 1/2.

### Checking a process

Finding 2 marked items in a sample of 100 estimates a marked-item proportion of 0.02. Another sample may give a different estimate, and an unrepresentative sample can mislead even when it is large.
