import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Slider, Button, ProbBar } from '../ui.jsx'
import { applyTemperature } from '../data.js'

// A scripted generator. At each step the "model" has a few candidate next words.
// Candidates are near-synonyms so any path stays coherent — the point is to show
// the ONE-WORD-AT-A-TIME loop and how temperature changes the choices.
const START = 'The market opened'
const STEPS = [
  [ { word: 'higher', p: 0.5 }, { word: 'lower', p: 0.3 }, { word: 'flat', p: 0.2 } ],
  [ { word: 'today', p: 0.6 }, { word: 'sharply', p: 0.25 }, { word: 'again', p: 0.15 } ],
  [ { word: 'as', p: 0.7 }, { word: 'while', p: 0.2 }, { word: 'and', p: 0.1 } ],
  [ { word: 'traders', p: 0.6 }, { word: 'investors', p: 0.3 }, { word: 'funds', p: 0.1 } ],
  [ { word: 'rushed', p: 0.45 }, { word: 'moved', p: 0.35 }, { word: 'scrambled', p: 0.2 } ],
  [ { word: 'to', p: 0.85 }, { word: 'quickly', p: 0.15 } ],
  [ { word: 'hedge', p: 0.4 }, { word: 'rebalance', p: 0.35 }, { word: 'adjust', p: 0.25 } ],
  [ { word: 'their', p: 0.8 }, { word: 'the', p: 0.2 } ],
  [ { word: 'positions', p: 0.5 }, { word: 'portfolios', p: 0.3 }, { word: 'books', p: 0.2 } ],
  [ { word: 'before', p: 0.6 }, { word: 'ahead', p: 0.25 }, { word: 'near', p: 0.15 } ],
  [ { word: 'the', p: 0.9 }, { word: 'market', p: 0.1 } ],
  [ { word: 'close.', p: 0.6 }, { word: 'bell.', p: 0.25 }, { word: 'afternoon.', p: 0.15 } ],
]

function sample(dist) {
  const r = Math.random()
  let acc = 0
  for (const d of dist) {
    acc += d.p
    if (r <= acc) return d.word
  }
  return dist[dist.length - 1].word
}

export default function Inference() {
  const [temp, setTemp] = useState(0.8)
  const [chosen, setChosen] = useState([]) // words picked so far
  const i = chosen.length
  const done = i >= STEPS.length
  const dist = done ? [] : applyTemperature(STEPS[i], temp).sort((a, b) => b.p - a.p)
  const max = dist.length ? dist[0].p : 1

  function next() {
    if (done) return
    setChosen([...chosen, sample(applyTemperature(STEPS[i], temp))])
  }
  function writeAll() {
    let out = [...chosen]
    for (let k = out.length; k < STEPS.length; k++) {
      out.push(sample(applyTemperature(STEPS[k], temp)))
    }
    setChosen(out)
  }
  function reset() { setChosen([]) }

  const text = [START, ...chosen].join(' ')

  return (
    <div className="space-y-6">
      <InfoBox title="Putting it together: how an answer is actually written">
        Now we run the loop from Step 1 for real. The model looks at everything so far, produces
        a probability for every possible next word, <span className="font-semibold">picks
        one</span>, sticks it on the end, and does it all again. A whole essay is just this loop
        spinning a few hundred times.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-2 text-sm font-semibold text-slate-400">
          THE GENERATION LOOP — press “Write next word” and watch it build
        </div>
        <div className="min-h-[72px] rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-lg leading-relaxed">
          <span className="text-slate-500">{START} </span>
          {chosen.map((w, k) => (
            <span key={k} className="fade-up text-slate-100">{w} </span>
          ))}
          {!done && <span className="inline-block rounded bg-sky-500/20 px-1.5 text-sky-300 pulse-glow">▊</span>}
        </div>

        {!done && (
          <div className="mt-5">
            <div className="mb-2 text-sm text-slate-400">
              Right now, the model’s candidates for the next word are:
            </div>
            <div className="space-y-2">
              {dist.map((d) => (
                <ProbBar key={d.word} label={d.word} value={d.p} max={max} highlight={d.p === max} />
              ))}
            </div>
          </div>
        )}
        {done && (
          <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-emerald-200">
            ✓ Sentence complete. Every word above was chosen the same way — one prediction at a
            time. Change the temperature and re-run for a different result.
          </div>
        )}

        <div className="mt-5 max-w-sm">
          <Slider label="Temperature (creativity / risk)" value={temp} min={0.1} max={1.8} step={0.1}
            onChange={setTemp} format={(v) => v.toFixed(1)} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={next} disabled={done}>Write next word →</Button>
          <Button variant="ghost" onClick={writeAll} disabled={done}>Finish it for me</Button>
          <Button variant="subtle" onClick={reset}>Start over</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalogyBox>
          It’s a trader making one decision, seeing the new state of the book, then making the
          next — never the whole plan at once, always “given everything so far, what’s the best
          next move?” The model commits to one word, re-reads the whole context including its own
          words, and decides again.
        </AnalogyBox>
        <InfoBox title="This is why the same question gives different answers" tone="purple">
          Because it <em>samples</em> from probabilities rather than always taking the top word,
          you get variety — like re-running a simulation with a different random seed. Turn
          temperature to near-zero and it becomes almost deterministic: same question, same
          answer, every time.
        </InfoBox>
      </div>
    </div>
  )
}
