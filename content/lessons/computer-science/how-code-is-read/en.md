---
title: How code is read
summary: Before a compiler understands a single line of code, a tiny machine with five moods reads it one character at a time and sorts it into words, numbers and symbols.
parameters:
  line: example line
  step: characters read
variables:
  - the transition function — the machine's rulebook, taking a state and a character in and giving the next state out
  - the state the machine is in right now
  - the one character being read
  - the state the machine moves to after reading that character
charts: []
---

## Try it

1. Leave "example line" on the first line and press play. Watch the cursor move one character at a time, colouring each one as it settles into a state.
2. Slide "example line" to the second one and play again. Notice the state jumps straight from "number" to "syntax" the moment it hits a parenthesis, with no "space" state needed between them.
3. Drag "characters read" by hand instead of playing. Stop while a number is still being read, and its token stays marked "reading…" until the run of digits ends.

## Real-life examples

1. **Reading `total = price * 3 + tax`.** A name, an equals sign, another name, an operator, a number, an operator and a name — seven tokens in all — is exactly what a compiler for any language finds first, whatever it does with them next.
2. **Reading `if (x >= 10) y = x / 2`.** The parentheses each switch the state to "syntax" for one character, and `>=` is read as a single two-character "operator" token, not two separate ones.
3. **Reading `area = w * h - 4.5`.** The decimal point stays part of the same "number" token only because the state was already "number" when it appeared; a `.` anywhere else would start a new "syntax" token instead.

## Test yourself

1. Read the first line to the end and check how many tokens it becomes.
2. Read the second line to the end and check that `>=` became one token, not two.
3. Read the third line to the end and check that `4.5` became one token, not two.

## Intuition

The machine has no idea it's looking at code. It only knows five moods — number, text, operator, syntax, space — and one rule: look at the next character, decide which mood fits, and if that mood differs from the one you were just in, everything collected since the last change is a finished token. Drag the cursor slowly across `total = price * 3 + tax` and you can watch each mood take over in turn: text, space, operator, space, number, and so on.

The tricky part is that a character's meaning can depend on what came right before it. A `.` after digits extends the same number, `4.5`, but a `.` after letters would start something new. The machine handles this with exactly one piece of memory — its current state — which is also why it's called a state machine: nothing about the rest of the line matters, only the character under the cursor and the mood the machine happened to be in the moment before.

## Formal

A finite-state tokenizer is a function $\delta(q, c) = q'$: given the current state $q$ and the next character $c$, it returns the next state $q'$.

A token boundary falls exactly where $q' \neq q$, so the run of characters read since the previous boundary is exactly one token.

## Advanced

Real compilers generate this exact kind of state machine automatically from regular expressions — one pattern for numbers, one for identifiers, one for each operator — using tools like lex or re2c, which merge every individual pattern into a single deterministic automaton, so reading a file stays a single pass, one character at a time, however many token types the language defines.

## Derivation

1. The machine starts in one state $q$ and reads one character $c$ at a time.
2. A fixed rule $\delta(q, c) = q'$ says which state comes next.
3. Each time the state changes — whenever $q' \neq q$ — the characters read since the last change become one token.

## Real world

### Every compiler's first pass
Before a compiler can check types or generate machine code, it must turn raw text into a stream of tokens; this state machine is lesson one of how that's done.

### Syntax highlighting in your editor
The colours your code editor paints as you type come from a tokenizer just like this one, running on every keystroke.

### JSON and config parsers
Reading `{"a": 1}` starts the same way: syntax characters, text, numbers and punctuation are told apart character by character before any structure is checked.

### Search and log tools
Command-line tools that split a log line into fields, or a search engine splitting a sentence into words, use the same character-by-character state tracking.
