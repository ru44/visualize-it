---
title: 'SS7: the hidden conversation before a phone rings'
summary: >-
  Before your friend's phone rings, the phone exchanges trade a few short
  messages on a network of their own. That network is SS7.
parameters:
  mode: mode — what you do (0 a call, 1 a text, 2 a trip abroad)
  step: step — how many messages have arrived so far
  h: h — links one message crosses
  hop: hop — time to cross one link
variables:
  - how long you wait (until you hear ringing, until "delivered", or until the phone works abroad)
  - round trips needed first (1 for a call, 2 for a text or a trip abroad)
  - links one message crosses, from one exchange through the relay points to the other
  - the time to cross one link
---

## Try it

1. Leave mode at 0 (a call) and move step from 0 to 5. Read each message in the bubble at the top. Then look at line 7 at the bottom: it is kept for you at step 1, carries your voices at step 3 and is free again at step 5.
2. Set mode to 1 (a text). The voice lines stay grey the whole time, because the text rides inside a signalling message. Count the messages: two to find the phone, two to deliver the text.
3. Raise h and hop. Each message crosses more links, and each link takes longer, so the wait in the last box grows.

## Real-life examples

- **Calling a friend in your own city.** Three links of 20 ms each. The first message reaches their exchange in 60 ms and the reply comes back in another 60 ms, so you hear ringing after 120 ms.
- **Texting a cousin in another country.** Six links of 25 ms. Your exchange first asks where the phone is, then sends the text, so two round trips pass before "delivered" appears: 600 ms.
- **Landing at an airport abroad.** You switch your phone on, and the exchange there talks to your home register across 7 links of 40 ms. After two round trips, about 1.1 s, calls can find you.

## Test yourself

1. In a call, stop at the moment your friend's phone starts ringing.
2. Send a text and stop when it appears on your friend's phone.
3. Make a call where you wait more than 500 ms before you hear ringing.
4. Finish a trip abroad, all five messages, with the whole thing taking under 100 ms.

## Intuition

You call a friend in another city. Before their phone rings, something happens that you never hear. Your exchange, the big computer at your phone company that connects calls, sends a short message to your friend's exchange: "a call for 0555 012 345, I am keeping line 7 for it." The other exchange answers: "got it, their phone is ringing." Only then do you hear the ringing tone. This chat between exchanges runs on a network of its own, called SS7.

Why a network of its own? Sixty years ago, exchanges talked to each other with tones sent down the same line as your voice. A tone of 2600 Hz meant "this line is free". Then people found that a toy whistle, given away in cereal boxes, made exactly that tone. Blow it into the phone and the exchange obeyed you, so people made long-distance calls for free. SS7 moved all the talk between exchanges onto separate wires, so nothing you say or whistle into a phone can reach it.

In the picture, the top half is that separate network. Your exchange is on the left, the relay points (the diamonds) are in the middle, and your friend's exchange and the home register are on the right. The bottom half shows the voice lines. Move step: the messages travel only along the top, while line 7 at the bottom is kept, then used, then freed. A voice line is busy only while you really talk.

SS7 does more than set up calls. A text message never touches the voice lines at all: it travels inside a signalling message, which is why old texts stopped at 160 letters. And when your friend lands in another country, the exchange there uses SS7 to tell the home register "this phone is here now". That is roaming. Set mode to 1 or 2 to watch both.

## Formal

SS7 (Signalling System No. 7) is a family of protocols standardised by the ITU-T in the Q.700 series. Its messages are small packets sent over signalling links and passed along by relay points called STPs (Signal Transfer Points). Calls between exchanges are set up with ISUP. The IAM (Initial Address Message) carries the number called and the voice circuit chosen, here line 7. The ACM (Address Complete Message) says the phone is being rung, the ANM says it was answered, and REL and RLC free the circuit when the call ends.

Texts and roaming use MAP, which talks to the HLR (Home Location Register), the database that knows which exchange is serving each mobile. If one message crosses $h$ links and each link takes $t_{\text{hop}}$, one message takes $h\,t_{\text{hop}}$. You hear ringing once the IAM has gone out and the ACM has come back, one round trip. A text and a roaming registration each need two round trips, so the wait is $t_{\text{wait}} = 2\,n\,h\,t_{\text{hop}}$. This is only the signalling part of the wait. Real phones add radio and processing time on top.

## Advanced

SS7 was designed in the 1970s and 80s for a small club of national phone companies that trusted each other. A message carries no proof of who sent it, and an exchange answers any correctly formed request that arrives on its links. Today hundreds of operators and resellers around the world have access, and some of that access has been rented out or misused. The same "where is this phone?" request that delivers your texts can then reveal which area a phone is in. A forged roaming registration can send someone's texts, one-time bank codes included, to another network.

Operators now put SS7 firewalls at their borders, which drop requests that should never come from outside, and banks are moving from text-message codes to approvals inside their apps. Newer networks have replaced parts of SS7: 4G uses Diameter for the same jobs, 5G uses web-style HTTP interfaces, and 4G calls travel as VoLTE using SIP. But SS7 still links much of the world's 2G, 3G and international traffic, so its old trust problem has not gone away.

## Derivation

1. One message crosses $h$ links, from one exchange through the relay points to the other, and each link takes $t_{\text{hop}}$. So one message takes $h\,t_{\text{hop}}$.
2. The answer comes back the same way, so one round trip takes $2\,h\,t_{\text{hop}}$.
3. A call rings after one round trip (IAM out, ACM back), so $n = 1$. A text needs two (ask where the phone is, then deliver), and so does a trip abroad (announce the phone, then receive what it may use), so $n = 2$.
4. Putting it together, $t_{\text{wait}} = 2\,n\,h\,t_{\text{hop}}$.

## Real world

### The ringing tone you hear
The ringing you hear while you wait is played by your own exchange, and it starts only when the ACM message has come back. Until then the network is still agreeing on the call.

### Why texts had 160 letters
A text had to fit inside one signalling message, which left room for 140 bytes. With 7 bits per letter, that is exactly 160 letters.

### Roaming abroad
When you switch on your phone in another country, the exchange there sends an SS7 message to your home register. From then on, every call and text for your number is sent abroad to find you.

### Keeping your number
When you move your number to a new company, other exchanges ask a database over SS7 which company owns the number now, before they set up the call.

### Stolen bank codes
In 2017, thieves in Germany used SS7 access to redirect bank customers' text-message codes to themselves and emptied their accounts. This is why operators now filter SS7 traffic and banks prefer app approvals.
