---
title: 'VPN: a sealed pipe through a nosy network'
summary: >-
  Flip one switch and your internet provider's list of every site you visit
  collapses to a single entry — one encrypted pipe to a VPN server — at the
  price of a few wrapper bytes on every packet.
parameters:
  vpn: vpn — the tunnel switch (0 off, 1 on)
  h: h — wrapper bytes the tunnel adds to each 1500-byte packet
  B: B — your line's bandwidth
variables:
  - goodput, the speed your actual data still gets
  - the line's raw bandwidth
  - the tunnel's wrapper bytes per packet
---

## Try it

1. Start with vpn = 0 and read the ISP panel: every site you visit sits there in plain sight, because each packet must carry its destination on the outside to be delivered at all.
2. Flip vpn to 1: the packets seal into locked envelopes addressed only to the VPN server, and the ISP's list collapses to one encrypted line.
3. Now raise h and watch the bar at the bottom: the wrapper eats into your speed, G = B(1 − h/1500) — a small, honest fare for the privacy.

## Real-life examples

- **Hotel Wi-Fi, tunnel on.** 60 of every 1500 bytes go to the wrapper: 96% of the 100 Mbps line still carries your data, and the hotel's router learns nothing but "encrypted traffic to one server".
- **The same line, tunnel off.** Full speed and zero privacy: the free Wi-Fi's owner reads every destination you talk to, all evening.
- **A fast line, a lean tunnel.** 20 wrapper bytes on a 500 Mbps line keeps the goodput near 493 Mbps — modern tunnels cost almost nothing.

## Test yourself

1. Turn the tunnel on.
2. Keep the tunnel on and the goodput at 480 Mbps or better — you will need the big line and the leanest wrapper.
3. Turn the tunnel off again and look at the ISP panel: that is what "no VPN" means.

## Intuition

A network packet is like a postcard: whatever you write inside, the address must be readable on the outside, or no router could deliver it — so everyone along the way reads where you are going, even when the contents are sealed. A VPN is the trick of putting the postcard inside an envelope addressed to a trusted forwarding friend: the postal workers see only the friend's address, the friend opens the envelope and sends the postcard on, and the site that answers sees the friend's address instead of yours.

On screen, the friend is the VPN server, the envelope is the lock icon, and the eye is your internet provider — or the café's free Wi-Fi, or any network you do not own. Flip the switch and the eye's neat list of destinations collapses into one unreadable pipe. The fare for this is printed on the bottom bar: every envelope spends h of the packet's 1500 bytes on wrapping, so a little bandwidth is traded for a lot of privacy.

## Formal

Technically the envelope is encapsulation: the original packet, headers and all, is encrypted and placed as the payload of a new packet addressed to the VPN server. Routers along the way handle only the outer header, so the inner destination, ports and contents are invisible to them; the server decrypts and forwards the original, and replies travel the same pipe in reverse.

Packets have a fixed maximum size (1500 bytes on typical networks), so the $h$ bytes of outer header and cryptographic sealing come out of every packet's budget: $G = B\left(1 - \frac{h}{1500}\right)$. With $h = 60$ that is a 4% tax; bloated legacy tunnels approach $h = 120$, lean modern ones sit near $h = 20$.

## Advanced

A VPN moves trust rather than removing it: the VPN server now sees exactly what your ISP used to, so "which VPN" matters more than "whether VPN". The seal itself relies on the key-exchange magic from the cryptography hall — two machines that never met agree on a key over the open network (Diffie–Hellman), and fresh keys per session mean recorded traffic stays sealed even if a key leaks later. Corporate VPNs run the same pipe in reverse: not to hide from the network, but to place a remote laptop virtually inside the office's private subnet.

## Derivation

1. A network packet is at most 1500 bytes, and the tunnel's wrapper and lock take $h$ of them.
2. So each packet delivers only the fraction $1 - \frac{h}{1500}$ of real data.
3. On a line of bandwidth $B$, what your data actually gets is $G = B\left(1 - \frac{h}{1500}\right)$.

## Real world

### Public Wi-Fi
On a network you do not own — hotels, airports, cafés — the tunnel keeps the network's owner from reading your destinations.

### Working from home
Corporate VPNs put a remote laptop inside the office network, so internal servers that refuse the public internet still answer it.

### Crossing untrusted networks
Journalists and travellers use the pipe to keep local networks from logging, filtering or tampering with their traffic.

### What the VPN sees
The pipe ends at the provider's server — choosing a trustworthy one is the decision the whole scheme rests on.
