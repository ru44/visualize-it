---
title: Column storage and BigQuery
summary: Cloud warehouses like BigQuery store each column separately, so a query that only needs a couple of columns can skip reading the rest of a giant table, which is why it costs less.
parameters:
  cols: columns read, cols
variables:
  - B, the number of bytes a query scans
  - c, the number of columns the query reads
  - k, the total number of columns in the table
---

## Try it

1. Set cols to 1. The table highlights only the amount column, and only that column's bytes count toward the query.
2. Raise cols to 2. The product column lights up too, and the bytes scanned grow to match.
3. Push cols to 3. Every column, city, product and amount, is read, exactly like SELECT *.

## Real-life examples

1. **Just the total.** cols at 1: a query that only needs SUM(amount) reads a single column.
2. **Product and amount.** cols at 2: a report on revenue per product reads two columns.
3. **Everything.** cols at 3: SELECT * reads every column in the table, city, product and amount.

## Test yourself

1. Set cols so that only one column is read.
2. Set cols so that every column is read.
3. Set cols to exactly 2.

## Intuition

Imagine a table of a billion orders, each row holding a city, a product and an amount. Slide cols from 1 up to 3 and watch which columns in the table light up: at the lowest setting only amount is read, and at the highest all three are read. A column store keeps city, product and amount in three separate files on disk, so a query only opens the columns it actually needs, leaving the rest of the table completely untouched.

This matters because BigQuery, and warehouses like it, charge you by the number of bytes scanned. Reading one column of a billion-row table instead of all three can cut the bytes scanned, and the bill, to roughly a third — the fewer columns your SELECT lists, the cheaper and faster the query runs.

## Formal

A row-oriented table stores every column of a row together, so reading any single column still means reading all k columns of every row: $B = k \cdot 10^9$ bytes for a billion rows with k columns each. A column-oriented table instead stores each column on its own, so a query that names c columns only scans $B = c \cdot 10^9$ bytes.

Since a query almost always needs fewer columns than the table has, $c < k$ in practice, and a column store scans strictly fewer bytes than a row store for the same query — the saving grows with how wide the table is and how few columns the query actually names.

## Advanced

Storing a column on its own also compresses far better than mixing types row by row, since a column of cities or a column of amounts tends to repeat similar values; BigQuery combines this columnar layout with partitioning and clustering to skip even more bytes before a query ever runs.

## Derivation

1. In row storage a query still has to pull every one of the k columns along with the one it wants, so it scans B equal to k times a billion bytes.
2. In column storage a query only opens the c columns it actually names, so it scans B equal to c times a billion bytes instead.
3. Because c is normally smaller than k, naming fewer columns in a SELECT always means fewer bytes scanned, and a smaller bill.

## Real world

### BigQuery pricing
BigQuery's on-demand pricing charges per byte scanned, so writing SELECT city, amount instead of SELECT * can cut a bill dramatically.

### Data warehouses
Snowflake, Redshift and BigQuery all store data by column for the same reason: most analytics queries touch a handful of columns out of dozens.

### Analytics dashboards
A dashboard that refreshes every hour usually reads the same few columns repeatedly, so column storage keeps it fast and cheap.

### Machine learning pipelines
A training job often needs only a handful of feature columns out of a table with hundreds, so column storage lets it skip the rest entirely.
