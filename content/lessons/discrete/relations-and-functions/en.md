---
title: 'Relations and functions: arrows between two sets'
summary: >-
  Draw arrows from three kids to three after-school clubs, and discover
  exactly when that arrow diagram counts as a function, and when it is
  one-to-one.
parameters:
  code: code — which arrows are drawn, packed into one number (tap a line to toggle it)
variables:
  - the relation itself — the whole set of arrows drawn
  - the starting set — the three kids
  - the target set — the three clubs
  - the Cartesian product — every possible pairing of one kid with one club
---

## Try it

1. Tap the line from Amir to Football to draw an arrow, then tap it again to erase it — each tap flips that one arrow on or off.
2. Build a diagram where every kid has exactly one arrow out, and watch the "is it a function?" readout turn to yes.
3. Now send two arrows out of the same kid, or leave one kid with none, and watch it turn back to no.

## Real-life examples

1. **A tidy roster.** Amir joins Football, Bella joins Chess, Chen joins Art — one arrow per kid, no club shared: a function that is both one-to-one and onto.
2. **Sign-ups gone wrong.** Amir signs up for both Football and Chess while Chen signs up for nothing at all: this is a relation, but it fails to be a function on both counts.
3. **A popular club.** Amir and Bella both join Football, and Chen joins Chess, while Art gets no one: a function, since every kid has exactly one club, but not one-to-one, and not onto.

## Test yourself

1. Draw a diagram where every kid has exactly one arrow out.
2. Draw a function where two kids share a club, so the diagram is a function but not one-to-one.
3. Draw a diagram that fails to be a function, by giving some kid either no arrow or two arrows.

## Intuition

Three kids, Amir, Bella and Chen, sit on the left; three after-school clubs, Football, Chess and Art, sit on the right. Tap any of the nine possible connecting lines to draw or erase an arrow from a kid to a club. A relation is simply this whole picture: any set of arrows at all, even a messy one where a kid signs up for two clubs or for none.

The picture becomes a function the moment every single kid has exactly one arrow leaving them — no more, no fewer, since a function must assign each input exactly one output. Once it is a function, two more questions become worth asking: is it one-to-one, does every club get at most one kid, and is it onto, does every club get picked by someone? A function that is both at once, like the tidy roster where every kid gets a different club and no club is left empty, is called a bijection.

## Formal

For sets $A$ and $B$, a relation $R$ from $A$ to $B$ is any subset of the Cartesian product $A \times B$, the set of all ordered pairs $(a,b)$ with $a \in A$ and $b \in B$. Drawing an arrow from $a$ to $b$ exactly when $(a,b) \in R$ turns any relation into a picture like the one above.

$R$ is a function from $A$ to $B$ when every $a \in A$ appears in exactly one pair of $R$ — every kid gets exactly one arrow. A function is injective, or one-to-one, when no two different elements of $A$ share the same image in $B$; it is surjective, or onto, when every element of $B$ is the image of some element of $A$. A function that is both injective and surjective is a bijection, pairing up $A$ and $B$ perfectly.

## Advanced

When $A$ and $B$ are both finite with the same number of elements, as here with three kids and three clubs, a function from $A$ to $B$ is injective exactly when it is surjective — there is no way to hit every club without using every kid exactly once, and no way to use every kid without covering every club. That shortcut fails the moment the two sets have different sizes: a function from four kids into three clubs can never be injective, since some club must be shared, by the pigeonhole principle.

## Derivation

1. A relation $R \subseteq A \times B$ pairs each element of $A$ with zero, one, or several elements of $B$, however the arrows happen to be drawn.
2. $R$ counts as a function precisely when every element of $A$ has one and only one arrow leaving it, never zero and never two or more.
3. That function is one-to-one exactly when, in addition, no two different elements of $A$ ever point to the same element of $B$.

## Real world

### Assigning seats, lockers or ID numbers
Handing out one locker per student, or one seat per passenger, only works cleanly if the assignment is a function, every student gets exactly one locker, and one-to-one, no two students share a locker.

### Looking up a word in a dictionary
A dictionary is a function from words to definitions: every word you look up has exactly one entry to jump to, even though several different words can share the same definition.

### Database keys
A database table's primary key is built to be an injective function from rows to key values, so that key alone can always find its way back to exactly one row, never two.

### Computer programs as functions
Every pure function in a computer program takes an input and produces exactly one output, the same idea as this lesson's arrows, and testing whether two different inputs could ever produce clashing outputs is exactly a question about injectivity.
