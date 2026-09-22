---
title: XOR and the one-time pad
summary: This is the only cipher ever proven impossible to break — see what makes a random, single-use key so powerful.
parameters:
  key: key (random seed)
variables:
  - the message, letter by letter
  - 'the secret key: one random byte for every letter of the message'
  - the ciphertext — the message hidden behind the key, meaningless without it
---

## Try it

1. Look at the yellow row of boxes at the top: each group of 8 boxes is one letter of HELLO written as bits, 0s and 1s.
2. Drag the slider called «key». The red row of bits changes completely — that is the random key, one byte per letter.
3. Watch the green row at the bottom. It always spells HELLO again, no matter where you leave the slider, because XOR-ing with the same key twice undoes itself.

## Real-life examples

1. **A Cold War spy's notebook.** A spy in 1960 carries a pad of random numbers glued page by page into a notebook; each page is used for one message and then burned. With key 42 on today's page, HELLO turns into a row of bytes that means nothing to anyone without that exact page.
2. **A bank's one-time PIN letter.** A bank prints a new PIN hidden behind a random cover code that is used once and thrown away. Push the key to 512 and every byte in the orange row rewrites itself into a completely different pattern from key 42.
3. **A WWII embassy telegram.** Embassies shared thick books of random digits, using one fresh line per telegram and marking it off afterward. Key 900 scrambles the very same word HELLO into a third pattern, unrelated to the other two.

## Test yourself

1. Slide «key» back to 42, the value used in the first example above.
2. Push «key» to 900 or higher, and notice the orange ciphertext row looks totally different even though the yellow message HELLO never changed.
3. Pull «key» below 10. A key that small would be one of the first ten numbers a computer tries when guessing.

## Intuition

Picture writing HELLO on a strip of paper, then a friend rolling dice to pick five secret numbers, one per letter, and adding each number to its letter. On screen the top yellow row is HELLO written out as five groups of 8 tiny boxes, each box a 0 or a 1. Drag the slider called «key» and the red row directly below it reshuffles into a new set of bits — that is the secret key, a full random byte for every letter. The orange row underneath is what someone intercepting the message would actually see: move the slider and it changes completely, hiding which of many possible messages it could be.

The green row at the bottom always spells HELLO again, because combining the same key twice cancels it out — decrypting is just encrypting a second time with the same key. Written as one rule it says $C \oplus K = M$: take the orange ciphertext row, combine it once more with the red key row above it, and you land back on the yellow message you started with.

## Formal

For a message $M$ and a random key $K$ of the same length, the ciphertext is $C = M \oplus K$, the bitwise exclusive-or of every matching pair of bits.

Decryption reverses the same step, $C \oplus K = M$, because XOR-ing any bit with itself twice always returns it unchanged; if $K$ is chosen uniformly at random and never reused, $C$ carries no statistical trace of $M$ at all — the one-time pad's proof of perfect secrecy.

## Advanced

Claude Shannon proved in 1949 that the one-time pad gives perfect secrecy: for every possible message of the right length, some key turns it into the observed ciphertext, so an intercepted $C$ fits every possible $M$ equally well and leaks nothing. That guarantee needs three conditions together — the key is as long as the message, chosen uniformly at random, and never reused; break any one, say by reusing $K$ for a second message $M_2$, and $C_1 \oplus C_2 = M_1 \oplus M_2$ leaks the XOR of both plaintexts.

## Derivation

1. Combine the message with the key one bit at a time using XOR, the rule that outputs 1 exactly when the two input bits differ and 0 when they match.
2. Apply the very same key a second time. XOR-ing a bit with itself always gives 0, so the key cancels out and the original message reappears untouched.
3. As long as that key was chosen completely at random and used only once, every possible original message explains the scrambled bits equally well — nothing in the ciphertext favors one guess over another.

## Real world

### Cold War spy tradecraft
Intelligence agencies issued physical one-time pads on tear-off paper, destroying each page immediately after a single message was sent.

### Military field ciphers
Numbers stations still broadcast strings of digits over shortwave radio, meant to be combined with a pad only the receiving agent holds.

### Stream ciphers today
Modern stream ciphers such as those inside Wi-Fi and phone calls generate a long pseudorandom key stream and XOR it with the data, trading true randomness for a key short enough to share.

### Quantum key distribution
Quantum key distribution exists specifically to hand two distant parties a fresh, truly random, shared key — exactly what a real one-time pad requires.
