---
title: Thin lenses and image formation
summary: 'Use a converging lens to locate an image and decide whether it is real or virtual, upright or inverted.'
parameters:
  f: 'f — positive focal length'
  doo: 'd₀ — object distance'
  ho: 'h₀ — object height'
variables:
  - 'positive focal length of the converging lens'
  - 'object distance and signed image distance'
  - 'object height and signed image height'
  - 'signed ratio of image height to object height'
---

## Try it

1. Set f = 6, d₀ = 15 and h₀ = 3. The image distance is 10 and magnification is −2/3: the image is real, inverted and 2 units tall.
2. Move the object to d₀ = 3. Image distance becomes −6 and magnification becomes +2. Dashed backward extensions locate an upright virtual image.
3. Set d₀ = f = 6. The emerging rays are parallel and no finite image distance exists. Near this setting an image may lie outside the diagram; check the readouts.

## Real-life examples

1. **A smaller real image.** For f = 6, d₀ = 25 and h₀ = 2, dᵢ ≈ 7.89, m ≈ −0.316 and hᵢ ≈ −0.632. This is the kind of geometry used to form an image on a camera sensor.
2. **A magnifier.** For f = 6, d₀ = 3 and h₀ = 1, dᵢ = −6 and m = +2. The virtual image is upright and 2 units tall.
3. **A larger real image.** For f = 10, d₀ = 12 and h₀ = 1.5, dᵢ = 60, m = −5 and hᵢ = −7.5. The image is beyond the 2D window, as can happen in projector geometry.

## Test yourself

1. Choose f and d₀ to place a real image 10 units beyond the lens.
2. Place the object inside the focal distance to make a virtual image.
3. Obtain m = −2: an inverted image with twice the object's height.

## Intuition

The object arrow sends rays toward the lens. A ray parallel to the axis bends toward the far focal point, while a ray through the ideal thin lens's centre continues straight. Where the outgoing rays meet, they form a real image. A screen placed there could receive it.

When the object is closer than the focal length, the outgoing rays spread apart. Their backward extensions meet on the object's side of the lens, marking a virtual image. Light does not actually converge at that location, but the outgoing rays appear to come from it. Changing object height changes image height without changing image distance in this model.

## Formal

For this converging lens and real object, $f>0$ and $d_0>0$. The thin-lens equation is $1/f=1/d_0+1/d_i$, so $d_i=fd_0/(d_0-f)$ when $d_0\ne f$. Positive image distance lies beyond the lens; negative image distance lies on the object's side.

Magnification is $m=h_i/h_0=-d_i/d_0$. Here negative m means an inverted real image, and positive m means an upright virtual image. At $d_0=f$, there is no finite image plane. Use the same length unit for all distances and heights.

## Advanced

The thin-lens equation is a paraxial approximation: rays are close to the axis and make small angles with it. The sliders explore its algebra even when the drawing has large ray angles. Real lenses have finite thickness and aberrations. The 3D view adds a ray fan, but screen extent is limited near the focal-distance singularity; numerical readouts remain the reference for image position.

## Derivation

1. Similar triangles for the central ray relate signed image height to image distance and object height to object distance.
2. Combine that relation with the ray parallel to the axis, which passes through the far focal point after refraction.
3. Express the height ratio as magnification, retaining the sign that records orientation.

## Real world

### Cameras

A lens system forms an image on a sensor. Focusing changes the optical geometry; real autofocus systems may move internal lens groups rather than simply moving one ideal lens.

### Magnifying glasses

An object inside the focal distance gives an upright virtual image. The apparent angular enlargement seen by an eye also depends on viewing geometry.
