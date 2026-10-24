---
title: 'Lattices: the cryptography built for quantum weather'
summary: >-
  Drop a point into an endless grid and ask which grid point is closest — with
  the right pair of arrows the answer is one rounding step, with the wrong
  pair it is a maze, and that gap is what will guard secrets against quantum
  computers.
parameters:
  tx: target x — where the dropped point sits, left and right
  ty: target y — where the dropped point sits, up and down
  basis: basis — 0 for the short near-square arrows, 1 for the long skewed pair
variables:
  - the two basis arrows whose whole-number combinations generate every grid point
  - the target point dropped off the grid
  - the whole-number amounts of each arrow
---

## Try it

1. With the good basis selected, drag the target anywhere: rounding its coordinates always rings the grid point nearest to it, and the dashed line stays short.
2. Switch the basis to 1 — the grid has not moved, only the arrows describing it — and watch the rounding ring a point far away while the true closest sits circled elsewhere.
3. Drag the target to (4, 3.5), dead centre between the bad arrows: the miss becomes dramatic, several times farther than the honest answer.

## Real-life examples

- **The owner's view.** A target near (3.25, 2.5) with the good basis: one rounding, right answer — decryption as a single step.
- **The attacker's view.** The same grid at (4, 3.5) with the skewed basis: rounding lands far from the true closest point, and no better general method is known.
- **Same spot, good arrows.** Switch back to the good basis at (4, 3.5) and the puzzle collapses to triviality again — the secret is not the grid, it is the arrows.

## Test yourself

1. Switch to the skewed basis and watch the rounding start missing.
2. Park the target at (4, 3.5) with the bad basis and compare the found distance against the best possible.
3. Stay at (4, 3.5) and flip back to the good basis — same grid, instant answer.

## Intuition

Everything on this page happens on a lattice: take two arrows, and the grid is every point you can reach by whole-number amounts of each. The same grid has many descriptions — a short, nearly perpendicular pair of arrows, or a long, nearly parallel pair — and the drawing lets you flip between two descriptions of one identical grid. Now drop a point anywhere and ask the innocent question: which grid point is closest? With the good arrows you write the target in arrow-coordinates, round to whole numbers, done. With the skewed arrows the exact same recipe lands you far away, because a small rounding error along one long arrow drags you across the map.

That asymmetry is a trapdoor you can see. The grid is public; the good basis is the private key, the skewed one is the public key. Whoever holds the good arrows snaps to the nearest point in one step — whoever holds only the bad ones faces the closest-vector problem, which in two dimensions is a toy but in five hundred dimensions defeats every known algorithm. The final twist is the reason this page exists: Shor's quantum algorithm demolishes factoring and discrete logarithms — RSA and Diffie–Hellman — but no quantum shortcut is known for close lattice points in high dimension.

## Formal

A lattice is the set of points $a\,u + b\,v$ for whole numbers $a, b$ — in general, all integer combinations of $n$ independent basis vectors. The closest-vector problem (CVP) asks for the lattice point nearest a target $t$; Babai's rounding algorithm writes $t$ in basis coordinates and rounds each to the nearest integer, and its error is controlled by how orthogonal the basis is.

The two bases here generate the identical lattice, yet rounding succeeds with one and fails with the other — the entire public-key construction in one picture. Encryption hides a message as a point near a lattice point (the offset is deliberate noise); the private, near-orthogonal basis strips the noise by rounding, while the public, skewed basis leaves an attacker with CVP in hundreds of dimensions, where the best known algorithms run out of universe.

## Advanced

Real schemes replace the picture's geometry with algebra: Learning With Errors (LWE) hides a secret inside systems of linear equations deliberately polluted with small noise, which is a lattice problem in disguise. NIST standardised the first post-quantum algorithms in 2024 — ML-KEM (Kyber) for key exchange and ML-DSA (Dilithium) for signatures, both lattice-based — and browsers already run hybrid key exchanges mixing classical curves with ML-KEM. The urgency has a name, harvest now, decrypt later: traffic recorded today could be opened by a quantum computer years from now, so the migration cannot wait for the machine to exist.

## Derivation

1. Two arrows span a grid: every lattice point is a whole-number recipe of the pair, and many pairs describe the same grid.
2. Rounding in a near-orthogonal basis makes small errors, so the nearest lattice point is found in one step.
3. Rounding in a skewed basis amplifies errors across the map, and in high dimension no algorithm — classical or quantum — is known to recover.

## Real world

### ML-KEM in your browser
Major browsers and servers already wrap their TLS key exchange in a hybrid of elliptic curves and ML-KEM, so recorded traffic stays safe even if quantum computers arrive.

### Harvest now, decrypt later
Intelligence agencies are assumed to store encrypted traffic in bulk; post-quantum migration is racing the decryption horizon, not the quantum computer's press release.

### Signatures for a quantum century
ML-DSA and the hash-based SLH-DSA were standardised alongside ML-KEM in 2024 to replace RSA and elliptic-curve signatures where documents must stay verifiable for decades.

### Fully homomorphic encryption
The same lattice noise that defeats attackers can be managed so a server computes on encrypted data without ever decrypting it — lattices opened that door too.
