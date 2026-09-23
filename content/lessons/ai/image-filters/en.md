---
title: Image filters
summary: >-
  A 3×3 grid of numbers slides over every pixel of a picture, multiplying and
  adding as it goes — and depending only on which numbers you pick, that one
  operation blurs, sharpens or finds the edges of the same picture.
parameters:
  kernel: filter
  pos: pixel
variables:
  - which 3×3 pattern of weights slides across the picture
  - which pixel the window is centred on right now
charts: []
---

## Try it

1. Watch the orange box on the left picture and the matching square on the right one. Each step the orange box moves one pixel and a new output pixel appears — that single new pixel is nine numbers multiplied and added together.
2. Set "filter" to edge detect and let "pixel" run to the end. Almost the whole output goes black except thin bright lines exactly where the disc and the square meet the background — those lines are the only places brightness changes sharply.
3. Now set "filter" to blur and compare: this time nothing goes black, every hard edge just gets a little softer, because blur only ever averages a pixel with its neighbours.

## Real-life examples

1. **Blurring a photo to hide grain.** Set the filter to blur and let it run to the end: the disc and square lose their crisp edges, exactly like a "soften" tool smoothing out noisy skin or fabric texture in a photo app.
2. **Finding the outline of a shape.** Set the filter to edge detect and let it run to the end: only the boundary of the disc and the square remain bright, which is how a scanner app finds the edge of a page before cropping it.
3. **Sharpening a photo halfway through.** Set the filter to sharpen and stop partway: you can see the left half of the output still soft-edged from the original, the right half already showing punchier contrast at every edge — the same "enhance" slider phone cameras apply to a whole photo at once.

## Test yourself

1. Set filter to blur and let pixel run all the way to the last one.
2. Set filter to edge detect and let pixel run all the way to the last one.
3. Set filter to sharpen and stop somewhere between pixel 90 and pixel 400.

## Intuition

Look at the orange square on the left picture: it always covers 9 pixels, a centre one and its 8 neighbours. Filtering one output pixel means taking those 9 brightness values, multiplying each by its own fixed weight, and adding the 9 results into a single number — that number becomes the one new pixel on the right. Slide the square one step and repeat for the next pixel; do this for the whole picture and you get a whole new, filtered picture.

The weights are the entire trick. Nine weights that are all roughly equal and sum to one just average a pixel with its neighbours, smearing hard edges into blur. Nine weights with a big positive number in the centre and small negative numbers around it push the centre pixel away from its neighbours' average, so any place that was already a bit brighter or darker than its surroundings gets exaggerated — that is sharpening. And weights that cancel out completely on a flat region but leave a large number wherever the neighbours disagree find exactly the boundaries between shapes — that is edge detection. Same 9 multiplications every time; only the 9 numbers change.

## Formal

Every output pixel is a weighted sum of the 3×3 neighbourhood around the matching input pixel: $\text{out}(x,y) = \sum_{i=-1}^{1}\sum_{j=-1}^{1} w_{i,j}\cdot \text{in}(x+i, y+j)$, where the nine weights $w_{i,j}$ are fixed for the whole picture and only the neighbourhood changes as the window slides.

This single formula, called a convolution, produces blur, sharpen or edge detection purely from the choice of $w_{i,j}$: a smooth bump of positive weights averages away detail, a sharp positive centre with negative surroundings amplifies local contrast, and a set of weights that sums to zero cancels out completely wherever brightness is constant and only responds where it changes — which is exactly an edge.

## Advanced

A hand-picked kernel like the ones here is exactly the first layer of a convolutional neural network, except the network never gets the nine weights handed to it — it starts them random and adjusts them by gradient descent until they reduce the network's error on real examples, often rediscovering edge-detector-like weights on its own. Real networks also learn dozens of different 3×3 kernels in parallel at once (each producing its own filtered image, called a feature map), and stack several convolution layers so that later layers combine simple edges into corners, textures and eventually whole recognisable shapes.

## Derivation

1. A 3×3 window of nine weights sits over one pixel and its eight neighbours.
2. Multiply each of the nine input values by its matching weight and add the nine results together to get the one output pixel.
3. Slide the window one pixel over and repeat for every pixel in the picture.

## Real world

### Photo editing apps
"Sharpen", "soften" and "find edges" tools in ordinary photo apps are this exact 3×3 operation with a different set of nine numbers.

### Medical imaging
Edge-detecting kernels highlight the boundary of an organ or a tumour in a scan, giving a doctor or an automated tool a clean outline to measure.

### Lane detection in cars
Early lane-keeping systems ran an edge-detection kernel over the road camera feed to pick out the bright lane markings from the dark road surface.

### The first layer of every CNN
Every image-recognising neural network starts by learning kernels almost exactly like these, before any of the more abstract shape and object detection happens in later layers.
