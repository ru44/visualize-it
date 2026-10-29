---
title: 'The Smith chart: a round map of how much of your signal bounces back'
summary: >-
  If the antenna does not match the cable, part of the signal bounces back. The Smith
  chart is a round map that shows how much, at a glance.
parameters:
  R: R — the antenna's resistance (the cable is 50 Ω)
  X: X — the antenna's reactance, + when it acts like a coil, − when it acts like a capacitor
  d: d — how far back from the antenna you look along the cable, in wavelengths
variables:
  - 'the reflection coefficient: what fraction of the wave bounces back (0 to 1) and with what delay (its angle)'
  - the antenna's impedance, R + jX, in ohms
  - the cable's characteristic impedance, 50 Ω in this lesson
  - 'the antenna divided by the cable: 100 + j50 Ω on a 50 Ω cable gives 2 + j1'
  - the resistance part of z, one circle on the chart for each value
  - the reactance part of z, one arc on the chart for each value
  - 'the imaginary unit: it marks the part of the impedance that delays the wave instead of eating its energy'
---

## Try it

1. Press "show the flat graph it came from" under the picture. The circle unrolls into an ordinary graph, resistance to the right and reactance up and down. Press again and watch it fold back, with infinity landing on the right edge.
2. Drag R to 50 and X to 0. The orange point reaches the centre and the bar turns fully green: nothing bounces back. Now push R to 250 or X far from 0 and watch the point slide toward the rim, where everything bounces.
3. Put R back to 100 and X to 50, then slide d from 0 to 0.5. The blue point rides around the dashed circle, one full turn, while the blue line on the cable walks back from the antenna. Stop at 0.125: the cable now reads 50 − j50 Ω.

## Real-life examples

- **A bent antenna.** An antenna of 100 + j50 Ω on a 50 Ω cable. Divided by 50 that is 2 + j1, so the point sits right of centre and above the axis. One fifth of the power bounces back, VSWR 2.6.
- **A TV antenna on the wrong cable.** TV antennas are made for 75 Ω cable. On 50 Ω, Γ is 0.2: only 4% of the power bounces back, VSWR 1.5. Good enough for most radios.
- **An eighth of a wavelength down the cable.** The same 100 + j50 Ω antenna, seen from d = 0.125. The point has turned a quarter of the way round and sits on the 50 Ω circle: the cable now reads 50 − j50 Ω. The resistance is right; only a coil's worth of +j50 is missing.

## Test yourself

1. Match the antenna to the cable so that less than 1% of the power bounces back.
2. Make exactly a quarter of the power bounce back (between 24% and 26%).
3. Keep the antenna at 100 + j50 Ω and walk back along the cable until the cable reads exactly 50 Ω of resistance.

## Intuition

A Wi-Fi router, a walkie-talkie, a radio station: each one pushes a wave down a cable into an antenna. The cable is built so that a wave travelling along it feels 50 ohms, the same push-back at every point, so the wave glides along without noticing anything. Now suppose the antenna at the end looks like 100 ohms. The wave arrives, finds the road suddenly different, and part of it bounces back toward the transmitter, like a shout echoing off a wall. With 100 ohms on a 50 ohm cable, a third of the wave's voltage comes back, which is one ninth of the power: about 11% never leaves the antenna. It travels back down the cable and heats the transmitter instead.

In the picture, the orange point is your antenna. The centre of the circle is 50 ohms, a perfect match: nothing bounces back. The further the point sits from the centre, the more of the wave bounces, and on the rim everything does. The left edge is a short circuit, 0 ohms, and the right edge is an open circuit, nothing connected at all. Every circle is one resistance R and every arc is one reactance X, so you can read any antenna off the chart. The bar on the right shows the same thing in green and red: what reaches the antenna and what comes back.

Where does the circle come from? Press the button under the picture and the chart unrolls into an ordinary graph: resistance to the right, reactance up and down. That graph never ends. An open circuit sits infinitely far to the right, and a big coil infinitely far up. The Smith chart bends that endless sheet so that all of infinity becomes one point on the rim and everything fits in a circle. Straight lines of equal resistance become circles, lines of equal reactance become arcs. Nothing is lost: it is the same graph, folded.

Now the part engineers love. Slide d and you walk back from the antenna along the cable. The blue point simply turns around the centre, one full turn every half wavelength, and never changes its distance from the centre. The echo is the same size anywhere along the cable; only its timing shifts. So a cable of any length is just a turn of the point, no algebra needed. And somewhere on that turn the point crosses the 50 ohm circle. There, one small coil or capacitor cancels what is left, and the match is perfect. That is how the antenna in every phone is tuned.

## Formal

The cable has a characteristic impedance $Z_0$, here 50 Ω. The antenna has an impedance $Z_L = R + jX$. The part of the voltage wave that bounces back is the reflection coefficient $\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0}$, a complex number. Its size $|\Gamma|$ says how much of the wave comes back, from 0 to 1, and its angle says how much the echo is delayed. The bounced power is the fraction $|\Gamma|^2$, so the 100 + j50 Ω antenna, with a size of 0.45, sends back 20% of the power. Along the cable the forward wave and the echo add where they agree and cancel where they disagree. The biggest voltage divided by the smallest is the VSWR, $\frac{1+|\Gamma|}{1-|\Gamma|}$, here 2.6.

Divide everything by the cable: $z = Z_L/Z_0 = r + jx$. The Smith chart is the plane of $\Gamma$ with the lines of constant $r$ and constant $x$ drawn on it. The line $r = 1$ becomes the circle through the centre and the right edge, and each value of $x$ becomes an arc ending on the rim. Seen $d$ wavelengths back from the antenna, the echo has travelled $2d$ further than the forward wave, so the point turns: $\Gamma(d) = \Gamma(0)\,e^{-j4\pi d/\lambda}$, clockwise, a full turn every half wavelength. The impedance the cable shows there is $Z = Z_0\,\frac{1+\Gamma}{1-\Gamma}$, and for the 100 + j50 Ω antenna at $d = \lambda/8$ that is 50 − j50 Ω.

## Advanced

Matching is reading the chart backwards. Walk along the cable until the point lands on the $r = 1$ circle, then add a series coil or capacitor to cancel the remaining $x$. Or add a short stub of cable in parallel, which is the same move on the admittance chart, the Smith chart turned by 180°. Engineers also quote the echo as return loss, $-20\log_{10}|\Gamma|$ in dB: 7 dB for our bent antenna, over 20 dB for a good match. A real cable loses a little on the way, so the point spirals inward as you walk, and a long lossy cable can hide a bad antenna.

Phillip Smith drew the chart in 1939 at Bell Labs, when every impedance calculation was done by hand and a complex division took minutes. Today a vector network analyser, or a cheap NanoVNA, draws it live: the dot is your antenna, and you tune until the dot sits in the centre. Amplifier designers draw stability and noise circles on it to pick the impedance a transistor wants to see. And the chart works at any frequency, because it is drawn in normalised units and wavelengths; only the point moves.

## Derivation

1. Divide the antenna's impedance by the cable's 50 Ω, so the cable itself becomes 1 and the same chart works for any cable.
2. The echo is the mismatch, $z - 1$, compared with the total, $z + 1$. A matched antenna, $z = 1$, gives no echo. A short circuit gives −1: the wave comes back upside down. An open circuit gives +1: it comes back as it was.
3. The forward wave and the echo add where they agree and cancel where they disagree. The biggest voltage over the smallest is the VSWR; a perfect match gives 1, a short or an open gives infinity.
4. Walking back along the cable, the forward wave is seen earlier and the echo later by the same distance, so their timing difference grows by twice the distance: $4\pi$ per wavelength, a full turn every half wavelength. The size of the echo stays the same, so the point turns on its circle.

## Real world

### Tuning a ham radio antenna
An antenna analyser shows a dot on a Smith chart. The operator trims the wire or turns a tuner until the dot sits in the centre, and the transmitter's power goes out instead of coming back.

### The antenna inside your phone
A phone antenna is a strip of metal a few centimetres long, far from 50 Ω on its own. A matching network of two or three tiny coils and capacitors, designed on this chart, moves its point to the centre for every band the phone uses.

### Protecting a transmitter
A 1 kW broadcast transmitter with a VSWR of 3 gets 250 W of its own power back as heat. Transmitters watch the VSWR and shut down above about 2, which is why a broken antenna cable is noticed within seconds.

### Ghosts on old TV screens
On analogue TV a mismatched cable sent part of the picture back and forth along the cable, arriving a little late: a faint second copy of the image, shifted to the right. The TV world settled on 75 Ω cable to keep those echoes small.
