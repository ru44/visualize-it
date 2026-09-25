---
title: Capacitors
summary: >-
  A capacitor is a pair of plates that stores charge, Q = CV, and with it
  energy, ½CV² — a camera flash charges one slowly over seconds and then
  dumps its stored energy in a single bright millisecond pulse.
parameters:
  C: capacitance C
  V: voltage V
variables:
  - charge — how much charge sits stored on the plates, in coulombs
  - capacitance — how much charge the plates store for each volt across them
  - voltage — the potential difference charging the plates
  - energy — the total energy stored between the plates, in joules
charts: []
---

## Try it

1. Raise «voltage V». «Q = CV» climbs in a straight line — twice the voltage, twice the stored charge.
2. Raise «voltage V» again and watch «E». It climbs far faster than the charge does, because energy depends on voltage squared.
3. Raise «capacitance C» instead, keeping «voltage V» fixed. Both «Q» and «E» climb in a straight line this time — capacitance alone scales them evenly.

## Real-life examples

1. **Camera flash capacitor.** Charged to 300 V, a 150 µF capacitor stores 45 mC of charge and 6.75 J of energy, released almost instantly for the flash.
2. **Power-supply smoothing capacitor.** A 470 µF capacitor at a gentle 12 V stores only 5.64 mC and 0.0338 J — enough to smooth small ripples, not to flash anything.
3. **Studio flash capacitor bank.** A much larger 1000 µF capacitor charged to 330 V stores 330 mC and 54.45 J, enough for a far brighter professional flash.

## Test yourself

1. Store exactly 5 J of energy.
2. Store more than 0.2 C of charge while keeping the voltage under 250 V.
3. Keep the stored energy under 0.01 J while capacitance is at least 500 µF.

## Intuition

Think of a capacitor as two plates facing each other with a thin gap between them: push «voltage V» higher and more charge piles up on one plate, with an equal and opposite charge piling up on the other, exactly balanced so «Q = CV» holds at every setting. «capacitance C» is just how good the plates are at storing charge for a given push — bigger plates or a narrower gap between them both let more charge pile up for the same voltage.

Energy is where it gets interesting: doubling «voltage V» does not just double the stored energy, it quadruples it, because packing on the first bit of charge is easy, but each additional bit has to fight against all the charge already piled up ahead of it. That is why a camera flash charges its capacitor to a fairly high voltage rather than a low one — it is a far more effective way to pack in stored energy.

## Formal

The charge stored is proportional to voltage, with capacitance $C$ as the constant of proportionality: $Q = CV$, measured in farads, where $1\text{ F} = 1\text{ C/V}$.

The energy stored is $E = \dfrac{1}{2}CV^2$ — not simply $QV$, because the voltage across the plates rises from zero as they charge, so only the average voltage, half the final value, applies to the charge as a whole.

## Advanced

Real capacitors reach useful capacitances — microfarads, not picofarads — mainly by inserting a dielectric material between the plates, which lets far more charge pile up for the same voltage than air or vacuum alone would allow, and by rolling or stacking many layers of plate into a small package.

## Derivation

1. Charge stored is proportional to voltage, by the definition of capacitance: $Q = CV$.
2. While charging, the voltage across the plates rises steadily from 0 up to $V$, so the average voltage during the whole process is half the final value, giving energy as that average voltage times the total charge moved: $E = (V/2)Q$.
3. Substituting $Q = CV$ from the first step gives the energy purely in terms of voltage and capacitance: $E = \tfrac{1}{2}CV^2$.

## Real world

### Camera flashes
A flash charges its capacitor slowly, over a second or two, through a small current from the battery, then discharges nearly all of it in under a millisecond through the flash tube — a burst of power the battery alone could never deliver directly.

### Power supply smoothing
Capacitors placed across a DC power supply's output soak up small ripples, keeping the voltage steady even as the current drawn by the rest of the circuit changes moment to moment.

### Touchscreens
Capacitive touchscreens measure the tiny change in capacitance a finger causes at each point on the glass, since a finger's own conductivity briefly adds itself to the local plate area.

### Defibrillators
A medical defibrillator charges a large capacitor over several seconds and then discharges it through the chest in a fraction of a second, delivering far more instantaneous power than the battery inside it could supply on its own.
