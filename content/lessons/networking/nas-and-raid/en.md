---
title: 'NAS and RAID: a cloud that lives in your closet'
summary: >-
  A NAS is a box of disks the whole house can reach; RAID is the deal struck
  inside it — how much space you hand over so that one dead disk cannot take
  the family photos with it.
parameters:
  n: n — disks in the box
  s: s — terabytes on each disk
  mode: 'mode — the layout: 0 stripe, 1 mirror, 2 parity'
  dead: dead — set to 1 to pull the first disk out
variables:
  - usable terabytes once the layout takes its cut
  - how many disks the box holds
  - terabytes per disk
---

## Try it

1. Start in parity mode (mode = 2) and find the grey P blocks: one disk's worth of space holds the safety maths for all the rest.
2. Set dead = 1: the first disk dies, and the box recomputes every missing stripe from parity — slower for a while, but nothing is lost.
3. Switch to stripe (mode = 0) with the disk still dead: the very same failure now destroys the file — all the space, none of the safety. Then try mirror (mode = 1).

## Real-life examples

- **The sensible home NAS.** Four 4 TB disks in parity: 12 TB usable, and any single disk can die on a Tuesday without drama.
- **The gambler's box.** The same four disks striped: all 16 TB usable — right up until one disk fails and every file dies with it.
- **The paranoid pair.** Mirror mode: every byte written twice, 8 TB usable, and the dead disk's twin does not even flinch.

## Test yourself

1. Build a parity box with at least 20 TB usable.
2. Stripe the box and pull a disk — see what RAID 0 really promises.
3. Mirror the box and pull the same disk — this time the photos survive.

## Intuition

A NAS — network-attached storage — is the family's own private cloud: a quiet box of disks plugged into the router, holding the photos, the backups and the film collection for every device in the house. The question it must answer is not speed but mortality: hard disks die, routinely and without notice, so the box's real job is deciding what happens on that day. That decision has a name: RAID, and the mode slider lets you make it three different ways with the same disks.

Stripe scatters each file's blocks across all the disks — every byte bought is a byte usable, and one dead disk cuts every file's spine. Mirror writes everything twice, spending half the space to keep a live twin. Parity is the clever middle: alongside the data blocks it stores little checksum blocks, and any single missing block can be recomputed from the survivors — the file on screen literally reassembles itself when you pull the disk. One disk's worth of space buys the whole safety net.

## Formal

In parity mode each group of data blocks gets one parity block computed with XOR: $P = b_1 \oplus b_2 \oplus \cdots$, and because XOR undoes itself, any one lost block equals the XOR of all the others — the recomputation you watch in the sim.

The capacities follow directly: stripe uses everything, $U = ns$; mirror duplicates everything, $U = \frac{ns}{2}$; parity reserves one disk's worth, $U = (n-1)s$. Only stripe fails the one-dead-disk test; mirror and parity both pass it, at different prices.

## Advanced

RAID is not backup: it protects against a dying disk, not against ransomware, accidental deletion or a house fire, all of which the mirror faithfully copies. Serious setups add a second parity block (RAID 6) because rebuilding a modern multi-terabyte disk takes days of stressful reading, exactly when a second failure would be fatal. The same mathematics, grown up into erasure coding, is how the big clouds store your files across whole data centres — the closet box and the hyperscaler run on one idea.

## Derivation

1. Striping spreads blocks across all $n$ disks, so $U = ns$ — and any single death cuts through every file.
2. Mirroring writes each block twice, so $U = \frac{ns}{2}$, and a dead disk's twin carries on alone.
3. Parity stores one extra block per stripe of data, so $U = (n-1)s$, and a missing block is recomputed from the survivors.

## Real world

### Home media servers
A NAS running a media app streams the family's films to every screen in the house — the closet cloud in its natural habitat.

### Small businesses
Offices keep their shared drives on parity boxes: disks are replaced over coffee instead of over lost contracts.

### Surveillance recorders
Security camera systems write continuously for years — parity keeps the archive alive through routine disk deaths.

### The big clouds themselves
Data centres use erasure coding, parity's grown-up form, spreading each file across so many disks that whole racks can die unnoticed.
