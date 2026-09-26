---
title: Parallax and distances
summary: As Earth swings from one side of its orbit to the other, nearby stars seem to shift a tiny bit against the distant background — and that shift alone tells us how far away they are.
parameters:
  p: parallax angle
  baseline: baseline width
variables:
  - distance to the star, in parsecs
  - 'the baseline: how far apart the two viewpoints are, in astronomical units (AU)'
  - 'the parallax angle: half the star''s apparent yearly shift, in arcseconds'
---

## Try it

1. Set «parallax angle» to 0.768 arcseconds with «baseline width» = 1 AU — that's the real shift of the nearest star beyond the Sun. Read off its distance.
2. Shrink «parallax angle» toward 0.01. The star has to be much farther away to shift by such a tiny amount.
3. Now raise «baseline width» toward 30 AU, as if Earth's orbit were as wide as Neptune's. The same tiny shift now reaches a star thousands of parsecs away.

## Real-life examples

1. **Proxima Centauri.** With Earth's own 1 AU baseline, this nearest star to the Sun shows a parallax of 0.768 arcseconds, putting it at 1.30 parsecs — about 4.25 light-years away.
2. **61 Cygni.** In 1838, Friedrich Bessel measured this star's tiny 0.286-arcsecond shift and became the first person to measure a star's distance directly: 3.50 parsecs, about 11.4 light-years.
3. **A star too far for Earth's orbit.** A parallax of only 0.01 arcseconds is too small to trust from Earth's 1 AU baseline. But a probe orbiting as far out as Neptune, using a 30 AU baseline, could pin the same tiny angle to a star 3,000 parsecs — nearly 9,800 light-years — away.

## Test yourself

1. Reproduce Proxima Centauri's real distance of about 1.3 parsecs.
2. Measure a star more than 1,000 parsecs away.
3. Measure a nearby star using only Earth's own 1 AU orbit.

## Intuition

Hold a finger up at arm's length and close one eye, then the other — your finger seems to jump against the background. Close things jump more than far things. Now imagine that "jump" isn't your two eyes but Earth itself, seen from opposite sides of its orbit six months apart: nearby stars appear to shift slightly against the far more distant stars behind them, tracing out a tiny loop over a year.

Drag «parallax angle» down and the star has to sit much farther away to produce such a small shift — the picture's distance grows sharply. Drag «baseline width» up instead, and the same shift now corresponds to a much bigger distance too, because a wider "eye separation" can measure the same tiny angle from farther out.

## Formal

For a small angle, the tangent of that angle is almost exactly the angle itself (in radians), so a baseline $B$ viewed from a distance $d$ subtends a parallax angle $p \approx B/d$, giving $\tan p \approx p$.

Rearranging that relation the other way, $B = d\,p$, and solving for the distance gives $d = \frac{B}{p}$. With $B$ fixed at Earth's own 1 AU orbit, a parallax of exactly 1 arcsecond corresponds by definition to a distance of 1 parsec — the unit's own name comes from "parallax of one arcsecond."

## Advanced

Ground-based parallax measurements are limited to roughly 0.01 arcsecond precision by the blurring effect of Earth's atmosphere, capping reliable distances at a few hundred parsecs. Space telescopes avoid that blur entirely: the Gaia mission measures parallaxes to a few tens of millionths of an arcsecond, reaching stars tens of thousands of parsecs away and mapping well over a billion stars in three dimensions.

## Derivation

1. A parallax angle is small enough that its tangent is essentially equal to the angle itself, once that angle is measured in radians.
2. That approximation says the baseline equals the distance times the parallax angle.
3. Solving for the distance instead gives the whole method in one line: distance equals baseline divided by parallax angle.

## Real world

### The parsec itself
Astronomers invented the parsec specifically so this formula stays simple: 1 parsec is defined as the distance at which a 1 AU baseline produces exactly 1 arcsecond of parallax.

### The Gaia space telescope
Gaia has measured parallax distances for over a billion stars, building the most precise 3D map of the Milky Way ever made.

### The first rung of the distance ladder
Parallax only reaches nearby stars directly, but astronomers use it to calibrate other distance methods — like the brightness of certain pulsating stars — that then reach much farther across the universe.

### Ancient attempts that failed
Ancient Greek astronomers looked for stellar parallax and found none, correctly reasoning it must be too small to see with the naked eye — evidence, they realized, that the stars were staggeringly far away.
