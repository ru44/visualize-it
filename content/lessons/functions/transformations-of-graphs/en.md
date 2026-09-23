---
title: Transformations of graphs
summary: >-
  Shift, stretch and flip any curve with four simple moves — the same four
  tricks behind volume knobs, mirrored images, and shifted time zones.
parameters:
  x: point x
  k: k — vertical stretch/flip
  h: h — horizontal shift
  s: s — horizontal stretch/flip
  d: d — vertical shift
variables:
  - the input you drag along the curve
  - how much the curve is stretched vertically — taller peaks and deeper troughs; negative flips it upside down
  - how far the curve is shifted sideways — positive moves it to the right
  - how much the curve is squeezed sideways — larger values repeat the wave faster; negative flips it left-right
  - how far the whole curve is shifted up or down
---

## Try it

1. Drag «d» up. The whole curve lifts: every point moves up by the same amount, and nothing else changes.
2. Now drag «h». The curve slides sideways without changing shape — what happened at one point in x now happens later.
3. Push «k» negative. The curve flips upside down: every peak becomes a trough and every trough becomes a peak.

## Real-life examples

1. **A city's daily temperature.** The plain wave (k=1, h=0, s=1, d=0) swings evenly above and below its average, with no lift and no delay.
2. **A hotter city, same rhythm.** Doubling the swing and lifting the average (k=2, d=3) makes every temperature both more extreme and warmer overall, while the timing of hot and cold stays exactly the same.
3. **The opposite hemisphere, a slower cycle.** Flipping the wave (k=-1) swaps winter and summer, shifting it (h=2) delays the whole cycle, and stretching it sideways (s=0.5) makes each season last twice as long.

## Test yourself

1. Shift the curve up until its lowest point just touches the horizontal axis.
2. Flip the curve upside down and stretch it so its peak reaches twice as high as the original.
3. Squeeze the curve sideways until it completes a full wave twice as fast as the original.

## Intuition

A city's temperature rises and falls every day in a repeating wave. Start with the plain wave on screen: it swings the same amount above and below zero, over and over. Drag «d» and you lift the whole wave up — every single point rises by the same amount, because you added a fixed number to every output. That is what adding a constant outside the rule always does: move the whole picture up or down, without changing its shape at all.

Now drag «h» instead. The wave slides left or right without stretching or flipping, because you are changing what goes in before the rule runs, so the whole output timeline shifts to match. Push «k» negative and the curve flips top to bottom: every high point becomes a low point. Push «s» past 1 and the wave squeezes sideways, repeating faster, because you are stretching the input itself before the rule ever sees it.

## Formal

For a base function $f$ and constants $k, h, s, d$, the family $g(x) = k \cdot f\big(s(x-h)\big) + d$ covers every shift, stretch and flip of $f$: $d$ shifts vertically, $h$ shifts horizontally, $k$ scales the output and flips it if negative, and $s$ scales the input and flips it left-right if negative.

Adding a constant outside $f$ moves every output; adding one inside, to $x$, moves every input instead, which is why $f(x)+d$ and $f(x+h)$ shift the graph along seemingly opposite directions on the horizontal axis.

## Advanced

These four transformations generate the full group of affine changes of variable on the graph of $f$; composing several of them in different orders can give different results whenever a horizontal and a vertical operation are mixed, since scaling the input by $s$ before shifting is not the same map as shifting first and then scaling.

## Derivation

1. Change what goes in first: replace $x$ with $s(x-h)$ inside $f$, which shifts by $h$ and rescales by $s$.
2. Multiply the whole result by $k$, which stretches the output and flips it if $k$ is negative.
3. Add $d$ to what is left, which shifts the whole curve up or down.

## Real world

### Audio and sound engineering
Pitch and volume controls stretch a sound wave horizontally (pitch) and vertically (volume) without changing its underlying shape.

### Seasonal and tidal cycles
Temperature, daylight hours and tides all repeat with a shape that can be shifted by time zone, stretched by latitude, and flipped between hemispheres.

### Image and video editing
Brightness, contrast and mirroring tools apply exactly these same four transformations to the numbers making up a picture.
