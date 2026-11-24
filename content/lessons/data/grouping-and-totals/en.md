---
title: Grouping and totals
summary: Instead of scrolling through every single order, grouping adds them up by city or by product so you can see the totals at a glance.
parameters:
  by: group by, by
variables:
  - T, a group's total
  - k, the group a row belongs to
---

## Try it

1. Set the slider by to 0. Rows from the same city take the same colour, and one bar per city shows its total: Riyadh 43, Cairo 50, Dubai 66, Amman 51.
2. Set by to 1 instead. The same 12 orders are now coloured by product, with one bar each: tea 54, coffee 117, juice 39.
3. Compare the two sets of totals: 43 + 50 + 66 + 51 = 210 and 54 + 117 + 39 = 210. The same 12 orders, grouped two different ways, add up to the same grand total.

## Real-life examples

1. **Total sales by city.** by at 0 groups every order by its city, so a manager can see which city is buying the most.
2. **Total sales by product.** by at 1 groups every order by its product instead, showing which product earns the most overall.

## Test yourself

1. Which product sold the most? Set by so the orders are grouped by product and read the total for coffee, 117.
2. With the orders grouped by product, find the product with the smallest total: juice, 39.

## Intuition

Say a shop sold three orders in Riyadh worth 12, 25 and 6 dollars: added up, that city sold 43 dollars in total. Flip the slider by between 0 and 1 and watch every row with the same city, or the same product, take the same colour and feed a single bar. That bar's number is the group's total, written $T(k) = \sum \text{amount}$, where k is whichever group — a city or a product — the bar stands for.

Grouping does not delete any information; it just reorganizes it. Every dollar in the original 12 rows is still counted once, only now sorted into fewer, more useful buckets. This is the idea behind SQL's GROUP BY together with SUM, two of the most common tools for turning a huge table into a short, readable report.

## Formal

Grouping partitions the rows of a table into disjoint groups that share a value k, then reduces each group to a single number. Here that number is a sum, $T(k) = \sum \text{amount}$, taken only over the rows belonging to group k; in SQL this is `SELECT city, SUM(amount) FROM orders GROUP BY city` when by is 0, or the same query with product when by is 1.

Because every row belongs to exactly one group, the totals $T(k)$ over every group always add back up to the sum of the whole table — grouping by a different column just slices the same total a different way.

## Advanced

A database usually computes a grouped total with a hash table: it reads each row once, looks up its group key k, and adds the row's amount into a running total for that key, which is why grouping a billion rows costs roughly as much as scanning them once, the same as a plain filter.

## Derivation

1. k just names which group a row belongs to: the city if by is 0, the product if by is 1.
2. Every row that shares the same k gets placed into the same group.
3. Adding up the amount of every row inside one group gives that group's total, T(k).

## Real world

### Sales dashboards

A manager checks daily sales grouped by store or by product to spot what is selling and what is not.

### School grade reports

A teacher groups scores by class to compute and compare each class's average.

### BigQuery analytics

Analysts run GROUP BY over billions of log rows in BigQuery to get a handful of totals per country or per device.

### Web analytics

A website groups visits by page or by country to see where its traffic actually comes from.
