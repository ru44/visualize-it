---
title: Why cells stay small
summary: >-
  A cell's surface has to feed everything inside it, but surface grows slower
  than volume as a cell gets bigger — which is why almost every cell you'll
  ever see is smaller than the head of a pin.
parameters:
  r: cell radius r
  activity: metabolic activity (× normal)
variables:
  - surface area — the membrane's area, in μm²
  - volume — how much cytoplasm needs feeding, in μm³
  - the cell's radius, in μm
  - metabolic activity relative to a typical resting cell (1 = normal)
  - how deep oxygen reaches in by diffusion before it is all used up, in μm
  - that reach for a typical resting cell, about 200 μm
---

## Try it

1. Start small — radius about 10 μm, close to a real human cell — at normal activity. Every part of the cell is well within reach.
2. Drag the radius up toward 1000 μm. Watch a red "starved core" appear once the safe reach can no longer get all the way to the centre.
3. Drop activity down near 0.1 and grow the cell again. The safe reach stretches out, and a much bigger cell now survives.

## Real-life examples

1. **A bacterium, 1 μm across.** Even at a high metabolism, SA:V comes out to 3 μm⁻¹ — huge — plenty of membrane for every bit of cytoplasm, which is one reason bacteria can grow and divide so fast.
2. **A typical human cell, about 15 μm across.** Comfortably inside the safe reach with room to spare — this is roughly the size real animal cells settle at.
3. **The core of a fast-growing tumour, 800 μm across.** Far bigger than the safe reach; most of its volume is starved of oxygen — exactly why tumours past a couple of millimetres must grow their own blood vessels to survive.

## Test yourself

1. Shrink the cell down to bacterium scale, where SA:V reaches about 3 μm⁻¹.
2. Grow the cell, and its activity, until more than half of its volume is starved.
3. Build a huge but safe cell: over 500 μm across, yet so dormant (activity under 0.2) that it still gets enough oxygen everywhere.

## Intuition

Surface area grows with the square of the radius, but volume grows with the cube — double the radius and the surface only quadruples while the volume grows eightfold. A tiny cell has tons of membrane for the cytoplasm just behind it; a huge one has comparatively little, because most of that cytoplasm is now far from any membrane at all.

That is exactly the problem oxygen runs into. It can only diffuse in so far — about 200 μm into a resting cell — before the cytoplasm it passes through has already used it up. A small cell is entirely within that reach, so oxygen gets everywhere. Grow the cell past that reach and a starved core appears in the middle, growing fast because it is a *volume*, not just a ring: a core that looks like a thin shell has been peeled away can still be most of the cell's mass. A busier, more active cell burns oxygen faster and the safe reach shrinks further, which is why fast-growing tissue struggles with size sooner than a dormant one does.

## Formal

The membrane area of a sphere is $\mathrm{SA} = 4\pi r^2$ and its volume is $V = \tfrac{4}{3}\pi r^3$, so $\mathrm{SA}/V = 3/r$: the ratio of feeding surface to fed volume falls in inverse proportion to the radius, with no way around it for any roughly round shape.

The safe diffusion depth scales as $d = d_0/\sqrt{a}$, where $d_0 \approx 200\ \mu\mathrm{m}$ is that reach at normal activity $a=1$ and higher activity shrinks it. Once the radius $r$ exceeds $d$, a core of radius $r-d$ is left starved, and because it is a volume, that starved fraction is $\left(\frac{r-d}{r}\right)^3$ — it grows fast once the cell is even a little too big.

## Advanced

Real tissue works around this limit two ways: by staying small and dividing rather than swelling, and by trading a sphere for a shape with more surface per volume — long, thin muscle fibres, flattened and folded leaf cells, or the branching finger-like villi lining your intestine. All of them are the same trick as shrinking $r$: more membrane per unit of cytoplasm, without shrinking the whole organism.

## Derivation

1. A sphere of radius $r$ has surface area $\mathrm{SA}=4\pi r^2$ and volume $V=\tfrac{4}{3}\pi r^3$.
2. Dividing one by the other, the $4\pi$ and one power of $r^2$ cancel, leaving $\mathrm{SA}/V = 3/r$.
3. Oxygen reaches a depth $d=d_0/\sqrt{a}$ from the surface; anything deeper than that, a core of radius $r-d$, is starved, and since it is a solid ball its share of the volume is $\left(\frac{r-d}{r}\right)^3$.

## Real world

### Intestinal villi
The lining of your small intestine is covered in finger-like villi, and each of those in turn is covered in even smaller microvilli — folding the surface over and over to pack far more absorbing membrane into the same length of gut.

### Tumour angiogenesis
A solid tumour can only grow passively to about a millimetre or two before its core runs short of oxygen; past that it has to trigger the growth of new blood vessels (angiogenesis) or the centre dies.

### Why organisms are made of many small cells
An elephant is not one elephant-sized cell — it is trillions of ordinary-sized ones. Every time a growing cell would cross its safe size, it divides instead, restoring a small radius and a healthy surface-to-volume ratio.

### Fish and frog eggs
A frog egg can be over a millimetre across, far past what an active cell could survive at, only because before fertilisation it is almost dormant — a low activity that stretches its safe reach out to match.
