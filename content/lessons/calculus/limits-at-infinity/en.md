---
title: Limits at infinity and horizontal asymptotes
summary: >-
  For large $x$, only the highest powers matter — the lower-order terms fade
  into insignificance and the ratio settles onto a flat horizontal line.
parameters:
  a: a (limiting height)
  b: b
  x: x (drag far to the right)
variables:
  - coefficient of the leading term — becomes the asymptote height
  - constant added to the denominator's leading term
  - 'input, dragged out toward large values'
---

## Intuition

Drag $x$ out past $x = 30$ or $40$: the curve, however it wiggled near the origin, has flattened out and is hugging a horizontal line. Read off its height and compare to the slider for $a$ — they match, however $b$ is set.

Change $b$ and watch closely: it visibly reshapes the curve near $x = 0$, where the $+1$ and $+b$ terms are comparable in size to $x^2$, but has no effect at all on the flat height far to the right, because out there $x^2$ dwarfs both constants — only the ratio of leading coefficients, $a/1$, survives.

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
