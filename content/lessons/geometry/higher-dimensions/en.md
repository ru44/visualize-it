---
title: 'Five dimensions and beyond, up to eleven'
summary: The same drag works again and again. At 11 dimensions a cube has 2,048 corners, and counting tells you what no picture can.
parameters:
  n: n — how many dimensions the cube has
  spin: spin — turns the shadow so you can see it from another side
variables:
  - the number of pieces of dimension k inside the cube (corners when k is 0, edges when 1, square faces when 2, cubes when 3)
  - the number of dimensions of the whole cube
  - the number of dimensions of the piece you are counting
---

## Try it

1. Move n from 4 up to 11 and watch the corners. Each step doubles them. Where does the picture stop being something you can read?
2. Set n to 11 and drag the picture left and right. The shadow is a dense web, and that is honest: a flat screen cannot show 11 directions.
3. Pick any n and check the table at the right. Corners: twice the row above. Edges: twice the old edges, plus one for every old corner.

## Real-life examples

- **Five yes or no questions.** A quiz with 5 yes/no questions can be answered in 32 ways. Each answer sheet is one corner of the 5D cube (n = 5).
- **One byte.** A byte is 8 switches, each on or off, so it has 256 values. Each value is one corner of the 8D cube (n = 8).
- **Eleven switches.** A panel with 11 on/off switches has 2,048 settings and the cube has 11,264 edges: from each setting you can flip any one of the 11 switches (n = 11).

## Test yourself

1. Before you move the slider, guess which dimension gives exactly 256 corners. (Hint: a 4D cube has 16, and each step doubles.) Then set n and check.
2. Guess how many corners a 6D cube has. Then make a cube with more than 10,000 edges: which n is the smallest that works?
3. Find the dimension in which the cube has exactly 80 edges.
4. Find the dimension in which the cube has exactly as many square faces as cubes inside it.

## Intuition

The drag from the last lessons works again and again. Drag a cube in a fourth direction and you get a tesseract. Drag that in a fifth direction. Every time, the shape is copied and every corner is joined to its copy. Five dimensions: 32 corners. Eight: 256. Eleven: 2,048 corners and 11,264 edges.

Set n to 11. The picture turns into a dense web. That is honest. A flat screen cannot show eleven directions, so the shadow gets messy, and the counting carries the meaning. The table at the right counts it for you.

One formula gives every count: the pieces of dimension $k$ inside an $n$-dimensional cube. Corners are the pieces with $k = 0$, edges with $k = 1$, square faces with $k = 2$ and cubes with $k = 3$. Move n and read the readouts under the picture: they are the same formula each time.

Why would anyone want a shape with 11 dimensions? Because a list of 11 numbers describes one thing. A photo of a face described by 11 measurements, a recipe with 11 ingredients, a weather station with 11 readings: each one is a single point in an 11-dimensional space. And "how similar are two faces" becomes "how close are two points". The lesson on distance in any dimension shows how to measure that. The reasons physicists give for 11 are in the lesson on eleven dimensions.

## Formal

The pieces of dimension $k$ in an $n$-cube are found by two choices. First pick the $k$ directions the piece spreads in: there are $\binom{n}{k}$ ways. Then every one of the other $n-k$ coordinates is stuck at $+1$ or $-1$: $2^{\,n-k}$ ways. So $F_k = \binom{n}{k}\,2^{\,n-k}$.

Corners: $F_0 = 2^n$. Edges: $F_1 = n\,2^{\,n-1}$. For $n = 11$ that is $2048$ corners and $11264$ edges.

## Advanced

The numbers obey an identity: the pieces of all dimensions together are $3^n$. Choose for each coordinate $+1$, $-1$ or "free", which is three choices, and every piece is one such choice. Also, the alternating sum of the counts, corners minus edges plus faces and so on, is 1 for every cube, if the whole cube counts as one piece. It is a cube version of Euler's formula.

## Derivation

1. The piece spreads in $k$ directions. Choose which ones: $\binom{n}{k}$ ways.
2. The other $n-k$ coordinates are each $+1$ or $-1$, two choices each: $2^{\,n-k}$.
3. Multiply the two counts: $F_k = \binom{n}{k}\,2^{\,n-k}$.

## Real world

### Faces as points
Programs that recognise faces turn each photo into a list of measurements. Two photos of the same person end up close together as points, even in a space with hundreds of dimensions.

### Recipes and readings
A recipe with 11 ingredients, or a weather station with 11 readings, is one point in 11 dimensions. Nothing needs to be drawn to compare two of them.

### Bits and switches
A computer word of 8 bits is a corner of an 8D cube. Changing one bit moves you along one edge, to a neighbour.

### Why a web
A flat picture of an 11D cube is crowded because 2,048 corners and 11,264 edges are squeezed onto a screen. The counts are the useful part.
