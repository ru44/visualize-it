---
title: "The Sun's distance in kilometres: the transits of Venus"
summary: >-
  Every planet's distance was known as a fraction of the Sun's distance, but not in kilometres. Venus crossing the Sun fixed that.
parameters:
  b: b — how far apart the two observers stand on Earth
  delta: delta — the shift you measure between the two tracks
  t: t — how far Venus has travelled across the Sun
variables:
  - the Earth-Sun distance, the number we are after (1 AU)
  - the distance between the two observers, measured across the line of sight
  - the shift of Venus against the Sun between the two observers, as an angle
  - how far Venus is from the Sun, in AU (0.723, from the last lesson)
---

## Try it

1. Set b to 10000 and move delta until "your answer" reads about 149.6. The real Sun is that far away. Now drag the lower track in the left picture up and down: it moves delta for you.
2. Set b to 2000 and delta to 7.2. The answer is right again, but the shift is tiny. Change delta by just 1 and watch the error jump to about 14 %.
3. Move t from 0 to 100. Venus crosses the Sun on both tracks. The gap between its two dots stays the same all the way across, so you can measure it at any moment.

## Real-life examples

- **The modern value.** Two observers about 10,000 km apart see Venus shifted by 36 arcseconds. That gives 149.5 million km, almost exactly right.
- **The 1769 result.** The same distance between observers, but a shift of 35.2 arcseconds, gives about 153 million km. That is what the astronomers of the 1760s found, only 2 % too far.
- **Observers too close.** Two observers 2,000 km apart see a shift of only 7.2 arcseconds. One arcsecond of error is 14 % of that, so the answer can be off by 14 %. This is why expeditions sailed across the world.

## Test yourself

1. Get the Sun's distance within 2 % of the real 149.6 million km.
2. Do it again with observers less than 5,000 km apart.
3. Reproduce the 1769 result of 153 million km, within 1 %.

## Intuition

In the last lesson you drew a map of the solar system. Venus sits at 0.72 on it and Mars at 1.52, because the unit is the distance from the Earth to the Sun. But nobody knew how many kilometres that unit is. It is a map with no scale bar: you know where every planet is compared with the others, but not how far anything is in kilometres.

In 1716 the English astronomer Edmond Halley had an idea. Now and then Venus passes exactly between us and the Sun, and shows as a small black dot crossing the Sun's face. This is called a transit. Hold a finger up and close one eye, then the other: the finger jumps against the wall behind it. Venus does the same against the Sun if two observers stand far apart on Earth.

Look at the left picture. It is the Sun as two observers see it, one in the north and one in the south. The lower track is what the northern observer sees, and the upper track is what the southern observer sees. The gap between them is the shift. It is really only about a fiftieth of the Sun's width, so the picture draws it 8 times bigger. Drag the lower track to change delta. The right picture is the view from the side, not to scale. The two sight lines cross at Venus and land at different heights on the Sun. Drag an observer to change b.

Now the Earth-Sun distance is fixed by what you measured. Farther apart observers give a bigger shift. A closer Sun gives a bigger shift too. So if you know b in kilometres, and you measure the shift in arcseconds (one arcsecond is 1/3600 of a degree), you can work out how far the Sun is. The Sun is about 1,900 arcseconds wide, so a shift of 36 arcseconds is a tiny gap. That is why it was so hard.

Transits come in pairs, 8 years apart, and then none for more than a century: 1761 and 1769, 1874 and 1882, 2004 and 2012. The next is in 2117. In 1769 astronomers from many countries went far apart, from northern Norway to Tahiti, where James Cook sailed for the purpose. Their results gave about 153 million km. The real value is 149.6 million km, and the answer was only about 2 % off.

## Formal

At a transit, Venus is $(1 - r)$ AU from the Earth, where $r = 0.723$ is its distance from the Sun in AU, and the Sun is 1 AU away. Two observers a distance $b$ apart, measured across the line of sight, see Venus shifted against the Sun's disc by the angle $\Delta$ (in radians). For small angles, $\text{AU} = \frac{b}{\Delta}\cdot\frac{r}{1 - r}$. With $r = 0.723$, the factor $\frac{r}{1 - r}$ is 2.61. For example, $b = 10{,}000$ km and $\Delta = 36$ arcseconds, that is $36/206265$ of a radian, give 149.5 million km.

## Advanced

Halley's own plan did not measure the shift directly. Observers at different latitudes timed how long Venus took to cross the Sun, and the difference in those durations gave the same information. Timing was hard: as Venus touched the Sun's edge, its dark disc seemed to stretch into a drop, the "black drop effect", so observers disagreed by many seconds. Combining the 1761 and 1769 transits improved the answer, but only to a few percent. Today the astronomical unit is not measured at all: since 2012 it is defined as exactly 149,597,870,700 m.

## Derivation

1. Venus is $(1-r)$ AU from the Earth, so two observers $b$ apart see it from different directions, shifted by the angle $b/((1-r)\,\text{AU})$.
2. The Sun is 1 AU away, so the same two observers see it shifted by only $b/\text{AU}$. The nearer object shifts more.
3. Against the Sun's disc, Venus appears shifted by the difference of the two angles, $\Delta = \frac{b}{\text{AU}}\cdot\frac{r}{1-r}$.
4. Solving for the distance, $\text{AU} = \frac{b}{\Delta}\cdot\frac{r}{1 - r}$.

## Real world

### Cook in Tahiti

James Cook sailed to Tahiti so that observers there could watch Venus cross the Sun on 3 June 1769. Their view from the far south, set against the view from Europe, gave the two tracks.

### The black drop

When Venus touched the edge of the Sun, its dark disc seemed to stretch like a drop of ink. Observers disagreed by many seconds about the moment of contact, which blurred the result.

### Radar on Venus

In 1961 radar signals were bounced off Venus and the echo timed. That gave the distance to Venus in kilometres directly. With the map from the last lesson, the Sun's distance followed.

### The ruler for the stars

The Earth-Sun distance is the base line for measuring the distance to nearby stars, by watching how they shift as the Earth goes round the Sun. Every later rung of the ladder uses it.
