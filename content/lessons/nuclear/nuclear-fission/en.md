---
title: 'Nuclear fission: splitting the atom'
summary: A slow neutron slipping into a uranium-235 nucleus can make it wobble, stretch into a dumbbell, and snap into two lighter nuclei plus a few free neutrons, releasing about 200 MeV — enough, repeated billions of times a second, to run a power plant.
parameters:
  speed: neutron speed
  time: time through the event
variables:
  - the mass that disappears when the nucleus splits, turned straight into energy
  - the speed of light, about 3×10^8 m/s — squaring such a huge number turns a tiny missing mass into a huge amount of energy
charts: []
---

## Try it

1. Watch the green neutron drift in from the left toward the blue uranium-235 nucleus.
2. Keep "neutron speed" low and drag "time" forward. The nucleus swells, stretches into a dumbbell, then snaps into two fragments and three new neutrons.
3. Raise "neutron speed" past about 5,000 km/s and run it again. The neutron just grazes the nucleus and bounces away — no split, no energy released.

## Real-life examples

1. **A reactor's slowed-down neutron.** Water or graphite inside a reactor slows neutrons to about 1,000-2,000 km/s, slow enough that a uranium-235 nucleus readily absorbs one and splits.
2. **A neutron fresh out of another fission.** New fission neutrons leave at around 18,000 km/s — far too fast to be captured, so most just bounce off the next nucleus they meet.
3. **Caught mid-split.** Freeze the frame partway through and watch the nucleus stretched into a dumbbell, a heartbeat before it snaps in two.

## Test yourself

1. Run a slow neutron, below 5,000 km/s, all the way to the end and watch the fission complete.
2. Run a fast neutron, 5,000 km/s or above, all the way to the end and confirm it only bounces off.
3. Catch the nucleus stretched into its dumbbell shape, somewhere between time 30 and time 55.

## Intuition

Picture the uranium-235 nucleus as a wobbly drop of liquid, held round by the strong nuclear force the way surface tension holds a water droplet together. A neutron drifting in slowly gets swallowed whole, and the extra energy it brings makes the drop jiggle. If the jiggle stretches the drop enough, the electric repulsion between its 92 protons — all trying to push each other apart — wins out over the strong force trying to hold them together, and the drop pinches into two smaller drops. A neutron screaming in at 18,000 km/s, by contrast, is gone before the nucleus can react; it mostly just glances off, the way a ball moving too fast to be caught still knocks the catcher's glove aside as it flies past.

When the drop finally pinches apart, the two pieces on screen are not the same size: the left fragment (barium-141) is noticeably bigger and slower than the right one (krypton-92). That is Newton's third law at nuclear scale — both fragments push off each other with the same force, so the lighter one flies away faster, the same way a light canoe drifts off faster than a heavy one if you shove them apart with equal force. Three loose neutrons spray out from where the split happened, and it is exactly neutrons like these that can go on to split more uranium-235 nuclei — the spark behind a chain reaction.

## Formal

The reaction shown is $n + {}^{235}\mathrm{U} \to {}^{236}\mathrm{U}^{*} \to {}^{141}\mathrm{Ba} + {}^{92}\mathrm{Kr} + 3n$: a neutron is absorbed, forming a briefly excited compound nucleus that splits into two fragments and three free neutrons.

Adding up the masses before and after the split, some mass has gone missing, and by $E = \Delta m\, c^2$ that missing mass reappears as kinetic energy and gamma rays — about 168 MeV right away, plus roughly 30 MeV more over the following minutes as the still-radioactive fragments decay, for a total near 200 MeV per fission.

## Advanced

Every nucleus's stability comes down to its binding energy per nucleon, which climbs from hydrogen up to a peak of about 8.8 MeV per nucleon at iron-56 and then slowly falls for heavier elements; uranium-235 sits nearer 7.6 MeV per nucleon, while barium-141 and krypton-92 sit nearer 8.4 MeV per nucleon, and that difference, multiplied across 236 nucleons, is where the released energy actually comes from. The split only happens because the compound nucleus briefly deforms enough for the protons' long-range Coulomb repulsion to beat the strong force's short-range pull — the same tug-of-war, roughly following the nuclear radius law $R = r_0 A^{1/3}$ with $r_0 \approx 1.2$ fm, that limits how large any nucleus can grow before it becomes unstable.

## Derivation

1. Add the mass of the uranium-235 nucleus, about 235.04 u, and the neutron it swallows, about 1.01 u: that is everything going in.
2. Add the mass of the two fragments, barium-141 (about 140.91 u) and krypton-92 (about 91.93 u), plus the three neutrons that fly back out: that is everything coming out.
3. The two totals do not match. About 0.18 u has disappeared, and $E = \Delta m\, c^2$ turns it into roughly 168 MeV, released immediately as motion and a flash of gamma rays.

## Real world

### Nuclear power plants
A power reactor runs this same split roughly 10^19 times a second across its fuel, using the heat to boil water and spin a turbine — the subject of the next lesson.

### Naval propulsion
Submarines and aircraft carriers carry small fission reactors so they can run for years, even decades, without refuelling or surfacing for air.

### Medical isotopes
Research reactors fission uranium-235 to make molybdenum-99, which decays into technetium-99m — a widely used medical tracer with a half-life of just 6.0 hours.

### Nuclear weapons
Letting the chain reaction run uncontrolled, with almost every released neutron splitting another nucleus within microseconds, releases the same energy all at once instead of gradually.
