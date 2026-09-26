---
title: Hashing and checksums
summary: A hash turns a key into one bucket number so a lookup can jump straight there, and the same trick turns a whole message into one short number that reveals if it changed in transit.
parameters:
  view: hash table or checksum, view
  m: number of buckets, m
  corrupt: damage one byte in transit, corrupt
variables:
  - h, the bucket a key lands in
  - k, the key being hashed
  - m, the number of buckets in the table
---

## Try it

1. With view at 0 and m at 11, look at the seven keys and their buckets; most land alone. Drag m down toward 4 and watch two or three keys pile into the same bucket.
2. Read the line "23 mod 7 = 2": that single division is the whole lookup, no scanning needed, straight to bucket 2.
3. Switch view to 1. Flip corrupt to 1 and watch the third letter's byte turn red on the receiver's side, while the two checksums below stop matching.

## Real-life examples

1. **A small table, several collisions.** view at 0, m at 4: only four buckets for seven keys guarantees at least one bucket holds more than one key.
2. **A bigger table, fewer collisions.** view at 0, m at 11: with more buckets than keys, most land alone and lookups rarely need to check a second key.
3. **A corrupted message.** view at 1, corrupt at 1: one byte changes during transmission, and the sender's and receiver's checksums no longer agree.

## Test yourself

1. Set view to 0 and m to 4, the smallest table, and find a collision.
2. Set view to 0 and m to 11, the largest table, with no collisions among the seven keys.
3. Set view to 1 and corrupt to 1, and watch the checksums disagree.

## Intuition

Imagine a school with 400 lockers but you only remember a student's ID number, say 4471. Instead of checking every locker, the office uses a simple rule: take the ID, divide it by 400, and the remainder is the locker number. Every student's locker number falls out of one division, instantly, no searching required. That rule is a hash function, and the locker number is the "bucket." The catch is that two different students can land on the exact same remainder, called a collision, which is more likely the fewer lockers there are for the number of students.

Now picture mailing a letter and telling the recipient, over the phone, "count every letter in this envelope and tell me the total." If even one word got smudged in the mail, your two counts, the one you kept and the one they read back, would very likely not match, and you would both know something changed. A checksum is exactly that count, done on bytes instead of words, computed once when a message is sent and again when it arrives.

## Formal

A hash function maps a key $k$ to a bucket number $h$ using $h = k \bmod m$, where $m$ is the number of buckets in the table; looking up $k$ means computing $h$ once and checking only that bucket, which is why a hash table lookup takes roughly constant time instead of scanning every entry.

A checksum applies the same idea to an entire message instead of a single key: summing every byte $b_i$ in the message and reducing the result, for example $c = \left(\sum b_i\right) \bmod 256$, produces one small number that almost always changes if any byte in the message changes. Comparing the sender's $c$ to the receiver's $c$ after the fact reveals most transmission errors without needing to resend or recheck every byte by hand.

## Advanced

A real hash table keeps its load factor, the number of keys divided by the number of buckets, below roughly 0.7 by resizing to a larger table once it fills up, because collisions and the extra work of resolving them grow rapidly past that point; a simple checksum like the one here is meant to catch accidental damage, not a deliberate attacker, since someone who can change the message on purpose can just as easily recompute a matching checksum, which is why security-critical systems use the much harder to fake cryptographic hash functions covered in a separate lesson.

## Derivation

1. $k \bmod m$ is the remainder left over after dividing $k$ by $m$.
2. $h$ names exactly one of the $m$ buckets to look in first, with no need to check any other.
3. Two different keys landing on the same $h$ is called a collision, and the table has to keep both somehow.

## Real world

### Programming language dictionaries
Python's dict, JavaScript's Map and Java's HashMap all use a hash table internally, so looking up a value by key stays fast even with millions of entries.

### Barcodes and ID numbers
The last digit of a UPC barcode or an ISBN book number is a checksum, computed from the digits before it, so a scanner or a typo instantly catches a single mistyped or misread digit.

### File downloads
A download page often lists a checksum next to a file so you can recompute it after downloading and confirm the file was not corrupted or cut short by a bad connection.

### Network packets
Every packet sent over the internet carries a checksum in its header, computed from the packet's contents, so a router or the receiving computer can spot a packet damaged in transit and ask for it again.
