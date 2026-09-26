---
title: Entanglement
summary: >-
  Two particles made together can be checked far apart and always agree,
  like two coins that always land the same way — yet neither one carries
  a hidden note telling it what to show, and no signal passes between
  them faster than light.
parameters:
  a: Alice's detector angle a
  b: Bob's detector angle b
  shots: number of pairs measured
variables:
  - Alice's detector angle
  - Bob's detector angle
  - the chance the two results agree
charts: []
---

## Try it

1. Set «Alice's detector angle a» and «Bob's detector angle b» to the same value. Every pair you measure below comes back matching — both "heads" or both "tails".
2. Set «Bob's detector angle b» exactly 180° away from «Alice's detector angle a». Now every pair comes back opposite.
3. Set «Bob's detector angle b» 90° away from «Alice's detector angle a» and raise «number of pairs measured» toward 500. The match rate settles at almost exactly one half.

## Real-life examples

1. **Aligned detectors, a = 0°, b = 0°.** Every single pair agrees, a certain match.
2. **Detectors 90° apart, a = 0°, b = 90°.** The pairs split roughly half matching, half not, like a fair coin.
3. **Opposite detectors, a = 0°, b = 180°.** Every single pair disagrees, a certain mismatch.

## Test yourself

1. Get the match chance to (very nearly) 1.
2. Get the match chance to almost exactly 0.5.
3. Push the two detector angles at least 170° apart.

## Intuition

A source in the middle of the lab creates pairs of particles together, in one shared state, and sends one member of each pair to Alice's box and the other to Bob's box. In 2017 a Chinese satellite sent entangled photon pairs to ground stations 1200 km apart, further than any wire could easily carry a useful signal, and the two ends still agreed exactly as this lesson's boxes do. Clicking "measure" makes Alice's box show a result and Bob's box show a result, and only comparing the two afterward — over an ordinary phone call, at or below the speed of light — reveals whether they match.

Looked at alone, Alice's results are a plain 50/50 coin flip no matter what «Bob's detector angle b» is set to, so Bob can never use his choice of angle to send Alice a message; the correlation only shows up once someone brings the two lists of results together. The physicist John Bell worked out that no scheme of "secretly pre-agreed answers" written into the particles at the moment they were made could reproduce the exact curve «Alice's detector angle a» and «Bob's detector angle b» trace out as you drag them — real entangled particles do something a shared secret note never could.

## Formal

The two detector angles are $\alpha$ for Alice and $\beta$ for Bob, and the chance both readings agree is $p = \cos^2\!\left(\dfrac{\alpha-\beta}{2}\right)$.

At $\alpha = \beta$ this gives $p = 1$, a guaranteed match, and at $\alpha - \beta = 180^\circ$ it gives $p = 0$, a guaranteed mismatch — the same two limits used to build the formula above.

## Advanced

A local hidden-variable model, in which each particle secretly carries a fixed pre-agreed answer for every possible angle, predicts a match rate that falls off in a straight line as the angle gap grows; Bell showed that quantum mechanics instead predicts the curved $\cos^2$ law measured here, and real experiments — closing every practical loophole by the 2010s — consistently match the curve, not the line, ruling out that kind of hidden note.

## Derivation

1. When both detectors point the same way, the shared state guarantees the same reading on both sides.
2. When the detectors point in exactly opposite directions, the shared state guarantees opposite readings.
3. Between those two extremes the match chance follows a smooth curve fixed only by the angle between the two detectors.

## Real world

### Quantum key distribution
Banks and governments already send secret keys over entangled-photon links; any eavesdropper who intercepts a photon disturbs the correlation in a way the two legitimate ends can detect.

### Quantum computers
Linking qubits with entanglement lets a quantum computer's measurements depend on each other in ways no ordinary computer's bits can, which is where a lot of its extra power comes from.

### Testing the foundations of physics
Bell's inequality turned "is nature secretly classical underneath?" from a philosophical question into a lab measurement, one of the most repeated and most decisively answered tests in physics.

### Satellite quantum networks
The Micius satellite experiment mentioned above is the first step toward a global network that shares entangled pairs between distant ground stations for secure communication.
