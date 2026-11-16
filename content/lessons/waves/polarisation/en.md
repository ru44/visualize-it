---
title: Polarisation
summary: 'Follow how two ideal polarising filters select electric-field directions, and keep track of which intensity each percentage refers to.'
parameters:
  theta: 'θ — angle between transmission axes'
variables:
  - 'unpolarised input intensity before both filters'
  - 'intensity after the first ideal filter'
  - 'intensity after the second ideal filter'
  - 'angle between the two transmission axes'
---

## Try it

1. Set θ = 0°. The first ideal filter passes 50% of the original unpolarised intensity. The aligned second filter passes all of that remainder, so the final reading is still 50% of the original.
2. Set θ = 45°. The second filter passes half of what reaches it. The final reading is therefore 25% of the original, not 50%.
3. Set θ = 90°, then 180°. Crossed axes give zero transmission in the ideal model; a half-turn aligns the axes again and restores 50% of the original intensity.

## Real-life examples

1. **Aligned filters.** At 0°, I₁/I₀ = 1/2 and I₂/I₀ = 1/2. The second ideal filter causes no further loss.
2. **Crossed filters.** At 90°, I₂ = 0. Real filters may transmit a small residual amount, which this ideal calculation omits.
3. **A 45° angle.** At 45°, I₂/I₁ = 1/2 but I₂/I₀ = 1/4. Always name the input you are comparing with.

## Test yourself

1. Cross the filters by setting their axes 90° apart.
2. Transmit half of the intensity arriving at the second filter.
3. Bring the axes within less than 20° of alignment, near either 0° or 180°.

## Intuition

For a light wave travelling forward, the electric field lies in the plane perpendicular to travel. Linear polarisation means that the field oscillates along one fixed axis in that plane. Unpolarised light has no preferred transverse orientation when averaged over time. The many directions drawn before the filter illustrate this mixture, rather than a literal set of synchronized fields.

An ideal polariser transmits the field component along its transmission axis. A second filter selects the component along another axis. When the axes are perpendicular, that component is zero. When they agree, all the already-polarised light passes the second ideal filter. The drawn bars mark transmission axes; they are not a mechanical description of how a real polarising material works.

## Formal

For unpolarised input intensity $I_0$, an ideal first polariser gives $I_1=I_0/2$. The light reaching the second filter is linearly polarised. If its transmission axis is at angle θ to that polarisation, Malus's law gives $I_2=I_1\cos^2\theta$.

Therefore $I_2/I_0=\tfrac12\cos^2\theta$, while $I_2/I_1=\cos^2\theta$. The screen readouts use the original input as reference. At $\theta=45^\circ$, these ratios are $1/4$ and $1/2$, respectively. A 180° rotation leaves a transmission axis equivalent to its starting orientation.

## Advanced

The field amplitude projects as $E_2=E_1\cos\theta$, and intensity is proportional to squared amplitude in the same medium; this explains the square in Malus's law. If the initial light is already polarised, the first filter does not generally halve its intensity. Real filters have absorption and imperfect extinction. Field lengths and screen shading in the illustration are schematic; use the numerical intensity ratios for comparisons.

## Derivation

1. Average over the orientations of unpolarised input: the ideal first filter transmits half the incident intensity.
2. Project the linearly polarised field onto the second axis and square the amplitude ratio to obtain the intensity ratio.
3. Multiply the two transmission fractions to express the final intensity relative to the original input.

## Real world

### Polarised glare

Reflected light can be partly polarised. A suitably oriented polarising filter can reduce that component selectively.

### Viewing an LCD through a filter

Many LCD displays emit linearly polarised light. Rotating another polariser in front of them changes the transmitted brightness; that input need not obey the unpolarised first-step assumption used here.
