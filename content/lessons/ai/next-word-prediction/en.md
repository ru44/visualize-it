---
title: Predicting the next word
summary: >-
  Count how often each word follows another in a text, turn those counts
  into probabilities, and you can generate new sentences one guess at a time.
parameters:
  temp: temperature — how random the next word is picked
variables:
  - the current word, the one just read
  - how many times word w followed w_t in the text
  - the temperature controlling how random the choice is
  - the probability of word w coming next
---

## Try it

1. Tap the current highlighted word and look at the bars: each one is the model's probability for what comes next, based only on the short text shown.
2. Tap one of the bars to actually pick that word and extend the sentence, then look at the new bars for what comes after it.
3. Raise temp and tap again — the bars flatten and less likely words get picked more often; lower temp and the tallest bar dominates almost every time.

## Real-life examples

1. **Balanced.** At the default temperature of 1, the model mixes likely words with the occasional surprise.
2. **Repetitive and predictable.** With temperature pushed down near 0.2, the model keeps choosing the same safest word almost every time.
3. **Wild and random.** With temperature pushed up near 2.5, odd, barely-likely words start getting picked.

## Test yourself

1. Push temperature down near its minimum and tap through several words — notice it keeps choosing the same safe path.
2. Push temperature up near its maximum and tap through several words — notice odd, unlikely words start appearing.
3. Set temperature to exactly 1.5, halfway between balanced and wild.

## Intuition

The visible text is the model's entire world: every word it has ever "read". For every word in that text, it counted which word tends to follow it, and how often, then turned those counts into probabilities. Predicting the next word is just picking from that probability list, most often the likeliest option, occasionally something less likely if the temperature allows it.

A model built this way, looking back only one word, is a toy compared to what real chat assistants use, but the core loop is identical: look at what came before, produce a probability for every possible next word, pick one, and repeat to build a whole sentence one word at a time. Real models look back over the whole conversation instead of one word and use attention to decide what earlier context actually matters, but they still end every step by sampling a next word from a probability list exactly like the bars here.

## Formal

The probability of word $w$ following the current word $w_t$ is $p(w \mid w_t) = \dfrac{\exp(c(w_t,w)/T)}{\sum_{w'} \exp(c(w_t,w')/T)}$, where $c(w_t,w)$ counts how often $w$ followed $w_t$ in the text and $T$ is the temperature.

Generation repeats $w_{t+1} \sim p(w \mid w_t)$: sample a word from that probability list, append it, then treat it as the new $w_t$ and repeat. This is exactly how the bars in the picture turn into a growing sentence as you keep tapping.

## Advanced

This bigram model only ever conditions on one previous word, so it cannot capture anything more than short-range word pairings; real language models condition on thousands of previous words at once through the attention mechanism, and are trained not by simple counting but by adjusting billions of weights to make the model's predicted probabilities match real text as closely as possible across trillions of training words — the counting shown here is the same goal, achieved by the simplest possible method.

## Derivation

1. Count how often each word $w$ follows the current word $w_t$ across the visible text.
2. Turn those counts into a probability distribution over every possible next word, using the temperature to soften or sharpen it.
3. Sample the next word from that distribution, then repeat using it as the new current word.

## Real world

### Predictive text keyboards
Phone keyboards suggest the next word by exactly this kind of statistics learned from typed text.

### Chat assistants
Every word a chat assistant produces is sampled one at a time from a probability distribution over the next word, just at a vastly larger scale.

### Code autocomplete
Code editors suggest the next token in your code using a language model trained the same way, but on code instead of prose.

### Email smart compose
Email clients suggest how to finish your sentence by predicting the most likely next words as you type.
