---
title: Algorithms and Big-O complexity
summary: >-
  How does an algorithm's running time grow as the input grows? Compare a line,
  a curve and an explosion on the same axes.
parameters:
  x: n — input size
  k: k — slope of the linear reference line
variables:
  - the size of the input — how many items the algorithm processes
  - the number of basic operations the algorithm performs for input size n
  - >-
    an upper bound: T(n) grows no faster than f(n), up to a constant factor,
    once n is large
charts:
  - title: 'Polynomial growth: n, n·log2(n) and n²'
    xLabel: n (input size)
    yLabel: operations
    series:
      - 'n'
      - n·log2(n)
      - n²
  - title: 'Exponential growth dwarfs everything: 2^n against n²'
    xLabel: n (input size)
    yLabel: operations
    series:
      - n²
      - 2^n
---

## Intuition

Drag $n$ along the plain line $k\cdot n$ — the straight reference growth — then look at the chart underneath, where the same $n$ marks three other curves at once. At $n=10$ they are close together; at $n=30$, $n\log_2 n$ has pulled slightly ahead of a straight line, $n^2$ has raced far above it, and $2^n$ has flown off the top of the chart entirely.

That gap is the whole point of Big-O: it is not about which algorithm is faster for one particular $n$, it is about which curve you are on. An $O(n^2)$ algorithm that beats an $O(n\log n)$ one for a small $n$ will always lose once $n$ is large enough — the chart shows exactly where the curves cross and diverge.

## Formal

$T(n) = O(f(n))$ means there exist constants $c>0$ and $n_0$ such that $T(n) \le c\,f(n)$ for all $n \ge n_0$ — an asymptotic upper bound that ignores constant factors and small-$n$ behaviour.

The common growth classes, from slowest to fastest-growing, are $O(\log n) < O(n) < O(n\log n) < O(n^2) < O(2^n)$; an algorithm's class is usually set by its nested loops (multiplicative) or by how it splits its input (recursive, often logarithmic).

## Advanced

$\Theta(f(n))$ tightens Big-O to a two-sided bound ($c_1 f(n) \le T(n) \le c_2 f(n)$), while $\Omega(f(n))$ gives only a lower bound; together they classify an algorithm's exact growth rather than just an upper limit. P versus NP asks whether every problem whose solution can be checked in polynomial time can also be solved in polynomial time — the biggest open question built on exactly this notation.

## Derivation

1. Count operations directly: a single pass over n items costs a constant amount of work per item, plus fixed overhead.
2. Once n is large enough, the constant term becomes negligible next to the term proportional to n — this is exactly the Big-O definition.
3. Drop the constants and lower-order terms: only the fastest-growing term survives in the classification.

## Real world

### Search engines
Indexing billions of pages only works because lookup is O(log n) or better, not O(n) per query.

### Scaling a startup
An O(n²) algorithm that works fine on 1,000 users can grind to a halt at 1,000,000 — a million-times slowdown, not a thousand-times.

### Compiler and database optimisation
Choosing between algorithms with different Big-O classes is the single biggest lever for performance at scale.

### Cryptography
Security often relies on the gap between polynomial-time and exponential-time algorithms for the same problem — see exponential vs polynomial growth.
