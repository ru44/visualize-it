---
title: 'Tokenization: the alphabet AI actually reads'
summary: >-
  A language model never sees letters or words — it sees tokens, chips from a
  vocabulary that was grown by one greedy rule: find the pair that appears most
  often, glue it, repeat — and this page runs that rule live on real text.
parameters:
  merges: merges — how many gluing steps the vocabulary has learned
  text: text — which sample to tokenize
variables:
  - how many tokens the text becomes
  - how many characters it has
  - the number of merges learned
---

## Try it

1. Set merges to 0 and read the chips: every character is its own token, word starts marked with ▁, and the readout counts 49 tokens — this is the crawl a model would face with no vocabulary at all.
2. Drag merges from 0 to 6 one step at a time and watch the greedy rule work: «▁th», then «▁the», then «▁cat» fuse into single chips while rare words stay in pieces. The count falls from 49 to 31; the slider stops at 6, because by then no pair is left that appears twice.
3. Keep merges at 6 and set text to 1 (code), then 2 (Arabic). The code only shrinks from 38 tokens to 34 because almost nothing in it repeats; the Arabic shrinks from 44 to 32 once «▁القطة» becomes one chip. Chips are earned by repetition — which is why a vocabulary grown on one kind of text serves another kind badly.

## Real-life examples

- **Plain English, no vocabulary.** The cat sentence costs 49 character-tokens — at this rate a page of text would swamp the model before it said anything.
- **The same sentence, 6 merges later.** The repeated words «the» and «cat» have fused into single chips and the count drops from 49 to 31 — compression earned purely by repetition. After 6 merges this short sentence has no repeated pair left, so the slider stops there.
- **Arabic at 5 merges.** The greedy rule works on any script, taking this sentence from 44 tokens to 32 — but a vocabulary trained mostly on English spends its chips there, which is why the same sentence often costs more tokens in other languages.

## Test yourself

1. Set merges to zero and read a sentence the way a vocabulary-less model would.
2. Give English all 6 merges and watch whole words become single chips.
3. Take the Arabic sample to 5 merges or more and compare its chips to the English ones.

## Intuition

Before a model can predict anything it must read, and "read" needs an alphabet. Characters are too slow — a thought spread over hundreds of steps — and whole words are too brittle: the first typo or new name would be unreadable. The compromise the field settled on is wonderfully unclever: start from characters, count every adjacent pair in a mountain of text, glue the most frequent pair into a new symbol, and repeat tens of thousands of times. The result is a vocabulary where «the» is one chip because English repeats it endlessly, while a rare word travels as two or three chips — and _nothing_ is ever unreadable, because in the worst case it falls back to characters.

The chips on screen are that exact algorithm running on the sample. This one design choice leaks into everything you have noticed about AI: billing is per token because the model's work is per token; a long foreign word costs more because the vocabulary spent its chips elsewhere; and a model asked to count the letters in «strawberry» struggles precisely because it has never seen letters — it sees one or two chips, with the letters sealed inside.

## Formal

Byte-pair encoding builds the vocabulary: begin with characters as tokens, then $m$ times replace the most frequent adjacent pair with a new merged token. Each merge adds one vocabulary entry and shrinks every text that contains the pair, so token count $k$ falls fastest for the most repetitive text.

With no merges, $k = c$, one per character. Production vocabularies (tens of thousands of merges, trained on terabytes) settle near $k \approx \frac{c}{4}$ for English prose — about four characters per token. The ratio is worse for languages and scripts underrepresented in the training mix: the same meaning, more chips, more cost, less room in the context window. Tokenization is where a model's linguistic diet becomes destiny.

## Advanced

The vocabulary is frozen before the model ever trains, and every quirk becomes permanent: digits may split oddly (why arithmetic is strangely hard), spaces belong to the _following_ token (why trailing spaces confuse completions), and a single rare chip can carry bizarre behaviour if it almost never appeared in training. Counting problems — letters in a word, words in a sentence — are tokenization problems in disguise: the model is asked about objects its alphabet dissolved. Newer systems bite the bullet and read raw bytes, paying with longer sequences; where that trade settles is an open question, but whoever wins, some alphabet always comes first.

## Derivation

1. Start from characters: $k = c$ tokens, maximal flexibility, minimal efficiency.
2. Each of the $m$ merges glues the most frequent adjacent pair into one chip, so every repetition of that pair now costs one token instead of two.
3. Run the rule to a vocabulary of tens of thousands and English prose compresses to roughly $k \approx \frac{c}{4}$ — the standard "a token is about four characters".

## Real world

### API bills

Every AI provider prices per token — this page's counter is literally the meter that runs while a chatbot reads your message.

### The context window

"128k context" counts tokens, not words: how much _text_ fits depends on the language and the vocabulary's fit to it.

### Multilingual fairness

Users writing in underrepresented scripts pay more tokens for the same meaning — a bias baked in before training began.

### Prompt oddities

Famous glitches — misspelled words the model cannot see, magic strings that derail it — usually trace back to how the text happened to tokenize.
