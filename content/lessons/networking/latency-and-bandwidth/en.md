---
title: 'Latency vs bandwidth: the length and width of the road'
summary: >-
  "Fast internet" means two unrelated things — how long the road to the server
  is, and how many lanes it has — and buying more lanes does nothing for a
  gamer stuck on a long road.
parameters:
  L: L — the round trip to the server and back
  B: B — the line's bandwidth, how many lanes
  S: S — the file being downloaded
variables:
  - the total time until the download finishes
  - the round-trip latency
  - the bandwidth
  - the file size
---

## Try it

1. Watch the two stopwatches with the defaults: the ping rider only cares how long the road is, the convoy below mostly cares how many lanes it has.
2. Set the fibre preset, then drag L up to 600 without touching B: the gamer's stopwatch turns red while the downloader barely notices — same line, opposite verdicts.
3. Now starve B down to 10 with L back at 40: the downloader suffers and the gamer is perfectly happy. The two numbers answer different questions.

## Real-life examples

- **Fibre in the city.** 10 ms to the server on 500 Mbps: pages feel instant and a 100 MB game patch streams in under two seconds.
- **Satellite internet.** The signal climbs to orbit and back — 600 ms round trip even at 200 Mbps. Movies stream beautifully; video calls and games feel like talking across the Moon.
- **Old DSL.** A short 40 ms road with only 10 lanes: clicking feels fine, but that same 100 MB patch now takes a minute and twenty seconds.

## Test yourself

1. Build a gamer's dream line: at most 20 ms with at least 400 Mbps.
2. Get the whole 100 MB file (or more) delivered in 2 seconds — lanes are what you need.
3. Build the satellite paradox: 500 ms or worse on a line of 500 Mbps or better — huge pipe, terrible conversation.

## Intuition

"Is your internet fast?" is secretly two questions. The first: when you knock on a server's door, how long until you hear the knock answered? That is latency — the length of the road — and it is paid on every click, every keystroke in a video call, every shot in a game. The second: once data starts flowing, how much arrives per second? That is bandwidth — the width of the road — and it is what the convoy of trucks carrying a movie cares about.

The road on screen makes the two independent: drag L and the road stretches; drag B and lanes appear. The ping rider is one motorbike going there and back — adding lanes cannot help a single rider, only a shorter road can. The convoy is the opposite: it hardly minds the length, because once trucks are streaming nose-to-tail, only the number of lanes sets the rate. This is why a provider can honestly sell you "ten times faster internet" that does nothing for your game: they widened the road, but your bullets still travel its full length.

## Formal

The time to fetch a file of $S$ megabytes over a line of $B$ megabits per second with round-trip latency $L$ milliseconds is, to a first approximation, $T = \frac{L}{1000} + \frac{8S}{B}$: one round trip to ask, then a stream whose duration depends only on size over rate (the factor 8 converts bytes to bits).

The two terms do not trade against each other. For a tiny request ($S \approx 0$) the formula collapses to $T \approx \frac{L}{1000}$ — pure latency, which is why games and calls specify ping, not megabits. For a huge file the second term dominates and latency becomes a rounding error. Real transfers add a subtlety: a connection starts cautiously and accelerates over several round trips, so high latency also slows the *start* of big downloads — one more reason short roads matter.

## Advanced

Latency has a hard floor that no money removes: light in glass fibre travels at about two-thirds of $c$, roughly 200,000 km/s, so a round trip across 6,000 km of fibre costs 60 ms before a single router has done any work. That is why serious systems move the *server* instead of speeding the line — the CDN lesson next door is exactly this trick. Bandwidth, by contrast, is an engineering variable: lay more fibre, use better encodings, and it multiplies. The asymmetry explains a decade of internet history: bandwidth grew a thousandfold while latency barely moved, and whole protocols (HTTP/2, QUIC) exist mainly to spend fewer round trips.

## Derivation

1. Nothing can arrive before a request has crossed to the server and the first byte has crossed back: that costs $\frac{L}{1000}$ seconds regardless of the line's width.
2. The file itself is $S$ megabytes, i.e. $8S$ megabits, and the line moves $B$ megabits each second — so the stream takes $\frac{8S}{B}$ seconds.
3. Together, $T = \frac{L}{1000} + \frac{8S}{B}$: a latency term that only shrinks with shorter roads and a bandwidth term that only shrinks with wider ones.

## Real world

### Online games
A game sends tiny packets constantly; its whole feel is the $L$ term. Competitive players hunt for servers under 30 ms and could not care less about their megabits.

### Video calls
A conversation falls apart when replies lag ~200 ms behind; the video itself needs only a few Mbps. Calls are latency creatures, not bandwidth ones.

### Streaming movies
The player buffers ahead, hiding latency completely — streaming quality is almost purely a bandwidth question, which is why satellite internet streams well.

### High-frequency trading
Firms lay private straight-line fibre between cities to shave single milliseconds — the clearest proof that the length of the road is worth real money.
