---
title: 'Secret sharing: a secret split five ways'
summary: >-
  Give five people one point each on a hidden curve — any three of them can
  redraw it and read the secret where it crosses the axis, while any two learn
  absolutely nothing, not even a hint.
parameters:
  secret: secret — the number being protected, hidden at x = 0
  k: threshold — how many shares it takes to rebuild the curve
  shown: revealed — how many of the five shares are on the table
variables:
  - the secret, the hidden curve's value at zero
  - the threshold, the number of shares that pins the curve
  - the random coefficients that disguise the curve's shape
---

## Try it

1. With the threshold at 3, reveal 2 shares and look at the ghost curves: nine different curves pass through both revealed points, one for every possible secret — the two shares have said nothing.
2. Reveal a third share and watch every ghost but one vanish: the curve snaps into place and the secret is read off the axis.
3. Raise the threshold to 4 with the same shares revealed and the ghosts return — a higher threshold means more holders must cooperate.

## Real-life examples

- **Two of three, still blind.** With threshold 3 and 2 shares out, every candidate secret fits perfectly — the mathematical meaning of "learning nothing".
- **The third share lands.** Same setup, 3 shares out: the curve is pinned and the vault opens.
- **A four-person rule.** Threshold 4 with all 5 shares revealed — any single lost share would not have mattered, but any three conspirators alone would have stayed locked out.

## Test yourself

1. Set the threshold to 3 and reveal exactly 2 shares — one short — and check the secret still shows a question mark.
2. Reveal enough shares to lock the curve and expose the secret.
3. Set the threshold to 4 and reveal only 2 shares: half the quorum, nothing learned.

## Intuition

Hide the secret as a place, not a number: draw a curve that crosses the vertical axis exactly at the secret, then hand each of five people one point of the curve. Two points are enough to draw a line, three to pin a parabola — so with a parabola, any three holders can redraw the whole curve and read off the crossing, while any two hold a question with nine equally possible answers. The ghost curves on screen are those answers, every one of them passing innocently through the revealed points.

What makes this different from everything else in this hall: there is no code to crack. A thief with two shares and a computer the size of a galaxy still cannot prefer one ghost over another, because all nine fit the evidence perfectly — the security is information-theoretic, like the one-time pad's, and no future computer, quantum or otherwise, changes it. The only way in is the social one: gather enough shares.

## Formal

To split a secret $s$ with threshold $k$, pick $k-1$ random coefficients and form $f(x) = s + a_1 x + \dots + a_{k-1}\,x^{k-1}$, a polynomial of degree $k-1$ whose constant term is the secret, $f(0) = s$. Share number $j$ is the point $(j, f(j))$; real systems compute everything modulo a prime so that "random" has an exact meaning.

Any $k$ points determine a degree-$k-1$ polynomial uniquely — Lagrange interpolation rebuilds it, and $f(0)$ falls out. Any $k-1$ points do not: for every candidate secret there is exactly one polynomial through the known shares and that candidate, so the shares reveal literally nothing about $s$.

## Advanced

Shamir published this scheme in 1979, and it carries a property nothing computational can offer: perfect secrecy below the threshold. Modern systems lean on it heavily — cryptocurrency custody splits wallet keys across executives and vaults, certificate authorities split their root signing keys, and threshold signing protocols extend the idea so the parties can sign together without the key ever being assembled in one place. One caution the curve also shows: plain Shamir sharing trusts the share holders' honesty, since a corrupted point redraws the curve to a wrong secret — verifiable schemes add checks on top.

## Derivation

1. The secret hides in the curve's constant term, and random coefficients make every other feature of the curve meaningless.
2. Each holder gets one sample of the curve, useless alone and powerful together.
3. Interpolation is the unlock: with the threshold met the curve is unique, and one point short it is anybody's curve.

## Real world

### Crypto wallet custody
Exchanges split the master key of cold-storage wallets with threshold schemes, so no single employee — and no single burglary — can move the funds.

### Root key ceremonies
The keys that sign the internet's DNS root are split among trusted community members across continents; a quorum must physically assemble to use them.

### Missile-launch style two-person rules
Any "two keys, two people" control is a threshold scheme in hardware; Shamir turned the idea into mathematics with any n and any k.

### Threshold signatures
Modern protocols let k of n servers jointly produce one signature without reconstructing the private key anywhere — secret sharing grown into a signing machine.
