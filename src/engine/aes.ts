// AES-128 (FIPS-197), written to show every step rather than to be fast. A state is 16 bytes in AES order:
// byte i sits in row i % 4, column i >> 2, so the bytes fill the 4×4 grid column by column.

/** The S-box: 256 fixed entries; byte b is replaced by SBOX[b] (row = first hex digit, column = second). */
export const SBOX: number[] = (() => {
  const s = new Array<number>(256)
  const rotl = (x: number, k: number) => ((x << k) | (x >>> (8 - k))) & 0xff
  let p = 1
  let q = 1
  // p runs through every non-zero byte (multiplying by 3); q is its inverse in GF(2⁸) (dividing by 3)
  do {
    p = (p ^ (p << 1) ^ (p & 0x80 ? 0x1b : 0)) & 0xff
    q ^= q << 1
    q ^= q << 2
    q ^= q << 4
    q &= 0xff
    if (q & 0x80) q ^= 0x09
    s[p] = q ^ rotl(q, 1) ^ rotl(q, 2) ^ rotl(q, 3) ^ rotl(q, 4) ^ 0x63
  } while (p !== 1)
  s[0] = 0x63
  return s
})()

/** The fixed MixColumns matrix. */
export const MIX = [
  [2, 3, 1, 1],
  [1, 2, 3, 1],
  [1, 1, 2, 3],
  [3, 1, 1, 2],
]

/** ×2 in AES arithmetic: shift left one bit; if a 1 fell off the left end, XOR with 1B. */
export const xtime = (b: number) => ((b << 1) ^ (b & 0x80 ? 0x1b : 0)) & 0xff
/** ×1, ×2 or ×3 (the only factors MixColumns uses): ×3 is ×2 XOR the byte itself. */
export const mul = (b: number, k: number) => (k === 1 ? b : k === 2 ? xtime(b) : xtime(b) ^ b)

export const subBytes = (s: number[]) => s.map((b) => SBOX[b])
/** Row r slides r places left: the byte at (r, c) comes from (r, c + r). */
export const shiftRows = (s: number[]) => s.map((_, i) => s[(i % 4) + 4 * (((i >> 2) + (i % 4)) % 4)])
export const mixColumns = (s: number[]) =>
  s.map((_, i) => {
    const r = i % 4
    const c = i >> 2
    return MIX[r].reduce((acc, k, j) => acc ^ mul(s[4 * c + j], k), 0)
  })
export const xor = (a: number[], b: number[]) => a.map((x, i) => x ^ b[i])

/** The 11 round keys (16 bytes each) grown from a 16-byte key. */
export function roundKeys(key: number[]): number[][] {
  const w: number[][] = []
  for (let i = 0; i < 4; i++) w.push(key.slice(4 * i, 4 * i + 4))
  let rcon = 1
  for (let i = 4; i < 44; i++) {
    let t = w[i - 1]
    if (i % 4 === 0) {
      t = [SBOX[t[1]] ^ rcon, SBOX[t[2]], SBOX[t[3]], SBOX[t[0]]]
      rcon = xtime(rcon)
    }
    w.push(w[i - 4].map((x, j) => x ^ t[j]))
  }
  return Array.from({ length: 11 }, (_, r) => w.slice(4 * r, 4 * r + 4).flat())
}

/** One round's states: start → sub → shift → mix → end (= mix XOR key). Round 0 is only the XOR with the key. */
export interface AesRound {
  start: number[]
  sub: number[]
  shift: number[]
  mix: number[]
  key: number[]
  end: number[]
}

export function aesTrace(message: number[], key: number[]): AesRound[] {
  const keys = roundKeys(key)
  const rounds: AesRound[] = [{ start: message, sub: message, shift: message, mix: message, key: keys[0], end: xor(message, keys[0]) }]
  for (let r = 1; r <= 10; r++) {
    const start = rounds[r - 1].end
    const sub = subBytes(start)
    const shift = shiftRows(sub)
    // the last round skips MixColumns
    const mix = r < 10 ? mixColumns(shift) : shift
    rounds.push({ start, sub, shift, mix, key: keys[r], end: xor(mix, keys[r]) })
  }
  return rounds
}

export const fromHex = (h: string) => Array.from({ length: h.length / 2 }, (_, i) => parseInt(h.slice(2 * i, 2 * i + 2), 16))
export const toHex = (b: number[]) => b.map((x) => x.toString(16).padStart(2, '0')).join('')
