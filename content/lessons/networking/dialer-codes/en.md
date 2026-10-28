---
title: 'Dialer codes: why some numbers aren''t phone numbers'
summary: >-
  Type the right short string of stars and hashes into the dialer and it never
  places a call — the phone reads it as an instruction, and answers it three
  different ways depending on its shape.
parameters:
  code: code — pick what gets typed into the dialer
  rtt: rtt — one round trip to the carrier
variables:
  - the time until the answer comes back
  - round trips to the carrier (0 on the phone, 1 across the network)
  - one round trip to the carrier
---

## Try it

1. Leave code at 0: that is a normal phone number, all digits, so the dialer just rings it — no code, no trick.
2. Drag code to 1 ($\texttt{*\#06\#}$): the star-and-hash shape tells the dialer this is not a call. It is answered on the phone itself — the IMEI appears instantly, and the carrier is never contacted.
3. Drag on to 2 ($\texttt{*\#21\#}$) and 3 ($\texttt{*123\#}$): now the string is a question for your carrier. Watch the arrow jump to the network card; raise rtt and the reply takes longer, because it really does travel out and back.

## Real-life examples

- **Checking your IMEI.** You type $\texttt{*\#06\#}$ to read the phone's serial before selling it. It is handled on the device — instant, offline, nothing sent anywhere.
- **"Are my calls being forwarded?"** $\texttt{*\#21\#}$ asks the carrier to report your call-forwarding setting; the network answers with a little pop-up after one round trip.
- **Checking your balance abroad.** $\texttt{*123\#}$ is a USSD string: on a faraway network each round trip is slow, so even this tiny menu takes a noticeable moment to appear.

## Test yourself

1. Type something that is answered on the phone itself, with nothing sent to the carrier.
2. Send a USSD string that asks the carrier for one of its own menus.
3. Ask the carrier a question over a slow link — a round trip of 150 ms or more — so you can feel the delay.

## Intuition

The dialer looks easy: you tap numbers, you make a call. But it is really a tiny parser, and the first thing it does with whatever you typed is decide what kind of thing it is. All digits? That is a phone number — ring it. But a short string built from $\texttt{*}$ and $\texttt{\#}$, like $\texttt{*\#06\#}$, fits a pattern laid down in the GSM standard decades ago, and the dialer recognizes it as an instruction instead.

Those instructions split into three. A few are answered on the phone itself: $\texttt{*\#06\#}$ just reads a number out of the phone's own memory, so it replies the instant you press dial. Most are a polite question for your carrier — "is call-forwarding on?", "what's my balance?" — packed up and sent over the network, which is why they take a round trip and come back as a pop-up. And one special shape, $\texttt{*\#*\#...\#*\#*}$, isn't sent anywhere at all: the phone turns it into an internal announcement that an app on the phone can listen for, which is how a hidden info screen opens. Same keypad, three completely different destinations — and the shape of what you type is the only thing that decides.

## Formal

The grammar is in 3GPP TS 22.030. A supplementary-service string is $\texttt{*}$, $\texttt{\#}$, or a pair of them, then a 2–3 digit service code, then a parameter, closed with $\texttt{\#}$ — the prefix says whether you are interrogating ($\texttt{*\#}$), activating ($\texttt{*}$), deactivating ($\texttt{\#}$) or erasing ($\texttt{\#\#}$). The dialer matches that grammar; anything that fails it is treated as dialable digits.

Where the request goes decides the cost. A code the handset answers locally — the IMEI is the standard example — costs no network time: $t_{\text{resp}} = 0$. A code that becomes a supplementary-service request, or a USSD string, is sent to the carrier and answered after one round trip: $t_{\text{resp}} = t_{\text{RTT}}$. USSD differs from an SMS in that it holds a live session with the carrier's platform rather than storing a message, which is why its menus feel immediate once the round trip is paid.

## Advanced

The $\texttt{*\#*\#...\#*\#*}$ form is not part of the GSM standard at all; it is an Android convention. When the dialer sees it, it broadcasts an intent — $\texttt{android.provider.Telephony.SECRET\_CODE}$ with the digits as the host — and any app whose manifest registered a receiver for that exact host responds. The digits are usually a keypad mnemonic (4636 spells INFO), and the "secret" is only that a developer chose the number and wired it to a screen; nothing is hidden at the protocol level.

This split — standard network codes versus phone-local broadcasts — is also a security boundary. Because a plain web link or a QR code can hand a $\texttt{tel:}$ string straight to the dialer, a malicious one could try to auto-run a destructive supplementary-service code; modern Android blocks dialer strings that arrive this way, and requires the person to press dial for anything with network effects. The codes themselves are documented and ordinary; the care is all about who gets to type them.

## Derivation

1. The dialer first classifies the string: all digits means a call, while a string shaped like $\text{*\#SC\#}$ matches the supplementary-service grammar and is handled as a code.
2. A code the phone answers from its own memory, like the IMEI, contacts no one: $n = 0$, so $t_{\text{resp}} = 0$ and the reply is instant.
3. A code that is a question for the carrier — a call-forward status request, a USSD menu — makes one round trip: $n = 1$, so $t_{\text{resp}} = t_{\text{RTT}}$, and you wait exactly as long as the network is far.

## Real world

### Reading a phone's IMEI
Every shop that buys a used phone types $\texttt{*\#06\#}$ to read its serial — it works with no SIM and no signal because the phone answers itself.

### Carrier self-service
Prepaid plans across much of the world run on USSD: you top up, check balance and switch bundles through $\texttt{*123\#}$-style menus, no app and almost no data needed.

### Caller-ID control
Dialing $\texttt{\#31\#}$ before a number hides your caller ID for that one call — a per-call supplementary-service request the network honours and then forgets.

### Phishing by dialer string
Because a tapped link could once feed a code straight to the dialer, attackers tried to trigger harmful supplementary-service strings automatically; the defence built into modern phones is to never act on such a string without the person pressing dial.
