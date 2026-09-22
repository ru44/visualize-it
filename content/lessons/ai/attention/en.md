---
title: Attention
summary: >-
  Instead of treating every other word equally, attention lets a model look
  hardest at whichever words actually matter for the one it is reading.
parameters:
  word: query word — which word is asking "what matters to me?"
  temp: temperature — how sharply attention focuses
variables:
  - the query, the word currently asking the question
  - the key of each word being compared against
  - the value each word contributes if attended to
  - the attention weight each word ends up getting
  - the temperature controlling how sharp the weights are
---

## Try it

1. Set word to king (word 0) and see which other words get the brightest attention weight — the ones the query treats as most relevant.
2. Change word to pick a different query word and watch the attention weights redistribute entirely to different words.
3. Raise temp toward 3 and notice attention spreads out almost evenly across every word; lower it toward 0.1 and notice attention sharpens onto just the single best-matching word.

## Real-life examples

1. **Balanced attention.** With temperature at 1, the query for king spreads its attention across a few plausible words at reasonable strength.
2. **Sharp, focused attention.** With temperature dropped near its minimum, almost all the attention weight piles onto a single best-matching word.
3. **Diffuse, unfocused attention.** With temperature pushed near its maximum, attention spreads out almost evenly, barely favouring any one word.

## Test yourself

1. Sharpen attention until the temperature drops below 0.2.
2. Flatten attention until the temperature rises above 2.5.
3. Pick a query word from the second half of the sentence, word index 6 or higher, and see which words it attends to.

## Intuition

Reading the sentence "the trophy did not fit in the suitcase because it was too big", you instantly know "it" means the trophy, not the suitcase — you attended to the right earlier word without even trying. A network reading the same sentence needs an explicit mechanism to do that: for every word, look back at every other word, decide how relevant each one is, and blend them together weighted by that relevance.

That blend is what attention computes. The current word asks a question (its query), every candidate word offers an answer to how relevant it is (its key), and the words that answer "very relevant" contribute most of their content (their value) to the result. Words scored irrelevant barely contribute at all.

## Formal

Relevance between the query $q$ and each word's key $k_i$ is scored by a dot product, then turned into weights that sum to one with a softmax: $a_i = \frac{\exp\!\big((q\cdot k_i)/T\big)}{\sum_j \exp\!\big((q\cdot k_j)/T\big)}$. The output blends every word's value $v_i$ by its weight $a_i$.

The temperature $T$ controls how peaked those weights are: a low $T$ pushes almost all the weight onto the single highest-scoring word, a high $T$ spreads weight nearly evenly across every word regardless of score, exactly like the temperature slider in next-token prediction.

## Advanced

Real transformers compute many attention heads in parallel, each with its own learned query, key and value projections, so different heads can specialize in different kinds of relationships — one tracking grammatical subject-verb agreement, another tracking which pronoun refers to which noun — and stack this attention mechanism across dozens of layers; this is the mechanism, introduced in the 2017 paper "Attention Is All You Need", that made today's large language models practical to train.

## Derivation

1. Score how relevant each word's key is to the current query with a dot product.
2. Turn those scores into weights that sum to one, softened or sharpened by the temperature.
3. Blend every word's value by its weight to produce the output for this position.

## Real world

### Chat assistants
Every response from a chat assistant is built by layers of attention deciding which earlier words in the conversation matter for the next word.

### Pronoun resolution
Working out what "it" or "they" refers to in a long sentence is exactly the kind of relevance attention was built to compute.

### Machine translation
Translating a sentence requires attending to the right source words, not just the nearest ones, when producing each target word.

### Image captioning
Captioning models attend to the relevant region of an image while generating each word of the caption.
