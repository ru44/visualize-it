---
title: Transformers
summary: >-
  Two coils around the same iron core can step a voltage up or down just by
  having different numbers of turns — and that trick is the whole reason
  power lines run at hundreds of thousands of volts instead of 230.
parameters:
  Np: turns on the primary coil N_p
  Ns: turns on the secondary coil N_s
  Vp: voltage into the primary V_p
  P: power sent down the line P
  R: the line's resistance R
variables:
  - the voltage out of the secondary coil
  - the current the line carries
  - power lost to heat in the line's resistance
---

## Try it

1. The picture shows two coils wound on a shared iron core — count the loops: the primary (left) has «turns on the primary N_p», the secondary (right) has «turns on the secondary N_s» — plus a small power line below showing how much of the sent power turns to waste heat.
2. Drag «turns on the secondary N_s» up past «turns on the primary N_p». The output voltage climbs above the input: more turns on the secondary means a step-up transformer.
3. Now drag «voltage into the primary V_p» up, keeping the same power. Watch the line-loss bar shrink fast: sending the same power at a higher voltage needs far less current, and it's current — not voltage — that heats the line.

## Real-life examples

1. **A doorbell transformer.** 1000 turns down to 50, fed 230 V mains: about 11.5 V out — safe enough to run a doorbell or a toy train, off the wall socket.
2. **An 11,000 V distribution line carrying 1 MW.** Sent at this relatively low voltage through a 5 Ω line: current of about 91 A, and roughly 41 kW — about 4% of the power — is lost as heat before it even arrives.
3. **The same 1 MW sent at 400,000 V.** Same line, same power: current drops to about 2.5 A, and the loss falls to about 31 W — utterly negligible. This is why transmission lines run at such extreme voltages.

## Test yourself

1. Build a transformer that steps 230 V mains down to about 12 V, like a doorbell or bell-wire transformer.
2. Keeping the power near 1 MW and the line resistance near 5 Ω, get the transmission loss below 5 kW using voltage alone.
3. Starting from an 11,000 V generator, use the turns ratio to step the voltage up to at least 200,000 V for transmission.

## Intuition

Wrap two separate coils of wire around the same iron ring and feed AC into one of them (the primary): the changing current makes a changing magnetic flux in the iron, and that same flux threads through the second coil (the secondary) too, since they share the same core. By Faraday's law, a changing flux induces a voltage in any coil it passes through — so the secondary gets its own voltage, induced with no wires touching the primary at all.

Because both coils sit in the *same* changing flux, each turn of wire, on either coil, picks up exactly the same tiny voltage. Wind the secondary with more turns than the primary and you stack up more of those tiny voltages, so a bigger voltage comes out than went in — a step-up transformer. Fewer turns gives less voltage out — step-down. The catch (and it's a fair one): power in equals power out in an ideal transformer, so whatever voltage you gain, you lose in current, and whatever voltage you lose, you gain in current.

## Formal

For an ideal transformer, the voltage ratio equals the turns ratio: $\frac{V_s}{V_p}=\frac{N_s}{N_p}$, so $V_s = V_p\frac{N_s}{N_p}$. To send a fixed power $P$ down a line at voltage $V_p$, the current must be $I = \dfrac{P}{V_p}$ — and any real wire has some resistance $R$, dissipating $P_{loss}=I^2R=\left(\dfrac{P}{V_p}\right)^2R$ as heat.

Because $P_{loss}$ falls with the *square* of the voltage, doubling the transmission voltage cuts the loss to a quarter, and the 35-times jump from 11,000 V to 400,000 V (roughly the ratio in the second and third real-life examples) cuts the loss by roughly 35² ≈ 1,225 times.

## Advanced

Real transformers aren't perfectly ideal: the iron core itself loses a little energy to hysteresis and eddy currents (a small, unavoidable version of the very effect used deliberately by an induction cooktop), and the windings have their own small resistance — which is why large power transformers are cooled with oil or fans, even though they carry no moving parts at all.

## Derivation

1. Equal flux through every turn of both coils gives a voltage ratio equal to the turns ratio, so the secondary voltage follows from the primary voltage and that ratio.
2. Sending a fixed power at a given voltage fixes the current, since power is voltage times current.
3. That current, squared, times the line's resistance, gives the power lost to heat — so higher transmission voltage means lower current means less loss.

## Real world

### The power grid
Generators produce power at thousands of volts, step-up transformers push it to hundreds of thousands of volts for the long haul, and step-down transformers near your home bring it back to 230 (or 120) V.

### Phone and laptop chargers
Modern chargers use small, high-frequency switching transformers rather than the simple kind here, but the same turns-ratio idea is still at their core, just shrunk down and sped up.

### Doorbells and toy trains
Low-voltage transformers step 230 V mains down to a safe 6–24 V for doorbells, garden lighting, and model railways.

### Microphones and audio equipment
Small transformers are also used just to match voltage and current levels between different pieces of audio equipment, with no power gain at all.
