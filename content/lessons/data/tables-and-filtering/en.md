---
title: Filtering a table
summary: A database can hold millions of rows, and a filter pulls out only the ones you actually care about.
parameters:
  min: minimum amount, min
variables:
  - m, the threshold set by the min slider
---

## Try it

1. Drag the slider labeled min down to 0. Every row in the orders table stays lit up, and the readout shows rows returned = 12.
2. Set min to 20. The rows with an amount below 20 fade, and 4 rows stay highlighted: 22, 25, 30 and 40.
3. Set min to 40. Only the largest order, 40, is left, so rows returned = 1. Push min to 41 and no row is left at all.

## Real-life examples

1. **Show every order.** min at 0 keeps the whole table, useful when you want to see all the raw data first.
2. **Orders worth at least 20 dollars.** min at 20 filters out the small orders, leaving the ones worth chasing for delivery priority.
3. **Big spenders only.** min at 40 keeps only the single largest order, useful for finding your best customers.

## Test yourself

1. Set min to exactly 20.
2. Push min to 35 or higher, filtering out all but the biggest orders.
3. Set min to exactly 40, keeping only the single largest order.

## Intuition

Picture a shop's order book with just 12 rows: a city, a product and an amount for each sale. Drag the slider labeled min and watch the table's rows react — any row whose amount is min or more stays bright, and every row below it fades. This is exactly what a WHERE clause does in a database query: a row is kept only when $\text{amount} \ge m$, with m being the number the slider is set to.

Real databases can hold millions of rows, far too many to scan by eye, so the software filters them the same way: check each row against the condition and drop the rows that fail. A supermarket's till system might filter a year of receipts down to just the ones over 50 dollars, in the same instant it takes this table to filter 12 rows down to a handful.

## Formal

A filter keeps exactly the rows whose value satisfies a condition. A row survives when $\text{amount} \ge m$, where $m$ is the threshold set by the min slider; in SQL this is the query `SELECT * FROM orders WHERE amount >= m`.

Filtering never changes any row's data; it only decides which rows appear in the result. Raising $m$ can only remove rows from that result, never add new ones, so the filtered table is always a subset of the original one.

## Advanced

Without extra structure, a filter still has to look at every row once, so filtering a table of a billion rows costs on the order of a billion comparisons; an index, covered in a later lesson, lets a database skip most of that work.

## Derivation

1. m is simply the number you set with the slider, nothing more.
2. Any row whose amount is m or bigger passes the condition and is kept in the result.
3. Any row whose amount is smaller than m fails the condition and disappears from the result.

## Real world

### Online shopping

A store might filter orders above a certain value to give them free or priority shipping automatically.

### Spam filters

An email system filters incoming messages by a score, keeping the ones below a threshold in your inbox and routing the rest to spam.

### BigQuery dashboards

Analysts write WHERE clauses in BigQuery every day to narrow billions of rows down to the handful relevant to one question.

### Fraud alerts

A bank filters transactions above an unusual amount for a given account and flags only those for review.
