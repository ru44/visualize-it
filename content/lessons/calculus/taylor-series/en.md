---
title: Taylor series
summary: 'Approximate sine with polynomials built from its derivatives at zero, and check the error away from that centre.'
parameters:
  N: 'N — polynomial degree'
  x: 'x — input in radians'
variables: []
charts:
  - title: sin(x) for comparison
    xLabel: x
    yLabel: y
    series:
      - sine
---

## Try it

1. Set N = 1 and x = 0.3. The main graph is the line P₁(x) = x. Its value 0.3 is close to sin(0.3) ≈ 0.29552 on the separate comparison chart.
2. Set N = 5 and x = 2. The polynomial has three nonzero terms, with value about 0.93333; sine is about 0.90930.
3. Set N = 11 and x = 6. The polynomial gives about −2.06026, while sine is about −0.27942. A high degree does not guarantee small error everywhere in the window.

## Real-life examples

1. **Linear approximation far from zero.** N = 1 at x = 3 gives 3, compared with sin 3 ≈ 0.14112. The absolute error is about 2.85888.
2. **Degree five, three terms.** N = 5 at x = 2 has absolute error about 0.02404, below 0.05.
3. **Degree eleven, six terms.** N = 11 at x = 6 has absolute error about 1.78084. More terms or a smaller input would be needed for a close approximation here.

## Test yourself

1. With N = 1, find x whose absolute approximation error is less than 0.01.
2. With N = 5, find x whose absolute error is less than 0.05.
3. With N = 11, find x whose absolute error is less than 0.05. As an extra experiment, move farther from zero and see where this tolerance fails.

## Intuition

Near zero, sine has value zero and slope one. The line x matches both, so it is the first approximation. Adding −x³/6 also matches sine's third derivative at zero, and the next term x⁵/120 matches its fifth derivative. Each added term uses more local information about the same function.

The control N is the polynomial's degree, not its number of terms. Only odd powers appear because sine's even-order derivatives vanish at zero. The main graph shows the selected finite polynomial, while the separate chart shows sine. They agree closely near the centre but can differ substantially farther away.

## Formal

The Taylor polynomial of degree N about zero is $P_N(x)=\sum_{j=0}^{N}f^{(j)}(0)x^j/j!$. For sine in radians, the odd-degree polynomial is $P_{2m+1}(x)=\sum_{j=0}^{m}(-1)^j x^{2j+1}/(2j+1)!$. A factorial such as 3! means 3 × 2 × 1.

For the displayed odd degrees, the error obeys $|\sin x-P_N(x)|\leq |x|^{N+2}/(N+2)!$. Sine's next even coefficient is zero, and all its derivatives have magnitude at most 1, giving this Taylor bound. A bound may be larger than the actual error.

## Advanced

The infinite sine series converges to sine at every real input, even though a fixed finite polynomial need not approximate it well far from zero. A general smooth function need not equal its infinite Taylor series. For example, the series for 1/(1 − x) about zero converges only for |x| < 1. Finite approximation, convergence and equality with the function are distinct questions.

## Derivation

1. Choose polynomial coefficients so that its derivatives at zero match the function's derivatives through the required degree.
2. Sine's derivatives cycle through sine, cosine, negative sine and negative cosine, giving values 0, 1, 0, −1 and so on at zero.
3. Substitute the nonzero coefficients to obtain alternating odd powers divided by factorials.

## Real world

### Small-angle models

Replacing sin θ by θ is the degree-one approximation, with θ in radians. An error estimate tells you when the replacement is accurate enough.

### Local numerical calculations

Polynomial approximations replace a complicated function with additions and multiplications near a chosen centre. Practical algorithms can also reduce the input range or use other approximations; this lesson does not prescribe how every calculator works.
