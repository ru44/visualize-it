---
title: 'Diffusion: how AI draws out of static'
summary: >-
  An image model never learned to draw — it learned one humble skill, removing
  a little noise, and running that skill a hundred times starting from pure
  static is what "generating an image" actually is.
parameters:
  step: step — how far out of the static the walk has come
  seed: seed — which particular static the walk starts from
variables:
  - the canvas partway along the walk
  - how far along the walk is
  - the pure noise it started from
  - the clean picture it walks toward
---

## Try it

1. Set step to 0 and stare at the canvas: pure static, no picture hiding in it — this is genuinely all the model is given.
2. Drag step up slowly: structure condenses out of the noise, vague blobs committing to edges — the exact reverse of the corruption the model trained on.
3. Jump to another seed at full step: a different picture — same model, same skill, different starting static. The variety of AI art lives entirely in the seed.

## Real-life examples

- **Step 0 on any image tool.** Behind every "generate" button, the canvas begins as this static — the prompt has not painted anything; it will only steer the walk.
- **The finished walk.** A hundred small denoising steps later, a clean image stands where no image ever was — not retrieved, not pasted together: condensed.
- **Re-rolling the seed.** The "variations" button is literally new static, same walk — which is why variations share style and differ in everything else.

## Test yourself

1. Return the canvas to pure static.
2. Walk seed #1 all the way to its clean picture.
3. Change the seed and walk again — confirm the same slider finds a different picture.

## Intuition

Teaching a network to paint from scratch sounds impossible, so diffusion teaches something embarrassingly easier: here is a slightly noisy picture — point toward the clean one. That is a supervised task with infinite free training data, because corrupting a photo with noise is trivial, and the right answer (the original) is known. Train on billions of such repairs, at every noise level from "barely dusty" to "pure static", and the model becomes an expert at one question: *in which direction does "more like a real picture" lie?*

Generation is that expertise run backwards. Start from static the model has never seen, ask it which way realness lies, take a small step, ask again — a hundred times — and a picture condenses that never existed anywhere. The seed slider is the honest answer to "where do different images come from": not from the model choosing, but from different starting static falling toward different valleys of the learned landscape. The prompt (not simulated here) merely tilts the landscape, so the walk condenses toward "a cat in the rain" instead of anywhere else.

## Formal

The sim's canvas is the straight-line bridge $x_u = (1-u)\,\varepsilon + u\,x_0$: at $u = 0$ pure noise $\varepsilon$, at $u = 1$ the clean picture $x_0$. Training samples a random $u$, builds $x_u$, and asks the network to recover the noise component — equivalently, to point from $x_u$ toward $x_0$.

Real diffusion schedules the blend over hundreds of levels and walks the reverse direction stochastically, re-asking the network at every level; text conditioning injects the prompt into every denoising step, and classifier-free guidance exaggerates the prompt's tilt. But the object being learned is exactly the pointer this page describes, and the generation loop is exactly this slider, dragged by the machine.

## Advanced

The field's practical breakthroughs are compressions of this walk: latent diffusion denoises in a small learned space rather than pixel space (hundreds of times cheaper — the step that put image generation on consumer hardware), and distillation collapses the hundred steps toward one, trading a little quality for real-time speed. The same recipe generates audio, video and molecular structures — anything where "noisy version" is easy to make. And the training data question is sharper here than anywhere: the landscape the walk falls into is carved entirely from the images the model saw, which is why style mimicry and data provenance became the art world's central AI dispute.

## Derivation

1. Corrupt a real picture $x_0$ with noise at a known blend $u$ — free training data, with the correct answer attached.
2. The bridge $x_u = (1-u)\,\varepsilon + u\,x_0$ defines every exam from trivial ($u$ near 1) to hopeless ($u$ near 0), and the model learns to point toward $x_0$ on all of them.
3. To generate, start at pure $\varepsilon$ and repeatedly step where the pointer says — the walk condenses onto a picture that was never in any dataset.

## Real world

### Image generators
Midjourney, DALL·E and Stable Diffusion are this walk with text steering — every output began as the static on this page.

### Photo restoration
Point the same pointer at a *genuinely* damaged photo and denoising becomes repair: old-photo restoration and super-resolution are diffusion's day job.

### Video and audio
Extend the canvas through time and the same condensation yields generated video frames and synthesized voices.

### Drug discovery
Diffusion over 3D atom positions proposes novel protein structures — static condensing into molecules instead of cats.
