---
title: 'Permutations: when order matters'
summary: 'Count ordered selections without repeating an item, such as choosing first and second place in a race.'
parameters:
  n: 'n — different items available'
  k: 'k — ordered places to fill'
variables:
  - 'number of distinct available items'
  - 'number of places, filled without repeating an item'
  - 'n factorial: product of the integers from 1 to n'
---

## Try it

1. Set n = 4 and k = 2. There are 12 arrangements: 4 choices for the first place, then 3 for the second.
2. Find the arrangements with tokens 1 and 2. Reversing them gives a different arrangement because the places have different meanings.
3. Keep n = 4 and set k = 3, then 4. Both counts are 24: after filling three places, only one item is left for the fourth. Keep k at or below n; the diagram caps it at n.

## Real-life examples

1. **Three medals.** With 8 runners and no ties, there are 8 × 7 × 6 = 336 ways to award gold, silver and bronze.
2. **A row of books.** Five different books have 5 × 4 × 3 × 2 × 1 = 120 orders on a shelf.
3. **A code without repeats.** A three-letter code made from six different letters has 6 × 5 × 4 = 120 possibilities if each letter can be used only once.

## Test yourself

1. Make the number of ordered selections exactly 60.
2. Set k equal to n and make the count greater than 100.
3. Leave at least three items unused, with fewer than 20 ordered selections.

## Intuition

Suppose four students are choosing a speaker and a note-taker. Any student can speak. Once the speaker is chosen, three students remain for the other role. Each of the four first choices has three possible partners, giving 12 assignments. Swapping the two students changes who does each job.

This is an ordered selection without repetition, called a permutation. The available choices decrease by one after each selection. The count does not always increase when you add a place: filling the very last place adds no choice. The screen lists at most 60 arrangements and omits the list for very large counts; the total still includes them all.

## Formal

For n distinct items and an integer k with $0\le k\le n$, the number of ordered selections without repetition is $P(n,k)=n(n-1)\cdots(n-k+1)=\frac{n!}{(n-k)!}$. The symbol n! means the product of the integers from 1 to n.

We define $0!=1$. Selecting nothing gives one empty selection, so $P(n,0)=1$; arranging everything gives $P(n,n)=n!$. If repetition is allowed instead, each place has n choices and the count is $n^k$.

## Advanced

A useful check is P(n,k+1) = P(n,k)(n−k). This relation explains both the rapid growth while many items remain and the equal counts for k = n−1 and k = n. If items are indistinguishable or some orders are forbidden, the basic formula needs adjustment.

## Derivation

1. Fill the places in sequence. There are n choices, then n−1, continuing until k places are filled.
2. Multiply by the missing factors in both numerator and denominator to express the product using factorials.
3. Cancel those extra factors. The convention 0! = 1 also covers choosing all n items.

## Real world

### Assigned roles

Choosing a chair, a secretary and a treasurer differs from choosing a three-person group. Exchanging two people changes the assignment.

### Codes

Check the repetition rule before counting. A four-digit code with leading zero allowed has 5040 possibilities without repeated digits, but 10000 with repeats. This count alone does not establish how secure a code system is.
