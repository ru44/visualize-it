---
title: Diffraction
summary: >-
  A wave passing through a gap spreads out on the far side, and how much it
  spreads depends on the gap's size compared with the wavelength — which is
  why you can hear someone around a corner but never see them.
parameters:
  a: gap width a
  lambda: wavelength λ
variables:
  - the wavelength
  - the gap's width
  - the spreading half-angle
---

## Try it

1. Watch the wavefronts arrive at the gap and spread out into an arc on the far side.
2. Shrink the gap slider a toward the wavelength slider λ. The spreading angle grows until the wave fans out almost everywhere behind the gap.
3. Now widen a far past λ. The spreading angle shrinks to almost nothing, and the wave passes through as a narrow beam instead.

## Real-life examples

1. **A voice through a doorway.** A typical speaking voice's wavelength is close to the width of an open doorway (a = 1 m, λ = 0.7 m), so it spreads out widely into the next room — which is why you can hear someone from around a corner.
2. **Light through the same doorway.** On the same scaled picture, a wavelength far smaller than the gap (a = 4 m, λ = 0.1 m) barely spreads at all — real light's wavelength is about half a millionth of a metre, millions of times smaller than any doorway, so you never see around a corner the way you hear around one.
3. **A narrow gap close to the wavelength.** When the gap and the wavelength are nearly equal (a = 0.3 m, λ = 0.3 m), the wave spreads out in almost every direction on the far side.

## Test yourself

1. Make the gap exactly equal to the wavelength.
2. Make the wavelength-to-gap ratio smaller than 0.05, so the wave barely spreads at all.
3. Set a spreading half-angle of about 30°.

## Intuition

Stand around the corner from a friend talking in the next room: you cannot see them, but you can hear them perfectly well. Both light and sound are waves passing through the same doorway, yet they behave completely differently once through it — and the reason is the size of the gap compared with the wave's own wavelength.

When a wave's wavelength is close to the size of the gap it squeezes through, it bends and spreads out widely on the far side, filling the space behind the gap almost like a fan. When the wavelength is far smaller than the gap, the wave barely bends at all and carries on mostly in a straight beam. Sound wavelengths (roughly half a metre to a few metres) are close to the size of an ordinary doorway, so sound spreads widely through it; light's wavelength is roughly half a millionth of a metre, far smaller than any doorway, so it barely spreads and casts a sharp shadow instead.

## Formal

For a wave of wavelength $\lambda$ passing through a gap of width $a$, the first point where the spreading pattern drops to (near) zero sits at an angle $\theta$ from straight ahead given by $\sin\theta = \lambda/a$; most of the wave's energy spreads within roughly this half-angle of the straight-through direction.

When $a \gg \lambda$, this angle shrinks toward zero and the wave passes through almost undeviated, casting a sharp-edged shadow; when $a$ is comparable to $\lambda$, the angle grows toward 90°, and the wave spreads through nearly the whole space on the far side of the gap.

## Advanced

This single-slit estimate comes from treating every point across the gap as a source of its own outward ripple (Huygens' principle) and adding them up on a distant screen; where those ripples arrive out of step they cancel, and the first such cancellation happens at $\sin\theta=\lambda/a$. The 3D scene sums these ripples directly and shows the full interference pattern this angle only approximates.

## Derivation

1. Treating every point across the gap as its own wave source and adding their contributions gives a first cancellation angle of $\theta = \arcsin(\lambda/a)$.
2. When the gap is much wider than the wavelength, this angle shrinks toward zero, so the wave passes through nearly straight.
3. When the gap is close to the wavelength in size, the angle grows toward a right angle, so the wave spreads through nearly the whole space beyond the gap.

## Real world

### Hearing around corners
Sound's long wavelengths diffract strongly through doorways and around obstacles, letting you hear people and traffic you cannot see.

### Radio reception in valleys
Long-wavelength radio signals diffract around hills and buildings that would completely block a shorter-wavelength signal, which is part of why AM radio reaches into places FM cannot.

### Diffraction gratings
Spreading light through a series of very narrow, closely spaced slits produces sharp diffraction patterns that spectrometers use to split light into its component wavelengths.

### Camera lens diffraction limits
Closing a camera's aperture down too far makes it act like a narrow gap for light, diffracting the image and softening fine detail no amount of focusing can recover.
