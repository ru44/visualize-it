---
title: 'Linear equations: where the line crosses zero'
summary: 'Find the input that makes two amounts equal, and understand why its graph crosses zero.'
parameters:
  m: 'rate m'
  b: 'fixed amount b'
  k: 'target amount k'
  x: 'input x'
variables:
  - 'rate of change per input unit'
  - 'fixed amount before subtracting the target'
  - 'target on the right side of the equation'
  - 'unknown input; the graph reaches zero at a solution'
---

## Try it

1. Set m to 1.5, b to 2 and k to 8. At x = 0 the plotted output is -6: the left side is 6 below the target.
2. Set x to 4. The output is zero because 1.5 times 4 plus 2 equals 8.
3. Keep m and b fixed and raise k to 9. The line moves down by 1. You now need a larger x to reach zero.

## Real-life examples

1. **Buying notebooks.** At 1.50 per notebook plus a fixed fee of 2, a total of 8 buys 4 notebooks. Set x to 4 to verify the equality.
2. **An illustrative fare.** At 0.50 per kilometre plus a starting fee of 3, a total of 6 corresponds to 6 kilometres.
3. **Saving from a negative balance.** Start at -3 and add 2 each week. After 4 weeks, the balance is 5.

## Test yourself

1. Set x to -5 and choose m, b and k so the plotted output is approximately zero.
2. Set m to zero and b equal to k, so every input solves the equation.
3. Set m to zero and make the difference between b and k greater than 1 in magnitude, so no input solves it.

## Intuition

Suppose notebooks cost 1.50 each and delivery costs 2 regardless of quantity. A total budget of 8 leaves 6 for the notebooks. Dividing 6 by 1.50 gives 4 notebooks. We found the unknown by undoing the fixed addition and then the multiplication.

The equation records that calculation using x for the number of notebooks. The plotted height is the left side minus the target, not the total cost itself. A negative height means the total is below the target, and a positive height means it is above. At zero, the two amounts are equal.

Changing x tries another input. Changing m, b or k changes the problem. If m is zero, the input no longer affects the result. Then either the fixed amount already equals the target for every input, or no input can fix the mismatch.

## Formal

For $m\ne0$, the equation $mx+b=k$ has the unique solution $x=(k-b)/m$. Subtract b from both sides, then divide by m.

The plotted function is $f(x)=mx+b-k$. Its zeros are the solutions of the equation. At m = 0, there are infinitely many solutions if b equals k and no solutions otherwise.

## Advanced

An algebraic solution need not be usable in an application. Notebook counts must be nonnegative whole numbers, while a mathematical linear equation allows real solutions. A solution outside the displayed interval can also exist even when the visible line does not cross zero.

## Derivation

1. Write the equality between the calculated amount and the target.
2. Subtract the target from both sides. The left side is now the function shown on the graph.
3. Rearrange and divide by nonzero m. Treat m = 0 separately rather than dividing by zero.

## Real world

### Comparing plans

If two pricing plans use different fixed fees and rates, setting their total costs equal gives a linear equation under those assumptions.

### Converting units

A conversion that multiplies and then adds a constant can be reversed by subtracting and then dividing.

### Motion

For constant velocity, position changes linearly with time. Solving for a target position tells when it is reached, if the resulting time fits the situation.
