---
title: The Pythagorean and tangent identities
summary: 'Explain why sine squared plus cosine squared is always 1, and relate tangent to the same coordinates.'
parameters:
  theta: 'θ — angle in degrees'
variables:
  - 'θ: angle counterclockwise from the positive horizontal axis'
  - 'sin θ: signed vertical coordinate'
  - 'cos θ: signed horizontal coordinate'
  - 'tan θ: vertical coordinate divided by horizontal coordinate, when defined'
---

## Try it

1. Set θ = 0°. Sine is 0 and cosine is 1, so their squared values add to 1.
2. Set θ = 45°. Both values are about 0.7071. Each square is about 0.5, again giving 1. Rounded readouts may introduce a small arithmetic error.
3. Set θ = 115°, then 205°. Coordinate signs change, but the squares still add to 1. Divide sine by cosine to check the tangent where cosine is nonzero.

## Real-life examples

1. **First quadrant.** At 25°, sine is about 0.4226 and cosine about 0.9063. Their squares are about 0.1786 and 0.8214.
2. **Second quadrant.** At 115°, sine is about 0.9063 and cosine about −0.4226. The squared values still sum to 1; tangent is negative.
3. **Third quadrant.** At 205°, sine is about −0.4226 and cosine about −0.9063. Their ratio is positive even though both coordinates are negative.

## Test yourself

1. Make tangent differ from 1 by less than 0.02.
2. Make sine greater than 0.9 and cosine negative.
3. Make sine squared differ from 0.25 by less than 0.01 while cosine is negative.

## Intuition

The point stays one unit from the centre. Its horizontal and vertical coordinates vary, but the squared distance is always the horizontal coordinate squared plus the vertical coordinate squared. Calling those coordinates cosine and sine gives the identity. Negative coordinates cause no problem because their squares are positive.

An identity holds for every permitted input, whereas an equation such as sine equals 0.5 selects particular angles. The diagram offers examples of the identity; the circle equation explains why it must hold for all angles. Tangent uses the ratio of the same coordinates to describe the slope of the line through the centre and the point.

## Formal

For every real angle θ, $\sin^2\theta+\cos^2\theta=1$. Here $\sin^2\theta$ means $[\sin\theta]^2$, not sine of the squared angle. Each sine and cosine value lies between −1 and 1.

Where $\cos\theta\ne0$, $\tan\theta=\sin\theta/\cos\theta$. Rearranging the first identity gives $\cos\theta=\pm\sqrt{1-\sin^2\theta}$; the quadrant determines the sign. Knowing sine alone does not always determine cosine's sign.

## Advanced

Divide the Pythagorean identity by cosine squared, only where cosine is nonzero, to obtain 1 + tan² θ = 1/cos² θ. Conditions matter: division cannot extend the resulting identity to angles where its denominator vanishes.

## Derivation

1. The squared distance of a point (x, y) from the origin is x² + y². On the unit circle this equals 1.
2. Substitute cosine for x and sine for y to obtain the Pythagorean identity.
3. For a nonzero horizontal coordinate, the slope y/x is sine divided by cosine, which defines tangent.

## Real world

### Checking a direction vector

The vector (cos θ, sin θ) has length 1. Multiplying it by a desired distance gives a displacement of that length in the chosen direction.

### Recovering a component

If a unit vector has vertical component 0.6, its horizontal component is either 0.8 or −0.8. Direction information selects the sign; the identity supplies the magnitude.
