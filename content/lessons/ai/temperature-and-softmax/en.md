---
title: Temperature and softmax
summary: >-
  One slider decides whether a model always plays it safe with its top guess
  or takes real chances on less likely ones.
parameters:
  x: temperature T — how random the final choice is
variables:
  - the fixed score of each of the three chances (2, 1 and 0)
  - the temperature
  - the probability of chance i being picked
charts:
  - title: The other two probabilities, for comparison
    xLabel: temperature T
    yLabel: probability
    series:
      - score-1 chance
      - score-0 chance
---

## Try it

1. Set temperature near 0.1 and look at the top curve, near the score-2 option: it sits close to 1, meaning the model almost always picks the single highest-scoring option.
2. Raise temperature toward 3 and watch that top curve fall toward roughly a third, converging with the chart's other two curves below — the choice becomes almost uniform across all three options.
3. Set temperature to 1 and compare how spread out the three curves are here with what the next-word-prediction lesson showed at its default temperature of 1 — it is the very same formula, just with three fixed scores instead of a whole vocabulary.

## Real-life examples

1. **Balanced.** At temperature 1, the top-scoring option is favoured but far from guaranteed.
2. **Nearly always the top choice.** Near temperature 0.15, the top curve sits almost pinned to 1.
3. **Nearly random among the three.** Near temperature 2.8, all three curves converge close to a third each.

## Test yourself

1. Push temperature near its minimum and watch the top curve pin close to 1.
2. Push temperature near its maximum and watch all three curves converge near a third.
3. Return to temperature 1, matching the default in the next-word-prediction lesson.

## Intuition

Three options have fixed scores, 2, 1 and 0, meaning the first is genuinely the best guess. Temperature decides how strictly the model respects that ranking when it actually has to choose: at low temperature it plays it safe and almost always takes the top score, at high temperature it treats all three as nearly equally likely and picks almost at random.

Low temperature makes output repetitive and predictable, because the model keeps taking the same safest choice every time. High temperature makes output varied but also more likely to wander into weak, barely-plausible choices, because low-scoring options start getting picked nearly as often as the best one. There is no temperature that is simply "correct" — it is a trade-off a model's user dials in on purpose.

## Formal

Each option $i$ has a probability $p_i(T) = \frac{\exp(s_i/T)}{\sum_j \exp(s_j/T)}$ built from its fixed score $s_i$ and the shared temperature $T$; here the three scores are $s = (2,1,0)$.

Dividing every score by $T$ before exponentiating is what reshapes the distribution: a small $T$ magnifies the gap between scores before the softmax, a large $T$ shrinks that gap toward nothing, which is exactly the curves crossing in the chart as temperature rises.

## Advanced

In the limit $T \to 0$ the softmax becomes a hard "always pick the top score" rule, and in the limit $T \to \infty$ it becomes uniform random choice regardless of score; practical language models typically sample somewhere between 0.7 and 1.0, and some systems instead cap the choice to the top few most likely options (top-k or nucleus sampling) rather than tuning temperature alone, to avoid ever picking an extremely unlikely word even at higher settings.

## Derivation

1. Fix the three scores that represent how good each option is.
2. Divide each score by the temperature, then apply softmax to get probabilities that sum to one.
3. As temperature approaches zero the distribution collapses onto the top score; as it grows large the distribution flattens toward uniform.

## Real world

### Chat assistant creativity settings
Some chat apps expose a "creativity" or "temperature" slider that is literally this parameter.

### Code generation tools
Coding assistants often set temperature near zero so the same prompt reliably produces the same, safest code every time.

### Creative writing tools
Brainstorming and creative-writing assistants raise temperature to produce more varied, less predictable suggestions.

### Hallucination, honestly
A model at any temperature is always sampling plausible-sounding text, never consulting a source of truth; hallucination is not the model "lying", it is confident sampling from a distribution that happens to be wrong, and no temperature setting fixes that on its own.
