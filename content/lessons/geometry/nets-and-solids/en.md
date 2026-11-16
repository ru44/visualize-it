---
title: Nets and solids
summary: 'Fold a cube’s net to see how six flat squares become its faces while preserving their total area.'
parameters:
  fold: 'fold — hinge progress: flat (0) to closed cube (1)'
variables:
  - 'A: total area of the six faces'
  - 'L: side length of each square face'
---

## Try it

1. Set fold = 0. Count six squares in the flat net: one central face, four attached sides and a sixth face attached to one side.
2. Set fold = 0.5. Each hinge has rotated 45° from its flat position. The lid also moves with the side carrying it, so not every face makes 45° with the ground.
3. Set fold = 1. The faces close into a cube. Return to 0 and check that the same six squares form the net again.

## Real-life examples

1. **A flat cube template.** At fold = 0, a paper model lies flat. The six squares will become six faces; real packaging may need extra tabs that this model omits.
2. **Partway through folding.** At fold = 0.5, each hinge has turned halfway through its 90° motion. No square has changed its actual side length or area.
3. **A closed cube.** At fold = 1, the faces meet along matching edges and enclose a cube. The material area is the same as when the net was flat.

## Test yourself

1. Set fold = 0 to flatten the net.
2. Set fold = 0.5 to rotate each hinge 45° from flat.
3. Set fold = 1 to close the cube.

## Intuition

A net is a flat arrangement of faces that can fold into a solid. In this cube net, four squares attach to the central square and another square attaches beyond one of those sides. The fold lines act as hinges. Moving them changes how the faces sit in space, without stretching the faces.

The picture projects the folding shape onto your screen, so a tilted square may look narrower or overlap another face in the picture. That does not mean its area has changed or that the physical faces occupy the same space. To find the cube's surface area, add the actual areas of all six faces, including those hidden from view.

## Formal

For a cube with edge length $L$, each face has area $L^2$. Its six faces have total surface area $A=6L^2$. Folding preserves each face's area, so the net and the closed cube have the same material area in this ideal model.

A valid cube net folds into six distinct faces meeting along the cube's edges, without gaps or faces lying on top of one another. Not every connected arrangement of six equal squares is a cube net. Surface area measures the faces, while the cube's enclosed volume is $V=L^3$.

## Advanced

Each rigid face undergoes rotations and translations, which preserve distances and area. The lid has two successive hinge motions, one inherited from its supporting side and one at its own hinge. A general solid's net may require fold angles other than 90°; that angle belongs to the cube construction shown here.

## Derivation

1. Each of the six squares has side length L and area L².
2. Folding rotates the faces without stretching them, so each still contributes the same area.
3. Add the six face areas to obtain 6L². Shared edges have no area, so they require no area subtraction.

## Real world

### Making a paper cube

Cut a valid six-square net and fold along the shared edges. Glue tabs add material beyond the mathematical surface area; include them separately when planning the sheet.

### Other solids

A rectangular box has six rectangles, which need not be squares. A pyramid has a polygonal base and triangular side faces. In each case, adding the face areas gives the total surface area.
