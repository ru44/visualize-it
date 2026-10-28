import type { Key } from '../../i18n'

// The five strings the dialer-codes lesson types, shared by the flat picture (MmiDialer.vue) and the
// 3D scene (MmiDialer3D.vue) so both agree on what each one is and where it goes. n is the number
// of round trips to the carrier before the answer appears.
export type Seg = { s: string; k: 'px' | 'sc' | 'sx' | 'num' }
export type Dest = 'phone' | 'network' | 'app' | 'call'
export interface Code {
  seg: Seg[]
  kind: Key
  dest: Dest
  answer: Key
  n: 0 | 1
}
export const CODES: Code[] = [
  { seg: [{ s: '070 123 4567', k: 'num' }], kind: 'mmi.c.number', dest: 'call', answer: 'mmi.a.call', n: 0 },
  { seg: [{ s: '*#', k: 'px' }, { s: '06', k: 'sc' }, { s: '#', k: 'sx' }], kind: 'mmi.c.mmi', dest: 'phone', answer: 'mmi.a.imei', n: 0 },
  { seg: [{ s: '*#', k: 'px' }, { s: '21', k: 'sc' }, { s: '#', k: 'sx' }], kind: 'mmi.c.ss', dest: 'network', answer: 'mmi.a.cf', n: 1 },
  { seg: [{ s: '*', k: 'px' }, { s: '123', k: 'sc' }, { s: '#', k: 'sx' }], kind: 'mmi.c.ussd', dest: 'network', answer: 'mmi.a.ussd', n: 1 },
  { seg: [{ s: '*#*#', k: 'px' }, { s: '4636', k: 'sc' }, { s: '#*#*', k: 'sx' }], kind: 'mmi.c.secret', dest: 'app', answer: 'mmi.a.secret', n: 0 },
]
export const codeAt = (v: number | undefined) => CODES[Math.min(Math.max(Math.round(v ?? 0), 0), CODES.length - 1)]
