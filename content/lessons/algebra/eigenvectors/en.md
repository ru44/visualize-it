---
title: Eigenvectors and eigenvalues
summary: >-
  A few special directions a matrix only stretches, never rotates. Find them
  and the whole transformation becomes simple.
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

## Intuition

Drag $vx,vy$ around and most of the time the arrow's direction changes as the matrix acts on it. But two special lines, drawn dashed on the grid, are different: a vector sitting on one of them stays on that same line after the transformation, only its length changes.

Those dashed lines are the eigen-directions of this matrix, and the readouts $\lambda_1,\lambda_2$ show exactly how much a vector on each line is stretched. A negative eigenvalue means the vector flips to point the opposite way along the same line.

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
