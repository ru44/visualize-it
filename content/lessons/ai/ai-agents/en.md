---
title: 'AI agents: the loop around the model'
summary: >-
  A language model can only talk — what turns it into something that *does* is
  a plain software loop called a harness: model proposes an action, a tool runs
  it, the result is pasted back into the context, repeat until the errand is
  done.
parameters:
  t: t — run the episode
  steps: steps — how many trips around the loop are allowed
  tools: tools — whether the toolbox is available at all
variables:
  - the context after this trip
  - the context before it
  - what the tool just returned
---

## Try it

1. With tools on and budget 6, drag t to the end: four laps — look up, read, draft, send — each lap appending its result to the context bar, each tick unlocking the next.
2. Take the toolbox away and run again: the loop never turns; at the halfway mark the model simply *answers anyway* — fluent, confident, and checked against nothing.
3. Restore tools but cut the budget to 2: the agent dies mid-errand with the forecast in hand and the message never sent — budgets are real, and the checklist shows exactly where it stopped.

## Real-life examples

- **A coding assistant fixing a bug.** Read the file (lap 1), run the tests (lap 2), edit (lap 3), re-run tests (lap 4) — the same loop as the errand, with a compiler for a weather service.
- **The model alone.** Ask a bare model for tomorrow's weather and it *will* answer — from patterns, not from the sky. Without a loop there is no checking, only completion.
- **The timed-out agent.** Real harnesses cap laps and context; an agent that stops mid-research and reports what it has is this sim's out-of-budget ending, handled gracefully.

## Test yourself

1. Finish the errand: tools available, at least 4 laps of budget, episode run to the end.
2. Run the whole episode with the toolbox gone and watch what the model does instead of failing.
3. Run with tools but only 2 laps of budget and see which checklist items survive.

## Intuition

A language model is a text-completion engine: it cannot check the weather, send a message, or remember yesterday. Everything agent-like that you have seen it do comes from a surprisingly ordinary piece of software wrapped around it — the harness. The harness shows the model its context (the conversation plus everything gathered so far), lets it *propose* an action in text ("search for tomorrow's forecast"), actually executes that action with real code, and pastes the result back into the context. Then it asks the model again. That is the entire loop on screen: model, tool, result, context — repeat.

Each ingredient earns its place when you remove it. Take the tools away and the loop collapses to a bare model, which answers the weather question anyway — the guess in a nice suit — because completing text is all it can do; nothing in it knows that it does not know. Cut the budget and the agent stops mid-errand, because every lap costs real money and time, so harnesses enforce limits. And watch the context bar: appending results is the agent's *only* memory, so when the window fills, the oldest knowledge must be summarized or dropped. Agents did not arrive by making models bigger; they arrived when a plain while-loop started taking the model's words seriously enough to act on them.

## Formal

Each lap, the model reads $C_t$ and emits either an action or a final answer; the harness executes the action, obtains $r_t$, and sets $C_{t+1} = C_t + r_t$. The loop halts on a final answer, on the lap budget, or on the context limit.

The state is nothing but the growing context — the model's weights do not change during the errand. Correctness therefore hinges on two things the sim makes visible: whether the needed laps fit the budget, and whether the needed knowledge fits (and stays in) the window. Real harnesses add guardrails around the same skeleton: schemas constraining what actions may be proposed, permission checks before consequential ones, and retries when a tool fails.

## Advanced

The hard engineering questions all live in the loop's edges. *Grounding:* a tool result is pasted text, and nothing forces the model to use it faithfully — an agent can hold the correct forecast and still typo it into the message. *Error recovery:* a failed tool call must re-enter the context in a form the model recognizes as failure, or it will build on garbage. *Context economy:* long errands force the harness to summarize its own history, and what gets summarized away is genuinely forgotten. *Safety:* an agent's blast radius is its toolbox, so real deployments scope permissions per tool, require confirmation for irreversible actions, and log every lap — treating the model's proposals exactly the way the checklist treats them here: as suggestions to be executed by something accountable.

## Derivation

1. The model reads its context and proposes one action in text; the harness executes it with real code and captures the result $r_t$.
2. The harness appends it: $C_{t+1} = C_t + r_t$ — the only memory the agent has, and the only channel by which the world talks back.
3. The loop repeats until a final answer, the lap budget, or the window ends it — whichever comes first decides how the errand ends.

## Real world

### Coding agents
Tools are the editor, compiler and test runner; the loop reads failures and edits until green — software now routinely written this way.

### Research assistants
Search, open, read, cross-check across many laps — with the context window deciding how much of the investigation stays in mind at once.

### Computer-use agents
The toolbox is a screen, keyboard and mouse; each lap is a screenshot in, a click out — the same loop at the pixel level.

### Customer-service bots
Look up the order, check the policy, issue the refund — bounded toolboxes and strict lap budgets, because every action touches a real account.
