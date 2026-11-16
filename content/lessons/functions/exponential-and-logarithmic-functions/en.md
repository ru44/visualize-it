---
title: Exponential and logarithmic functions
summary: Use an exponential to calculate repeated multiplication, and a logarithm to recover the exponent.
parameters:
  x: input x
  sel: function (0 exponential, 1 logarithm)
  b: base b (logarithms require b other than 1)
variables:
  - positive base; logarithms also require it to differ from 1
  - exponent in the exponential rule
  - positive result of exponentiation, used as the logarithm's input
---

## Try it

1. Set sel to 0 and b to 2. Compare inputs near 1, 2 and 3. The outputs are near 2, 4 and 8; each increase of 1 doubles the output.
2. Keep sel at 0 and set b to 0.5. Increasing x by 1 now halves the output.
3. Set sel to 1 and b to 2. An input near 4 gives an output near 2: the logarithm asks what power of 2 gives 4. Use b = 2 for this comparison, not 0.5 or 1.

## Real-life examples

1. **Three doublings.** With sel = 0, b = 2 and x = 3, the output is 8. A starting quantity multiplied by this factor becomes eight times as large.
2. **Two halvings.** With sel = 0, b = 0.5 and x = 2, the output is 0.25. One quarter of the starting amount remains.
3. **Recovering an exponent.** With sel = 1, b = 10 and x = 5, the output is about 0.699. Ten raised to that power is approximately 5.

## Test yourself

1. Select the exponential, set b above 1.9, and choose x above 3.5.
2. Select the exponential, set b below 0.6, and choose x above 3.
3. Select the logarithm, set b above 9, and choose x above 4.

## Intuition

Start with one item and double the count each round. After one round there are 2, after two there are 4, and after three there are 8. The exponential rule takes the number of rounds as its input and gives the multiplication factor.

Now reverse the question. How many doublings take 1 to 8? The answer is 3. A logarithm calculates that exponent. It can also give a non-integer answer: the exponent needed to reach a value between 4 and 8 lies between 2 and 3.

Changing the base changes the multiplier. A base above 1 produces growth, while a base between 0 and 1 produces decay as the exponent increases. The logarithm reverses either rule, but its input must be positive. Base 1 is a special case: its exponential always gives 1, so it has no inverse logarithm.

## Formal

For $b>0$, the exponential $y=b^x$ accepts every real x and returns a positive y. For b greater than 1 it increases, and for b between 0 and 1 it decreases. At b = 1 it is constant.

For $b>0$ and $b\ne1$, the equivalent logarithmic statement is $x=\log_b y$, with y positive. When plotting the logarithm using the usual input label x, its rule is log base b of x and its vertical asymptote is x = 0. It increases for b greater than 1 and decreases for b between 0 and 1.

## Advanced

The two inverse graphs reflect across the line y = x. The display switches between them rather than overlaying them, and shows only positive input positions. Its viewport does not restrict the exponential's full mathematical domain. Equal multiplicative changes in a logarithm's input produce equal additive changes in its output.

## Derivation

1. Begin with the statement that b raised to x equals y, assuming a positive base other than 1.
2. Apply the logarithm with that same base to both positive sides.
3. The logarithm recovers the exponent x. The resulting equation expresses the same relationship in reverse.

## Real world

### Repeated scaling

A quantity multiplied by the same factor each step follows an exponential pattern. This model assumes the factor stays constant.

### Comparing large ratios

A logarithmic display makes equal ratios occupy equal intervals, allowing very different magnitudes to fit on one scale.

### Finding a step count

If a stored quantity doubles each round, a base-2 logarithm determines how many rounds are needed to reach a given multiple of its starting value.
