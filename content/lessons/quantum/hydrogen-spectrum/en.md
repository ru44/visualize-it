---
title: The hydrogen spectrum
summary: >-
  A glowing hydrogen lamp gives off only a few exact colours, never a full
  rainbow, and those colours reveal what stars are made of.
parameters:
  ni: starting level nᵢ
  nf: landing level n_f
variables:
  - the energy of level n
  - the energy released as one photon
  - the electron's starting level
  - the electron's landing level
charts: []
---

## Try it

1. Look at the ladder of energy levels on screen and the electron dropping from one rung to a lower one.
2. Set «starting level nᵢ» to 3 and «landing level n_f» to 2. A red line lights up — the same red seen in a hydrogen discharge tube.
3. Raise «starting level nᵢ» while keeping «landing level n_f» at 2. The emitted colour shifts toward blue and then violet.

## Real-life examples

1. **Balmer-alpha, the red line of hydrogen.** The drop from level 3 to level 2 gives out red light at 656 nm, visible in any hydrogen discharge tube.
2. **Balmer-beta, a blue-green line.** The drop from level 4 to level 2 gives out light at about 486 nm.
3. **Lyman-alpha, the ultraviolet line that revealed hydrogen in stars.** The drop from level 2 to level 1 gives out ultraviolet light, the strongest single spectral line in the whole universe.

## Test yourself

1. Reproduce the red Balmer-alpha line at about 656 nm.
2. Find a jump whose light lands in the ultraviolet, below 200 nm.
3. Reproduce the blue-green Balmer-beta line at about 486 nm.

## Intuition

Heat a glass tube of hydrogen gas and it glows, but not with a smooth rainbow — only a handful of exact colours come out, like a few fixed notes rather than a smooth musical slide. Each electron inside the gas can only sit on one of a fixed ladder of rungs, and every photon of light it gives off corresponds to exactly one drop from a higher rung to a lower one.

Set «starting level nᵢ» to 3 and «landing level n_f» to 2 and a specific red line lights up on screen, always the very same red. Raise «starting level nᵢ» while «landing level n_f» stays at 2, and each bigger drop releases a more energetic, bluer photon, since the rungs bunch up closer together the higher you climb.

## Formal

The allowed energy levels of hydrogen's electron are $E_n = -\dfrac{13.6}{n^2}$ eV, so dropping from level $n_i$ to level $n_f$ releases a photon of energy $\Delta E = 13.6\left(\dfrac{1}{n_f^2}-\dfrac{1}{n_i^2}\right)$ eV.

That photon's wavelength follows from its energy as $\lambda = \dfrac{1240}{\Delta E}$ nm, using $hc \approx 1240$ eV·nm.

## Advanced

Every element has its own unique ladder of energy levels, so its emission and absorption lines act as an unmistakable fingerprint; astronomers read the light arriving from distant stars and galaxies and match its lines against these fingerprints to determine what those objects are made of, without ever needing to visit them.

## Derivation

1. Each allowed orbit has its own fixed energy, more tightly bound and more negative the closer it sits to the nucleus.
2. Dropping from a higher level to a lower one releases exactly that energy difference as a single photon.
3. The photon's wavelength follows directly from how much energy it carries.

## Real world

### Astronomical spectroscopy
Astronomers identify hydrogen, helium and other elements in stars and nebulae by matching the exact wavelengths of light they receive to each element's known spectral lines.

### Neon and sodium lighting
Neon signs glow orange-red and sodium street lamps glow yellow-orange because each gas has its own fixed set of allowed energy drops, unlike a smooth-spectrum incandescent bulb.

### The discovery of helium
Helium was first detected in the Sun's spectrum in 1868, decades before it was ever found on Earth, purely from an emission line that matched no known element.
