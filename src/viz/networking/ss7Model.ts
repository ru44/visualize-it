// The ss7 lesson's model, shared by the flat picture (Ss7Signal.vue) and the 3D scene (Ss7Signal3D.vue).
// Three conversations on the signalling network: a call (ISUP), a text (MAP) and a phone arriving abroad
// (MAP roaming). Places: A on the left (your exchange, or the exchange abroad), B on the right (your
// friend's exchange) and HLR (the friend's home register), both hanging off the last relay point (STP).
// Every message crosses h links, each taking t_hop ms, so what you wait for takes 2·n·h·t_hop.
import type { Key } from '../../i18n'

export type Place = 'A' | 'B' | 'H'
export interface Msg {
  code: string
  from: Place
  to: Place
  say: Key
}
export const MODES = ['ss7.mode.call', 'ss7.mode.sms', 'ss7.mode.roam'] as const satisfies readonly Key[]

export const FLOWS: Msg[][] = [
  [
    { code: 'IAM', from: 'A', to: 'B', say: 'ss7.m.iam' },
    { code: 'ACM', from: 'B', to: 'A', say: 'ss7.m.acm' },
    { code: 'ANM', from: 'B', to: 'A', say: 'ss7.m.anm' },
    { code: 'REL', from: 'A', to: 'B', say: 'ss7.m.rel' },
    { code: 'RLC', from: 'B', to: 'A', say: 'ss7.m.rlc' },
  ],
  [
    { code: 'SRI-SM', from: 'A', to: 'H', say: 'ss7.m.sri' },
    { code: 'SRI-SM ✓', from: 'H', to: 'A', say: 'ss7.m.sriOk' },
    { code: 'MT-FSM', from: 'A', to: 'B', say: 'ss7.m.fsm' },
    { code: 'MT-FSM ✓', from: 'B', to: 'A', say: 'ss7.m.fsmOk' },
  ],
  [
    { code: 'UL', from: 'A', to: 'H', say: 'ss7.m.ul' },
    { code: 'CL', from: 'H', to: 'B', say: 'ss7.m.cl' },
    { code: 'ISD', from: 'H', to: 'A', say: 'ss7.m.isd' },
    { code: 'ISD ✓', from: 'A', to: 'H', say: 'ss7.m.isdOk' },
    { code: 'UL ✓', from: 'H', to: 'A', say: 'ss7.m.ulOk' },
  ],
]

/** What is true once `step` messages have arrived (step 0: before the first one leaves). */
export const STATES: Key[][] = [
  ['ss7.s.call0', 'ss7.s.call1', 'ss7.s.call2', 'ss7.s.call3', 'ss7.s.call4', 'ss7.s.call5'],
  ['ss7.s.sms0', 'ss7.s.sms1', 'ss7.s.sms2', 'ss7.s.sms3', 'ss7.s.sms4'],
  ['ss7.s.roam0', 'ss7.s.roam1', 'ss7.s.roam2', 'ss7.s.roam3', 'ss7.s.roam4', 'ss7.s.roam5'],
]
/** Round trips n before the thing you wait for: ringing (IAM out, ACM back); "delivered" and "registered" take two. */
export const ROUND_TRIPS = [1, 2, 2]
export const WAIT_FOR: Key[] = ['ss7.wait.call', 'ss7.wait.sms', 'ss7.wait.roam']

/** The voice line kept for the call: free, held for the call, carrying voices. */
export type Line = 'free' | 'held' | 'talk'
export function lineAt(mode: number, step: number): Line {
  if (mode !== 0 || step === 0 || step >= 5) return 'free'
  return step === 3 ? 'talk' : 'held'
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
export function readParams(p: Record<string, number>) {
  const mode = clamp(Math.round(p.mode ?? 0), 0, 2)
  const flow = FLOWS[mode]
  return {
    mode,
    flow,
    /** messages that have arrived; modes with four messages stop at 4 */
    step: clamp(Math.round(p.step ?? 0), 0, flow.length),
    h: clamp(Math.round(p.h ?? 3), 2, 8),
    hop: clamp(p.hop ?? 20, 5, 300),
  }
}

export const LINE_NO = 7
export const LINE_SAY: Record<Line, Key> = { free: 'ss7.line.free', held: 'ss7.line.held', talk: 'ss7.line.talk' }

/** A slow-down that makes one message take at least 1.6 s on screen, from a short list of round factors. */
export function slowFor(msgMs: number) {
  for (const k of [1, 2, 5, 10, 20, 50, 100, 200, 500]) if ((msgMs * k) / 1000 >= 1.6) return k
  return 500
}
