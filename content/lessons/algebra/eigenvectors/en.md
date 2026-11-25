---
title: Eigenvectors and eigenvalues
summary: 'Find nonzero vectors that a matrix scales along their own line, and read the corresponding scale factors.'
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

1. Set a = 2, b = 1, c = 1 and d = 2. With vx = vy = 1, the input (1, 1) becomes (3, 3): its line is unchanged and its length triples.
2. Set vx = 1 and vy = -1. The output is (1, -1), unchanged. This is another eigenvector, with scale factor 1.
3. Set a = 0, b = -1, c = 1 and d = 0. A quarter-turn rotation has no real eigenvector; the display removes the real eigen-direction guides.

## Real-life examples

1. **Two invariant directions.** The matrix with rows (2, 1) and (1, 2) scales (1, 1) by 3 and (1, -1) by 1. These numbers are scale factors of this map, not vibration frequencies.
2. **A triangular matrix.** With rows (3, 1) and (0, 1), the eigenvalues are 3 and 1. Directions (1, 0) and (1, -2) provide corresponding eigenvectors.
3. **Quarter-turn rotation.** With rows (0, -1) and (1, 0), every nonzero real vector moves off its original line. The eigenvalues are complex.

## Test yourself

1. Choose an input vector of length greater than 1 whose image lies along the same line, within the checker tolerance.
2. Make (a minus d) squared plus 4bc negative so there are no real eigenvalues. A quarter-turn rotation is one example.
3. Make the determinant zero, giving at least one zero eigenvalue.

## Intuition

A matrix usually changes both the length and direction of an arrow. Some arrows are special: the result lies along the same line as the original. A nonzero arrow with this property is an eigenvector, provided the result is a scalar multiple of it.

The scalar is the eigenvalue. A value of 3 triples the arrow; 1 leaves it unchanged; -1 reverses it without changing its length. A value of zero collapses it to the origin. The zero vector itself is excluded from the definition because every matrix sends it to zero, so it identifies no special direction.

## Formal

A nonzero vector $\mathbf{v}$ is an eigenvector of M with eigenvalue $\lambda$ if $M\mathbf{v}=\lambda\mathbf{v}$. Negative eigenvalues reverse the arrow along its line; zero collapses it.

Rearranging gives $(M-\lambda I)\mathbf{v}=0$, where I is the identity matrix. A nonzero solution exists exactly when $\det(M-\lambda I)=0$. Solve this equation for eigenvalues, then find the corresponding nonzero vectors.

## Advanced

A real matrix may have two independent real eigen-directions, one, none, or infinitely many. The identity makes every nonzero vector an eigenvector, although the diagram shows only representative guides. Expressing all vectors in an eigenbasis is possible only when there are enough independent eigenvectors; merely having real eigenvalues is not sufficient.

## Derivation

1. State that applying the matrix gives a scalar multiple of the original nonzero vector.
2. Move the scalar multiple to the left using the identity matrix.
3. Require a singular coefficient matrix so the homogeneous system can have a nonzero solution.

## Real world

### Repeated transformations

Along an eigenvector, applying the same matrix repeatedly raises the eigenvalue to successive powers.

### Decoupling a model

When an eigenbasis exists, changing coordinates to that basis separates a linear transformation into independent scaling operations.

### Vibration models

Natural-mode calculations can use eigenvalue problems involving both stiffness and mass. The connection between eigenvalues and frequency depends on the actual model.
