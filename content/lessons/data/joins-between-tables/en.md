---
title: Joins between tables
summary: A join lines up rows from two tables that share the same key, and inner and left join disagree only about what happens to the rows that have no partner.
parameters:
  mode: join type, mode
  orphan: keep the customer with no orders, orphan
variables:
  - A, the first table (customers)
  - B, the second table (orders)
  - R, the result table shown on the right
---

## Try it

1. Set mode to 0 (inner join) with orphan at 1. Yousef sits in the customers table on the left, but no line reaches him, and he never appears in the result.
2. Move mode to 1 (left join). The same Yousef row now appears in the result, with NULL where his order id and amount would be.
3. Push orphan to 0, removing Yousef from the customers table entirely. Now flip mode back and forth: the result stays the same four rows either way.

## Real-life examples

1. **A customer with no orders, dropped.** mode at 0 (inner), orphan at 1: Yousef signed up but never bought anything, so an inner join report of "customers and their orders" never mentions him.
2. **A customer with no orders, kept.** mode at 1 (left), orphan at 1: a marketing team doing a left join sees every customer, including Yousef, so they can email the ones who never ordered.
3. **Everyone has ordered.** mode at 1, orphan at 0: once every customer in the list has at least one order, inner and left join return exactly the same rows.

## Test yourself

1. Set mode to 1, switching to a left join.
2. With Yousef still in the customers table, set mode to 0, the inner join.
3. Remove Yousef from the customers table, then set mode to 1, the left join.

## Intuition

Picture two lists on a teacher's desk: a class roster with each student's name, and a list of homework hand-ins with a name on each slip. To grade fairly, the teacher matches each hand-in to the right student by name, the shared key. Sara and Lina each handed in one slip, so their names get matched. But Yousef, sitting on the roster, never handed anything in. An inner join only keeps names that show up on both lists, so Yousef is left off the matched report entirely. A left join keeps every name from the roster no matter what, and just leaves Yousef's homework column blank.

That blank is what a database calls NULL: not zero, not missing data by mistake, but "there was nothing on the other table to match." Toggling mode between inner and left changes nothing about the two original tables, customers and orders; it only changes which rows the join is willing to show once the matching is done.

## Formal

A join combines two tables, $A$ and $B$, by comparing a shared key, here customer id, row by row. An inner join keeps a combined row only when that key exists in both $A$ and $B$; any row of $A$ whose key never appears in $B$ is dropped from the result $R$.

A left join keeps every row of $A$ regardless of $B$: when a matching row exists in $B$ its columns are filled in, and when it does not, those columns are filled with NULL instead of dropping the row. So a left join's result always has at least as many rows as an inner join's, and the two are identical exactly when every row of $A$ has a match in $B$.

## Advanced

Real databases usually implement a join with an index or a hash table on the key column instead of comparing every row of $A$ against every row of $B$, which would cost a multiplication of the two table sizes; with a good index, matching one row of $A$ against $B$ takes roughly a constant or logarithmic number of steps instead.

## Derivation

1. A row of the combined table can only exist if its key is compared against the other table's keys first.
2. An inner join throws away any row whose key has no partner; a left join keeps it and pads the missing columns with NULL.
3. Either way, $R$ is the table actually shown to whoever ran the query.

## Real world

### Customer relationship management
A company joins its customer list to its orders list to build a "top spenders" report; customers who never ordered simply do not appear in an inner join version of that report.

### Online store checkouts
An online store's order confirmation page joins the orders table to the products table by product id, pulling in each item's name and price to show next to the order.

### Marketing emails
A left join between customers and orders is exactly how a marketing tool finds "customers who signed up but never bought anything": look for the rows where the order columns came back NULL.

### Spreadsheet lookups
A spreadsheet's VLOOKUP or XLOOKUP does the same matching by hand, one row at a time, that a database join does automatically for millions of rows.
