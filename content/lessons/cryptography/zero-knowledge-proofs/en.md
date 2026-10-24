---
title: 'Zero-knowledge proofs: convincing without revealing'
summary: >-
  Peggy proves she knows the password to a magic door deep in a cave — round
  after round — and Victor ends up certain she knows it, while learning
  nothing about the password itself.
parameters:
  rounds: rounds — how many times Victor challenges Peggy
  cheat: bluff — set to 1 to watch someone who doesn't know the password try
variables:
  - the chance a bluffer survives all the rounds
  - the number of rounds played
---

## Try it

1. With the bluff switch at 0, run a few rounds: Victor shouts A or B, Peggy walks out of the demanded side every time, and his confidence meter sinks toward certainty.
2. Flip the bluff switch to 1: the impostor guessed a side before hearing the shout, and the round list shows the ✗ where the luck ran out.
3. Push rounds to 20 and read the odds: a bluffer survives all twenty shouts once in about a million attempts.

## Real-life examples

- **Three honest rounds.** Peggy passes all three — but three lucky coin flips happen one time in eight, so Victor keeps asking.
- **Three rounds of bluffing.** An impostor has a 1-in-8 chance of the same record; the simulation usually shows the ✗ that gives the game away.
- **Twenty rounds, caught.** At 20 rounds the survival odds are 1 in 1,048,576 — Victor is as sure as he would ever need to be, and still has not seen the password.

## Test yourself

1. Play enough rounds to push a bluffer's survival odds below one in a thousand.
2. Flip the switch to the bluffing prover and find the round where the ✗ appears.
3. Run the full twenty rounds and read the final odds off the meter.

## Intuition

The cave on screen is a ring with one entrance and a magic door at the back, opened only by a password. Peggy claims she knows it; Victor wants proof but Peggy refuses to say the word — if she did, Victor could impersonate her forever after. So they play: Peggy walks in and picks a side at random, left or right, out of Victor's sight; Victor then shouts which side she must come out of. If she knows the password she can always comply, opening the door when the shout disagrees with her choice. If she is bluffing, she complies only when she guessed the shout in advance — a coin flip.

One round means little: half of all bluffers pass it. But the rounds multiply — surviving two shouts is a quarter, three is an eighth, twenty is one in a million — and the meter on screen collapses accordingly. The strange and wonderful part is what Victor holds at the end: overwhelming certainty that Peggy knows the password, and not one bit of information about the password itself. Each round he saw exactly what he could have simulated alone: a person emerging from the side he named.

## Formal

A zero-knowledge proof must satisfy three properties. Completeness: an honest prover convinces the verifier every time. Soundness: a prover who lacks the secret survives $n$ rounds only with probability $q = \left(\frac{1}{2}\right)^{n}$, which the verifier can drive as low as desired. Zero-knowledge: the verifier's entire view of the exchange could have been generated without the prover, so the transcript carries no knowledge beyond the single fact being proved.

The cave is folklore, but the real constructions are concrete: Goldwasser, Micali and Rackoff defined the notion in 1985, and protocols exist for any statement that can be checked efficiently — knowing a discrete logarithm, holding a valid credential, possessing a solution to a puzzle — always with the same shape of challenge, response and repetition.

## Advanced

Two modern turns made this hall exhibit into infrastructure. The Fiat–Shamir transformation replaces the verifier's live challenges with hashes of the conversation so far, turning an interactive proof into a single message — this is how several signature schemes are actually built. And succinct proofs, zk-SNARKs and zk-STARKs, compress the verification of an enormous computation into a proof of a few hundred bytes: blockchains use them so one party can prove "all thousand transactions in this block are valid" — or "I am over 18", or "this bank is solvent" — while showing nothing else.

## Derivation

1. Each round is a fair challenge: a bluffing prover passes it only by having guessed the verifier's coin.
2. Rounds are independent, so the bluffer's survival probability halves every time.
3. Twenty rounds push the odds past one in a million, while the verifier's view stays simulatable — certainty without disclosure.

## Real world

### Private transactions
Zcash and similar cryptocurrencies use zk-SNARKs to prove a payment balances — no coins created, none double-spent — while hiding sender, receiver and amount.

### Proving age without an ID card
Digital identity schemes let a phone prove "over 18" or "licensed to drive" to a verifier that learns nothing else on the document.

### Blockchain rollups
Layer-2 networks batch thousands of transactions off-chain and post one succinct proof that all of them were valid, multiplying throughput without trusting the operator.

### Authentication without passwords-in-flight
Zero-knowledge identification protocols let a device prove it holds a key without the key or anything derived from it crossing the wire — nothing for an eavesdropper to replay.
