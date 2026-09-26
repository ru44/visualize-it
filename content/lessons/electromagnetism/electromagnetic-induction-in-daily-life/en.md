---
title: Electromagnetic induction in daily life
summary: >-
  An induction hob, a wireless charging pad, and a metal detector all do
  the exact same trick as a generator — a changing magnetic field pushing
  current through a nearby loop — just at frequencies far too high to spin.
parameters:
  B: the alternating field's strength B
  A: area of the loop it induces current in A
  f: how fast the field alternates f
  R: resistance of that loop's current path R
variables:
  - the induced voltage's rms (effective) size
  - power delivered into the loop's resistance
---

## Try it

1. The picture shows a small coil driving an alternating field through a nearby conducting loop — a pan, a phone's receiver coil, or a buried coin — and a heat/signal gauge showing what comes out.
2. Drag «how fast the field alternates f» up. The power shoots up fast: double the frequency and the power quadruples, because it depends on $f^2$.
3. Now drag «resistance R» — notice a *lower* resistance path (like a pan's solid steel) turns the same induced voltage into far more heating power, while a higher-resistance path barely warms up at all.

## Real-life examples

1. **An induction hob heating a steel pan.** A ~25 kHz field of about 5 mT over a 3 cm² patch of pan, with a very low resistance path (~0.0001 Ω): roughly 280 W dumped into that one small patch as heat — a real hob sums many such patches to reach its full ~2 kW rating. (This single-loop model is a simplified estimate; a real pan's eddy currents are far more complex.)
2. **A wireless (Qi) phone charger.** A weaker 2 mT field at 150 kHz over a 10 cm² receiver coil, with a higher-resistance circuit (~0.24 Ω) that delivers useful power rather than just heat: about 7.4 W — a typical phone-charging rate.
3. **A handheld metal detector sweeping over a coin.** A tiny 0.1 mT field at 7 kHz over a coin-sized 1 cm² loop: an induced signal of only about 0.3 millivolts — far too small to feel, but easily amplified electronically into a beep.

## Test yourself

1. Build an induction-hob-strength heater, delivering around 300 W into one small patch.
2. Tune to the wireless-charging range (100–200 kHz) and deliver between 5 and 10 W, a realistic phone-charging rate.
3. Drop the frequency to 10 kHz or below, like a metal detector, but still induce a signal above 0.1 millivolts.

## Intuition

Every device here runs on the same idea as the generator in the last two lessons: a changing magnetic field pushes current around any nearby closed loop of conductor, by Faraday's law. A generator does this on purpose, at a leisurely 50–60 Hz, driven by a spinning coil. These devices do it electronically instead, switching current through a coil tens or hundreds of thousands of times a second — far faster than any motor could spin — because higher frequency means a far bigger induced signal for the same field strength.

What differs between the three examples is only what happens to that induced current once it exists. In a pan on an induction hob, the loop is the metal itself, with a resistance so low that even a modest induced voltage drives a current that dumps real heating power straight into the pan — no wires, no contact, just the field. In a phone's charging coil, the same physics drives current into a proper circuit designed to store that energy in a battery rather than waste it as heat. And in a metal detector, the goal isn't power at all — a buried coin, wire loop, or ring becomes a tiny secondary source of field itself once current is induced in it, and the detector's electronics just need to notice that faint extra signal appearing.

## Formal

A sinusoidal field $B(t)=B\sin(2\pi f t)$ through a fixed loop of area $A$ induces, by Faraday's law, an emf $\varepsilon(t)=AB\,2\pi f\cos(2\pi f t)$, with an rms value $\varepsilon_{rms}=\dfrac{AB\,2\pi f}{\sqrt2}$. Driving that emf through a resistance $R$ dissipates power $P=\dfrac{\varepsilon_{rms}^2}{R}$.

Because $\varepsilon_{rms}$ is proportional to $f$, the power $P \propto f^2$: doubling the operating frequency, with everything else fixed, quadruples the power delivered — which is exactly why these devices operate at tens or hundreds of kilohertz rather than mains frequency, where the same field would barely warm anything at all.

## Advanced

The low-resistance path that makes induction hobs so effective is a specific, deliberate case of what engineers usually call an unwanted "eddy current" loss — the same swirling currents that heat (and waste energy in) the iron cores of ordinary transformers and motors, which is why those cores are built from thin, electrically insulated laminations instead of one solid block of iron, precisely to keep this effect from happening where it isn't wanted.

## Derivation

1. A sinusoidal field through a fixed loop gives, by Faraday's law, an emf that is a cosine wave with amplitude proportional to the field's strength, the loop's area, and the frequency.
2. The rms value of that emf is its peak divided by the square root of two, the standard conversion for any sine or cosine wave.
3. Driving that rms emf through a resistance dissipates power equal to the emf squared divided by the resistance.

## Real world

### Induction hobs
Induction cooktops drive a coil under the glass surface at tens of kilohertz, inducing eddy currents directly in a ferromagnetic pan's base and heating it without ever making the cooktop itself hot.

### Wireless (Qi) charging
A transmitter coil in the charging pad and a receiver coil in the phone form a loosely coupled transformer through the air, typically running around 100–200 kHz.

### Metal detectors
A search coil's alternating field induces tiny eddy currents in any nearby metal object, which in turn creates its own faint field that the detector's receiver picks up and turns into a signal.

### Induction sealing and welding
Factories use the same high-frequency induction heating to seal foil-lined bottle caps and to weld or temper metal parts without any flame or direct electrical contact.
