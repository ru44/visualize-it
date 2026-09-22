---
title: The pH scale
summary: >-
  Lemon juice, black coffee and soap all have wildly different acidity — pH
  is the single number that lets you compare them all on one simple scale.
parameters:
  x: 'H⁺ concentration [H⁺]'
variables:
  - hydrogen-ion (hydronium) concentration in mol/L
  - 'the negative base-10 logarithm of $[\mathrm{H^+}]$'
  - 'the same idea for hydroxide; at 25°C, $\mathrm{pH} + \mathrm{pOH} = 14$'
---

## Try it

1. Drag the point «[H⁺]» left, toward tiny concentrations. Watch pH climb.
2. Drag it right instead, toward larger concentrations. Watch pH fall.
3. Notice how the curve steepens near zero — that bending tangent is the signature of a logarithm.

## Real-life examples

1. **Stomach acid.** Hydrochloric acid in your stomach reaches [H⁺] ≈ 0.032 mol/L, a pH of about 1.5 — strong enough to dissolve food and kill most bacteria.
2. **Lemon juice.** [H⁺] ≈ 0.01 mol/L gives a pH of 2, tart enough to make you wince.
3. **Orange juice.** [H⁺] ≈ 0.0003 mol/L gives a pH of about 3.5, noticeably less acidic than lemon juice but still sharp.

## Test yourself

1. Find the concentration where pH equals 3.
2. Make the solution more acidic than pH 1.5.
3. Find [H⁺] for a solution with twice the hydrogen-ion concentration of a pH-3 solution.

## Intuition

Picture lemon juice, with about 0.01 mol/L of hydrogen ions, next to black coffee, with roughly a thousand times fewer. On screen, drag the point left, toward tinier concentrations, and pH climbs; drag it right, toward larger concentrations, and pH falls. Near $[\mathrm{H^+}] = 0.1$ the curve is almost flat, but as you approach zero it shoots upward — that steep bend is the signature of a logarithm.

Because the scale is logarithmic, moving from pH 5 to pH 4 is not a small change — it means ten times more hydrogen ions. Two solutions three pH units apart differ in acidity by a factor of 1000, even though their pH values sit close together on the slider.

## Formal

$\mathrm{pH} = -\log_{10}[\mathrm{H^+}]$, so $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$. Pure water at 25°C has $[\mathrm{H^+}] = 10^{-7}\,\text{mol/L}$, i.e. $\mathrm{pH} = 7$.

Water self-ionises with $K_w = [\mathrm{H^+}][\mathrm{OH^-}] = 10^{-14}$ at 25°C, which gives $\mathrm{pH} + \mathrm{pOH} = 14$: an acid’s low pH is mirrored by a high pOH.

## Advanced

Buffers resist pH change because they contain a reservoir of a weak acid and its conjugate base; the Henderson–Hasselbalch equation $\mathrm{pH} = \mathrm{p}K_a + \log_{10}\!\big([\mathrm{A^-}]/[\mathrm{HA}]\big)$ shows that adding a little strong acid or base mostly shifts the ratio of the two reservoir species rather than the free $[\mathrm{H^+}]$ itself, which is why blood and lab buffers hold pH nearly constant.

## Derivation

1. From about $1\,\text{mol/L}$ in strong acid to $10^{-14}\,\text{mol/L}$ in strong base — too wide a range for a linear scale to be useful.
2. Taking a log turns that huge multiplicative range into a small, additive one, roughly 0 to 14.
3. Because $\log_{10}(10x) = \log_{10}x + 1$, every ×10 in concentration is exactly one pH unit.

## Real world

### Blood chemistry
Human blood is buffered tightly between pH 7.35 and 7.45; drifting outside that narrow band is medically dangerous.

### Soil and agriculture
Crops have preferred soil pH ranges; farmers add lime (base) or sulfur (acid) to shift it.

### Swimming pools
Pool chemistry is kept near pH 7.4 — too acidic corrodes equipment, too basic lets chlorine stop working.

### Ocean acidification
Absorbed $\mathrm{CO_2}$ has dropped average ocean pH by about 0.1 — a seemingly small number that is really a ~30% rise in hydrogen-ion concentration.
