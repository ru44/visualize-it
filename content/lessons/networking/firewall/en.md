---
title: 'Firewalls and ports: a wall with 65,535 doors'
summary: >-
  Every computer on the internet has 65,535 numbered doors, and somewhere out
  there a bot is patiently knocking on all of them — a firewall is the wall
  that bricks every door shut except the few you meant to open.
parameters:
  web: web — door 443, your website (0 closed, 1 open)
  ssh: ssh — door 22, remote login (0 sealed, 1 open)
  R: R — how fast the scanner bot knocks
variables:
  - how many doors stand open
  - the scanner's tries per minute
---

## Try it

1. Watch the defaults: honest visitors stream through door 443 to your website, while the scanner bot's probes rain against brick and bounce — the wall is doing its job invisibly.
2. Open ssh and raise R to 300: within moments the bot finds door 22 answering, and the red counter starts — a stranger is now guessing passwords at your remote login, around the clock.
3. Close both doors: perfectly safe, perfectly dark — the site is unreachable too. Security is choosing which doors *earn* their opening.

## Real-life examples

- **A healthy web server.** One door open on purpose (443), everything else brick: the bot's hundred tries a minute — 144,000 a day — all bounce.
- **The forgotten SSH port.** A server set up in a hurry, door 22 left answering: internet-wide scanners find a fresh open port within minutes, and the password guessing begins the same hour.
- **Full lockdown.** A database server with zero internet-facing doors — reachable only from inside the network, exactly as the VPC lesson arranges it.

## Test yourself

1. Run the healthy setup: web serving, remote login sealed.
2. Recreate the classic mistake: ssh open under a heavy scan — then read what the bot is doing to it.
3. Brick everything and confirm both panels: no attack surface, and no website either.

## Intuition

An address gets a packet to your machine, but a machine runs many conversations at once — so every packet also names a door number, a port: 443 for the website, 22 for remote login, 25 for mail. The port system is just apartment numbers for programs. The trouble is that the building sits on a street the whole world walks: automated scanners sweep the entire internet continuously, knocking on every door of every address, cataloguing whatever answers. They are not targeting you; they are targeting *everyone*, which includes you.

A firewall is the stupidest security idea that works: a wall where every door is bricked shut unless you explicitly chose otherwise. The honest visitor walks to 443 and is served. The scanner's thousand knocks hit brick and learn nothing. The whole game is the short list of exceptions — each open door is a standing promise that the program behind it can defend itself against everything the street brings, forever. Fewer promises, fewer ways in.

## Formal

Ports are 16-bit numbers, so $2^{16} - 1 = 65{,}535$ doors exist per address. A default-deny firewall reduces the reachable set from all of them to $n_{\text{open}}$, your attack surface — the only places where a software bug can be probed from outside: exposure $\propto n_{\text{open}}$.

A scanner at $R$ tries per minute lands $1440\,R$ knocks a day; against brick they cost you nothing, which is the point. Real firewalls refine the idea with direction (your own outgoing requests and their replies pass freely — the wall faces the street) and with state: an answer is matched to the conversation that asked for it, so "replies to things I started" is allowed as a category without opening any door.

## Advanced

The sharpest modern refinement is who may use an open door: door 443 open *to the world* is the cost of having a public website, but door 22 open to the world is unnecessary — firewalls restrict it to the office's addresses, or brick it entirely and put SSH behind the VPN from two lessons back, so the door exists only for people already inside the sealed pipe. Beyond that lies the "zero trust" turn: assume the wall will someday be breached, and demand that every service authenticate every caller even indoors — walls as the first layer, never the only one. And the scanner's eye view is public: sites like Shodan let anyone search every answering door on the internet, which is why "nobody will find it" lasts minutes, not years.

## Derivation

1. A port number is 16 bits, so each address offers $2^{16} - 1 = 65{,}535$ possible doors.
2. Default-deny bricks them all; running services open doors one by one, so $n_{\text{open}}$ counts your deliberate promises.
3. A bot at $R$ tries per minute knocks $1440\,R$ times a day — a number that only matters multiplied by the doors that answer, which is why the healthy wall makes it multiply by one, or zero.

## Real world

### Your home router
It firewalls by design: nothing outside can open a conversation inward, which is why your laptop survives the open internet at all.

### Server hardening
The first command on any new cloud server is enabling the firewall and allowlisting the two or three ports the machine is actually for.

### Ransomware's favourite door
Exposed remote-desktop and SSH ports with guessable passwords remain a leading way into company networks — the sim's red counter, in real life.

### Game servers and port forwarding
Hosting a game from home means deliberately opening one door through the router's wall — the rare case where a home network makes a promise to the street.
