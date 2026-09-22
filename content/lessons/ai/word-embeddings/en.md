---
title: Word embeddings
summary: >-
  Type "king" into a search box and get results about queens too — that only
  works because somewhere inside, words were turned into points on a map.
parameters: {}
variables:
  - the point for "king"
  - the point for "man"
  - the point for "woman"
  - the point for "queen"
---

## Try it

1. Find king and man on the map and trace the arrow that goes from man to king.
2. Now start at woman and trace that same arrow, the same direction and length. See where it lands.
3. Check which word sits closest to where the arrow landed — it should be queen, and notice how similar words already cluster near each other even before you draw any arrows.

## Intuition

Imagine every word placed somewhere on a huge map, using just two coordinates here so the whole thing fits on screen. Instead of storing each word as a meaningless code, an embedding stores it as a point on that map, placed so that words used in similar ways end up near each other: king sits near queen, cat sits near dog, far from either. The position of every point was learned from how the words actually get used across huge amounts of text, not placed there by hand.

Once words are points, arithmetic on the points starts to line up with meaning. The arrow from man to king points roughly the same way and the same distance as the arrow from woman to queen, because both arrows capture the same shift: moving from a general word to its royal counterpart. Add that same shift onto woman and you land near queen, without either word ever being told what "royal" means.

## Formal

Each word is represented by a vector, $v_K$ for king, $v_M$ for man, $v_W$ for woman, $v_Q$ for queen. Analogies like "man is to king as woman is to queen" show up as roughly equal vector differences: $v_K - v_M \approx v_Q - v_W$.

Rearranging that relationship gives the famous arithmetic $v_K - v_M + v_W \approx v_Q$: subtract the "man" direction from king, add the "woman" direction, and land near queen — an operation that only makes sense because the space was built so that consistent directions carry consistent meaning.

## Advanced

Real embeddings live in hundreds of dimensions rather than the two shown here, learned by training a model to predict a word from its surrounding context across enormous text corpora; nearby directions can end up encoding many overlapping relationships at once — tense, gender, plurality, topic — which is both what makes embeddings powerful and why the neat king/man/woman/queen arithmetic works only approximately and not for every analogy.

## Derivation

1. Every word is a point in the (here, two-dimensional) vector space.
2. The direction from man to king matches the direction from woman to queen.
3. Adding that shift to woman's point lands close to queen's point.

## Real world

### Search engines
Search ranks results by how close a query's embedding sits to each page's embedding, not just matching exact words.

### Recommendation systems
Products, songs or articles get embedded as points too, so "similar item" means "nearby point".

### Chat assistants
Understanding that "car" and "automobile" mean nearly the same thing relies on their embeddings sitting close together.

### Machine translation
Translating between languages is easier once words from both languages are placed in a shared embedding space.
