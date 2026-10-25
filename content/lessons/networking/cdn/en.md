---
title: 'CDN: the internet''s corner shops'
summary: >-
  You cannot make light travel faster, so the big sites stopped trying — they
  copied their files into thousands of little servers down the street from
  everyone, and now your movie comes from 50 km away instead of 9,000.
parameters:
  do: do — distance to the origin server
  de: de — distance to the nearest edge copy
  H: H — share of requests the edge can answer
variables:
  - the average request time
  - the edge round trip
  - the origin round trip
  - the cache hit rate
---

## Try it

1. Read the two trips with the defaults: 0.5 ms to the fridge down the street, 90 ms across the ocean — the same physics, just different distances.
2. Drag H from 90 down to 0 and watch the average slide from under 10 ms to the full ocean crossing: the CDN's whole value lives in that one percentage.
3. Now set H to 100 and shrink de: with every request answered next door, even a 12,000 km origin might as well not exist.

## Real-life examples

- **Movie night.** A 9,000 km origin, a 50 km edge, 95% of requests hitting the cache: average 5 ms instead of 90 — the difference between instant playback and a spinner.
- **No CDN at all.** Every request of every viewer crosses the ocean at 90 ms, and the origin melts under the load it must now serve alone.
- **A flash sale, cold caches.** Half the requests miss at first (H = 50): average 45 ms and an origin working hard — until the edges warm up minutes later.

## Test yourself

1. Serve at least 90% from an edge no farther than 50 km.
2. Set the hit rate to zero with a far origin and feel what the internet was like before CDNs.
3. Get the average under 2 ms while the origin stays at least 5,000 km away — only one slider can do it.

## Intuition

Physics sets a floor under every request: light in glass covers about 100 km per millisecond of round trip, so asking a server 9,000 km away costs 90 ms before any computer has thought about anything. No cable upgrade changes this — it is the speed of light, not a speed limit. The content delivery network is the only move left: if the data cannot travel faster, move the data closer *before it is asked for*. Copy the film, the stylesheet, the game patch into little warehouses in every city, and let each viewer fetch from the nearest one.

The map on screen is that bargain. The fridge down the street answers most requests in under a millisecond of travel; the ocean crossing still happens, but only for the fraction H the fridge doesn't hold. That fraction is the whole business: a CDN is only as good as its hit rate, which is why so much engineering goes into deciding what to cache, for how long, and how to warm a cold edge before the crowd arrives.

## Formal

With round trips $t_e = d_e/100$ and $t_o = d_o/100$ milliseconds, a hit rate of $H$ percent gives the average $\bar{t} = \frac{H\,t_e + (100-H)\,t_o}{100}$ — a weighted mean pulled between next door and across the planet by a single percentage.

The sensitivity is brutal at the top: moving H from 90 to 99 cuts the origin's share of traffic tenfold, which matters twice — once in the average latency, and once in the load the origin must bear. Caches can serve what does not change per person (video, images, scripts — the heavy majority of bytes); personalised responses still cross to the origin, which is why pages often paint instantly and then fill in your name a beat later.

## Advanced

What counts as "cacheable" keeps expanding: modern edges run code, terminate encrypted connections, and hold short-lived copies of API responses, pushing ever more of the conversation to within a few milliseconds of the user. The economics matter as much as the physics — origin bandwidth across oceans is expensive, edge bandwidth is cheap, so a high hit rate is a cost strategy, not just a speed one. And the same proximity makes CDNs the internet's shock absorbers: a traffic spike or a denial-of-service flood lands on thousands of edges instead of one origin, which is why "put it behind a CDN" is also the first line of defence.

## Derivation

1. A round trip over $d$ km of fibre costs about $\frac{d}{100}$ ms — distance is latency, with no negotiation.
2. So the two possible answers cost $t_e = \frac{d_e}{100}$ and $t_o = \frac{d_o}{100}$ ms, and chance H decides which one a given request pays.
3. The average is the weighted mean $\bar{t} = \frac{H\,t_e + (100-H)\,t_o}{100}$ — and since $t_o$ dwarfs $t_e$, the misses dominate it almost alone.

## Real world

### Video streaming
Netflix and YouTube place racks of edge servers inside ISPs' own buildings; the night's episodes are pushed there in advance, at off-peak hours.

### Software updates
A phone OS update lands on two billion devices in days only because every region downloads from copies already sitting nearby.

### News spikes
When everyone opens the same page at once, the edges absorb the stampede; the origin serves one copy per edge, not one per reader.

### Online games
Game clients fetch maps and patches from edges, while the latency-critical match traffic runs to dedicated regional game servers — the same geography logic, applied twice.
