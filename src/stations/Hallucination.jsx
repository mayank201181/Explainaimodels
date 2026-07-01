import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Button } from '../ui.jsx'

export default function Hallucination() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="space-y-6">
      <InfoBox title="One honest warning before you trust it with money">
        Everything you’ve learned has a consequence: the model is built to produce{' '}
        <span className="font-semibold">plausible-sounding text</span>, not{' '}
        <span className="font-semibold">verified-true text</span>. Usually those are the same
        thing. Sometimes they aren’t — and it will be just as confident either way.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-3 text-sm font-semibold text-slate-400">
          WHY IT “HALLUCINATES” — a quick demonstration
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
          <div className="text-slate-300">You ask:</div>
          <div className="mt-1 text-lg text-slate-100">
            “What was the exact closing price of a stock on a random day in 1987?”
          </div>
          {!revealed ? (
            <div className="mt-4">
              <Button onClick={() => setRevealed(true)}>See what the model does →</Button>
            </div>
          ) : (
            <div className="mt-4 space-y-3 fade-up">
              <div className="rounded-lg bg-rose-500/10 p-3">
                <div className="text-sm font-semibold text-rose-300">It answers confidently:</div>
                <div className="text-slate-200">“It closed at $42.17.”</div>
              </div>
              <div className="text-[15px] leading-relaxed text-slate-300">
                It never stored that exact number — remember, it kept <em>patterns</em>, not
                <em> pages</em>. But its one job is to predict a plausible next token, and{' '}
                <span className="font-mono">“$42.17”</span> <em>looks</em> exactly like a
                real answer. So it produces one. There’s no little voice inside saying{' '}
                <em>“I don’t actually know this.”</em> — it’s always just predicting.
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="What it’s genuinely great at" tone="green">
          <ul className="space-y-1.5">
            <li>✓ Explaining concepts &amp; summarising</li>
            <li>✓ Drafting, rewriting, translating</li>
            <li>✓ Reasoning through a problem with you</li>
            <li>✓ Code, structure, brainstorming</li>
          </ul>
        </InfoBox>
        <InfoBox title="Where to keep your hand on the wheel" tone="purple">
          <ul className="space-y-1.5">
            <li>⚠ Exact figures, dates, quotes, citations</li>
            <li>⚠ Anything after its knowledge cut-off</li>
            <li>⚠ Niche facts it saw rarely (or never)</li>
            <li>⚠ Anything where being wrong is expensive</li>
          </ul>
        </InfoBox>
      </div>

      <AnalogyBox>
        Treat it like a brilliant, fast, incredibly well-read junior analyst with a{' '}
        <em>flawless-sounding delivery and no instinct for its own blind spots.</em> Priceless
        for first drafts and thinking out loud. But you verify the hard numbers before they hit a
        trade ticket — exactly as you would with any junior.
      </AnalogyBox>
    </div>
  )
}
