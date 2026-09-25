---
title: Speed of sound
summary: >-
  Sound does not travel at one fixed speed — it moves faster through warmer
  air, and far faster through water and steel than through air at all, which
  is why counting seconds after lightning tells you how far the storm is.
parameters:
  T: air temperature T
  medium:  medium
  t: seconds counted
variables:
  - the speed of sound in the chosen medium
  - the speed of sound in air at 0°C, about 331 m/s
  - air temperature
  - distance travelled
---

## Try it

1. Leave the medium set to air and drag the temperature slider T. Watch the speed readout climb as the air warms.
2. Switch the medium slider to water, then to steel. The speed jumps far higher each time — sound races through solids and liquids much faster than through air.
3. Set the medium back to air and drag the seconds slider t. Watch the distance readout show how far away a storm must be for that counted delay.

## Real-life examples

1. **A cool spring day.** At 20°C, sound in air travels at 343 m/s; counting 3 seconds after a flash puts the storm just over 1 km away.
2. **A freezing winter night.** At −10°C, sound slows to about 325 m/s; the same counted delay now means the storm is a little closer than the spring-day estimate would suggest.
3. **Tapping a steel rail.** In steel, sound races at about 5000 m/s — more than fourteen times its speed in air — which is why placing an ear on a train track once let people hear an approaching train long before its sound reached them through the air.

## Test yourself

1. Switch to water and read off its speed of sound.
2. Switch to steel and read off its speed of sound.
3. Staying in air, find a temperature T and a count of seconds t that put a storm about 1 km away.

## Intuition

Count the seconds between seeing lightning flash and hearing the thunder that goes with it: light reaches you almost instantly, but sound takes its time, so that gap is really measuring how long the sound spent travelling to you. The farther away the storm, the longer the count — and knowing sound's speed turns that count directly into a distance.

That speed is not fixed. Warm air molecules move faster and bump into their neighbours sooner, so sound outruns itself a little quicker on a hot day than a cold one — about 0.6 m/s faster for every degree Celsius the air warms. Switch the medium away from air and the jump is much bigger: water molecules sit closer together than air molecules, and the atoms in solid steel sit closer still, so a push travels from one to the next far sooner. That is why sound crosses water more than four times faster than air, and steel about fourteen times faster.

## Formal

In air, the speed of sound is well approximated by $v = v_0 + 0.6\,T$, with $v_0 \approx 331\ \text{m/s}$ at $0\text{°C}$ and $T$ in degrees Celsius — at room temperature, $20\text{°C}$, this gives about $343\ \text{m/s}$, the everyday value most often quoted.

Once the speed is known, distance follows directly from timing: $d = v\,t$, where $t$ is the time sound takes to make the trip. Counting the seconds between a lightning flash and its thunder, then multiplying by air's speed of sound, gives an estimate of how far away the storm struck.

## Advanced

The 0.6 m/s-per-degree figure is itself an approximation of $v = \sqrt{\gamma R T_K / M}$, where $T_K$ is the absolute temperature in kelvin — sound speed in a gas actually depends on temperature through a square root, not a straight line, but over the range of everyday weather the straight-line fit is accurate to well within the timing precision of counting seconds by hand.

## Derivation

1. Air's sound speed rises roughly linearly with temperature, about 0.6 m/s per degree Celsius above the 0°C value.
2. Plugging in a comfortable room temperature of 20°C gives the commonly quoted 343 m/s.
3. Distance is simply speed multiplied by the travel time the sound took to arrive.

## Real world

### Lightning-and-thunder counting
Counting seconds between a flash and its thunder and multiplying by air's speed of sound gives a rough distance to a storm, useful for judging how much time remains before it arrives.

### Sonar and underwater surveying
Because sound moves so much faster in water than in air, sonar systems time an underwater echo and use water's higher speed of sound to work out depth or distance.

### Ultrasound and ultrasonic sensors
Medical ultrasound and parking sensors both time how long a pulse takes to bounce back, using the known speed of sound in the medium it travels through.

### Musical instrument tuning
A wind instrument's pitch depends on the speed of sound in the air inside it, which is why brass and woodwind instruments can drift slightly out of tune as a room warms up or cools down.
