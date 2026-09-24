---
title: The nucleus
summary: >-
  Pack protons and neutrons together and you get an atom's nucleus — which
  numbers you pick decides the element, whether it lasts forever, and how big
  the ball actually is.
parameters:
  Z: protons Z
  N: neutrons N
variables:
  - the nuclear radius, in femtometres (1 fm is 10⁻¹⁵ m, about a trillionth the width of a hair)
  - the mass number, the total count of protons and neutrons, Z + N
charts: []
---

## Try it

1. Start at carbon-12: six blue protons and six grey neutrons packed into a tiny ball, labelled C-12 and marked a known stable isotope.
2. Raise "neutrons N" to 8 while "protons Z" stays at 6. The label changes to C-14 and the stable badge turns off — you've built the isotope used to date old bones.
3. Now drag "protons Z" up to 20. The ball grows and the radius R climbs too, because every extra nucleon adds volume, not just extra width.

## Real-life examples

1. **Ordinary hydrogen.** One proton and no neutrons at all — nearly every hydrogen atom in the universe, in every water molecule you drink.
2. **Tritium.** One proton and two neutrons — a radioactive hydrogen used as fusion fuel, with a half-life of about 12.3 years.
3. **Carbon-12.** Six protons and six neutrons — the ordinary carbon in your own body, and the standard the atomic mass unit is measured against.

## Test yourself

1. Build deuterium, hydrogen's other stable isotope, used in heavy water.
2. Build carbon-14, the isotope used to date ancient bones and wood.
3. Build calcium-44, the heaviest nucleus these sliders can reach.

## Intuition

Picture tipping a bag of marbles onto a table: however many you pour out, they settle into a pile with roughly the same crowding everywhere, so a bigger pile is just a bigger ball, not a more squeezed one. Protons and neutrons behave the same way inside a nucleus. Drag "protons Z" and "neutrons N" up together and watch the ball on screen swell steadily — every nucleon you add takes up about the same room as the one before it.

What changes the element is only the blue dots: the count of protons, Z, fixes which row of the periodic table you're building, from hydrogen (Z = 1) up to calcium (Z = 20). The grey dots, the neutrons, barely touch the chemistry at all — but pick the wrong number of them and the nucleus won't hold together forever. Carbon-12, six of each, sits unchanged for billions of years; carbon-14, six protons and eight neutrons, slowly falls apart, which is exactly what makes it useful for dating old bones.

## Formal

A nucleus with atomic number Z (its protons) and neutron number N has mass number A = Z + N, and its chemical identity is fixed entirely by Z; different values of N for the same Z are isotopes of that element, written with A over Z beside the symbol, such as ¹⁴₆C for carbon-14.

Because nucleons pack at essentially constant density, the nuclear radius grows with the cube root of A: $R = 1.2\,A^{1/3}$ fm, so a nucleus with eight times as many nucleons has only twice the radius, never eight times.

## Advanced

Whether a given (Z, N) pair is stable comes down to a balance: the short-range strong force binds every nearby nucleon pair together, while the long-range Coulomb repulsion between protons only gets worse as Z grows. That imbalance is why no stable nucleus exists with more than 82 protons, and why heavier stable nuclei need increasingly more neutrons than protons to dilute the repulsion.

## Derivation

1. Nucleons occupy roughly the same volume wherever they sit, packed together by the short-range strong force like marbles in a bag, so the nucleus's total volume grows in direct proportion to A.
2. A sphere's volume goes as the cube of its radius, so if volume is proportional to A then the radius cubed is too — which means the radius itself grows as the cube root of A.
3. Measuring real nuclei fixes that constant of proportionality at 1.2 femtometres, giving the formula R = 1.2·A^(1/3) fm.

## Real world

### Medical imaging
Technetium-99m, with 43 protons, is made fresh in hospitals and decays with a half-life of just 6.0 hours, so it lights up a scan and then clears the body quickly.

### Nuclear fuel
Uranium-235 and uranium-238 are chemically identical, but only the rarer U-235 splits easily enough to fuel a reactor; the far more common U-238 is nearly inert as a fuel, with a half-life of 4.47 billion years — close to the age of the Earth.

### Radiocarbon dating
Every living thing keeps trading carbon with the air, including a tiny steady fraction of carbon-14. Once it dies, that C-14 decays away with a half-life of 5,730 years, so archaeologists count what's left to date old bones and wood.

### Treating thyroid disease
Iodine-131, with a half-life of 8.02 days, collects in the thyroid gland and is used both to image it and, at higher doses, to treat an overactive thyroid.
