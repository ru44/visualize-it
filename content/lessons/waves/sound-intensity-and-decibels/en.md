---
title: Sound intensity and decibels
summary: >-
  Sound spreads out and fades with distance the way light from a bulb does,
  and the decibel scale turns that fading intensity into the loudness numbers
  used from a 30 dB whisper to a 120 dB jet, and the levels that damage hearing.
parameters:
  dB0: source level at 1 m
  r: distance r
variables:
  - sound level in decibels, and the source's level at 1 m
  - sound intensity, and the faintest audible intensity
  - source power
  - distance from the source, and the reference distance 1 m
---

## Try it

1. Read the decibel readout close to the source, then drag the distance slider r outward. The level drops as you move away.
2. Raise the source level slider dB0 to see how a louder source shifts the whole curve upward at every distance.
3. Watch the safety marker: once the readout crosses 85 dB it flags prolonged exposure as risky, and past 120 dB it flags immediate danger.

## Real-life examples

1. **A whisper close to your ear.** A very quiet source right next to you (dB0 = 30, r = 1 m) sits at the whisper level, easily heard in a quiet room.
2. **Standing near a busy street.** A source as loud as a passing engine at close range (dB0 = 90, r = 5 m) still reaches a level loud enough to make conversation difficult.
3. **A jet at a distance.** Even a hundred metres from a jet engine (dB0 = 140, r = 100 m), the level stays high enough to risk hearing damage without protection.

## Test yourself

1. Find a distance where the level drops to exactly the 85 dB long-exposure damage threshold.
2. Find a distance where the level reaches the 120 dB immediate-danger threshold.
3. Move far enough away that the level drops below 30 dB, as quiet as a whisper.

## Intuition

Stand near a loudspeaker and it can be uncomfortably loud; walk halfway across the room and it sounds noticeably quieter, even though the speaker itself has not changed. Sound spreads outward from its source in every direction, so the same total energy is stretched over an ever-larger sphere as it travels — twice as far away, the sound's energy is spread over four times the area, so each patch of that sphere (including your ear) receives only a quarter as much.

Because that intensity range is so enormous — a whisper and a jet engine differ by a factor of roughly a trillion in raw intensity — loudness is measured on a compressed decibel scale instead of a plain intensity number. Every extra 10 dB means ten times the intensity, but because of how the ear perceives it, roughly twice as loud to a listener; every 20 dB corresponds to the sound source being ten times farther away or ten times closer.

## Formal

Sound level in decibels is defined as $\beta = 10\log_{10}(I/I_0)$, comparing a sound's intensity $I$ against the faintest intensity a human ear can detect, $I_0$. Because a source's power $P$ spreads over a sphere of area $4\pi r^2$, intensity falls off as $I = P/(4\pi r^2)$, an inverse-square law.

Combining the two gives the level at any distance directly from the level at a 1 m reference distance: $\beta(r) = \beta_0 - 20\log_{10}(r/r_0)$. Doubling the distance from a source always drops the level by about 6 dB, regardless of how loud the source is to begin with.

## Advanced

Hearing damage depends on both level and exposure time: continuous exposure above roughly 85 dB for a full working day is considered risky, but the same 85 dB for a few minutes is generally safe, while a single burst above about 120–140 dB can cause immediate, permanent damage regardless of duration — which is why the decibel scale alone does not fully capture hearing risk without also asking "for how long?"

## Derivation

1. A source's power spreads over an expanding sphere, so intensity falls off as $I = P/(4\pi r^2)$.
2. Sound level compares that intensity against the faintest audible intensity on a logarithmic scale, $\beta = 10\log_{10}(I/I_0)$.
3. Combining the two turns distance directly into a change in level from a known reference, $\beta(r) = \beta_0 - 20\log_{10}(r/r_0)$.

## Real world

### Hearing protection standards
Workplace safety rules limit how long workers may be exposed to sound above about 85 dB without ear protection, roughly halving the allowed time for every extra 3 dB.

### Noise-cancelling headphones
Headphones measure incoming sound and generate an opposite wave to cancel it, most effective against the low, steady hum where decibel levels are easiest to predict and match.

### City noise ordinances
Many cities set decibel limits on construction and traffic noise at certain hours, measured with the same logarithmic scale used here.

### Concert and venue sound limits
Live music venues often cap sound levels near the stage to protect both audiences and performers from levels that, sustained for hours, risk lasting hearing damage.
