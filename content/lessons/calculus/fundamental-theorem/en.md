---
title: The fundamental theorem of calculus
summary: 'Connect an accumulated total to its rate of change, and calculate integrals with antiderivatives.'
parameters:
  a: 'a — starting bound'
  b: 'b — ending bound'
variables:
  - 'f(x): signed rate shown in the main graph'
  - 'F(b): signed accumulation from the selected a to b'
  - 'a, b: starting and ending bounds'
charts:
  - title: Signed accumulation from a to b
    xLabel: b
    yLabel: F(b)
    series:
      - F(b) = -2cos(b) + 0.5b + 2cos(a) - 0.5a
---

## Try it

1. Set a = 0 and move b from 0 to 3. The curve f(x) is positive there, so the accumulated signed total F(b) increases to about 5.480.
2. Continue moving b to 6. The curve becomes negative during part of this interval, so F decreases; at b = 6 it is about 3.080.
3. Set a = 2 and b = 8. The signed total is about 2.459. The accumulation chart now uses the selected starting bound a, so its marker agrees with the signed integral readout.

## Real-life examples

1. **Accumulating positive values.** From 0 to 3, the integral is about 5.480. It adds the entire positive contribution on this interval.
2. **Subtracting a negative contribution.** From 0 to 6, the integral is about 3.080, less than the total up to 3 despite the longer interval.
3. **Changing the starting bound.** From 2 to 8, the integral is about 2.459. It excludes the accumulation before 2.

## Test yourself

1. Make the signed integral within 0.4 of 5.
2. Choose bounds with |b − a| greater than 1 and absolute signed integral less than 0.3.
3. Make the signed integral greater than 6.

## Intuition

An integral keeps a running signed total. If the function is positive at the moving end of the interval, extending that interval adds a positive contribution. If it is negative, extending the interval reduces the total. The first graph shows the rate being accumulated; the lower chart shows the accumulated result.

For a small increase h in the endpoint, the extra contribution is approximately the current height times h. Dividing that increase in the total by h gives approximately the current height. As h tends to zero, this becomes exact: the derivative of accumulation is the original function. For velocity, the total is displacement; an odometer's total distance would instead accumulate speed and would not decrease when moving backward.

## Formal

If f is continuous on an interval and a is fixed, define $F(b)=\int_a^b f(x)\,dx$. At interior points, $F'(b)=f(b)$. Continuity supplies the link between the value at the endpoint and nearby values used in the integral.

If G is any antiderivative of continuous f, then $\int_a^b f(x)\,dx=G(b)-G(a)$. Here $f(x)=2\sin x+0.5$ and $G(x)=-2\cos x+0.5x$. Thus $F(b)=-2\cos b+0.5b+2\cos a-0.5a$, the formula used by the chart.

## Advanced

Changing the fixed starting bound shifts the accumulation curve vertically; its derivative with respect to the ending bound stays f(b). A zero of f gives a stationary point of F, but a maximum requires a positive-to-negative sign change and a minimum requires the reverse. The instantaneous height and accumulated total are different quantities.

## Derivation

1. Define F as the signed integral from the fixed starting bound a to the varying endpoint b.
2. The difference F(b + h) − F(b) is the integral over the small added interval. Continuity makes it approximately a rectangle with height f(b) and signed width h.
3. Divide by h and take the limit. The average over the shrinking interval tends to f(b), establishing F′(b) = f(b).

## Real world

### Tracking a tank's contents

Integrating the net inflow rate gives the change in stored volume. Add the initial volume to obtain the actual amount in the tank. Outflow can make the accumulated change decrease.

### Position and velocity

For a continuous velocity, integrating over time gives displacement. Differentiating a position function gives velocity; the initial position is the extra constant needed to recover absolute position.
