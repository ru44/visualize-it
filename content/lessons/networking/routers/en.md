---
title: 'Routers: one address for the whole house'
summary: >-
  Every gadget in your home talks to the internet at once, yet the whole world
  sees a single address — the router is the clerk in the middle, rewriting
  every packet and remembering who asked for what.
parameters:
  p: p — prefix length of the home subnet (bigger p = smaller network)
  d: d — gadgets connected to the router
variables:
  - how many gadgets the private subnet can address
  - the prefix length, how many of the 32 address bits name the network
---

## Try it

1. Keep p = 24 and d = 4 and follow one packet: it leaves a coloured gadget, reaches the router, and continues to the cloud recoloured — outside the house, every packet wears the same public address.
2. Raise d to 8: more gadgets, more coloured packets, still one public address — the NAT table under the router is what keeps the replies from getting mixed up.
3. Now push p to 30: the private subnet shrinks to just 2 usable addresses and the house overflows — the prefix length alone decides how big a network is.

## Real-life examples

- **A normal home.** p = 24 gives 254 usable addresses — plenty for 4 gadgets today, with room for every lamp and doorbell still to come.
- **A point-to-point link.** p = 30 leaves exactly 2 addresses, the classic size for a cable joining two routers and nothing else.
- **A full smart home.** 8 gadgets on p = 24: however crowded it gets inside, only one public address ever leaves the building.

## Test yourself

1. Set the prefix so the subnet holds exactly 254 gadgets.
2. Shrink the subnet to exactly 2 usable addresses.
3. Fill the house: connect all 8 gadgets.

## Intuition

Think of an apartment building with one street address. Letters from every flat leave through the doorman, who stamps them all with the building's address and writes in his ledger which flat sent what — so when a reply arrives, he knows exactly which door to knock on. Your router is that doorman: on screen, each gadget's coloured packets turn into identical public packets at the router, and the NAT table below it is the ledger.

Inside the building, flats still need their own numbers: that is the private subnet, 192.168.1.x, invisible to the outside world. How many numbers exist is set by the prefix length $p$: of an address's 32 bits, the first $p$ name the network and the rest name the gadget, so the house can hold $H = 2^{32-p} - 2$ of them. Slide p and watch the capacity readout collapse from hundreds to two.

## Formal

An IPv4 address is 32 bits. A network is written as a prefix, like 192.168.1.0/24: the first $p$ bits are fixed for everyone inside, the remaining $32 - p$ bits are free, giving $H = 2^{32-p} - 2$ usable addresses — the two that are lost name the network itself and its broadcast call to everyone at once.

Network address translation (NAT) is the doorman's ledger made precise: for each outgoing connection the router replaces (private address, port) with (public address, new port) and stores the pair; each incoming reply is matched against the table and rewritten back. Addresses like 192.168.x.x are reserved for private use, so millions of houses reuse them without ever colliding.

## Advanced

NAT became universal because IPv4 ran out: 32 bits give about 4.3 billion addresses for far more devices than that, so whole households — and, with carrier-grade NAT, whole neighbourhoods — hide behind single public addresses. The cost is that gadgets behind NAT cannot easily be reached from outside (hence port forwarding for game servers), and the table's ports are finite. IPv6, with 128-bit addresses, gives every lightbulb on Earth its own public address and makes the ledger optional.

## Derivation

1. An IPv4 address has 32 bits; the first $p$ of them name the network, and the remaining bits name the gadget.
2. With $p = 24$, 8 bits remain and $2^{8} - 2 = 254$ gadgets fit — the two missing addresses are the network's own name and its broadcast.
3. With $p = 30$ only $2^{2} - 2 = 2$ remain: exactly enough for one cable between two routers.

## Real world

### The box by your door
Every home router is doorman, address book and translator at once — the Wi-Fi is just how packets reach it through the air.

### Carrier-grade NAT
Many mobile networks put thousands of customers behind one public address, running the same ledger at city scale.

### Port forwarding for games
Hosting a game server from home means telling the doorman in advance: anything arriving on this port goes to that machine.

### Why 192.168.1.1 works in every house
Private ranges are reserved precisely so the same numbers can be reused in every home on Earth without a single clash.
