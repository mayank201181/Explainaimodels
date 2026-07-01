import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Slider } from '../ui.jsx'
import { humanNumber } from '../data.js'

// A single artificial "neuron": output = sigmoid(w1*x1 + w2*x2 + bias)
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x))
}

export default function Dials() {
  const [w1, setW1] = useState(1.5)
  const [w2, setW2] = useState(-1)
  const [bias, setBias] = useState(0.2)
  // Two fixed example inputs (imagine: "is it raining?" and "is it a weekday?")
  const x1 = 1
  const x2 = 0.5
  const sum = w1 * x1 + w2 * x2 + bias
  const out = sigmoid(sum)

  return (
    <div className="space-y-6">
      <InfoBox title="What a “parameter” actually is">
        People say a model has “750 billion parameters” as if that’s spooky. A parameter is
        just a <span className="font-semibold">number — a little dial</span> that controls how
        much one signal pushes on another. The model is a giant machine made of these dials.
        “Knowledge” is nothing more than the exact settings of all those dials.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-4 text-sm font-semibold text-slate-400">
          TURN THE DIALS — this is one tiny artificial “neuron”
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <Slider label="Dial 1  (weight on input A)" value={w1} min={-3} max={3} step={0.1}
              onChange={setW1} format={(v) => v.toFixed(1)} />
            <Slider label="Dial 2  (weight on input B)" value={w2} min={-3} max={3} step={0.1}
              onChange={setW2} format={(v) => v.toFixed(1)} />
            <Slider label="Bias  (baseline nudge)" value={bias} min={-3} max={3} step={0.1}
              onChange={setBias} format={(v) => v.toFixed(1)} />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-700 bg-slate-800/40 p-5">
            <div className="text-center text-sm text-slate-400">
              Inputs A = {x1}, B = {x2}
            </div>
            <div className="font-mono text-sm text-slate-300">
              ({w1.toFixed(1)}×{x1}) + ({w2.toFixed(1)}×{x2}) + {bias.toFixed(1)} ={' '}
              <span className="text-slate-100">{sum.toFixed(2)}</span>
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500">Output</div>
            <div
              className="flex h-28 w-28 items-center justify-center rounded-full text-2xl font-bold transition-all"
              style={{
                background: `conic-gradient(#38bdf8 ${out * 360}deg, #1e293b 0deg)`,
              }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-sky-300">
                {out.toFixed(2)}
              </div>
            </div>
            <div className="text-center text-xs text-slate-400">
              A single number between 0 and 1 — the neuron’s “vote.”
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-semibold text-slate-400">NOW SCALE IT UP</div>
        <p className="mt-2 leading-relaxed text-slate-300">
          You just turned <span className="font-semibold text-white">3 dials</span> by hand. A
          big model has around{' '}
          <span className="font-semibold text-sky-300">{humanNumber(750e9)}</span> of them,
          wired in layers where each neuron’s output feeds the next. No human sets these — they
          get tuned automatically (that’s the next step). But every single one is exactly the
          kind of dial you just moved.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/40 py-3 text-center">
              <div className="mx-auto h-4 w-4 rounded-full bg-sky-400/70" style={{ opacity: 0.3 + (i % 6) * 0.12 }} />
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-xs text-slate-500">…times 40 billion more.</div>
      </Card>

      <AnalogyBox>
        It’s your pricing model with billions of coefficients instead of a handful. You know
        how one badly-set coefficient throws off a whole valuation — now imagine tuning 750
        billion of them so the <em>entire</em> machine outputs sensible language. The finished
        settings <em>are</em> the intelligence.
      </AnalogyBox>
    </div>
  )
}
