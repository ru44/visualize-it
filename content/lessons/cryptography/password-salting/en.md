---
title: Salting a password hash
summary: Two people can pick the exact same password, yet a good site never lets their stored data match — a random salt is why.
parameters:
  s1: first user's salt
  s2: second user's salt
variables:
  - the password, typed by the user
  - the salt, a random number picked fresh for each account
  - the hash function, here SHA-256
  - the stored fingerprint it produces
  - joins the password and the salt into one string before hashing
---

## Try it

1. Look at the two labels above the grids: both show the same password, "sunshine1", but a different number attached to it — the salt.
2. Drag «s1», the first user's salt, and watch their entire 256-square fingerprint reshuffle.
3. Compare it with the second grid, using salt «s2». Even though both users typed "sunshine1", the two fingerprints share almost nothing in common.

## Real-life examples

1. **Two classmates pick the same password.** With «s1» = 17 and «s2» = 742, both chose "sunshine1" for a school forum account, yet the site ends up storing two completely different-looking fingerprints.
2. **Re-registering a year later.** With «s1» = 100 and «s2» = 900, the same person re-creates a lost account using the identical password, and a freshly drawn salt still produces an unrecognizable new fingerprint.
3. **The same password on two different sites.** With «s1» = 5 and «s2» = 995, reusing "sunshine1" everywhere is a bad habit, but different salts on each site still stop the two stored fingerprints from looking anything alike.

## Test yourself

1. Set «s1» back to 17, the salt used in the first example above.
2. Set «s2» to 742, its matching partner from that same example.
3. Push «s1» and «s2» to within 5 of each other and notice the two fingerprints still look nothing alike.

## Intuition

Suppose two classmates both choose the password "sunshine1" for the same school forum, salt 17 for one and salt 742 for the other. On screen, the left label shows exactly what actually gets hashed: the password glued to that random salt number, and the grid beneath it is the resulting 256-bit fingerprint, one small square per bit. Drag «s1» and the left grid reshuffles completely, even though the password text itself never changes — only the number stuck onto the end of it does.

Compare the left grid with the right one, computed the same way from «s2»: despite both starting from the identical password, the two fingerprints share almost no squares in common, exactly as if two completely different passwords had been hashed. That is written $h = H(P \Vert s)$: hash the password $P$ joined to a salt $s$, and even a small change in $s$ sends $h$ somewhere entirely unrelated.

## Formal

A salted password hash is $h = H(P \Vert s)$, where $P$ is the password, $s$ is a random value chosen fresh for every account, and $\Vert$ joins them into one string before hashing.

Because $H$ has the avalanche property, two accounts sharing the same password $P$ but different salts $s_1 \ne s_2$ produce unrelated stored values $h_1 = H(P \Vert s_1)$ and $h_2 = H(P \Vert s_2)$, so nothing in the stored data reveals that the two passwords ever matched.

## Advanced

Without salting, an attacker can precompute a single "rainbow table" mapping millions of common passwords to their hashes just once, then instantly reverse-lookup any stolen hash from any site; a unique salt per account forces the attacker to redo that entire precomputation for every single account, which is exactly what salting is for — turning one cheap attack into millions of expensive ones. Modern systems go further still, using deliberately slow hash functions such as bcrypt, scrypt or Argon2, built from many repeated rounds, so that even a single guess costs meaningful computer time.

## Derivation

1. Two users both type the identical password into the site's sign-up form.
2. The site hashes each one joined to its own random salt, producing two separate stored fingerprints.
3. Because the salts differ, the two fingerprints come out completely unrelated, even though the password underneath was exactly the same.

## Real world

### Rainbow table attacks
Salting exists specifically to defeat precomputed password-hash lookup tables, forcing an attacker to attack each account separately.

### The 2012 LinkedIn breach
LinkedIn once stored password hashes without salt, so attackers cracked millions of accounts at once using tables built long before the breach.

### Modern password hashing
Current best practice uses slow, salted functions like bcrypt or Argon2 instead of a single fast hash, making large-scale guessing far more expensive.

### Password managers
Because salting only protects the stored hash, reusing one password everywhere is still risky — a password manager lets every account get its own strong, unique one.
