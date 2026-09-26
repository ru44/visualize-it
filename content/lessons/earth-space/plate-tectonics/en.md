---
title: Plate Tectonics
summary: >-
  Earth's crust is broken into plates that creep a few centimeters a year —
  about as fast as a fingernail grows. Over millions of years that tiny
  speed pushes up mountains, opens oceans, and builds up the stress that
  breaks free as earthquakes.
parameters:
  v: plate speed relative to its neighbor
  t: time elapsed
variables:
  - the total distance the two plates have moved relative to each other, in kilometers
  - the plates' speed relative to each other, in centimeters per year
  - the time elapsed, in millions of years
---

## Try it

1. Set v to a positive number, like 5 cm/yr — the plates are colliding. Drag t up from 0 and watch D climb into the thousands of kilometers.
2. Now make v negative — the plates are pulling apart. Watch D go negative too: that's how much wider the gap between them has grown.
3. Try v = 3.5 cm/yr with t = 20 Myr. That is roughly the sideways slip measured across California's San Andreas Fault.

## Real-life examples

- **India crashing into Asia.** India drifted north at roughly 5 cm/yr for about 50 million years, closing roughly 2,500 km of ocean and crumpling the crust upward into the Himalayas.
- **The Atlantic Ocean widening.** The Mid-Atlantic Ridge has spread the seafloor apart at roughly 2 cm/yr for about 180 million years, opening an ocean now thousands of kilometers wide.
- **The San Andreas Fault.** The Pacific and North American plates slide past each other at roughly 3.5 cm/yr; over 20 million years that adds up to hundreds of kilometers of sideways offset in the rock.

## Test yourself

1. Find a speed and time that together move the plates exactly 1,000 km relative to each other.
2. Make the plates diverge (pull apart) by more than 2,000 km.
3. Make the plates converge (collide) by more than 3,000 km, enough to have built a mountain range the size of the Himalayas.

## Intuition

A few centimeters a year sounds like nothing — it is close to how fast a fingernail grows. Nobody could ever feel a plate creeping that slowly underfoot. But Earth has had a very long time to let that creep add up: mountain ranges and oceans took not years but tens or hundreds of millions of years to form, and multiplying even a tiny yearly step by that many years gives an enormous total distance.

Drag v positive and the two plates are converging, driving into each other; that collision has nowhere to go but up, folding and thickening the crust into a mountain range, or down, one plate diving beneath the other. Drag v negative and the plates are pulling apart instead, letting hot rock rise to fill the widening gap with fresh ocean floor. Either way, the boundary between the plates is also where stress slowly builds in the rock, and every so often that stress breaks free all at once as an earthquake.

## Formal

The total relative displacement is $D = 10\,v\,t$, with $v$ the plate speed in centimeters per year, $t$ the elapsed time in millions of years, and $D$ the result in kilometers. The constant 10 is nothing but a unit conversion: a speed of $v$ cm/yr over $t$ million years covers $vt \times 10^6$ centimeters, and a kilometer is $10^5$ centimeters, so dividing gives exactly $10\,v\,t$ kilometers.

A positive $v$ means the plates are converging and $D$ measures how much crust has been consumed or piled into mountains; a negative $v$ means they are diverging and $|D|$ measures how much new ocean floor has opened up between them. A boundary where the plates instead slide sideways past each other, like the San Andreas Fault, produces the same kind of formula for accumulated offset, without building mountains or opening ocean at all.

## Advanced

Real plate motion is rarely a single constant speed: rates measured from magnetic stripes frozen into the seafloor, from GPS stations bolted to bedrock, and from the geologic record of matching rock formations often disagree by a factor of two or more depending on whether they average over a decade or over tens of millions of years, because plates speed up, slow down, and occasionally lock at a fault for centuries before releasing all their stored motion in a single large earthquake.

## Derivation

1. Every year the boundary creeps $v$ centimeters; multiplied out over $t$ million years, that is $vt$ times a million centimeters.
2. A kilometer equals a hundred thousand centimeters, so dividing that huge count of centimeters by $10^5$ turns it into a clean number of kilometers.
3. Putting the two conversions together collapses into one simple rule: ten kilometers for every unit of $v$ times $t$.

## Real world

### Mountain building
The Himalayas, the Andes, and the Alps all sit where plates are actively converging today; their height keeps growing (and eroding) as the collision continues at a few centimeters each year.

### Seafloor spreading and ocean age
Rock on the ocean floor gets systematically older the farther it sits from a mid-ocean ridge, letting geologists read off the plate's spreading rate directly from the seafloor itself.

### Earthquake hazard maps
Cities built along active plate boundaries, like San Francisco and Tokyo, base their building codes on how much stress a fault is likely to have stored since its last big earthquake.

### GPS monitoring of moving continents
Networks of GPS stations now measure plate motion directly, in real time, confirming the same centimeters-per-year speeds that were once inferred only from ancient rock.
