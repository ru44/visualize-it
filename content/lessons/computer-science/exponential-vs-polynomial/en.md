---
title: Exponential vs polynomial growth
summary: >-
  Understanding why anything that keeps doubling eventually overtakes
  anything that merely grows by a fixed power explains why one extra
  character in a password or one extra bit in an encryption key makes it
  dramatically harder to crack.
parameters:
  x: x — position on the curve
variables:
  - 'the input — for example, the number of bits or characters in a key'
  - 'exponential growth: doubling with every extra unit of x'
  - 'polynomial growth: a fixed-degree power of x'
charts:
  - title: Exponential 2^x eventually overtakes polynomial x^3
    xLabel: x
    yLabel: value
    series:
      - 2^x
      - x^3
---

## Try it

1. Set the slider "x" to 2. On the chart, notice the polynomial curve sitting above the exponential curve — 8 beats 4.
2. Drag "x" up to 10 and watch the two curves cross: the exponential curve rockets to 1024 while the polynomial curve is still only at 1000.
3. Push "x" all the way to 12 and read the gap: the exponential curve is now far above the polynomial one, more than twice as high.

## Real-life examples

- **Two weeks into a savings challenge.** Setting "x" to 2 shows the cube-growing allowance still ahead of the doubling one — early on, doubling looks unimpressive.
- **Ten weeks in.** Setting "x" to 10 shows the doubling allowance has just overtaken the cube-growing one, the exact week the exponential wins for good.
- **A full 12-week challenge.** Setting "x" to 12 shows the doubling allowance far out in front, worth more than twice as much as the cube-growing one.

## Test yourself

1. Find a value of "x" where the exponential curve is already bigger than the polynomial curve.
2. Find the exact value of "x" where the exponential curve beats the polynomial curve by 2368.
3. Find a value of "x" in the middle of the slider's range where the polynomial curve is still bigger than the exponential curve.

## Intuition

Imagine two weekly allowances that start out equal. One doubles every week: after 2 weeks it is 4 dollars, but after 10 weeks it has grown to $2^{10}=1024$ dollars. The other grows with the cube of the number of weeks: after 2 weeks it is 8 dollars, well ahead of the doubling one, but after 10 weeks it only reaches $10^3=1000$ dollars — already behind. Drag the slider "x" up toward 12 and watch the chart's steep curve, the exponential one, pull decisively ahead of the gently climbing cube.

That crossover near x = 10 is no accident of this one pair of numbers — any exponential curve eventually beats any polynomial curve, no matter how high the polynomial's power or how close the exponential's base is to 1. Look at the chart's two curves: the steep one is $2^x$, doubling with every step of x. The gentler one is $x^3$, growing only by a fixed power of x. That is why adding a single extra character to a password does not add a little security — it doubles the number of guesses an attacker needs.

## Formal

For any fixed $k$ and any base $b>1$, $\lim_{x\to\infty} \dfrac{x^k}{b^x} = 0$: exponential functions eventually dominate every polynomial, regardless of degree $k$ or base $b$.

Binary search on a sorted list of n items halves the remaining range each comparison, needing $\lceil \log_2 n \rceil$ steps — the inverse relationship: just as $2^x$ grows explosively in $x$, $\log_2 n$ grows only slowly in $n$, which is why doubling the data barely changes the number of steps.

## Advanced

A brute-force search over an n-bit key space costs O(2^n); adding one bit doubles the work, so security parameters are chosen in bits precisely because the cost scales exponentially while the cost of using the key (encrypting one message) scales polynomially in n — that asymmetry, not secrecy of the algorithm, is what modern cryptography relies on. The hardest known classical algorithms for breaking RSA (factoring) are sub-exponential but still super-polynomial, while quantum algorithms (Shor's) would make factoring polynomial-time — the reason post-quantum cryptography is being developed.

## Derivation

1. Differentiate the ratio: past a certain x, the numerator turns negative and the ratio starts falling.
2. Each differentiation reduces the polynomial's degree by one while the exponential reproduces itself up to a constant.
3. After k applications the polynomial is gone and only a shrinking exponential remains — the limit is 0.

## Real world

### Password strength
Each extra character (or bit) in a password multiplies, not adds to, the number of guesses a brute-force attacker needs — exponential, not polynomial, growth in security.

### Encryption key sizes
AES-256 is not "roughly twice as strong" as AES-128 — it is 2^128 times harder to brute force, because security scales exponentially with key length.

### Binary search
Searching a sorted array of a billion items takes about 30 comparisons, not a billion, because each comparison halves the range — the logarithmic mirror image of exponential growth.

### Why some algorithms are infeasible
An O(2^n) algorithm for the travelling salesman problem is fine for 10 cities and impossible for 100 — no amount of faster hardware closes an exponential gap.
