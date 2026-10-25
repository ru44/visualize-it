---
title: 'Packet switching: a letter torn into numbered pieces'
summary: >-
  The internet owns no telephone lines — it tears every message into numbered
  packets, lets each one find its own way through the mesh, and rebuilds the
  message at the far end, which is why cutting one cable cuts nothing.
parameters:
  S: S — the message being sent
  P: P — the most bytes one packet may carry
  cut: cut — break the top route (0 intact, 1 cut)
variables:
  - how many packets the message becomes
  - the message size
  - the packet size limit
---

## Try it

1. Watch the defaults: a 12 KB message becomes 8 numbered packets, odd ones riding the top route and even ones the bottom, arriving out of order onto the shelf that reorders them.
2. Drop P to 200 bytes: the same message shatters into 60 pieces — more envelopes, more addresses, more overhead, same letter.
3. Now set cut to 1: the top route dies mid-journey and every packet calmly reroutes through the bottom — nobody upstream had to be told.

## Real-life examples

- **A WhatsApp message.** A few KB tears into a handful of packets that may cross different continents and still assemble in order on your friend's phone.
- **An old undersea cable break.** Ships' anchors cut cables regularly; traffic reroutes in seconds and users notice, at most, a slightly longer road.
- **A video call.** Thirty times a second, each frame is diced into packets that race each other; the reassembly shelf is why the picture arrives whole.

## Test yourself

1. Make the message need exactly 8 packets.
2. Cut the top route and watch the reroute happen.
3. Shatter the message into at least 40 pieces using packets of 300 bytes or smaller.

## Intuition

The telephone network worked like a rented pipe: for the length of a call, a physical circuit from your mouth to your friend's ear belonged to you alone — reliable, and spectacularly wasteful, since the pipe sat idle in every pause. The internet's founding decision was the opposite: own nothing, share everything. Your message is torn into numbered pieces, each piece is stamped with the full destination address, and each is tossed into a mesh of routers that pass it along hop by hop, choosing the next hop fresh for every single packet.

The scene on screen is that decision made visible. No packet knows the route; it only knows the address, and each router it meets knows a good next step. Two packets of the same message may take different paths and arrive swapped — the numbered shelf at the receiver puts them straight. And when the top link dies, nothing announces it to the sender: the routers simply stop choosing it. The design was born under a military question — what network survives losing any single piece of itself? — and the answer is one where no piece is special.

## Formal

A message of $S$ kilobytes is $1000\,S$ bytes, and a network's links agree on a maximum transmission unit of $P$ bytes per packet, so the message travels as $k = \left\lceil \frac{1000\,S}{P} \right\rceil$ independent datagrams. Each carries a header with source, destination and a sequence position, which is what makes out-of-order arrival harmless.

Smaller $P$ means more packets and proportionally more header overhead — the reason the internet's standard MTU settled near 1500 bytes. Routing is stateless per packet: a router reads the destination, consults its table for the best next hop as the table stands *now*, and forwards. The table itself is kept fresh by routers gossiping about which links are up, so a cut propagates as new table entries, not as a broken promise to any particular message.

## Advanced

The trade hidden in the design is that sharing creates congestion: when everyone's packets converge on one link, router queues grow, delay grows with them, and eventually packets are simply dropped on the floor. The internet's answer lives at the edges — senders watch for loss and slow down (the TCP lesson next door), so the mesh itself can stay dumb and fast. "Dumb core, smart edges" is the internet's deepest architectural bet, and it is why a network designed when computers filled rooms carries video calls unchanged: new cleverness only ever had to be installed at the two ends.

## Derivation

1. A message of $S$ KB is $1000\,S$ bytes of payload that must all cross the network.
2. No single packet may exceed the agreed limit of $P$ bytes.
3. So the sender slices it into $k = \left\lceil \frac{1000\,S}{P} \right\rceil$ numbered packets — the ceiling because a final part-full packet still travels as a whole packet.

## Real world

### Cable cuts and earthquakes
Undersea cables fail constantly; routing tables update within seconds and traffic flows around the damage — the design goal, achieved daily.

### Mixed traffic on one wire
Your download, a neighbour's call and a stranger's game share each link packet by packet — no circuits, no reservations, just interleaved envelopes.

### Traceroute
Run traceroute to any site and it prints the actual hop-by-hop path your packets chose just now — often different from the path a minute ago.

### Satellite constellations
Starlink-style meshes reroute packets between moving satellites continuously: packet switching is what makes a network of moving parts even possible.
