---
title: Algorithms and Big-O complexity
summary: >-
  Before you pick an algorithm, it pays to know whether its running time
  creeps up slowly or explodes once the input gets huge.
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

## Try it

1. Drag «n» along the straight line from 1 up to 30, and watch the line stay perfectly straight the whole way.
2. Look at the chart below: the same n now marks a point on three more curves at once — notice how close together they are at n=10 and how far apart by n=30.
3. Raise «k» and watch the straight line get steeper — multiplying by a bigger k still only makes a straight line, never a curve.

## Real-life examples

- **Grading 30 exams, 2 minutes each.** With n=30 exams and k=2 minutes per exam, the straight line shows a job that takes 60 minutes in total — double the exams, double the time.
- **Checking 10 names on a guest list, 1 second each.** With n=10 and k=1, the search takes about 10 seconds — the simplest, slowest-growing kind of work there is.
- **Delivering to 20 houses, 4 minutes between stops.** With n=20 and k=4, the round trip takes about 80 minutes — still a straight line, just a steeper one.

## Test yourself

1. Set the sliders so the line's height — k times n — lands on exactly 60.
2. Bring the line's height down to about 24 (within 1 either way).
3. Push k all the way up to 5, then raise n until the line reaches 100 or higher.

## Intuition

Picture grading a stack of exams: 10 exams take some amount of time, but 30 exams — three times as many — could take three times as long, depending on how the grading works. Drag the slider labelled $n$ (how many exams, from 1 to 30) and watch the straight orange line rise. It is controlled by a second slider, $k$, which sets how steep the line climbs, like minutes spent per exam. At $n=10$ the line sits low. By $n=30$ it has climbed three times higher, because a straight line grows in direct proportion to the number of exams.

Now look at the chart underneath. The same $n$ marks a point on three more curves at once. One is the straight line itself, labelled n on the chart. Another, labelled n·log2(n) on the legend, climbs a little faster. The steepest, labelled n² there, races far above the rest by the time input size reaches 30. A fourth curve, labelled $2^n$, grows so fast it flies off the top of the chart long before then. That gap between the curves — not which curve wins for one small input — is what tells you whether an algorithm will still be fast once the input is huge.

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
