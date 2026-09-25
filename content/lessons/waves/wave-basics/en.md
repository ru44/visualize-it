---
title: Wave basics
summary: >-
  A rope shaken up and down sends a rippling pattern down its length, and four
  numbers — how far apart the ripples are, how fast you shake, how big they
  swing, and how fast the ripple itself travels — describe every wave there is.
parameters:
  f: frequency f
  lambda: wavelength λ
  A: amplitude A
variables:
  - how often you shake the rope each second
  - the distance between one crest and the next
  - how fast the ripple itself travels down the rope
  - the time for one full shake, up and back down
charts: []
---

## Try it

1. Watch the blue rope ripple to the right. Read the speed readout at the bottom.
2. Raise the frequency slider f. You shake faster, and the whole pattern races down the rope quicker.
3. Now raise the wavelength slider λ instead, keeping f the same. The ripples spread further apart, and the speed climbs again — both sliders push the speed, just by different means.

## Real-life examples

1. **A slow, wide shake.** Shake a long rope slowly with wide swings (f = 0.5 Hz, λ = 3 m). The ripple crawls along at a leisurely pace.
2. **A quick, tight shake.** Flick your wrist fast over a short reach (f = 1.2 Hz, λ = 1.2 m). The ripple now runs noticeably faster.
3. **A very fast, small shake.** Vibrate your hand rapidly with barely any swing (f = 2 Hz, λ = 0.6 m). The ripple speeds down the rope even though each individual swing is tiny.

## Test yourself

1. Make the wave travel at exactly 1 m/s.
2. Make the wave travel at exactly 3.6 m/s.
3. Keep the swing small (A under 0.2 m) while still sending the wave faster than 2 m/s.

## Intuition

Tie one end of a jump rope to a doorknob and shake the other end up and down, steadily, again and again. A pattern of humps travels away from your hand toward the door, even though your hand only ever moves up and down — it never moves toward the door at all. That traveling pattern is a wave, and the picture on screen is exactly this: the blue rope is shaken at the left edge, and the ripple runs off to the right.

Two numbers describe the shape you see at any instant. The wavelength λ is the distance from one crest to the next — drag the λ slider and watch that spacing stretch or squeeze. The amplitude A is how far each point swings up or down from the middle — it changes how tall the humps are but not how far apart they sit. A third number, the frequency f, is how many times per second your hand completes a full shake; raise it and the whole rippling pattern visibly speeds up, without changing the shape of any single hump.

## Formal

A travelling wave on a rope is $y(x,t) = A\sin\!\big(2\pi(x/\lambda - ft)\big)$: at a fixed instant it is a sine curve in space with spacing $\lambda$; at a fixed point it oscillates in time with period $T$, completing $f$ cycles every second.

The wave's speed is how far one crest advances per second. Since a crest moves one full wavelength $\lambda$ in one period $T$, the speed is $v = \lambda/T$, and because $T = 1/f$, this is $v = f\lambda$ — the single formula behind every wave in this subject, sound and light included.

## Advanced

Amplitude $A$ does not appear in $v = f\lambda$ at all: a gentle shake and a violent one, at the same frequency and wavelength, send the ripple down the rope at the same speed. Amplitude instead controls how much energy the wave carries — a taller ripple takes more effort to make and delivers more of a jolt when it arrives, even though it gets there at the same time as a smaller one.

## Derivation

1. Speed is distance over time; a wave advances one wavelength every period, so $v = \lambda/T$.
2. The period is the time for one cycle, the reciprocal of how many cycles happen per second: $T = 1/f$.
3. Substituting gives the wave speed directly from what you can set on the rope: $v = f\lambda$.

## Real world

### Musical instruments
A guitar string's speed depends on its tension and thickness; once fixed, $v = f\lambda$ ties the string's length to every note it can ring at.

### Seismic waves
Earthquake waves travel through rock at speeds set by the rock's stiffness; knowing $v$ lets seismologists work out how far away a quake struck from how long its waves took to arrive.

### Radio and Wi-Fi
Radio waves all travel at the speed of light, so $v = f\lambda$ fixes their wavelength the moment a station picks its broadcast frequency.

### Ocean waves
A surfer reads the gap between swells (the wavelength) and how often they arrive (the frequency) to judge how fast a wave is moving toward the beach.
