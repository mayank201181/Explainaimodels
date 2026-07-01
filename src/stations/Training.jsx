import React, { useState, useRef } from 'react'
import { Card, AnalogyBox, InfoBox, Button } from '../ui.jsx'
import { Aud } from '../audience.jsx'

// Fixed, slightly noisy data points that roughly follow y = 0.7x + 1.2.
// The "model" is a line y = m*x + b with two dials (m, b) it must learn.
const DATA = [
  { x: 0.5, y: 1.4 }, { x: 1.5, y: 2.1 }, { x: 2.2, y: 3.0 }, { x: 3.0, y: 3.1 },
  { x: 3.8, y: 4.2 }, { x: 4.6, y: 4.1 }, { x: 5.3, y: 5.3 }, { x: 6.1, y: 5.2 },
  { x: 6.9, y: 6.4 }, { x: 7.6, y: 6.3 }, { x: 8.4, y: 7.1 }, { x: 9.2, y: 7.6 },
]

const LR = 0.012 // learning rate

function loss(m, b) {
  let s = 0
  for (const p of DATA) {
    const e = m * p.x + b - p.y
    s += e * e
  }
  return s / DATA.length
}

function gradStep(m, b) {
  let gm = 0, gb = 0
  for (const p of DATA) {
    const e = m * p.x + b - p.y
    gm += 2 * e * p.x
    gb += 2 * e
  }
  gm /= DATA.length
  gb /= DATA.length
  return [m - LR * gm, b - LR * gb]
}

// SVG mapping
const W = 420, H = 300, PAD = 34
const xMax = 10, yMax = 9
const sx = (x) => PAD + (x / xMax) * (W - 2 * PAD)
const sy = (y) => H - PAD - (y / yMax) * (H - 2 * PAD)

export default function Training() {
  // Start with deliberately bad dials.
  const [m, setM] = useState(2.6)
  const [b, setB] = useState(0.2)
  const [steps, setSteps] = useState(0)
  const timer = useRef(null)

  const L = loss(m, b)

  function step(n = 1) {
    let cm = m, cb = b
    for (let i = 0; i < n; i++) [cm, cb] = gradStep(cm, cb)
    setM(cm); setB(cb); setSteps((s) => s + n)
  }

  function autoTrain() {
    if (timer.current) return
    let count = 0
    timer.current = setInterval(() => {
      step(3)
      if (++count > 60) stop()
    }, 60)
  }
  function stop() {
    clearInterval(timer.current)
    timer.current = null
  }
  function reset() {
    stop()
    setM(2.6); setB(0.2); setSteps(0)
  }

  return (
    <div className="space-y-6">
      <InfoBox title="Who sets 750 billion dials? Nobody — they’re trained">
        No human could tune billions of dials by hand. Instead the model{' '}
        <span className="font-semibold">guesses, checks how wrong it was, and nudges every dial
        a little to be less wrong.</span> Repeat that trillions of times and the dials settle
        into settings that work. Below is that exact process, shrunk to just{' '}
        <span className="font-semibold">two dials</span> so you can watch it happen.
      </InfoBox>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl bg-slate-800/40">
              {/* axes */}
              <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#334155" />
              <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#334155" />
              {/* data points */}
              {DATA.map((p, i) => (
                <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="5" fill="#38bdf8" opacity="0.85" />
              ))}
              {/* the model's current line */}
              <line
                x1={sx(0)} y1={sy(b)}
                x2={sx(xMax)} y2={sy(m * xMax + b)}
                stroke="#34d399" strokeWidth="3" strokeLinecap="round"
              />
              {/* error whiskers */}
              {DATA.map((p, i) => (
                <line key={'e' + i} x1={sx(p.x)} y1={sy(p.y)} x2={sx(p.x)} y2={sy(m * p.x + b)}
                  stroke="#f43f5e" strokeWidth="1" opacity="0.5" />
              ))}
              <text x={W - PAD} y={H - 12} fill="#64748b" fontSize="11" textAnchor="end">input →</text>
            </svg>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span><span className="text-sky-400">●</span> real data</span>
              <span><span className="text-emerald-400">▬</span> model’s guess</span>
              <span><span className="text-rose-400">|</span> error</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Wrongness (error)</span>
                <span className="font-mono font-bold text-rose-300">{L.toFixed(3)}</span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-rose-400 transition-all duration-200"
                  style={{ width: Math.min(100, (L / 6) * 100) + '%' }} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Mini label="Dial 1 (slope)" value={m.toFixed(2)} />
                <Mini label="Dial 2 (offset)" value={b.toFixed(2)} />
                <Mini label="Steps" value={steps} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => step(1)}>Nudge once</Button>
              <Button variant="ghost" onClick={autoTrain}>▶ Auto-train</Button>
              <Button variant="subtle" onClick={reset}>Reset</Button>
            </div>
            <p className="text-sm text-slate-400">
              Each nudge measures the total error and adjusts both dials slightly downhill.
              Watch the green line snap onto the data as the error falls — nobody told it the
              answer, it <em>found</em> it.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Aud
          pro={
            <AnalogyBox>
              This is calibrating a model against the market. You start with rough parameters, measure
              the fit against real prints, adjust, and repeat until the residuals are small. Training
              an AI is the same optimisation loop — just with billions of parameters and the “data”
              being all of human writing.
            </AnalogyBox>
          }
          teen={
            <AnalogyBox title="Think of it like…" icon="🎮">
              This is exactly how you get good at anything — shooting a basketball, a video game, an
              instrument. You try, you miss, you see <em>how</em> you missed, you adjust a little,
              and you try again. Do that thousands of times and your aim gets scary good. Training an
              AI is that same “practice and adjust” loop, just done billions of times, super fast.
            </AnalogyBox>
          }
        />
        <InfoBox title="Why training needs the internet but using it doesn’t" tone="purple">
          Training is the expensive part: months of computation on enormous data centres to set
          the dials. But once they’re set, they’re <span className="font-semibold">frozen into
          the file.</span> Running the model afterwards is just doing the arithmetic with those
          fixed numbers — which a laptop can do, offline. That’s the bridge to the final steps.
        </InfoBox>
      </div>
    </div>
  )
}

function Mini({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-900/60 p-2">
      <div className="font-mono text-lg font-bold text-sky-300">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  )
}
