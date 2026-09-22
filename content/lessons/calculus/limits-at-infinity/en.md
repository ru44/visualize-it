---
title: Limits at infinity and horizontal asymptotes
summary: >-
  A skydiver falling from a plane can't fall faster than their top speed no
  matter how long the fall continues — a horizontal asymptote is the number
  a curve settles toward and never runs past, the same way.
parameters:
  a: a (limiting height)
  b: b
  x: x (drag far to the right)
variables:
  - coefficient of the leading term — becomes the asymptote height
  - constant added to the denominator's leading term
  - 'input, dragged out toward large values'
---

## Try it

1. Drag «x (drag far to the right)» out past 30 or 40. The curve flattens and hugs a horizontal line.
2. Read the flat height and compare it to «a (limiting height)». They match.
3. Change «b» and watch near x = 0: the curve reshapes there, but the flat height far to the right never moves.

## Real-life examples

1. **Early reading, still settling.** With a = 2, b = 3 and x = 5, the curve hasn't reached its flat asymptote yet — it's still visibly changing.
2. **Terminal velocity nearly reached.** With a = 1.5, b = 6 and x = 50, a falling object's speed has settled almost exactly onto its terminal value a.
3. **An enzyme reaction near its maximum rate.** With a = 3.5, b = 1 and x = 45, the reaction rate has climbed close to its ceiling Vmax, here represented by a.

## Test yourself

1. Push x out far enough that the curve sits within 0.01 of its flat asymptote a.
2. Make the asymptote higher than 3, and confirm the curve has settled within 0.05 of it.
3. Keep x near 0 and make the curve's value more than 3 below the asymptote a.

## Intuition

Picture a skydiver who has just jumped: at first they speed up quickly, but air resistance grows too, and eventually their falling speed stops increasing and settles at a fixed number — the terminal velocity. On screen, drag «x (drag far to the right)» out past 30 or 40, standing in for more and more time spent falling: the curve, however it wiggled near the start, flattens out and hugs a horizontal line.

Read off that flat height and compare it to the slider «a (limiting height)» — they match, no matter how «b» is set. Now change «b» and watch closely: it visibly reshapes the curve near the very start, where its effect is still comparable in size to everything else, but it has no effect at all on the flat height far to the right, because out there the fastest-growing term dwarfs everything else.

## Formal

$\lim_{x\to\infty}\frac{ax^2+1}{x^2+b} = a$, since dividing numerator and denominator by $x^2$ sends the constant terms to $0$.

The line $y=a$ is a horizontal asymptote: the graph approaches it as $x\to\infty$ but need not ever equal it.

## Advanced

This is a special case of the general rule for rational functions $p(x)/q(x)$: if $\deg p = \deg q$, the limit at infinity is the ratio of leading coefficients; if $\deg p < \deg q$ it is $0$; if $\deg p > \deg q$ there is no finite limit (the function diverges, possibly along a slant asymptote).

## Derivation

1. Divide every term by $x^2$, the highest power present.
2. Any constant divided by a growing $x^2$ vanishes in the limit.
3. Substitute the vanished terms — only the leading coefficients survive.

## Real world

### Terminal velocity
Drag models like $v(t) \to v_{\text{terminal}}$ as $t\to\infty$ are horizontal-asymptote limits.

### Michaelis–Menten enzyme kinetics
Reaction rate approaches a maximum $V_{\max}$ as substrate concentration grows — a rational-function asymptote.

### Long-run cost averages
Average cost per unit as production scales up settles toward the marginal cost, the horizontal asymptote of a cost-ratio curve.

### Signal-to-noise saturation
Many detector responses saturate toward a fixed level as input intensity grows without bound.
