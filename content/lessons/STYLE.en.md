# Writing lessons for a first encounter

Write as a teacher helping a student understand an unfamiliar idea. A fluent sentence is not enough: the reader should be able to explain the idea and predict what happens when they change an input.

## Build an explanation

1. Begin with a small question or worked example. Use an everyday situation when it fits; do not force an analogy into every topic.
2. Explain the idea before introducing its technical name. Keep the correct term and give it a meaning the student can use.
3. Connect the example to the actual diagram. Explain what the axes, marks and values represent.
4. Change one quantity while holding the others fixed. Explain both the observation and its cause.
5. Introduce notation after its meaning. Define symbols and units before relying on them.
6. Use Formal to state the rule and its conditions. Explain the relationship in words as well as symbols.
7. Explain where an approximation or analogy stops working. A tangent's slope describes nearby changes; it does not predict an exact change over an arbitrary interval.

Use short, connected sentences without making the prose choppy. Do not enforce a word count, require an analogy, or add stock phrases to every lesson. Avoid “obviously”, “nothing more mysterious”, “simply” as reassurance, and claims that something is easy. Remove theatrical descriptions when a concrete explanation would teach more.

## Check every learner-facing part

- **Title and summary:** say what the student will learn, without unexplained jargon or hype.
- **Try it:** give reproducible settings, an observation, and its meaning. Check the component before naming colors, gestures or animations.
- **Intuition:** build understanding rather than repeating slider instructions. Show the reasoning in a numerical example.
- **Formal:** explain each symbol and relevant condition, including zero denominators and domains.
- **Advanced:** add depth without putting information needed for the first explanation here.
- **Derivation:** explain why each step follows from the last.
- **Examples:** match preset values and units. Explain reference points when negative time or position appears.
- **Challenges:** describe the condition the checker actually evaluates. Include all controls a student must set.

## Review Arabic and English together

Read the lesson configuration and visualization implementation before rewriting. Recalculate numerical examples. Check that approximations, signs, units, and claims about maxima or minima are accurate. Fix a shared error in both languages.

Arabic is independently written teaching prose, not a sentence-by-sentence translation. Follow [the Arabic guide](STYLE.ar.md). Each language may use its own wording and familiar examples while teaching the same idea.

Keep the Markdown section headings because the parser uses them. The validator currently requires matching Intuition and Formal paragraph counts, matching Try it step counts, and identical math segments in the summary, Intuition, Formal and derivation notes. Coordinate structural edits across translations.

Run `pnpm check` after editing. It validates structure, formulas and challenge solvability; it cannot establish that the prose is natural or that the explanation teaches well. Read both versions aloud and ask whether a first-time learner could explain why the result changes.

## Reviewed examples and remaining work

See [the lesson-by-lesson review checklist](EDITORIAL_REVIEW.md) for coverage. The Numbers, Functions, Algebra, Discrete, Geometry, Trigonometry, Calculus, Statistics, Physics, Waves and Thermodynamics sections have received a complete bilingual editorial pass under this guide.

The remaining lessons still need individual review of their summaries, controls, explanations, examples and challenges. Do not treat a global phrase replacement or a successful build as an editorial review.
