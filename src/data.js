// Curated, illustrative next-word distributions.
// These are hand-authored to *feel* realistic and teach the idea — a real model
// computes these live over ~100,000 possible tokens. We keep it honest by
// labelling it as a simplified illustration in the UI.

export const PREDICTION_EXAMPLES_PRO = [
  {
    prompt: 'The stock market crashed, and nervous investors began to',
    dist: [
      { word: 'sell', p: 0.44 },
      { word: 'panic', p: 0.21 },
      { word: 'worry', p: 0.13 },
      { word: 'reassess', p: 0.09 },
      { word: 'buy', p: 0.06 },
      { word: 'wait', p: 0.04 },
      { word: 'celebrate', p: 0.02 },
      { word: 'sleep', p: 0.01 },
    ],
  },
  {
    prompt: 'Interest rates rose, so the price of bonds went',
    dist: [
      { word: 'down', p: 0.71 },
      { word: 'lower', p: 0.12 },
      { word: 'up', p: 0.07 },
      { word: 'sideways', p: 0.05 },
      { word: 'nowhere', p: 0.03 },
      { word: 'crazy', p: 0.02 },
    ],
  },
  {
    prompt: 'To make a cup of tea, first you boil the',
    dist: [
      { word: 'water', p: 0.82 },
      { word: 'kettle', p: 0.09 },
      { word: 'milk', p: 0.05 },
      { word: 'leaves', p: 0.02 },
      { word: 'ocean', p: 0.01 },
      { word: 'engine', p: 0.01 },
    ],
  },
  {
    prompt: 'A hedge fund manager’s job is to manage',
    dist: [
      { word: 'risk', p: 0.4 },
      { word: 'money', p: 0.24 },
      { word: 'capital', p: 0.14 },
      { word: 'portfolios', p: 0.11 },
      { word: 'expectations', p: 0.06 },
      { word: 'clients', p: 0.03 },
      { word: 'dinosaurs', p: 0.02 },
    ],
  },
]

export const PREDICTION_EXAMPLES_TEEN = [
  {
    prompt: 'I stayed up way too late last night, so today I feel really',
    dist: [
      { word: 'tired', p: 0.48 },
      { word: 'sleepy', p: 0.2 },
      { word: 'exhausted', p: 0.13 },
      { word: 'grumpy', p: 0.09 },
      { word: 'awful', p: 0.05 },
      { word: 'fine', p: 0.03 },
      { word: 'amazing', p: 0.02 },
    ],
  },
  {
    prompt: 'She scored the winning goal, and the whole crowd started to',
    dist: [
      { word: 'cheer', p: 0.52 },
      { word: 'scream', p: 0.19 },
      { word: 'celebrate', p: 0.14 },
      { word: 'clap', p: 0.08 },
      { word: 'cry', p: 0.04 },
      { word: 'leave', p: 0.03 },
    ],
  },
  {
    prompt: 'My phone battery is at 1%, I really need to find a',
    dist: [
      { word: 'charger', p: 0.74 },
      { word: 'plug', p: 0.11 },
      { word: 'socket', p: 0.07 },
      { word: 'friend', p: 0.04 },
      { word: 'cable', p: 0.03 },
      { word: 'unicorn', p: 0.01 },
    ],
  },
  {
    prompt: 'To bake cookies, you mix the flour, sugar and',
    dist: [
      { word: 'butter', p: 0.44 },
      { word: 'eggs', p: 0.3 },
      { word: 'chocolate', p: 0.16 },
      { word: 'milk', p: 0.06 },
      { word: 'salt', p: 0.03 },
      { word: 'glitter', p: 0.01 },
    ],
  },
]

// Reshape a probability distribution by "temperature".
// temp < 1 => sharper (more confident, picks the top word). temp > 1 => flatter (more random/creative).
export function applyTemperature(dist, temp) {
  const t = Math.max(0.05, temp)
  const logits = dist.map((d) => Math.log(Math.max(1e-6, d.p)) / t)
  const maxL = Math.max(...logits)
  const exps = logits.map((l) => Math.exp(l - maxL))
  const sum = exps.reduce((a, b) => a + b, 0)
  return dist.map((d, i) => ({ ...d, p: exps[i] / sum }))
}

// A tiny, approximate "tokenizer". Real tokenizers use a learned vocabulary
// (Byte-Pair Encoding). We approximate: split on spaces/punctuation, and break
// long words into ~4-character chunks, because on average 1 token ≈ 4 characters
// ≈ 0.75 words. Good enough to build the right intuition.
export function approximateTokens(text) {
  if (!text) return []
  const pieces = text.match(/\s+|[^\s]+/g) || []
  const tokens = []
  for (const piece of pieces) {
    if (/^\s+$/.test(piece)) continue
    // separate trailing punctuation
    const m = piece.match(/^([\w’']+)([.,!?;:]*)$/)
    const core = m ? m[1] : piece
    const punct = m ? m[2] : ''
    if (core.length <= 5) {
      tokens.push(core)
    } else {
      for (let i = 0; i < core.length; i += 4) {
        tokens.push(core.slice(i, i + 4))
      }
    }
    if (punct) for (const ch of punct) tokens.push(ch)
  }
  return tokens
}

// Deterministic pseudo-ID so the same token always shows the same number.
export function tokenId(tok) {
  let h = 0
  for (let i = 0; i < tok.length; i++) h = (h * 31 + tok.charCodeAt(i)) % 100000
  return h
}

// Format a big byte count into human units.
export function humanBytes(gb) {
  if (gb >= 1000) return (gb / 1000).toFixed(gb >= 10000 ? 0 : 1) + ' TB'
  if (gb >= 1) return gb.toFixed(gb >= 100 ? 0 : 1) + ' GB'
  return (gb * 1000).toFixed(0) + ' MB'
}

export function humanNumber(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + ' trillion'
  if (n >= 1e9) return (n / 1e9).toFixed(0) + ' billion'
  if (n >= 1e6) return (n / 1e6).toFixed(0) + ' million'
  return n.toLocaleString()
}
