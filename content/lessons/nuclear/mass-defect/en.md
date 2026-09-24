---
title: Mass defect
summary: Weigh four separate hydrogen-ish pieces, weigh the helium nucleus they can form, and the nucleus is lighter — that missing mass didn't vanish, it left as 28.3 MeV of energy.
parameters:
  Z: protons Z
  N: neutrons N
variables:
  - 'atomic number: how many protons the nucleus has'
  - 'neutron number: how many neutrons sit alongside them'
  - 'the mass of one free proton, 1.007276 u'
  - 'the mass of one free neutron, 1.008665 u'
  - 'the actual measured mass of the whole nucleus, once bound together'
  - 'the mass defect: the missing mass — the separate protons and neutrons'' total mass minus the nucleus''s actual mass'
  - 'the binding energy: the missing mass converted into energy, at 931.5 MeV for every atomic mass unit (u) that goes missing'
charts: []
---

## Try it

1. Watch the balance scale. The left pan holds Z separate protons and N separate neutrons; the right pan holds the single nucleus they'd form.
2. Drag "protons Z" and "neutrons N" up to 2 and 2 — helium-4. Watch the right pan tip up, lighter, and the flash beside it show the energy that missing mass became.
3. Now drag Z and N up toward carbon (6 and 6, then 6 and 8). Watch the flash grow — more nucleons, more missing mass, more energy.

## Real-life examples

1. **Helium-4, the classic worked example.** Two protons and two neutrons bind into a nucleus about 28.3 MeV lighter than the free particles — the single most quoted number in nuclear physics.
2. **Carbon-12, the reference isotope.** Six protons and six neutrons bind into the very nucleus whose mass, by definition, is exactly 12 atomic mass units.
3. **Carbon-14, two neutrons heavier.** The same six protons, but with eight neutrons instead of six — the radioactive isotope used to date bones and charcoal.

## Test yourself

1. Build helium-4 on the scale: Z = 2, N = 2.
2. Build carbon-12: Z = 6, N = 6.
3. Build carbon-14: Z = 6, N = 8.

## Intuition

A free proton has a mass of 1.007276 u, and a free neutron 1.008665 u — measure either one alone, on its own, and that's what a scale reads. Now bind two of each together into a helium-4 nucleus and weigh the result: instead of the 4.03188 u you'd get by just adding the four masses, the scale reads about 4.00150 u. The missing 0.0304 u didn't fall out and roll under the table — it left as energy, radiated away the instant the nucleus formed, and $E = mc^2$ says exactly how much: 931.5 MeV for every atomic mass unit that goes missing, so 0.0304 u becomes about 28.3 MeV.

Drag "protons Z" and "neutrons N" higher, toward carbon, and the same thing keeps happening, only more of it: more nucleons means more pairs held together by the strong force, so more mass goes missing and the flash beside the right-hand pan grows. That missing-mass energy is exactly the binding energy from the sister lesson on binding energy per nucleon — two names for the same number, one counted in mass, one in energy.

## Formal

Mass-energy equivalence says a mass difference converts directly to energy at a fixed rate, $E_b = 931.5\, \Delta m$, once $\Delta m$ is measured in atomic mass units (u) and $E_b$ in MeV. Here $\Delta m$ is the mass defect: the total mass of the separated pieces minus the nucleus's own measured mass.

Building a nucleus of Z protons and N neutrons, the pieces alone weigh $Z m_p + N m_n$. If the finished nucleus has measured mass $M$, the defect is $\Delta m = (Z m_p + N m_n) - M$, and $E_b = \Delta m\, c^2$ is the energy that left when the nucleus formed — the same $E_b$ the binding-energy curve plots per nucleon.

## Advanced

The same missing-mass accounting explains why a fission or fusion reaction releases energy: add up the exact masses of everything going into the reaction and everything coming out, and the products always weigh very slightly less. Multiply that mass difference by 931.5 MeV/u and the answer matches the measured energy release to remarkable precision — mass-energy equivalence is not an approximation here, it is the calculation.

## Derivation

1. Weighing the separated pieces alone gives $Z$ proton masses plus $N$ neutron masses, before anything has bound together.
2. Weighing the actual nucleus gives a smaller number $M$; the difference between the two weighings is the mass defect.
3. Einstein's mass-energy relation converts that missing mass directly into the binding energy released when the nucleus formed, using 931.5 MeV for every atomic mass unit.

## Real world

### Nuclear power and weapons
Both convert a measurable slice of missing mass into energy — a reactor slowly and steadily, a weapon in a single burst — using exactly the accounting on this scale.

### Defining the atomic mass unit
Carbon-12's mass is fixed at exactly 12 u by international agreement, which is precisely why building the mass-defect scale from Z and N and converting through 931.5 MeV/u works for every other nucleus.

### The Sun's energy budget
Every second, the Sun converts about four million tonnes of mass into the sunlight and heat that reach the solar system, fusing hydrogen into helium and losing a tiny fraction of the mass each time.

### Precision mass spectrometry
Physicists measure nuclear masses to better than one part in a billion specifically so mass-defect calculations like this one can be trusted to predict real reaction energies.
