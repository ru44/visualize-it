---
title: Marching squares
summary: A single dividing line through a map or a body scan is drawn by checking each tiny square of the grid on its own, never the whole picture at once.
parameters:
  level: contour level
  res: grid resolution
variables:
  - the value at the low end of a grid edge
  - the value at the high end of that edge
  - the level the contour follows
  - how far along the edge the contour crosses, from 0 to 1
charts: []
---

## Try it

1. Drag "contour level" slowly upward. The orange line redraws itself, always separating the filled dots from the empty ones.
2. Drop "grid resolution" down to its smallest setting. The same line turns blocky — every corner sits exactly on a grid point.
3. Raise "grid resolution" back up. The line smooths out, because each little square now interpolates its own crossing point instead of jumping straight from corner to corner.

## Real-life examples

1. **A flood-risk map at low elevation.** With the contour level set low, on a fine grid, almost every dot counts as "above" — the orange line only fences off the handful of low points that would flood first.
2. **A mountain's 600 m contour line on an old paper map.** A high level on a coarse grid shows the contour's shape correctly but blocky, because each square only knows its four corners, not the terrain between them.
3. **A tumour boundary traced from an MRI slice.** A mid-range level on a fine grid produces a smooth outline, because a denser grid gives the interpolation many more small edges to work with.

## Test yourself

1. Pull "contour level" below 0.15, so nearly every point on the grid counts as above it.
2. Push "contour level" above 0.8, so only the very brightest points stay inside the line.
3. Raise "grid resolution" to 25 or higher and watch the same field's contour turn smooth.

## Intuition

Picture the grid as a sheet of graph paper with a number written at every intersection — brightness of a photo, or elevation on a hill, or how dense the tissue is in a body scan. Colour a dot orange wherever its number clears the level you've chosen and leave it grey otherwise; that's exactly what you see under "contour level". Somewhere between every orange dot and its grey neighbour, the number must have crossed the level, so the boundary passes there.

The algorithm never looks at the whole grid at once. It visits one small square of four corners at a time, and there are only sixteen ways those four corners can be coloured — some orange, some grey. For each of the sixteen patterns there is one fixed way to draw the piece of line through that square, which is why raising "grid resolution" doesn't change the rule, only how many tiny squares apply it.

## Formal

Along one edge of a square, the value climbs from $a$ at one corner to $b$ at the other. The contour, at level $c$, crosses that edge at the point a fraction $t = \dfrac{c - a}{b - a}$ of the way from $a$ to $b$ — ordinary linear interpolation, assuming the true value between the corners never doubles back.

Every square is classified purely by which of its four corners are at or above $c$, giving $2^4 = 16$ cases; two of those (both diagonals split) are ambiguous and need an extra rule to decide which way the line turns.

## Advanced

The three-dimensional version, marching cubes, classifies $2^8 = 256$ corner patterns of a cube instead of $16$ of a square, and is how CT and MRI scanners turn a stack of 2-D slices into one 3-D surface for a printer or a game engine to render. Both algorithms are consistent only up to the ambiguous cases; production implementations resolve them with the same asymptotic-decider idea used here, comparing against the square's or cube's centre value.

## Derivation

1. Walking along one edge of a grid square, the value climbs steadily from $a$ at one end to $b$ at the other.
2. The contour, drawn at level $c$, must cross that edge exactly where the climbing value equals $c$.
3. Linear interpolation places that crossing at $t = \dfrac{c - a}{b - a}$ of the way from $a$ to $b$, and joining the crossings of a square's edges in the right order draws that square's piece of the line.

## Real world

### Weather maps
Isobars and isotherms — the curved lines joining equal pressure or equal temperature — are contours drawn this way over a grid of forecast values.

### Video game terrain
Procedurally generated caves and islands often start life as a 3-D noise field turned into a walkable surface by marching cubes.

### Medical imaging
A CT or MRI scanner outputs a 3-D grid of tissue density; marching cubes turns one density threshold into the printable surface of a bone or an organ.

### Image segmentation
Outlining a bright object against a dark background in a photo is the same problem in two dimensions: a threshold on brightness instead of on elevation.
