---
title: Risk and diversification
summary: >-
  Spreading the same money across many stocks instead of one shrinks the
  swing of possible outcomes without giving up the average return — but
  only down to a floor set by how much those stocks tend to move together,
  which is why adding more and more of them eventually stops helping.
parameters:
  v: single-stock volatility v
  n: number of stocks n
  c: average correlation c
variables:
  - volatility — how much a single stock's yearly return swings up or down, as a percent
  - count — how many different stocks the money is spread across
  - correlation — how much the stocks tend to move together, from 0 (independent) to 1 (in lockstep)
  - portfolio risk — the swing of the whole portfolio's return, the same kind of percent as volatility
charts: []
---

## Try it

1. Set «number of stocks n» to 1. Portfolio risk equals «single-stock volatility v» exactly — no diversification at all with just one stock.
2. Raise «number of stocks n» toward 30. Portfolio risk drops well below the single stock's volatility, even though the average expected return has not changed.
3. Raise «average correlation c» toward 0.8. Even with many stocks, portfolio risk stops shrinking much further — correlated stocks tend to fall together, so spreading money across them stops helping as much.

## Real-life examples

1. **One hot stock.** Betting everything on a single volatile tech stock at 45% volatility, n = 1 — portfolio risk is the full 45%, exactly as risky as the stock itself.
2. **Starter portfolio.** Spreading the same money across 10 stocks at 0.3 average correlation — portfolio risk drops to about 27.4%, a big cut for the same average return.
3. **Index-fund-like spread.** Spreading across 30 stocks at the same 0.3 correlation — portfolio risk falls only to about 25.6%, barely lower than the 10-stock case, because the correlated part of the risk cannot be diversified away.

## Test yourself

1. Get portfolio risk to exactly 20%.
2. Spread across more than one stock, and get portfolio risk under half of «single-stock volatility v».
3. Using at least 20 stocks with «average correlation c» under 0.2, get portfolio risk under 15%.

## Intuition

Every stock's risk is really two risks bundled together. One part is that company's own bad luck — a factory fire, a bad product launch, a lawsuit — and it has nothing to do with any other company, so spreading money across more and more stocks averages it away almost completely. The other part moves with the whole market or economy — recessions, interest rate jumps, oil shocks — and every stock feels some of it, so no amount of spreading can erase it; that shared part is exactly what «average correlation c» measures.

That is why the jump from 1 stock to 10 in the examples above is dramatic — 45% down to 27.4%, most of it the company-specific risk disappearing — while going from 10 stocks to 30 barely moves the needle, 27.4% down to just 25.6%. What is left near 25% is close to the floor set by the correlated risk, $v\sqrt{c} \approx 24.6\%$ here, and no amount of extra stocks at the same correlation gets much below it.

## Formal

Portfolio risk combines a diversifiable term that shrinks with «number of stocks n» and a correlated term that does not: $w = v\sqrt{\dfrac{1}{n} + \left(1-\dfrac{1}{n}\right)c}$, where $\dfrac{1}{n}$ is the diversifiable share and $\left(1-\dfrac{1}{n}\right)c$ is the share tied to how the stocks move together.

At one extreme, a single stock ($n=1$) leaves the diversifiable term equal to 1 and the correlated term equal to 0, so $w = v$ exactly; at the other, as «number of stocks n» grows very large, the diversifiable term vanishes and $w \to v\sqrt{c}$, a floor that more stocks alone cannot push below.

## Advanced

Diversification is sometimes called the only "free lunch" in investing, because — up to that correlation floor — it lowers risk without lowering the average return at all; the stocks' individual ups and downs partly cancel out even though each one is, on its own, exactly as likely to rise or fall as before.

## Derivation

1. Portfolio risk is the single-stock volatility scaled by a mix of a diversifiable share and a correlated share: $w = v\sqrt{\dfrac{1}{n} + \left(1-\dfrac{1}{n}\right)c}$.
2. With only one stock, nothing is spread out, so the formula collapses to the single stock's own volatility: as $n \to 1$, $w \to v$.
3. With very many stocks, the diversifiable part shrinks toward zero and only the shared, correlated part remains: as $n \to \infty$, $w \to v\sqrt{c}$.

## Real world

### Index funds
A fund holding hundreds or thousands of stocks pushes «number of stocks n» about as high as it can go, capturing nearly all of the diversifiable-risk reduction in one purchase instead of buying dozens of shares one at a time.

### International diversification
Stocks from different countries and industries tend to have lower «average correlation c» with each other than stocks from the same sector, which is why spreading across geographies and industries — not just across more companies — lowers the correlated risk floor itself.

### Crashes and correlation spikes
During a financial crisis, «average correlation c» tends to rise sharply as nearly everything sells off together, which is exactly when diversification's benefit shrinks the most — the one moment investors most wanted it to help.

### Over-concentration ("diworsification")
Adding more stocks from the same sector barely lowers «average correlation c», so a portfolio can hold dozens of stocks and still carry most of a single sector's risk — count alone is not the same as real diversification.
