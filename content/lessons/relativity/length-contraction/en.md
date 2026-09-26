---
title: A fast rod measures shorter
summary: >-
  A rod that is 10 metres long at rest measures shorter than 10 metres to
  anyone who watches it fly past at a large fraction of light speed — not
  because it is squeezed, but because length itself depends on who is
  measuring.
parameters:
  v: the rod's speed as a fraction of light speed, v/c
  L0: the rod's own length, measured at rest
---

## Try it

1. Look at the two rods stacked on screen: the pale outline is the rod's rest length L0, the solid bar is the length L a platform observer actually measures as it flies past at speed v.
2. Raise v from 0.6 toward 0.9. Watch the solid bar visibly shrink inside the pale outline, even though L0 never changed.
3. Push v to 0.99. The solid bar collapses to a small fraction of L0 — at this speed, a 5 m rod measures barely 0.7 m long to the platform.

## Real-life examples

1. **A 10 m delivery van at v = 0.6.** γ = 1.25, so the platform measures it at L0/γ = 8 m long — two full metres shorter than the driver would ever measure it.
2. **A 20 m train carriage at v = 0.9.** γ = 2.29, so the platform sees it shrunk to under 8.7 m, less than half its rest length, though every passenger inside still measures the carriage at the full 20 m.
3. **A 5 m rod at v = 0.99**, close to the edge of the slider. γ = 7.09, and the platform's measured length collapses to about 0.7 m — shorter than the rod's own width would be if it were a car.

## Test yourself

1. Push v until γ reads about 2.
2. Shrink the rod to a fifth of its rest length — get L/L0 down to about 0.2.
3. Set the rod's rest length L0 to its maximum, 20 m.

## Intuition

Nothing is being squeezed. The rod's own atoms are exactly as far apart as they always were, and anyone riding alongside it, at rest relative to the rod, measures its full length L0 every time. The shrinkage only shows up for someone the rod is moving past — and it shows up because "length" means measuring both ends of the rod at the same instant, and different observers disagree about what "the same instant" means once relative motion is involved.

The same logic that stretched time in the light-clock lesson squeezes length here: a light clock turned sideways, running along the rod's own length, must still tick out the same platform time as the transverse light clock did, because both clocks sit on the same moving rod. Matching those two round-trip times forces the rod's measured length down by exactly the factor 1/γ — the shorter the platform's measuring tape reads, the more the arithmetic balances.

## Formal

A light clock built along the rod's own length has a forward leg where light chases a receding mirror and a backward leg where it meets an approaching one; from the platform, timing that round trip and setting it equal to the round trip a transverse light clock on the same rod would take (from the time-dilation lesson) gives $2L'\,\gamma^2/c = \gamma\,(2L_0/c)$, so $L' = L_0/\gamma$.

Writing $\gamma$ out in full, the length a platform observer measures for a rod of rest length $L_0$ moving at speed $v$ is $L = L_0\sqrt{1-v^2/c^2}$, always at most $L_0$ and shrinking toward zero only as $v$ approaches $c$.

## Advanced

Length contraction only ever applies along the direction of motion — a rod's width and height, measured perpendicular to how it moves, come out exactly the same for every observer. That asymmetry is not a rule bolted on afterward; it falls straight out of the same light-clock argument, since a transverse light clock's mirror spacing never entered the horizontal-motion calculation at all.

## Derivation

1. From the platform, a light clock running along the rod's own length has a round-trip time $2L'\gamma^2/c$, built from a receding-mirror leg and an approaching-mirror leg.
2. That round trip must equal $\gamma\,(2L_0/c)$, the same platform-measured time a transverse light clock on the same rod takes, since both clocks are riding along together: $L' = L_0/\gamma$.
3. Writing this out gives $L = L_0\sqrt{1-v^2/c^2} \le L_0$, contraction that grows only as the rod's speed climbs toward light speed.

## Real world

### Cosmic-ray muons again, seen from the muon's side
An observer riding along with a fast muon does not see its lifetime stretched at all — instead, from the muon's own point of view, the thickness of Earth's atmosphere it has to cross is length-contracted, which is exactly why the muon still reaches the ground: time dilation and length contraction are the same physics, described from two different seats.

### Particle accelerators
A relativistic proton bunch at CERN, moving at v > 0.999999c, is measured by lab instruments as a startlingly thin, pancake-flattened disc along its direction of travel, even though every proton inside it is an ordinary sphere in its own rest frame.

### Why you would never notice it in daily life
A car on a motorway moving at 30 m/s has v/c of about one ten-millionth, so its length contraction is smaller than the width of an atom — real, but utterly unmeasurable with any everyday ruler.

### Electric and magnetic fields
Length contraction of the electric field around a fast-moving charge is part of why a current-carrying wire, which is electrically neutral in the lab, creates a genuine magnetic force on a moving charge nearby — a purely relativistic effect hiding inside ordinary electromagnetism.
