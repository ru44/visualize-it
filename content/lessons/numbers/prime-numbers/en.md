---
title: Prime numbers
summary: Find numbers that divide only by themselves and one, using a grid of multiples.
parameters:
  N: largest number in the grid N
  p: number of prime filters used p
variables:
  - whole number being tested
  - smaller factor, greater than 1
  - larger factor, smaller than the number being tested
---

## Try it

1. Set N to 100 and p to 0. The grid has not yet eliminated multiples. The number 1 is excluded from the primes.
2. Set p to 1. Multiples of 2 from 4 onwards are crossed out. The number 2 itself remains.
3. Set p to 4. The filters for 2, 3, 5 and 7 have all been used. The 25 surviving numbers greater than 1 are prime.

## Real-life examples

1. **An unfinished sieve up to 50.** With p = 2, the filters remove multiples of 2 and 3. Numbers such as 25 and 49 still remain, so the survivors are not all prime yet.
2. **A completed sieve up to 100.** With p = 4, filtering by 2, 3, 5 and 7 leaves the 25 primes in this range.
3. **Checking even numbers up to 120.** With p = 1, even numbers greater than 2 are crossed out. Odd composite numbers still need checking.

## Test yourself

1. Use all four filters and set N to at least 100.
2. Set N to 20.
3. Set p to 0 to remove the filters.

## Intuition

You can arrange 12 counters into 3 equal groups of 4, so 12 has factors other than 1 and itself. With 7 counters, no such whole-number grouping works. A whole number greater than 1 with only those two divisors is called prime.

The grid finds primes by eliminating numbers with known factors. Starting with 2, cross out 4, 6, 8 and the later multiples, but keep 2 itself. Then use 3 to cross out its larger multiples. Continue with the next primes.

A number surviving an unfinished sieve is only a candidate. For example, 49 survives the filters for 2, 3 and 5, but the filter for 7 removes it. Within this grid's limit of 120, completing the filters through 7 leaves only primes.

## Formal

A whole number N greater than 1 is composite if $N=a\times b$ for whole numbers satisfying $1<a\le b<N$. If no such factors exist, N is prime. The number 1 is neither prime nor composite.

To complete a sieve up to a limit N, use each prime no greater than $\sqrt{N}$. Any composite number in the range has at least one factor no greater than this bound.

## Advanced

When processing a prime p, you can begin crossing out at $p^2$. Smaller multiples of p have a smaller prime factor and were already removed. This avoids repeated work without changing the survivors.

## Derivation

1. Cross out multiples of 2 starting at 4. Keep 2 because a prime is not eliminated by its own filter.
2. Next process 3. Start at 9 because 6 has already been removed by the filter for 2.
3. Continue through the required primes. Only after completing these filters can the surviving numbers greater than 1 be declared prime.

## Real world

### Equal groups

Prime numbers tell us when a collection cannot be split into equal whole-number groups except one group or groups of one.

### Repeating cycles

Two cycles whose lengths share no factor greater than 1 meet less frequently than cycles with a shared factor. Such lengths are called coprime; they need not both be prime.

### Factoring

Finding the prime factors of a number breaks it into multiplicative building blocks. For example, 12 is 2 times 2 times 3.
