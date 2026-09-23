---
title: Nets and solids
summary: >-
  Cut a cardboard box open along its edges and flatten it, and you get a net —
  six flat squares hinged together that fold back into exactly the same box,
  with none of their area gained or lost along the way.
parameters:
  fold: fold — flat net (0) to closed cube (1)
variables:
  - the total surface area of the six squares
  - the length of one square's side
---

## Try it

1. Drag «fold» from 0 up. Watch the cross-shaped net lift off the page: each square hinges up from its neighbour while staying exactly the same size.
2. Stop around fold = 0.5. The flaps stand at a slant, half-way between flat and upright — you can see three faces of the cube already taking shape.
3. Push «fold» to 1. The six squares click into a closed cube. Drag back down to 0 and watch it unfold into the same flat net again, edge by edge.

## Real-life examples

1. **A flat cardboard blank.** Straight off the die-cutter a cereal box is one flat sheet, fold = 0: six panels joined by score lines, printed while still flat because that's far cheaper than printing a folded box.
2. **Mid-fold on a packing line.** A packing machine's arm is caught fold = 0.5 through closing a box: some flaps already stand up, others still lie flat, and every panel is still the same size it was on the sheet.
3. **A sealed, ready box.** At fold = 1 the six panels have become the six faces of a closed cube, ready to tape shut and ship.

## Test yourself

1. Flatten the shape completely into its net.
2. Fold it exactly half-way, so every flap stands at 45°.
3. Fold it all the way into a closed cube.

## Intuition

Picture a cube's six faces peeled apart and laid flat, still joined at some of their edges — that's the net you see at fold = 0, one square in the middle with four more attached to its sides and a sixth attached to one of those. Drag «fold» up and each flap swings upward on its hinge, like a page turning, without stretching or shrinking.

By fold = 1 every flap has turned a quarter turn and the squares meet edge to edge, sealing into a closed cube. Nothing about any one square changed along the way — same four sides, same area — only their arrangement in space changed, from flat and spread out to standing and boxed in.

## Formal

A cube of edge $L$ has six square faces, each of area $L^2$, so its total surface area is $A = 6L^2$ whether the squares are laid out flat as a net or folded shut into a cube.

A net is valid exactly when folding every hinge by 90° brings matching edges together with no gap and no overlap; the same cube has several different valid nets, not just one.

## Advanced

Folding is an isometry applied piecewise to each face, so it preserves every face's area and every edge's length — only the angles between faces change, from 180° (flat) to 90° (folded). This is why a solid's total surface area can always be read straight off its net, without any correction for the folding.

## Derivation

1. A cube's net is six equal squares, hinged edge to edge, each with area $L^2$.
2. Folding each flap up by 90° along its hinge bends the sheet but does not stretch, shrink or overlap any square, so no area is gained or lost in the process.
3. Once every flap is folded, the six squares close into a cube whose total surface area is still the sum of the six original squares, $A = 6L^2$.

## Real world

### Packaging
Box factories print and cut flat nets by the thousand because a flat sheet is cheap to store and ship, then fold it into shape only at the last moment before filling it.

### Cylinders and cones
A cylinder's net is two circles plus a rectangle whose width equals the circle's circumference, and a cone's net is a circle plus a curved wedge — both fold with no stretching for exactly the same reason a cube's net does.

### Architecture and sheet metal
Curved roofs, air ducts and metal cladding are often cut as flat panels from a computed net and only bent into their final curved shape on site, saving expensive curved material.

### Pyramids and origami
A pyramid's net is one polygon base with a triangular flap on each edge; paper folding, from a simple gift box to complex origami, is the same idea repeated at a much finer scale.
