---
title: Bytes and data sizes
summary: Every photo, song and database is really just a count of bytes, and this lesson shows how fast that count explodes as data gets "big."
parameters:
  e: exponent e
variables:
  - the exponent on the slider, counting how many tens are multiplied together
  - N, the resulting number of bytes
---

## Try it

1. Drag the slider labeled e all the way to 0. The bar now shows a single byte, about one letter of text.
2. Move the slider to about 6. Watch the label above the bar jump from byte to kilobyte to megabyte as it grows.
3. Push the slider past 20. The bar now stands for more data than every computer you have ever owned put together.

## Real-life examples

1. **A single letter.** One typed character costs about one byte to store, so e sits at 0.
2. **A phone photo.** A typical phone photo is a few megabytes, so e sits around 6.6, about 4,000,000 bytes.
3. **All the world's data in a year.** Every video, message and sensor reading humanity records in a year adds up to roughly a 1 followed by 21 zeros in bytes, so e climbs close to 22.

## Test yourself

1. Set the slider e to exactly 9, the size of a small company's whole database, about a gigabyte.
2. Bring the number of bytes to exactly 1,000,000, one megabyte, the size of a short song.
3. Push e to 20 or higher, into the range data scientists call "big data."

## Intuition

Type a single letter and your computer stores about one byte. Type a whole novel and it stores a few million bytes. Drag the slider labeled e and watch the bar grow: e counts how many tens are multiplied together, so the number of bytes N works out to $10^e$ bytes in total. Raise e by just 1 and N grows tenfold, which is why the bar shoots up so fast once e passes 10.

Every time e climbs by 3, the bar crosses into a new named size: byte, kilobyte, megabyte, gigabyte, terabyte, and on. Cloud services such as BigQuery even charge you by how many of these bytes a query scans, so the higher the bar climbs, the more a single query can cost.

## Formal

A byte is the basic unit of digital storage. This lesson writes the total number of bytes as $N = 10^e$, where the exponent $e$ is exactly the slider's value — scientific notation for enormous counts, so $e = 22$ stands for a one followed by twenty-two zeros.

Because $N = 10^e$, the exponent can be recovered with a base-ten logarithm, $e = \log_{10} N$. Storage names change every three steps of e — kilo, mega, giga, tera — because $10^{e+3} = 1000 \cdot 10^e$: three more in the exponent always means a thousand times more bytes.

## Advanced

Computers often measure memory in powers of two, 1024 bytes to a kibibyte, while storage and network bandwidth are usually sold in powers of ten, 1000 bytes to a kilobyte, so the same amount of data can carry two slightly different labels; cloud warehouses such as BigQuery bill in decimal bytes, matching the $10^e$ scale used here rather than the binary one.

## Derivation

1. The slider fixes the exponent e, and multiplying ten by itself e times gives the total number of bytes, N.
2. Running that backwards with a base-ten logarithm recovers e from N, since the logarithm just counts how many tens were multiplied together.
3. Adding 3 to the exponent multiplies in three more tens, which is 1000, so every jump of 3 in e — kilo to mega, mega to giga — means a thousand times more bytes.

## Real world

### Photos and video
Phone photos run a few megabytes each and video is far larger, which is why a phone or laptop can run out of storage so quickly.

### Genomics
Sequencing one human genome produces on the order of a hundred gigabytes of raw data, and hospitals now keep this for thousands of patients.

### Cloud storage and BigQuery
Services such as Google's BigQuery store your tables in the cloud and bill you partly by how many bytes your queries scan, so the size of your data in bytes has a real cost attached to it.

### Streaming libraries
A large streaming catalogue of movies and shows can reach into the petabytes, e around 15, spread across thousands of machines.
