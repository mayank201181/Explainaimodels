import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox } from '../ui.jsx'
import { approximateTokens, tokenId } from '../data.js'

const COLORS = [
  'bg-sky-500/25 text-sky-200 border-sky-500/40',
  'bg-emerald-500/25 text-emerald-200 border-emerald-500/40',
  'bg-amber-500/25 text-amber-200 border-amber-500/40',
  'bg-purple-500/25 text-purple-200 border-purple-500/40',
  'bg-rose-500/25 text-rose-200 border-rose-500/40',
]

export default function Tokens() {
  const [text, setText] = useState('Managing a portfolio means managing risk.')
  const tokens = approximateTokens(text)

  return (
    <div className="space-y-6">
      <InfoBox title="Computers can’t read words — only numbers">
        Before a model can do anything, your sentence is chopped into small chunks called{' '}
        <span className="font-semibold">tokens</span> (roughly ¾ of a word each), and every
        token is swapped for a <span className="font-semibold">number</span>. From then on, the
        AI is doing pure arithmetic on numbers — it never sees letters at all.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-2 text-sm font-semibold text-slate-400">
          TYPE ANYTHING — watch it get broken into tokens
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/50 p-3 text-lg text-slate-100 outline-none focus:border-sky-500"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {tokens.map((t, i) => (
            <span
              key={i}
              className={
                'inline-flex flex-col items-center rounded-lg border px-2.5 py-1 ' +
                COLORS[i % COLORS.length]
              }
            >
              <span className="font-mono text-sm">{t}</span>
              <span className="font-mono text-[10px] opacity-70">#{tokenId(t)}</span>
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label="Characters" value={text.length} />
          <Stat label="Tokens" value={tokens.length} />
          <Stat
            label="Words (approx)"
            value={(text.trim() ? text.trim().split(/\s+/).length : 0)}
          />
        </div>
        <p className="mt-4 text-sm text-slate-400">
          This is a simplified illustration — a real model has a fixed dictionary of about{' '}
          <span className="font-semibold text-slate-300">100,000</span> tokens it learned in
          advance. Notice long/rare words split into several tokens, while common words are a
          single token. That efficiency matters when you’re processing trillions of them.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalogyBox>
          Think of it like every instrument getting a ticker symbol. Once “Apple” becomes AAPL
          and lives as a row of numbers, your risk engine can add, weight and correlate it. The
          model does the same to language: turn messy words into clean numbers, then do maths.
        </AnalogyBox>
        <InfoBox title="One step further: meaning as coordinates" tone="purple">
          Each token’s number is expanded into a long list of numbers — a{' '}
          <span className="font-semibold">coordinate in “meaning space.”</span> Words with
          similar meaning end up near each other, like “king/queen” or “bull/bear.” That’s how
          the machine gets a sense of <em>meaning</em> from pure numbers.
        </InfoBox>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-3 text-center">
      <div className="font-mono text-2xl font-bold text-sky-300">{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  )
}
