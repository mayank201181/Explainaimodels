import React, { useState } from 'react'
import { Card, AnalogyBox, InfoBox, Toggle } from '../ui.jsx'

export default function Compression() {
  const [mode, setMode] = useState('generalize') // 'memorize' | 'generalize'

  return (
    <div className="space-y-6">
      <InfoBox title="The deeper puzzle: the internet is enormous">
        The text a big model learns from is measured in{' '}
        <span className="font-semibold">tens of thousands of gigabytes</span> of writing —
        far, far more than a one-terabyte file could ever hold as a copy. So the model
        obviously isn’t <em>keeping</em> the text. It’s doing something cleverer.
      </InfoBox>

      <Card className="p-6">
        <div className="mb-4 text-sm font-semibold text-slate-400">
          THE SCALE, ROUGHLY
        </div>
        <div className="space-y-4">
          <ScaleRow label="Text the model reads to learn" widthPct={100}
            value="≈ 50,000+ GB of writing" color="bg-slate-500" />
          <ScaleRow label="The finished model file" widthPct={2}
            value="≈ 400 GB" color="bg-emerald-400" />
        </div>
        <p className="mt-4 text-sm text-slate-400">
          It read a library the size of a small country’s worth of books, and what it kept
          fits in your pocket. That only works if it stored <span className="font-semibold text-slate-200">
          patterns</span>, not <span className="font-semibold text-slate-200">pages</span>.
        </p>
      </Card>

      <Card className="p-6">
        <div className="mb-1 text-sm font-semibold text-slate-400">
          MEMORISE vs. UNDERSTAND — the whole difference
        </div>
        <div className="mb-4 flex items-center gap-3">
          <span className={mode === 'memorize' ? 'font-semibold text-rose-300' : 'text-slate-500'}>
            Memorise every example
          </span>
          <Toggle
            checked={mode === 'generalize'}
            onChange={(v) => setMode(v ? 'generalize' : 'memorize')}
            onLabel="Understanding"
            offLabel="Memorising"
          />
          <span className={mode === 'generalize' ? 'font-semibold text-emerald-300' : 'text-slate-500'}>
            Learn the rule
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
            <div className="text-sm font-semibold text-slate-300">What it stores</div>
            {mode === 'memorize' ? (
              <ul className="mt-2 space-y-1 font-mono text-sm text-rose-200/90">
                <li>2 + 2 = 4</li>
                <li>3 + 5 = 8</li>
                <li>7 + 1 = 8</li>
                <li className="text-slate-500">…and a billion more lines,</li>
                <li className="text-slate-500">one for every sum ever seen.</li>
              </ul>
            ) : (
              <div className="mt-2 space-y-2">
                <div className="rounded-lg bg-emerald-500/10 p-3 text-center font-mono text-lg text-emerald-200">
                  answer = a + b
                </div>
                <div className="text-sm text-slate-400">
                  One short rule. It can now add numbers it has <em>never seen</em>.
                </div>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
            <div className="text-sm font-semibold text-slate-300">Consequences</div>
            {mode === 'memorize' ? (
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>💾 Huge — grows with every example</li>
                <li>🧱 Brittle — stuck if the exact case wasn’t stored</li>
                <li>❌ Can’t handle anything new</li>
              </ul>
            ) : (
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>🪶 Tiny — one rule replaces a billion lines</li>
                <li>🌊 Flexible — works on unseen cases</li>
                <li>✅ This is what “learning” means</li>
              </ul>
            )}
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
          A model does the “understanding” version for <em>language and ideas</em>. Instead of
          storing sentences, it stores the underlying regularities — grammar, cause and effect,
          how a balance sheet works, how a story flows. Those rules are astonishingly compact
          compared to all the examples that taught them. <span className="font-semibold text-white">
          That compression from “examples” down to “rules” is the whole trick.</span>
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalogyBox>
          A junior analyst who’s memorised last year’s trades is useless the moment the market
          does something new. A seasoned PM has compressed decades into a handful of durable
          principles and reads a fresh situation instantly. The model is the seasoned PM: it
          threw away the transcripts and kept the judgement.
        </AnalogyBox>
        <InfoBox title="The honest caveat" tone="purple">
          Because it keeps rules and not pages, the model is <em>lossy</em> — it can blur or
          reconstruct details imperfectly. That’s the same reason it sometimes states something
          wrong with total confidence. We’ll come back to that; it’s a direct consequence of how
          this compression works.
        </InfoBox>
      </div>
    </div>
  )
}

function ScaleRow({ label, widthPct, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-slate-400">{value}</span>
      </div>
      <div className="h-6 w-full overflow-hidden rounded-md bg-slate-800">
        <div className={'h-full rounded-md ' + color} style={{ width: Math.max(1.5, widthPct) + '%' }} />
      </div>
    </div>
  )
}
