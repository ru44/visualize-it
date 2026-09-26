---
title: Exchange rates
summary: >-
  An exchange rate says how much local currency it takes to buy one unit
  of a foreign currency, so when that rate rises — the local currency
  getting weaker — anything priced abroad costs more at home, and the
  same pile of local money converts into less of the foreign currency too.
parameters:
  p: import price p (USD)
  e: exchange rate e (EGP per USD)
  m: pounds to convert m
variables:
  - price — what the imported item costs abroad, in US dollars
  - rate — the exchange rate, how many Egyptian pounds it takes to buy one US dollar
  - pounds — how many Egyptian pounds are being converted
  - cost — what the imported item costs at home, in pounds
  - foreign — how many US dollars those pounds convert into
charts: []
---

## Try it

1. Raise «exchange rate e» while «import price p» stays fixed. The pound cost of the exact same imported item climbs — nothing about the item changed, only the exchange rate did.
2. Raise «exchange rate e» again and watch how many dollars «pounds to convert m» buys — the same savings reach less far abroad as the rate rises.
3. Drop «import price p» to something cheap. Even a much weaker «exchange rate e» barely moves the pound cost of a cheap item.

## Real-life examples

1. **Cheap accessory, strong pound.** A 50-dollar phone case at 20 EGP per dollar costs 1,000 EGP to import; 2,000 EGP saved for a trip converts to 100 dollars abroad.
2. **Game console.** A 300-dollar console at 30 EGP per dollar costs 9,000 EGP; the same 5,000 EGP saved converts to about 166.70 dollars abroad.
3. **Weak-currency crunch.** The same 300-dollar console, now at 50 EGP per dollar after the pound weakens, costs 15,000 EGP — two-thirds more for the identical console — and that same 5,000 EGP now converts to just 100 dollars abroad.

## Test yourself

1. Get the pound cost of the import to exactly 9,000 EGP.
2. With the pound weaker than 40 EGP per dollar, push the import's pound cost above 12,000 EGP.
3. With the pound weaker than 45 EGP per dollar, get the converted dollars below 100.

## Intuition

«exchange rate e» is just a price tag on money itself: it says how many Egyptian pounds one US dollar costs. A "weaker" pound sounds like it should mean a smaller number, but it actually means a bigger one — more pounds are now needed to buy the same single dollar. That is the whole trick of this lesson: watching «exchange rate e» climb is watching the pound get weaker, even though the number itself is going up.

Both directions feel that weakness at once. Importing the same 300-dollar console costs 9,000 EGP at a rate of 30 but 15,000 EGP at a rate of 50 — a weaker pound makes foreign goods pricier at home. At the very same time, the same 5,000 EGP that converted to 166.70 dollars abroad at a rate of 30 converts to only 100 dollars at a rate of 50 — a weaker pound also buys less on a trip abroad. Nothing about the item or the savings changed; only «exchange rate e» did, and it hit both numbers together.

## Formal

The pound cost of an import is its dollar price times the exchange rate, $c = p\,e$ — a straight multiplication, so cost rises in direct proportion to the rate.

Converting pounds the other way divides instead of multiplies, $f = \dfrac{m}{e}$ — the same «exchange rate e» that scales up the cost of imports scales down how much foreign currency a fixed pile of pounds can buy.

## Advanced

A weaker currency is not purely bad news: it makes a country's own exports and tourism cheaper for foreigners, since their dollars now convert into more pounds — the same «exchange rate e» that hurts importers and outbound travelers helps exporters and inbound visitors at exactly the same time.

## Derivation

1. Multiplying the item's dollar price by the exchange rate converts it into pounds: $c = p\,e$.
2. Dividing a pile of pounds by the exchange rate converts it into dollars: $f = \dfrac{m}{e}$.
3. Both formulas share the same «exchange rate e», so a weaker currency pushes cost up and foreign purchasing power down together: as $e$ rises (a weaker local currency), $c$ rises and $f$ falls.

## Real world

### Central bank intervention
Central banks sometimes buy or sell foreign currency reserves to push «exchange rate e» in a chosen direction, trying to keep imports affordable or exports competitive rather than leaving the rate to markets alone.

### The Big Mac Index
Comparing the price of an identical product, like a burger, converted through «exchange rate e» across countries gives a rough, informal check on whether a currency looks over- or under-valued relative to what money actually buys.

### Import-dependent economies
Countries that import most of their fuel or food feel a weakening «exchange rate e» fastest and hardest, since «import price p» for daily essentials converts straight into higher pound prices at the market.

### Tourism swings
A weaker «exchange rate e» makes a country cheaper for foreign visitors converting their own money in, which is why tourism often rises exactly when a currency weakens, even as the same rate makes trips abroad pricier for locals.
