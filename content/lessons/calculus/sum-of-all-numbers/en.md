---
title: 'Does 1 + 2 + 3 + … equal −1/12?'
summary: >-
  Adding 1, 2, 3 and so on forever never stops growing, so the famous answer
  of minus one twelfth does not come from adding. It comes from a curve.
parameters:
  s: the power s
  N: how many numbers N
variables:
  - 'the zeta curve: for each power, the total the sum settles at, continued smoothly to the left of the wall'
  - 'the power: every number n in the sum is replaced by one over n multiplied by itself s times'
  - how many numbers have been added so far
---

## Try it

1. Leave «the power s» at 2. The picture now adds $1 + \frac{1}{4} + \frac{1}{9} + \cdots$. Raise «how many numbers N» to 50. The bars on the right level off near 1.645, the height of the dot on the curve.
2. Drag the dot left, past the dashed wall, until s is $-1$. The picture now adds $1 + 2 + 3 + \cdots$, and the first 50 numbers already total 1275. The bars keep climbing.
3. Now look at the dot. The dashed curve passes quietly through $-\frac{1}{12}$ at this spot. The curve has a value here. The sum does not.

## Real-life examples

1. **Euler's puzzle.** In 1734 Euler added one over each square number, $1 + \frac{1}{4} + \frac{1}{9} + \cdots$, and found that the total settles at about 1.645. Here the sum and the curve agree.
2. **Books hanging over a table.** Stack books so that each one sticks out a little further than the one above it. The overhang follows $1 + \frac{1}{2} + \frac{1}{3} + \cdots$, which grows forever but very slowly. Fifty numbers reach only about 4.5. This is the wall, and the curve has no value on it.
3. **A vibrating string.** A string can ring at 1, 2, 3 and more times its lowest note. When physicists add the energy of all these notes in string theory they meet $1 + 2 + 3 + \cdots$, and they use the curve's value $-\frac{1}{12}$ in its place.
4. **Two metal plates in empty space.** The calculation of the tiny pull between the plates meets $1 + 8 + 27 + \cdots$. The curve gives $\frac{1}{120}$ there, and the pull measured in a laboratory in 1997 matched it.

## Test yourself

1. Turn the sum into $1 + 2 + 3 + \cdots$.
2. Keep the power at 2 and add at least 40 numbers.
3. Left of the wall, find the place where the curve touches zero.

## Intuition

Put 1 riyal in a jar today, 2 riyals tomorrow and 3 the day after. After 10 days the jar holds 55 riyals, and after 100 days it holds 5050. The jar never stops filling. So the honest answer to "what do all the whole numbers add up to?" is that there is no such number. The total grows without end, and the bars on the right show it.

Now change the game. Add 1, then a quarter, then a ninth, each time one over a square number. These pieces shrink so fast that the total settles near 1.645. The same happens for every power to the right of the dashed wall, and the settled totals draw the solid curve.

That curve is smooth, and there is only one smooth way to carry it on to the left of the wall. Mathematicians follow it there, and that is the dashed part. Where the power is $-1$ the sum would be $1 + 2 + 3 + \cdots$, and the dashed curve reads $-\frac{1}{12}$.

So minus one twelfth is the height of the curve and not what is in the jar. Switch to 3D to see the whole thing as one surface. The sum can only see the half to the right of the wall, and the surface carries on to the other half by itself.

## Formal

For $s > 1$ the zeta function is the sum $\zeta(s) = 1^{-s} + 2^{-s} + 3^{-s} + \cdots$, and the sum converges. For $s \le 1$ it diverges. At $s = -1$ the first $N$ terms total $\frac{N(N+1)}{2}$, which has no finite limit.

Exactly one analytic function agrees with this sum for $s > 1$ and is defined for every $s \ne 1$. It is called the analytic continuation of the sum, and its value at $s = -1$ is $\zeta(-1) = -\frac{1}{12}$. Writing that all the whole numbers add up to $-\frac{1}{12}$ is shorthand for this statement. It is not an ordinary sum.

## Advanced

The continuation obeys the functional equation $\zeta(s) = 2^{s}\pi^{s-1}\sin\left(\frac{\pi s}{2}\right)\Gamma(1-s)\,\zeta(1-s)$, which turns $\zeta(-1)$ into $\zeta(2) = \frac{\pi^2}{6}$. The same number appears without any continuation when the sum is faded out gently instead of being cut off, since $\sum_{n \ge 1} n\,e^{-n/N} = N^2 - \frac{1}{12} + \cdots$. Minus one twelfth is the constant left over once the growing part $N^2$ is removed. The 3D view shows $|\zeta(s)|$ over complex $s$, a single surface with one spike at $s = 1$.

## Derivation

1. Adding the first $N$ whole numbers gives $\frac{N(N+1)}{2}$, which is 55 for ten numbers and 5050 for a hundred. It never settles.
2. Raise each number to the power $-s$ instead. For $s > 1$ the numbers shrink fast enough for the sum to settle, and the total is called $\zeta(s)$.
3. At $s = 2$ the total is $\frac{\pi^2}{6}$, about 1.645. This is where the dot starts.
4. The curve carries on smoothly to the left of the wall, and at $s = -1$ it reads $-\frac{1}{12}$.

## Real world

### The Casimir effect
Two metal plates a hair's width apart in empty space pull on each other. The calculation runs into a sum that grows forever, and the value of the zeta curve gives the force that laboratories measure.

### String theory
Adding the energies of all the notes of a vibrating string leads to the sum of all whole numbers. Using minus one twelfth in its place is what fixes the number of dimensions the theory needs.

### Prime numbers
The same curve holds the pattern of the prime numbers. Where exactly it touches zero is the Riemann hypothesis, an open question with a prize of one million dollars.
