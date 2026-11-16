---
title: 'Combinations: when order does not matter'
summary: 'Count groups whose members matter but whose order does not, such as choosing two students for a team.'
parameters:
  n: 'n — different items available'
  k: 'k — items in each group'
variables:
  - 'number of distinct available items'
  - 'number selected without repetition'
  - 'n choose k: number of groups with k members'
---

## Try it

1. Set n = 5 and k = 2. The diagram counts 10 groups. Tokens 1 and 2 form the same group whichever token you name first.
2. Keep n = 5 and change k to 3. There are still 10 groups: every pair left out determines one group of three.
3. Try k = 0, then k = 5. Each gives one choice: the empty group or the whole set. Keep k at or below n; the diagram caps it at n.

## Real-life examples

1. **Pizza toppings.** Choosing three different toppings from eight gives 56 selections. Each topping is either included or left out.
2. **Study group.** Choosing four students from nine gives 126 groups, provided there are no separate roles within the group.
3. **Two flavours.** Choosing two different ice-cream flavours from six gives 15 pairs. This count excludes choosing the same flavour twice.

## Test yourself

1. Make the number of groups exactly 10.
2. Choose no more than half the available items and make the number of groups exceed 50.
3. Set n = 10 and find k giving at least 250 groups.

## Intuition

Choose two students from five for a team. Counting a first and second choice gives 5 × 4 = 20 selections. But each team appears twice: once with each student chosen first. Divide by 2 to get 10 different teams. This kind of selection is called a combination.

For a group of three, each group appears in six orders. More generally, divide the ordered count by $k!$, the number of orders of a group of k distinct items. Choosing whom to leave out also identifies the group: $C(5,2)=C(5,3)$. The screen shows at most 60 groups, while the total counts every group.

## Formal

For n distinct items and an integer k satisfying $0\le k\le n$, the number of groups without repetition is $\binom{n}{k}=\frac{n!}{k!(n-k)!}$. Read the symbol as “n choose k.” A group contains each selected item once and has no assigned order.

Because choosing the included items also chooses the excluded ones, $\binom{n}{k}=\binom{n}{n-k}$. With $0!=1$, both choosing nothing and choosing everything give one group: $\binom{n}{0}=\binom{n}{n}=1$.

## Advanced

Pascal’s rule separates groups according to one particular item: groups that contain it choose their other k−1 members from n−1 items; groups that omit it choose all k members from those n−1. Adding these two counts gives C(n,k). This is why adjacent entries in Pascal’s triangle add to the entry below them.

## Derivation

1. First count selections in which order matters, with no repeated item.
2. Each group has $k!$ possible orders, so the ordered count includes every group that many times.
3. Divide by that repetition factor to count each group once.

## Real world

### A committee

A three-person committee chosen from twelve people has 220 possible memberships. Giving its members different offices would introduce another counting step.

### Sampling

Selecting five different cards from a 52-card deck gives 2598960 possible hands. If every hand is equally likely, the probability of a specified event is the number of hands meeting it divided by this total.
