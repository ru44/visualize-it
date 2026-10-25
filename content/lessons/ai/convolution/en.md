---
title: 'Convolution: how AI sees'
summary: >-
  A network does not look at a picture — it slides one tiny stencil of weights
  across it, multiplying and adding at every stop, and the trail of answers
  lights up wherever the stencil's pattern hides.
parameters:
  kernel: kernel — which question the stencil asks
  pos: pos — how far the scan has slid
variables:
  - one output pixel, the stencil's answer here
  - the stencil of nine weights
  - the patch of image under it
---

## Try it

1. With the vertical-edge kernel, drag pos through the whole scan: the output stays dark over flat regions and flares green/red exactly where brightness changes left-to-right — the face's vertical borders.
2. Switch to the horizontal-edge kernel and scan again: the same image now answers a different question, lighting up the brows of the eyes and the top of the smile instead.
3. Pick blur and stop mid-scan: every answer is just the neighbourhood average — small positive numbers everywhere, edges smoothed away.

## Real-life examples

- **A full edge scan.** 100 stops of the vertical stencil turn the face into a map of its left and right borders — the raw material every vision network starts from.
- **The blur pass.** The same machinery with gentler weights is exactly how photo apps soften skin: convolution is image processing's oldest tool, learned anew by networks.
- **A frozen mid-scan.** Pause anywhere and the arithmetic is nine multiplications and one sum — the whole mystery of machine vision, one patch at a time.

## Test yourself

1. Complete a full scan with the vertical-edge stencil.
2. Complete a full scan with the blur stencil and compare the two maps.
3. Park the horizontal-edge stencil mid-scan, between 40% and 60%, and read the multiply-and-sum at that exact stop.

## Intuition

How would you teach a machine to find a cat's ear *anywhere* in a photo? The brute-force answer — learn a separate detector for every possible position — is absurd. Convolution's answer is one of the great ideas in engineering: learn the detector *once*, as a tiny stencil of weights, and slide it everywhere. At each stop the stencil multiplies its nine numbers with the nine pixels beneath and sums them into a single verdict: "is my pattern here?" The trail of verdicts is a new, smaller image — a feature map — that glows wherever the feature lives.

The three stencils on this page ask toy questions — vertical change, horizontal change, local average — but nothing about the machinery changes when the questions get grand. A vision network is just stacks of this: the first layer's stencils find edges, the next layer slides stencils over the *edge maps* and finds corners and curves, the next finds eyes and wheels, until somewhere near the top a stencil effectively asks "cat ear here?". Nobody designed those stencils; training nudged the nine numbers until the questions became useful. What you choose on this page by name, a network chooses by gradient descent.

## Formal

At each position the layer computes $y = \sum K \cdot x$ — the elementwise product of the kernel with the patch under it, summed to one number. Sliding over a $12\times12$ image with a $3\times3$ kernel yields a $10\times10$ map: each output pixel sees only a small receptive field, and the same nine weights are reused at every stop.

That reuse — weight sharing — is the point. A dense layer connecting two such images would need thousands of weights; the convolutional layer needs nine, learns from every patch of every image at once, and is translation-equivariant by construction: shift the input and the answer map shifts with it, because the question asked was everywhere the same.

## Advanced

Real layers run dozens of kernels in parallel (dozens of questions, dozens of maps) over many channels, interleaved with nonlinearities and downsampling, so receptive fields grow until the deepest units see the whole image. Trained first-layer kernels converge on edge and colour detectors strikingly like those measured in mammalian visual cortex — the same problem forcing the same solution. And the idea outgrew vision: convolutions over time read audio, convolutions over board positions power game-playing networks; wherever a pattern can appear *anywhere*, sliding one learned question across it beats learning the answer at every address — even transformers, which replaced convolution at vision's frontier, kept its core trick of processing every patch with shared weights.

## Derivation

1. Lay the stencil on a patch: nine weights over nine pixels, one aligned pair each.
2. Multiply each pair and add: $y = \sum K \cdot x$, a single number measuring how much this patch resembles the stencil's pattern.
3. Slide one pixel and repeat until the image is covered — the answers form the feature map, and the same nine weights asked the same question at every address.

## Real world

### Photo filters
Blur, sharpen, emboss in every photo editor are fixed convolutions — networks simply learned better stencils than engineers wrote.

### Medical imaging
Tumour-spotting networks slide learned stencils over scans; their first layers find edges and textures, their last ones find pathology.

### Self-driving perception
Lane lines, pedestrians and signs are found by convolutional stacks running on camera frames dozens of times per second.

### Barcode and face unlock
From the supermarket scanner to the phone that recognises you, the pipeline opens the same way: small windows, shared weights, feature maps.
