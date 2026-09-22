---
title: MapReduce
summary: Instead of one computer reading every document alone, MapReduce splits the work across many machines and then combines their answers into one.
parameters:
  step: stage, step
variables:
  - D, the dataset being processed
  - k, how many machines share the work
  - T, the final combined answer
---

## Try it

1. Set step to 0. Watch the four documents get split, one to each machine.
2. Move step to 1, then 2. Each machine counts words in its own document, then the partial counts shuffle together by word.
3. Push step to 3. The shuffled counts reduce into one final total for every word across all four documents.

## Real-life examples

1. **Splitting the work.** step at 0: four essays are handed out, one to each of four graders.
2. **Counting independently.** step at 1: each grader counts word frequency in their own essay, with no need to talk to the others.
3. **Combining the results.** step at 3: the department combines every grader's counts into one final report.

## Test yourself

1. Move step to 1, the map stage.
2. Move step to 3, the reduce stage.
3. Reach the shuffle stage or later, step at 2 or higher.

## Intuition

Say four friends each need to count how many times the word "the" appears across four different books. Instead of one person reading all four books alone, each friend reads their own book first. Move the slider step through split, map, shuffle and reduce and watch the four documents follow exactly that path: split hands one document to each machine, map counts within each document separately, and reduce finally adds the separate counts into a single number, T.

This is the idea behind MapReduce, the technique behind tools like Hadoop and Spark, and the same principle BigQuery itself uses internally to answer a huge query with thousands of machines instead of one. Splitting the work lets every machine run at the same time, so four machines can finish a job in roughly a quarter of the time one machine alone would need.

## Formal

MapReduce breaks a big computation over a dataset D into three stages. Split divides D into k independent chunks; map applies the same function to every chunk, on a separate machine, in parallel; reduce combines all the machines' partial results into a single answer: $T = \text{reduce}(\text{map}(\text{split}(D, k)))$ names the whole pipeline in one line.

Because map runs independently on every chunk, adding more machines lets more chunks run at the same time, which is exactly why the technique scales to thousands of machines and to datasets far too large for any single computer to hold.

## Advanced

The shuffle stage, which regroups partial results by key before the final reduce, usually moves the most data over the network and is often the real bottleneck of a MapReduce job; modern systems such as Spark and BigQuery's own execution engine cut this cost with smarter data placement and by combining partial results earlier, closer to where the data lives.

## Derivation

1. Splitting a dataset D into k pieces means every one of the k machines has its own chunk to work on, with no overlap.
2. In the map stage, every one of the k machines processes only its own chunk, completely independently of the rest.
3. The reduce stage gathers the k separate results and combines them into the single final answer, T.

## Real world

### Word count and search indexes
Google introduced MapReduce to build its search index, counting words across billions of web pages spread over many machines.

### Hadoop and Spark
Open-source tools such as Hadoop and Spark took the same split, map, shuffle, reduce idea and made it available to anyone with a cluster of machines.

### BigQuery's execution engine
BigQuery answers a single SQL query by splitting the underlying data across thousands of machines behind the scenes, in the same spirit as MapReduce.

### Log analysis at scale
A company with billions of log lines a day uses this pattern to count errors or events per hour without any single machine reading them all.
