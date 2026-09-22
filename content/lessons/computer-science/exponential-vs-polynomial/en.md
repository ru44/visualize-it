---
title: Exponential vs polynomial growth
summary: >-
  A polynomial like $x^3$ always loses to an exponential like $2^x$ eventually —
  and that single fact underpins password strength, encryption and binary
  search.
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

## Intuition

Drag $x$ along the tangent view of $2^x$ and watch the curve bend ever more sharply upward, while the chart below shows $x^3$ climbing too — smoothly, steadily, unremarkably by comparison. For small $x$, $x^3$ is actually bigger ($x=2$: 8 vs 4), but by $x=10$, $2^x=1024$ has already overtaken $x^3=1000$, and the gap only widens after that.

That crossover is not a coincidence of this particular pair — any exponential eventually beats any fixed-degree polynomial, no matter how high the degree or how close the exponential's base is to 1, because each unit of x multiplies an exponential but only adds a bounded increment to a polynomial's relative growth. It is why adding one more bit to a password does not add a little security, it doubles the number of guesses needed.

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
