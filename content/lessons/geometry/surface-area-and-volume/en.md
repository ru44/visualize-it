---
title: Surface area and volume
summary: 'Compare the square growth of surface area with the cube growth of volume as an object is enlarged.'
parameters:
  s: 's — cube edge length in metres'
variables:
  - 'A: cube surface area in square metres'
  - 'V: cube volume in cubic metres'
  - 's: cube edge length'
---

## Try it

1. Set s = 1. The cube has surface area 6 m² and volume 1 m³. These quantities are not equal and have different units.
2. Set s = 2. Area becomes 24 m², four times as much; volume becomes 8 m³, eight times as much.
3. Compare area divided by volume: it falls from 6 to 3 per metre. The sphere and cylinder ratios also halve when s doubles, although their sizes are defined differently.

## Real-life examples

1. **A small cube.** At s = 0.3 m, the cube has area 0.54 m², volume 0.027 m³ and area-to-volume ratio 20 per metre.
2. **A one-metre cube.** At s = 1 m, six one-square-metre faces enclose one cubic metre. The area-to-volume ratio is 6 per metre.
3. **A three-metre cube.** At s = 3 m, the area is 54 m² and volume 27 m³. The ratio is 2 per metre, one third of the one-metre cube's ratio.

## Test yourself

1. Set the cube's edge length to 1 m.
2. Make the surface area 24 m².
3. Make the volume 27 m³.

## Intuition

Surface area measures the six faces covering the cube; volume measures the space it encloses. A cube with one-metre edges has six square metres of surface but only one cubic metre of volume. The units already tell us that these measure different things.

Doubling an edge doubles both dimensions of every face, making each face four times as large. Inside, two copies fit along each of three directions, so eight original cubes fit in the enlarged cube. Volume therefore increases faster than surface area under uniform enlargement. The dashed reference cube keeps edge length 1 m while the solid cube changes.

## Formal

For a cube of positive edge length $s$, surface area is $A=6s^2$ and volume is $V=s^3$. Their ratio is $A/V=6/s$. If s is in metres, this ratio has unit inverse metres, not a unit-free value.

Uniform scaling by a positive factor k multiplies every area by $k^2$ and every volume by $k^3$. It therefore multiplies the surface-area-to-volume ratio by $1/k$. This is the square–cube law; it requires the shape's proportions to remain fixed.

## Advanced

The sphere readout uses radius s, giving ratio 3/s. The cylinder uses radius s and height 2s, including both end caps, and also gives 3/s. These shapes do not have equal volumes at the same s. Their ratios share the inverse-size pattern, but comparing shape efficiency at equal volume is a different question.

## Derivation

1. Each cube face is a square of side s and area s². Six faces give total area 6s².
2. Volume is base area times height: s² multiplied by s gives s³. This formula also applies to noninteger lengths.
3. Divide 6s² by s³ to obtain 6/s. Increasing s increases both area and volume, while reducing their ratio.

## Real world

### Wrapping and filling

Doubling every dimension of a cubical box requires four times the surface material at the same thickness, but creates eight times the internal capacity in an ideal thin-wall model.

### Dividing a block

Cut a cube into eight equal smaller cubes. Their combined volume is unchanged, but their total exposed surface area is twice the original if all new faces are separated and exposed.
