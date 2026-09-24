---
title: Everyday radiation dose
summary: A banana, a flight and a CT scan all give you a real, measurable dose of radiation — the numbers just span an enormous range, from a ten-thousandth of a millisievert to several thousand times that.
parameters:
  source: everyday source
  time: repeats
variables:
  - the dose from a single exposure to this source
  - how many times you repeat that exposure
  - a year of ordinary background radiation, 2.4 mSv, used here as a familiar yardstick
  - the total dose after all n repeats
  - that total, expressed as an equivalent number of years of background radiation
charts: []
---

## Try it

1. Look at the five bars: a banana, a dental X-ray, a flight, a chest CT and a year of background, all on the same ruler, marked in millisieverts.
2. Pick "everyday source" and set "repeats" to 1. Your highlighted bar should land exactly on that source's single-exposure mark.
3. Raise "repeats". Watch your bar grow past the fixed reference bars, and see whether it reaches the dashed line at 100 mSv, the level where a real, measurable rise in cancer risk first shows up in large population studies.

## Real-life examples

1. **Eating one banana.** About 0.1 microsieverts (0.0001 mSv) from the natural potassium-40 already in the fruit — utterly trivial next to everything else on the chart.
2. **A round-trip long flight.** Two flights at about 40 microsieverts each, from the extra cosmic radiation at cruising altitude, add up to roughly 80 microsieverts — still a small fraction of a year of ordinary background.
3. **A chest CT scan.** About 7 millisieverts in one sitting, nearly three years' worth of background radiation delivered in a single scan — a real dose, given because the medical information it provides is worth it.

## Test yourself

1. Rack up 60 long flights and match a full year of background radiation from flying alone.
2. Take fifteen chest CT scans and cross the 100 mSv mark where risk becomes measurable.
3. Push dental X-rays to their maximum of 100 repeats and see that the total still falls short of one year of background.

## Intuition

Every source on this chart is real and measured, but the scale is what makes radiation dose hard to reason about: a banana's dose is about seventy thousand times smaller than a chest CT's, so plotting them on an ordinary ruler would squash every small bar to an invisible sliver. The log scale here fixes that by giving each step of ×10 the same width, so a banana, a dental X-ray, a flight, a CT scan and a year of background can all sit on one readable chart at once.

Dragging "repeats" turns a single small exposure into a running total, and that total is what actually matters for risk — cumulative dose, not any one event in isolation, is what regulators and doctors track. A single chest CT is a deliberate, worthwhile trade: a large, useful dose given once for a real medical reason. A hundred dental X-rays, by contrast, still add up to less than one ordinary year of background radiation, which is the chart's way of showing that repetition alone does not automatically make a small dose dangerous.

## Formal

A single exposure to a given source delivers a fixed dose $D_1$; repeating it $n$ times gives a cumulative dose $D = n\,D_1$, simply adding up.

Dividing that total by a year of background radiation gives an easy comparison, $y = \dfrac{D}{D_y}$: how many years of ordinary background exposure the total is equivalent to.

## Advanced

The 100 mSv mark is not a hard safety cutoff; it is roughly the lowest dose at which studies of large exposed populations, most famously the atomic bomb survivor cohort, can statistically distinguish a real increase in cancer risk from ordinary background variation. Below it, effects are commonly estimated by linear extrapolation (the "linear no-threshold" model), a deliberately cautious assumption that remains debated among researchers, which is why occupational dose limits are set far below 100 mSv rather than up against it.

## Derivation

1. One exposure to a source delivers exactly that source's own dose.
2. Repeating it $n$ times simply adds the doses together: $D = n\,D_1$.
3. Dividing the running total by a year of background radiation turns it into an easy years-of-background comparison.

## Real world

### Medical imaging
Doctors weigh a scan's dose against the value of the diagnosis it provides, and modern equipment is deliberately designed to use the lowest dose that still gives a readable image.

### Air travel and flight crew
Frequent flyers and flight crew receive more cosmic radiation than people at ground level, which is one reason airline crew dose is tracked and limited like other occupational radiation exposure.

### Nuclear industry workers
Radiation workers wear dosimeters that log cumulative exposure over months and years, with regulatory limits set well under the 100 mSv range to keep a wide safety margin.

### Natural background variation
Background radiation itself varies by location, from about 2 mSv a year in many places to over 10 mSv a year in some high-radon or high-altitude regions, without any established difference in measured health outcomes at those levels.
