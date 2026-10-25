---
title: 'DNS: the question every click asks first'
summary: >-
  Before any page can load, a name like visualize-it.example must become an
  address like 93.184.216.34 — and no machine on Earth knows them all, so the
  question walks down a chain of four who each know only who to ask next.
parameters:
  step: step — walk through the lookup
  cache: cache — the resolver already remembers (0 cold, 1 warm)
  rtt: rtt — one round trip at your distance
variables:
  - the cost of a cold lookup
  - the cost of a cache hit
  - one round-trip time
---

## Try it

1. With cache at 0, drag step from 0 to 4 and read each speech bubble: the resolver asks root, root points at the registry, the registry points at the site's own server, and only that last server knows the address.
2. Flip cache to 1 and drag step again: the whole upper chain greys out — the resolver answers from memory in a single round trip, and the stopwatch shows a quarter of the cost.
3. Raise rtt to 200 and run a cold lookup once more: 800 ms before the page can even *begin* — this is the lag you feel on a site nobody near you has visited lately.

## Real-life examples

- **A popular site.** Someone nearby asked for it seconds ago, so your resolver answers from cache: one 50 ms trip, and the page is already connecting.
- **An obscure blog, cold.** Nobody cached it, so the full chain runs: four round trips, 200 ms at typical distances, before the first real byte moves.
- **Hotel Wi-Fi abroad.** The same cold lookup at 200 ms per trip costs 800 ms — the strange first-click sluggishness of faraway networks is often DNS, not the page.

## Test yourself

1. Walk a cold lookup to the very end of the chain.
2. Serve a warm answer in 20 ms or less — cache on, short round trip.
3. Build the worst case: a cold lookup at 150 ms per trip or slower, walked to completion.

## Intuition

The internet runs on numbers, but people remember names. Something must translate — and the obvious design, one great phone book of every site on Earth, fails instantly: it would be out of date before it finished printing, and whoever held it would own the internet. DNS solves it with a chain of people who each know almost nothing. Root knows only where each ending — .com, .org, .example — keeps its registry. The registry knows only which server speaks for each name under it. And that final server, run by the site itself, knows the actual address.

Your resolver — usually your ISP's — does the legwork: three questions down the chain, each answered with "not me, ask them", until the real answer comes home. Then the crucial trick: the resolver writes the answer down. For the minutes the note is valid, every neighbour asking the same name gets it in one hop. The chain on screen is the truth; the greyed-out chain behind the cache is the reason the truth usually takes one hop instead of four.

## Formal

A cold lookup pays one round trip from you to the resolver plus the resolver's three trips down the hierarchy: $t_{\text{miss}} = 4\,t_{\text{RTT}}$ at the shown scale. A warm one pays only the first hop, $t_{\text{hit}} = t_{\text{RTT}}$.

Each answer carries a time-to-live — how long it may be cached. Short TTLs (minutes) let a site move servers quickly at the price of more cold lookups; long TTLs (hours) make the internet faster and staler. The hierarchy also partitions authority: changing your site's address needs no one's permission but your own name server's, which is why the system scales to a billion names with no central operator.

## Advanced

DNS answers were born unsigned, and a forged answer is a perfect trap: you typed the right name and arrived at the attacker's server. DNSSEC adds signatures down the chain so a resolver can verify each delegation. A separate modern fight is privacy — classic DNS queries travel as plaintext, letting any network on the path log every site you look up, which is exactly the leak the VPN lesson plugs; DNS-over-HTTPS instead wraps the queries in ordinary encrypted web traffic. And the resolver's cache, so innocent on screen, is the control point of the internet: national blocklists and parental filters are usually implemented as resolvers that simply refuse to answer certain names.

## Derivation

1. Nobody knows every address, but the chain is airtight: root knows the registries, each registry knows its names' servers, each site's server knows its own address — so a cold question resolves in exactly three referrals.
2. Counting your hop to the resolver, that is $t_{\text{miss}} = 4\,t_{\text{RTT}}$.
3. A cached answer skips every referral: $t_{\text{hit}} = t_{\text{RTT}}$ — a four-fold saving that every click after the first one enjoys.

## Real world

### The first click on any site
That odd pause before an unfamiliar site reacts is often the cold chain running — browsers even "prefetch" DNS for links you might click.

### Changing hosting
Moving a site to a new server is one record change at the authoritative name server; the move ripples out as caches expire, TTL by TTL.

### Outages that look like the internet dying
When a major DNS provider fails, thousands of healthy sites become unreachable at once — the servers are fine, but their names stopped resolving.

### Blocking and filtering
School filters, corporate policies and national blocks are mostly resolvers that answer selected names with silence or a warning page.
