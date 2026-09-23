---
title: Surface area and volume
summary: >-
  Double an object's size and its skin only grows fourfold while its insides
  grow eightfold — which is why a mouse chills fast and an elephant barely
  notices the cold.
parameters:
  s: s — size
variables:
  - the total surface area of the cube
  - the volume enclosed by the cube
  - the length of one edge
---

## Try it

1. Drag «s — size» from small to large and watch the cube grow. Read «surface area» and «volume» below it as you go.
2. Watch the ratio «area ÷ volume»: it keeps shrinking as the cube grows, even though both numbers above it are getting bigger.
3. Compare the sphere and cylinder readouts at the same «s»: their area-to-volume ratios shrink the same way, because this is a fact about size, not about the particular shape.

## Real-life examples

1. **Mouse.** At s = 0.3 m the surface area is tiny but still large next to the volume it has to warm — small animals lose heat fast and must eat constantly to replace it.
2. **A person-sized crate.** At s = 1 m, area and volume are numerically equal — the crossover size where the two effects balance.
3. **Elephant.** At s = 3 m, the volume has grown far more than the surface, so an elephant sheds heat slowly and can overheat in the sun without huge ears to add extra surface.

## Test yourself

1. Set the size to exactly 1 m, the crossover point where area equals volume.
2. Make the surface area exactly 24 square metres.
3. Make the volume exactly 27 cubic metres.

## Intuition

Drag «s — size» and watch the cube swell. Its six faces are the parts that touch the outside air, water or sun — that total is the surface area. Everything inside the cube's skin, every bit of material or body tissue it contains, is the volume.

Both grow as you drag the slider up, but not at the same rate: the faces are flat sheets, so their area grows with the square of the size, while the solid fills a block, so its volume grows with the cube of the size. Push «s» from 1 up to 2 and check the readouts: the area only becomes 4 times bigger, but the volume becomes 8 times bigger — the same doubling, very different growth.

## Formal

For a cube of edge $s$, the surface area is $A = 6s^2$ (six faces, each $s^2$) and the volume is $V = s^3$, so their ratio is $\dfrac{A}{V} = \dfrac{6}{s}$.

The same pattern holds for any fixed shape scaled up uniformly: area always scales with the square of the size while volume scales with the cube, so the surface-to-volume ratio always falls as $1/s$ — this is the square-cube law.

## Advanced

For a sphere of radius $s$, $A = 4\pi s^2$ and $V = \tfrac{4}{3}\pi s^3$, giving ratio $3/s$; for a cylinder of radius $s$ and height $2s$, $A = 6\pi s^2$ and $V = 2\pi s^3$, giving ratio $3/s$ too — the constant in front of $1/s$ depends on the shape, but the $1/s$ decay does not. This is one reason cells stay microscopic: past a certain size a cell's surface can no longer supply its volume fast enough by diffusion alone.

## Derivation

1. A cube of side $s$ has 6 identical square faces. Each one has area $s^2$, so the total surface area is $A = 6s^2$.
2. Stack up the cube's volume as $s$ layers, each layer an $s \times s$ sheet one unit thick: that gives $V = s \cdot s \cdot s = s^3$.
3. Dividing the two formulas gives $\dfrac{A}{V} = \dfrac{6s^2}{s^3} = \dfrac{6}{s}$ — a ratio that gets smaller and smaller as $s$ grows, even though $A$ and $V$ are both increasing.

## Real world

### Animal heat loss
Small animals have a large surface area for their volume and lose body heat quickly, so mice and shrews eat almost constantly; large animals like elephants and whales have the opposite problem and need ways to shed excess heat.

### Cells and diffusion
A living cell absorbs food and oxygen only through its surface, so once it grows past a certain size its volume outgrows what that surface can supply — which is why cells divide instead of simply growing bigger.

### Packaging and heat loss in buildings
A single large building loses proportionally less heat through its walls than the same volume split into many small houses, which is one reason apartment blocks are cheaper to heat per person.

### Ice cubes and melting
Crushed ice melts far faster than a single large ice cube of the same total volume, because breaking it up multiplies the surface area exposed to the warm drink.
