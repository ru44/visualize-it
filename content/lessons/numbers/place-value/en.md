---
title: Place value
summary: >-
  Learn why 347 sweets and 743 sweets are worlds apart, even though both use
  the very same three digits.
parameters:
  N: the number N
---

## Try it

1. Drag the slider labelled N up past 9. A teal square, one for each sweet, snaps together into a single blue rod in the tens column — ten sweets bundled as one ten.
2. Push N past 99. Watch an orange hundred-square appear: a whole flat sheet worth a hundred sweets at once.
3. Set N close to 9999, and count the red thousand-cubes stacking up in the first column — each one is worth a thousand sweets.

## Real-life examples

1. **Sweets in a bag.** 124 sweets split into 1 hundred, 2 tens and 4 ones — easy to count fast.
2. **Seats filled in a small stadium.** 2530 seats: 2 thousands, 5 hundreds, 3 tens and 0 ones.
3. **Rice in a cooking pot.** About 8000 grains of rice: 8 whole thousands, no smaller piles left over.

## Test yourself

1. Set N to exactly 1000, a nice round thousand.
2. Make the hundreds digit of N equal to 5.
3. Push N above 9000 but keep it under 9500.

## Intuition

Picture 347 sweets, stacked as building blocks on screen: a small teal square for each single sweet, a blue rod for every bundle of ten, an orange sheet for every hundred, and a deep red cube for every full thousand. Drag the slider N, and watch ten small teal squares in the ones column snap together into one blue rod the moment N passes a multiple of ten.

This is why 347 sweets and 743 sweets are worlds apart, even though both numbers use the very same three digits. Swap the first digit with the last, and you trade seven hundred sweets for only three hundred — a jump of four hundred sweets, just from moving two digits around.

## Formal

In base ten, a whole number is written as a row of digits, and each position stands for a power of ten: ones, tens, hundreds, thousands, and so on. The digit itself (0–9) says how many of that power of ten to take.

So $347 = 3\times10^{2} + 4\times10^{1} + 7\times10^{0}$: three hundreds, four tens and seven ones, added together.

## Advanced

Any base $b$ works the same way: digits run from $0$ to $b-1$, and position $i$ stands for $b^{i}$. Binary (base two) and hexadecimal (base sixteen) are place-value systems too — computers just use $b=2$ instead of $b=10$.

## Derivation

1. Split 347 into a hundreds part, a tens part and a ones part: 300, 40 and 7.
2. Write each part as a digit times a round number: 3 hundreds, 4 tens, 7 ones.
3. Replace each round number with a power of ten, since $100 = 10^2$ and $10 = 10^1$.

## Real world

### Money
Prices work the same way: a cost of 3.47 dollars is 3 whole units, 4 tenths and 7 hundredths — place value with powers smaller than one.

### Odometers
A car's odometer wheel for the ones place spins fastest; each full turn nudges the tens wheel by one digit, exactly like carrying in place value.

### Computer memory
Computers store every number in place-value columns too, just with base two instead of base ten — that's what a "bit" position means.
