---
title: The Doppler effect
summary: >-
  A siren sounds higher-pitched as it races toward you and lower-pitched as
  it speeds away — the same shift that lets a radar gun read a car's speed.
parameters:
  f: siren frequency f
  vs: source speed vs
variables:
  - the siren's own frequency, un-shifted
  - the speed of sound
  - the source's speed
  - the observer's speed
  - the frequency you actually hear, approaching, receding, and in general
---

## Try it

1. Watch the circles spread out from the moving siren. Ahead of it they crowd together; behind it they spread apart.
2. Raise the source speed slider vs. The crowding ahead gets tighter, and the front readout frequency climbs higher.
3. Compare the two readouts: the frequency ahead of the siren is always higher than its true pitch, and the frequency behind it is always lower — by amounts that grow as vs grows.

## Real-life examples

1. **An ambulance passing by.** At a typical driving speed (f = 500 Hz, vs = 20 m/s), the siren's pitch noticeably rises as it approaches and drops as it passes.
2. **A fast car horn.** Near highway speed (f = 800 Hz, vs = 35 m/s), the pitch shift is sharper and easier to hear.
3. **A slow train horn.** At walking-to-jogging speed (f = 300 Hz, vs = 5 m/s), the shift is small but still measurable in the readouts.

## Test yourself

1. Make the frequency heard ahead of the source 10% higher than its true pitch.
2. Make the frequency heard behind the source 10% lower than its true pitch.
3. Push the source to its top speed, 40 m/s.

## Intuition

Stand by the road as an ambulance drives past with its siren on: as it approaches, the pitch sounds higher than the siren really is; the instant it passes you, the pitch drops to sound lower than its true note. The siren itself never changes pitch — what changes is how often each new wave crest reaches your ear, because the ambulance is chasing its own sound waves forward and running away from the ones behind it.

Ahead of a moving source, each wave crest is emitted a little closer to where the last one was, so crests arrive at a listener more often than the source's true frequency — a higher pitch. Behind the source, each crest is emitted a little farther from where the last one was, so crests arrive less often — a lower pitch. The faster the source moves, the more squeezed the crests ahead become and the more stretched out those behind become, which is exactly what the circles on screen show.

## Formal

For a source moving at speed $v_s$ through a medium where sound travels at speed $v$, a stationary listener ahead of it hears $f_1 = f\,v/(v - v_s)$, and one behind it hears $f_2 = f\,v/(v + v_s)$, both higher and lower respectively than the source's true frequency $f$.

The fully general formula also allows the listener to move, at speed $v_o$: $f_D = f\,(v \pm v_o)/(v \mp v_s)$, with the upper sign used when observer and source move toward each other and the lower sign when they move apart. In this lesson the listener stands still, so $v_o = 0$ and the formula reduces to the two cases above.

## Advanced

A radar speed gun uses the Doppler effect twice over: it sends out a radio wave of known frequency, which a moving car reflects back Doppler-shifted once by the car's own motion, and the gun itself receives that reflection Doppler-shifted a second time — the resulting frequency shift is therefore about twice what a single one-way shift would give, and it is this doubled shift that the gun's electronics convert directly into a speed reading.

## Derivation

1. Ahead of the source, each successive wave crest starts closer to the listener, raising the frequency to $f_1 = f\,v/(v-v_s)$.
2. Behind the source, each successive crest starts farther from the listener, lowering the frequency to $f_2 = f\,v/(v+v_s)$.
3. Allowing the listener to move too gives the general formula, $f_D = f\,(v \pm v_o)/(v \mp v_s)$.

## Real world

### Ambulance and emergency sirens
The classic rising-then-falling pitch of a passing siren is the Doppler effect in its purest everyday form.

### Radar speed guns
Police radar measures a reflected radio wave's Doppler shift off a moving car to read its speed directly.

### Weather radar
Doppler weather radar measures the shift in radio waves bounced off raindrops to read the wind speed inside a storm, spotting rotation that can signal a tornado.

### Astronomy and redshift
Light from a star or galaxy moving away from Earth is stretched to lower frequencies (redshifted), letting astronomers measure how fast it is receding using the same Doppler principle.
