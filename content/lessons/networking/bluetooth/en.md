---
title: 'Bluetooth: 1600 escapes per second'
summary: >-
  Your phone and your earbuds agree on a secret dance across 79 radio channels
  and jump 1600 times a second — so even a gym full of rival gadgets can never
  pin them down for long.
parameters:
  k: k — other Bluetooth pairs sharing the room
  r: r — hops per second (the sim slows the dance down so you can watch)
variables:
  - the chance that any given hop is ruined by a rival
  - how many rival pairs are hopping around you
---

## Try it

1. Leave k = 5 and watch the band: your phone and earbud light up the same channel on every hop — both computed it from the pairing secret, nobody announced it.
2. Raise k to 20: rivals now land on your channel roughly every fourth hop and the column flashes red — and on the very next hop, a fraction of a millisecond later, the packet simply goes again.
3. Drop k to 0 and slow r down: an empty room never collides, and you can watch the hop sequence calmly stepping through the band.

## Real-life examples

- **Earbuds in a quiet flat.** Five other pairs around: barely 6% of hops clash, and the instant retries hide every one of them — the music never stutters.
- **A packed gym.** Twenty pairs at full tempo: roughly one hop in four is ruined, yet audio still flows — 1600 hops a second leaves plenty of clean ones.
- **Alone at home.** No rivals, slowed right down: watch the pseudo-random walk itself, the same walk both your devices recompute in lockstep.

## Test yourself

1. With at least 5 rival pairs in the room, keep the collision chance at 7% or below.
2. Pack the room with 20 pairs and confirm the collision chance still stays under 25%.
3. Empty the room completely: zero rivals, zero collisions.

## Intuition

Try holding a conversation on a single walkie-talkie channel at a crowded fairground and someone will trample over you within seconds. Bluetooth's answer is not to fight for a channel but to flee across all of them: your phone and earbud carve the 2.4 GHz band into 79 lanes and switch lanes 1600 times every second, following a dance both sides computed from the secret they exchanged when you paired them. On screen, the highlighted column is the lane of the current hop — notice that both devices always pick the same one without ever announcing it.

Rivals doing their own dances will sometimes land on your lane, and the sim flashes red when they do. The trick is that a collision is not prevented but made cheap: one ruined hop costs 625 microseconds, the retry rides the next hop on a fresh lane, and your ears never notice. Raise k and watch the red flashes multiply while the music, in effect, keeps playing.

## Formal

Bluetooth classic divides the 2.4 GHz band into 79 channels of 1 MHz and hops pseudo-randomly at 1600 hops per second; the sequence is derived from the master device's address and clock, which the pairing handshake shares, so both sides stay in sync without coordination traffic.

If each of $k$ rival pairs sits on an effectively random channel, a given hop survives only if all of them miss yours: $P = 1 - \left(1 - \frac{1}{79}\right)^{k}$, roughly $\frac{k}{79}$ when $k$ is small — a graceful, linear degradation instead of a cliff.

## Advanced

Modern Bluetooth refines the dance: adaptive frequency hopping notices channels that keep failing — a neighbour's Wi-Fi network, a microwave oven — and quietly strikes them off the hop list, so the formula's 79 shrinks to the healthy channels only. Bluetooth Low Energy redraws the band as 40 wider channels and sleeps between hops, which is how a fitness tracker lasts weeks on a coin cell. The short range is a feature, not a weakness: at a few milliwatts of transmit power, the whole dance fades within metres, so thousands of pairs can share one city block.

## Derivation

1. One rival pair lands on any given channel with chance $\frac{1}{79}$.
2. All $k$ rivals miss your channel with chance $\left(1 - \frac{1}{79}\right)^{k}$.
3. So a hop is ruined with chance $P = 1 - \left(1 - \frac{1}{79}\right)^{k}$ — and the retry lands a fraction of a millisecond later on a fresh channel.

## Real world

### Earbuds, watches and keyboards
Everything short-range and battery-powered rides this dance — the hop sequence is why your earbuds work on a train full of other earbuds.

### Hands-free in cars
The car and phone pair once, then recompute the same dance every drive, immune to the parking lot's other radios.

### Contact-tracing and beacons
Low-energy Bluetooth broadcasts tiny hops of presence, letting phones notice each other without connecting at all.

### Sharing the band with Wi-Fi
Bluetooth, Wi-Fi and microwave ovens all crowd into 2.4 GHz — frequency hopping is how Bluetooth stays polite and survives.
