---
title: Why do physicists talk about 11 dimensions?
summary: 'Use a thin cylinder to understand a compact direction, while separating that analogy from the unconfirmed physical proposal of extra dimensions.'
parameters:
  r: 'r — cylinder radius in millimetres'
  D: 'D — viewing distance in metres'
  a: 'a — marker position around the circular cross-section, in degrees'
variables:
  - 'θ: approximate angular width in radians; readout uses milliradians'
  - 'r: cylinder radius, converted to metres in the formula'
  - 'D: viewing distance in metres'
charts: []
---

## Try it

1. Set r = 10 mm and D = 5 m. The model gives angular width 0.004 radians, or 4 milliradians. Increase D to 100 m; it falls to 0.2 milliradians, below the chosen threshold of 0.3.
2. Keep those settings and change a, or drag the marker around the cross-section. The circular direction remains present even when the distant view represents the hose as a line.
3. Set r = 1 mm. The threshold distance becomes about 6.7 m. This is a result of the model's fixed resolution rule, not a universal limit for every observer or camera.

## Real-life examples

1. **A nearby hose.** At r = 10 mm and D = 5 m, the diameter is 0.02 m. Its angular width is about 0.02/5 = 0.004 radians, above the model's threshold.
2. **The same hose farther away.** At D = 100 m, its angular width is about 0.0002 radians. The model no longer resolves the width, although the surface still has two local directions.
3. **A thinner cylinder.** At r = 1 mm and D = 4 m, the angular width is about 0.0005 radians, still above the threshold. It falls below the threshold beyond about 6.7 m.

## Test yourself

1. Choose r and D so that the model's angular width is below 0.0003 radians.
2. Keep D at least 100 m and make the angular width at least 0.0003 radians.
3. Set r = 10 mm and D close to 66.7 m to locate the model's transition.

## Intuition

A cylinder's surface allows motion along its length and around its circumference. Those are two local directions on the surface. From far away, the circumference can be too small to resolve, so a drawing may represent the cylinder by a line. The surface has not lost a dimension; the observation has lost detail.

The circular direction is called compact because travelling around it returns to the starting position after a finite distance. This offers an analogy for proposals with compact extra spatial dimensions. It does not show that space actually has them. The hose itself remains an ordinary object in three-dimensional space.

The number eleven comes from theoretical physics, not from the hose calculation. M-theory is a proposed framework connecting superstring theories, with eleven-dimensional supergravity as its low-energy description. The usual count is ten spatial dimensions and one time dimension. The display's 3 + 1 + 7 represents three familiar spatial directions, time, and seven additional spatial directions in a compactification picture. These are model assumptions, not measured counts of hidden directions. See [Witten's theoretical argument](https://arxiv.org/abs/hep-th/9503124).

## Formal

For a side-on cylinder of radius r at distance D, with r much smaller than D and both lengths in the same unit, its angular width is approximately $\theta\approx2r/D$ radians. The slider gives r in millimetres, so the calculation first converts it to metres by dividing by 1000.

The display uses a fixed threshold $\theta_0=0.0003$ radians and marks the width unresolved when $\theta<\theta_0$. The transition occurs at $D\approx2r/\theta_0$. For r = 0.01 m, this gives about 66.7 m. Real visibility also depends on contrast, lighting and the observing system.

## Advanced

A compact dimension need not be a literal cylinder embedded in a larger visible room. The analogy only illustrates how a small length scale can be unresolved. It neither derives eleven dimensions nor fixes the size or shape of proposed extra dimensions. Mathematical consistency and experimental confirmation are separate requirements.

## Derivation

1. The cylinder's physical width is its diameter, 2r. Convert radius and distance to the same unit.
2. For a small angular width, divide that width by distance to obtain approximately 2r/D radians.
3. Compare the result with the chosen threshold. Solving the equality gives the transition distance; below-threshold width is classified as unresolved in this model.

## Real world

### Simplifying a distant view

A thin cable may be drawn as a line when its width is not resolved. This changes the level of detail in the representation, not the cable's actual geometry.

### Testing physical proposals

Experiments test specific predicted signals. A CMS search reported in April 2025 found no significant excess in single-photon events with missing transverse momentum and used that result to constrain particular extra-dimension models. This neither confirms M-theory nor excludes every extra-dimension proposal. See [the CMS result](https://cms.cern/news/beyond-light-probing-dark-matter-and-extra-dimensions-cms).
