---
title: Binding energy per nucleon
summary: Split a heavy nucleus or fuse two light ones and, either way, the pieces end up more tightly bound than they started — that single fact is where both fission and fusion get their energy.
parameters:
  A: mass number A
variables:
  - 'mass number: how many protons and neutrons the nucleus holds in total'
  - 'atomic number: how many of those are protons'
  - 'binding energy: how much energy it would take to pull the whole nucleus apart into separate protons and neutrons'
  - 'about 15.75 MeV — roughly how much energy each nucleon deep inside the nucleus contributes by touching its neighbours'
  - 'about 17.8 MeV — the energy a nucleon on the surface loses compared with one buried inside, because it has fewer neighbours to bind to'
  - 'about 0.711 MeV — the strength of the electric push between two protons packed this close together'
  - 'about 23.7 MeV — the energy cost of the nucleus having many more neutrons than protons, or the reverse, instead of a balanced mix'
charts: []
---

## Try it

1. Drag slider "mass number A" up from a light nucleus. Watch the marked dot climb the curve fast at first, each extra nucleon adding almost the full binding energy a deep interior nucleon gets.
2. Keep dragging until the dot sits at the very top, around A = 56 to 62 — iron and nickel, the most tightly bound nuclei that exist.
3. Keep going into heavy territory, past A = 150, all the way to uranium at A = 235. Watch the curve slope back down on the right.

## Real-life examples

1. **Helium-4, a light nucleus.** Four nucleons sit low on the curve in this smooth model, each one still close to the surface with few neighbours to bind to.
2. **Iron-56 and nickel-62, the peak.** These are the most tightly bound nuclei in nature, at about 8.8 MeV per nucleon — the reason a dying star's fusion stops producing energy once its core turns to iron.
3. **Uranium-235, a heavy nucleus.** With 92 protons all repelling each other at once, it sits well down the right side of the curve, at only about 7.6 MeV per nucleon.

## Test yourself

1. Find the mass number where binding energy per nucleon peaks — somewhere around iron and nickel.
2. Move to a heavy nucleus, above mass number 150, where splitting it apart would release energy.
3. Move to a light nucleus, below mass number 20, where fusing it with another would release energy.

## Intuition

Every nucleon inside a nucleus only feels the pull of its closest neighbours: the strong force barely reaches past about a femtometre, roughly one nucleon's own width, so it never notices anyone more than a spot or two away. Picture a small huddle of four friends holding hands, standing in for helium-4 — every one of them is on the edge of the group, touching only two or three others, so their total grip is weak. Now picture a huddle of fifty-six friends, standing in for iron-56: most of them are buried in the middle of the crowd, each one holding hands with as many neighbours as that short reach allows, so on average everybody contributes close to the maximum the force can give, about 8.8 MeV each. Drag the slider "mass number A" and watch the marked dot ride up that curve as the crowded interior grows faster than the surface.

Push A even higher, past a couple of hundred, and a second effect starts winning: every proton repels every other proton electrically, and that push reaches clear across the whole nucleus, not just to close neighbours. In uranium-235, 92 protons are all shoving each other at once, and that steady repulsion drags the curve back down to about 7.6 MeV per nucleon. That is exactly why splitting a uranium nucleus in two — fission — pays off: the two smaller fragments land higher up the curve than uranium did, and the difference comes out as roughly 200 MeV of released energy per split. The same logic runs in reverse on the far-left side of the curve: fusing two light nuclei into a slightly heavier one also climbs the curve, which is exactly what powers the Sun.

## Formal

The semi-empirical mass formula estimates a nucleus's total binding energy as $E_b = a_V A - a_S A^{2/3} - a_C \frac{Z(Z-1)}{A^{1/3}} - a_A \frac{(A-2Z)^2}{A}$, where A is the mass number and Z the number of protons: a volume term that rewards every nucleon roughly equally, a surface term that penalises nucleons with fewer neighbours, a Coulomb term that penalises proton-proton repulsion, and an asymmetry term that penalises an unequal mix of protons and neutrons.

Dividing by A gives the binding energy per nucleon plotted on screen. It rises steeply for small A, where most nucleons sit on the surface, flattens out near mass numbers 56 to 62 once the interior dominates, then falls slowly as the Coulomb term grows — the curve this lesson traces, choosing for each A the proton count Z that sits closest to the real valley of stability.

## Advanced

Real nuclei wobble above and below this smooth curve because of two effects the formula leaves out: a small pairing correction that favours nuclei with an even number of both protons and neutrons, and shell effects, where certain "magic" numbers of protons or neutrons (2, 8, 20, 28, 50, 82, 126) pack unusually tightly — which is why helium-4 and oxygen-16 sit measurably above the smooth trend this model draws.

## Derivation

1. If every nucleon touched all $A - 1$ others, binding energy would grow like $A^2$; but the strong force only reaches its nearest neighbours, so it grows simply in proportion to $A$ instead — the volume term.
2. A nucleon sitting on the surface has fewer neighbours than one buried inside, so it contributes less. The number of surface nucleons scales with the nucleus's surface area, which grows only as $A^{2/3}$ — smaller than the volume, so this penalty matters most for small nuclei.
3. Two more effects subtract further: every pair of protons repels electrically, and the nucleus pays an energy cost for straying from an even mix of protons and neutrons. All four terms together trace the curve shown on screen.

## Real world

### Iron and nickel in dying stars
A massive star fuses lighter elements into heavier ones for as long as each step still climbs the curve. Once its core is mostly iron and nickel, sitting at the very peak, no further fusion step releases energy, and the star's core collapses.

### Nuclear reactors splitting uranium
A reactor splits uranium-235 nuclei into two mid-sized fragments that sit higher on the curve, releasing about 200 MeV per split — enough from one kilogram of uranium to match burning roughly two thousand tonnes of coal.

### Hydrogen fusion in the Sun
The Sun fuses hydrogen (A = 1) into helium (A = 4), climbing the steepest part of the curve, which is why fusing the lightest elements releases so much energy for each nucleon involved.

### Where elements heavier than iron come from
Since fusion stops paying off past the peak, elements heavier than iron — including gold and uranium — are forged instead in the violent, energy-rich conditions of supernovae and colliding neutron stars.
