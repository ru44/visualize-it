---
title: How far are the planets from the Sun?
summary: >-
  Venus and Mercury never stray far from the Sun in our sky. How far they stray
  tells us how big their orbits are.
parameters:
  r: r — the planet's distance from the Sun, in AU
  a: a — where the planet is on its orbit
variables:
  - the planet's distance from the Sun, in AU (1 AU is the distance from the Earth to the Sun)
  - the biggest angle between the planet and the Sun that we ever see from Earth
---

## Try it

1. Set r to 0.72 and move a slowly all the way round. The angle at the Earth grows, reaches a peak, and falls again. Find the peak: it is near 46°, and at that moment the sight line just touches the planet's orbit.
2. At the peak, look at the planet in the top view. The small square there shows a right angle. Now change r to 0.39 and find the new peak. A smaller orbit gives a smaller angle.
3. Set a to 180 so the planet is behind the Sun. The angle seen from Earth falls to 0, so the planet is lost in the Sun's glare.

## Real-life examples

- **Venus, the evening and morning star.** It is never more than about 46° from the Sun. With r = 0.72 and a = 44, you are at that greatest angle.
- **Mercury, harder to spot.** It stays within about 23° of the Sun, so it is only seen low in the sky just after sunset or before sunrise. With r = 0.39 and a = 67, you are at its greatest angle.
- **Venus behind the Sun.** With a = 180 the angle is 0. For weeks Venus is lost in the Sun's light, then it comes back as the other kind of star, evening or morning.

## Test yourself

1. Catch Venus at its greatest angle: set r near 0.72 and find the angle above 45.5°.
2. Make a planet whose greatest angle is 30°, and put it there.
3. Catch Mercury at its greatest angle, above 22.3°.

## Intuition

In 1543 Copernicus published a book in which the Earth goes round the Sun, like the other planets. One thing it explained very well was a plain fact that every sky-watcher knew. Venus is the brightest star of the evening or of the morning, and it never wanders far from the Sun: at most about 46°. Mercury stays even closer, at most about 23°. Move the planet in the picture: the angle at the Earth never gets past a certain limit.

Copernicus saw why. If Venus and Mercury circle the Sun inside the Earth's orbit, then from the Earth they can never get far from the Sun, just as a child going round a lamp post on a short rope never gets far from the post. The top view shows the Earth on the right, the Sun in the middle, and the planet on its own smaller orbit.

Now comes the clever part. When the angle is at its biggest, the sight line from Earth just touches the planet's orbit, and it touches at a right angle. The planet, the Sun and the Earth then make a right triangle, with the right angle at the planet. In that triangle, the distance from the planet to the Sun is the sine of the angle at the Earth, times the distance from the Earth to the Sun.

So Venus at 46° gives 0.72, and Mercury at 23° gives 0.39. These are distances in units of the Earth-Sun distance, called 1 AU. Nobody yet knew how many kilometres that was, but Copernicus could already draw a map of the inner solar system. The next lesson, the transit of Venus, turns that map into kilometres.

## Formal

Let the Earth and the planet move on circles around the Sun, with the planet's circle inside the Earth's. The angle at the Earth between the Sun and the planet, called the elongation, is biggest when the sight line from Earth is tangent to the planet's circle. The tangent is perpendicular to the radius, so the Sun, the planet and the Earth form a right triangle with the right angle at the planet.

The side opposite the biggest angle $\varepsilon_{\max}$ is the planet's distance from the Sun, and the hypotenuse is the Earth's distance, 1 AU. So $\sin\varepsilon_{\max} = \frac{r}{1\,\text{AU}}$, and in AU the distance is $r = \sin\varepsilon_{\max}$. For Venus, $\varepsilon_{\max} = 46°$ gives $r = 0.72$.

## Advanced

Real orbits are not exact circles, so the greatest angle changes from one pass to the next. For Venus it runs from about 45° to 47.8°, and for Mercury, whose orbit is much more stretched, from 18° to 28°. Averaging many passes gives the mean distances, 0.723 AU for Venus and 0.387 AU for Mercury.

The method works only for planets inside the Earth's orbit, because only they have a greatest angle. Mars and the outer planets need another method. Later Kepler found a rule that links a planet's year to its distance, so one good measurement, the AU, would fix all the others.

## Derivation

1. At the greatest angle, the sight line from Earth touches the planet's orbit and is perpendicular to the radius to the planet. So the triangle Sun, planet, Earth has a right angle at the planet, and the sine of the angle at the Earth is the opposite side over the hypotenuse, $r$ over 1 AU.
2. The Earth is 1 AU from the Sun, so $r = \sin\varepsilon_{\max}$ in AU.

## Real world

### The evening star

Venus is the brightest object in the sky after the Sun and the Moon. It shines in the west after sunset or in the east before sunrise, and you can see it with your own eyes.

### The map comes first

Copernicus could give every planet's distance in AU long before anyone knew the AU in kilometres. Later, once the AU was measured, every distance became kilometres at once.

### Why Mercury is hard to see

Mercury never gets more than about 23° from the Sun, and the Sun's glare hides it. You have the best chance a little after sunset at its greatest angle, low over the horizon.

### Another way to check

Radar and spacecraft now measure the planets' distances. Venus is 108 million km from the Sun and Mercury 58 million km, close to what the sine gives with 1 AU = 149.6 million km.
