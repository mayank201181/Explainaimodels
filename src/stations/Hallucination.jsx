import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Button } from '../ui.jsx'
import { Aud } from '../audience.jsx'

export default function Hallucination() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="space-y-6">
      <InfoBox title="One honest warning before you trust it too much">
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
            <Aud
              pro='“What was the exact closing price of a stock on a random day in 1987?”'
              teen='“What was the exact final score of a random football match played in 1997?”'
            />
          </div>
          {!revealed ? (
            <div className="mt-4">
              <Button onClick={() => setRevealed(true)}>See what the model does →</Button>
            </div>
          ) : (
            <div className="mt-4 space-y-3 fade-up">
              <div className="rounded-lg bg-rose-500/10 p-3">
                <div className="text-sm font-semibold text-rose-300">It answers confidently:</div>
                <div className="text-slate-200">
                  <Aud pro='“It closed at $42.17.”' teen='“It finished 3–1.”' />
                </div>
              </div>
              <div className="text-[15px] leading-relaxed text-slate-300">
                It never stored that exact fact — remember, it kept <em>patterns</em>, not
                <em> pages</em>. But its one job is to predict a plausible next word, and{' '}
                <span className="font-mono">
                  <Aud pro='“$42.17”' teen='“3–1”' />
                </span>{' '}
                <em>looks</em> exactly like a real answer. So it produces one. There’s no little
                voice inside saying <em>“I don’t actually know this.”</em> — it’s always just
                predicting.
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="What it’s genuinely great at" tone="green">
          <ul className="space-y-1.5">
            <li>✓ Explaining ideas &amp; summarising</li>
            <li>✓ Drafting, rewriting, translating</li>
            <li>✓ Thinking through a problem with you</li>
            <li>✓ Brainstorming, examples, practice questions</li>
          </ul>
        </InfoBox>
        <InfoBox title="Where to double-check it" tone="purple">
          <ul className="space-y-1.5">
            <li>⚠ Exact figures, dates, quotes, scores</li>
            <li>⚠ Anything after its knowledge cut-off</li>
            <li>⚠ Niche facts it saw rarely (or never)</li>
            <li>⚠ Anything where being wrong really matters</li>
          </ul>
        </InfoBox>
      </div>

      <Aud
        pro={
          <AnalogyBox>
            Treat it like a brilliant, fast, incredibly well-read junior analyst with a{' '}
            <em>flawless-sounding delivery and no instinct for its own blind spots.</em> Priceless
            for first drafts and thinking out loud. But you verify the hard numbers before they hit a
            trade ticket — exactly as you would with any junior.
          </AnalogyBox>
        }
        teen={
          <AnalogyBox title="Think of it like…" icon="🎮">
            It’s like that super-confident friend who always “knows” the answer and gives you
            directions without hesitating — usually right, occasionally sending you the totally wrong
            way with the exact same confidence. Amazing for ideas, homework help, and explaining
            stuff. But for anything that has to be <em>exactly</em> right, check it yourself.
          </AnalogyBox>
        }
      />
    </div>
  )
}
