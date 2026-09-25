---
title: The boundary layer
summary: >-
  Right at any surface moving through air, a thin film of slowed-down air
  clings on — and whether that film stays smooth or turns turbulent decides
  how far a golf ball flies, which is why golf balls are covered in dimples
  on purpose.
parameters:
  v: speed v
  d: diameter d
  roughness: dimples
variables:
  - boundary-layer thickness
  - distance travelled along the surface
  - the Reynolds number at that point
---

## Try it

1. Picture a golf ball, 4.3 cm across, leaving the tee at 70 m/s, with its dimples doing their job.
2. Read the drag force, and note how the flow clings to the ball almost all the way round before separating.
3. Turn «dimples» off, same ball, same speed. Watch the wake balloon and the drag force jump.

## Real-life examples

1. **A dimpled golf ball off the tee.** At 70 m/s, the dimples trip the boundary layer turbulent early, it clings to the ball far around before separating, and the drag comes out to well under 1 N.
2. **The same ball, imagined smooth.** Same 4.3 cm, same 70 m/s, but with no dimples the layer stays laminar and separates early, leaving a big wake — the drag more than doubles.
3. **A soccer ball's stitched surface in flight.** A 22 cm ball at 25 m/s: the stitching, like dimples, trips the layer turbulent too, keeping the flow attached longer than a truly smooth ball would manage.

## Test yourself

1. Get the ball into the low-drag turbulent regime using dimples.
2. Get a *smooth* ball into the turbulent regime too — it takes a much higher Reynolds number to manage without dimples' help.
3. Reach a Reynolds number of about 200,000, a typical driver shot.

## Intuition

Right at any solid surface, air doesn't slide past freely — it sticks, because of the no-slip condition, and has to speed up from zero to the free-stream speed across a thin film called the boundary layer. Drag «dimples» off and watch that thin layer stay smooth (laminar) all the way round the ball's front — smooth, but fragile: a laminar layer has almost no extra energy to keep following a curved surface once the surface starts curving away from the flow, so it peels off early, leaving a big turbulent wake behind the ball. A big wake means a big low-pressure region pulling backward on the ball: that is most of a golf ball's drag.

Turn «dimples» back on. The little pits trip the boundary layer into turbulence deliberately and early — a turbulent layer mixes fast-moving outer air down into itself, giving it enough extra energy to keep hugging the curved surface much further around before it finally separates. A smaller wake means less drag, even though the turbulent layer itself has slightly more friction right at the surface. Drag «speed v» up and down and watch the Reynolds number readout cross the dimples' trip point far sooner than the smooth trip point — dimples aren't decoration, they are trading a little skin friction for a much bigger saving in wake drag.

## Formal

For flow along a flat surface a distance $x$ from where it started, the laminar boundary-layer thickness grows as $\delta \approx \dfrac{5x}{\sqrt{\mathrm{Re}}}$ (the Blasius result), where $\mathrm{Re} = \rho v x/\mu$ is the Reynolds number at that point — thinner at high Reynolds number, thicker where the flow has had longer to diffuse outward.

Past a transition Reynolds number, the layer turns turbulent and grows faster, roughly as $x/\mathrm{Re}^{0.2}$; that transition point can be moved dramatically earlier by roughness — dimples, stitching, even a tripwire — which is exactly the trick used to delay separation on a bluff body like a ball.

## Advanced

A smooth sphere's drag coefficient famously *drops* from about 0.5 to about 0.1 once the flow trips turbulent — the so-called drag crisis — because delaying separation shrinks the low-pressure wake far more than turbulent skin friction costs. Golf ball dimples exploit exactly this crisis, deliberately triggering it at a much lower speed (and Reynolds number) than a smooth ball would ever reach on its own.

## Derivation

1. Right at the wall, viscosity forces the air's speed to rise from zero (no slip) up to the free-stream speed $v$ across some thickness $\delta$; viscous diffusion spreads that change outward over a time that scales as $\delta^2/\nu$.
2. That diffusion has to keep pace with the flow sweeping past, which takes a time of order $x/v$; setting the two times equal gives $\delta \propto \sqrt{\nu x/v}$.
3. Carrying the exact constants through the flat-plate solution (Blasius) gives $\delta \approx \dfrac{5x}{\sqrt{\mathrm{Re}_x}}$ for the laminar layer.

## Real world

### Golf ball dimples
A smooth golf ball, tested at driving speeds, travels roughly half as far as a dimpled one — dimples are one of the oldest deliberate uses of tripping a boundary layer turbulent on purpose.

### Vortex generators on aircraft wings
Small fins on a wing's upper surface deliberately trip the boundary layer turbulent to delay separation near the wing's trailing edge and tail surfaces, buying extra control authority at low speed.

### Shark-skin swimsuits and hull coatings
Riblets that mimic shark skin subtly manage the turbulent boundary layer's structure to cut skin-friction drag, the opposite goal from a golf ball, since a swimmer's whole body is already past transition.

### Aircraft icing
Even a thin, rough layer of ice on a wing can trip or disturb the boundary layer in the wrong place at the wrong time, moving separation forward and cutting lift — a major reason wings are de-iced before flight.
