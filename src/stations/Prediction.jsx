import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Slider, ProbBar, Chip } from '../ui.jsx'
import { PREDICTION_EXAMPLES_PRO, PREDICTION_EXAMPLES_TEEN, applyTemperature } from '../data.js'
import { useAudience, Aud } from '../audience.jsx'

export default function Prediction() {
  const [mode] = useAudience()
  const EXAMPLES = mode === 'teen' ? PREDICTION_EXAMPLES_TEEN : PREDICTION_EXAMPLES_PRO
  const [idx, setIdx] = useState(0)
  const [temp, setTemp] = useState(0.8)
  const i = Math.min(idx, EXAMPLES.length - 1)
  const example = EXAMPLES[i]
  const dist = applyTemperature(example.dist, temp).sort((a, b) => b.p - a.p)
  const max = dist[0].p

  return (
    <div className="space-y-6">
      <InfoBox title="The single most important idea in this whole guide">
        An AI language model does <span className="font-semibold">one</span> thing:
        it looks at the words so far and predicts the <span className="font-semibold">next
        word</span>. Then it adds that word and predicts the next one. That’s it. Everything
        else — essays, code, answers — is that one trick, repeated very fast.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-3 text-sm font-semibold text-slate-400">
          TRY IT — pick a sentence and watch the model guess what comes next
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {EXAMPLES.map((e, k) => (
            <Chip key={k} active={k === i} onClick={() => setIdx(k)}>
              {e.prompt.slice(0, 26)}…
            </Chip>
          ))}
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-lg leading-relaxed">
          <span className="text-slate-200">{example.prompt}</span>{' '}
          <span className="inline-block rounded bg-sky-500/20 px-2 text-sky-300 pulse-glow">
            ▊
          </span>
        </div>

        <div className="mt-5 space-y-2">
          {dist.map((d) => (
            <ProbBar key={d.word} label={d.word} value={d.p} max={max} highlight={d.p === max} />
          ))}
        </div>

        <div className="mt-6 max-w-sm">
          <Slider
            label="“Temperature” (how adventurous the model is)"
            value={temp}
            min={0.1}
            max={1.8}
            step={0.1}
            onChange={setTemp}
            format={(v) => v.toFixed(1)}
          />
          <p className="mt-2 text-sm text-slate-400">
            Low = it almost always picks the safe top word. High = it spreads the bets and
            takes creative risks. This one dial is the difference between a dull, predictable
            answer and a surprising one.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Aud
          pro={
            <AnalogyBox>
              It’s a probability distribution over “what happens next” — exactly how you think about
              the next move in a market. You’re never certain; you have a{' '}
              <em>weighted set of likely outcomes</em>. Temperature is your risk appetite: crank it
              up and you take the long-shot trade; keep it low and you stick with the base case.
            </AnalogyBox>
          }
          teen={
            <AnalogyBox title="Think of it like…" icon="🎮">
              It’s exactly your phone keyboard. When you text “I’m on my…”, it suggests{' '}
              <em>way</em>, <em>phone</em>, <em>break</em> — with the best guess biggest and in the
              middle. The AI is that autocomplete, but enormously smarter. Temperature is how “wild”
              the suggestions get: low = boring and safe, high = it picks the weird surprising word.
            </AnalogyBox>
          }
        />
        <InfoBox title="So where does the “knowledge” live?" tone="purple">
          Notice you didn’t look anything up. The model just knew what usually comes next — not
          because it stored a fact, but because that pattern is baked into it.
          <span className="font-semibold text-purple-200"> Next we’ll see how words even
          become something a machine can do maths on.</span>
        </InfoBox>
      </div>
    </div>
  )
}
