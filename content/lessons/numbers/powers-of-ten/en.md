---
title: Powers of ten
summary: >-
  One slider can take you from the size of a strand of DNA to the size of
  the whole Earth, because each step just multiplies by ten.
parameters:
  e: the exponent e
variables:
  - 'the exponent: how many tens are multiplied together to make the number'
---

## Try it

1. Drag the orange dot along the ruler labelled «exponent e». Watch the icon in the middle jump from a tiny atom toward a whole mountain after just a few notches.
2. Set e to 0. The icon settles on a child about a metre tall — one whole unit, no zooming needed.
3. Raise e to 9. The icon leaps out to the distance between Earth and the Sun, even though the dot itself barely crawled along the ruler.

## Real-life examples

1. **A strand of DNA.** About $10^{-9}$ m is close to the width of a strand of DNA — far too small to see with any home microscope.
2. **A child standing up.** About $10^{0}$ m, roughly one metre, is an everyday size you can picture without help.
3. **Across the Earth.** About $10^{7}$ m is close to Earth's diameter, the size the globe icon shows on the ruler.

## Test yourself

1. Set e to exactly 3.
2. Bring e down between −3 and −1.
3. Make $10^{e}$ equal to one million.

## Intuition

Stand a child next to a mountain: the child is about one metre tall, and Mount Everest is about nine thousand metres. Drag the orange dot a few notches to the right, and the icon in the middle jumps from the child to the mountain to the whole Earth, long before the dot has crossed the screen.

Each single click of that dot means one more multiplication by ten. A positive $e$ means multiplying by ten that many times. A negative $e$ instead means dividing by ten that many times, shrinking the icon down past an ant, a hair, and all the way to a strand of DNA.

## Formal

A power of ten is written $10^{e}$, where $e$ is any real number. When $e$ is a positive whole number, $10^{e}$ is a 1 followed by $e$ zeros; when $e$ is a negative whole number, it is a decimal point followed by $|e|-1$ zeros and then a 1.

Going from one whole exponent to the next always multiplies by ten: $10^{e+1} = 10\times10^{e}$. That single fact is the entire engine behind the slider.

## Advanced

For a non-whole exponent, $10^{x} = \exp(x\ln 10)$, which is why the picture can glide smoothly between whole powers instead of jumping from one to the next.

## Derivation

1. $10^{0}=1$ is the starting point: no multiplications yet.
2. $10^{1}=10$ and $10^{2}=100$: each extra step of $e$ adds one more zero.
3. In general, one more step always means one more multiplication by ten: $10^{e+1} = 10\times10^{e}$.

## Real world

### Rulers and maps
A map scale like 1∶100,000 is a power-of-ten jump between the paper and the real distance.

### Sound and earthquakes
The decibel and Richter scales are built on powers of ten, so a "small" jump in the number means a huge jump in real loudness or shaking.

### Computer storage
Storage sizes step through powers of ten (and of two): kilobyte, megabyte, gigabyte — each roughly a thousand times the last.
