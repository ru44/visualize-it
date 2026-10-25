---
title: 'TCP: a reliable promise over an unreliable line'
summary: >-
  The wire is allowed to drop whatever it likes — reliability is an act of
  stubborn bookkeeping: send numbered pieces, demand a tiny thank-you note for
  each, and resend anything that goes unthanked.
parameters:
  loss: loss — how much of everything the line drops
  ack: ack — the thank-you notes (1 TCP, 0 UDP)
variables:
  - expected sends per delivered packet
  - the chance one packet is dropped
---

## Try it

1. With the defaults, find the stripe that died in the storm: no thank-you note came back for it, so the sender quietly sent it again — and the picture on the right is whole anyway.
2. Flip ack to 0 and raise loss a little: the same storm now leaves permanent holes in the picture, because nobody is keeping books.
3. Push loss to 40 with ack back on: the picture still arrives complete — later and at the cost of many resends, but complete. Read E: at 40% loss, each packet costs 1.67 sends on average.

## Real-life examples

- **A file download on home Wi-Fi.** A few percent of packets die to interference; TCP's notes and resends mean your zip file still hashes perfectly — you never even hear about the losses.
- **A video call.** Calls run on UDP on purpose: a resent syllable would arrive too late to be worth hearing, so the call accepts a crackle instead of a delay.
- **Hotel Wi-Fi at conference time.** 40% loss, and your email still sends — slowly. The protocol converts a terrible line into a slow-but-perfect one.

## Test yourself

1. Keep the thank-you notes on through a storm of 30% or worse and verify the picture still completes.
2. Turn the notes off at 20% loss or worse and count the permanent holes.
3. Calm the storm to 0% and notice TCP's bookkeeping costs almost nothing when nothing goes wrong.

## Intuition

The internet's wires make no promises — a congested router simply drops your packet on the floor, and nothing beeps. So how does a bank transfer ever arrive intact? Not because the line is good, but because the two ends refuse to trust it. The sender numbers every piece. The receiver sends back a tiny thank-you note — an acknowledgement — for each piece it gets. And the sender keeps every piece until it is thanked for it; a piece unthanked for too long is simply sent again, as many times as it takes.

That is the entire trick on screen. Drag the storm up and watch it in action: drops happen, notes fail to appear, resends fill the gaps, and the picture on the right always completes. Then flip to UDP — same storm, no books — and the holes become permanent. Neither mode is "better": the resent stripe of a photo is priceless, but a resent quarter-second of a phone call would arrive after the conversation had moved on. The internet ships both, and every app picks the promise it needs.

## Formal

If each transmission attempt independently survives with probability $1-p$, the number of tries until a packet gets through follows a geometric distribution with mean $E = \frac{1}{1-p}$. At 10% loss that is a modest 1.11 sends per packet; at 50% it doubles to 2 — reliability degrades gracefully rather than collapsing.

TCP's real machinery layers onto this: acknowledgements are cumulative ("I have everything up to byte n"), a sliding window keeps many packets in flight at once rather than one, and the retransmission timer adapts to the measured round-trip time. The combination turns the raw, lossy datagram service of the packet-switching lesson into the clean illusion every application above it enjoys: a pipe where bytes come out exactly as they went in.

## Advanced

A dropped packet carries a second meaning: on wired networks, loss almost always means a router queue overflowed — the network politely screaming "too fast". So TCP treats every loss as a congestion signal and halves its sending rate, then creeps back up. Millions of strangers' connections, all backing off and probing in this same rhythm with no coordinator, is what keeps the shared mesh from gridlock — the flip side of the "dumb core, smart edges" bet. The notion is so load-bearing that its failure mode is famous: on early Wi-Fi, where loss was mostly radio noise rather than congestion, TCP slowed down pointlessly, and link-layer retries had to be invented to hide the noise from it.

## Derivation

1. One attempt delivers the packet with probability $1-p$; with the notes on, failure is always noticed and triggers another attempt.
2. Independent retries until first success average $\frac{1}{1-p}$ attempts — the geometric distribution's mean.
3. At $p = 0.5$, that is $E = 2$: even a line losing half of everything only doubles the sending work, which is why TCP survives truly bad networks.

## Real world

### Everything that must be exact
Web pages, emails, downloads, bank transfers — all TCP: a single flipped or missing byte would corrupt them, so they buy the promise.

### Everything that must be now
Calls, game movement, live video run on UDP and simply absorb small losses — lateness is worse than a glitch.

### QUIC, the modern blend
HTTP/3 runs on QUIC: UDP underneath, with TCP-style numbering and acknowledgement rebuilt on top, plus encryption — the same bookkeeping, relocated.

### Space probes
Deep-space links use the same resend logic with hours-long round trips — the mathematics of unthanked pieces does not care about distance.
