---
title: 'VPC: your fenced-off patch of the cloud'
summary: >-
  A company's servers live in someone else's data centre yet behave like a
  private building — a VPC is the rented block of addresses, the fence around
  it, and the single guarded gate to the internet.
parameters:
  p: p — subnet prefix length (bigger p = finer slicing)
  pub: pub — how many subnets face the internet
variables:
  - how many subnets the block is sliced into
  - usable addresses inside each subnet
  - the prefix length doing the slicing
---

## Try it

1. Start at p = 20: the 10.0.0.0/16 block splits into 16 subnets of about four thousand addresses each — one tile holds the globe, the rest hold locks.
2. Slide p up and down: every step up doubles the subnets and halves their size — the same 65,536 addresses, sliced finer or coarser.
3. Raise pub and watch more tiles face the world. Real designs keep that number ruthlessly small: web servers face out, databases never do.

## Real-life examples

- **A startup's standard layout.** p = 20 with one public subnet: the load balancer stands at the gate, and the app and database tiles sit locked behind it.
- **Big and simple.** p = 18 carves just 4 huge subnets of about sixteen thousand addresses, two public — few fences, lots of room.
- **Microservice city.** p = 24 slices 256 subnets of 254 addresses with 4 public gates — fine-grained isolation for hundreds of small services.

## Test yourself

1. Slice the block into exactly 16 subnets.
2. Keep at least 4,000 usable addresses in every subnet.
3. Sixteen subnets guarded by a single public gate.

## Intuition

The cloud is a city of computers owned by someone else, and a VPC — a virtual private cloud — is the gated compound your company rents inside it. The compound gets its own private street plan, the address block 10.0.0.0/16, which nobody outside can even see; the fence is drawn by software, and the only way in from the city is the one gate you choose to open, the internet gateway at the top of the screen.

Inside, you draw the streets yourself, and that is what the slider p does: it borrows address bits to split the block into subnets. Each tile on screen is one subnet — a street where related machines live. The tiles with a globe have a route through the gate and can serve the public; the tiles with a lock have no such route, so a database there is unreachable from the internet not because of a password, but because no path to it exists at all.

## Formal

Address blocks use the same prefix notation as home networks: 10.0.0.0/16 fixes the first 16 bits of every address inside. Choosing a subnet prefix $p$ spends $p - 16$ further bits on naming subnets and leaves $32 - p$ bits for machines, so $S = 2^{p-16}$ subnets of $H = 2^{32-p} - 2$ usable addresses each. With $p = 20$: $S = 2^{4} = 16$ subnets of $H = 2^{12} - 2 = 4094$.

What makes a subnet "public" is nothing but routing: a subnet is public when its route table sends outward traffic to the internet gateway, and private when it does not. The lock on a tile is literally the absence of a road.

## Advanced

Private subnets that still need to download updates reach out through a NAT gateway — the home router's trick at data-centre scale: insiders can start conversations with the world, but the world cannot start conversations with them. Around each machine, security groups add a second fence of allowed ports and sources, and serious designs copy the whole layout across availability zones so a flooded data hall takes down one copy of each subnet, not the company. When two companies must talk privately, their VPCs are stitched together by peering — a private road between two compounds that never touches the public city.

## Derivation

1. The rented block 10.0.0.0/16 fixes the first 16 of 32 bits, leaving $2^{16} = 65536$ addresses to organise.
2. A subnet prefix $p$ spends $p - 16$ more bits naming streets: $S = 2^{p-16}$ subnets.
3. The remaining $32 - p$ bits name machines: $H = 2^{32-p} - 2$ usable addresses in each street, two being reserved.

## Real world

### Practically every app you use
Streaming services, banks and games run inside VPCs — "in the cloud" almost always means "inside someone's fenced compound".

### The database that cannot be hacked from outside
Breaches via the open internet stop at the missing route: locked subnets are unreachable by construction, not by vigilance.

### Compliance and banking
Regulators often require exactly this layout — public faces separated from private data by subnets, not promises.

### Hybrid offices
A company VPN often ends inside the VPC, placing the office network and the cloud compound on one private map.
