---
title: Fusion reactors and the Lawson criterion
summary: A fusion reactor has to get plasma hot, dense and well-confined all at once — multiply those three numbers together and a reactor only breaks even once that "triple product" clears a fixed line, the same test ITER is built to pass.
parameters:
  temperature: plasma temperature
  density: plasma density
  confinement: confinement time
variables:
  - the plasma's density — how many particles fill each cubic metre
  - the plasma's temperature, in keV
  - the confinement time — how long the plasma stays hot and dense before leaking away
  - the Lawson threshold for deuterium-tritium ignition, about 3×10²¹ keV·s/m³
  - the fusion power the plasma produces
charts: []
---

## Try it

1. Watch the top bars: three short bars for temperature, density and confinement time, and one long bar underneath for their product against the ignition line.
2. Drag "plasma temperature" up. The top bar grows and the long bar's marker slides right, but nowhere near the ignition line by itself.
3. Now raise "plasma density" and "confinement time" too, until the marker crosses the dashed ignition line. The deuterium-tritium reaction in the corner still releases the same fixed 17.6 MeV either way.

## Real-life examples

1. **A modest lab plasma.** 10 keV, low density, held together for only a second: the triple product lands far short of ignition.
2. **ITER's design target.** About 15 keV, roughly 10²⁰ particles per cubic metre, held for a few seconds — enough to clear the ignition line with room to spare.
3. **A reactor built to spare.** 20 keV, twice ITER's density, held five seconds: the triple product lands an order of magnitude past ignition.

## Test yourself

1. Cross the ignition line with the triple product.
2. Match ITER's own target numbers as closely as the sliders allow.
3. Keep every slider low enough that the triple product stays under 10²⁰.

## Intuition

A deuterium and a tritium nucleus fuse into helium-4 and a neutron every time they crash close enough together, releasing the same fixed 17.6 MeV no matter how the reactor is run — that part never changes. What changes is how often it happens: raising "plasma temperature" gives nuclei more speed to punch through their electrical repulsion, raising "plasma density" packs more of them into the same space so collisions happen more often, and raising "confinement time" simply gives them longer to keep colliding before the plasma cools or drifts apart and the chance is lost.

None of the three knobs alone is enough — a plasma that is hot but thin, or dense but leaks away in a millisecond, never produces more fusion energy than it took to heat it in the first place. The long bar multiplies all three together into a single number, the "triple product", and only once that number crosses the dashed ignition line does a reactor stand a chance of producing more power than it consumes. ITER, the largest fusion experiment ever built, is designed to sit just past that line.

## Formal

The Lawson criterion says a reactor reaches ignition once its density $n$, temperature $T$ and confinement time $\tau$ satisfy $nT\tau \ge \Lambda$, where $\Lambda$ is fixed by the deuterium-tritium reaction's own physics.

Each deuterium-tritium fusion releases a fixed 17.6 MeV, split between a helium-4 nucleus and a neutron, so the total fusion power $P$ produced by a plasma grows with how often that reaction happens: $P \propto n^2$, since it takes two particles meeting to fuse.

## Advanced

Real tokamaks do not hold density, temperature and confinement time independently — heating the plasma harder often shortens how well it stays confined, so reactor design is a genuine three-way trade-off, not three separate dials. The 17.6 MeV from each reaction splits unevenly: the neutron carries 14.1 MeV of it, escaping the magnetic field entirely since magnetic fields only bend charged particles, and depositing its energy in a surrounding blanket, which is how a fusion power plant would actually extract usable heat.

## Derivation

1. Two nuclei can only fuse if they collide, and every fusion event releases the same fixed energy for a given reaction.
2. How often collisions happen scales with density squared, since it takes two particles meeting.
3. Multiplying density, temperature and confinement time into one product gives a single number a reactor must clear before it produces more energy than it consumes.

## Real world

### ITER
Under construction in France, ITER is designed to hold a plasma past the ignition-class triple product and produce ten times the power put into heating it.

### Inertial confinement fusion
Facilities like the National Ignition Facility skip magnetic confinement entirely, compressing a fuel pellet with lasers so fast that its own inertia holds it together just long enough to fuse.

### Stellarators
A stellarator reaches the same triple product as a tokamak using a twisted, coil-shaped magnetic field instead of a simple ring, trading a harder build for steadier confinement.

### Fusion's promise
Because deuterium is abundant in seawater and tritium can be bred from lithium, a working fusion reactor would run on fuel that does not run out and leaves behind no long-lived radioactive waste.
