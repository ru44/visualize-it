---
title: 'Relations and functions: arrows between two sets'
summary: 'Use arrows to distinguish a relation from a function, then check whether different inputs share an output.'
parameters:
  code: 'code — diagram setting; tap a connecting line to add or remove an arrow'
variables:
  - 'R: selected student–club pairs'
  - 'A: domain, the three students'
  - 'B: codomain, the three clubs'
  - '×: forms all possible ordered pairs'
---

## Try it

1. Set code = 273. Each student has one arrow to a different club. The readouts identify a function that is one-to-one and onto.
2. Tap the line from Amir to Football to remove that arrow. Amir now has no output, so the relation is no longer a function. Tap again to restore it.
3. Set code = 137. Each student still has one output, but two choose Football. It is a function, though neither one-to-one nor onto.

## Real-life examples

1. **One different club each.** With code = 273, Amir chooses Football, Bella chooses Chess and Chen chooses Art. Each student has one club, and each club is chosen once.
2. **Missing and extra choices.** With code = 35, Amir chooses Football and Chess, Bella chooses Art, and Chen has no choice. This is a valid relation but not a function assigning one club to every student.
3. **A shared choice.** With code = 137, Amir and Bella choose Football and Chen chooses Chess. Every student has one club, but Football is shared and Art is unused.

## Test yourself

1. Draw exactly one outgoing arrow for each student.
2. Draw a function in which at least two students share a club.
3. Draw a relation that is not a function by leaving a student without an arrow or giving a student more than one.

## Intuition

An arrow records a pair: one student and one club. Any collection of these pairs is a relation. A student may have several arrows or none; that is allowed for a relation. Tapping a connecting line adds or removes its pair.

A function has a stricter rule: every input must have exactly one output. Here each student must choose exactly one club. Several students may choose the same club without breaking this rule. “One-to-one” adds a separate requirement: different students must choose different clubs. “Onto” means every club is chosen by someone.

## Formal

The Cartesian product $A\times B$ is the set of all ordered pairs with a first member from A and a second from B. A relation $R\subseteq A\times B$ selects some of those pairs. The diagram has three inputs and three possible outputs, so there are nine possible pairs.

A relation is a function from A to B when every input in A appears in exactly one pair. A is its domain and B its codomain; the outputs actually reached form its range. A function is injective (one-to-one) when distinct inputs have distinct outputs, and surjective (onto) when its range equals B. A function with both properties is bijective.

## Advanced

For finite sets of the same size, a function is injective exactly when it is surjective. Here three different outputs from three inputs must use all three clubs. Conversely, reaching all three clubs with only three arrows leaves no room for a shared output. Different-sized or infinite sets require more care; do not apply this shortcut to them automatically.

## Derivation

1. Start with any selection of the nine possible student–club pairs. This is a relation, regardless of the number of arrows per student.
2. Check every input. Exactly one outgoing arrow from each is necessary and sufficient for a function.
3. Once it is a function, check incoming arrows. At most one per output makes it one-to-one; at least one per output makes it onto.

## Real world

### Assigning lockers

Giving every student one locker defines a function. If lockers cannot be shared, the function must also be one-to-one. Unused lockers are allowed unless the assignment must be onto.

### Recording several interests

A student may list several interests, or none. Student–interest pairs form a relation, but generally not a function with individual interests as outputs. A function could instead assign each student one whole list of interests; that uses a different output set.
