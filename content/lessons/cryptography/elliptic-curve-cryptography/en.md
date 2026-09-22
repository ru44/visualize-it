---
title: 'Elliptic curve cryptography: adding points on a curve'
summary: The same security as RSA with far shorter keys — because "adding" points on this curve is easy forward and dizzyingly hard to undo.
parameters:
  a: curve shape a
  b: curve shape b
  px: point P's position
  qx: point Q's position
variables:
  - how tightly the curve bends
  - where the curve crosses the vertical axis
---

## Try it

1. Look at the S-shaped curve. Drag «px» and «qx» to slide the points labeled P and Q anywhere along it.
2. Watch the dashed line drawn through P and Q, and the point where it crosses the curve a third time, reflected below the axis to become the point labeled P + Q.
3. Drag «a» and «b» and watch the whole curve change shape, sometimes pinching into a sharp point where the addition rule breaks down.

## Real-life examples

1. **A shallow curve like those used in real systems, simplified.** With «a» = -1, «b» = 1, «px» = -1 and «qx» = 0.5, this is the shape most of this page uses.
2. **A steeper curve, with points spread far apart.** «a» = 1, «b» = 3, «px» = 0 and «qx» = 1 stretch the curve and separate the two points.
3. **A curve stretched near its bending limit.** «a» = -3, «b» = 5, «px» = 1 and «qx» = 2 push the shape close to where the addition rule would stop working.

## Test yourself

1. Set «a» to 0, removing the curve's middle term entirely.
2. Push «b» to 5, its highest value on this page.
3. Line «px» and «qx» up at exactly the same number.

## Intuition

Real elliptic-curve systems use a curve over a huge finite grid of numbers, but the same "adding" rule already makes sense on this ordinary, continuous curve drawn on screen. Drag «px» to move the point labeled P and «qx» to move the point labeled Q anywhere along the curve, and a dashed line is drawn straight through both of them.

That dashed line always crosses the curve at exactly one more point, and flipping it over the horizontal axis gives the point labeled P + Q. With $a = -1$, $b = 1$, $P = (-1, 1)$ and $Q = (1, 1)$, the line through them is flat, so it meets the curve a third time exactly at $x = 0$, giving $P + Q = (0, -1)$.

## Formal

Write the curve as $y^2 = x^3 + ax + b$. For two points $P = (x_P, y_P)$ and $Q = (x_Q, y_Q)$ with $x_P \ne x_Q$, the slope of the line through them is $\lambda = \dfrac{y_Q - y_P}{x_Q - x_P}$.

That line meets the curve at a third point, which reflected over the x-axis gives the sum: $x_R = \lambda^{2} - x_P - x_Q$ and $y_{P+Q} = \lambda(x_P - x_R) - y_P$.

## Advanced

Repeating this addition rule $k$ times, $P + P + \dots + P = kP$, is fast to compute even for enormous $k$ using a doubling trick similar to fast exponentiation, but recovering $k$ from knowing only $P$ and $kP$ — the elliptic curve discrete logarithm problem — has no known efficient method, and is believed far harder than factoring a similarly sized RSA number. As a result, a 256-bit elliptic-curve key is generally considered about as hard to break as a roughly 3072-bit RSA key, letting elliptic-curve systems use much shorter keys, less bandwidth and less computation for the same security level.

## Derivation

1. Find the slope of the line through P and Q: with $P = (-1, 1)$ and $Q = (1, 1)$, the line is flat, so $\lambda = \dfrac{1 - 1}{1 - (-1)} = 0$.
2. Use that slope to find where the line crosses the curve a third time: $x_R = 0 - (-1) - 1 = 0$.
3. Reflect that crossing point below the axis to get the sum: $y_{P+Q} = 0 - 1 = -1$, so $P + Q = (0, -1)$.

## Real world

### Bitcoin and other cryptocurrencies
Bitcoin signs every transaction using elliptic-curve keys on a specific curve called secp256k1.

### Secure messaging apps
Signal and many other end-to-end encrypted messengers use elliptic-curve Diffie-Hellman to agree on a shared key for every conversation.

### HTTPS connections
Most modern secure websites negotiate their connection key using an elliptic-curve version of Diffie-Hellman, prized for being both fast and compact.

### Smart cards and passports
Chip-based ID cards and passports have limited computing power, so they favor elliptic-curve keys, which give strong security without much processing.
