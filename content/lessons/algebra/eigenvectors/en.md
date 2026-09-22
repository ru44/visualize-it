---
title: Eigenvectors and eigenvalues
summary: >-
  Discover the few special directions a transformation only stretches, never
  rotates — the shortcut engineers use to predict vibrations, rank web pages,
  and simplify repeated transformations.
parameters:
  a: matrix row 1, column 1
  b: matrix row 1, column 2
  c: matrix row 2, column 1
  d: matrix row 2, column 2
  vx: vector x-component
  vy: vector y-component
variables:
  - the identity matrix, which leaves every vector unchanged
  - the determinant of a matrix
---

## Try it

1. Drag the arrow's tip (vx and vy) around the grid and watch its direction bend as the matrix acts on it.
2. Notice the two dashed lines. Land the arrow exactly on one and watch it stay on that same line, only longer or shorter.
3. Read the two eigenvalue numbers next to the dashed lines — they show exactly how much each line's arrows stretch.

## Real-life examples

1. **Two blocks on springs.** Blocks linked by springs to each other and to the walls (matrix a=2, b=1, c=1, d=2) have two clean vibration patterns: swinging together, stretched 3 times as far, or swinging apart, stretched only once as far.
2. **A one-way growth process.** A population where one group feeds into a second but never the reverse (a=3, b=1, c=0, d=1) still grows cleanly along two directions, at rates 3 and 1.
3. **A satellite's pure spin.** A thruster system that only rotates a satellite by 90° (a=0, b=-1, c=1, d=0) has no real eigen-directions at all — nothing stays on its own line, because every direction turns.

## Test yourself

1. Find a matrix and an arrow (not the zero arrow) that stays on its own line after the transformation.
2. Make the matrix a pure rotation, so that no real direction — except the zero arrow — stays on its own line.
3. Make one eigenvalue exactly zero, so the matrix squashes one whole direction completely flat.

## Intuition

Picture two blocks connected by springs — to each other and to the walls on either side. Push them in a random way and they wobble in a tangled mix of motions. But two special pushes are clean: nudge both blocks the same amount in the same direction, or nudge them the same amount in opposite directions, and each block keeps doing exactly that motion, just growing or shrinking in size. On the grid here, those two clean pushes are the dashed lines, and the arrow is the push you are testing — drag its tip, set by vx and vy, and watch whether it stays on a dashed line or swings off it.

Drag the arrow off a dashed line and the matrix twists it sideways as it acts — a vector's direction usually changes. Land the arrow exactly on a dashed line instead, and the matrix only stretches or shrinks it along that same line, never bending it: the two numbers shown as the eigenvalues, one per line, say by how much. A negative eigenvalue means the arrow flips to point backward along its own line instead of stretching forward.

## Formal

A nonzero vector $\mathbf{v}$ is an eigenvector of $M$ with eigenvalue $\lambda$ when $M\mathbf{v} = \lambda\mathbf{v}$: applying the matrix has the same effect as simply multiplying by the number $\lambda$.

Rearranging gives $(M - \lambda I)\mathbf{v} = 0$, which has a nonzero solution only when the matrix $M - \lambda I$ is not invertible, that is, when $\det(M - \lambda I) = 0$.

## Advanced

A matrix that rotates the plane, like a 90° rotation, has no real eigenvectors at all: every direction turns, so the characteristic equation's roots are complex. Where real eigenvectors do exist, expressing $M$ in that eigenbasis turns matrix powers $M^k$ into simply raising each $\lambda$ to the power $k$, the basis of countless applications.

## Derivation

1. Write down what "only stretched, not rotated" means as an equation.
2. Move everything to one side to get a homogeneous system.
3. That system has a nonzero solution only where this determinant vanishes.

## Real world

### Vibration analysis
A bridge or building's natural modes of vibration are the eigenvectors of its stiffness matrix; the eigenvalues give the resonant frequencies.

### Search ranking
Google's original PageRank score is the eigenvector of the web's link matrix with eigenvalue 1.

### Quantum mechanics
A measurable quantity's possible outcomes are the eigenvalues of the operator that represents it.

### Population genetics
The long-run mix of genotypes under repeated mating is the eigenvector of the generation-to-generation transition matrix.
