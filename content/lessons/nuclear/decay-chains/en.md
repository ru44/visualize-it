---
title: Decay chains
summary: A heavy nucleus rarely reaches stability in one decay — it steps down a whole chain of isotopes, alpha and beta decay by alpha and beta decay, until it lands on an isotope that finally stops decaying.
parameters:
  chain: decay chain
  time: half-lives elapsed
variables:
  - how many atoms of this middle isotope exist right now
  - how many atoms of the parent isotope, the chain's start, exist right now
  - this middle isotope's own half-life
  - the parent's half-life
charts: []
---

## Try it

1. Watch the staircase of dots step down from the parent (top left) to the stable isotope (bottom right).
2. Drag "half-lives elapsed" forward. The parent dot fades as its share of the original atoms drops, and the stable end brightens as it fills up.
3. Switch "decay chain" between the three series. Each one starts at a different heavy isotope and ends at a different stable lead isotope, but every one of them passes through a radon isotope on the way.

## Real-life examples

1. **A zircon crystal the moment it forms.** Trace uranium-238 gets locked into the crystal with essentially no lead yet — the clock starts at zero.
2. **The same crystal 4.47 billion years later.** One half-life of uranium-238 has passed: almost exactly half of the original uranium has stepped all the way down to lead-206.
3. **An ancient thorium-bearing mineral.** After three half-lives of thorium-232 (about 42 billion years), only about an eighth of the original thorium is left; the rest is now stable lead-208.

## Test yourself

1. On the uranium-238 chain, push past one full half-life.
2. On the thorium-232 chain, run the clock out to five half-lives.
3. On the actinium (uranium-235) chain, get the remaining parent below 1%.

## Intuition

A heavy nucleus like uranium-238 has too many protons for the strong force to hold together comfortably, but a single decay can't fix that in one step — an alpha decay only sheds 2 protons and 2 neutrons at a time, and a beta decay only turns one neutron into a proton. So the nucleus decays, lands on a new isotope that is still unstable, decays again, and again, stepping down the staircase you see on screen until it finally lands on an isotope with a stable, comfortable arrangement of protons and neutrons — for the uranium-238 chain, that is lead-206.

Most of the isotopes partway down the staircase are so short-lived that they barely accumulate at all: as fast as the parent feeds new atoms into one of them, it decays onward to the next, so its own population settles into a small, nearly constant share of whatever the parent still has — brighter dots for longer-lived members, dimmer for shorter-lived ones. The one dramatic exception is right at the end: the final isotope does not decay further, so instead of settling into a small steady share, it simply accumulates forever, brightening a little more with every half-life that passes.

## Formal

Once a middle isotope's population has settled down, it decays away at almost exactly the rate new atoms of it arrive from the parent, a balance called secular equilibrium.

That balance ties every middle member's share of the original atoms to the parent's, through their half-lives: $\frac{N_i}{N_p} \approx \frac{T_i}{T_p}$, so an isotope with a half-life a million times shorter than the parent's keeps only about a millionth of the parent's population at any moment.

## Advanced

Secular equilibrium is an approximation that holds once enough time has passed for a middle member to build up to its steady share, which for every isotope in these three chains takes far less time than the chain's own parent needs to decay even slightly — the longest-lived middle member of the uranium-238 chain, thorium-230, reaches equilibrium in well under a million years, a sliver of uranium-238's 4.47-billion-year half-life. The full, exact solution without this approximation is the Bateman equations, a chain of coupled differential equations solved isotope by isotope down the series.

## Derivation

1. Once established, a middle isotope's own population stops changing much: as many atoms of it appear as decay away.
2. That balance means the same fraction decays away every half-life for every member, so dividing each one's population by its own half-life gives the same number all along the chain.
3. Rearranging turns that shared number into a direct comparison: a middle isotope's share of the parent's population equals the ratio of their half-lives.

## Real world

### Uranium-lead dating
Geologists date rocks by measuring how far the uranium-238 or uranium-235 they contain has stepped down its chain toward stable lead, the same "half-lives elapsed" slider used here.

### Radon in homes
Radon-222, radon-220 and radon-219 are the one gaseous step in each of these three chains; unlike every solid isotope around it, radon can seep out of uranium- or thorium-bearing soil and rock and collect in basements, which is why many countries require home radon testing.

### Nuclear waste storage
Spent reactor fuel contains isotopes partway down chains like these; storage plans account for the fact that a "safe" decay product can itself decay into something less safe further down the same chain.

### Smoke detectors and other applications
Some of the shorter-lived members of these chains, like polonium-210, have been used and studied precisely because a chain guarantees they are always being freshly produced from a longer-lived parent nearby.
